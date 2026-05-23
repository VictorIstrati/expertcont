import { i18n } from "@lingui/core";
import { messages as roMessages } from "./locales/ro/messages";
import { messages as ruMessages } from "./locales/ru/messages";
import { messages as enMessages } from "./locales/en/messages";
import type { Locale } from "./locales";

// Eagerly load every locale's compiled catalog at module init. The catalogs
// are static JS objects (parsed once via JSON.parse inside the compiled file),
// so this costs one tiny parse per locale and lets us activate any locale
// synchronously — required for SSR and for React renders that can't await.
i18n.load({
  ro: roMessages,
  ru: ruMessages,
  en: enMessages,
});

/** Activate a locale synchronously. Safe to call during render and during SSR. */
export function activateLocaleSync(locale: Locale): void {
  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }
}

/**
 * @deprecated Prefer `activateLocaleSync`. Kept for callers that already
 * `await` this. Resolves immediately — there's no longer anything async.
 */
export async function activateLocale(locale: Locale): Promise<void> {
  activateLocaleSync(locale);
}

export { i18n };
