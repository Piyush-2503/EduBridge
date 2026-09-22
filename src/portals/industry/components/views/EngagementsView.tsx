import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  FileCheck,
  ChevronRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { EngagementItem, AcademiaPartner } from '../../types';

interface EngagementsViewProps {
  engagements: EngagementItem[];
  academiaPartners: AcademiaPartner[];
  onAddEngagement: (engagement: EngagementItem) => void;
}

export const EngagementsView: React.FC<EngagementsViewProps> = ({
  engagements,
  academiaPartners,
  onAddEngagement,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EngagementItem['type']>('Industry Workshop');
  const [institutionName, setInstitutionName] = useState(academiaPartners[0]?.name || 'COEP Pune');
  const [date, setDate] = useState('18 April 2026');
  const [participantsCount, setParticipantsCount] = useState(120);
  const [leadSpeaker, setLeadSpeaker] = useState('Aditya Vardhan (TCS AI Research Lead)');
  const [description, setDescription] = useState(
    'Hands-on technical workshop for 3rd and 4th-year engineering students covering industry best practices.'
  );

  const filtered = engagements.filter((e) => {
    if (selectedFilter === 'All') return true;
    return e.status === selectedFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEngagement: EngagementItem = {
      id: `eng-${Date.now()}`,
      title: title || 'Cloud & GenAI Innovation Workshop',
      type,
      institutionName,
      institutionId: 'acad-custom',
      date,
      status: 'Upcoming',
      participantsCount: Number(participantsCount),
      leadSpeaker,
      description,
      deliverables: [
        'EduBridge proctored certificate for qualifying students',
        'Top performers eligible for direct internship interviews',
      ],
    };
    onAddEngagement(newEngagement);
    setShowCreateModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Engagements & MoUs
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Sponsor hackathons, conduct Faculty Development Programs (FDPs), lead curriculum alignment reviews, and host guest tech lectures under NEP 2020.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Campus Engagement</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Upcoming', 'Ongoing', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
              selectedFilter === tab
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Engagements Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((eng) => (
          <div
            key={eng.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                  {eng.type}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    eng.status === 'Completed'
                      ? 'bg-slate-100 text-slate-700'
                      : eng.status === 'Ongoing'
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {eng.status}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {eng.title}
              </h3>
              <p className="text-xs text-indigo-700 font-semibold mt-1">
                Institution: {eng.institutionName}
              </p>

              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Date / Window
                  </span>
                  <span className="font-semibold text-slate-800">{eng.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Participants
                  </span>
                  <span className="font-semibold text-slate-800">
                    {eng.participantsCount} Engineers / Faculty
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {eng.description}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Agreed Deliverables:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {eng.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Lead: <b className="text-slate-800">{eng.leadSpeaker}</b></span>
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                View Event Log →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Engagement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Propose Institutional Engagement
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Schedule workshops, hackathons, or curriculum alignment sessions
            </p>

            <form onSubmit={handleSubmit} className="text-xs space-y-3.5">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Cloud Systems 2-Day Lab"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs"
                  >
                    <option value="Industry Workshop">Industry Workshop</option>
                    <option value="Curriculum Alignment">Curriculum Alignment</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Faculty Development (FDP)">Faculty Development (FDP)</option>
                    <option value="Guest Lecture">Guest Lecture</option>
                    <option value="Joint Innovation Lab">Joint Innovation Lab</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Partner Institution</label>
                  <select
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs"
                  >
                    {academiaPartners.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.shortName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expected Attendees</label>
                  <input
                    type="number"
                    value={participantsCount}
                    onChange={(e) => setParticipantsCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Corporate Speaker</label>
                <input
                  type="text"
                  value={leadSpeaker}
                  onChange={(e) => setLeadSpeaker(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Confirm Engagement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
