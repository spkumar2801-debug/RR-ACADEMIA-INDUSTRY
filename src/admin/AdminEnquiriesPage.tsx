import React, { useState, useEffect } from "react";
import { getEnquiries, updateEnquiryStatus } from "../services/contentService";
import type { EnquirySubmission } from "../services/contentService";
import {
  Inbox,
  Mail,
  Phone,
  Building,
  Filter,
  RefreshCw
} from "lucide-react";

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'contacted'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.warn("Failed to load enquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'new' | 'reviewed' | 'contacted') => {
    await updateEnquiryStatus(id, status);
    await loadData();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const filtered = enquiries.filter((e) => (filter === 'all' ? true : e.status === filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B]">
            Consultation Inquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Institutional and student requests received through public website forms
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <Filter className="w-4 h-4 text-slate-400 mr-1" />
        {(['all', 'new', 'reviewed', 'contacted'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
              filter === tab
                ? "bg-[#0B132B] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab} ({tab === 'all' ? enquiries.length : enquiries.filter(e => e.status === tab).length})
          </button>
        ))}
      </div>

      {/* Leads Table & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Loading inquiries...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      No inquiries match this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedEnquiry?.id === enq.id ? "bg-amber-50/60" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{enq.name}</div>
                        <div className="text-[11px] text-slate-400">{enq.organization || enq.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="line-clamp-1">{enq.serviceCategory || "General"}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {enq.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs font-bold text-[#D4AF37]">Inspect &rarr;</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Dossier */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          {selectedEnquiry ? (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0B132B]">
                    {selectedEnquiry.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    Ref ID: {selectedEnquiry.id}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {(['new', 'reviewed', 'contacted'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id!, st)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-[#0B132B] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 underline font-semibold">
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selectedEnquiry.phone}</span>
                  </div>
                )}
                {selectedEnquiry.organization && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-semibold text-slate-800">{selectedEnquiry.organization}</span>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-xs">
                  <span className="font-bold text-slate-900 block mb-1">Message from Inquirer:</span>
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Inbox className="w-8 h-8 mx-auto text-slate-300" />
              <div className="text-xs font-semibold">Select an inquiry to review dossier</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiriesPage;
