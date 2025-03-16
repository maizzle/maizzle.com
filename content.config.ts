import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: '**',
      type: 'page'
    }),
    templates: defineCollection({
      source: 'templates/**',
      type: 'page',
      schema: z.object({
        order: z.number()
      })
    }),
    starters: defineCollection({
      source: 'starters/**',
      type: 'page',
      schema: z.object({
        date: z.date(),
        image: z.string()
      })
    }),
    guides: defineCollection({
      source: 'guides/**/*.md',
      type: 'page',
      schema: z.object({
        date: z.date()
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
