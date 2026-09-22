import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Mail,
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';
import { IndustryPartner } from '../types';

interface CollaborationViewProps {
  partners: IndustryPartner[];
  onOpenNewCollaboration: () => void;
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({
  partners,
  onOpenNewCollaboration
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const tiers = ['All', 'Tier-1 Strategic', 'Skill Center of Excellence', 'Academic Alliance'];

  const filteredPartners = partners.filter((p) => {
    if (tierFilter !== 'All' && p.tier !== tierFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDomain = p.industryDomain.toLowerCase().includes(q);
      const matchContact = p.keyContact.toLowerCase().includes(q);
      if (!matchName && !matchDomain && !matchContact) return false;
    }
    return true;
  });

  const totalHired = partners.reduce((acc, p) => acc + p.hiredCount, 0);
  const totalLabs = partners.reduce((acc, p) => acc + p.activeProjects, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner & Action Button */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Corporate Industry Collaboration & MoUs
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
              {partners.length} Strategic Partners
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Institutional agreements with global technology enterprises, corporate skill incubators, and sponsored research labs.
          </p>
        </div>

        <button
          id="collaboration-new-mou-btn"
          onClick={onOpenNewCollaboration}
          className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#EAE0CF]" />
          <span>New Collaboration MoU</span>
        </button>
      </div>

      {/* Partner KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Active Corporate MoUs</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">38</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">100% active & audited</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Students Hired via MoUs</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">{totalHired}</div>
          <div className="text-[11px] text-[#4B5694] font-medium mt-0.5">Across Tier-1 campus drives</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Sponsored Labs & CoEs</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">{totalLabs} Labs</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">₹4.8 Cr corporate infrastructure</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Accreditation Points</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">NAAC 5.2</div>
          <div className="text-[11px] text-[#111844] font-semibold mt-0.5">Industry Interaction Criterion</div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                tierFilter === t
                  ? 'bg-[#4B5694] text-white shadow-2xs'
                  : 'bg-white text-[#7288AE] hover:text-[#111844] border border-[#4B5694]/12'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search corporate partner..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-white text-xs border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694] text-[#111844] w-56 sm:w-64"
          />
        </div>
      </div>

      {/* Corporate Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPartners.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm hover:shadow-md hover:border-[#4B5694]/35 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
                    {p.tier}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#111844] mt-1.5 leading-snug">
                    {p.name}
                  </h3>
                  <div className="text-xs text-[#7288AE] font-medium mt-0.5">
                    {p.industryDomain}
                  </div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#111844] text-[#EAE0CF] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {p.logoText}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#7288AE]">Students Hired</span>
                  <span className="font-extrabold text-emerald-700">{p.hiredCount} Placed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7288AE]">Active R&D Projects</span>
                  <span className="font-bold text-[#4B5694]">{p.activeProjects} Research Labs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7288AE]">MoU Period</span>
                  <span className="font-semibold text-[#111844]">{p.mouSignedDate} – {p.mouExpiryDate}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#7288AE] uppercase tracking-wider">
                  Sponsored Facility
                </div>
                <div className="text-xs font-semibold text-[#111844]">
                  {p.sponsoredFacilities}
                </div>
              </div>

              <div className="pt-2 border-t border-[#4B5694]/10 text-xs flex items-center justify-between text-[#7288AE]">
                <div className="min-w-0">
                  <div className="font-bold text-[#111844] truncate">{p.keyContact}</div>
                  <div className="text-[11px] text-[#4B5694] truncate">{p.contactEmail}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {p.status}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#4B5694]/10 flex items-center justify-between">
              <button
                onClick={() => alert(`Opening collaboration MoU dossier for ${p.name}`)}
                className="w-full py-2 rounded-xl bg-[#F8F9FC] hover:bg-[#4B5694] hover:text-white text-xs font-bold text-[#4B5694] transition-all text-center cursor-pointer border border-[#4B5694]/15"
              >
                View Agreement & Quotas →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
