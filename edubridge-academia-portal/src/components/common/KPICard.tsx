import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, Sparkles } from 'lucide-react';
import { ViewId } from '../../types';

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'attention';
  subtext: string;
  sparkline: number[];
  viewLink?: ViewId;
  onNavigate?: (view: ViewId) => void;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  trend,
  subtext,
  sparkline,
  viewLink,
  onNavigate,
  icon,
}) => {
  // Generate sparkline SVG coordinates
  const minVal = Math.min(...sparkline);
  const maxVal = Math.max(...sparkline);
  const range = maxVal - minVal || 1;
  const width = 80;
  const height = 28;

  const points = sparkline
    .map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  const strokeColor =
    trend === 'up' ? '#10B981' : trend === 'attention' ? '#F59E0B' : '#EF4444';

  return (
    <div
      onClick={() => viewLink && onNavigate && onNavigate(viewLink)}
      className={`group relative bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#4B5694]/40 transition-all duration-200 flex flex-col justify-between ${
        viewLink ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-[#F8F9FD] border border-slate-200 flex items-center justify-center text-[#111844] group-hover:bg-[#111844] group-hover:text-white transition-colors">
              {icon}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </span>
        </div>

        {/* Sparkline */}
        <div className="shrink-0 opacity-75 group-hover:opacity-100 transition-opacity">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div className="text-3xl font-extrabold text-[#111844] tracking-tight">
          {value}
        </div>
        <div
          className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
            trend === 'up'
              ? 'text-emerald-700 bg-emerald-50'
              : trend === 'attention'
              ? 'text-amber-700 bg-amber-50'
              : 'text-rose-700 bg-rose-50'
          }`}
        >
          {trend === 'up' ? (
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
          ) : trend === 'attention' ? (
            <AlertCircle className="w-3.5 h-3.5 mr-0.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
          )}
          {change}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5 mt-1">
        <span className="truncate">{subtext}</span>
        {viewLink && (
          <span className="text-[#4B5694] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center shrink-0 ml-2">
            Details →
          </span>
        )}
      </div>
    </div>
  );
};
