import path from 'node:path'
import { fileURLToPath } from 'node:url'

// import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import { SITE } from './src/config.mjs'

import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs'

const __vitedirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  output: 'static',

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
  },

  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    // sitemap(),
    mdx(),
    vue(),
    compress(),
  ],

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__vitedirname, './src'),
      },
    },
  },
})
