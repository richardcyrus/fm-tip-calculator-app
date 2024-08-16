import { configDefaults, defineConfig } from 'vitest/config'
import config from './vite.config'

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
})
