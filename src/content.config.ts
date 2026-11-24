import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages CMS may write empty strings / nulls for empty fields: normalise them.
const optionalString = z
  .string()
  .nullish()
  .transform((v) => v || undefined);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: optionalString,
    date: z.string(),
    cover: optionalString,
    tags: z
      .array(z.string())
      .nullish()
      .transform((v) => (v ?? []).filter(Boolean)),
    featured: z
      .boolean()
      .nullish()
      .transform((v) => v ?? false),
    draft: z
      .boolean()
      .nullish()
      .transform((v) => v ?? false),
  }),
});

export const collections = { projects };
