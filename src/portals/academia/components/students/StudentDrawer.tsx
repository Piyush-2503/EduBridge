import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle,
  UserCheck,
  FileCheck,
  TrendingUp,
} from 'lucide-react';
import { Student } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface StudentDrawerProps {
  student: Student | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const StudentDrawer: React.FC<StudentDrawerProps> = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'internship' | 'placement' | 'certifications'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!student) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-gradient-to-r from-[#111844] to-[#27347A] text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl font-bold tracking-tight truncate">{student.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> AIIA Verified Profile
                </span>
              </div>
              <p className="text-slate-300 text-xs truncate mb-2">
                {student.rollNo} • {student.program}
              </p>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md text-white font-medium">
                  CGPA: {student.cgpa}
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md text-white font-medium">
                  {student.year}
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md text-white font-medium">
                  Att: {student.attendance}%
                </span>
                <span className="bg-emerald-400/20 text-emerald-300 px-2.5 py-0.5 rounded-md font-semibold">
                  Readiness: {student.skillReadiness}%
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={() => showToast(`Skill Transcript exported for ${student.name} (${student.rollNo})`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-300" />
              Download Skill Transcript
            </button>
            <button
              onClick={() => showToast(`Automated skill bridge plan generated for ${student.name}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4B5694] hover:bg-[#5F6FB2] text-white font-medium transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Assign Skill Bridge Course
            </button>
          </div>
        </div>

        {/* Toast Popup */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between shadow-sm">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/70 shrink-0 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview & Academics' },
            { id: 'skills', label: 'Skill Matrix & Benchmarks' },
            { id: 'internship', label: 'Internship Track' },
            { id: 'placement', label: 'Placement Pipeline' },
            { id: 'certifications', label: 'Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#111844] text-[#111844] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-xs">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Academic Details Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#111844] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4B5694]" /> Academic Record
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Department</span>
                    <span className="font-semibold text-slate-800">{student.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Program</span>
                    <span className="font-semibold text-slate-800">{student.program}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Academic Cohort</span>
                    <span className="font-semibold text-slate-800">{student.year} (2023-2027)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Cumulative CGPA</span>
                    <span className="font-bold text-slate-900 text-sm">{student.cgpa} / 10.0</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Institutional Attendance</span>
                    <span className="font-semibold text-slate-800">{student.attendance}% (On Track)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Profile Verification</span>
                    <StatusBadge status={student.profileStatus} />
                  </div>
                </div>
              </div>

              {/* Employability Readiness Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#111844] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Employability Readiness Index
                  </h3>
                  <span className="text-sm font-extrabold text-[#111844]">{student.skillReadiness}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#4B5694] to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${student.skillReadiness}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Student fulfills {Math.round((student.skillReadiness / 100) * 8)} of 8 mandatory institutional skill competencies required for Tier-1 industry placement drives.
                </p>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-[#F8F9FD]">
                  <span className="text-slate-400 text-[11px] block mb-1">Internship Status</span>
                  <StatusBadge status={student.internshipStatus} size="md" />
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-[#F8F9FD]">
                  <span className="text-slate-400 text-[11px] block mb-1">Placement Status</span>
                  <StatusBadge status={student.placementStatus} size="md" />
                </div>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#111844]">Competency Mapping & Verification</h3>
                  <p className="text-[11px] text-slate-400">Benchmarked against Ministry of Ayush & Industry Job Profiles</p>
                </div>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                  {student.skills.length} Competencies Assessed
                </span>
              </div>

              <div className="space-y-3">
                {student.skills.map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-xs">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {skill.category}
                        </span>
                      </div>
                      {skill.verified ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Faculty Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                          Self-Assessed
                        </span>
                      )}
                    </div>

                    {/* Progress Comparison */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                        <span>Proficiency: {skill.proficiency}%</span>
                        <span>Industry Required: {skill.required}%</span>
                      </div>
                      <div className="relative w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        {/* Required marker line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                          style={{ left: `${skill.required}%` }}
                          title={`Required: ${skill.required}%`}
                        />
                        <div
                          className={`h-full rounded-full ${
                            skill.proficiency >= skill.required ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERNSHIP TAB */}
          {activeTab === 'internship' && (
            <div className="space-y-4">
              {student.activeInternship ? (
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#111844]">{student.activeInternship.company}</h4>
                      <p className="text-xs text-slate-500">{student.activeInternship.role}</p>
                    </div>
                    <StatusBadge status={student.activeInternship.status} size="md" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Designated Industry Mentor</span>
                      <span className="font-semibold text-slate-800">{student.activeInternship.mentor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Monthly Stipend</span>
                      <span className="font-bold text-emerald-700">{student.activeInternship.stipend}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Internship Duration</span>
                      <span className="font-semibold text-slate-800">
                        {student.activeInternship.startDate} to {student.activeInternship.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Company Attendance Rate</span>
                      <span className="font-semibold text-slate-800">{student.activeInternship.attendance}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Bi-weekly Progress Log: Submitted & Verified</span>
                    <button
                      onClick={() => showToast('Internship log & mentor evaluation dossier opened.')}
                      className="text-xs font-semibold text-[#4B5694] hover:underline"
                    >
                      View Mentor Evaluation Log →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <Briefcase className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <h4 className="text-sm font-semibold text-slate-700">No Active Internship Recorded</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    This student is currently in the internship preparation phase. Skill readiness is {student.skillReadiness}%.
                  </p>
                  <button
                    onClick={() => showToast('Candidate recommended to Apollo Hospitals & Dabur.')}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#111844] text-white text-xs font-medium hover:bg-[#27347A]"
                  >
                    Nominate for Industry Internship Drive
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PLACEMENT TAB */}
          {activeTab === 'placement' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8F9FD] rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px] block">Placement Pipeline Status</span>
                  <div className="text-sm font-bold text-[#111844] mt-0.5">{student.placementStatus}</div>
                </div>
                <StatusBadge status={student.placementStatus} size="md" />
              </div>

              {student.placementDetails && (
                <div className="p-5 bg-white rounded-xl border border-emerald-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <Award className="w-4 h-4" /> Official Placement Offer Secured
                  </div>
                  <div className="text-base font-extrabold text-[#111844]">
                    {student.placementDetails.company}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Role: {student.placementDetails.role}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">Package Offered:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      ₹{student.placementDetails.packageLpa} LPA CTC
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Offer Letter Verified on {student.placementDetails.offerDate}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#111844]">Verified Certifications & Accreditations</div>
              {student.certifications.length === 0 ? (
                <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-xl">
                  No external certifications uploaded yet.
                </div>
              ) : (
                student.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-xs">{cert.title}</div>
                        <div className="text-[11px] text-slate-500">{cert.issuer} • Issued {cert.date}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold shrink-0">
                      Digitally Verified
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 text-xs shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
          >
            Close Details
          </button>
          <button
            onClick={() => {
              showToast(`Administrative verification flag recorded for ${student.name}`);
            }}
            className="px-4 py-2 bg-[#111844] text-white rounded-lg font-medium hover:bg-[#27347A] transition-colors"
          >
            Update Institutional Status
          </button>
        </div>
      </div>
    </div>
  );
};
