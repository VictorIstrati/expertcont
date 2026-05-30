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

/** Push a typed marketing event to the dataLayer for GTM to route. */
export function track<E extends keyof EventMap>(event: E, properties: EventMap[E]): void {
  if (typeof window === "undefined") return;
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  window.dataLayer.push({ event, ...properties });
}

// ---- Consent Mode v2 ---------------------------------------------------------

export type ConsentChoice = "accepted" | "rejected";

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

/**
 * Push a Consent Mode v2 update for GTM/GA4 to act on. `accepted` grants all
 * four marketing categories; `rejected` leaves the page-load default (denied).
 */
export function updateConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", choice === "accepted" ? GRANTED : DENIED);
}
