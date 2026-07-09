import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const Footer = () => {
  const { t } = useI18n()
  return (
    <footer className="ae-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Logo variant="light" height={50} />
            <p className="mt-3" style={{ fontSize: '0.95rem' }}>
              {t('footer.tagline')}
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin fs-5"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp fs-5"></i></a>
              <a href="#" aria-label="Email"><i className="bi bi-envelope fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5>{t('footer.company')}</h5>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/a-propos">{t('nav.about')}</Link>
            <Link to="/produits-services">{t('nav.services')}</Link>
            <Link to="/engagements">{t('nav.engagements')}</Link>
            <Link to="/actualites">{t('nav.news')}</Link>
            <Link to="/mentions-legales">{t('footer.legal')}</Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>{t('nav.services')}</h5>
            <Link to="/produits-services">{t('nav.services')}</Link>
            <Link to="/produits-services">Distribution carburant</Link>
            <Link to="/produits-services">Lubrifiants &amp; huiles</Link>
            <Link to="/produits-services">Livraison rapide</Link>
            <Link to="/produits-services">Gestion de stocks</Link>
            <Link to="/produits-services">GPL &amp; derives</Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5>{t('nav.contact').replace('Demander un devis', 'Contact')}</h5>
            <p className="mb-2">
              <i className="bi bi-geo-alt me-2 text-warning"></i>
              {t('footer.address')}
              <br/><a href="https://www.google.com/maps/search/?api=1&query=Dixinn+Terrasse%2C+Conakry%2C+Guinee" target="_blank" rel="noopener noreferrer" className="ms-4" style={{ fontSize: '0.85rem' }}>Voir sur Google Maps <i className="bi bi-box-arrow-up-right ms-1"></i></a>
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone me-2 text-warning"></i>
              <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`}>{t('footer.phone')}</a>
            </p>
            <p className="mb-2">
              <i className="bi bi-envelope me-2 text-warning"></i>
              <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
            </p>
            <p className="mb-2">
              <i className="bi bi-clock me-2 text-warning"></i>
              Lun - Ven : 8 h - 18 h
            </p>
            <div className="mt-2">
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">
            © 2026 <strong>Africa Energy SAU</strong> · RCCM GN.TCC.2025.B.18185 · {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
