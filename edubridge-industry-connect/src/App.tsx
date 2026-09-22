import React, { useState } from 'react';
import {
  NavSection,
  StudentTalent,
  Opportunity,
  Applicant,
  SkillDemandItem,
  AcademiaPartner,
  EngagementItem,
  CompanyProfile,
  ApplicantStage,
} from './types';
import {
  INITIAL_COMPANY,
  INITIAL_TALENTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICANTS,
  INITIAL_SKILL_DEMANDS,
  INITIAL_ACADEMIA_PARTNERS,
  INITIAL_ENGAGEMENTS,
} from './data/mockData';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

// Modals
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { CreateOpportunityModal } from './components/modals/CreateOpportunityModal';
import { CurriculumFeedbackModal } from './components/modals/CurriculumFeedbackModal';
import { AddSkillRequirementModal } from './components/modals/AddSkillRequirementModal';

// Views
import { OverviewDashboard } from './components/views/OverviewDashboard';
import { TalentDiscovery } from './components/views/TalentDiscovery';
import { OpportunitiesView } from './components/views/OpportunitiesView';
import { ApplicantsPipeline } from './components/views/ApplicantsPipeline';
import { SkillRequirementsView } from './components/views/SkillRequirementsView';
import { AcademiaConnectView } from './components/views/AcademiaConnectView';
import { EngagementsView } from './components/views/EngagementsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { CompanyProfileView } from './components/views/CompanyProfileView';

export default function App() {
  // Navigation State
  const [currentSection, setCurrentSection] = useState<NavSection>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Core Data States
  const [company, setCompany] = useState<CompanyProfile>(INITIAL_COMPANY);
  const [talents, setTalents] = useState<StudentTalent[]>(INITIAL_TALENTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [skillDemands, setSkillDemands] = useState<SkillDemandItem[]>(INITIAL_SKILL_DEMANDS);
  const [academiaPartners, setAcademiaPartners] = useState<AcademiaPartner[]>(INITIAL_ACADEMIA_PARTNERS);
  const [engagements, setEngagements] = useState<EngagementItem[]>(INITIAL_ENGAGEMENTS);

  // Shortlist State
  const [shortlistedTalentIds, setShortlistedTalentIds] = useState<string[]>([
    'tal-1',
    'tal-2',
  ]);

  // Modal States
  const [selectedTalentForModal, setSelectedTalentForModal] = useState<StudentTalent | null>(null);
  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState<boolean>(false);
  const [selectedPartnerForFeedback, setSelectedPartnerForFeedback] = useState<AcademiaPartner | null>(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handlers
  const handleToggleShortlist = (talentId: string) => {
    setShortlistedTalentIds((prev) => {
      const exists = prev.includes(talentId);
      if (exists) {
        showToast('Removed student candidate from shortlist');
        return prev.filter((id) => id !== talentId);
      } else {
        const talent = talents.find((t) => t.id === talentId);
        showToast(`Shortlisted ${talent?.name || 'candidate'} for review`);
        return [...prev, talentId];
      }
    });
  };

  const handleAssignToOpportunity = (talentId: string, opportunityId: string) => {
    const talent = talents.find((t) => t.id === talentId);
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!talent || !opp) return;

    // Check if applicant already exists
    const existing = applicants.find((a) => a.talentId === talentId && a.opportunityId === opportunityId);
    if (existing) {
      showToast(`${talent.name} is already registered for ${opp.title}`);
      return;
    }

    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      talentId: talent.id,
      talent: talent,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      opportunityType: opp.type,
      appliedDate: 'Just now',
      stage: 'Shortlisted',
      skillMatchPercent: talent.skillMatchScore,
      matchedSkills: talent.skills.map((s) => s.name),
      missingSkills: [],
      notes: 'Directly assigned to pipeline by technical recruiter',
    };

    setApplicants((prev) => [newApplicant, ...prev]);
    showToast(`Added ${talent.name} to "${opp.title}" hiring pipeline`);
  };

  const handleCreateOpportunity = (newOpp: Opportunity) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast(`Successfully published opportunity: "${newOpp.title}"`);
    setIsCreateOpportunityOpen(false);
  };

  const handleUpdateApplicantStage = (applicantId: string, newStage: ApplicantStage) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, stage: newStage } : app))
    );
    const applicant = applicants.find((a) => a.id === applicantId);
    showToast(
      `Moved ${applicant?.talent.name || 'candidate'} to "${newStage}" stage in recruitment pipeline`
    );
  };

  const handleSendCurriculumFeedback = (partnerId: string, feedback: string, suggestedElectives: string) => {
    setAcademiaPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              curriculumFeedbackSent: true,
              collaborationStatus: 'Curriculum Aligned',
            }
          : p
      )
    );
    const partner = academiaPartners.find((p) => p.id === partnerId);
    showToast(`Curriculum feedback dispatched to ${partner?.shortName || 'University'} Academic Council`);
    setSelectedPartnerForFeedback(null);
  };

  const handleAddSkillDemand = (item: SkillDemandItem) => {
    setSkillDemands((prev) => [item, ...prev]);
    showToast(`Added industry skill demand: "${item.skillName}" (+${item.skillGapPercent}% gap)`);
    setIsAddSkillModalOpen(false);
  };

  const handleAddEngagement = (eng: EngagementItem) => {
    setEngagements((prev) => [eng, ...prev]);
    showToast(`Scheduled institutional engagement: "${eng.title}"`);
  };

  const handleInitiateMoU = (partnerId: string) => {
    setAcademiaPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              collaborationStatus: 'Active MoU',
            }
          : p
      )
    );
    const partner = academiaPartners.find((p) => p.id === partnerId);
    showToast(`Bilateral Industry-Academia MoU formalized with ${partner?.shortName || 'College'}`);
  };

  const handleUpdateCompany = (updated: Partial<CompanyProfile>) => {
    setCompany((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        company={company}
        onOpenCreateOpportunity={() => setIsCreateOpportunityOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        shortlistedCount={shortlistedTalentIds.length}
        applicantsCount={applicants.length}
      />

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-200">
        {/* Top Navbar */}
        <Navbar
          onToggleMobileMenu={() => setIsMobileSidebarOpen((prev) => !prev)}
          company={company}
          onNavigate={setCurrentSection}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onOpenCreateOpportunity={() => setIsCreateOpportunityOpen(true)}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentSection === 'overview' && (
            <OverviewDashboard
              company={company}
              talents={talents}
              opportunities={opportunities}
              applicants={applicants}
              skillDemands={skillDemands}
              academiaPartners={academiaPartners}
              onNavigate={setCurrentSection}
              onSelectTalent={setSelectedTalentForModal}
              onOpenCreateOpportunity={() => setIsCreateOpportunityOpen(true)}
            />
          )}

          {currentSection === 'talent-discovery' && (
            <TalentDiscovery
              talents={talents}
              onSelectTalent={setSelectedTalentForModal}
              shortlistedTalentIds={shortlistedTalentIds}
              onToggleShortlist={handleToggleShortlist}
              opportunities={opportunities}
            />
          )}

          {currentSection === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              onOpenCreateOpportunity={() => setIsCreateOpportunityOpen(true)}
              onNavigate={setCurrentSection}
            />
          )}

          {currentSection === 'applicants' && (
            <ApplicantsPipeline
              applicants={applicants}
              opportunities={opportunities}
              onUpdateApplicantStage={handleUpdateApplicantStage}
              onSelectTalent={setSelectedTalentForModal}
            />
          )}

          {currentSection === 'skill-requirements' && (
            <SkillRequirementsView
              skillDemands={skillDemands}
              onOpenAddSkillDemand={() => setIsAddSkillModalOpen(true)}
              onNavigate={setCurrentSection}
            />
          )}

          {currentSection === 'academia-connect' && (
            <AcademiaConnectView
              academiaPartners={academiaPartners}
              onOpenFeedbackModal={setSelectedPartnerForFeedback}
              onOpenCreateOpportunity={() => setIsCreateOpportunityOpen(true)}
              onNavigate={setCurrentSection}
              onInitiateMoU={handleInitiateMoU}
            />
          )}

          {currentSection === 'engagements' && (
            <EngagementsView
              engagements={engagements}
              academiaPartners={academiaPartners}
              onAddEngagement={handleAddEngagement}
            />
          )}

          {currentSection === 'analytics' && (
            <AnalyticsView
              skillDemands={skillDemands}
              academiaPartners={academiaPartners}
              opportunities={opportunities}
            />
          )}

          {currentSection === 'company-profile' && (
            <CompanyProfileView
              company={company}
              academiaPartners={academiaPartners}
              onUpdateCompany={handleUpdateCompany}
            />
          )}
        </main>
      </div>

      {/* Interactive Global Modals */}

      {/* 1. Student Verified Competency Profile Modal */}
      {selectedTalentForModal && (
        <StudentProfileModal
          talent={selectedTalentForModal}
          onClose={() => setSelectedTalentForModal(null)}
          isShortlisted={shortlistedTalentIds.includes(selectedTalentForModal.id)}
          onShortlist={handleToggleShortlist}
          opportunities={opportunities}
          onAssignToOpportunity={handleAssignToOpportunity}
        />
      )}

      {/* 2. Create Opportunity 5-Step Wizard Modal */}
      <CreateOpportunityModal
        isOpen={isCreateOpportunityOpen}
        onClose={() => setIsCreateOpportunityOpen(false)}
        onCreateOpportunity={handleCreateOpportunity}
      />

      {/* 3. Curriculum Feedback Modal */}
      <CurriculumFeedbackModal
        partner={selectedPartnerForFeedback}
        onClose={() => setSelectedPartnerForFeedback(null)}
        onSubmitFeedback={handleSendCurriculumFeedback}
      />

      {/* 4. Add Skill Demand Modal */}
      <AddSkillRequirementModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAddSkillDemand={handleAddSkillDemand}
      />

      {/* Floating Action Feedback Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
