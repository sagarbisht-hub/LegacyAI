import React from 'react'
import { Video, Database, MessageSquare, Layers, Search, RefreshCw } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const features = [
  {
    icon: Video,
    title: 'Multimedia Knowledge Capture',
    description:
      'Capture practical expertise through videos, screen recordings, live demonstrations and structured documentation. Subject matter experts share knowledge in the format that works best for them.',
    gradient: 'from-blue-500 to-brand-600',
    glow: 'hover:shadow-blue-100',
  },
  {
    icon: Database,
    title: 'Centralized Knowledge Repository',
    description:
      'Keep videos, SOPs, documents, terminology guides and reference materials organized in one secure, accessible location. No more hunting through shared drives or email archives.',
    gradient: 'from-brand-600 to-violet-600',
    glow: 'hover:shadow-brand-100',
  },
  {
    icon: MessageSquare,
    title: 'AI-Powered Knowledge Assistant',
    description:
      'Allow employees to ask work-related questions in plain language and retrieve relevant, contextually accurate company knowledge. Powered by LLM and your organization\'s own content.',
    gradient: 'from-violet-600 to-purple-600',
    glow: 'hover:shadow-violet-100',
    highlight: true,
  },
  {
    icon: Layers,
    title: 'Department-Based Learning',
    description:
      'Organize knowledge according to departments, roles, projects and skill levels. Employees see content relevant to their context without being overwhelmed by the full repository.',
    gradient: 'from-purple-600 to-indigo-600',
    glow: 'hover:shadow-purple-100',
  },
  {
    icon: Search,
    title: 'Searchable Knowledge',
    description:
      'Find relevant organizational knowledge quickly through full-text search, tag filtering, and AI-assisted semantic retrieval. The right answer surfaces fast, regardless of where it was stored.',
    gradient: 'from-indigo-500 to-blue-500',
    glow: 'hover:shadow-indigo-100',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    description:
      'Use employee feedback, unanswered AI queries, and usage analytics to identify gaps and improve the knowledge repository over time. The platform grows smarter as the organization grows.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'hover:shadow-emerald-100',
  },
]

function FeatureCard({ feature, index, visible }) {
  const Icon = feature.icon
  return (
    <div
      className={`relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl ${feature.glow} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${feature.highlight ? 'ring-2 ring-brand-200' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient background blob on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`}
        aria-hidden="true"
      />

      {/* Highlight badge */}
      {feature.highlight && (
        <div className="absolute top-4 right-4 text-[10px] font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-white px-2 py-0.5 rounded-full">
          AI-Powered
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} className="text-white" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-2.5 group-hover:text-brand-700 transition-colors">
        {feature.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
    </div>
  )
}

export default function FeaturesSection() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section
      id="features"
      className="section-pad bg-white scroll-mt-nav"
      aria-labelledby="features-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Platform Features</span>
          </div>
          <h2 id="features-heading" className="section-heading mb-4">
            Everything Your Organization Needs to{' '}
            <span className="gradient-text">Preserve Expertise</span>
          </h2>
          <p className="section-sub">
            A complete suite of tools purpose-built for enterprise knowledge management — from capture to AI-powered retrieval.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
