import React from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../../context/SiteContentContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Camera, ArrowRight, MapPin, Calendar } from "lucide-react";

export const GalleryPreviewSection: React.FC = () => {
  const { galleryItems } = useSiteContent();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Curate top 4 published items for homepage preview
  const previewItems = galleryItems
    .filter((item) => item.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 4);

  return (
    <section
      id="gallery-preview"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#0B132B] text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#1C2541]/80 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and "View All" Link */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-3 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Campus Moments & Summits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Institutional Impact in{" "}
              <span className="text-gold-gradient">Photographs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real moments from our industry summits, corporate orientation programs, campus MoUs, and pedagogical workshops across India.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E5C158] hover:text-[#D4AF37] border-b border-[#D4AF37]/40 pb-1 self-start md:self-end hover:border-[#D4AF37] transition-all group"
          >
            <span>View Complete Institutional Gallery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Item Curated Visual Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {previewItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#1C2541]/40 flex flex-col shadow-lg hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    (e.currentTarget as HTMLImageElement).src = "/images/original-hero.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/80 text-[#E5C158] border border-[#D4AF37]/30 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Text Caption Container */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E5C158] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* Date or Location */}
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  {item.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.date}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span className="truncate max-w-[110px]">{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/gallery"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-xs border border-white/20 active:scale-98 transition-all"
          >
            <span>Explore All Photographs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreviewSection;
