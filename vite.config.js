import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti 'my-crud-app' dengan nama repository kamu
export default defineConfig({
  plugins: [react()],
  base: '/my-crud-app/', // <-- harus sama persis dengan nama repo
})
