import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  define: {
    BACKEND_URL: process.env.BACKEND_URL 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch:{
      usePolling: true
    },
    host:true,
    port: 5173
  }
})
