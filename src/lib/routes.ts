import { categories, categoryPath, tools, toolPath } from '../tools.config';
import { getGuides, guidePath, guidesIndexPath } from '../content/guides';
import { staticPagePaths, staticPages, type StaticPageKey } from '../content/static-pages';
import { siteConfig } from '../config';

export type RoutePair = {
  en: string;
  id: string;
  lastmod: string;
  kind: 'home' | 'tool' | 'category' | 'page' | 'guide';
};

/**
 * Canonical route pairs for sitemaps and language metadata. Every public HTML
 * page should appear here exactly once.
 */
export function routePairs(): RoutePair[] {
  const pairs: RoutePair[] = [
    { en: '/', id: '/id/', lastmod: siteConfig.launchDate, kind: 'home' },
  ];

  for (const tool of tools) {
    pairs.push({
      en: toolPath(tool, 'en'),
      id: toolPath(tool, 'id'),
      lastmod: tool.updatedAt,
      kind: 'tool',
    });
  }

  for (const category of Object.keys(categories) as Array<keyof typeof categories>) {
    pairs.push({
      en: categoryPath(category, 'en'),
      id: categoryPath(category, 'id'),
      lastmod: siteConfig.launchDate,
      kind: 'category',
    });
  }

  const pageKeys = Object.keys(staticPagePaths) as StaticPageKey[];
  for (const key of pageKeys) {
    pairs.push({
      en: staticPagePaths[key].en,
      id: staticPagePaths[key].id,
      lastmod: staticPages.en[key].updatedAt,
      kind: 'page',
    });
  }

  pairs.push({
    en: guidesIndexPath('en'),
    id: guidesIndexPath('id'),
    lastmod: siteConfig.launchDate,
    kind: 'guide',
  });

  const enGuides = getGuides('en');
  const idGuides = getGuides('id');
  for (const guide of enGuides) {
    const translated = idGuides.find((item) => item.id === guide.id);
    pairs.push({
      en: guidePath(guide, 'en'),
      id: translated ? guidePath(translated, 'id') : guidesIndexPath('id'),
      lastmod: guide.updatedAt,
      kind: 'guide',
    });
  }

  return pairs;
}
