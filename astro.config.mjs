// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import launchCheck from './src/integrations/launch-check.mjs';

// https://astro.build/config
export default defineConfig({
  // Canonical domain. The repo is justin-oxford.github.io, so no `base` is needed.
  site: 'https://justinoxford.com',
  output: 'static',
  integrations: [
    // Drafts never build, so they're never in the sitemap.
    sitemap({
      filter: (page) => !page.includes('/404'),
      // Static pages under public/ aren't discovered automatically.
      customPages: ['https://justinoxford.com/play/javascript-racing/'],
    }),
    // Fails the build if TODO(Justin) text or draft content ships.
    launchCheck(),
  ],
  // Montserrat, carried over from the old site. Downloaded at build time and
  // self-hosted from dist/ (no runtime requests to Google).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [300, 400, 500, 600, 700, 900],
      styles: ['normal', 'italic'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
