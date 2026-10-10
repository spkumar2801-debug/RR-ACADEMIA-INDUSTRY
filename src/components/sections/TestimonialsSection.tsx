import React from "react";
import { verifiedTestimonials } from "../../config/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Star, Quote, Building2, Sparkles } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0B132B] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Verified Institutional Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Institutional Voices &{" "}
            <span className="text-gold-gradient">Student Success Stories</span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Hear from institutions and students who have experienced the RR Academia difference across engineering, management, and higher education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {verifiedTestimonials.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between space-y-5 relative group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]/25 group-hover:text-[#D4AF37]/45 transition-colors" />
                </div>

                <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed italic">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0B132B] text-[#E5C158] font-bold font-serif flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B132B] truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                    {item.role}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#B38F26] font-semibold flex items-center gap-1 mt-0.5 truncate">
                    <Building2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{item.institution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
