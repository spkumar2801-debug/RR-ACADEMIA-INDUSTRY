import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ServicesPreviewSection } from "../components/sections/ServicesPreviewSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { GalleryPreviewSection } from "../components/sections/GalleryPreviewSection";
import { ContactSection } from "../components/sections/ContactSection";

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle anchor links on initial navigation and hash change
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <main className="w-full">
      {/* 1. Hero: Headline, Primary CTA, Verified Summit Photo, Animated Achievement Counters */}
      <HeroSection />

      {/* 2. Short Institutional About Introduction & Heritage */}
      <AboutSection />

      {/* 3. Strategic Industry Partners: Google, Redington, Aahokrao Mane Group, UPL, NASSCOM */}
      <PartnersSection />

      {/* 4. Comprehensive Programs for Higher Education (Directly below Partners) */}
      <ServicesPreviewSection />

      {/* 5. Curated Institutional Gallery Preview */}
      <GalleryPreviewSection />

      {/* 6. Contact CTA & Consultation Inquiry Banner */}
      <ContactSection />
    </main>
  );
};

export default HomePage;
