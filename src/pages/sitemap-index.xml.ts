import type { APIRoute } from 'astro';
import { routePairs } from '../lib/routes';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://www.toolabs.web.id';
  // Newest modification date across all indexed routes. Both child sitemaps
  // contain the same pages in a different language, so they share this date.
  const lastmod = routePairs().reduce(
    (latest, pair) => (pair.lastmod > latest ? pair.lastmod : latest),
    '',
  );

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${origin}/sitemap-en.xml</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${origin}/sitemap-id.xml</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
