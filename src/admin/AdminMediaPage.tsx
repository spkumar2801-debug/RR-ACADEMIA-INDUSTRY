import React, { useState, useEffect } from "react";
import { getMediaRegistry, saveMediaItem } from "../services/contentService";
import { useSiteContent } from "../context/SiteContentContext";
import type { MediaItem } from "../config/media";
import { uploadImage, isCloudinaryConfigured, cloudinaryConfig } from "../services/cloudinary";
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Edit2,
  X,
  Save
} from "lucide-react";

export const AdminMediaPage: React.FC = () => {
  const { refreshContent } = useSiteContent();
  const [mediaMap, setMediaMap] = useState<Record<string, MediaItem>>({});
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await getMediaRegistry();
      setMediaMap(data);
    } catch (e) {
      console.warn("Error loading media:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (slotKey: string, file: File) => {
    setUploadingSlot(slotKey);
    setUploadProgress(10);
    try {
      const result = await uploadImage(file, "rr-academia", (percent) => {
        setUploadProgress(percent);
      });

      const current = mediaMap[slotKey] || {
        id: slotKey,
        slotKey,
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: "Uploaded media asset",
        url: result.url,
        alt: file.name,
        category: "gallery",
        aspectRatio: "16/9"
      };

      const updated: MediaItem = {
        ...current,
        url: result.url,
        cloudinaryPublicId: result.publicId,
        isPlaceholder: false
      };

      await saveMediaItem(slotKey, updated);
      await refreshContent();
      await loadMedia();
      setStatusMessage(
        result.isMock
          ? `Local image preview mapped to slot "${slotKey}". (Cloudinary credentials can be added later in .env)`
          : `Image successfully uploaded to Cloudinary and assigned to "${slotKey}".`
      );
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (e: any) {
      alert(`Upload error: ${e.message}`);
    } finally {
      setUploadingSlot(null);
      setUploadProgress(0);
    }
  };

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await saveMediaItem(editingItem.slotKey, editingItem);
      await refreshContent();
      setStatusMessage(`Metadata for slot "${editingItem.slotKey}" updated.`);
      setEditingItem(null);
      await loadMedia();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      alert("Failed to save media metadata.");
    }
  };

  const isConfigured = isCloudinaryConfigured();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Image & Media Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage photographs, summit captures, and service banners without touching code
          </p>
        </div>
      </div>

      {/* Cloudinary Integration Status Box */}
      <div className={`p-6 rounded-2xl border ${
        isConfigured
          ? "bg-emerald-50/70 border-emerald-200"
          : "bg-amber-50/70 border-amber-200"
      } space-y-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isConfigured ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
            <h3 className={`text-sm font-bold ${isConfigured ? "text-emerald-900" : "text-amber-900"}`}>
              {isConfigured
                ? "Cloudinary Integration Live & Verified"
                : "Cloudinary Prepared (Awaiting API Credentials)"}
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
            isConfigured ? "bg-emerald-200 text-emerald-800" : "bg-amber-200 text-amber-800"
          }`}>
            {isConfigured ? "CONNECTED" : "LOCAL SIMULATION MODE"}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {isConfigured ? (
            `All image uploads are streamed directly to Cloudinary account: ${cloudinaryConfig.cloudName}.`
          ) : (
            `You can upload, test, and preview photographs right now! Images are rendered directly in the browser and persisted in storage. When you provide your Cloudinary credentials later, simply add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET into your .env file.`
          )}
        </p>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Media Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            Loading media registry...
          </div>
        ) : (
          Object.entries(mediaMap).map(([slotKey, item]) => {
            const isCurrentlyUploading = uploadingSlot === slotKey;
            return (
              <div
                key={slotKey}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Image Preview */}
                <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#0B132B]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                    {slotKey}
                  </div>
                  {item.isPlaceholder && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold">
                      Placeholder
                    </div>
                  )}

                  {isCurrentlyUploading && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
                      <span className="text-xs font-bold">Uploading ({uploadProgress}%)</span>
                      <div className="w-3/4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D4AF37] transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#0B132B] line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Alt: {item.alt}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Hidden file input */}
                    <label className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isCurrentlyUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(slotKey, file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title="Edit Metadata"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Metadata Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B132B]">
                Edit Media Slot: {editingItem.slotKey}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetadata} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Alt Text (Accessibility) *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.alt}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={editingItem.aspectRatio}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, aspectRatio: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="16/9">16:9 Landscape</option>
                    <option value="4/3">4:3 Standard</option>
                    <option value="1/1">1:1 Square</option>
                    <option value="3/2">3:2 Classic Photo</option>
                    <option value="21/9">21:9 Ultrawide Banner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="hero">Hero</option>
                    <option value="about">About</option>
                    <option value="service">Service</option>
                    <option value="summit">Summit</option>
                    <option value="gallery">Gallery</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-6 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Metadata</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMediaPage;
