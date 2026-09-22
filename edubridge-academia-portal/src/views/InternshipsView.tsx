import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  UserCheck,
  Building,
  Check,
  X,
} from 'lucide-react';
import { InternshipRecord, Student } from '../types';
import { INTERNSHIPS_DATA, STUDENTS_DIRECTORY_DATA, DEPARTMENTS_DATA } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface InternshipsViewProps {
  onSelectStudent: (student: Student) => void;
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const InternshipsView: React.FC<InternshipsViewProps> = ({
  onSelectStudent,
  onOpenExport,
  selectedDepartment,
}) => {
  const [internships, setInternships] = useState<InternshipRecord[]>(INTERNSHIPS_DATA);
  const [statusTab, setStatusTab] = useState<'All' | 'Active' | 'Pending' | 'Needs Attention' | 'Completed'>('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id: string, studentName: string) => {
    setInternships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Active' } : item))
    );
    showToast(`Internship for ${studentName} officially approved and recorded in AYUSH registry.`);
  };

  const handleFlagAttention = (id: string, studentName: string) => {
    setInternships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Needs Attention' } : item))
    );
    showToast(`Notice issued to ${studentName} & company mentor for attendance log reconciliation.`);
  };

  const filteredInternships = internships.filter((item) => {
    if (statusTab !== 'All' && item.status !== statusTab) return false;
    if (
      selectedDepartment !== 'All Departments' &&
      item.department !== selectedDepartment
    )
      return false;

    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#111844] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Internship Monitoring & Mentor Sign-off
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking 142 active industry internships, attendance logs, stipends, and institutional clearances.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Active Internship Monitoring & Mentor Evaluation Register')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <Download className="w-4 h-4 text-[#111844]" />
          Export Register (CSV)
        </button>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          {(['All', 'Active', 'Pending', 'Needs Attention', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                statusTab === tab
                  ? 'bg-[#111844] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'Pending' ? 'Pending Approval (18)' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or company..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#111844]"
          />
        </div>
      </div>

      {/* Internships Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 font-bold">Student</th>
                <th className="py-3.5 font-bold">Department</th>
                <th className="py-3.5 font-bold">Company & Role</th>
                <th className="py-3.5 font-bold">Start Date</th>
                <th className="py-3.5 font-bold">Mentor</th>
                <th className="py-3.5 font-bold">Stipend</th>
                <th className="py-3.5 font-bold">Status</th>
                <th className="py-3.5 pr-6 font-bold text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInternships.map((int) => {
                const studentObj = STUDENTS_DIRECTORY_DATA.find((s) => s.id === int.studentId);

                return (
                  <tr
                    key={int.id}
                    onClick={() => studentObj && onSelectStudent(studentObj)}
                    className="hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 pl-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={int.avatar}
                          alt={int.studentName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-[#111844]">
                            {int.studentName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{int.rollNo}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="font-medium text-slate-700 line-clamp-1">{int.department}</span>
                    </td>

                    <td className="py-3.5">
                      <div className="font-bold text-slate-900">{int.company}</div>
                      <div className="text-[11px] text-slate-500">{int.role}</div>
                    </td>

                    <td className="py-3.5 font-medium text-slate-600">{int.startDate}</td>

                    <td className="py-3.5 font-medium text-slate-800">{int.mentor}</td>

                    <td className="py-3.5 font-bold text-emerald-700">{int.stipend}</td>

                    <td className="py-3.5">
                      <StatusBadge status={int.status} />
                    </td>

                    <td className="py-3.5 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                      {int.status === 'Pending' ? (
                        <button
                          onClick={() => handleApprove(int.id, int.studentName)}
                          className="px-3 py-1.5 bg-[#111844] hover:bg-[#27347A] text-white rounded-lg text-[11px] font-bold transition-colors shadow-2xs"
                        >
                          Approve Sign-off
                        </button>
                      ) : int.status === 'Needs Attention' ? (
                        <button
                          onClick={() => handleFlagAttention(int.id, int.studentName)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold transition-colors shadow-2xs"
                        >
                          Resolve Log Flag
                        </button>
                      ) : (
                        <button
                          onClick={() => studentObj && onSelectStudent(studentObj)}
                          className="text-xs font-semibold text-[#4B5694] hover:underline"
                        >
                          Review Dossier →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
