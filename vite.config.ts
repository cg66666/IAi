/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 00:54:03
 * @LastEditors: cg
 * @LastEditTime: 2026-02-26 14:48:45
 */
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/ai': {
          target: env.VITE_BASE_URL, // 真实接口地址, 后端给的基地址
          changeOrigin: true // 允许跨域
          // rewrite: (path) => path.replace(/^\/ai/, '')
        }
      }
    }
  }
})
