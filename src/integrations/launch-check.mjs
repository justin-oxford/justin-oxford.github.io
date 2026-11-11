// Launch check: fails `astro build` if a TODO(Justin) placeholder or any draft content
// ended up in the built site. Runs after every production build (locally and in CI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const TODO = 'TODO(Justin)';

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** Frontmatter of every .md file in a content folder: [{ slug, data }]. */
function frontmatter(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const text = fs.readFileSync(path.join(folder, f), 'utf8');
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return { slug: f.replace(/\.md$/, ''), data: (m && parseYaml(m[1])) || {} };
    });
}

export default function launchCheck() {
  return {
    name: 'launch-check',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const problems = [];

        // 1. No TODO(Justin) text in any built page or text file.
        for (const file of walk(dist)) {
          if (!/\.(html|xml|txt|json)$/.test(file)) continue;
          if (fs.readFileSync(file, 'utf8').includes(TODO)) {
            problems.push(`"${TODO}" appears in ${path.relative(dist, file)}`);
          }
        }

        // 2. No draft project pages or draft writing PDFs.
        for (const { slug, data } of frontmatter('src/content/projects')) {
          if (data.draft === true && fs.existsSync(path.join(dist, 'projects', slug))) {
            problems.push(`draft project "${slug}" was built at /projects/${slug}/`);
          }
        }
        for (const { slug, data } of frontmatter('src/content/writing')) {
          if (data.draft === true && data.pdf && fs.existsSync(path.join(dist, data.pdf))) {
            problems.push(`draft writing "${slug}" shipped its PDF at ${data.pdf}`);
          }
        }

        if (problems.length) {
          throw new Error(
            `Launch check failed. Fix these and rebuild (or set draft: true):\n  - ${problems.join('\n  - ')}`,
          );
        }
        logger.info('No TODO(Justin) placeholders or draft content in the build.');
      },
    },
  };
}
