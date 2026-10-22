import type { Locale } from '../config';
import type { Category, Tool } from '../tools.config';
import { categories } from '../tools.config';

const ACRONYMS: Record<string, string> = {
  jpg: 'JPG',
  jpeg: 'JPG',
  png: 'PNG',
  webp: 'WebP',
  heic: 'HEIC',
  heif: 'HEIF',
  pdf: 'PDF',
  kb: 'KB',
  mb: 'MB',
  id: 'ID',
  cpns: 'CPNS',
  '3x4': '3×4',
  '4x6': '4×6',
  '2x3': '2×3',
  '6x9': '6×9',
};

const JOINERS = new Set(['to', 'ke', 'dan', 'yang', 'untuk', 'di', 'dari', 'of', 'and', 'in']);

export function displayNameFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((token, index) => {
      const numericUnit = token.match(/^(\d+)(kb|mb)$/);
      if (numericUnit) return `${numericUnit[1]} ${numericUnit[2].toUpperCase()}`;
      if (ACRONYMS[token]) return ACRONYMS[token];
      if (index > 0 && JOINERS.has(token)) return token;
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(' ');
}

export function toolDisplayName(tool: Tool, locale: Locale): string {
  return displayNameFromSlug(tool.slug[locale]);
}

export function categoryLabel(category: Category, locale: Locale): string {
  return categories[category].name[locale];
}
