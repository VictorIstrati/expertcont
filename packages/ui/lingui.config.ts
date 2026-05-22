import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  sourceLocale: "ro",
  locales: ["ro", "ru", "en"],
  fallbackLocales: { default: "ro" },
  catalogs: [
    {
      path: "<rootDir>/../i18n/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
    },
  ],
  format: "po",
  compileNamespace: "ts",
};

export default config;
