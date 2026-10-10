import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import { ImageSlot } from "../components/common/ImageSlot";
import {
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Search
} from "lucide-react";

export const ServicesPage: React.FC = () => {
  const { services } = useSiteContent();
  const [searchTerm, setSearchTerm] = useState("");

  const activeServices = (services && services.length > 0 ? services : [])
    .filter((s) => s.published !== false)
    .sort((a, b) => a.order - b.order);

  const filteredServices = activeServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fullDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Institutional Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight">
            Institutional Services &{" "}
            <span className="text-gold-gradient">Capability Programs</span>
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl leading-relaxed">
            Engineered specifically to solve the real accreditation, placement, and pedagogical demands facing modern Indian educational institutions.
          </p>

          {/* Search bar */}
          <div className="pt-3 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services (e.g., placement, curriculum, NAAC)..."
                className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List with Detailed Cards */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No offerings matched &ldquo;{searchTerm}&rdquo;. Try another search keyword.
          </div>
        ) : (
          filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 ${
                index % 2 === 1 ? "bg-slate-50/60" : "bg-white"
              }`}
            >
              {/* Image (Ordered alternately on large screens) */}
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100">
                  <ImageSlot
                    slotKey={service.mediaSlot}
                    aspectRatio="16/9"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Details */}
              <div
                className={`lg:col-span-7 space-y-4 sm:space-y-5 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#0B132B] px-2.5 py-0.5 rounded-full">
                      Offering #{service.order}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B132B]">
                    {service.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Scope & Highlights */}
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Core Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-1">
                    <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Outcomes & Deliverables
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {service.deliverables.map((d, i) => (
                        <span
                          key={i}
                          className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 text-[#0B132B] border border-slate-200"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Request Proposal for {service.title}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ServicesPage;
