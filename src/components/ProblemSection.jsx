import React from 'react'
import { AlertTriangle, Clock, RefreshCw, UserCheck } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const problems = [
  {
    icon: AlertTriangle,
    title: 'Knowledge Loss',
    description:
      'Critical domain expertise can disappear when experienced employees leave. Years of accumulated knowledge — troubleshooting patterns, vendor relationships, project lessons — walk out the door.',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    shadow: 'hover:shadow-red-100',
  },
  {
    icon: Clock,
    title: 'Longer Onboarding',
    description:
      'New employees often need significant time to understand processes and reach full productivity. Without structured knowledge transfer, they rely on interrupting senior colleagues for answers.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    shadow: 'hover:shadow-amber-100',
  },
  {
    icon: RefreshCw,
    title: 'Repeated Errors',
    description:
      'Teams may repeat avoidable mistakes when practical experience is not documented. The same challenges are encountered again and again because solutions were never captured for reuse.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    shadow: 'hover:shadow-orange-100',
  },
  {
    icon: UserCheck,
    title: 'Expert Dependency',
    description:
      'Day-to-day operations can become dependent on a small number of experienced employees. This creates bottlenecks, increases workload on key people, and becomes a single point of failure.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    shadow: 'hover:shadow-rose-100',
  },
]

function ProblemCard({ icon: Icon, title, description, color, bg, border, shadow, index, visible }) {
  return (
    <div
      className={`card ${border} ${shadow} transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl ${bg} ${border} border flex items-center justify-center mb-4`}>
        <Icon size={22} className={color} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  )
}

export default function ProblemSection() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section
      id="about"
      className="section-pad bg-slate-50 scroll-mt-nav"
      aria-labelledby="problem-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div
          className={`text-center mb-14 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-4">
            <AlertTriangle size={13} className="text-red-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">The Problem</span>
          </div>
          <h2 id="problem-heading" className="section-heading mb-4">
            Why Preserve Organizational Knowledge?
          </h2>
          <p className="section-sub">
            Organizations accumulate valuable knowledge through years of employee experience. When experienced employees leave, practical workflows, troubleshooting methods, project lessons, and specialized expertise can be lost.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <ProblemCard
              key={problem.title}
              {...problem}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className={`mt-12 text-center transition-all duration-600 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            LegacyAI was designed to solve these challenges — giving organizations a structured way to capture, organize, and deliver institutional knowledge at scale.
          </p>
        </div>
      </div>
    </section>
  )
}
