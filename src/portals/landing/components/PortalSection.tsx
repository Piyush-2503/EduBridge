import React from 'react';
import { GraduationCap, BookOpenCheck, Building2, Sparkles } from 'lucide-react';
import { PortalCard } from './PortalCard';
import { PortalType } from '../types';

interface PortalSectionProps {
  onSelectPortal: (portal: PortalType) => void;
}

export const PortalSection: React.FC<PortalSectionProps> = ({ onSelectPortal }) => {
  const portals = [
    {
      id: 'student' as PortalType,
      title: 'STUDENT PORTAL',
      badge: 'Learners & Candidates',
      description: 'Build skills, discover opportunities and get placement-ready.',
      buttonText: 'Enter Student Portal',
      icon: GraduationCap,
      gradientBg: 'bg-gradient-to-b from-[#EEF1FA] via-white to-white',
      accentColor: '#4B5694',
      tags: ['Skill Mapping', 'Internships', 'Career Readiness'],
    },
    {
      id: 'academia' as PortalType,
      title: 'ACADEMIA PORTAL',
      badge: 'Institutions & Faculty',
      description: 'Verify, develop and connect students with industry.',
      buttonText: 'Enter Academia Portal',
      icon: BookOpenCheck,
      gradientBg: 'bg-gradient-to-b from-[#F4F0E8] via-white to-white',
      accentColor: '#111844',
      tags: ['Curriculum Alignment', 'Industry Exposure', 'Credit Verification'],
    },
    {
      id: 'industry' as PortalType,
      title: 'INDUSTRY PORTAL',
      badge: 'Corporates & Startups',
      description: 'Discover talent, post opportunities and build collaboration.',
      buttonText: 'Enter Industry Portal',
      icon: Building2,
      gradientBg: 'bg-gradient-to-b from-[#E9EDF6] via-white to-white',
      accentColor: '#4B5694',
      tags: ['Skill Requirements', 'Talent Discovery', 'Collaboration & MoUs'],
    },
  ];

  return (
    <section id="portals" className="py-14 sm:py-20 relative">
      {/* Background visual transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7288AE]/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0CF]/70 text-[#111844] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4B5694]" />
            <span>Role-Specific Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111844]">
            Choose your portal
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4B5694] font-normal">
            Enter the workspace built for your role.
          </p>
        </div>

        {/* Grid of exactly 3 medium-sized cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {portals.map((portal) => (
            <PortalCard
              key={portal.id}
              id={portal.id}
              title={portal.title}
              badge={portal.badge}
              description={portal.description}
              buttonText={portal.buttonText}
              icon={portal.icon}
              gradientBg={portal.gradientBg}
              accentColor={portal.accentColor}
              tags={portal.tags}
              onSelect={onSelectPortal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
