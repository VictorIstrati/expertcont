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
