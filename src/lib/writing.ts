import { statSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import { showDrafts } from './projects';

export type Writing = CollectionEntry<'writing'>;

/**
 * Published writing (plus drafts in `npm run dev`), newest first.
 * Fails the build if two entries point at the same PDF, which the old site did by mistake.
 */
export async function getPublishedWriting(): Promise<Writing[]> {
  const entries = await getCollection('writing', ({ data }) => showDrafts || !data.draft);

  const byPdf = new Map<string, string>();
  for (const e of entries) {
    if (!e.data.pdf) continue;
    const other = byPdf.get(e.data.pdf);
    if (other) {
      throw new Error(`Writing entries "${other}" and "${e.id}" both use ${e.data.pdf}. Each PDF should belong to one entry.`);
    }
    byPdf.set(e.data.pdf, e.id);
  }

  return entries.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}

/** Source file for a /docs/... path. */
export const pdfSource = (pdf: string) => `src${pdf}`;

/** "290 KB" / "1.2 MB" */
export function pdfSize(pdf: string) {
  const bytes = statSync(pdfSource(pdf)).size;
  return bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} KB`;
}

export const kindLabel = { essay: 'Essay', paper: 'Paper', article: 'Article', story: 'Short story' } as const;
