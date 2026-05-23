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

export interface CalcStrings {
  /** eyebrow above the h2 */
  calcTitle: string;
  /** h2 */
  calcHeading: string;
  /** paragraph below h2 */
  calcSubtitle: string;
  /** label: legal form selector */
  calcLegalForm: string;
  /** 3 options for legal form */
  calcLegalOpts: [string, string, string];
  /** label: documents/month slider */
  calcDocs: string;
  /** label: employees slider */
  calcEmployees: string;
  /** label: VAT checkbox */
  calcVat: string;
  /** label: additional services section */
  calcServices: string;
  /** 4 extra service checkboxes */
  calcAddServices: [string, string, string, string];
  /** small label above the price in the result panel */
  calcEstimateLabel: string;
  /** disclaimer below price */
  calcDisclaimer: string;
  /** CTA button */
  calcRequestOffer: string;
  /** MDL / month suffix */
  calcPerMonth: string;
}

export interface PricingIslandProps {
  locale: Locale;
  homeLabel?: string;
  pricingLabel?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  labelMonthly: string;
  labelYearly: string;
  tiers: Tier[];
  addOnsTitle: string;
  addOns: AddOn[];
  faq: AccordionItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  notesLine: string;
  calc: CalcStrings;
}
