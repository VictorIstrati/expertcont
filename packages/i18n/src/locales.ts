export const LOCALES = ["ro", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const LOCALE_TAGS: Record<Locale, string> = {
  ro: "ro-RO",
  ru: "ru-RU",
  en: "en-US",
};

export function localeTag(locale: Locale): string {
  return LOCALE_TAGS[locale];
}
