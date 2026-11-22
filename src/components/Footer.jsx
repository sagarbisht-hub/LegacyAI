import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Home', href: '/#home', anchor: true },
    { label: 'About', href: '/#about', anchor: true },
    { label: 'How It Works', href: '/#how-it-works', anchor: true },
    { label: 'Features', href: '/#features', anchor: true },
  ],
  Company: [
    { label: 'Register Company', href: '/#register', anchor: true },
    { label: 'Contact', href: '/#contact', anchor: true },
    { label: 'Help Center', href: '/help' },
    { label: 'Login', href: '/login' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Security', href: '/security' },
  ],
}

const socialLinks = [
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/legacyai' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/legacyai' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/legacyai' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@legacyai' },
]

export default function Footer() {
  const handleAnchor = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-5 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
              aria-label="LegacyAI – Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-md">
                <Brain size={20} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  Legacy<span className="text-brand-400">AI</span>
                </div>
                <div className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
                  Knowledge • Experience • Intelligence
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Turn Professional Expertise into an AI-Powered Knowledge Hub. Preserve the knowledge that moves your organization forward.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-brand-600 border border-slate-700 hover:border-brand-500 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <Icon size={15} className="text-slate-400 hover:text-white" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Contact shortcut */}
            <a
              href="mailto:hello@legacyai.com"
              className="inline-flex items-center gap-2 mt-6 text-sm text-slate-400 hover:text-brand-400 transition-colors"
              aria-label="Email LegacyAI support"
            >
              <Mail size={14} aria-hidden="true" />
              hello@legacyai.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href, anchor }) => (
                  <li key={label}>
                    {anchor ? (
                      <a
                        href={href}
                        onClick={(e) => handleAnchor(e, href)}
                        className="text-sm text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus:text-brand-400"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="text-sm text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus:text-brand-400"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © 2026 LegacyAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span className="text-xs text-slate-500">
              Built with ❤️ for organizations that value knowledge
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
