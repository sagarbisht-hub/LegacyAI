import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Brain size={24} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Legacy<span className="text-brand-600">AI</span>
            </span>
          </Link>
        </div>

        {/* 404 */}
        <div className="text-8xl font-black text-brand-100 mb-2" aria-hidden="true">404</div>

        <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-amber-500" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
          aria-label="Return to LegacyAI home page"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
