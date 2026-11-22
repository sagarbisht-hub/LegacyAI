import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, ArrowLeft, Clock } from 'lucide-react'

/**
 * Generic "Coming Soon" page used for all future routes.
 * The page label is derived from the current URL path.
 */
const routeLabels = {
  '/login': 'Login',
  '/register-company': 'Company Registration',
  '/help': 'Help Center',
  '/contact': 'Contact',
  '/super-admin': 'Super Admin Dashboard',
  '/company-admin': 'Company Admin Dashboard',
  '/employee': 'Employee Dashboard',
  '/knowledge': 'Knowledge Repository',
  '/ai-assistant': 'AI Knowledge Assistant',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms & Conditions',
  '/cookies': 'Cookie Policy',
  '/security': 'Security',
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const label = routeLabels[pathname] ?? pathname.replace('/', '').replace(/-/g, ' ')

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 px-4">
      <div className="max-w-lg w-full text-center">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            to="/"
            aria-label="Return to LegacyAI home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl p-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all">
              <Brain size={24} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
              Legacy<span className="text-brand-600">AI</span>
            </span>
          </Link>
        </div>

        {/* Clock icon */}
        <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-100 flex items-center justify-center mx-auto mb-6">
          <Clock size={36} className="text-brand-500" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 capitalize">
          {label}
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          This module is currently under development and will be available soon.
          We're building something great — stay tuned.
        </p>

        {/* Progress bar decoration */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full"
            style={{ width: '65%' }}
            role="progressbar"
            aria-valuenow={65}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Development progress"
          />
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
          aria-label="Go back to LegacyAI home page"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>

        <p className="mt-6 text-xs text-slate-400">
          © 2026 LegacyAI. All rights reserved.
        </p>
      </div>
    </main>
  )
}
