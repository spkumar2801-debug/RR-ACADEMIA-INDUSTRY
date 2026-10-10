import React from "react";
import { ImageSlot } from "../common/ImageSlot";
import { Sparkles, Calendar, Users, Award } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const ImpactGallerySection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#0B132B] text-white relative overflow-hidden"
    >
      {/* Background accents securely contained within section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#1C2541] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/35 text-[#E5C158] text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Real-World Institutional Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight">
            Academic Summits, MoUs &{" "}
            <span className="text-gold-gradient">Student Engagement</span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Witness the scale of our nationwide industry connect initiatives—from monumental student tech orientations with Google and AMG to high-level leadership inaugurations.
          </p>
        </div>

        {/* Editorial Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Photo: Grand Student Assembly (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative flex-1">
              <ImageSlot
                slotKey="heroBanner"
                aspectRatio="16/9"
                className="w-full h-full group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#0B132B]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-[#D4AF37]/40 text-[10px] sm:text-xs font-bold text-[#E5C158] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="truncate">Google & AMG Student Orientation</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-[#070D1F] border-t border-white/10">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1">
                Empowering Over 2,500 Engineering Undergraduates
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live interactive workshops orienting final-year engineering scholars on Google Cloud, emerging AI frameworks, and corporate placement readiness.
              </p>
            </div>
          </div>

          {/* Right Column: 2 Stacked Key Moments (5 cols) */}
          <div
            className={`lg:col-span-5 flex flex-col gap-5 sm:gap-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Ribbon Cutting Inauguration */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl group">
              <div className="relative">
                <ImageSlot
                  slotKey="ribbonCutting"
                  aspectRatio="16/9"
                  className="w-full group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-[#0B132B]/90 backdrop-blur-md px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20 text-[10px] sm:text-xs font-bold text-white">
                  <span>Facility Inauguration</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-[#070D1F]">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  Institutional Center of Excellence Launch
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dignitaries inaugurating bilateral corporate research lab and industry workspace on campus.
                </p>
              </div>
            </div>

            {/* Dignitaries Lamp Lighting */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl group">
              <div className="relative">
                <ImageSlot
                  slotKey="leadershipLighting"
                  aspectRatio="16/9"
                  className="w-full group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-[#0B132B]/90 backdrop-blur-md px-2.5 py-0.5 sm:py-1 rounded-full border border-[#D4AF37]/40 text-[10px] sm:text-xs font-bold text-[#E5C158]">
                  <span>Leadership Symposium</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-[#070D1F]">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                  Academic Dignitaries & Corporate Leadership
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ceremonial lamp lighting uniting university deans, chancellors, and corporate vice presidents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panoramic Moment: Responsive with zero text clipping */}
        <div
          className={`mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#070D1F] shadow-2xl transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            <ImageSlot
              slotKey="grandAuditorium"
              aspectRatio="16/9"
              className="w-full"
            />
            {/* Overlay for Tablet & Desktop, Clean integrated band for Mobile */}
            <div className="sm:absolute sm:bottom-0 sm:inset-x-0 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/90 to-transparent p-4 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t sm:border-t-0 border-white/10">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-0.5 sm:mb-1">
                  Campus-Wide Convergence
                </span>
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold truncate">
                  High-Impact Career Launch & Placement Summit
                </h3>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>Annual Partner Symposia</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>100% Industry Aligned</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactGallerySection;
