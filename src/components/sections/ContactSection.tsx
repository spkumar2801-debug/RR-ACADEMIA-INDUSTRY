import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { submitEnquiry } from "../../services/contentService";
import { useSiteContent } from "../../context/SiteContentContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Phone,
  MessageSquare,
  Sparkles
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { siteSettings, services } = useSiteContent();
  const location = useLocation();
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.05 });

  const initialService = services && services.length > 0 ? services[0].title : "Industry–Academia Collaboration";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceCategory: initialService,
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync service from query param if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, serviceCategory: decodeURIComponent(serviceParam) }));
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in your name, official email, and message.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const refId = await submitEnquiry(formData);
      setSuccess(
        `Your consultation request has been received (Ref: ${refId}). Our institutional advisory board will contact your office within 24 hours.`
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        serviceCategory: initialService,
        message: ""
      });
    } catch (err) {
      setError("Unable to submit enquiry right now. Please email " + siteSettings.email + " directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Verified Information & Office Hours */}
          <div
            className={`lg:col-span-5 space-y-6 sm:space-y-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0B132B] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Institutional Consultation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                Connect With Our{" "}
                <span className="text-gold-gradient">Advisory Team</span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Whether you are a university dean seeking placement transformation, or an enterprise recruiter looking to hire verified talents, we partner for long-term measurable outcomes.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-3 sm:space-y-4">
              {/* Location Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Headquarters
                  </h4>
                  <div className="text-sm sm:text-base font-bold text-[#0B132B] break-words">
                    {siteSettings.location}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Serving educational hubs across India
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Direct Institutional Inquiries
                  </h4>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-sm sm:text-base font-bold text-[#0B132B] hover:text-[#D4AF37] transition-colors break-all"
                  >
                    {siteSettings.email}
                  </a>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Monitored daily by senior academic directors
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#0B132B] text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-[#E5C158] font-bold text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verified Operating Hours</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Monday – Friday:</span>
                    <span className="font-semibold text-slate-200">{siteSettings.officeHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Saturday:</span>
                    <span className="font-semibold text-slate-200">{siteSettings.officeHours.saturday}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-slate-400">Sunday:</span>
                    <span className="text-slate-400 font-medium">{siteSettings.officeHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
              <div className="border-b border-slate-100 pb-3 sm:pb-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B132B]">
                  Schedule an Institutional Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out this brief inquiry form to initiate a customized campus roadmap.
                </p>
              </div>

              {success && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Inquiry Sent Successfully!</div>
                    <div className="mt-1 leading-relaxed">{success}</div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Rajesh Kumar"
                        className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Official Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="dean@university.edu.in"
                        className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Institution or Company
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Hyderabad Institute of Tech"
                        className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm bg-white"
                  >
                    {services && services.length > 0 ? (
                      services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))
                    ) : (
                      <option value="Industry–Academia Collaboration">
                        Industry–Academia Collaboration
                      </option>
                    )}
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institutional Requirements or Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your institution's department size, placement targets, or collaborative objectives..."
                      className="w-full min-w-0 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Submitting Inquiry..." : "Submit Institutional Consultation Request"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
