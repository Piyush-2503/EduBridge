import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Award,
  Briefcase,
  Building2,
  BarChart3,
  GraduationCap,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { AcademiaNavTab, InstitutionProfile } from '../types';

interface SidebarProps {
  currentTab: AcademiaNavTab;
  onSelectTab: (tab: AcademiaNavTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  institution: InstitutionProfile;
  pendingVerificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenProfile,
  onOpenSettings,
  institution,
  pendingVerificationsCount
}) => {
  const navItems: {
    id: AcademiaNavTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard
    },
    {
      id: 'verification',
      label: 'Student Verification',
      icon: UserCheck,
      badge: pendingVerificationsCount > 0 ? `${pendingVerificationsCount} Pending` : 'Clear',
      badgeColor: pendingVerificationsCount > 0 ? 'bg-amber-500/20 text-amber-200 border-amber-400/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      badge: '2,840',
      badgeColor: 'bg-[#4B5694]/40 text-[#EAE0CF] border-[#7288AE]/30'
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: Award,
      badge: '9 New',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
    },
    {
      id: 'internships',
      label: 'Internships & Training',
      icon: Briefcase,
      badge: '14 Active',
      badgeColor: 'bg-[#4B5694]/40 text-blue-200 border-[#7288AE]/30'
    },
    {
      id: 'collaboration',
      label: 'Industry Collaboration',
      icon: Building2,
      badge: '38 Partners',
      badgeColor: 'bg-[#EAE0CF]/20 text-[#EAE0CF] border-[#EAE0CF]/30'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: 'NIRF Ready',
      badgeColor: 'bg-[#7288AE]/30 text-white border-[#7288AE]/40'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#111844]/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="academia-portal-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#111844] text-white border-r border-[#4B5694]/25 shadow-2xl flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-68'} w-72`}
      >
        {/* Top Header & Brand Identity */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#4B5694]/25 shrink-0">
          <div
            onClick={() => {
              onSelectTab('overview');
              if (isOpen) onCloseMobile();
            }}
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
          >
            {/* Logo Mark with EduBridge Palette Gradient */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#111844] via-[#4B5694] to-[#7288AE] p-0.5 shadow-md flex items-center justify-center shrink-0 ring-1 ring-[#EAE0CF]/30 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-[10px] bg-[#111844] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#EAE0CF]" />
              </div>
            </div>

            {/* Brand Title & Academia Tag (hidden when collapsed) */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tracking-tight text-white leading-none">
                    EduBridge
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#4B5694] text-[#EAE0CF] border border-[#7288AE]/40 leading-none">
                    Academia
                  </span>
                </div>
                <span className="text-[10px] text-[#7288AE] font-medium tracking-wide mt-1 truncate">
                  Institutional Governance
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[#7288AE] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Collapse / Expand Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-[#7288AE] hover:text-white hover:bg-[#4B5694]/30 border border-[#4B5694]/30 transition-all cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Institution Info Card (Visible when expanded) */}
        {!isCollapsed && (
          <div className="mx-3 my-3 p-3 rounded-xl bg-white/5 border border-[#4B5694]/30 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{institution.name}</div>
                <div className="text-[10px] text-[#7288AE] truncate mt-0.5">{institution.campus}</div>
              </div>
              <div className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAE0CF]/15 text-[#EAE0CF] border border-[#EAE0CF]/30">
                A++
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#7288AE]">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                NIRF #{institution.nirfRank}
              </span>
              <span className="text-[#EAE0CF] font-semibold">{institution.academicSession}</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {!isCollapsed && (
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7288AE]/80">
              Academic Operations
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (isOpen) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group cursor-pointer ${
                  isActive
                    ? 'bg-[#4B5694] text-white shadow-md shadow-black/20'
                    : 'text-[#7288AE] hover:text-white hover:bg-white/6'
                } ${isCollapsed ? 'justify-center px-2' : 'justify-start'}`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Icon with warm cream accent when active */}
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                    isActive ? 'text-[#EAE0CF]' : 'text-[#7288AE] group-hover:text-white'
                  }`}
                />

                {/* Label & Badge (when expanded) */}
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ml-1.5 ${
                          item.badgeColor || 'bg-white/10 text-white border-white/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Collapsed Tooltip Indicator */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#111844]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Controls / Settings & Profile */}
        <div className="p-3 border-t border-[#4B5694]/25 space-y-1 shrink-0 bg-[#111844]/80">
          <button
            id="sidebar-institution-profile-btn"
            onClick={() => {
              onOpenProfile();
              if (isOpen) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#7288AE] hover:text-white hover:bg-white/6 transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={isCollapsed ? 'Institution Profile' : undefined}
          >
            <ShieldCheck className="w-4 h-4 text-[#7288AE]" />
            {!isCollapsed && <span className="truncate">Institution Profile</span>}
          </button>

          <button
            id="sidebar-settings-btn"
            onClick={() => {
              onOpenSettings();
              if (isOpen) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#7288AE] hover:text-white hover:bg-white/6 transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={isCollapsed ? 'Settings' : undefined}
          >
            <Settings className="w-4 h-4 text-[#7288AE]" />
            {!isCollapsed && <span className="truncate">Settings & Sessions</span>}
          </button>

          {/* User Profile Mini Block when expanded */}
          {!isCollapsed && (
            <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={institution.deanAvatar}
                  alt={institution.deanName}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/20 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{institution.deanName}</div>
                  <div className="text-[10px] text-[#7288AE] truncate">Dean, Academics</div>
                </div>
              </div>
              <button
                onClick={() => {
                  alert('Signing out from EduBridge Academia Portal...');
                  window.location.reload();
                }}
                className="p-1.5 rounded-lg text-[#7288AE] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
