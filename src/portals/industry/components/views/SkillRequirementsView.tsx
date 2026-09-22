import React, { useState } from 'react';
import {
  FileCode2,
  Plus,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Filter,
  Layers,
  Search,
} from 'lucide-react';
import { SkillDemandItem, NavSection } from '../../types';

interface SkillRequirementsViewProps {
  skillDemands: SkillDemandItem[];
  onOpenAddSkillDemand: () => void;
  onNavigate: (section: NavSection) => void;
}

export const SkillRequirementsView: React.FC<SkillRequirementsViewProps> = ({
  skillDemands,
  onOpenAddSkillDemand,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Software & Cloud',
    'Data & AI',
    'Cybersecurity',
    'Embedded & IoT',
    'Core Engineering',
  ];

  const filtered = skillDemands.filter((s) => {
    if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.skillName.toLowerCase().includes(q) ||
        s.targetRole.toLowerCase().includes(q) ||
        s.recommendedAcademiaAction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const avgGap = Math.round(
    skillDemands.reduce((acc, c) => acc + c.skillGapPercent, 0) / skillDemands.length
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Industry Skill Requirements & Gap Mapping
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Core Skill Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Map enterprise technical competencies against real-time Indian university talent availability to detect acute shortages and trigger NEP 2020 curriculum interventions.
          </p>
        </div>

        <button
          onClick={onOpenAddSkillDemand}
          className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Define Skill Demand</span>
        </button>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs">
          <span className="text-[11px] font-bold uppercase text-indigo-700 block">
            Average Market Shortfall
          </span>
          <div className="text-2xl font-black text-indigo-950 mt-1">+{avgGap}% Skill Gap</div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Demand significantly outpaces traditional university syllabi
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs">
          <span className="text-[11px] font-bold uppercase text-amber-700 block">
            Disruptive / Emerging Skills
          </span>
          <div className="text-2xl font-black text-amber-950 mt-1">
            {skillDemands.filter((s) => s.isEmerging).length} Technologies
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            SLMs, Kubernetes Telemetry, Memory-Safe Rust
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-xs">
          <span className="text-[11px] font-bold uppercase text-purple-700 block">
            Curriculum Intervention Pathways
          </span>
          <div className="text-2xl font-black text-purple-950 mt-1">14 University MoUs</div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Active Board of Studies electives under alignment
          </p>
        </div>
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
              placeholder="Search skill requirement, role, or curriculum recommendation..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Mapping Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Skill Demand vs Verified Talent Supply Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Interactive gap analysis indicating required academia syllabus updates
            </p>
          </div>
          <button
            onClick={() => onNavigate('academia-connect')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Bridge Gaps in Academia</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors space-y-3"
            >
              {/* Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.skillName}</h4>
                      {item.isEmerging && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          Emerging Tech
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                          item.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Target Role: <b className="text-slate-700">{item.targetRole}</b> • Category: {item.category}
                    </p>
                  </div>
                </div>

                {/* Skill Gap Badge */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Supply Deficit
                    </span>
                    <span className="text-sm font-black text-amber-700">
                      +{item.skillGapPercent}% Gap
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('academia-connect')}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Send Syllabus Fix</span>
                  </button>
                </div>
              </div>

              {/* Demand vs Availability Dual Progress Bars */}
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      Industry Enterprise Demand:
                    </span>
                    <span className="font-bold text-indigo-700">
                      {item.industryDemandLevel}/100
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${item.industryDemandLevel}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      Verified Student Talent Availability:
                    </span>
                    <span className="font-bold text-emerald-700">
                      {item.talentAvailabilityLevel}/100
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${item.talentAvailabilityLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Curriculum Action Recommendation */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div className="text-slate-700">
                  <span className="font-bold text-slate-900">Recommended NEP 2020 Action: </span>
                  {item.recommendedAcademiaAction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
