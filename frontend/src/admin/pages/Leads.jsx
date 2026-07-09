import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const fmt = (ts) => new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })

const Leads = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState(null)
  const [toast, setToast] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { items } = await api.get('/api/admin/leads')
      setItems(items)
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const setStatus = async (id, status, notes) => {
    try {
      await api.patch(`/api/admin/leads/${id}/status`, { status, notes })
      setToast({ kind: 'success', msg: 'Statut mis a jour' })
      await load()
      setView((v) => v && v.id === id ? { ...v, status, notes: notes ?? v.notes } : v)
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer definitivement ce devis ?')) return
    try { await api.del(`/api/admin/leads/${id}`); await load(); setView(null) }
    catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  const exportCsv = () => window.open((import.meta.env.VITE_API_URL || '') + '/api/admin/leads/export.csv', '_blank')

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter)

  return (
    <>
      {toast && <div className={`ae-toast ${toast.kind}`} onClick={() => setToast(null)}><strong>{toast.kind === 'error' ? 'Erreur' : 'OK'}</strong><div className="small">{toast.msg}</div></div>}

      <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
        <select className="form-select" style={{ maxWidth: 220 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tous ({items.length})</option>
          <option value="new">Nouveaux</option>
          <option value="in_progress">En cours</option>
          <option value="done">Traites</option>
          <option value="archived">Archives</option>
        </select>
        <button className="ae-btn secondary" onClick={exportCsv}>
          <i className="bi bi-download me-1"></i>Exporter CSV
        </button>
      </div>

      {view && (
        <div className="ae-form mb-4">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="mb-3" style={{ color: '#0b2a5b' }}>Devis de {view.nom || '(anonyme)'}</h5>
            <button className="ae-btn secondary small" onClick={() => setView(null)}>Fermer</button>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-6"><strong>Email :</strong> <a href={`mailto:${view.email}`}>{view.email}</a></div>
            <div className="col-md-6"><strong>Telephone :</strong> <a href={`tel:${view.telephone}`}>{view.telephone}</a></div>
            <div className="col-md-6"><strong>Entreprise :</strong> {view.entreprise || '-'}</div>
            <div className="col-md-6"><strong>Produit :</strong> {view.produit || '-'}</div>
            <div className="col-md-6"><strong>Recu le :</strong> {fmt(view.created_at)}</div>
            <div className="col-md-6"><strong>IP :</strong> <code className="small">{view.ip}</code></div>
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <div className="p-3" style={{ background: '#f8f9fb', borderRadius: 8, whiteSpace: 'pre-wrap' }}>{view.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Statut</label>
            <select className="form-select" style={{ maxWidth: 240 }} value={view.status} onChange={(e) => setStatus(view.id, e.target.value)}>
              <option value="new">Nouveau</option>
              <option value="in_progress">En cours</option>
              <option value="done">Traite</option>
              <option value="archived">Archive</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Notes internes</label>
            <textarea className="form-control" rows="3" defaultValue={view.notes || ''} id="lead-notes" />
            <button className="ae-btn small mt-2" onClick={() => {
              const notes = document.getElementById('lead-notes').value
              setStatus(view.id, view.status, notes)
            }}>Sauvegarder les notes</button>
          </div>
          <button className="ae-btn danger small" onClick={() => del(view.id)}>Supprimer ce devis</button>
        </div>
      )}

      <div className="ae-admin-table">
        {loading ? (
          <div className="text-center p-5"><div className="spinner-border text-warning" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted p-5">Aucun devis.</div>
        ) : (
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Nom</th><th>Contact</th><th>Produit</th><th>Message</th><th>Statut</th><th>Date</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td><strong>{l.nom || '(anonyme)'}</strong></td>
                  <td>
                    <div className="small"><a href={`mailto:${l.email}`}>{l.email}</a></div>
                    <div className="small text-muted">{l.telephone}</div>
                  </td>
                  <td className="small">{l.produit || '-'}</td>
                  <td className="small text-muted" style={{ maxWidth: 240 }}>
                    {(l.message || '').slice(0, 80)}{(l.message || '').length > 80 ? '...' : ''}
                  </td>
                  <td><span className={`status-pill ${l.status}`}>{l.status}</span></td>
                  <td className="small text-muted">{fmt(l.created_at)}</td>
                  <td>
                    <button className="ae-btn small secondary" onClick={() => setView(l)}>
                      <i className="bi bi-eye me-1"></i>Voir
                    </button>
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

export default Leads
