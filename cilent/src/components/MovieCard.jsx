// src/components/MovieCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon, Lock } from "lucide-react";
import timeformat from "../lib/timeformat"; // make sure this exists or replace with fallback
import { useUser, useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleNavigation = () => {
    if (movie?._id || movie?.id) {
      navigate(`/movies/${movie._id || movie.id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleBuyTickets = (e) => {
    e.stopPropagation();
    if (!user) {
      toast("🎬 Please login to book tickets!", {
        icon: "🔒",
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid rgba(229,30,37,0.4)",
          fontWeight: "600",
        },
        duration: 2500,
      });
      openSignIn();
      return;
    }
    if (movie?._id || movie?.id) {
      navigate(`/movies/${movie._id || movie.id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className="movie-card flex flex-col justify-between p-3 bg-white border border-[#e51e25]/20 rounded-2xl hover:-translate-y-1 transition-all duration-300 w-64"
    >
      {/* Inline styles for red-theme polish only (no logic touched) */}
      <style>{`
        .movie-card:hover { border-color: rgba(229,30,37,0.5); box-shadow: 0 14px 30px rgba(229,30,37,0.18); }
        .movie-card img { transition: transform 0.35s ease; }
        .movie-card:hover img { transform: scale(1.03); }
      `}</style>

      {/* Movie Poster */}
      <div className="overflow-hidden rounded-lg">
        <img
          onClick={handleNavigation}
          src={movie.backdrop_path || movie.poster_path || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.title}
          className="h-52 w-full object-cover object-center cursor-pointer"
        />
      </div>

      {/* Movie Info */}
      <p className="font-semibold mt-2 truncate text-zinc-950">{movie.title}</p>
      <p className="text-sm text-zinc-500 mt-2">
        {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
        {" | "}
        {Array.isArray(movie.genres)
          ? movie.genres.slice(0, 2).map((g) => (typeof g === "string" ? g : g.name)).join(" | ")
          : Array.isArray(movie.genre)
          ? movie.genre.slice(0, 2).join(" | ")
          : "Genre N/A"}
        {" | "}
        {movie.runtime ? timeformat(movie.runtime) : "Duration N/A"}
      </p>

      {/* Rating and Buy Button */}
      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={handleBuyTickets}
          className="px-4 py-2 text-xs bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-medium cursor-pointer shadow-[0_4px_14px_rgba(229,30,37,0.3)] flex items-center gap-1.5"
        >
          {!user && <Lock className="w-3 h-3" />}
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-zinc-600 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;