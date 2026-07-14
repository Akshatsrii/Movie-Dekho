// MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import { Star, PlayCircle, Heart, User, Send, Ticket, X, Lock } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { favoriteMovies = [], toggleFavourite, imageBaseUrl = "", user } = useAppContext();
  const { openSignIn } = useClerk();

  const [show, setShow] = useState(null);
  
  // Review & Trailer states
  const [reviews, setReviews] = useState([]);
  const [revName, setRevName] = useState("");
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [showTrailer, setShowTrailer] = useState(false);

  // load show from dummyShowsData by matching _id or id (handles both)
  const getShow = () => {
    const movie =
      dummyShowsData.find((s) => String(s._id) === String(id)) ||
      dummyShowsData.find((s) => String(s.id) === String(id));
    if (movie) {
      setShow({
        movie: {
          ...movie,
          vote_average: movie.vote_average || 0,
          overview: movie.overview || "No overview available.",
          runtime: movie.runtime || "N/A",
          genres: movie.genres || (movie.genre ? movie.genre.map((g) => ({ name: g })) : []),
          release_date: movie.release_date || "2025-01-01",
          casts: movie.casts || [],
        },
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
    
    // Load reviews
    try {
      const stored = localStorage.getItem(`movie_reviews_${id}`);
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        const seed = [
          { name: "Aarav Mehta", rating: 5, text: "An absolute visual masterpiece! The soundtrack is out of this world.", date: "10/07/2026" },
          { name: "Tanya Sen", rating: 4, text: "Excellent performances. A bit long, but completely worth the experience.", date: "11/07/2026" }
        ];
        localStorage.setItem(`movie_reviews_${id}`, JSON.stringify(seed));
        setReviews(seed);
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!show)
    return (
      <div className="text-center py-40 text-zinc-500 text-xl font-medium bg-[#fffaf9] min-h-screen">
        Loading movie details...
      </div>
    );

  const { movie } = show;
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  const isFavourite = favoriteMovies.some(
    (m) => String(m._id) === String(movie._id) || String(m.id) === String(movie.id)
  );

  const scrollToTop = () => window.scrollTo(0, 0);

  const scrollToDateSection = () => {
    if (!user) {
      toast("🎬 Login required to book tickets!", {
        icon: "🔒",
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid rgba(229,30,37,0.5)",
          fontWeight: "700",
          borderRadius: "14px",
          fontSize: "14px",
        },
        duration: 3000,
      });
      openSignIn();
      return;
    }
    const dateSection = document.getElementById("date-section");
    if (dateSection) dateSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleFavourite = () => {
    toggleFavourite(movie);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) {
      toast.error("Please fill in both name and review text!");
      return;
    }

    const newRev = {
      name: revName.trim(),
      rating: revRating,
      text: revText.trim(),
      date: new Date().toLocaleDateString()
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(`movie_reviews_${id}`, JSON.stringify(updated));

    setRevName("");
    setRevText("");
    setRevRating(5);
    toast.success("Review posted successfully!");
  };

  // Get trailer embed link
  const getTrailerEmbedUrl = (title) => {
    const cleanTitle = title.toLowerCase();
    if (cleanTitle.includes("interstellar")) return "https://www.youtube.com/embed/zSWdZAWr3Vk";
    if (cleanTitle.includes("dark knight")) return "https://www.youtube.com/embed/LDG9bisJEaI";
    if (cleanTitle.includes("avatar")) return "https://www.youtube.com/embed/d9MyW72ELq0";
    if (cleanTitle.includes("deadpool")) return "https://www.youtube.com/embed/73_1biulk6g";
    if (cleanTitle.includes("batman")) return "https://www.youtube.com/embed/mqqft2x_Aa4";
    if (cleanTitle.includes("venom")) return "https://www.youtube.com/embed/HyIyd9eWcyc";
    return "https://www.youtube.com/embed/zSWdZAWr3Vk"; // Default fallback
  };

  return (
    <div className="min-h-screen bg-[#fffaf9] text-zinc-950 px-6 md:px-16 lg:px-24 xl:px-40 py-20 relative overflow-hidden">
      {/* Soft reddish glow patches so the white background echoes the hero's red tone */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />

      {/* --------------------- MOVIE INFO HEADER --------------------- */}
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto relative z-10 pt-10">
        {/* Poster */}
        <div className="max-md:mx-auto">
          <img
            src={movie.poster_path?.startsWith("http") ? movie.poster_path : `${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.src = movie.poster_path || `${imageBaseUrl}${movie.poster_path}` || "/placeholder-poster.jpg";
            }}
            className="rounded-3xl h-[30rem] w-[20rem] object-cover shadow-2xl shadow-red-900/20 transition-transform duration-300 hover:scale-[1.02] max-md:h-[26rem] max-md:w-[17rem] border border-zinc-200"
          />
        </div>

        {/* Movie Info */}
        <div className="relative flex flex-col gap-4 pt-4 md:pt-0">
          <BlurCircle top="-150px" left="-150px" className="opacity-70" />
          <BlurCircle top="100px" right="-50px" className="opacity-70" />

          <p className="text-[#e51e25] uppercase tracking-[0.3em] font-extrabold text-xs">English</p>

          <h1 className="text-5xl font-black tracking-tight max-w-3xl leading-tight max-md:text-4xl text-zinc-950">
            {movie.title}
          </h1>

          <div className="flex items-center gap-3 text-zinc-700 mt-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-bold">{Number(movie.vote_average).toFixed(1)} User Rating</span>
          </div>

          <p className="text-zinc-500 mt-2 text-sm leading-relaxed max-w-xl">{movie.overview}</p>

          {/* Details Row */}
          <div className="flex flex-wrap gap-6 items-center mt-4">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-bold">RELEASE YEAR</span>
              <span className="font-bold text-zinc-800 text-sm">{releaseYear}</span>
            </div>
            <div className="w-1.5 h-6 bg-zinc-200 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-bold">DURATION</span>
              <span className="font-bold text-zinc-800 text-sm">{movie.runtime} Min</span>
            </div>
            <div className="w-1.5 h-6 bg-zinc-200 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-bold">GENRE</span>
              <span className="font-bold text-zinc-800 text-sm">
                {movie.genres?.map((g) => g.name).join(", ") || "Action, Adventure"}
              </span>
            </div>
          </div>

          {/* Interactive buttons */}
          <div className="flex flex-wrap gap-4 items-center mt-6">
            <button
              onClick={scrollToDateSection}
              className="px-8 py-3.5 bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold shadow-[0_6px_20px_rgba(229,30,37,0.35)] flex items-center gap-2 cursor-pointer text-sm"
            >
              {!user ? <Lock className="w-5 h-5" /> : <Ticket className="w-5 h-5" />}
              Book Tickets
            </button>

            <button
              onClick={() => setShowTrailer(true)}
              className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold shadow-md flex items-center gap-2 cursor-pointer text-sm"
            >
              <PlayCircle className="w-5 h-5 text-white" />
              Watch Trailer
            </button>

            <button
              onClick={handleToggleFavourite}
              className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
                isFavourite
                  ? "bg-[#e51e25]/15 border-[#e51e25]/30 text-[#e51e25] scale-110 shadow-sm"
                  : "bg-white border-zinc-200 hover:border-[#e51e25] hover:text-[#e51e25]"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavourite ? "fill-[#e51e25]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* --------------------- CASTS SECTION --------------------- */}
      <div className="mt-20 max-w-7xl mx-auto relative z-10 border-t border-zinc-150 pt-12">
        <p className="text-2xl font-extrabold text-zinc-950 mb-8 tracking-tight">Cast & Crew</p>
        <div className="flex flex-wrap gap-8 justify-start">
          {movie.casts && movie.casts.length > 0 ? (
            movie.casts.map((cast, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group w-24">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="w-16 h-16 object-cover rounded-full shadow-md group-hover:scale-105 transition duration-300 border border-zinc-200"
                />
                <span className="text-xs font-bold text-zinc-800 text-center truncate w-full">{cast.name}</span>
                <span className="text-[10px] text-zinc-400 text-center truncate w-full">{cast.character}</span>
              </div>
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Cast list not available for this show.</p>
          )}
        </div>
      </div>

      {/* --------------------- DYNAMIC REVIEWS & RATINGS --------------------- */}
      <div className="mt-20 max-w-7xl mx-auto relative z-10 border-t border-zinc-150 pt-12">
        <h2 className="text-2xl font-extrabold text-zinc-950 mb-8 tracking-tight flex items-center gap-2">
          ⭐ Ratings & Reviews
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-96 bg-white border border-[#e51e25]/15 p-6 rounded-3xl shadow-lg flex flex-col gap-4">
            <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight">Share Your Opinion</h3>
            <form onSubmit={handleAddReview} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu"
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-zinc-50 border border-zinc-200 focus:border-[#e51e25] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Your Rating</label>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      className="cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition ${
                          star <= revRating ? "text-yellow-400 fill-yellow-400" : "text-zinc-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">Review Comments</label>
                <textarea
                  required
                  placeholder="Write your review here..."
                  rows="3"
                  value={revText}
                  onChange={(e) => setRevText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-zinc-50 border border-zinc-200 focus:border-[#e51e25] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#e51e25] hover:bg-[#c4161c] text-white text-xs font-bold rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Submit Review
              </button>
            </form>
          </div>

          <div className="flex-1 space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {reviews.length === 0 ? (
              <p className="text-zinc-400 text-sm italic">No reviews yet. Be the first to share your experience!</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="bg-white border border-[#e51e25]/10 p-5 rounded-2xl shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#e51e25]/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#e51e25]" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 text-sm leading-none">{rev.name}</p>
                        <span className="text-[10px] text-zinc-400 font-bold">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex gap-0.5 items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{rev.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --------------------- YOU MAY ALSO LIKE --------------------- */}
      <div className="mt-20 max-w-7xl mx-auto relative z-10 border-t border-zinc-150 pt-12">
        <p className="text-2xl font-extrabold mb-8 text-zinc-950 tracking-tight">You May Also Like</p>
        <div className="flex flex-wrap max-w-sm:justify-center gap-8">
          {dummyShowsData.slice(0, 4).map((m, idx) => (
            <MovieCard key={idx} movie={m} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/movies");
              scrollToTop();
            }}
            className="px-10 py-3 text-sm bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold cursor-pointer shadow-[0_4px_14px_rgba(229,30,37,0.3)]"
          >
            Show more
          </button>
        </div>
      </div>

      {/* --------------------- DATE SELECTION --------------------- */}
      <div id="date-section" className="mt-20 relative z-10 border-t border-zinc-150 pt-12">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* --------------------- TRAILER CINEMA MODAL --------------------- */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10 transition-all duration-300">
          <div className="relative w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
              <span className="font-extrabold text-sm text-zinc-300 tracking-wider flex items-center gap-2 uppercase">
                🎬 Playing Official Trailer: <span className="text-white font-black">{movie.title}</span>
              </span>
              <button
                onClick={() => setShowTrailer(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Aspect Container */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${getTrailerEmbedUrl(movie.title)}?autoplay=1`}
                title={`${movie.title} Trailer`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetails;
