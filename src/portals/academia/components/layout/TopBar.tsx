import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Building,
  Sparkles,
  ShieldCheck,
  LogOut,
  Settings,
  ExternalLink,
  Check,
  Calendar,
} from 'lucide-react';
import { ViewId, NotificationItem } from '../../types';
import { INSTITUTION_INFO, DEPARTMENTS_DATA, NOTIFICATIONS_DATA } from '../../data/mockData';

interface TopBarProps {
  currentView: ViewId;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onNavigate: (view: ViewId) => void;
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onOpenMobileMenu,
  onOpenSearch,
  onNavigate,
  selectedDepartment,
  onSelectDepartment,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getViewTitle = (id: ViewId): string => {
    switch (id) {
      case 'dashboard':
        return 'Institutional Command Center';
      case 'students':
        return 'Student Directory & Skills Index';
      case 'skill-intelligence':
        return 'Institutional Skill Intelligence';
      case 'skill-gap':
        return 'Skill Gap & Industry Alignment Audit';
      case 'learning-training':
        return 'Skill Development & Bridge Programs';
      case 'partners':
        return 'Industry Partner Network & MoUs';
      case 'internships':
        return 'Internship Monitoring & Approvals';
      case 'placements':
        return 'Placement Intelligence & Funnel';
      case 'projects':
        return 'Industry Live Projects & Problem Statements';
      case 'collaboration':
        return 'Academia–Industry Collaboration Hub';
      case 'faculty-opportunities':
        return 'Faculty Opportunities & Industrial Immersion';
      case 'fdps':
        return 'Faculty Development Programs (FDPs)';
      case 'research-consultancy':
        return 'Sponsored Research & Consultancy';
      case 'workshops':
        return 'Industry Workshops & Guest Lectures';
      case 'analytics':
        return 'Institutional Analytics & Trends';
      case 'reports':
        return 'Accreditation & Compliance Reports';
      case 'notifications':
        return 'Institutional Notification Feed';
      case 'settings':
        return 'Institutional Portal Settings';
      default:
        return 'Institutional Portal';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile menu button & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#111844] hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-[#111844] tracking-tight truncate">
                {getViewTitle(currentView)}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Apex Node
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
              <span className="font-semibold text-slate-700">{INSTITUTION_INFO.shortName}</span>
              <span className="text-slate-300">•</span>
              <span className="truncate">{INSTITUTION_INFO.academicYear}</span>
            </div>
          </div>
        </div>

        {/* Center/Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Bar button */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 bg-[#F8F9FD] border border-slate-200 hover:border-[#4B5694]/50 rounded-xl text-xs text-slate-400 hover:text-slate-600 transition-all group shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-[#4B5694] transition-colors" />
            <span className="font-medium text-slate-500">Search students, partners, skills, drives...</span>
            <kbd className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono shadow-2xs">
              Ctrl K
            </kbd>
          </button>

          {/* Mobile search icon button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-slate-500 hover:text-[#111844] hover:bg-slate-100 rounded-xl"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Department Filter Selector */}
          <div className="hidden xl:block">
            <select
              value={selectedDepartment}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-[#4B5694] focus:outline-none shadow-2xs cursor-pointer"
            >
              <option value="All Departments">All Departments (Institution-Wide)</option>
              {DEPARTMENTS_DATA.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-[#111844] hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#111844]">Institutional Alerts</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-[#4B5694] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.actionLink) {
                          onNavigate(n.actionLink);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-[#F8F9FD] cursor-pointer transition-colors ${
                        !n.read ? 'bg-slate-50/70 font-medium' : 'text-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            n.urgency === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : n.urgency === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-indigo-100 text-[#4B5694]'
                          }`}
                        >
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <div className="font-semibold text-slate-800 text-xs mb-0.5">{n.title}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      onNavigate('notifications');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-[#111844] hover:underline"
                  >
                    View All Institutional Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <img
                src={INSTITUTION_INFO.adminUser.avatar}
                alt={INSTITUTION_INFO.adminUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300 ring-2 ring-transparent group-hover:ring-[#4B5694]/20 transition-all"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-[#111844] leading-tight">
                  {INSTITUTION_INFO.adminUser.name}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  Dean, Academic & Industry
                </div>
              </div>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <div className="p-4 bg-gradient-to-br from-[#111844] to-[#27347A] text-white">
                  <div className="font-bold text-sm">{INSTITUTION_INFO.adminUser.name}</div>
                  <div className="text-[11px] text-slate-300">{INSTITUTION_INFO.adminUser.role}</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    {INSTITUTION_INFO.adminUser.email}
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      onNavigate('settings');
                      setShowProfile(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-[#F8F9FD] rounded-lg transition-colors font-medium text-left"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Institutional Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('analytics');
                      setShowProfile(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-[#F8F9FD] rounded-lg transition-colors font-medium text-left"
                  >
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>Campus & Faculty Node</span>
                  </button>
                </div>

                <div className="p-2 border-t border-slate-100">
                  <div className="px-3 py-1.5 text-[10px] text-slate-400">
                    EduBridge Academia Node • v4.2.0
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
