import { defineCollection, z } from "astro:content";

const localeMap = z.object({
  ro: z.string(),
  ru: z.string(),
  en: z.string(),
});

const baseMeta = z.object({
  id: z.string(),
  slugs: localeMap,
  titles: localeMap,
  summaries: localeMap,
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/** Collections of MDX files; entry id is "<folder>/<index.locale>". */
const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ro", "ru", "en"]),
    /** The canonical id this MDX belongs to. */
    contentId: z.string(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ro", "ru", "en"]),
    contentId: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ro", "ru", "en"]),
    contentId: z.string(),
    publishedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ro", "ru", "en"]),
    contentId: z.string(),
  }),
});

/** Per-entry meta (slugs map etc.). One meta JSON per content folder. */
const servicesMeta = defineCollection({
  type: "data",
  schema: baseMeta,
});
const blogMeta = defineCollection({
  type: "data",
  schema: baseMeta.extend({
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    category: localeMap,
    readTime: z.number().int().positive(),
    featured: z.boolean().optional(),
    author: z.string().optional(),
  }),
});
const guidesMeta = defineCollection({
  type: "data",
  schema: baseMeta.extend({
    publishedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    category: localeMap,
    readTime: z.number().int().positive(),
    featured: z.boolean().optional(),
  }),
});
const pagesMeta = defineCollection({
  type: "data",
  schema: baseMeta,
});

export const collections = {
  services,
  blog,
  guides,
  pages,
  "services-meta": servicesMeta,
  "blog-meta": blogMeta,
  "guides-meta": guidesMeta,
  "pages-meta": pagesMeta,
};
