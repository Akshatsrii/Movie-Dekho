import React from "react";
import { useNavigate } from "react-router-dom";
// Import ArrowRight along with Calendar and Clock
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets"; // <-- important import

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='relative flex flex-col justify-end lg:justify-center items-center px-6 md:px-12 lg:px-20 h-screen bg-[url("/backgroundImage.jpg")] bg-cover bg-top bg-no-repeat overflow-hidden py-12 lg:py-0'>

      {/* Inline styles for the distressed logo effect + entrance motion (does not touch existing Tailwind logic) */}
      <style>{`
        @keyframes heroFadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoSlamIn {
          0% { opacity: 0; transform: skewX(-12deg) translateX(-60px) scale(0.9); }
          60% { opacity: 1; transform: skewX(-12deg) translateX(6px) scale(1.03); }
          100% { opacity: 1; transform: skewX(-12deg) translateX(0) scale(1); }
        }
        @keyframes stampFlicker {
          0%, 92%, 100% { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); }
          94% { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)) brightness(1.3); }
          96% { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)) brightness(0.92); }
        }
        @keyframes emberGlow {
          0%, 100% { text-shadow: 4px 4px 0px #000, -4px -4px 0px #000, 4px -4px 0px #000, -4px 4px 0px #000, 0px 0px 16px rgba(255,110,30,0.6); }
          50% { text-shadow: 4px 4px 0px #000, -4px -4px 0px #000, 4px -4px 0px #000, -4px 4px 0px #000, 0px 0px 28px rgba(255,110,30,0.95); }
        }
        .hero-fade-up { animation: heroFadeUp 0.8s ease-out both; }
        .hero-delay-1 { animation-delay: 0.15s; }
        .hero-delay-2 { animation-delay: 0.3s; }
        .hero-delay-3 { animation-delay: 0.45s; }
        .hero-logo-slam { animation: logoSlamIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both, stampFlicker 6s ease-in-out 1.2s infinite; }
        .hero-logo-slam h1, .hero-logo-slam h2 { animation: emberGlow 3.5s ease-in-out infinite; }
        .logo-fire { color: #f0451f; }

        @keyframes emberFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-140px) translateX(var(--drift, 10px)); opacity: 0; }
        }
        .ember { position: absolute; bottom: 0; width: 4px; height: 4px; border-radius: 50%; background: #ff8a3d; box-shadow: 0 0 8px 2px rgba(255,138,61,0.8); animation: emberFloat linear infinite; }

        .hero-btn { position: relative; overflow: hidden; }
        .hero-btn::before {
          content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          animation: btnShine 3.2s ease-in-out infinite;
        }
        @keyframes btnShine { 0% { left: -75%; } 35%, 100% { left: 130%; } }

        .hero-badge { transition: transform 0.25s ease, border-color 0.25s ease; }
        .hero-badge:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.5); }

        .hero-vignette { background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%); }
      `}</style>

      {/* Cinematic vignette for depth */}
      <div className="hero-vignette pointer-events-none absolute inset-0 z-10" />

      {/* Readability scrim so the right-side text always pops against the busy artwork behind it */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t lg:bg-gradient-to-l from-black/70 via-black/25 to-transparent" />

      {/* Right Column: Content, Description (no box, completely clear) and Buttons (vertically centered on the right on desktop, stacked on mobile) */}
      <div className="w-full lg:absolute lg:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/3 flex flex-col items-center lg:items-end text-center lg:text-right gap-5 max-w-lg z-20 order-1 lg:order-2 mb-12 lg:mb-0">
        {/* Custom Pill Badges */}
        <div className="hero-fade-up flex flex-wrap items-center justify-center lg:justify-end gap-2 text-xs font-bold">
          <span className="hero-badge px-3 py-1 bg-[#e51e25]/20 border border-[#e51e25]/40 text-[#ff8a70] rounded-full uppercase tracking-wider backdrop-blur-sm">
            Action | Adventure | Sci-Fi
          </span>
          <span className="hero-badge px-3 py-1 bg-white/10 border border-white/25 text-white rounded-full flex items-center gap-1 backdrop-blur-sm">
            <Calendar className='w-3.5 h-3.5 text-[#e51e25]' /> 2014
          </span>
          <span className="hero-badge px-3 py-1 bg-white/10 border border-white/25 text-white rounded-full flex items-center gap-1 backdrop-blur-sm">
            <Clock className='w-3.5 h-3.5 text-[#e51e25]' /> 2h 1m
          </span>
        </div>

        <p className="hero-fade-up hero-delay-1 text-white text-sm md:text-base leading-relaxed font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Brash space adventurer Peter Quill finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. To evade Ronan, Quill is forced into an uneasy truce with a quartet of disparate misfits: Gamora, Rocket, Groot, and Drax.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="hero-fade-up hero-delay-2 hero-btn group flex items-center gap-2 px-8 py-3.5 bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold cursor-pointer shadow-[0_6px_20px_rgba(229,30,37,0.4)] hover:shadow-[0_8px_25px_rgba(229,30,37,0.6)]"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Center: Custom-styled Text Logo (bottom center on desktop, stacked below description on mobile) */}
      <div className="hero-logo-slam w-full lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center select-none text-center transform skew-x-[-12deg] hover:scale-[1.02] transition-transform duration-500 cursor-pointer z-20 order-2 lg:order-1">
        <span className="ember" style={{ left: "10%", animationDuration: "3.2s", animationDelay: "0s", ["--drift"]: "14px" }} />
        <span className="ember" style={{ left: "30%", animationDuration: "4s", animationDelay: "0.8s", ["--drift"]: "-10px" }} />
        <span className="ember" style={{ left: "55%", animationDuration: "3.6s", animationDelay: "1.6s", ["--drift"]: "18px" }} />
        <span className="ember" style={{ left: "75%", animationDuration: "4.4s", animationDelay: "0.4s", ["--drift"]: "-16px" }} />
        <span className="ember" style={{ left: "90%", animationDuration: "3.8s", animationDelay: "2s", ["--drift"]: "8px" }} />
        <h1
          className="logo-fire text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter leading-none"
          style={{ fontFamily: "Impact, sans-serif" }}
        >
          Guardians
        </h1>
        <h2
          className="logo-fire text-2xl md:text-4xl lg:text-[45px] font-black uppercase tracking-wide leading-none -mt-2 md:-mt-3 ml-1"
          style={{ fontFamily: "Impact, sans-serif" }}
        >
          of the Galaxy
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;