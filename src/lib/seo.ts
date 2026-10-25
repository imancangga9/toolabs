import type { Locale } from '../config';
import { siteConfig } from '../config';
import type { Category, Tool, ToolFaq } from '../tools.config';
import { categories } from '../tools.config';
import { categoryLabel, toolDisplayName } from './display';

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function absoluteUrl(origin: string, path: string): string {
  return new URL(path, origin).toString();
}

export function organizationSchema(origin: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: siteConfig.name,
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(origin, '/icon-512.png'),
      width: 512,
      height: 512,
    },
    description:
      'Toolabs is a free collection of privacy-first file tools that run entirely in the browser.',
    email: siteConfig.contactEmail,
    foundingDate: siteConfig.launchDate,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.twitter].filter(Boolean),
  };
}

export function websiteSchema(origin: string, locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: siteConfig.name,
    url: locale === 'en' ? origin : `${origin}/id/`,
    inLanguage: locale === 'id' ? 'id-ID' : 'en',
    publisher: { '@id': `${origin}/#organization` },
    description:
      locale === 'id'
        ? 'Tool file gratis yang memproses gambar dan PDF langsung di browser Anda.'
        : 'Free file tools for images and PDFs that process everything in your browser.',
  };
}

export function toolApplicationSchema(
  tool: Tool,
  locale: Locale,
  origin: string,
  canonicalUrl: string,
): Record<string, unknown> {
  const content = tool.locale[locale];
  const category =
    tool.category === 'compress'
      ? 'MultimediaApplication'
      : tool.category === 'pdf'
        ? 'BusinessApplication'
        : 'UtilitiesApplication';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${canonicalUrl}#app`,
    name: content.h1,
    alternateName: toolDisplayName(tool, locale),
    url: canonicalUrl,
    description: content.metaDescription,
    applicationCategory: category,
    applicationSubCategory: categoryLabel(tool.category, locale),
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript, Canvas, and Web Workers',
    inLanguage: locale === 'id' ? 'id-ID' : 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: content.benefits,
    publisher: { '@id': `${origin}/#organization` },
  };
}

export function faqSchema(faqs: ToolFaq[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function howToSchema(
  tool: Tool,
  locale: Locale,
  canonicalUrl: string,
): Record<string, unknown> {
  const content = tool.locale[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.answerQuestion,
    description: content.shortAnswer,
    inLanguage: locale === 'id' ? 'id-ID' : 'en',
    totalTime: 'PT2M',
    tool: [{ '@type': 'HowToTool', name: 'Toolabs' }],
    step: content.steps.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
      url: `${canonicalUrl}#how-to`,
    })),
  };
}

export function categorySchema(
  category: Category,
  locale: Locale,
  origin: string,
  canonicalUrl: string,
  toolLinks: Array<{ name: string; url: string; description: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categories[category].hub[locale].title,
    description: categories[category].hub[locale].metaDescription,
    url: canonicalUrl,
    inLanguage: locale === 'id' ? 'id-ID' : 'en',
    isPartOf: { '@id': `${origin}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: toolLinks.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: tool.url,
        description: tool.description,
      })),
    },
  };
}

export function articleSchema(options: {
  headline: string;
  description: string;
  url: string;
  locale: Locale;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: options.url,
    inLanguage: options.locale === 'id' ? 'id-ID' : 'en',
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    author: {
      '@type': 'Organization',
      name: options.authorName ?? 'Toolabs',
      url: new URL('/', options.url).toString(),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}
