// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://studioakaar.in', // TODO: confirm production domain
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Small CSS is inlined; the shared stylesheet is cached across pages.
    inlineStylesheets: 'auto',
  },
});
