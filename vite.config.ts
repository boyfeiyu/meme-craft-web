import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 目标接口的域名
        changeOrigin: true, // 是否改变源地址
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写接口路径
      },
    },
  },
})

// http://localhost:3000
