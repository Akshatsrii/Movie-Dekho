import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I cancel my booked tickets and get a refund?",
    answer: "You can cancel your tickets up to 2 hours before the scheduled showtime. Go to 'My Bookings', select the unpaid/paid ticket, and click 'Cancel Booking'. Paid tickets will be refunded to your original payment mode within 3-5 business days."
  },
  {
    question: "Can I pre-book snacks and beverages online?",
    answer: "Yes, absolutely! You can pre-book exclusive combos directly from our 'Pre-book Snacks' section on the Home page at up to 30% discount. Upon arrival at the cinema, just show your barcode/booking receipt at the counter to collect them."
  },
  {
    question: "What is the age criteria for children's movie tickets?",
    answer: "Children aged 3 years and above require a separate ticket for entry. For children under 3 years, entry is free but no separate seat will be allocated inside the auditorium."
  },
  {
    question: "Do you offer discounts for bulk or corporate bookings?",
    answer: "Yes! For corporate events, school groups, or bulk bookings (more than 20 tickets), please email us at support@moviedekho.com or contact us via our support page for special group discounts."
  },
  {
    question: "What formats are available for screenings?",
    answer: "We support standard 2D, digital 3D, IMAX, 4DX, and premium luxury recliner lounges (INSIGNIA). Format availability is displayed under the movie title when choosing show timings."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 bg-white overflow-hidden border-t border-zinc-200/30">
      <div className="pointer-events-none absolute top-12 -right-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />
      <div className="pointer-events-none absolute bottom-12 -left-24 w-[360px] h-[360px] rounded-full bg-[#e51e25]/5 blur-[90px] z-0" />

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3.5 py-1.5 bg-[#e51e25]/10 border border-[#e51e25]/20 text-[#e51e25] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            💬 Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3 select-none">
            Questions? We've Got Answers
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl">
            Everything you need to know about bookings, snack pre-orders, show timings, and cancellation rules.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "bg-[#fffaf9] border-[#e51e25]/30 shadow-[0_8px_30px_rgba(229,30,37,0.03)]" 
                    : "bg-zinc-50/50 border-zinc-200/80 hover:border-zinc-300 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-zinc-900 hover:text-[#e51e25] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-3.5 pr-4 text-sm md:text-base">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? "text-[#e51e25]" : "text-zinc-400"}`} />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4.5 h-4.5 text-[#e51e25] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-zinc-450 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-350 ease-in-out ${
                    isOpen ? "max-h-60 border-t border-zinc-200/40 p-5 md:p-6 bg-white" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-sm md:text-base text-zinc-550 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
