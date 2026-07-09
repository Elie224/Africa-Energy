import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext.jsx'
import { RequireAuth } from './lib/RequireAuth.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import News from './pages/News.jsx'
import Products from './pages/Products.jsx'
import Team from './pages/Team.jsx'
import Partners from './pages/Partners.jsx'
import Events from './pages/Events.jsx'
import Settings from './pages/Settings.jsx'
import Media from './pages/Media.jsx'
import Users from './pages/Users.jsx'
import Audit from './pages/Audit.jsx'
import Account from './pages/Account.jsx'

import './styles/admin.css'

const AdminApp = () => (
  <AuthProvider>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="news" element={<RequireAuth role="writer"><News /></RequireAuth>} />
        <Route path="products" element={<RequireAuth role="editor"><Products /></RequireAuth>} />
        <Route path="team" element={<RequireAuth role="editor"><Team /></RequireAuth>} />
        <Route path="partners" element={<RequireAuth role="editor"><Partners /></RequireAuth>} />
        <Route path="events" element={<RequireAuth role="editor"><Events /></RequireAuth>} />
        <Route path="media" element={<RequireAuth role="editor"><Media /></RequireAuth>} />
        <Route path="settings" element={<RequireAuth role="editor"><Settings /></RequireAuth>} />
        <Route path="users" element={<RequireAuth role="super_admin"><Users /></RequireAuth>} />
        <Route path="audit" element={<RequireAuth role="super_admin"><Audit /></RequireAuth>} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  </AuthProvider>
)

export default AdminApp
