import React, { useState } from 'react';
import {
  Target,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import { PlacementDrive } from '../types';
import { PLACEMENT_DRIVES_DATA, PLACEMENT_FUNNEL_STAGES } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface PlacementsViewProps {
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const PlacementsView: React.FC<PlacementsViewProps> = ({
  onOpenExport,
  selectedDepartment,
}) => {
  const [drives, setDrives] = useState<PlacementDrive[]>(PLACEMENT_DRIVES_DATA);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredDrives = drives.filter((d) => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    const matchesSearch =
      d.company.toLowerCase().includes(search.toLowerCase()) ||
      d.role.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Institutional Placement Intelligence & Funnel
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end recruitment lifecycle: eligibility screening, aptitude assessments, interview scheduling, and offer letters.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Annual Institutional Placement & Employability Benchmark Report 2026')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export Placement Report (PDF)
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Eligible Candidates</div>
          <div className="text-2xl font-black text-[#111844] mt-1">3,120</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Final & PG cohort</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Offers Issued</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">1,090</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">980 already accepted</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Average CTC Package</div>
          <div className="text-2xl font-black text-[#4B5694] mt-1">₹8.4 LPA</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Median: ₹7.8 LPA</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Highest CTC Package</div>
          <div className="text-2xl font-black text-[#111844] mt-1">₹28.5 LPA</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Bioinformatics / AI</div>
        </div>
      </div>

      {/* Visual Placement Funnel Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#111844]">Institutional Placement Funnel</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Stage-by-stage recruitment conversion rates for graduating academic batch 2026.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Overall Conversion: 82.4%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {PLACEMENT_FUNNEL_STAGES.map((stage, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200/90 bg-[#F8F9FD] flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: stage.color }}
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Stage {idx + 1}
                </span>
                <h3 className="font-bold text-xs text-slate-800 leading-snug">{stage.stage}</h3>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-baseline justify-between">
                <span className="text-lg font-black text-[#111844]">
                  {stage.count.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-500">{stage.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Drives Schedule & Intelligence */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-[#111844]">
              Campus Placement Drives & Institutional Opportunities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Corporate visits, screening assessments, and offer letter distributions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
            >
              <option value="All">All Drive Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 pl-4 font-bold">Company & Hiring Profile</th>
                <th className="py-3 font-bold">Departments</th>
                <th className="py-3 font-bold">Eligible / Applied</th>
                <th className="py-3 font-bold">Shortlisted</th>
                <th className="py-3 font-bold">Offers</th>
                <th className="py-3 font-bold">Package</th>
                <th className="py-3 font-bold">Drive Date</th>
                <th className="py-3 pr-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDrives.map((drive) => (
                <tr key={drive.id} className="hover:bg-[#F8F9FD] transition-colors">
                  <td className="py-3.5 pl-4">
                    <div className="font-bold text-slate-900">{drive.company}</div>
                    <div className="text-[11px] text-slate-500">{drive.role}</div>
                  </td>

                  <td className="py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {drive.department.map((dept, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 font-medium text-slate-800">
                    {drive.eligibleCount} / <span className="text-[#4B5694] font-bold">{drive.appliedCount}</span>
                  </td>

                  <td className="py-3.5 font-bold text-slate-900">{drive.shortlistedCount}</td>

                  <td className="py-3.5 font-bold text-emerald-700">{drive.offeredCount}</td>

                  <td className="py-3.5 font-black text-[#111844]">₹{drive.packageLpa} LPA</td>

                  <td className="py-3.5 font-medium text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{drive.driveDate}</span>
                    </div>
                  </td>

                  <td className="py-3.5 pr-4 text-right">
                    <StatusBadge status={drive.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
