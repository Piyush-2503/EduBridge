import React, { useState } from 'react';
import {
  Settings,
  Building,
  ShieldCheck,
  Save,
  CheckCircle,
  Bell,
  Users,
  Sliders,
  Calendar,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';

export const SettingsView: React.FC = () => {
  const [skillGapAlertThreshold, setSkillGapAlertThreshold] = useState(15);
  const [internshipLogWarning, setInternshipLogWarning] = useState(80);
  const [toast, setToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#111844] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Institutional configurations updated and saved to node registry.</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#4B5694]" />
          <h1 className="text-xl font-extrabold text-[#111844]">Institutional Portal Settings</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Configure institutional identity, academic thresholds, accreditation reporting parameters, and authorized administrators.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Node Identity */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-[#4B5694]" />
            <h2 className="text-sm font-extrabold text-[#111844]">Institutional Node Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Institution Legal Name
              </label>
              <input
                type="text"
                readOnly
                value={INSTITUTION_INFO.name}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Apex Ministry / Affiliation
              </label>
              <input
                type="text"
                readOnly
                value={INSTITUTION_INFO.subtitle}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Active Academic Year
              </label>
              <input
                type="text"
                readOnly
                value={INSTITUTION_INFO.academicYear}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Accreditation Status
              </label>
              <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> NAAC A++ (CGPA 3.82) • Autonomous Apex Institute
              </div>
            </div>
          </div>
        </div>

        {/* Thresholds & Alert Policies */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-[#4B5694]" />
            <h2 className="text-sm font-extrabold text-[#111844]">
              Institutional Quality Thresholds & Automated Triggers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Skill Gap Deficit Alert Threshold
                </label>
                <span className="font-bold text-[#111844]">≥ {skillGapAlertThreshold}% Gap</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={skillGapAlertThreshold}
                onChange={(e) => setSkillGapAlertThreshold(Number(e.target.value))}
                className="w-full accent-[#111844]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Automatically notifies Department Heads and Academic Council when corporate hiring demand outpaces batch proficiency by this percentage.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Internship Attendance Warning Flag
                </label>
                <span className="font-bold text-[#111844]">&lt; {internshipLogWarning}%</span>
              </div>
              <input
                type="range"
                min="65"
                max="95"
                value={internshipLogWarning}
                onChange={(e) => setInternshipLogWarning(Number(e.target.value))}
                className="w-full accent-[#111844]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Internships falling below this threshold are tagged &apos;Needs Attention&apos; for coordinator intervention.
              </p>
            </div>
          </div>
        </div>

        {/* Authorized Officers */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Users className="w-4 h-4 text-[#4B5694]" />
            <h2 className="text-sm font-extrabold text-[#111844]">Authorized Institutional Roles</h2>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">{INSTITUTION_INFO.adminUser.name}</div>
                <div className="text-[11px] text-slate-500">
                  {INSTITUTION_INFO.adminUser.role} • {INSTITUTION_INFO.adminUser.email}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#111844] text-white text-[10px] font-bold">
                Apex Super Admin
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Prof. Vikramaditya Sen</div>
                <div className="text-[11px] text-slate-500">
                  Chief Training & Placement Officer (TPO) • tpo@aiia.gov.in
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                Placement Admin
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Dr. Sunita Deshmukh</div>
                <div className="text-[11px] text-slate-500">
                  Head, Department of Ayurveda Medicine • hod.ayur@aiia.gov.in
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                Department Head
              </span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#111844] hover:bg-[#27347A] text-white rounded-2xl font-bold text-xs shadow-md transition-all"
          >
            <Save className="w-4 h-4 text-emerald-300" />
            Save Institutional Configurations
          </button>
        </div>
      </form>
    </div>
  );
};
