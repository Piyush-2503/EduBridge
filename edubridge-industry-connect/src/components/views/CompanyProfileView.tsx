import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  MapPin,
  Globe,
  Users,
  GraduationCap,
  Award,
  Edit3,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { CompanyProfile, AcademiaPartner } from '../../types';

interface CompanyProfileViewProps {
  company: CompanyProfile;
  academiaPartners: AcademiaPartner[];
  onUpdateCompany: (updated: Partial<CompanyProfile>) => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({
  company,
  academiaPartners,
  onUpdateCompany,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(company.name);
  const [tagline, setTagline] = useState(company.tagline);
  const [description, setDescription] = useState(company.description);
  const [headquarters, setHeadquarters] = useState(company.headquarters);
  const [website, setWebsite] = useState(company.website);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompany({
      name,
      tagline,
      description,
      headquarters,
      website,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {company.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Industry Partner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{company.industry}</span>
              <span>•</span>
              <span className="text-indigo-600 font-semibold">{company.headquarters}</span>
              <span>•</span>
              <span>{company.employeeCount} Employees</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Profile Saved
            </span>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Company Profile'}</span>
          </button>
        </div>
      </div>

      {/* Edit Form or Display Layout */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Update Corporate Profile</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Headquarters</label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Company Overview</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Overview & Target Campuses & Perks */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overview */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">About the Organization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {company.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                    {company.website}
                  </a>
                </span>
                <span>•</span>
                <span>Estd. {company.foundedYear}</span>
                <span>•</span>
                <span>CIN: {company.cin}</span>
              </div>
            </div>

            {/* Target Campuses & MoUs */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Active Institutional MoUs & Target Campuses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Universities with bilateral credit transfer and curriculum alignment agreements
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {company.activeMoUs} Active Agreements
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {(company.targetCampuses || [
                  'COEP Technological University, Pune',
                  'IIT Bombay',
                  'NIT Tiruchirappalli',
                  'BITS Pilani',
                  'Anna University, Chennai',
                  'Jadavpur University, Kolkata',
                ]).map((campus: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-slate-800">{campus}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      MoU Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Culture & Perks */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Student & Intern Benefits / Perks</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {(company.culturePerks || [
                  'Full Pre-Placement Offer (PPO) conversion eligibility upon internship completion',
                  'Mentorship from Principal Cloud, AI & Distributed Systems Engineers',
                  'Flexible hybrid working schedule with college-endorsed semester credits',
                  'Sponsored global cloud certifications (AWS, GCP, CKA vouchers)',
                  'Direct participation in SIH and enterprise open-source research labs',
                ]).map((perk: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 p-2 rounded-xl bg-slate-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Recruitment Contacts & Verification Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recruitment Contacts */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Recruitment & Academic Liaison</h3>
              <div className="space-y-3">
                {company.hiringTeam.map((contact, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
                    <div className="font-bold text-slate-900">{contact.name}</div>
                    <div className="text-[11px] text-indigo-700 font-medium">{contact.role}</div>
                    <div className="text-slate-500 text-[11px] space-y-1 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AICTE / SIH Verification Details */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Platform Verification Dossier
              </h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>SIH PS-26044 ID:</span>
                  <span className="font-mono font-bold text-slate-900">IND-TCS-2026-X</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Verification Date:</span>
                  <span className="font-semibold text-slate-800">14 Jan 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Auditor:</span>
                  <span className="font-semibold text-slate-800">AICTE Industry Cell</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>NEP 2020 Compliance:</span>
                  <span className="text-emerald-700 font-bold">100% Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
