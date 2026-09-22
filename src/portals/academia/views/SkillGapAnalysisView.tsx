import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Award,
  Filter,
  Download,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from 'lucide-react';
import { SKILL_INTELLIGENCE_DATA, DEPARTMENTS_DATA } from '../data/mockData';
import { SkillGapItem } from '../types';

interface SkillGapAnalysisViewProps {
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const SkillGapAnalysisView: React.FC<SkillGapAnalysisViewProps> = ({
  onOpenExport,
  selectedDepartment,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState(
    selectedDepartment === 'All Departments' ? 'All' : selectedDepartment
  );

  const filteredSkills = SKILL_INTELLIGENCE_DATA.filter((item) => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
    return true;
  });

  // Sort by gap descending (critical gaps first)
  const sortedByGap = [...filteredSkills].sort((a, b) => b.gap - a.gap);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Institutional Skill Gap & Industry Alignment Audit
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical mapping of hiring mandate requirements versus current student competency across 8 departments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExport('Institutional Skill Gap & Curriculum Alignment Audit')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            Export Skill Gap Dossier (PDF)
          </button>
        </div>
      </div>

      {/* 2. Analytical Insight Cards (Based on mock data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* High Demand Skills */}
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              High Demand Competency
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
              88%
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-[#111844]">
            Python & Clinical Data Analytics
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hiring demand surged by +14% across health informatics & bio-pharma partners.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
            <span>Student Proficiency: 72%</span>
            <span>+8% YoY</span>
          </div>
        </div>

        {/* Critical Skill Gap */}
        <div className="p-5 bg-white rounded-3xl border border-amber-200 shadow-xs space-y-3 bg-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Critical Skill Gap
            </span>
            <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
              Δ 25%
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-[#111844]">
            Cloud Computing & Health Data Security
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Industry demand is 74% while student readiness is only 49%. Immediate FDP & bridge intervention required.
          </p>
          <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-800 font-semibold flex items-center justify-between">
            <span>Affected: CS & IT Depts</span>
            <span>4 Bridge Tracks</span>
          </div>
        </div>

        {/* Emerging Skills */}
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Emerging Skill Domain
            </span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-[#4B5694] flex items-center justify-center text-xs font-bold">
              76%
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-[#111844]">
            Drug Standardization & HPLC Analysis
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            AYUSH Pharmacopoeia requirements driving specialized analytical chemistry needs.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs text-[#4B5694] font-semibold flex items-center justify-between">
            <span>Proficiency: 58%</span>
            <span>3 Industry MoUs</span>
          </div>
        </div>

        {/* Showing Improvement */}
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Showing Improvement
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
              68%
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-[#111844]">
            Regulatory & Technical Writing
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Deficit gap narrowed to 11% following mandatory ICH-GCP workshops in semester 1.
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs text-emerald-700 font-semibold flex items-center justify-between">
            <span>Industry Demand: 79%</span>
            <span className="flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Stable
            </span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-semibold">Skill Category:</span>
          {(['All', 'Modern Tech', 'Ayush & Life Sciences', 'Core Engineering', 'Professional'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#111844] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <div className="text-slate-500">
          Evaluated against <strong>86</strong> verified industry partner job profiles
        </div>
      </div>

      {/* 4. Main Analytical Comparison: Industry Demand vs Student Proficiency */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-extrabold text-[#111844]">
            Competency Benchmark Ranking (Deficit Gap Ordered)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visual comparison of corporate hiring mandates versus current institutional batch capability.
          </p>
        </div>

        <div className="space-y-5">
          {sortedByGap.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-[#4B5694] transition-all bg-[#F8F9FD]/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-extrabold text-sm text-[#111844]">{item.skill}</span>
                    <span className="ml-2 text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-[#111844]">Demand: {item.industryDemand}%</span>
                  <span className="text-[#4B5694]">Proficiency: {item.studentProficiency}%</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full border ${
                      item.gap >= 20
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.gap >= 15
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    Gap: {item.gap}%
                  </span>
                </div>
              </div>

              {/* Progress bars comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Industry Hiring Demand Benchmark</span>
                    <span className="font-bold text-[#111844]">{item.industryDemand}%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#111844] h-full rounded-full"
                      style={{ width: `${item.industryDemand}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Current Student Proficiency</span>
                    <span className="font-bold text-[#4B5694]">{item.studentProficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.gap >= 20 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.studentProficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Affected Departments: </span>
                  {item.affectedDepartments.join(', ')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">
                    {item.interventionsActive} Institutional Bridge Modules Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
