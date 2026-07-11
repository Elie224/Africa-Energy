import React from 'react'

/*
  Reusable inner-page hero. Renders the same dark gradient + glows as Home
  with a centered title, optional eyebrow/kicker, subtitle, and breadcrumb.
  Props:
    - title (string, required)
    - subtitle (string)
    - kicker (string, small uppercase label above title)
*/
const PageHero = ({ title, subtitle, kicker, breadcrumb }) => (
  <section className='ae-hero-simple'>
    <div className='container text-center'>
      {breadcrumb && (
        <nav className='ae-breadcrumb' aria-label='breadcrumb'>
          {breadcrumb}
        </nav>
      )}
      {kicker && (
        <span className='badge mb-3 px-3 py-2 ae-hero__kicker'>
          {kicker}
        </span>
      )}
      <h1>{title}</h1>
      {subtitle && (
        <p className='ae-hero__subtitle'>{subtitle}</p>
      )}
    </div>
  </section>
)

export default PageHero
