import React, { useState, useEffect } from "react";
import { User, Film, Calendar, DollarSign, Armchair, TrendingUp, Users, Ticket } from 'lucide-react';

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
      const localBookings = JSON.parse(localStorage.getItem("movie_bookings") || "[]");
      const formattedBookings = localBookings.map(b => ({
        user: { name: "Akshat Srivastav" },
        show: { movie: { title: b.show.movie.title } },
        seats: b.bookedSeats,
        totalAmount: b.bookedSeats.length * b.show.pricePerSeat + (b.snacks || []).reduce((t, s) => t + s.price * s.quantity, 0),
        createdAt: b.show.showDateTime,
        isPaid: b.isPaid
      }));

      const localFood = JSON.parse(localStorage.getItem("theater_food_orders") || "[]");
      const formattedFood = localFood.map(o => ({
        user: { name: "Akshat Srivastav" },
        show: { movie: { title: `F&B Delivery (${o.screen})` } },
        seats: [`Seat ${o.seat}`],
        totalAmount: o.amount,
        createdAt: new Date().toISOString(),
        isPaid: true
      }));

      const combined = [...formattedBookings, ...formattedFood];
      const dataToUse = combined.length > 0 ? combined : dummyBookingData;
      
      setBookings(dataToUse);
      
      // Calculate stats
      const totalRevenue = dataToUse.reduce((sum, b) => sum + b.totalAmount, 0);
      const totalSeats = dataToUse.reduce((sum, b) => sum + (b.seats ? b.seats.length : 0), 0);
      
      setStats({
        totalBookings: dataToUse.length,
        totalRevenue,
        totalSeats
      });
      
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden relative flex items-center justify-center">
        <BlurCircle position="top-left" />
        <BlurCircle position="top-right" />
        <BlurCircle position="bottom-left" />
        <BlurCircle position="bottom-right" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden relative">
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            List <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-2">View and manage all customer bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <Ticket className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-white">{currency} {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Seats Booked</p>
                <p className="text-3xl font-bold text-white">{stats.totalSeats}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <Armchair className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-gradient-to-br from-gray-800/50 to-red-950/50 backdrop-blur-xl rounded-3xl border border-red-900/50 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-red-900/50">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-red-500" />
              All Bookings
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-900/30 border-b border-red-900/50">
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User Name
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      Movie Name
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Armchair className="w-4 h-4" />
                      Seats
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Amount
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-b border-red-900/20 hover:bg-red-900/20 transition-all"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="font-semibold text-white">{booking.user?.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-300">{booking.show?.movie?.title || "N/A"}</td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-1">
                        {(booking.seats || []).map((seat, i) => (
                          <span key={i} className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs font-medium">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-green-400 font-bold text-lg">
                        {currency} {booking.totalAmount?.toLocaleString() || 0}
                      </span>
                    </td>
                    <td className="p-5 text-gray-300 text-sm">{dateFormat(booking.createdAt || new Date())}</td>
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