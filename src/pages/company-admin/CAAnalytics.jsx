import React from 'react'
import CALayout from './CALayout'
import SimpleBarChart from '../../components/dashboard/SimpleBarChart'
import DashboardCard from '../../components/dashboard/DashboardCard'
import { COMPANY_STATS, COMPANY_ANALYTICS } from '../../data/demoData'
import { Users, BookOpen, MessageSquare, AlertCircle, TrendingUp } from 'lucide-react'

export default function CAAnalytics() {
  return (
    <CALayout breadcrumbs={[{ label: 'Reports & Analytics' }]}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Demo data — connect to backend for live metrics.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Active Employees"  value={COMPANY_STATS.activeEmployees.toLocaleString()}  icon={Users}        gradient="from-brand-600 to-violet-600" trend={3} />
        <DashboardCard title="Knowledge Items"   value={COMPANY_STATS.knowledgeResources.toLocaleString()} icon={BookOpen}   gradient="from-purple-600 to-pink-600"  trend={18} />
        <DashboardCard title="AI Questions"      value={COMPANY_STATS.aiQuestions.toLocaleString()}      icon={MessageSquare} gradient="from-rose-500 to-pink-600"   trend={24} />
        <DashboardCard title="Unanswered"        value={COMPANY_STATS.unansweredQuestions.toLocaleString()} icon={AlertCircle} gradient="from-amber-600 to-red-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-sm font-bold text-white mb-5">Resource Views by Week</h2>
          <SimpleBarChart data={COMPANY_ANALYTICS.learningActivity} valueKey="views" labelKey="week" color="from-brand-600 to-violet-600" height={150} />
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-sm font-bold text-white mb-5">AI Questions by Week</h2>
          <SimpleBarChart data={COMPANY_ANALYTICS.learningActivity} valueKey="questions" labelKey="week" color="from-rose-500 to-pink-600" height={150} />
        </div>
      </div>

      {/* Department progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-sm font-bold text-white mb-5">Department Learning Progress</h2>
          <div className="space-y-4">
            {COMPANY_ANALYTICS.departmentProgress.map((d) => (
              <div key={d.dept}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-300">{d.dept}</span>
                  <span className="text-xs font-bold text-white">{d.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-600 to-purple-600 rounded-full" style={{ width: `${d.progress}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{d.employees} employees</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-sm font-bold text-white mb-5">Most Asked Questions</h2>
          <div className="space-y-3">
            {COMPANY_ANALYTICS.topQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700">
                <span className="text-[10px] font-black text-brand-400 bg-brand-900/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed">{q.question}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><TrendingUp size={10} />{q.count} times asked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-950/30 border border-amber-800/50 rounded-2xl px-5 py-4">
        <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-300/80"><strong className="text-amber-300">Demo Data:</strong> All metrics are illustrative. Real analytics require FastAPI + MongoDB integration.</p>
      </div>
    </CALayout>
  )
}
