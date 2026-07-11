// adminController.js

import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// ✅ API to check if user is admin
export const isAdmin = async (req, res) => {
    try {
        res.json({ success: true, isAdmin: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("⚠️ MongoDB offline, serving mock dashboard data");
            const mockDashboardData = {
                totalBookings: 12,
                totalRevenue: 3480,
                activeShows: [],
                totalUser: 5,
                isMock: true
            };
            return res.json({ success: true, dashboardData: mockDashboardData });
        }

        const bookings = await Booking.find({ isPaid: true });
        const activeShows = await Show.find({
            showDateTime: { $gte: new Date() },
        }).populate("movie");
        const totalUser = await User.countDocuments();

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUser,
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to get all shows
export const getAllShows = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("⚠️ MongoDB offline, serving empty shows list");
            return res.json({ success: true, shows: [], isMock: true });
        }

        const shows = await Show.find({
            showDateTime: { $gte: new Date() },
        })
            .populate("movie")
            .sort({ showDateTime: 1 });

        res.json({ success: true, shows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("⚠️ MongoDB offline, serving empty bookings list");
            return res.json({ success: true, bookings: [], isMock: true });
        }

        const bookings = await Booking.find({})
            .populate("user")
            .populate({
                path: "show",
                populate: { path: "movie" },
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
