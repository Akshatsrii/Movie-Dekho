import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Search, X, Menu, Ticket } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { favouriteMovies = [] } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { user } = useUser();
  const { openSignIn } = useClerk();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Show "Favorites" only if user is logged in AND has favourites
  const showFavorites = user && favouriteMovies.length > 0;

  return (
    <div className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between pl-2 pr-6 md:pl-4 md:pr-12 lg:pl-6 lg:pr-20 transition-all duration-300 text-zinc-900 ${
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-200/40 py-3.5" 
        : "bg-transparent py-5"
    }`}>

      {/* Inline styles for navbar polish (no other logic touched) */}
      <style>{`
        @keyframes navPop {
          0% { opacity: 0; transform: translateY(-14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .nav-pop { animation: navPop 0.6s ease-out both; }
        .nav-logo-icon { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .nav-logo:hover .nav-logo-icon { transform: rotate(-18deg) scale(1.1); }
        .nav-link { position: relative; padding-bottom: 2px; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -2px; width: 0; height: 2px;
          background: #e51e25; transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-login-btn { position: relative; overflow: hidden; }
        .nav-login-btn::before {
          content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: navBtnShine 3.4s ease-in-out infinite;
        }
        @keyframes navBtnShine { 0% { left: -75%; } 35%, 100% { left: 130%; } }
      `}</style>

      {/* LOGO — pulled tight into the left corner */}
      <Link to="/" className="nav-logo nav-pop flex items-center gap-1.5 max-md:flex-1 select-none group">
        <Ticket className="nav-logo-icon w-7 h-7 text-[#e51e25]" />
        <span className="text-2xl font-extrabold tracking-tight">
          <span className="text-zinc-950">Movie</span>
          <span className="text-[#e51e25] ml-0.5">Dekho</span>
        </span>
      </Link>

      {/* DESKTOP MENU */}
      <nav className="nav-pop hidden md:flex items-center justify-center gap-8 px-8 py-3 rounded-full border border-black/10 bg-black/5 text-zinc-800 font-medium transition-all duration-300" style={{ animationDelay: "0.1s" }}>
        <Link to="/" className="nav-link hover:text-black">Home</Link>
        <Link to="/movies" className="nav-link hover:text-black">Movies</Link>
        <Link to="/food-order" className="nav-link hover:text-black">Food Delivery</Link>
        <Link to="/" className="nav-link hover:text-black">Theaters</Link>
        <Link to="/releases" className="nav-link hover:text-black">Releases</Link>
        {showFavorites && (
          <Link to="/favorite" className="nav-link hover:text-black">
            Favorites
          </Link>
        )}
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-0 left-0 z-[100] w-[75%] h-screen flex flex-col items-start justify-start gap-8 px-8 py-24 backdrop-blur bg-black/90 font-medium text-lg text-white transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <X
          className="absolute top-6 right-6 w-6 h-6 cursor-pointer text-white hover:text-[#e51e25] transition-colors"
          onClick={() => setIsMenuOpen(false)}
        />

        <Link to="/" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/movies" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Movies
        </Link>
        <Link to="/food-order" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Food Delivery
        </Link>
        <Link to="/" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Theaters
        </Link>
        <Link to="/releases" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Releases
        </Link>
        {showFavorites && (
          <Link to="/favorite" className="hover:text-[#e51e25] transition-colors" onClick={() => setIsMenuOpen(false)}>
            Favorites
          </Link>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-pop flex items-center gap-8" style={{ animationDelay: "0.15s" }}>
        <Search className="max-md:hidden w-6 h-6 cursor-pointer hover:text-[#e51e25] transition-colors" />

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Bookings"
                href="/my-bookings"
                labelIcon={<Ticket className="w-4 h-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="nav-login-btn px-4 py-1 sm:px-7 sm:py-2 bg-[#e51e25] hover:bg-[#c4161c] text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-medium shadow-[0_4px_14px_rgba(229,30,37,0.4)]"
          >
            Login
          </button>
        )}

        <Menu
          className="md:hidden w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;