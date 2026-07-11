import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Film,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  CreditCard,
  CheckCircle2,
  Compass,
  ShoppingBag,
  Download,
  X,
  Printer
} from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const MyBookings = () => {
  const currency = "₹";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tickets");
  const [bookings, setBookings] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [selectedTicket, setSelectedTicket] = useState(null);

  const timeFormat = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dateFormat = (dateTime) => {
    return new Date(dateTime).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    try {
      const localBookings = JSON.parse(localStorage.getItem("movie_bookings") || "[]");
      if (localBookings.length === 0) {
        const seedBookings = [
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
            snacks: [],
            checkedIn: false
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
            snacks: [
              { name: "Classic Salted Popcorn", quantity: 1, price: 180 },
              { name: "Pepsi Cold Drink (L)", quantity: 2, price: 120 }
            ],
            checkedIn: false
          },
        ];
        localStorage.setItem("movie_bookings", JSON.stringify(seedBookings));
        setBookings(seedBookings);
      } else {
        setBookings(localBookings);
      }

      const localFood = JSON.parse(localStorage.getItem("theater_food_orders") || "[]");
      setFoodOrders(localFood);
    } catch (err) {
      console.error("Failed to parse bookings:", err);
    }

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case "placed": return { text: "Order Placed", color: "text-blue-600 bg-blue-50 border-blue-200" };
      case "preparing": return { text: "Preparing Food", color: "text-amber-600 bg-amber-50 border-amber-200" };
      case "out": return { text: "Out for Seat Delivery", color: "text-purple-600 bg-purple-50 border-purple-200 animate-pulse" };
      case "delivered": return { text: "Delivered to Seat", color: "text-green-600 bg-green-50 border-green-200" };
      default: return { text: "Placed", color: "text-gray-500 bg-gray-50 border-gray-200" };
    }
  };

  const handlePrint = () => {
    toast.success("Opening Print Wizard. Choose Save as PDF to download.");
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf9]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e51e25] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#e51e25] text-lg font-medium animate-pulse">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#fffaf9] text-zinc-950 relative overflow-hidden">
      {/* Dynamic Printing Stylesheet overlay */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-ticket-card, #printable-ticket-card * {
            visibility: visible;
          }
          #printable-ticket-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Soft reddish glow patches */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <Ticket className="w-10 h-10 text-[#e51e25]" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
              My Orders & Bookings
            </h1>
          </div>
          <p className="text-zinc-500 text-base md:text-lg">
            Manage your tickets and direct in-theater seat snack orders.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              activeTab === "tickets"
                ? "bg-[#e51e25] text-white scale-105 shadow-md shadow-red-950/20"
                : "bg-white border border-zinc-200 text-zinc-600 hover:text-black"
            }`}
          >
            🎬 Movie Tickets ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              activeTab === "food"
                ? "bg-[#e51e25] text-white scale-105 shadow-md shadow-red-950/20"
                : "bg-white border border-zinc-200 text-zinc-600 hover:text-black"
            }`}
          >
            🍿 Food Deliveries ({foodOrders.length})
          </button>
        </div>

        {/* Tab Contents: Movie Tickets */}
        {activeTab === "tickets" && (
          bookings.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-150 rounded-3xl shadow-sm">
              <Ticket className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 font-semibold">No movie tickets booked yet.</p>
              <button onClick={() => navigate("/movies")} className="mt-4 px-6 py-2 bg-[#e51e25] text-white rounded-full text-sm font-bold">
                Book Movie Tickets
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {bookings.map((item) => {
                const movie = item.show.movie;
                const showDateTime = item.show.showDateTime;
                const seats = item.bookedSeats;
                const pricePerSeat = item.show.pricePerSeat;
                
                const snacksTotal = (item.snacks || []).reduce((t, s) => t + s.price * s.quantity, 0);
                const totalAmount = (pricePerSeat * seats.length) + snacksTotal;
                const isUpcoming = new Date(showDateTime) > new Date();

                return (
                  <div
                    key={item._id}
                    className="group bg-white border border-[#e51e25]/15 rounded-3xl overflow-hidden shadow-lg shadow-red-950/5 hover:shadow-xl hover:shadow-red-900/10 hover:border-[#e51e25]/30 hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8">
                      {/* Poster */}
                      <div className="relative flex-shrink-0 w-full lg:w-48 h-64 lg:h-72 rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={movie.poster_path}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        {isUpcoming && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            Upcoming
                          </div>
                        )}
                        {item.checkedIn && (
                          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm animate-pulse">
                            Checked In
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 mb-2">
                            {movie.title}
                          </h2>
                          <p className="text-[#e51e25] font-semibold text-sm mb-4">{movie.genre}</p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 text-zinc-700">
                              <Calendar className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                              <div>
                                <p className="text-xs text-zinc-400 font-medium">Date</p>
                                <p className="font-semibold text-zinc-800 text-sm">
                                  {dateFormat(showDateTime)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-700">
                              <Clock className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                              <div>
                                <p className="text-xs text-zinc-400 font-medium">Time</p>
                                <p className="font-semibold text-zinc-800 text-sm">
                                  {timeFormat(showDateTime)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-700">
                              <Film className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                              <div>
                                <p className="text-xs text-zinc-400 font-medium">Theater</p>
                                <p className="font-semibold text-zinc-800 text-sm">
                                  {item.show.theater}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Seats & Booked Snacks */}
                          <div className="flex flex-col sm:flex-row gap-6 mt-4 border-t border-zinc-100 pt-4">
                            <div className="flex items-start gap-3">
                              <Ticket className="w-5 h-5 text-[#e51e25] mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-zinc-400 font-medium mb-2">
                                  Your Seats
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {seats.map((seat) => (
                                    <span
                                      key={seat}
                                      className="bg-[#e51e25]/10 border border-[#e51e25]/20 text-zinc-800 px-3 py-1 rounded-lg text-sm font-semibold"
                                    >
                                      {seat}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {item.snacks && item.snacks.length > 0 && (
                              <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6">
                                <Ticket className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0 transform rotate-90" />
                                <div>
                                  <p className="text-xs text-zinc-400 font-medium mb-2">
                                    Booked F&B
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.snacks.map((snack, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-amber-500/10 border border-amber-500/20 text-zinc-800 px-3 py-1 rounded-lg text-sm font-semibold"
                                      >
                                        {snack.name} <span className="text-[#e51e25] font-bold">x{snack.quantity}</span>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Payment Section */}
                      <div className="flex flex-col justify-between items-stretch lg:items-end min-w-[220px]">
                        <div className="text-left lg:text-right mb-6">
                          <p className="text-zinc-400 text-sm mb-1 font-medium">Total Amount</p>
                          <p className="text-3xl font-extrabold text-[#e51e25]">
                            {currency}
                            {totalAmount}
                          </p>
                          <p className="text-zinc-500 text-xs mt-1">
                            {seats.length} seat(s) booked
                          </p>
                        </div>

                        {!item.isPaid ? (
                          <button
                            onClick={() => navigate("/payment", { state: { bookingId: item._id, amount: totalAmount } })}
                            className="w-full bg-[#e51e25] hover:bg-[#c4161c] text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-red-900/10 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                          >
                            <CreditCard className="w-5 h-5" />
                            Proceed to Pay
                          </button>
                        ) : (
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 font-bold px-6 py-3 rounded-xl">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              Paid
                            </div>
                            <button
                              onClick={() => setSelectedTicket(item)}
                              className="w-full bg-zinc-900 hover:bg-black text-white font-bold px-4 py-2.5 rounded-xl hover:scale-105 transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Printer className="w-4 h-4" /> View & Print E-Ticket
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Tab Contents: Food Deliveries */}
        {activeTab === "food" && (
          foodOrders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-150 rounded-3xl shadow-sm">
              <ShoppingBag className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 font-semibold">No food orders placed yet.</p>
              <button onClick={() => navigate("/food-order")} className="mt-4 px-6 py-2 bg-[#e51e25] text-white rounded-full text-sm font-bold">
                Order Food to Seat
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {foodOrders.map((order) => {
                const steps = [
                  { label: "Placed" },
                  { label: "Preparing" },
                  { label: "On The Way" },
                  { label: "Delivered" }
                ];
                const activeStep = order.status === "preparing" ? 1 : order.status === "out" ? 2 : order.status === "delivered" ? 3 : 0;
                
                return (
                  <div
                    key={order.id}
                    className="bg-white border border-[#e51e25]/15 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-[#e51e25]/30 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-zinc-400">Order ID: #{order.id.slice(-6)}</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-zinc-950 mb-1">
                        In-Theater Seat Delivery
                      </h3>
                      <p className="text-zinc-500 text-sm font-semibold">
                        📍 Screen: <span className="text-zinc-900 font-bold">{order.screen}</span> | Seat: <span className="text-[#e51e25] font-black">{order.seat}</span>
                      </p>

                      <div className="mt-4 border-t border-zinc-100 pt-3">
                        <p className="text-xs text-zinc-400 font-bold mb-2">Snacks Items</p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="bg-amber-500/10 border border-amber-500/20 text-zinc-800 px-3 py-1 rounded-lg text-xs font-bold"
                            >
                              {item.name} <span className="text-[#e51e25] font-extrabold">x{item.quantity}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Visual Stepper Tracker Timeline */}
                      <div className="mt-6 w-full max-w-md bg-zinc-50 border border-zinc-150 p-4 rounded-2xl">
                        <p className="text-[10px] text-zinc-400 font-bold mb-3 uppercase tracking-wider">Delivery Tracker Timeline</p>
                        <div className="flex items-center justify-between relative mt-2">
                          <div className="absolute top-3 left-4 right-4 h-1 bg-zinc-200 z-0 rounded-full" />
                          <div
                            className="absolute top-3 left-4 h-1 bg-green-500 z-0 rounded-full transition-all duration-500"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 92}%` }}
                          />

                          {steps.map((step, idx) => {
                            const isCompleted = idx < activeStep;
                            const isActive = idx === activeStep;
                            return (
                              <div key={idx} className="flex flex-col items-center z-10 relative w-16">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 border-2 ${
                                    isCompleted
                                      ? "bg-green-500 border-green-600 text-white"
                                      : isActive
                                      ? "bg-[#e51e25] border-[#c4161c] text-white ring-4 ring-red-100 scale-110 animate-pulse"
                                      : "bg-white border-zinc-200 text-zinc-400"
                                  }`}
                                >
                                  {isCompleted ? "✓" : idx + 1}
                                </div>
                                <span
                                  className={`text-[9px] font-extrabold mt-1.5 transition-colors ${
                                    isCompleted || isActive ? "text-zinc-900" : "text-zinc-450"
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 w-full md:w-auto flex-shrink-0">
                      <p className="text-zinc-400 text-sm font-medium">Paid via Stripe</p>
                      <p className="text-3xl font-black text-zinc-900">
                        {currency}
                        {order.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

      </div>

      {/* E-TICKET DOWNLOAD MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="relative max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 p-2 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Area Wrap */}
            <div id="printable-ticket-card" className="w-full bg-white p-6 flex flex-col items-center border border-zinc-200 rounded-3xl">
              
              {/* Ticket Brand Banner */}
              <div className="flex flex-col items-center text-center border-b-2 border-dashed border-zinc-200 pb-4 w-full">
                <span className="text-2xl font-black tracking-tight text-[#e51e25]">MOVIE DEKHO</span>
                <span className="text-[10px] text-zinc-400 font-extrabold tracking-wider uppercase">Electronic Booking Receipt</span>
              </div>

              {/* Ticket Body details */}
              <div className="py-5 w-full flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-black text-zinc-900 leading-tight">{selectedTicket.show.movie.title}</h3>
                    <p className="text-xs text-[#e51e25] font-bold mt-0.5">{selectedTicket.show.movie.genre}</p>
                  </div>
                  <div className="flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden border border-zinc-100 shadow-sm">
                    <img
                      src={selectedTicket.show.movie.poster_path}
                      alt="poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-3 grid grid-cols-2 gap-3 text-xs font-semibold text-zinc-600">
                  <div>
                    <p className="text-[10px] text-zinc-400">THEATER</p>
                    <p className="text-zinc-800 leading-tight mt-0.5">{selectedTicket.show.theater}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400">SEAT NUMBERS</p>
                    <p className="text-zinc-900 font-black leading-tight mt-0.5">{selectedTicket.bookedSeats.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400">SHOW DATE</p>
                    <p className="text-zinc-800 leading-tight mt-0.5">{dateFormat(selectedTicket.show.showDateTime)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400">SHOW TIME</p>
                    <p className="text-zinc-800 leading-tight mt-0.5">{timeFormat(selectedTicket.show.showDateTime)}</p>
                  </div>
                </div>

                {selectedTicket.snacks && selectedTicket.snacks.length > 0 && (
                  <div className="border-t border-zinc-100 pt-3">
                    <p className="text-[10px] text-zinc-400 font-bold mb-1">FOOD & BEVERAGES</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTicket.snacks.map((s, idx) => (
                        <span key={idx} className="bg-amber-500/10 border border-amber-500/20 text-zinc-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {s.name} x{s.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dotted Tear line */}
              <div className="relative w-full flex items-center justify-center my-2 border-t-2 border-dashed border-zinc-200">
                <div className="absolute -left-9 w-6 h-6 rounded-full bg-zinc-800/20 md:bg-black/60" />
                <div className="absolute -right-9 w-6 h-6 rounded-full bg-zinc-800/20 md:bg-black/60" />
              </div>

              {/* QR Code Section */}
              <div className="py-4 flex flex-col items-center w-full">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    window.location.origin + "/checkin/" + selectedTicket._id
                  )}`}
                  alt="checkin-qr"
                  className="w-36 h-36 border border-zinc-200 p-2 bg-white rounded-xl shadow-inner"
                />
                
                <p className="text-[9px] text-zinc-400 mt-2 font-bold uppercase tracking-wider">
                  Scan QR at Entry Gate to Check-In
                </p>

                {selectedTicket.checkedIn && (
                  <div className="mt-2 text-xs font-extrabold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 animate-pulse">
                    ✓ Checked In Gate Entry
                  </div>
                )}
              </div>

              {/* Barcode representation */}
              <div className="w-full flex flex-col items-center border-t border-zinc-100 pt-4 mt-2">
                <div className="h-8 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_6px)] w-48 opacity-80" />
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest mt-1">MD-{selectedTicket._id.slice(-8).toUpperCase()}</span>
              </div>

            </div>

            {/* Print/Download Button inside Modal Footer */}
            <div className="w-full p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3 no-print">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-[#e51e25] hover:bg-[#c4161c] text-white rounded-xl font-bold text-sm shadow-md hover:scale-105 transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF / Print
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
