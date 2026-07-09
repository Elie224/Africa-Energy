import React, { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const PRESETS = [
  { key: 'home_hero_title', label: 'Accueil - titre hero', type: 'text' },
  { key: 'home_hero_subtitle', label: 'Accueil - sous-titre', type: 'text' },
  { key: 'home_stat_products', label: 'Accueil - nb produits', type: 'number' },
  { key: 'home_stat_clients', label: 'Accueil - nb segments clients', type: 'number' },
  { key: 'home_stat_partners', label: 'Accueil - nb partenaires', type: 'number' },
  { key: 'coord_address', label: 'Adresse', type: 'text' },
  { key: 'coord_phone', label: 'Telephone', type: 'text' },
  { key: 'coord_email', label: 'Email', type: 'text' },
  { key: 'coord_hours', label: 'Horaires', type: 'text' },
  { key: 'coord_whatsapp', label: 'WhatsApp (numerique)', type: 'text' }
]

const Settings = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState({})
  const [toast, setToast] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { items } = await api.get('/api/admin/settings')
      setItems(items)
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const getValue = (k) => {
    const row = items.find((i) => i.key === k)
    if (!row) return ''
    try { return JSON.parse(row.value) } catch { return row.value || '' }
  }
  const setValue = (k, v) => {
    const existing = items.find((i) => i.key === k)
    if (existing) {
      setItems(items.map((i) => i.key === k ? { ...i, value: JSON.stringify(v) } : i))
    } else {
      setItems([...items, { key: k, value: JSON.stringify(v) }])
    }
  }
  const save = async (k) => {
    const row = items.find((i) => i.key === k)
    if (!row) return
    setSaving({ ...saving, [k]: true })
    try {
      await api.put(`/api/admin/settings/${encodeURIComponent(k)}`, { value: JSON.parse(row.value) })
      setToast({ kind: 'success', msg: `"${k}" enregistre` })
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setSaving({ ...saving, [k]: false }) }
  }

  return (
    <>
      {toast && <div className={`ae-toast ${toast.kind}`} onClick={() => setToast(null)}><strong>{toast.kind === 'error' ? 'Erreur' : 'OK'}</strong><div className="small">{toast.msg}</div></div>}
      <div className="ae-form mb-3">
        <h5 className="mb-3" style={{ color: '#0b2a5b' }}>Parametres du site</h5>
        <p className="text-muted small mb-4">Ces reglages pilotent l'affichage de la page d'accueil, des coordonnees et d'autres elements dynamiques du site public.</p>
        {loading ? <div className="text-center"><div className="spinner-border text-warning" /></div> : (
          <div className="row g-3">
            {PRESETS.map((p) => (
              <div key={p.key} className={p.type === 'number' ? 'col-md-3' : 'col-md-6'}>
                <label className="form-label">{p.label}</label>
                <div className="d-flex gap-2">
                  <input
                    type={p.type}
                    className="form-control"
                    value={getValue(p.key)}
                    onChange={(e) => setValue(p.key, p.type === 'number' ? Number(e.target.value) : e.target.value)}
                  />
                  <button className="ae-btn small" onClick={() => save(p.key)} disabled={saving[p.key]}>
                    {saving[p.key] ? '...' : 'OK'}
                  </button>
                </div>
                <small className="text-muted"><code>{p.key}</code></small>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="ae-form">
        <h5 style={{ color: '#0b2a5b' }}>Toutes les cles</h5>
        <table className="table table-sm">
          <thead><tr><th>Cle</th><th>Valeur</th></tr></thead>
          <tbody>
            {items.map((i) => <tr key={i.key}><td><code>{i.key}</code></td><td><code className="small">{i.value}</code></td></tr>)}
            {items.length === 0 && <tr><td colSpan="2" className="text-center text-muted">Aucune cle.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Settings
