import yaml from "yaml";
import { z } from "astro:content";
import type { Locale } from "@expertcont/i18n";
import type { PricingIslandProps } from "../components/pricing/PricingIsland";
// Vite inlines the raw text at build time; site.yml is parsed once at module load.
import raw from "./site.yml?raw";

const localized = z.object({ ro: z.string(), ru: z.string(), en: z.string() });
const localizedArr3 = z.object({
  ro: z.array(z.string()).length(3),
  ru: z.array(z.string()).length(3),
  en: z.array(z.string()).length(3),
});
const localizedArr4 = z.object({
  ro: z.array(z.string()).length(4),
  ru: z.array(z.string()).length(4),
  en: z.array(z.string()).length(4),
});

const tier = z.object({
  id: z.string(),
  price: z.number(),
  popular: z.boolean().optional(),
  name: localized,
  period: localized,
  desc: localized,
  features: z.array(localized),
  cta: localized,
});

const SiteSchema = z.object({
  business: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.object({
      street: localized,
      city: localized,
      postalCode: z.string(),
      /** ISO 3166-1 alpha-2 (e.g. "MD"). */
      countryCode: z.string().length(2),
      countryName: localized,
    }),
    hours: localized,
  }),
  pricing: z.object({
    eyebrow: localized,
    title: localized,
    subtitle: localized,
    labelMonthly: localized,
    labelYearly: localized,
    calc: z.object({
      calcTitle: localized,
      calcHeading: localized,
      calcSubtitle: localized,
      calcLegalForm: localized,
      calcLegalOpts: localizedArr3,
      calcDocs: localized,
      calcEmployees: localized,
      calcVat: localized,
      calcServices: localized,
      calcAddServices: localizedArr4,
      calcEstimateLabel: localized,
      calcDisclaimer: localized,
      calcRequestOffer: localized,
      calcPerMonth: localized,
    }),
    tiers: z.array(tier),
    addOnsTitle: localized,
    addOns: z.array(z.object({ name: localized, price: z.string() })),
    faq: z.array(z.object({ q: localized, a: localized })),
    ctaTitle: localized,
    ctaSubtitle: localized,
    ctaButton: localized,
    notesLine: localized,
  }),
});

export type Site = z.infer<typeof SiteSchema>;

export const site: Site = SiteSchema.parse(yaml.parse(raw));

/** Resolve a localized field to its string (or array) for a given locale. */
export function pick<T>(field: { ro: T; ru: T; en: T }, locale: Locale): T {
  return field[locale];
}

/** Tel-link-safe phone number (digits and leading +). */
export const phoneTel = site.business.phone.replace(/[^+\d]/g, "");

/** "Street, City" — short form for footer and inline contact rows. */
export function addressShort(locale: Locale): string {
  const a = site.business.address;
  return `${pick(a.street, locale)}, ${pick(a.city, locale)}`;
}

/** "Street, City, Postal, Country" — long form for contact page header. */
export function addressFull(locale: Locale): string {
  const a = site.business.address;
  return `${pick(a.street, locale)}, ${pick(a.city, locale)}, ${a.postalCode}, ${pick(a.countryName, locale)}`;
}

/** Build the prop bag for <PricingIsland /> in the given locale. */
export function buildPricingProps(locale: Locale): Omit<PricingIslandProps, "locale"> {
  const p = site.pricing;
  return {
    eyebrow: pick(p.eyebrow, locale),
    title: pick(p.title, locale),
    subtitle: pick(p.subtitle, locale),
    labelMonthly: pick(p.labelMonthly, locale),
    labelYearly: pick(p.labelYearly, locale),
    calc: {
      calcTitle: pick(p.calc.calcTitle, locale),
      calcHeading: pick(p.calc.calcHeading, locale),
      calcSubtitle: pick(p.calc.calcSubtitle, locale),
      calcLegalForm: pick(p.calc.calcLegalForm, locale),
      calcLegalOpts: pick(p.calc.calcLegalOpts, locale) as [string, string, string],
      calcDocs: pick(p.calc.calcDocs, locale),
      calcEmployees: pick(p.calc.calcEmployees, locale),
      calcVat: pick(p.calc.calcVat, locale),
      calcServices: pick(p.calc.calcServices, locale),
      calcAddServices: pick(p.calc.calcAddServices, locale) as [string, string, string, string],
      calcEstimateLabel: pick(p.calc.calcEstimateLabel, locale),
      calcDisclaimer: pick(p.calc.calcDisclaimer, locale),
      calcRequestOffer: pick(p.calc.calcRequestOffer, locale),
      calcPerMonth: pick(p.calc.calcPerMonth, locale),
    },
    tiers: p.tiers.map((t) => ({
      name: pick(t.name, locale),
      price: t.price,
      period: pick(t.period, locale),
      desc: pick(t.desc, locale),
      features: t.features.map((f) => pick(f, locale)),
      cta: pick(t.cta, locale),
      popular: t.popular,
    })),
    addOnsTitle: pick(p.addOnsTitle, locale),
    addOns: p.addOns.map((a) => ({ name: pick(a.name, locale), price: a.price })),
    faq: p.faq.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })),
    ctaTitle: pick(p.ctaTitle, locale),
    ctaSubtitle: pick(p.ctaSubtitle, locale),
    ctaButton: pick(p.ctaButton, locale),
    notesLine: pick(p.notesLine, locale),
  };
}
