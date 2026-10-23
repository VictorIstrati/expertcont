import { round2 } from "../invoice/invoiceMath";

export type VatMode = "add" | "extract";

export interface VatResult {
  net: number;
  vat: number;
  gross: number;
}

export function extractFraction(rate: number): number {
  return rate / (1 + rate);
}

export function computeVat(amount: number, rate: number, mode: VatMode): VatResult {
  const base = Number.isFinite(amount) ? round2(Math.max(0, amount)) : 0;
  const r = Number.isFinite(rate) ? Math.max(0, rate) : 0;
  if (mode === "add") {
    const vat = round2(base * r);
    return { net: base, vat, gross: round2(base + vat) };
  }
  const vat = round2(base * extractFraction(r));
  return { net: round2(base - vat), vat, gross: base };
}
