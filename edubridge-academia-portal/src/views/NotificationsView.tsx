import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  Check,
  Building,
  Target,
  Briefcase,
  Users,
  Award,
} from 'lucide-react';
import { NotificationItem, ViewId } from '../types';
import { NOTIFICATIONS_DATA } from '../data/mockData';

interface NotificationsViewProps {
  onNavigate: (view: ViewId) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (categoryFilter !== 'All' && n.category !== categoryFilter) return false;
    if (urgencyFilter !== 'All' && n.urgency !== urgencyFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#4B5694]" />
            <h1 className="text-xl font-extrabold text-[#111844]">
              Institutional Action Items & Alerts Feed
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications: pending mentor approvals, expiring corporate MoUs, placement drive milestones, and skill alerts.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <Check className="w-4 h-4 text-emerald-600" />
          Mark All As Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-semibold">Category:</span>
          {(['All', 'Internship', 'Placement', 'Industry MoU', 'Skill Gap', 'Faculty'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#111844] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Urgency:</span>
          {(['All', 'high', 'medium', 'low'] as const).map((urg) => (
            <button
              key={urg}
              onClick={() => setUrgencyFilter(urg)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                urgencyFilter === urg
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {urg}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Items List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              markSingleRead(item.id);
              if (item.actionLink) onNavigate(item.actionLink);
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              !item.read
                ? 'bg-white border-[#4B5694]/40 shadow-xs'
                : 'bg-white/80 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                  !item.read ? 'bg-rose-500' : 'bg-slate-300'
                }`}
              />

              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      item.urgency === 'high'
                        ? 'bg-rose-100 text-rose-800'
                        : item.urgency === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-[#4B5694]'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.timestamp}</span>
                </div>

                <h3 className="font-extrabold text-sm text-[#111844]">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-end gap-3 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              {item.actionLink && (
                <button className="px-3 py-1.5 rounded-xl bg-[#111844] hover:bg-[#27347A] text-white font-bold transition-colors">
                  Take Action →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
