import antfu from '@antfu/eslint-config'

export default antfu({
  // Using antfu's sensible defaults
  typescript: true,
  vue: true,
  astro: true,
  ignores: [
    'dist',
    '.astro',
    'node_modules',
    '*.min.*',
    'pnpm-lock.yaml',
  ],
})
