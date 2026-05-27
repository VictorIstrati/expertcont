import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  sourceLocale: "ro",
  locales: ["ro", "ru", "en"],
  fallbackLocales: { default: "ro" },
  catalogs: [
    {
      path: "<rootDir>/../../packages/i18n/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
    },
  ],
  format: "po",
  formatOptions: { lineNumbers: false },
  compileNamespace: "ts",
};

export default config;
