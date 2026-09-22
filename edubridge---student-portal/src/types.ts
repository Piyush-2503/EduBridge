// EduBridge Design System Types & Interfaces
// Primary theme: Deep Navy (#111844), Indigo (#4B5694), Soft Blue (#7288AE), Warm Cream (#EAE0CF)

/* ==========================================================================
   ACADEMIA PORTAL TYPES (PRIMARY)
   ========================================================================== */

export type AcademiaNavTab =
  | 'overview'
  | 'verification'
  | 'students'
  | 'certifications'
  | 'internships'
  | 'collaboration'
  | 'reports';

export type VerificationStatus = 'pending' | 'verified' | 'flagged' | 'rejected';

export interface InstitutionProfile {
  name: string;
  campus: string;
  code: string;
  affiliation: string;
  deanName: string;
  deanRole: string;
  deanEmail: string;
  deanAvatar: string;
  academicSession?: string;
  accreditation?: string;
  naacGrade?: string;
  naacScore?: number;
  nirfRank?: number;
  totalStudents?: number;
  verifiedStudents?: number;
  pendingVerifications?: number;
  certificationsApproved?: number;
  activeInternships?: number;
  industryPartners?: number;
  totalStudentsEnrolled?: number;
  overallPlacementRate?: number;
  medianPackage?: string;
  highestPackage?: string;
  activeMoUs?: number;
  shortName?: string;
  id?: string;
  logoUrl?: string;
}

export interface VerificationRequest {
  id: string;
  studentId?: string;
  studentName: string;
  rollNo: string;
  department: string;
  year?: string;
  batch?: string;
  avatar: string;
  credentialTitle: string;
  credentialType: string;
  issuingBody: string;
  submissionDate: string;
  status: VerificationStatus;
  documentUrl: string;
  documentName: string;
  skillsClaimed: string[];
  cgpa: number;
  verifiedBy?: string;
  verifiedAt?: string;
  flagReason?: string;
  verificationNotes?: string;
  isUrgent?: boolean;
}

export interface StudentDirectoryItem {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  year: string;
  batch: string;
  cgpa: number;
  avatar: string;
  email: string;
  phone?: string;
  placementStatus: 'Placed' | 'Interview In-Process' | 'Interning' | 'Open' | string;
  placedCompany?: string;
  internshipCompany?: string;
  verificationStatus?: string;
  placementReadiness: number;
  verifiedSkillsCount: number;
  certificationsCount: number;
  attendance: number;
  topSkills: string[];
  hasPendingVerification?: boolean;
  githubHandle?: string;
  linkedinHandle?: string;
}

export interface InstitutionalCertification {
  id: string;
  credentialId: string;
  title: string;
  studentName: string;
  rollNo: string;
  department: string;
  issuingBody: string;
  category: 'Cloud & AI' | 'Full Stack & Software' | 'Core Engineering' | 'Ayush & HealthTech' | 'Cybersecurity' | string;
  issueDate: string;
  status: 'Approved' | 'Under Review' | 'Flagged' | 'Pending Verification' | string;
  verificationHash: string;
  scoreOrGrade?: string;
}

export interface InternshipProgram {
  id: string;
  title: string;
  partnerCompany: string;
  companyLogoText: string;
  domain: string;
  type: string;
  stipend: string;
  duration: string;
  enrolledStudents: number;
  targetCapacity: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Completed' | string;
  mentorName: string;
  nocApprovedCount: number;
  departmentsAllowed: string[];
}

export interface IndustryPartner {
  id: string;
  name: string;
  logoText: string;
  tier: 'Tier-1 Strategic' | 'Skill Center of Excellence' | 'Academic Alliance' | 'Research Partner' | string;
  industryDomain: string;
  mouSignedDate: string;
  mouExpiryDate: string;
  hiredCount: number;
  activeProjects: number;
  keyContact: string;
  contactEmail: string;
  sponsoredFacilities: string;
  status: 'Active' | 'Renewal Due' | 'In Discussion' | string;
}

export interface DepartmentStat {
  department: string;
  code: string;
  totalStudents: number;
  verifiedStudents?: number;
  placedStudents?: number;
  verifiedPercentage: number;
  averagePlacementReadiness: number;
  topIndustrySkill: string;
  skillGap?: number;
  pendingCount?: number;
  avgCgpa?: number;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  actor?: string;
  action?: string;
  target?: string;
  title?: string;
  description?: string;
  type: string;
  actorName?: string;
  actorRole?: string;
  badgeText?: string;
}

export interface AcademiaNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'verification' | 'partner' | 'report' | 'system' | 'internship' | 'academic' | string;
}
