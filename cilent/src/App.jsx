import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Favourite from './pages/Favourite';
import MyBookings from './pages/MyBookings';
import { Toaster } from "react-hot-toast";
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
  const { user, isAdmin } = useAppContext();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf9] p-4">
        <SignIn fallbackRedirect="/admin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf9] text-center p-6">
        <div className="bg-white border border-red-100 p-8 rounded-3xl shadow-xl max-w-md">
          <h1 className="text-2xl font-black text-[#e51e25] mb-3">Access Denied</h1>
          <p className="text-zinc-550 font-semibold mb-6">You are signed in but do not have administrator permissions to access the dashboard.</p>
          <button 
            onClick={() => window.location.href = "/"} 
            className="px-8 py-3 bg-[#e51e25] hover:bg-[#c4161c] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all cursor-pointer uppercase text-xs tracking-wider"
          >
            Go to Home Page
          </button>
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
