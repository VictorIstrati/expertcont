import type { Locale } from "@expertcont/i18n";
import styles from "./LocaleSwitcher.module.css";

interface Props {
  currentLocale: Locale;
  siblings: Record<Locale, string>;
}

const LOCALE_LABELS: Record<Locale, string> = {
  ro: "Română",
  ru: "Русский",
  en: "English",
};

export default function LocaleSwitcher({ currentLocale, siblings }: Props) {
  return (
    <nav className={styles.switcher} aria-label="Language">
      {(["ro", "ru", "en"] as const).map((loc) => (
        <a
          key={loc}
          href={siblings[loc]}
          className={loc === currentLocale ? styles.active : styles.link}
          hrefLang={loc}
          aria-current={loc === currentLocale ? "true" : undefined}
        >
          {LOCALE_LABELS[loc]}
        </a>
      ))}
    </nav>
  );
}
