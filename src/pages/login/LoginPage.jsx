import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Brain, Eye, EyeOff, Shield, Building2, User,
  CheckCircle, AlertCircle, Loader2, ArrowRight,
  ChevronDown, ChevronUp, Lock
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { DEMO_USERS } from '../../data/demoData'

// ── Role cards config ──────────────────────────────────────
const ROLE_CARDS = [
  {
    role: 'super-admin',
    label: 'Super Admin',
    sub: 'Platform administrator',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-600',
    ring: 'ring-amber-600',
    bg: 'bg-amber-950/30 border-amber-800/60',
    responsibilities: [
      'Approve company registrations',
      'Manage all platform users',
      'View platform-wide analytics',
      'Manage subscriptions',
      'Monitor platform activity',
    ],
  },
  {
    role: 'company-admin',
    label: 'Company Admin',
    sub: 'Organization administrator',
    icon: Building2,
    gradient: 'from-brand-600 to-violet-600',
    ring: 'ring-brand-600',
    bg: 'bg-brand-950/30 border-brand-800/60',
    responsibilities: [
      'Manage employees and experts',
      'Upload and organize knowledge',
      'Manage company knowledge hub',
      'View company analytics',
      'Invite and onboard experts',
    ],
  },
  {
    role: 'employee',
    label: 'Employee',
    sub: 'Knowledge platform user',
    icon: User,
    gradient: 'from-emerald-500 to-teal-600',
    ring: 'ring-emerald-600',
    bg: 'bg-emerald-950/30 border-emerald-800/60',
    responsibilities: [
      'Access the knowledge hub',
      'Learn from company content',
      'Ask the AI assistant questions',
      'Track learning progress',
      'Get guidance from experts',
    ],
  },
]

// ── Demo credentials panel ─────────────────────────────────
function DemoCredentials({ onUse }) {
  const [open, setOpen] = useState(false)
  const demoAccounts = DEMO_USERS.map((u) => ({ email: u.email, password: u.password, role: u.role, name: u.name }))

  const roleLabel = { 'super-admin': 'Super Admin', 'company-admin': 'Company Admin', 'employee': 'Employee' }

  return (
    <div className="mt-6 rounded-2xl border border-amber-800/50 bg-amber-950/20 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <Lock size={13} className="text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            Demo Login Credentials
          </span>
          <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full">Dev Only</span>
        </div>
        {open ? <ChevronUp size={14} className="text-amber-400" /> : <ChevronDown size={14} className="text-amber-400" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2.5 border-t border-amber-800/30 pt-3">
          <p className="text-[10px] text-amber-600">
            These are demo credentials only. Never use real passwords in frontend code.
          </p>
          {demoAccounts.map((acc) => (
            <div key={acc.email} className="flex items-center justify-between bg-slate-800/80 rounded-xl px-3 py-2.5 border border-slate-700">
              <div>
                <p className="text-[11px] font-bold text-slate-200">{roleLabel[acc.role]}</p>
                <p className="text-[10px] text-slate-400 font-mono">{acc.email}</p>
                <p className="text-[10px] text-slate-500 font-mono">{acc.password}</p>
              </div>
              <button
                onClick={() => onUse(acc.email, acc.password)}
                className="text-[10px] font-bold text-brand-400 hover:text-brand-300 px-2 py-1 rounded-lg hover:bg-brand-900/30 transition-colors"
              >
                Use →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main LoginPage ─────────────────────────────────────────
export default function LoginPage() {
  const { login, authError, setAuthError, user } = useAuth()
  const location = useLocation()

  const [selectedRole, setSelectedRole] = useState(null)
  const [step, setStep] = useState('role') // 'role' | 'credentials'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Clear error when user types
  useEffect(() => { if (authError) setAuthError('') }, [email, password])

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    // Pre-fill email for demo convenience
    const demoUser = DEMO_USERS.find((u) => u.role === role)
    if (demoUser) { setEmail(demoUser.email); setPassword('') }
    setStep('credentials')
    setAuthError('')
    setFieldErrors({})
  }

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await login(email, password)
    setLoading(false)
  }

  const handleDemoUse = (e, p) => {
    setEmail(e); setPassword(p); setFieldErrors({}); setAuthError('')
  }

  const selectedCard = ROLE_CARDS.find((c) => c.role === selectedRole)

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-900/30 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-900/20 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-6" aria-label="LegacyAI home">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all">
              <Brain size={24} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white leading-none">Legacy<span className="text-brand-400">AI</span></p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Knowledge • Experience • Intelligence</p>
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back to LegacyAI</h1>
          <p className="text-slate-400">Access your organization's knowledge and expertise.</p>
        </div>

        {/* STEP 1: Role Selection */}
        {step === 'role' && (
          <div>
            <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-widest">
              Login As
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ROLE_CARDS.map((card) => {
                const Icon = card.icon
                return (
                  <button
                    key={card.role}
                    onClick={() => handleRoleSelect(card.role)}
                    className={`text-left bg-slate-800 rounded-2xl border ${card.bg} p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 ${card.ring} group`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <p className="text-lg font-bold text-white mb-1">{card.label}</p>
                    <p className="text-xs text-slate-400 mb-4">{card.sub}</p>
                    <ul className="space-y-1.5 mb-5">
                      {card.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle size={11} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${card.gradient} text-white text-sm font-bold text-center shadow-md group-hover:shadow-lg transition-all duration-200`}>
                      Continue as {card.label}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Demo credentials on role step */}
            <div className="max-w-md mx-auto">
              <DemoCredentials onUse={(e, p) => { /* just show, user picks role first */ }} />
            </div>
          </div>
        )}

        {/* STEP 2: Credentials */}
        {step === 'credentials' && selectedCard && (
          <div className="max-w-md mx-auto">
            <div className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl shadow-slate-900/50 overflow-hidden">
              {/* Top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${selectedCard.gradient}`} aria-hidden="true" />

              <div className="p-8">
                {/* Selected role badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedCard.gradient} flex items-center justify-center flex-shrink-0`}>
                    <selectedCard.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Logging in as</p>
                    <p className="text-sm font-bold text-white">{selectedCard.label}</p>
                  </div>
                  <button
                    onClick={() => { setStep('role'); setSelectedRole(null); setAuthError(''); setFieldErrors({}) }}
                    className="ml-auto text-xs text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Change role
                  </button>
                </div>

                {/* Auth error */}
                {authError && (
                  <div className="flex items-center gap-2 bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 mb-5" role="alert">
                    <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{authError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${fieldErrors.email ? 'border-red-700' : 'border-slate-600'}`}
                    />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{fieldErrors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        aria-required="true"
                        aria-invalid={!!fieldErrors.password}
                        className={`w-full px-4 py-3 pr-12 rounded-xl border bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${fieldErrors.password ? 'border-red-700' : 'border-slate-600'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{fieldErrors.password}</p>}
                  </div>

                  {/* Remember me + Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${selectedCard.gradient} shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2`}
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" />Authenticating…</>
                    ) : (
                      <>Login<ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                {/* Register link */}
                <div className="mt-6 text-center text-sm text-slate-500">
                  Don't have an account?{' '}
                  <a
                    href="/#register"
                    onClick={(e) => { e.preventDefault(); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
                  >
                    Register Your Company
                  </a>
                </div>
              </div>
            </div>

            {/* Demo credentials */}
            <DemoCredentials onUse={handleDemoUse} />
          </div>
        )}
      </div>
    </div>
  )
}
