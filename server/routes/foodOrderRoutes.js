import express from "express";
import { requireAuth } from "@clerk/express";
import { protectAdmin } from "../middleware/auth.js";
import {
  createFoodOrder,
  getMyFoodOrders,
  getAllFoodOrders,
  updateFoodOrderStatus,
} from "../controllers/foodOrderController.js";

const foodOrderRouter = express.Router();

foodOrderRouter.post("/create", requireAuth, createFoodOrder);
foodOrderRouter.get("/my-orders", requireAuth, getMyFoodOrders);
foodOrderRouter.get("/all", requireAuth, protectAdmin, getAllFoodOrders);
foodOrderRouter.put("/update-status", requireAuth, protectAdmin, updateFoodOrderStatus);

export default foodOrderRouter;
