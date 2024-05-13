import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'


export default defineConfig({
  plugins: [
      react(),
      basicSsl()
  ],
  server: {
    port: 5270
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
