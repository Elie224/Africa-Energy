import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext.jsx'

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

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const u = await login(email, password, totp || undefined)
      const dest = loc.state?.from || '/admin'
      if (u && !u.totpEnabled) {
        nav('/admin/account?setup2fa=1', { replace: true })
      } else {
        nav(dest, { replace: true })
      }
    } catch (e) {
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
          <button type="submit" className="ae-btn w-100" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
