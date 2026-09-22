import React, { useState, useEffect } from 'react';
import { ViewId, Student, IndustryPartner } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { StudentDrawer } from './components/students/StudentDrawer';
import { PartnerModal } from './components/partners/PartnerModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ExportModal } from './components/common/ExportModal';

// Views
import { DashboardView } from './views/DashboardView';
import { StudentDirectoryView } from './views/StudentDirectoryView';
import { SkillIntelligenceView } from './views/SkillIntelligenceView';
import { SkillGapAnalysisView } from './views/SkillGapAnalysisView';
import { LearningTrainingView } from './views/LearningTrainingView';
import { IndustryPartnersView } from './views/IndustryPartnersView';
import { InternshipsView } from './views/InternshipsView';
import { PlacementsView } from './views/PlacementsView';
import { IndustryProjectsView } from './views/IndustryProjectsView';
import { CollaborationHubView } from './views/CollaborationHubView';
import { FacultyOpportunitiesView } from './views/FacultyOpportunitiesView';
import { FDPsView } from './views/FDPsView';
import { ResearchConsultancyView } from './views/ResearchConsultancyView';
import { WorkshopsView } from './views/WorkshopsView';
import { InstitutionalAnalyticsView } from './views/InstitutionalAnalyticsView';
import { ReportsView } from './views/ReportsView';
import { NotificationsView } from './views/NotificationsView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewId>('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All Departments');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals & Drawers state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<IndustryPartner | null>(null);
  const [isCreatePartnerOpen, setIsCreatePartnerOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title?: string }>({
    isOpen: false,
  });

  // Global Keyboard Shortcut: Ctrl + K / Cmd + K to trigger Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenExport = (title?: string) => {
    setExportModal({
      isOpen: true,
      title: title || 'Institutional Employability & Performance Dossier',
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={setCurrentView}
            onSelectStudent={setSelectedStudent}
            onSelectPartner={setSelectedPartner}
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'students':
        return (
          <StudentDirectoryView
            onSelectStudent={setSelectedStudent}
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'skill-intelligence':
        return (
          <SkillIntelligenceView
            onNavigate={setCurrentView}
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'skill-gap':
        return (
          <SkillGapAnalysisView
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'learning-training':
        return <LearningTrainingView onOpenExport={handleOpenExport} />;
      case 'partners':
        return (
          <IndustryPartnersView
            onSelectPartner={setSelectedPartner}
            onOpenCreatePartner={() => setIsCreatePartnerOpen(true)}
            onOpenExport={handleOpenExport}
          />
        );
      case 'internships':
        return (
          <InternshipsView
            onSelectStudent={setSelectedStudent}
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'placements':
        return (
          <PlacementsView
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'projects':
        return <IndustryProjectsView onOpenExport={handleOpenExport} />;
      case 'collaboration':
        return (
          <CollaborationHubView
            onOpenExport={handleOpenExport}
            onOpenCreatePartner={() => setIsCreatePartnerOpen(true)}
          />
        );
      case 'faculty-opportunities':
        return <FacultyOpportunitiesView onOpenExport={handleOpenExport} />;
      case 'fdps':
        return <FDPsView onOpenExport={handleOpenExport} />;
      case 'research-consultancy':
        return <ResearchConsultancyView onOpenExport={handleOpenExport} />;
      case 'workshops':
        return <WorkshopsView onOpenExport={handleOpenExport} />;
      case 'analytics':
        return (
          <InstitutionalAnalyticsView
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
      case 'reports':
        return <ReportsView onOpenExport={handleOpenExport} />;
      case 'notifications':
        return <NotificationsView onNavigate={setCurrentView} />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onNavigate={setCurrentView}
            onSelectStudent={setSelectedStudent}
            onSelectPartner={setSelectedPartner}
            onOpenExport={handleOpenExport}
            selectedDepartment={selectedDepartment}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-slate-800 font-sans antialiased flex flex-col selection:bg-[#111844] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-68'
        }`}
      >
        {/* Top Floating App Bar */}
        <TopBar
          currentView={currentView}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsGlobalSearchOpen(true)}
          onNavigate={setCurrentView}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
        />

        {/* Dynamic Page View Body */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderView()}
        </main>
      </div>

      {/* Student Details Drawer */}
      <StudentDrawer
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* Partner Details / Create MoU Modal */}
      <PartnerModal
        partner={selectedPartner}
        isOpen={!!selectedPartner || isCreatePartnerOpen}
        isCreateMode={isCreatePartnerOpen}
        onClose={() => {
          setSelectedPartner(null);
          setIsCreatePartnerOpen(false);
        }}
        onSavePartner={(newPartner) => {
          setSelectedPartner(newPartner);
          setIsCreatePartnerOpen(false);
        }}
      />

      {/* Global Command Search (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsGlobalSearchOpen(false);
        }}
        onSelectStudent={(student) => {
          setSelectedStudent(student);
          setIsGlobalSearchOpen(false);
        }}
        onSelectPartner={(partner) => {
          setSelectedPartner(partner);
          setIsGlobalSearchOpen(false);
        }}
      />

      {/* Institutional Export Modal */}
      <ExportModal
        isOpen={exportModal.isOpen}
        onClose={() => setExportModal({ isOpen: false })}
        reportTitle={exportModal.title}
      />
    </div>
  );
}
