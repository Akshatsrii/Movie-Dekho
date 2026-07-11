import React, { useState } from "react";
import { Sparkles, Award, Star, Mail } from "lucide-react";
import toast from "react-hot-toast";

const LoyaltySection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Movie Dekho Elite Club! Your discount code has been sent!");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 bg-[#fffaf9] overflow-hidden border-t border-zinc-200/30">
      <div className="pointer-events-none absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="bg-gradient-to-br from-white via-white to-zinc-50/50 border border-zinc-200/60 rounded-[32px] p-8 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Details Column */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e51e25] animate-pulse" />
              <span className="text-[#e51e25] font-extrabold text-xs uppercase tracking-wider">
                Movie Dekho Elite Club
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight select-none">
              Join Our Loyalty Club & Get Free Tickets!
            </h2>
            
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl">
              Become an Elite Club member today. Earn points on every ticket booking, unlock free snacks, and get early access to blockbusters!
            </p>

            {/* Benefit Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#e51e25]/10 rounded-xl">
                  <Award className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">10% Points</p>
                  <p className="text-xs text-zinc-400 font-medium">On every purchase</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#e51e25]/10 rounded-xl">
                  <Star className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">Free Snacks</p>
                  <p className="text-xs text-zinc-400 font-medium">On your birthday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#e51e25]/10 rounded-xl">
                  <Sparkles className="w-5 h-5 text-[#e51e25] flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">No Booking Fees</p>
                  <p className="text-xs text-zinc-400 font-medium">For premier shows</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full lg:w-96 bg-white border border-zinc-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col gap-5">
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight select-none">
                  Sign Up for Elite Access
                </h3>
                <p className="text-zinc-400 text-xs font-medium">
                  We'll send you a ₹100 discount coupon code instantly!
                </p>
                
                <div className="flex items-center gap-2.5 bg-zinc-50/50 border border-zinc-200/80 focus-within:border-[#e51e25]/50 focus-within:bg-white rounded-xl px-3.5 shadow-sm transition-all duration-300">
                  <Mail className="text-zinc-400 w-4.5 h-4.5 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 text-xs text-zinc-800 font-medium focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#e51e25] hover:bg-[#c4161c] text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(229,30,37,0.25)] hover:shadow-[0_6px_18px_rgba(229,30,37,0.4)] hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer uppercase tracking-wider"
                >
                  Join Elite Club
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <Sparkles className="w-12 h-12 text-[#e51e25] animate-bounce" />
                <h3 className="font-extrabold text-xl text-zinc-950">You're in the Club!</h3>
                <p className="text-sm text-zinc-450 font-medium">Check your email for the ₹100 discount code!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoyaltySection;
