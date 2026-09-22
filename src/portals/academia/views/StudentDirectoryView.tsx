import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Users,
  CheckCircle,
  SlidersHorizontal,
  GraduationCap,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Student, ViewId } from '../types';
import { STUDENTS_DIRECTORY_DATA, DEPARTMENTS_DATA } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface StudentDirectoryViewProps {
  onSelectStudent: (student: Student) => void;
  onOpenExport: (title?: string) => void;
  selectedDepartment: string;
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
  onSelectStudent,
  onOpenExport,
  selectedDepartment: globalSelectedDept,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState(
    globalSelectedDept === 'All Departments' ? 'All' : globalSelectedDept
  );
  const [yearFilter, setYearFilter] = useState('All');
  const [internshipFilter, setInternshipFilter] = useState('All');
  const [placementFilter, setPlacementFilter] = useState('All');
  const [minReadiness, setMinReadiness] = useState<number>(0);

  const filteredStudents = useMemo(() => {
    return STUDENTS_DIRECTORY_DATA.filter((st) => {
      // Search
      const matchesSearch =
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.skills.some((sk) => sk.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Department
      if (deptFilter !== 'All' && st.department !== deptFilter) return false;

      // Year
      if (yearFilter !== 'All' && st.year !== yearFilter) return false;

      // Internship
      if (internshipFilter !== 'All' && st.internshipStatus !== internshipFilter) return false;

      // Placement
      if (placementFilter !== 'All' && st.placementStatus !== placementFilter) return false;

      // Readiness
      if (st.skillReadiness < minReadiness) return false;

      return true;
    });
  }, [searchQuery, deptFilter, yearFilter, internshipFilter, placementFilter, minReadiness]);

  const resetFilters = () => {
    setSearchQuery('');
    setDeptFilter('All');
    setYearFilter('All');
    setInternshipFilter('All');
    setPlacementFilter('All');
    setMinReadiness(0);
  };

  const hasActiveFilters =
    searchQuery ||
    deptFilter !== 'All' ||
    yearFilter !== 'All' ||
    internshipFilter !== 'All' ||
    placementFilter !== 'All' ||
    minReadiness > 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">Institutional Student Directory</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitoring 4,280 student profiles, skill benchmarks, internship verifications, and recruitment status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenExport('Institutional Student Directory & Skill Index Report')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-[#111844]" />
            Export Directory (CSV)
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll no, or skill..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#111844]"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#111844]"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS_DATA.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#111844]"
            >
              <option value="All">All Academic Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="PG / MD">PG / MD Scholars</option>
            </select>
          </div>

          {/* Placement Status Filter */}
          <div>
            <select
              value={placementFilter}
              onChange={(e) => setPlacementFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#111844]"
            >
              <option value="All">All Placement Statuses</option>
              <option value="Placed">Placed / Accepted Offer</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Applied">Applied</option>
              <option value="Eligible">Eligible</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters: Internship & Readiness range */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Internship:</span>
              {(['All', 'Active', 'Pending Approval', 'Needs Attention'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setInternshipFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    internshipFilter === status
                      ? 'bg-[#111844] text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                Min Readiness: {minReadiness}%
              </span>
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={minReadiness}
                onChange={(e) => setMinReadiness(Number(e.target.value))}
                className="w-24 accent-[#111844]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              Showing <strong className="text-slate-800">{filteredStudents.length}</strong> matching students
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[#4B5694] font-semibold hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-6 font-bold">Student</th>
                <th className="py-3.5 font-bold">Department & Program</th>
                <th className="py-3.5 font-bold">Year</th>
                <th className="py-3.5 font-bold">CGPA</th>
                <th className="py-3.5 font-bold">Skill Readiness</th>
                <th className="py-3.5 font-bold">Internship</th>
                <th className="py-3.5 font-bold">Placement Status</th>
                <th className="py-3.5 font-bold">Profile</th>
                <th className="py-3.5 pr-6 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => onSelectStudent(student)}
                  className="hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 pl-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                      />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-[#111844]">
                          {student.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{student.rollNo}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="font-semibold text-slate-800 line-clamp-1">{student.department}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{student.program}</div>
                  </td>

                  <td className="py-3.5 font-medium text-slate-700">{student.year}</td>

                  <td className="py-3.5 font-bold text-slate-900">{student.cgpa}</td>

                  <td className="py-3.5 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.skillReadiness >= 85
                              ? 'bg-emerald-500'
                              : student.skillReadiness >= 70
                              ? 'bg-[#4B5694]'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${student.skillReadiness}%` }}
                        />
                      </div>
                      <span className="text-slate-800">{student.skillReadiness}%</span>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={student.internshipStatus} />
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={student.placementStatus} />
                  </td>

                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified
                    </span>
                  </td>

                  <td className="py-3.5 pr-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(student);
                      }}
                      className="text-xs font-bold text-[#4B5694] group-hover:text-[#111844] hover:underline"
                    >
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
