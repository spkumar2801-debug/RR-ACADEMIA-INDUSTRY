import React from "react";
import { ImageSlot } from "../components/common/ImageSlot";
import { WhyUsSection } from "../components/sections/WhyUsSection";
import { verifiedCoreValues } from "../config/siteContent";
import { useSiteContent } from "../context/SiteContentContext";
import { Sparkles } from "lucide-react";

export const AboutPage: React.FC = () => {
  const { siteSettings } = useSiteContent();

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#D4AF37]/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight">
            Bridging Higher Education &{" "}
            <span className="text-gold-gradient">Corporate Reality</span>
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl leading-relaxed">
            {siteSettings.brandName} was founded to eliminate the deep systemic gap between conventional academic degrees and contemporary enterprise industry requirements.
          </p>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B]">
              The Story Behind Our Mission
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
              In an era of relentless technological disruption, university curricula often take years to evolve while corporate hiring requirements shift every few quarters. We observed brilliant, dedicated students graduating with top honors who struggled during technical interviews simply because they lacked exposure to enterprise-grade tools, production environments, and industry problem-solving frameworks.
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
              RR Academia & Industry Connect bridges this divide through direct partnerships. We work collaboratively with university chancellors, department heads, and academic boards to introduce real-time industry feedback, corporate internships, faculty upskilling, and certified placement pipelines.
            </p>

            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-[#D4AF37] space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#0B132B]">
                Our Guiding Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;To establish every partner institution as a renowned center of academic excellence and corporate placement superiority, ensuring no student is left unprepared for the modern economy.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <ImageSlot
                slotKey="aboutMain"
                aspectRatio="4/3"
                caption="Higher Educational Advisory & Campus Synergy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
              The Principles That Guide Every Partnership
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Integrity, academic rigor, and measurable student outcomes are at the heart of our consultancy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {verifiedCoreValues.map((val) => (
              <div
                key={val.title}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#D4AF37]/50 hover:shadow-lg transition-all space-y-2.5 sm:space-y-3"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-bold font-serif text-base sm:text-lg">
                  {val.title.charAt(0)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0B132B]">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summit Storytelling Visuals */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Moments of Institutional Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real campus inaugurations, summits, and student orientation initiatives across engineering hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <ImageSlot
              slotKey="ribbonCutting"
              aspectRatio="4/3"
              caption="Campus Collaboration Center Ribbon Cutting"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <ImageSlot
              slotKey="leadershipLighting"
              aspectRatio="4/3"
              caption="Symposium Lamp Lighting with Dignitaries"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <ImageSlot
              slotKey="keynoteSpeaker"
              aspectRatio="4/3"
              caption="Executive Keynote on Industry-Driven Pedagogy"
            />
          </div>
        </div>
      </section>

      {/* Institutional Differentiators & Why Us */}
      <WhyUsSection />
    </div>
  );
};

export default AboutPage;
