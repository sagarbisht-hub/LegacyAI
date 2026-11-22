import React, { useState, useRef, useEffect } from 'react'
import { Bell, X, Building2, BookOpen, MessageSquare, BarChart2, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { NOTIFICATIONS } from '../../data/demoData'

const TYPE_ICONS = {
  registration: Building2,
  knowledge: BookOpen,
  ai: MessageSquare,
  report: BarChart2,
  employee: Zap,
  learning: BookOpen,
  answer: MessageSquare,
  streak: Zap,
}

export default function NotificationDropdown() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(NOTIFICATIONS[user?.role] || [])
  const ref = useRef(null)

  const unread = notes.filter((n) => !n.read).length

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAllRead = () => setNotes((prev) => prev.map((n) => ({ ...n, read: true })))
  const dismiss = (id) => setNotes((prev) => prev.filter((n) => n.id !== id))

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-slate-900/80 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-bold text-white">Notifications</h3>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notes.length === 0 ? (
              <p className="text-center text-slate-500 text-sm py-8">No notifications</p>
            ) : (
              notes.map((note) => {
                const Icon = TYPE_ICONS[note.type] || Bell
                return (
                  <div key={note.id} className={`flex items-start gap-3 px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors group ${!note.read ? 'bg-slate-700/20' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!note.read ? 'bg-brand-900/50' : 'bg-slate-700'}`}>
                      <Icon size={14} className={!note.read ? 'text-brand-400' : 'text-slate-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${!note.read ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{note.text}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{note.time}</p>
                    </div>
                    <button onClick={() => dismiss(note.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 transition-all flex-shrink-0 mt-0.5">
                      <X size={12} />
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <div className="px-4 py-3 text-center">
            <button onClick={() => setOpen(false)} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
