import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ROLE_LABELS } from '../../services/authService'

function getInitials(name = '') {
  return name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2)
}

function getRoleColor(role) {
  if (role === 'super-admin') return 'from-amber-500 to-orange-600'
  if (role === 'company-admin') return 'from-brand-600 to-violet-600'
  return 'from-emerald-500 to-teal-600'
}

/**
 * DashboardSidebar
 * Props:
 *   navItems – [{ label, path, icon: LucideIcon, badge? }]
 *   mobileOpen – boolean
 *   onClose – close mobile drawer
 */
export default function DashboardSidebar({ navItems, mobileOpen, onClose }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="LegacyAI home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-md">
            <Brain size={18} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Legacy<span className="text-brand-400">AI</span></p>
            <p className="text-[9px] text-slate-500 tracking-wider uppercase">Knowledge Hub</p>
          </div>
        </Link>
        {/* Mobile close */}
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* User mini-card */}
      {user && (
        <div className="mx-3 mt-4 mb-2 px-3 py-3 bg-slate-800 rounded-xl border border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center flex-shrink-0`}>
              <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5" aria-label="Dashboard navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path + '/') && item.path.length > 10)
          const exactActive = pathname === item.path
          const isActive = item.exact ? exactActive : active

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600/20 to-purple-600/10 text-white border border-brand-700/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-brand-500 to-purple-500 rounded-full" aria-hidden="true" />
              )}
              <Icon size={17} className={isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'} aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-slate-800 pt-3">
        <button
          onClick={() => { onClose?.(); logout() }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-all duration-150"
        >
          <LogOut size={17} className="text-slate-500" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          {/* Drawer */}
          <aside className="relative w-64 bg-slate-900 border-r border-slate-800 h-full shadow-2xl flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
