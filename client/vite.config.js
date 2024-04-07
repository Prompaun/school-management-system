import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 5173 },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})

