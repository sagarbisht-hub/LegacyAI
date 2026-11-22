import React, { useState, useEffect } from 'react'
import { Search, Filter, Video, FileText, BookOpen, Eye, Clock, User, X } from 'lucide-react'
import CALayout from './CALayout'
import { getKnowledgeItems } from '../../services/knowledgeService'

const TYPE_ICONS = { Video, PDF: FileText, SOP: BookOpen, Document: FileText, Tutorial: BookOpen, 'Project Lesson': BookOpen }
const TYPE_COLORS = {
  Video:           'bg-blue-900/40 text-blue-400 border-blue-800',
  PDF:             'bg-red-900/40 text-red-400 border-red-800',
  SOP:             'bg-amber-900/40 text-amber-400 border-amber-800',
  Document:        'bg-slate-700 text-slate-300 border-slate-600',
  Tutorial:        'bg-purple-900/40 text-purple-400 border-purple-800',
  'Project Lesson':'bg-emerald-900/40 text-emerald-400 border-emerald-800',
}
const SKILL_COLORS = {
  Beginner:     'bg-emerald-900/40 text-emerald-400',
  Intermediate: 'bg-amber-900/40 text-amber-400',
  Advanced:     'bg-red-900/40 text-red-400',
}

const DEPTS = ['All', 'Software Engineering', 'DevOps', 'IT', 'Human Resources', 'Finance', 'Operations']
const TYPES = ['All', 'Video', 'PDF', 'SOP', 'Document', 'Tutorial']
const SKILLS = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function CAKnowledge() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dept, setDept]     = useState('All')
  const [type, setType]     = useState('All')
  const [skill, setSkill]   = useState('All')

  const load = async () => {
    setLoading(true)
    const data = await getKnowledgeItems({ department: dept, type, skillLevel: skill, search })
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [dept, type, skill])

  const handleSearch = (e) => { e.preventDefault(); load() }

  const clearFilters = () => { setDept('All'); setType('All'); setSkill('All'); setSearch('') }
  const hasFilters = dept !== 'All' || type !== 'All' || skill !== 'All' || search

  return (
    <CALayout breadcrumbs={[{ label: 'Knowledge Repository' }]}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Knowledge Repository</h1>
        <p className="text-slate-400 text-sm mt-1">{items.length} resources across all departments</p>
      </div>

      {/* Search + filters */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="search" placeholder="Search knowledge…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none flex-1" />
            {search && <button type="button" onClick={() => setSearch('')}><X size={13} className="text-slate-500 hover:text-slate-300" /></button>}
          </div>
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-500 transition-colors">Search</button>
        </form>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Department', value: dept, setValue: setDept, options: DEPTS },
            { label: 'Type', value: type, setValue: setType, options: TYPES },
            { label: 'Skill Level', value: skill, setValue: setSkill, options: SKILLS },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <Filter size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400">{f.label}:</span>
              <select value={f.value} onChange={(e) => f.setValue(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500">
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
              <X size={12} />Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Items grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-slate-700 rounded w-full mb-2" />
              <div className="h-3 bg-slate-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">No knowledge resources found.</p>
          <button onClick={clearFilters} className="text-sm text-brand-400 hover:text-brand-300">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((item) => {
            const TypeIcon = TYPE_ICONS[item.type] || FileText
            return (
              <div key={item.id} className="bg-slate-800 rounded-2xl border border-slate-700 p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TYPE_COLORS[item.type] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                      {item.type}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${SKILL_COLORS[item.skillLevel]}`}>
                      {item.skillLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                    <Eye size={11} />{item.views}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug flex-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{item.description}</p>

                {/* Meta */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User size={11} className="text-slate-400" />
                    <span>{item.expert}</span>
                    <span className="text-slate-700">·</span>
                    <span>{item.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={11} className="text-slate-400" />{item.duration}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] bg-slate-900/60 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">#{t}</span>
                  ))}
                </div>

                <button className="w-full py-2 rounded-xl bg-brand-600/20 border border-brand-700/50 text-brand-400 text-xs font-bold hover:bg-brand-600/30 transition-colors flex items-center justify-center gap-2">
                  <TypeIcon size={13} />View Resource
                </button>
              </div>
            )
          })}
        </div>
      )}
    </CALayout>
  )
}
