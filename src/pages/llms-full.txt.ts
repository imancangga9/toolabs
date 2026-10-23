import type { APIRoute } from 'astro';
import { buildLlmsFull } from '../lib/llms';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://www.toolabs.web.id';
  return new Response(buildLlmsFull('en', origin), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
