import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Building, TrendingUp } from "lucide-react";
import { verifiedStats } from "../../config/siteContent";
import { ImageSlot } from "../common/ImageSlot";
import { AnimatedCounter } from "../common/AnimatedCounter";
import { useSiteContent } from "../../context/SiteContentContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const HeroSection: React.FC = () => {
  const { siteSettings } = useSiteContent();
  const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={heroRef}
      className="relative bg-[#070D1F] text-white pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden"
    >
      {/* Background Architectural Grid & Subtle Ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#D4AF37]/15 blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#1C2541]/80 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div
            className={`lg:col-span-7 min-w-0 space-y-5 sm:space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Elegant Institutional Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#E5C158] truncate">
                Premier Institutional Consultancy • Hyderabad
              </span>
            </div>

            {/* Main Headline with fluid typography */}
            <h1
              className="font-extrabold tracking-tight text-white leading-[1.12] text-balance"
              style={{
                fontSize: "clamp(1.85rem, 4.2vw + 0.75rem, 3.75rem)"
              }}
            >
              Where Academia Meets{" "}
              <span className="text-gold-gradient block sm:inline mt-1 sm:mt-0">
                Industry Excellence
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {siteSettings.heroSubheadline ||
                "We bridge the gap between education and employment. Partner with RR Academia & Industry Connect to deliver industry-aligned curriculum, hands-on training, and proven placement opportunities that transform students into career-ready professionals."}
            </p>

            {/* CTAs - Stacks on mobile, inline on tablet & desktop */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl hover:shadow-[#D4AF37]/20 hover:brightness-105 active:scale-98 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <Link
                to="/services"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-center transition-all text-sm sm:text-base hover:border-[#D4AF37]/50"
              >
                <span>Explore 10 Core Offerings</span>
              </Link>
            </div>

            {/* Trust Highlights - Responsive Wrap */}
            <div className="pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">NAAC & NBA Alignment</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Building className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">500+ Corporate Network</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <TrendingUp className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">95% Placement Record</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Summit Photo with Luxury Frame */}
          <div
            className={`lg:col-span-5 min-w-0 relative mt-6 lg:mt-0 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative mx-auto max-w-full lg:max-w-none w-full min-w-0">
              {/* Outer Golden Aura */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 via-[#B38F26]/20 to-[#1C2541] rounded-2xl blur-xs opacity-70" />

              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#0B132B] w-full min-w-0">
                <ImageSlot
                  slotKey="heroBanner"
                  aspectRatio="4/3"
                  priority={true}
                  className="w-full"
                />

                {/* Overlaid Event Badge with fluid sizing */}
                <div className="absolute bottom-0 inset-x-0 w-full max-w-full overflow-hidden bg-gradient-to-t from-[#070D1F] via-[#070D1F]/90 to-transparent p-2.5 sm:p-5 text-white">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap min-w-0">
                    <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B132B] flex-shrink-0">
                      Verified Summit
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-300 font-medium truncate min-w-0 max-w-[170px] sm:max-w-none">
                      Google & AMG Orientation
                    </span>
                  </div>
                  <h3 className="text-[11px] sm:text-sm font-bold text-white leading-snug line-clamp-2 break-words">
                    Over 2,500 students oriented with corporate tech leaders
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Verified Stats Counter Bar */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {verifiedStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5C158] font-cinzel">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1.5 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 line-clamp-2">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
