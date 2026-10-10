import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../common/Logo";
import { Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

export const Footer: React.FC = () => {
  const { siteSettings } = useSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070D1F] text-slate-300 border-t border-slate-800/80 pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Col */}
          <div className="space-y-4 sm:space-y-5">
            <Logo variant="full" theme="light" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Bridging the gap between academia and industry through innovative corporate partnerships, hands-on faculty development, and comprehensive student placement solutions.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-[#E5C158] border border-[#D4AF37]/30 max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">Hyderabad, India & Pan-India Operations</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>About RR Academia</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>All Offerings & Services</span>
                </Link>
              </li>
              <li>
                <Link to="/#partners" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>Industry Partners</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>Institutional Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-[#E5C158] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#E5C158] transition-colors flex-shrink-0" />
                  <span>Institutional Consultation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Key Offerings
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/services#industry-academia-collaboration" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Industry–Academia Collaboration
                </Link>
              </li>
              <li>
                <Link to="/services#internship-placement-support" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Internship & Placement Support
                </Link>
              </li>
              <li>
                <Link to="/services#student-skill-development" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Student Skill Development
                </Link>
              </li>
              <li>
                <Link to="/services#curriculum-enhancement" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Curriculum Modernization
                </Link>
              </li>
              <li>
                <Link to="/services#research-consultancy" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Research & Corporate Consultancy
                </Link>
              </li>
              <li>
                <Link to="/services#accreditation-quality-support" className="hover:text-[#E5C158] transition-colors line-clamp-1">
                  Accreditation & Quality Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="break-words">{siteSettings.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-[#E5C158] transition-colors break-all"
                >
                  {siteSettings.email}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>Office Hours</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Mon – Fri: {siteSettings.officeHours.weekdays}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Saturday: {siteSettings.officeHours.saturday}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Sunday: {siteSettings.officeHours.sunday}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            &copy; {currentYear} RR Academia & Industry Connect. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-[#E5C158] flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
