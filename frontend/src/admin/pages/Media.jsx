import React, { useState } from 'react'
import { api } from '../lib/api.js'

const fmt = (n) => n < 1024 ? n + ' o' : (n / 1024).toFixed(1) + ' Ko'
const fmtDate = (ts) => new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })

const Media = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { items } = await api.get('/api/media')
      setItems(items)
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }
  React.useEffect(() => { load() }, [])

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await api.upload('/api/media', file)
      setToast({ kind: 'success', msg: 'Image televersee' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setUploading(false); e.target.value = '' }
  }

  const del = async (m) => {
    if (!confirm('Supprimer definitivement ce media ?')) return
    try { await api.del(`/api/media/${m.id}`); await load() }
    catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  return (
    <>
      {toast && <div className={`ae-toast ${toast.kind}`} onClick={() => setToast(null)}><strong>{toast.kind === 'error' ? 'Erreur' : 'OK'}</strong><div className="small">{toast.msg}</div></div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted small">{items.length} media(s)</div>
        <label className="ae-btn mb-0" style={{ cursor: 'pointer' }}>
          {uploading ? 'Envoi...' : (<><i className="bi bi-cloud-upload me-1"></i>Televerser une image</>)}
          <input type="file" accept="image/*,application/pdf" onChange={onUpload} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>
      <div className="ae-admin-table">
        {loading ? <div className="text-center p-5"><div className="spinner-border text-warning" /></div> : (
          <table className="table mb-0">
            <thead><tr><th>Apercu</th><th>Nom</th><th>Type</th><th>Taille</th><th>Date</th><th>URL</th><th></th></tr></thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td>{m.mime?.startsWith('image/') ? <img src={m.url} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} /> : <i className="bi bi-file-earmark fs-3"></i>}</td>
                  <td>{m.original_name || m.filename}</td>
                  <td className="small text-muted">{m.mime}</td>
                  <td className="small">{fmt(m.size)}</td>
                  <td className="small text-muted">{fmtDate(m.created_at)}</td>
                  <td><input className="form-control form-control-sm" readOnly value={m.url} onFocus={(e) => e.target.select()} style={{ maxWidth: 280 }} /></td>
                  <td><button className="ae-btn small danger" onClick={() => del(m)}><i className="bi bi-trash"></i></button></td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan="7" className="text-center text-muted p-4">Aucun media.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Media
