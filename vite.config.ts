import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

const getPath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': getPath('./src'),
      '@worlds': getPath('./src/worlds'),
      '@containers': getPath('./src/containers'),
      '@components': getPath('./src/components'),
      '@systems': getPath('./src/systems'),
      '@utils': getPath('./src/utils'),
      '@types': getPath('./src/types')
    }
  },
  server: {
    hmr: false
  }
})
