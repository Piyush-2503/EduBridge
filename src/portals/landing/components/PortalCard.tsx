import React from 'react';
import { ArrowRight, LucideIcon, CheckCircle2 } from 'lucide-react';
import { PortalType } from '../types';

interface PortalCardProps {
  id: PortalType;
  title: string;
  badge: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  gradientBg: string;
  accentColor: string;
  tags: string[];
  onSelect: (id: PortalType) => void;
}

export const PortalCard: React.FC<PortalCardProps> = ({
  id,
  title,
  badge,
  description,
  buttonText,
  icon: Icon,
  gradientBg,
  accentColor,
  tags,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(id);
        }
      }}
      role="button"
      tabIndex={0}
      id={`portal-card-${id}`}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 min-h-[310px] rounded-2xl ${gradientBg} shadow-md shadow-[#4B5694]/5 hover:shadow-xl hover:shadow-[#4B5694]/15 transition-all duration-300 ease-out transform hover:-translate-y-1.5 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5694] overflow-hidden`}
      style={{
        background: `linear-gradient(to bottom, var(--card-tint, #ffffff), #ffffff) padding-box, linear-gradient(135deg, #4B5694, #7288AE, #EAE0CF) border-box`,
        border: '1px solid transparent',
      }}
    >
      {/* Strong colored top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Top Header with Icon Container & Badge */}
        <div className="flex items-center justify-between gap-3 mb-4 pt-1">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs"
            style={{ backgroundColor: accentColor, color: '#EAE0CF' }}
          >
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#111844] border border-[#7288AE]/30 shadow-xs">
            {badge}
          </span>
        </div>

        {/* Portal Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#111844] mb-2 group-hover:text-[#4B5694] transition-colors">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#4B5694] leading-relaxed font-normal mb-4">
          {description}
        </p>

        {/* Highlight Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/90 text-[#111844]/80 border border-[#7288AE]/25"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-[#4B5694]" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA / Action Bar */}
      <div className="pt-4 mt-4 border-t border-[#7288AE]/20 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111844] group-hover:text-[#4B5694] transition-colors">
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 text-[#4B5694] transition-transform duration-200 group-hover:translate-x-1.5" />
        </span>
        <span className="text-[11px] font-mono font-medium text-[#7288AE] group-hover:text-[#111844] transition-colors">
          Workspace &rarr;
        </span>
      </div>
    </div>
  );
};
