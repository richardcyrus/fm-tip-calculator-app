export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    'postcss-sort-media-queries': {},
    'postcss-preset-env': {
      stage: 3,
      minimumVendorImplementations: 2,
    },
  },
}
