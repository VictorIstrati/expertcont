import type { IconName } from "@expertcont/ui";

const ICON_BY_KEY: Record<string, IconName> = {
  accounting: "file-text",
  hr: "users",
  legal: "scale",
  audit: "trending",
  it: "code",
  consulting: "lightbulb",
  contabilitate: "file-text",
  "resurse-umane": "users",
  juridic: "scale",
  consultanta: "lightbulb",
  "servicii-it": "code",
  bukhgalteriya: "file-text",
  kadry: "users",
  "yuridicheskie-uslugi": "scale",
  konsalting: "lightbulb",
  "it-uslugi": "code",
  "it-services": "code",
};

export function serviceIcon(key: string): IconName {
  return ICON_BY_KEY[key] ?? "briefcase";
}
