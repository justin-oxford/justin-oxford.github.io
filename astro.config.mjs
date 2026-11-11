// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Canonical domain. The repo is justin-oxford.github.io, so no `base` is needed.
  site: 'https://justinoxford.com',
  output: 'static',
});
