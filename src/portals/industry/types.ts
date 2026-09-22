export type NavSection =
  | 'overview'
  | 'talent-discovery'
  | 'opportunities'
  | 'applicants'
  | 'skill-requirements'
  | 'academia-connect'
  | 'engagements'
  | 'analytics'
  | 'company-profile';

export type OpportunityType =
  | 'Internship'
  | 'Job'
  | 'Live Project'
  | 'Apprenticeship'
  | 'Industry Challenge';

export type ApplicantStage =
  | 'Applied'
  | 'Shortlisted'
  | 'Assessment'
  | 'Interview'
  | 'Selected'
  | 'Archived';

export interface VerifiedSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  score: number; // e.g. 92%
  verifiedBy: string; // e.g. "NPTEL / EduBridge Assessment", "AWS Certified"
  verifiedDate: string;
}

export interface StudentProject {
  title: string;
  role: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  verifiedEvidence: string; // e.g. "Verified Repo & Automated Unit Test Suite passed"
}

export interface StudentAssessment {
  name: string;
  score: number;
  percentile: number;
  date: string;
  proctored: boolean;
}

export interface StudentTalent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  collegeTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  degree: string;
  branch: string;
  graduationYear: number;
  cgpa: number;
  location: string;
  preferredLocation: string;
  availability: 'Immediate (Full-time)' | 'Immediate (Internship)' | 'Summer 2026' | 'Available for Projects';
  verifiedStatus: boolean;
  skillMatchScore: number; // dynamic or base match
  primaryRole: string;
  headline: string;
  skills: VerifiedSkill[];
  projects: StudentProject[];
  assessments: StudentAssessment[];
  badges: string[];
  githubUser?: string;
  linkedinUser?: string;
  summary: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  department: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  stipendOrSalary: string;
  duration: string;
  openings: number;
  requiredSkills: { skill: string; minProficiency: string; weight: number }[];
  eligibility: {
    degrees: string[];
    minCgpa: number;
    batches: number[];
  };
  selectionProcess: string[];
  applicantsCount: number;
  shortlistedCount: number;
  deadline: string;
  status: 'Active' | 'Draft' | 'Closed';
  createdAt: string;
  description: string;
  responsibilities: string[];
}

export interface Applicant {
  id: string;
  talentId: string;
  talent: StudentTalent;
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: OpportunityType;
  appliedDate: string;
  stage: ApplicantStage;
  skillMatchPercent: number;
  matchedSkills: string[];
  missingSkills: string[];
  assessmentScore?: number;
  interviewDate?: string;
  notes?: string;
}

export interface SkillDemandItem {
  id: string;
  skillName: string;
  category: 'Software & Cloud' | 'Data & AI' | 'Core Engineering' | 'Cybersecurity' | 'Embedded & IoT';
  targetRole: string;
  industryDemandLevel: number; // 0-100
  talentAvailabilityLevel: number; // 0-100
  skillGapPercent: number; // (Demand - Availability)
  priority: 'Critical' | 'High' | 'Medium';
  isEmerging: boolean;
  recommendedAcademiaAction: string;
  associatedOpportunities: number;
  collegesCoveringCurriculum: number;
}

export interface AcademiaPartner {
  id: string;
  name: string;
  shortName: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'State University' | 'Autonomous' | 'Private';
  location: string;
  state: string;
  nirfRank: number;
  naacGrade: string;
  studentCount: number;
  topSkills: string[];
  collaborationStatus: 'Active MoU' | 'Partner' | 'Prospective' | 'Curriculum Aligned';
  verifiedStudentsCount: number;
  placementLiaison: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };
  jointProgramsCount: number;
  avgSkillMatch: number;
  establishedYear: number;
  curriculumFeedbackSent?: boolean;
}

export interface EngagementItem {
  id: string;
  title: string;
  type: 'Curriculum Alignment' | 'Industry Workshop' | 'Hackathon' | 'Guest Lecture' | 'Faculty Development (FDP)' | 'Joint Innovation Lab';
  institutionName: string;
  institutionId: string;
  date: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  participantsCount: number;
  leadSpeaker: string;
  description: string;
  deliverables: string[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  cin: string;
  logo: string;
  verificationBadge: 'Verified Tier-1 Industry Partner' | 'Registered Partner';
  headquarters: string;
  foundedYear: number;
  employeeCount: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  domains: string[];
  hiringTeam: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  }[];
  activeMoUs: number;
  totalHires: number;
  targetCampuses?: string[];
  culturePerks?: string[];
}
