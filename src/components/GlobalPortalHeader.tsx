import React from 'react';
import { Compass, GraduationCap, BookOpenCheck, Building2, Home } from 'lucide-react';

export type ActivePortal = 'landing' | 'student' | 'academia' | 'industry';

interface GlobalPortalHeaderProps {
  activePortal: ActivePortal;
  onSelectPortal: (portal: ActivePortal) => void;
}

export const GlobalPortalHeader: React.FC<GlobalPortalHeaderProps> = ({
  activePortal,
  onSelectPortal,
}) => {
  return (
    <div className="bg-[#111844] text-[#EAE0CF] px-4 py-2 text-xs border-b border-[#4B5694]/40 flex flex-wrap items-center justify-between gap-3 shadow-md z-50 sticky top-0">
      {/* Left Title & Status */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#4B5694] flex items-center justify-center text-white">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="font-extrabold tracking-tight text-white">EduBridge Unified Ecosystem</span>
        <span className="hidden sm:inline-block text-[#7288AE]">•</span>
        <span className="hidden sm:inline-block text-[11px] text-[#EAE0CF]/80">
          Institutional Skill Platform
        </span>
      </div>

      {/* Portal Switcher Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => onSelectPortal('landing')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
            activePortal === 'landing'
              ? 'bg-[#4B5694] text-white shadow-xs'
              : 'hover:bg-white/10 text-[#EAE0CF]/80'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-[#EAE0CF]" />
          <span>Gateway</span>
        </button>

        <button
          onClick={() => onSelectPortal('student')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
            activePortal === 'student'
              ? 'bg-[#4B5694] text-white shadow-xs'
              : 'hover:bg-white/10 text-[#EAE0CF]/80'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#EAE0CF]" />
          <span>Student Portal</span>
        </button>

        <button
          onClick={() => onSelectPortal('academia')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
            activePortal === 'academia'
              ? 'bg-[#4B5694] text-white shadow-xs'
              : 'hover:bg-white/10 text-[#EAE0CF]/80'
          }`}
        >
          <BookOpenCheck className="w-3.5 h-3.5 text-[#EAE0CF]" />
          <span>Academia Portal</span>
        </button>

        <button
          onClick={() => onSelectPortal('industry')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
            activePortal === 'industry'
              ? 'bg-[#4B5694] text-white shadow-xs'
              : 'hover:bg-white/10 text-[#EAE0CF]/80'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-[#EAE0CF]" />
          <span>Industry Portal</span>
        </button>
      </div>
    </div>
  );
};
