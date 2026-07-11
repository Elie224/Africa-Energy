import React, { useEffect, useState } from 'react'
import RichEditor from '../components/RichEditor.jsx'
import { api } from '../lib/api.js'

const fmt = (ts) => ts ? new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'

const STATUSES = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'review', label: 'En relecture' },
  { value: 'published', label: 'Publie' },
  { value: 'archived', label: 'Archive' }
]

const FILTERS = [
  { value: 'all', label: 'Toutes' },
  { value: 'draft', label: 'Brouillons' },
  { value: 'review', label: 'En relecture' },
  { value: 'published', label: 'Publiees' },
  { value: 'archived', label: 'Archivees' }
]

const News = () => {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')
  const [busyId, setBusyId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.get('/api/admin/news')
      setItems(data.items || [])
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const startNew = () => {
    setEditing({ status: 'draft', title: '', slug: '', excerpt: '', content: '', image_url: '' })
  }
  const startEdit = (item) => setEditing({ ...item })
  const cancelEdit = () => setEditing(null)

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = { ...editing }
      if (body.status === 'published' && !body.published_at) body.published_at = Date.now()
      if (body.id) await api.put(`/api/admin/news/${body.id}`, body)
      else await api.post('/api/admin/news', body)
      setEditing(null)
      setToast({ kind: 'success', msg: 'Enregistre' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setSaving(false) }
  }

  const del = async (item) => {
    if (!confirm(`Supprimer "${item.title}" ?`)) return
    try {
      await api.del(`/api/admin/news/${item.id}`)
      setToast({ kind: 'success', msg: 'Supprime' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  const transition = async (item, status) => {
    setBusyId(item.id)
    try {
      await api.put(`/api/admin/news/${item.id}`, { status })
      setToast({ kind: 'success', msg: `Statut : ${STATUSES.find(s => s.value === status)?.label || status}` })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setBusyId(null) }
  }

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter)
  const counts = items.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc }, {})

  return (
    <>
      {toast && (
        <div className={`ae-toast ${toast.kind || ''}`} onClick={() => setToast(null)}>
          <strong>{toast.kind === 'error' ? 'Erreur' : 'OK'}</strong>
          <div className="small">{toast.msg}</div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`ae-btn small ${filter === f.value ? '' : 'secondary'}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label} {f.value !== 'all' && counts[f.value] ? `(${counts[f.value]})` : ''}
            </button>
          ))}
        </div>
        <button className="ae-btn" onClick={startNew}>
          <i className="bi bi-plus-lg me-1"></i>Nouvelle actualite
        </button>
      </div>

      {editing && (
        <form className="ae-form mb-4" onSubmit={save}>
          <h5 className="mb-3" style={{ color: '#0b2a5b' }}>{editing.id ? 'Modifier l\'actualite' : 'Nouvelle actualite'}</h5>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Titre *</label>
              <input className="form-control" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Slug</label>
              <input className="form-control" value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-genere" />
            </div>
            <div className="col-12">
              <label className="form-label">Chapo</label>
              <textarea className="form-control" rows={2} value={editing.excerpt || ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">Contenu</label>
              <RichEditor value={editing.content || ''} onChange={(html) => setEditing({ ...editing, content: html })} />
            </div>
            <div className="col-md-8">
              <label className="form-label">Image (URL)</label>
              <input className="form-control" value={editing.image_url || ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://... ou /api/public/media/..." />
            </div>
            <div className="col-md-4">
              <label className="form-label">Statut</label>
              <select className="form-select" value={editing.status || 'draft'} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="ae-btn" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            <button type="button" className="ae-btn secondary" onClick={cancelEdit}>Annuler</button>
          </div>
        </form>
      )}

      <div className="ae-admin-table">
        {loading ? (
          <div className="text-center p-5"><div className="spinner-border text-warning" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted p-5">Aucun article. Cliquez sur "Nouvelle actualite" pour commencer.</div>
        ) : (
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Titre</th>
                <th style={{ width: 130 }}>Statut</th>
                <th style={{ width: 160 }}>Publication</th>
                <th style={{ width: 280 }}>Workflow</th>
                <th style={{ width: 110 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td><span className={`status-pill ${item.status}`}>{STATUSES.find(s => s.value === item.status)?.label || item.status}</span></td>
                  <td>{fmt(item.published_at)}</td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      {item.status === 'draft' && (
                        <button className="ae-btn small" disabled={busyId === item.id} onClick={() => transition(item, 'review')}>
                          <i className="bi bi-eye me-1"></i>Soumettre
                        </button>
                      )}
                      {item.status === 'review' && (
                        <button className="ae-btn small" disabled={busyId === item.id} onClick={() => transition(item, 'published')}>
                          <i className="bi bi-check2-circle me-1"></i>Publier
                        </button>
                      )}
                      {(item.status === 'draft' || item.status === 'review') && (
                        <button className="ae-btn small secondary" disabled={busyId === item.id} onClick={() => transition(item, 'archived')}>
                          <i className="bi bi-archive me-1"></i>Archiver
                        </button>
                      )}
                      {item.status === 'published' && (
                        <button className="ae-btn small secondary" disabled={busyId === item.id} onClick={() => transition(item, 'archived')}>
                          <i className="bi bi-archive me-1"></i>Archiver
                        </button>
                      )}
                      {item.status === 'archived' && (
                        <button className="ae-btn small secondary" disabled={busyId === item.id} onClick={() => transition(item, 'draft')}>
                          <i className="bi bi-arrow-counterclockwise me-1"></i>Restaurer
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <button className="ae-btn small secondary me-1" onClick={() => startEdit(item)} title="Modifier">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="ae-btn small danger" onClick={() => del(item)} title="Supprimer">
                      <i className="bi bi-trash"></i>
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

export default News


