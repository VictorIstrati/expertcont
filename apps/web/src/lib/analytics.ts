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
