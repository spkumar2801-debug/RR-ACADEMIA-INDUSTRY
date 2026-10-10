import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";
import type { ServiceItem } from "../../config/siteContent";
import { ImageSlot } from "../common/ImageSlot";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  Handshake,
  Briefcase,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Rocket,
  Users,
  Award,
  Megaphone,
  Sliders,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Layers
} from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { services } = useSiteContent();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.05 });

  const publishedServices = (services && services.length > 0 ? services : [])
    .filter((s) => s.published !== false)
    .sort((a, b) => a.order - b.order);

  const flagshipService = publishedServices[0];
  const otherServices = publishedServices.slice(1);

  const categories = [
    { id: "all", label: "All Offerings" },
    { id: "placement", label: "Corporate & Placements" },
    { id: "academic", label: "Academic & Pedagogy" },
    { id: "institutional", label: "Research & Accreditation" }
  ];

  const filteredOtherServices = otherServices.filter((s) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "placement") {
      return (
        s.slug.includes("placement") ||
        s.slug.includes("internship") ||
        s.slug.includes("industry") ||
        s.slug.includes("branding")
      );
    }
    if (activeCategory === "academic") {
      return (
        s.slug.includes("skill") ||
        s.slug.includes("curriculum") ||
        s.slug.includes("faculty") ||
        s.slug.includes("global")
      );
    }
    if (activeCategory === "institutional") {
      return (
        s.slug.includes("research") ||
        s.slug.includes("accreditation") ||
        s.slug.includes("entrepreneurship")
      );
    }
    return true;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case "Handshake": return <Handshake className="w-5 h-5" />;
      case "Briefcase": return <Briefcase className="w-5 h-5" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5" />;
      case "BookOpen": return <BookOpen className="w-5 h-5" />;
      case "FlaskConical": return <FlaskConical className="w-5 h-5" />;
      case "Rocket": return <Rocket className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "Megaphone": return <Megaphone className="w-5 h-5" />;
      default: return <Sliders className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0B132B] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Verified Institutional Offerings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            Comprehensive Solutions For{" "}
            <span className="text-gold-gradient">Institutions & Students</span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From strategic corporate alliances to student skill development and accreditation guidance, we offer end-to-end services that empower colleges and prepare graduates for high-growth careers.
          </p>
        </div>

        {/* BESPOKE EDITORIAL SPOTLIGHT: Flagship Service #1 */}
        {flagshipService && (
          <div
            className={`mb-12 sm:mb-16 rounded-2xl sm:rounded-3xl bg-[#0B132B] text-white border border-[#D4AF37]/30 shadow-2xl overflow-hidden transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Column: Flagship Highlights & CTAs */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B132B] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                    Flagship Pillar #{flagshipService.order}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    Premier Bilateral Framework
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {flagshipService.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {flagshipService.fullDescription}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                  {flagshipService.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to={`/contact?service=${encodeURIComponent(flagshipService.title)}`}
                    className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold px-6 py-3 rounded-xl shadow-lg hover:brightness-105 transition-all text-center text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <span>Initiate Corporate Alliance</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedService(flagshipService)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer"
                  >
                    View Complete Scope
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Frame */}
              <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900">
                  <ImageSlot
                    slotKey={flagshipService.mediaSlot}
                    aspectRatio="4/3"
                    className="w-full"
                  />
                  <div className="p-4 bg-[#070D1F] border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E5C158]">
                      <Handshake className="w-4 h-4" />
                      <span>Over 100+ Active Institutional MoUs</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Direct industry linkage between engineering faculties and corporate recruitment teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#0B132B] text-[#E5C158] shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOtherServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#D4AF37]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
            >
              {/* Media Slot with Aspect Ratio */}
              <div className="relative overflow-hidden">
                <ImageSlot
                  slotKey={service.mediaSlot}
                  aspectRatio="16/9"
                  className="group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B132B]/90 backdrop-blur-md text-[#D4AF37] p-2 rounded-xl border border-[#D4AF37]/30 shadow-md">
                  {getIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#B38F26]">
                    Offering #{service.order}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B132B] group-hover:text-[#B38F26] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {service.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-[#0B132B] hover:text-[#D4AF37] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#D4AF37] text-slate-700 hover:text-[#0B132B] transition-colors"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Offerings Link */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#0B132B] hover:bg-[#1C2541] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <Layers className="w-4 h-4 text-[#E5C158]" />
            <span>Explore Complete Catalog of 10 Offerings</span>
          </Link>
        </div>
      </div>

      {/* Responsive Service Detail Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative">
              <ImageSlot
                slotKey={selectedService.mediaSlot}
                aspectRatio="16/9"
                className="w-full rounded-t-2xl"
              />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 bg-black/75 hover:bg-black text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0B132B] text-[10px] font-bold uppercase tracking-wider mb-2">
                  <span>Offering #{selectedService.order} Details</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
                  {selectedService.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedService.fullDescription}
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2.5">
                  Key Scope & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService.deliverables && selectedService.deliverables.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">
                    Deliverables & Outcomes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.deliverables.map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-[#0B132B] border border-slate-200"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <Link
                  to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                  className="px-5 py-2.5 rounded-xl bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold transition-colors text-center"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
