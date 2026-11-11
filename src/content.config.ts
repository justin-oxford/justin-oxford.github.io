// Content collections and their schemas.
// See the "Content Model" reference card on the Trello board for the rationale.
import { existsSync, readFileSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

// Tag ids from the controlled vocabulary. Validated as an enum (not `reference()`),
// because an unknown reference only logs an error and the build still succeeds.
const tagIds = (parseYaml(readFileSync('src/data/tags.yaml', 'utf8')) as { id: string }[]).map(
  (t) => t.id,
);
const tagId = z.string().refine((t) => tagIds.includes(t), {
  error: (issue) => `Unknown tag "${String(issue.input)}". Add it to src/data/tags.yaml or use one of: ${tagIds.join(', ')}`,
});

/** Month precision only: YYYY-MM (e.g. 2019-06). */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2019-06 (month precision only)');

/** A year (2019) or a month (2019-06). */
const yearOrMonth = z.union([
  z.number().int().min(1900).max(2100),
  yearMonth,
]);

/** Absolute URL, or a site-relative path like /play/javascript-racing/. */
const link = z
  .string()
  .refine((v) => v.startsWith('/') || URL.canParse(v), 'Use a full URL (https://…) or a path starting with /');

/** Compare YYYY-MM / YYYY values as strings that sort chronologically. */
const sortKey = (v: string | number) => String(v);

// Tag vocabulary. Every project tag must exist here.
const tags = defineCollection({
  loader: file('src/data/tags.yaml'),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/, 'Tag ids are lowercase-kebab-case, e.g. game-dev'),
    label: z.string().min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(1),
        status: z.enum(['active', 'archived', 'shelved']),
        started: yearMonth,
        ended: yearMonth.optional(),
        tags: z.array(tagId).default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        links: z
          .object({
            repo: link.optional(),
            live: link.optional(),
            download: link.optional(),
          })
          .strict()
          .default({}),
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
      })
      .strict()
      .refine((p) => !p.cover || p.coverAlt, {
        message: 'coverAlt is required when cover is set',
        path: ['coverAlt'],
      })
      .refine((p) => !p.ended || p.ended >= p.started, {
        message: 'ended must not be before started',
        path: ['ended'],
      }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string().min(1),
      year: z.number().int().min(1900).max(2100),
      kind: z.enum(['essay', 'paper', 'article', 'story']),
      summary: z.string().min(1),
      // Site path of the PDF. The file itself lives in src/docs/ (same subpath) and is only
      // copied into the build for published entries; see src/pages/docs/[...path].ts.
      pdf: z
        .string()
        .regex(/^\/docs\/.+\.pdf$/, 'pdf must be a path under /docs/, e.g. /docs/essays/laplace.pdf')
        .refine((p) => existsSync(`src${p}`), {
          error: (issue) => `PDF not found: put the file at src${String(issue.input)}`,
        })
        .optional(),
      draft: z.boolean().default(false),
    })
    .strict(),
});

// YAML lists without ids: give each entry its position as its id (keeps display order).
const indexedYaml = (text: string) =>
  ((parseYaml(text) as unknown[] | null) ?? []).map((entry, i) => ({
    id: String(i).padStart(3, '0'),
    ...(entry as object),
  }));

const timeline = defineCollection({
  loader: file('src/data/timeline.yaml', { parser: indexedYaml }),
  schema: z
    .object({
      id: z.string(),
      start: yearOrMonth,
      end: yearOrMonth.optional(),
      org: z.string().min(1),
      role: z.string().min(1),
      summary: z.string().min(1),
    })
    .strict()
    .refine((t) => t.end === undefined || sortKey(t.end) >= sortKey(t.start), {
      message: 'end must not be before start',
      path: ['end'],
    }),
});

const certificates = defineCollection({
  loader: file('src/data/certificates.yaml', { parser: indexedYaml }),
  schema: z
    .object({
      id: z.string(),
      name: z.string().min(1),
      detail: z.string().min(1).optional(),
    })
    .strict(),
});

export const collections = { tags, projects, writing, timeline, certificates };
