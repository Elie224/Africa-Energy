import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

/*
  Same circular RING as the footer logo, but adapted for the light navbar:
  - Border orange + subtle blue inner ring (instead of white)
  - No white box, no pill: minimalist professional mark
*/
const NavbarMark = () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px',
      background: 'transparent',
      border: '2px solid rgba(243, 146, 0, 0.7)',
      borderRadius: '50%',
      boxShadow: '0 0 0 3px rgba(11, 42, 91, 0.06), 0 4px 14px rgba(0, 0, 0, 0.08)',
      flexShrink: 0,
    }}
  >
    <img
      src='/logo-ae1.png'
      alt='Africa Energy SAU'
      height='55'
      style={{
        height: '55px',
        width: '55px',
        objectFit: 'contain',
        display: 'block',
        borderRadius: '50%',
      }}
      draggable={false}
    />
  </div>
)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setExpanded(false)

  const navLinkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active' : '')

  return (
    <nav className={'navbar navbar-expand-lg ae-navbar ' + (scrolled ? 'shadow-sm' : '')}>
      <div className='container'>
        <Link className='navbar-brand d-flex align-items-center' to='/' onClick={closeMenu}>
          <NavbarMark />
        </Link>

        <button
          className='navbar-toggler border-0'
          type='button'
          onClick={() => setExpanded(!expanded)}
          aria-label='Toggle navigation'
        >
          <i className={'bi ' + (expanded ? 'bi-x-lg' : 'bi-list') + ' fs-3'} style={{ color: '#0B2A5B' }}></i>
        </button>

        <div className={'collapse navbar-collapse ' + (expanded ? 'show' : '')} id='navbarMain'>
          <ul className='navbar-nav ms-auto align-items-lg-center flex-wrap'>
            <li className='nav-item'><NavLink end className={navLinkClass} to='/' onClick={closeMenu}>{t('nav.home')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/a-propos' onClick={closeMenu}>{t('nav.about')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/produits-services' onClick={closeMenu}>{t('nav.services')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/engagements' onClick={closeMenu}>{t('nav.engagements')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/actualites' onClick={closeMenu}>{t('nav.news')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/carrieres' onClick={closeMenu}>{t('nav.careers')}</NavLink></li>
            <li className='nav-item'><NavLink className={navLinkClass} to='/direction' onClick={closeMenu}>{t('nav.direction')}</NavLink></li>
            <li className='nav-item nav-item--lang'><LanguageSwitcher /></li>
            <li className='nav-item nav-item--cta'>
              <Link to='/contact' className='nav-cta-pill' onClick={closeMenu}>
                <i className='bi bi-envelope me-1'></i>{t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
