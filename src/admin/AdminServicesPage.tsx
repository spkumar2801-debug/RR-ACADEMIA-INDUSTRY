import React, { useState, useEffect } from "react";
import { getServices, saveService, deleteService } from "../services/contentService";
import { useSiteContent } from "../context/SiteContentContext";
import type { ServiceItem } from "../config/siteContent";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  Save
} from "lucide-react";

export const AdminServicesPage: React.FC = () => {
  const { refreshContent } = useSiteContent();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.warn("Failed to load services:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      await saveService(editingService);
      await refreshContent();
      setStatusMessage(`Service "${editingService.title}" successfully saved.`);
      setEditingService(null);
      await loadServices();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      alert("Failed to save service. Check console.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      await refreshContent();
      setStatusMessage("Service successfully removed.");
      setDeleteConfirmId(null);
      await loadServices();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (e) {
      alert("Failed to delete service.");
    }
  };

  const handleAddNew = () => {
    const newId = `serv-${Date.now()}`;
    const newService: ServiceItem = {
      id: newId,
      slug: `new-service-${Date.now()}`,
      title: "New Institutional Offering",
      shortDescription: "Short summary of this offering for the catalog...",
      fullDescription: "Detailed scope, academic alignment, and institutional methodology...",
      iconName: "Handshake",
      mediaSlot: "serviceCollaboration",
      imageUrl: "/images/original-hero.jpg",
      highlights: ["Initial capability 1", "Initial capability 2"],
      deliverables: ["Deliverable Blueprint"],
      order: services.length + 1,
      published: true
    };
    setEditingService(newService);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add, edit, or reorganize verified institutional offerings
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Media Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No services found. Click "Add New Service" to create one.
                  </td>
                </tr>
              ) : (
                services.map((serv) => (
                  <tr key={serv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center font-bold text-slate-400">
                      {serv.order}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 text-sm">{serv.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">/{serv.slug}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 max-w-md">
                        {serv.shortDescription}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {serv.mediaSlot}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          serv.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {serv.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{serv.published ? "Published" : "Draft"}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(serv)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0B132B] text-slate-600 hover:text-white transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(serv.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0B132B]">
                {editingService.id.startsWith("serv-") && !services.some(s => s.id === editingService.id)
                  ? "Create New Offering"
                  : `Edit Offering: ${editingService.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Catalog Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Scope & Methodology *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingService.fullDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Media Slot Key
                  </label>
                  <input
                    type="text"
                    value={editingService.mediaSlot}
                    onChange={(e) =>
                      setEditingService({ ...editingService, mediaSlot: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingService.order}
                    onChange={(e) =>
                      setEditingService({ ...editingService, order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingService.published ? "true" : "false"}
                    onChange={(e) =>
                      setEditingService({ ...editingService, published: e.target.value === "true" })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Offering</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Confirm Service Deletion
            </h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this service? This action will remove it from the public catalog.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
