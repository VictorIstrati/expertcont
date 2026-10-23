import { describe, expect, it } from "vitest";
import type { PayrollRates } from "../payroll/rates";
import { NO_EXEMPTIONS } from "../payroll/payrollMath";
import {
  comparePayouts,
  dividendRoute,
  maxGrossForBudget,
  mixRoute,
  salaryRoute,
} from "./dividendMath";
import type { DividendRates } from "./rates";

const payroll: PayrollRates = {
  year: 2026,
  employerSocialRate: 0.24,
  employeeSocialRate: 0,
  healthInsuranceRate: 0.09,
  incomeTaxRate: 0.12,
  personalExemptionYearly: 0,
  increasedPersonalExemptionYearly: 0,
  personalExemptionIncomeCeiling: 0,
  spouseExemptionYearly: 0,
  dependantExemptionYearly: 0,
  disabledDependantExemptionYearly: 0,
  dependantIncomeLimitYearly: 0,
};

const rates: DividendRates = {
  year: 2026,
  profitTaxRate: 0.12,
  dividendTaxRate: 0.06,
  minimumWage: 6300,
  upcomingYear: 2027,
  upcomingDividendTaxRate: 0.08,
};

const budget = 1_488_000;

describe("dividendRoute", () => {
  it("charges profit tax, then dividend tax on the remainder", () => {
    const r = dividendRoute(budget, rates);
    expect(r.profitTax).toBe(178_560);
    expect(r.dividend).toBe(1_309_440);
    expect(r.dividendTax).toBe(78_566.4);
    expect(r.net).toBe(1_230_873.6);
    expect(r.taxes).toBe(257_126.4);
    expect(r.effectiveRate).toBeCloseTo(0.1728);
  });

  it("returns zeros without NaN for an empty budget", () => {
    const r = dividendRoute(0, rates);
    expect(r.net).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });
});

describe("salaryRoute", () => {
  it("treats the budget as the full employer cost", () => {
    expect(maxGrossForBudget(124_000, payroll)).toBe(100_000);
    const r = salaryRoute(budget, NO_EXEMPTIONS, payroll);
    expect(r.monthly.gross).toBe(100_000);
    expect(r.monthly.net).toBe(80_080);
    expect(r.budget).toBe(budget);
    expect(r.net).toBe(960_960);
    expect(r.employerSocial).toBe(288_000);
    expect(r.healthInsurance).toBe(108_000);
    expect(r.incomeTax).toBe(131_040);
    expect(r.taxes).toBe(527_040);
  });

  it("never exceeds the budget when the gross does not divide evenly", () => {
    const r = salaryRoute(1_000_000, NO_EXEMPTIONS, payroll);
    expect(r.budget).toBeLessThanOrEqual(1_000_000);
    expect(1_000_000 - r.budget).toBeLessThan(1);
  });
});

describe("mixRoute", () => {
  it("pays the chosen salary and distributes the rest as dividends", () => {
    const r = mixRoute(
      { yearlyBudget: budget, mixGrossMonthly: 6300 },
      NO_EXEMPTIONS,
      payroll,
      rates,
    );
    expect(r.salary.monthly.net).toBe(5_045.04);
    expect(r.salary.budget).toBe(93_744);
    expect(r.dividends.budget).toBe(1_394_256);
    expect(r.dividends.net).toBe(1_153_328.56);
    expect(r.net).toBe(1_213_869.04);
  });

  it("caps the salary at what the budget can pay", () => {
    const r = mixRoute(
      { yearlyBudget: 50_000, mixGrossMonthly: 6300 },
      NO_EXEMPTIONS,
      payroll,
      rates,
    );
    expect(r.salary.monthly.gross).toBe(maxGrossForBudget(50_000 / 12, payroll));
    expect(r.dividends.budget).toBeLessThan(1);
  });
});

describe("comparePayouts", () => {
  it("ranks the options by net income to the owner", () => {
    const r = comparePayouts(
      { yearlyBudget: budget, mixGrossMonthly: 6300 },
      NO_EXEMPTIONS,
      payroll,
      rates,
    );
    expect(r.best).toBe("dividends");
    expect(r.runnerUp).toBe("mix");
    expect(r.advantage).toBe(17_004.56);
  });

  it("lets salary win when payroll taxes are lower than profit plus dividend tax", () => {
    const light: PayrollRates = {
      ...payroll,
      employerSocialRate: 0,
      healthInsuranceRate: 0,
      incomeTaxRate: 0.1,
    };
    const r = comparePayouts(
      { yearlyBudget: budget, mixGrossMonthly: 6300 },
      NO_EXEMPTIONS,
      light,
      rates,
    );
    expect(r.best).toBe("salary");
  });
});
