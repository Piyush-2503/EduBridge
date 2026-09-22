import React from 'react';
import {
  ChartNoAxesCombined,
  Briefcase,
  BookOpenCheck,
  Network,
  Target,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Skill Mapping',
      description:
        'Identify gaps between academic learning and industry expectations with automated competency benchmarking.',
      icon: ChartNoAxesCombined,
      bg: 'bg-gradient-to-br from-[#EEF1FA] to-white',
      borderAccent: 'border-[#4B5694]/25',
      iconColor: 'bg-[#4B5694] text-[#EAE0CF]',
      tag: 'Competency Analysis',
    },
    {
      title: 'Internship Discovery',
      description:
        'Connect learners with relevant practical opportunities verified by participating academic bodies and corporate partners.',
      icon: Briefcase,
      bg: 'bg-gradient-to-br from-[#F4F0E8] to-white',
      borderAccent: 'border-[#EAE0CF]',
      iconColor: 'bg-[#111844] text-[#EAE0CF]',
      tag: 'Direct Opportunities',
    },
    {
      title: 'Curriculum Alignment',
      description:
        'Help academia understand evolving industry skill requirements and update syllabi in accordance with national NEP directives.',
      icon: BookOpenCheck,
      bg: 'bg-gradient-to-br from-[#E9EDF6] to-white',
      borderAccent: 'border-[#7288AE]/30',
      iconColor: 'bg-[#4B5694] text-white',
      tag: 'NEP 2020 Standard',
    },
    {
      title: 'Industry Collaboration',
      description:
        'Enable companies and institutions to collaborate on real-world learning, sponsored research, and mutual MoUs.',
      icon: Network,
      bg: 'bg-gradient-to-br from-[#FAF8F5] to-white',
      borderAccent: 'border-[#7288AE]/30',
      iconColor: 'bg-[#111844] text-[#EAE0CF]',
      tag: 'MoU Ecosystem',
    },
    {
      title: 'Placement Readiness',
      description:
        'Build measurable career readiness through skill development, verified portfolio credentials, and mock assessments.',
      icon: Target,
      bg: 'bg-gradient-to-br from-[#EEF1FA] to-white',
      borderAccent: 'border-[#4B5694]/25',
      iconColor: 'bg-[#4B5694] text-[#EAE0CF]',
      tag: 'Career Benchmarks',
    },
    {
      title: 'Institutional Accreditation',
      description:
        'Synchronize academic credits directly with DigiLocker and National Academic Depository (NAD) frameworks.',
      icon: BadgeCheck,
      bg: 'bg-gradient-to-br from-[#F4F0E8] to-white',
      borderAccent: 'border-[#EAE0CF]',
      iconColor: 'bg-[#111844] text-[#EAE0CF]',
      tag: 'DigiLocker & ABC',
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#7288AE]/30 text-[#111844] text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4B5694]" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111844]">
            Unified Architecture for Academia & Industry
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4B5694] font-normal">
            Designed to bridge the disconnect between collegiate coursework and employer expectations.
          </p>
        </div>

        {/* Feature Cards Grid (alternating light blue and cream) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`group relative p-6 sm:p-7 rounded-2xl ${feature.bg} border ${feature.borderAccent} shadow-xs hover:shadow-lg hover:shadow-[#4B5694]/10 transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Top icon and tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${feature.iconColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7288AE] px-2 py-0.5 rounded bg-white/80 border border-[#7288AE]/20">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#111844] mb-2 group-hover:text-[#4B5694] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#4B5694] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
