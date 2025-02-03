import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for debugging
    // Optionally, disable minification if you prefer non-minified output during development:
    minify: false, 
  },
})