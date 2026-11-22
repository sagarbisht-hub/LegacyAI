/**
 * App.jsx
 * Root application component.
 * - Wraps everything in AuthProvider (session restore, login/logout)
 * - Public routes: / (home), /login, /register-company, /help, /contact, /privacy, /terms, /cookies, /security
 * - Protected routes: /super-admin/**, /company-admin/**, /employee/**
 * - Unauthorized access → AccessDenied (rendered inside ProtectedRoute)
 * - Unknown paths → 404 NotFound
 */

import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// Auth
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

// Public pages
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

// Login
import LoginPage from './pages/login/LoginPage'

// ── Super Admin pages ──────────────────────────────────────
import SADashboard        from './pages/super-admin/SADashboard'
import SACompanyRequests  from './pages/super-admin/SACompanyRequests'
import SACompanies        from './pages/super-admin/SACompanies'
import SAUsers            from './pages/super-admin/SAUsers'
import SAAnalytics        from './pages/super-admin/SAAnalytics'
import SASubscriptions    from './pages/super-admin/SASubscriptions'
import SAProfile          from './pages/super-admin/SAProfile'

// ── Company Admin pages ────────────────────────────────────
import CADashboard  from './pages/company-admin/CADashboard'
import CAEmployees  from './pages/company-admin/CAEmployees'
import CAExperts    from './pages/company-admin/CAExperts'
import CAKnowledge  from './pages/company-admin/CAKnowledge'
import CAUpload     from './pages/company-admin/CAUpload'
import CAAnalytics  from './pages/company-admin/CAAnalytics'
import CAProfile    from './pages/company-admin/CAProfile'

// ── Employee pages ─────────────────────────────────────────
import EmpDashboard    from './pages/employee/EmpDashboard'
import EmpKnowledge    from './pages/employee/EmpKnowledge'
import EmpLearning     from './pages/employee/EmpLearning'
import EmpAIAssistant  from './pages/employee/EmpAIAssistant'
import EmpProgress     from './pages/employee/EmpProgress'
import EmpBookmarks    from './pages/employee/EmpBookmarks'
import EmpAskExpert    from './pages/employee/EmpAskExpert'
import EmpProfile      from './pages/employee/EmpProfile'

// ── Scroll to top on navigation ───────────────────────────
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

// ── Public layout wrapper (Navbar + Footer) ───────────────
function PublicLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>

        {/* ══════════════════════════════════════════
            PUBLIC ROUTES
        ══════════════════════════════════════════ */}

        {/* Home */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />

        {/* Login — no Navbar/Footer, full-page dark */}
        <Route path="/login" element={<LoginPage />} />

        {/* Placeholder public routes */}
        {[
          '/register-company',
          '/help',
          '/contact',
          '/privacy',
          '/terms',
          '/cookies',
          '/security',
          '/forgot-password',
        ].map((path) => (
          <Route key={path} path={path} element={<ComingSoon />} />
        ))}


        {/* ══════════════════════════════════════════
            SUPER ADMIN ROUTES  (role: super-admin)
        ══════════════════════════════════════════ */}

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute role="super-admin">
              <SADashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/company-requests"
          element={
            <ProtectedRoute role="super-admin">
              <SACompanyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/companies"
          element={
            <ProtectedRoute role="super-admin">
              <SACompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/users"
          element={
            <ProtectedRoute role="super-admin">
              <SAUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/analytics"
          element={
            <ProtectedRoute role="super-admin">
              <SAAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/subscriptions"
          element={
            <ProtectedRoute role="super-admin">
              <SASubscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/profile"
          element={
            <ProtectedRoute role="super-admin">
              <SAProfile />
            </ProtectedRoute>
          }
        />
        {/* Placeholder SA sub-routes */}
        {['/super-admin/reports', '/super-admin/settings'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute role="super-admin">
                <ComingSoon />
              </ProtectedRoute>
            }
          />
        ))}


        {/* ══════════════════════════════════════════
            COMPANY ADMIN ROUTES  (role: company-admin)
        ══════════════════════════════════════════ */}

        <Route
          path="/company-admin"
          element={
            <ProtectedRoute role="company-admin">
              <CADashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/employees"
          element={
            <ProtectedRoute role="company-admin">
              <CAEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/experts"
          element={
            <ProtectedRoute role="company-admin">
              <CAExperts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/knowledge"
          element={
            <ProtectedRoute role="company-admin">
              <CAKnowledge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/upload"
          element={
            <ProtectedRoute role="company-admin">
              <CAUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/analytics"
          element={
            <ProtectedRoute role="company-admin">
              <CAAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/profile"
          element={
            <ProtectedRoute role="company-admin">
              <CAProfile />
            </ProtectedRoute>
          }
        />
        {/* Placeholder CA sub-routes */}
        {['/company-admin/learning', '/company-admin/settings'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute role="company-admin">
                <ComingSoon />
              </ProtectedRoute>
            }
          />
        ))}


        {/* ══════════════════════════════════════════
            EMPLOYEE ROUTES  (role: employee)
        ══════════════════════════════════════════ */}

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmpDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/knowledge"
          element={
            <ProtectedRoute role="employee">
              <EmpKnowledge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/learning"
          element={
            <ProtectedRoute role="employee">
              <EmpLearning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/ai-assistant"
          element={
            <ProtectedRoute role="employee">
              <EmpAIAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/progress"
          element={
            <ProtectedRoute role="employee">
              <EmpProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/bookmarks"
          element={
            <ProtectedRoute role="employee">
              <EmpBookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/ask-expert"
          element={
            <ProtectedRoute role="employee">
              <EmpAskExpert />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="employee">
              <EmpProfile />
            </ProtectedRoute>
          }
        />


        {/* ══════════════════════════════════════════
            LEGACY / REDIRECT ROUTES
        ══════════════════════════════════════════ */}

        {/* Old /knowledge and /ai-assistant → redirect to employee equivalents */}
        <Route path="/knowledge"    element={<Navigate to="/employee/knowledge"   replace />} />
        <Route path="/ai-assistant" element={<Navigate to="/employee/ai-assistant" replace />} />


        {/* ══════════════════════════════════════════
            404
        ══════════════════════════════════════════ */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AuthProvider>
  )
}
