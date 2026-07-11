import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------------------------------------------------------
// Function to check availability of selected seats for a movie
// ----------------------------------------------------------------------
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// ----------------------------------------------------------------------
// Function to create a new booking and start Stripe Checkout
// ----------------------------------------------------------------------
export const createBooking = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth; // from Clerk middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }
    const { showId, selectedSeats, snacks } = req.body;
    const { origin } = req.headers; // frontend origin (http://localhost:5173)

    // 1️⃣ Check seat availability
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    // 2️⃣ Get show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({
        success: false,
        message: "Show not found.",
      });
    }

    // Calculate snacks amount and total amount
    const snacksAmount = (snacks || []).reduce((acc, snack) => acc + (snack.price * snack.quantity), 0);
    const totalAmount = (showData.showPrice * selectedSeats.length) + snacksAmount;

    // 3️⃣ Create a new booking in DB
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: totalAmount,
      bookedSeats: selectedSeats,
      snacks: snacks || [],
    });

    // 4️⃣ Mark selected seats as occupied
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    // 5️⃣ Build Stripe line items
    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${showData.movie?.title || "Movie Ticket"} - Ticket`,
            description: `Seats: ${selectedSeats.join(", ")}`,
          },
          unit_amount: Math.floor(showData.showPrice * 100),
        },
        quantity: selectedSeats.length,
      }
    ];

    if (snacks && snacks.length > 0) {
      snacks.forEach((snack) => {
        line_items.push({
          price_data: {
            currency: "inr",
            product_data: {
              name: `${snack.name} (Snack)`,
              description: `Quantity: ${snack.quantity}`,
            },
            unit_amount: Math.floor(snack.price * 100),
          },
          quantity: snack.quantity,
        });
      });
    }

    // 6️⃣ Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/payment-success?bookingId=${booking._id}`,
      cancel_url: `${origin}/payment-failed?bookingId=${booking._id}`,
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    // 7️⃣ Save payment link
    booking.paymentLink = session.url;
    await booking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
      paymentUrl: session.url,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Function to get occupied seats for a show
// ----------------------------------------------------------------------
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats);
    res.json({
      success: true,
      occupiedSeats,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Function to get all bookings for logged-in user
// ----------------------------------------------------------------------
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId }).populate({
      path: "show",
      populate: { path: "movie", model: "Movie" },
    });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Function to confirm booking payment directly (Fallback/Mock)
// ----------------------------------------------------------------------
export const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Missing booking ID" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { isPaid: true },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking marked as paid in database", booking });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
