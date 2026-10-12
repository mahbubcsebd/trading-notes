import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

// Extended frontmatter schema with Zod validation
const customSchema = frontmatterSchema.extend({
  description: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  tags: z.array(z.string()).default([]),
  instruments: z.array(z.string()).optional(),
  timeframes: z.array(z.string()).optional(),
  status: z.enum(['draft', 'in-progress', 'done']).default('draft'),
  sources: z
    .array(
      z.object({
        type: z.enum(['youtube', 'pdf', 'book', 'blog', 'other']),
        title: z.string(),
        url: z.string().optional(),
        note: z.string().optional(),
      })
    )
    .optional(),
  updated: z.coerce.date().optional(),
});

const patternSchema = customSchema.extend({
  category: z.string().optional(),
  winrate: z.string().optional(),
  riskReward: z.string().optional(),
  maxRisk: z.string().optional(),
  bestLocation: z.string().optional(),
  chartId: z.string().optional(),
});

export const { docs, meta } = defineDocs({
  dir: 'content/learn',
  docs: {
    schema: customSchema,
  },
});

export const { docs: patternDocs, meta: patternMeta } = defineDocs({
  dir: 'content/patterns',
  docs: {
    schema: patternSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
