import { type Locale, DEFAULT_LOCALE } from "./locales";
import { type SectionKey, routeSegment } from "./routeSegments";
import { type ContentMeta, slugFor } from "./contentMeta";

/** Builds the locale prefix segment: "" for ro, "/ru" for ru, "/en" for en. No trailing slash. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Home URL for a locale. "/" for ro, "/ru" for ru, "/en" for en. */
export function homeUrl(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Section index URL: /servicii, /ru/uslugi, /en/services. */
export function sectionUrl(section: SectionKey, locale: Locale): string {
  return `${localePrefix(locale)}/${routeSegment(section, locale)}`;
}

/** Section detail URL: /servicii/contabilitate, /ru/uslugi/bukhgalteriya, /en/services/accounting. */
export function detailUrl(section: SectionKey, meta: ContentMeta, locale: Locale): string {
  return `${sectionUrl(section, locale)}/${slugFor(meta, locale)}`;
}

/** Pricing-style page URL (single page, no [slug]): /preturi, /ru/tseny, etc. */
export function pageUrl(section: SectionKey, locale: Locale): string {
  return sectionUrl(section, locale);
}
