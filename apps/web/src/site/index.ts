import yaml from "yaml";
import { z } from "astro:content";
import type { Locale } from "@expertcont/i18n";
import type { PricingIslandProps } from "../components/pricing/PricingIsland";
// Vite inlines the raw text at build time; both YAMLs are parsed once at module load.
import siteRaw from "./site.yml?raw";
import pricingRaw from "./pricing.yml?raw";

const localized = z.object({ ro: z.string(), ru: z.string(), en: z.string() });

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

// ----- Calculator strings (UI copy only — numeric rates live in pricing.yml) -
const calcServiceCommon = z.object({
  label: localized,
  description: localized,
  rateNote: localized,
});

const calculatorStrings = z.object({
  eyebrow: localized,
  heading: localized,
  subtitle: localized,
  services: z.object({
    accounting: z.object({
      label: localized,
      description: localized,
      industryLabel: localized,
      invoicesLabel: localized,
      revenueLabel: localized,
      vatLabel: localized,
      baseFromLabel: localized,
      surchargeNote: localized,
      multiplierNote: localized,
    }),
    legal: calcServiceCommon.extend({ hoursLabel: localized }),
    financial: calcServiceCommon.extend({ hoursLabel: localized }),
    it: calcServiceCommon.extend({ hoursLabel: localized }),
    hr: calcServiceCommon.extend({ employeesLabel: localized }),
  }),
  result: z.object({
    heading: localized,
    perMonth: localized,
    annualLabel: localized,
    breakdownTitle: localized,
    emptyState: localized,
    disclaimer: localized,
    cta: localized,
  }),
});

const SiteSchema = z.object({
  business: z.object({
    name: z.string(),
    foundingDate: z.string(),
    employees: z.object({ min: z.number().int().positive(), max: z.number().int().positive() }),
    slogan: z.string(),
    phone: z.string(),
    email: z.string().email(),
    telegram: z.string(),
    socials: z.object({
      facebook: z.string(),
      linkedin: z.string(),
      instagram: z.string(),
    }),
    address: z.object({
      street: localized,
      city: localized,
      postalCode: z.string(),
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
    estimateNotice: localized,
    intro: z.object({
      eyebrow: localized,
      title: localized,
      paragraphs: z.array(z.object({ heading: localized, body: localized })),
    }),
    calculator: calculatorStrings,
    tiers: z.array(tier),
    addOnsTitle: localized,
    addOns: z.array(z.object({ name: localized, price: z.string() })),
    faq: z.array(z.object({ q: localized, a: localized })),
    ctaTitle: localized,
    ctaSubtitle: localized,
    ctaButton: localized,
    /** Anchor or URL the CTA button links to. Locale-invariant. */
    ctaHref: z.string(),
    notesLine: localized,
  }),
});

// ----- Pricing engine constants (pricing.yml) ---------------------------------
const industryGroupId = z.enum(["noactivity", "services", "trade", "it", "specific"]);

const industry = z.object({
  id: z.string(),
  group: industryGroupId,
  base: z.number().int().positive(),
  label: localized,
  /** Optional promotional discount, 0–100, applied to the full accounting subtotal. */
  salePct: z.number().int().min(0).max(100).optional(),
  /** How many months the discount lasts. Defaults to 6 (DEFAULT_SALE_MONTHS) when omitted. */
  saleMonths: z.number().int().positive().optional(),
});

const PricingConfigSchema = z.object({
  industries: z.array(industry),
  industryGroups: z.record(industryGroupId, localized),
  invoiceSurcharge: z.object({
    freeUpTo: z.number().int().nonnegative(),
    perExtra: z.number().int().positive(),
  }),
  revenueMultipliers: z
    .array(
      z.object({
        upToMDL: z.number().int().positive(),
        factor: z.number().positive(),
      }),
    )
    .min(1),
  hourlyRates: z.object({
    legal: z.number().int().positive(),
    financial: z.number().int().positive(),
    it: z.number().int().positive(),
  }),
  hrPerEmployee: z.number().int().positive(),
  vatSurcharge: z.number().int().nonnegative(),
});

export type Site = z.infer<typeof SiteSchema>;
export type PricingConfig = z.infer<typeof PricingConfigSchema>;
export type IndustryGroupId = z.infer<typeof industryGroupId>;

export const site: Site = SiteSchema.parse(yaml.parse(siteRaw));
export const pricingConfig: PricingConfig = PricingConfigSchema.parse(yaml.parse(pricingRaw));

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
  const c = p.calculator;
  return {
    eyebrow: pick(p.eyebrow, locale),
    title: pick(p.title, locale),
    subtitle: pick(p.subtitle, locale),
    labelMonthly: pick(p.labelMonthly, locale),
    labelYearly: pick(p.labelYearly, locale),
    estimateNotice: pick(p.estimateNotice, locale),
    intro: {
      eyebrow: pick(p.intro.eyebrow, locale),
      title: pick(p.intro.title, locale),
      paragraphs: p.intro.paragraphs.map((para) => ({
        heading: pick(para.heading, locale),
        body: pick(para.body, locale),
      })),
    },
    calc: {
      eyebrow: pick(c.eyebrow, locale),
      heading: pick(c.heading, locale),
      subtitle: pick(c.subtitle, locale),
      services: {
        accounting: {
          label: pick(c.services.accounting.label, locale),
          description: pick(c.services.accounting.description, locale),
          industryLabel: pick(c.services.accounting.industryLabel, locale),
          invoicesLabel: pick(c.services.accounting.invoicesLabel, locale),
          revenueLabel: pick(c.services.accounting.revenueLabel, locale),
          vatLabel: pick(c.services.accounting.vatLabel, locale),
          baseFromLabel: pick(c.services.accounting.baseFromLabel, locale),
          surchargeNote: pick(c.services.accounting.surchargeNote, locale),
          multiplierNote: pick(c.services.accounting.multiplierNote, locale),
        },
        legal: {
          label: pick(c.services.legal.label, locale),
          description: pick(c.services.legal.description, locale),
          hoursLabel: pick(c.services.legal.hoursLabel, locale),
          rateNote: pick(c.services.legal.rateNote, locale),
        },
        financial: {
          label: pick(c.services.financial.label, locale),
          description: pick(c.services.financial.description, locale),
          hoursLabel: pick(c.services.financial.hoursLabel, locale),
          rateNote: pick(c.services.financial.rateNote, locale),
        },
        it: {
          label: pick(c.services.it.label, locale),
          description: pick(c.services.it.description, locale),
          hoursLabel: pick(c.services.it.hoursLabel, locale),
          rateNote: pick(c.services.it.rateNote, locale),
        },
        hr: {
          label: pick(c.services.hr.label, locale),
          description: pick(c.services.hr.description, locale),
          employeesLabel: pick(c.services.hr.employeesLabel, locale),
          rateNote: pick(c.services.hr.rateNote, locale),
        },
      },
      result: {
        heading: pick(c.result.heading, locale),
        perMonth: pick(c.result.perMonth, locale),
        annualLabel: pick(c.result.annualLabel, locale),
        breakdownTitle: pick(c.result.breakdownTitle, locale),
        emptyState: pick(c.result.emptyState, locale),
        disclaimer: pick(c.result.disclaimer, locale),
        cta: pick(c.result.cta, locale),
      },
      industries: pricingConfig.industries.map((i) => ({
        id: i.id,
        group: i.group,
        base: i.base,
        label: pick(i.label, locale),
        ...(i.salePct !== undefined && { salePct: i.salePct }),
        ...(i.saleMonths !== undefined && { saleMonths: i.saleMonths }),
      })),
      industryGroups: (
        Object.entries(pricingConfig.industryGroups) as [
          IndustryGroupId,
          { ro: string; ru: string; en: string },
        ][]
      ).reduce(
        (acc, [key, value]) => {
          acc[key] = pick(value, locale);
          return acc;
        },
        {} as Record<IndustryGroupId, string>,
      ),
      hourlyRates: pricingConfig.hourlyRates,
      hrPerEmployee: pricingConfig.hrPerEmployee,
      invoiceSurcharge: pricingConfig.invoiceSurcharge,
      revenueMultipliers: pricingConfig.revenueMultipliers,
      vatSurcharge: pricingConfig.vatSurcharge,
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
    ctaHref: p.ctaHref,
    notesLine: pick(p.notesLine, locale),
  };
}
