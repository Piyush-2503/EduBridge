import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Users,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Clock,
  ArrowUpRight,
  FileCheck,
} from 'lucide-react';
import { Opportunity, OpportunityType, NavSection } from '../../types';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  onOpenCreateOpportunity: () => void;
  onNavigate: (section: NavSection) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  onOpenCreateOpportunity,
  onNavigate,
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailOpp, setSelectedDetailOpp] = useState<Opportunity | null>(null);

  const types = [
    'All',
    'Internship',
    'Job',
    'Live Project',
    'Apprenticeship',
    'Industry Challenge',
  ];

  const filtered = opportunities.filter((opp) => {
    if (selectedType !== 'All' && opp.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.department.toLowerCase().includes(q) ||
        opp.requiredSkills.some((s) => s.skill.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Industry Opportunities & Project Postings
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Publish course-credit aligned internships, full-time engineering roles, faculty-partnered live capstones, and hackathon challenges.
          </p>
        </div>

        <button
          onClick={onOpenCreateOpportunity}
          className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Opportunity</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunity title, domain, or required skill..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid lg:grid-cols-2 gap-5">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between p-5 space-y-4"
          >
            <div>
              {/* Top Row: Type & Status */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      opp.type === 'Internship'
                        ? 'bg-blue-100 text-blue-800'
                        : opp.type === 'Job'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.type === 'Live Project'
                        ? 'bg-purple-100 text-purple-800'
                        : opp.type === 'Apprenticeship'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {opp.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Posted {opp.createdAt}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {opp.status}
                </span>
              </div>

              {/* Title & Department */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {opp.title}
              </h3>
              <p className="text-xs text-indigo-700 font-medium mt-0.5">
                {opp.department}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3 py-2.5 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Compensation
                  </span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {opp.stipendOrSalary}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Mode & Location
                  </span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {opp.workMode} • {opp.location.split('/')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Duration & Seats
                  </span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {opp.duration} ({opp.openings} seats)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {opp.description}
              </p>

              {/* Required Skills Chips */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Target Skill Weights (Automated Match):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {opp.requiredSkills.map((req, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/70"
                    >
                      {req.skill} <b className="text-indigo-700 font-bold">({req.weight}%)</b>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Applicant Count & Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-slate-900">
                  {opp.applicantsCount}{' '}
                  <span className="font-normal text-slate-500">Applicants</span>
                </span>
                <span>•</span>
                <span className="font-bold text-amber-700">
                  {opp.shortlistedCount}{' '}
                  <span className="font-normal text-slate-500">Shortlisted</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDetailOpp(opp)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Details
                </button>
                <button
                  onClick={() => onNavigate('applicants')}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 shadow-2xs"
                >
                  <span>Recruitment Pipeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opportunity Detail Drawer / Modal */}
      {selectedDetailOpp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {selectedDetailOpp.type}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedDetailOpp.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailOpp(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3 text-slate-600 leading-relaxed">
              <p>{selectedDetailOpp.description}</p>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Key Responsibilities:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  {selectedDetailOpp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Eligibility Criteria:
                </span>
                <p>
                  Degrees: {selectedDetailOpp.eligibility.degrees.join(', ')} • Min GPA: {selectedDetailOpp.eligibility.minCgpa}
                </p>
                <p>Batches: {selectedDetailOpp.eligibility.batches.join(', ')}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Selection Stages:
                </span>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  {selectedDetailOpp.selectionProcess.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDetailOpp(null)}
                className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedDetailOpp(null);
                  onNavigate('applicants');
                }}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 text-white"
              >
                Go to Applicants
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
