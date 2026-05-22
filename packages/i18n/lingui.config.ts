import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  sourceLocale: "ro",
  locales: ["ro", "ru", "en"],
  fallbackLocales: { default: "ro" },
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/../../apps/web/src", "<rootDir>/../../packages/ui/src"],
    },
  ],
  format: "po",
  compileNamespace: "ts",
};

export default config;
