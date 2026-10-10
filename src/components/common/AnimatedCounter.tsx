import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = "",
  durationMs = 1600,
  className = ""
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasStartedRef = useRef<boolean>(false);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion accessibility preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      hasStartedRef.current = true;
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const startTime = performance.now();
      const targetValue = value;
      const duration = durationMs;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);

        // Smooth cubic ease-out curve (fast initial acceleration, gentle decelerating finish)
        const ease = 1 - Math.pow(1 - progress, 3.2);
        const current = Math.round(ease * targetValue);

        setDisplayValue(current);

        if (progress < 1) {
          frameIdRef.current = requestAnimationFrame(step);
        } else {
          setDisplayValue(targetValue);
          frameIdRef.current = null;
        }
      };

      frameIdRef.current = requestAnimationFrame(step);
    };

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isInViewportNow =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) + 50 &&
      rect.bottom > -50;

    if (isInViewportNow) {
      startAnimation();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [value, durationMs]);

  return (
    <span
      ref={elementRef}
      className={`inline-flex items-baseline tabular-nums select-none ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      <span>{displayValue.toLocaleString("en-US")}</span>
      {suffix && <span className="text-[#D4AF37] ml-0.5">{suffix}</span>}
    </span>
  );
};

export default AnimatedCounter;
