import React, { useState } from 'react';
import {
  FolderGit2,
  Download,
  Building2,
  Users,
  Calendar,
  CheckCircle,
  Tag,
  Clock,
} from 'lucide-react';

interface IndustryProjectsViewProps {
  onOpenExport: (title?: string) => void;
}

export const IndustryProjectsView: React.FC<IndustryProjectsViewProps> = ({ onOpenExport }) => {
  const projects = [
    {
      id: 'proj-1',
      title: 'AI Diagnostic Screening for Ayurvedic Nadi Pariksha Biomarkers',
      company: 'TCS Research & Innovation Labs',
      department: 'Computer Science & Ayurveda Medicine',
      studentsCount: 6,
      mentor: 'Dr. Vivek Narayan (TCS Principal Scientist)',
      stipend: '₹25,000 / month',
      deadline: 'Dec 2026',
      status: 'Active',
      tags: ['Computer Vision', 'Biomedical Signal Processing', 'Ayur-Informatics'],
    },
    {
      id: 'proj-2',
      title: 'Phytochemical Fingerprinting for Adulteration Detection in Ashwagandha',
      company: 'Dabur India Ltd.',
      department: 'Herbal Drug Quality Control',
      studentsCount: 4,
      mentor: 'Dr. Neeraj Sharma (Chief QC Scientist)',
      stipend: '₹20,000 / month',
      deadline: 'Nov 2026',
      status: 'Active',
      tags: ['HPTLC', 'Mass Spectrometry', 'Pharmacognosy'],
    },
    {
      id: 'proj-3',
      title: 'Decentralized EHR Integration with National Ayush Grid (ABDM Compliant)',
      company: 'Apollo HealthX',
      department: 'Information Technology',
      studentsCount: 5,
      mentor: 'Sandeep Khurana (VP Healthcare Tech)',
      stipend: '₹22,000 / month',
      deadline: 'Jan 2027',
      status: 'In Review',
      tags: ['HL7 / FHIR', 'HIPAA', 'Ayush Grid'],
    },
    {
      id: 'proj-4',
      title: 'Automated Extraction Optimization for Standardized Herbal Formulations',
      company: 'The Himalaya Drug Company',
      department: 'Biotechnology & Pharmacology',
      studentsCount: 4,
      mentor: 'Dr. Anita Joshi (Director R&D)',
      stipend: '₹18,000 / month',
      deadline: 'Oct 2026',
      status: 'Active',
      tags: ['Bioprocess', 'Standardization', 'Yield Optimization'],
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Industry Live Projects & Problem Statements
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sponsored capstone projects, corporate problem statements, and multidisciplinary student teams.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Live Industry Projects & Problem Statement Register')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export Projects Register
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-[#4B5694] border border-indigo-200/60 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {p.company}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {p.status}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-[#111844] leading-snug">{p.title}</h3>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Student Team Size:</span>
                  <span className="font-bold text-slate-800">{p.studentsCount} scholars</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Corporate Mentor:</span>
                  <span className="font-semibold text-slate-700">{p.mentor}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Funding / Stipend:</span>
                  <span className="font-bold text-emerald-700">{p.stipend}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Target Delivery: {p.deadline}</span>
              <button
                onClick={() => onOpenExport(`${p.title} - Project Charter`)}
                className="font-bold text-[#111844] hover:underline"
              >
                Project Charter →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
