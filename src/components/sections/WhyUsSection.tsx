import React from "react";
import { verifiedWhyUs } from "../../config/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  TrendingUp,
  Users,
  Network,
  Settings,
  BarChart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award
} from "lucide-react";

export const WhyUsSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const getIcon = (name: string) => {
    switch (name) {
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-[#D4AF37]" />;
      case "UsersCheck": return <Users className="w-5 h-5 text-[#D4AF37]" />;
      case "Network": return <Network className="w-5 h-5 text-[#D4AF37]" />;
      case "Settings": return <Settings className="w-5 h-5 text-[#D4AF37]" />;
      case "BarChart": return <BarChart className="w-5 h-5 text-[#D4AF37]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Institutional Credibility Narrative */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B132B] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Institutional Differentiators</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
              Why Premier Colleges & Recruiters{" "}
              <span className="text-gold-gradient">Trust RR Academia</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
              We combine industry expertise, academic pedagogy, and corporate relationships to deliver measurable improvements in university placements, faculty competencies, and institutional rankings.
            </p>

            {/* Key Trust Summary Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B132B] text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Accreditation Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every training syllabus, industry guest lecture, and corporate MoU is meticulously mapped to NAAC Criteria 1, 2, and 5 and NBA outcome-based education benchmarks.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Pan-India College Reach</span>
                <span className="text-[#E5C158] font-bold">100+ Institutional MoUs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Grid of 6 Differentiators */}
          <div
            className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {verifiedWhyUs.map((item) => (
              <div
                key={item.title}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-lg transition-all duration-300 group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B132B] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0B132B] group-hover:text-[#B38F26] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-[#B38F26]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Capability</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
