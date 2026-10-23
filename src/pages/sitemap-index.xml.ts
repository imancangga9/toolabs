import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://www.toolabs.web.id';
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${origin}/sitemap-en.xml</loc>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${origin}/sitemap-id.xml</loc>`,
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
