import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // Clerk user ID (String)
    screen: { type: String, required: true },
    seat: { type: String, required: true },
    amount: { type: Number, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    status: { type: String, enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"], default: "Placed" },
    isPaid: { type: Boolean, default: true } // Usually simulated as paid immediately via cash/online on seat delivery
  },
  { timestamps: true }
);

const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);
export default FoodOrder;
