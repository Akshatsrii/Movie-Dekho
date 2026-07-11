import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { dummyShowsData, assets } from "../assets/assets";

const FeatureSection = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/Movies");
    window.scrollTo(0, 0);
  };

  const handleBuyTicket = (id) => {
    navigate(`/movies/${id}`);
    window.scrollTo(0, 0);
  };

  // ✅ Only show these movies
  const allowedTitles = [
    "In the Lost Lands",
    "Until Dawn",
    "Lilo & Stitch",
    "Havoc",
    "A Minecraft Movie",
    "Mission: Impossible – The Final Reckoning",
    "Thunderbolts*",
    "Joker: Folie à Deux",
    "The Marvels",
    "Dune: Part Two",
  ];

  const showsWithFallback = dummyShowsData
    .filter((show) => allowedTitles.includes(show.title))
    .slice(0, 4) // show only 4 featured
    .map((show) => {
      const genreText = Array.isArray(show.genre)
        ? show.genre.slice(0, 2).join(" | ")
        : Array.isArray(show.genres)
        ? show.genres.slice(0, 2).map((g) => (typeof g === "string" ? g : g.name)).join(" | ")
        : "Genre N/A";
      return {
        ...show,
        genre: genreText,
        poster_path:
          show.poster_path && show.poster_path.trim() !== ""
            ? show.poster_path
            : assets.placeholderPoster ||
              "https://via.placeholder.com/400x600?text=No+Image",
      };
    });

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden py-24 bg-[#fffaf9]">
      {/* Inline styles for premium card polish */}
      <style>{`
        .feat-card {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.4s ease;
        }
        .feat-card:hover {
          border-color: rgba(229,30,37,0.5);
          box-shadow: 0 20px 38px rgba(229,30,37,0.18);
          transform: translateY(-6px);
        }
        .feat-img-container {
          position: relative;
          overflow: hidden;
        }
        .feat-img {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .feat-card:hover .feat-img {
          transform: scale(1.06);
        }
        .feat-view-all { position: relative; padding-bottom: 2px; }
        .feat-view-all::after {
          content: ""; position: absolute; left: 0; bottom: -2px; width: 0; height: 1.5px;
          background: #e51e25; transition: width 0.25s ease;
        }
        .feat-view-all:hover::after { width: 100%; }
        .feat-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .feat-btn::before {
          content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
        }
        .feat-card:hover .feat-btn::before {
          animation: featBtnShine 1.5s ease-in-out infinite;
        }
        @keyframes featBtnShine { 0% { left: -75%; } 100% { left: 125%; } }
      `}</style>

      {/* Soft reddish glow patches in the corners so the white section isn't stark and echoes the hero's red tone */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-[#e51e25]/5 to-transparent z-0" />

      {/* 🌌 Background Glow Effects */}
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-150px" right="-150px" />

      {/* 🏷️ Header Section */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <p className="text-zinc-950 font-bold text-2xl tracking-wide flex items-center gap-2 select-none">
          <span className="text-[#e51e25]">🎞️</span> Now Showing
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="feat-view-all group flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-[#e51e25] transition cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition w-4 h-4" />
        </button>
      </div>

      {/* 🎬 Movie Cards */}
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {showsWithFallback.map((show) => (
          <div
            key={show.id || show._id}
            className="feat-card bg-white border border-zinc-200/60 hover:border-[#e51e25]/30 rounded-2xl overflow-hidden text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-64 cursor-pointer"
            onClick={() => handleBuyTicket(show.id || show._id)}
          >
            <div className="feat-img-container w-full h-80">
              <img
                src={show.poster_path}
                alt={show.title}
                onError={(e) => {
                  e.target.src =
                    assets.placeholderPoster ||
                    "https://via.placeholder.com/400x600?text=No+Image";
                }}
                className="feat-img w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xxs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Now Screenings
              </span>
            </div>
            <div className="p-4 flex flex-col justify-between h-36">
              <div>
                <h3 className="text-base font-bold mb-1 text-zinc-950 truncate line-clamp-1">{show.title}</h3>
                <p className="text-xs text-zinc-400 font-medium truncate">{show.genre}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyTicket(show.id || show._id);
                }}
                className="feat-btn w-full py-2.5 bg-[#e51e25] hover:bg-[#c4161c] text-white text-xs rounded-xl font-bold transition shadow-[0_4px_12px_rgba(229,30,37,0.25)] hover:shadow-[0_6px_18px_rgba(229,30,37,0.4)] cursor-pointer"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🍿 Show More Button */}
      <div className="flex justify-center mt-16 relative z-10">
        <button
          onClick={handleShowMore}
          className="px-10 py-3.5 text-xs font-bold rounded-full bg-[#e51e25]
                     hover:bg-[#c4161c] text-white shadow-[0_6px_20px_rgba(229,30,37,0.3)]
                     transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;