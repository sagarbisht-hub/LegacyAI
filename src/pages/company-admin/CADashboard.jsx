import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users, Star, BookOpen, Video, FileText,
  MessageSquare, AlertCircle, ArrowRight, TrendingUp
} from 'lucide-react'
import CALayout from './CALayout'
import DashboardCard from '../../components/dashboard/DashboardCard'
import SimpleBarChart from '../../components/dashboard/SimpleBarChart'
import { useAuth } from '../../context/AuthContext'
import { COMPANY_STATS, COMPANY_ANALYTICS, EMPLOYEES } from '../../data/demoData'

const STAT_CARDS = [
  { title: 'Total Employees',       key: 'totalEmployees',    icon: Users,        gradient: 'from-brand-600 to-violet-600',  trend: 3  },
  { title: 'Active Employees',      key: 'activeEmployees',   icon: TrendingUp,   gradient: 'from-emerald-500 to-teal-600',  trend: null },
  { title: 'Experts',               key: 'experts',           icon: Star,         gradient: 'from-amber-500 to-orange-600',  trend: null },
  { title: 'Knowledge Resources',   key: 'knowledgeResources',icon: BookOpen,     gradient: 'from-purple-600 to-pink-600',   trend: 18 },
  { title: 'Videos',                key: 'videos',            icon: Video,        gradient: 'from-blue-500 to-cyan-600',     trend: 12 },
  { title: 'Documents',             key: 'documents',         icon: FileText,     gradient: 'from-indigo-500 to-blue-600',   trend: 9  },
  { title: 'AI Questions',          key: 'aiQuestions',       icon: MessageSquare,gradient: 'from-rose-500 to-pink-600',     trend: 24 },
  { title: 'Unanswered Questions',  key: 'unansweredQuestions',icon: AlertCircle, gradient: 'from-amber-600 to-red-600',     trend: null },
]

export default function CADashboard() {
  const { user } = useAuth()
  const recentEmployees = EMPLOYEES.slice(0, 5)

  return (
    <CALayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Company Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Welcome back, <span className="text-white font-semibold">{user?.name}</span>. Manage your organization's people, knowledge and learning resources.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((c) => (
          <DashboardCard
            key={c.key}
            title={c.title}
            value={COMPANY_STATS[c.key].toLocaleString()}
            icon={c.icon}
            gradient={c.gradient}
            trend={c.trend}
          />
        ))}
      </div>

      {/* Charts + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity chart */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Knowledge Activity</h2>
            <span className="text-xs text-slate-500">Last 4 weeks</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <SimpleBarChart data={COMPANY_ANALYTICS.learningActivity} valueKey="views"     labelKey="week" color="from-brand-600 to-violet-600" height={120} title="Resource Views" />
            <SimpleBarChart data={COMPANY_ANALYTICS.learningActivity} valueKey="questions" labelKey="week" color="from-rose-500 to-pink-600"    height={120} title="AI Questions" />
          </div>
        </div>

        {/* Top questions */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-sm font-bold text-white mb-4">Top AI Questions</h2>
          <div className="space-y-2">
            {COMPANY_ANALYTICS.topQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-700/50 transition-colors">
                <span className="text-[10px] font-black text-brand-400 bg-brand-900/40 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-300 leading-snug">{q.question}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{q.count} times asked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Department Learning Progress</h2>
          </div>
          <div className="space-y-3">
            {COMPANY_ANALYTICS.departmentProgress.map((d) => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-300">{d.dept}</span>
                  <span className="text-xs font-bold text-white">{d.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-purple-600 rounded-full transition-all duration-700"
                    style={{ width: `${d.progress}%` }}
                    role="progressbar" aria-valuenow={d.progress} aria-valuemin={0} aria-valuemax={100}
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{d.employees} employees</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top resources */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Most Viewed Resources</h2>
            <Link to="/company-admin/knowledge" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-2">
            {COMPANY_ANALYTICS.topResources.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-700/50 transition-colors">
                <span className="text-[10px] font-black text-slate-400 w-5 text-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{r.title}</p>
                  <p className="text-[10px] text-slate-500">{r.dept}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{r.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent employees */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-sm font-bold text-white">Recent Employees</h2>
          <Link to="/company-admin/employees" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
            Manage all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead><tr className="border-b border-slate-700">
              {['Employee', 'Department', 'Progress', 'Status', 'Last Active'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recentEmployees.map((e) => (
                <tr key={e.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3.5">
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
                  <td className="px-6 py-3.5 text-sm text-slate-300">{e.department}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full" style={{ width: `${e.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-white">{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${e.status === 'active' ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>{e.status}</span>
                  </td>
                  <td className="px-6 py-3.5 text-xs text-slate-400">{e.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CALayout>
  )
}
