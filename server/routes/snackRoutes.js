import express from "express";
import { requireAuth } from "@clerk/express";
import { protectAdmin } from "../middleware/auth.js";
import { getAllSnacks, addSnack } from "../controllers/snackController.js";

const snackRouter = express.Router();

snackRouter.get("/all", getAllSnacks);
snackRouter.post("/add", requireAuth, protectAdmin, addSnack);

export default snackRouter;
