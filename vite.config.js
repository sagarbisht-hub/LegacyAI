import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * /api/* is proxied to the FastAPI backend at http://localhost:8000.
 * This means the frontend never makes cross-origin requests in development —
 * it hits the same origin and Vite forwards the calls.
 *
 * In production, configure your reverse proxy (nginx / Caddy) to do the
 * same forwarding: location /api { proxy_pass http://127.0.0.1:8000; }
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // Optional: log every proxied request during development
        configure: (proxy) => {
          proxy.on('error', (err) => {
            // Backend not running — UI falls back to demo data automatically
            if (process.env.NODE_ENV !== 'test') {
              console.warn('[vite proxy] Backend unreachable:', err.message)
            }
          })
        },
      },
    },
  },
})
