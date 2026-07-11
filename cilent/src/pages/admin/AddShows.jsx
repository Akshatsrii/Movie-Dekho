import React, { useState, useEffect } from "react";
import { Star, Calendar, DollarSign, Plus, Clock, Trash2 } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dummyShowsData } from "../../assets/assets";


// Blur Circle Component
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

// Movie Card Component
const MovieCard = ({ movie, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative flex-shrink-0 w-44 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden shadow-lg bg-black/30 backdrop-blur-md
      ${isSelected ? 'ring-4 ring-red-500 scale-105 shadow-2xl shadow-red-500/50' : 'hover:scale-105 hover:ring-2 hover:ring-red-400'}`}
    >
      <img 
        src={movie.poster_path} 
        alt={movie.title}
        className="w-full h-64 object-cover brightness-90"
        onError={(e) => {
          e.target.src = '/api/placeholder/300/400';
        }}
      />
      
      {/* Rating Badge */}
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        <span className="text-white font-bold text-xs">{movie.vote_average.toFixed(1)}</span>
      </div>

      {/* Movie Info */}
      <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent w-full p-3">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
        <p className="text-gray-400 text-xs">{movie.vote_count} votes</p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-red-600 px-4 py-2 rounded-full font-semibold text-sm transform scale-90 hover:scale-100 transition-transform">
          Select Movie
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AddShows() {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTimes, setDateTimes] = useState([]);

  useEffect(() => {
    setNowPlayingMovies(dummyShowsData);
  }, []);

  const handleAddDateTime = () => {
    if (!selectedDate) return alert("Please select a valid date and time!");
    const formattedDate = selectedDate.toLocaleString("en-US");
    if (dateTimes.includes(formattedDate)) return alert("Already added!");
    setDateTimes([...dateTimes, formattedDate]);
    setSelectedDate(null);
  };

  const handleRemoveDateTime = (dt) => {
    setDateTimes(dateTimes.filter((t) => t !== dt));
  };

  const handleAddShow = () => {
    if (!selectedMovie) return alert("Please select a movie first!");
    if (!showPrice) return alert("Enter a show price!");
    if (dateTimes.length === 0) return alert("Please add at least one showtime!");

    alert(
      `✅ Show added for ${selectedMovie.title} | ${dateTimes.length} show(s) at ${currency}${showPrice}`
    );

    setSelectedMovie(null);
    setShowPrice("");
    setDateTimes([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden relative">
      {/* Blur Circles at all corners */}
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      {/* Content Container */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            Add <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Shows</span>
          </h1>
        </div>

        {/* Now Playing Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
            Now Playing Movies
          </h2>
          
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 w-max">
              {nowPlayingMovies.map((movie, index) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  isSelected={selectedMovie?.id === movie.id}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section - Only shown when movie is selected */}
        {selectedMovie && (
          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/50 backdrop-blur-xl rounded-3xl p-8 border border-red-900/50 shadow-2xl shadow-red-900/30">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold">{selectedMovie.title}</h2>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-semibold">{selectedMovie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400">| {selectedMovie.vote_count} Votes</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Price Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Show Price ({currency})
                </label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                  className="w-full bg-gray-800/50 border border-red-900/50 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              {/* DateTime Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Date & Time
                </label>
                <div className="flex gap-3">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select date and time"
                    className="flex-1 bg-gray-800/50 border border-red-900/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  <button 
                    onClick={handleAddDateTime}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/30">
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Date-Times */}
            {dateTimes.length > 0 && (
              <div className="mt-8">
                <p className="text-gray-300 mb-3 font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  Selected Show Timings:
                </p>
                <div className="flex flex-wrap gap-3">
                  {dateTimes.map((dt, i) => (
                    <div
                      key={i}
                      className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-md hover:bg-red-900/40 transition-all"
                    >
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{dt}</span>
                      <Trash2
                        className="w-4 h-4 cursor-pointer hover:text-red-400 transition-colors ml-2"
                        onClick={() => handleRemoveDateTime(dt)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Show Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleAddShow}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/50">
                Add Show
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}