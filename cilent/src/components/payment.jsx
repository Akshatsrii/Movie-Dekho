import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { ArrowLeft, CreditCard, CheckCircle2, ShieldCheck, Ticket, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Parse state details passed from checkout
  const bookingId = location.state?.bookingId || null;
  const amount = location.state?.amount || 250;
  const orderType = location.state?.orderType || "booking";
  const screen = location.state?.screen || "";
  const seat = location.state?.seat || "";
  const items = location.state?.items || [];

  // Card input states
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  // Promo coupon states
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  // Card detector function
  const getCardBrand = (num) => {
    const cleanNum = num.replace(/\s?/g, "");
    if (cleanNum.startsWith("4")) return { name: "Visa", color: "bg-blue-600 border border-blue-500" };
    if (cleanNum.startsWith("5")) return { name: "Mastercard", color: "bg-orange-500 border border-orange-400" };
    if (cleanNum.startsWith("3")) return { name: "Amex", color: "bg-cyan-600 border border-cyan-500" };
    if (cleanNum.startsWith("6")) return { name: "RuPay", color: "bg-blue-800 border border-blue-700" };
    return null;
  };
  const cardBrand = getCardBrand(cardNumber);

  // Apply Coupon Handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (appliedCoupon) {
      toast.error("A coupon code has already been applied!");
      return;
    }
    if (code === "WELCOME100") {
      setDiscount(100);
      setAppliedCoupon("WELCOME100");
      toast.success("Promo WELCOME100 applied! ₹100 discount applied.");
      setCouponInput("");
    } else if (code === "SNACK50") {
      setDiscount(50);
      setAppliedCoupon("SNACK50");
      toast.success("Promo SNACK50 applied! ₹50 discount applied.");
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code. Try WELCOME100!");
    }
  };

  const payableTotal = Math.max(0, amount - discount);

  const { getToken, axios } = useAppContext();

  const handlePayment = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Processing secure Stripe payment...", { id: "stripe_payment" });

    try {
      const token = await getToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (orderType === "food_delivery") {
        // Process standalone in-theater food delivery order in DB
        const { data } = await axios.post("/api/food-order/create", {
          screen,
          seat,
          items,
          amount: payableTotal
        }, { headers });

        if (data.success) {
          const newOrder = {
            id: data.foodOrder._id,
            screen,
            seat,
            amount: payableTotal,
            items,
            status: "Placed"
          };
          const localOrders = JSON.parse(localStorage.getItem("theater_food_orders") || "[]");
          localOrders.push(newOrder);
          localStorage.setItem("theater_food_orders", JSON.stringify(localOrders));

          toast.success("Payment Successful! Order sent to Screen.", { id: "stripe_payment" });
          setPaymentSuccess(true);
          
          setTimeout(() => {
            navigate("/food-order");
          }, 1500);
        } else {
          toast.error(data.message || "Failed to place food order.", { id: "stripe_payment" });
        }
      } else {
        // Process ticket booking checkout payment in DB
        if (bookingId) {
          const { data } = await axios.post("/api/booking/confirm-payment", { bookingId }, { headers });

          if (data.success) {
            const localBookings = JSON.parse(localStorage.getItem("movie_bookings") || "[]");
            const updatedBookings = localBookings.map((b) => {
              if (String(b._id) === String(bookingId)) {
                return { ...b, isPaid: true };
              }
              return b;
            });
            localStorage.setItem("movie_bookings", JSON.stringify(updatedBookings));

            toast.success("Payment Successful! Tickets generated.", { id: "stripe_payment" });
            setPaymentSuccess(true);
            
            setTimeout(() => {
              navigate("/my-bookings");
            }, 1500);
          } else {
            toast.error(data.message || "Failed to confirm ticket payment.", { id: "stripe_payment" });
          }
        } else {
          toast.error("No booking ID found.", { id: "stripe_payment" });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.", { id: "stripe_payment" });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-zinc-950 bg-[#fffaf9] overflow-hidden px-6">
      {/* Decorative Blur Circles */}
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="100px" right="100px" />

      {/* Soft reddish glow patches */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#e51e25]/10 blur-[100px] z-0" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 left-6 md:left-16 flex items-center gap-1 text-zinc-500 hover:text-[#e51e25] transition z-10 font-bold cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Cancel Payment
      </button>

      <div className="w-full max-w-md bg-white border border-[#e51e25]/20 rounded-3xl shadow-2xl p-8 relative z-10">
        
        {/* Stripe Header */}
        <div className="flex flex-col items-center text-center mb-6 border-b border-zinc-150 pb-4">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[#635bff] font-extrabold text-3xl italic tracking-tighter select-none">stripe</span>
            <span className="bg-[#635bff]/10 border border-[#635bff]/20 text-[#635bff] text-[10px] px-2 py-0.5 font-bold rounded-md uppercase tracking-wider">
              Secure Checkout
            </span>
          </div>
          <p className="text-zinc-400 text-xs font-semibold">Secure SSL Payment Terminal</p>
        </div>

        {!paymentSuccess ? (
          <div className="flex flex-col gap-5">
            
            {/* Promo Codes Block */}
            <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-2xl">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-500 mb-2">
                <span>PROMO COUPON CODE</span>
                <span className="text-[#e51e25] flex items-center gap-0.5"><Sparkles className="w-3 h-3 animate-spin" /> WELCOME100</span>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME100"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-white px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold focus:outline-none uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-zinc-950 text-white font-bold text-xs px-4 py-1.5 rounded-xl hover:bg-black transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <p className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-200 mt-2">
                  ✓ Coupon {appliedCoupon} applied! ₹{discount} discount saved.
                </p>
              )}
            </div>

            <form onSubmit={handlePayment} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 text-zinc-950 border border-zinc-200 focus:border-[#e51e25] focus:outline-none text-sm font-semibold shadow-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">
                  Card Number
                </label>
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 focus-within:border-[#e51e25] rounded-xl px-3 shadow-sm relative">
                  <CreditCard className="text-zinc-400 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    required
                    maxLength="16"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full py-2.5 bg-transparent text-zinc-950 focus:outline-none text-sm font-semibold pr-16"
                    placeholder="4242 4242 4242 4242"
                  />
                  {cardBrand && (
                    <span className={`absolute right-3 px-2 py-0.5 rounded text-[10px] font-black uppercase ${cardBrand.color}`}>
                      {cardBrand.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 text-zinc-950 border border-zinc-200 focus:border-[#e51e25] focus:outline-none text-sm font-semibold shadow-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    required
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 text-zinc-950 border border-zinc-200 focus:border-[#e51e25] focus:outline-none text-sm font-semibold shadow-sm"
                    placeholder="***"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-2">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 text-zinc-950 border border-zinc-200 focus:border-[#e51e25] focus:outline-none text-sm font-semibold shadow-sm"
                  placeholder="400001"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#e51e25] hover:bg-[#c4161c] text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all mt-4 shadow-[0_4px_14px_rgba(229,30,37,0.35)] cursor-pointer text-sm"
              >
                Pay ₹{payableTotal} with Stripe
              </button>

              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs mt-2 border-t border-zinc-100 pt-4">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>AES-256 Bit Payment Encrypted</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold mb-2 text-zinc-950">Payment Successful!</h3>
            <p className="text-zinc-500 text-sm">
              {orderType === "food_delivery"
                ? "Redirecting to Live Order Tracker..."
                : "Redirecting you to bookings..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
