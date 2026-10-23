import { describe, expect, it } from "vitest";
import { computeVat, extractFraction } from "./vatMath";

describe("computeVat — add", () => {
  it.each([
    [1000, 0.2, { net: 1000, vat: 200, gross: 1200 }],
    [1000, 0.08, { net: 1000, vat: 80, gross: 1080 }],
    [1000, 0.12, { net: 1000, vat: 120, gross: 1120 }],
    [1000, 0, { net: 1000, vat: 0, gross: 1000 }],
    [99.99, 0.2, { net: 99.99, vat: 20, gross: 119.99 }],
    [0.05, 0.2, { net: 0.05, vat: 0.01, gross: 0.06 }],
  ])("%d at %d", (amount, rate, expected) => {
    expect(computeVat(amount, rate, "add")).toEqual(expected);
  });
});

describe("computeVat — extract", () => {
  it.each([
    [1200, 0.2, { net: 1000, vat: 200, gross: 1200 }],
    [1080, 0.08, { net: 1000, vat: 80, gross: 1080 }],
    [1000, 0.2, { net: 833.33, vat: 166.67, gross: 1000 }],
    [1000, 0.08, { net: 925.93, vat: 74.07, gross: 1000 }],
    [1000, 0, { net: 1000, vat: 0, gross: 1000 }],
  ])("%d at %d", (amount, rate, expected) => {
    expect(computeVat(amount, rate, "extract")).toEqual(expected);
  });

  it("keeps net + vat equal to gross", () => {
    for (const amount of [1, 7.77, 123.45, 9999.99, 1_234_567.89]) {
      const r = computeVat(amount, 0.2, "extract");
      expect(Math.round((r.net + r.vat) * 100)).toBe(Math.round(r.gross * 100));
    }
  });

  it("round-trips an added amount", () => {
    const added = computeVat(4321.5, 0.2, "add");
    expect(computeVat(added.gross, 0.2, "extract")).toEqual(added);
  });
});

describe("computeVat — guards", () => {
  it("treats negative and non-finite input as zero", () => {
    expect(computeVat(-50, 0.2, "add")).toEqual({ net: 0, vat: 0, gross: 0 });
    expect(computeVat(Number.NaN, 0.2, "extract")).toEqual({ net: 0, vat: 0, gross: 0 });
  });
});

describe("extractFraction", () => {
  it("gives 1/6 for 20%", () => {
    expect(extractFraction(0.2)).toBeCloseTo(1 / 6, 10);
  });
});
