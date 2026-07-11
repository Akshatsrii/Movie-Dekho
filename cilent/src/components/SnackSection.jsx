import React, { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const combos = [
  {
    id: 1,
    name: "Classic Movie Combo",
    description: "Large popcorn + 1 Large Pepsi (750ml)",
    price: 320,
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Cheesy Nachos Combo",
    description: "Cheese Loaded Nachos + 1 Pepsi + Chocolate bar",
    price: 410,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80",
    badge: "Popular"
  },
  {
    id: 3,
    name: "Couple Tub Combo",
    description: "Jumbo Cheese Popcorn + 2 Coke + 2 Ice Creams",
    price: 580,
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80",
    badge: "Big Saver"
  }
];

const SnackSection = () => {
  const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0 });

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const handlePrebook = () => {
    const activeItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    if (activeItems.length === 0) {
      toast.error("Please add at least one combo first!");
      return;
    }
    
    let total = 0;
    activeItems.forEach(([id, qty]) => {
      const combo = combos.find(c => c.id === parseInt(id));
      total += combo.price * qty;
    });

    toast.success(`Snacks added! Pre-booked total: ₹${total}. You will collect this at the theater counter!`);
    setQuantities({ 1: 0, 2: 0, 3: 0 });
  };

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 bg-[#fffaf9] overflow-hidden">
      {/* Inline styles for snack cards & buttons polish */}
      <style>{`
        .snack-card {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.4s ease;
        }
        .snack-card:hover {
          border-color: rgba(229,30,37,0.4);
          box-shadow: 0 20px 38px rgba(0,0,0,0.06);
          transform: translateY(-6px);
        }
        .snack-img-container {
          position: relative;
          overflow: hidden;
        }
        .snack-img {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .snack-card:hover .snack-img {
          transform: scale(1.06);
        }
        .snack-btn-main {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .snack-btn-main::before {
          content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
        }
        .snack-btn-main:hover::before {
          animation: snackBtnShine 1.5s ease-in-out infinite;
        }
        @keyframes snackBtnShine { 0% { left: -75%; } 100% { left: 125%; } }
      `}</style>

      <div className="pointer-events-none absolute top-12 -left-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />
      <div className="pointer-events-none absolute bottom-12 -right-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3.5 py-1.5 bg-[#e51e25]/10 border border-[#e51e25]/20 text-[#e51e25] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            🍿 Pre-book & Save
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3 select-none">
            Grab Your Favorite Cinema Snacks
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl">
            Pre-book movie combos online at a special discounted price and skip the long queue at the theater counter!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="snack-card bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div className="snack-img-container h-48 w-full">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="snack-img w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#e51e25] text-white text-xxs font-extrabold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                  {combo.badge}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-1">{combo.name}</h3>
                  <p className="text-sm text-zinc-400 font-medium leading-normal">{combo.description}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-extrabold text-[#e51e25]">₹{combo.price}</span>

                  <div className="flex items-center border border-zinc-200/80 rounded-xl overflow-hidden bg-zinc-50/50 shadow-sm">
                    <button
                      onClick={() => handleDecrement(combo.id)}
                      className="px-3 py-2 hover:bg-zinc-200/50 transition-colors text-zinc-500 hover:text-zinc-800 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3.5 font-bold text-zinc-800 text-sm select-none">
                      {quantities[combo.id]}
                    </span>
                    <button
                      onClick={() => handleIncrement(combo.id)}
                      className="px-3 py-2 hover:bg-zinc-200/50 transition-colors text-zinc-500 hover:text-zinc-800 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <button
            onClick={handlePrebook}
            className="snack-btn-main group flex items-center gap-2 px-9 py-4 bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold cursor-pointer shadow-[0_6px_22px_rgba(229,30,37,0.35)]"
          >
            <ShoppingCart className="w-4 h-4" />
            Pre-book Snacks Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnackSection;
