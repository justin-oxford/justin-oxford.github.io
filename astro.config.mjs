// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Canonical domain. The repo is justin-oxford.github.io, so no `base` is needed.
  site: 'https://justinoxford.com',
  output: 'static',
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
