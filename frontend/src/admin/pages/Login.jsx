import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext.jsx'

const MAX_ATTEMPTS = 5
const COOLDOWN_S = 30
const ATTEMPTS_KEY = 'ae_login_attempts'

const Login = () => {
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [requiresTotp, setRequiresTotp] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    try {
      const a = JSON.parse(sessionStorage.getItem(ATTEMPTS_KEY) || '{}')
      if (a && a.until && a.until > Date.now()) {
        setCooldown(Math.ceil((a.until - Date.now()) / 1000))
      } else {
        sessionStorage.removeItem(ATTEMPTS_KEY)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const recordFail = () => {
    try {
      const a = JSON.parse(sessionStorage.getItem(ATTEMPTS_KEY) || '{}')
      const n = (a.count || 0) + 1
      if (n >= MAX_ATTEMPTS) {
        const until = Date.now() + COOLDOWN_S * 1000
        sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: n, until }))
        setCooldown(COOLDOWN_S)
      } else {
        sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: n }))
      }
    } catch {}
  }
  const resetFails = () => { try { sessionStorage.removeItem(ATTEMPTS_KEY) } catch {} }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    if (cooldown > 0) { setLoading(false); return }
    try {
      const u = await login(email, password, totp || undefined)
      resetFails()
      const dest = loc.state?.from || '/admin'
      if (u && !u.totpEnabled) {
        nav('/admin/account?setup2fa=1', { replace: true })
      } else {
        nav(dest, { replace: true })
      }
    } catch (e) {
      recordFail()
      if (e.data?.requiresTotp) setRequiresTotp(true)
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ae-admin-login">
      <div className="ae-admin-login-card">
        <h1>Connexion administrateur</h1>
        <p className="lead">Accedez a l'espace de gestion du site Africa Energy SAU.</p>
        {err && <div className="alert alert-danger py-2">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Adresse e-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {requiresTotp && (
            <div className="mb-3">
              <label className="form-label">Code 2FA (Google Authenticator)</label>
              <input
                type="text"
                className="form-control"
                value={totp}
                onChange={(e) => setTotp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                pattern="[0-9]{6}"
                placeholder="6 chiffres"
                required
              />
            </div>
          )}
          <button type="submit" className="ae-btn w-100" disabled={loading || cooldown > 0}>
            {loading ? 'Connexion...' : (cooldown > 0 ? `Reessayer dans ${cooldown}s` : 'Se connecter')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
