import React from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  Handshake,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const ServicesPreviewSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // 3 curated capability pillars representing the core offering spectrum
  const highlights = [
    {
      icon: <Handshake className="w-5 h-5 text-[#D4AF37]" />,
      title: "Industry–Academia Collaboration",
      category: "Corporate Alliances",
      description:
        "Bilateral corporate MoUs, executive guest masterclasses, and corporate-sponsored labs connecting departments directly with industry leaders.",
      outcomes: ["Bilateral MoUs", "Corporate Advisory Boards", "Joint Tech Labs"]
    },
    {
      icon: <Briefcase className="w-5 h-5 text-[#D4AF37]" />,
      title: "Internship & Placement Support",
      category: "Career Acceleration",
      description:
        "Structured recruitment drives, pre-placement competency training, and corporate interview pathways with our 500+ partner network.",
      outcomes: ["500+ Corporate Network", "95% Verified Placement", "Paid Internships"]
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#D4AF37]" />,
      title: "Curriculum Modernization",
      category: "Academic Pedagogy",
      description:
        "Aligning syllabus with real-time enterprise tools, faculty development programs, and compliance benchmarks for NAAC & NBA criteria.",
      outcomes: ["NAAC & NBA Benchmarking", "Faculty Upskilling", "Industry 4.0 Syllabi"]
    }
  ];

  return (
    <section
      id="services-preview"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B132B]/5 border border-[#D4AF37]/30 text-[#0B132B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B38F26]" />
            <span>Institutional Solutions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            Comprehensive Programs for Higher Education
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We deliver tailored solutions across placement drives, pedagogy enhancement, and corporate governance to transform student employability and institutional standing.
          </p>
        </div>

        {/* 3 Curated Highlight Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0B132B] flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B38F26] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B132B]">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Scope Highlights */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100">
                  {item.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B132B] hover:text-[#B38F26] transition-colors group"
                >
                  <span>Learn more about this offering</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Prominent Callout & Link to Full Services Catalog */}
        <div
          className={`bg-[#0B132B] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 shadow-xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Looking for our complete catalog of institutional solutions?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore all 10 verified offerings, including Faculty Development, Research Consultancy, and Accreditation Support.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex-shrink-0 w-full sm:w-auto"
          >
            <span>Explore All 10 Offerings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
