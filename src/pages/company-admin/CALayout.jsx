import React from 'react'
import {
  LayoutDashboard, Users, Star, BookOpen,
  Upload, GraduationCap, BarChart2, Settings, User
} from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { COMPANY_STATS } from '../../data/demoData'

const NAV = [
  { label: 'Dashboard',           path: '/company-admin',                icon: LayoutDashboard, exact: true },
  { label: 'Employees',           path: '/company-admin/employees',      icon: Users,           badge: COMPANY_STATS.totalEmployees },
  { label: 'Experts',             path: '/company-admin/experts',        icon: Star },
  { label: 'Knowledge Repository',path: '/company-admin/knowledge',      icon: BookOpen },
  { label: 'Upload Knowledge',    path: '/company-admin/upload',         icon: Upload },
  { label: 'Learning Content',    path: '/company-admin/learning',       icon: GraduationCap },
  { label: 'Reports & Analytics', path: '/company-admin/analytics',      icon: BarChart2 },
  { label: 'Company Settings',    path: '/company-admin/settings',       icon: Settings },
  { label: 'Profile',             path: '/company-admin/profile',        icon: User },
]

export default function CALayout({ children, breadcrumbs = [] }) {
  return (
    <DashboardLayout
      navItems={NAV}
      breadcrumbs={[{ label: 'Company Admin', path: '/company-admin' }, ...breadcrumbs]}
      searchPlaceholder="Search employees, knowledge…"
    >
      {children}
    </DashboardLayout>
  )
}
