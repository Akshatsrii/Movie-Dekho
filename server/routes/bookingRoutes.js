import express from "express";
import { createBooking, getOccupiedSeats, getMyBookings, confirmPayment } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express"; // Clerk middleware for user authentication

const bookingRouter = express.Router();

// ✅ Route to create a booking (user must be logged in)
bookingRouter.post("/create", requireAuth, createBooking);

// ✅ Route to get occupied seats for a particular show
bookingRouter.get("/seats/:showId", getOccupiedSeats);

// ✅ Route to get all bookings of the logged-in user
bookingRouter.get("/mybookings", requireAuth, getMyBookings);

// ✅ Route to confirm booking payment directly (mock / fallback)
bookingRouter.post("/confirm-payment", requireAuth, confirmPayment);

export default bookingRouter;
