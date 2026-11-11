import { getCollection } from 'astro:content';
import { showDrafts } from './projects';

/** Interests in file order: published ones, plus drafts in `npm run dev`. */
export async function getVisibleInterests<C extends 'writingInterests' | 'projectInterests'>(collection: C) {
  const entries = await getCollection(collection);
  return entries.filter((e) => showDrafts || !e.data.draft).map((e) => e.data);
}
