import mongoose from "mongoose";

const snackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., "Popcorn", "Drinks", "Snacks"
    image: { type: String, required: true },
    badge: { type: String }, // e.g., "Premium", "Best Seller", "New"
  },
  { timestamps: true }
);

const Snack = mongoose.model("Snack", snackSchema);
export default Snack;
