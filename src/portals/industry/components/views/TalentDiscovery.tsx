import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  Eye,
  SlidersHorizontal,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Check,
  Plus,
} from 'lucide-react';
import { StudentTalent, Opportunity } from '../../types';

interface TalentDiscoveryProps {
  talents: StudentTalent[];
  onSelectTalent: (talent: StudentTalent) => void;
  shortlistedTalentIds: string[];
  onToggleShortlist: (talentId: string) => void;
  opportunities: Opportunity[];
}

export const TalentDiscovery: React.FC<TalentDiscoveryProps> = ({
  talents,
  onSelectTalent,
  shortlistedTalentIds,
  onToggleShortlist,
  opportunities,
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedCollege, setSelectedCollege] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [minMatchPercent, setMinMatchPercent] = useState<number>(75);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Unique lists for filter dropdowns
  const uniqueRoles = useMemo(() => {
    const roles = Array.from(new Set(talents.map((t) => t.primaryRole)));
    return ['All', ...roles];
  }, [talents]);

  const uniqueColleges = useMemo(() => {
    const colleges = Array.from(new Set(talents.map((t) => t.college)));
    return ['All', ...colleges];
  }, [talents]);

  const uniqueSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    talents.forEach((t) => t.skills.forEach((s) => skillsSet.add(s.name)));
    return ['All', ...Array.from(skillsSet)];
  }, [talents]);

  // Filtered talent list
  const filteredTalents = useMemo(() => {
    return talents.filter((t) => {
      // Text query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesCollege = t.college.toLowerCase().includes(q);
        const matchesRole = t.primaryRole.toLowerCase().includes(q);
        const matchesSkill = t.skills.some((s) => s.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCollege && !matchesRole && !matchesSkill) {
          return false;
        }
      }

      // Role filter
      if (selectedRole !== 'All' && t.primaryRole !== selectedRole) {
        return false;
      }

      // College filter
      if (selectedCollege !== 'All' && t.college !== selectedCollege) {
        return false;
      }

      // Skill filter
      if (selectedSkill !== 'All' && !t.skills.some((s) => s.name === selectedSkill)) {
        return false;
      }

      // Availability filter
      if (selectedAvailability !== 'All' && t.availability !== selectedAvailability) {
        return false;
      }

      // Match Score
      if (t.skillMatchScore < minMatchPercent) {
        return false;
      }

      // Verified only
      if (verifiedOnly && !t.verifiedStatus) {
        return false;
      }

      return true;
    });
  }, [
    talents,
    searchQuery,
    selectedRole,
    selectedCollege,
    selectedSkill,
    selectedAvailability,
    minMatchPercent,
    verifiedOnly,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedCollege('All');
    setSelectedSkill('All');
    setSelectedAvailability('All');
    setMinMatchPercent(75);
    setVerifiedOnly(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Talent Discovery
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Proctored Evidence
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Search pre-screened engineering students with verified GitHub repositories, proctored code benchmarks, and faculty-approved live capstone projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            {filteredTalents.length} Verified Candidates Available
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill (e.g. Kubernetes, Go, PyTorch), role, or university name..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`text-xs font-semibold px-3 py-2.5 rounded-xl border flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                showFilterDrawer
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Advanced Filters</span>
              {(selectedRole !== 'All' ||
                selectedCollege !== 'All' ||
                selectedSkill !== 'All' ||
                selectedAvailability !== 'All' ||
                minMatchPercent > 75) && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`text-xs font-semibold px-3 py-2.5 rounded-xl border flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                verifiedOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Only</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilterDrawer && (
          <div className="pt-3 border-t border-slate-100 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs animate-in fade-in duration-100">
            {/* Role Filter */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Institution</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {uniqueColleges.map((col) => (
                  <option key={col} value={col}>
                    {col.length > 28 ? col.slice(0, 26) + '...' : col}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Filter */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Core Skill</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {uniqueSkills.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Availabilities</option>
                <option value="Immediate (Internship)">Immediate (Internship)</option>
                <option value="Immediate (Full-time)">Immediate (Full-time)</option>
                <option value="Summer 2026">Summer 2026</option>
                <option value="Available for Projects">Available for Projects</option>
              </select>
            </div>

            {/* Match % Slider */}
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Min Skill Match</span>
                <span className="text-emerald-700 font-extrabold">{minMatchPercent}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minMatchPercent}
                onChange={(e) => setMinMatchPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 mt-1"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-5 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Talent Cards Grid */}
      {filteredTalents.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            No verified candidates match your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your skill match percentage, relaxing institution filters, or clearing your search keywords.
          </p>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTalents.map((tal) => {
            const isShortlisted = shortlistedTalentIds.includes(tal.id);
            return (
              <div
                key={tal.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top / Bio */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <img
                        src={tal.avatar}
                        alt={tal.name}
                        className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                            {tal.name}
                          </h3>
                          <span title="EduBridge Proctored">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-indigo-700 truncate mt-0.5">
                          {tal.primaryRole}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {tal.college}
                        </p>
                      </div>
                    </div>

                    {/* Skill Match Badge */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Match
                      </span>
                      <span className="text-base font-black text-emerald-700">
                        {tal.skillMatchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Headline / Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    "{tal.headline}"
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      GPA {tal.cgpa}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {tal.location}
                    </span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold">
                      {tal.availability}
                    </span>
                  </div>

                  {/* Verified Skills Preview */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Verified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tal.skills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium flex items-center gap-1 border border-slate-200/60"
                        >
                          <span>{sk.name}</span>
                          <span className="text-[10px] font-bold text-indigo-700">
                            {sk.score}%
                          </span>
                        </span>
                      ))}
                      {tal.skills.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                          +{tal.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Evidence Snippet */}
                  {tal.projects[0] && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] text-slate-700 font-semibold flex items-center justify-between">
                        <span className="truncate max-w-[200px]">
                          Proj: {tal.projects[0].title}
                        </span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                          Code Verified
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onToggleShortlist(tal.id)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                      isShortlisted
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        isShortlisted ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                      }`}
                    />
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                  </button>

                  <button
                    onClick={() => onSelectTalent(tal)}
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
