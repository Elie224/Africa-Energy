import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken, clearToken, getRefreshToken, setRefreshToken, clearRefreshToken } from './api.js'

const AuthContext = createContext(null)

const RANK = { super_admin: 4, editor: 3, writer: 2, reader: 1 }

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!getToken()) { setUser(null); setLoading(false); return }
    try {
      const { user } = await api.get('/api/auth/me')
      setUser(user)
    } catch (e) {
      if (e.status === 401) {
        // Tenter un refresh avant de deconnecter
        const rt = getRefreshToken()
        if (rt) {
          try {
            const data = await api.post('/api/auth/refresh', { refreshToken: rt })
            setToken(data.token)
            setRefreshToken(data.refreshToken)
            const me = await api.get('/api/auth/me')
            setUser(me.user)
            return
          } catch {}
        }
        clearToken()
        clearRefreshToken()
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = async (email, password, totp) => {
    const data = await api.post('/api/auth/login', { email, password, totp })
    setToken(data.token)
    if (data.refreshToken) setRefreshToken(data.refreshToken)
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    try { await api.post('/api/auth/logout', { refreshToken: getRefreshToken() }) } catch {}
    clearToken()
    clearRefreshToken()
    setUser(null)
  }

  const hasRole = (min) => (RANK[user?.role] || 0) >= (RANK[min] || 0)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit etre utilise dans <AuthProvider>')
  return ctx
}
