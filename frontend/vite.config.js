import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const src = resolve(__dirname, "src")
const outDir = resolve(__dirname, "dist")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        "index": resolve(__dirname, 'index.html'),
        "detail": resolve(src, "detailPage", "index.html"),
        "search": resolve(src, "searchPage", "index.html"),
        "main": resolve(src, "mainPage", "index.html"),
        "login": resolve(src, "loginPage", "index.html"),
        "signup": resolve(src, "signupPage", "index.html")
      },
    }
  }
})
