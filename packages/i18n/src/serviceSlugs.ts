import type { Locale } from "./locales";
import { sectionUrl } from "./urls";

/**
 * Per-service slug map. Mirrors `apps/web/src/content/services-meta/*.json`'s
 * `slugs` field. Kept in this package so shared UI (Footer, Nav helpers) can
 * link to service detail pages without depending on the Astro content layer.
 *
 * When adding/renaming a service, update both this map and the meta JSON.
 */
export type ServiceId = "accounting" | "audit" | "legal" | "consulting" | "hr" | "it";

export const SERVICE_IDS: readonly ServiceId[] = [
  "accounting",
  "audit",
  "legal",
  "consulting",
  "hr",
  "it",
];

export const serviceSlugs: Record<ServiceId, Record<Locale, string>> = {
  accounting: { ro: "contabilitate", ru: "bukhgalteriya", en: "accounting" },
  audit: { ro: "audit", ru: "audit", en: "audit" },
  legal: { ro: "juridic", ru: "yuridicheskie-uslugi", en: "legal" },
  consulting: { ro: "consultanta", ru: "konsalting", en: "consulting" },
  hr: { ro: "resurse-umane", ru: "kadry", en: "hr" },
  it: { ro: "servicii-it", ru: "it-uslugi", en: "it-services" },
};

export function serviceDetailUrl(id: ServiceId, locale: Locale): string {
  return `${sectionUrl("services", locale)}/${serviceSlugs[id][locale]}`;
}
