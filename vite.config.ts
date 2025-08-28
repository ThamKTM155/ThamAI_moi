import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Cấu hình đúng để hoạt động trên Netlify
export default defineConfig({
  plugins: [react()],
  base: './', // 💡 Rất quan trọng
  build: {
    outDir: 'dist',
  },
})
