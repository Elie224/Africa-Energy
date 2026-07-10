import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Test du helper api.js : timeout 15s, gestion erreurs JSON

describe('api timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('annule une requete qui depasse 15s', async () => {
    // Mock fetch qui ne repond jamais
    global.fetch = vi.fn(() => new Promise((resolve) => {
      // On simule un AbortError
      setTimeout(() => resolve({ ok: true, json: () => ({}) }), 30000)
    }))
    global.AbortController = class {
      constructor() { this.signal = { aborted: false }; this.abort = () => { this.signal.aborted = true } }
    }
    // Importer api apres avoir defini fetch
    const { api } = await import('../admin/lib/api.js')
    const p = api.get('/test')
    // Avancer de 16s
    vi.advanceTimersByTime(16000)
    await expect(p).rejects.toThrow()
  })
})
