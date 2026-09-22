import React from 'react';
import { Compass, Sparkles, Building2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle decorative badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CF]/50 border border-[#7288AE]/30 text-[#111844] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#4B5694]" />
          <span>What is EduBridge?</span>
        </div>

        {/* 2-3 concise lines */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-white/90 border border-[#7288AE]/25 shadow-sm">
          <p className="text-base sm:text-xl text-[#111844] font-semibold leading-relaxed">
            EduBridge is a unified national platform connecting students, academic institutions, and industries for streamlined skill development, accredited internships, hands-on projects, and placement opportunities.
          </p>
          <p className="mt-3 text-sm sm:text-base text-[#4B5694] font-normal leading-relaxed">
            Engineered for Smart India Hackathon 2026 (Problem Statement 26044) to bridge the persistent gap between higher education curricula and real-world industrial expectations.
          </p>

          <div className="mt-6 pt-5 border-t border-[#7288AE]/20 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7288AE]">
            <span className="font-semibold text-[#111844]">Problem Statement: 26044</span>
            <span>•</span>
            <span className="font-semibold text-[#111844]">Ministry of Ayush</span>
            <span>•</span>
            <span className="font-semibold text-[#111844]">All India Institute of Ayurveda</span>
          </div>
        </div>
      </div>
    </section>
  );
};
