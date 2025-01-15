import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //     proxy: {
    //     '/api': {
    //         target: 'https://dapi.kakao.com',
    //         changeOrigin: true,  // API 서버의 CORS 정책을 우회
    //         rewrite: (path) => path.replace(/^\/api/, ''),  // /api 경로를 제거
    //     },
    //     },
    // },
})
