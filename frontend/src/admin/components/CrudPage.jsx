import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'

const Toast = ({ msg, kind, onClose }) => (
  <div className={`ae-toast ${kind || ''}`} onClick={onClose}>
    <strong>{kind === 'error' ? 'Erreur' : 'OK'}</strong>
    <div className="small">{msg}</div>
  </div>
)

// Page CRUD generique : liste + creation/edition dans un formulaire
// props : { title, endpoint, fields, columns, orderable, canWrite, canDelete, transform, defaults, afterSave }
const CrudPage = ({ endpoint, columns, fields, canWrite = true, transform, defaults = {}, orderable = false, itemPath = null }) => {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { items } = await api.get(endpoint)
      setItems(items)
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [endpoint])

  const startNew = () => {
    const blank = { ...defaults }
    fields.forEach((f) => { if (blank[f.name] === undefined) blank[f.name] = f.type === 'number' ? 0 : '' })
    setEditing(blank)
  }
  const startEdit = (item) => setEditing({ ...item })

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = transform ? transform(editing) : editing
      if (editing.id) await api.put(`${endpoint}/${editing.id}`, body)
      else await api.post(endpoint, body)
      setEditing(null)
      setToast({ kind: 'success', msg: 'Enregistre' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
    finally { setSaving(false) }
  }

  const del = async (item) => {
    if (!confirm(`Supprimer "${item.name || item.title || 'cet element'}" ?`)) return
    try {
      await api.del(`${endpoint}/${item.id}`)
      setToast({ kind: 'success', msg: 'Supprime' })
      await load()
    } catch (e) { setToast({ kind: 'error', msg: e.message }) }
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted small">{items.length} element(s)</div>
        {canWrite && (
          <button className="ae-btn" onClick={startNew}>
            <i className="bi bi-plus-lg me-1"></i>Nouveau
          </button>
        )}
      </div>

      {editing && (
        <form className="ae-form mb-4" onSubmit={save}>
          <h5 className="mb-3" style={{ color: '#0b2a5b' }}>{editing.id ? 'Modifier' : 'Nouveau'}</h5>
          <div className="row g-3">
            {fields.map((f) => (
              <div key={f.name} className={f.full ? 'col-12' : 'col-md-6'}>
                <label className="form-label">{f.label}{f.required ? ' *' : ''}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    className="form-control"
                    rows={f.rows || 4}
                    value={editing[f.name] ?? ''}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    required={f.required}
                  />
                ) : f.type === 'select' ? (
                  <select
                    className="form-select"
                    value={editing[f.name] ?? ''}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    required={f.required}
                  >
                    {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : f.type === 'checkbox' ? (
                  <div className="form-check form-switch mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={!!editing[f.name]}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked ? 1 : 0 })}
                    />
                  </div>
                ) : (
                  <input
                    type={f.type || 'text'}
                    className="form-control"
                    value={editing[f.name] ?? ''}
                    onChange={(e) => setEditing({ ...editing, [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value })}
                    required={f.required}
                    placeholder={f.placeholder}
                  />
                )}
                {f.hint && <small className="text-muted">{f.hint}</small>}
              </div>
            ))}
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="ae-btn" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            <button type="button" className="ae-btn secondary" onClick={() => setEditing(null)}>Annuler</button>
          </div>
        </form>
      )}

      <div className="ae-admin-table">
        {loading ? (
          <div className="text-center p-5"><div className="spinner-border text-warning" /></div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted p-5">Aucun element. Cliquez sur "Nouveau" pour commencer.</div>
        ) : (
          <table className="table mb-0">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key} style={{ width: c.width }}>{c.label}</th>)}
                <th style={{ width: 130 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {columns.map((c) => (
                    <td key={c.key}>
                      {c.render ? c.render(item) : (item[c.key] || '-')}
                    </td>
                  ))}
                  <td>
                    {canWrite && (
                      <button className="ae-btn small secondary me-1" onClick={() => startEdit(item)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                    )}
                    {canWrite && (
                      <button className="ae-btn small danger" onClick={() => del(item)}>
                        <i className="bi bi-trash"></i>
                      </button>
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

export default CrudPage
