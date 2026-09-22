import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Building2,
  ShieldCheck,
  Check,
  ExternalLink,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';
import { CompanyProfile, NavSection } from '../../types';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  company: CompanyProfile;
  onNavigate: (section: NavSection) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCreateOpportunity: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileMenu,
  company,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenCreateOpportunity,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showPortalInfo, setShowPortalInfo] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'COEP Pune endorsed syllabus feedback',
      time: '12m ago',
      desc: 'Dean Dr. Chaskar reviewed Kubernetes & Cloud Telemetry electives.',
      unread: true,
      action: 'academia-connect' as NavSection,
    },
    {
      id: 2,
      title: 'Aarav Sharma cleared Live Sandbox assessment',
      time: '1h ago',
      desc: 'Score 94% on Distributed Systems Diagnostic. Ready for interview.',
      unread: true,
      action: 'applicants' as NavSection,
    },
    {
      id: 3,
      title: 'New High Skill-Match Applicant',
      time: '3h ago',
      desc: 'Ananya Deshmukh (IIT Bombay) applied to GenAI Research Associate (97% match).',
      unread: false,
      action: 'applicants' as NavSection,
    },
    {
      id: 4,
      title: 'MoU Milestone Completed',
      time: '1d ago',
      desc: 'CEG Anna University completed 45-faculty FDP in Embedded RTOS.',
      unread: false,
      action: 'engagements' as NavSection,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search verified skills, students, colleges, or opportunities..."
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Enterprise Skill Bridge Tag */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50/80 border border-indigo-200/60 text-indigo-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <span>Academia-Industry Skill Bridge Active</span>
        </div>
      </div>

      {/* Right: Actions, Notifications, & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Companion Ecosystem Switcher */}
        <button
          onClick={() => setShowPortalInfo(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          title="EduBridge Ecosystem"
        >
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>EduBridge Portals</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Industry Notifications</h3>
                  <p className="text-[11px] text-slate-500">Skill verifications & academia updates</p>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded">
                  2 new
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onNavigate(n.action);
                      setShowNotifications(false);
                    }}
                    className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                      n.unread ? 'bg-indigo-50/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    onNavigate('applicants');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View All Recruitment Alerts →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Company Switcher / Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-all text-left"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-7 h-7 rounded-lg object-cover border border-slate-200 shadow-2xs"
            />
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 leading-none">
                  {company.name.split(' ')[0]} (TCS)
                </span>
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Enterprise Portal</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showCompanyMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border border-slate-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{company.name}</p>
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  {company.verificationBadge}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">CIN: {company.cin}</p>
              </div>

              <div className="py-1 text-xs">
                <button
                  onClick={() => {
                    onNavigate('company-profile');
                    setShowCompanyMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Company Profile & Team</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('skill-requirements');
                    setShowCompanyMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <span>Skill Demand Mapping</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('analytics');
                    setShowCompanyMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  <span>Talent & Skill Analytics</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100 px-4 py-2">
                <div className="text-[11px] text-slate-500">
                  Signed in as: <span className="font-semibold text-slate-700">campus.collaborations@tcs.com</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EduBridge Ecosystem Modal */}
      {showPortalInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  EB
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">EduBridge Unified Ecosystem</h3>
                  <p className="text-xs text-slate-500">Enterprise Skill Mapping & Placement Platform</p>
                </div>
              </div>
              <button
                onClick={() => setShowPortalInfo(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              EduBridge interconnects three primary stakeholders using a synchronized schema and shared competency framework:
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  🏢
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-900">Industry Portal (Active)</span>
                    <span className="text-[10px] bg-indigo-200 text-indigo-800 font-bold px-1.5 py-0.2 rounded">
                      You are here
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Define technical skill demand, discover verified student talent, create opportunities, and collaborate with universities on curricula.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-start gap-3 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  🎓
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">Student Portal (Companion Reference)</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Students take proctored diagnostic skill tests, showcase code repositories, apply for verified internships, and bridge career readiness gaps.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-start gap-3 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  🏛️
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">Academia / University Portal</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Institutes view industry demand gaps, adapt syllabi under NEP 2020, manage student placement drives, and track corporate MoUs.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPortalInfo(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Continue to Industry Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
