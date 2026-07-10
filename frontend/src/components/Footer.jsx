import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const Footer = () => {
  const { t } = useI18n()
  return (
    <footer className='ae-footer'>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-lg-4 col-md-6'>
            <Logo variant='light' height={50} />
            <p className='mt-3' style={{ fontSize: '0.95rem' }}>{t('footer.tagline')}</p>
            <div className='d-flex gap-3 mt-3'>
              <a href='https://wa.me/224612368058' aria-label='WhatsApp' target='_blank' rel='noopener noreferrer'><i className='bi bi-whatsapp fs-5'></i></a>
              <a href='tel:+224612368058' aria-label='Phone'><i className='bi bi-telephone-fill fs-5'></i></a>
              <a href='mailto:africaenergysau@gmail.com' aria-label='Email'><i className='bi bi-envelope-fill fs-5'></i></a>
              <a href='https://www.google.com/maps/search/?api=1&query=Dixinn+Terrasse%2C+Conakry%2C+Guinee' aria-label='Google Maps' target='_blank' rel='noopener noreferrer'><i className='bi bi-geo-alt-fill fs-5'></i></a>
            </div>
          </div>
          <div className='col-lg-2 col-md-6'>
            <h5>{t('footer.company')}</h5>
            <Link to='/'>{t('nav.home')}</Link>
            <Link to='/a-propos'>{t('nav.about')}</Link>
            <Link to='/produits-services'>{t('nav.services')}</Link>
            <Link to='/engagements'>{t('nav.engagements')}</Link>
            <Link to='/actualites'>{t('nav.news')}</Link>
            <Link to='/mentions-legales'>{t('footer.legal')}</Link>
          </div>
          <div className='col-lg-3 col-md-6'>
            <h5>{t('nav.services')}</h5>
            <Link to='/produits-services'>{t('nav.services')}</Link>
            <Link to='/produits-services'>{t('footer.servicesFuel')}</Link>
            <Link to='/produits-services'>{t('footer.servicesLub')}</Link>
            <Link to='/produits-services'>{t('footer.servicesDelivery')}</Link>
            <Link to='/produits-services'>{t('footer.servicesStock')}</Link>
            <Link to='/produits-services'>{t('footer.servicesGpl')}</Link>
          </div>
          <div className='col-lg-3 col-md-6'>
            <h5>{t('footer.contact')}</h5>
            <p className='mb-2'>
              <i className='bi bi-geo-alt me-2 text-warning'></i>
              {t('footer.address')}
              <br/><a href='https://www.google.com/maps/search/?api=1&query=Dixinn+Terrasse%2C+Conakry%2C+Guinee' target='_blank' rel='noopener noreferrer' className='ms-4' style={{ fontSize: '0.85rem' }}>{t('footer.seeOnMaps')} <i className='bi bi-box-arrow-up-right ms-1'></i></a>
            </p>
            <p className='mb-2'>
              <i className='bi bi-telephone me-2 text-warning'></i>
              <a href={'tel:' + t('footer.phone').replace(/\s/g,'')}>{t('footer.phone')}</a>
            </p>
            <p className='mb-2'>
              <i className='bi bi-envelope me-2 text-warning'></i>
              <a href={'mailto:' + t('footer.email')}>{t('footer.email')}</a>
            </p>
            <p className='mb-2'>
              <i className='bi bi-clock me-2 text-warning'></i>
              {t('footer.schedule')}
            </p>
            <div className='mt-2'>
              <LanguageSwitcher variant='dark' />
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <p className='mb-0'>
            &copy; 2026 <strong>Africa Energy SAU</strong> &middot; RCCM GN.TCC.2025.B.18185 &middot; {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
