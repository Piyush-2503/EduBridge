import React from 'react';
import {
  Users,
  UserCheck,
  Clock,
  Award,
  Briefcase,
  Building2,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Plus
} from 'lucide-react';
import {
  InstitutionProfile,
  VerificationRequest,
  DepartmentStat,
  IndustryPartner,
  ActivityLogItem,
  AcademiaNavTab
} from '../types';

interface OverviewViewProps {
  institution: InstitutionProfile;
  departmentStats: DepartmentStat[];
  verificationRequests: VerificationRequest[];
  industryPartners: IndustryPartner[];
  activityLogs: ActivityLogItem[];
  onSelectTab: (tab: AcademiaNavTab) => void;
  onVerifyRequest: (id: string) => void;
  onViewDocument: (req: VerificationRequest) => void;
  onOpenAddCertification: () => void;
  onOpenNewCollaboration: () => void;
  onOpenCreateProgram: () => void;
  onOpenExportReport: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  institution,
  departmentStats,
  verificationRequests,
  industryPartners,
  activityLogs,
  onSelectTab,
  onVerifyRequest,
  onViewDocument,
  onOpenAddCertification,
  onOpenNewCollaboration,
  onOpenCreateProgram,
  onOpenExportReport
}) => {
  const pendingRequests = verificationRequests.filter((r) => r.status === 'pending');
  const urgentCount = pendingRequests.filter((r) => r.isUrgent).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Institutional Welcome & Quick Action Bar */}
      <div className="bg-gradient-to-r from-[#111844] via-[#1c255e] to-[#4B5694] rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        {/* Subtle decorative circles with brand palette */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-[#7288AE]/15 blur-2xl pointer-events-none" />
        <div className="absolute right-32 -top-12 w-40 h-40 rounded-full bg-[#EAE0CF]/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAE0CF]/20 text-[#EAE0CF] border border-[#EAE0CF]/30">
                Academic Session {institution.academicSession}
              </span>
              <span className="text-xs text-[#7288AE] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NIRF Rank #{institution.nirfRank} • NAAC A++ Accredited
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Institutional Governance & Placement Hub
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
              Monitoring 2,840 student academic portfolios, credential verifications, industry MoUs, and NAAC/NIRF accreditation metrics in real-time.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="overview-quick-verify-btn"
              onClick={() => onSelectTab('verification')}
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-white/15 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#EAE0CF]" />
              <span>Verify Queue ({pendingRequests.length})</span>
            </button>

            <button
              id="overview-add-cert-btn"
              onClick={onOpenAddCertification}
              className="px-3.5 py-2 rounded-xl bg-white/12 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#EAE0CF]" />
              <span>Add Certification</span>
            </button>

            <button
              id="overview-new-mou-btn"
              onClick={onOpenNewCollaboration}
              className="px-3.5 py-2 rounded-xl bg-white/12 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#EAE0CF]" />
              <span>New MoU</span>
            </button>

            <button
              id="overview-export-report-btn"
              onClick={onOpenExportReport}
              className="px-3.5 py-2 rounded-xl bg-[#EAE0CF] hover:bg-[#e2d5c0] text-[#111844] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#111844]" />
              <span>Audit Packet</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Statistic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Total Students */}
        <div
          onClick={() => onSelectTab('students')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-[#4B5694]/35 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Total Students</span>
            <div className="w-8 h-8 rounded-xl bg-[#111844]/8 text-[#111844] flex items-center justify-center group-hover:bg-[#111844] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111844] tracking-tight">2,840</div>
          <div className="text-[11px] text-[#7288AE] mt-1 font-medium flex items-center gap-1">
            <span className="text-emerald-600 font-bold">5 Departments</span>
            <span>• 4 Batches</span>
          </div>
        </div>

        {/* Verified Students */}
        <div
          onClick={() => onSelectTab('verification')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-[#4B5694]/35 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Verified Records</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111844] tracking-tight">2,190</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>77.1% verified</span>
          </div>
        </div>

        {/* Pending Verification */}
        <div
          onClick={() => onSelectTab('verification')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Review</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 tracking-tight">142</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{urgentCount} urgent drives</span>
          </div>
        </div>

        {/* Certifications Approved */}
        <div
          onClick={() => onSelectTab('certifications')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-[#4B5694]/35 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Certifications</span>
            <div className="w-8 h-8 rounded-xl bg-[#4B5694]/10 text-[#4B5694] flex items-center justify-center group-hover:bg-[#4B5694] group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111844] tracking-tight">1,480</div>
          <div className="text-[11px] text-[#4B5694] font-semibold mt-1">
            Blockchain hashed
          </div>
        </div>

        {/* Active Internships */}
        <div
          onClick={() => onSelectTab('internships')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-[#4B5694]/35 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Internships</span>
            <div className="w-8 h-8 rounded-xl bg-[#7288AE]/15 text-[#4B5694] flex items-center justify-center group-hover:bg-[#4B5694] group-hover:text-white transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111844] tracking-tight">640</div>
          <div className="text-[11px] text-[#7288AE] font-semibold mt-1">
            4 Active drives
          </div>
        </div>

        {/* Industry Collaborations */}
        <div
          onClick={() => onSelectTab('collaboration')}
          className="bg-white rounded-2xl p-4 border border-[#4B5694]/14 shadow-[0_4px_20px_rgba(17,24,68,0.04)] hover:shadow-md hover:border-[#4B5694]/35 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#7288AE] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7288AE]">Corporate MoUs</span>
            <div className="w-8 h-8 rounded-xl bg-[#EAE0CF] text-[#111844] flex items-center justify-center group-hover:bg-[#111844] group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111844] tracking-tight">38</div>
          <div className="text-[11px] text-[#111844] font-semibold mt-1">
            Tier-1 & Alliances
          </div>
        </div>
      </div>

      {/* Main Content Grid: Urgent Verification Queue + Department Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Urgent Student Verification Queue */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                  Actionable Verification Queue
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {pendingRequests.length} Pending
                </span>
              </div>
              <p className="text-xs text-[#7288AE] mt-0.5">
                Review and approve student credentials required for upcoming placement drives.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('verification')}
              className="text-xs font-bold text-[#4B5694] hover:text-[#111844] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Verification Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#4B5694]/10 text-[11px] font-bold text-[#7288AE] uppercase tracking-wider bg-[#F8F9FC]">
                  <th className="py-2.5 px-3 rounded-l-xl">Student</th>
                  <th className="py-2.5 px-3">Credential & Issuing Body</th>
                  <th className="py-2.5 px-3">Submitted</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4B5694]/8">
                {pendingRequests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-[#4B5694]/4 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.avatar}
                          alt={req.studentName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4B5694]/20 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#111844] truncate">{req.studentName}</div>
                          <div className="text-[11px] text-[#7288AE] truncate">
                            {req.rollNo} • {req.department.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-[#111844] truncate">{req.credentialTitle}</div>
                      <div className="text-[11px] text-[#7288AE] truncate flex items-center gap-1.5 mt-0.5">
                        <span className="font-medium text-[#4B5694]">{req.issuingBody}</span>
                        {req.isUrgent && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold shrink-0">
                            Urgent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#7288AE] font-medium whitespace-nowrap">
                      {req.submissionDate}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Pending
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onViewDocument(req)}
                          className="p-1.5 rounded-lg text-[#7288AE] hover:text-[#111844] hover:bg-[#7288AE]/15 transition-colors cursor-pointer"
                          title="Preview Document"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onVerifyRequest(req.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#4B5694] hover:bg-[#111844] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          Verify
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Department-wise Verification & Readiness */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                Department Performance
              </h3>
              <p className="text-xs text-[#7288AE] mt-0.5">
                Credential verification & placement readiness
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#4B5694] bg-[#4B5694]/10 px-2 py-0.5 rounded-full">
              NIRF Metric
            </span>
          </div>

          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111844] truncate">{dept.department}</span>
                  <span className="font-extrabold text-[#4B5694] shrink-0">{dept.verifiedPercentage}%</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-[#F1F4FA] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#111844] to-[#4B5694] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.verifiedPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7288AE]">
                  <span>{dept.verifiedStudents} of {dept.totalStudents} verified</span>
                  <span className="text-[#111844] font-semibold">{dept.averagePlacementReadiness}% readiness</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#4B5694]/10">
            <button
              onClick={() => onSelectTab('reports')}
              className="w-full py-2 rounded-xl bg-[#F8F9FC] hover:bg-[#4B5694]/10 text-xs font-bold text-[#4B5694] transition-colors text-center cursor-pointer"
            >
              View Full Accreditation Analytics →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Industry Drives & Recent Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Industry Alliances Preview */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                Corporate Industry Alliances
              </h3>
              <p className="text-xs text-[#7288AE] mt-0.5">38 active institutional partnerships</p>
            </div>
            <button
              onClick={() => onSelectTab('collaboration')}
              className="text-xs font-bold text-[#4B5694] hover:text-[#111844] transition-colors cursor-pointer"
            >
              All MoUs →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {industryPartners.slice(0, 4).map((partner) => (
              <div
                key={partner.id}
                className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/12 hover:border-[#4B5694]/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#111844] truncate">{partner.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] shrink-0">
                    {partner.logoText}
                  </span>
                </div>
                <div className="text-[11px] text-[#7288AE] truncate">{partner.industryDomain}</div>
                <div className="flex items-center justify-between pt-1 border-t border-[#4B5694]/10 text-[11px]">
                  <span className="text-emerald-700 font-bold">{partner.hiredCount} students hired</span>
                  <span className="text-[#4B5694] font-medium">{partner.activeProjects} live labs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log / Activity Trail */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4B5694]/10">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111844] tracking-tight">
                Recent Institutional Audit Trail
              </h3>
              <p className="text-xs text-[#7288AE] mt-0.5">Tamper-evident verification activity</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-[#4B5694] mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[#111844] truncate">{log.action}</span>
                    <span className="text-[10px] text-[#7288AE] shrink-0">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-[#4B5694] truncate">{log.target}</div>
                  <div className="text-[10px] text-[#7288AE]">Actor: {log.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
