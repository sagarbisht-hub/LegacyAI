import React, { useState } from 'react'
import { Plus, X, Loader2, CheckCircle, Eye, TrendingUp, UserX } from 'lucide-react'
import CALayout from './CALayout'
import { EMPLOYEES } from '../../data/demoData'

const DEPTS = ['All', 'Software Engineering', 'DevOps', 'QA Engineering', 'Product Management', 'Human Resources', 'Finance', 'Operations']

function AddEmployeeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', department: '', designation: '', role: 'employee' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.department) e.department = 'Department required'
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    onAdd(form)
    setLoading(false)
    onClose()
  }

  const depts = DEPTS.slice(1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Add Employee</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          {[
            { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Priya Verma' },
            { id: 'email', label: 'Email *', type: 'email', placeholder: 'priya@techcorp.com' },
            { id: 'designation', label: 'Designation', type: 'text', placeholder: 'Senior Developer' },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">{f.label}</label>
              <input
                type={f.type} placeholder={f.placeholder} value={form[f.id]}
                onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                className={`w-full px-3 py-2.5 rounded-xl bg-slate-900 border text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors[f.id] ? 'border-red-700' : 'border-slate-600'}`}
              />
              {errors[f.id] && <p className="text-xs text-red-400 mt-1">{errors[f.id]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department *</label>
            <select value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
              className={`w-full px-3 py-2.5 rounded-xl bg-slate-900 border text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.department ? 'border-red-700' : 'border-slate-600'}`}>
              <option value="">Select department…</option>
              {depts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={15} className="animate-spin" />Creating…</> : <>Create Employee</>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function CAEmployees() {
  const [employees, setEmployees] = useState(EMPLOYEES)
  const [dept, setDept] = useState('All')
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const filtered = employees.filter((e) => {
    const matchDept = dept === 'All' || e.department === dept
    const matchSearch = !search || [e.name, e.email, e.department].some((f) => f.toLowerCase().includes(search.toLowerCase()))
    return matchDept && matchSearch
  })

  const handleAdd = (form) => {
    const newEmp = { id: `e_new_${Date.now()}`, ...form, progress: 0, status: 'active', lastActive: 'Today' }
    setEmployees((p) => [newEmp, ...p])
    showToast(`${form.name} added successfully.`)
  }

  const deactivate = (id) => {
    setEmployees((p) => p.map((e) => e.id === id ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' } : e))
  }

  return (
    <CALayout breadcrumbs={[{ label: 'Employees' }]}>
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl bg-emerald-900 border border-emerald-700 text-emerald-300 text-sm font-semibold flex items-center gap-2">
          <CheckCircle size={15} />{toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Management</h1>
          <p className="text-slate-400 text-sm mt-1">{employees.filter((e) => e.status === 'active').length} active employees</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-brand-500/20">
          <Plus size={16} />Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input type="search" placeholder="Search employees…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        <div className="flex gap-2 flex-wrap">
          {DEPTS.map((d) => (
            <button key={d} onClick={() => setDept(d)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${dept === d ? 'bg-brand-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead><tr className="border-b border-slate-700">
              {['Employee', 'Department', 'Designation', 'Progress', 'Status', 'Last Active', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500 text-sm">No employees match your filters.</td></tr>
              ) : filtered.map((e) => (
                <tr key={e.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">{e.name.split(' ').map((p) => p[0]).join('').slice(0,2)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{e.name}</p>
                        <p className="text-xs text-slate-500">{e.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-300">{e.department}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{e.designation || '—'}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full" style={{ width: `${e.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-white">{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${e.status === 'active' ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>{e.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{e.lastActive}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition-colors" title="View Profile"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition-colors" title="View Progress"><TrendingUp size={14} /></button>
                      <button onClick={() => deactivate(e.id)} className="p-1.5 rounded-lg bg-red-900/40 text-red-400 hover:bg-red-800/50 transition-colors" title="Deactivate"><UserX size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddEmployeeModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </CALayout>
  )
}
