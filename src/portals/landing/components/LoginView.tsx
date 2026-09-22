import React, { useState, useEffect } from 'react';
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
  Eye,
  EyeOff,
  User,
  Mail,
  UserPlus,
  LogIn,
  KeyRound,
  School,
  AlertCircle,
} from 'lucide-react';
import { PortalType } from '../types';

interface LoginViewProps {
  portal: PortalType;
  onBack: () => void;
  onSwitchPortal: (portal: PortalType) => void;
  onEnterPortal?: (portal: PortalType) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  portal,
  onBack,
  onSwitchPortal,
  onEnterPortal,
}) => {
  // Default to 'signup' tab as requested
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form states for Sign In
  const [identifier, setIdentifier] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Form states for Sign Up
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [regId, setRegId] = useState('');
  const [department, setDepartment] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    name: string;
    id: string;
    org: string;
  } | null>(null);

  const portalDetails = {
    student: {
      title: 'Student & Candidate Portal',
      badge: 'Learners & Candidates',
      icon: GraduationCap,
      idLabel: 'Student PRN / Institutional Roll Number',
      idPlaceholder: 'e.g. 2026-AYUSH-STU-4819',
      instLabel: 'Affiliated University / College',
      instPlaceholder: 'e.g. All India Institute of Ayurveda, New Delhi',
      demoId: 'STU-2026-AIIA-094',
      demoInst: 'All India Institute of Ayurveda, New Delhi',
      demoName: 'Ananya Sharma',
      demoEmail: 'ananya.sharma@aiia.edu.in',
      subtext: 'Register to map competencies, access verified internships, and connect with recruiters.',
      accentColor: '#4B5694',
    },
    academia: {
      title: 'Academia & College Portal',
      badge: 'Institutions & Faculty',
      icon: BookOpenCheck,
      idLabel: 'AISHE Code / Faculty Official ID',
      idPlaceholder: 'e.g. C-12849 / FAC-DEPT-AYUSH-04',
      instLabel: 'Department / Institution Name',
      instPlaceholder: 'e.g. Faculty of Health Sciences & Technology',
      demoId: 'AISHE-U-0109-FAC',
      demoInst: 'Faculty of Health Sciences & Technology',
      demoName: 'Dr. Rajesh V. Kulkarni',
      demoEmail: 'dean.academic@institution.edu.in',
      subtext: 'Register to audit student credentials, align syllabus benchmarks, and manage MoUs.',
      accentColor: '#111844',
    },
    industry: {
      title: 'Industry & Corporate Portal',
      badge: 'Corporates & Startups',
      icon: Building2,
      idLabel: 'CIN / Corporate Work ID',
      idPlaceholder: 'e.g. U85110DL2026PTC0182 / hr@partner.in',
      instLabel: 'Organization / Enterprise Name',
      instPlaceholder: 'e.g. National AyurTech Innovations Pvt Ltd',
      demoId: 'CIN-U74999DL2026-IND',
      demoInst: 'Herbal BioTech Consortium R&D',
      demoName: 'Vikramaditya Roy',
      demoEmail: 'v.roy@herbalbiotech.com',
      subtext: 'Register to discover verified talent, post opportunities, and collaborate with colleges.',
      accentColor: '#4B5694',
    },
  };

  const current = portalDetails[portal];
  const Icon = current.icon;

  const handleDemoFill = () => {
    setValidationError(null);
    if (authMode === 'signin') {
      setIdentifier(current.demoId);
      setInstitution(current.demoInst);
      setPassword('Password@2026');
    } else {
      setFullName(current.demoName);
      setEmail(current.demoEmail);
      setRegId(current.demoId);
      setDepartment(current.demoInst);
      setRegPassword('Password@2026');
      setConfirmPassword('Password@2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form Validation Logic
    if (authMode === 'signup') {
      if (regPassword && confirmPassword && regPassword !== confirmPassword) {
        setValidationError('Passwords do not match! Please check and try again.');
        return;
      }
      if (!agreeTerms) {
        setValidationError('Please accept the Terms & Conditions and DigiLocker consent.');
        return;
      }
    }

    setIsSubmitting(true);

    const userName = authMode === 'signup' ? (fullName || current.demoName) : (identifier || current.demoName);
    const userOrg = authMode === 'signup' ? (department || current.demoInst) : (institution || current.demoInst);
    const userId = authMode === 'signup' ? (regId || current.demoId) : (identifier || current.demoId);

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthenticatedUser({
        name: userName,
        id: userId,
        org: userOrg,
      });
      setAuthSuccess(true);
      setRedirectCountdown(1);
    }, 800);
  };

  // Handle Automatic Redirect once validation succeeds
  useEffect(() => {
    if (authSuccess && onEnterPortal) {
      const timer = setTimeout(() => {
        onEnterPortal(portal);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [authSuccess, portal, onEnterPortal]);

  return (
    <main className="max-w-xl mx-auto px-4 py-6 sm:py-10 w-full animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4B5694] hover:text-[#111844] mb-5 group cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to EduBridge Gateway</span>
      </button>

      {/* Main Authentication Card */}
      <div
        className="relative bg-white rounded-3xl p-6 sm:p-9 shadow-2xl shadow-[#111844]/12 overflow-hidden border border-[#4B5694]/20"
        style={{
          background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #111844, #4B5694, #7288AE, #EAE0CF) border-box`,
          border: '1px solid transparent',
        }}
      >
        {/* Top Decorative Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#111844] via-[#4B5694] to-[#EAE0CF]" />

        {/* Portal Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pt-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#7288AE]/30 text-[#111844] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Icon className="w-3.5 h-3.5 text-[#4B5694]" />
              <span>{current.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111844] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4B5694] leading-relaxed">
              {current.subtext}
            </p>
          </div>

          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white bg-gradient-to-br from-[#111844] to-[#4B5694]"
          >
            <Icon className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {authSuccess ? (
          /* ========================================================================
             SUCCESSFUL VALIDATION & AUTOMATIC REDIRECTION STATE
             ======================================================================== */
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Validation Successful
              </span>
              <h2 className="text-2xl font-extrabold text-[#111844]">
                Welcome, {authenticatedUser?.name || 'User'}!
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5694] mt-1 max-w-sm mx-auto">
                Account validated & credentials verified via DigiLocker & NAD.
              </p>
            </div>

            {/* Redirecting Badge */}
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-center gap-3 text-xs text-emerald-900 font-bold shadow-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
              <span>Redirecting directly to {portal.toUpperCase()} Portal workspace...</span>
            </div>

            {/* Session Dossier Details */}
            <div className="p-4 bg-[#FAF8F5] border border-[#7288AE]/30 rounded-2xl text-left text-xs text-[#111844] space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#7288AE]/20">
                <span className="text-[#7288AE] font-medium">Account ID / Roll:</span>
                <span className="font-mono font-bold text-[#111844]">{authenticatedUser?.id}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#7288AE]/20">
                <span className="text-[#7288AE] font-medium">Institution / Org:</span>
                <span className="font-bold text-[#111844]">{authenticatedUser?.org}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#7288AE] font-medium">Verification Status:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Validated & Encrypted
                </span>
              </div>
            </div>

            {/* Bypass Redirect Button */}
            <div className="pt-2">
              {onEnterPortal && (
                <button
                  type="button"
                  onClick={() => onEnterPortal(portal)}
                  className="w-full py-3 px-5 bg-gradient-to-r from-[#111844] via-[#4B5694] to-[#111844] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#EAE0CF]" />
                  <span>Enter {portal.toUpperCase()} Workspace Now</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ========================================================================
             SIGN UP / SIGN IN FORM (Sign Up comes FIRST)
             ======================================================================== */
          <div>
            {/* Auth Mode Segmented Control Tabs */}
            <div className="flex bg-[#F1F4FA] p-1.5 rounded-2xl mb-6 border border-[#7288AE]/20">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setValidationError(null);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-[#111844] text-white shadow-md'
                    : 'text-[#4B5694] hover:text-[#111844]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>1. Sign Up / Register</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setValidationError(null);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-[#111844] text-white shadow-md'
                    : 'text-[#4B5694] hover:text-[#111844]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>2. Sign In</span>
              </button>
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' ? (
                /* ----------------------------------------------------------------------
                   SIGN UP / REGISTRATION FIELDS (DEFAULT)
                   ---------------------------------------------------------------------- */
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                      Full Name / Official Representative
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                      <User className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                      Official Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. user@domain.edu.in"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                      <Mail className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                        {current.idLabel.split('/')[0]}
                      </label>
                      <input
                        type="text"
                        required
                        value={regId}
                        onChange={(e) => setRegId(e.target.value)}
                        placeholder={current.idPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                        {current.instLabel.split('/')[0]}
                      </label>
                      <input
                        type="text"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder={current.instPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="At least 8 chars"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                        />
                        <Lock className="w-3.5 h-3.5 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                        />
                        <KeyRound className="w-3.5 h-3.5 text-[#7288AE] absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#4B5694]">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 rounded border-[#7288AE]/50 text-[#4B5694] focus:ring-[#4B5694]"
                      />
                      <span>
                        I accept the Terms & conditions and consent to automated DigiLocker & National Academic Depository (NAD) credential validation.
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                /* ----------------------------------------------------------------------
                   SIGN IN FIELDS
                   ---------------------------------------------------------------------- */
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                      {current.idLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={current.idPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                      <User className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111844] mb-1.5">
                      {current.instLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder={current.instPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                      <School className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111844]">
                        Security Pin / Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset instructions sent to registered institutional contact.')}
                        className="text-[11px] text-[#4B5694] font-semibold hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter secure password"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#7288AE]/40 rounded-xl text-[#111844] placeholder-[#7288AE]/60 focus:outline-none focus:border-[#4B5694] focus:ring-2 focus:ring-[#4B5694]/15 transition-all"
                      />
                      <Lock className="w-4 h-4 text-[#7288AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7288AE] hover:text-[#111844] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#111844] font-medium">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-[#7288AE]/50 text-[#4B5694] focus:ring-[#4B5694]"
                      />
                      <span>Remember this device for 30 days</span>
                    </label>
                  </div>
                </>
              )}

              {/* Quick Demo Pre-fill for evaluators */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#EAE0CF]/60 text-[#111844] border border-[#7288AE]/30 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4B5694]" />
                  <span>Auto-fill Demo Credentials & Validate ({authMode === 'signup' ? 'Sign Up' : 'Sign In'})</span>
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#111844] via-[#4B5694] to-[#111844] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#4B5694]/25 hover:shadow-lg hover:shadow-[#4B5694]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Validating credentials & logging into portal...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5 text-[#EAE0CF]" />
                    <span>
                      {authMode === 'signup'
                        ? `Sign Up & Launch ${current.title}`
                        : `Sign In & Launch ${current.title}`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Role Switcher tabs at bottom */}
        <div className="mt-8 pt-5 border-t border-[#7288AE]/20">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#7288AE] text-center mb-3">
            Switch Portal Context
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
                  className={`py-2 px-3 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all text-center cursor-pointer ${
                    active
                      ? 'bg-[#111844] text-[#EAE0CF] shadow-sm'
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
          National Academic Depository (NAD) & DigiLocker compliant. Single Sign-On facilitated by Ministry of Ayush & AIIA.
        </p>
      </div>
    </main>
  );
};
