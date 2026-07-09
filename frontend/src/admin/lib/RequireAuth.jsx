import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export const RequireAuth = ({ children, role }) => {
  const { user, loading, hasRole } = useAuth()
  const loc = useLocation()
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-warning" />
      </div>
    )
  }
  if (!user) return <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />
  if (role && !hasRole(role)) return <Navigate to="/admin" replace />
  return children
}
