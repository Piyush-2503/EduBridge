import React, { useState } from 'react';
import {
  X,
  FileCode2,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { SkillDemandItem } from '../../types';

interface AddSkillRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkillDemand: (item: SkillDemandItem) => void;
}

export const AddSkillRequirementModal: React.FC<AddSkillRequirementModalProps> = ({
  isOpen,
  onClose,
  onAddSkillDemand,
}) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState<SkillDemandItem['category']>('Software & Cloud');
  const [targetRole, setTargetRole] = useState('Cloud Architect / SRE');
  const [industryDemandLevel, setIndustryDemandLevel] = useState(90);
  const [talentAvailabilityLevel, setTalentAvailabilityLevel] = useState(35);
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium'>('Critical');
  const [isEmerging, setIsEmerging] = useState(true);
  const [recommendedAcademiaAction, setRecommendedAcademiaAction] = useState(
    'Introduce practical sandbox lab into 6th/7th sem curriculum'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const gap = Math.max(0, industryDemandLevel - talentAvailabilityLevel);

    const newItem: SkillDemandItem = {
      id: `sk-${Date.now()}`,
      skillName: skillName.trim(),
      category,
      targetRole,
      industryDemandLevel: Number(industryDemandLevel),
      talentAvailabilityLevel: Number(talentAvailabilityLevel),
      skillGapPercent: gap,
      priority,
      isEmerging,
      recommendedAcademiaAction: recommendedAcademiaAction.trim(),
      associatedOpportunities: 1,
      collegesCoveringCurriculum: 3,
    };

    onAddSkillDemand(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Define Industry Skill Requirement
              </h2>
              <p className="text-[11px] text-slate-500">
                Update enterprise skill demand to trigger university curriculum mapping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 text-xs space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Technical Skill Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g. Model Quantization (ONNX), Rust, Kubernetes"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Skill Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Software & Cloud">Software & Cloud</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Core Engineering">Core Engineering</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Embedded & IoT">Embedded & IoT</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Critical">Critical (Immediate Gap)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Primary Target Role in Company
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. AI Application Engineer"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Industry Demand Score</span>
                <span className="text-indigo-600">{industryDemandLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={industryDemandLevel}
                onChange={(e) => setIndustryDemandLevel(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Current Talent Availability</span>
                <span className="text-amber-600">{talentAvailabilityLevel}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={talentAvailabilityLevel}
                onChange={(e) => setTalentAvailabilityLevel(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
            <span className="font-bold">Calculated Skill Gap:</span>
            <span className="text-sm font-black text-amber-800">
              +{Math.max(0, industryDemandLevel - talentAvailabilityLevel)}% Gap
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="emerging"
              checked={isEmerging}
              onChange={(e) => setIsEmerging(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="emerging" className="text-slate-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Flag as Emerging / Disruptive Technology (NEP 2020 fast-track)
            </label>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Recommended Academic Action / Syllabus Adaptation
            </label>
            <textarea
              rows={2}
              value={recommendedAcademiaAction}
              onChange={(e) => setRecommendedAcademiaAction(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Register Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
