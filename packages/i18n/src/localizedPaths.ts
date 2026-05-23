import { type Locale, LOCALES } from "./locales";
import { type SectionKey } from "./routeSegments";
import { type ContentMeta, slugFor } from "./contentMeta";

export interface LocalizedDetailPath {
  params: { locale: string | undefined; slug: string };
  props: { meta: ContentMeta; locale: Locale; section: SectionKey };
}

export function localizedDetailPaths(
  section: SectionKey,
  items: ContentMeta[],
): LocalizedDetailPath[] {
  const paths: LocalizedDetailPath[] = [];
  for (const locale of LOCALES) {
    const localeParam = locale === "ro" ? undefined : locale;
    for (const meta of items) {
      paths.push({
        params: { locale: localeParam, slug: slugFor(meta, locale) },
        props: { meta, locale, section },
      });
    }
  }
  return paths;
}

export interface LocalizedIndexPath {
  params: { locale: string | undefined };
  props: { locale: Locale; section: SectionKey };
}

export function localizedIndexPaths(section: SectionKey): LocalizedIndexPath[] {
  return LOCALES.map((locale) => ({
    params: { locale: locale === "ro" ? undefined : locale },
    props: { locale, section },
  }));
}
