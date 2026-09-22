export type ViewId =
  | 'dashboard'
  | 'students'
  | 'skill-intelligence'
  | 'skill-gap'
  | 'learning-training'
  | 'partners'
  | 'internships'
  | 'placements'
  | 'projects'
  | 'collaboration'
  | 'faculty-opportunities'
  | 'fdps'
  | 'research-consultancy'
  | 'workshops'
  | 'analytics'
  | 'reports'
  | 'notifications'
  | 'settings';

export interface StudentSkill {
  name: string;
  category: 'Technical' | 'Domain' | 'Soft' | 'Clinical / Ayurveda' | 'Tools';
  proficiency: number; // 0 to 100
  required: number; // 0 to 100
  verified: boolean;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  avatar: string;
  department: string;
  program: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'PG / MD';
  cgpa: number;
  skillReadiness: number; // 0-100
  internshipStatus: 'None' | 'Applying' | 'Pending Approval' | 'Active' | 'Completed' | 'Needs Attention';
  placementStatus: 'Not Eligible' | 'Eligible' | 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Received' | 'Placed';
  profileStatus: 'Verified' | 'Pending Verification' | 'Needs Update';
  skills: StudentSkill[];
  activeInternship?: {
    company: string;
    role: string;
    mentor: string;
    startDate: string;
    endDate: string;
    stipend: string;
    attendance: number;
    status: 'Active' | 'Pending' | 'Completed' | 'Needs Attention';
  };
  placementDetails?: {
    company: string;
    role: string;
    packageLpa: number;
    offerDate: string;
  };
  certifications: {
    title: string;
    issuer: string;
    date: string;
    verified: boolean;
  }[];
  attendance: number;
}

export interface DepartmentMetric {
  id: string;
  name: string;
  code: string;
  iconName: string;
  totalStudents: number;
  readinessRate: number; // percentage
  internshipRate: number; // percentage
  placementRate: number; // percentage
  skillGapScore: number; // gap percentage
  industryEngagement: number; // percentage
  topPartner: string;
  facultyCount: number;
  activeMoUs: number;
}

export interface SkillGapItem {
  id: string;
  skill: string;
  category: 'Modern Tech' | 'Ayush & Life Sciences' | 'Core Engineering' | 'Professional';
  industryDemand: number; // 0-100
  studentProficiency: number; // 0-100
  gap: number; // Demand - Proficiency
  trend: 'up' | 'down' | 'stable';
  affectedDepartments: string[];
  interventionsActive: number;
}

export interface IndustryPartner {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  industry: string;
  tier: 'Strategic Tier 1' | 'Core Partner' | 'Emerging Partner';
  activeOpportunities: number;
  internshipsProvided: number;
  placementDrives: number;
  collaborationStatus: 'Active' | 'Expiring Soon' | 'Renewal Pending' | 'In Discussion';
  mouValidTill: string;
  focalPerson: string;
  contactEmail: string;
  projectsActive: number;
  jointResearch: boolean;
}

export interface InternshipRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  avatar: string;
  department: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  mentor: string;
  stipend: string;
  progress: number;
  status: 'Active' | 'Pending' | 'Completed' | 'Needs Attention';
  attendanceRate: number;
  mentorFeedback?: string;
}

export interface PlacementDrive {
  id: string;
  company: string;
  role: string;
  department: string[];
  eligibleCount: number;
  appliedCount: number;
  shortlistedCount: number;
  offeredCount: number;
  packageLpa: number;
  driveDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  venueType: 'On Campus' | 'Virtual' | 'Hybrid';
}

export interface FacultyOpportunity {
  id: string;
  title: string;
  organization: string;
  type: string;
  eligibleFaculty?: string;
  department: string | string[];
  duration: string;
  grantOrStipend?: string;
  stipend?: string;
  deadline: string;
  status: 'Open' | 'Reviewing' | 'Closed' | 'Awarded' | string;
  applicantsCount?: number;
}

export interface CollaborationItem {
  id: string;
  title: string;
  partner: string;
  type: 'MoU' | 'Live Project' | 'Guest Lecture' | 'Workshop' | 'Innovation Challenge' | 'Joint R&D';
  department: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Pending Approval' | 'Expiring Soon' | 'Completed';
  leadCoordinator: string;
  impactMetric: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Placement' | 'Internship' | 'Skill Gap' | 'Industry' | 'Department' | 'Faculty';
  lastGenerated: string;
  period: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  fileSize: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'Placement' | 'Internship' | 'Industry' | 'Faculty' | 'Student' | 'System';
  urgency: 'high' | 'medium' | 'low';
  read: boolean;
  actionLink?: ViewId;
}
