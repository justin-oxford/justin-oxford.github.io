import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Drafts are visible in `npm run dev` (marked "Draft") so they can be reviewed,
 * and never included in a production build.
 */
export const showDrafts = import.meta.env.DEV;

/** All published projects (plus drafts in dev), newest first (by `started`, then title). */
export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => showDrafts || !data.draft);
  return projects.sort(
    (a, b) => b.data.started.localeCompare(a.data.started) || a.data.title.localeCompare(b.data.title),
  );
}

/** Tags used by at least one published project, with labels and counts, in tags.yaml order. */
export async function getTagsInUse(projects: Project[]) {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);

  const all = await getCollection('tags');
  return all
    .filter((t) => counts.has(t.id))
    .map((t) => ({ id: t.id, label: t.data.label, count: counts.get(t.id)! }));
}

export async function getTagLabel(id: string) {
  return (await getEntry('tags', id))?.data.label ?? id;
}

export const projectUrl = (p: Project) => `/projects/${p.id}/`;
export const tagUrl = (id: string) => `/projects/tag/${id}/`;
