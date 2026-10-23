import { describe, expect, it } from "vitest";
import { baseRateOn } from "./baseRates";
import {
  calculateLatePayment,
  isIsoDate,
  semesterStart,
  statutoryRate,
  type LatePaymentInput,
} from "./latePaymentMath";

const statutory: LatePaymentInput = {
  principal: 4000,
  dueDate: "2020-10-01",
  paymentDate: "2021-08-09",
  mode: "statutory",
  debtor: "business",
  dailyRate: 0.001,
  capRate: 0,
  payments: [],
};

describe("base rate lookup", () => {
  it("returns the rate in force on a given day", () => {
    expect(baseRateOn("2020-07-01")).toBe(0.0325);
    expect(baseRateOn("2022-08-04")).toBe(0.215);
    expect(baseRateOn("2026-07-01")).toBe(0.07);
  });

  it("uses the rate in force on 1 January or 1 July of the semester", () => {
    expect(semesterStart("2026-06-30")).toBe("2026-01-01");
    expect(semesterStart("2026-10-23")).toBe("2026-07-01");
    expect(statutoryRate("2026-10-23", "business").rate).toBeCloseTo(0.16);
    expect(statutoryRate("2026-03-10", "consumer").rate).toBeCloseTo(0.1);
  });
});

describe("statutory late-payment interest (art. 942)", () => {
  it("reproduces a Supreme Court of Justice calculation split by semester", () => {
    const result = calculateLatePayment(statutory);
    expect(result.days).toBe(312);
    expect(result.periods.map((p) => [p.from, p.to, p.days])).toEqual([
      ["2020-10-02", "2020-12-31", 91],
      ["2021-01-01", "2021-06-30", 181],
      ["2021-07-01", "2021-08-09", 40],
    ]);
    expect(result.periods.map((p) => Math.round(p.rate * 10_000))).toEqual([1225, 1165, 1165]);
    expect(result.amount).toBe(404.32);
    expect(result.totalDue).toBe(4404.32);
  });

  it("applies the consumer margin of 5 points", () => {
    const result = calculateLatePayment({
      ...statutory,
      principal: 10_000,
      dueDate: "2025-12-31",
      paymentDate: "2026-03-01",
      debtor: "consumer",
    });
    expect(result.days).toBe(60);
    expect(result.amount).toBe(164.38);
  });

  it("does not change the rate within a semester when the base rate moves", () => {
    const result = calculateLatePayment({
      ...statutory,
      principal: 100_000,
      dueDate: "2026-06-30",
      paymentDate: "2026-12-31",
    });
    expect(result.periods).toHaveLength(1);
    expect(result.periods[0]?.rate).toBeCloseTo(0.16);
    expect(result.amount).toBe(8065.75);
  });

  it("applies a partial payment to accrued interest first, then principal (art. 875(6))", () => {
    const result = calculateLatePayment({
      ...statutory,
      principal: 10_000,
      dueDate: "2026-07-31",
      paymentDate: "2026-09-30",
      payments: [{ id: "a", date: "2026-08-31", amount: 4000 }],
    });
    expect(result.periods.map((p) => p.days)).toEqual([31, 30]);
    expect(result.periods[1]?.principal).toBeCloseTo(6135.89, 2);
    expect(result.amount).toBe(216.58);
    expect(result.outstanding).toBe(6135.89);
    expect(result.totalDue).toBe(6216.58);
  });

  it("stops accruing once partial payments cover the debt", () => {
    const result = calculateLatePayment({
      ...statutory,
      principal: 1000,
      dueDate: "2026-07-31",
      paymentDate: "2026-09-30",
      payments: [{ id: "a", date: "2026-08-10", amount: 1010 }],
    });
    expect(result.days).toBe(10);
    expect(result.periods).toHaveLength(1);
    expect(result.outstanding).toBe(0);
    expect(result.totalDue).toBe(0);
  });

  it("keeps accruing on the principal left after interest is paid", () => {
    const result = calculateLatePayment({
      ...statutory,
      principal: 1000,
      dueDate: "2026-07-31",
      paymentDate: "2026-09-30",
      payments: [{ id: "a", date: "2026-08-10", amount: 1000 }],
    });
    expect(result.outstanding).toBe(4.38);
    expect(result.totalDue).toBe(4.48);
  });

  it("starts no earlier than 1 March 2019", () => {
    const result = calculateLatePayment({
      ...statutory,
      dueDate: "2018-12-31",
      paymentDate: "2019-03-31",
    });
    expect(result.clippedFrom).toBe("2019-03-01");
    expect(result.days).toBe(31);
    expect(result.periods[0]?.baseRate).toBe(0.065);
  });

  it("flags semesters whose base rate is not yet known", () => {
    const result = calculateLatePayment({ ...statutory, paymentDate: "2027-02-01" });
    expect(result.estimated).toBe(true);
    expect(result.periods.at(-1)?.estimated).toBe(true);
  });
});

describe("contractual penalty", () => {
  const contractual: LatePaymentInput = {
    ...statutory,
    principal: 50_000,
    dueDate: "2026-09-01",
    paymentDate: "2026-10-01",
    mode: "contractual",
  };

  it("charges a daily percentage of the unpaid amount", () => {
    const result = calculateLatePayment(contractual);
    expect(result.days).toBe(30);
    expect(result.amount).toBe(1500);
    expect(result.periods).toHaveLength(1);
  });

  it("stops at the cap", () => {
    const result = calculateLatePayment({ ...contractual, capRate: 0.02 });
    expect(result.amount).toBe(1000);
    expect(result.capAmount).toBe(1000);
    expect(result.capped).toBe(true);
    expect(result.days).toBe(30);
  });

  it("splits at partial payments", () => {
    const result = calculateLatePayment({
      ...contractual,
      payments: [{ id: "a", date: "2026-09-10", amount: 20_000 }],
    });
    expect(result.periods.map((p) => [p.days, p.principal])).toEqual([
      [9, 50_000],
      [21, 30_450],
    ]);
    expect(result.amount).toBe(1089.45);
    expect(result.outstanding).toBe(30_450);
    expect(result.totalDue).toBe(31_089.45);
  });
});

describe("invalid input", () => {
  it("returns an empty result for missing dates or a zero debt", () => {
    expect(calculateLatePayment({ ...statutory, dueDate: "" }).valid).toBe(false);
    expect(calculateLatePayment({ ...statutory, principal: 0 }).valid).toBe(false);
    expect(isIsoDate("2026-02-30")).toBe(false);
  });

  it("returns zero when payment is on or before the due date", () => {
    const result = calculateLatePayment({ ...statutory, paymentDate: "2020-10-01" });
    expect(result.days).toBe(0);
    expect(result.amount).toBe(0);
  });
});
