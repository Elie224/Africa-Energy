import React, { useState, useEffect } from 'react'
import Seo from '../components/Seo.jsx'

const Careers = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // Recuperation des offres depuis lâ€™API (back-office)
    // Pour lâ€™instant la liste est vide - lâ€™encadrÃ© apparait
    // Quand lâ€™admin publiera, fetch('/api/jobs') remplira cette liste
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs')
        if (res.ok) {
          const data = await res.json()
          setJobs(data)
        }
      } catch (err) {
        setJobs([])
      }
    }
    fetchJobs()
  }, [])

  return (
    <>
      <Seo title="Carrieres" description="Rejoignez Africa Energy SAU. Consultez nos offres d emploi et postulez en ligne dans le secteur petrolier guineen." />
      <section className='ae-hero' style={{ padding: '80px 0' }}>
        <div className='container text-center'>
          <h1>CarriÃ¨res</h1>
          <p className='mt-3' style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Rejoignez lâ€™aventure Africa Energy SAU
          </p>
        </div>
      </section>

      <section className='section-padding'>
        <div className='container'>
          <div className='row align-items-center mb-5'>
            <div className='col-lg-8'>
              <h2>Pourquoi nous rejoindre ?</h2>
              <p className='lead text-muted'>
                Africa Energy SAU, câ€™est une Ã©quipe jeune, dynamique et engagÃ©e dans le
                dÃ©veloppement Ã©nergÃ©tique de la GuinÃ©e. Nous investissons dans la formation,
                la sÃ©curitÃ© et le bien-Ãªtre de nos collaborateurs.
              </p>
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
              <h3 className='mt-3 mb-3 text-white'>Les offres seront publiÃ©es prochainement</h3>
              <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, fontSize: '1.05rem' }}>
                Notre Ã©quipe sâ€™agrandit. De nouvelles opportunitÃ©s professionnelles seront
                annoncÃ©es trÃ¨s bientÃ´t sur cette page. Revenez rÃ©guliÃ¨rement pour dÃ©couvrir
                nos postes Ã  pourvoir.
              </p>
              <div className='mt-4'>
                <span className='badge px-4 py-2' style={{ backgroundColor: '#F39200', fontSize: '0.9rem' }}>
                  <i className='bi bi-bell me-2'></i>Restez connectÃ©s
                </span>
              </div>
            </div>
          ) : (
            <>
              <h3 className='mb-4'>Postes ouverts</h3>
              <div className='row g-4'>
                {jobs.map((j, i) => (
                  <div key={i} className='col-lg-6'>
                    <div className='ae-card'>
                      <div className='d-flex justify-content-between align-items-start mb-2'>
                        <h4 className='mb-0'>{j.title}</h4>
                        <span className='badge' style={{ backgroundColor: 'var(--ae-blue)' }}>{j.type}</span>
                      </div>
                      <p className='text-muted small mb-2'>
                        <i className='bi bi-geo-alt me-1'></i>{j.location}
                      </p>
                      <p>{j.desc}</p>
                      <a href={j.applyLink || '/contact'} className='btn btn-ae-outline btn-sm'>
                        Postuler <i className='bi bi-arrow-right ms-1'></i>
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





