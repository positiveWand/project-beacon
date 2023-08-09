import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'route/main/index.html'),
        search: resolve(__dirname, 'route/search/index.html'),
        login: resolve(__dirname, 'route/login/index.html'),
        signup: resolve(__dirname, 'route/signup/index.html'),
        detail: resolve(__dirname, 'route/detail/index.html'),
      }
    }
  }
})
