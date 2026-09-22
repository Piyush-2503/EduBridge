import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Building,
  Layers,
  ArrowDownToLine,
} from 'lucide-react';

interface ReportsViewProps {
  onOpenExport: (title?: string) => void;
}

interface ReportDefinition {
  id: string;
  title: string;
  category: string;
  complianceTag: string;
  description: string;
  lastGenerated: string;
  size: string;
  formats: ('PDF' | 'CSV' | 'XLSX')[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onOpenExport }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const reports: ReportDefinition[] = [
    {
      id: 'rep-1',
      title: 'Annual Institutional Placement & Employability Audit 2026',
      category: 'Placement Intelligence',
      complianceTag: 'NAAC Criterion 5.2 • NIRF',
      description:
        'Comprehensive audit of graduate placement outcomes, employer distribution, salary percentiles, and department-wise recruitment conversions.',
      lastGenerated: '18 Sept 2026',
      size: '3.4 MB',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'rep-2',
      title: 'Student Internship & Industry Mentor Verification Register',
      category: 'Experiential Learning',
      complianceTag: 'AICTE Internship Mandate',
      description:
        'Verification ledger containing all 142 active internships, student time logs, mentor sign-offs, and stipend records.',
      lastGenerated: '19 Sept 2026',
      size: '2.8 MB',
      formats: ['PDF', 'CSV'],
    },
    {
      id: 'rep-3',
      title: 'Institutional Skill Gap & Curriculum Intervention Dossier',
      category: 'Academic Intelligence',
      complianceTag: 'Outcome-Based Education (OBE)',
      description:
        'Empirical delta comparison between industry hiring demands and student capabilities across Python, Clinical Trials, Cloud, and Pharmacopoeia.',
      lastGenerated: '16 Sept 2026',
      size: '4.1 MB',
      formats: ['PDF', 'CSV'],
    },
    {
      id: 'rep-4',
      title: 'Industry Partner MoUs & Corporate Collaboration Audit',
      category: 'Industry Relations',
      complianceTag: 'NAAC Criterion 3.5 • Ayush Apex',
      description:
        'Formal status of 86 active corporate MoUs, joint research facilities, corporate focal persons, and renewal timelines.',
      lastGenerated: '14 Sept 2026',
      size: '1.9 MB',
      formats: ['PDF', 'XLSX'],
    },
    {
      id: 'rep-5',
      title: 'Department Academic & Placement Performance Matrix',
      category: 'Institutional Benchmarking',
      complianceTag: 'Annual Quality Assurance (AQAR)',
      description:
        'Comparative metrics covering CS, Ayurveda Medicine, Biotech, Pharmacology, and IT cohorts.',
      lastGenerated: '18 Sept 2026',
      size: '2.2 MB',
      formats: ['PDF', 'CSV', 'XLSX'],
    },
    {
      id: 'rep-6',
      title: 'Faculty Industrial Immersion & FDP Participation Register',
      category: 'Faculty Development',
      complianceTag: 'UGC / AICTE CAS Guidelines',
      description:
        'Record of faculty corporate sabbaticals, industrial mentorships, funded consultancies, and certified workshops.',
      lastGenerated: '12 Sept 2026',
      size: '1.5 MB',
      formats: ['PDF', 'CSV'],
    },
  ];

  const handleQuickDownload = (report: ReportDefinition, format: string) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      onOpenExport(`${report.title} (${format})`);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Accreditation & Institutional Compliance Reports
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated, tamper-evident regulatory documentation for NAAC A++, NIRF 2026, AICTE, and Ministry of Ayush audits.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Comprehensive Institutional Accreditation Compilation Dossier')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Generate Full Accreditation Bundle
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {rep.complianceTag}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Size: {rep.size}</span>
              </div>

              <h3 className="font-extrabold text-sm text-[#111844] leading-snug">{rep.title}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{rep.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[11px] text-slate-400">
                Last generated: <span className="text-slate-700 font-medium">{rep.lastGenerated}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {rep.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleQuickDownload(rep, fmt)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[#111844] hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-1"
                  >
                    <ArrowDownToLine className="w-3 h-3 text-[#4B5694]" /> {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
