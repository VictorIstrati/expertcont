import { useEffect, useState } from "react";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Nav, type NavSection } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../lib/modalBus";

interface Props {
  locale: Locale;
  activeSection?: NavSection;
  siblings: Record<Locale, string>;
}

const THEME_STORAGE_KEY = "expertcont-theme";

export default function NavWithSwitcher({ locale, activeSection, siblings }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage on mount; fall back to system preference.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initial: "light" | "dark" =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia?.("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const handleThemeChange = (next: "light" | "dark") => {
    setTheme(next);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    }
  };

  return (
    <I18nRoot locale={locale}>
      <Nav
        locale={locale}
        activeSection={activeSection}
        theme={theme}
        onThemeChange={handleThemeChange}
        onLocaleChange={(next) => {
          if (typeof window !== "undefined") window.location.href = siblings[next];
        }}
        onBookConsult={() => openModal("booking")}
      />
    </I18nRoot>
  );
}
