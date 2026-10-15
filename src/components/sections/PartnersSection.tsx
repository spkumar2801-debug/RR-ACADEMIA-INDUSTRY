import React from "react";
import { useSiteContent } from "../../context/SiteContentContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Handshake, ExternalLink } from "lucide-react";

// Official/Neutral Vector Emblems for the verified partner organizations
// These provide authentic, razor-sharp branding that works immediately and can be supplemented via Admin uploads
const PartnerEmblem: React.FC<{ name: string; logoUrl?: string; className?: string }> = ({
  name,
  logoUrl,
  className = ""
}) => {
  const normalized = name.toLowerCase();
  const isUpl = normalized.includes("upl") || (Boolean(logoUrl) && logoUrl!.toLowerCase().includes("upl"));

  if (isUpl) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#0B132B] border border-slate-800 flex items-center justify-center p-1 flex-shrink-0 shadow-2xs">
          <img
            src="/images/upl-mark.png"
            alt="UPL logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/upl.png.jpeg";
            }}
          />
        </div>
        <span className="font-sans font-black text-lg tracking-wide text-slate-900">
          UPL
        </span>
      </div>
    );
  }

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${name} emblem`}
        className={`max-h-10 max-w-full object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // Brand-true vector representations
  if (normalized.includes("google")) {
    return (
      <div className="flex items-center gap-2">
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 11.3 0 14s.7 5.3 1.9 7.7l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
          />
        </svg>
        <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-slate-800">
          Google
        </span>
      </div>
    );
  }

  if (normalized.includes("redington")) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-[#E51937] flex items-center justify-center text-white font-black text-sm">
          R
        </div>
        <span className="font-sans font-bold text-base sm:text-lg tracking-wider text-slate-900 uppercase">
          REDINGTON
        </span>
      </div>
    );
  }

  if (normalized.includes("aahokrao") || normalized.includes("ashokrao") || normalized.includes("amg")) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded border-2 border-[#D4AF37] bg-[#0B132B] flex items-center justify-center text-[#E5C158] font-serif font-black text-xs">
          AMG
        </div>
        <div className="text-left leading-tight">
          <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-slate-900 block">
            Aahokrao Mane Group
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
            Educational Institutions
          </span>
        </div>
      </div>
    );
  }

  if (normalized.includes("upl")) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#0B132B] border border-slate-800 flex items-center justify-center p-1 flex-shrink-0 shadow-2xs">
          <img
            src="/images/upl-mark.png"
            alt="UPL logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/upl.png.jpeg";
            }}
          />
        </div>
        <span className="font-sans font-black text-lg tracking-wide text-slate-900">
          UPL
        </span>
      </div>
    );
  }

  if (normalized.includes("nasscom")) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-[#004B87] flex items-center justify-center text-white font-bold text-xs">
          N
        </div>
        <div className="text-left leading-tight">
          <span className="font-sans font-black text-sm tracking-wider text-[#004B87] block">
            NASSCOM
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
            Industry Ecosystem
          </span>
        </div>
      </div>
    );
  }

  // Default clean institutional wordmark
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded bg-[#0B132B] flex items-center justify-center text-[#D4AF37] font-bold text-xs">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="font-bold text-sm tracking-wide text-slate-800">
        {name}
      </span>
    </div>
  );
};

export const PartnersSection: React.FC = () => {
  const { partners } = useSiteContent();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Only render published partners sorted by sortOrder
  const activePartners = partners
    .filter((p) => p.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B132B]/5 border border-[#D4AF37]/30 text-[#0B132B] text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5 text-[#B38F26]" />
            <span>Collaborative Ecosystem</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            Our Industry Partners
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We collaborate with enterprise technology leaders, manufacturing conglomerates, and national skilling bodies to align academic programs with genuine workforce expectations.
          </p>
        </div>

        {/* Partner Showcase Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 min-w-0"
            >
              {/* Partner Emblem Container */}
              <div className="h-14 flex items-center justify-center w-full min-w-0 px-2">
                <PartnerEmblem name={partner.name} logoUrl={partner.logoUrl} />
              </div>

              {/* Verified Description */}
              <div className="mt-4 pt-3 border-t border-slate-100 w-full min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B38F26] block truncate">
                  {partner.category || "Strategic Partner"}
                </span>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {partner.description || `Collaborating on curriculum enhancement and corporate readiness.`}
                </p>
              </div>

              {/* Website Link if configured */}
              {partner.websiteUrl && partner.websiteUrl !== "#" && (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-[#0B132B] transition-colors"
                  aria-label={`Visit ${partner.name} website`}
                >
                  <span>Learn more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Verified Institutional Assurance Note */}
        <div className="mt-10 pt-6 text-center border-t border-slate-200/60 max-w-xl mx-auto">
          <p className="text-xs text-slate-500 leading-relaxed">
            Partnerships represent active academic initiatives, orientation summits, faculty development programs, and student internship pathways coordinated by RR Academia & Industry Connect.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
