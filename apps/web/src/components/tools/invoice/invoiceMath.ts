export const VAT_RATES = [0.2, 0.08, 0] as const;

export interface InvoiceItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  vatRate: number;
}

export interface InvoiceLine {
  net: number;
  vat: number;
  gross: number;
}

export interface InvoiceTotals {
  lines: InvoiceLine[];
  net: number;
  vat: number;
  gross: number;
  vatByRate: { rate: number; base: number; vat: number }[];
}

export function parseAmount(raw: string): number {
  const s = raw.replace(/\s/g, "");
  const last = Math.max(s.lastIndexOf(","), s.lastIndexOf("."));
  if (last === -1) return Number(s) || 0;
  const sep = s.charAt(last);
  const repeated = s.split(sep).length > 2;
  const intPart = (repeated ? s : s.slice(0, last)).replace(/[.,]/g, "");
  const n = repeated ? Number(intPart) : Number(`${intPart}.${s.slice(last + 1)}`);
  return Number.isFinite(n) ? n : 0;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function computeTotals(items: InvoiceItem[], vatPayer: boolean): InvoiceTotals {
  const byRate = new Map<number, { base: number; vat: number }>();
  const lines = items.map((item) => {
    const net = round2(Math.max(0, item.quantity) * Math.max(0, item.price));
    const rate = vatPayer ? item.vatRate : 0;
    const vat = round2(net * rate);
    if (vatPayer) {
      const bucket = byRate.get(rate) ?? { base: 0, vat: 0 };
      byRate.set(rate, { base: round2(bucket.base + net), vat: round2(bucket.vat + vat) });
    }
    return { net, vat, gross: round2(net + vat) };
  });
  const net = round2(lines.reduce((sum, l) => sum + l.net, 0));
  const vat = round2(lines.reduce((sum, l) => sum + l.vat, 0));
  return {
    lines,
    net,
    vat,
    gross: round2(net + vat),
    vatByRate: [...byRate.entries()]
      .map(([rate, v]) => ({ rate, ...v }))
      .sort((a, b) => b.rate - a.rate),
  };
}
