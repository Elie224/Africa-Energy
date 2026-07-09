import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Engagements from './pages/Engagements'
import News from './pages/News'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Direction from './pages/Direction'
import NotFound from './pages/NotFound'
import Legal from './pages/Legal'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="*" element={
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/produits-services" element={<Services />} />
              <Route path="/engagements" element={<Engagements />} />
              <Route path="/actualites" element={<News />} />
              <Route path="/carrieres" element={<Careers />} />
              <Route path="/direction" element={<Direction />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  )
}

export default App
