import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.string(),
    category: z.string(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.string(),
    color: z.string(),
    category: z.string(),
    projectInfo: z.array(
      z.object({
        title: z.string(),
        data: z.string(),
      })
    ),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
});

export const collections = {
  blog: blogCollection,
  project: projectCollection,
  pages: pagesCollection
}