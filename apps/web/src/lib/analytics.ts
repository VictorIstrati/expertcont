/**
 * Typed wrappers around GTM's dataLayer and gtag() for app code.
 *
 * SSR-safe: every function no-ops when called server-side. Client-side, they
 * push to the dataLayer / call gtag — both of which are initialized by the
 * inline bootstrap in Base.astro before GTM loads.
 */

import type { Locale } from "@expertcont/i18n";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    expertcontLoadAnalytics?: (choices: ConsentChoices) => void;
    expertcontCookieSettingsRequested?: boolean;
  }
}

type FormType =
  | "contact"
  | "quote"
  | "booking"
  | "tier_booking"
  | "review"
  | "faq_question"
  | "newsletter";

type EventMap = {
  form_submitted: {
    form_type: FormType;
    locale: Locale;
    tier_name?: string;
  };
  cta_clicked: {
    cta_text: string;
    cta_location: string;
    locale: Locale;
  };
  calculator_completed: {
    total_mdl: number;
    services_count: number;
    locale: Locale;
  };
  phone_link_clicked: {
    location: string;
  };
  locale_switched: {
    from: Locale;
    to: Locale;
  };
};

/**
 * Push a typed marketing event to both:
 *  - the dataLayer in object form (`{event, ...props}`) — picked up by GTM
 *    custom event triggers if/when tags need them.
 *  - gtag('event', name, props) — direct send to GA4, no GTM tag required.
 *
 * GA4 is loaded directly via gtag.js in Base.astro. GTM is reserved for
 * non-GA4 tools (Meta Pixel etc.) added later. There is no GA4 tag inside
 * GTM, so this won't double-count.
 */
export function track<E extends keyof EventMap>(event: E, properties: EventMap[E]): void {
  if (typeof window === "undefined") return;
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  window.dataLayer.push({ event, ...properties });
  if (typeof window.gtag === "function") {
    window.gtag("event", event, properties);
  }
}

// ---- Consent Mode v2 ---------------------------------------------------------

export const CONSENT_STORAGE_KEY = "expertcont-cookie-consent";
export const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_DAYS = 365;
export const COOKIE_SETTINGS_EVENT = "expertcont:cookie-settings";

export interface ConsentChoices {
  analytics: boolean;
  recording: boolean;
  marketing: boolean;
}

export interface ConsentRecord extends ConsentChoices {
  version: number;
  date: string;
}

export const NO_CONSENT: ConsentChoices = { analytics: false, recording: false, marketing: false };
export const FULL_CONSENT: ConsentChoices = { analytics: true, recording: true, marketing: true };

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as Partial<ConsentRecord>;
    if (record.version !== CONSENT_VERSION || typeof record.date !== "string") return null;
    const ageDays = (Date.now() - Date.parse(record.date)) / 86_400_000;
    if (!(ageDays <= CONSENT_MAX_AGE_DAYS)) return null;
    return {
      version: record.version,
      date: record.date,
      analytics: record.analytics === true,
      recording: record.recording === true,
      marketing: record.marketing === true,
    };
  } catch {
    return null;
  }
}

export function storeConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = {
    ...choices,
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage blocked — the choice still applies to this page view */
  }
  return record;
}

export function updateConsent(choices: ConsentChoices): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const marketing = choices.marketing ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: choices.analytics ? "granted" : "denied",
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });
}

export function loadAnalytics(choices: ConsentChoices): void {
  if (typeof window === "undefined") return;
  window.expertcontLoadAnalytics?.(choices);
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.expertcontCookieSettingsRequested = true;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

const TRACKING_COOKIE = /^(_ga|_gid|_gat|_gcl|_clck|_clsk)/;

export function clearTrackingCookies(): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim() ?? "";
    if (!TRACKING_COOKIE.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

// ---- Microsoft Clarity --------------------------------------------------------

/**
 * Lazily initialize Microsoft Clarity. Safe to call multiple times — Clarity's
 * own init() is idempotent. No-ops when:
 *   - running server-side
 *   - PUBLIC_CLARITY_PROJECT_ID is not configured
 *
 * Should only be invoked once consent has been granted.
 */
export async function initClarity(): Promise<void> {
  if (typeof window === "undefined") return;
  const projectId = import.meta.env.PUBLIC_CLARITY_PROJECT_ID as string | undefined;
  if (!projectId) return;
  const Clarity = (await import("@microsoft/clarity")).default;
  Clarity.init(projectId);
  Clarity.consent(true);
}
