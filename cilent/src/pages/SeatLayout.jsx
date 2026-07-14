import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ClockIcon, Armchair, Eye, X, Lock } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useUser, useClerk } from "@clerk/clerk-react";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"], // Royal
    ["C", "D"], // Premium
    ["E", "F"], // Premium
    ["G", "H"], // Classic
    ["I", "J"], // Classic
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [previewSeat, setPreviewSeat] = useState(null); // Unique 3D Preview State
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // ✅ Auth guard: redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      toast("🔒 Please login to select seats & book tickets!", {
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

  const timings = dummyDateTimeData[date] && dummyDateTimeData[date].length > 0
    ? dummyDateTimeData[date]
    : [
        { time: `${date}T09:00:00.000Z`, showId: `dynamic_${date}_9` },
        { time: `${date}T12:30:00.000Z`, showId: `dynamic_${date}_12` },
        { time: `${date}T15:45:00.000Z`, showId: `dynamic_${date}_15` },
        { time: `${date}T19:00:00.000Z`, showId: `dynamic_${date}_19` },
      ];

  useEffect(() => {
    const movieShow = dummyShowsData.find((item) => item.id === parseInt(id));
    if (movieShow) setShow(movieShow);
  }, [id]);

  useEffect(() => {
    if (timings && timings.length > 0) {
      setSelectedTime(timings[0]);
    }
  }, [date]);

  const handleSeatClick = (seatId) => {
    if (!user) {
      toast("🔒 Login required to select seats!", {
        style: { background: "#111", color: "#fff", border: "1px solid rgba(229,30,37,0.5)", fontWeight: "700", borderRadius: "14px" },
        duration: 2500,
      });
      openSignIn();
      return;
    }
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select up to 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatTier = (seatId) => {
    const row = seatId.charAt(0);
    if (["A", "B"].includes(row)) {
      return {
        name: "Royal Recliner",
        price: 450,
        colorClass: "bg-amber-500/10 border-amber-400 hover:bg-amber-500/20 text-amber-900",
        selectedClass: "bg-amber-500 border-amber-600 text-white shadow-lg ring-4 ring-amber-300 scale-105"
      };
    }
    if (["C", "D", "E", "F"].includes(row)) {
      return {
        name: "Premium Seat",
        price: 300,
        colorClass: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-900",
        selectedClass: "bg-purple-600 border-purple-700 text-white shadow-lg ring-4 ring-purple-300 scale-105"
      };
    }
    return {
      name: "Classic Seat",
      price: 200,
      colorClass: "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-900",
      selectedClass: "bg-[#e51e25] border-[#c4161c] text-white shadow-lg ring-4 ring-red-300 scale-105"
    };
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const tier = getSeatTier(seatId);
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-9 w-9 rounded-lg border cursor-pointer text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                isSelected ? tier.selectedClass : tier.colorClass
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  // Dynamic 3D CSS perspective transforms mapping row and column
  const get3DTransforms = (seatId) => {
    if (!seatId) return {};
    const row = seatId.charAt(0);
    const colNum = parseInt(seatId.slice(1));
    
    const rowsList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rowIndex = rowsList.indexOf(row);
    
    // Scale size depending on depth distance from screen
    const scale = 1.3 - (rowIndex * 0.05); // closer Row A = 1.3, further Row J = 0.85
    // Vertical tilt mapping looking up
    const rotateX = 14 - (rowIndex * 1.5); // Row A = 14deg, Row J = -1deg
    // Horizontal skew mapping column angles
    const rotateY = (colNum - 5) * 4.5; // col 1 = -18deg, col 9 = 18deg
    
    return {
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    };
  };

  const getSeatViewDiagnostics = (seatId) => {
    if (!seatId) return "";
    const row = seatId.charAt(0);
    const colNum = parseInt(seatId.slice(1));
    
    let depthText = "";
    if (["A", "B"].includes(row)) {
      depthText = "Royal Recliner (Front Area): Close viewing distance with immersive scaling. High horizontal coverage, requires looking slightly upwards.";
    } else if (["C", "D", "E", "F"].includes(row)) {
      depthText = "Premium (Middle Area): Recommended cinematic sweet spot depth. The screen comfort-fills your field of vision perfectly.";
    } else {
      depthText = "Classic (Rear Area): Relaxing wide-angle coverage of the entire screen, with zero neck strain. Great overview.";
    }
    
    let angleText = "";
    if (colNum >= 4 && colNum <= 6) {
      angleText = "Centered Sweet Spot: Zero viewing angle skew. The audio acoustics and spatial visuals are perfectly balanced.";
    } else if (colNum <= 3) {
      angleText = "Left Wing: Angle is skewed to the right side of the screen. Best for close-up detail, but expect slight parallax.";
    } else {
      angleText = "Right Wing: Angle is skewed to the left side of the screen. Best for close-up detail, but expect slight parallax.";
    }
    
    return `${depthText} ${angleText}`;
  };

  if (!show) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-zinc-900 bg-[#fffaf9]">
        Loading show details...
      </div>
    );
  }

  const seatDetails = selectedSeats.map(seatId => getSeatTier(seatId));
  const calculatedTotal = seatDetails.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-24 xl:px-40 py-10 md:pt-32 min-h-screen relative bg-[#fffaf9] text-zinc-950 gap-8">
      {/* Left Column: Movie card & timings */}
      <div className="w-full md:w-64 flex flex-col gap-6 md:sticky md:top-32 h-max mb-8 md:mb-0 z-10">
        
        <div className="bg-white border border-zinc-150 rounded-2xl p-4 shadow-md flex flex-row md:flex-col gap-4 items-center md:items-start">
          <img
            src={show.poster_path}
            alt={show.title}
            className="w-20 md:w-full h-28 md:h-44 object-cover rounded-xl shadow-sm border border-zinc-100"
          />
          <div>
            <h2 className="text-lg font-bold text-zinc-900 leading-tight">
              {show.title}
            </h2>
            <p className="text-xs text-[#e51e25] font-semibold mt-1">
              {Array.isArray(show.genre) ? show.genre.join(", ") : show.genre || "Action, Sci-Fi"}
            </p>
            <p className="text-xs text-zinc-450 mt-1">
              {show.runtime} mins
            </p>
          </div>
        </div>

        <div className="bg-[#e51e25]/5 border border-[#e51e25]/20 rounded-2xl py-6 px-4 text-zinc-900 shadow-md">
          <p className="text-lg font-bold px-2 text-[#e51e25]">Available Timings</p>
          <div className="mt-5 space-y-2">
            {timings.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer transition text-left w-full ${
                  selectedTime?.time === item.time
                    ? "bg-[#e51e25] text-white shadow-md shadow-red-900/30"
                    : "bg-[#e51e25]/10 text-zinc-900 hover:bg-[#e51e25]/20"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {isoTimeFormat(item.time)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Tiered Seat Layout Map */}
      <div className="relative flex-1 flex flex-col items-center mt-4 md:mt-0 z-10">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        
        <h1 className="text-2xl font-black mb-4 text-zinc-900 tracking-tight">
          Select Your Seat
        </h1>
        <img src={assets.screenImage} alt="screen" className="mb-1 filter invert brightness-90" />
        <p className="text-zinc-455 text-[10px] tracking-widest mb-4">SCREEN DIRECTIONS</p>

        {/* Pricing Category Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 bg-white border border-zinc-150 p-4 rounded-2xl shadow-sm text-xs font-bold text-zinc-700">
          <div className="flex items-center gap-2 border-r border-zinc-150 pr-4">
            <div className="w-5 h-5 rounded bg-amber-500" />
            <span>Royal Recliner (A-B) <span className="text-amber-600">₹450</span></span>
          </div>
          <div className="flex items-center gap-2 border-r border-zinc-150 pr-4">
            <div className="w-5 h-5 rounded bg-purple-600" />
            <span>Premium Seat (C-F) <span className="text-purple-600">₹300</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#e51e25]" />
            <span>Classic Seat (G-J) <span className="text-[#e51e25]">₹200</span></span>
          </div>
        </div>

        {/* Seats Grid mapping */}
        <div className="flex flex-col items-center mt-4 text-xs text-zinc-800 bg-white border border-zinc-150 p-6 rounded-3xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-10">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Proceed details */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-zinc-650 flex items-center gap-1.5 flex-wrap justify-center">
              <span>Selected: <span className="text-zinc-900 font-extrabold">{selectedSeats.join(", ")}</span> | Total: <span className="text-[#e51e25] font-black">₹{calculatedTotal}</span></span>
              
              {/* Unique 3D Preview Trigger Button */}
              <button
                onClick={() => setPreviewSeat(selectedSeats[selectedSeats.length - 1])}
                className="ml-3 px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-full font-bold text-[10px] flex items-center gap-1 cursor-pointer transition shadow-sm hover:scale-105 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" /> Preview 3D Screen View from Seat {selectedSeats[selectedSeats.length - 1]}
              </button>
            </p>
          </div>
        )}

        <button
          onClick={() => {
            if (!selectedTime || selectedSeats.length === 0) {
              toast.error("Please select time and at least one seat");
              return;
            }
            navigate(`/movies/${id}/${date}/snacks`, {
              state: {
                selectedTime,
                selectedSeats,
                show,
                ticketsTotal: calculatedTotal
              }
            });
          }}
          className="mt-6 bg-[#e51e25] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#c4161c] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_rgba(229,30,37,0.35)] flex items-center gap-2 cursor-pointer text-sm"
        >
          Select Food & Beverages →
        </button>
      </div>

      {/* UNIQUE PERSPECTIVE 3D SCREEN VIEW MODAL */}
      {previewSeat && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150] flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full max-w-3xl bg-zinc-950 rounded-3xl p-6 md:p-8 border border-zinc-800 shadow-2xl flex flex-col items-center gap-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center w-full border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
                <h3 className="font-extrabold text-white text-base md:text-lg">
                  Screen Viewing Angle: <span className="text-[#e51e25] font-black">{previewSeat}</span>
                </h3>
              </div>
              <button
                onClick={() => setPreviewSeat(null)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D Theatre Simulator Area */}
            <div className="w-full h-64 md:h-80 bg-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden border border-zinc-800 relative shadow-inner [perspective:800px]">
              
              {/* Cinema Walls Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(229,30,37,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,30,37,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Dynamic 3D Simulated Screen */}
              <div
                className="w-80 md:w-[28rem] aspect-video bg-zinc-950 rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800 transition-all duration-500 flex flex-col relative"
                style={get3DTransforms(previewSeat)}
              >
                {/* Active movie visual on the preview screen! */}
                <img
                  src={show.poster_path}
                  alt="active-visual"
                  className="w-full h-full object-cover opacity-60 filter blur-[1px] transform scale-110"
                />
                
                {/* Cinema Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-4 text-center">
                  <span className="text-[10px] text-zinc-400 font-extrabold tracking-widest uppercase">Now Screening</span>
                  <h4 className="text-white font-black text-sm md:text-base leading-tight mt-0.5">{show.title}</h4>
                </div>
              </div>

              {/* Theatre floor / screen border shadows */}
              <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Diagnostics Report Analyzer */}
            <div className="w-full bg-[#fffaf9]/5 border border-zinc-850 p-4 rounded-xl text-left text-xs md:text-sm leading-relaxed text-zinc-400 font-medium">
              <p className="font-extrabold text-[#e51e25] mb-1.5 uppercase text-[10px] tracking-wider">Viewing Angle Comfort Assessment</p>
              <span>{getSeatViewDiagnostics(previewSeat)}</span>
            </div>

            {/* Confirm button */}
            <button
              onClick={() => setPreviewSeat(null)}
              className="px-6 py-2 bg-[#e51e25] hover:bg-[#c4161c] text-white font-bold rounded-xl text-xs shadow hover:scale-105 transition cursor-pointer"
            >
              Keep This Seat Selection
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default SeatLayout;
