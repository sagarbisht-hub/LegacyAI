import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Building2, User, CheckCircle, ArrowRight } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const roles = [
  {
    icon: Shield,
    role: 'Super Admin',
    tagline: 'Platform-level oversight and control',
    gradient: 'from-slate-700 to-slate-900',
    ring: 'ring-slate-200',
    badge: 'bg-slate-100 text-slate-600',
    permissions: [
      'Review and approve company registrations',
      'Manage all platform users and organizations',
      'Monitor platform-wide usage and analytics',
      'Configure system-level settings and policies',
      'Access audit logs and security reports',
    ],
  },
  {
    icon: Building2,
    role: 'Company Admin',
    tagline: 'Manage your organization\'s knowledge hub',
    gradient: 'from-brand-600 to-violet-700',
    ring: 'ring-brand-200',
    badge: 'bg-brand-50 text-brand-700',
    highlight: true,
    permissions: [
      'Invite and manage employees and experts',
      'Upload and organize knowledge content',
      'Create departments and learning paths',
      'Monitor employee learning progress',
      'View company-level reports and analytics',
    ],
  },
  {
    icon: User,
    role: 'Employee',
    tagline: 'Access the knowledge that accelerates your work',
    gradient: 'from-emerald-500 to-teal-600',
    ring: 'ring-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700',
    permissions: [
      'Browse and search the knowledge repository',
      'Watch expert video demonstrations',
      'Access SOPs and reference documents',
      'Ask the AI assistant work-related questions',
      'Track personal learning progress',
    ],
  },
]

function RoleCard({ role, index, visible }) {
  const Icon = role.icon
  return (
    <div
      className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group ${role.ring} ring-1 ${
        role.highlight ? 'ring-2 ring-brand-300 shadow-brand-100/50' : ''
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Highlight label */}
      {role.highlight && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brand-600 to-violet-600 text-white text-center text-[10px] font-bold py-1 tracking-widest uppercase">
          Most Common Role
        </div>
      )}

      {/* Card content */}
      <div className={`p-7 ${role.highlight ? 'pt-9' : ''}`}>

        {/* Icon + Role badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg`}>
            <Icon size={26} className="text-white" aria-hidden="true" />
          </div>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${role.badge} border`}>
            {role.role}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">{role.role}</h3>
        <p className="text-sm text-slate-500 mb-6">{role.tagline}</p>

        {/* Permissions list */}
        <ul className="space-y-2.5" aria-label={`${role.role} permissions`}>
          {role.permissions.map((perm) => (
            <li key={perm} className="flex items-start gap-2.5">
              <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-slate-600">{perm}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover bottom bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />
    </div>
  )
}

export default function RoleSection() {
  const [ref, visible] = useIntersectionObserver()

  return (
    <section
      id="roles"
      className="section-pad bg-slate-50 scroll-mt-nav"
      aria-labelledby="roles-heading"
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
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Access Control</span>
          </div>
          <h2 id="roles-heading" className="section-heading mb-4">
            One Platform.{' '}
            <span className="gradient-text">Different Roles.</span>
          </h2>
          <p className="section-sub">
            LegacyAI is designed with role-based access so every person in the organization gets exactly what they need — nothing more, nothing less.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <RoleCard key={role.role} role={role} index={i} visible={visible} />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-600 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm text-slate-500 mb-5">
            Dashboards and role-specific interfaces are coming soon. Register your company to be among the first.
          </p>
          <Link
            to="/login"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Login to your LegacyAI workspace"
          >
            Login to Your Workspace
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
