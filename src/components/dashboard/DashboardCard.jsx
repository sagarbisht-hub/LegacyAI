import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * Reusable stat card for all three dashboards.
 * Props: title, value, subtitle, icon, gradient, trend, trendLabel
 */
export default function DashboardCard({ title, value, subtitle, icon: Icon, gradient = 'from-brand-600 to-purple-600', trend, trendLabel, onClick }) {
  return (
    <div
      className={`bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
          {Icon && <Icon size={20} className="text-white" aria-hidden="true" />}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'text-emerald-400 bg-emerald-950/50' : 'text-red-400 bg-red-950/50'}`}>
            {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-semibold text-slate-300">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      {trendLabel && <p className="text-xs text-slate-500 mt-1">{trendLabel}</p>}
    </div>
  )
}
