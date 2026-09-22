import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  User,
  Building2,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  ArrowRight,
  Command,
} from 'lucide-react';
import { ViewId, Student, IndustryPartner } from '../../types';
import {
  STUDENTS_DIRECTORY_DATA,
  INDUSTRY_PARTNERS_DATA,
  SKILL_INTELLIGENCE_DATA,
  PLACEMENT_DRIVES_DATA,
  FACULTY_OPPORTUNITIES_DATA,
  REPORTS_CATALOG_DATA,
} from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
  onSelectStudent: (student: Student) => void;
  onSelectPartner?: (partner: IndustryPartner) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectStudent,
  onSelectPartner,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingStudents = cleanQuery
    ? STUDENTS_DIRECTORY_DATA.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.rollNo.toLowerCase().includes(cleanQuery) ||
          s.department.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : STUDENTS_DIRECTORY_DATA.slice(0, 3);

  const matchingPartners = cleanQuery
    ? INDUSTRY_PARTNERS_DATA.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.industry.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : INDUSTRY_PARTNERS_DATA.slice(0, 2);

  const matchingSkills = cleanQuery
    ? SKILL_INTELLIGENCE_DATA.filter(
        (sk) =>
          sk.skill.toLowerCase().includes(cleanQuery) ||
          sk.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : SKILL_INTELLIGENCE_DATA.slice(0, 2);

  const matchingDrives = cleanQuery
    ? PLACEMENT_DRIVES_DATA.filter(
        (d) =>
          d.company.toLowerCase().includes(cleanQuery) ||
          d.role.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const matchingFaculty = cleanQuery
    ? FACULTY_OPPORTUNITIES_DATA.filter(
        (f) =>
          f.title.toLowerCase().includes(cleanQuery) ||
          f.organization.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const matchingReports = cleanQuery
    ? REPORTS_CATALOG_DATA.filter((r) =>
        r.title.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const hasResults =
    matchingStudents.length > 0 ||
    matchingPartners.length > 0 ||
    matchingSkills.length > 0 ||
    matchingDrives.length > 0 ||
    matchingFaculty.length > 0 ||
    matchingReports.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, industry partners, skills, placements, reports..."
            className="w-full bg-transparent text-sm text-[#111844] placeholder-slate-400 focus:outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5 text-xs text-slate-600">
          {!hasResults ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by student name, company, or skill.</p>
            </div>
          ) : (
            <>
              {/* Students Section */}
              {matchingStudents.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Students Directory
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('students');
                        onClose();
                      }}
                      className="text-[#4B5694] hover:underline"
                    >
                      View all directory →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchingStudents.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => {
                          onSelectStudent(st);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FD] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-semibold text-slate-800 group-hover:text-[#111844]">
                              {st.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {st.rollNo} • {st.department}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            {st.skillReadiness}% Ready
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#4B5694] transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industry Partners */}
              {matchingPartners.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Industry Partners & MoUs
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('partners');
                        onClose();
                      }}
                      className="text-[#4B5694] hover:underline"
                    >
                      View partners →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchingPartners.map((pt) => (
                      <div
                        key={pt.id}
                        onClick={() => {
                          if (onSelectPartner) {
                            onSelectPartner(pt);
                          } else {
                            onNavigate('partners');
                          }
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FD] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base">
                            {pt.logo}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 group-hover:text-[#111844]">
                              {pt.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {pt.industry} • {pt.tier}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-[#4B5694] font-medium">
                          {pt.activeOpportunities} Active Opps
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Intelligence */}
              {matchingSkills.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Skill Benchmarks & Gaps
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('skill-gap');
                        onClose();
                      }}
                      className="text-[#4B5694] hover:underline"
                    >
                      Skill analysis →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {matchingSkills.map((sk) => (
                      <div
                        key={sk.id}
                        onClick={() => {
                          onNavigate('skill-gap');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FD] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="font-semibold text-slate-800 group-hover:text-[#111844]">
                            {sk.skill}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Demand: {sk.industryDemand}% | Proficiency: {sk.studentProficiency}%
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          Gap: {sk.gap}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placement Drives */}
              {matchingDrives.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Placement Drives
                  </div>
                  <div className="space-y-1.5">
                    {matchingDrives.map((pd) => (
                      <div
                        key={pd.id}
                        onClick={() => {
                          onNavigate('placements');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FD] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="font-semibold text-slate-800 group-hover:text-[#111844]">
                            {pd.company} - {pd.role}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {pd.eligibleCount} Eligible • Package: ₹{pd.packageLpa} LPA
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {pd.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports */}
              {matchingReports.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Institutional Reports
                  </div>
                  <div className="space-y-1.5">
                    {matchingReports.map((rp) => (
                      <div
                        key={rp.id}
                        onClick={() => {
                          onNavigate('reports');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F9FD] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div className="truncate pr-4">
                          <div className="font-semibold text-slate-800 truncate group-hover:text-[#111844]">
                            {rp.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Format: {rp.format} • {rp.period}
                          </div>
                        </div>
                        <span className="text-xs text-[#4B5694] shrink-0 font-medium">Download</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↑↓</kbd>
            <span>Select:</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↵</kbd>
          </span>
          <span>Ministry of Ayush • AIIA Institutional Portal</span>
        </div>
      </div>
    </div>
  );
};
