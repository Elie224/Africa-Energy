import React from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { Link } from 'react-router-dom'

const items = [
  { icon: 'bi-shield-fill-check', color: 'var(--ae-blue)' },
  { icon: 'bi-fingerprint', color: 'var(--ae-orange)' },
  { icon: 'bi-lock-fill', color: 'var(--ae-green)' },
  { icon: 'bi-people-fill', color: 'var(--ae-gold)' },
  { icon: 'bi-tree-fill', color: 'var(--ae-green)' },
  { icon: 'bi-award-fill', color: 'var(--ae-blue)' }
]

const IconBox = ({ icon, color }) => (
  <div
    className="ae-icon-box"
    style={color ? {
      background: color === 'var(--ae-blue)' ? 'linear-gradient(135deg, var(--ae-blue), var(--ae-blue-dark))'
        : color === 'var(--ae-orange)' ? 'linear-gradient(135deg, var(--ae-orange), var(--ae-gold))'
        : color === 'var(--ae-green)' ? 'linear-gradient(135deg, var(--ae-green), #1B5E20)'
        : 'linear-gradient(135deg, var(--ae-gold), #B8860B)',
      color: '#fff'
    } : null}
  >
    <i className={'bi ' + icon}></i>
  </div>
)

const Engagements = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.engagements.heroTitle')} description={t('pages.engagements.seoDesc')} />
      <PageHero title={t('pages.engagements.heroTitle')} subtitle={t('pages.engagements.heroSubtitle')} />

      <section className='section-padding'>
        <div className='container'>
          <div className='section-title'>
            <h2>{t('pages.engagements.sectionTag')}</h2>
            <p className='lead'>{t('pages.engagements.sectionLead')}</p>
          </div>
          <div className='row g-3'>
            {items.map((it, idx) => (
              <div key={idx} className='col-lg-4 col-md-6'>
                <div className='ae-card ae-card--compact text-center h-100'>
                  <IconBox icon={it.icon} color={it.color} />
                  <h4 className='mb-2'>{t('pages.engagements.eng' + (idx + 1) + 'Title')}</h4>
                  <p className='text-muted small mb-0'>{t('pages.engagements.eng' + (idx + 1) + 'Desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container'>
          <div className='ae-cta-strip'>
            <h2>{t('pages.engagements.ctaTitle')}</h2>
            <p>{t('pages.engagements.ctaText')}</p>
            <Link to='/contact' className='btn btn-ae-primary btn-lg'>
              <i className='bi bi-envelope me-2'></i>{t('pages.engagements.ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
export default Engagements
