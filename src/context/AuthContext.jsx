/**
 * AuthContext.jsx
 * Central authentication state for the entire application.
 * Uses sessionStorage so the session survives page refresh
 * but is cleared when the browser tab closes.
 *
 * To connect to a real backend: replace the `login` call inside
 * useAuthProvider with a fetch() to your FastAPI /api/auth/login endpoint.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginService, logout as logoutService, restoreSession, ROLE_ROUTES } from '../services/authService'

// ── Context creation ────────────────────────────────────────
const AuthContext = createContext(null)

// ── Provider ────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [user, setUser]       = useState(null)   // authenticated user object
  const [loading, setLoading] = useState(true)   // initial session restore
  const [authError, setAuthError] = useState('')

  // Restore session on first mount
  useEffect(() => {
    const saved = restoreSession()
    if (saved) setUser(saved)
    setLoading(false)
  }, [])

  /** Attempt login with email + password. Returns { success, error } */
  const login = useCallback(async (email, password) => {
    setAuthError('')
    const result = await loginService(email, password)
    if (result.success) {
      setUser(result.user)
      // Use full-page navigation instead of React Router's navigate().
      // This avoids a race condition where ProtectedRoute renders
      // before setUser() commits.  The session is already saved in
      // sessionStorage by authService, so on page load AuthProvider's
      // useEffect will restore it and ProtectedRoute will see the user.
      const route = ROLE_ROUTES[result.user.role] || '/'
      window.location.href = route
      return { success: true }
    }
    setAuthError(result.error)
    return { success: false, error: result.error }
  }, [])

  /** Clear session and redirect to login */
  const logout = useCallback(() => {
    logoutService()
    setUser(null)
    navigate('/login')
  }, [navigate])

  const value = { user, loading, authError, login, logout, setAuthError }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// ── Hook ────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
