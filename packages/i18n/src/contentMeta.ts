import type { Locale } from "./locales";

export interface LocalizedString {
  ro: string;
  ru?: string;
  en?: string;
}

export interface ContentMeta {
  /** Canonical id; matches the content folder name and is what DB columns reference */
  id: string;
  /** Per-locale URL fragment (e.g. for service "accounting": ro=contabilitate, ru=bukhgalteriya, en=accounting) */
  slugs: { ro: string; ru: string; en: string };
  titles: { ro: string; ru: string; en: string };
  summaries: { ro: string; ru: string; en: string };
  /** ISO date string (yyyy-mm-dd) of last meaningful edit */
  updated: string;
}

/** Returns the locale-specific slug for a meta. Falls back to RO if other locale missing. */
export function slugFor(meta: ContentMeta, locale: Locale): string {
  return meta.slugs[locale] ?? meta.slugs.ro;
}

/** Returns the locale-specific title. */
export function titleFor(meta: ContentMeta, locale: Locale): string {
  return meta.titles[locale] ?? meta.titles.ro;
}

/** Returns the locale-specific summary. */
export function summaryFor(meta: ContentMeta, locale: Locale): string {
  return meta.summaries[locale] ?? meta.summaries.ro;
}
