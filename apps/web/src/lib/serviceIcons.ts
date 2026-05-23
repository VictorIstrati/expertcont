import type { IconName } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { pricingConfig } from "../site";

/**
 * Canonical service → icon mapping. ONE icon per service, used everywhere a
 * service identity is shown (services index, home grid, footer, booking modal,
 * related-services sidebar). Add a new service by mapping every locale slug
 * for it back to its canonical icon name.
 */
const ICON_BY_KEY: Record<string, IconName> = {
  // Canonical IDs (matches services-meta JSON `id`).
  accounting: "calculator",
  legal: "scale",
  hr: "users",
  consulting: "lightbulb",
  audit: "audit",
  it: "monitor",

  // RO slugs.
  contabilitate: "calculator",
  juridic: "scale",
  "resurse-umane": "users",
  consultanta: "lightbulb",
  "servicii-it": "monitor",

  // RU slugs.
  bukhgalteriya: "calculator",
  "yuridicheskie-uslugi": "scale",
  kadry: "users",
  konsalting: "lightbulb",
  "it-uslugi": "monitor",

  // EN slugs.
  "it-services": "monitor",
};

export function serviceIcon(key: string): IconName {
  return ICON_BY_KEY[key] ?? "briefcase";
}

/**
 * Canonical display order for service grids (services index page, home grid).
 * Sorted by business priority: accounting first (anchor service), legal/hr/
 * consulting next (recurring B2B needs), then specialist work (audit, IT).
 */
export const SERVICE_ORDER: ReadonlyArray<string> = [
  "accounting",
  "legal",
  "hr",
  "consulting",
  "audit",
  "it",
];

/** Sort an array by canonical service order; unknown IDs go last (stable). */
export function sortByServiceOrder<T extends { id: string }>(items: T[]): T[] {
  const rank = new Map(SERVICE_ORDER.map((id, i) => [id, i]));
  return [...items].sort((a, b) => {
    const ra = rank.get(a.id) ?? SERVICE_ORDER.length;
    const rb = rank.get(b.id) ?? SERVICE_ORDER.length;
    return ra - rb;
  });
}

const PREFIX = { ro: "De la", ru: "От", en: "From" } as const;
const PER_HOUR = { ro: "MDL / oră", ru: "MDL / час", en: "MDL / hour" } as const;
const PER_MONTH = { ro: "MDL / lună", ru: "MDL / мес", en: "MDL / month" } as const;
const PER_EMP_MONTH = {
  ro: "MDL / lună per angajat",
  ru: "MDL / мес за сотрудника",
  en: "MDL / month per employee",
} as const;
const CUSTOM = {
  ro: "Tarif personalizat",
  ru: "Индивидуальная цена",
  en: "Custom pricing",
} as const;

export function servicePricingHint(serviceId: string, locale: Locale): string {
  const nf = new Intl.NumberFormat(localeTag(locale));
  switch (serviceId) {
    case "accounting": {
      const min = Math.min(
        ...pricingConfig.industries.filter((i) => i.group === "services").map((i) => i.base),
      );
      return `${PREFIX[locale]} ${nf.format(min)} ${PER_MONTH[locale]}`;
    }
    case "audit":
      return `${PREFIX[locale]} ${nf.format(pricingConfig.hourlyRates.financial)} ${PER_HOUR[locale]}`;
    case "legal":
      return `${PREFIX[locale]} ${nf.format(pricingConfig.hourlyRates.legal)} ${PER_HOUR[locale]}`;
    case "it":
      return `${PREFIX[locale]} ${nf.format(pricingConfig.hourlyRates.it)} ${PER_HOUR[locale]}`;
    case "hr":
      return `${PREFIX[locale]} ${nf.format(pricingConfig.hrPerEmployee)} ${PER_EMP_MONTH[locale]}`;
    case "consulting":
    default:
      return CUSTOM[locale];
  }
}
