import { I18nProvider } from "@lingui/react";
import type { ReactNode } from "react";
import { i18n, activateLocaleSync } from "./setup";
import type { Locale } from "./locales";

interface I18nRootProps {
  locale: Locale;
  children: ReactNode;
}

export function I18nRoot({ locale, children }: I18nRootProps) {
  // Activate during render so both SSR and the client first paint already
  // have the right catalog loaded. Safe because every catalog is statically
  // imported in setup.ts — no async, no flash of untranslated content.
  activateLocaleSync(locale);
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
