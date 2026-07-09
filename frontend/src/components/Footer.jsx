import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="ae-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Logo variant="light" height={50} />
            <p className="mt-3" style={{ fontSize: '0.95rem' }}>
              Votre partenaire de confiance en distribution pétrolière en Guinée.
              L’énergie qui fait avancer l’Afrique.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin fs-5"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp fs-5"></i></a>
              <a href="#" aria-label="Email"><i className="bi bi-envelope fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5>Navigation</h5>
            <Link to="/">Accueil</Link>
            <Link to="/a-propos">À propos</Link>
            <Link to="/produits-services">Produits</Link>
            <Link to="/engagements">Engagements</Link>
            <Link to="/actualites">Actualités</Link>
            <Link to="/mentions-legales">Mentions légales</Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>Nos services</h5>
            <Link to="/produits-services">Distribution carburant</Link>
            <Link to="/produits-services">Lubrifiants & huiles</Link>
            <Link to="/produits-services">Livraison rapide</Link>
            <Link to="/produits-services">Gestion de stocks$1</Link>
            <Link to="/produits-services">GPL & dérivés</Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>Contact</h5>
            <p className="mb-2">
              <i className="bi bi-geo-alt me-2 text-warning"></i>
              Dixinn Terrasse, Conakry, Guinée
              <br/><a href="https://www.google.com/maps/search/ ?api=1&query=Dixinn%20Terrasse%2C%20Conakry%2C%20Guinee" target="_blank" rel="noopener noreferrer" className="ms-4" style={{ fontSize: '0.85rem' }}>Voir sur Google Maps <i className="bi bi-box-arrow-up-right ms-1"></i></a>
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone me-2 text-warning"></i>
              <a href="tel:+224612368058">+224 612 368 058</a>
            </p>
            <p className="mb-2">
              <i className="bi bi-envelope me-2 text-warning"></i>
              <a href="mailto:africaenergysau@gmail.com">africaenergysau@gmail.com</a>
            </p>
            <p className="mb-0">
              <i className="bi bi-clock me-2 text-warning"></i>
              Lun - Ven : 8 h - 18 h
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">
            © 2026 <strong>Africa Energy SAU</strong> · RCCM GN.TCC.2025.B.18185 · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
