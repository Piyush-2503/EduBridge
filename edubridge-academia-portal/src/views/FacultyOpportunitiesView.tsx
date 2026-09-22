import React, { useState } from 'react';
import {
  Award,
  Download,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  Filter,
  Users,
  Search,
  BookOpen,
} from 'lucide-react';
import { FACULTY_OPPORTUNITIES_DATA } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { FacultyOpportunity } from '../types';

interface FacultyOpportunitiesViewProps {
  onOpenExport: (title?: string) => void;
}

export const FacultyOpportunitiesView: React.FC<FacultyOpportunitiesViewProps> = ({
  onOpenExport,
}) => {
  const [opportunities, setOpportunities] = useState<FacultyOpportunity[]>(FACULTY_OPPORTUNITIES_DATA);
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [nominatedModal, setNominatedModal] = useState<FacultyOpportunity | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNominate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominatedModal || !facultyName) return;
    showToast(`Faculty nomination for ${facultyName} submitted for ${nominatedModal.title}`);
    setNominatedModal(null);
    setFacultyName('');
  };

  const filtered = opportunities.filter((op) => {
    if (filterType !== 'All' && op.type !== filterType) return false;
    const deptStr = Array.isArray(op.department) ? op.department.join(', ') : op.department;
    const matchesSearch =
      op.title.toLowerCase().includes(search.toLowerCase()) ||
      op.organization.toLowerCase().includes(search.toLowerCase()) ||
      deptStr.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
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
            <Award className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Faculty Opportunities & Industrial Immersion
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Corporate faculty sabbaticals, funded industrial consultancies, AICTE-approved FDPs, and guest lecture engagements.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Institutional Faculty Development & Industry Immersion Register')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <Download className="w-4 h-4 text-[#111844]" />
          Export Register
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Open Opportunities</div>
          <div className="text-2xl font-black text-[#111844] mt-1">6</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Corporate & R&D funded</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Faculty Immersions</div>
          <div className="text-2xl font-black text-[#4B5694] mt-1">24</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Completed this academic year</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Funded Consultancies</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">₹42 Lakhs</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Total industrial grants</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Upcoming FDPs</div>
          <div className="text-2xl font-black text-amber-600 mt-1">4</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Next starts in 10 days</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Industrial Immersion', 'FDP', 'Consultancy Grant', 'Industry Mentorship', 'Joint Research'] as const).map(
            (t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  filterType === t
                    ? 'bg-[#111844] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunity or sponsor..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#111844]"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 font-bold">Opportunity & Organization</th>
                <th className="py-3.5 font-bold">Type</th>
                <th className="py-3.5 font-bold">Eligible Departments</th>
                <th className="py-3.5 font-bold">Duration</th>
                <th className="py-3.5 font-bold">Grant / Stipend</th>
                <th className="py-3.5 font-bold">Deadline</th>
                <th className="py-3.5 pr-6 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((op) => (
                <tr key={op.id} className="hover:bg-[#F8F9FD] transition-colors">
                  <td className="py-3.5 pl-6">
                    <div className="font-bold text-slate-900">{op.title}</div>
                    <div className="text-[11px] text-[#4B5694] font-semibold">{op.organization}</div>
                  </td>

                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {op.type}
                    </span>
                  </td>

                  <td className="py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {Array.isArray(op.department) ? (
                        op.department.map((d: string, i: number) => (
                          <span
                            key={i}
                            className="bg-indigo-50 text-[#4B5694] px-1.5 py-0.5 rounded text-[10px] font-medium"
                          >
                            {d}
                          </span>
                        ))
                      ) : (
                        <span className="bg-indigo-50 text-[#4B5694] px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {op.department}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 font-medium text-slate-700">{op.duration}</td>

                  <td className="py-3.5 font-bold text-emerald-700">
                    {op.grantOrStipend || op.stipend || 'Funded'}
                  </td>

                  <td className="py-3.5 font-semibold text-rose-600">{op.deadline}</td>

                  <td className="py-3.5 pr-6 text-right">
                    <button
                      onClick={() => setNominatedModal(op)}
                      className="px-3 py-1.5 bg-[#111844] hover:bg-[#27347A] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                    >
                      Nominate Faculty
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nominate Faculty Modal */}
      {nominatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
              <span className="font-bold text-sm">Nominate Faculty Member</span>
              <button
                onClick={() => setNominatedModal(null)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleNominate} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Selected Opportunity
                </label>
                <div className="p-2 bg-slate-50 border rounded-lg font-bold text-slate-800">
                  {nominatedModal.title} ({nominatedModal.organization})
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Faculty Member Name & Designation
                </label>
                <input
                  type="text"
                  required
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  placeholder="e.g. Dr. Raghavendra Rao, Associate Professor"
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Department
                </label>
                <div className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs text-slate-700 font-medium">
                  {Array.isArray(nominatedModal.department)
                    ? nominatedModal.department.join(', ')
                    : nominatedModal.department}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNominatedModal(null)}
                  className="px-4 py-2 border rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111844] text-white rounded-lg font-bold hover:bg-[#27347A]"
                >
                  Confirm Nomination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
