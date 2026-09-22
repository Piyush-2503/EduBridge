import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Filter,
  MapPin,
  Award,
  Users,
  Send,
  Calendar,
  CheckCircle2,
  FileText,
  Briefcase,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  SlidersHorizontal,
} from 'lucide-react';
import { AcademiaPartner, NavSection } from '../../types';

interface AcademiaConnectViewProps {
  academiaPartners: AcademiaPartner[];
  onOpenFeedbackModal: (partner: AcademiaPartner) => void;
  onOpenCreateOpportunity: () => void;
  onNavigate: (section: NavSection) => void;
  onInitiateMoU: (partnerId: string) => void;
}

export const AcademiaConnectView: React.FC<AcademiaConnectViewProps> = ({
  academiaPartners,
  onOpenFeedbackModal,
  onOpenCreateOpportunity,
  onNavigate,
  onInitiateMoU,
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePartnerDetail, setActivePartnerDetail] = useState<AcademiaPartner | null>(null);

  const types = ['All', 'IIT', 'NIT', 'State University', 'Autonomous', 'Private'];

  const filtered = academiaPartners.filter((col) => {
    if (selectedType !== 'All' && col.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        col.name.toLowerCase().includes(q) ||
        col.shortName.toLowerCase().includes(q) ||
        col.location.toLowerCase().includes(q) ||
        col.state.toLowerCase().includes(q) ||
        col.topSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Academia Connect & University Partnerships
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              NEP 2020 Aligned
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Partner directly with Deans of Engineering, Placement Directors, and Board of Studies to provide curriculum feedback, sponsor joint labs, conduct guest bootcamps, and run dedicated campus hiring drives.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('engagements')}
            className="text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Active Engagements</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by university name, state, or top engineering branch..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* University Directory Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((col) => (
          <div
            key={col.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-base shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        {col.shortName}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {col.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {col.location}, {col.state} • Estd. {col.establishedYear}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    col.collaborationStatus === 'Active MoU'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : col.collaborationStatus === 'Curriculum Aligned'
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {col.collaborationStatus}
                </span>
              </div>

              {/* Stats & Rankings */}
              <div className="grid grid-cols-3 gap-2 my-3.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    NIRF Ranking
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    #{col.nirfRank}{' '}
                    <span className="text-[10px] text-purple-600">({col.naacGrade})</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Verified Talent
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {col.verifiedStudentsCount} students
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Skill Match Avg
                  </span>
                  <span className="font-black text-emerald-700 text-sm">
                    {col.avgSkillMatch}%
                  </span>
                </div>
              </div>

              {/* Top Skills Observed */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Top Student Strengths:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {col.topSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Training & Placement Liaison */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {col.placementLiaison.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {col.placementLiaison.designation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${col.placementLiaison.email}`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 transition-colors"
                    title={col.placementLiaison.email}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${col.placementLiaison.phone}`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 transition-colors"
                    title={col.placementLiaison.phone}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              {col.curriculumFeedbackSent ? (
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Syllabus Feedback Submitted
                </span>
              ) : (
                <button
                  onClick={() => onOpenFeedbackModal(col)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Provide Skill-Gap Feedback</span>
                </button>
              )}

              <div className="flex items-center gap-1.5">
                {col.collaborationStatus !== 'Active MoU' && (
                  <button
                    onClick={() => onInitiateMoU(col.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Initiate MoU
                  </button>
                )}
                <button
                  onClick={onOpenCreateOpportunity}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 shadow-2xs transition-colors"
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Post College Drive</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
