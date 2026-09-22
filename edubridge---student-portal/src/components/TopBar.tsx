import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  Calendar,
  X,
  Building2,
  Award,
  Users,
  Briefcase,
  Settings,
  LogOut,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import {
  InstitutionProfile,
  AcademiaNotification,
  AcademiaNavTab,
  StudentDirectoryItem,
  InstitutionalCertification
} from '../types';

interface TopBarProps {
  institution: InstitutionProfile;
  activeTab: AcademiaNavTab;
  notifications: AcademiaNotification[];
  students: StudentDirectoryItem[];
  certifications: InstitutionalCertification[];
  onToggleMobileSidebar: () => void;
  onOpenInstitutionProfile: () => void;
  onOpenSettings: () => void;
  onSelectTab: (tab: AcademiaNavTab) => void;
  onSelectStudent?: (student: StudentDirectoryItem) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  academicSession: string;
  onSelectAcademicSession: (session: string) => void;
}

const TAB_TITLES: Record<AcademiaNavTab, { title: string; sectionName: string }> = {
  overview: { title: 'Institution Overview', sectionName: 'Overview' },
  verification: { title: 'Student Credential Verification', sectionName: 'Student Verification' },
  students: { title: 'Students Directory & Academic Records', sectionName: 'Students' },
  certifications: { title: 'Institutional Certifications Ledger', sectionName: 'Certifications' },
  internships: { title: 'Internships & Technical Training', sectionName: 'Internships & Training' },
  collaboration: { title: 'Industry Collaboration & Corporate MoUs', sectionName: 'Industry Collaboration' },
  reports: { title: 'Accreditation Reports & Placement Analytics', sectionName: 'Reports & Analytics' }
};

export const TopBar: React.FC<TopBarProps> = ({
  institution,
  activeTab,
  notifications,
  students,
  certifications,
  onToggleMobileSidebar,
  onOpenInstitutionProfile,
  onOpenSettings,
  onSelectTab,
  onSelectStudent,
  searchQuery,
  onSearchChange,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  academicSession,
  onSelectAcademicSession
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (sessionRef.current && !sessionRef.current.contains(event.target as Node)) {
        setShowSessionDropdown(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const matchedStudents = trimmedQuery
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmedQuery) ||
          s.rollNo.toLowerCase().includes(trimmedQuery) ||
          s.department.toLowerCase().includes(trimmedQuery) ||
          s.topSkills.some((sk) => sk.toLowerCase().includes(trimmedQuery))
      ).slice(0, 4)
    : [];

  const matchedCerts = trimmedQuery
    ? certifications.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmedQuery) ||
          c.credentialId.toLowerCase().includes(trimmedQuery) ||
          c.issuingBody.toLowerCase().includes(trimmedQuery) ||
          c.studentName.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const hasSearchResults = trimmedQuery.length > 0 && (matchedStudents.length > 0 || matchedCerts.length > 0);

  const currentTabMeta = TAB_TITLES[activeTab] || { title: 'Institution Overview', sectionName: 'Overview' };

  return (
    <header className="sticky top-0 z-30 px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      {/* Floating Translucent Glass Surface */}
      <div className="bg-white/80 backdrop-blur-xl border border-[#4B5694]/16 shadow-[0_8px_30px_rgba(17,24,68,0.06)] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 transition-all">
        {/* Desktop & Tablet Layout / Mobile Row 1 */}
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Mobile Menu Toggle + Breadcrumb / Active Section Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="topbar-mobile-menu-btn"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-[#4B5694] hover:text-[#111844] hover:bg-[#7288AE]/12 transition-colors cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              {/* Breadcrumb Hierarchy */}
              <div className="flex items-center gap-1.5 text-xs text-[#7288AE] font-medium truncate">
                <span className="truncate hover:text-[#111844] transition-colors">{institution.name}</span>
                <span className="text-[#7288AE]/60">/</span>
                <span className="text-[#4B5694] font-semibold truncate">{currentTabMeta.sectionName}</span>
              </div>
              {/* Main Title */}
              <h1 className="text-base sm:text-lg font-extrabold text-[#111844] tracking-tight truncate leading-tight mt-0.5">
                {currentTabMeta.title}
              </h1>
            </div>
          </div>

          {/* Center: Global Search (Desktop & Tablet) */}
          <div ref={searchContainerRef} className="hidden md:block flex-1 max-w-md relative">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                id="topbar-global-search-desktop"
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search students, roll no, certs..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/70 hover:bg-white text-[#111844] placeholder-[#7288AE] text-xs font-medium border border-[#4B5694]/18 focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 focus:outline-none transition-all shadow-2xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7288AE] hover:text-[#111844] p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#7288AE]/70 bg-[#7288AE]/10 px-1.5 py-0.5 rounded border border-[#7288AE]/20 pointer-events-none">
                  ⌘K
                </span>
              )}
            </div>

            {/* Floating Search Results Dropdown */}
            {isSearchFocused && trimmedQuery.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-[#4B5694]/18 rounded-2xl shadow-[0_12px_32px_rgba(17,24,68,0.12)] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[380px] overflow-y-auto">
                {hasSearchResults ? (
                  <div className="space-y-3">
                    {/* Students Matches */}
                    {matchedStudents.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#7288AE] px-2.5 pb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-[#4B5694]" />
                            Students ({matchedStudents.length})
                          </span>
                        </div>
                        <div className="space-y-1">
                          {matchedStudents.map((s) => (
                            <div
                              key={s.id}
                              onClick={() => {
                                onSelectTab('students');
                                if (onSelectStudent) onSelectStudent(s);
                                setIsSearchFocused(false);
                              }}
                              className="px-2.5 py-2 rounded-xl hover:bg-[#4B5694]/10 transition-colors cursor-pointer flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-[#4B5694]/20 shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] truncate">
                                    {s.name}
                                  </div>
                                  <div className="text-[10px] text-[#7288AE] truncate">
                                    {s.rollNo} • {s.department}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] shrink-0">
                                CGPA {s.cgpa}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications Matches */}
                    {matchedCerts.length > 0 && (
                      <div className="pt-2 border-t border-[#4B5694]/10">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#7288AE] px-2.5 pb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Award className="w-3 h-3 text-[#4B5694]" />
                            Certifications ({matchedCerts.length})
                          </span>
                        </div>
                        <div className="space-y-1">
                          {matchedCerts.map((c) => (
                            <div
                              key={c.id}
                              onClick={() => {
                                onSelectTab('certifications');
                                setIsSearchFocused(false);
                              }}
                              className="px-2.5 py-2 rounded-xl hover:bg-[#4B5694]/10 transition-colors cursor-pointer flex items-center justify-between group"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] truncate">
                                  {c.title}
                                </div>
                                <div className="text-[10px] text-[#7288AE] truncate">
                                  {c.credentialId} • {c.studentName} ({c.rollNo})
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                                Verified
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-[#7288AE]">
                    No matching records found for &ldquo;<span className="font-semibold text-[#111844]">{trimmedQuery}</span>&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Academic Session Pill + Notifications + Profile Control */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Academic Session Selector Pill */}
            <div ref={sessionRef} className="relative hidden sm:block">
              <button
                id="topbar-session-selector-btn"
                onClick={() => setShowSessionDropdown(!showSessionDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/75 hover:bg-white text-[#111844] border border-[#4B5694]/18 hover:border-[#4B5694]/40 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                title="Active Academic Session"
              >
                <Calendar className="w-3.5 h-3.5 text-[#4B5694] group-hover:text-[#111844] transition-colors" />
                <span>{academicSession}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7288AE]" />
              </button>

              {showSessionDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-[#4B5694]/18 rounded-2xl shadow-[0_12px_30px_rgba(17,24,68,0.12)] p-2 z-50 animate-in fade-in duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7288AE] px-2.5 py-1">
                    Academic Sessions
                  </div>
                  {['2025–26', '2024–25', '2023–24'].map((session) => (
                    <button
                      key={session}
                      onClick={() => {
                        onSelectAcademicSession(session);
                        setShowSessionDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        academicSession === session
                          ? 'bg-[#4B5694] text-white'
                          : 'text-[#111844] hover:bg-[#7288AE]/12'
                      }`}
                    >
                      <span>{session}</span>
                      {academicSession === session && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-white font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Button & Glass Dropdown */}
            <div ref={notifRef} className="relative">
              <button
                id="topbar-notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 sm:p-2.5 rounded-xl text-[#4B5694] hover:text-[#111844] hover:bg-[#7288AE]/12 active:bg-[#7288AE]/20 transition-all cursor-pointer"
                aria-label="Institutional Notifications"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 ring-2 ring-white"></span>
                  </span>
                )}
              </button>

              {/* Notification Popover Surface */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-[#4B5694]/18 rounded-2xl shadow-[0_16px_36px_rgba(17,24,68,0.14)] z-50 animate-in fade-in duration-150 overflow-hidden">
                  <div className="p-4 border-b border-[#4B5694]/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-[#111844] text-sm tracking-tight">Institutional Notifications</h3>
                      <p className="text-[11px] text-[#7288AE]">
                        {unreadCount > 0 ? `${unreadCount} unread actionable alerts` : 'All alerts acknowledged'}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-[11px] text-[#4B5694] hover:text-[#111844] font-bold hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#4B5694]/8">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#7288AE]">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => onMarkNotificationRead(notif.id)}
                          className={`p-3.5 hover:bg-[#7288AE]/8 transition-colors cursor-pointer ${
                            !notif.read ? 'bg-[#EAE0CF]/25' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 shrink-0">
                              {notif.type === 'verification' ? (
                                <span className="w-2 h-2 rounded-full bg-amber-500 block"></span>
                              ) : notif.type === 'partner' ? (
                                <span className="w-2 h-2 rounded-full bg-[#4B5694] block"></span>
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-xs font-bold text-[#111844] truncate">{notif.title}</h4>
                                <span className="text-[10px] text-[#7288AE] shrink-0">{notif.time}</span>
                              </div>
                              <p className="text-xs text-[#4B5694] mt-0.5 line-clamp-2">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-[#F8F9FC] border-t border-[#4B5694]/10 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectTab('verification');
                      }}
                      className="text-xs font-bold text-[#4B5694] hover:text-[#111844] transition-colors cursor-pointer"
                    >
                      View All 18 Pending Verifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Control (Dean Profile) */}
            <div ref={userRef} className="relative">
              <button
                id="topbar-user-profile-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/70 hover:bg-white border border-[#4B5694]/18 hover:border-[#4B5694]/40 transition-all shadow-2xs cursor-pointer group"
              >
                <img
                  src={institution.deanAvatar}
                  alt={institution.deanName}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-[#4B5694]/25 shrink-0"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-extrabold text-[#111844] group-hover:text-[#4B5694] transition-colors leading-tight">
                    {institution.deanName}
                  </div>
                  <div className="text-[10px] text-[#7288AE] font-semibold truncate max-w-[130px]">
                    Dean, Academic Affairs
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#7288AE] hidden sm:block group-hover:text-[#111844] transition-colors" />
              </button>

              {/* Profile Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-[#4B5694]/18 rounded-2xl shadow-[0_16px_36px_rgba(17,24,68,0.14)] p-2 z-50 animate-in fade-in duration-150">
                  <div className="p-3 border-b border-[#4B5694]/10">
                    <div className="text-xs font-extrabold text-[#111844]">{institution.deanName}</div>
                    <div className="text-[11px] text-[#4B5694] font-medium">{institution.deanRole}</div>
                    <div className="text-[10px] text-[#7288AE] mt-0.5">{institution.deanEmail}</div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] text-[10px] font-bold">
                      <GraduationCap className="w-3 h-3 text-[#111844]" />
                      <span>{institution.code}</span>
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenInstitutionProfile();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#4B5694] hover:text-[#111844] hover:bg-[#7288AE]/12 transition-colors cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#7288AE]" />
                      <span>Institution Profile & NIRF</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenSettings();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#4B5694] hover:text-[#111844] hover:bg-[#7288AE]/12 transition-colors cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#7288AE]" />
                      <span>Administration Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSelectTab('reports');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#4B5694] hover:text-[#111844] hover:bg-[#7288AE]/12 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#7288AE]" />
                      <span>NAAC Criterion 5 Audits</span>
                    </button>
                  </div>

                  <div className="pt-1 mt-1 border-t border-[#4B5694]/10">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        alert('Logged out from EduBridge Academia Portal. Reloading session...');
                        window.location.reload();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Row 2: Full-Width Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="topbar-global-search-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search students, roll no, certs..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/70 text-[#111844] placeholder-[#7288AE] text-xs font-medium border border-[#4B5694]/18 focus:border-[#4B5694] focus:outline-none shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7288AE] p-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
