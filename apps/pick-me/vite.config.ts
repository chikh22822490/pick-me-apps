/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/pick-me',

  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true
      }
    }
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    viteTsConfigPaths({
      root: '../../'
    })
  ],

  resolve: {}
})
