import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  LayoutGrid,
  List,
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Download,
  Briefcase
} from 'lucide-react';
import { StudentDirectoryItem } from '../types';

interface StudentsViewProps {
  students: StudentDirectoryItem[];
  onSelectStudent: (student: StudentDirectoryItem) => void;
  onEndorseStudent: (student: StudentDirectoryItem) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onSelectStudent,
  onEndorseStudent
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = students.filter((s) => {
    if (deptFilter !== 'All' && !s.department.includes(deptFilter)) return false;
    if (statusFilter !== 'All' && s.placementStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchRoll = s.rollNo.toLowerCase().includes(q);
      const matchEmail = s.email.toLowerCase().includes(q);
      const matchSkill = s.topSkills.some((sk) => sk.toLowerCase().includes(q));
      if (!matchName && !matchRoll && !matchEmail && !matchSkill) return false;
    }
    return true;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Header & View Controls */}
      <div className="bg-white rounded-2xl p-5 border border-[#4B5694]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111844] tracking-tight">
              Institutional Student Directory & Academic Dossiers
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
              {students.length} Enrolled Roster
            </span>
          </div>
          <p className="text-xs text-[#7288AE]">
            Explore verified academic records, CGPA rankings, placement readiness scores, and verified skill diagnostics.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-[#F8F9FC] rounded-xl border border-[#4B5694]/14">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#111844] shadow-xs'
                  : 'text-[#7288AE] hover:text-[#111844]'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#111844] shadow-xs'
                  : 'text-[#7288AE] hover:text-[#111844]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => alert('Exporting Official Student Dossier Packet (CSV & NAD XML format)...')}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F8F9FC] text-[#4B5694] border border-[#4B5694]/20 hover:border-[#4B5694] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, roll no, or skill..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-xs border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694] text-[#111844]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white text-[#111844] text-xs font-semibold border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694]"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Artificial Intelligence">AI & Data Science</option>
            <option value="Electronics">Electronics (ECE)</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Information Technology">Information Tech</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white text-[#111844] text-xs font-semibold border border-[#4B5694]/18 focus:outline-none focus:border-[#4B5694]"
          >
            <option value="All">All Placement Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Interview In-Process">Interview In-Process</option>
            <option value="Interning">Interning</option>
            <option value="Open">Open for Drives</option>
          </select>
        </div>
      </div>

      {/* Roster Presentation: Table vs Grid */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-[#4B5694]/15 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#4B5694]/12 text-[11px] font-bold text-[#7288AE] uppercase tracking-wider bg-[#F8F9FC]">
                  <th className="py-3 px-4">Student & Roll No</th>
                  <th className="py-3 px-3">Department & Year</th>
                  <th className="py-3 px-3">CGPA & Attendance</th>
                  <th className="py-3 px-3">Readiness Gauge</th>
                  <th className="py-3 px-3">Verified Skills</th>
                  <th className="py-3 px-3">Placement Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4B5694]/8">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#7288AE] text-xs">
                      No students found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stud) => (
                    <tr key={stud.id} className="hover:bg-[#4B5694]/4 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={stud.avatar}
                            alt={stud.name}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#4B5694]/20 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-[#111844] truncate">{stud.name}</div>
                            <div className="text-[11px] text-[#7288AE] truncate">{stud.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#111844] truncate">{stud.department}</div>
                        <div className="text-[11px] text-[#7288AE] truncate">{stud.year} • {stud.batch}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-extrabold text-[#111844]">{stud.cgpa} CGPA</div>
                        <div className="text-[11px] text-emerald-600 font-medium">{stud.attendance}% Attendance</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#F1F4FA] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#111844] to-[#4B5694] h-2 rounded-full"
                              style={{ width: `${stud.placementReadiness}%` }}
                            />
                          </div>
                          <span className="font-extrabold text-[#4B5694] text-xs">
                            {stud.placementReadiness}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {stud.topSkills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#F8F9FC] text-[#4B5694] border border-[#4B5694]/14 font-semibold"
                            >
                              {sk}
                            </span>
                          ))}
                          {stud.topSkills.length > 3 && (
                            <span className="text-[9px] px-1 py-0.5 text-[#7288AE]">
                              +{stud.topSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {stud.placementStatus === 'Placed' ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Placed @ {stud.placedCompany ? stud.placedCompany.split(' ')[0] : 'Corporate'}
                          </span>
                        ) : stud.placementStatus === 'Interning' ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] border border-[#EAE0CF]">
                            Interning
                          </span>
                        ) : stud.placementStatus === 'Interview In-Process' ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            Interviewing
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            Open
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onEndorseStudent(stud)}
                            className="px-2 py-1 rounded-lg bg-white border border-[#4B5694]/20 hover:border-[#4B5694] text-[#4B5694] hover:text-[#111844] text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Endorse
                          </button>
                          <button
                            onClick={() => onSelectStudent(stud)}
                            className="px-2.5 py-1 rounded-lg bg-[#4B5694] hover:bg-[#111844] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            View Dossier
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Presentation */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.map((stud) => (
            <div
              key={stud.id}
              className="bg-white rounded-2xl p-4 border border-[#4B5694]/15 shadow-sm hover:shadow-md hover:border-[#4B5694]/35 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={stud.avatar}
                      alt={stud.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-[#4B5694]/20"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-[#111844] truncate">{stud.name}</div>
                      <div className="text-[11px] text-[#7288AE] truncate">{stud.rollNo}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] shrink-0">
                    {stud.cgpa} CGPA
                  </span>
                </div>

                <div className="text-xs text-[#7288AE]">
                  <div className="font-medium text-[#111844] truncate">{stud.department}</div>
                  <div className="text-[11px]">{stud.year} • {stud.attendance}% Attendance</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#7288AE]">Placement Readiness</span>
                    <span className="font-extrabold text-[#4B5694]">{stud.placementReadiness}%</span>
                  </div>
                  <div className="w-full bg-[#F1F4FA] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#111844] to-[#4B5694] h-1.5 rounded-full"
                      style={{ width: `${stud.placementReadiness}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {stud.topSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-[#F8F9FC] text-[#4B5694] border border-[#4B5694]/14 font-semibold"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#4B5694]/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#4B5694]">
                  {stud.verifiedSkillsCount} Verified Skills
                </span>
                <button
                  onClick={() => onSelectStudent(stud)}
                  className="px-3 py-1 rounded-lg bg-[#4B5694] hover:bg-[#111844] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  View Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
