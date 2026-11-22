import React from 'react'
import CALayout from './CALayout'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Building2, Calendar, Briefcase } from 'lucide-react'

export default function CAProfile() {
  const { user } = useAuth()
  if (!user) return null
  const fields = [
    { icon: User,      label: 'Full Name',   value: user.name },
    { icon: Mail,      label: 'Email',       value: user.email },
    { icon: Building2, label: 'Company',     value: user.company },
    { icon: Building2, label: 'Department',  value: user.department },
    { icon: Briefcase, label: 'Designation', value: user.designation },
    { icon: Calendar,  label: 'Joined',      value: user.joinedDate },
  ]
  return (
    <CALayout breadcrumbs={[{ label: 'Profile' }]}>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-700">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-white">{user.name.split(' ').map((p) => p[0]).join('').slice(0,2)}</span>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{user.name}</p>
              <span className="inline-block mt-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 text-white">Company Administrator</span>
              <p className="text-sm text-slate-400 mt-1">{user.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-1.5"><Icon size={13} className="text-slate-400" />
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</p>
                </div>
                <p className="text-sm font-semibold text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CALayout>
  )
}
