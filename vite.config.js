import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // change to vue(), svelte(), etc.
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      '@': '/src', // optional, like Webpack aliases
    },
  },
})
