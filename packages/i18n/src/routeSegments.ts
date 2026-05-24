import type { Locale } from "./locales";

export const SECTION_KEYS = [
  "solutions",
  "services",
  "pricing",
  "contact",
  "about",
  "faq",
  "reviews",
  "blog",
  "guides",
  "privacy",
  "terms",
  "cookies",
  "partners",
  "careers",
  "sitemap",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const routeSegments: Record<SectionKey, Record<Locale, string>> = {
  solutions: { ro: "solutii", ru: "resheniya", en: "solutions" },
  services: { ro: "servicii", ru: "uslugi", en: "services" },
  pricing: { ro: "preturi", ru: "tseny", en: "pricing" },
  contact: { ro: "contact", ru: "kontakty", en: "contact" },
  faq: { ro: "intrebari-frecvente", ru: "voprosy", en: "faq" },
  reviews: { ro: "recenzii", ru: "otzyvy", en: "reviews" },
  blog: { ro: "blog", ru: "blog", en: "blog" },
  guides: { ro: "ghiduri", ru: "rukovodstva", en: "guides" },
  about: { ro: "despre-noi", ru: "o-nas", en: "about" },
  privacy: { ro: "confidentialitate", ru: "konfidentsialnost", en: "privacy" },
  terms: { ro: "termeni", ru: "usloviya", en: "terms" },
  cookies: { ro: "cookies", ru: "cookies", en: "cookies" },
  partners: { ro: "parteneri", ru: "partnery", en: "partners" },
  careers: { ro: "cariere", ru: "kariera", en: "careers" },
  sitemap: { ro: "harta-site", ru: "karta-sayta", en: "sitemap" },
};

/** Returns the section URL fragment for a locale, e.g. routeSegment("services","ro") === "servicii". */
export function routeSegment(section: SectionKey, locale: Locale): string {
  return routeSegments[section][locale];
}
