import { useEffect, useState } from "react";
import { Button } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";

const STORAGE_KEY = "expertcont-cookie-consent";

interface Props {
  locale: Locale;
  /** URL to the cookie policy page in the current locale. */
  policyHref: string;
}

const COPY: Record<
  Locale,
  {
    title: string;
    body: string;
    accept: string;
    reject: string;
    customize: string;
    policy: string;
  }
> = {
  ro: {
    title: "Folosim cookies",
    body: "Folosim cookies pentru a îmbunătăți experiența ta și pentru analize anonime. Poți accepta toate cookies sau să customizezi preferințele.",
    accept: "Accept toate",
    reject: "Doar necesare",
    customize: "Preferințe",
    policy: "Politica de cookies",
  },
  ru: {
    title: "Мы используем cookies",
    body: "Cookies нужны для улучшения работы сайта и анонимной аналитики. Принимайте все или настройте свои предпочтения.",
    accept: "Принять все",
    reject: "Только необходимые",
    customize: "Настройки",
    policy: "Политика cookies",
  },
  en: {
    title: "We use cookies",
    body: "We use cookies to improve your experience and for anonymous analytics. Accept all or customize your preferences.",
    accept: "Accept all",
    reject: "Only necessary",
    customize: "Preferences",
    policy: "Cookie policy",
  },
};

type Consent = "accepted" | "rejected" | null;

export default function CookieBanner({ locale, policyHref }: Props) {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setConsent(stored === "accepted" || stored === "rejected" ? (stored as Consent) : null);
    setHydrated(true);
  }, []);

  if (!hydrated || consent !== null) return null;

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  const c = COPY[locale];

  return (
    <I18nRoot locale={locale}>
      <div className="fade-up fixed bottom-5 left-5 right-5 z-[90] mx-auto max-w-md rounded-lg border border-border bg-bg-card p-6 shadow-xl sm:left-5 sm:right-auto">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🍪
          </span>
          <h4 className="m-0">{c.title}</h4>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">
          {c.body}{" "}
          <a href={policyHref} className="text-primary underline">
            {c.policy}
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={accept}>
            {c.accept}
          </Button>
          <Button variant="outline" size="sm" onClick={reject}>
            {c.reject}
          </Button>
          <Button href={policyHref} variant="ghost" size="sm">
            {c.customize}
          </Button>
        </div>
      </div>
    </I18nRoot>
  );
}
