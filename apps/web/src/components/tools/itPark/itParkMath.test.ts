import { describe, expect, it } from "vitest";
import { compareRegimes } from "./itParkMath";
import { IT_PARK_RATES } from "./rates";

describe("compareRegimes", () => {
  const base = { revenue: 300_000, employees: 5, grossSalary: 30_000, otherExpenses: 30_000 };

  it("applies the per-employee minimum when it exceeds 7% of revenue", () => {
    const { itPark } = compareRegimes(base, IT_PARK_RATES);
    expect(itPark.singleTax).toBe(26_100);
    expect(itPark.minimumApplies).toBe(true);
    expect(itPark.netProfit).toBe(93_900);
    expect(itPark.netSalary).toBe(30_000);
  });

  it("applies 7% of revenue when it exceeds the minimum", () => {
    const { itPark } = compareRegimes({ ...base, revenue: 2_000_000 }, IT_PARK_RATES);
    expect(itPark.singleTax).toBe(140_000);
    expect(itPark.minimumApplies).toBe(false);
  });

  it("computes the standard regime from payroll and profit", () => {
    const { standard, monthlySavings, yearlySavings } = compareRegimes(base, IT_PARK_RATES);
    expect(standard.employerSocial).toBe(36_000);
    expect(standard.healthInsurance).toBe(13_500);
    expect(standard.incomeTax).toBeCloseTo(16_380);
    expect(standard.profitTax).toBeCloseTo(10_080);
    expect(standard.totalTaxes).toBeCloseTo(75_960);
    expect(standard.netSalary).toBeCloseTo(24_024);
    expect(monthlySavings).toBeCloseTo(49_860);
    expect(yearlySavings).toBeCloseTo(598_320);
  });

  it("compares a high-revenue company where 7% exceeds the minimum", () => {
    const { itPark, standard, monthlySavings } = compareRegimes(
      { revenue: 2_000_000, employees: 10, grossSalary: 50_000, otherExpenses: 200_000 },
      IT_PARK_RATES,
    );
    expect(itPark.singleTax).toBeCloseTo(140_000);
    expect(itPark.netProfit).toBeCloseTo(1_160_000);
    expect(standard.employerSocial).toBeCloseTo(120_000);
    expect(standard.healthInsurance).toBeCloseTo(45_000);
    expect(standard.incomeTax).toBeCloseTo(54_600);
    expect(standard.profitTax).toBeCloseTo(141_600);
    expect(standard.totalTaxes).toBeCloseTo(361_200);
    expect(standard.netProfit).toBeCloseTo(1_038_400);
    expect(standard.netSalary).toBeCloseTo(40_040);
    expect(monthlySavings).toBeCloseTo(221_200);
  });

  it("charges no profit tax on a loss", () => {
    const { standard } = compareRegimes({ ...base, revenue: 100_000 }, IT_PARK_RATES);
    expect(standard.profitTax).toBe(0);
    expect(standard.netProfit).toBeLessThan(0);
  });
});
