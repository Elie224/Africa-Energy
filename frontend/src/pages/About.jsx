import React from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { Link } from 'react-router-dom'

const About = () => {
  const { t } = useI18n()
  return (
    <>
      <Seo title={t('pages.about.seoTitle')} description={t('pages.about.seoDesc')} />
      <PageHero title={t('pages.about.heroTitle')} subtitle={t('pages.about.heroSubtitle')} />

      <section className='section-padding'>
        <div className='container'>
          <div className='row align-items-center g-5'>
            <div className='col-lg-6'>
              <span className='badge ae-section-tag mb-3'>{t('pages.about.sectionTag')}</span>
              <h2 className='mb-4'>{t('pages.about.companyName')}</h2>
              <p className='lead'>{t('pages.about.intro')}</p>
              <p>{t('pages.about.intro2')}</p>
            </div>
            <div className='col-lg-6'>
              <div className='row g-3'>
                <div className='col-6'>
                  <div className='ae-card text-center h-100'>
                    <div className='ae-icon-box ae-icon-box--blue' style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, var(--ae-blue) 0%, var(--ae-blue-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, margin: '0 auto 14px' }}>
                      <i className='bi bi-eye-fill'></i>
                    </div>
                    <h5>{t('pages.about.visionTitle')}</h5>
                    <p className='small mb-0 text-muted'>{t('pages.about.visionDesc')}</p>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='ae-card text-center h-100'>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, var(--ae-orange), var(--ae-gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, margin: '0 auto 14px' }}>
                      <i className='bi bi-bullseye'></i>
                    </div>
                    <h5>{t('pages.about.missionTitle')}</h5>
                    <p className='small mb-0 text-muted'>{t('pages.about.missionDesc')}</p>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='ae-card text-center h-100'>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, var(--ae-green), #1B5E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, margin: '0 auto 14px' }}>
                      <i className='bi bi-heart-fill'></i>
                    </div>
                    <h5>{t('pages.about.valuesTitle')}</h5>
                    <p className='small mb-0'>
                      <strong>{t('pages.about.values')}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding' style={{ backgroundColor: 'var(--ae-light)' }}>
        <div className='container'>
          <div className='ae-cta-strip'>
            <h2>{t('pages.about.ctaDiscuss')}</h2>
            <p>{t('pages.about.ctaText')}</p>
            <Link to='/contact' className='btn btn-ae-primary btn-lg'>
              <i className='bi bi-envelope me-2'></i>{t('pages.about.ctaDiscuss')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
export default About
