import type { Locale } from '../config';

const intlLocale = (locale: Locale) => (locale === 'id' ? 'id-ID' : 'en-US');

export function formatBytes(bytes: number, locale: Locale): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value)} ${units[unit]}`;
}

export function formatNumber(value: number, locale: Locale, digits = 0): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(intlLocale(locale), {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}

export function formatPercent(value: number, locale: Locale): string {
  return `${new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: 1,
  }).format(value)}%`;
}
