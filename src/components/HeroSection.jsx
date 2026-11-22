import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Shield, Zap, Users, BookOpen } from 'lucide-react'

/* ─── Animated stat badge ─────────────────────────── */
function StatBadge({ icon: Icon, label, color }) {
  return (
    <div className={`flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 text-xs font-semibold ${color}`}>
      <Icon size={14} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* ─── Floating knowledge card visual ─────────────── */
function KnowledgeVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 animate-float" aria-hidden="true">
      {/* Main card */}
      <div className="relative bg-white rounded-3xl shadow-2xl shadow-brand-500/10 border border-slate-100 p-6 overflow-hidden">

        {/* Gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 rounded-t-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Knowledge Hub</p>
            <p className="text-base font-bold text-slate-800">Engineering Department</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
        </div>

        {/* Knowledge items */}
        {[
          { type: 'Video', title: 'CI/CD Pipeline Setup Guide', author: 'S. Patel', time: '24 min', badge: 'bg-blue-50 text-blue-600' },
          { type: 'SOP', title: 'Incident Response Procedure', author: 'M. Chen', time: '12 min', badge: 'bg-emerald-50 text-emerald-600' },
          { type: 'AI', title: 'How do we handle DB migrations?', author: 'AI Answer', time: 'Instant', badge: 'bg-purple-50 text-purple-600' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer mb-2 last:mb-0"
          >
            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5 ${item.badge}`}>
              {item.type}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
              <p className="text-xs text-slate-400">{item.author} · {item.time} read</p>
            </div>
          </div>
        ))}

        {/* AI prompt bar */}
        <div className="mt-4 flex items-center gap-2 bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-100 rounded-xl px-3 py-2.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex-shrink-0 flex items-center justify-center">
            <Zap size={10} className="text-white" />
          </div>
          <span className="text-xs text-slate-500 italic">Ask the AI: "What are our deployment standards?"</span>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-3 py-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs font-semibold text-slate-700">Knowledge Preserved</span>
      </div>

      <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-brand-600 to-purple-600 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
        <Users size={12} className="text-white" />
        <span className="text-xs font-semibold text-white">Teams Empowered</span>
      </div>
    </div>
  )
}

/* ─── Hero Section ────────────────────────────────── */
export default function HeroSection() {
  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white scroll-mt-nav"
      aria-labelledby="hero-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-right gradient blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        {/* Bottom-left gradient blob */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50/60 to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%234f46e5' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold text-brand-700 tracking-wide uppercase">
                AI-Powered Enterprise Knowledge Management
              </span>
            </div>

            {/* Main headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 animate-slide-up"
            >
              Turn Professional{' '}
              <span className="gradient-text">Expertise</span>{' '}
              into an AI-Powered{' '}
              <span className="relative inline-block">
                Knowledge Hub
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up delay-100">
              Preserve the knowledge that matters. Capture expert experience, organize company knowledge, and give employees instant access to practical guidance through an AI-powered knowledge platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-slide-up delay-200">
              <button
                onClick={() => handleScroll('register')}
                className="btn-primary text-base px-8 py-4 rounded-xl"
                aria-label="Get started with LegacyAI – scroll to company registration"
              >
                Get Started
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <Link
                to="/login"
                className="btn-secondary text-base px-8 py-4 rounded-xl"
                aria-label="Login to your LegacyAI workspace"
              >
                Login to Workspace
              </Link>
            </div>

            {/* Trust statement */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start animate-slide-up delay-300">
              {[
                { icon: Shield, text: 'Preserve Knowledge' },
                { icon: Zap, text: 'Accelerate Onboarding' },
                { icon: Users, text: 'Empower Employees' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Icon size={14} className="text-brand-500 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <KnowledgeVisual />
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-16 pt-10 border-t border-slate-100 animate-fade-in delay-500">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Built for modern enterprises
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: BookOpen, label: 'Centralized Knowledge', color: 'text-brand-600' },
              { icon: Play, label: 'Expert Video Library', color: 'text-purple-600' },
              { icon: Zap, label: 'AI-Powered Answers', color: 'text-indigo-600' },
              { icon: Shield, label: 'Role-Based Access', color: 'text-blue-600' },
            ].map(({ icon, label, color }) => (
              <StatBadge key={label} icon={icon} label={label} color={color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
