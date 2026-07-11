import React from 'react';
import { Ticket, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure logo.svg, googlePlay, and appStore are defined here

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 pt-16 relative overflow-hidden">

      {/* Thin fiery red accent line at the very top of the footer */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#e51e25] to-transparent" />

      {/* Inline styles for footer polish only (no logic changed) */}
      <style>{`
        .footer-link { position: relative; width: fit-content; transition: color 0.2s ease, transform 0.2s ease; }
        .footer-link::after {
          content: ""; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px;
          background: #e51e25; transition: width 0.25s ease;
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:hover { transform: translateX(3px); }
        .footer-store-img { transition: transform 0.25s ease, filter 0.25s ease; }
        .footer-store-img:hover { transform: translateY(-3px); filter: drop-shadow(0 4px 10px rgba(229,30,37,0.35)); }
        .footer-logo-icon { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .footer-logo:hover .footer-logo-icon { transform: rotate(-18deg) scale(1.1); }
      `}</style>

      <div className="max-w-[95%] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 relative z-10">

        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-14">

          {/* Column 1: Logo and Description */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <Link to="/" className="footer-logo flex items-center gap-2 select-none mb-6 w-fit cursor-pointer">
              <Ticket className="footer-logo-icon w-8 h-8 text-[#e51e25]" />
              <span className="text-3xl font-extrabold tracking-tight text-white">
                Movie<span className="text-[#e51e25] ml-0.5">Dekho</span>
              </span>
            </Link>

            <p className="text-sm max-w-md leading-relaxed">
              Movie Dekho is your premium booking platform for immediate movie tickets and gourmet cinema seat food delivery. Browse now showing films, secure your best seats, and enjoy a hassle-free cinema experience!
            </p>

            {/* App Store Links */}
            <div className="flex space-x-4 pt-2">
              <img src={assets.googlePlay} alt="Get it on Google Play" className="footer-store-img h-9 cursor-pointer" />
              <img src={assets.appStore} alt="Download on the App Store" className="footer-store-img h-9 cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4 relative w-fit">
              Explore
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-[#e51e25] rounded-full" />
            </h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <li>
                <Link to="/" className="footer-link text-gray-400 hover:text-white block">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="footer-link text-gray-400 hover:text-white block">Movies</Link>
              </li>
              <li>
                <Link to="/food-order" className="footer-link text-gray-400 hover:text-white block">Food Delivery</Link>
              </li>
              <li>
                <Link to="/" className="footer-link text-gray-400 hover:text-white block">Theaters</Link>
              </li>
              <li>
                <Link to="/releases" className="footer-link text-gray-400 hover:text-white block">Releases</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4 relative w-fit">
              Get in touch
              <span className="absolute -bottom-1.5 left-0 w-8 h-[2px] bg-[#e51e25] rounded-full" />
            </h4>

            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-[#e51e25] mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                Movie Dekho Cinemas, Akshat Mall,<br />
                Jhalawar Road, Kota,<br />
                Rajasthan – 324005, India
              </p>
            </div>

            <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm footer-link hover:text-white text-gray-400">
              <Phone className="w-4 h-4 text-[#e51e25] shrink-0" />
              <p>+91 98765 43210</p>
            </a>

            <a href="mailto:support@moviedekho.com" className="flex items-center gap-2.5 text-sm footer-link hover:text-white text-gray-400">
              <Mail className="w-4 h-4 text-[#e51e25] shrink-0" />
              <p>support@moviedekho.com</p>
            </a>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="border-t border-gray-800 pt-6 pb-4 text-center">
          <p className="text-xs">
            Copyright 2026 © MovieDekho. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;