import React from 'react';
import {
  Compass,
  FileCheck,
  Lightbulb,
  Network,
  Briefcase,
  Award,
  ArrowRight,
} from 'lucide-react';

export const EcosystemProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Skill Inventory',
      desc: 'Students create verified academic profiles and log existing coursework.',
      icon: Compass,
      isHighlighted: false,
    },
    {
      num: '02',
      title: 'ASSESS',
      subtitle: 'Gap Mapping',
      desc: 'Automated assessment compares student profile against live industry requirements.',
      icon: FileCheck,
      isHighlighted: false,
    },
    {
      num: '03',
      title: 'DEVELOP',
      subtitle: 'Targeted Upskilling',
      desc: 'Modular projects & faculty-supervised tasks bridge identified gaps.',
      icon: Lightbulb,
      isHighlighted: false,
    },
    {
      num: '04',
      title: 'CONNECT',
      subtitle: 'Industry Match',
      desc: 'Algorithms connect ready students with verified corporate & research openings.',
      icon: Network,
      isHighlighted: true, // Highlighted central stage with #4B5694
    },
    {
      num: '05',
      title: 'EXPERIENCE',
      subtitle: 'Accredited Internship',
      desc: 'Hands-on industry exposure logged with institutional credit verification.',
      icon: Briefcase,
      isHighlighted: false,
    },
    {
      num: '06',
      title: 'GET PLACED',
      subtitle: 'Career Conversion',
      desc: 'Full-time placement and apprenticeship transition backed by performance audit.',
      icon: Award,
      isHighlighted: false,
    },
  ];

  return (
    <section id="ecosystem" className="py-14 sm:py-20 relative bg-[#FAF8F5]/80 border-y border-[#7288AE]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#7288AE]/30 text-[#111844] text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4B5694]" />
            <span>Structured Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111844]">
            The EduBridge Ecosystem Flow
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4B5694] font-normal">
            A continuous 6-stage lifecycle taking learners from academic foundation to career placement.
          </p>
        </div>

        {/* Desktop: Connected Flow-bar Design */}
        <div className="hidden lg:block relative">
          {/* Connecting Line behind items */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-8 h-[2px] bg-[#7288AE]/30 z-0" />

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 ${
                    step.isHighlighted
                      ? 'bg-white border-2 border-[#4B5694] shadow-lg shadow-[#4B5694]/15 -translate-y-2'
                      : 'bg-white/90 border border-[#7288AE]/25 hover:border-[#4B5694] hover:shadow-md'
                  }`}
                >
                  {/* Step Number Tag */}
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full mb-3 ${
                      step.isHighlighted
                        ? 'bg-[#4B5694] text-white'
                        : 'bg-[#FAF8F5] text-[#7288AE]'
                    }`}
                  >
                    STEP {step.num}
                  </span>

                  {/* Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-xs transition-transform duration-200 hover:scale-105 ${
                      step.isHighlighted
                        ? 'bg-[#4B5694] text-[#EAE0CF]'
                        : 'bg-[#111844]/5 text-[#4B5694]'
                    }`}
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xs font-black tracking-wider text-[#111844] uppercase mb-0.5">
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-bold text-[#4B5694] mb-2">
                    {step.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-[11px] text-[#7288AE] leading-snug">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet: Responsive Connected Timeline */}
        <div className="lg:hidden space-y-4 relative">
          <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-[#7288AE]/30" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative z-10 flex items-start gap-4 p-4 rounded-xl bg-white border ${
                  step.isHighlighted
                    ? 'border-[#4B5694] shadow-md shadow-[#4B5694]/10'
                    : 'border-[#7288AE]/25'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    step.isHighlighted
                      ? 'bg-[#4B5694] text-[#EAE0CF]'
                      : 'bg-[#111844]/5 text-[#4B5694]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#4B5694] px-1.5 py-0.5 rounded bg-[#FAF8F5]">
                      {step.num}
                    </span>
                    <h4 className="text-sm font-bold text-[#111844] uppercase">
                      {step.title} — {step.subtitle}
                    </h4>
                  </div>
                  <p className="text-xs text-[#7288AE] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
