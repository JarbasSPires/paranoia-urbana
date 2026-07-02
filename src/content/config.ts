import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  date: z.date(),
  summary: z.string(),
  band: z.string().optional(),
  cover: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
});

const showSchema = z.object({
  band: z.string(),
  date: z.date(),
  venue: z.string(),
  city: z.string(),
  link: z.string().optional(),
});

const reviews = defineCollection({ type: 'content', schema: articleSchema });
const interviews = defineCollection({ type: 'content', schema: articleSchema });
const columns = defineCollection({ type: 'content', schema: articleSchema });
const documentaries = defineCollection({ type: 'content', schema: articleSchema });
const shows = defineCollection({ type: 'content', schema: showSchema });

export const collections = { reviews, interviews, columns, documentaries, shows };
