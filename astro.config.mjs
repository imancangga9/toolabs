import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// The production domain is still an open decision (see PRD §17).
// Set SITE_URL in the build environment when the domain is confirmed.
export default defineConfig({
  site: process.env.SITE_URL || 'https://toolabs.com',
  output: 'static',
  trailingSlash: 'ignore',
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
