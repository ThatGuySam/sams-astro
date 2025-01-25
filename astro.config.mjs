import path from 'node:path'
import { fileURLToPath } from 'node:url'

// import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image'

import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import { SITE } from './src/config.mjs'

import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs'

const __vitedirname = path.dirname(fileURLToPath(import.meta.url))

function whenExternalScripts(items = []) {
  return SITE.googleAnalyticsId ? (Array.isArray(items) ? items.map(item => item()) : [items()]) : []
}

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
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    vue(),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      }),
    ),

    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,

      logger: 1,
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__vitedirname, './src'),
      },
    },
  },
})
