import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Download,
  Building,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '../types';

interface VerificationViewProps {
  requests: VerificationRequest[];
  onVerifyRequest: (id: string) => void;
  onRejectRequest: (id: string, reason?: string) => void;
  onBatchVerify: (ids: string[]) => void;
  onViewDocument: (req: VerificationRequest) => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  requests,
  onVerifyRequest,
  onRejectRequest,
  onBatchVerify,
  onViewDocument
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'verified' | 'flagged'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered requests
  const filteredRequests = requests.filter((req) => {
    // Status filter
    if (activeFilter === 'pending' && req.status !== 'pending') return false;
    if (activeFilter === 'verified' && req.status !== 'verified') return false;
    if (activeFilter === 'flagged' && req.status !== 'flagged' && req.status !== 'rejected') return false;

    // Department filter
    if (selectedDepartment !== 'All' && !req.department.includes(selectedDepartment)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = req.studentName.toLowerCase().includes(q);
      const matchRoll = req.rollNo.toLowerCase().includes(q);
      const matchTitle = req.credentialTitle.toLowerCase().includes(q);
      const matchBody = req.issuingBody.toLowerCase().includes(q);
      if (!matchName && !matchRoll && !matchTitle && !matchBody) return false;
    }

    return true;
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const verifiedCount = requests.filter((r) => r.status === 'verified').length;
  const flaggedCount = requests.filter((r) => r.status === 'flagged' || r.status === 'rejected').length;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const pendingIds = filteredRequests.filter((r) => r.status === 'pending').map((r) => r.id);
    if (selectedIds.length === pendingIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingIds);
    }
  };

  const handleExecuteBatchVerify = () => {
    if (selectedIds.length === 0) return;
    onBatchVerify(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* SLA Metric & Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Student Credential Verification Ledger
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              NAD Compliant
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Institutional sign-off on academic marks, industry badges, and internship NOCs for campus placements.
          </p>
        </div>

        {/* SLA Speedometer */}
        <div className="flex items-center gap-3 bg-[#F8F9FC] px-4 py-2.5 rounded-xl border border-[#4B5694]/12">
          <div className="text-right">
            <div className="text-xs font-extrabold text-[#111844]">1.8 Days</div>
            <div className="text-[10px] text-[#7288AE]">Avg. Turnaround SLA</div>
          </div>
          <div className="w-px h-7 bg-[#4B5694]/15" />
          <div className="text-left">
            <div className="text-xs font-extrabold text-amber-600">18 Urgent</div>
            <div className="text-[10px] text-[#7288AE]">Pre-Drive Deadlines</div>
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="inline-flex p-1 bg-white rounded-xl border border-[#4B5694]/14 shadow-2xs">
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'pending'
                ? 'bg-[#4B5694] text-white shadow-xs'
                : 'text-[#7288AE] hover:text-[#111844]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-[#111844] font-extrabold">
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'verified'
                ? 'bg-[#4B5694] text-white shadow-xs'
                : 'text-[#7288AE] hover:text-[#111844]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-extrabold">
              {verifiedCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('flagged')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'flagged'
                ? 'bg-[#4B5694] text-white shadow-xs'
                : 'text-[#7288AE] hover:text-[#111844]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flagged</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 font-extrabold">
              {flaggedCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#4B5694] text-white shadow-xs'
                : 'text-[#7288AE] hover:text-[#111844]'
            }`}
          >
            All ({requests.length})
          </button>
        </div>

        {/* Department Filter & Search */}
        <div className="flex items-center gap-2">
          {/* Department dropdown */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white text-[#111844] text-xs font-semibold border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694]"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Artificial Intelligence">AI & Data Science</option>
            <option value="Electronics">Electronics (ECE)</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Information Technology">Information Tech</option>
          </select>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or cert..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white text-xs border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694] w-48 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Batch Action Bar (Visible when items are selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#111844] text-white p-3.5 rounded-xl flex items-center justify-between shadow-md animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{selectedIds.length} candidate credentials selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1 text-xs text-[#7288AE] hover:text-white transition-colors cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={handleExecuteBatchVerify}
              className="px-4 py-1.5 rounded-lg bg-[#4B5694] hover:bg-emerald-600 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Verify Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Verification Data Table */}
      <div className="bg-white rounded-2xl border border-[#4B5694]/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#4B5694]/12 text-[11px] font-bold text-[#7288AE] uppercase tracking-wider bg-[#F8F9FC]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length ===
                        filteredRequests.filter((r) => r.status === 'pending').length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-[#4B5694]/30 text-[#4B5694] focus:ring-[#4B5694] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">Student & Roll No</th>
                <th className="py-3 px-3">Credential Title & Body</th>
                <th className="py-3 px-3">Type & Skills</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3">Document</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B5694]/8">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#7288AE] text-xs">
                    No verification requests found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className={`hover:bg-[#4B5694]/4 transition-colors ${
                      selectedIds.includes(req.id) ? 'bg-[#4B5694]/8' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      {req.status === 'pending' ? (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(req.id)}
                          onChange={() => handleToggleSelect(req.id)}
                          className="rounded border-[#4B5694]/30 text-[#4B5694] focus:ring-[#4B5694] cursor-pointer"
                        />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.avatar}
                          alt={req.studentName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4B5694]/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#111844] truncate">{req.studentName}</div>
                          <div className="text-[11px] text-[#7288AE] truncate">
                            {req.rollNo} • {req.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 max-w-xs">
                      <div className="font-semibold text-[#111844] truncate">{req.credentialTitle}</div>
                      <div className="text-[11px] text-[#4B5694] font-medium truncate">{req.issuingBody}</div>
                      {req.flagReason && (
                        <div className="text-[10px] text-rose-600 font-medium mt-1 truncate">
                          Note: {req.flagReason}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EAE0CF]/40 text-[#111844] border border-[#EAE0CF] block w-max">
                        {req.credentialType}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1 max-w-[180px]">
                        {req.skillsClaimed.slice(0, 2).map((sk) => (
                          <span
                            key={sk}
                            className="text-[9px] px-1.5 py-0.2 rounded bg-white text-[#4B5694] border border-[#4B5694]/15 font-semibold"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[#7288AE] font-medium whitespace-nowrap">
                      <div>{req.submissionDate}</div>
                      {req.isUrgent && (
                        <span className="text-[10px] font-bold text-amber-600">Urgent</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <button
                        onClick={() => onViewDocument(req)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F9FC] hover:bg-[#4B5694]/10 text-[#4B5694] border border-[#4B5694]/15 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Preview Doc</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {req.status === 'verified' ? (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : req.status === 'flagged' || req.status === 'rejected' ? (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                          Flagged
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {req.status === 'pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onRejectRequest(req.id, 'Document hash mismatch or invalid seal.')}
                            className="p-1.5 rounded-lg text-[#7288AE] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Flag / Request Resubmission"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onVerifyRequest(req.id)}
                            className="px-3 py-1 rounded-lg bg-[#4B5694] hover:bg-[#111844] text-white font-extrabold text-[11px] shadow-2xs transition-all cursor-pointer"
                          >
                            Verify
                          </button>
                        </div>
                      ) : req.status === 'verified' ? (
                        <span className="text-[10px] text-[#7288AE] font-medium">
                          Signed by {req.verifiedBy ? req.verifiedBy.split(' ')[0] : 'Dean'}
                        </span>
                      ) : (
                        <button
                          onClick={() => onVerifyRequest(req.id)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#4B5694]/20 hover:border-[#4B5694] text-[#4B5694] font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Re-verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
