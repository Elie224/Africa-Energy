import React from 'react'

const Logo = ({ variant = 'dark', height = 60 }) => {
  const bgColor = variant === 'light'  ? '#0B2A5B' : '#ffffff'
  const textColor = variant === 'light'  ? '#ffffff' : '#0B2A5B'
  const borderColor = variant === 'light'  ? 'rgba(255,255,255,0.2)' : 'rgba(11,42,91,0.1)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg height={height} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bulbGrad" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#F39200" />
            <stop offset="100%" stopColor="#D4A017" />
          </radialGradient>
        </defs>
        <path d="M 25 5 L 30 15 M 55 5 L 50 15 M 40 0 L 40 12 M 10 20 L 18 26 M 70 20 L 62 26" stroke={variant === 'light'  ? '#ffffff' : '#F39200'} strokeWidth="3" strokeLinecap="round" />
        <path d="M 40 15 C 25 15 18 28 18 40 C 18 52 28 60 32 65 L 48 65 C 52 60 62 52 62 40 C 62 28 55 15 40 15 Z" fill="url(#bulbGrad)" stroke="#D4A017" strokeWidth="1.5" />
        <ellipse cx="32" cy="35" rx="3" ry="6" fill="rgba(255,255,255,0.3)" />
        <path d="M 40 25 C 35 28 30 35 32 45 C 33 50 36 55 40 58 C 44 55 47 50 48 45 C 50 35 45 28 40 25 Z" fill="#2E7D32" stroke="#ffffff" strokeWidth="0.5" />
        <path d="M 32 68 L 48 68 L 46 75 L 34 75 Z" fill={variant === 'light'  ? '#1E5BB8' : '#0B2A5B'} />
      </svg>
      <div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '20px', color: textColor, lineHeight: 1, letterSpacing: '0.5px' }}>
          AFRICA
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', color: textColor, lineHeight: 1, letterSpacing: '0.5px' }}>
          ENERGY
        </div>
      </div>
    </div>
  )
}

export default Logo
