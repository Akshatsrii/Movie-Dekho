import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Plus, Minus, ShoppingBag, ArrowLeft, Ticket, Lock } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useUser, useClerk } from "@clerk/clerk-react";

const snackItems = [
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

const SelectSnacks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, date } = useParams();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // ✅ Auth guard
  useEffect(() => {
    if (!user) {
      toast("🔒 Please login to continue booking!", {
        icon: "🎬",
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid rgba(229,30,37,0.5)",
          fontWeight: "700",
          borderRadius: "14px",
        },
        duration: 3000,
      });
      openSignIn();
    }
  }, [user]);

  const { selectedTime, selectedSeats = [], show } = location.state || {};

  const [quantities, setQuantities] = useState(
    snackItems.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  if (!show || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf9] text-zinc-800">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">No active booking session found.</p>
          <button onClick={() => navigate("/")} className="px-6 py-2 bg-[#e51e25] text-white rounded-full">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleIncrement = (itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  };

  const ticketsTotal = location.state?.ticketsTotal || (selectedSeats.length * (show.price || 250));
  const ticketPrice = selectedSeats.length > 0 ? (ticketsTotal / selectedSeats.length) : (show.price || 250);

  const snacksTotal = snackItems.reduce(
    (total, item) => total + item.price * quantities[item.id],
    0
  );

  const grandTotal = ticketsTotal + snacksTotal;

  const handleCheckout = () => {
    try {
      const activeSnacks = snackItems
        .filter((item) => quantities[item.id] > 0)
        .map((item) => ({
          name: item.name,
          quantity: quantities[item.id],
          price: item.price,
        }));

      const localBookings = JSON.parse(localStorage.getItem("movie_bookings") || "[]");
      
      const seedBookings = localBookings.length > 0 ? localBookings : [
        {
          _id: "1",
          show: {
            movie: {
              title: "Interstellar",
              runtime: 169,
              poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
              genre: "Sci-Fi, Drama",
            },
            showDateTime: "2025-11-03T19:30:00",
            pricePerSeat: 250,
            theater: "PVR Cinemas, Screen 3",
          },
          bookedSeats: ["A1", "A2", "A3"],
          isPaid: false,
          snacks: []
        },
        {
          _id: "2",
          show: {
            movie: {
              title: "The Dark Knight",
              runtime: 152,
              poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
              genre: "Action, Crime",
            },
            showDateTime: "2025-11-05T21:00:00",
            pricePerSeat: 300,
            theater: "INOX Cinema, Screen 1",
          },
          bookedSeats: ["B5", "B6"],
          isPaid: true,
          snacks: []
        }
      ];

      const newBookingId = String(Date.now());

      const newBooking = {
        _id: newBookingId,
        show: {
          movie: {
            title: show.title,
            runtime: show.runtime || 120,
            poster_path: show.poster_path,
            genre: Array.isArray(show.genre) ? show.genre.join(", ") : show.genre || "Action, Adventure, Sci-Fi",
          },
          showDateTime: `${selectedTime.date}T${selectedTime.time}`,
          pricePerSeat: ticketPrice,
          theater: show.theater || "PVR Cinemas, Screen 3",
        },
        bookedSeats: selectedSeats,
        isPaid: false,
        snacks: activeSnacks,
      };

      seedBookings.push(newBooking);
      localStorage.setItem("movie_bookings", JSON.stringify(seedBookings));
      
      toast.success("Proceeding to Stripe payment secure checkout...");
      navigate("/payment", {
        state: {
          bookingId: newBookingId,
          amount: grandTotal,
          orderType: "booking"
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to compile checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-16 lg:px-24 xl:px-40 bg-[#fffaf9] text-zinc-950 relative overflow-hidden">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-100px" right="-100px" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 left-6 md:left-16 flex items-center gap-1 text-zinc-500 hover:text-[#e51e25] transition z-10 font-bold cursor-pointer animate-pulse"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Seats
      </button>

      <div className="relative max-w-7xl mx-auto z-10 mt-6 flex flex-col lg:flex-row gap-10">
        
        {/* Left: Snacks Menu */}
        <div className="flex-1">
          <div className="mb-8">
            <span className="px-3 py-1 bg-[#e51e25]/15 border border-[#e51e25]/25 text-[#e51e25] text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              Food & Beverage Menu
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950">
              Add Snacks to Your Show
            </h1>
          </div>

          <div className="space-y-12">
            {["Popcorn", "Drinks", "Snacks"].map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-extrabold border-b border-zinc-200 pb-2 mb-6 text-zinc-900 tracking-tight">
                  {category}
                </h2>
                
                {/* Visual Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {snackItems
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

                        {/* Card Details */}
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

        {/* Right: Checkout summary panel */}
        <div className="w-full lg:w-96">
          <div className="bg-white border border-[#e51e25]/20 rounded-3xl p-6 md:p-8 shadow-xl sticky top-32 flex flex-col gap-6">
            <h2 className="text-xl font-extrabold text-zinc-950 border-b border-zinc-100 pb-3 flex items-center gap-2">
              <Ticket className="text-[#e51e25] w-5 h-5" /> Booking Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-500">Movie Title</span>
                <span className="text-zinc-900 text-right">{show.title}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-500">Selected Seats</span>
                <span className="text-[#e51e25] font-bold">{selectedSeats.join(", ")}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-500">Tickets Total</span>
                <span className="text-zinc-900">₹{ticketsTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-500">Snacks Total</span>
                <span className="text-zinc-900">₹{snacksTotal}</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
              <span className="font-extrabold text-zinc-900">Total Payable</span>
              <span className="text-2xl font-black text-[#e51e25]">₹{grandTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#e51e25] hover:bg-[#c4161c] text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_6px_20px_rgba(229,30,37,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShoppingBag className="w-5 h-5" /> Proceed to Stripe Pay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SelectSnacks;
