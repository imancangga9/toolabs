import type { APIRoute } from 'astro';
import { categories, tools, toolPath } from '../tools.config';
import { toolDisplayName } from '../lib/display';

const FORMAT_KEYWORDS: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg', 'foto', 'photo'],
  'image/png': ['png', 'transparent', 'transparan'],
  'image/webp': ['webp'],
  'image/heic': ['heic', 'heif', 'iphone'],
  'image/heif': ['heif', 'heic', 'iphone'],
  'application/pdf': ['pdf', 'document', 'dokumen'],
};

export const GET: APIRoute = () => {
  const categoryNames = Object.fromEntries(
    Object.entries(categories).map(([key, value]) => [
      key,
      { en: value.name.en, id: value.name.id },
    ]),
  );

  const data = {
    tools: tools.map((tool) => {
      const slugWords = [...tool.slug.en.split('-'), ...tool.slug.id.split('-')];
      const formats = tool.accept.flatMap((mime) => FORMAT_KEYWORDS[mime] ?? []);
      return {
        id: tool.id,
        category: tool.category,
        title: {
          en: toolDisplayName(tool, 'en'),
          id: toolDisplayName(tool, 'id'),
        },
        path: {
          en: toolPath(tool, 'en'),
          id: toolPath(tool, 'id'),
        },
        keywords: {
          en: Array.from(
            new Set([
              ...slugWords,
              ...formats,
              tool.category,
              tool.locale.en.answerQuestion,
              tool.locale.en.metaDescription,
              tool.locale.en.useCases.join(' '),
            ]),
          ),
          id: Array.from(
            new Set([
              ...slugWords,
              ...formats,
              tool.category,
              tool.locale.id.answerQuestion,
              tool.locale.id.metaDescription,
              tool.locale.id.useCases.join(' '),
            ]),
          ),
        },
      };
    }),
    categoryNames,
  };

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
