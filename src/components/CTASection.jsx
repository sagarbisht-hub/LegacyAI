import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

export default function CTASection() {
  const [ref, visible] = useIntersectionObserver()

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24 px-4"
      aria-labelledby="cta-heading"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-900 to-purple-950" aria-hidden="true" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" aria-hidden="true" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">

        {/* Icon */}
        <div
          className={`flex justify-center mb-8 transition-all duration-600 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-brand-500/30">
            <Brain size={36} className="text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Headline */}
        <h2
          id="cta-heading"
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 transition-all duration-600 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Preserve Experience.{' '}
          <span className="text-brand-300">Empower People.</span>{' '}
          <br className="hidden sm:block" />
          Build Organizational Intelligence.
        </h2>

        {/* Subtext */}
        <p
          className={`text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-600 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Turn valuable professional expertise into searchable, reusable organizational knowledge with LegacyAI. Don't let decades of experience walk out the door.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-600 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => handleScroll('register')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 font-bold rounded-xl shadow-xl hover:bg-brand-50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-700"
            aria-label="Register your company with LegacyAI"
          >
            Register Your Company
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <Link
            to="/login"
            className="btn-outline-white text-base px-8 py-4"
            aria-label="Login to your LegacyAI workspace"
          >
            Login
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-6 transition-all duration-600 delay-400 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Platform highlights"
        >
          {[
            'No credit card required to register',
            'Enterprise-grade security',
            'Dedicated onboarding support',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
