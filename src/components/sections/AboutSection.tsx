import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Target, Sparkles } from "lucide-react";
import { ImageSlot } from "../common/ImageSlot";
import { verifiedCoreValues } from "../../config/siteContent";
import { useSiteContent } from "../../context/SiteContentContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const AboutSection: React.FC = () => {
  const { siteSettings } = useSiteContent();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Dual Image Visual Storytelling (Real Photos) */}
          <div
            className={`lg:col-span-6 relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <ImageSlot
                    slotKey="ribbonCutting"
                    aspectRatio="4/3"
                    caption="Center of Excellence Inauguration"
                  />
                </div>
                <div className="p-4 sm:p-6 rounded-2xl bg-[#0B132B] text-white space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel text-[#E5C158]">
                    500+
                  </div>
                  <div className="text-sm font-semibold">Corporate Alliances</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Active MoUs connecting academic departments with top enterprise recruiters.
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:pt-8">
                <div className="p-4 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200/60 space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel text-[#0B132B]">
                    95%
                  </div>
                  <div className="text-sm font-bold text-[#0B132B]">Placement Ratio</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Average student salary uplift of 40% across partner institutions.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <ImageSlot
                    slotKey="keynoteSpeaker"
                    aspectRatio="4/3"
                    caption="Academic Leadership Address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content & Mission */}
          <div
            className={`lg:col-span-6 space-y-5 sm:space-y-6 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B132B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>About {siteSettings.brandName || "RR Academia & Industry"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
              Transforming Colleges Into{" "}
              <span className="text-gold-gradient">Talent Powerhouses</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We are a force in the education-industry ecosystem, founded by experienced professionals who observed the persistent disconnect between theoretical classroom curricula and rapid employer expectations.
            </p>

            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-[#D4AF37] space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B132B]">
                <Target className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Our Core Mission</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Transform educational institutions into talent factories that produce job-ready professionals through industry-integrated programs, cutting-edge curriculum, and guaranteed career pathways.&rdquo;
              </p>
            </div>

            {/* 4 Core Pillars - Responsive wrap with no text clipping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              {verifiedCoreValues.map((val) => (
                <div key={val.title} className="space-y-1 p-2 sm:p-0">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B132B]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>{val.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-6">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B132B] hover:text-[#D4AF37] transition-colors"
              >
                <span>Read Full Institutional Vision & Leadership Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
