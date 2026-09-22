import React, { useState } from 'react';
import { X, Building2, Calendar, Mail, User, CheckCircle, FileText, Plus, Shield } from 'lucide-react';
import { IndustryPartner } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface PartnerModalProps {
  partner: IndustryPartner | null;
  isOpen: boolean;
  onClose: () => void;
  isCreateMode?: boolean;
  onSavePartner?: (newPartner: IndustryPartner) => void;
  onPartnerCreated?: (newPartner: IndustryPartner) => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  partner,
  isOpen,
  onClose,
  isCreateMode = false,
  onSavePartner,
  onPartnerCreated,
}) => {
  const [isCreating, setIsCreating] = useState(isCreateMode);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Biopharmaceuticals & Life Sciences');
  const [tier, setTier] = useState<'Strategic Tier 1' | 'Core Partner' | 'Emerging Partner'>('Core Partner');
  const [focalPerson, setFocalPerson] = useState('');
  const [email, setEmail] = useState('');
  const [mouValidTill, setMouValidTill] = useState('2028-12-31');
  const [toast, setToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPartner: IndustryPartner = {
      id: `pt-${Date.now()}`,
      name,
      shortName: name.split(' ')[0],
      logo: '🏛️',
      industry,
      tier,
      activeOpportunities: 8,
      internshipsProvided: 12,
      placementDrives: 1,
      collaborationStatus: 'Active',
      mouValidTill,
      focalPerson: focalPerson || 'Campus Relations Lead',
      contactEmail: email || 'campus@partner.com',
      projectsActive: 2,
      jointResearch: true,
    };

    if (onPartnerCreated) {
      onPartnerCreated(newPartner);
    }
    if (onSavePartner) {
      onSavePartner(newPartner);
    }
    setToast(`MoU registered for ${name} successfully!`);
    setTimeout(() => {
      setToast(null);
      setIsCreating(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#111844] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
              {partner ? partner.logo : '🏛️'}
            </div>
            <div>
              <h3 className="font-bold text-base">
                {isCreating ? 'Register New Industry Partner / MoU' : partner?.name}
              </h3>
              <p className="text-xs text-slate-300">
                {isCreating
                  ? 'All India Institute of Ayurveda • Industry Liaison Cell'
                  : partner?.industry}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {toast && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between">
            <span>{toast}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {!isCreating && partner ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3.5 bg-[#F8F9FD] rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">Collaboration Status</span>
                  <div className="mt-1 font-semibold text-slate-800 flex items-center gap-2">
                    <StatusBadge status={partner.collaborationStatus} size="md" />
                    <span className="text-[11px] text-slate-500 font-normal">
                      Valid till {partner.mouValidTill}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Partner Tier</span>
                  <span className="font-bold text-slate-800">{partner.tier}</span>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold text-[#111844]">{partner.activeOpportunities}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Active Roles</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold text-emerald-700">{partner.internshipsProvided}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Internships Given</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold text-[#4B5694]">{partner.projectsActive}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Joint Projects</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs text-[#111844] flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#4B5694]" /> Official Corporate Liaison Contact
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Designated Lead:</span>
                    <span className="font-semibold text-slate-800">{partner.focalPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Official Email:</span>
                    <span className="font-semibold text-[#4B5694]">{partner.contactEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Joint R&D Lab:</span>
                    <span className="font-semibold text-emerald-700">
                      {partner.jointResearch ? 'Established on AIIA Campus' : 'Collaborative Working Group'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setIsCreating(true)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Draft Addendum / Renewal
                </button>
                <button
                  onClick={() => {
                    setToast(`Campus placement drive requested with ${partner.name}!`);
                    setTimeout(() => setToast(null), 3000);
                  }}
                  className="px-4 py-2 bg-[#111844] hover:bg-[#27347A] text-white rounded-lg font-medium transition-colors"
                >
                  Schedule Placement Drive
                </button>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Pfizer Health AI or Patanjali R&D"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                  >
                    <option>Biopharmaceuticals & Life Sciences</option>
                    <option>Ayurveda & Herbal Pharmaceuticals</option>
                    <option>Healthcare IT & Clinical AI</option>
                    <option>Hospital Networks & Diagnostics</option>
                    <option>Medical Devices & Biomedical Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Partnership Tier
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                  >
                    <option>Strategic Tier 1</option>
                    <option>Core Partner</option>
                    <option>Emerging Partner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Liaison Focal Person
                  </label>
                  <input
                    type="text"
                    value={focalPerson}
                    onChange={(e) => setFocalPerson(e.target.value)}
                    placeholder="e.g., Dr. Amit Roy (VP Talent)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="campus@company.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  MoU Expiration Date
                </label>
                <input
                  type="date"
                  value={mouValidTill}
                  onChange={(e) => setMouValidTill(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#111844]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111844] text-white rounded-lg font-semibold hover:bg-[#27347A] transition-colors"
                >
                  Record MoU Agreement
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
