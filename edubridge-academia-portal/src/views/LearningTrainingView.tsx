import React, { useState } from 'react';
import {
  GraduationCap,
  Download,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react';

interface LearningTrainingViewProps {
  onOpenExport: (title?: string) => void;
}

export const LearningTrainingView: React.FC<LearningTrainingViewProps> = ({ onOpenExport }) => {
  const trainingTracks = [
    {
      id: 'trk-1',
      title: 'Clinical Data Analytics with Python & Bio-Statistics',
      partner: 'Apollo Health & TCS Life Sciences',
      departments: ['Computer Science', 'Ayurveda Medicine', 'Biotechnology'],
      enrolledStudents: 420,
      completionRate: 88,
      duration: '8 Weeks (Self-Paced + Live Lab)',
      status: 'Ongoing',
      certification: 'EduBridge & Partner Verified Credential',
    },
    {
      id: 'trk-2',
      title: 'Phytochemical Standardization & HPLC Quality Control',
      partner: 'Dabur Research Foundation',
      departments: ['Herbal Drug Quality Control', 'Pharmacology'],
      enrolledStudents: 260,
      completionRate: 92,
      duration: '6 Weeks (Hands-on R&D Lab)',
      status: 'Ongoing',
      certification: 'GLP Certified Laboratory Badge',
    },
    {
      id: 'trk-3',
      title: 'Cloud Security & Health Informatics (FHIR / HL7 Standards)',
      partner: 'Siemens Healthineers & Infosys Healthcare',
      departments: ['Computer Science', 'Information Technology'],
      enrolledStudents: 310,
      completionRate: 76,
      duration: '10 Weeks (Capstone Project Included)',
      status: 'Registration Open',
      certification: 'Industry Associate in Health Informatics',
    },
    {
      id: 'trk-4',
      title: 'Regulatory Affairs, ICH-GCP Guidelines & Technical Writing',
      partner: 'Biocon Biologics',
      departments: ['Pharmacology', 'Biotechnology', 'Ayurveda Medicine'],
      enrolledStudents: 380,
      completionRate: 94,
      duration: '4 Weeks (Intensive Bootcamp)',
      status: 'Completed',
      certification: 'Global Clinical Research Writing Associate',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Skill Development & Bridge Training Programs
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Industry co-designed bridge curricula, certification bootcamps, and institutional learning interventions.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Institutional Bridge Training & Course Completion Report')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export Training Metrics
        </button>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingTracks.map((trk) => (
          <div
            key={trk.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-[#4B5694] border border-indigo-200/60 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {trk.partner}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    trk.status === 'Ongoing'
                      ? 'bg-emerald-100 text-emerald-800'
                      : trk.status === 'Registration Open'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {trk.status}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-[#111844] leading-snug">{trk.title}</h3>

              <div className="mt-4 p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Enrolled Scholars:</span>
                  <span className="font-bold text-slate-800">{trk.enrolledStudents} students</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-700">{trk.duration}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Departments:</span>
                  <span className="font-medium text-slate-700">{trk.departments.join(', ')}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Cohort Completion / Progress:</span>
                  <span className="font-bold text-emerald-700">{trk.completionRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${trk.completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 truncate">
                Credential: <strong className="text-slate-700">{trk.certification}</strong>
              </span>
              <button
                onClick={() => onOpenExport(`${trk.title} - Cohort Grade Sheet`)}
                className="font-bold text-[#111844] hover:underline shrink-0"
              >
                Grade Sheet →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
