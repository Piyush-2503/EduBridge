import React, { useState } from 'react';
import {
  AcademiaNavTab,
  StudentDirectoryItem,
  VerificationRequest,
  InstitutionalCertification,
  InternshipProgram,
  IndustryPartner,
  AcademiaNotification
} from './types';
import {
  initialInstitutionProfile,
  initialDepartmentStats,
  initialVerificationRequests,
  initialStudentsDirectory,
  initialCertifications,
  initialInternshipPrograms,
  initialIndustryPartners,
  initialActivityLogs,
  initialAcademiaNotifications
} from './data/academiaData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { OverviewView } from './views/OverviewView';
import { VerificationView } from './views/VerificationView';
import { StudentsView } from './views/StudentsView';
import { CertificationsView } from './views/CertificationsView';
import { InternshipsView } from './views/InternshipsView';
import { CollaborationView } from './views/CollaborationView';
import { ReportsView } from './views/ReportsView';
import {
  StudentProfileModal,
  DocumentViewerModal,
  AddCertificationModal,
  CreateProgramModal,
  NewCollaborationModal,
  ExportReportModal,
  InstitutionProfileModal,
  SettingsModal
} from './components/AcademiaModals';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & Layout
  const [currentTab, setCurrentTab] = useState<AcademiaNavTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [academicSession, setAcademicSession] = useState('2025–26');

  // Core Academia Data State
  const [institution, setInstitution] = useState(initialInstitutionProfile);
  const [departmentStats, setDepartmentStats] = useState(initialDepartmentStats);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(
    initialVerificationRequests
  );
  const [students, setStudents] = useState<StudentDirectoryItem[]>(initialStudentsDirectory);
  const [certifications, setCertifications] = useState<InstitutionalCertification[]>(
    initialCertifications
  );
  const [programs, setPrograms] = useState<InternshipProgram[]>(initialInternshipPrograms);
  const [partners, setPartners] = useState<IndustryPartner[]>(initialIndustryPartners);
  const [activityLogs, setActivityLogs] = useState(initialActivityLogs);
  const [notifications, setNotifications] = useState<AcademiaNotification[]>(
    initialAcademiaNotifications
  );

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [selectedStudentForModal, setSelectedStudentForModal] =
    useState<StudentDirectoryItem | null>(null);
  const [selectedDocForModal, setSelectedDocForModal] = useState<VerificationRequest | null>(null);
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isNewCollaborationOpen, setIsNewCollaborationOpen] = useState(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);
  const [isInstitutionProfileOpen, setIsInstitutionProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Quick Action Handlers
  const handleVerifySingle = (id: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'verified' as const,
              verifiedBy: `${institution.deanName} (Institutional Sign-off)`,
              verifiedAt: 'Just now'
            }
          : req
      )
    );

    // Push notification
    const matched = verificationRequests.find((r) => r.id === id);
    if (matched) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Credential Verified',
          message: `${matched.studentName}'s credential "${matched.credentialTitle}" approved and signed.`,
          time: 'Just now',
          read: false,
          type: 'verification'
        },
        ...prev
      ]);
    }
  };

  const handleRejectSingle = (id: string, reason?: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'flagged' as const,
              flagReason: reason || 'Document verification flagged by Academic Council'
            }
          : req
      )
    );
  };

  const handleBatchVerify = (ids: string[]) => {
    setVerificationRequests((prev) =>
      prev.map((req) =>
        ids.includes(req.id)
          ? {
              ...req,
              status: 'verified' as const,
              verifiedBy: `${institution.deanName} (Batch Cleared)`,
              verifiedAt: 'Just now'
            }
          : req
      )
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Batch Verification Completed',
        message: `${ids.length} student credentials cleared and published to National Academic Depository.`,
        time: 'Just now',
        read: false,
        type: 'verification'
      },
      ...prev
    ]);
  };

  const handleAddCertification = (newCert: InstitutionalCertification) => {
    setCertifications((prev) => [newCert, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Certification Registered',
        message: `Approved credential "${newCert.title}" registered for ${newCert.studentName}.`,
        time: 'Just now',
        read: false,
        type: 'academic'
      },
      ...prev
    ]);
  };

  const handleCreateProgram = (newProg: InternshipProgram) => {
    setPrograms((prev) => [newProg, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Training Drive Created',
        message: `Drive "${newProg.title}" in partnership with ${newProg.partnerCompany} has been launched.`,
        time: 'Just now',
        read: false,
        type: 'internship'
      },
      ...prev
    ]);
  };

  const handleAddPartner = (newPartner: IndustryPartner) => {
    setPartners((prev) => [newPartner, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Corporate MoU Registered',
        message: `Partnership agreement signed with ${newPartner.name} (${newPartner.tier}).`,
        time: 'Just now',
        read: false,
        type: 'partner'
      },
      ...prev
    ]);
  };

  const handleEndorseStudent = (student: StudentDirectoryItem) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              placementReadiness: Math.min(100, s.placementReadiness + 3),
              verifiedSkillsCount: s.verifiedSkillsCount + 1
            }
          : s
      )
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Student Endorsed',
        message: `Institutional faculty endorsement granted to ${student.name} (${student.rollNo}).`,
        time: 'Just now',
        read: false,
        type: 'academic'
      },
      ...prev
    ]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Urgent pending count
  const pendingRequestsCount = verificationRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#111844] flex flex-col selection:bg-[#4B5694] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenProfile={() => setIsInstitutionProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        institution={institution}
        pendingVerificationsCount={pendingRequestsCount}
      />

      {/* Main Container Offset by Sidebar on Desktop */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Glassmorphic TopBar */}
        <TopBar
          institution={institution}
          activeTab={currentTab}
          notifications={notifications}
          students={students}
          certifications={certifications}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenInstitutionProfile={() => setIsInstitutionProfileOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectStudent={(stud) => setSelectedStudentForModal(stud)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMarkNotificationRead={(id) =>
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            )
          }
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          academicSession={academicSession}
          onSelectAcademicSession={setAcademicSession}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {currentTab === 'overview' && (
            <OverviewView
              institution={institution}
              departmentStats={departmentStats}
              verificationRequests={verificationRequests}
              industryPartners={partners}
              activityLogs={activityLogs}
              onSelectTab={setCurrentTab}
              onVerifyRequest={handleVerifySingle}
              onViewDocument={(req) => setSelectedDocForModal(req)}
              onOpenAddCertification={() => setIsAddCertificationOpen(true)}
              onOpenNewCollaboration={() => setIsNewCollaborationOpen(true)}
              onOpenCreateProgram={() => setIsCreateProgramOpen(true)}
              onOpenExportReport={() => setIsExportReportOpen(true)}
            />
          )}

          {currentTab === 'verification' && (
            <VerificationView
              requests={verificationRequests}
              onVerifyRequest={handleVerifySingle}
              onRejectRequest={handleRejectSingle}
              onBatchVerify={handleBatchVerify}
              onViewDocument={(req) => setSelectedDocForModal(req)}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              students={students}
              onSelectStudent={(stud) => setSelectedStudentForModal(stud)}
              onEndorseStudent={handleEndorseStudent}
            />
          )}

          {currentTab === 'certifications' && (
            <CertificationsView
              certifications={certifications}
              onOpenAddCertification={() => setIsAddCertificationOpen(true)}
            />
          )}

          {currentTab === 'internships' && (
            <InternshipsView
              programs={programs}
              onOpenCreateProgram={() => setIsCreateProgramOpen(true)}
            />
          )}

          {currentTab === 'collaboration' && (
            <CollaborationView
              partners={partners}
              onOpenNewCollaboration={() => setIsNewCollaborationOpen(true)}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              institution={institution}
              departmentStats={departmentStats}
              onOpenExportReport={() => setIsExportReportOpen(true)}
            />
          )}
        </main>

        {/* Institutional Accreditation Footer */}
        <footer className="mt-auto border-t border-[#4B5694]/12 py-5 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7288AE]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#111844] text-[#EAE0CF] font-extrabold text-[10px] flex items-center justify-center">
                EB
              </div>
              <span className="font-bold text-[#111844]">EduBridge Academia Portal</span>
              <span>•</span>
              <span>Ministry of Ayush & All India Institute of Ayurveda</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                NAAC A++ (CGPA 3.84) • NIRF Rank #38
              </span>
              <span>•</span>
              <span>Smart Automation & Credential Audit</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <StudentProfileModal
        student={selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
        onEndorse={handleEndorseStudent}
      />

      <DocumentViewerModal
        request={selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
        onVerify={handleVerifySingle}
        onReject={handleRejectSingle}
      />

      <AddCertificationModal
        isOpen={isAddCertificationOpen}
        onClose={() => setIsAddCertificationOpen(false)}
        onAdd={handleAddCertification}
      />

      <CreateProgramModal
        isOpen={isCreateProgramOpen}
        onClose={() => setIsCreateProgramOpen(false)}
        onCreate={handleCreateProgram}
      />

      <NewCollaborationModal
        isOpen={isNewCollaborationOpen}
        onClose={() => setIsNewCollaborationOpen(false)}
        onAdd={handleAddPartner}
      />

      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
      />

      <InstitutionProfileModal
        isOpen={isInstitutionProfileOpen}
        onClose={() => setIsInstitutionProfileOpen(false)}
        institution={institution}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        academicSession={academicSession}
        onSelectAcademicSession={setAcademicSession}
      />
    </div>
  );
}
