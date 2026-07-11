import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Favourite from './pages/Favourite';
import MyBookings from './pages/MyBookings';
import toast, { Toaster } from "react-hot-toast";
import SeatLayout from './pages/SeatLayout';
import Footer from './components/Footer';
import { SignIn } from "@clerk/clerk-react";
import Payment from "./components/payment";
import SelectSnacks from "./pages/SelectSnacks";
import FoodOrder from "./pages/FoodOrder";
import CheckIn from "./pages/CheckIn";



// ✅ Import admin components
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddShows from './pages/admin/AddShows';
import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import { useAppContext } from './context/AppContext';

const AdminRouteWrapper = () => {
  const { user, isAdmin, setIsAdmin, getToken, axios, fetchIsAdmin } = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const loadingToast = toast.loading("Verifying Admin credentials...");

    try {
      const token = await getToken();
      const { data } = await axios.post("/api/user/admin-login", 
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || "Admin access verified successfully!", { id: loadingToast });
        setIsAdmin(true);
        await fetchIsAdmin();
      } else {
        toast.error(data.message || "Invalid Admin Email or Password.", { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("Authorization failed. Check server connection.", { id: loadingToast });
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf9] p-4">
        <SignIn fallbackRedirect="/admin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf9] text-center p-6 relative">
        {/* Soft reddish glow patches */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />

        <div className="bg-white border border-[#e51e25]/20 p-8 rounded-3xl shadow-2xl max-w-md w-full relative z-10">
          <h1 className="text-3xl font-black text-zinc-950 mb-2 select-none">
            Admin <span className="text-[#e51e25]">Login</span>
          </h1>
          <p className="text-zinc-400 font-semibold text-xs uppercase tracking-wider mb-6">Enter credentials to unlock dashboard</p>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs font-extrabold text-zinc-550 mb-1.5 uppercase tracking-wide">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="e.g. admin@moviedekho.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e51e25]/40 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-zinc-550 mb-1.5 uppercase tracking-wide">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="e.g. admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e51e25]/40 text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#e51e25] hover:bg-[#c4161c] disabled:bg-red-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer mt-2 uppercase text-xs tracking-wider"
            >
              {isLoggingIn ? "Verifying..." : "Verify & Enter Dashboard"}
            </button>
          </form>

          <div className="border-t border-zinc-100 pt-4 mt-6">
            <button
              onClick={() => window.location.href = "/"}
              className="text-xs font-bold text-zinc-400 hover:text-[#e51e25] transition-colors cursor-pointer"
            >
              ← Cancel & Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Layout />;
};

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/releases" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/movies/:id/:date/snacks" element={<SelectSnacks />} />
        <Route path="/food-order" element={<FoodOrder />} />
        <Route path="/checkin/:bookingId" element={<CheckIn />} />
        <Route path="/favorite" element={<Favourite />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/seat-layout" element={<SeatLayout />} />
        <Route path="/payment" element={<Payment />} /> {/* ✅ Add this line */}

        {/* ✅ Admin routes nested under Layout */}
        <Route path="/admin/*" element={<AdminRouteWrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
