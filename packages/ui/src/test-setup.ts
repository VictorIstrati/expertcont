import "@testing-library/jest-dom/vitest";
import { i18n } from "@expertcont/i18n";

// `@expertcont/i18n` eagerly loads the compiled catalogs for ro/ru/en at module
// init (required for SSR — see packages/i18n/src/setup.ts). Tests assert against
// the source msgids ("Recommended", "Subscribe", …), so we replace the catalog
// with an empty one. `loadAndActivate` REPLACES (unlike `load` which merges).
i18n.loadAndActivate({ locale: "ro", messages: {} });
