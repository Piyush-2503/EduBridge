import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Award,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { SkillDemandItem, AcademiaPartner, Opportunity } from '../../types';

interface AnalyticsViewProps {
  skillDemands: SkillDemandItem[];
  academiaPartners: AcademiaPartner[];
  opportunities: Opportunity[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  skillDemands,
  academiaPartners,
  opportunities,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Quarter' | 'Academic Year' | 'All Time'>(
    'Quarter'
  );

  // Funnel Data
  const funnel = [
    { stage: 'Discovered in Colleges', count: 1240, percent: 100, color: 'bg-slate-800' },
    { stage: 'Diagnostic Assessment Passed', count: 480, percent: 38.7, color: 'bg-indigo-600' },
    { stage: 'Shortlisted by Recruiter', count: 142, percent: 11.4, color: 'bg-blue-600' },
    { stage: 'Live Technical / Project Defense', count: 58, percent: 4.6, color: 'bg-purple-600' },
    { stage: 'Offered Internship / PPO', count: 32, percent: 2.5, color: 'bg-emerald-600' },
  ];

  // Hiring trend months
  const monthlyTrends = [
    { month: 'Oct 2025', applications: 92, verifiedHires: 4 },
    { month: 'Nov 2025', applications: 124, verifiedHires: 6 },
    { month: 'Dec 2025', applications: 168, verifiedHires: 8 },
    { month: 'Jan 2026', applications: 235, verifiedHires: 12 },
    { month: 'Feb 2026', applications: 310, verifiedHires: 18 },
    { month: 'Mar 2026 (MTD)', applications: 284, verifiedHires: 14 },
  ];

  const maxApp = Math.max(...monthlyTrends.map((m) => m.applications));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Workforce Skill Analytics & Hiring Intelligence
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              Real-Time Metrics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Evaluate recruitment funnel efficiency, curriculum alignment returns, and university talent performance across Indian technical institutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['Quarter', 'Academic Year', 'All Time'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTimeframe(t)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                selectedTimeframe === t
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Average Skill Match</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">91.4%</div>
          <span className="text-[11px] text-emerald-600 font-medium">
            +6.2% since NEP syllabus alignment
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Conversion to PPO</span>
          <div className="text-2xl font-black text-indigo-900 mt-1">64.2%</div>
          <span className="text-[11px] text-indigo-600 font-medium">
            High retention from live capstones
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">Assessment Pass Rate</span>
          <div className="text-2xl font-black text-purple-900 mt-1">78.5%</div>
          <span className="text-[11px] text-purple-600 font-medium">
            Proctored CodeBench tests
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold block">College Active MoUs</span>
          <div className="text-2xl font-black text-slate-900 mt-1">14</div>
          <span className="text-[11px] text-slate-500 font-medium">
            IITs, NITs, Premier Autonomous
          </span>
        </div>
      </div>

      {/* Section 1: Talent Funnel & Hiring Trends */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Talent Funnel */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Verified Talent Recruitment Funnel
            </h3>
            <p className="text-xs text-slate-500">
              Progression from diagnostic discovery to final corporate offer
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {funnel.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.stage}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-900">{item.count}</span>
                    <span className="text-slate-400 text-[11px]">({item.percent}%)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Monthly Application & Hiring Trends */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Application & Hiring Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Monthly pre-screened applications vs finalized hires
            </p>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
            {monthlyTrends.map((m, idx) => {
              const heightPct = Math.round((m.applications / maxApp) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-700">
                    {m.applications}
                  </span>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg relative flex flex-col justify-end overflow-hidden" style={{ height: `${heightPct}%` }}>
                    <div
                      className="w-full bg-indigo-600 rounded-t-lg transition-all duration-300"
                      style={{ height: '100%' }}
                    />
                    <div
                      className="w-full bg-emerald-500 rounded-t-lg absolute bottom-0"
                      style={{ height: `${(m.verifiedHires / m.applications) * 100 * 3}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 truncate text-center block w-full mt-1">
                    {m.month.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-600" />
              Verified Applicants
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              PPO / Hires
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: College Engagement & Most Demanded Skills */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Top Partner Colleges Ranked by Match */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Institutional Talent Engagement Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Colleges ranked by verified candidate volume & skill compatibility
              </p>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-lg">
              NIRF Synchronized
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] uppercase font-bold text-slate-400 bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">University</th>
                  <th className="py-2.5 px-3">NIRF</th>
                  <th className="py-2.5 px-3">Verified Students</th>
                  <th className="py-2.5 px-3">Skill Match</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {academiaPartners.map((col) => (
                  <tr key={col.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {col.shortName}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono">
                      #{col.nirfRank}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700">
                      {col.verifiedStudentsCount}
                    </td>
                    <td className="py-3 px-3 font-black text-emerald-700">
                      {col.avgSkillMatch}%
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          col.collaborationStatus === 'Active MoU'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {col.collaborationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Most Demanded Skills Breakdown */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Most Demanded Technical Skills
            </h3>
            <p className="text-xs text-slate-500">
              Enterprise hiring volume vs acute curriculum gap
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {skillDemands.slice(0, 5).map((sk) => (
              <div key={sk.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{sk.skillName}</span>
                  <span className="text-[11px] font-black text-indigo-700">
                    {sk.industryDemandLevel}% Demand
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Role: {sk.targetRole}</span>
                  <span className="text-amber-700 font-semibold">
                    Supply Gap: +{sk.skillGapPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
