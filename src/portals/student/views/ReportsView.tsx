import React from 'react';
import {
  BarChart3,
  Download,
  FileText,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { InstitutionProfile, DepartmentStat } from '../types';

interface ReportsViewProps {
  institution: InstitutionProfile;
  departmentStats: DepartmentStat[];
  onOpenExportReport: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  institution,
  departmentStats,
  onOpenExportReport
}) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner & Action Button */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Institutional Accreditation & Placement Analytics
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              NIRF & NAAC Audit Ready
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Consolidated intelligence across NAAC Criterion 5 (Student Progression), NIRF Placement indices, and corporate skill gap diagnostics.
          </p>
        </div>

        <button
          id="reports-export-packet-btn"
          onClick={onOpenExportReport}
          className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-[#EAE0CF]" />
          <span>Export Audit Packet</span>
        </button>
      </div>

      {/* NIRF & NAAC Accreditation Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="flex items-center justify-between text-[#7288AE]">
            <span className="text-xs font-bold uppercase tracking-wider">NIRF Institutional Rank</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Top 40
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#111844] mt-1">#38</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4 positions vs 2025</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="flex items-center justify-between text-[#7288AE]">
            <span className="text-xs font-bold uppercase tracking-wider">NAAC Grade & CGPA</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAE0CF] text-[#111844]">
              Cycle 3
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#111844] mt-1">A++</div>
          <div className="text-[11px] text-[#4B5694] font-semibold mt-0.5">
            CGPA 3.84 / 4.00 (Outstanding)
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="flex items-center justify-between text-[#7288AE]">
            <span className="text-xs font-bold uppercase tracking-wider">Criterion 5.2.1 Audit</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Compliant
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#111844] mt-1">84.7%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            Verified placement records with NAD
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-2xs">
          <div className="flex items-center justify-between text-[#7288AE]">
            <span className="text-xs font-bold uppercase tracking-wider">Median CTC Benchmark</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAE0CF] text-[#111844]">
              2025–26
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#111844] mt-1">₹8.4 LPA</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            Highest: ₹44 LPA (Google Cloud)
          </div>
        </div>
      </div>

      {/* Deep Analytics: Department Placement Readiness vs Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Department Breakdown Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                Departmental Placement Readiness Matrix
              </h3>
              <p className="text-xs text-[#7288AE] mt-0.5">
                Evaluated against corporate recruitment thresholds
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase text-[#4B5694] bg-[#4B5694]/10 px-2 py-0.5 rounded">
              Audited
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#4B5694]/12 text-[11px] font-bold text-[#7288AE] uppercase tracking-wider bg-[#F8F9FC]">
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Enrolled</th>
                  <th className="py-2.5 px-3">Verified %</th>
                  <th className="py-2.5 px-3">Readiness</th>
                  <th className="py-2.5 px-3">Top Industry Skill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4B5694]/8">
                {departmentStats.map((dept) => (
                  <tr key={dept.code} className="hover:bg-[#4B5694]/4 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#111844]">{dept.department}</div>
                      <div className="text-[10px] text-[#7288AE] font-mono">{dept.code}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#111844]">{dept.totalStudents}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-700">{dept.verifiedPercentage}%</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#F1F4FA] rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#111844] to-[#4B5694] h-1.5 rounded-full"
                            style={{ width: `${dept.averagePlacementReadiness}%` }}
                          />
                        </div>
                        <span className="font-extrabold text-[#4B5694]">
                          {dept.averagePlacementReadiness}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#4B5694] font-medium text-[11px]">
                      {dept.topIndustrySkill}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Cols: Industry Skill Gap Diagnostics */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                Corporate Skill Gap Diagnostics
              </h3>
              <p className="text-xs text-[#7288AE] mt-0.5">
                Difference between industry hiring demand & student proficiencies
              </p>
            </div>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>

          <div className="space-y-3.5">
            {[
              { skill: 'Cloud Native & Kubernetes DevOps', gap: 18, demand: 94, readiness: 76, dept: 'CSE / IT' },
              { skill: 'LLM Fine-Tuning & MLOps Pipelines', gap: 14, demand: 96, readiness: 82, dept: 'AI&DS' },
              { skill: 'Embedded Linux & Edge RTOS', gap: 21, demand: 88, readiness: 67, dept: 'ECE' },
              { skill: 'Robotics Control & Digital Twin CAD', gap: 24, demand: 85, readiness: 61, dept: 'MECH' },
              { skill: 'Ayush Health Informatics NLP', gap: 12, demand: 82, readiness: 70, dept: 'Interdisciplinary' }
            ].map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111844]">{item.skill}</span>
                  <span className="text-[11px] font-bold text-amber-700 px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200">
                    -{item.gap}% Gap
                  </span>
                </div>
                {/* Visual comparative bar */}
                <div className="w-full bg-[#F1F4FA] rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-[#4B5694] h-2 rounded-l-full"
                    style={{ width: `${item.readiness}%` }}
                    title={`Student Readiness: ${item.readiness}%`}
                  />
                  <div
                    className="bg-amber-400/70 h-2"
                    style={{ width: `${item.gap}%` }}
                    title={`Gap: ${item.gap}%`}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7288AE]">
                  <span>Target: {item.dept}</span>
                  <span>Corporate Demand: {item.demand}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#4B5694]/10 text-center">
            <button
              onClick={onOpenExportReport}
              className="text-xs font-bold text-[#4B5694] hover:text-[#111844] transition-colors cursor-pointer"
            >
              Generate Skill Diagnostic Curriculum Brief →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
