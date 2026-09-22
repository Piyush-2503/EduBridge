import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpenCheck,
  Building2,
  Briefcase,
  Compass,
  ArrowDown,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HeroVisual: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center p-2 sm:p-4">
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-[#4B5694]/15 blur-3xl" />
        <div className="w-56 h-56 rounded-full bg-[#EAE0CF]/60 blur-2xl translate-x-12 translate-y-8" />
      </div>

      {/* Main Ecosystem Visualization Stage */}
      <div className="relative w-full bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl shadow-[#4B5694]/10 border border-[#7288AE]/30 overflow-hidden">
        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 bg-edubridge-grid opacity-30 pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#7288AE]/20 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5694] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#111844]">
              EduBridge Ecosystem Engine
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FAF8F5] text-[#4B5694] border border-[#7288AE]/30">
            Real-time Synergy
          </span>
        </div>

        {/* The 4 Layered Educational Cards & Central Hub */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 1: 🎓 Student - Skill Profile */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onMouseEnter={() => setActiveCard('student')}
            onMouseLeave={() => setActiveCard(null)}
            className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#EEF1FA] via-white to-white border border-[#4B5694]/30 hover:border-[#4B5694] shadow-xs hover:shadow-md transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#4B5694] text-[#EAE0CF] flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4B5694]/10 text-[#4B5694]">
                Student
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] transition-colors">
                Skill Profile & Readiness
              </h4>
              <p className="text-[11px] text-[#7288AE] mt-0.5 leading-snug">
                Self-assessed competencies mapped to national curriculum.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#7288AE]/15 flex items-center justify-between text-[10px] text-[#4B5694]">
              <span className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-[#4B5694]" /> Verified Profile
              </span>
              <span className="font-mono text-[#111844] font-bold">94% Fit</span>
            </div>
          </motion.div>

          {/* Card 2: 📚 Academia - Curriculum Alignment */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onMouseEnter={() => setActiveCard('academia')}
            onMouseLeave={() => setActiveCard(null)}
            className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#F4F0E8] via-white to-white border border-[#7288AE]/35 hover:border-[#4B5694] shadow-xs hover:shadow-md transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#111844] text-[#EAE0CF] flex items-center justify-center shrink-0 shadow-xs">
                <BookOpenCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
                Academia
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] transition-colors">
                Curriculum Alignment
              </h4>
              <p className="text-[11px] text-[#7288AE] mt-0.5 leading-snug">
                Faculty validation & credit transfer with NEP 2020 integration.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#7288AE]/15 flex items-center justify-between text-[10px] text-[#4B5694]">
              <span className="flex items-center gap-1 font-semibold">
                <Award className="w-3 h-3 text-[#4B5694]" /> Syllabus Synchronized
              </span>
              <span className="font-mono text-[#111844] font-bold">NEP Credits</span>
            </div>
          </motion.div>

          {/* Card 3: 🏢 Industry - Industry Requirements */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onMouseEnter={() => setActiveCard('industry')}
            onMouseLeave={() => setActiveCard(null)}
            className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#E9EDF6] via-white to-white border border-[#7288AE]/35 hover:border-[#4B5694] shadow-xs hover:shadow-md transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#4B5694] text-[#EAE0CF] flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4B5694]/10 text-[#4B5694]">
                Industry
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] transition-colors">
                Industry Requirements
              </h4>
              <p className="text-[11px] text-[#7288AE] mt-0.5 leading-snug">
                Live demand mapping for technical & clinical skillsets.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#7288AE]/15 flex items-center justify-between text-[10px] text-[#4B5694]">
              <span className="flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3 text-[#4B5694]" /> Verified MoUs
              </span>
              <span className="font-mono text-[#111844] font-bold">Active Demand</span>
            </div>
          </motion.div>

          {/* Card 4: 💼 Internship & Placement - Real-world Experience */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onMouseEnter={() => setActiveCard('internship')}
            onMouseLeave={() => setActiveCard(null)}
            className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#FAF8F5] via-white to-white border border-[#7288AE]/35 hover:border-[#4B5694] shadow-xs hover:shadow-md transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#111844] text-[#EAE0CF] flex items-center justify-center shrink-0 shadow-xs">
                <Briefcase className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844]">
                Placements
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-[#111844] group-hover:text-[#4B5694] transition-colors">
                Real-world Experience
              </h4>
              <p className="text-[11px] text-[#7288AE] mt-0.5 leading-snug">
                Internship logs verified by institutions for placement conversion.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#7288AE]/15 flex items-center justify-between text-[10px] text-[#4B5694]">
              <span className="flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-[#4B5694]" /> Direct Placement
              </span>
              <span className="font-mono text-[#111844] font-bold">Full Loop</span>
            </div>
          </motion.div>
        </div>

        {/* Central Synchronized Flow Bar */}
        <div className="relative z-10 mt-4 pt-3 border-t border-[#7288AE]/20 bg-gradient-to-r from-[#111844]/5 via-[#4B5694]/10 to-[#EAE0CF]/40 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#111844] text-[#EAE0CF] flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-[#111844] uppercase tracking-wider">
                Continuous Skill-To-Placement Loop
              </span>
              <span className="text-[10px] text-[#7288AE]">
                Student &rarr; Skills &rarr; Academia &rarr; Industry &rarr; Placement
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#4B5694] border border-[#7288AE]/30 shadow-xs">
            Verified Talent
          </span>
        </div>
      </div>
    </div>
  );
};
