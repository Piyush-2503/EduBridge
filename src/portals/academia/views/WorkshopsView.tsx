import React from 'react';
import {
  Presentation,
  Download,
  Calendar,
  Building2,
  Users,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface WorkshopsViewProps {
  onOpenExport: (title?: string) => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ onOpenExport }) => {
  const workshops = [
    {
      id: 'ws-1',
      title: 'Distinguished Industry Lecture: Navigating FDA & EMA Botanicals Guidelines',
      speaker: 'Dr. Michael Roberts, VP Global Regulatory, Biocon Biologics',
      date: '28 Sept 2026 • 2:00 PM',
      venue: 'Sushruta Central Auditorium & Live Stream',
      attendeesRegistered: 340,
      targetAudience: 'PG Scholars & Pharmacology Faculty',
      status: 'Upcoming',
    },
    {
      id: 'ws-2',
      title: 'Hands-on Workshop: High-Throughput Bioassay Screening & Target Identification',
      speaker: 'Dr. K. S. Rao, Principal Scientist, Dabur Research',
      date: '04 Oct 2026 • 10:00 AM',
      venue: 'AIIA Central Instrumentation Laboratory',
      attendeesRegistered: 60,
      targetAudience: 'MD Ayurveda & Biotech Scholars',
      status: 'Confirmed',
    },
    {
      id: 'ws-3',
      title: 'Corporate Career Panel: What Health-Tech Employers Expect from 2027 Graduates',
      speaker: 'HR Leadership from Apollo Health, TCS & Siemens',
      date: '10 Oct 2026 • 11:30 AM',
      venue: 'Auditorium Hall B',
      attendeesRegistered: 480,
      targetAudience: 'All Final Year Undergraduates & Postgraduates',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Industry Workshops & Guest Lecture Series
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Distinguished corporate speaker series, hands-on clinical instrumentation masterclasses, and career panels.
          </p>
        </div>

        <button
          onClick={() => onOpenExport('Academic Year 2026-27 Guest Lectures & Workshop Schedule')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          Export Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-[#4B5694] border border-indigo-200">
                {ws.status}
              </span>
              <h3 className="font-extrabold text-sm text-[#111844] mt-2 leading-snug">{ws.title}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">{ws.speaker}</p>

              <div className="mt-4 p-3 bg-[#F8F9FD] rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {ws.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ws.venue}
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Users className="w-3.5 h-3.5 text-emerald-600" /> {ws.attendeesRegistered} RSVPs
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenExport(`${ws.title} - Attendee Register`)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#111844] rounded-xl font-bold text-xs transition-colors"
            >
              Attendee Register →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
