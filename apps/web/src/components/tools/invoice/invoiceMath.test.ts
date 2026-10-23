import { describe, expect, it } from "vitest";
import { computeTotals, parseAmount, type InvoiceItem } from "./invoiceMath";
import { formatIban, isValidIban, isValidIdno } from "./validation";

function item(quantity: number, price: number, vatRate = 0.2): InvoiceItem {
  return { id: String(Math.random()), description: "x", unit: "buc.", quantity, price, vatRate };
}

describe("computeTotals", () => {
  it("ignores VAT for non-VAT payers", () => {
    const t = computeTotals([item(2, 100), item(1, 50.5)], false);
    expect(t).toMatchObject({ net: 250.5, vat: 0, gross: 250.5, vatByRate: [] });
  });

  it("groups VAT by rate for VAT payers", () => {
    const t = computeTotals([item(1, 100, 0.2), item(3, 10, 0.08), item(1, 50, 0.2)], true);
    expect(t.net).toBe(180);
    expect(t.vat).toBe(32.4);
    expect(t.gross).toBe(212.4);
    expect(t.vatByRate).toEqual([
      { rate: 0.2, base: 150, vat: 30 },
      { rate: 0.08, base: 30, vat: 2.4 },
    ]);
  });

  it("rounds each line to cents", () => {
    const t = computeTotals([item(3, 0.335, 0.2)], true);
    expect(t.lines[0]).toEqual({ net: 1.01, vat: 0.2, gross: 1.21 });
  });

  it("treats negative inputs as zero", () => {
    expect(computeTotals([item(-1, 100)], true).gross).toBe(0);
  });
});

describe("validation", () => {
  it("accepts a valid IBAN and rejects a mistyped one", () => {
    expect(isValidIban("GB82 WEST 1234 5698 7654 32")).toBe(true);
    expect(isValidIban("GB82 WEST 1234 5698 7654 33")).toBe(false);
  });

  it("requires 24 characters for Moldovan IBANs", () => {
    expect(isValidIban("MD24AG000225100013104168")).toBe(true);
    expect(isValidIban("MD24AG00022510001310416")).toBe(false);
  });

  it("formats IBAN in groups of four", () => {
    expect(formatIban("md24ag000225100013104168")).toBe("MD24 AG00 0225 1000 1310 4168");
  });

  it("requires a 13-digit IDNO", () => {
    expect(isValidIdno("1003600123456")).toBe(true);
    expect(isValidIdno("100360012345")).toBe(false);
    expect(isValidIdno("10036001234ab")).toBe(false);
  });
});

describe("parseAmount", () => {
  it.each([
    ["", 0],
    ["1250", 1250],
    ["1250.5", 1250.5],
    ["1250,5", 1250.5],
    ["1.250,50", 1250.5],
    ["1,250.50", 1250.5],
    ["1 250,50", 1250.5],
    ["1.250.000", 1250000],
    ["1,250,000", 1250000],
    ["0,335", 0.335],
    ["12.", 12],
  ])("%s → %d", (raw, expected) => {
    expect(parseAmount(raw)).toBe(expected);
  });
});
