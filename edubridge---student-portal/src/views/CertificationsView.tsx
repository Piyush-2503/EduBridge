import React, { useState } from 'react';
import {
  Award,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Hash,
  Download
} from 'lucide-react';
import { InstitutionalCertification } from '../types';

interface CertificationsViewProps {
  certifications: InstitutionalCertification[];
  onOpenAddCertification: () => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({
  certifications,
  onOpenAddCertification
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Cloud & AI',
    'Full Stack & Software',
    'Core Engineering',
    'Ayush & HealthTech'
  ];

  const filteredCerts = certifications.filter((c) => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchStudent = c.studentName.toLowerCase().includes(q);
      const matchRoll = c.rollNo.toLowerCase().includes(q);
      const matchId = c.credentialId.toLowerCase().includes(q);
      const matchBody = c.issuingBody.toLowerCase().includes(q);
      if (!matchTitle && !matchStudent && !matchRoll && !matchId && !matchBody) return false;
    }
    return true;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner & Action Button */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Institutional Certifications & Blockchain Ledger
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Cryptographically Verified
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Verifiable digital repository of approved industry credentials, global certifications, and institutional honors.
          </p>
        </div>

        <button
          id="certifications-add-btn"
          onClick={onOpenAddCertification}
          className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#EAE0CF]" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#4B5694] text-white shadow-2xs'
                  : 'bg-white text-[#7288AE] hover:text-[#111844] border border-[#4B5694]/12'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificate or student..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-white text-xs border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694] text-[#111844] w-56 sm:w-64"
          />
        </div>
      </div>

      {/* Certifications Ledger Table */}
      <div className="bg-white rounded-2xl border border-[#4B5694]/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#4B5694]/12 text-[11px] font-bold text-[#7288AE] uppercase tracking-wider bg-[#F8F9FC]">
                <th className="py-3 px-4">Credential ID & Title</th>
                <th className="py-3 px-3">Student & Department</th>
                <th className="py-3 px-3">Issuing Body</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Issue Date</th>
                <th className="py-3 px-3">Ledger Hash</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B5694]/8">
              {filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-[#4B5694]/4 transition-colors group">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-[#111844] group-hover:text-[#4B5694] transition-colors truncate">
                      {cert.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#7288AE] flex items-center gap-1 mt-0.5">
                      <Hash className="w-3 h-3 text-[#4B5694]" />
                      <span>{cert.credentialId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-[#111844] truncate">{cert.studentName}</div>
                    <div className="text-[11px] text-[#7288AE] truncate">{cert.rollNo} • {cert.department}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-[#111844] truncate">{cert.issuingBody}</div>
                    <div className="text-[11px] text-[#4B5694] font-semibold">{cert.scoreOrGrade}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
                      {cert.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#7288AE] font-medium whitespace-nowrap">
                    {cert.issueDate}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-[#4B5694]">
                    <span className="bg-[#4B5694]/8 px-2 py-0.5 rounded border border-[#4B5694]/14">
                      {cert.verificationHash}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {cert.status === 'Approved' ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Approved
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Pending Hash
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
