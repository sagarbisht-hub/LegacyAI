import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react'

/**
 * Reusable DataTable component.
 * Props:
 *   columns: [{ key, label, render?, sortable? }]
 *   data: array of objects
 *   searchKeys: array of keys to search across
 *   emptyMessage: string
 *   actions: (row) => ReactNode  — optional per-row actions column
 */
export default function DataTable({ columns, data = [], searchKeys = [], emptyMessage = 'No records found.', actions }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  // Filter
  const filtered = search
    ? data.filter((row) => searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(search.toLowerCase())))
    : data

  // Sort
  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const va = a[sortKey] ?? ''
        const vb = b[sortKey] ?? ''
        const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : filtered

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortIcon = ({ col }) => {
    if (!col.sortable) return null
    if (sortKey !== col.key) return <ChevronUp size={12} className="text-slate-600" />
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-brand-400" /> : <ChevronDown size={12} className="text-brand-400" />
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Toolbar */}
      {searchKeys.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 flex-1 max-w-xs">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-slate-300 placeholder-slate-500 outline-none w-full"
            />
          </div>
          <span className="text-xs text-slate-500">{sorted.length} record{sorted.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max" role="table">
          <thead>
            <tr className="border-b border-slate-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap ${col.sortable ? 'cursor-pointer select-none hover:text-slate-200' : ''}`}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  scope="col"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col} />
                  </span>
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide" scope="col">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-12 text-center text-slate-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row, idx) => (
                <tr key={row.id || idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-sm text-slate-300 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
