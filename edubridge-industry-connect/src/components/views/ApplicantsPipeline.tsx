import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  ShieldCheck,
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  FileText,
  Star,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { Applicant, ApplicantStage, Opportunity, StudentTalent } from '../../types';

interface ApplicantsPipelineProps {
  applicants: Applicant[];
  opportunities: Opportunity[];
  onUpdateApplicantStage: (applicantId: string, newStage: ApplicantStage) => void;
  onSelectTalent: (talent: StudentTalent) => void;
}

const STAGES: { id: ApplicantStage; label: string; color: string; bg: string; dotColor: string }[] = [
  { id: 'Applied', label: 'Applied', color: 'text-slate-700', bg: 'bg-slate-100', dotColor: 'bg-slate-400' },
  { id: 'Shortlisted', label: 'Shortlisted', color: 'text-amber-800', bg: 'bg-amber-50', dotColor: 'bg-amber-500' },
  { id: 'Assessment', label: 'Assessment', color: 'text-indigo-800', bg: 'bg-indigo-50', dotColor: 'bg-indigo-600' },
  { id: 'Interview', label: 'Interview', color: 'text-purple-800', bg: 'bg-purple-50', dotColor: 'bg-purple-600' },
  { id: 'Selected', label: 'Selected / PPO', color: 'text-emerald-800', bg: 'bg-emerald-50', dotColor: 'bg-emerald-600' },
];

export const ApplicantsPipeline: React.FC<ApplicantsPipelineProps> = ({
  applicants,
  opportunities,
  onUpdateApplicantStage,
  onSelectTalent,
}) => {
  const [selectedOppId, setSelectedOppId] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoteApplicant, setActiveNoteApplicant] = useState<Applicant | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');

  const filteredApplicants = applicants.filter((app) => {
    if (selectedOppId !== 'All' && app.opportunityId !== selectedOppId) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        app.talent.name.toLowerCase().includes(q) ||
        app.talent.college.toLowerCase().includes(q) ||
        app.opportunityTitle.toLowerCase().includes(q) ||
        app.matchedSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStageApplicants = (stage: ApplicantStage) => {
    return filteredApplicants.filter((a) => a.stage === stage);
  };

  const advanceStage = (app: Applicant) => {
    const currentIndex = STAGES.findIndex((s) => s.id === app.stage);
    if (currentIndex < STAGES.length - 1) {
      onUpdateApplicantStage(app.id, STAGES[currentIndex + 1].id);
    }
  };

  const regressStage = (app: Applicant) => {
    const currentIndex = STAGES.findIndex((s) => s.id === app.stage);
    if (currentIndex > 0) {
      onUpdateApplicantStage(app.id, STAGES[currentIndex - 1].id);
    }
  };

  const handleSaveNote = () => {
    if (!activeNoteApplicant) return;
    activeNoteApplicant.notes = newNoteText;
    setActiveNoteApplicant(null);
    setNewNoteText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Recruitment Pipeline
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              Kanban Workflow
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            SIH PS-26044 streamlined hiring: Track candidate progression from initial application through proctored diagnostic assessments to final Pre-Placement Offers (PPOs).
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
          Total Candidates in Pipeline: <b className="text-slate-900">{filteredApplicants.length}</b>
        </div>
      </div>

      {/* Filter & Opportunity Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, college, or matched skill..."
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">
            Role:
          </label>
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Active Opportunities ({opportunities.length})</option>
            {opportunities.map((opp) => (
              <option key={opp.id} value={opp.id}>
                {opp.title.slice(0, 35)}... ({opp.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {STAGES.map((stage, sIdx) => {
          const stageApps = getStageApplicants(stage.id);
          return (
            <div
              key={stage.id}
              className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 flex flex-col min-h-[580px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1.5 py-1 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.dotColor}`} />
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                    {stage.label}
                  </h3>
                </div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200/80 shadow-2xs">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards inside this Column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageApps.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white/40">
                    <p className="text-xs font-medium">No candidates in {stage.label}</p>
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all space-y-2.5 group"
                    >
                      {/* Candidate Avatar & Match */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={app.talent.avatar}
                            alt={app.talent.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4
                              onClick={() => onSelectTalent(app.talent)}
                              className="text-xs font-extrabold text-slate-900 hover:text-indigo-600 cursor-pointer truncate transition-colors"
                            >
                              {app.talent.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 truncate">
                              {app.talent.college}
                            </p>
                          </div>
                        </div>

                        {/* Match % */}
                        <span
                          className={`text-[11px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                            app.skillMatchPercent >= 90
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          {app.skillMatchPercent}%
                        </span>
                      </div>

                      {/* Target Opportunity */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                        <span className="font-semibold text-slate-800 block truncate">
                          {app.opportunityTitle}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Applied {app.appliedDate}
                        </span>
                      </div>

                      {/* Assessment / Interview Details */}
                      {app.assessmentScore && (
                        <div className="flex items-center justify-between text-[11px] px-2 py-1 rounded bg-indigo-50/70 border border-indigo-100 text-indigo-900 font-semibold">
                          <span>Proctored Score:</span>
                          <span className="font-black text-indigo-700">
                            {app.assessmentScore}/100
                          </span>
                        </div>
                      )}

                      {app.interviewDate && (
                        <div className="text-[10px] text-purple-700 font-medium bg-purple-50 p-1.5 rounded border border-purple-200">
                          📅 {app.interviewDate}
                        </div>
                      )}

                      {/* Matched Skills */}
                      <div className="flex flex-wrap gap-1">
                        {app.matchedSkills.slice(0, 3).map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Recruiter Note if any */}
                      {app.notes && (
                        <p className="text-[10px] text-slate-600 italic bg-amber-50/70 p-1.5 rounded border border-amber-100 line-clamp-2">
                          "{app.notes}"
                        </p>
                      )}

                      {/* Action Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onSelectTalent(app.talent)}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded"
                            title="View Full Competency Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setActiveNoteApplicant(app);
                              setNewNoteText(app.notes || '');
                            }}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded"
                            title="Add/Edit Recruiter Note"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Stage Stepper Buttons */}
                        <div className="flex items-center gap-1">
                          {sIdx > 0 && (
                            <button
                              onClick={() => regressStage(app)}
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                              title="Move Back"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {sIdx < STAGES.length - 1 && (
                            <button
                              onClick={() => advanceStage(app)}
                              className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-1 shadow-2xs"
                              title="Advance to Next Stage"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {sIdx === STAGES.length - 1 && (
                            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Hired
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruiter Note Modal */}
      {activeNoteApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Recruiter Evaluation Note: {activeNoteApplicant.talent.name}
            </h3>
            <p className="text-xs text-slate-500">
              Role: {activeNoteApplicant.opportunityTitle}
            </p>
            <textarea
              rows={4}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="e.g. Excellent test results. Mentorship interview scheduled for 24 March."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveNoteApplicant(null)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="text-xs font-bold px-4 py-1.5 rounded-xl bg-indigo-600 text-white"
              >
                Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
