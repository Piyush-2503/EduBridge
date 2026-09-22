import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Building2,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { InternshipProgram } from '../types';

interface InternshipsViewProps {
  programs: InternshipProgram[];
  onOpenCreateProgram: () => void;
}

export const InternshipsView: React.FC<InternshipsViewProps> = ({
  programs,
  onOpenCreateProgram
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Upcoming'>('All');

  const filteredPrograms = programs.filter((p) => {
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    return true;
  });

  const totalEnrolled = programs.reduce((acc, p) => acc + p.enrolledStudents, 0);
  const totalNOCs = programs.reduce((acc, p) => acc + p.nocApprovedCount, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner & Action Button */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Internships & Technical Training Programs
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
              {programs.length} Institutional Drives
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Institutional monitoring of student industrial apprenticeships, No Objection Certificates (NOC), and corporate stipends.
          </p>
        </div>

        <button
          id="internships-create-btn"
          onClick={onOpenCreateProgram}
          className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#EAE0CF]" />
          <span>Create Training Program</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Students in Training</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">{totalEnrolled}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Across {programs.length} partner programs</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">NOCs Approved</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">{totalNOCs}</div>
          <div className="text-[11px] text-[#4B5694] font-medium mt-0.5">Verified by Academic Council</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Average Monthly Stipend</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">₹34,250</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">+18% vs previous academic year</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Placement Conversion</div>
          <div className="text-2xl font-extrabold text-[#111844] mt-1">74.8%</div>
          <div className="text-[11px] text-[#111844] font-semibold mt-0.5">Pre-Placement Offers (PPO)</div>
        </div>
      </div>

      {/* Program Filter Pills */}
      <div className="flex items-center gap-2">
        {(['All', 'Active', 'Upcoming'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-[#4B5694] text-white shadow-2xs'
                : 'bg-white text-[#7288AE] hover:text-[#111844] border border-[#4B5694]/12'
            }`}
          >
            {st} Programs
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrograms.map((prog) => {
          const fillPercentage = Math.round((prog.enrolledStudents / prog.targetCapacity) * 100);

          return (
            <div
              key={prog.id}
              className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm hover:shadow-md hover:border-[#4B5694]/35 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EAE0CF] text-[#111844]">
                        {prog.type}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {prog.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#111844] mt-1.5 leading-snug">
                      {prog.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#4B5694] mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{prog.partnerCompany}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#111844] text-[#EAE0CF] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {prog.companyLogoText}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#4B5694]/10">
                  <div>
                    <span className="text-[11px] text-[#7288AE]">Stipend</span>
                    <div className="font-extrabold text-[#111844]">{prog.stipend}</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#7288AE]">Duration</span>
                    <div className="font-semibold text-[#111844]">{prog.duration}</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#7288AE]">Industry Mentor</span>
                    <div className="font-medium text-[#111844] truncate">{prog.mentorName}</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#7288AE]">NOCs Cleared</span>
                    <div className="font-semibold text-emerald-600 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>{prog.nocApprovedCount} Approved</span>
                    </div>
                  </div>
                </div>

                {/* Capacity Gauge */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#7288AE]">Enrolled Cohort</span>
                    <span className="font-extrabold text-[#4B5694]">
                      {prog.enrolledStudents} / {prog.targetCapacity} seats ({fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F4FA] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#111844] to-[#4B5694] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Allowed Departments */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#7288AE] font-semibold">Eligible:</span>
                  {prog.departmentsAllowed.map((dept) => (
                    <span
                      key={dept}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F8F9FC] text-[#4B5694] border border-[#4B5694]/15"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#4B5694]/10 flex items-center justify-between">
                <span className="text-xs text-[#7288AE] font-medium">{prog.startDate} – {prog.endDate}</span>
                <button
                  onClick={() => alert(`Reviewing candidate applications for ${prog.title}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Manage Roster
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
