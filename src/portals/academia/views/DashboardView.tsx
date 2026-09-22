import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  Target,
  TrendingUp,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Calendar,
  Layers,
  Award,
  ExternalLink,
  ChevronRight,
  Handshake,
  Filter,
} from 'lucide-react';
import { ViewId, Student, IndustryPartner } from '../types';
import {
  INSTITUTION_INFO,
  KPI_METRICS,
  SKILL_INTELLIGENCE_DATA,
  DEPARTMENTS_DATA,
  PLACEMENT_FUNNEL_STAGES,
  INTERNSHIPS_DATA,
  INDUSTRY_PARTNERS_DATA,
  COLLABORATION_ITEMS_DATA,
  STUDENTS_DIRECTORY_DATA,
} from '../data/mockData';
import { KPICard } from '../components/common/KPICard';
import { StatusBadge } from '../components/common/StatusBadge';

interface DashboardViewProps {
  onNavigate: (view: ViewId) => void;
  onSelectStudent: (student: Student) => void;
  onSelectPartner: (partner: IndustryPartner) => void;
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectStudent,
  onSelectPartner,
  onOpenExport,
  selectedDepartment,
}) => {
  const [deptSortField, setDeptSortField] = useState<'readinessRate' | 'placementRate' | 'internshipRate'>('readinessRate');

  // Filter departments if specific one selected
  const filteredDepartments =
    selectedDepartment === 'All Departments'
      ? DEPARTMENTS_DATA
      : DEPARTMENTS_DATA.filter((d) => d.name === selectedDepartment);

  const sortedDepartments = [...filteredDepartments].sort(
    (a, b) => b[deptSortField] - a[deptSortField]
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 1. TOP INSTITUTIONAL GREETING & CONTEXT BANNER */}
      <div className="bg-gradient-to-r from-[#111844] via-[#1E2756] to-[#27347A] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Layers className="w-96 h-96 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wide border border-white/20">
                {INSTITUTION_INFO.name}
              </span>
              <span className="text-white/60 text-xs">•</span>
              <span className="text-xs font-medium text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> NAAC A++ Apex Node
              </span>
              <span className="text-white/60 text-xs">•</span>
              <span className="text-xs font-semibold text-[#EAE0CF]">
                {INSTITUTION_INFO.academicYear}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good morning, Admin
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl font-normal leading-relaxed">
              Here&apos;s your institution&apos;s skill, internship, and placement overview across all 8 academic departments and 86 industry partners.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => onOpenExport('Institutional Executive Summary & Employability Audit')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Export Audit</span>
            </button>
            <button
              onClick={() => onNavigate('partners')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4B5694] hover:bg-[#5F6FB2] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Manage Partners</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Institutional Performance Indicators (AY 2026–27)
          </div>
          <span className="text-xs text-[#4B5694] font-medium">Real-time Data Sync</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {KPI_METRICS.map((kpi) => (
            <KPICard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              trend={kpi.trend}
              subtext={kpi.subtext}
              sparkline={kpi.sparkline}
              viewLink={kpi.viewLink}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* 3. ROW: INSTITUTIONAL SKILL INTELLIGENCE & PLACEMENT OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SKILL INTELLIGENCE COMPARISON */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111844]" />
                  <h2 className="text-base font-extrabold text-[#111844]">
                    Institutional Skill Intelligence
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Empirical benchmarking of industry demand vs. institutional proficiency across 4,280 students.
                </p>
              </div>
              <button
                onClick={() => onNavigate('skill-gap')}
                className="text-xs font-bold text-[#4B5694] hover:text-[#111844] flex items-center gap-1 shrink-0 group"
              >
                Full Analysis <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Visual Legend */}
            <div className="flex items-center gap-4 text-[11px] text-slate-600 mb-5 bg-[#F8F9FD] p-2.5 rounded-xl border border-slate-200/60">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-2 rounded-xs bg-[#111844]" />
                Industry Hiring Demand
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-2 rounded-xs bg-[#7288AE]" />
                Student Proficiency
              </span>
              <span className="flex items-center gap-1.5 font-medium text-amber-700 ml-auto">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Deficit Gap (Δ)
              </span>
            </div>

            {/* Horizontal Benchmark Rows */}
            <div className="space-y-4">
              {SKILL_INTELLIGENCE_DATA.slice(0, 5).map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-semibold text-slate-800 flex items-center gap-2">
                      <span>{item.skill}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded font-normal">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-semibold text-[11px]">
                      <span className="text-[#111844]">Demand: {item.industryDemand}%</span>
                      <span className="text-[#7288AE]">Proficiency: {item.studentProficiency}%</span>
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Gap: {item.gap}%
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar Comparison */}
                  <div className="space-y-1">
                    {/* Demand Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-[#111844] h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.industryDemand}%` }}
                      />
                    </div>
                    {/* Proficiency Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-[#7288AE] h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.studentProficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Priority curriculum interventions assigned for Cloud & Regulatory Writing.
            </span>
            <button
              onClick={() => onNavigate('skill-gap')}
              className="text-xs font-bold text-[#111844] hover:underline"
            >
              View Full Skill Gap Analysis →
            </button>
          </div>
        </div>

        {/* PLACEMENT OVERVIEW & FUNNEL */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h2 className="text-base font-extrabold text-[#111844]">
                    Placement Overview & Funnel
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Institutional conversion pipeline for the 2026 graduating cohort.
                </p>
              </div>
              <button
                onClick={() => onNavigate('placements')}
                className="text-xs font-bold text-[#4B5694] hover:text-[#111844] flex items-center gap-1 shrink-0 group"
              >
                Drives <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Highlight Metric Pills */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 bg-[#F8F9FD] rounded-2xl border border-slate-200/60">
                <div className="text-slate-500 text-[11px] font-medium">Placement Cleared</div>
                <div className="text-xl font-extrabold text-[#111844] mt-0.5">82.4%</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  ↑ 5.2% vs previous year
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] rounded-2xl border border-slate-200/60">
                <div className="text-slate-500 text-[11px] font-medium">Highest CTC Package</div>
                <div className="text-xl font-extrabold text-emerald-700 mt-0.5">₹28.5 LPA</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  BioAI / Computational
                </div>
              </div>
            </div>

            {/* Visual Placement Funnel */}
            <div className="space-y-2">
              {PLACEMENT_FUNNEL_STAGES.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white hover:bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-semibold text-slate-700">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-[#111844]">{stage.count.toLocaleString()}</span>
                    <span className="text-[11px] text-slate-400 font-mono w-12 text-right">
                      {stage.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">6 on-campus corporate drives ongoing</span>
            <button
              onClick={() => onNavigate('placements')}
              className="text-xs font-bold text-[#111844] hover:underline"
            >
              View Placement Analytics →
            </button>
          </div>
        </div>
      </div>

      {/* 4. DEPARTMENT READINESS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-extrabold text-[#111844] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#4B5694]" />
              Department Readiness & Employability
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Comparative performance across departments. Click any department row for granular drilldown.
            </p>
          </div>

          {/* Department Sort Toggles */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Sort by:</span>
            {(['readinessRate', 'placementRate', 'internshipRate'] as const).map((field) => (
              <button
                key={field}
                onClick={() => setDeptSortField(field)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  deptSortField === field
                    ? 'bg-[#111844] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {field === 'readinessRate'
                  ? 'Skill Readiness'
                  : field === 'placementRate'
                  ? 'Placement %'
                  : 'Internships %'}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-bold pl-2">Department Name</th>
                <th className="pb-3 font-bold">Students</th>
                <th className="pb-3 font-bold">Skill Readiness</th>
                <th className="pb-3 font-bold">Internship Rate</th>
                <th className="pb-3 font-bold">Placement Rate</th>
                <th className="pb-3 font-bold">Skill Gap</th>
                <th className="pb-3 font-bold">Industry Engagement</th>
                <th className="pb-3 font-bold text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedDepartments.map((dept) => (
                <tr
                  key={dept.id}
                  className="hover:bg-[#F8F9FD] transition-colors group cursor-pointer"
                  onClick={() => onNavigate('analytics')}
                >
                  <td className="py-3.5 pl-2 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4B5694]" />
                      <span>{dept.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({dept.code})</span>
                    </div>
                  </td>
                  <td className="py-3.5 font-medium text-slate-700">{dept.totalStudents}</td>
                  <td className="py-3.5 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{dept.readinessRate}%</span>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${dept.readinessRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-medium text-slate-700">{dept.internshipRate}%</td>
                  <td className="py-3.5 font-bold text-slate-900">{dept.placementRate}%</td>
                  <td className="py-3.5 font-semibold text-amber-700">
                    <span className="bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {dept.skillGapScore}%
                    </span>
                  </td>
                  <td className="py-3.5 font-medium text-slate-700">
                    <div className="flex items-center gap-1 text-emerald-700">
                      <span>{dept.industryEngagement}%</span>
                      <span className="text-[10px] text-slate-400">({dept.activeMoUs} MoUs)</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('analytics');
                      }}
                      className="text-xs font-semibold text-[#4B5694] group-hover:text-[#111844] hover:underline"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ROW: INTERNSHIP ACTIVITY & INDUSTRY PARTNERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INTERNSHIP MONITORING TABLE */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base font-extrabold text-[#111844] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#4B5694]" />
                  Internship Monitoring
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  142 active industry internships. 18 pending mentor authorization.
                </p>
              </div>
              <button
                onClick={() => onNavigate('internships')}
                className="text-xs font-bold text-[#4B5694] hover:text-[#111844] flex items-center gap-1 shrink-0 group"
              >
                All Internships <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="pb-2.5 font-bold">Student</th>
                    <th className="pb-2.5 font-bold">Company & Role</th>
                    <th className="pb-2.5 font-bold">Designated Mentor</th>
                    <th className="pb-2.5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INTERNSHIPS_DATA.slice(0, 5).map((int) => {
                    const studentObj = STUDENTS_DIRECTORY_DATA.find((s) => s.id === int.studentId);

                    return (
                      <tr
                        key={int.id}
                        onClick={() => studentObj && onSelectStudent(studentObj)}
                        className="hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={int.avatar}
                              alt={int.studentName}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-semibold text-slate-800 group-hover:text-[#111844]">
                                {int.studentName}
                              </div>
                              <div className="text-[10px] text-slate-400">{int.rollNo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="font-semibold text-slate-800">{int.company}</div>
                          <div className="text-[10px] text-slate-500">{int.role}</div>
                        </td>
                        <td className="py-3 font-medium text-slate-600">{int.mentor}</td>
                        <td className="py-3 text-right">
                          <StatusBadge status={int.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-amber-700 font-medium">
              18 mentor approvals pending verification.
            </span>
            <button
              onClick={() => onNavigate('internships')}
              className="text-xs font-bold text-[#111844] hover:underline"
            >
              Review Pending Approvals →
            </button>
          </div>
        </div>

        {/* INDUSTRY PARTNERS NETWORK */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base font-extrabold text-[#111844] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#4B5694]" />
                  Industry Partner Network
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  86 active corporate partners & research organizations.
                </p>
              </div>
              <button
                onClick={() => onNavigate('partners')}
                className="text-xs font-bold text-[#4B5694] hover:text-[#111844] flex items-center gap-1 shrink-0 group"
              >
                View All <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-3">
              {INDUSTRY_PARTNERS_DATA.slice(0, 4).map((pt) => (
                <div
                  key={pt.id}
                  onClick={() => onSelectPartner(pt)}
                  className="p-3 rounded-2xl border border-slate-200/80 hover:border-[#4B5694] hover:shadow-2xs transition-all cursor-pointer bg-white group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">
                      {pt.logo}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs group-hover:text-[#111844]">
                        {pt.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{pt.industry}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={pt.collaborationStatus} />
                    <div className="text-[10px] text-slate-400 mt-1">
                      {pt.activeOpportunities} Active Opps
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">3 MoUs due for renewal within 45 days.</span>
            <button
              onClick={() => onNavigate('partners')}
              className="text-xs font-bold text-[#111844] hover:underline"
            >
              Manage Industry Partners →
            </button>
          </div>
        </div>
      </div>

      {/* 6. INDUSTRY COLLABORATION HUB TIMELINE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-extrabold text-[#111844] flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#4B5694]" />
              Industry Collaboration Hub & Strategic MoUs
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active agreements, joint research centers, hackathons, and upcoming events.
            </p>
          </div>
          <button
            onClick={() => onNavigate('collaboration')}
            className="text-xs font-bold text-[#4B5694] hover:text-[#111844] flex items-center gap-1 shrink-0 group"
          >
            Collaboration Hub <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLABORATION_ITEMS_DATA.slice(0, 3).map((col) => (
            <div
              key={col.id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-[#F8F9FD]/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600">
                    {col.type}
                  </span>
                  <StatusBadge status={col.status} />
                </div>
                <h3 className="font-bold text-xs text-slate-800 leading-snug">{col.title}</h3>
                <div className="text-[11px] text-[#4B5694] font-semibold mt-1">
                  Partner: {col.partner}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <span className="block font-medium text-slate-700">Outcome Impact:</span>
                <span className="text-emerald-700 font-semibold">{col.impactMetric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
