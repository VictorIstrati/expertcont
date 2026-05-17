# Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Project preference:** The user has indicated they prefer no auto-commits during exploratory/setup work. Commit steps are included per the skill's "frequent commits" principle, but the executor may batch them or skip per user preference at execution time. Do not run `git init` unless the user asks (the repo is not yet initialized at the time of writing).

**Goal:** Bootstrap the monorepo with Astro 4 + React 18 + TypeScript, Lingui i18n configured for `ro` (default) / `ru` / `en`, design tokens, a minimal UI primitives package, and a CI workflow — landing on a "hello world" Astro page that proves the entire toolchain composes correctly.

**Architecture:** pnpm workspaces + Turborepo. `apps/web` is the Astro+React+TypeScript app. `packages/tokens` exports CSS custom properties used as design tokens. `packages/i18n` owns Lingui configuration plus the `I18nProvider` and locale-activation utilities. `packages/ui` exports a minimum viable set of React primitives (Button, Container, Heading) with CSS Modules, with Vitest + Testing Library coverage. Lingui macros run via `@lingui/babel-plugin-lingui-macro` in Vite (the bundler Astro uses). Turbo orchestrates `typecheck`, `lint`, `test`, `build`, `extract`, and `compile` across packages.

**Tech Stack:** Node 20 LTS, pnpm 10, Turborepo 2, Astro 4, React 18, TypeScript 5.5, Vitest 2 + happy-dom + @testing-library/react, Lingui 5 (`@lingui/core`, `@lingui/react`, `@lingui/cli`, `@lingui/babel-plugin-lingui-macro`, `eslint-plugin-lingui`), ESLint 9 (flat config), Prettier 3.

**Out of scope for this plan** (covered by subsequent plans): localized routing, full UI primitives library, marketing page content, Supabase, forms, SEO endpoints, consent banner, deployment.

---

## File Structure

Files created by this plan, grouped by package:

```
/
├─ .gitignore
├─ .nvmrc
├─ .npmrc
├─ .editorconfig
├─ package.json                                   # root, private, workspace orchestrator
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.base.json
├─ eslint.config.js                               # flat config; root, shared by all packages
├─ prettier.config.js
├─ .github/workflows/ci.yml
├─ apps/
│  └─ web/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ astro.config.mjs
│     ├─ src/
│     │  ├─ env.d.ts
│     │  ├─ layouts/Base.astro                    # minimal shell; expanded in Plan 2
│     │  ├─ pages/index.astro                     # hello-world page
│     │  ├─ components/HelloIsland.tsx            # first Lingui-wrapped island
│     │  └─ styles/global.css                     # imports tokens
├─ packages/
│  ├─ tokens/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ src/tokens.css                           # CSS custom properties
│  │  └─ src/index.ts                             # re-exports the CSS path for consumers
│  ├─ i18n/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ lingui.config.ts
│  │  ├─ src/
│  │  │  ├─ index.ts                              # public surface
│  │  │  ├─ locales.ts                            # type Locale = 'ro' | 'ru' | 'en'; LOCALES const
│  │  │  ├─ setup.ts                              # activateLocale(), loadCatalog()
│  │  │  ├─ I18nRoot.tsx                          # client-side <I18nProvider> wrapper
│  │  │  └─ locales/{ro,ru,en}/messages.po        # initially empty .po skeletons
│  └─ ui/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vitest.config.ts
│     ├─ src/
│     │  ├─ index.ts
│     │  ├─ Button/{Button.tsx, Button.module.css, Button.test.tsx, index.ts}
│     │  ├─ Container/{Container.tsx, Container.module.css, Container.test.tsx, index.ts}
│     │  └─ Heading/{Heading.tsx, Heading.module.css, Heading.test.tsx, index.ts}
```

Each UI component is one folder with its component, CSS module, test, and an `index.ts` barrel re-export — files that change together live together.

---

## Task 1: Initialize pnpm workspace and Turborepo

**Files:**
- Create: `/.nvmrc`
- Create: `/.npmrc`
- Create: `/.gitignore`
- Create: `/.editorconfig`
- Create: `/package.json`
- Create: `/pnpm-workspace.yaml`
- Create: `/turbo.json`

- [ ] **Step 1.1: Verify Node 20 is available**

Run: `node --version`
Expected: `v20.x.x` (any 20.x). If different, install via `nvm install 20 && nvm use 20`.

- [ ] **Step 1.2: Verify pnpm 10 is available**

Run: `pnpm --version`
Expected: `10.x.x`. If missing or older, install: `npm install -g pnpm@10`.

- [ ] **Step 1.3: Create `.nvmrc`**

Contents:
```
20
```

- [ ] **Step 1.4: Create `.npmrc`**

Contents:
```
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
prefer-workspace-packages=true
```

- [ ] **Step 1.5: Create `.gitignore`**

Contents:
```
node_modules
dist
.astro
.turbo
.wrangler
.DS_Store
*.log
.env
.env.local
.env.*.local
coverage
.vitest
```

- [ ] **Step 1.6: Create `.editorconfig`**

Contents:
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 1.7: Create root `package.json`**

Contents:
```json
{
  "name": "expertcont",
  "private": true,
  "version": "0.0.0",
  "packageManager": "pnpm@10.5.2",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=10.0.0"
  },
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "typecheck": "turbo run typecheck",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "extract": "turbo run extract",
    "compile": "turbo run compile",
    "format": "prettier --write \"**/*.{ts,tsx,astro,css,md,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,astro,css,md,json}\""
  },
  "devDependencies": {
    "prettier": "^3.3.3",
    "turbo": "^2.1.3",
    "typescript": "^5.5.4"
  }
}
```

- [ ] **Step 1.8: Create `pnpm-workspace.yaml`**

Contents:
```yaml
packages:
  - apps/*
  - packages/*
```

- [ ] **Step 1.9: Create `turbo.json`**

Contents:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env*", "tsconfig.base.json"],
  "tasks": {
    "build": {
      "dependsOn": ["^build", "compile"],
      "outputs": ["dist/**", ".astro/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "extract": {
      "cache": false,
      "outputs": ["src/locales/**"]
    },
    "compile": {
      "dependsOn": ["extract"],
      "outputs": ["src/locales/**/*.{js,d.ts}"]
    }
  }
}
```

- [ ] **Step 1.10: Install dev dependencies**

Run: `pnpm install`
Expected: lockfile `pnpm-lock.yaml` created; `node_modules/` populated; no errors.

- [ ] **Step 1.11: Verify Turbo is callable**

Run: `pnpm turbo --version`
Expected: `2.x.x`

- [ ] **Step 1.12: (Optional) commit**

Run:
```bash
git add .nvmrc .npmrc .gitignore .editorconfig package.json pnpm-workspace.yaml turbo.json pnpm-lock.yaml
git commit -m "chore: initialize pnpm workspace and Turborepo"
```

---

## Task 2: Set up shared TypeScript base config

**Files:**
- Create: `/tsconfig.base.json`

- [ ] **Step 2.1: Create `tsconfig.base.json`**

Contents:
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "exclude": ["node_modules", "dist", ".astro", ".turbo"]
}
```

- [ ] **Step 2.2: Verify TypeScript can read the base config**

Run: `pnpm exec tsc --showConfig --project tsconfig.base.json | head -5`
Expected: JSON output starting with `{` — no error.

- [ ] **Step 2.3: (Optional) commit**

Run:
```bash
git add tsconfig.base.json
git commit -m "chore: add shared TypeScript base config"
```

---

## Task 3: Configure ESLint (flat config) and Prettier

**Files:**
- Create: `/eslint.config.js`
- Create: `/prettier.config.js`

- [ ] **Step 3.1: Add ESLint dependencies**

Run:
```bash
pnpm add -Dw eslint@^9.11.1 typescript-eslint@^8.8.0 eslint-plugin-react@^7.36.1 \
  eslint-plugin-react-hooks@^4.6.2 globals@^15.9.0
```

Expected: dependencies added to root `devDependencies`.

- [ ] **Step 3.2: Create `eslint.config.js`**

Contents:
```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**", "**/.turbo/**", "**/coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
    settings: { react: { version: "18" } },
  },
);
```

- [ ] **Step 3.3: Create `prettier.config.js`**

Contents:
```js
/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
};
```

- [ ] **Step 3.4: Verify ESLint can boot**

Run: `pnpm exec eslint --version`
Expected: `9.x.x`

- [ ] **Step 3.5: Verify Prettier can boot**

Run: `pnpm exec prettier --version`
Expected: `3.x.x`

- [ ] **Step 3.6: Smoke-test Prettier**

Run: `pnpm run format:check`
Expected: command runs (may report "no matches" since no files yet, that's OK). Exit code 0.

- [ ] **Step 3.7: (Optional) commit**

Run:
```bash
git add eslint.config.js prettier.config.js package.json pnpm-lock.yaml
git commit -m "chore: configure ESLint flat config and Prettier"
```

---

## Task 4: Scaffold `packages/tokens`

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/src/tokens.css`
- Create: `packages/tokens/src/index.ts`

- [ ] **Step 4.1: Create `packages/tokens/package.json`**

Contents:
```json
{
  "name": "@expertcont/tokens",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./tokens.css": "./src/tokens.css"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  }
}
```

- [ ] **Step 4.2: Create `packages/tokens/tsconfig.json`**

Contents:
```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*"]
}
```

- [ ] **Step 4.3: Create `packages/tokens/src/tokens.css`**

Contents (extracted from `design/styles.css` — initial minimum set; later plans may extend):
```css
:root {
  /* Brand */
  --color-accent: #DFB741;
  --color-accent-hover: #c9a432;

  /* Surfaces */
  --color-bg: #ffffff;
  --color-bg-section: #f7f5f0;
  --color-bg-section-alt: #fdfaf3;
  --color-surface: #ffffff;
  --color-border: rgba(15, 15, 15, 0.08);

  /* Text */
  --color-text-primary: #141414;
  --color-text-secondary: #4a4a4a;
  --color-text-muted: #767676;
  --color-text-inverse: #ffffff;

  /* Type */
  --font-sans: "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing scale (8pt-ish) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.08);

  /* Layout */
  --container-max: 1200px;
}

[data-theme="dark"] {
  --color-bg: #121212;
  --color-bg-section: #1a1a1a;
  --color-bg-section-alt: #1f1f1f;
  --color-surface: #1c1c1c;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #f3f3f3;
  --color-text-secondary: #c4c4c4;
  --color-text-muted: #8a8a8a;
}
```

- [ ] **Step 4.4: Create `packages/tokens/src/index.ts`**

Contents:
```ts
export const tokensCssPath = new URL("./tokens.css", import.meta.url).pathname;
```

- [ ] **Step 4.5: Install workspace deps**

Run: `pnpm install`
Expected: `@expertcont/tokens` recognized as a workspace package.

- [ ] **Step 4.6: Typecheck the package**

Run: `pnpm --filter @expertcont/tokens typecheck`
Expected: completes with no errors.

- [ ] **Step 4.7: (Optional) commit**

Run:
```bash
git add packages/tokens pnpm-lock.yaml
git commit -m "feat(tokens): add design tokens package"
```

---

## Task 5: Scaffold `packages/i18n` with Lingui for ro/ru/en

**Files:**
- Create: `packages/i18n/package.json`
- Create: `packages/i18n/tsconfig.json`
- Create: `packages/i18n/lingui.config.ts`
- Create: `packages/i18n/src/index.ts`
- Create: `packages/i18n/src/locales.ts`
- Create: `packages/i18n/src/setup.ts`
- Create: `packages/i18n/src/I18nRoot.tsx`
- Create: `packages/i18n/src/locales/{ro,ru,en}/messages.po`

- [ ] **Step 5.1: Create `packages/i18n/package.json`**

Contents:
```json
{
  "name": "@expertcont/i18n",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./I18nRoot": "./src/I18nRoot.tsx",
    "./locales/*": "./src/locales/*"
  },
  "scripts": {
    "extract": "lingui extract --clean",
    "compile": "lingui compile",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  },
  "dependencies": {
    "@lingui/core": "^5.1.0",
    "@lingui/react": "^5.1.0",
    "react": "^18.3.1"
  },
  "devDependencies": {
    "@lingui/cli": "^5.1.0",
    "@lingui/macro": "^5.1.0",
    "@types/react": "^18.3.10",
    "eslint-plugin-lingui": "^0.10.0",
    "typescript": "^5.5.4"
  }
}
```

- [ ] **Step 5.2: Create `packages/i18n/tsconfig.json`**

Contents:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "include": ["src/**/*", "lingui.config.ts"]
}
```

- [ ] **Step 5.3: Create `packages/i18n/lingui.config.ts`**

Contents:
```ts
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
```

- [ ] **Step 5.4: Create empty catalog files**

Create three files. Each starts as a valid empty `.po`.

`packages/i18n/src/locales/ro/messages.po`:
```
msgid ""
msgstr ""
"POT-Creation-Date: 2026-05-17 00:00+0000\n"
"Mime-Version: 1.0\n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"
"X-Generator: Lingui\n"
"Language: ro\n"
```

Same content for `packages/i18n/src/locales/ru/messages.po` (change `Language: ru`) and `packages/i18n/src/locales/en/messages.po` (change `Language: en`).

- [ ] **Step 5.5: Create `packages/i18n/src/locales.ts`**

Contents:
```ts
export const LOCALES = ["ro", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
```

- [ ] **Step 5.6: Create `packages/i18n/src/setup.ts`**

Contents:
```ts
import { i18n } from "@lingui/core";
import type { Locale } from "./locales";

export async function activateLocale(locale: Locale): Promise<void> {
  const { messages } = await import(`./locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

export { i18n };
```

- [ ] **Step 5.7: Create `packages/i18n/src/I18nRoot.tsx`**

Contents:
```tsx
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useEffect, useState } from "react";
import { i18n, activateLocale } from "./setup";
import type { Locale } from "./locales";

interface I18nRootProps {
  locale: Locale;
  children: ReactNode;
}

export function I18nRoot({ locale, children }: I18nRootProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void activateLocale(locale).then(() => setReady(true));
  }, [locale]);

  if (!ready) return null;
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
```

- [ ] **Step 5.8: Create `packages/i18n/src/index.ts`**

Contents:
```ts
export { LOCALES, DEFAULT_LOCALE, isLocale } from "./locales";
export type { Locale } from "./locales";
export { activateLocale, i18n } from "./setup";
export { I18nRoot } from "./I18nRoot";
```

- [ ] **Step 5.9: Install workspace deps**

Run: `pnpm install`
Expected: no errors; `@expertcont/i18n` is a recognized workspace.

- [ ] **Step 5.10: Compile catalogs (creates .ts files used by setup.ts)**

Run: `pnpm --filter @expertcont/i18n compile`
Expected: creates `src/locales/{ro,ru,en}/messages.ts` (and possibly `.d.ts`); exit code 0.

- [ ] **Step 5.11: Typecheck the package**

Run: `pnpm --filter @expertcont/i18n typecheck`
Expected: 0 errors.

- [ ] **Step 5.12: (Optional) commit**

Run:
```bash
git add packages/i18n pnpm-lock.yaml
git commit -m "feat(i18n): configure Lingui for ro/ru/en"
```

---

## Task 6: Build `Button` component in `packages/ui` (TDD)

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vitest.config.ts`
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/Button/Button.tsx`
- Create: `packages/ui/src/Button/Button.module.css`
- Create: `packages/ui/src/Button/Button.test.tsx`
- Create: `packages/ui/src/Button/index.ts`

- [ ] **Step 6.1: Create `packages/ui/package.json`**

Contents:
```json
{
  "name": "@expertcont/ui",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  },
  "dependencies": {
    "@expertcont/i18n": "workspace:*",
    "@expertcont/tokens": "workspace:*",
    "@lingui/core": "^5.1.0",
    "@lingui/react": "^5.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@lingui/macro": "^5.1.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "happy-dom": "^15.7.4",
    "typescript": "^5.5.4",
    "vitest": "^2.1.1",
    "@vitejs/plugin-react": "^4.3.1"
  }
}
```

- [ ] **Step 6.2: Create `packages/ui/tsconfig.json`**

Contents:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*", "vitest.config.ts"]
}
```

- [ ] **Step 6.3: Create `packages/ui/vitest.config.ts`**

Contents:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] } })],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
```

- [ ] **Step 6.4: Create `packages/ui/src/test-setup.ts`**

Contents:
```ts
import "@testing-library/jest-dom/vitest";
import { i18n } from "@lingui/core";

i18n.load("ro", {});
i18n.activate("ro");
```

- [ ] **Step 6.5: Add the Lingui babel macro plugin as a devDep of ui**

Run:
```bash
pnpm --filter @expertcont/ui add -D @lingui/babel-plugin-lingui-macro@^5.1.0
```

- [ ] **Step 6.6: Install workspace deps**

Run: `pnpm install`
Expected: no errors.

- [ ] **Step 6.7: Write the failing Button test**

Create `packages/ui/src/Button/Button.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies the variant class for variant='primary'", () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("primary");
  });

  it("applies the variant class for variant='ghost'", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").className).toContain("ghost");
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as an anchor when an href is provided", () => {
    render(<Button href="/x">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "/x");
  });
});
```

- [ ] **Step 6.8: Run the test to verify it fails**

Run: `pnpm --filter @expertcont/ui test`
Expected: FAIL with `Cannot find module './Button'` or `Button is not defined`.

- [ ] **Step 6.9: Implement `Button.module.css`**

Create `packages/ui/src/Button/Button.module.css`:
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-weight: var(--font-weight-semibold);
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}

.button:disabled,
.button[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
}
.primary:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
.ghost:hover:not(:disabled) {
  background-color: var(--color-bg-section);
}
```

- [ ] **Step 6.10: Implement `Button.tsx`**

Create `packages/ui/src/Button/Button.tsx`:
```tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const variant: Variant = props.variant ?? "primary";
  const className = `${styles.button} ${styles[variant]} ${props.className ?? ""}`.trim();

  if ("href" in props && typeof props.href === "string") {
    const { variant: _v, className: _c, children, ...anchor } = props;
    return (
      <a {...anchor} className={className}>
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, children, ...button } = props as ButtonAsButton;
  return (
    <button {...button} className={className}>
      {children}
    </button>
  );
}
```

- [ ] **Step 6.11: Create the barrel `index.ts`**

`packages/ui/src/Button/index.ts`:
```ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

- [ ] **Step 6.12: Run the tests to verify they pass**

Run: `pnpm --filter @expertcont/ui test`
Expected: 6 passing tests.

- [ ] **Step 6.13: (Optional) commit**

Run:
```bash
git add packages/ui pnpm-lock.yaml
git commit -m "feat(ui): add Button primitive with tests"
```

---

## Task 7: Build `Container` component (TDD)

**Files:**
- Create: `packages/ui/src/Container/Container.tsx`
- Create: `packages/ui/src/Container/Container.module.css`
- Create: `packages/ui/src/Container/Container.test.tsx`
- Create: `packages/ui/src/Container/index.ts`

- [ ] **Step 7.1: Write the failing test**

Create `packages/ui/src/Container/Container.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><span data-testid="child">x</span></Container>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders a <div> by default", () => {
    const { container } = render(<Container>x</Container>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as the requested element when `as` is provided", () => {
    const { container } = render(<Container as="section">x</Container>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("applies the container class", () => {
    const { container } = render(<Container>x</Container>);
    expect((container.firstChild as HTMLElement).className).toContain("container");
  });
});
```

- [ ] **Step 7.2: Run the test to verify it fails**

Run: `pnpm --filter @expertcont/ui test Container`
Expected: FAIL with `Cannot find module './Container'`.

- [ ] **Step 7.3: Implement `Container.module.css`**

Create `packages/ui/src/Container/Container.module.css`:
```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-5);
  padding-right: var(--space-5);
}
```

- [ ] **Step 7.4: Implement `Container.tsx`**

Create `packages/ui/src/Container/Container.tsx`:
```tsx
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({ as: As = "div", className, children, ...rest }: ContainerProps) {
  return (
    <As {...rest} className={`${styles.container} ${className ?? ""}`.trim()}>
      {children}
    </As>
  );
}
```

- [ ] **Step 7.5: Create the barrel**

`packages/ui/src/Container/index.ts`:
```ts
export { Container } from "./Container";
export type { ContainerProps } from "./Container";
```

- [ ] **Step 7.6: Run the tests to verify they pass**

Run: `pnpm --filter @expertcont/ui test Container`
Expected: 4 passing tests.

- [ ] **Step 7.7: (Optional) commit**

Run:
```bash
git add packages/ui/src/Container
git commit -m "feat(ui): add Container primitive"
```

---

## Task 8: Build `Heading` component (TDD)

**Files:**
- Create: `packages/ui/src/Heading/Heading.tsx`
- Create: `packages/ui/src/Heading/Heading.module.css`
- Create: `packages/ui/src/Heading/Heading.test.tsx`
- Create: `packages/ui/src/Heading/index.ts`

- [ ] **Step 8.1: Write the failing test**

Create `packages/ui/src/Heading/Heading.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders an <h1> at level 1 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
  });

  it("renders an <h2> when level=2", () => {
    render(<Heading level={2}>Sub</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Sub" })).toBeInTheDocument();
  });

  it("renders an <h3> when level=3", () => {
    render(<Heading level={3}>Sub-sub</Heading>);
    expect(screen.getByRole("heading", { level: 3, name: "Sub-sub" })).toBeInTheDocument();
  });

  it("applies the size class corresponding to its visual size", () => {
    render(<Heading level={2} size="display">Big</Heading>);
    expect(screen.getByRole("heading", { level: 2 }).className).toContain("display");
  });
});
```

- [ ] **Step 8.2: Run the test to verify it fails**

Run: `pnpm --filter @expertcont/ui test Heading`
Expected: FAIL with `Cannot find module './Heading'`.

- [ ] **Step 8.3: Implement `Heading.module.css`**

Create `packages/ui/src/Heading/Heading.module.css`:
```css
.heading {
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
}

.h1 { font-size: clamp(32px, 4.6vw, 56px); }
.h2 { font-size: clamp(26px, 3.4vw, 40px); }
.h3 { font-size: clamp(22px, 2.6vw, 28px); }
.h4 { font-size: 20px; }
.h5 { font-size: 18px; }
.h6 { font-size: 16px; }

.display { font-size: clamp(40px, 6vw, 72px); letter-spacing: -0.02em; }
.section { font-size: clamp(24px, 3vw, 36px); }
```

- [ ] **Step 8.4: Implement `Heading.tsx`**

Create `packages/ui/src/Heading/Heading.tsx`:
```tsx
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Heading.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "display" | "section";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  size?: Size;
  children: ReactNode;
}

export function Heading({ level = 1, size, className, children, ...rest }: HeadingProps) {
  const Tag = (`h${level}` as unknown) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const visualClass = size ? styles[size] : styles[`h${level}` as keyof typeof styles];
  return (
    <Tag {...rest} className={`${styles.heading} ${visualClass} ${className ?? ""}`.trim()}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 8.5: Create the barrel**

`packages/ui/src/Heading/index.ts`:
```ts
export { Heading } from "./Heading";
export type { HeadingProps } from "./Heading";
```

- [ ] **Step 8.6: Run the tests to verify they pass**

Run: `pnpm --filter @expertcont/ui test Heading`
Expected: 4 passing tests.

- [ ] **Step 8.7: Create the package root barrel**

Create `packages/ui/src/index.ts`:
```ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
export { Container } from "./Container";
export type { ContainerProps } from "./Container";
export { Heading } from "./Heading";
export type { HeadingProps } from "./Heading";
```

- [ ] **Step 8.8: Run the full ui test suite**

Run: `pnpm --filter @expertcont/ui test`
Expected: 14 passing tests across Button, Container, Heading.

- [ ] **Step 8.9: Typecheck the ui package**

Run: `pnpm --filter @expertcont/ui typecheck`
Expected: 0 errors.

- [ ] **Step 8.10: (Optional) commit**

Run:
```bash
git add packages/ui/src/Heading packages/ui/src/index.ts
git commit -m "feat(ui): add Heading primitive and package barrel"
```

---

## Task 9: Scaffold the Astro app `apps/web`

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/astro.config.mjs`
- Create: `apps/web/src/env.d.ts`
- Create: `apps/web/src/styles/global.css`

- [ ] **Step 9.1: Create `apps/web/package.json`**

Contents:
```json
{
  "name": "@expertcont/web",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "lint": "eslint src"
  },
  "dependencies": {
    "@expertcont/i18n": "workspace:*",
    "@expertcont/tokens": "workspace:*",
    "@expertcont/ui": "workspace:*",
    "@astrojs/react": "^3.6.2",
    "@lingui/core": "^5.1.0",
    "@lingui/react": "^5.1.0",
    "astro": "^4.15.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@lingui/babel-plugin-lingui-macro": "^5.1.0",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.4"
  }
}
```

- [ ] **Step 9.2: Create `apps/web/tsconfig.json`**

Contents:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": ["src/**/*", "astro.config.mjs"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {}
  }
}
```

- [ ] **Step 9.3: Create `apps/web/astro.config.mjs`**

Contents:
```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
  ],
});
```

- [ ] **Step 9.4: Create `apps/web/src/env.d.ts`**

Contents:
```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 9.5: Create `apps/web/src/styles/global.css`**

Contents:
```css
@import "@expertcont/tokens/tokens.css";

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-bg);
}
```

- [ ] **Step 9.6: Install workspace deps**

Run: `pnpm install`
Expected: no errors; `@expertcont/web` recognized; Astro and React installed.

- [ ] **Step 9.7: Verify Astro boots**

Run: `pnpm --filter @expertcont/web exec astro --version`
Expected: `4.x.x`.

- [ ] **Step 9.8: Initialize Astro's generated types**

Run: `pnpm --filter @expertcont/web exec astro sync`
Expected: creates `apps/web/.astro/types.d.ts`; exit code 0.

- [ ] **Step 9.9: Typecheck the app**

Run: `pnpm --filter @expertcont/web typecheck`
Expected: 0 errors (may report 0 hints, OK).

- [ ] **Step 9.10: (Optional) commit**

Run:
```bash
git add apps/web pnpm-lock.yaml
git commit -m "feat(web): scaffold Astro app with React + Lingui macro"
```

---

## Task 10: Add minimal `Base` layout and hello-world page

**Files:**
- Create: `apps/web/src/layouts/Base.astro`
- Create: `apps/web/src/components/HelloIsland.tsx`
- Create: `apps/web/src/pages/index.astro`

- [ ] **Step 10.1: Create `apps/web/src/layouts/Base.astro`**

Contents:
```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
  lang?: "ro" | "ru" | "en";
}

const { title, description, lang = "ro" } = Astro.props;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 10.2: Create `apps/web/src/components/HelloIsland.tsx`**

Contents:
```tsx
import { Trans } from "@lingui/react/macro";
import { Button, Container, Heading } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";

interface Props {
  locale: "ro" | "ru" | "en";
}

export default function HelloIsland({ locale }: Props) {
  return (
    <I18nRoot locale={locale}>
      <Container as="main" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
        <Heading level={1} size="display">
          <Trans>ExpertCont — accounting, legal, and consulting in Moldova</Trans>
        </Heading>
        <p style={{ fontSize: 18, color: "var(--color-text-secondary)", maxWidth: 640 }}>
          <Trans>This is the foundation page. Localized routing and full content follow in the next plan.</Trans>
        </p>
        <Button variant="primary">
          <Trans>Get in touch</Trans>
        </Button>
      </Container>
    </I18nRoot>
  );
}
```

- [ ] **Step 10.3: Create `apps/web/src/pages/index.astro`**

Contents:
```astro
---
import Base from "../layouts/Base.astro";
import HelloIsland from "../components/HelloIsland";
---
<Base title="ExpertCont">
  <HelloIsland client:load locale="ro" />
</Base>
```

- [ ] **Step 10.4: Run extract from the i18n package — strings from the new island should appear**

Run: `pnpm --filter @expertcont/i18n extract`
Expected: writes three messages into each `messages.po`; exit code 0; report shows "3 messages extracted".

- [ ] **Step 10.5: Manually fill the Romanian translations in `packages/i18n/src/locales/ro/messages.po`**

Open the file. For each `msgid` that appears, set its `msgstr` to the Romanian translation. Examples:

```po
#: apps/web/src/components/HelloIsland.tsx
msgid "ExpertCont — accounting, legal, and consulting in Moldova"
msgstr "ExpertCont — contabilitate, juridic și consultanță în Moldova"

#: apps/web/src/components/HelloIsland.tsx
msgid "This is the foundation page. Localized routing and full content follow in the next plan."
msgstr "Aceasta este pagina de bază. Rutarea localizată și conținutul complet urmează în următorul plan."

#: apps/web/src/components/HelloIsland.tsx
msgid "Get in touch"
msgstr "Contactează-ne"
```

Leave `ru/messages.po` and `en/messages.po` `msgstr` fields empty — they'll be translated later.

- [ ] **Step 10.6: Recompile catalogs**

Run: `pnpm --filter @expertcont/i18n compile`
Expected: regenerates `src/locales/{ro,ru,en}/messages.ts`; exit code 0.

- [ ] **Step 10.7: Boot the dev server**

Run: `pnpm --filter @expertcont/web dev`
Expected: Astro starts on `http://localhost:4321`. Browser to it: page renders the Romanian heading, paragraph, and "Contactează-ne" button.

Kill the server (`Ctrl+C`) after verifying.

- [ ] **Step 10.8: Build the production bundle**

Run: `pnpm --filter @expertcont/web build`
Expected: writes `apps/web/dist/`; exit code 0.

- [ ] **Step 10.9: Typecheck the app**

Run: `pnpm --filter @expertcont/web typecheck`
Expected: 0 errors.

- [ ] **Step 10.10: (Optional) commit**

Run:
```bash
git add apps/web/src packages/i18n/src/locales
git commit -m "feat(web): add Base layout and Lingui-wrapped hello-world page"
```

---

## Task 11: Add `lingui-clean` CI check

**Files:**
- Modify: `/package.json` (add `extract:check` script)

- [ ] **Step 11.1: Add a check script that fails if extraction would produce a diff**

Modify the `scripts` block of root `/package.json` to add:
```json
"extract:check": "pnpm extract && git diff --exit-code -- packages/i18n/src/locales"
```

The full updated `scripts` block becomes:
```json
"scripts": {
  "dev": "turbo run dev --parallel",
  "build": "turbo run build",
  "typecheck": "turbo run typecheck",
  "lint": "turbo run lint",
  "test": "turbo run test",
  "extract": "turbo run extract",
  "compile": "turbo run compile",
  "extract:check": "pnpm extract && git diff --exit-code -- packages/i18n/src/locales",
  "format": "prettier --write \"**/*.{ts,tsx,astro,css,md,json}\"",
  "format:check": "prettier --check \"**/*.{ts,tsx,astro,css,md,json}\""
}
```

- [ ] **Step 11.2: Run extract:check locally to confirm it currently passes**

Run: `pnpm run extract:check`
Expected: exit code 0 (no diff because we just extracted in Task 10).

- [ ] **Step 11.3: (Optional) commit**

Run:
```bash
git add package.json
git commit -m "chore: add extract:check script for CI"
```

---

## Task 12: Add GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 12.1: Create `.github/workflows/ci.yml`**

Contents:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Compile Lingui catalogs
        run: pnpm compile

      - name: Lingui extract — fail on diff
        run: pnpm run extract:check

      - name: Format check
        run: pnpm run format:check

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

- [ ] **Step 12.2: Dry-run each step locally to make sure the workflow will pass**

Run in order:
```bash
pnpm install --frozen-lockfile
pnpm compile
pnpm run extract:check
pnpm run format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Expected: every command exits 0.

If `pnpm lint` fails because some packages lack a `lint` script, add the script as `"lint": "eslint src"` to those packages and re-run.

- [ ] **Step 12.3: (Optional) commit**

Run:
```bash
git add .github/workflows/ci.yml
git commit -m "ci: add CI workflow (typecheck, lint, lingui-clean, test, build)"
```

---

## Task 13: Document the foundation in a top-level README

**Files:**
- Create: `/README.md`

- [ ] **Step 13.1: Create `/README.md`**

Contents:
```markdown
# ExpertCont

Monorepo for the ExpertCont marketing website (Astro + React + Supabase). See `docs/superpowers/specs/` for design specs and `docs/superpowers/plans/` for implementation plans.

## Requirements

- Node 20 LTS (`.nvmrc`)
- pnpm 10

## Install

\`\`\`bash
nvm use   # if you use nvm
pnpm install
\`\`\`

## Common scripts

- \`pnpm dev\` — run the Astro dev server (`apps/web` at http://localhost:4321)
- \`pnpm typecheck\` — TypeScript across the monorepo
- \`pnpm test\` — unit + component tests via Vitest
- \`pnpm extract\` — extract translation keys into `packages/i18n/src/locales/*/messages.po`
- \`pnpm compile\` — compile `.po` catalogs into runtime `.ts` modules
- \`pnpm build\` — build the production site

## Layout

- \`apps/web\` — Astro+React site
- \`packages/tokens\` — design tokens (CSS custom properties)
- \`packages/i18n\` — Lingui configuration, I18nProvider, locale utilities
- \`packages/ui\` — shared React UI primitives (CSS Modules)
- \`design/\` — visual reference prototype; **not** production code

## Locales

Source locale is Romanian (\`ro\`); Russian (\`ru\`) and English (\`en\`) are translation targets. UI strings are wrapped in Lingui macros (\`<Trans>\`, \`useLingui\`, \`msg\`).
```

- [ ] **Step 13.2: (Optional) commit**

Run:
```bash
git add README.md
git commit -m "docs: add top-level README"
```

---

## Final verification

- [ ] **Step F.1: Full clean install + verification**

Run:
```bash
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install --frozen-lockfile
pnpm compile
pnpm typecheck
pnpm test
pnpm build
```

Expected: every command exits 0.

- [ ] **Step F.2: Manual smoke**

Run: `pnpm dev`
Open `http://localhost:4321/`. Verify:
- Romanian heading renders.
- "Contactează-ne" button is present and clickable.
- Browser console shows no errors.

Kill the server.

- [ ] **Step F.3: Mark Plan 1 complete**

Foundation is in place. The next plan (localized routing + content system) can build on top of:
- Workspace structure (apps/web, packages/{tokens,i18n,ui})
- Lingui pipeline (`extract` / `compile` / CI check)
- Type-checked, tested UI primitives
- A working dev server and production build

---

## Spec coverage summary

Foundation plan tasks map to the following spec sections:

| Spec section | Foundation task(s) |
|---|---|
| §2 Stack — pnpm/Turbo/TS/Astro/React | 1, 2, 9 |
| §2 Stack — Lingui v5, ro/ru/en | 5, 10, 11 |
| §2 Stack — CSS Modules + design tokens | 4, 6, 7, 8 |
| §3 Monorepo Layout — apps/web, packages/tokens, packages/i18n, packages/ui | 4, 5, 6–8, 9 |
| §8 Components — Button, Container, Heading | 6, 7, 8 |
| §10 Testing — Vitest + RTL | 6, 7, 8 |
| §10 Testing — Lingui extract --clean in CI | 11, 12 |
| §11 Deployment — GitHub Actions skeleton | 12 |

Out-of-scope (deferred to later plans): localized routing (§5), full UI primitive library, MDX content collections, Supabase + RLS (§6), API endpoints (§7), LLM endpoints (§7.3), consent banner (§7.4), Cloudflare Pages deploy (§11).
