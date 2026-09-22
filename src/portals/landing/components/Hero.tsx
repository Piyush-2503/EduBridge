import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onExplorePortals: () => void;
  onExploreEcosystem: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePortals,
  onExploreEcosystem,
}) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
      {/* Subtle layered background lighting */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#7288AE]/12 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#EAE0CF]/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Call To Actions */}
          <div className="lg:col-span-6 xl:col-span-6 text-left space-y-6">
            {/* National Initiative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#4B5694]/25 bg-white/90 shadow-xs backdrop-blur-xs text-xs font-semibold text-[#111844]">
              <span className="w-2 h-2 rounded-full bg-[#4B5694] animate-ping" />
              <span className="font-bold text-[#4B5694]">Academia-Industry Collaboration</span>
              <span className="w-1 h-1 rounded-full bg-[#7288AE]" />
              <span className="text-[#7288AE]">Connecting Academia & Industry</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111844] leading-[1.08]">
              Where <span className="text-[#4B5694] relative inline-block">
                Skills
                <span className="absolute bottom-1.5 left-0 right-0 h-1.5 bg-[#EAE0CF] -z-10 rounded-full" />
              </span> Meet <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#111844] via-[#4B5694] to-[#111844] bg-clip-text text-transparent">
                Opportunity.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#4B5694] font-normal leading-relaxed max-w-xl">
              EduBridge connects students, academia and industry through skill mapping, learning, internships and placements.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExplorePortals}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#111844] to-[#4B5694] shadow-md shadow-[#4B5694]/25 hover:shadow-xl hover:shadow-[#4B5694]/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span>Select Your Portal</span>
                <ArrowRight className="w-4 h-4 text-[#EAE0CF] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onExploreEcosystem}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#111844] bg-white hover:bg-[#FAF8F5] border border-[#7288AE]/40 hover:border-[#4B5694] transition-all duration-200 cursor-pointer shadow-xs hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4 text-[#4B5694]" />
                <span>Explore Ecosystem Flow</span>
              </button>
            </div>

            {/* Micro Trust Details */}
            <div className="pt-3 border-t border-[#7288AE]/20 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#7288AE]">
              <div className="flex items-center gap-1.5 font-medium text-[#111844]">
                <ShieldCheck className="w-4 h-4 text-[#4B5694]" />
                <span>Ministry of Ayush & AIIA</span>
              </div>
              <span className="text-[#7288AE]/50">•</span>
              <span>DigiLocker & ABC Ready</span>
              <span className="text-[#7288AE]/50">•</span>
              <span>NEP 2020 Credit Mapped</span>
            </div>
          </div>

          {/* Right Column: Interactive Educational Ecosystem Visualization */}
          <div className="lg:col-span-6 xl:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
