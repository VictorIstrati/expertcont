import { type Locale, LOCALES } from "./locales";
import { type SectionKey } from "./routeSegments";
import { type ContentMeta, slugFor } from "./contentMeta";

export interface LocalizedDetailPath {
  params: { locale: string; slug: string };
  props: { meta: ContentMeta; locale: Locale; section: SectionKey };
}

/**
 * Astro file under `src/pages/[...locale]/<section-segment>/[slug].astro` calls this.
 * The [...locale] catch-all captures "" (root) for ro or "ru"/"en" for other locales.
 * For ro, params.locale is the empty string (Astro represents trailing/empty catch-alls as undefined; the page must coerce).
 */
export function localizedDetailPaths(
  section: SectionKey,
  items: ContentMeta[],
): LocalizedDetailPath[] {
  const paths: LocalizedDetailPath[] = [];
  for (const locale of LOCALES) {
    const localeParam = locale === "ro" ? undefined : locale;
    for (const meta of items) {
      paths.push({
        params: { locale: localeParam as unknown as string, slug: slugFor(meta, locale) },
        props: { meta, locale, section },
      });
    }
  }
  return paths;
}

/** Same as above but for section *index* pages (no slug). */
export interface LocalizedIndexPath {
  params: { locale: string };
  props: { locale: Locale; section: SectionKey };
}

export function localizedIndexPaths(section: SectionKey): LocalizedIndexPath[] {
  return LOCALES.map((locale) => ({
    params: { locale: locale === "ro" ? (undefined as unknown as string) : locale },
    props: { locale, section },
  }));
}
