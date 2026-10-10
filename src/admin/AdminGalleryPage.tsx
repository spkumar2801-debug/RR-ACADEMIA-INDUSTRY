import React, { useState, useRef } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { saveGalleryItem, deleteGalleryItem } from "../services/contentService";
import type { GalleryItem } from "../config/siteContent";
import {
  uploadImage,
  isCloudinaryConfigured,
  cloudinaryConfig,
  validateImageFile
} from "../services/cloudinary";
import {
  Camera,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  AlertCircle,
  Upload,
  CheckCircle2,
  Loader2,
  Link as LinkIcon,
  Cloud
} from "lucide-react";

export const AdminGalleryPage: React.FC = () => {
  const { galleryItems, refreshContent } = useSiteContent();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Cloudinary upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isConfigured = isCloudinaryConfigured();

  const emptyItem: GalleryItem = {
    id: `gal_${Date.now()}`,
    title: "",
    caption: "",
    imageUrl: "",
    altText: "",
    category: "summits",
    sortOrder: galleryItems.length + 1,
    published: true,
    date: "",
    location: ""
  };

  const handleOpenAdd = () => {
    setEditingItem({ ...emptyItem, id: `gal_${Date.now()}` });
    setUploadError(null);
    setUploadSuccess(null);
    setUploadProgress(0);
    setShowManualUrl(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setUploadError(null);
    setUploadSuccess(null);
    setUploadProgress(0);
    setShowManualUrl(!item.imageUrl.includes("res.cloudinary.com"));
    setIsModalOpen(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    // reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid file selected.");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      const result = await uploadImage(file, "rr-academia/gallery", (percent) => {
        setUploadProgress(percent);
      });

      setEditingItem((prev) => {
        if (!prev) return null;
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
          ...prev,
          imageUrl: result.url,
          cloudinaryPublicId: result.publicId,
          title: prev.title.trim() ? prev.title : cleanName,
          altText: prev.altText.trim() ? prev.altText : cleanName
        };
      });

      setUploadSuccess(
        `Image uploaded to Cloudinary successfully! (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
      );
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setUploadError(err.message || "Upload failed. Please check Cloudinary configuration.");
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    try {
      const updated = { ...item, published: !item.published };
      await saveGalleryItem(updated);
      await refreshContent();
      setFeedback(`"${item.title}" status changed to ${updated.published ? "Published" : "Draft"}.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback("Failed to update publication status.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim() || !editingItem.imageUrl.trim()) return;

    setSaving(true);
    try {
      await saveGalleryItem(editingItem);
      await refreshContent();
      setIsModalOpen(false);
      setEditingItem(null);
      setFeedback(`Photo "${editingItem.title}" saved successfully to gallery collection!`);
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      console.error(err);
      setFeedback("Error saving gallery item.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      await refreshContent();
      setDeleteConfirmId(null);
      setFeedback("Photograph deleted successfully.");
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback("Failed to delete item.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B38F26]">
            <Camera className="w-4 h-4" />
            <span>Media Archive</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] mt-1">
            Institutional Gallery Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage published summit photographs, orientation moments, and campus collaboration imagery.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Cloudinary Status Indicator */}
          {isConfigured ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Cloudinary: <strong className="font-mono">{cloudinaryConfig.cloudName}</strong> (
                <span className="font-mono">{cloudinaryConfig.uploadPreset}</span>)
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Cloudinary unconfigured</span>
            </div>
          )}

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B132B] text-white hover:bg-[#1C2541] font-bold text-xs shadow-md transition-all cursor-pointer self-stretch sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Add Photograph</span>
          </button>
        </div>
      </div>

      {/* Cloudinary Status Notice if not configured */}
      {!isConfigured && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
          <Upload className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Cloudinary Media Integration Ready</span>
            <span className="text-amber-700">
              When <code>VITE_CLOUDINARY_CLOUD_NAME</code> and <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> are configured in <code>.env</code>, direct browser uploads will stream automatically to Cloudinary.
            </span>
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {feedback && (
        <div className="p-4 rounded-xl bg-[#0B132B] text-[#E5C158] text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleryItems.map((item) => {
          const isCloudinary = item.imageUrl?.includes("res.cloudinary.com") || Boolean(item.cloudinaryPublicId);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Thumbnail Preview */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/original-hero.jpg";
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/85 text-[#E5C158] border border-[#D4AF37]/30 backdrop-blur-xs">
                    {item.category}
                  </span>
                  {isCloudinary && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-sky-900/80 text-sky-200 border border-sky-400/30 backdrop-blur-xs flex items-center gap-1">
                      <Cloud className="w-2.5 h-2.5" />
                      <span>Cloudinary</span>
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer backdrop-blur-xs shadow-xs ${
                      item.published
                        ? "bg-emerald-500/90 text-white"
                        : "bg-slate-700/90 text-slate-200"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">Order: #{item.sortOrder}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B132B] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Item"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0B132B]/5 text-[#0B132B]">
                  <Camera className="w-5 h-5 text-[#B38F26]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0B132B]">
                    {editingItem.title ? `Edit Photograph: ${editingItem.title}` : "Add New Photograph"}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Upload via Cloudinary or link media directly
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4">
              {/* Cloudinary Drag & Drop Uploader */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Image Upload (Cloudinary) *
                </label>

                {/* Dropzone Container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-[#D4AF37] bg-amber-50/50 scale-[1.01]"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                  } ${uploading ? "opacity-75 pointer-events-none" : ""}`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {uploading ? (
                    <div className="space-y-3 py-2">
                      <Loader2 className="w-8 h-8 text-[#B38F26] animate-spin mx-auto" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">
                          Uploading to Cloudinary... ({uploadProgress}%)
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Streaming asset to cloud: {cloudinaryConfig.cloudName}
                        </p>
                      </div>
                      {/* Upload Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs mx-auto border border-slate-200">
                        <div
                          className="bg-gradient-to-r from-[#B38F26] to-[#E5C158] h-full transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 py-1">
                      <div className="w-10 h-10 rounded-full bg-[#0B132B]/5 text-[#0B132B] flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5 text-[#B38F26]" />
                      </div>
                      <div className="text-xs text-slate-700">
                        <span className="font-bold text-[#0B132B] hover:underline">Click to browse</span> or drag and drop an image
                      </div>
                      <p className="text-[11px] text-slate-400">
                        JPG, PNG, WebP, GIF, AVIF, SVG (max 10 MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Success Banner */}
                {uploadSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">{uploadSuccess}</span>
                  </div>
                )}

                {/* Upload Error Banner */}
                {uploadError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Upload Error</span>
                      <span className="text-red-700 leading-relaxed">{uploadError}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Instant Image Preview */}
              {editingItem.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-16/9 bg-slate-900 relative">
                  <img
                    src={editingItem.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/original-hero.jpg";
                    }}
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold backdrop-blur-xs">
                      Live Preview
                    </span>
                    {editingItem.imageUrl.includes("res.cloudinary.com") && (
                      <span className="px-2 py-0.5 rounded bg-emerald-600/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                        <Cloud className="w-3 h-3" />
                        <span>Cloudinary Hosted</span>
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, imageUrl: "", cloudinaryPublicId: "" })}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs cursor-pointer"
                    title="Clear Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Manual URL / Path Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowManualUrl(!showManualUrl)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-[#0B132B] flex items-center gap-1 cursor-pointer"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showManualUrl ? "Hide manual URL input" : "Or specify custom image path / external URL manually"}</span>
                </button>

                {showManualUrl && (
                  <div className="mt-2 space-y-1">
                    <input
                      type="text"
                      required={!editingItem.imageUrl}
                      value={editingItem.imageUrl}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, imageUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none font-mono"
                      placeholder="https://res.cloudinary.com/... or /images/..."
                    />
                    <p className="text-[10px] text-slate-400">
                      Cloudinary secure URLs, hosted image links, or local assets in <code>/images/</code>.
                    </p>
                  </div>
                )}
              </div>

              {/* Photograph Metadata */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photograph Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  placeholder="e.g. Google & AMG Student Orientation"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as any
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none bg-white"
                  >
                    <option value="summits">Summits & Conclaves</option>
                    <option value="orientations">Corporate Orientations</option>
                    <option value="mou">MoUs & Launches</option>
                    <option value="workshops">Pedagogy Workshops</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingItem.sortOrder}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        sortOrder: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={editingItem.altText || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, altText: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  placeholder="Descriptive text for visually impaired visitors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Date / Occasion
                  </label>
                  <input
                    type="text"
                    value={editingItem.date || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, date: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                    placeholder="e.g. Annual Conclave 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, location: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                    placeholder="e.g. Main Convention Center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caption / Narrative
                </label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, caption: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none resize-none"
                  placeholder="Detailed description of the event or milestone"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="galleryPublished"
                  checked={editingItem.published}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0B132B] focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="galleryPublished"
                  className="text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Publish in public gallery
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
                  disabled={saving || uploading || !editingItem.imageUrl}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B132B] text-white hover:bg-[#1C2541] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Photograph</span>
                  )}
                </button>
              </div>
            </form>
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
              Remove Photograph?
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this photograph from the institutional archive?
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

export default AdminGalleryPage;
