import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com ws: wss:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests'
  ].join('; ')
}

const charsetPlugin = () => ({
  name: 'force-utf8-charset',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const origSetHeader = res.setHeader.bind(res)
      res.setHeader = function (name, value) {
        if (typeof value === 'string' && /^text\//.test(value) && !/charset/i.test(value)) {
          value = value + '; charset=utf-8'
        }
        return origSetHeader(name, value)
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const origSetHeader = res.setHeader.bind(res)
      res.setHeader = function (name, value) {
        if (typeof value === 'string' && /^text\//.test(value) && !/charset/i.test(value)) {
          value = value + '; charset=utf-8'
        }
        return origSetHeader(name, value)
      }
      next()
    })
  }
})

export default defineConfig({
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  plugins: [react(), charsetPlugin()],
  server: { port: 5174, open: false, headers: securityHeaders, proxy: { '/api': { target: 'http://localhost:4000', changeOrigin: true }, '/uploads': { target: 'http://localhost:4000', changeOrigin: true } } },
  preview: { port: 4173, open: false, headers: securityHeaders }
})

