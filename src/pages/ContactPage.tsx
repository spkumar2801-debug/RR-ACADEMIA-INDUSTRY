import React from "react";
import { ContactSection } from "../components/sections/ContactSection";
import { FaqSection } from "../components/sections/FaqSection";
import { Sparkles } from "lucide-react";

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0B132B] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Schedule a Consultation
          </h1>
          <p className="text-slate-300 max-w-xl text-base">
            Reach out to our leadership advisory team located in Hyderabad to explore bilateral campus alliances.
          </p>
        </div>
      </section>

      <ContactSection />
      <FaqSection />
    </div>
  );
};

export default ContactPage;
