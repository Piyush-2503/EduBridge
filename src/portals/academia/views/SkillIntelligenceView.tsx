import React, { useState } from 'react';
import {
  BrainCircuit,
  Download,
  Filter,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SKILL_INTELLIGENCE_DATA, DEPARTMENTS_DATA } from '../data/mockData';
import { ViewId } from '../types';

interface SkillIntelligenceViewProps {
  onNavigate: (view: ViewId) => void;
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const SkillIntelligenceView: React.FC<SkillIntelligenceViewProps> = ({
  onNavigate,
  onOpenExport,
  selectedDepartment,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Modern Tech' | 'Ayush & Life Sciences' | 'Core Engineering' | 'Professional'>('All');

  const filtered = SKILL_INTELLIGENCE_DATA.filter((s) => {
    if (activeTab !== 'All' && s.category !== activeTab) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Institutional Skill Intelligence & Competency Index
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry of verified student skill profiles across 4,280 scholars and 86 industry partner benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExport('Institutional Skill Intelligence & Competency Index Dossier')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            Export Competency Index
          </button>
        </div>
      </div>

      {/* Domain Clusters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Indexed Technical Skills</div>
          <div className="text-2xl font-black text-[#111844] mt-1">184</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Across 8 departments</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Verified Badges Issued</div>
          <div className="text-2xl font-black text-[#4B5694] mt-1">6,420</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Assessment backed</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Average Institutional Readiness</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">78.6%</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">↑ 8.2% vs previous term</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-400 text-[11px] font-semibold">Industry Co-Branded Tracks</div>
          <div className="text-2xl font-black text-amber-600 mt-1">26</div>
          <div className="text-[10px] text-slate-500 mt-0.5">With Dabur, TCS, Biocon</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap text-xs bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-slate-400 font-semibold">Cluster:</span>
        {(['All', 'Modern Tech', 'Ayush & Life Sciences', 'Core Engineering', 'Professional'] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#111844] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Competency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {skill.category}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Industry Aligned
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-[#111844]">{skill.skill}</h3>

              <div className="mt-3 space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Student Batch Proficiency:</span>
                    <span className="font-bold text-[#4B5694]">{skill.studentProficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#4B5694] h-full rounded-full"
                      style={{ width: `${skill.studentProficiency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Corporate Hiring Demand:</span>
                    <span className="font-bold text-[#111844]">{skill.industryDemand}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#111844] h-full rounded-full"
                      style={{ width: `${skill.industryDemand}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {skill.interventionsActive} Active Bridge Tracks
              </span>
              <button
                onClick={() => onNavigate('skill-gap')}
                className="font-bold text-[#111844] hover:underline flex items-center gap-1"
              >
                Inspect Gap →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
