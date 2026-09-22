import React from 'react';
import {
  FileCode2,
  GitBranch,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Trophy,
  ArrowRight,
  Info,
} from 'lucide-react';
import { NavSection } from '../../types';

interface WorkflowBannerProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

const WORKFLOW_STEPS = [
  {
    id: 'skill-requirements',
    title: '1. Industry Requirements',
    sub: 'Define core & emerging tech skills',
    icon: FileCode2,
    target: 'skill-requirements' as NavSection,
  },
  {
    id: 'skill-mapping',
    title: '2. Skill Mapping',
    sub: 'AICTE / NEP 2020 syllabus alignment',
    icon: GitBranch,
    target: 'skill-requirements' as NavSection,
  },
  {
    id: 'skill-gap',
    title: '3. Skill Gap Analysis',
    sub: 'Demand vs availability metrics',
    icon: AlertTriangle,
    target: 'skill-requirements' as NavSection,
  },
  {
    id: 'academia-collab',
    title: '4. Academia Connect',
    sub: 'Syllabus feedback & joint labs',
    icon: GraduationCap,
    target: 'academia-connect' as NavSection,
  },
  {
    id: 'verified-talent',
    title: '5. Verified Talent',
    sub: 'Proctored tests & code evidence',
    icon: ShieldCheck,
    target: 'talent-discovery' as NavSection,
  },
  {
    id: 'opportunities',
    title: '6. Internships / Projects',
    sub: 'Live projects & apprenticeships',
    icon: Briefcase,
    target: 'opportunities' as NavSection,
  },
  {
    id: 'placement',
    title: '7. Placements & PPOs',
    sub: 'Direct interview & hiring pipeline',
    icon: Trophy,
    target: 'applicants' as NavSection,
  },
];

export const WorkflowBanner: React.FC<WorkflowBannerProps> = ({
  currentSection,
  onNavigate,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-indigo-800/40 mb-6 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-indigo-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
            <GraduationCap className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-400/20">
                Academia-Industry Portal
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                Bridging Indian Academia with Live Industry Demands
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
              End-to-End Skill Mapping & Verified Placement Pipeline
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-indigo-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            {isExpanded ? 'Hide Workflow Explanation' : 'How the Bridge Works'}
          </button>
        </div>
      </div>

      {/* Interactive 7-Step Workflow Chain */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 relative">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive =
            (step.target === 'skill-requirements' && currentSection === 'skill-requirements') ||
            (step.target === 'academia-connect' && currentSection === 'academia-connect') ||
            (step.target === 'talent-discovery' && currentSection === 'talent-discovery') ||
            (step.target === 'opportunities' && currentSection === 'opportunities') ||
            (step.target === 'applicants' && currentSection === 'applicants');

          return (
            <button
              key={step.id}
              onClick={() => onNavigate(step.target)}
              className={`text-left p-2.5 rounded-xl transition-all group relative border ${
                isActive
                  ? 'bg-indigo-600/30 border-indigo-400/60 shadow-xs'
                  : 'bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors ${
                    isActive
                      ? 'bg-indigo-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-indigo-200 group-hover:bg-indigo-500/30 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400/50 hidden lg:block" />
                )}
              </div>
              <div className="text-xs font-semibold text-slate-100 group-hover:text-white truncate">
                {step.title}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                {step.sub}
              </div>
            </button>
          );
        })}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-indigo-800/50 text-xs text-slate-300 leading-relaxed grid sm:grid-cols-3 gap-4 bg-indigo-950/40 p-3.5 rounded-xl">
          <div>
            <span className="font-semibold text-white block mb-1">1. Demand-Driven Curriculum</span>
            Companies submit real-time emerging tech requirements (e.g. SLMs, Rust, Kubernetes) which directly flag outdated university syllabi to institute deans.
          </div>
          <div>
            <span className="font-semibold text-white block mb-1">2. Evidence-Based Verification</span>
            Instead of unverified resumes, talent profiles feature proctored sandbox assessments, code repositories, and faculty-endorsed capstones.
          </div>
          <div>
            <span className="font-semibold text-white block mb-1">3. Guaranteed PPO Pathways</span>
            Students transitioning from live projects and internships directly advance through the pre-assessed recruitment pipeline with zero redundant screening.
          </div>
        </div>
      )}
    </div>
  );
};
