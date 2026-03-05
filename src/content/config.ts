import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const pinnedField = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') return false;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['yes', 'true', '1', 'y'].includes(normalized)) return true;
    if (['no', 'false', '0', 'n'].includes(normalized)) return false;
  }
  return value;
}, z.boolean()).default(false);

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.string(),
    category: z.string(),
    Pinned: pinnedField,
    pinnedAt: z.string().optional(),
  }),
});

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.string(),
    category: z.string(),
    Pinned: pinnedField,
    pinnedAt: z.string().optional(),
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
  portfolio: portfolioCollection,
  pages: pagesCollection
}
