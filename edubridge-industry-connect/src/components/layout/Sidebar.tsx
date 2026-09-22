import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  UserCheck,
  FileCode2,
  GraduationCap,
  CalendarDays,
  BarChart3,
  Building2,
  ShieldCheck,
  Plus,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { NavSection, CompanyProfile } from '../../types';

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  company: CompanyProfile;
  onOpenCreateOpportunity: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  shortlistedCount: number;
  applicantsCount: number;
}

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  company,
  onOpenCreateOpportunity,
  isMobileOpen,
  onCloseMobile,
  shortlistedCount,
  applicantsCount,
}) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'talent-discovery',
      label: 'Talent Discovery',
      icon: Users,
      badge: 'Verified',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      icon: Briefcase,
      badge: 5,
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'applicants',
      label: 'Applicants',
      icon: UserCheck,
      badge: applicantsCount,
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'skill-requirements',
      label: 'Skill Requirements',
      icon: FileCode2,
      badge: 'Gaps',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      id: 'academia-connect',
      label: 'Academia Connect',
      icon: GraduationCap,
      badge: company.activeMoUs + ' MoUs',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    { id: 'engagements', label: 'Engagements', icon: CalendarDays },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'company-profile', label: 'Company Profile', icon: Building2 },
  ];

  const handleNavClick = (section: NavSection) => {
    onNavigate(section);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-xs font-bold text-lg tracking-tight">
              EB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">
                  EduBridge
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Industry
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[135px]">
                SIH 2026 • PS-26044
              </p>
            </div>
          </div>
        </div>

        {/* Verified Company Mini Card */}
        <div className="p-3.5 mx-3 mt-3 mb-1 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <img
              src={company.logo}
              alt={company.name}
              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shadow-2xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {company.name}
                </p>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Verified Partner
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="px-3 pt-2 pb-1">
          <button
            onClick={() => {
              onOpenCreateOpportunity();
              onCloseMobile();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Opportunity</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-2 pb-1 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Industry Portal
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-indigo-600'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border border-transparent ${
                      item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Student Portal Switch & Footer */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/70 space-y-2">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">EduBridge Ecosystem</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                Live V2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Synchronized with AICTE & NIRF Academic Networks
            </p>
          </div>

          <button
            onClick={() => handleNavClick('talent-discovery')}
            className="w-full text-left text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white p-2 rounded-lg transition-colors flex items-center justify-between border border-transparent hover:border-slate-200"
          >
            <span className="flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Talent Pool: 1,240 Verified
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </aside>
    </>
  );
};
