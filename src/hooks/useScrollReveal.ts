import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", delayMs = 0 } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsVisible(true), delayMs);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delayMs]);

  return { ref, isVisible };
}

export default useScrollReveal;
