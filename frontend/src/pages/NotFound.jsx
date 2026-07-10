import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import Seo from '../components/Seo.jsx'

const COPY = {
  fr: {
    heading: "Page introuvable",
    lead: "La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
    seoTitle: "Page introuvable",
    seoDesc: "La page demandée est introuvable. Retournez à l'accueil."
  },
  en: {
    heading: 'Page not found',
    lead: 'The page you are looking for does not exist or has been moved.',
    cta: 'Back to home',
    seoTitle: 'Page not found',
    seoDesc: 'The requested page was not found. Return to homepage.'
  }
}

const NotFound = () => {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.fr
  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDesc} />
      <section className='section-padding text-center' style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className='container'>
          <div style={{ fontSize: '120px', color: 'var(--ae-orange)' }}>
            <i className='bi bi-fuel-pump' aria-hidden='true'></i>
          </div>
          <p className='display-1 fw-bold mb-0' style={{ color: 'var(--ae-blue-dark)' }}>404</p>
          <h1 className='mb-3' style={{ fontSize: '2rem' }}>{c.heading}</h1>
          <p className='text-muted mb-4'>{c.lead}</p>
          <Link to='/' className='btn btn-ae-primary btn-lg'>
            <i className='bi bi-house me-2' aria-hidden='true'></i>{c.cta}
          </Link>
        </div>
      </section>
    </>
  )
}

export default NotFound
