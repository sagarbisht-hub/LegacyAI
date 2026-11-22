/**
 * SimpleBarChart.jsx
 * Lightweight CSS bar chart — no external chart library needed.
 * Replace with Recharts/Chart.js when backend is connected.
 */
import React from 'react'

export default function SimpleBarChart({ data, valueKey, labelKey, color = 'from-brand-600 to-purple-600', height = 160, title }) {
  if (!data || data.length === 0) return null
  const max = Math.max(...data.map((d) => d[valueKey]))

  return (
    <div>
      {title && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">{title}</p>}
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const pct = max > 0 ? (d[valueKey] / max) * 100 : 0
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
              <span className="text-[10px] text-slate-400 font-medium">
                {d[valueKey] >= 1000 ? `${(d[valueKey] / 1000).toFixed(1)}k` : d[valueKey]}
              </span>
              <div className="w-full relative flex-1 flex items-end">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t ${color} transition-all duration-500`}
                  style={{ height: `${pct}%`, minHeight: 4 }}
                  role="img"
                  aria-label={`${d[labelKey]}: ${d[valueKey]}`}
                />
              </div>
              <span className="text-[10px] text-slate-500 truncate w-full text-center">{d[labelKey]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
