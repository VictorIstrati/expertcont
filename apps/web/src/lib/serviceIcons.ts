import type { IconName } from "@expertcont/ui";

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
