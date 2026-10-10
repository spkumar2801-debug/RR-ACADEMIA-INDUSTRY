import React, { useState, useEffect } from "react";
import { getSiteSettings, saveSiteSettings } from "../services/contentService";
import type { SiteSettings } from "../config/siteContent";
import { Save, CheckCircle2, Globe, Mail } from "lucide-react";

export const AdminContentPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      await saveSiteSettings(settings);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    } catch (e) {
      alert("Failed to save settings.");
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-center text-slate-500">Loading website content...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Website Content & Copy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Update homepage headlines, institutional narrative, and verified contact details
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Website content and contact information saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Homepage Hero Section Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-[#0B132B]">
              Homepage Hero Section
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Hero Lead Paragraph
              </label>
              <textarea
                rows={3}
                value={settings.heroSubheadline}
                onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Contact Details & Office Hours */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-[#0B132B]">
              Verified Contact Information & Office Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Official Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Headquarters Location
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Phone Display Text
              </label>
              <input
                type="text"
                value={settings.phoneDisplay}
                onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Weekdays Hours
              </label>
              <input
                type="text"
                value={settings.officeHours.weekdays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    officeHours: { ...settings.officeHours, weekdays: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Saturday Hours
              </label>
              <input
                type="text"
                value={settings.officeHours.saturday}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    officeHours: { ...settings.officeHours, saturday: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Sunday Hours
              </label>
              <input
                type="text"
                value={settings.officeHours.sunday}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    officeHours: { ...settings.officeHours, sunday: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-extrabold px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Website Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminContentPage;
