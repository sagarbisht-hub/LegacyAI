import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, Brain, ChevronRight } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'

/**
 * DashboardTopbar
 * Props:
 *   onMenuToggle – fires when hamburger is clicked (mobile sidebar)
 *   breadcrumbs  – array of { label, path? }
 *   searchPlaceholder – optional
 */
export default function DashboardTopbar({ onMenuToggle, breadcrumbs = [], searchPlaceholder = 'Search…' }) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center gap-4 px-4 sm:px-6 flex-shrink-0 z-30">
      {/* Mobile sidebar toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile logo (hidden on desktop — sidebar has it) */}
      <Link to="/" className="lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center">
          <Brain size={14} className="text-white" />
        </div>
        <span className="text-sm font-bold text-white">LegacyAI</span>
      </Link>

      {/* Breadcrumb */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1 text-xs text-slate-500 flex-1 min-w-0">
          <Link to="/" className="hover:text-slate-300 transition-colors flex-shrink-0">LegacyAI</Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight size={12} className="text-slate-700 flex-shrink-0" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-slate-300 transition-colors truncate">{crumb.label}</Link>
              ) : (
                <span className="text-slate-300 font-medium truncate">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 w-56">
        <Search size={14} className="text-slate-400 flex-shrink-0" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          className="bg-transparent text-xs text-slate-300 placeholder-slate-500 outline-none w-full"
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Notifications + Profile */}
      <NotificationDropdown />
      <ProfileDropdown />
    </header>
  )
}
