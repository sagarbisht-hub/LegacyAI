import React, { useState } from 'react'
import { Star, Mail, Video, FileText, Plus, X, Loader2, CheckCircle } from 'lucide-react'
import CALayout from './CALayout'
import { EXPERTS } from '../../data/demoData'

function InviteModal({ onClose, onInvite }) {
  const [form, setForm] = useState({ name: '', email: '', department: '', expertise: '', experience: '' })
  const [loading, setLoading] = useState(false)
  const depts = ['Software Engineering', 'DevOps', 'QA Engineering', 'Human Resources', 'Finance', 'Operations', 'IT']

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    onInvite(form)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Invite Expert</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          {[
            { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Amit Kapoor' },
            { id: 'email', label: 'Work Email *', type: 'email', placeholder: 'amit@techcorp.com' },
            { id: 'expertise', label: 'Area of Expertise', type: 'text', placeholder: 'Backend Architecture & APIs' },
            { id: 'experience', label: 'Years of Experience', type: 'number', placeholder: '10' },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.id]}
                onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
            <select value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select…</option>
              {depts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={15} className="animate-spin" />Sending invite…</> : 'Send Invitation'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function CAExperts() {
  const [experts, setExperts] = useState(EXPERTS)
  const [showInvite, setShowInvite] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleInvite = (form) => {
    setExperts((p) => [{ id: `ex_${Date.now()}`, ...form, experience: Number(form.experience) || 0, contributions: 0, videos: 0, documents: 0, status: 'invited' }, ...p])
    showToast(`Invitation sent to ${form.name}.`)
  }

  return (
    <CALayout breadcrumbs={[{ label: 'Experts' }]}>
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl bg-emerald-900 border border-emerald-700 text-emerald-300 text-sm font-semibold flex items-center gap-2">
          <CheckCircle size={15} />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Experts & Knowledge Contributors</h1>
          <p className="text-slate-400 text-sm mt-1">{experts.filter((e) => e.status === 'active').length} active knowledge contributors</p>
        </div>
        <button onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg">
          <Plus size={16} />Invite Expert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {experts.map((ex) => (
          <div key={ex.id} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-base font-black text-white">{ex.name.split(' ').map((p) => p[0]).join('').slice(0,2)}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{ex.name}</p>
                  <p className="text-xs text-slate-400">{ex.department}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ex.status === 'active' ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' : ex.status === 'invited' ? 'bg-amber-900/40 text-amber-400 border-amber-800' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                {ex.status}
              </span>
            </div>

            {/* Expertise */}
            <div className="bg-slate-900/50 rounded-xl px-3 py-2.5 mb-4 border border-slate-700">
              <div className="flex items-center gap-1.5 mb-1">
                <Star size={11} className="text-amber-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Expertise</p>
              </div>
              <p className="text-sm font-semibold text-slate-200">{ex.expertise || 'Not specified'}</p>
              <p className="text-xs text-slate-500 mt-0.5">{ex.experience} years experience</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Total', value: ex.contributions || 0 },
                { label: 'Videos', value: ex.videos || 0, icon: Video },
                { label: 'Docs', value: ex.documents || 0, icon: FileText },
              ].map((s) => (
                <div key={s.label} className="text-center bg-slate-900/50 rounded-xl py-2 border border-slate-700">
                  <p className="text-base font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <a href={`mailto:${ex.email}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-400 transition-colors">
              <Mail size={12} />{ex.email}
            </a>
          </div>
        ))}
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} onInvite={handleInvite} />}
    </CALayout>
  )
}
