import express from "express";
import { getFavorites, getUserBookings, addFavorite, makeAdmin, adminLogin } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', addFavorite);
userRouter.get('/favorites', getFavorites);
userRouter.get('/make-admin', makeAdmin);
userRouter.post('/admin-login', adminLogin);

export default userRouter;
