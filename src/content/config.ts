import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      heroImage: image().or(z.string()),
    }),
})

export const collections = { blog }
