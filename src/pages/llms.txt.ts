import type { APIRoute } from 'astro';
import { buildLlms } from '../lib/llms';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://www.toolabs.web.id';
  return new Response(buildLlms('en', origin), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
