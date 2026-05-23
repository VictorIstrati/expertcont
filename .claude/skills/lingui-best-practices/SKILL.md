---
name: lingui-best-practices
description: Implement internationalization with Lingui in React and JavaScript applications. Use when adding i18n, translating UI, working with Trans/useLingui/Plural, extracting messages, compiling catalogs, or when the user mentions Lingui, internationalization, i18n, translations, locales, message extraction, ICU MessageFormat, or working with .po files.
---

# Lingui Best Practices

Lingui is a powerful internationalization (i18n) framework for JavaScript. This skill covers best practices for implementing i18n in React and vanilla JavaScript applications.

## This project (expertcont2)

- **Lingui 5**, `sourceLocale: "ro"`, targets: `ro`, `ru`, `en`. Romanian strings are authored directly in source — never write "TODO translate" placeholders in Romanian.
- **Catalogs:** `packages/i18n/src/locales/{locale}/messages.po` (source) → compiled to `messages.ts` via `compileNamespace: "ts"`. Compiled files are gitignored and ESLint-ignored.
- **Two `lingui.config.ts` files** (`apps/web` and `packages/i18n`). The i18n package's config is the authoritative one — it scopes extraction over both `apps/web/src` and `packages/ui/src`. Always run extraction from the repo root.
- **Commands (pnpm only — never npm/yarn):**
  - `pnpm extract` — pull strings from source into `.po`
  - `pnpm compile` — compile `.po` → `.ts` (Turborepo runs this before `build` automatically)
  - `pnpm extract:check` — CI guard: fails if `.po` is out of sync with source
- **Import surface:** consume i18n only via `@expertcont/i18n` (re-exports `I18nRoot`, `activateLocale`, `i18n`, `LOCALES`, `DEFAULT_LOCALE`, `Locale`, etc.). Do **not** reach into `@expertcont/i18n/<subpath>` from app/UI code.
- **Don't wire `I18nProvider` yourself.** Wrap React islands in `<I18nRoot locale={...}>` from `@expertcont/i18n`. It calls `activateLocale` (dynamic-imports the right compiled catalog), renders `null` until ready, then mounts `I18nProvider` — so islands never flash untranslated.
- **Macros work in Vitest too** — the babel macro plugin is wired into both `astro.config.mjs` and `packages/ui/vitest.config.ts`. `test-setup.ts` activates an empty `ro` locale so `<Trans>`, `useLingui`, `msg` don't blow up.

## Quick Start Workflow

The standard Lingui workflow consists of these steps:

1. Wrap your app in `I18nProvider` (in this repo: use `<I18nRoot>` from `@expertcont/i18n` instead)
2. Mark messages for translation using macros (`Trans`, `t`, etc.)
3. Extract messages: `pnpm extract`
4. Translate the catalogs (edit `packages/i18n/src/locales/{ru,en}/messages.po`)
5. Compile catalogs: `pnpm compile`
6. Load and activate locale in your app (here: `activateLocale(locale)`)

## Core Packages

Import from these packages:

```jsx
// React macros (recommended)
import { Trans, Plural, Select, useLingui } from "@lingui/react/macro";

// Core macros for vanilla JS
import { t, msg, plural, select } from "@lingui/core/macro";

// Runtime (rarely used directly)
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
```

## Setup I18nProvider

> **In this project:** use `I18nRoot` from `@expertcont/i18n` — do not call `I18nProvider`, `i18n.load`, or `i18n.activate` directly from app/UI code.

```tsx
// Astro page / React island
import { I18nRoot } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";

export default function Island({ locale }: { locale: Locale }) {
  return (
    <I18nRoot locale={locale}>
      {/* island contents */}
    </I18nRoot>
  );
}
```

The generic Lingui setup (for reference only — not used in this repo):

```jsx
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages } from "./locales/en/messages";

i18n.load("en", messages);
i18n.activate("en");

function App() {
  return (
    <I18nProvider i18n={i18n}>
      {/* Your app */}
    </I18nProvider>
  );
}
```

## Translating UI Text

### Use Trans for JSX Content

The `Trans` macro is the primary way to translate JSX:

```jsx
import { Trans } from "@lingui/react/macro";

// Simple text
<Trans>Hello World</Trans>

// With variables
<Trans>Hello {userName}</Trans>

// With components (rich text)
<Trans>
  Read the <a href="/docs">documentation</a> for more info.
</Trans>

// Extracted as: "Read the <0>documentation</0> for more info."
```

**When to use**: For any translatable text in JSX elements.

### Use useLingui for Non-JSX

For strings outside JSX (attributes, alerts, function calls):

```jsx
import { useLingui } from "@lingui/react/macro";

function MyComponent() {
  const { t } = useLingui();

  const handleClick = () => {
    alert(t`Action completed!`);
  };

  return (
    <div>
      <img src="..." alt={t`Image description`} />
      <button onClick={handleClick}>{t`Click me`}</button>
    </div>
  );
}
```

**When to use**: Element attributes, alerts, function parameters, any non-JSX string.

### Use msg for Lazy Translations

When you need to define messages at module level or in arrays/objects:

```jsx
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

// Module-level constants
const STATUSES = {
  active: msg`Active`,
  inactive: msg`Inactive`,
  pending: msg`Pending`,
};

function StatusList() {
  const { _ } = useLingui();
  
  return Object.entries(STATUSES).map(([key, message]) => (
    <div key={key}>{_(message)}</div>
  ));
}
```

**When to use**: Module-level constants, arrays of messages, conditional message selection.

## Pluralization

Use the `Plural` macro for quantity-dependent messages:

```jsx
import { Plural } from "@lingui/react/macro";

<Plural 
  value={messageCount}
  one="You have # message"
  other="You have # messages"
/>
```

The `#` placeholder is replaced with the actual value.

### Exact Matches

Use `_N` syntax for exact number matches (takes precedence over plural forms):

```jsx
<Plural
  value={count}
  _0="No messages"
  one="One message"
  other="# messages"
/>
```

### With Variables and Components

Combine with `Trans` for complex messages:

```jsx
<Plural
  value={count}
  one={`You have # message, ${userName}`}
  other={
    <Trans>
      You have <strong>#</strong> messages, {userName}
    </Trans>
  }
/>
```

## Formatting Dates and Numbers

Use `i18n.date()` and `i18n.number()` for locale-aware formatting:

```jsx
import { useLingui } from "@lingui/react/macro";

function MyComponent() {
  const { i18n } = useLingui();
  const lastLogin = new Date();
  
  return (
    <Trans>
      Last login: {i18n.date(lastLogin)}
    </Trans>
  );
}
```

These use the browser's `Intl` API for proper locale formatting.

## Message IDs and Context

### Explicit IDs

Provide a custom ID for stable message keys:

```jsx
<Trans id="header.welcome">Welcome to our app</Trans>
```

### Context for Disambiguation

When the same text has different meanings, use `context`:

```jsx
<Trans context="direction">right</Trans>
<Trans context="correctness">right</Trans>
```

These create separate catalog entries.

### Comments for Translators

Add context for translators:

```jsx
<Trans comment="Greeting shown on homepage">Hello World</Trans>
```

## Configuration

This repo's authoritative config (`packages/i18n/lingui.config.ts`):

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

Note the cross-package `include` paths — extraction reaches into `apps/web` and `packages/ui`, so a new workspace package that uses macros must be added here (or the file won't pick up its strings).

For detailed configuration patterns, see [configuration.md](references/configuration.md).

## Best Practices

### Always Use Macros

Prefer macros over runtime components. Macros are compiled at build time, reducing bundle size:

```jsx
// ✅ Good - uses macro
import { Trans } from "@lingui/react/macro";

// ❌ Avoid - runtime only
import { Trans } from "@lingui/react";
```

### Keep Messages Simple

Avoid complex expressions in messages - they'll be replaced with placeholders:

```jsx
// ❌ Bad - loses context
<Trans>Hello {user.name.toUpperCase()}</Trans>
// Extracted as: "Hello {0}"

// ✅ Good - clear variable name
const userName = user.name.toUpperCase();
<Trans>Hello {userName}</Trans>
// Extracted as: "Hello {userName}"
```

### Use Trans for JSX, t for Strings

Choose the right tool:

```jsx
// ✅ For JSX content
<h1><Trans>Welcome</Trans></h1>

// ✅ For string values
const { t } = useLingui();
<img alt={t`Profile picture`} />
```

### Don't Use Macros at Module Level

Macros need component context - use `msg` instead:

```jsx
// ❌ Bad - won't work
import { t } from "@lingui/core/macro";
const LABELS = [t`Red`, t`Green`, t`Blue`];

// ✅ Good - use msg for lazy translation
import { msg } from "@lingui/core/macro";
const LABELS = [msg`Red`, msg`Green`, msg`Blue`];
```

### Use the ESLint Plugin

Install and configure `eslint-plugin-lingui` to catch common mistakes automatically (use **pnpm** in this repo, and add it at the workspace root):

```bash
pnpm add -Dw eslint-plugin-lingui
```

```js
// eslint.config.js
import pluginLingui from "eslint-plugin-lingui";

export default [
  pluginLingui.configs["flat/recommended"],
];
```

## Common Patterns

### Dynamic Locale Switching

> **In this project:** call `activateLocale(locale)` from `@expertcont/i18n`. It owns the dynamic import + `i18n.load`/`activate` for `ro`/`ru`/`en`. Don't reimplement it.

```ts
import { activateLocale } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";

async function changeLocale(locale: Locale) {
  await activateLocale(locale);
}
```

Generic Lingui equivalent (for reference, not used here):

```jsx
import { i18n } from "@lingui/core";

async function changeLocale(locale) {
  const { messages } = await import(`./locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
```

### Loading Catalogs Dynamically

In this repo `<I18nRoot>` already does this — render it once per island, and it handles dynamic import + activation + the "not ready" gate.

### Memoization with useLingui

When using memoization, use the `t` function from the macro version:

```jsx
import { useLingui } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useMemo } from "react";

const welcomeMessage = msg`Welcome!`;

function MyComponent() {
  const { t } = useLingui(); // Macro version - reference changes with locale
  
  // ✅ Safe - t reference updates with locale
  const message = useMemo(() => t(welcomeMessage), [t]);
  
  return <div>{message}</div>;
}
```

## Troubleshooting

If you encounter issues:

1. **Messages not extracted**: Check `include` patterns in `packages/i18n/lingui.config.ts` — new workspace packages must be added there. Then run `pnpm extract` from the repo root (not from inside `apps/web`).
2. **Translations not applied**: Run `pnpm compile`. The `build` task already depends on `compile`, so `pnpm build` produces fresh catalogs — local `pnpm dev` won't.
3. **Runtime errors / blank island**: `<I18nRoot>` renders `null` until `activateLocale` resolves. If the island stays blank, the locale's compiled `messages.ts` is probably missing — re-run `pnpm compile`.
4. **CI fails on `extract:check`**: source strings drifted from `.po`. Run `pnpm extract` and commit the updated `.po` files.
5. **Tests fail with macro errors**: confirm the test package extends `packages/ui/vitest.config.ts` patterns (babel-macro plugin + `test-setup.ts` that activates the `ro` locale with empty messages).

For detailed common mistakes and pitfalls, see [common-mistakes.md](references/common-mistakes.md).
