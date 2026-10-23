export type VatRateKind = "standard" | "reduced" | "upcoming" | "zero";

export interface VatRateOption {
  rate: number;
  kind: VatRateKind;
  effectiveFromYear?: number;
}

export const VAT_YEAR = 2026;

export const VAT_STANDARD_RATE = 0.2;
export const VAT_REDUCED_RATE = 0.08;
export const VAT_HORECA_RATE_2027 = 0.12;
export const VAT_ZERO_RATE = 0;

export const VAT_RATE_OPTIONS: VatRateOption[] = [
  { rate: VAT_STANDARD_RATE, kind: "standard" },
  { rate: VAT_REDUCED_RATE, kind: "reduced" },
  { rate: VAT_HORECA_RATE_2027, kind: "upcoming", effectiveFromYear: 2027 },
  { rate: VAT_ZERO_RATE, kind: "zero" },
];
