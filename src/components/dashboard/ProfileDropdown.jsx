import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, ChevronDown, LogOut, Settings } from 'lucide-react'
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

function getProfilePath(role) {
  if (role === 'super-admin') return '/super-admin/profile'
  if (role === 'company-admin') return '/company-admin/profile'
  return '/employee/profile'
}

export default function ProfileDropdown() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center flex-shrink-0`}>
          <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
        </div>
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user.name}</p>
          <p className="text-[10px] text-slate-400">{ROLE_LABELS[user.role]}</p>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-72 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-slate-900/80 z-50 overflow-hidden">
          {/* User info header */}
          <div className="px-5 py-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center flex-shrink-0`}>
                <span className="text-base font-bold text-white">{getInitials(user.name)}</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                  {ROLE_LABELS[user.role]}
                </span>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-xs text-slate-500"><span className="text-slate-400 font-medium">Company:</span> {user.company}</p>
              <p className="text-xs text-slate-500"><span className="text-slate-400 font-medium">Department:</span> {user.department}</p>
            </div>
          </div>

          {/* Links */}
          <div className="py-2">
            <Link
              to={getProfilePath(user.role)}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <User size={15} className="text-slate-400" />
              My Profile
            </Link>
            <Link
              to={getProfilePath(user.role)}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Settings size={15} className="text-slate-400" />
              Account Settings
            </Link>
          </div>

          <div className="border-t border-slate-700 py-2">
            <button
              onClick={() => { setOpen(false); logout() }}
              className="flex items-center gap-3 w-full px-5 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
