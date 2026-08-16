import { describe, it, expect } from "vitest";
import { SERVICE_IDS, serviceSlugs, serviceDetailUrl } from "./serviceSlugs";

describe("service slug map", () => {
  it("includes the Ukrainian consular service", () => {
    expect(SERVICE_IDS).toContain("ukrainians");
  });

  it("builds locale-aware detail URLs for it", () => {
    expect(serviceDetailUrl("ukrainians", "ro")).toBe("/servicii/servicii-consulare-ucraina");
    expect(serviceDetailUrl("ukrainians", "ru")).toBe("/ru/uslugi/konsulskie-uslugi-ukraina");
    expect(serviceDetailUrl("ukrainians", "en")).toBe("/en/services/ukrainian-consular-services");
  });

  it("defines all three locale slugs for every service id", () => {
    for (const id of SERVICE_IDS) {
      const slugs = serviceSlugs[id];
      expect(slugs.ro).toBeTruthy();
      expect(slugs.ru).toBeTruthy();
      expect(slugs.en).toBeTruthy();
    }
  });
});
