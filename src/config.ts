export const siteConfig = {
  name: 'Toolabs',
  legalName: 'Toolabs',
  contactEmail: 'hello@toolabs.com',
  // Replace with real profiles before launch. Empty entries are not emitted
  // in Organization.sameAs, so structured data never claims a profile that
  // does not exist.
  github: '',
  linkedin: '',
  twitter: '',
  maxFileMB: 100,
  warnFileMB: 40,
  launchDate: '2026-10-21',
  // Google AdSense publisher ID. Override with PUBLIC_ADSENSE_CLIENT when a
  // deployment uses a different account.
  adsenseClient: 'ca-pub-1733355346395489',
} as const;

export const LOCALES = ['en', 'id'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
