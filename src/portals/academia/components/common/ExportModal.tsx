import React, { useState } from 'react';
import { X, FileDown, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { DEPARTMENTS_DATA } from '../../data/mockData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  reportTitle = 'Institutional Employability & Skill Gap Audit Report',
}) => {
  const [format, setFormat] = useState<'PDF' | 'CSV' | 'XLSX'>('PDF');
  const [department, setDepartment] = useState('All Departments');
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
        onClose();
      }, 1600);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-300" />
            <span className="font-bold text-sm">Export Institutional Report</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Document Title
            </label>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-semibold text-[#111844]">
              {reportTitle}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Department Cohort Scope
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
            >
              <option>All Departments (Institution-Wide)</option>
              {DEPARTMENTS_DATA.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['PDF', 'CSV', 'XLSX'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`py-2 rounded-lg border font-bold text-center transition-all ${
                    format === fmt
                      ? 'border-[#111844] bg-[#111844] text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FD] rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between">
              <span>Institution:</span>
              <span className="font-semibold text-slate-700">All India Institute of Ayurveda</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="font-semibold text-slate-700">{new Date().toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Watermark:</span>
              <span className="text-emerald-700 font-semibold">Digitally Signed by Dean Office</span>
            </div>
          </div>

          {downloaded ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center justify-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Document generated & downloaded successfully!
            </div>
          ) : (
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExport}
              className="w-full py-2.5 bg-[#111844] hover:bg-[#27347A] disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating {format} Export...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" /> Download Institutional {format}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
