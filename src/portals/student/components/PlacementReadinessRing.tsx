import React from 'react';
import { Target, CheckCircle2, Award, ArrowUpRight, TrendingUp } from 'lucide-react';

interface PlacementReadinessRingProps {
  score: number; // e.g. 87
  skillMatch: number; // e.g. 84
  profileCompletion: number; // e.g. 95
  internshipReadiness: number; // e.g. 92
  onExploreRecommendations: () => void;
}

export const PlacementReadinessRing: React.FC<PlacementReadinessRingProps> = ({
  score,
  skillMatch,
  profileCompletion,
  internshipReadiness,
  onExploreRecommendations
}) => {
  // SVG circular calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-[#4B5694]/18 p-5 sm:p-6 shadow-[0_8px_30px_rgba(17,24,68,0.055)] border-gradient-edubridge relative overflow-hidden">
      {/* Subtle decorative background ambient glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#EAE0CF]/40 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#7288AE]/15 blur-xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side: Circular Ring & Key Status */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full lg:w-auto">
          {/* Circular SVG Ring Component */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="edubridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4B5694" />
                  <stop offset="60%" stopColor="#7288AE" />
                  <stop offset="100%" stopColor="#111844" />
                </linearGradient>
              </defs>

              {/* Background circle track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-[#EAE0CF]/60 stroke-current"
                strokeWidth="12"
                fill="transparent"
              />

              {/* Foreground progress arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#edubridgeGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Ring Text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight text-[#111844]">
                {score}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7288AE]">
                Score
              </span>
            </div>
          </div>

          {/* Heading & Benchmark info */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAE0CF] text-[#111844] text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-[#4B5694]" />
              Placement Readiness Tier 1
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111844] tracking-tight">
              PLACEMENT READINESS
            </h2>

            <p className="text-xs sm:text-sm text-[#4B5694] max-w-md">
              Evaluated across academic transcript, verified project repo commits, and industry skill matrix standards.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-[#7288AE]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-emerald-700">+14% above AIIA cohort benchmark</span>
            </div>
          </div>
        </div>

        {/* Right Side: 3 Compact Indicators & Action Button */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 justify-center shrink-0">
          {/* Indicators Container */}
          <div className="grid grid-cols-3 sm:flex sm:flex-row lg:grid lg:grid-cols-3 gap-2 sm:gap-3">
            {/* Skill Match Indicator */}
            <div className="bg-white/80 border border-[#4B5694]/14 p-3 rounded-xl text-center min-w-[100px] shadow-2xs hover:border-[#4B5694]/30 hover:shadow-xs transition-all">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#7288AE]">
                <Target className="w-3.5 h-3.5 text-[#4B5694]" />
                Skill Match
              </div>
              <div className="text-lg font-extrabold text-[#111844] mt-1">{skillMatch}%</div>
              <div className="text-[10px] text-[#4B5694] font-medium">Target Roles</div>
            </div>

            {/* Profile Completion Indicator */}
            <div className="bg-white/80 border border-[#4B5694]/14 p-3 rounded-xl text-center min-w-[100px] shadow-2xs hover:border-[#4B5694]/30 hover:shadow-xs transition-all">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#7288AE]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Profile
              </div>
              <div className="text-lg font-extrabold text-[#111844] mt-1">{profileCompletion}%</div>
              <div className="text-[10px] text-emerald-700 font-medium">Verified</div>
            </div>

            {/* Internship Readiness Indicator */}
            <div className="bg-white/80 border border-[#4B5694]/14 p-3 rounded-xl text-center min-w-[100px] shadow-2xs hover:border-[#4B5694]/30 hover:shadow-xs transition-all">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#7288AE]">
                <Award className="w-3.5 h-3.5 text-[#4B5694]" />
                Internship
              </div>
              <div className="text-lg font-extrabold text-[#111844] mt-1">{internshipReadiness}%</div>
              <div className="text-[10px] text-[#4B5694] font-medium">Pre-screened</div>
            </div>
          </div>

          {/* Quick CTA to address skill gaps */}
          <button
            id="view-skill-gap-analysis-btn"
            onClick={onExploreRecommendations}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#111844] to-[#4B5694] hover:from-[#4B5694] hover:to-[#111844] text-white text-xs font-bold transition-all shadow-md shadow-[#4B5694]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Close 18% React Gap for Target Roles</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#EAE0CF]" />
          </button>
        </div>
      </div>
    </div>
  );
};
