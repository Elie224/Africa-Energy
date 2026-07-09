import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'

const fmtDate = (ts) => new Date(ts).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })

const Stat = ({ icon, bg, value, label }) => (
  <div className="ae-stat-card">
    <div className={`icon ${bg}`}><i className={`bi ${icon}`}></i></div>
    <div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  </div>
)

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    api.get('/api/admin/dashboard').then(setData).catch((e) => setErr(e.message))
  }, [])

  if (err) return <div className="alert alert-danger">{err}</div>
  if (!data) return <div className="text-center py-5"><div className="spinner-border text-warning" /></div>

  const { counts, recentLeads, recentAudit } = data

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6"><Stat icon="bi-envelope-paper-fill" bg="bg-orange" value={counts.leads_new} label="Nouveaux devis" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-hourglass-split" bg="bg-blue" value={counts.leads_in_progress} label="Devis en cours" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-newspaper" bg="bg-green" value={counts.news_published} label="Articles publies" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-people-fill" bg="bg-blue" value={counts.users} label="Utilisateurs" /></div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6"><Stat icon="bi-cart-check" bg="bg-orange" value={counts.products} label="Produits actifs" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-people" bg="bg-blue" value={counts.team} label="Membres d'equipe" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-handshake" bg="bg-green" value={counts.partners} label="Partenaires" /></div>
        <div className="col-md-3 col-6"><Stat icon="bi-calendar-event" bg="bg-red" value={counts.events} label="Evenements" /></div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="ae-admin-table">
            <div className="p-3 d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid #eef0f3' }}>
              <h5 className="mb-0" style={{ color: '#0b2a5b', fontSize: 16, fontWeight: 700 }}>Derniers devis recus</h5>
              <Link to="/admin/leads" className="ae-btn secondary small">Voir tout</Link>
            </div>
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 && (
                  <tr><td colSpan="4" className="text-center text-muted py-4">Aucun devis pour le moment</td></tr>
                )}
                {recentLeads.map((l) => (
                  <tr key={l.id}>
                    <td><strong>{l.nom || '(anonyme)'}</strong></td>
                    <td><a href={`mailto:${l.email}`}>{l.email}</a></td>
                    <td><span className={`status-pill ${l.status}`}>{l.status}</span></td>
                    <td className="text-muted small">{fmtDate(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="ae-admin-table">
            <div className="p-3" style={{ borderBottom: '1px solid #eef0f3' }}>
              <h5 className="mb-0" style={{ color: '#0b2a5b', fontSize: 16, fontWeight: 700 }}>Activite recente</h5>
            </div>
            <table className="table mb-0">
              <thead>
                <tr><th>Utilisateur</th><th>Action</th><th>Quand</th></tr>
              </thead>
              <tbody>
                {recentAudit.map((a) => (
                  <tr key={a.id}>
                    <td className="small">{a.user_email || '-'}</td>
                    <td className="small"><code>{a.action}</code></td>
                    <td className="text-muted small">{fmtDate(a.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
