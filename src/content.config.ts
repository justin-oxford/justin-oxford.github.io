// Content collections and their schemas.
// See the "Content Model" reference card on the Trello board for the rationale.
// Entries are edited by hand or through Pages CMS (.pages.yml), so blank optional
// fields ("" or null, which the CMS may write) are treated as "not set".
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

// The CMS tag picker (.pages.yml) has its own copy of the tag list; fail loudly if they drift.
if (existsSync('.pages.yml')) {
  const cms = parseYaml(readFileSync('.pages.yml', 'utf8'));
  const projectsEntry = cms?.content?.find((c: { name: string }) => c.name === 'projects');
  const cmsTags: string[] = (projectsEntry?.fields?.find((f: { name: string }) => f.name === 'tags')?.options?.values ?? [])
    .map((v: { name: string } | string) => (typeof v === 'string' ? v : v.name));
  const missing = tagIds.filter((t) => !cmsTags.includes(t));
  const extra = cmsTags.filter((t) => !tagIds.includes(t));
  if (missing.length || extra.length) {
    throw new Error(
      `Tag lists are out of sync. src/data/tags.yaml and the "tags" field in .pages.yml must match.` +
        (missing.length ? ` Missing from .pages.yml: ${missing.join(', ')}.` : '') +
        (extra.length ? ` Not in tags.yaml: ${extra.join(', ')}.` : ''),
    );
  }
}

/** Optional field that also accepts blank values ("" or null) as "not set". */
const blankable = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

/** Month precision only: YYYY-MM (e.g. 2019-06). */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2019-06 (month precision only)');

/** A year (2019 or "2019") or a month ("2019-06"). */
const yearOrMonth = z.union([
  z.number().int().min(1900).max(2100),
  z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use a year (2019) or YYYY-MM (2019-06)'),
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
        ended: blankable(yearMonth),
        tags: z.preprocess((v) => v ?? [], z.array(tagId)),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        links: z.preprocess(
          (v) => v ?? {},
          z
            .object({
              repo: blankable(link),
              live: blankable(link),
              download: blankable(link),
            })
            .strict(),
        ),
        cover: blankable(image()),
        coverAlt: blankable(z.string()),
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
      year: z.coerce.number().int().min(1900).max(2100),
      kind: z.enum(['essay', 'paper', 'article', 'story']),
      summary: z.string().min(1),
      // Site path of the PDF. The file itself lives in src/docs/ (same subpath) and is only
      // copied into the build for published entries; see src/pages/docs/[...path].ts.
      pdf: blankable(
        z
          .string()
          .regex(/^\/docs\/.+\.pdf$/, 'pdf must be a path under /docs/, e.g. /docs/essays/laplace.pdf')
          .refine((p) => existsSync(`src${p}`), {
            error: (issue) => `PDF not found: put the file at src${String(issue.input)}`,
          }),
      ),
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
      end: blankable(yearOrMonth),
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
      detail: blankable(z.string()),
    })
    .strict(),
});

export const collections = { tags, projects, writing, timeline, certificates };
