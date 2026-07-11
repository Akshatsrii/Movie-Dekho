import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Ticket, Compass, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const snackMenu = [
  { id: "p1", name: "Classic Salted Popcorn", price: 180, category: "Popcorn", image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80" },
  { id: "p2", name: "Cheese Burst Popcorn", price: 220, category: "Popcorn", image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80" },
  { id: "p3", name: "Gourmet Caramel Popcorn", price: 240, category: "Popcorn", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80" },
  { id: "d1", name: "Pepsi Cold Drink (L)", price: 120, category: "Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80" },
  { id: "d2", name: "Coca Cola (L)", price: 120, category: "Drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80" },
  { id: "d3", name: "Sprite Fizz (L)", price: 120, category: "Drinks", image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=400&q=80" },
  { id: "s1", name: "Cheese Loaded Nachos", price: 180, category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80" },
  { id: "s2", name: "Crispy French Fries", price: 150, category: "Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80" },
  { id: "s3", name: "Veggie Supreme Pizza", price: 280, category: "Snacks", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { id: "s4", name: "Paneer Crispy Burger", price: 190, category: "Snacks", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
  { id: "s5", name: "Spicy Garlic Bread", price: 160, category: "Snacks", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=400&q=80" },
  { id: "s6", name: "Choco Lava Cake", price: 140, category: "Snacks", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" }
];

const FoodOrder = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    snackMenu.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  const [screenNum, setScreenNum] = useState("");
  const [seatNum, setSeatNum] = useState("");
  
  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("theater_food_orders") || "[]");
      setActiveOrders(orders);

      const interval = setInterval(() => {
        let updated = false;
        const currentOrders = JSON.parse(localStorage.getItem("theater_food_orders") || "[]");
        
        const nextOrders = currentOrders.map(order => {
          if (!order.status || order.status === "placed") {
            order.status = "preparing";
            updated = true;
          } else if (order.status === "preparing") {
            order.status = "out";
            updated = true;
          } else if (order.status === "out") {
            order.status = "delivered";
            updated = true;
          }
          return order;
        });

        if (updated) {
          localStorage.setItem("theater_food_orders", JSON.stringify(nextOrders));
          setActiveOrders(nextOrders);
        }
      }, 7000);

      return () => clearInterval(interval);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleIncrement = (itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  };

  const cartItems = snackMenu
    .filter((item) => quantities[item.id] > 0)
    .map((item) => ({
      id: item.id,
      name: item.name,
      quantity: quantities[item.id],
      price: item.price,
    }));

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Please add snacks to your cart first!");
      return;
    }
    if (!screenNum.trim() || !seatNum.trim()) {
      toast.error("Please enter both Screen Number and Seat Number!");
      return;
    }

    // Navigate to Stripe payment panel
    navigate("/payment", {
      state: {
        orderType: "food_delivery",
        screen: screenNum.trim(),
        seat: seatNum.trim().toUpperCase(),
        amount: cartTotal,
        items: cartItems,
      },
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "placed": return { text: "Order Placed", color: "text-blue-600 bg-blue-50 border-blue-200" };
      case "preparing": return { text: "Preparing Food", color: "text-amber-600 bg-amber-50 border-amber-200" };
      case "out": return { text: "Out for Seat Delivery", color: "text-purple-600 bg-purple-50 border-purple-200 animate-pulse" };
      case "delivered": return { text: "Delivered to Seat", color: "text-green-600 bg-green-50 border-green-200" };
      default: return { text: "Placed", color: "text-gray-500 bg-gray-50 border-gray-200" };
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-16 lg:px-24 xl:px-40 bg-[#fffaf9] text-zinc-950 relative overflow-hidden">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-100px" right="-100px" />

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Menu list */}
        <div className="flex-1">
          <div className="mb-8">
            <span className="px-3 py-1 bg-[#e51e25]/15 border border-[#e51e25]/25 text-[#e51e25] text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              🍿 Interval Specials
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950">
              Order Food Directly to Your Seat
            </h1>
            <p className="text-zinc-500 text-sm mt-1 max-w-xl">
              Don't miss a single movie scene! Select your snacks, type in your screen and seat number, and we'll deliver it directly.
            </p>
          </div>

          <div className="space-y-12">
            {["Popcorn", "Drinks", "Snacks"].map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-extrabold border-b border-zinc-200 pb-2 mb-6 text-zinc-900 tracking-tight">
                  {category}
                </h2>
                
                {/* Visual Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {snackMenu
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-zinc-200 hover:border-[#e51e25]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex"
                      >
                        {/* Food Image */}
                        <div className="w-28 h-28 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-bold text-zinc-900 leading-tight text-sm md:text-base">{item.name}</p>
                            <p className="text-sm text-[#e51e25] font-extrabold mt-1">₹{item.price}</p>
                          </div>

                          <div className="flex justify-end">
                            <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50 shadow-sm">
                              <button
                                onClick={() => handleDecrement(item.id)}
                                className="px-2 py-1.5 hover:bg-zinc-200 text-zinc-600 transition cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 font-bold text-zinc-800 text-sm select-none">
                                {quantities[item.id]}
                              </span>
                              <button
                                onClick={() => handleIncrement(item.id)}
                                className="px-2 py-1.5 hover:bg-zinc-200 text-zinc-600 transition cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cart, Screen inputs, and Active tracker */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          
          {/* Cart Card */}
          <div className="bg-white border border-[#e51e25]/20 rounded-3xl p-6 shadow-xl sticky top-32">
            <h2 className="text-lg font-bold text-zinc-950 border-b border-zinc-100 pb-3 flex items-center gap-2 mb-4">
              <ShoppingCart className="text-[#e51e25] w-5 h-5" /> Basket
            </h2>

            {cartItems.length > 0 ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-zinc-600">{item.name} <span className="text-zinc-400">x{item.quantity}</span></span>
                      <span className="text-zinc-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-100 pt-3 flex justify-between items-center text-sm font-semibold">
                  <span className="text-zinc-500">Snacks Total</span>
                  <span className="text-zinc-900">₹{cartTotal}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1">Screen/Auditorium</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Screen 2"
                      value={screenNum}
                      onChange={(e) => setScreenNum(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-sm bg-zinc-50 border border-zinc-200 focus:border-[#e51e25] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1">Seat Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. F7"
                      value={seatNum}
                      onChange={(e) => setSeatNum(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-sm bg-zinc-50 border border-zinc-200 focus:border-[#e51e25] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#e51e25] hover:bg-[#c4161c] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer mt-4"
                >
                  Pay ₹{cartTotal} with Stripe
                </button>
              </form>
            ) : (
              <p className="text-sm text-zinc-400 text-center py-6">Your basket is empty. Add some combos to order!</p>
            )}
          </div>

          {/* Active Orders Tracker Card */}
          {activeOrders.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-zinc-950 border-b border-zinc-100 pb-3 flex items-center gap-2 mb-4">
                <Compass className="text-[#e51e25] w-5 h-5" /> Live Delivery Tracker
              </h2>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {activeOrders.map((order, idx) => {
                  const status = getStatusLabel(order.status || "placed");
                  return (
                    <div key={idx} className="border border-zinc-100 p-4 rounded-2xl bg-zinc-50 flex flex-col gap-2 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-zinc-500">Order: #{order.id.slice(-6)}</span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                      
                      <div className="text-xs text-zinc-700 font-semibold leading-normal">
                        <p><span className="text-zinc-400">Seat:</span> {order.seat} ({order.screen})</p>
                        <p className="mt-1"><span className="text-zinc-400">Items:</span> {order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FoodOrder;
