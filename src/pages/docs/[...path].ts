// Serves writing PDFs at their /docs/... paths.
// PDFs live in src/docs/ (not public/), so only PDFs belonging to published
// writing entries end up in the build; drafts' PDFs stay out until approved.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { getPublishedWriting, pdfSource } from '../../lib/writing';

export const getStaticPaths = (async () => {
  const entries = await getPublishedWriting();
  return entries
    .filter((e) => e.data.pdf)
    .map((e) => ({ params: { path: e.data.pdf!.replace(/^\/docs\//, '') }, props: { pdf: e.data.pdf! } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(readFileSync(pdfSource(props.pdf as string)), {
    headers: { 'Content-Type': 'application/pdf' },
  });
