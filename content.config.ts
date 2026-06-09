import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        section: z.string().optional(),
        order: z.number().optional(),
        sidebar: z.boolean().optional().default(true),
        toc: z.boolean().optional().default(true),
      }),
    }),
  },
})
