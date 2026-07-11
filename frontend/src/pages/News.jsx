import React, { useState, useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import Seo from '../components/Seo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import SafeHtml from '../components/SafeHtml.jsx'
import { apiUrl, assetUrl } from '../lib/apiBase.js'

const fmtDate = (ts, lang) => {
  if (!ts) return ''
  try { return new Date(ts).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return '' }
}

const News = () => {
  const { t, lang } = useI18n()
  const [articles, setArticles] = useState([])
  const [open, setOpen] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(apiUrl('/api/public/news'))
        if (res.ok) {
          const data = await res.json()
          setArticles(data.items || [])
        }
      } catch (err) { setArticles([]) }
      finally { setLoading(false) }
    }
    fetchArticles()
  }, [])

  const openArticle = async (slug) => {
    setOpen(slug)
    try {
      const res = await fetch(apiUrl('/api/public/news/' + encodeURIComponent(slug)))
      if (res.ok) {
        const data = await res.json()
        setDetail(data.item || null)
      }
    } catch { setDetail(null) }
  }
  const closeArticle = () => { setOpen(null); setDetail(null) }

  return (
    <>
      <Seo title={t('pages.news.seoTitle')} description={t('pages.news.seoDesc')} />
      <PageHero title={t('pages.news.heroTitle')} subtitle={t('pages.news.heroSubtitle')} />
      <section className='section-padding'>
        <div className='container'>
          {loading ? (
            <div className='text-center py-5 text-muted'>{t('common.loading')}</div>
          ) : articles.length === 0 ? (
            <div className='text-center py-5 my-3' style={{ background: 'linear-gradient(135deg, #0B2A5B 0%, #1E5BB8 100%)', borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: '70px', color: '#F39200' }}>
                <i className='bi bi-broadcast'></i>
              </div>
              <h3 className='mt-3 mb-3 text-white'>{t('pages.news.emptyTitle')}</h3>
              <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, fontSize: '1.05rem' }}>
                {t('pages.news.emptyDesc')}
              </p>
              <div className='mt-4'>
                <span className='badge px-4 py-2' style={{ backgroundColor: '#F39200', fontSize: '0.9rem' }}>
                  <i className='bi bi-bell me-2'></i>{t('pages.news.stayConnected')}
                </span>
              </div>
            </div>
          ) : (
            <div className='row g-4'>
              {articles.map((a) => (
                <div key={a.id} className='col-lg-4 col-md-6'>
                  <article className='ae-card h-100' onClick={() => openArticle(a.slug)} style={{ cursor: 'pointer' }}>
                    {a.image_url && (
                      <div style={{ height: 180, backgroundImage: 'url(' + assetUrl(a.image_url) + ')', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, marginBottom: 14 }} />
                    )}
                    <small className='text-muted d-block mb-2'>{fmtDate(a.published_at, lang)}</small>
                    <h5>{a.title}</h5>
                    <p className='text-muted'>{a.excerpt}</p>
                    <span className='fw-bold' style={{ color: '#1E5BB8' }}>
                      {t('common.readMore')} <i className='bi bi-arrow-right'></i>
                    </span>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {open && (
        <div className='modal d-block' tabIndex={-1} role='dialog' style={{ background: 'rgba(11,42,91,0.7)' }} onClick={closeArticle}>
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
              <div className='modal-header' style={{ background: '#0B2A5B', color: 'white' }}>
                <h5 className='modal-title'>{detail ? detail.title : t('common.loading')}</h5>
                <button type='button' className='btn-close btn-close-white' onClick={closeArticle}></button>
              </div>
              <div className='modal-body'>
                {detail ? (
                  <>
                    {detail.image_url && <img src={assetUrl(detail.image_url)} alt={detail.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />}
                    <small className='text-muted d-block mb-3'>{fmtDate(detail.published_at, lang)}</small>
                    <SafeHtml html={detail.content} />
                  </>
                ) : (
                  <div className='text-center py-4 text-muted'>{t('common.loading')}</div>
                )}
              </div>
              <div className='modal-footer'>
                <button className='ae-btn secondary' onClick={closeArticle}>{t('common.close')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default News
