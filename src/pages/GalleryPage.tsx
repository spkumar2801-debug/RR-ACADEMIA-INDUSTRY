import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import { Camera, Calendar, MapPin, X, ZoomIn, ArrowLeft } from "lucide-react";
import type { GalleryItem } from "../config/siteContent";

type CategoryFilter = "all" | "summits" | "orientations" | "mou" | "workshops";

export const GalleryPage: React.FC = () => {
  const { galleryItems, loading } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Institutional Gallery & Event Photographs | RR Academia & Industry Connect";
  }, []);

  // Listen for Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All Photographs" },
    { key: "summits", label: "Summits & Conclaves" },
    { key: "orientations", label: "Corporate Orientations" },
    { key: "mou", label: "MoUs & Launches" },
    { key: "workshops", label: "Pedagogy Workshops" }
  ];

  const publishedItems = galleryItems
    .filter((item) => item.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const filteredItems = activeCategory === "all"
    ? publishedItems
    : publishedItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#1C2541]/80 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#E5C158] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Verified Photographic Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Institutional Gallery &{" "}
            <span className="text-gold-gradient">Conclave Records</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            A verified photographic archive of executive industry conclaves, student placement orientations with tech leaders, and academic modernization sessions coordinated across partner universities.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Category Filter Pills - Fluid Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-200/80 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-[#0B132B] text-[#E5C158] shadow-md border border-[#D4AF37]/50"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl bg-slate-200 animate-pulse h-64" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No photographs in this category</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Photographs for this category are being documented or pending publication. Select another category or check back shortly.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0B132B] text-white text-xs font-bold hover:bg-[#1C2541] transition-colors"
            >
              View All Photographs
            </button>
          </div>
        ) : (
          /* Photo Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/original-hero.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/20 text-white backdrop-blur-xs transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/85 text-[#E5C158] border border-[#D4AF37]/30 backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#B38F26] transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  {/* Meta Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    {item.date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#B38F26]" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B38F26]" />
                        <span className="truncate max-w-[140px]">{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox / Zoom Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0B132B] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header & Close */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B132B] flex-shrink-0">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold truncate">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Photo Container */}
            <div className="relative flex-1 overflow-auto bg-black flex items-center justify-center max-h-[60vh] sm:max-h-[68vh]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.altText || selectedPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-4 sm:p-5 bg-[#070D1F] border-t border-white/10 text-white space-y-2">
              {selectedPhoto.caption && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                {selectedPhoto.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{selectedPhoto.date}</span>
                  </div>
                )}
                {selectedPhoto.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
