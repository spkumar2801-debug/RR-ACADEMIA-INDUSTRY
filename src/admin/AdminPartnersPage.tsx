import React, { useState, useMemo, useRef } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { savePartner, deletePartner } from "../services/contentService";
import type { PartnerItem } from "../config/siteContent";
import {
  uploadImage,
  validateImageFile
} from "../services/cloudinary";
import {
  Handshake,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  Search,
  CheckCircle2,
  Loader2,
  Save
} from "lucide-react";

interface GalleryPickerItem {
  id: string;
  title: string;
  url: string;
  category: string;
  source: string;
}

const defaultAssets: GalleryPickerItem[] = [
  {
    id: "asset-upl",
    title: "UPL University of Sustainable Technology",
    url: "/images/upl.png.jpeg",
    category: "branding",
    source: "Institutional Logo"
  },
  {
    id: "asset-rr-brand",
    title: "RR Academia Brand Identity Master",
    url: "/images/rr-logo-master.png",
    category: "branding",
    source: "Brand Asset"
  },
  {
    id: "asset-rr-full",
    title: "RR Academia Full Logo",
    url: "/images/rr-logo-full.png",
    category: "branding",
    source: "Brand Asset"
  },
  {
    id: "asset-rr-transparent",
    title: "RR Academia Transparent Mark",
    url: "/images/rr-logo-mark-transparent.png",
    category: "branding",
    source: "Brand Asset"
  }
];

export const AdminPartnersPage: React.FC = () => {
  const { partners, galleryItems, media, refreshContent } = useSiteContent();
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Gallery Picker State
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);
  const [selectedPickerUrl, setSelectedPickerUrl] = useState<string>("");
  const [gallerySearch, setGallerySearch] = useState("");
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState("all");
  const [showManualUrlInput, setShowManualUrlInput] = useState(false);
  const [uploadedAssets, setUploadedAssets] = useState<GalleryPickerItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Combine media and gallery items for selection
  const allMediaImages = useMemo(() => {
    const map = new Map<string, GalleryPickerItem>();

    // 1. Session uploaded assets first
    uploadedAssets.forEach((a) => map.set(a.url, a));

    // 2. Verified Institutional branding assets
    defaultAssets.forEach((a) => {
      if (!map.has(a.url)) map.set(a.url, a);
    });

    // 3. Existing Institutional Gallery Items
    galleryItems.forEach((g) => {
      if (g.imageUrl && !map.has(g.imageUrl)) {
        map.set(g.imageUrl, {
          id: g.id,
          title: g.title,
          url: g.imageUrl,
          category: g.category || "gallery",
          source: g.imageUrl.includes("res.cloudinary.com") ? "Cloudinary Gallery" : "Campus Gallery"
        });
      }
    });

    // 4. Existing Media Registry Slots
    Object.values(media).forEach((m) => {
      if (m?.url && !map.has(m.url)) {
        map.set(m.url, {
          id: m.id,
          title: m.title,
          url: m.url,
          category: m.category || "media",
          source: "Media Asset"
        });
      }
    });

    return Array.from(map.values());
  }, [galleryItems, media, uploadedAssets]);

  // Filtered gallery images based on search query & category filter
  const filteredImages = useMemo(() => {
    return allMediaImages.filter((item) => {
      const q = gallerySearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q);

      const matchesCat =
        galleryCategoryFilter === "all" ||
        item.category === galleryCategoryFilter ||
        (galleryCategoryFilter === "branding" && (item.category === "branding" || item.category === "mou")) ||
        (galleryCategoryFilter === "gallery" &&
          (item.category === "summits" ||
            item.category === "orientations" ||
            item.category === "workshops")) ||
        (galleryCategoryFilter === "media" &&
          (item.category === "hero" ||
            item.category === "about" ||
            item.category === "service" ||
            item.category === "media"));

      return matchesSearch && matchesCat;
    });
  }, [allMediaImages, gallerySearch, galleryCategoryFilter]);

  const emptyPartner: PartnerItem = {
    id: `partner_${Date.now()}`,
    name: "",
    logoUrl: "",
    description: "",
    category: "Strategic Partner",
    websiteUrl: "",
    sortOrder: partners.length + 1,
    published: true
  };

  const handleOpenAdd = () => {
    setEditingPartner({ ...emptyPartner, id: `partner_${Date.now()}` });
    setShowManualUrlInput(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner: PartnerItem) => {
    setEditingPartner({ ...partner });
    setShowManualUrlInput(Boolean(partner.logoUrl && partner.logoUrl.startsWith("http")));
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (partner: PartnerItem) => {
    try {
      const updated = { ...partner, published: !partner.published };
      await savePartner(updated);
      await refreshContent();
      setFeedback(`"${partner.name}" status updated to ${updated.published ? "Published" : "Draft"}.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback("Failed to update partner status.");
    }
  };

  const handleOpenGalleryPicker = () => {
    setSelectedPickerUrl(editingPartner?.logoUrl || "");
    setUploadError(null);
    setUploadSuccess(null);
    setGallerySearch("");
    setIsGalleryPickerOpen(true);
  };

  const handleApplyLogoSelection = () => {
    if (!selectedPickerUrl || !editingPartner) return;
    setEditingPartner({
      ...editingPartner,
      logoUrl: selectedPickerUrl
    });
    setIsGalleryPickerOpen(false);
  };

  const handleUploadLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid image file format.");
      return;
    }

    setUploading(true);
    setUploadProgress(15);

    try {
      const result = await uploadImage(file, "rr-academia/partners", (pct) => {
        setUploadProgress(pct);
      });

      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const newItem: GalleryPickerItem = {
        id: `upload_${Date.now()}`,
        title: cleanTitle,
        url: result.url,
        category: "branding",
        source: result.isMock ? "Local Upload" : "Cloudinary Asset"
      };

      setUploadedAssets((prev) => [newItem, ...prev]);
      setSelectedPickerUrl(result.url);
      setUploadSuccess(`"${cleanTitle}" uploaded and ready to apply!`);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner || !editingPartner.name.trim()) return;

    setSaving(true);
    try {
      await savePartner(editingPartner);
      await refreshContent();
      setIsModalOpen(false);
      setEditingPartner(null);
      setFeedback(`Partner "${editingPartner.name}" saved successfully!`);
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      console.error(err);
      setFeedback("Error saving partner record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePartner(id);
      await refreshContent();
      setDeleteConfirmId(null);
      setFeedback("Partner removed successfully.");
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback("Failed to delete partner.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B38F26]">
            <Handshake className="w-4 h-4" />
            <span>Ecosystem Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] mt-1">
            Industry Partners Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage partner logos, verified enterprise descriptions, and publication status shown on the public site.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-[#1C2541] font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Add New Partner</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="p-4 rounded-xl bg-[#0B132B] text-[#E5C158] text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Partner Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    #{partner.sortOrder}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-[#0B132B] border border-slate-200 flex-shrink-0 overflow-hidden p-1 shadow-2xs">
                        {partner.logoUrl ? (
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          partner.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {partner.name}
                        </span>
                        {partner.websiteUrl && partner.websiteUrl !== "#" && (
                          <a
                            href={partner.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-slate-400 hover:text-[#0B132B] inline-flex items-center gap-1"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {partner.category || "General"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-500">
                    {partner.description || "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(partner)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        partner.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {partner.published ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-400" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(partner)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B132B] hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit Partner"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(partner.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Partner Modal */}
      {isModalOpen && editingPartner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0B132B]">
                {editingPartner.name ? `Edit Partner: ${editingPartner.name}` : "Add New Partner"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Partner Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingPartner.name}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] focus:ring-1 focus:ring-[#0B132B] outline-none"
                  placeholder="e.g. Google, UPL, Redington, NASSCOM"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPartner.category || ""}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, category: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                    placeholder="e.g. Technology, Institutional"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingPartner.sortOrder}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        sortOrder: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={editingPartner.websiteUrl || ""}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, websiteUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Logo Editing Section with Gallery Picker & Aspect-Ratio Preserving Preview */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Partner Logo
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenGalleryPicker}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B132B] hover:bg-[#1C2541] text-[#E5C158] font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Choose from Gallery</span>
                  </button>
                </div>

                {/* Selected Logo Live Preview Box */}
                {editingPartner.logoUrl ? (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3.5">
                      {/* Logo Preview Frame - object-fit: contain */}
                      <div className="w-28 h-20 rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center flex-shrink-0 shadow-2xs overflow-hidden">
                        <img
                          src={editingPartner.logoUrl}
                          alt={`${editingPartner.name || "Partner"} logo preview`}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/rr-logo-master.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Selected Logo Preview
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            (object-fit: contain)
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 truncate" title={editingPartner.logoUrl}>
                          {editingPartner.logoUrl}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Preview verified. Click "Save Partner" below to persist changes.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={handleOpenGalleryPicker}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-[#0B132B] text-slate-700 hover:text-[#0B132B] bg-white font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPartner({ ...editingPartner, logoUrl: "" })}
                          className="px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 bg-white font-bold text-[11px] transition-colors cursor-pointer"
                          title="Clear custom logo"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-[#0B132B] shadow-2xs">
                        {editingPartner.name ? editingPartner.name.slice(0, 2).toUpperCase() : "LOGO"}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Default Built-in Vector Emblem
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          No custom logo selected. Click "Choose from Gallery" to assign an official logo.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenGalleryPicker}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/90 hover:bg-[#0B132B] text-slate-800 hover:text-white font-bold text-xs transition-colors cursor-pointer self-stretch sm:self-auto"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#B38F26]" />
                      <span>Choose from Gallery</span>
                    </button>
                  </div>
                )}

                {/* Optional Manual URL Input Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowManualUrlInput(!showManualUrlInput)}
                    className="text-[11px] text-slate-500 hover:text-[#0B132B] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showManualUrlInput ? "Hide manual URL input" : "Or enter custom logo image URL / path manually"}</span>
                  </button>
                  {showManualUrlInput && (
                    <div className="mt-1.5">
                      <input
                        type="text"
                        value={editingPartner.logoUrl || ""}
                        onChange={(e) =>
                          setEditingPartner({ ...editingPartner, logoUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none font-mono"
                        placeholder="https://... or /images/upl.png.jpeg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Verified Description
                </label>
                <textarea
                  rows={2}
                  value={editingPartner.description || ""}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none resize-none"
                  placeholder="Brief statement of academic collaboration or focus area"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="partnerPublished"
                  checked={editingPartner.published}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0B132B] focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="partnerPublished"
                  className="text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Published on public website
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B132B] text-white hover:bg-[#1C2541] transition-colors cursor-pointer disabled:opacity-50 shadow-md inline-flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                      <span>Saving Partner...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Save Partner</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Gallery Logo Selection Modal */}
      {isGalleryPickerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B132B] text-[#E5C158] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0B132B]">
                    Select Logo from Media Gallery
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Choose an existing logo or institutional asset, or upload a new image.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGalleryPickerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search, Filter & Quick Upload Toolbar */}
            <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="Search logos or images (e.g. UPL, Google, Brand)..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  />
                </div>

                {/* Upload New Logo Button */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUploadLogoFile}
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#B38F26]" />
                        <span>Uploading ({uploadProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#B38F26]" />
                        <span>Upload New Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upload Notifications */}
              {uploadSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium truncate">{uploadSuccess}</span>
                </div>
              )}
              {uploadError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="font-medium">{uploadError}</span>
                </div>
              )}

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-semibold">
                {[
                  { id: "all", label: `All Images (${allMediaImages.length})` },
                  { id: "branding", label: "Logos & Branding" },
                  { id: "gallery", label: "Campus & Summits" },
                  { id: "media", label: "Media Assets" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setGalleryCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                      galleryCategoryFilter === cat.id
                        ? "bg-[#0B132B] text-[#E5C158] font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Images */}
            <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50 min-h-[220px]">
              {filteredImages.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-600">No images match your filter</p>
                  <p className="text-[11px] text-slate-400">
                    Try searching for something else or upload a new logo above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredImages.map((img) => {
                    const isSelected = selectedPickerUrl === img.url;
                    return (
                      <div
                        key={img.id + img.url}
                        onClick={() => setSelectedPickerUrl(img.url)}
                        onDoubleClick={() => {
                          setSelectedPickerUrl(img.url);
                          if (editingPartner) {
                            setEditingPartner({ ...editingPartner, logoUrl: img.url });
                          }
                          setIsGalleryPickerOpen(false);
                        }}
                        className={`group relative rounded-xl border p-2 flex flex-col justify-between transition-all cursor-pointer bg-white ${
                          isSelected
                            ? "border-[#0B132B] ring-2 ring-[#0B132B] shadow-md bg-slate-50"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Thumbnail container with object-fit: contain */}
                        <div className="w-full h-24 rounded-lg bg-slate-100 flex items-center justify-center p-2 relative overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.title}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />

                          {/* Selection Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Image Metadata */}
                        <div className="mt-2 space-y-0.5">
                          <p className="text-[11px] font-bold text-slate-900 truncate" title={img.title}>
                            {img.title}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="capitalize">{img.category}</span>
                            <span className="truncate max-w-[80px]">{img.source}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer with Selection Preview and Action Buttons */}
            <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {selectedPickerUrl ? (
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1 flex-shrink-0">
                      <img
                        src={selectedPickerUrl}
                        alt="Selection preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                        Image Selected
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block max-w-xs sm:max-w-sm">
                        {filteredImages.find((i) => i.url === selectedPickerUrl)?.title || selectedPickerUrl}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">
                    Click an image above to select it as the partner logo.
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsGalleryPickerOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!selectedPickerUrl}
                  onClick={handleApplyLogoSelection}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B132B] text-white hover:bg-[#1C2541] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Use Selected Logo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Remove Partner?
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this partner record? This will immediately remove it from the public Partners section.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartnersPage;
