import React from 'react'
import { Upload, Database, GraduationCap, MessageSquare, BarChart2 } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Collect',
    description:
      'Capture videos, SOPs, documents and practical knowledge from experienced employees. Subject matter experts record walkthroughs, document processes, and share hard-earned insights.',
    color: 'from-blue-500 to-brand-600',
    light: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    number: '02',
    icon: Database,
    title: 'Repository',
    description:
      'Organize knowledge by department, project, technology and skill level. Content is indexed, tagged and made searchable so the right information reaches the right people.',
    color: 'from-brand-600 to-violet-600',
    light: 'bg-brand-50 text-brand-600 border-brand-100',
  },
  {
    number: '03',
    icon: GraduationCap,
    title: 'Learn',
    description:
      'Employees access relevant training material and organizational knowledge at their own pace. Browse by department, search by topic, or follow structured learning paths.',
    color: 'from-violet-600 to-purple-600',
    light: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'AI Chatbot',
    description:
      'Employees ask work-related questions and receive contextual answers drawn directly from the company knowledge repository. No more waiting for a senior colleague to be available.',
    color: 'from-purple-600 to-pink-600',
    light: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    number: '05',
    icon: BarChart2,
    title: 'Feedback',
    description:
      'Unanswered questions and employee feedback help identify gaps and keep the knowledge base current. The platform improves continuously alongside the organization.',
    color: 'from-pink-500 to-rose-500',
    light: 'bg-pink-50 text-pink-600 border-pink-100',
  },
]

function StepCard({ step, index, visible }) {
  const Icon = step.icon
  return (
    <div
      className={`relative flex flex-col items-center text-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Connector line (desktop only, not on last) */}
      {index < steps.length - 1 && (
        <div
          className="hidden xl:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 bg-gradient-to-r from-slate-200 to-slate-100 z-0"
          aria-hidden="true"
        />
      )}

      {/* Number + icon stack */}
      <div className="relative z-10 mb-4">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mx-auto`}>
          <Icon size={30} className="text-white" aria-hidden="true" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-100 shadow-md flex items-center justify-center">
          <span className="text-[10px] font-black text-slate-600">{step.number}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed max-w-[190px]">{step.description}</p>
    </div>
  )
}

export default function HowItWorks() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section
      id="how-it-works"
      className="section-pad bg-slate-50 scroll-mt-nav"
      aria-labelledby="how-heading"
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
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">The Process</span>
          </div>
          <h2 id="how-heading" className="section-heading mb-4">
            How <span className="gradient-text">LegacyAI</span> Works
          </h2>
          <p className="section-sub">
            A simple five-step cycle that turns individual expertise into organizational intelligence — and keeps it growing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} visible={visible} />
          ))}
        </div>

        {/* Flow summary pill */}
        <div
          className={`mt-14 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-400 transition-all duration-600 delay-600 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Process flow summary"
        >
          {steps.map((s, i) => (
            <React.Fragment key={s.number}>
              <span className="px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm text-slate-600 font-semibold">
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <span className="text-slate-300" aria-hidden="true">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
