import React, { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  BookOpenCheck,
  Building2,
  Lock,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { PortalType } from '../types';

interface LoginViewProps {
  portal: PortalType;
  onBack: () => void;
  onSwitchPortal: (portal: PortalType) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  portal,
  onBack,
  onSwitchPortal,
}) => {
  const portalDetails = {
    student: {
      title: 'Student Portal Login',
      badge: 'Learners & Candidates',
      icon: GraduationCap,
      idLabel: 'Student PRN / Institutional Roll Number',
      idPlaceholder: 'e.g. 2026-AYUSH-STU-4819',
      instLabel: 'Affiliated University / College',
      instPlaceholder: 'e.g. All India Institute of Ayurveda, New Delhi',
      demoId: 'STU-2026-AIIA-094',
      demoInst: 'All India Institute of Ayurveda, New Delhi',
      subtext: 'Map your competencies, access verified internships, and connect with recruiters.',
      accentColor: '#4B5694',
      gradient: 'from-[#EEF1FA] to-white',
    },
    academia: {
      title: 'Academia Portal Login',
      badge: 'Institutions & Faculty',
      icon: BookOpenCheck,
      idLabel: 'AISHE Code / Faculty Official ID',
      idPlaceholder: 'e.g. C-12849 / FAC-DEPT-AYUSH-04',
      instLabel: 'Department / Institution Name',
      instPlaceholder: 'e.g. Faculty of Health Sciences & Technology',
      demoId: 'AISHE-U-0109-FAC',
      demoInst: 'Faculty of Health Sciences & Technology',
      subtext: 'Verify student skill credentials, update syllabus benchmarks, and review MoUs.',
      accentColor: '#111844',
      gradient: 'from-[#F4F0E8] to-white',
    },
    industry: {
      title: 'Industry Portal Login',
      badge: 'Corporates & Startups',
      icon: Building2,
      idLabel: 'Corporate Identification Number (CIN) / Work Email',
      idPlaceholder: 'e.g. U85110DL2026PTC0182 / hr@partner.in',
      instLabel: 'Organization / Enterprise Name',
      instPlaceholder: 'e.g. National AyurTech Innovations Pvt Ltd',
      demoId: 'CIN-U74999DL2026-IND',
      demoInst: 'Herbal BioTech Consortium R&D',
      subtext: 'Discover talent, post opportunities and build collaboration with universities.',
      accentColor: '#4B5694',
      gradient: 'from-[#E9EDF6] to-white',
    },
  };

  const current = portalDetails[portal];
  const Icon = current.icon;

  const [identifier, setIdentifier] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleDemoFill = () => {
    setIdentifier(current.demoId);
    setInstitution(current.demoInst);
    setPassword('••••••••••••');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      handleDemoFill();
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setIdentifier('');
    setInstitution('');
    setPassword('');
    setAuthSuccess(false);
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-14 w-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4B5694] hover:text-[#111844] mb-6 group cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to EduBridge Home</span>
      </button>

      {/* Main Login Card with Gradient Border */}
      <div
        className="relative bg-white rounded-2xl p-6 sm:p-9 shadow-xl shadow-[#4B5694]/10 overflow-hidden"
        style={{
          background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #4B5694, #7288AE, #EAE0CF) border-box`,
          border: '1px solid transparent',
        }}
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: current.accentColor }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#7288AE]/30 text-[#111844] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Icon className="w-3.5 h-3.5 text-[#4B5694]" />
              <span>{current.badge}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#111844] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4B5694] leading-relaxed">
              {current.subtext}
            </p>
          </div>

          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white"
            style={{ backgroundColor: current.accentColor }}
          >
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {authSuccess ? (
          /* Successful Verification State */
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#4B5694]/15 text-[#4B5694] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#111844]">
                Institutional Session Verified
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5694] mt-1 max-w-sm mx-auto">
                Authenticated as <span className="font-semibold text-[#111844]">{identifier || current.demoId}</span> for SIH 2026 evaluation.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#7288AE]/30 rounded-xl text-left text-xs text-[#111844]/80 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#7288AE]">Portal Mode:</span>
                <span className="font-bold uppercase text-[#111844]">{portal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7288AE]">Problem Statement:</span>
                <span className="font-mono">PS 26044 (Ayush / AIIA)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7288AE]">Institutional Sync:</span>
                <span className="text-[#4B5694] font-semibold">Active & Audited</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onBack}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#111844] to-[#4B5694] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Return to Landing Overview
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 bg-white border border-[#7288AE]/40 text-[#111844] rounded-xl text-xs font-semibold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                Try Another Input
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                {current.idLabel}
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={current.idPlaceholder}
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                {current.instLabel}
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder={current.instPlaceholder}
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111844]">
                  Institutional Security Pin / Password
                </label>
                <span className="text-[11px] text-[#4B5694] hover:underline cursor-pointer">
                  Forgot pin?
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all pr-10"
                />
                <Lock className="w-4 h-4 text-[#7288AE] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Quick Demo Pre-fill for evaluators */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF8F5] hover:bg-[#EAE0CF]/50 text-[#111844] border border-[#7288AE]/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4B5694]" />
                <span>Auto-fill Demo Credentials for SIH Evaluation</span>
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-[#111844] to-[#4B5694] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-[#4B5694]/25 hover:shadow-lg hover:shadow-[#4B5694]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enter {current.title}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Role Switcher tabs at bottom */}
        <div className="mt-7 pt-5 border-t border-[#7288AE]/20">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#7288AE] text-center mb-3">
            Switch to a different portal
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['student', 'academia', 'industry'] as PortalType[]).map((p) => {
              const active = p === portal;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAuthSuccess(false);
                    onSwitchPortal(p);
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-lg uppercase tracking-wider transition-all text-center cursor-pointer ${
                    active
                      ? 'bg-[#111844] text-[#EAE0CF] shadow-xs'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#7288AE] border border-[#7288AE]/30 hover:text-[#111844]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Institutional security footnote */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#7288AE] leading-relaxed">
          National Academic Depository (NAD) & DigiLocker compliant. Single Sign-On facilitated by Ministry of Ayush & AIIA for SIH 2026.
        </p>
      </div>
    </main>
  );
};
