import Snack from "../models/Snack.js";

// ✅ Get all snacks
export const getAllSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find({}).sort({ category: 1 });
    res.json({ success: true, snacks });
  } catch (error) {
    console.error("Error getting snacks:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add a new snack (Admin only)
export const addSnack = async (req, res) => {
  try {
    const { name, price, category, image, badge } = req.body;
    if (!name || !price || !category || !image) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const snack = await Snack.create({
      name,
      price: Number(price),
      category,
      image,
      badge
    });

    res.json({ success: true, message: "Snack added successfully", snack });
  } catch (error) {
    console.error("Error adding snack:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
