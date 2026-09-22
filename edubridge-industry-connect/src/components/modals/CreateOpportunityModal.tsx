import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Layers,
  GraduationCap,
  ListChecks,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Opportunity, OpportunityType } from '../../types';

interface CreateOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOpportunity: (opp: Opportunity) => void;
}

const STEPS = [
  { id: 1, label: 'Details', icon: Briefcase },
  { id: 2, label: 'Skill Requirements', icon: Layers },
  { id: 3, label: 'Eligibility', icon: GraduationCap },
  { id: 4, label: 'Selection Process', icon: ListChecks },
  { id: 5, label: 'Publish', icon: CheckCircle },
];

export const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({
  isOpen,
  onClose,
  onCreateOpportunity,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<OpportunityType>('Internship');
  const [department, setDepartment] = useState('Enterprise Cloud & Digital Solutions');
  const [location, setLocation] = useState('Pune / Bengaluru / Hybrid');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [stipendOrSalary, setStipendOrSalary] = useState('₹40,000 / month + Pre-Placement Offer (PPO)');
  const [duration, setDuration] = useState('6 Months (Jan - Jun 2026)');
  const [openings, setOpenings] = useState(6);
  const [description, setDescription] = useState(
    'Work with TCS engineering teams on live production systems aligned with NEP 2020 course credits and industry skills.'
  );

  // Skills
  const [requiredSkills, setRequiredSkills] = useState([
    { skill: 'Docker & Kubernetes', minProficiency: 'Advanced', weight: 40 },
    { skill: 'Go / Python Microservices', minProficiency: 'Intermediate', weight: 30 },
    { skill: 'CI/CD & Linux Telemetry', minProficiency: 'Intermediate', weight: 30 },
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProf, setNewSkillProf] = useState('Intermediate');
  const [newSkillWeight, setNewSkillWeight] = useState(25);

  // Eligibility
  const [degrees, setDegrees] = useState<string[]>(['B.Tech / B.E.', 'M.Tech / M.E.']);
  const [minCgpa, setMinCgpa] = useState(7.0);
  const [batches, setBatches] = useState<number[]>([2026]);

  // Selection Process
  const [selectionSteps, setSelectionSteps] = useState<string[]>([
    'EduBridge Verified Skill Match & Competency Screening',
    'Automated Proctored Sandbox Coding Assessment',
    'Technical Architecture & Project Defense Round',
    'Pre-Placement Offer (PPO) & HR Fitment Call',
  ]);
  const [newStepText, setNewStepText] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setRequiredSkills([
      ...requiredSkills,
      { skill: newSkillName.trim(), minProficiency: newSkillProf, weight: Number(newSkillWeight) },
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (idx: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== idx));
  };

  const handleAddStep = () => {
    if (!newStepText.trim()) return;
    setSelectionSteps([...selectionSteps, newStepText.trim()]);
    setNewStepText('');
  };

  const handleRemoveStep = (idx: number) => {
    setSelectionSteps(selectionSteps.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      title: title || 'Cloud Native Systems & DevOps Intern',
      type,
      department,
      location,
      workMode,
      stipendOrSalary,
      duration,
      openings: Number(openings),
      requiredSkills,
      eligibility: {
        degrees,
        minCgpa: Number(minCgpa),
        batches,
      },
      selectionProcess: selectionSteps,
      applicantsCount: 0,
      shortlistedCount: 0,
      deadline: '30 May 2026',
      status: 'Active',
      createdAt: 'Just now',
      description,
      responsibilities: [
        'Deliver modular microservices following industry standard clean code guidelines.',
        'Participate in joint university-industry mentor code reviews.',
        'Demonstrate functional deliverables on EduBridge automated verification sandboxes.',
      ],
    };

    onCreateOpportunity(newOpportunity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Create Industry Opportunity
            </h2>
            <p className="text-xs text-slate-500">
              SIH 2026 PS-26044 • Academia-Industry Skill Bridge
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Step Progress Stepper */}
        <div className="px-6 py-3 bg-indigo-50/40 border-b border-indigo-100/60 flex items-center justify-between gap-1 overflow-x-auto">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold py-1 px-2 rounded-lg whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : isDone
                    ? 'text-emerald-700 bg-emerald-100/70'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
          {/* STEP 1: Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Opportunity Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      'Internship',
                      'Job',
                      'Live Project',
                      'Apprenticeship',
                      'Industry Challenge',
                    ] as OpportunityType[]
                  ).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                        type === t
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Opportunity Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Cloud Systems & DevOps Intern"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Department / Business Unit
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Work Mode & Location
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru / Mumbai"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Stipend / Salary Range
                  </label>
                  <input
                    type="text"
                    value={stipendOrSalary}
                    onChange={(e) => setStipendOrSalary(e.target.value)}
                    placeholder="e.g. ₹45,000 / mo"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 6 Months"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Open Seats
                  </label>
                  <input
                    type="number"
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    min={1}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Skill Requirements */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-indigo-900">
                <span className="font-bold block mb-0.5">Automated Match Engine</span>
                EduBridge matches students by computing Euclidean distance between your specified skill weights and student proctored test results.
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  Current Weighted Skill Criteria
                </label>
                {requiredSkills.map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{req.skill}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                        Min: {req.minProficiency}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-indigo-700 font-bold">
                        Weight: {req.weight}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(i)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Skill */}
              <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-white space-y-2">
                <span className="font-semibold text-slate-700 block">
                  Add Additional Required Skill
                </span>
                <div className="grid sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Skill name (e.g. Go, RAG, PyTorch)"
                    className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white"
                  />
                  <select
                    value={newSkillProf}
                    onChange={(e) => setNewSkillProf(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-3 py-1.5 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Eligibility */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Target Degrees
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'B.Tech / B.E.',
                    'M.Tech / M.E.',
                    'MCA',
                    'B.Sc / M.Sc Computer Science',
                    'Dual Degree (B.Tech + M.Tech)',
                  ].map((deg) => {
                    const isSelected = degrees.includes(deg);
                    return (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setDegrees(degrees.filter((d) => d !== deg));
                          } else {
                            setDegrees([...degrees, deg]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl border font-medium text-xs transition-colors ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {deg}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Minimum CGPA Cutoff
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="5.0"
                    max="10.0"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Verified through university registrars.
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Eligible Passing Batches
                  </label>
                  <div className="flex gap-2">
                    {[2025, 2026, 2027, 2028].map((year) => {
                      const isYearSelected = batches.includes(year);
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            if (isYearSelected) {
                              setBatches(batches.filter((y) => y !== year));
                            } else {
                              setBatches([...batches, year]);
                            }
                          }}
                          className={`flex-1 py-2 rounded-xl border text-center font-semibold text-xs ${
                            isYearSelected
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Selection Process */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <label className="font-bold text-slate-700 block">
                Defined Selection & Evaluation Workflow
              </label>

              <div className="space-y-2">
                {selectionSteps.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800">{s}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStepText}
                  onChange={(e) => setNewStepText(e.target.value)}
                  placeholder="e.g. Mentor Hackathon Assessment or Faculty Sign-off"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl"
                >
                  Add Round
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Publish Review */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-sm mb-1 text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Ready to Publish Opportunity to EduBridge AICTE Network
                </div>
                <p className="text-[11px] text-emerald-800">
                  This opportunity will be matched instantly with verified talent across all partner institutions.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 text-sm">
                    {title || 'Cloud Native Systems & DevOps Intern'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">
                    {type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {department} • {location} ({workMode})
                </p>
                <p className="text-xs font-semibold text-slate-800">
                  Stipend: {stipendOrSalary} • {openings} Openings
                </p>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Required Verified Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {requiredSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                      >
                        {s.skill} ({s.weight}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className={`text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors"
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs font-bold px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Publish Opportunity
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
