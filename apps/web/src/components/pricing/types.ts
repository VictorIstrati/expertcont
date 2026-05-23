import type { AccordionItem } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

export interface Tier {
  name: string;
  price: number | null;
  priceLabel?: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface AddOn {
  name: string;
  price: string;
}

// ---- Calculator data shapes -------------------------------------------------

export type IndustryGroupId = "noactivity" | "services" | "trade" | "it" | "specific";

export interface CalcIndustry {
  id: string;
  group: IndustryGroupId;
  base: number;
  label: string;
  /** Optional promotional discount, 0–100. Applies to the accounting subtotal. */
  salePct?: number;
  /** Discount duration in months. Defaults to DEFAULT_SALE_MONTHS when omitted. */
  saleMonths?: number;
}

export interface CalcInvoiceSurcharge {
  freeUpTo: number;
  perExtra: number;
}

export interface CalcRevenueBucket {
  upToMDL: number;
  factor: number;
}

export interface CalcHourlyRates {
  legal: number;
  financial: number;
  it: number;
}

// ---- Calculator UI strings --------------------------------------------------

export interface CalcServiceStrings {
  label: string;
  description: string;
  rateNote: string;
}

export interface CalcAccountingStrings {
  label: string;
  description: string;
  industryLabel: string;
  invoicesLabel: string;
  revenueLabel: string;
  vatLabel: string;
  baseFromLabel: string;
  /** "{count} invoices above the {free} threshold × {rate} MDL" */
  surchargeNote: string;
  /** "× {factor} for revenue in this band" */
  multiplierNote: string;
}

export interface CalcHourlyServiceStrings extends CalcServiceStrings {
  hoursLabel: string;
}

export interface CalcHrServiceStrings extends CalcServiceStrings {
  employeesLabel: string;
}

export interface CalcResultStrings {
  heading: string;
  perMonth: string;
  /** "≈ {amount} MDL / year" */
  annualLabel: string;
  breakdownTitle: string;
  emptyState: string;
  disclaimer: string;
  cta: string;
}

/** Full prop bag for <PriceCalculator/>: UI copy + pricing engine data. */
export interface CalcConfig {
  eyebrow: string;
  heading: string;
  subtitle: string;
  services: {
    accounting: CalcAccountingStrings;
    legal: CalcHourlyServiceStrings;
    financial: CalcHourlyServiceStrings;
    it: CalcHourlyServiceStrings;
    hr: CalcHrServiceStrings;
  };
  result: CalcResultStrings;
  industries: CalcIndustry[];
  industryGroups: Record<IndustryGroupId, string>;
  hourlyRates: CalcHourlyRates;
  hrPerEmployee: number;
  invoiceSurcharge: CalcInvoiceSurcharge;
  revenueMultipliers: CalcRevenueBucket[];
  vatSurcharge: number;
}

// ---- Calculator state (per togglable service) -------------------------------

export type AccountingState =
  | { enabled: false }
  | {
      enabled: true;
      industryId: string;
      invoices: number;
      revenueMDL: number;
      vat: boolean;
    };

export type HourlyState = { enabled: false } | { enabled: true; hours: number };

export type HrState = { enabled: false } | { enabled: true; employees: number };

export interface CalculatorState {
  accounting: AccountingState;
  legal: HourlyState;
  financial: HourlyState;
  it: HourlyState;
  hr: HrState;
}

// ---- Island-level props -----------------------------------------------------

export interface PricingIslandProps {
  locale: Locale;
  homeLabel?: string;
  pricingLabel?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  labelMonthly: string;
  labelYearly: string;
  estimateNotice: string;
  tiers: Tier[];
  addOnsTitle: string;
  addOns: AddOn[];
  faq: AccordionItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  /** If set, the CTA button renders as a link to this href instead of opening the booking modal. */
  ctaHref?: string;
  notesLine: string;
  calc: CalcConfig;
}
