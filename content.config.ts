import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: '**',
      type: 'page',
      schema: z.object({
        sitemap: defineSitemapSchema({ name: 'docs' }),
      })
    }),
    templates: defineCollection({
      source: 'templates/**',
      type: 'page',
      schema: z.object({
        order: z.number(),
        sitemap: defineSitemapSchema({ name: 'templates' }),
      })
    }),
    starters: defineCollection({
      source: 'starters/**',
      type: 'page',
      schema: z.object({
        date: z.date(),
        image: z.string(),
        sitemap: defineSitemapSchema({ name: 'starters' }),
      })
    }),
    guides: defineCollection({
      source: 'guides/**/*.md',
      type: 'page',
      schema: z.object({
        date: z.date(),
        sitemap: defineSitemapSchema({ name: 'guides' }),
      })
    }),
    // Code samples on homepage
    code: defineCollection({
      source: 'code/**',
      type: 'page'
    }),
    features: defineCollection({
      type: 'data',
      source: 'data/features.json',
      schema: z.object({
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            path: z.string(),
          })
        )
      })
    }),
    navigation: defineCollection({
      type: 'data',
      source: 'data/navigation.json',
      schema: z.object({
        items: z.array(
          z.object({
            name: z.string(),
            items: z.array(
              z.object({
                title: z.string(),
                path: z.string()
              })
            )
          })
        )
      })
    })
  }
})
