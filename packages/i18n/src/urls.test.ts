import { describe, it, expect } from "vitest";
import { homeUrl, sectionUrl, detailUrl, localePrefix } from "./urls";
import type { ContentMeta } from "./contentMeta";

const sampleMeta: ContentMeta = {
  id: "accounting",
  slugs: { ro: "contabilitate", ru: "bukhgalteriya", en: "accounting" },
  titles: { ro: "Contabilitate", ru: "Бухгалтерия", en: "Accounting" },
  summaries: { ro: "—", ru: "—", en: "—" },
  updated: "2026-05-18",
};

describe("locale-aware URL builders", () => {
  it("home", () => {
    expect(homeUrl("ro")).toBe("/");
    expect(homeUrl("ru")).toBe("/ru");
    expect(homeUrl("en")).toBe("/en");
  });
  it("localePrefix", () => {
    expect(localePrefix("ro")).toBe("");
    expect(localePrefix("ru")).toBe("/ru");
  });
  it("section index", () => {
    expect(sectionUrl("services", "ro")).toBe("/servicii");
    expect(sectionUrl("services", "ru")).toBe("/ru/uslugi");
    expect(sectionUrl("services", "en")).toBe("/en/services");
    expect(sectionUrl("pricing", "ro")).toBe("/preturi");
    expect(sectionUrl("faq", "ro")).toBe("/intrebari-frecvente");
  });
  it("section detail with localized slug", () => {
    expect(detailUrl("services", sampleMeta, "ro")).toBe("/servicii/contabilitate");
    expect(detailUrl("services", sampleMeta, "ru")).toBe("/ru/uslugi/bukhgalteriya");
    expect(detailUrl("services", sampleMeta, "en")).toBe("/en/services/accounting");
  });
});
