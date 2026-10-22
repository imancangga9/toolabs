import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://toolabs.com';
  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-User',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'Amazonbot',
    'Meta-ExternalAgent',
    'cohere-ai',
    'YouBot',
    'Bytespider',
  ];

  const lines = [
    '# Toolabs — https://toolabs.com',
    '# Public content is available to search engines and AI assistants.',
    '# User files are never uploaded or crawled; processing happens in the browser.',
    '',
  ];

  for (const bot of aiBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }

  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('Disallow: /404');
  lines.push('');
  lines.push(`Sitemap: ${origin}/sitemap-index.xml`);
  lines.push(`# AI-readable index: ${origin}/llms.txt`);
  lines.push(`# Full content: ${origin}/llms-full.txt`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
