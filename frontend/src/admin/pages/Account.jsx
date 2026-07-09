import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/AuthContext.jsx'

const Account = () => {
  const { user, refresh } = useAuth()
  const [params] = useSearchParams()
  const setupFlag = params.get('setup2fa') === '1'

  const [qr, setQr] = useState(null)
  const [secret, setSecret] = useState(null)
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [oldPwd, setOldPwd] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (setupFlag && user && !user.totpEnabled) startSetup()
  }, [setupFlag, user])

  const startSetup = async () => {
    try {
      const data = await api.post('/api/auth/2fa/setup', {})
      setQr(data.qr)
      setSecret(data.secret)
      setMsg('Scannez le QR code avec Google Authenticator, puis saisissez le code a 6 chiffres pour confirmer.')
    } catch (e) { setErr(e.message) }
  }

  const verify2fa = async (e) => {
    e.preventDefault()
    setBusy(true); setErr(''); setMsg('')
    try {
      await api.post('/api/auth/2fa/verify', { code })
      await refresh()
      setQr(null); setSecret(null); setCode('')
      setMsg('2FA active avec succes.')
    } catch (e) { setErr(e.message) } finally { setBusy(false) }
  }

  const disable2fa = async () => {
    if (!oldPwd) { setErr('Saisissez votre mot de passe.'); return }
    setBusy(true); setErr(''); setMsg('')
    try {
      await api.post('/api/auth/2fa/disable', { password: oldPwd })
      await refresh()
      setMsg('2FA desactive.')
      setOldPwd('')
    } catch (e) { setErr(e.message) } finally { setBusy(false) }
  }

  return (
    <>
      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="ae-form mb-4" style={{ maxWidth: 560 }}>
        <h5 style={{ color: '#0b2a5b', fontWeight: 700 }}>Mon compte</h5>
        <p className="text-muted small mb-3">
          Connecte en tant que <strong>{user?.email}</strong> ({user?.role?.replace('_', ' ')})
        </p>
      </div>

      <div className="ae-form mb-4" style={{ maxWidth: 560 }}>
        <h5 style={{ color: '#0b2a5b', fontWeight: 700 }}>
          Authentification a deux facteurs (2FA)
          {user?.totpEnabled
            ? <span className="status-pill published ms-2" style={{ verticalAlign: 'middle' }}>Active</span>
            : <span className="status-pill draft ms-2" style={{ verticalAlign: 'middle' }}>Desactive</span>}
        </h5>
        {!user?.totpEnabled && !qr && (
          <>
            <p className="text-muted small">
              La double authentification ajoute une couche de securite (code temporaire via Google Authenticator ou 1Password).
            </p>
            <button className="ae-btn" onClick={startSetup}>Activer la 2FA</button>
          </>
        )}
        {qr && (
          <form onSubmit={verify2fa}>
            <p className="small mb-2">Scannez ce QR code avec Google Authenticator :</p>
            <img src={qr} alt="QR 2FA" style={{ maxWidth: 200, border: '1px solid #ddd', padding: 10, borderRadius: 8 }} />
            <p className="small text-muted mt-2">Ou saisissez le secret manuellement : <code>{secret}</code></p>
            <div className="mb-3 mt-3">
              <label className="form-label">Code a 6 chiffres</label>
              <input
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                required
              />
            </div>
            <button className="ae-btn" disabled={busy || code.length !== 6}>Confirmer et activer</button>
          </form>
        )}
        {user?.totpEnabled && (
          <div className="mt-3">
            <label className="form-label">Desactiver la 2FA (saisissez votre mot de passe)</label>
            <input type="password" className="form-control mb-2" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
            <button className="ae-btn danger" onClick={disable2fa} disabled={busy}>Desactiver la 2FA</button>
          </div>
        )}
      </div>
    </>
  )
}

export default Account
