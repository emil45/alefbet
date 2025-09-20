import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-browser-languagedetector'],
          'animation': ['react-confetti', 'react-transition-group']
        }
      }
    }
  }
})