import React from "react";
import { useAppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";

const Favourite = () => {
  const { favouriteMovies = [] } = useAppContext(); // ✅ Default empty array for safety

  const hasFavourites = favouriteMovies && favouriteMovies.length > 0;

  return (
    <div className="relative my-32 mb-60 px-6 md:px-16 lg:px-40 xl:px-52 overflow-hidden min-h-[80vh]">
      {/* 🌀 Aesthetic blur glows */}
      <BlurCircle top="-120px" left="-100px" /> {/* Left glow */}
      <BlurCircle bottom="-100px" right="-100px" /> {/* Right glow */}

      {/* Heading Section */}
      <h1 className="text-2xl md:text-3xl font-semibold my-10 text-center text-zinc-900 tracking-wide">
        ❤️ Your Favourite Movies
      </h1>

      {hasFavourites ? (
        // ✅ Show favourite movies
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {favouriteMovies.map((movie) => (
            <MovieCard movie={movie} key={movie._id || movie.id} />
          ))}
        </div>
      ) : (
        // 🚫 When no favourites are available
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-3xl font-semibold text-zinc-800 mb-4">
            No Favourite Movies Yet
          </h2>
          <p className="text-zinc-500 text-sm md:text-base">
            Explore and add some movies to your favourites!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourite;
