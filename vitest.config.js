import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import config from './vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [...config.plugins],
  test: {
    css: { include: [/.*/] },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/build/**', '**/e2e/**'],
    globals: true,
    include: ['./src/**/*.test.?(c|m)[jt]s?(x)'],
    setupFiles: ['./test/vitest-setup.js'],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
})
