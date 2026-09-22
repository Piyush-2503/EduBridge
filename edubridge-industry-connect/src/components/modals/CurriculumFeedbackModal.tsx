import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Send,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Layers,
} from 'lucide-react';
import { AcademiaPartner } from '../../types';

interface CurriculumFeedbackModalProps {
  partner: AcademiaPartner | null;
  onClose: () => void;
  onSubmitFeedback: (partnerId: string, feedback: string, suggestedElectives: string) => void;
}

export const CurriculumFeedbackModal: React.FC<CurriculumFeedbackModalProps> = ({
  partner,
  onClose,
  onSubmitFeedback,
}) => {
  const [feedback, setFeedback] = useState(
    'Students demonstrate solid theoretical understanding of distributed operating systems, but need more hands-on container orchestration labs (Kubernetes/Docker) and CI/CD automated deployment practicals to be production-ready.'
  );
  const [suggestedElectives, setSuggestedElectives] = useState(
    'Cloud-Native Microservices Architecture & Telemetry (Recommended for 6th/7th Semester B.Tech CS/IT)'
  );
  const [offerLabSupport, setOfferLabSupport] = useState(true);
  const [isSent, setIsSent] = useState(false);

  if (!partner) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback(partner.id, feedback, suggestedElectives);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Industry Curriculum Alignment (NEP 2020)
              </h2>
              <p className="text-[11px] text-slate-500">
                Submit skill-gap feedback to {partner.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 text-xs space-y-4">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-purple-950">
            <span className="font-bold block mb-0.5">
              Direct Dean & Board of Studies Advisory Channel
            </span>
            Under Smart India Hackathon PS-26044, corporate feedback is shared directly with{' '}
            <span className="font-bold">{partner.placementLiaison.name}</span> ({partner.placementLiaison.designation}) to adjust syllabus credits and sponsor joint industry labs.
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Target Academic Discipline / Department
            </label>
            <input
              type="text"
              defaultValue="Computer Engineering & Information Technology (Undergraduate)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Observed Skill Gaps in Student Diagnostic Tests
            </label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Recommended New Course / Elective / Lab Module
            </label>
            <input
              type="text"
              value={suggestedElectives}
              onChange={(e) => setSuggestedElectives(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="labSupport"
              checked={offerLabSupport}
              onChange={(e) => setOfferLabSupport(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="labSupport" className="text-slate-700 font-medium">
              TCS offers free Cloud Sandbox API credits & guest speaker sessions for this module
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSent}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              {isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Feedback Transmitted!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send to University Dean</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
