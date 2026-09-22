import React from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Award,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Plus,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import {
  CompanyProfile,
  StudentTalent,
  Opportunity,
  Applicant,
  SkillDemandItem,
  AcademiaPartner,
  NavSection,
} from '../../types';
import { WorkflowBanner } from '../common/WorkflowBanner';

interface OverviewDashboardProps {
  company: CompanyProfile;
  talents: StudentTalent[];
  opportunities: Opportunity[];
  applicants: Applicant[];
  skillDemands: SkillDemandItem[];
  academiaPartners: AcademiaPartner[];
  onNavigate: (section: NavSection) => void;
  onSelectTalent: (talent: StudentTalent) => void;
  onOpenCreateOpportunity: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  company,
  talents,
  opportunities,
  applicants,
  skillDemands,
  academiaPartners,
  onNavigate,
  onSelectTalent,
  onOpenCreateOpportunity,
}) => {
  // Counts by pipeline stage
  const pipelineStages = [
    { label: 'Discovered', count: talents.length + 86, color: 'text-slate-700', bg: 'bg-slate-100', barColor: 'bg-slate-400' },
    { label: 'Shortlisted', count: applicants.filter((a) => a.stage === 'Shortlisted').length + 8, color: 'text-amber-700', bg: 'bg-amber-50', barColor: 'bg-amber-500' },
    { label: 'Assessment', count: applicants.filter((a) => a.stage === 'Assessment').length + 12, color: 'text-indigo-700', bg: 'bg-indigo-50', barColor: 'bg-indigo-600' },
    { label: 'Interview', count: applicants.filter((a) => a.stage === 'Interview').length + 4, color: 'text-purple-700', bg: 'bg-purple-50', barColor: 'bg-purple-600' },
    { label: 'Selected / PPO', count: applicants.filter((a) => a.stage === 'Selected').length + 6, color: 'text-emerald-700', bg: 'bg-emerald-50', barColor: 'bg-emerald-600' },
  ];

  const totalPipeline = pipelineStages.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6">
      {/* SIH PS-26044 End-to-End Workflow Banner */}
      <WorkflowBanner currentSection="overview" onNavigate={onNavigate} />

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {company.name.split(' ')[0]} Enterprise
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Industry Partner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{company.tagline}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-indigo-600 font-medium">{company.headquarters}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => onNavigate('talent-discovery')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            Discover Talent
          </button>
          <button
            onClick={onOpenCreateOpportunity}
            className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Post Opportunity
          </button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Verified Talent</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">1,240</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18% from college tests</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Opportunities</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{opportunities.length}</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1 flex items-center gap-1">
            <span>5 types (Intern/Jobs/Capstones)</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Shortlisted Talent</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {applicants.filter((a) => a.stage !== 'Applied').length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Avg. 92% Skill Match
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Academia Partners</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{academiaPartners.length}</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            {company.activeMoUs} Active AICTE MoUs
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Skill Coverage</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">78.4%</div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            Curriculum aligned
          </div>
        </div>
      </div>

      {/* Recruitment Pipeline: Discovered → Shortlisted → Assessment → Interview → Selected */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Verified Recruitment Funnel (SIH Pipeline)
            </h3>
            <p className="text-xs text-slate-500">
              From college discovery through proctored diagnostic testing to final placement
            </p>
          </div>
          <button
            onClick={() => onNavigate('applicants')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Manage Pipeline
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pipeline Segments */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pipelineStages.map((stage, idx) => (
            <div
              key={stage.label}
              onClick={() => onNavigate('applicants')}
              className={`p-3 rounded-xl border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition-all ${stage.bg}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-500">
                  Step {idx + 1}
                </span>
                <span className="text-xs font-extrabold text-slate-900">{stage.count}</span>
              </div>
              <p className={`text-xs font-bold truncate ${stage.color}`}>
                {stage.label}
              </p>
              <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full ${stage.barColor}`}
                  style={{ width: `${Math.min(100, (stage.count / 40) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Grid: Skill Demand vs Talent Availability Chart + Academia Activity */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Skill Demand vs Talent Availability Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Skill Demand vs Verified Talent Availability
                </h3>
                <p className="text-xs text-slate-500">
                  Visualizing market shortages to trigger academia curriculum alignment
                </p>
              </div>
              <button
                onClick={() => onNavigate('skill-requirements')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View Full Mapping →
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 my-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-600" />
                Industry Demand Level
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                Verified Talent Supply
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Skill Gap Shortfall
              </span>
            </div>

            {/* Visual Bar Comparison */}
            <div className="space-y-3.5 mt-4">
              {skillDemands.slice(0, 5).map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate max-w-[240px]">
                      {item.skillName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Gap: +{item.skillGapPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    {/* Industry Demand */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                        <span>Demand:</span>
                        <span className="font-bold text-indigo-600">{item.industryDemandLevel}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${item.industryDemandLevel}%` }}
                        />
                      </div>
                    </div>

                    {/* Talent Supply */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                        <span>Available:</span>
                        <span className="font-bold text-emerald-600">{item.talentAvailabilityLevel}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${item.talentAvailabilityLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Critical Shortage: Generative AI & Kubernetes Microservices</span>
            <button
              onClick={() => onNavigate('academia-connect')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Send Syllabus Feedback to Deans →
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Academia Collaboration Activity */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Academia Collaboration Activity
                </h3>
                <p className="text-xs text-slate-500">
                  MoUs, Syllabus reviews & Joint labs
                </p>
              </div>
              <button
                onClick={() => onNavigate('academia-connect')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All Colleges →
              </button>
            </div>

            <div className="space-y-3">
              {academiaPartners.slice(0, 4).map((col) => (
                <div
                  key={col.id}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-purple-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {col.shortName}
                        </h4>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-purple-100 text-purple-700">
                          NIRF #{col.nirfRank}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {col.location}, {col.state} • {col.verifiedStudentsCount} Verified Students
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        col.collaborationStatus === 'Active MoU'
                          ? 'bg-emerald-100 text-emerald-800'
                          : col.collaborationStatus === 'Curriculum Aligned'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {col.collaborationStatus}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                    <span>Avg Match: <b className="text-emerald-700">{col.avgSkillMatch}%</b></span>
                    <span className="text-indigo-600 font-medium">
                      Liaison: {col.placementLiaison.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('engagements')}
            className="w-full mt-4 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold py-2 rounded-xl border border-purple-200/70 transition-colors flex items-center justify-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>View Upcoming Campus Workshops & FDPs</span>
          </button>
        </div>
      </div>

      {/* Bottom Grid: Recommended Talent + Recent Opportunities */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Recommended Verified Talent */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recommended Verified Talent
              </h3>
              <p className="text-xs text-slate-500">
                Pre-assessed candidates with evidence-backed project repositories
              </p>
            </div>
            <button
              onClick={() => onNavigate('talent-discovery')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Explore All Talent
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {talents.slice(0, 3).map((tal) => (
              <div
                key={tal.id}
                onClick={() => onSelectTalent(tal)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer bg-white group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={tal.avatar}
                    alt={tal.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {tal.name}
                        </h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-extrabold text-emerald-700">
                          {tal.skillMatchScore}% Match
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-indigo-700 font-semibold truncate">
                      {tal.primaryRole}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {tal.college} • GPA {tal.cgpa}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {tal.skills.slice(0, 3).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {sk.name} ({sk.score}%)
                        </span>
                      ))}
                      {tal.skills.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                          +{tal.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Recent Active Opportunities */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Active Opportunities
                </h3>
                <p className="text-xs text-slate-500">
                  Internships, Live Projects & Challenges
                </p>
              </div>
              <button
                onClick={() => onNavigate('opportunities')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Manage ({opportunities.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.slice(0, 3).map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => onNavigate('opportunities')}
                  className="p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all bg-slate-50/40 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {opp.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-700 shrink-0">
                      {opp.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {opp.department} • {opp.location}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 pt-2 border-t border-slate-200/60">
                    <span>{opp.stipendOrSalary}</span>
                    <span className="font-bold text-indigo-600">
                      {opp.applicantsCount} Applicants
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenCreateOpportunity}
            className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Role or Live Capstone</span>
          </button>
        </div>
      </div>
    </div>
  );
};
