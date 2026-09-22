import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (
    normalized.includes('active') ||
    normalized.includes('verified') ||
    normalized.includes('placed') ||
    normalized.includes('completed') ||
    normalized.includes('awarded') ||
    normalized.includes('open')
  ) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (
    normalized.includes('pending') ||
    normalized.includes('expiring') ||
    normalized.includes('reviewing') ||
    normalized.includes('shortlisted') ||
    normalized.includes('interview') ||
    normalized.includes('ongoing')
  ) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (
    normalized.includes('attention') ||
    normalized.includes('critical') ||
    normalized.includes('closed') ||
    normalized.includes('not eligible')
  ) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (
    normalized.includes('eligible') ||
    normalized.includes('applied') ||
    normalized.includes('strategic') ||
    normalized.includes('upcoming')
  ) {
    colorClasses = 'bg-indigo-50 text-[#4B5694] border-indigo-200';
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${colorClasses} whitespace-nowrap`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          colorClasses.includes('emerald')
            ? 'bg-emerald-500'
            : colorClasses.includes('amber')
            ? 'bg-amber-500'
            : colorClasses.includes('rose')
            ? 'bg-rose-500'
            : 'bg-[#4B5694]'
        }`}
      />
      {status}
    </span>
  );
};
