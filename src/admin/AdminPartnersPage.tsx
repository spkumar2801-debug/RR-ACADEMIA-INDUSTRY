import React, { useState } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { savePartner, deletePartner } from "../services/contentService";
import type { PartnerItem } from "../config/siteContent";
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
  AlertCircle
} from "lucide-react";

export const AdminPartnersPage: React.FC = () => {
  const { partners, refreshContent } = useSiteContent();
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner: PartnerItem) => {
    setEditingPartner({ ...partner });
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
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-[#0B132B] border border-slate-200 flex-shrink-0">
                        {partner.name.slice(0, 2).toUpperCase()}
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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
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
                  placeholder="e.g. Google, Redington, NASSCOM"
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Logo Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingPartner.logoUrl || ""}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, logoUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#0B132B] outline-none"
                  placeholder="https://... or /images/..."
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Leave blank to use the official built-in SVG emblem automatically.
                </p>
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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B132B] text-white hover:bg-[#1C2541] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Partner"}
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
