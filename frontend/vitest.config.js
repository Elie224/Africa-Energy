import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**']
    }
  }
})
