import React from 'react';
import { Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 border-t border-[#7288AE]/25 bg-white/70 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#111844] text-[#EAE0CF] flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-wider text-[#111844] uppercase">
            EduBridge
          </span>
        </div>
        <p className="text-xs font-semibold text-[#4B5694] tracking-wide">
          SIH 2026 • PS 26044
        </p>
        <p className="text-xs text-[#7288AE]">
          Ministry of Ayush • All India Institute of Ayurveda
        </p>
      </div>
    </footer>
  );
};
