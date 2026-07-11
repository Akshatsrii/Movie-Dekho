import FoodOrder from "../models/FoodOrder.js";

// ✅ Create a new food order
export const createFoodOrder = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    const { screen, seat, items, amount } = req.body;
    if (!screen || !seat || !items || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const foodOrder = await FoodOrder.create({
      user: userId,
      screen,
      seat,
      items,
      amount: Number(amount),
      status: "Placed",
      isPaid: true
    });

    res.json({ success: true, message: "Food order placed successfully!", foodOrder });
  } catch (error) {
    console.error("Error creating food order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get logged-in user's food orders
export const getMyFoodOrders = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orders = await FoodOrder.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error getting user food orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all food orders (Admin only)
export const getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error getting all food orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update food order status (Admin only)
export const updateFoodOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = await FoodOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status updated successfully", order });
  } catch (error) {
    console.error("Error updating food order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
