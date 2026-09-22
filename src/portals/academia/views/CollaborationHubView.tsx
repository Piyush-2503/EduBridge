import React, { useState } from 'react';
import {
  Handshake,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  Download,
  Plus,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { COLLABORATION_ITEMS_DATA, INDUSTRY_PARTNERS_DATA } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { CollaborationItem } from '../types';

interface CollaborationHubViewProps {
  onOpenExport: (title?: string) => void;
  onOpenCreatePartner: () => void;
}

export const CollaborationHubView: React.FC<CollaborationHubViewProps> = ({
  onOpenExport,
  onOpenCreatePartner,
}) => {
  const [items, setItems] = useState<CollaborationItem[]>(COLLABORATION_ITEMS_DATA);
  const [filterType, setFilterType] = useState('All');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredItems = items.filter((item) => {
    if (filterType !== 'All' && item.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#111844] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Handshake className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Academia–Industry Collaboration Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Managing institutional MoUs, sponsored live projects, joint innovation hackathons, and corporate mentorships.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExport('Academia–Industry Collaboration & MoU Register')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-[#111844]" />
            Export Register
          </button>
          <button
            onClick={onOpenCreatePartner}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            New Collaboration MoU
          </button>
        </div>
      </div>

      {/* Collaboration Status Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Active Collaborations</div>
          <div className="text-2xl font-black text-[#111844] mt-1">48</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Across all departments</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Upcoming Joint Events</div>
          <div className="text-2xl font-black text-[#4B5694] mt-1">12</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Hackathons & Guest Series</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Pending Approvals</div>
          <div className="text-2xl font-black text-amber-600 mt-1">4</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Under legal review</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Expiring MoUs</div>
          <div className="text-2xl font-black text-rose-600 mt-1">3</div>
          <div className="text-[10px] text-rose-700 font-semibold mt-0.5">Action needed in 45 days</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap text-xs bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span className="font-semibold text-slate-500">Initiative Type:</span>
        {(['All', 'MoU', 'Joint R&D', 'Innovation Challenge', 'Guest Lecture', 'Live Project'] as const).map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterType === type
                  ? 'bg-[#111844] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* Collaboration Timeline / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((col) => (
          <div
            key={col.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {col.type}
                </span>
                <StatusBadge status={col.status} />
              </div>

              <h3 className="font-extrabold text-sm text-[#111844] leading-snug">{col.title}</h3>
              <div className="text-xs font-semibold text-[#4B5694] mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Corporate Partner: {col.partner}
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Department Scope:</span>
                <span className="font-semibold text-slate-700">{col.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Institutional Lead:</span>
                <span className="font-semibold text-slate-700">{col.leadCoordinator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Effective Date:</span>
                <span className="font-medium text-slate-600">{col.startDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Demonstrated Impact:</span>
                <span className="text-xs font-bold text-emerald-700">{col.impactMetric}</span>
              </div>
              <button
                onClick={() => showToast(`Collaboration record opened for ${col.partner}`)}
                className="text-xs font-bold text-[#111844] hover:underline flex items-center gap-1"
              >
                Inspect Agreement <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
