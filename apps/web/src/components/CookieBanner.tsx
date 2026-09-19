import { useEffect, useState } from "react";
import { Trans } from "@lingui/react/macro";
import { Button } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";
import {
  COOKIE_SETTINGS_EVENT,
  FULL_CONSENT,
  NO_CONSENT,
  clearTrackingCookies,
  initClarity,
  loadAnalytics,
  readConsent,
  storeConsent,
  updateConsent,
  type ConsentChoices,
} from "../lib/analytics";

interface Props {
  locale: Locale;
  /** URL to the cookie policy page in the current locale. */
  policyHref: string;
}

type Purpose = keyof ConsentChoices;

interface PreferenceCopy {
  intro: string;
  title: string;
  necessary: string;
  necessaryText: string;
  alwaysOn: string;
  purposes: Record<Purpose, { label: string; text: string }>;
  save: string;
}

const PREFERENCES: Record<Locale, PreferenceCopy> = {
  ro: {
    intro:
      "Folosim cookie-uri necesare pentru funcționarea site-ului și, doar cu acordul tău, Google Analytics (statistici de vizitare), Microsoft Clarity (înregistrarea sesiunii) și Google Tag Manager (marketing). Dacă accepți Clarity, Microsoft primește datele ca operator independent, le transferă în SUA, unde protecția poate fi mai slabă decât în UE, și le folosește și pentru Microsoft Advertising. Poți alege pe categorii în preferințe.",
    title: "Preferințe cookie",
    necessary: "Necesare",
    necessaryText:
      "Rețin tema aleasă și alegerea privind cookie-urile. Fără ele site-ul nu funcționează corect.",
    alwaysOn: "Mereu active",
    purposes: {
      analytics: {
        label: "Analiză",
        text: "Google Analytics: câte persoane vizitează site-ul și ce pagini sunt citite.",
      },
      recording: {
        label: "Înregistrarea sesiunii",
        text: "Microsoft Clarity: cum este folosit site-ul (clicuri, derulare), fără paginile cu formulare. Microsoft primește datele ca operator independent, le transferă în SUA, unde protecția poate fi mai slabă decât în UE, și le folosește și pentru Microsoft Advertising. Bifând, îți dai acordul explicit pentru acest transfer.",
      },
      marketing: {
        label: "Marketing",
        text: "Google Tag Manager, pentru instrumente de marketing. Momentan nu afișăm reclame.",
      },
    },
    save: "Salvează alegerile",
  },
  ru: {
    intro:
      "Мы используем необходимые cookie для работы сайта и, только с вашего согласия, Google Analytics (статистика посещений), Microsoft Clarity (запись сессий) и Google Tag Manager (маркетинг). Если вы разрешите Clarity, Microsoft получит данные как самостоятельный оператор, передаст их в США, где защита может быть слабее, чем в ЕС, и будет использовать их также для Microsoft Advertising. Выбрать по категориям можно в настройках.",
    title: "Настройки cookie",
    necessary: "Необходимые",
    necessaryText:
      "Запоминают выбранную тему и ваш выбор по cookie. Без них сайт не работает корректно.",
    alwaysOn: "Всегда активны",
    purposes: {
      analytics: {
        label: "Аналитика",
        text: "Google Analytics: сколько людей посещают сайт и какие страницы читают.",
      },
      recording: {
        label: "Запись сессий",
        text: "Microsoft Clarity: как используется сайт (клики, прокрутка), кроме страниц с формами. Microsoft получает данные как самостоятельный оператор, передаёт их в США, где защита может быть слабее, чем в ЕС, и использует их также для Microsoft Advertising. Отмечая этот пункт, вы даёте явное согласие на такую передачу.",
      },
      marketing: {
        label: "Маркетинг",
        text: "Google Tag Manager для маркетинговых инструментов. Сейчас мы не показываем рекламу.",
      },
    },
    save: "Сохранить выбор",
  },
  en: {
    intro:
      "We use necessary cookies to run the site and, only with your consent, Google Analytics (visit statistics), Microsoft Clarity (session recording) and Google Tag Manager (marketing). If you allow Clarity, Microsoft receives the data as an independent controller, transfers it to the US, where protection may be weaker than in the EU, and also uses it for Microsoft Advertising. You can choose by category under preferences.",
    title: "Cookie preferences",
    necessary: "Necessary",
    necessaryText:
      "Remember your theme and cookie choice. The site doesn't work properly without them.",
    alwaysOn: "Always on",
    purposes: {
      analytics: {
        label: "Analytics",
        text: "Google Analytics: how many people visit the site and which pages they read.",
      },
      recording: {
        label: "Session recording",
        text: "Microsoft Clarity: how the site is used (clicks, scrolling), excluding pages with forms. Microsoft receives the data as an independent controller, transfers it to the US, where protection may be weaker than in the EU, and also uses it for Microsoft Advertising. Ticking this gives your explicit consent to that transfer.",
      },
      marketing: {
        label: "Marketing",
        text: "Google Tag Manager, for marketing tools. We don't currently show ads.",
      },
    },
    save: "Save choices",
  },
};

const PURPOSES: Purpose[] = ["analytics", "recording", "marketing"];

interface PreferenceRowProps {
  id: string;
  label: string;
  text: string;
  checked: boolean;
  badge?: string;
  onChange?: (checked: boolean) => void;
}

function PreferenceRow({ id, label, text, checked, badge, onChange }: PreferenceRowProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3"
    >
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-primary"
        checked={checked}
        disabled={!onChange}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-text-primary">
          {label}
          {badge && <span className="ml-2 text-xs font-normal text-text-secondary">{badge}</span>}
        </span>
        <span className="text-xs leading-relaxed text-text-secondary">{text}</span>
      </span>
    </label>
  );
}

function BannerContent({ locale, policyHref }: Props) {
  const [open, setOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(NO_CONSENT);
  const copy = PREFERENCES[locale];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = readConsent();
    if (stored) {
      setChoices(stored);
      if (stored.recording) void initClarity();
    }
    const requested = window.expertcontCookieSettingsRequested === true;
    setShowPreferences(requested);
    setOpen(!stored || requested);

    const reopen = () => {
      setChoices(readConsent() ?? NO_CONSENT);
      setShowPreferences(true);
      setOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const apply = (next: ConsentChoices) => {
    window.expertcontCookieSettingsRequested = false;
    const previous = readConsent();
    storeConsent(next);
    updateConsent(next);
    const revoked =
      previous !== null && PURPOSES.some((purpose) => previous[purpose] && !next[purpose]);
    if (revoked) {
      clearTrackingCookies();
      window.location.reload();
      return;
    }
    loadAnalytics(next);
    if (next.recording) void initClarity();
    setChoices(next);
    setShowPreferences(false);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fade-up fixed bottom-5 left-5 right-5 z-[90] mx-auto max-h-[calc(100dvh-var(--nav-h)-2.5rem)] max-w-md overflow-y-auto rounded-lg border border-border bg-bg-card p-6 shadow-xl sm:left-5 sm:right-auto"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          🍪
        </span>
        <h4 id="cookie-banner-title" className="m-0">
          {showPreferences ? copy.title : <Trans>We use cookies</Trans>}
        </h4>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
        {copy.intro}{" "}
        <a href={policyHref} className="text-primary underline">
          <Trans>Cookie policy</Trans>
        </a>
        .
      </p>

      {showPreferences && (
        <fieldset className="m-0 mb-5 flex flex-col gap-2 border-0 p-0">
          <legend className="sr-only">{copy.title}</legend>
          <PreferenceRow
            id="cookie-pref-necessary"
            label={copy.necessary}
            text={copy.necessaryText}
            badge={copy.alwaysOn}
            checked
          />
          {PURPOSES.map((purpose) => (
            <PreferenceRow
              key={purpose}
              id={`cookie-pref-${purpose}`}
              label={copy.purposes[purpose].label}
              text={copy.purposes[purpose].text}
              checked={choices[purpose]}
              onChange={(checked) => setChoices({ ...choices, [purpose]: checked })}
            />
          ))}
        </fieldset>
      )}

      <div className="flex flex-wrap gap-2">
        {showPreferences ? (
          <>
            <Button variant="primary" size="sm" onClick={() => apply(choices)}>
              {copy.save}
            </Button>
            <Button variant="outline" size="sm" onClick={() => apply(FULL_CONSENT)}>
              <Trans>Accept all</Trans>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => apply(NO_CONSENT)}>
              <Trans>Only necessary</Trans>
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" size="sm" onClick={() => apply(FULL_CONSENT)}>
              <Trans>Accept all</Trans>
            </Button>
            <Button variant="outline" size="sm" onClick={() => apply(NO_CONSENT)}>
              <Trans>Only necessary</Trans>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)}>
              <Trans>Preferences</Trans>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CookieBanner({ locale, policyHref }: Props) {
  return (
    <I18nRoot locale={locale}>
      <BannerContent locale={locale} policyHref={policyHref} />
    </I18nRoot>
  );
}
