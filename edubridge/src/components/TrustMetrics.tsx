import React from 'react';
import { Users, Compass, ShieldCheck, Award } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const metrics = [
    {
      figure: '3',
      label: 'Core Stakeholders',
      desc: 'Students, Academic Institutions & Corporate Recruiters aligned in one synchronized pipeline.',
      icon: Users,
    },
    {
      figure: '1',
      label: 'Unified Ecosystem',
      desc: 'Consolidating skill mapping, syllabus validation, internship logs, and final placement.',
      icon: Compass,
    },
    {
      figure: '100%',
      label: 'Institutionally Audited',
      desc: 'Syllabus and competency benchmarks verified by recognized university authorities.',
      icon: ShieldCheck,
    },
    {
      figure: 'PS 26044',
      label: 'SIH 2026 Initiative',
      desc: 'Formulated for Ministry of Ayush & All India Institute of Ayurveda.',
      icon: Award,
    },
  ];

  return (
    <section className="py-10 sm:py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white/90 border border-[#7288AE]/25 shadow-xs hover:shadow-md hover:border-[#4B5694] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111844] tracking-tight">
                    {m.figure}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#4B5694]/10 text-[#4B5694] flex items-center justify-center">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#111844] uppercase tracking-wider mb-1.5">
                  {m.label}
                </h4>
                <p className="text-xs text-[#7288AE] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
