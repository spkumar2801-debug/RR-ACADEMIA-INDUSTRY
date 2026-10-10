import React from "react";

interface LogoProps {
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
  const isLightText = theme === "light";

  const markSize = {
    sm: 30,
    md: 40,
    lg: 52,
    xl: 72
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none min-w-0 max-w-full ${className}`}>
      {/* Bespoke Geometric Vector Monogram: Intertwined RR Arch & Industry Gateway */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rrNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="100%" stopColor="#1C2541" />
          </linearGradient>
          <linearGradient id="rrGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#E5C158" />
            <stop offset="100%" stopColor="#B38F26" />
          </linearGradient>
          <linearGradient id="rrBlueAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Shield / Gateway Foundation */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="22"
          fill="url(#rrNavyGrad)"
          stroke="url(#rrGoldGrad)"
          strokeWidth="2.5"
          filter="url(#subtleGlow)"
        />

        {/* Subtle Architectural Grid Lines */}
        <path
          d="M20 74 L80 74"
          stroke="url(#rrGoldGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="2 3"
        />

        {/* First 'R' - Academia Pillar (Left) */}
        <path
          d="M26 26 V74 M26 26 H44 C51 26 55 30 55 37 C55 44 51 48 44 48 H26 M42 48 L56 74"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Second 'R' - Industry Interlock (Right, Accent Gold) */}
        <path
          d="M48 30 V74 M48 30 H64 C70 30 74 34 74 40 C74 46 70 50 64 50 H48 M62 50 L75 74"
          stroke="url(#rrGoldGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Intersecting Academic Crown / Spark */}
        <circle cx="75" cy="24" r="3.5" fill="url(#rrGoldGrad)" />
      </svg>

      {/* Typography Wordmark with fluid responsive scaling */}
      {variant !== "mark" && (
        <div className="flex flex-col justify-center leading-none min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-serif tracking-tight font-extrabold truncate ${
                isLightText ? "text-white" : "text-[#0B132B]"
              } ${
                size === "sm"
                  ? "text-sm sm:text-base"
                  : size === "lg"
                  ? "text-xl sm:text-2xl"
                  : size === "xl"
                  ? "text-2xl sm:text-3xl"
                  : "text-base sm:text-lg"
              }`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              RR ACADEMIA
            </span>
            {variant === "full" && (
              <span className="hidden md:inline-block text-[#D4AF37] font-semibold text-[10px] tracking-widest uppercase">
                EST.
              </span>
            )}
          </div>
          {variant === "full" ? (
            <span
              className={`font-sans font-semibold uppercase ${
                hideSubtitleOnMobile ? "hidden sm:block" : "block"
              } text-[9px] sm:text-[10px] md:text-[11px] mt-0.5 tracking-wider sm:tracking-widest truncate ${
                isLightText ? "text-[#E5C158]" : "text-[#B38F26]"
              }`}
            >
              & INDUSTRY CONNECT
            </span>
          ) : (
            <span className="text-[10px] text-gray-400 font-medium">CONNECT</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
