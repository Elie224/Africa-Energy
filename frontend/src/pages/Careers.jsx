import React, { useState, useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { apiUrl } from '../lib/apiBase.js'

const Careers = () => {
  const { t } = useI18n()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(apiUrl('/api/public/jobs'))
        if (res.ok) {
          const data = await res.json()
          setJobs(Array.isArray(data?.items) ? data.items : [])
        } else {
          setJobs([])
        }
      } catch (err) { setJobs([]) }
    }
    fetchJobs()
  }, [])

  return (
    <>
      <Seo title={t('pages.careers.heroTitle')} description={t('pages.careers.seoDesc')} />
      <PageHero title={t('pages.careers.heroTitle')} subtitle={t('pages.careers.heroSubtitle')} />

      <section className='section-padding'>
        <div className='container'>
          <div className='row align-items-center mb-5'>
            <div className='col-lg-8'>
              <h2>{t('pages.careers.introTitle')}</h2>
              <p className='lead text-muted'>{t('pages.careers.introText')}</p>
            </div>
            <div className='col-lg-4 text-center'>
              <div style={{ fontSize: '120px', color: 'var(--ae-orange)', opacity: 0.3 }}>
                <i className='bi bi-people-fill'></i>
              </div>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className='text-center py-5 my-3' style={{ background: 'linear-gradient(135deg, #0B2A5B 0%, #1E5BB8 100%)', borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: '70px', color: '#F39200' }}>
                <i className='bi bi-broadcast'></i>
              </div>
              <h3 className='mt-3 mb-3 text-white'>{t('pages.careers.emptyTitle')}</h3>
              <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, fontSize: '1.05rem' }}>
                {t('pages.careers.emptyDesc')}
              </p>
              <div className='mt-4'>
                <span className='badge px-4 py-2' style={{ backgroundColor: '#F39200', fontSize: '0.9rem' }}>
                  <i className='bi bi-bell me-2'></i>{t('pages.careers.stayConnected')}
                </span>
              </div>
            </div>
          ) : (
            <>
              <h3 className='mb-4'>{t('pages.careers.openPositionsTitle')}</h3>
              <div className='row g-4'>
                {jobs.map((j, i) => (
                  <div key={i} className='col-lg-6'>
                    <div className='ae-card'>
                      <div className='d-flex justify-content-between align-items-start mb-2'>
                        <h4 className='mb-0'>{j.title}</h4>
                        <span className='badge' style={{ backgroundColor: 'var(--ae-blue)' }}>{j.contract_type || '-'}</span>
                      </div>
                      <p className='text-muted small mb-2'>
                        <i className='bi bi-geo-alt me-1'></i>{j.location || '-'}
                      </p>
                      <p>{j.description}</p>
                      <a href={j.applyLink || '/contact'} className='btn btn-ae-outline btn-sm'>
                        {t('pages.careers.applyButton')} <i className='bi bi-arrow-right ms-1'></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
export default Careers

