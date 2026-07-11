import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const CheckIn = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState("loading"); // loading, success, already, error
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    try {
      const localBookings = JSON.parse(localStorage.getItem("movie_bookings") || "[]");
      const matchIndex = localBookings.findIndex((b) => String(b._id) === String(bookingId));

      if (matchIndex !== -1) {
        const found = localBookings[matchIndex];
        
        if (found.checkedIn) {
          setBooking(found);
          setStatus("already");
        } else {
          // Perform Check-in and save back
          found.checkedIn = true;
          found.checkedInTime = new Date().toLocaleString();
          localBookings[matchIndex] = found;
          localStorage.setItem("movie_bookings", JSON.stringify(localBookings));
          
          setBooking(found);
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-[#fffaf9] text-zinc-950 relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-100px" right="-100px" />

      <div className="relative max-w-md w-full bg-white border border-[#e51e25]/20 rounded-3xl shadow-2xl p-8 z-10 text-center flex flex-col items-center">
        
        {/* Verification Loading */}
        {status === "loading" && (
          <div className="py-12">
            <div className="w-16 h-16 border-4 border-[#e51e25] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-zinc-900">Verifying Booking QR Code...</h2>
            <p className="text-zinc-500 text-sm mt-1">Authenticating ticket credentials...</p>
          </div>
        )}

        {/* Check-In Success */}
        {status === "success" && booking && (
          <>
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Check-In Successful!</h2>
            <p className="text-zinc-500 text-sm mt-1 mb-6">Welcome to the theater. Enjoy your movie!</p>

            {/* Ticket Details Panel */}
            <div className="w-full bg-[#fffaf9] border border-zinc-200 rounded-2xl p-5 text-left flex flex-col gap-3 shadow-inner">
              <div className="flex gap-4">
                <img
                  src={booking.show.movie.poster_path}
                  alt={booking.show.movie.title}
                  className="w-16 h-24 object-cover rounded-xl shadow-md border border-zinc-200"
                />
                <div>
                  <h3 className="font-extrabold text-zinc-900 leading-tight">{booking.show.movie.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{booking.show.movie.genre}</p>
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {booking.bookedSeats.map((seat) => (
                      <span key={seat} className="bg-[#e51e25]/10 text-zinc-800 text-xs font-bold px-2 py-0.5 rounded border border-[#e51e25]/20">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-150 pt-3 flex flex-col gap-2 text-xs font-semibold text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#e51e25]" />
                  <span>{booking.show.theater}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#e51e25]" />
                  <span>Show Date: {new Date(booking.show.showDateTime).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#e51e25]" />
                  <span>Show Time: {new Date(booking.show.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mt-6 border-t border-zinc-100 pt-4 w-full justify-center">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Verified Secure Check-In Entry</span>
            </div>
          </>
        )}

        {/* Already Checked In */}
        {status === "already" && booking && (
          <>
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 opacity-70" />
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Already Checked In</h2>
            <p className="text-zinc-500 text-sm mt-1 mb-6">This ticket was checked in on: <span className="font-bold text-zinc-800">{booking.checkInTime}</span></p>

            <div className="w-full bg-[#fffaf9] border border-zinc-200 rounded-2xl p-5 text-left flex flex-col gap-3 shadow-inner">
              <div className="flex gap-4">
                <img
                  src={booking.show.movie.poster_path}
                  alt={booking.show.movie.title}
                  className="w-16 h-24 object-cover rounded-xl shadow-md border border-zinc-200"
                />
                <div>
                  <h3 className="font-extrabold text-zinc-900 leading-tight">{booking.show.movie.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{booking.show.movie.genre}</p>
                  <p className="text-xs font-semibold text-zinc-600 mt-2">
                    Seats: <span className="text-[#e51e25] font-bold">{booking.bookedSeats.join(", ")}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Check-In Error */}
        {status === "error" && (
          <>
            <AlertTriangle className="w-20 h-20 text-[#e51e25] mb-4 animate-pulse" />
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Invalid QR Code</h2>
            <p className="text-zinc-500 text-sm mt-1 mb-6">The booking code does not match any reservations in our records.</p>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-2.5 bg-[#e51e25] hover:bg-[#c4161c] text-white font-bold text-sm rounded-xl transition cursor-pointer"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
};

export default CheckIn;
