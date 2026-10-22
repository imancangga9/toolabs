import type { APIRoute } from 'astro';
import { routePairs } from '../lib/routes';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function build(locale: 'en' | 'id'): string {
  const origin = 'https://toolabs.com';
  const entries = routePairs()
    .map((pair) => {
      const canonical = escapeXml(new URL(pair[locale], origin).toString());
      const en = escapeXml(new URL(pair.en, origin).toString());
      const id = escapeXml(new URL(pair.id, origin).toString());
      return [
        '  <url>',
        `    <loc>${canonical}</loc>`,
        `    <lastmod>${pair.lastmod}</lastmod>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
        `    <xhtml:link rel="alternate" hreflang="id" href="${id}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    '</urlset>',
  ].join('\n');
}

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://toolabs.com';
  const body = build('id').replaceAll('https://toolabs.com', origin);
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
