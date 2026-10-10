import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "./Logo";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const prevPathRef = useRef(location.pathname);
  const isFirstMountRef = useRef(true);
  const timerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip on initial page load (handled by LogoLoader)
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      prevPathRef.current = location.pathname;
      return;
    }

    // Only trigger if the pathname actually changed (ignore hash-only or search param changes)
    if (location.pathname === prevPathRef.current) {
      return;
    }
    prevPathRef.current = location.pathname;

    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    // Scroll to top of new page
    window.scrollTo({ top: 0, behavior: "instant" });

    // Clear any previous running timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

    // Trigger internal branded transition (~320ms total duration)
    setIsNavigating(true);
    setIsFadingOut(false);
    setProgressWidth(25);

    const step1 = setTimeout(() => {
      setProgressWidth(95);
    }, 120);

    const step2 = setTimeout(() => {
      setProgressWidth(100);
      setIsFadingOut(true);
    }, 240);

    const step3 = setTimeout(() => {
      setIsNavigating(false);
      setIsFadingOut(false);
      setProgressWidth(0);
    }, 360);

    // Hard failsafe (450ms) to ensure overlay NEVER gets stuck
    const failsafe = setTimeout(() => {
      setIsNavigating(false);
      setIsFadingOut(false);
      setProgressWidth(0);
    }, 450);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(failsafe);
    };
  }, [location.pathname]);

  return (
    <>
      {isNavigating && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading page"
          className={`fixed inset-0 z-[99998] flex items-center justify-center p-4 select-none transition-opacity duration-150 ease-out pointer-events-none ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundColor: "rgba(7, 13, 31, 0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)"
          }}
        >
          {/* Centered Compact Institutional Transition Panel */}
          <div
            className={`w-full max-w-[280px] sm:max-w-[320px] bg-white rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center border border-[#D4AF37]/40 transform transition-all duration-150 ease-out ${
              isFadingOut ? "scale-98 opacity-90" : "scale-100 opacity-100"
            }`}
            style={{
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.15)"
            }}
          >
            {/* Centered RR Logo */}
            <div className="relative mb-2.5">
              <Logo variant="mark" size="md" />
            </div>

            {/* Brand Name */}
            <h3
              className="text-sm sm:text-base font-extrabold text-[#0B132B] tracking-wider leading-tight font-cinzel"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              RR ACADEMIA
            </h3>

            {/* Subtitle */}
            <p className="text-[9px] font-bold text-[#B38F26] uppercase tracking-widest mt-0.5">
              &amp; INDUSTRY CONNECT
            </p>

            {/* Fast Hairline Progress Indicator */}
            <div className="w-28 sm:w-36 h-0.5 bg-slate-100 rounded-full mt-3.5 overflow-hidden relative border border-slate-200/80">
              <div
                className="h-full bg-gradient-to-r from-[#0B132B] via-[#D4AF37] to-[#E5C158] rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${progressWidth}%`
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Destination Page Content */}
      <div className={`transition-opacity duration-200 ${isNavigating && !isFadingOut ? "opacity-90" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;
