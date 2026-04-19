import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('@tanstack/react-query')) return 'query-vendor'
            if (id.includes('framer-motion')) return 'motion-vendor'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})