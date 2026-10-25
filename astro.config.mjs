import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Canonical production origin. Override with SITE_URL only when deploying a
// staging copy; every canonical URL, sitemap, and AI index is built from it.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.toolabs.web.id',
  output: 'static',
  trailingSlash: 'ignore',
  // The Image hub was renamed to Compress; keep the old URLs working.
  redirects: {
    '/image': '/compress',
    '/id/gambar': '/id/kompres',
  },
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react()],
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      // Workers and WASM are loaded on demand; keep the initial payload small.
      assetsInlineLimit: 4096,
    },
  },
});
