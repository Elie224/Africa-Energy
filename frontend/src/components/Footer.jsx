import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

/*
  Footer logo presentation: a circular RING (border only, transparent inside)
  around the official logo PNG so it floats gracefully on the dark footer.
  - Border: subtle orange + 2px white inner stroke for definition
  - No white box, no pill
  - The PNG is multicolour; the navy text reads on dark thanks to a very
    light blur-brighten filter that lifts the dark elements without losing
    the orange/green colour identity.
*/
const FooterMark = () => (
  <div
    style={{
      display: 'inline-block',
      padding: '14px',
      background: 'transparent',
      border: '2px solid rgba(243, 146, 0, 0.55)',
      borderRadius: '50%',
      boxShadow: '0 0 0 4px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)',
      position: 'relative',
    }}
  >
    <img
      src="/logo-ae1.png"
      alt="Africa Energy SAU"
      height="60"
      style={{
        height: '60px',
        width: '60px',
        objectFit: 'contain',
        display: 'block',
        filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.18)) brightness(1.06) saturate(1.1)',
        borderRadius: '50%',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      draggable={false}
    />
  </div>
)

const FtIcon = ({ name }) => {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#F39200', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'pin': return <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'phone': return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    case 'mail': return <svg {...common}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    case 'whatsapp': return <svg width="16" height="16" viewBox="0 0 24 24" fill="#F39200"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
    case 'phone-w': return <svg width="16" height="16" viewBox="0 0 24 24" fill="#F39200"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/></svg>
    case 'mail-w': return <svg width="16" height="16" viewBox="0 0 24 24" fill="#F39200"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
    case 'facebook': return <svg width="16" height="16" viewBox="0 0 24 24" fill="#F39200"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
    default: return null
  }
}

const SocialChip = ({ href, label, iconName }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      width: 36, height: 36, borderRadius: '50%',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.15)',
      color: '#FFFFFF', textDecoration: 'none',
      transition: 'background 0.2s ease, border-color 0.2s ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = '#F39200'; e.currentTarget.style.borderColor = '#F39200' }}
    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
  >
    <FtIcon name={iconName} />
  </a>
)

const ColTitle = ({ children }) => (
  <h6 style={{
    color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '1.5px',
    marginBottom: 18, paddingBottom: 10,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
  }}>
    {children}
    <span style={{
      position: 'absolute', bottom: -1, left: 0, width: 32, height: 2, background: '#F39200',
    }} />
  </h6>
)

const FooterLink = ({ to, children }) => {
  const style = {
    color: 'rgba(255,255,255,0.78)', display: 'flex', alignItems: 'center', gap: 8,
    padding: '5px 0', fontSize: '0.9rem', textDecoration: 'none',
    transition: 'color 0.2s ease, padding-left 0.2s ease',
  }
  const onEnter = (e) => { e.currentTarget.style.color = '#F39200'; e.currentTarget.style.paddingLeft = '6px' }
  const onLeave = (e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.78)'; e.currentTarget.style.paddingLeft = '0' }
  return <Link to={to} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>
}

const Footer = () => {
  const { t } = useI18n()
  return (
    <footer className='ae-footer'>
      {/* top accent */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #F39200 0%, #F39200 25%, transparent 100%)' }}></div>

      <div className='container' style={{ paddingTop: 50, paddingBottom: 24 }}>
        <div className='row g-4'>
          {/* Col 1: LOGO (circular ring, no white box) */}
          <div className='col-lg-3 col-md-6'>
            <FooterMark />
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.6, marginTop: 16, marginBottom: 20 }}>
              {t('footer.logoTag')}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#F39200', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
              {t('footer.socialsLabel')}
            </div>
            <div className='d-flex gap-2'>
              <SocialChip href='https://wa.me/224612368058' label='WhatsApp' iconName='whatsapp' />
              <SocialChip href='tel:+224612368058' label='Phone' iconName='phone-w' />
              <SocialChip href='mailto:africaenergysau@gmail.com' label='Email' iconName='mail-w' />
              <SocialChip href='https://www.facebook.com/' label='Facebook' iconName='facebook' />
            </div>
          </div>

          {/* Col 2: Liens rapides */}
          <div className='col-lg-3 col-md-6'>
            <ColTitle>{t('footer.quickLinks')}</ColTitle>
            <FooterLink to='/'>{t('footer.homeLink')}</FooterLink>
            <FooterLink to='/a-propos'>{t('footer.aboutLink')}</FooterLink>
            <FooterLink to='/produits-services'>{t('footer.servicesLink')}</FooterLink>
            <FooterLink to='/contact'>{t('footer.quoteLink')}</FooterLink>
            <FooterLink to='/contact'>{t('footer.contactLink')}</FooterLink>
          </div>

          {/* Col 3: Nos activités */}
          <div className='col-lg-3 col-md-6'>
            <ColTitle>{t('footer.activities')}</ColTitle>
            <FooterLink to='/produits-services'>{t('footer.actDiesel')}</FooterLink>
            <FooterLink to='/produits-services'>{t('footer.actGasoline')}</FooterLink>
            <FooterLink to='/produits-services'>{t('footer.actLub')}</FooterLink>
            <FooterLink to='/produits-services'>{t('footer.actDelivery')}</FooterLink>
            <FooterLink to='/produits-services'>{t('footer.actLpg')}</FooterLink>
          </div>

          {/* Col 4: Contact */}
          <div className='col-lg-3 col-md-6'>
            <ColTitle>{t('footer.contact')}</ColTitle>
            <div className='d-flex align-items-start gap-2 mb-3'>
              <div style={{ paddingTop: 2 }}><FtIcon name='pin' /></div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.4 }}>
                {t('footer.address')}
                <br/>
                <a href='https://www.google.com/maps/search/?api=1&query=Dixinn+Terrasse%2C+Conakry%2C+Guinee' target='_blank' rel='noopener noreferrer' style={{ color: 'rgba(243,146,0,0.95)', fontSize: '0.8rem', textDecoration: 'none' }}>
                  {t('footer.seeOnMaps')} <span style={{ fontSize: '0.7rem' }}>↗</span>
                </a>
              </div>
            </div>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <FtIcon name='phone' />
              <a href={'tel:' + t('footer.phone').replace(/\s/g,'')} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', textDecoration: 'none' }}>
                {t('footer.phone')}
              </a>
            </div>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <FtIcon name='mail' />
              <a href={'mailto:' + t('footer.email')} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                {t('footer.email')}
              </a>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <FtIcon name='clock' />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>{t('footer.schedule')}</span>
            </div>
          </div>
        </div>

        {/* SECONDARY BAR */}
        <div style={{
          marginTop: 40, paddingTop: 18, paddingBottom: 14,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
          gap: 22, fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#F39200' }}>★</span> {t('footer.certifications')}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span>{t('footer.partners')}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span>{t('footer.payments')}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span>{t('footer.networks')}</span>
        </div>

        {/* COPYRIGHT BAR */}
        <div style={{
          paddingTop: 16,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          gap: 10, fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)',
        }}>
          <span>
            &copy; 2026 <strong style={{ color: '#FFFFFF' }}>Africa Energy SAU</strong>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}> | </span>
            RCCM GN.TCC.2025.B.18185
          </span>
          <span style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
            <Link to='/politique-confidentialite' style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
            <Link to='/mentions-legales' style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{t('footer.legal')}</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span>{t('footer.developedBy')}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
