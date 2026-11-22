/**
 * DashboardLayout.jsx
 * Wraps every dashboard page with sidebar + topbar.
 * All three roles reuse this — only navItems differ.
 */
import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'

export default function DashboardLayout({ navItems, breadcrumbs, children, searchPlaceholder }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <DashboardSidebar
        navItems={navItems}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar
          onMenuToggle={() => setMobileOpen(true)}
          breadcrumbs={breadcrumbs}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
