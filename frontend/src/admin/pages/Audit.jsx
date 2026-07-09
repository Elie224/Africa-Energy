import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const fmt = (ts) => new Date(ts).toLocaleString('fr-FR')

const Audit = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('user', q)
      const { items } = await api.get('/api/audit?' + params.toString())
      setItems(items)
    } catch (e) {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  return (
    <>
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Filtrer par email ou action..." value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load()} />
        <button className="ae-btn" onClick={load}>Filtrer</button>
      </div>
      <div className="ae-admin-table">
        {loading ? <div className="text-center p-5"><div className="spinner-border text-warning" /></div> : (
          <table className="table mb-0">
            <thead><tr><th>Date</th><th>Utilisateur</th><th>Action</th><th>Cible</th><th>IP</th><th>Details</th></tr></thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td className="small text-muted">{fmt(a.created_at)}</td>
                  <td className="small">{a.user_email || '-'}</td>
                  <td><code>{a.action}</code></td>
                  <td className="small">{a.target || '-'}</td>
                  <td><code className="small">{a.ip}</code></td>
                  <td className="small text-muted"><code>{a.meta || '-'}</code></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan="6" className="text-center text-muted p-4">Aucun evenement.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Audit
