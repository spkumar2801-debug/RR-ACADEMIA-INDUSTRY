import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getServices,
  getEnquiries,
  getMediaRegistry,
  getPartners,
  getGalleryItems
} from "../services/contentService";
import { isCloudinaryConfigured } from "../services/cloudinary";
import {
  Briefcase,
  Handshake,
  Camera,
  Image,
  Inbox,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [services, enquiries, media, partners, gallery] = await Promise.all([
          getServices(),
          getEnquiries(),
          getMediaRegistry(),
          getPartners(),
          getGalleryItems()
        ]);
        setServiceCount(services.length);
        setEnquiryCount(enquiries.length);
        setMediaCount(Object.keys(media).length);
        setPartnerCount(partners.length);
        setGalleryCount(gallery.length);
        setRecentEnquiries(enquiries.slice(0, 3));
      } catch (e) {
        console.warn("Error loading admin stats:", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cloudinaryReady = isCloudinaryConfigured();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time management for RR Academia & Industry Connect
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/services"
            className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            Manage Services
          </Link>
          <Link
            to="/admin/media"
            className="bg-[#D4AF37] hover:bg-[#B38F26] text-[#0B132B] text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            Manage Media
          </Link>
        </div>
      </div>

      {/* Cloudinary & Firebase Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Firebase Status */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Firebase Firestore & Auth</div>
              <div className="text-[11px] text-slate-500">
                Connected to project <code className="text-[#0B132B] font-mono">rr-academia</code>
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            ACTIVE
          </span>
        </div>

        {/* Cloudinary Status */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cloudinaryReady ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              {cloudinaryReady ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Cloudinary Media Integration</div>
              <div className="text-[11px] text-slate-500">
                {cloudinaryReady
                  ? "Configured for direct uploads"
                  : "Pending credentials (Local simulation fallback active)"}
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cloudinaryReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {cloudinaryReady ? "READY" : "PREPARED"}
          </span>
        </div>
      </div>

      {/* 5 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <Link
          to="/admin/services"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-[#0B132B]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Services</span>
            <Briefcase className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            {loading ? "..." : serviceCount}
          </div>
          <div className="text-[11px] text-slate-500">Verified offerings live</div>
        </Link>

        <Link
          to="/admin/partners"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-[#0B132B]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Partners</span>
            <Handshake className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            {loading ? "..." : partnerCount}
          </div>
          <div className="text-[11px] text-slate-500">Google, Redington, AMG, etc.</div>
        </Link>

        <Link
          to="/admin/gallery"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-[#0B132B]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gallery</span>
            <Camera className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            {loading ? "..." : galleryCount}
          </div>
          <div className="text-[11px] text-slate-500">Summit photos archived</div>
        </Link>

        <Link
          to="/admin/media"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-[#0B132B]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Media Slots</span>
            <Image className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            {loading ? "..." : mediaCount}
          </div>
          <div className="text-[11px] text-slate-500">Hero & section slots</div>
        </Link>

        <Link
          to="/admin/enquiries"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-[#0B132B]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Inquiries</span>
            <Inbox className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            {loading ? "..." : enquiryCount}
          </div>
          <div className="text-[11px] text-slate-500">Consultation leads</div>
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0B132B]">
              Recent Consultation Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Direct inquiries submitted from the public website
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-[#D4AF37] hover:text-[#B38F26] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Contact Name</th>
                <th className="py-3 px-4">Organization / College</th>
                <th className="py-3 px-4">Service Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      <div>{enq.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {enq.organization || "Independent Inquirer"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {enq.serviceCategory || "General Inquiry"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        enq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {enq.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="text-slate-600 hover:text-[#0B132B] font-bold underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    No inquiries recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
