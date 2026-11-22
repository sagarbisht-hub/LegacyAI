import React from 'react'
import {
  Video, FileText, Search, MessageSquare, Layers, RefreshCw, Brain
} from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const capabilities = [
  { icon: Video, text: 'Capture expert knowledge through video demonstrations and walkthroughs' },
  { icon: FileText, text: 'Upload SOPs, process documents, and technical references' },
  { icon: Layers, text: 'Organize knowledge by department, project, technology and skill level' },
  { icon: Search, text: 'Search across the full organizational knowledge repository instantly' },
  { icon: MessageSquare, text: 'Ask an AI assistant work-related questions and get contextual answers' },
  { icon: RefreshCw, text: 'Continuously improve the repository using employee feedback and usage data' },
]

/* ─── Platform visual mockup ───────────────────────── */
function PlatformMockup() {
  return (
    <div className="relative" aria-hidden="true">

      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-3xl blur-2xl scale-105" />

      {/* Main card */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

        {/* Window chrome */}
        <div className="bg-slate-900 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
              app.legacyai.com/knowledge
            </div>
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-72">

          {/* Sidebar */}
          <div className="w-44 bg-slate-50 border-r border-slate-100 p-3 flex-shrink-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Departments</p>
            {['Engineering', 'Product', 'HR & People', 'Finance', 'Operations'].map((dept, i) => (
              <div
                key={dept}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-1 text-xs font-medium cursor-pointer ${
                  i === 0
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-slate-300'}`} />
                {dept}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Search */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mb-4">
              <Search size={13} className="text-slate-400" />
              <span className="text-xs text-slate-400">Search knowledge base…</span>
            </div>

            {/* Content items */}
            <div className="space-y-2">
              {[
                { icon: Video, label: 'Video', title: 'System Architecture Overview', views: '47 views', color: 'bg-blue-100 text-blue-600' },
                { icon: FileText, label: 'SOP', title: 'Code Review Standards', views: '89 views', color: 'bg-emerald-100 text-emerald-600' },
                { icon: MessageSquare, label: 'Q&A', title: 'AI: How do we deploy to prod?', views: 'AI Answer', color: 'bg-purple-100 text-purple-600' },
                { icon: FileText, label: 'Doc', title: 'Onboarding Checklist v3', views: '124 views', color: 'bg-amber-100 text-amber-600' },
              ].map(({ icon: Icon, label, title, views, color }) => (
                <div key={title} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${color}`}>{label}</span>
                  <span className="flex-1 text-xs font-medium text-slate-700 truncate">{title}</span>
                  <span className="text-[10px] text-slate-400">{views}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI bar at bottom */}
        <div className="border-t border-slate-100 px-4 py-3 bg-gradient-to-r from-brand-50 to-purple-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Brain size={12} className="text-white" />
            </div>
            <p className="text-xs text-slate-500 italic flex-1">
              "Based on our documentation, the deployment process involves…"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section
      id="what-is"
      className="section-pad bg-white scroll-mt-nav"
      aria-labelledby="about-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-5">
              <Brain size={13} className="text-brand-600" aria-hidden="true" />
              <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">The Platform</span>
            </div>

            <h2 id="about-heading" className="section-heading mb-5">
              What is <span className="gradient-text">LegacyAI</span>?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6 text-base">
              LegacyAI transforms individual professional expertise into a durable organizational knowledge resource. It gives organizations a structured platform to capture, preserve, and deliver the practical knowledge that employees accumulate over years of real-world experience.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              Rather than allowing institutional knowledge to remain siloed in individual employees' heads or scattered across email threads and personal notes, LegacyAI centralizes it into a searchable, AI-enhanced repository that the entire organization can benefit from.
            </p>

            {/* Capability list */}
            <ul className="space-y-3" aria-label="LegacyAI capabilities">
              {capabilities.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-brand-600" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <PlatformMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
