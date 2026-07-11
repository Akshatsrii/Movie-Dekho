import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/express";
 

// API Controller Function to Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({ user })
            .populate({
                path: "show",
                populate: { path: "movie" }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
// ✅ API Controller Function to Add Favorite Movie in Clerk User Metadata
export const addFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        // Initialize favorites array if not present
        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        // Add movieId if not already in favorites
        if (!user.privateMetadata.favorites.includes(movieId)) {
            user.privateMetadata.favorites.push(movieId);
        }

        // Update user metadata
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                favorites: user.privateMetadata.favorites
            }
        });

        res.json({
            success: true,
            message: "Movie added to favorites successfully",
            favorites: user.privateMetadata.favorites
        });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
// ✅ API Controller Function to Get Favorite Movies
export const getFavorites = async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);
        const favorites = user.privateMetadata.favorites || [];

        // Getting movies from database using favorite IDs
        const movies = await Movie.find({ _id: { $in: favorites } });

        res.json({
            success: true,
            count: movies.length,
            movies
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Helper API to make currently logged in user an Admin
export const makeAdmin = async (req, res) => {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.json({ success: false, message: "Unauthorized. Please login first." });
        }

        const user = await clerkClient.users.getUser(userId);

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                ...user.privateMetadata,
                role: "admin"
            }
        });

        res.json({
            success: true,
            message: "Congratulations! You are now set as Admin. You can access the /admin panel now.",
            role: "admin"
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API Controller Function to Login as Admin using .env credentials
export const adminLogin = async (req, res) => {
    try {
        const { email, password, userId: bodyUserId } = req.body;
        const userId = bodyUserId || req.auth?.userId || req.auth; // from body or Clerk middleware
        
        console.log("📩 ADMIN LOGIN API HIT:", { email, userId });

        if (!userId) {
            console.log("❌ Unauthorized attempt: no userId found");
            return res.json({ success: false, message: "Unauthorized. Please log in first." });
        }

        const envEmail = process.env.ADMIN_EMAIL;
        const envPassword = process.env.ADMIN_PASSWORD;

        if (!envEmail || !envPassword) {
            console.log("❌ [Server] Admin credentials not set in env variables");
            return res.json({ success: false, message: "Admin credentials are not configured in server environment." });
        }

        console.log("🔑 [Server] Comparing credentials...");
        if (email === envEmail && password === envPassword) {
            console.log("🔑 [Server] Credentials matched! Fetching Clerk user: ", userId);
            const user = await clerkClient.users.getUser(userId);
            console.log("🔑 [Server] User found: ", user.id);
            
            console.log("🔑 [Server] Updating Clerk private metadata...");
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    ...user.privateMetadata,
                    role: "admin"
                }
            });
            console.log("🔑 [Server] Metadata updated successfully!");

            res.json({ success: true, message: "Admin login successful! You are now authorized as Admin." });
        } else {
            console.log("❌ [Server] Credentials did not match!", {
                enteredEmail: email,
                enteredPassword: password,
                expectedEmail: envEmail,
                expectedPassword: envPassword
            });
            res.json({ success: false, message: "Invalid Admin Email or Password." });
        }
    } catch (error) {
        console.error("❌ [Server] Admin login error:", error);
        res.json({ success: false, message: error.message });
    }
};