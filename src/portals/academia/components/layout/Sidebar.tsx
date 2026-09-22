import React from 'react';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  TrendingUp,
  GraduationCap,
  Building2,
  Briefcase,
  Target,
  FolderGit2,
  Handshake,
  Award,
  BookMarked,
  FlaskConical,
  Presentation,
  BarChart3,
  FileSpreadsheet,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
  Sparkles,
  X,
} from 'lucide-react';
import { ViewId } from '../../types';
import { INSTITUTION_INFO } from '../../data/mockData';

interface SidebarProps {
  currentView: ViewId;
  onSelectView: (view: ViewId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: ViewId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: {
      text: string;
      color: 'blue' | 'amber' | 'emerald' | 'rose';
    };
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'STUDENT INTELLIGENCE',
      items: [
        { id: 'students', label: 'Student Directory', icon: Users },
        { id: 'skill-intelligence', label: 'Skill Intelligence', icon: BrainCircuit },
        {
          id: 'skill-gap',
          label: 'Skill Gap Analysis',
          icon: TrendingUp,
          badge: { text: '3 Alerts', color: 'amber' },
        },
        { id: 'learning-training', label: 'Learning & Training', icon: GraduationCap },
      ],
    },
    {
      title: 'INDUSTRY & CAREER',
      items: [
        {
          id: 'partners',
          label: 'Industry Partners',
          icon: Building2,
          badge: { text: '86 Partners', color: 'blue' },
        },
        {
          id: 'internships',
          label: 'Internships',
          icon: Briefcase,
          badge: { text: '18 Pending', color: 'amber' },
        },
        {
          id: 'placements',
          label: 'Placements',
          icon: Target,
          badge: { text: '8 Drives', color: 'emerald' },
        },
        { id: 'projects', label: 'Industry Projects', icon: FolderGit2 },
      ],
    },
    {
      title: 'ACADEMIA–INDUSTRY',
      items: [
        { id: 'collaboration', label: 'Collaboration Hub', icon: Handshake },
        {
          id: 'faculty-opportunities',
          label: 'Faculty Opportunities',
          icon: Award,
          badge: { text: '6 Open', color: 'blue' },
        },
        { id: 'fdps', label: 'FDPs & Training', icon: BookMarked },
        { id: 'research-consultancy', label: 'Research & Consultancy', icon: FlaskConical },
        { id: 'workshops', label: 'Workshops & Lectures', icon: Presentation },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { id: 'analytics', label: 'Institutional Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          badge: { text: '4 New', color: 'rose' },
        },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleItemClick = (id: ViewId) => {
    onSelectView(id);
    onCloseMobile();
  };

  const getBadgeClass = (color: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rose':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'blue':
      default:
        return 'bg-indigo-100 text-[#4B5694] border-indigo-200';
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111844] text-slate-200 select-none">
      {/* BRANDING HEADER */}
      <div className="p-4 border-b border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* Logo Mark */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4B5694] to-[#7288AE] flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
              E
            </div>

            {!isCollapsed && (
              <div className="leading-none min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    EduBridge
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-[#4B5694] text-white uppercase tracking-wider">
                    {INSTITUTION_INFO.badge}
                  </span>
                </div>
                <div className="text-[10px] font-medium text-[#7288AE] mt-1 truncate">
                  {INSTITUTION_INFO.subtitle}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INSTITUTION CONTEXT CARD */}
        {!isCollapsed && (
          <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 shadow-2xs">
            <div className="p-1.5 rounded-lg bg-[#4B5694]/30 text-white shrink-0 mt-0.5">
              <Building className="w-4 h-4 text-[#7288AE]" />
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate">
                  {INSTITUTION_INFO.name}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                Institutional Command Node
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION SECTIONS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#7288AE]">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                      isActive
                        ? 'bg-[#4B5694] text-white shadow-xs font-bold'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                          isActive ? 'text-white' : 'text-[#7288AE] group-hover:text-white'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border shrink-0 ${getBadgeClass(
                          item.badge.color
                        )}`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER META */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between shrink-0 bg-black/10">
          <span className="truncate">EduBridge Platform</span>
          <span className="font-mono text-emerald-400 font-semibold">ONLINE</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 bottom-0 left-0 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-68'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Slide-in */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        >
          <div
            className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] bg-[#111844] shadow-2xl z-50 animate-in slide-in-from-left duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
