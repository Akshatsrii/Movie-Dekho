import React, { useState, useEffect } from "react";
import { Film, Clock, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { dummyShowsData } from "../../assets/assets";
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

export default function ListShows() {
  const { getToken, axios } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalShows: 0,
    totalBookings: 0,
    totalEarnings: 0
  });

  const getAllShows = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        const fetchedShows = data.shows || [];
        setShows(fetchedShows);

        const totalBookings = fetchedShows.reduce(
          (sum, show) => sum + Object.keys(show.occupiedSeats || {}).length, 
          0
        );
        const totalEarnings = fetchedShows.reduce(
          (sum, show) => sum + (Object.keys(show.occupiedSeats || {}).length * (show.showPrice || 0)), 
          0
        );

        setStats({
          totalShows: fetchedShows.length,
          totalBookings,
          totalEarnings
        });
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf9] text-zinc-900 overflow-hidden relative flex items-center justify-center">
        <BlurCircle position="top-left" />
        <BlurCircle position="top-right" />
        <BlurCircle position="bottom-left" />
        <BlurCircle position="bottom-right" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-[#e51e25] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base text-zinc-500 font-semibold">Loading shows...</p>
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
            List <span className="text-[#e51e25]">Shows</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm">Manage and monitor all your movie shows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Shows</p>
                <p className="text-3xl font-black text-zinc-900">{stats.totalShows}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <Film className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Bookings</p>
                <p className="text-3xl font-black text-zinc-900">{stats.totalBookings}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <Users className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Earnings</p>
                <p className="text-3xl font-black text-zinc-900">{currency}{stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-[#e51e25]/10 p-4 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#e51e25]" />
              </div>
            </div>
          </div>
        </div>

        {/* Shows Table */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-zinc-100 bg-white">
            <h2 className="text-xl font-bold flex items-center gap-3 text-zinc-900">
              <Calendar className="w-5 h-5 text-[#e51e25]" />
              All Shows
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-200/60">
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-zinc-400" />
                      Movie
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      Show Time
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-zinc-400" />
                      Bookings
                    </div>
                  </th>
                  <th className="text-left p-5 font-bold text-zinc-500 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-zinc-400" />
                      Earnings
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {shows.map((show, index) => {
                  const bookings = Object.keys(show.occupiedSeats || {}).length;
                  const earnings = bookings * (show.showPrice || 0);

                  return (
                    <tr
                      key={index}
                      className="border-b border-zinc-150 hover:bg-zinc-50/40 transition-all group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={show.movie?.poster_path} 
                            alt={show.movie?.title}
                            className="w-12 h-16 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                            }}
                          />
                          <span className="font-bold text-zinc-800 group-hover:text-[#e51e25] transition-colors">
                            {show.movie?.title || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-zinc-500 text-sm font-semibold">{dateFormat(show.showDateTime)}</td>
                      <td className="p-5">
                        <span className="bg-[#e51e25]/10 text-[#e51e25] px-3.5 py-1.5 rounded-full font-bold text-xs">
                          {bookings} booked
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-green-600 font-extrabold text-lg">
                          {currency}{earnings.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}