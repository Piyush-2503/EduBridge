import React, { useState } from 'react';
import {
  BookMarked,
  Download,
  Calendar,
  Building2,
  Users,
  CheckCircle,
  Award,
} from 'lucide-react';

interface FDPsViewProps {
  onOpenExport: (title?: string) => void;
}

export const FDPsView: React.FC<FDPsViewProps> = ({ onOpenExport }) => {
  const fdps = [
    {
      id: 'fdp-1',
      title: 'AICTE-Approved FDP on Generative AI & Natural Language Processing in Healthcare',
      sponsor: 'TCS Research & IIT Delhi',
      dates: '12 Oct – 18 Oct 2026',
      mode: 'Hybrid (On-Campus + Hands-on Colab)',
      nominatedFaculty: 24,
      status: 'Nominations Open',
    },
    {
      id: 'fdp-2',
      title: 'Advanced Phytochemical Profiling, LC-MS/MS & Good Laboratory Practices',
      sponsor: 'Dabur Research & Ministry of Ayush',
      dates: '24 Oct – 29 Oct 2026',
      mode: 'In-Person at AIIA Central Instrumentation Facility',
      nominatedFaculty: 18,
      status: 'Confirmed',
    },
    {
      id: 'fdp-3',
      title: 'Good Clinical Practice (ICH-GCP) & Ethical Regulatory Compliance in Ayush Trials',
      sponsor: 'Biocon Clinical Academy',
      dates: '05 Nov – 10 Nov 2026',
      mode: 'Virtual Intensive',
      nominatedFaculty: 32,
      status: 'Registration Ongoing',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Faculty Development Programs (FDPs) & Pedagogical Training
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified continuous professional education programs, industry technology immersions, and academic pedagogy updates.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Faculty Development Program (FDP) Participation Register')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export FDP Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {fdps.map((f) => (
          <div
            key={f.id}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {f.status}
              </span>
              <h3 className="font-extrabold text-sm text-[#111844] mt-2 leading-snug">{f.title}</h3>
              <div className="text-xs text-[#4B5694] font-semibold mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> {f.sponsor}
              </div>

              <div className="mt-4 p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Dates:</span>
                  <span className="font-bold text-slate-800">{f.dates}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Nominated Faculty:</span>
                  <span className="font-semibold text-emerald-700">{f.nominatedFaculty} members</span>
                </div>
                <div className="text-slate-500 pt-1 text-[11px]">{f.mode}</div>
              </div>
            </div>

            <button
              onClick={() => onOpenExport(`${f.title} - Nomination List`)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#111844] rounded-xl font-bold text-xs transition-colors"
            >
              View Nominated Faculty →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
