// Site-wide settings used by the layout, header, and footer.
// Text Justin edits (like the Home bio) lives in src/data/site.yaml so Pages CMS can edit it.
import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';

const editable = parseYaml(readFileSync('src/data/site.yaml', 'utf8')) as { bio?: string; about?: string };

export const site = {
  name: 'Justin Oxford',
  // Contact is the domain email only (Site Rules #5).
  email: 'contact@justinoxford.com',
  github: 'https://github.com/justin-oxford',
  signOff: 'Safe Travels', // from the old site's footer
  // Home page intro, from src/data/site.yaml.
  bio: editable?.bio?.trim() || 'TODO(Justin): short bio, 2–4 sentences.',
  // About page intro, from src/data/site.yaml. Blank lines separate paragraphs.
  about: editable?.about?.trim() || 'TODO(Justin): a short narrative for the About page.',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects/', label: 'Projects' },
    { href: '/writing/', label: 'Writing' },
    { href: '/about/', label: 'About' },
  ],
} as const;
