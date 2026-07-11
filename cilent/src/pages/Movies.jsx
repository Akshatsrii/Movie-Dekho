import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle'; // ✅ import this

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] bg-[#fffaf9]">

      {/* 🌀 Blur Circles for aesthetic glow */}
      <BlurCircle top="-100px" left="-100px" />   {/* Left side blur */}
      <BlurCircle bottom="-100px" right="-100px" /> {/* Right side blur */}

      {/* Soft reddish glow patches so the white background echoes the hero's red tone */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />

      <h1 className="text-lg font-medium my-4 text-zinc-700 text-center relative z-10">
        Now Showing
      </h1>

      <div className="flex flex-wrap max-sm:justify-center gap-8 justify-center relative z-10">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fffaf9]">
      <h1 className="text-3xl font-bold text-center text-zinc-950">No movies available</h1>
    </div>
  );
};

export default Movies;