import React, { useState } from 'react';
import {
  FlaskConical,
  Download,
  Building2,
  Calendar,
  CheckCircle,
  Coins,
  ShieldCheck,
} from 'lucide-react';

interface ResearchConsultancyViewProps {
  onOpenExport: (title?: string) => void;
}

export const ResearchConsultancyView: React.FC<ResearchConsultancyViewProps> = ({ onOpenExport }) => {
  const consultancies = [
    {
      id: 'res-1',
      title: 'Standardization and Pre-Clinical Evaluation of Anti-Inflammatory Polyherbal Decoctions',
      corporateClient: 'AIMIL Pharmaceuticals (India) Ltd.',
      investigator: 'Dr. Anand Kumar (Prof. & HoD, Dravyaguna)',
      grantAmount: '₹34,50,000',
      duration: '18 Months',
      status: 'Active',
      deliverables: 'Patent filing & standardization dossier for DCGI submission',
    },
    {
      id: 'res-2',
      title: 'Automated Microscopic Image Processing for Quality Control of Bhasma Nanoparticles',
      corporateClient: 'Siemens Healthineers Digital Health',
      investigator: 'Dr. Neha Mittal (Assoc. Prof., Computer Science)',
      grantAmount: '₹22,000,000',
      duration: '12 Months',
      status: 'Active',
      deliverables: 'CNN Algorithm + Hardware validation prototype',
    },
    {
      id: 'res-3',
      title: 'Clinical Safety & Pharmacovigilance Monitoring for Phytopharmaceutical Formulations',
      corporateClient: 'Dabur Research Foundation',
      investigator: 'Dr. Rajeshwari Joshi (Prof., Kaumarbhritya)',
      grantAmount: '₹18,00,000',
      duration: '24 Months',
      status: 'Milestone 2 Completed',
      deliverables: 'Periodic Safety Update Reports (PSUR)',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Sponsored Research & Industrial Consultancy
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking ₹7.45 Crore in active industry-funded research grants, industrial consultancies, and patent filings.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Industrial Research Grants & Consultancy Ledger')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export R&D Ledger
        </button>
      </div>

      <div className="space-y-4">
        {consultancies.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {item.status}
                </span>
                <span className="text-xs font-bold text-[#4B5694] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {item.corporateClient}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-[#111844]">{item.title}</h3>
              <div className="text-xs text-slate-500">
                Principal Investigator: <strong className="text-slate-800">{item.investigator}</strong>
              </div>
              <p className="text-[11px] text-slate-400">Deliverable: {item.deliverables}</p>
            </div>

            <div className="shrink-0 flex md:flex-col items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Grant Value
                </span>
                <span className="text-lg font-black text-emerald-700">{item.grantAmount}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Tenure: {item.duration}
                </span>
              </div>
              <button
                onClick={() => onOpenExport(`${item.title} - Financial Utilization Statement`)}
                className="mt-3 text-xs font-bold text-[#111844] hover:underline"
              >
                UC & Audit Cert →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
