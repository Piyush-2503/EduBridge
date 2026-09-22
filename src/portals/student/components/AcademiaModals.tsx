import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  Download,
  Calendar,
  Users,
  GraduationCap,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Mail,
  Check,
  Clock,
  Briefcase
} from 'lucide-react';
import {
  StudentDirectoryItem,
  VerificationRequest,
  InstitutionProfile,
  InstitutionalCertification,
  InternshipProgram,
  IndustryPartner
} from '../types';

/* -------------------------------------------------------------
   1. Student Profile Modal (Dossier)
   ------------------------------------------------------------- */
interface StudentProfileModalProps {
  student: StudentDirectoryItem | null;
  onClose: () => void;
  onEndorse: (student: StudentDirectoryItem) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onEndorse
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#111844] text-white flex items-start justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#EAE0CF]/40 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white truncate">{student.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
                  {student.rollNo}
                </span>
              </div>
              <div className="text-xs text-[#7288AE] mt-0.5">{student.department}</div>
              <div className="text-[11px] text-blue-200 mt-0.5">{student.email}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10">
              <span className="text-[#7288AE]">Cumulative CGPA</span>
              <div className="text-base font-extrabold text-[#111844] mt-0.5">{student.cgpa} / 10.0</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10">
              <span className="text-[#7288AE]">Biometric Attendance</span>
              <div className="text-base font-extrabold text-emerald-600 mt-0.5">{student.attendance}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10">
              <span className="text-[#7288AE]">Placement Readiness</span>
              <div className="text-base font-extrabold text-[#4B5694] mt-0.5">{student.placementReadiness}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10">
              <span className="text-[#7288AE]">Placement Status</span>
              <div className="text-xs font-bold text-[#111844] mt-1">{student.placementStatus}</div>
            </div>
          </div>

          {/* Verified Skills */}
          <div className="space-y-2">
            <div className="font-bold text-[#111844] flex items-center justify-between">
              <span>Verified Technical Competencies</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {student.verifiedSkillsCount} Audited Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {student.topSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1 rounded-lg bg-[#F8F9FC] text-[#4B5694] border border-[#4B5694]/20 font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{sk}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Academic Verification Status */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>National Academic Depository (NAD) DigiLocker Synced</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              All degree mark sheets and external industry badges are cryptographically signed by Apex Institute of Technology.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F9FC] border-t border-[#4B5694]/10 flex items-center justify-between">
          <button
            onClick={() => {
              alert(`Downloading verified dossier packet for ${student.name}`);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#4B5694]/20 hover:border-[#4B5694] text-[#4B5694] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Dossier</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#7288AE] hover:text-[#111844] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEndorse(student);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Endorse Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   2. Document Viewer Modal
   ------------------------------------------------------------- */
interface DocumentViewerModalProps {
  request: VerificationRequest | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  onReject: (id: string, reason?: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  request,
  onClose,
  onVerify,
  onReject
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rejectNotes, setRejectNotes] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#111844]/65 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between border-b border-[#4B5694]/30">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white truncate">
                {request.credentialTitle}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAE0CF] text-[#111844]">
                {request.credentialType}
              </span>
            </div>
            <div className="text-[11px] text-[#7288AE] mt-0.5">
              Candidate: <span className="text-white font-semibold">{request.studentName}</span> ({request.rollNo}) • {request.department}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
                className="p-1 hover:text-[#EAE0CF] cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 15, 140))}
                className="p-1 hover:text-[#EAE0CF] cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Preview Canvas */}
        <div className="flex-1 bg-[#F1F4FA] p-4 sm:p-6 overflow-auto flex items-center justify-center min-h-[280px]">
          <div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#4B5694]/20 max-w-xl w-full transition-transform"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Official Academic Watermark & Border */}
            <div className="border-2 border-dashed border-[#4B5694]/30 p-6 rounded-lg text-center space-y-4 relative">
              <div className="flex items-center justify-center gap-2 text-[#111844]">
                <GraduationCap className="w-8 h-8 text-[#4B5694]" />
                <div>
                  <div className="text-sm font-extrabold uppercase tracking-wider">
                    {request.issuingBody}
                  </div>
                  <div className="text-[10px] text-[#7288AE]">Verified Academic Certificate of Completion</div>
                </div>
              </div>

              <div className="py-3 border-y border-[#4B5694]/15">
                <div className="text-xs text-[#7288AE]">This is to certify that</div>
                <div className="text-base font-extrabold text-[#111844] mt-1">{request.studentName}</div>
                <div className="text-xs text-[#4B5694] font-medium">Roll No: {request.rollNo} • {request.department}</div>
                <div className="text-xs text-[#7288AE] mt-2">has successfully satisfied all rigorous benchmarks for</div>
                <div className="text-sm font-bold text-[#111844] mt-1">{request.credentialTitle}</div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#7288AE] pt-2">
                <div className="text-left font-mono">
                  <div>Ref ID: {request.id}</div>
                  <div>Submitted: {request.submissionDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700">Digital Hash Verified</div>
                  <div className="font-mono text-[9px]">0x9b42...88fa</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reject / Flag Sub-form */}
        {showRejectForm && (
          <div className="p-4 bg-rose-50 border-t border-rose-200 space-y-2">
            <div className="text-xs font-bold text-rose-800">
              Reason for flagging / requesting resubmission:
            </div>
            <textarea
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              placeholder="e.g. Document seal illegible, QR code validation failed..."
              className="w-full p-2.5 rounded-xl bg-white border border-rose-300 text-xs text-[#111844] focus:outline-none focus:ring-1 focus:ring-rose-500"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRejectForm(false)}
                className="px-3 py-1 text-xs text-[#7288AE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReject(request.id, rejectNotes || 'Resubmission requested by Academic Verification Cell');
                  onClose();
                }}
                className="px-3.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Flag
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 bg-[#F8F9FC] border-t border-[#4B5694]/10 flex items-center justify-between">
          <div className="text-xs text-[#7288AE] font-mono">
            File: {request.documentName}
          </div>

          <div className="flex items-center gap-2">
            {!showRejectForm && request.status === 'pending' && (
              <button
                onClick={() => setShowRejectForm(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Flag / Request Resubmission
              </button>
            )}

            {request.status === 'pending' && (
              <button
                onClick={() => {
                  onVerify(request.id);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Approve & Cryptographically Sign</span>
              </button>
            )}

            {request.status !== 'pending' && (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#4B5694] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   3. Add Certification Modal
   ------------------------------------------------------------- */
interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cert: InstitutionalCertification) => void;
}

export const AddCertificationModal: React.FC<AddCertificationModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [issuingBody, setIssuingBody] = useState('');
  const [category, setCategory] = useState<InstitutionalCertification['category']>('Cloud & AI');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !studentName || !rollNo || !issuingBody) {
      alert('Please fill out all required certification details.');
      return;
    }

    const newCert: InstitutionalCertification = {
      id: `cert-${Date.now()}`,
      credentialId: `EB-INST-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      studentName,
      rollNo,
      department,
      issuingBody,
      category,
      issueDate: 'Sep 18, 2026',
      status: 'Approved',
      verificationHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
      scoreOrGrade: 'Verified by Academic Council'
    };

    onAdd(newCert);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#EAE0CF]" />
            <h3 className="text-sm font-extrabold text-white">Register Approved Institutional Certification</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#111844] mb-1">Certification Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AWS Certified Developer Associate"
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Student Full Name *</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Aarav Patel"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Roll Number *</label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. 22CS084"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              >
                <option value="Computer Science & Engineering">Computer Science</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Electronics & Communication">Electronics (ECE)</option>
                <option value="Mechanical & Automation">Mechanical</option>
                <option value="Information Technology">Information Tech</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              >
                <option value="Cloud & AI">Cloud & AI</option>
                <option value="Full Stack & Software">Full Stack & Software</option>
                <option value="Core Engineering">Core Engineering</option>
                <option value="Ayush & HealthTech">Ayush & HealthTech</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#111844] mb-1">Issuing Body / Global Authority *</label>
            <input
              type="text"
              value={issuingBody}
              onChange={(e) => setIssuingBody(e.target.value)}
              placeholder="e.g. Amazon Web Services, Google Cloud, DeepLearning.AI"
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              required
            />
          </div>

          <div className="p-3 bg-[#F8F9FC] rounded-xl border border-[#4B5694]/10 text-[11px] text-[#7288AE]">
            This certification record will automatically be appended to the institutional blockchain verification ledger.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-[#7288AE] hover:text-[#111844] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              Confirm & Issue Endorsement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   4. Create Program Modal
   ------------------------------------------------------------- */
interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (program: InternshipProgram) => void;
}

export const CreateProgramModal: React.FC<CreateProgramModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [partnerCompany, setPartnerCompany] = useState('');
  const [stipend, setStipend] = useState('₹30,000 / month');
  const [duration, setDuration] = useState('8 Weeks');
  const [capacity, setCapacity] = useState(40);
  const [domain, setDomain] = useState('Cloud Architecture & Applied AI');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !partnerCompany) {
      alert('Please provide program title and partner company.');
      return;
    }

    const newProg: InternshipProgram = {
      id: `prog-${Date.now()}`,
      title,
      partnerCompany,
      companyLogoText: partnerCompany.substring(0, 4).toUpperCase(),
      domain,
      type: 'Summer Internship',
      stipend,
      duration,
      enrolledStudents: 0,
      targetCapacity: Number(capacity) || 40,
      startDate: 'Oct 01, 2026',
      endDate: 'Dec 01, 2026',
      status: 'Upcoming',
      mentorName: 'Designated Corporate Lead',
      nocApprovedCount: 0,
      departmentsAllowed: ['CSE', 'AI&DS', 'IT']
    };

    onCreate(newProg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#EAE0CF]" />
            <h3 className="text-sm font-extrabold text-white">Launch Technical Internship / Training Program</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#111844] mb-1">Program Name *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Microsoft Engage Cloud DevOps Apprenticeship"
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Partner Enterprise *</label>
              <input
                type="text"
                value={partnerCompany}
                onChange={(e) => setPartnerCompany(e.target.value)}
                placeholder="e.g. Microsoft R&D India"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Stipend</label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Target Cohort Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#111844] mb-1">Technical Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-[#7288AE] hover:text-[#111844] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              Publish Training Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   5. New Collaboration Modal
   ------------------------------------------------------------- */
interface NewCollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (partner: IndustryPartner) => void;
}

export const NewCollaborationModal: React.FC<NewCollaborationModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [facility, setFacility] = useState('');
  const [tier, setTier] = useState<IndustryPartner['tier']>('Tier-1 Strategic');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      alert('Please fill out partner name and contact person.');
      return;
    }

    const newPartner: IndustryPartner = {
      id: `partner-${Date.now()}`,
      name,
      logoText: name.substring(0, 3).toUpperCase(),
      tier,
      industryDomain: domain || 'Enterprise AI & Cloud Infrastructure',
      mouSignedDate: 'Sep 2026',
      mouExpiryDate: 'Sep 2029',
      hiredCount: 0,
      activeProjects: 2,
      keyContact: contact,
      contactEmail: email || 'contact@partner.com',
      sponsoredFacilities: facility || 'Innovation Sandbox Lab',
      status: 'Active'
    };

    onAdd(newPartner);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#EAE0CF]" />
            <h3 className="text-sm font-extrabold text-white">Register Corporate Industry MoU</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#111844] mb-1">Enterprise Partner Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cisco Systems India"
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Partnership Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              >
                <option value="Tier-1 Strategic">Tier-1 Strategic</option>
                <option value="Skill Center of Excellence">Skill Center of Excellence</option>
                <option value="Academic Alliance">Academic Alliance</option>
                <option value="Research Partner">Research Partner</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Industry Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Networking & Cybersecurity"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111844] mb-1">Industry Contact Person *</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. Sunita Nair"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-[#111844] mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.nair@cisco.com"
                className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#111844] mb-1">Sponsored Campus Facility / CoE</label>
            <input
              type="text"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              placeholder="e.g. Cisco Cyber Threat Defense Research Lab"
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 focus:border-[#4B5694] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-[#7288AE] hover:text-[#111844] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            >
              Register Collaboration MoU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   6. Export Report Modal
   ------------------------------------------------------------- */
interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('nirf');
  const [format, setFormat] = useState('pdf');

  if (!isOpen) return null;

  const handleDownload = () => {
    alert(`Generating ${reportType.toUpperCase()} Audit Packet in ${format.toUpperCase()} format with digital signature...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#EAE0CF]" />
            <h3 className="text-sm font-extrabold text-white">Generate Institutional Accreditation Packet</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#111844] mb-2">Select Accreditation Module</label>
            <div className="space-y-2">
              {[
                { id: 'nirf', label: 'NIRF Ranking Placement & Higher Studies Index', desc: 'Consolidated data for Ministry of Education submission' },
                { id: 'naac', label: 'NAAC Criterion 5.2.1 Student Progression Audit', desc: 'Verified placement orders & higher study admissions' },
                { id: 'skills', label: 'Curricular Skill Gap & Industry Mapping Dossier', desc: 'Departmental curriculum diagnostics for Academic Council' }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                    reportType === m.id
                      ? 'border-[#4B5694] bg-[#4B5694]/8 text-[#111844]'
                      : 'border-[#4B5694]/15 hover:bg-[#F8F9FC]'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    checked={reportType === m.id}
                    onChange={() => setReportType(m.id)}
                    className="mt-0.5 text-[#4B5694]"
                  />
                  <div>
                    <div className="font-bold text-xs">{m.label}</div>
                    <div className="text-[11px] text-[#7288AE] mt-0.5">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#111844] mb-1.5">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              {['pdf', 'csv', 'nad-xml'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`py-2 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                    format === fmt
                      ? 'bg-[#4B5694] text-white border-[#4B5694]'
                      : 'border-[#4B5694]/20 text-[#7288AE] hover:text-[#111844]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-[#7288AE] hover:text-[#111844] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-[#4B5694] hover:bg-[#111844] text-white font-bold text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate & Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   7. Institution Profile Modal
   ------------------------------------------------------------- */
interface InstitutionProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: InstitutionProfile;
}

export const InstitutionProfileModal: React.FC<InstitutionProfileModalProps> = ({
  isOpen,
  onClose,
  institution
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#EAE0CF]" />
            <h3 className="text-sm font-extrabold text-white">Institutional Accreditation Dossier</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/14 space-y-1">
            <div className="text-sm font-extrabold text-[#111844]">{institution.name}</div>
            <div className="text-xs text-[#4B5694]">{institution.campus}</div>
            <div className="text-[11px] text-[#7288AE] mt-1">{institution.affiliation}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white border border-[#4B5694]/14">
              <span className="text-[#7288AE]">NAAC Accreditation</span>
              <div className="text-base font-extrabold text-[#111844] mt-0.5">Grade A++</div>
              <div className="text-[10px] text-emerald-600 font-bold">CGPA 3.84 / 4.00</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#4B5694]/14">
              <span className="text-[#7288AE]">NIRF Engineering Rank</span>
              <div className="text-base font-extrabold text-[#111844] mt-0.5">Rank #38</div>
              <div className="text-[10px] text-emerald-600 font-bold">National Top 50</div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="font-bold text-[#111844]">Executive Leadership</div>
            <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#4B5694]/10 flex items-center gap-3">
              <img
                src={institution.deanAvatar}
                alt={institution.deanName}
                className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#4B5694]/25 shrink-0"
              />
              <div className="min-w-0">
                <div className="font-bold text-[#111844]">{institution.deanName}</div>
                <div className="text-[11px] text-[#4B5694]">{institution.deanRole}</div>
                <div className="text-[10px] text-[#7288AE]">{institution.deanEmail}</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#4B5694] text-white text-xs font-bold hover:bg-[#111844] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   8. Settings Modal
   ------------------------------------------------------------- */
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  academicSession: string;
  onSelectAcademicSession: (session: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  academicSession,
  onSelectAcademicSession
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#4B5694]/20 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 bg-[#111844] text-white flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white">Administration Settings & Rules</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#111844] mb-1.5">Active Academic Session</label>
            <select
              value={academicSession}
              onChange={(e) => onSelectAcademicSession(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#4B5694]/20 font-bold text-xs"
            >
              <option value="2025–26">2025–26 (Current Active Session)</option>
              <option value="2024–25">2024–25 (Archived Academic Year)</option>
              <option value="2023–24">2023–24 (Historical Records)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-[#111844]">Automated Verification Rules</label>
            <div className="space-y-1.5 text-[#111844]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#4B5694]" />
                <span>Auto-verify credentials from accredited global bodies (AWS, GCP)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#4B5694]" />
                <span>Enable blockchain digital hash checks on candidate upload</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#4B5694]" />
                <span>Send SMS/Email alerts for pending verification items older than 48h</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#4B5694] text-white text-xs font-bold hover:bg-[#111844] transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
