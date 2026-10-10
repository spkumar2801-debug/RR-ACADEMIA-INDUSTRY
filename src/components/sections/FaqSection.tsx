import React, { useState } from "react";
import { verifiedFaqs } from "../../config/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0B132B] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Institutional Guidance &{" "}
            <span className="text-gold-gradient">Answers</span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Find verified answers to common questions about our corporate partnerships, placement support, and how we collaborate with institutions.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {verifiedFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#D4AF37] bg-slate-50/70 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-[#0B132B] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0B132B] text-[#D4AF37] rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    <div className="pt-2 border-t border-slate-200/60">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
