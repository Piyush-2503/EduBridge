import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  TrendingUp,
  Calendar,
  Layers,
  Award,
  Users,
  Target,
  Building,
} from 'lucide-react';
import { DEPARTMENTS_DATA, SKILL_INTELLIGENCE_DATA } from '../data/mockData';

interface InstitutionalAnalyticsViewProps {
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const InstitutionalAnalyticsView: React.FC<InstitutionalAnalyticsViewProps> = ({
  onOpenExport,
  selectedDepartment,
}) => {
  const [metricTab, setMetricTab] = useState<'placement' | 'internship' | 'readiness'>('placement');

  const historicalTrends = [
    { year: '2023–24', placementRate: 71.2, avgPackage: 6.2, internships: 98, readiness: 64 },
    { year: '2024–25', placementRate: 77.4, avgPackage: 7.1, internships: 120, readiness: 71 },
    { year: '2025–26', placementRate: 80.1, avgPackage: 7.9, internships: 134, readiness: 75 },
    { year: '2026–27 (Current)', placementRate: 82.4, avgPackage: 8.4, internships: 142, readiness: 78.6 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Institutional Analytics & Historical Trends
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            4-year longitudinal growth metrics: placement conversion, internship capacity, and curricular skill readiness.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Longitudinal Institutional Employability & Placement Benchmark 2023-2027')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export Institutional Analytics (PDF)
        </button>
      </div>

      {/* 4-Year Longitudinal Growth Trend */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-[#111844]">
              Longitudinal Performance Indicators (4-Year Trend)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Consistent institutional trajectory across accreditation cycles.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {(['placement', 'internship', 'readiness'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMetricTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  metricTab === tab
                    ? 'bg-[#111844] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'placement'
                  ? 'Placement %'
                  : tab === 'internship'
                  ? 'Internships'
                  : 'Skill Readiness'}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {historicalTrends.map((t, i) => {
            const val =
              metricTab === 'placement'
                ? t.placementRate
                : metricTab === 'internship'
                ? t.internships
                : t.readiness;
            const maxVal = metricTab === 'internship' ? 160 : 100;
            const heightPercent = Math.round((val / maxVal) * 100);

            return (
              <div
                key={t.year}
                className="p-5 rounded-2xl border border-slate-200/90 bg-[#F8F9FD] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t.year}
                  </span>
                  <div className="text-2xl font-black text-[#111844] mt-1">
                    {val}
                    {metricTab !== 'internship' && '%'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Avg CTC: ₹{t.avgPackage} LPA
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60">
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#111844] h-full rounded-full transition-all duration-700"
                      style={{ width: `${heightPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                    <span>Baseline</span>
                    <span className="font-semibold text-emerald-700">
                      {i === 0 ? 'Base' : `+${(val - historicalTrends[i - 1][metricTab === 'placement' ? 'placementRate' : metricTab === 'internship' ? 'internships' : 'readiness']).toFixed(1)}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Readiness Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-[#111844]">
            Department Competency Breakdown
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-departmental comparison of student strength, industry tie-ups, and placement clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS_DATA.map((dept) => (
            <div
              key={dept.id}
              className="p-4 rounded-2xl border border-slate-200 bg-[#F8F9FD]/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111844] truncate">{dept.name}</span>
                <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border text-slate-500">
                  {dept.code}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Enrolled Students:</span>
                  <span className="font-semibold text-slate-800">{dept.totalStudents}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Placement Rate:</span>
                  <span className="font-bold text-emerald-700">{dept.placementRate}%</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Skill Readiness:</span>
                  <span className="font-semibold text-[#4B5694]">{dept.readinessRate}%</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Industry MoUs:</span>
                  <span className="font-semibold text-slate-800">{dept.activeMoUs}</span>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${dept.readinessRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
