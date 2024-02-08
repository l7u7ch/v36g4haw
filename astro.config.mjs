import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import react from '@astrojs/react'
import rehypeExternalLinks from 'rehype-external-links'
import remarkBreaks from 'remark-breaks'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://docs.astro.build/ja/reference/configuration-reference/
export default defineConfig({
  // https://docs.astro.build/ja/reference/configuration-reference/#site
  site: 'https://xenexe.info/',

  // https://docs.astro.build/ja/guides/integrations-guide/
  integrations: [expressiveCode(), react(), sitemap(), tailwind()],

  // https://docs.astro.build/ja/guides/markdown-content/
  markdown: {
    remarkRehype: {
      footnoteLabel: ' ',
      footnoteLabelProperties: { className: [''] },
      footnoteLabelTagName: 'hr',
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: '_blank',
        },
      ],
    ],
    remarkPlugins: [remarkBreaks],
  },
})
