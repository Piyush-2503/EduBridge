import React from 'react';
import { GraduationCap, BookOpenCheck, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ConnectionVisual: React.FC = () => {
  const nodes = [
    {
      id: 'student',
      label: 'STUDENT',
      sub: 'Skill Mapping & Readiness',
      icon: GraduationCap,
    },
    {
      id: 'academia',
      label: 'ACADEMIA',
      sub: 'Verification & Curriculum',
      icon: BookOpenCheck,
    },
    {
      id: 'industry',
      label: 'INDUSTRY',
      sub: 'Internships & Placement',
      icon: Building2,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-2">
      {/* Desktop / Tablet: Horizontal connected-line node diagram */}
      <div className="relative hidden sm:flex items-center justify-between">
        {/* Subtle connecting horizontal track */}
        <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-[#7288AE]/20 via-[#4B5694]/40 to-[#7288AE]/20 z-0" />
        
        {/* Flowing connector dots */}
        <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 z-0 overflow-hidden h-2 pointer-events-none">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#4B5694]"
            animate={{
              x: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="relative z-10 flex flex-col items-center text-center group cursor-default"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5] border border-[#7288AE]/40 rounded-full shadow-xs hover:border-[#4B5694] transition-all duration-200">
                <div className="w-5 h-5 rounded-full bg-[#111844]/5 flex items-center justify-center text-[#4B5694]">
                  <Icon className="w-3 h-3 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold tracking-wider text-[#111844]">
                  {node.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B5694]/40" />
              </div>

              {/* Sub-label under node */}
              <span className="mt-1.5 text-[11px] font-medium text-[#7288AE]">
                {node.sub}
              </span>

              {/* Step indicator tag */}
              <span className="absolute -top-4 text-[9px] font-mono tracking-widest text-[#7288AE]/70 uppercase">
                0{index + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile view: Compact vertical flow with connector */}
      <div className="sm:hidden flex flex-col gap-2.5 relative">
        <div className="absolute top-4 bottom-4 left-4 w-[1px] bg-[#7288AE]/30" />
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="relative z-10 flex items-center gap-3 pl-1"
            >
              <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#7288AE]/60 flex items-center justify-center text-[#4B5694] shrink-0">
                <Icon className="w-3 h-3 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2 py-1 px-3 bg-[#FAF8F5] border border-[#7288AE]/30 rounded-lg text-left">
                <span className="text-xs font-bold tracking-wider text-[#111844]">
                  {node.label}
                </span>
                <span className="text-[10px] text-[#7288AE]">— {node.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
