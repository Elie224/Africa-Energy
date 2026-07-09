import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const fmt = (ts) => ts ? new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'

const Users = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ email: '', name: '', role: 'writer', password: '' })
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)

  const load = async () => {
    setLoading(true)
    try { const { items } = await api.get('/api/users'); setItems(items) }
    catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/users', form)
      setToast({ kind: 'success', msg: 'Utilisateur cree' })
      setCreating(false)
      setForm({ email: '', name: '', role: 'writer', password: '' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  const save = async (u) => {
    try {
      await api.put(`/api/users/${u.id}`, { name: u.name, role: u.role, active: u.active })
      setToast({ kind: 'success', msg: 'Mis a jour' })
      setEditing(null)
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  const resetPwd = async (u) => {
    const pwd = prompt(`Nouveau mot de passe pour ${u.email} (>= 8 caracteres) :`)
    if (!pwd) return
    try { await api.put(`/api/users/${u.id}/password`, { password: pwd }); setToast({ kind: 'success', msg: 'Mot de passe reinitialise' }) }
    catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }
  const reset2fa = async (u) => {
    if (!confirm(`Reinitialiser la 2FA de ${u.email} ?`)) return
    try { await api.del(`/api/users/${u.id}/2fa`); setToast({ kind: 'success', msg: '2FA reinitialisee' }); await load() }
    catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  return (
    <>
      {toast && <div className={`ae-toast ${toast.kind}`} onClick={() => setToast(null)}><strong>{toast.kind === 'error' ? 'Erreur' : 'OK'}</strong><div className="small">{toast.msg}</div></div>}
      <div className="d-flex justify-content-end mb-3">
        <button className="ae-btn" onClick={() => setCreating(true)}><i className="bi bi-plus-lg me-1"></i>Nouvel utilisateur</button>
      </div>

      {creating && (
        <form className="ae-form mb-4" onSubmit={create}>
          <h5 className="mb-3" style={{ color: '#0b2a5b' }}>Nouvel utilisateur</h5>
          <div className="row g-3">
            <div className="col-md-4"><label className="form-label">Email *</label><input className="form-control" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            <div className="col-md-4"><label className="form-label">Nom *</label><input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="col-md-2"><label className="form-label">Role</label>
              <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="super_admin">Super-admin</option>
                <option value="editor">Editeur</option>
                <option value="writer">Redacteur</option>
                <option value="reader">Lecteur</option>
              </select>
            </div>
            <div className="col-md-2"><label className="form-label">Mot de passe *</label><input className="form-control" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} /></div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="ae-btn">Creer</button>
            <button type="button" className="ae-btn secondary" onClick={() => setCreating(false)}>Annuler</button>
          </div>
        </form>
      )}

      <div className="ae-admin-table">
        {loading ? <div className="text-center p-5"><div className="spinner-border text-warning" /></div> : (
          <table className="table mb-0">
            <thead><tr><th>Email</th><th>Nom</th><th>Role</th><th>2FA</th><th>Derniere connexion</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.email}</strong></td>
                  <td>
                    {editing?.id === u.id
                      ? <input className="form-control form-control-sm" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                      : u.name}
                  </td>
                  <td>
                    {editing?.id === u.id
                      ? <select className="form-select form-select-sm" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
                          <option value="super_admin">Super-admin</option>
                          <option value="editor">Editeur</option>
                          <option value="writer">Redacteur</option>
                          <option value="reader">Lecteur</option>
                        </select>
                      : <span className="status-pill published">{u.role}</span>}
                  </td>
                  <td>{u.totp_enabled ? <span className="status-pill published">Oui</span> : <span className="status-pill draft">Non</span>}</td>
                  <td className="small text-muted">{fmt(u.last_login_at)}<br /><code className="small">{u.last_login_ip}</code></td>
                  <td>{u.active ? <span className="status-pill published">Actif</span> : <span className="status-pill archived">Inactif</span>}</td>
                  <td>
                    {editing?.id === u.id ? (
                      <>
                        <button className="ae-btn small me-1" onClick={() => save(editing)}>OK</button>
                        <button className="ae-btn small secondary" onClick={() => setEditing(null)}>X</button>
                      </>
                    ) : (
                      <>
                        <button className="ae-btn small secondary me-1" onClick={() => setEditing(u)}><i className="bi bi-pencil"></i></button>
                        <button className="ae-btn small secondary me-1" onClick={() => resetPwd(u)} title="Reinitialiser le mot de passe"><i className="bi bi-key"></i></button>
                        {u.totp_enabled && <button className="ae-btn small danger" onClick={() => reset2fa(u)} title="Reinitialiser la 2FA"><i className="bi bi-shield-x"></i></button>}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Users
