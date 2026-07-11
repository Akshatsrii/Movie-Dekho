import React, { useEffect, useState } from "react";
import { Star, TrendingUp, Users, Film, DollarSign, Calendar } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const BlurCircle = ({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'center-left': 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div className={`absolute ${positions[position]} w-96 h-96 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 blur-3xl animate-pulse pointer-events-none`} />
  );
};

// Dummy dashboard data with more movies
const dummyDashboardData = {
  totalBookings: 1247,
  totalRevenue: 374100,
  totalUser: 892,
  activeShows: [
    {
      show_id: 1,
      movie: {
        title: "The Simpsons Movie",
        poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
        vote_average: 8.5
      },
      showPrice: 250
    },
    {
      show_id: 2,
      movie: {
        title: "Avatar: The Way of Water",
        poster_path: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&h=750&fit=crop",
        vote_average: 7.7
      },
      showPrice: 350
    },
    {
      show_id: 3,
      movie: {
        title: "Deadpool & Wolverine",
        poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop",
        vote_average: 8.8
      },
      showPrice: 300
    },
    {
      show_id: 4,
      movie: {
        title: "The Batman",
        poster_path: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
        vote_average: 8.3
      },
      showPrice: 280
    },
    {
      show_id: 5,
      movie: {
        title: "Venom: The Last Dance",
        poster_path: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop",
        vote_average: 7.9
      },
      showPrice: 320
    },
    {
      show_id: 6,
      movie: {
        title: "Oppenheimer",
        poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
        vote_average: 8.6
      },
      showPrice: 400
    },
    {
      show_id: 7,
      movie: {
        title: "Dune: Part Two",
        poster_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop",
        vote_average: 8.4
      },
      showPrice: 380
    },
    {
      show_id: 8,
      movie: {
        title: "Barbie",
        poster_path: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&h=750&fit=crop",
        vote_average: 7.2
      },
      showPrice: 270
    },
    {
      show_id: 9,
      movie: {
        title: "Guardians of the Galaxy Vol. 3",
        poster_path: "https://images.unsplash.com/photo-1579566346927-c68383817a25?w=500&h=750&fit=crop",
        vote_average: 8.1
      },
      showPrice: 290
    },
    {
      show_id: 10,
      movie: {
        title: "Mission: Impossible",
        poster_path: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
        vote_average: 7.8
      },
      showPrice: 310
    },
    {
      show_id: 11,
      movie: {
        title: "Spider-Man: Across the Spider-Verse",
        poster_path: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=500&h=750&fit=crop",
        vote_average: 8.7
      },
      showPrice: 330
    },
    {
      show_id: 12,
      movie: {
        title: "John Wick: Chapter 4",
        poster_path: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&h=750&fit=crop",
        vote_average: 8.2
      },
      showPrice: 295
    }
  ]
};

const Dashboard = () => {
  const { getToken, axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
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
          <p className="text-base text-zinc-500 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent text-zinc-900 overflow-hidden">
      {/* Blur Circles */}
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-1 select-none text-zinc-950">
            Dash<span className="text-[#e51e25]">board</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm">Overview of your theater management</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#e51e25]/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-[#e51e25]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Bookings</p>
            <h3 className="text-3xl font-black text-zinc-900">{dashboardData.totalBookings.toLocaleString()}</h3>
            <p className="text-green-500 text-xs font-bold mt-2">+12% from last month</p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#e51e25]/10 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-[#e51e25]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-zinc-900">{currency}{dashboardData.totalRevenue.toLocaleString()}</h3>
            <p className="text-green-500 text-xs font-bold mt-2">+18% from last month</p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#e51e25]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#e51e25]/10 p-3 rounded-xl">
                <Users className="w-6 h-6 text-[#e51e25]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-3xl font-black text-zinc-900">{dashboardData.totalUser.toLocaleString()}</h3>
            <p className="text-green-500 text-xs font-bold mt-2">+8% from last month</p>
          </div>
        </div>

        {/* Active Shows Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#e51e25] rounded-full" />
            Active Shows
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show.show_id}
              className="group bg-white border border-zinc-200/60 hover:border-[#e51e25]/30 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md hover:scale-102 transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  }}
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-bold text-xs">{show.movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-4">
                <p className="font-bold text-zinc-900 mb-2 truncate group-hover:text-[#e51e25] transition-colors">
                  {show.movie.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-base font-extrabold text-[#e51e25]">
                      {currency}{show.showPrice}
                    </p>
                  </div>
                  <div className="bg-[#e51e25]/10 px-2.5 py-1 rounded-full">
                    <Film className="w-3.5 h-3.5 text-[#e51e25]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;