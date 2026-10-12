import React from "react";

export interface LogoProps {
  variant?: "full" | "compact" | "mark";
  theme?: "dark" | "light"; // 'dark' = dark text for light bg, 'light' = white/gold text for dark bg
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  hideSubtitleOnMobile?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "dark",
  className = "",
  size = "md",
  hideSubtitleOnMobile = true
}) => {
  const isLight = theme === "light";
  const shadowFilter = isLight
    ? "drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
    : "drop-shadow-[0_1px_3px_rgba(11,19,43,0.22)]";

  // If variant === 'mark', render the exact square 3D monogram emblem from the uploaded logo
  if (variant === "mark") {
    const markDimensions = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-14 h-14",
      xl: "w-20 h-20"
    }[size];

    return (
      <div className={`inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}>
        <img
          src="/images/rr-logo-mark-transparent.png"
          alt="RR Academia & Industry Connect"
          className={`${markDimensions} ${shadowFilter} object-contain transition-transform duration-300 hover:scale-105`}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // If variant === 'compact', render the compact logo proportionally
  if (variant === "compact") {
    const compactHeight = {
      sm: "h-7",
      md: "h-9",
      lg: "h-12",
      xl: "h-16"
    }[size];

    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/images/rr-logo-transparent.png"
          alt="RR Academia & Industry Connect"
          className={`${compactHeight} ${shadowFilter} w-auto object-contain transition-transform duration-300 hover:scale-105`}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Default: variant === 'full' -> The user's complete blue-and-gold RR logo
  // Preserving exact proportions (1024:373 aspect ratio)
  const fullHeight = {
    sm: "h-7 sm:h-8",
    md: "h-9 sm:h-11 md:h-12",
    lg: "h-12 sm:h-14 md:h-16",
    xl: "h-16 sm:h-20 md:h-24"
  }[size];

  // Optional mobile optimization if subtitle is hidden on ultra-compact mobile layouts
  const mobileClass = hideSubtitleOnMobile ? "max-h-[38px] sm:max-h-none" : "";

  return (
    <div className={`inline-flex items-center select-none min-w-0 max-w-full ${className}`}>
      <img
        src="/images/rr-logo-transparent.png"
        alt="RR Academia & Industry Connect"
        className={`${fullHeight} ${mobileClass} ${shadowFilter} w-auto max-w-full object-contain transition-transform duration-300 hover:scale-[1.02]`}
        style={{
          aspectRatio: "1024 / 373"
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;
