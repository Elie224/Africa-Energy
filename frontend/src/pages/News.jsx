import React, { useState, useEffect } from 'react'

const News = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    // Recuperation des articles depuis l’API (back-office)
    // Pour l’instant la liste est vide - l’encadré apparait
    // Quand l’admin publiera, fetch('/api/articles') remplira cette liste
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles')
        if (res.ok) {
          const data = await res.json()
          setArticles(data)
        }
      } catch (err) {
        // Pas encore d API - liste vide
        setArticles([])
      }
    }
    fetchArticles()
  }, [])

  return (
    <>
      <section className='ae-hero' style={{ padding: '80px 0' }}>
        <div className='container text-center'>
          <h1>Actualites</h1>
          <p className='mt-3' style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Suivez lactualite d’Afrique Energy SAU
          </p>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          {articles.length === 0 ? (
            <div className='text-center py-5 my-3' style={{ background: 'linear-gradient(135deg, #0B2A5B 0%, #1E5BB8 100%)', borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: '70px', color: '#F39200' }}>
                <i className='bi bi-broadcast'></i>
              </div>
              <h3 className='mt-3 mb-3 text-white'>Les actualites seront publiées prochainement</h3>
              <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, fontSize: '1.05rem' }}>
                Communiques, partenariats, vie de l’entreprise. Revenez régulièrement
                pour découvrir nos dernieres nouvelles et annonces.
              </p>
              <div className='mt-4'>
                <span className='badge px-4 py-2' style={{ backgroundColor: '#F39200', fontSize: '0.9rem' }}>
                  <i className='bi bi-bell me-2'></i>Restez connectés
                </span>
              </div>
            </div>
          ) : (
            <div className='row g-4'>
              {articles.map((a, i) => (
                <div key={i} className='col-lg-4 col-md-6'>
                  <article className='ae-card h-100'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                      <span className='badge' style={{ backgroundColor: 'var(--ae-orange)' }}>{a.cat}</span>
                      <small className='text-muted'>{a.date}</small>
                    </div>
                    <h5>{a.title}</h5>
                    <p>{a.excerpt}</p>
                    <a href={a.link || '#'} className='text-decoration-none fw-bold' style={{ color: 'var(--ae-blue)' }}>
                      Lire la suite <i className='bi bi-arrow-right'></i>
                    </a>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default News

