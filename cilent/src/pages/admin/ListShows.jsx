import React, { useState, useEffect } from "react";
import { Film, Clock, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { dummyShowsData } from "../../assets/assets";


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
      // Enhanced dummy data with multiple shows
      const dummyShows = [
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-11-05T14:30:00.000Z",
          showPrice: 250,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", B1: "user_3", B2: "user_4",
            C1: "user_5", C2: "user_6", D1: "user_7", D2: "user_8"
          }
        },
        {
          movie: dummyShowsData[1],
          showDateTime: "2025-11-05T18:00:00.000Z",
          showPrice: 350,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", A3: "user_3", B1: "user_4",
            B2: "user_5", C1: "user_6", C2: "user_7", D1: "user_8",
            D2: "user_9", E1: "user_10", E2: "user_11", F1: "user_12"
          }
        },
        {
          movie: dummyShowsData[2],
          showDateTime: "2025-11-06T11:00:00.000Z",
          showPrice: 300,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", B1: "user_3", C1: "user_4", D1: "user_5"
          }
        },
        {
          movie: dummyShowsData[3],
          showDateTime: "2025-11-06T15:30:00.000Z",
          showPrice: 280,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", A3: "user_3", B1: "user_4",
            B2: "user_5", C1: "user_6", C2: "user_7"
          }
        },
        {
          movie: dummyShowsData[4],
          showDateTime: "2025-11-06T19:00:00.000Z",
          showPrice: 320,
          occupiedSeats: {
            A1: "user_1", B1: "user_2", C1: "user_3", D1: "user_4",
            E1: "user_5", F1: "user_6", G1: "user_7", H1: "user_8",
            I1: "user_9", J1: "user_10"
          }
        },
        {
          movie: dummyShowsData[5],
          showDateTime: "2025-11-07T12:00:00.000Z",
          showPrice: 400,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", A3: "user_3", A4: "user_4",
            B1: "user_5", B2: "user_6", B3: "user_7", B4: "user_8",
            C1: "user_9", C2: "user_10", C3: "user_11", C4: "user_12",
            D1: "user_13", D2: "user_14", D3: "user_15"
          }
        },
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-11-07T16:30:00.000Z",
          showPrice: 250,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", B1: "user_3", B2: "user_4"
          }
        },
        {
          movie: dummyShowsData[1],
          showDateTime: "2025-11-07T20:00:00.000Z",
          showPrice: 350,
          occupiedSeats: {
            A1: "user_1", A2: "user_2", A3: "user_3", A4: "user_4",
            B1: "user_5", B2: "user_6", C1: "user_7", C2: "user_8"
          }
        }
      ];

      setShows(dummyShows);

      // Calculate stats
      const totalBookings = dummyShows.reduce(
        (sum, show) => sum + Object.keys(show.occupiedSeats || {}).length, 
        0
      );
      const totalEarnings = dummyShows.reduce(
        (sum, show) => sum + (Object.keys(show.occupiedSeats || {}).length * show.showPrice), 
        0
      );

      setStats({
        totalShows: dummyShows.length,
        totalBookings,
        totalEarnings
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden relative flex items-center justify-center">
        <BlurCircle position="top-left" />
        <BlurCircle position="top-right" />
        <BlurCircle position="bottom-left" />
        <BlurCircle position="bottom-right" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading shows...</p>
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
            List <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Shows</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage and monitor all your movie shows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Shows</p>
                <p className="text-3xl font-bold text-white">{stats.totalShows}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <Film className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <Users className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-white">{currency} {stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Shows Table */}
        <div className="bg-gradient-to-br from-gray-800/50 to-red-950/50 backdrop-blur-xl rounded-3xl border border-red-900/50 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-red-900/50">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-red-500" />
              All Shows
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-900/30 border-b border-red-900/50">
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      Movie
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Show Time
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Bookings
                    </div>
                  </th>
                  <th className="text-left p-5 font-semibold text-gray-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
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
                      className="border-b border-red-900/20 hover:bg-red-900/20 transition-all group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={show.movie?.poster_path} 
                            alt={show.movie?.title}
                            className="w-12 h-16 rounded-lg object-cover shadow-lg group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/100/150';
                            }}
                          />
                          <span className="font-semibold text-white">
                            {show.movie?.title || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-gray-300">{dateFormat(show.showDateTime)}</td>
                      <td className="p-5">
                        <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full font-semibold">
                          {bookings}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-green-400 font-bold text-lg">
                          {currency} {earnings.toLocaleString()}
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