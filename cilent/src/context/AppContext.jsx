import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser, useAuth } from "@clerk/clerk-react"; // Clerk hooks

// ✅ Load base URL from .env
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Environment variables
  const currency = import.meta.env.VITE_CURRENCY;
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ✅ Fetch user admin status from backend dynamically using Clerk token
  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success && data.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error verifying admin status:", error);
      setIsAdmin(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) setShows(data.shows);
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Toggle Favourite Movie (add/remove)
  const toggleFavourite = (movie) => {
    setFavouriteMovies((prev) => {
      const alreadyFav = prev.find(
        (m) => m._id === movie._id || m.id === movie.id
      );
      if (alreadyFav) {
        toast.error("Removed from Favourites");
        return prev.filter((m) => m._id !== movie._id && m.id !== movie.id);
      } else {
        toast.success("Added to Favourites");
        return [...prev, movie];
      }
    });
  };

  useEffect(() => {
    if (user) fetchIsAdmin();
  }, [user]);

  const value = {
    axios,
    user,
    getToken,
    navigate,
    location,
    isAdmin,
    shows,
    fetchShows,
    favouriteMovies,
    toggleFavourite,
    currency,
    imageBaseUrl,
    baseUrl,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

