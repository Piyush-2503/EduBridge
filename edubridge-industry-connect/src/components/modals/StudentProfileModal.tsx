import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Award,
  FileCheck,
  Cpu,
  UserPlus,
  Send,
  Star,
  Check,
} from 'lucide-react';
import { StudentTalent, Opportunity } from '../../types';

interface StudentProfileModalProps {
  talent: StudentTalent | null;
  onClose: () => void;
  onShortlist: (talentId: string) => void;
  isShortlisted: boolean;
  opportunities: Opportunity[];
  onAssignToOpportunity: (talentId: string, opportunityId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  talent,
  onClose,
  onShortlist,
  isShortlisted,
  opportunities,
  onAssignToOpportunity,
}) => {
  const [selectedOppId, setSelectedOppId] = React.useState<string>(
    opportunities[0]?.id || ''
  );
  const [assignedSuccess, setAssignedSuccess] = React.useState(false);

  if (!talent) return null;

  const handleAssign = () => {
    if (!selectedOppId) return;
    onAssignToOpportunity(talent.id, selectedOppId);
    setAssignedSuccess(true);
    setTimeout(() => setAssignedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Candidate Competency Dossier
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              EduBridge Verified
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Bio Bar */}
          <div className="flex flex-col sm:flex-row items-start gap-4 pb-6 border-b border-slate-100">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-slate-900">{talent.name}</h2>
                    <span title="Identity & Skills Proctored">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                    {talent.primaryRole}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-semibold block">Skill Match</span>
                    <span className="text-lg font-black text-emerald-600">
                      {talent.skillMatchScore}%
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-700 text-xs">
                    {talent.cgpa} <span className="text-[9px] text-slate-400">GPA</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                "{talent.headline}"
              </p>

              {/* College & Details Pills */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  {talent.college}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {talent.location}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Class of {talent.graduationYear}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                  {talent.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Key Differentiator Notice */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block mb-0.5">
                Competency & Evidence Guarantee (SIH PS-26044)
              </span>
              All skills listed below have been verified via proctored automated coding environments, GitHub unit test coverage benchmarks, and institutional project reviews. No unverified resume claims.
            </div>
          </div>

          {/* Section 1: Verified Skills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-600" />
                Verified Technical Skills
              </h3>
              <span className="text-[11px] text-slate-500">Proctored Score & Issuer</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {talent.skills.map((skill, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {skill.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-200/70 text-slate-700">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      Verified by: {skill.verifiedBy} ({skill.verifiedDate})
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-indigo-600">
                      {skill.score}%
                    </span>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Verified Projects & Evidence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              Verified Projects & Concrete Evidence
            </h3>

            <div className="space-y-3">
              {talent.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <span className="text-[11px] text-indigo-600 font-medium">
                        Role: {proj.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Evidence: {proj.verifiedEvidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Proctored Diagnostic Benchmarks */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
              <Award className="w-4 h-4 text-indigo-600" />
              Proctored Standardized Assessments
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {talent.assessments.map((ass, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {ass.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Date: {ass.date} • Web-Proctored
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">
                      {ass.score}/100
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {ass.percentile}th %ile
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quick Invite to Opportunity */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedOppId}
              onChange={(e) => setSelectedOppId(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              {opportunities.map((opp) => (
                <option key={opp.id} value={opp.id}>
                  Pipeline: {opp.title.slice(0, 32)}...
                </option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              {assignedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added to Pipeline!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Invite to Opportunity</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onShortlist(talent.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                isShortlisted
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              {isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
            </button>
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
