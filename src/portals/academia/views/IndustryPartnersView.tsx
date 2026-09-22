import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Handshake,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Mail,
  User,
} from 'lucide-react';
import { IndustryPartner } from '../types';
import { INDUSTRY_PARTNERS_DATA } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface IndustryPartnersViewProps {
  onSelectPartner: (partner: IndustryPartner) => void;
  onOpenCreatePartner: () => void;
  onOpenExport: (title?: string) => void;
}

export const IndustryPartnersView: React.FC<IndustryPartnersViewProps> = ({
  onSelectPartner,
  onOpenCreatePartner,
  onOpenExport,
}) => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPartners = INDUSTRY_PARTNERS_DATA.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase()) ||
      p.focalPerson.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (tierFilter !== 'All' && p.tier !== tierFilter) return false;
    if (statusFilter !== 'All' && p.collaborationStatus !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">Industry Partner Network & MoUs</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Managing 86 institutional industry partners, corporate affiliations, and joint academic initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExport('Industry Partner Engagement & MoU Status Dossier')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-[#111844]" />
            Export Dossier
          </button>
          <button
            onClick={onOpenCreatePartner}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            Record New MoU
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Total Corporate Partners</div>
          <div className="text-2xl font-black text-[#111844] mt-1">86</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">+12 signed this year</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Active Long-Term MoUs</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">64</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Legally vetted by AYUSH Node</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">MoUs Due for Renewal</div>
          <div className="text-2xl font-black text-amber-600 mt-1">3</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Within next 45 days</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Joint R&D Labs / Centers</div>
          <div className="text-2xl font-black text-[#4B5694] mt-1">14</div>
          <div className="text-[10px] text-slate-500 mt-0.5">On AIIA campus premises</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search partner name or sector..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#111844]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Tiers</option>
            <option value="Strategic Tier 1">Strategic Tier 1</option>
            <option value="Core Partner">Core Partner</option>
            <option value="Emerging Partner">Emerging Partner</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All MoU Statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Renewal Pending">Renewal Pending</option>
          </select>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            onClick={() => onSelectPartner(partner)}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-[#4B5694] transition-all cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#111844] group-hover:text-[#4B5694] transition-colors leading-tight">
                      {partner.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {partner.industry}
                    </span>
                  </div>
                </div>
                <StatusBadge status={partner.collaborationStatus} />
              </div>

              <div className="p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Institutional Tier:</span>
                  <span className="font-bold text-slate-800">{partner.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">MoU Valid Until:</span>
                  <span className="font-semibold text-slate-700">{partner.mouValidTill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Joint Research Facility:</span>
                  <span className="font-semibold text-emerald-700">
                    {partner.jointResearch ? 'Active on Campus' : 'Collaborative Group'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-100">
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="font-extrabold text-[#111844]">{partner.activeOpportunities}</div>
                <div className="text-[10px] text-slate-400">Active Roles</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="font-extrabold text-emerald-700">{partner.internshipsProvided}</div>
                <div className="text-[10px] text-slate-400">Internships</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="font-extrabold text-[#4B5694]">{partner.placementDrives}</div>
                <div className="text-[10px] text-slate-400">Drives</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="truncate">Contact: {partner.focalPerson}</span>
              <span className="text-[#4B5694] font-bold group-hover:underline shrink-0">
                MoU Details →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
