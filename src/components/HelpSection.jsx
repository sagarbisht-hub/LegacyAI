import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Building2, Headphones, ArrowRight } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const helpCards = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description:
      'New to LegacyAI? Learn how the platform works, what each role can do, and how to get your organization set up and running quickly.',
    cta: 'View Help',
    href: '/help',
    gradient: 'from-brand-500 to-violet-600',
  },
  {
    icon: Building2,
    title: 'Company Registration',
    description:
      'Need guidance on submitting your organization? We walk you through each step of the company registration process from start to approval.',
    cta: 'Registration Guide',
    href: '/help#registration',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description:
      'Experiencing a technical issue, login problem, or need direct assistance? Our support team is here to help you resolve it quickly.',
    cta: 'Contact Support',
    href: '/#contact',
    isAnchor: true,
    gradient: 'from-purple-500 to-pink-500',
  },
]

export default function HelpSection() {
  const [ref, visible] = useIntersectionObserver()

  const handleAnchor = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="help"
      className="section-pad bg-white scroll-mt-nav"
      aria-labelledby="help-heading"
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
            <Headphones size={13} className="text-brand-600" aria-hidden="true" />
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Support</span>
          </div>
          <h2 id="help-heading" className="section-heading mb-4">
            Need <span className="gradient-text">Help?</span>
          </h2>
          <p className="section-sub">
            Have questions about LegacyAI, company registration, login, or using the knowledge platform? We're here to help.
          </p>
        </div>

        {/* Help cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helpCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${card.gradient}`} aria-hidden="true" />

                <div className="p-7">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className="text-white" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{card.description}</p>

                  {card.isAnchor ? (
                    <a
                      href={card.href}
                      onClick={(e) => handleAnchor(e, card.href)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 group/link"
                      aria-label={`${card.cta} – ${card.title}`}
                    >
                      {card.cta}
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      to={card.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 group/link"
                      aria-label={`${card.cta} – ${card.title}`}
                    >
                      {card.cta}
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
