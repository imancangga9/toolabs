import type { Locale } from '../config';
import { siteConfig } from '../config';
import {
  categories,
  categoryPath,
  getToolsByCategory,
  toolPath,
  type Category,
} from '../tools.config';
import { getGuides, guidePath, guidesIndexPath } from '../content/guides';
import { staticPagePaths, staticPages, type StaticPageKey } from '../content/static-pages';

const categoryOrder: Category[] = ['image', 'pdf', 'convert'];

const text = {
  en: {
    title: 'Toolabs',
    tagline:
      'Free, privacy-first image and PDF tools that run entirely in the browser. No file uploads, no account, no watermark.',
    languages: 'Languages: English (this file) · Bahasa Indonesia (/id/llms.txt)',
    tools: 'Tools',
    guides: 'Guides',
    pages: 'Site information',
    privacy:
      'Privacy: user files are processed locally. The site has no upload endpoint for images or PDFs. Read the full policy at /privacy.',
    contact: `Contact: ${siteConfig.contactEmail}`,
    updated: 'Last updated',
    quickAnswer: 'Quick answer',
    howTo: 'How to use',
    benefits: 'Benefits',
    useCases: 'Use cases',
    faq: 'FAQ',
    comparison: 'Comparison',
    tip: 'Tip',
    category: 'Category',
    url: 'URL',
  },
  id: {
    title: 'Toolabs',
    tagline:
      'Tool gambar dan PDF gratis yang mengutamakan privasi dan berjalan sepenuhnya di browser. Tanpa unggahan file, tanpa akun, tanpa watermark.',
    languages: 'Bahasa: Bahasa Indonesia (file ini) · English (/llms.txt)',
    tools: 'Tool',
    guides: 'Panduan',
    pages: 'Informasi situs',
    privacy:
      'Privasi: file pengguna diproses secara lokal. Situs tidak memiliki endpoint unggahan untuk gambar atau PDF. Baca kebijakan lengkap di /id/privasi.',
    contact: `Kontak: ${siteConfig.contactEmail}`,
    updated: 'Terakhir diperbarui',
    quickAnswer: 'Jawaban singkat',
    howTo: 'Cara pakai',
    benefits: 'Manfaat',
    useCases: 'Kapan dipakai',
    faq: 'Pertanyaan umum',
    comparison: 'Perbandingan',
    tip: 'Tips',
    category: 'Kategori',
    url: 'URL',
  },
} as const;

function licenseLine(locale: Locale): string {
  return locale === 'id'
    ? 'Konten dapat dikutip dengan atribusi dan tautan ke Toolabs.'
    : 'Content may be quoted with attribution and a link to Toolabs.';
}

export function buildLlms(locale: Locale, origin: string): string {
  const t = text[locale];
  const lines: string[] = [
    `# ${t.title}`,
    '',
    `> ${t.tagline}`,
    '',
    `Site: ${origin}/`,
    t.languages,
    '',
  ];

  for (const category of categoryOrder) {
    const hub = categories[category].hub[locale];
    lines.push(`## ${t.tools}: ${categories[category].name[locale]}`);
    lines.push('');
    lines.push(hub.metaDescription);
    lines.push('');
    for (const tool of getToolsByCategory(category)) {
      lines.push(
        `- [${tool.locale[locale].h1}](${new URL(toolPath(tool, locale), origin).toString()}): ${tool.locale[locale].metaDescription}`,
      );
    }
    lines.push('');
  }

  lines.push(`## ${t.guides}`);
  lines.push('');
  const guides = getGuides(locale);
  lines.push(
    `- [${locale === 'en' ? 'Guide index' : 'Indeks panduan'}](${new URL(guidesIndexPath(locale), origin).toString()}): ${
      locale === 'en'
        ? 'Practical guides to file size, compression, PDFs, and privacy.'
        : 'Panduan praktis tentang ukuran file, kompresi, PDF, dan privasi.'
    }`,
  );
  for (const guide of guides) {
    lines.push(
      `- [${guide.h1}](${new URL(guidePath(guide, locale), origin).toString()}): ${guide.metaDescription}`,
    );
  }
  lines.push('');

  lines.push(`## ${t.pages}`);
  lines.push('');
  const pageOrder: StaticPageKey[] = ['about', 'privacy', 'terms', 'contact', 'glossary'];
  for (const key of pageOrder) {
    const page = staticPages[locale][key];
    lines.push(
      `- [${page.h1}](${new URL(staticPagePaths[key][locale], origin).toString()}): ${page.metaDescription}`,
    );
  }
  lines.push('');
  lines.push(`## ${locale === 'en' ? 'Privacy and contact' : 'Privasi dan kontak'}`);
  lines.push('');
  lines.push(t.privacy);
  lines.push(t.contact);
  lines.push('');
  lines.push(licenseLine(locale));
  lines.push('');

  return lines.join('\n');
}

export function buildLlmsFull(locale: Locale, origin: string): string {
  const t = text[locale];
  const lines: string[] = [
    `# ${t.title} — ${locale === 'en' ? 'full content' : 'konten lengkap'}`,
    '',
    `> ${t.tagline}`,
    '',
    `Site: ${origin}/`,
    t.languages,
    `Generated from the site registry on ${siteConfig.launchDate}.`,
    '',
    '---',
    '',
  ];

  for (const category of categoryOrder) {
    const hub = categories[category].hub[locale];
    lines.push(`# ${categories[category].name[locale]}`);
    lines.push('');
    lines.push(`URL: ${new URL(categoryPath(category, locale), origin).toString()}`);
    lines.push('');
    for (const paragraph of hub.intro) {
      lines.push(paragraph);
      lines.push('');
    }
    lines.push(`## ${t.faq}`);
    lines.push('');
    for (const faq of hub.faq) {
      lines.push(`**${faq.q}**`);
      lines.push('');
      lines.push(faq.a);
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  for (const category of categoryOrder) {
    for (const tool of getToolsByCategory(category)) {
      const content = tool.locale[locale];
      lines.push(`# ${content.h1}`);
      lines.push('');
      lines.push(`URL: ${new URL(toolPath(tool, locale), origin).toString()}`);
      lines.push(`${t.category}: ${categories[tool.category].name[locale]}`);
      lines.push(`${t.updated}: ${tool.updatedAt}`);
      lines.push('');
      lines.push(content.metaDescription);
      lines.push('');
      lines.push(`## ${t.quickAnswer}: ${content.answerQuestion}`);
      lines.push('');
      lines.push(content.shortAnswer);
      lines.push('');
      lines.push('## Introduction');
      lines.push('');
      lines.push(content.intro);
      lines.push('');
      lines.push(`## ${t.howTo}`);
      lines.push('');
      content.steps.forEach((step, index) => lines.push(`${index + 1}. ${step}`));
      lines.push('');
      lines.push(`## ${t.benefits}`);
      lines.push('');
      for (const benefit of content.benefits) lines.push(`- ${benefit}`);
      lines.push('');
      lines.push(`## ${t.useCases}`);
      lines.push('');
      for (const useCase of content.useCases) lines.push(`- ${useCase}`);
      lines.push('');

      if (content.comparison) {
        lines.push(`## ${t.comparison}: ${content.comparison.caption}`);
        lines.push('');
        lines.push(`| ${content.comparison.headers.join(' | ')} |`);
        lines.push(`| ${content.comparison.headers.map(() => '---').join(' | ')} |`);
        for (const row of content.comparison.rows) {
          lines.push(`| ${row.join(' | ')} |`);
        }
        lines.push('');
        if (content.comparison.note) {
          lines.push(content.comparison.note);
          lines.push('');
        }
      }

      if (content.tip) {
        lines.push(`## ${t.tip}`);
        lines.push('');
        lines.push(content.tip);
        lines.push('');
      }

      lines.push(`## ${t.faq}`);
      lines.push('');
      for (const faq of content.faq) {
        lines.push(`**${faq.q}**`);
        lines.push('');
        lines.push(faq.a);
        lines.push('');
      }
      lines.push('---');
      lines.push('');
    }
  }

  lines.push(`# ${t.guides}`);
  lines.push('');
  for (const guide of getGuides(locale)) {
    lines.push(`## ${guide.h1}`);
    lines.push('');
    lines.push(`URL: ${new URL(guidePath(guide, locale), origin).toString()}`);
    lines.push(`${t.updated}: ${guide.updatedAt}`);
    lines.push('');
    lines.push(`### ${t.quickAnswer}`);
    lines.push('');
    lines.push(guide.quickAnswer);
    lines.push('');
    for (const block of guide.blocks) {
      if (block.heading) {
        lines.push(`### ${block.heading}`);
        lines.push('');
      }
      for (const paragraph of block.paragraphs ?? []) {
        lines.push(paragraph);
        lines.push('');
      }
      if (block.bullets) {
        block.bullets.forEach((item, index) => {
          lines.push(block.ordered ? `${index + 1}. ${item}` : `- ${item}`);
        });
        lines.push('');
      }
    }
    lines.push(`### ${t.faq}`);
    lines.push('');
    for (const faq of guide.faq) {
      lines.push(`**${faq.q}**`);
      lines.push('');
      lines.push(faq.a);
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  const pageOrder: StaticPageKey[] = ['about', 'privacy', 'terms', 'contact', 'glossary'];
  for (const key of pageOrder) {
    const page = staticPages[locale][key];
    lines.push(`# ${page.h1}`);
    lines.push('');
    lines.push(`URL: ${new URL(staticPagePaths[key][locale], origin).toString()}`);
    lines.push(`${t.updated}: ${page.updatedAt}`);
    lines.push('');
    lines.push(page.intro);
    lines.push('');
    for (const block of page.blocks) {
      lines.push(`## ${block.heading}`);
      lines.push('');
      for (const paragraph of block.paragraphs ?? []) {
        lines.push(paragraph);
        lines.push('');
      }
      if (block.bullets) {
        for (const item of block.bullets) lines.push(`- ${item}`);
        lines.push('');
      }
      if (block.table) {
        lines.push(`| ${block.table.headers.join(' | ')} |`);
        lines.push(`| ${block.table.headers.map(() => '---').join(' | ')} |`);
        for (const row of block.table.rows) lines.push(`| ${row.join(' | ')} |`);
        lines.push('');
      }
    }
    lines.push('---');
    lines.push('');
  }

  lines.push(t.privacy);
  lines.push('');
  lines.push(t.contact);
  lines.push(licenseLine(locale));
  lines.push('');

  return lines.join('\n');
}
