// server/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User", // links booking to a user
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show", // links booking to a specific show
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: [String], // array of seat numbers like ["A1", "A2"]
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentLink: {
      type: String,
    },
    snacks: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
