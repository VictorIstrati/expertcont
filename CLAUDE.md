# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Node 20 LTS** (see `.nvmrc`) + **pnpm 10** (see `package.json#packageManager`). Do not use npm/yarn — the workspace requires pnpm.
- **Turborepo** orchestrates tasks across the pnpm workspace (`apps/*`, `packages/*`).
- **Astro 4** + **React 18** (islands, `client:load`) for the site.
- **Lingui 5** for i18n (sourceLocale `ro`; targets `ru`, `en`). Messages live in `packages/i18n/src/locales/{locale}/messages.po`.
- **Tailwind 4** via `@tailwindcss/vite`, **CSS Modules** for component styles, and **design tokens** as CSS custom properties (`@expertcont/tokens`).
- **Vitest** + `@testing-library/react` + `happy-dom` for component/unit tests.

## Commands

Always run from the repo root unless noted.

| Task                                        | Command                                                             |
| ------------------------------------------- | ------------------------------------------------------------------- |
| Install                                     | `pnpm install`                                                      |
| Dev server (Astro at http://localhost:4321) | `pnpm dev`                                                          |
| Production build                            | `pnpm build`                                                        |
| Typecheck (all packages)                    | `pnpm typecheck`                                                    |
| Lint (all packages)                         | `pnpm lint`                                                         |
| All tests                                   | `pnpm test`                                                         |
| Tests for one package                       | `pnpm --filter @expertcont/ui test`                                 |
| Single test file                            | `pnpm --filter @expertcont/ui exec vitest run src/Nav/Nav.test.tsx` |
| Watch one package                           | `pnpm --filter @expertcont/ui test:watch`                           |
| Format                                      | `pnpm format` / `pnpm format:check`                                 |
| Extract message catalogs                    | `pnpm extract`                                                      |
| Compile catalogs to runtime TS              | `pnpm compile`                                                      |
| Verify catalogs match source                | `pnpm extract:check`                                                |

`turbo.json` makes `build` depend on `compile`, which depends on `extract` — production builds always have fresh catalogs. `typecheck` and `test` depend on `^build`, so a workspace package's typecheck triggers upstream builds when needed.

## Workspace layout

- `apps/web` — Astro site (`@expertcont/web`). Pages live in `src/pages/` with **Romanian** filenames (e.g. `preturi.astro`, `despre-noi.astro`). React components used as islands live in `src/components/`.
- `packages/i18n` — Lingui setup, locale config, and the URL/routing helpers. Public exports are listed in `src/index.ts` — import from `@expertcont/i18n` rather than reaching into subpaths.
- `packages/ui` — shared React components (one folder per component with `*.tsx`, `*.module.css`, `*.test.tsx`, `index.ts`). Tests run under happy-dom; setup in `src/test-setup.ts` activates an empty `ro` locale so Lingui macros don't blow up.
- `packages/tokens` — design tokens. `./tokens.css` is the CSS custom-property source; `./` re-exports any TS helpers.

## Architecture notes (read before changing routing or pages)

**Locale-aware URLs are generated, never hardcoded.** The single source of truth is `packages/i18n/src/routeSegments.ts`, which maps a `SectionKey` (e.g. `services`, `pricing`, `faq`) to per-locale URL segments (`servicii` / `uslugi` / `services`). Always build URLs via `homeUrl`, `sectionUrl`, `detailUrl`, `pageUrl` from `@expertcont/i18n/urls`. Adding a new section means adding it to `SECTION_KEYS` + `routeSegments` first; routing helpers and `localizedPaths` derive from there.

**Default-locale paths have no prefix.** `ro` is the default — its URLs are `/`, `/preturi`, etc. `/ru/...` and `/en/...` are prefixed. The Astro middleware (`apps/web/src/middleware.ts`) 308-redirects any incoming `/ro/...` request to the unprefixed path to keep canonicals unique.

**i18n on React islands.** `I18nRoot` (in `@expertcont/i18n`) wraps client islands and asynchronously loads the locale's compiled messages via `activateLocale`. It renders `null` until ready, so islands won't flash untranslated strings. The Lingui babel macro plugin is wired into `astro.config.mjs` and into the UI package's `vitest.config.ts` — `<Trans>`, `useLingui`, and `msg` macros work in both runtime and tests.

**SEO/head is centralized.** `apps/web/src/layouts/Base.astro` renders `<html lang>`, canonical, all `hreflang` alternates (including `x-default`), and a markdown alternate. Pages pass `path` + `siblings: Record<Locale, string>` (computed via the URL helpers).

**Two `lingui.config.ts` files** — one in `apps/web` and one in `packages/i18n`. Both write to the same catalog path (`packages/i18n/src/locales/{locale}/messages`), but the i18n package's config is the one that scopes extraction over both `apps/web/src` and `packages/ui/src`. Use `pnpm extract` from the root.

## Conventions worth following

- **Strict TS, no unchecked indexed access** (`tsconfig.base.json`). Treat array/object lookups as possibly undefined.
- **ESLint flat config** (`eslint.config.js`) ignores `dist`, `.astro`, `.turbo`, and generated `locales/*/messages.ts`. Unused vars must be prefixed `_`.
- **No inline `style=` attributes.** Use CSS Modules, token-based CSS, or Tailwind utility classes.
- **Romanian page slugs and section URLs**; don't anglicize them — they're the canonical (default-locale) URLs.
- **`design/` is throwaway** (in `.gitignore`). It's a visual prototype reference, not production code; never copy from it without rewriting.

## Pre-PR checks

`pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check`
