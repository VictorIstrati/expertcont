import type {
  CalculatorState,
  CalcConfig,
  CalcIndustry,
  CalcInvoiceSurcharge,
  CalcRevenueBucket,
} from "./types";

export type BreakdownKey = "accounting" | "legal" | "financial" | "it" | "hr";

/** Per-service input parameters captured at the moment the breakdown was built.
 *  Sent to the backend so staff can see exactly what the customer configured. */
export type BreakdownParams =
  | { key: "accounting"; industry: string; invoices: number; revenueMDL: number; vat: boolean }
  | { key: "hr"; employees: number; perEmployee: number }
  | { key: "legal"; hours: number; hourlyRate: number }
  | { key: "financial"; hours: number; hourlyRate: number }
  | { key: "it"; hours: number; hourlyRate: number };

export interface BreakdownItem {
  key: BreakdownKey;
  /** Service label, locale-resolved. */
  label: string;
  /** Optional secondary line (e.g. industry name, "10h × 500 MDL"). */
  detail?: string;
  /** Structured per-service inputs (industry / invoices / hours / etc). */
  params?: BreakdownParams;
  /** Subtotal AFTER any promo discount — what the customer actually pays. */
  subtotal: number;
  /** Subtotal BEFORE the discount (only set when a promo applies). */
  originalSubtotal?: number;
  /** Promo percentage off, 0–100 (only set when a promo applies). */
  discountPct?: number;
  /** How many months the promo lasts (only set when a promo applies). */
  saleMonths?: number;
}

/** When an industry has a promo without an explicit duration, this is the fallback. */
export const DEFAULT_SALE_MONTHS = 6;

export interface Breakdown {
  items: BreakdownItem[];
  total: number;
}

/** Round to the nearest 10 — keeps quotes from looking spuriously precise. */
const roundTo10 = (n: number): number => Math.round(n / 10) * 10;

/** Pick the first revenue bucket whose `upToMDL` >= the given revenue. */
function pickRevenueBucket(revenueMDL: number, buckets: CalcRevenueBucket[]): CalcRevenueBucket {
  return (
    buckets.find((b) => revenueMDL <= b.upToMDL) ??
    (buckets[buckets.length - 1] as CalcRevenueBucket)
  );
}

export interface AccountingComputation {
  industry: CalcIndustry;
  base: number;
  surcharge: number;
  bucket: CalcRevenueBucket;
  /** Subtotal before any promo discount. */
  preDiscount: number;
  /** Subtotal the customer actually pays (after promo). */
  subtotal: number;
  /** Discount percentage, if any. */
  discountPct?: number;
  /** Promo duration in months, if any. */
  saleMonths?: number;
}

export function computeAccounting(
  industry: CalcIndustry,
  invoices: number,
  revenueMDL: number,
  surchargeCfg: CalcInvoiceSurcharge,
  buckets: CalcRevenueBucket[],
  vat: boolean,
  vatSurcharge: number,
): AccountingComputation {
  const extra = Math.max(0, invoices - surchargeCfg.freeUpTo);
  const surcharge = extra * surchargeCfg.perExtra;
  const bucket = pickRevenueBucket(revenueMDL, buckets);
  const vatAdd = vat ? vatSurcharge : 0;
  const preDiscount = roundTo10((industry.base + surcharge + vatAdd) * bucket.factor);
  const hasSale = industry.salePct !== undefined && industry.salePct > 0;
  const subtotal = hasSale
    ? roundTo10(preDiscount * (1 - (industry.salePct as number) / 100))
    : preDiscount;
  return {
    industry,
    base: industry.base,
    surcharge,
    bucket,
    preDiscount,
    subtotal,
    ...(hasSale && {
      discountPct: industry.salePct,
      saleMonths: industry.saleMonths ?? DEFAULT_SALE_MONTHS,
    }),
  };
}

/**
 * Compute the full estimate from current calculator state.
 * Pure function — easy to unit-test, no React state, no DOM.
 */
export function computeBreakdown(state: CalculatorState, cfg: CalcConfig): Breakdown {
  const items: BreakdownItem[] = [];

  if (state.accounting.enabled) {
    const { industryId, invoices, revenueMDL, vat } = state.accounting;
    const industry = cfg.industries.find((i) => i.id === industryId);
    if (industry) {
      const comp = computeAccounting(
        industry,
        invoices,
        revenueMDL,
        cfg.invoiceSurcharge,
        cfg.revenueMultipliers,
        vat,
        cfg.vatSurcharge,
      );
      items.push({
        key: "accounting",
        label: cfg.services.accounting.label,
        detail: industry.label,
        params: {
          key: "accounting",
          industry: industry.label,
          invoices,
          revenueMDL,
          vat,
        },
        subtotal: comp.subtotal,
        ...(comp.discountPct !== undefined && {
          originalSubtotal: comp.preDiscount,
          discountPct: comp.discountPct,
          saleMonths: comp.saleMonths,
        }),
      });
    }
  }

  if (state.hr.enabled && state.hr.employees > 0) {
    items.push({
      key: "hr",
      label: cfg.services.hr.label,
      detail: `${state.hr.employees} × ${cfg.hrPerEmployee} MDL`,
      params: { key: "hr", employees: state.hr.employees, perEmployee: cfg.hrPerEmployee },
      subtotal: state.hr.employees * cfg.hrPerEmployee,
    });
  }

  if (state.legal.enabled && state.legal.hours > 0) {
    items.push({
      key: "legal",
      label: cfg.services.legal.label,
      detail: `${state.legal.hours}h × ${cfg.hourlyRates.legal} MDL`,
      params: { key: "legal", hours: state.legal.hours, hourlyRate: cfg.hourlyRates.legal },
      subtotal: state.legal.hours * cfg.hourlyRates.legal,
    });
  }

  if (state.financial.enabled && state.financial.hours > 0) {
    items.push({
      key: "financial",
      label: cfg.services.financial.label,
      detail: `${state.financial.hours}h × ${cfg.hourlyRates.financial} MDL`,
      params: {
        key: "financial",
        hours: state.financial.hours,
        hourlyRate: cfg.hourlyRates.financial,
      },
      subtotal: state.financial.hours * cfg.hourlyRates.financial,
    });
  }

  if (state.it.enabled && state.it.hours > 0) {
    items.push({
      key: "it",
      label: cfg.services.it.label,
      detail: `${state.it.hours}h × ${cfg.hourlyRates.it} MDL`,
      params: { key: "it", hours: state.it.hours, hourlyRate: cfg.hourlyRates.it },
      subtotal: state.it.hours * cfg.hourlyRates.it,
    });
  }

  return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
}

/** Initial collapsed state (everything off). */
export const initialCalculatorState: CalculatorState = {
  accounting: { enabled: false },
  legal: { enabled: false },
  financial: { enabled: false },
  it: { enabled: false },
  hr: { enabled: false },
};

/** Sensible defaults shown when the user enables a service. */
export const DEFAULTS = {
  accountingInvoices: 5,
  accountingRevenueMDL: 500_000,
  legalHours: 1,
  financialHours: 1,
  itHours: 1,
  hrEmployees: 1,
} as const;

/** Substitute `{key}` placeholders in a template string with `vars[key]`. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key) => {
    const value = vars[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}
