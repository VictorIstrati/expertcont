# ExpertCont

Monorepo for the ExpertCont marketing website (Astro + React + Supabase). See `docs/superpowers/specs/` for design specs and `docs/superpowers/plans/` for implementation plans.

## Requirements

- Node 20 LTS (`.nvmrc`)
- pnpm 10

## Install

```bash
nvm use   # if you use nvm
pnpm install
```

## Common scripts

- `pnpm dev` — run the Astro dev server (`apps/web` at http://localhost:4321)
- `pnpm typecheck` — TypeScript across the monorepo
- `pnpm test` — unit + component tests via Vitest
- `pnpm extract` — extract translation keys into `packages/i18n/src/locales/*/messages.po`
- `pnpm compile` — compile `.po` catalogs into runtime `.ts` modules
- `pnpm build` — build the production site

## Layout

- `apps/web` — Astro+React site
- `packages/tokens` — design tokens (CSS custom properties)
- `packages/i18n` — Lingui configuration, I18nProvider, locale utilities
- `packages/ui` — shared React UI primitives (CSS Modules)
- `design/` — visual reference prototype; **not** production code (kept locally, gitignored)

## Locales

Source locale is Romanian (`ro`); Russian (`ru`) and English (`en`) are translation targets. UI strings are wrapped in Lingui macros (`<Trans>`, `useLingui`, `msg`).
