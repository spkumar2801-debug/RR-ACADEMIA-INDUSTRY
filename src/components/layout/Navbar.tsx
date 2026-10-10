import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../common/Logo";
import { Menu, X, ArrowUpRight, ShieldCheck, PhoneCall } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Partners", path: "/#partners" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact Us", path: "/contact" }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path.startsWith("/#")) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "glass-nav-scrolled py-2.5 sm:py-3 shadow-lg"
            : "bg-white/95 backdrop-blur-md py-3 sm:py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 min-w-0">
            {/* Logo - fluid and unconstrained */}
            <Link
              to="/"
              className="flex items-center min-w-0 flex-shrink focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
              aria-label="RR Academia & Industry Connect Home"
            >
              <Logo
                variant="full"
                theme={isScrolled ? "light" : "dark"}
                size="md"
                hideSubtitleOnMobile={true}
              />
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded ${
                    isScrolled
                      ? isActive(link.path)
                        ? "text-[#E5C158]"
                        : "text-slate-200 hover:text-white"
                      : isActive(link.path)
                      ? "text-[#0B132B] font-bold"
                      : "text-slate-600 hover:text-[#0B132B]"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? "bg-[#D4AF37]" : "bg-[#0B132B]"
                      }`}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/admin/login"
                className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                  isScrolled
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
                title="Admin Control Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>

              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Controls (< 1024px) */}
            <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0">
              {/* Partner CTA icon on tablet */}
              <Link
                to="/contact"
                className="hidden sm:inline-flex bg-[#D4AF37] text-[#0B132B] font-bold text-xs px-3 py-2 rounded-lg items-center gap-1 hover:brightness-105 transition-all"
              >
                <span>Partner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Accessible Hamburger Button with minimum 44x44px touch target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-[#0B132B] hover:bg-slate-100"
                }`}
                aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop & Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[60px] sm:top-[68px] z-40 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0B132B] border-b border-slate-800 px-5 pt-4 pb-8 space-y-5 shadow-2xl max-h-[calc(100vh-68px)] overflow-y-auto">
              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold py-3 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                      isActive(link.path)
                        ? "bg-[#D4AF37]/15 text-[#E5C158] border-l-4 border-[#D4AF37]"
                        : "text-slate-200 hover:bg-white/5 active:bg-white/10"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                    )}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-800/90 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </Link>

                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Administrator Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
