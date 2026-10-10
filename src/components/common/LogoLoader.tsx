import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";

interface LogoLoaderProps {
  children: React.ReactNode;
}

const SESSION_STORAGE_KEY = "rr_academia_intro_seen_v3";

export const LogoLoader: React.FC<LogoLoaderProps> = ({ children }) => {
  // Determine if loader should be shown for this browsing session
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      // Respect prefers-reduced-motion accessibility preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
      return !sessionStorage.getItem(SESSION_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const [hasEntered, setHasEntered] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  // Lock body scroll while loader is visible
  useEffect(() => {
    if (shouldShow) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [shouldShow]);

  // Master visual animation sequence (~1,000ms duration)
  useEffect(() => {
    if (!shouldShow) return;

    // Step 1: Trigger entrance fade and panel scale
    const enterTimer = setTimeout(() => {
      setHasEntered(true);
      setProgressWidth(30);
    }, 50);

    // Step 2: Animate progress bar forward
    const progressTimer = setTimeout(() => {
      setProgressWidth(90);
    }, 450);

    // Step 3: Complete progress and trigger exit fade
    const fadeTimer = setTimeout(() => {
      setProgressWidth(100);
      setIsFadingOut(true);
    }, 900);

    // Step 4: Dismiss completely and release DOM
    const dismissTimer = setTimeout(() => {
      setShouldShow(false);
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch {}
    }, 1200);

    // Failsafe timer (1,400ms) to ensure loader never remains permanently visible
    const failsafeTimer = setTimeout(() => {
      setShouldShow(false);
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch {}
    }, 1400);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
      clearTimeout(failsafeTimer);
    };
  }, [shouldShow]);

  return (
    <>
      {shouldShow && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading RR Academia & Industry Connect"
          className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none transition-opacity duration-300 ease-out ${
            isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            backgroundColor: "rgba(7, 13, 31, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          {/* Centered Premium Light-Colored Institutional Panel */}
          <div
            className={`w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-3xl p-7 sm:p-9 shadow-2xl flex flex-col items-center text-center border border-[#D4AF37]/35 transform transition-all duration-500 ease-out ${
              !hasEntered
                ? "opacity-0 scale-95 translate-y-3"
                : isFadingOut
                ? "opacity-0 scale-98 translate-y-0"
                : "opacity-100 scale-100 translate-y-0"
            }`}
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.12)"
            }}
          >
            {/* Centered RR Academia Logo Mark */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-2xl blur-md" />
              <div className="relative">
                <Logo variant="mark" size="xl" />
              </div>
            </div>

            {/* Official Institutional Brand Name */}
            <h2
              className="text-lg sm:text-xl font-extrabold text-[#0B132B] tracking-wider leading-snug font-cinzel"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              RR ACADEMIA &amp; INDUSTRY
            </h2>

            {/* Subtitle / Department Identifier */}
            <p className="text-[10px] sm:text-[11px] font-bold text-[#B38F26] uppercase tracking-widest mt-1">
              ACADEMIA &amp; INDUSTRY CONNECT
            </p>

            {/* Refined Dual-Tone Progress Indicator */}
            <div className="w-36 sm:w-44 h-1 bg-slate-100 rounded-full mt-6 overflow-hidden relative border border-slate-200/80">
              <div
                className="h-full bg-gradient-to-r from-[#0B132B] via-[#D4AF37] to-[#E5C158] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressWidth}%`,
                  boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)"
                }}
              />
            </div>

            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-2.5">
              Bridging Education &amp; Corporate Excellence
            </p>
          </div>
        </div>
      )}

      {/* Main Website Content rendered behind the blurred overlay */}
      {children}
    </>
  );
};

export default LogoLoader;
