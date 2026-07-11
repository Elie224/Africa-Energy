import React from 'react'

/*
  Official logo (Africa Energy SAU): /public/logo-ae1.png
  Default variant="dark" — designed for light backgrounds (navbar, og-image).
  The full-colour PNG (navy text on transparent background) is not legible on
  dark surfaces; the footer uses its own inline icon + wordmark instead.
*/
const Logo = ({ variant = 'dark', height = 60 }) => {
  const filter =
    variant === 'light'
      ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))'
      : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08))'

  return (
    <img
      src="/logo-ae1.png"
      alt="Africa Energy SAU"
      height={height}
      style={{
        height: `${height}px`,
        width: 'auto',
        maxWidth: '100%',
        display: 'block',
        filter,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      draggable={false}
    />
  )
}

export default Logo
