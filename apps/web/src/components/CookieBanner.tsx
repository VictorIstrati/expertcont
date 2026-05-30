import { useEffect, useState } from "react";
import { Trans } from "@lingui/react/macro";
import { Button } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";
import { updateConsent, initClarity } from "../lib/analytics";

const STORAGE_KEY = "expertcont-cookie-consent";

interface Props {
  locale: Locale;
  /** URL to the cookie policy page in the current locale. */
  policyHref: string;
}

type Consent = "accepted" | "rejected" | null;

function BannerContent({ policyHref }: { policyHref: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setConsent(stored === "accepted" || stored === "rejected" ? (stored as Consent) : null);
    setHydrated(true);
    if (stored === "accepted") void initClarity();
  }, []);

  if (!hydrated || consent !== null) return null;

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    updateConsent("accepted");
    void initClarity();
    setConsent("accepted");
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, "rejected");
    updateConsent("rejected");
    setConsent("rejected");
  };

  return (
    <div className="fade-up fixed bottom-5 left-5 right-5 z-[90] mx-auto max-w-md rounded-lg border border-border bg-bg-card p-6 shadow-xl sm:left-5 sm:right-auto">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          🍪
        </span>
        <h4 className="m-0">
          <Trans>We use cookies</Trans>
        </h4>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
        <Trans>
          We use cookies to improve your experience and for anonymous analytics. Accept all or
          customize your preferences.
        </Trans>{" "}
        <a href={policyHref} className="text-primary underline">
          <Trans>Cookie policy</Trans>
        </a>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={accept}>
          <Trans>Accept all</Trans>
        </Button>
        <Button variant="outline" size="sm" onClick={reject}>
          <Trans>Only necessary</Trans>
        </Button>
        <Button href={policyHref} variant="ghost" size="sm">
          <Trans>Preferences</Trans>
        </Button>
      </div>
    </div>
  );
}

export default function CookieBanner({ locale, policyHref }: Props) {
  return (
    <I18nRoot locale={locale}>
      <BannerContent policyHref={policyHref} />
    </I18nRoot>
  );
}
