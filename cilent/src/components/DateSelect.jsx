import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // Normalize input data
  const dates = Array.isArray(dateTime)
    ? dateTime
    : Array.isArray(dateTime?.dates)
    ? dateTime.dates
    : [];

  // ✅ If no dates found, generate next 7 days automatically
  const fallbackDates =
    dates.length > 0
      ? dates
      : Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          return { date: d.toISOString().split("T")[0] };
        });

  const [selectedDate, setSelectedDate] = useState(fallbackDates[0].date);

  const handleBookNow = () => {
    if (!user) {
      toast("🎬 Please login to book movie tickets!", {
        icon: "🔒",
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid rgba(229,30,37,0.5)",
          fontWeight: "600",
          borderRadius: "12px",
        },
        duration: 2800,
      });
      openSignIn();
      return;
    }
    if (selectedDate) {
      // ✅ Navigate to SeatLayout page
      navigate(`/movies/${id}/${selectedDate}`);
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <div className="bg-white border border-[#e51e25]/20 shadow-2xl shadow-red-900/10 rounded-xl p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-zinc-950 text-xl font-bold tracking-wide flex-shrink-0">
          Choose Date
        </p>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 flex-grow">
          <button className="p-2 text-zinc-400 hover:text-[#e51e25] transition duration-200 flex-shrink-0">
            <ChevronLeft className="w-6 h-6" />
          </button>

          {fallbackDates.map((item, index) => {
            const dayNumber = item.date.split("-")[2];
            const monthShort = new Date(item.date).toLocaleString("default", {
              month: "short",
            });

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-center p-2 h-16 w-16 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0 ${
                  selectedDate === item.date
                    ? "bg-[#e51e25] text-white shadow-lg shadow-red-900/40 scale-105"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <span className="text-xl leading-none">{dayNumber}</span>
                <span className="text-xs uppercase">{monthShort}</span>
              </button>
            );
          })}

          <button className="p-2 text-zinc-400 hover:text-[#e51e25] transition duration-200 flex-shrink-0">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleBookNow}
          className="px-10 py-3 bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 rounded-lg text-base font-bold transition-all duration-300 shadow-xl shadow-red-900/30 uppercase tracking-wider flex-shrink-0 flex items-center gap-2"
        >
          {!user && <Lock className="w-4 h-4" />}
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;