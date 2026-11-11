// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Fonts are downloaded at build time and self-hosted from dist/ (no runtime third-party requests).
// Pairing A is the site default; pairing B is loaded only on /styleguide for comparison.
const fontsource = fontProviders.fontsource();

// https://astro.build/config
export default defineConfig({
  // Canonical domain. The repo is justin-oxford.github.io, so no `base` is needed.
  site: 'https://justinoxford.com',
  output: 'static',
  fonts: [
    // Pairing A: Fraunces (display) + Source Sans 3 (body)
    { provider: fontsource, name: 'Fraunces', cssVariable: '--font-display-a', weights: [400, 600], styles: ['normal'], fallbacks: ['Georgia', 'serif'] },
    { provider: fontsource, name: 'Source Sans 3', cssVariable: '--font-body-a', weights: [400, 600], styles: ['normal', 'italic'], fallbacks: ['system-ui', 'sans-serif'] },
    // Pairing B: Barlow Condensed (display) + Barlow (body)
    { provider: fontsource, name: 'Barlow Condensed', cssVariable: '--font-display-b', weights: [500, 600], styles: ['normal'], fallbacks: ['Arial Narrow', 'sans-serif'] },
    { provider: fontsource, name: 'Barlow', cssVariable: '--font-body-b', weights: [400, 600], styles: ['normal', 'italic'], fallbacks: ['system-ui', 'sans-serif'] },
    // Shared: figures, dates, stats
    { provider: fontsource, name: 'IBM Plex Mono', cssVariable: '--font-mono', weights: [400, 500], styles: ['normal'], fallbacks: ['ui-monospace', 'Consolas', 'monospace'] },
  ],
});
