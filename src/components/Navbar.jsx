import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Brain } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Platform', href: '/#about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Help', href: '/#help' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            aria-label="LegacyAI – Home"
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all duration-200">
                <Brain size={20} className="text-white" aria-hidden="true" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                Legacy<span className="text-brand-600">AI</span>
              </div>
              <div className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
                Knowledge • Experience • Intelligence
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#register"
              onClick={(e) => handleAnchorClick(e, '/#register')}
              className="btn-secondary text-sm py-2.5 px-5"
            >
              Register Company
            </a>
            <Link
              to="/login"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-slate-100 shadow-xl`}
        aria-hidden={!menuOpen}
      >
        <nav className="px-4 pt-4 pb-6 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all duration-150"
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-3 border-t border-slate-100 mt-3">
            <a
              href="/#register"
              onClick={(e) => handleAnchorClick(e, '/#register')}
              className="btn-secondary w-full text-sm justify-center"
              tabIndex={menuOpen ? 0 : -1}
            >
              Register Company
            </a>
            <Link
              to="/login"
              className="btn-primary w-full text-sm justify-center"
              tabIndex={menuOpen ? 0 : -1}
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
