import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext.jsx'
import { api } from '../lib/api.js'

const RANK = { super_admin: 4, editor: 3, writer: 2, reader: 1 }

const sections = [
  {
    title: 'Pilotage',
    items: [
      { to: '/admin', label: 'Tableau de bord', icon: 'bi-speedometer2', end: true }
    ]
  },
  {
    title: 'Contenu',
    items: [
      { to: '/admin/leads', label: 'Devis recus', icon: 'bi-envelope-paper', badge: 'leads' },
      { to: '/admin/news', label: 'Actualites', icon: 'bi-newspaper', role: 'writer' },
      { to: '/admin/products', label: 'Produits', icon: 'bi-fuel-pump', role: 'editor' },
      { to: '/admin/team', label: 'Equipe', icon: 'bi-people', role: 'editor' },
      { to: '/admin/partners', label: 'Partenaires', icon: 'bi-handshake', role: 'editor' },
      { to: '/admin/events', label: 'Agenda', icon: 'bi-calendar-event', role: 'editor' }
    ]
  },
  {
    title: 'Medias & configuration',
    items: [
      { to: '/admin/media', label: 'Mediatheque', icon: 'bi-images', role: 'editor' },
      { to: '/admin/settings', label: 'Parametres du site', icon: 'bi-gear', role: 'editor' }
    ]
  },
  {
    title: 'Administration',
    items: [
      { to: '/admin/users', label: 'Utilisateurs', icon: 'bi-person-gear', role: 'super_admin' },
      { to: '/admin/audit', label: 'Journal d\'audit', icon: 'bi-shield-check', role: 'super_admin' }
    ]
  }
]

const titles = {
  '/admin': 'Tableau de bord',
  '/admin/leads': 'Devis recus',
  '/admin/news': 'Actualites',
  '/admin/products': 'Produits & services',
  '/admin/team': 'Equipe',
  '/admin/partners': 'Partenaires',
  '/admin/events': 'Agenda',
  '/admin/media': 'Mediatheque',
  '/admin/settings': 'Parametres du site',
  '/admin/users': 'Utilisateurs',
  '/admin/audit': 'Journal d\'audit',
  '/admin/account': 'Mon compte'
}

const Layout = () => {
  const { user, logout, hasRole } = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()
  const [counts, setCounts] = useState({ leads_new: 0, news_draft: 0 })

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const { counts } = await api.get('/api/admin/dashboard')
        if (alive) setCounts(counts)
      } catch {}
    }
    load()
    const t = setInterval(load, 60_000)
    return () => { alive = false; clearInterval(t) }
  }, [loc.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const title = titles[loc.pathname] || (loc.pathname.startsWith('/admin/news/') ? 'Actualite' :
                loc.pathname.startsWith('/admin/products/') ? 'Produit' :
                loc.pathname.startsWith('/admin/leads/') ? 'Devis' : 'Admin')

  return (
    <div className="ae-admin">
      <aside className="ae-admin-sidebar">
        <div className="ae-admin-brand">
          <span className="logo-dot" />
          <div>
            <div className="brand-title">AFRICA ENERGY</div>
            <div className="brand-sub">Administration</div>
          </div>
        </div>
        <nav className="ae-admin-nav">
          {sections.map((s) => {
            const visible = s.items.filter((i) => !i.role || hasRole(i.role))
            if (!visible.length) return null
            return (
              <div key={s.title}>
                <div className="nav-section">{s.title}</div>
                {visible.map((i) => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    end={i.end}
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  >
                    <i className={`bi ${i.icon}`} />
                    <span>{i.label}</span>
                    {i.badge === 'leads' && counts.leads_new > 0 && (
                      <span className="badge-count">{counts.leads_new}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            )
          })}
        </nav>
        <div className="ae-admin-foot">v0.1.0 · {new Date().getFullYear()}</div>
      </aside>
      <div className="ae-admin-main">
        <header className="ae-admin-topbar">
          <h1>{title}</h1>
          <div className="topbar-user">
            <span className="role">{user?.role?.replace('_', ' ')}</span>
            <span>{user?.name}</span>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout() }}>
              <i className="bi bi-box-arrow-right me-1"></i>Deconnexion
            </a>
          </div>
        </header>
        <main className="ae-admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
