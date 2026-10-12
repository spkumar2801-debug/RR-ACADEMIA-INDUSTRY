import React, { useState } from "react";
import { getMediaItem } from "../../config/media";
import { getOptimizedImageUrl } from "../../services/cloudinary";
import { useSiteContent } from "../../context/SiteContentContext";

interface ImageSlotProps {
  slotKey: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "3/2" | "auto";
  alt?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  caption?: string;
  showAdminBadge?: boolean;
  onAdminEdit?: () => void;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  slotKey,
  className = "",
  aspectRatio,
  alt,
  priority = false,
  objectFit = "cover",
  caption,
  showAdminBadge = false,
  onAdminEdit
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { media: contextMedia } = useSiteContent();

  const media = contextMedia?.[slotKey] || getMediaItem(slotKey);
  const resolvedAspect = aspectRatio || media.aspectRatio || "16/9";
  const imageSrc = getOptimizedImageUrl(media.url);
  const altText = alt || media.alt || media.title || "RR Academia & Industry Connect Media";

  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    "3/2": "aspect-[3/2]",
    "auto": "aspect-auto"
  }[resolvedAspect];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-100 group ${aspectClass} ${className}`}
      data-slot-key={slotKey}
    >
      {/* Skeleton Loading State */}
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton-shimmer z-0" aria-hidden="true" />
      )}

      {/* Actual Image */}
      {!error ? (
        <img
          src={imageSrc}
          alt={altText}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full transition-all duration-700 ${
            objectFit === "contain" ? "object-contain" : "object-cover"
          } ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />
      ) : (
        /* Fallback Elegant Pattern */
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] to-[#1C2541] flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-2">
            <span className="text-[#D4AF37] font-serif font-bold text-lg">RR</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#E5C158] font-semibold">
            {media.title || "RR Academia"}
          </span>
          <span className="text-[11px] text-slate-300 mt-1 max-w-[200px] line-clamp-2">
            {media.description}
          </span>
        </div>
      )}

      {/* Subtle Caption Overlay if requested */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-medium backdrop-blur-xs">
          {caption}
        </div>
      )}

      {/* Admin Quick Replacement Action */}
      {showAdminBadge && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdminEdit?.();
            }}
            className="bg-[#0B132B]/90 hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Slot: {slotKey}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSlot;
