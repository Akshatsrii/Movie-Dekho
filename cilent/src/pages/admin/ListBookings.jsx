import React, { useState, useEffect } from "react";
import { User, Film, Calendar, DollarSign, Armchair, TrendingUp, Users, Ticket } from 'lucide-react';
import { useAppContext } from "../../context/AppContext";

const BlurCircle = ({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
  };

  return (
    <div className={`absolute ${positions[position]} w-96 h-96 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 blur-3xl animate-pulse pointer-events-none`} />
  );
};

const dateFormat = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Enhanced dummy booking data
const dummyBookingData = [
  {
    user: { name: "Rajesh Kumar" },
    show: { movie: { title: "The Simpsons Movie" } },
    seats: ["A1", "A2", "A3"],
    totalAmount: 750,
    createdAt: "2025-11-01T14:30:00.000Z"
  },
  {
    user: { name: "Priya Sharma" },
    show: { movie: { title: "Avatar: The Way of Water" } },
    seats: ["B5", "B6"],
    totalAmount: 700,
    createdAt: "2025-11-01T18:00:00.000Z"
  },
  {
    user: { name: "Amit Patel" },
    show: { movie: { title: "Deadpool & Wolverine" } },
    seats: ["C1", "C2", "C3", "C4"],
    totalAmount: 1200,
    createdAt: "2025-11-02T11:00:00.000Z"
  },
  {
    user: { name: "Sneha Reddy" },
    show: { movie: { title: "The Batman" } },
    seats: ["D7", "D8"],
    totalAmount: 560,
    createdAt: "2025-11-02T15:30:00.000Z"
  },
  {
    user: { name: "Vikram Singh" },
    show: { movie: { title: "Venom: The Last Dance" } },
    seats: ["E1", "E2", "E3", "E4", "E5"],
    totalAmount: 1600,
    createdAt: "2025-11-02T19:00:00.000Z"
  },
  {
    user: { name: "Anjali Mehta" },
    show: { movie: { title: "Oppenheimer" } },
    seats: ["F10", "F11"],
    totalAmount: 800,
    createdAt: "2025-11-03T12:00:00.000Z"
  },
  {
    user: { name: "Rohan Gupta" },
    show: { movie: { title: "Dune: Part Two" } },
    seats: ["G3", "G4", "G5"],
    totalAmount: 1140,
    createdAt: "2025-11-03T16:30:00.000Z"
  },
  {
    user: { name: "Kavya Iyer" },
    show: { movie: { title: "Barbie" } },
    seats: ["H1"],
    totalAmount: 270,
    createdAt: "2025-11-03T20:00:00.000Z"
  },
  {
    user: { name: "Arjun Nair" },
    show: { movie: { title: "Guardians of the Galaxy Vol. 3" } },
    seats: ["I5", "I6", "I7"],
    totalAmount: 870,
    createdAt: "2025-11-04T14:00:00.000Z"
  },
  {
    user: { name: "Divya Kapoor" },
    show: { movie: { title: "Mission: Impossible" } },
    seats: ["J8", "J9"],
    totalAmount: 620,
    createdAt: "2025-11-04T17:30:00.000Z"
  },
  {
    user: { name: "Karan Malhotra" },
    show: { movie: { title: "Spider-Man: Across the Spider-Verse" } },
    seats: ["K1", "K2", "K3", "K4"],
    totalAmount: 1320,
    createdAt: "2025-11-04T21:00:00.000Z"
  },
  {
    user: { name: "Pooja Desai" },
    show: { movie: { title: "John Wick: Chapter 4" } },
    seats: ["L5", "L6"],
    totalAmount: 590,
    createdAt: "2025-11-05T13:00:00.000Z"
  },
  {
    user: { name: "Sanjay Verma" },
    show: { movie: { title: "The Simpsons Movie" } },
    seats: ["M1", "M2", "M3", "M4", "M5"],
    totalAmount: 1250,
    createdAt: "2025-11-05T16:00:00.000Z"
  },
  {
    user: { name: "Neha Agarwal" },
    show: { movie: { title: "Avatar: The Way of Water" } },
    seats: ["N7"],
    totalAmount: 350,
    createdAt: "2025-11-05T19:30:00.000Z"
  },
  {
    user: { name: "Rahul Joshi" },
    show: { movie: { title: "Deadpool & Wolverine" } },
    seats: ["O3", "O4", "O5"],
    totalAmount: 900,
    createdAt: "2025-11-06T12:30:00.000Z"
  }
];

const ListBookings = () => {
  const { getToken, axios } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalSeats: 0
  });

  const getAllBookings = async () => {
    try {
      const token = await getToken();
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch bookings and food orders in parallel
      const [bookingsRes, foodOrdersRes] = await Promise.all([
        axios.get("/api/admin/all-bookings", { headers }),
        axios.get("/api/food-order/all", { headers }).catch(err => {
          console.error("Food orders API failed:", err);
          return { data: { success: false, orders: [] } };
        })
      ]);

      let formattedBookings = [];
      if (bookingsRes.data.success) {
        formattedBookings = (bookingsRes.data.bookings || []).map(b => ({
          user: { name: b.user?.name || "Clerk User" },
          show: { movie: { title: b.show?.movie?.title || "Movie Ticket" } },
          seats: b.bookedSeats || [],
          totalAmount: b.amount || 0,
          createdAt: b.createdAt,
          isPaid: b.isPaid,
          snacks: b.snacks || []
        }));
      }

      let formattedFood = [];
      if (foodOrdersRes.data.success) {
        formattedFood = (foodOrdersRes.data.orders || []).map(o => ({
          user: { name: "Seat Delivery" },
          show: { movie: { title: `F&B Screen: ${o.screen} (Seat ${o.seat})` } },
          seats: o.items ? o.items.map(item => `${item.name} x${item.quantity}`) : ["F&B Order"],
          totalAmount: o.amount || 0,
          createdAt: o.createdAt,
          isPaid: o.isPaid,
          snacks: o.items || []
        }));
      }

      const combined = [...formattedBookings, ...formattedFood];
      setBookings(combined);

      // Calculate stats
      const totalRevenue = combined.reduce((sum, b) => sum + b.totalAmount, 0);
      const totalSeats = formattedBookings.reduce((sum, b) => sum + b.seats.length, 0);

      setStats({
        totalBookings: combined.length,
        totalRevenue,
        totalSeats
      });

    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffaf9] text-zinc-900 overflow-hidden relative flex items-center justify-center">
        <BlurCircle position="top-left" />
        <BlurCircle position="top-right" />
        <BlurCircle position="bottom-left" />
        <BlurCircle position="bottom-right" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-[#e51e25] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base text-zinc-500 font-semibold">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent text-zinc-900 overflow-hidden">
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-1 select-none text-zinc-950">
            List <span className="text-[#e51e25]">Bookings</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm">View and manage all customer bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Bookings</p>
                <p className="text-3xl font-black text-zinc-900">{stats.totalBookings}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <Ticket className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                <p className="text-3xl font-black text-zinc-900">{currency}{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Seats Booked</p>
                <p className="text-3xl font-black text-zinc-900">{stats.totalSeats}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <Armchair className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-zinc-100 bg-white">
            <h2 className="text-xl font-bold flex items-center gap-3 text-zinc-900">
              <Calendar className="w-5 h-5 text-[#e51e25]" />
              All Bookings
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-200/60">
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-zinc-400" />
                      User Name
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-zinc-400" />
                      Movie Name
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Armchair className="w-4 h-4 text-zinc-400" />
                      Seats
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-zinc-400" />
                      Amount
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-150 hover:bg-zinc-50/40 transition-all"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#e51e25]/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-[#e51e25]" />
                        </div>
                        <span className="font-bold text-zinc-800">{booking.user?.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="p-5 text-zinc-500 font-semibold">{booking.show?.movie?.title || "N/A"}</td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-1">
                        {(booking.seats || []).map((seat, i) => (
                          <span key={i} className="bg-[#e51e25]/10 text-[#e51e25] px-2.5 py-1 rounded-md text-xs font-bold">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-green-600 font-extrabold text-lg">
                        {currency}{booking.totalAmount?.toLocaleString() || 0}
                      </span>
                    </td>
                    <td className="p-5 text-zinc-500 text-sm font-semibold">{dateFormat(booking.createdAt || new Date())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBookings;