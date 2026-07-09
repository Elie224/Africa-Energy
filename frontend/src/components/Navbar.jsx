import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setExpanded(false)

  return (
    <nav className={`navbar navbar-expand-lg ae-navbar ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <Logo height={55} />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${expanded ? 'bi-x-lg' : 'bi-list'} fs-3`} style={{ color: '#0B2A5B' }}></i>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarMain">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/" onClick={closeMenu}>Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/a-propos" onClick={closeMenu}>À propos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/produits-services" onClick={closeMenu}>Produits & Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/engagements" onClick={closeMenu}>Engagements</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/actualites" onClick={closeMenu}>Actualités</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrieres" onClick={closeMenu}>Carrières</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/direction" onClick={closeMenu}>Direction</NavLink>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <Link to="/contact" className="btn btn-ae-primary" onClick={closeMenu}>
                <i className="bi bi-envelope me-2"></i>Demander un devis
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
