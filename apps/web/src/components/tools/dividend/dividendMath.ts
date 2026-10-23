import { grossToNet, type PayrollBreakdown, type PayrollOptions } from "../payroll/payrollMath";
import type { PayrollRates } from "../payroll/rates";
import type { DividendRates } from "./rates";

export type PayoutOption = "dividends" | "salary" | "mix";

export interface DividendInput {
  yearlyBudget: number;
  mixGrossMonthly: number;
}

export interface DividendRoute {
  budget: number;
  profitTax: number;
  dividend: number;
  dividendTax: number;
  net: number;
  taxes: number;
  effectiveRate: number;
}

export interface SalaryRoute {
  budget: number;
  monthly: PayrollBreakdown;
  gross: number;
  employerSocial: number;
  employeeSocial: number;
  healthInsurance: number;
  incomeTax: number;
  net: number;
  taxes: number;
  effectiveRate: number;
}

export interface MixRoute {
  budget: number;
  salary: SalaryRoute;
  dividends: DividendRoute;
  net: number;
  taxes: number;
  effectiveRate: number;
}

export interface DividendComparison {
  dividends: DividendRoute;
  salary: SalaryRoute;
  mix: MixRoute;
  best: PayoutOption;
  runnerUp: PayoutOption;
  advantage: number;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function share(part: number, whole: number): number {
  return whole > 0 ? part / whole : 0;
}

export function dividendRoute(budgetInput: number, rates: DividendRates): DividendRoute {
  const budget = Math.max(0, budgetInput);
  const profitTax = round2(budget * rates.profitTaxRate);
  const dividend = round2(budget - profitTax);
  const dividendTax = round2(dividend * rates.dividendTaxRate);
  const net = round2(dividend - dividendTax);
  const taxes = round2(profitTax + dividendTax);
  return {
    budget,
    profitTax,
    dividend,
    dividendTax,
    net,
    taxes,
    effectiveRate: share(taxes, budget),
  };
}

export function maxGrossForBudget(monthlyBudget: number, payroll: PayrollRates): number {
  const gross = Math.max(0, monthlyBudget) / (1 + payroll.employerSocialRate);
  return Math.floor(gross * 100 + 1e-6) / 100;
}

export function salaryFromGross(
  grossMonthly: number,
  options: PayrollOptions,
  payroll: PayrollRates,
): SalaryRoute {
  const monthly = grossToNet(grossMonthly, options, payroll);
  const budget = round2(monthly.employerCost * 12);
  const employerSocial = round2(monthly.employerSocial * 12);
  const employeeSocial = round2(monthly.employeeSocial * 12);
  const healthInsurance = round2(monthly.healthInsurance * 12);
  const incomeTax = round2(monthly.incomeTax * 12);
  const taxes = round2(employerSocial + employeeSocial + healthInsurance + incomeTax);
  return {
    budget,
    monthly,
    gross: round2(monthly.gross * 12),
    employerSocial,
    employeeSocial,
    healthInsurance,
    incomeTax,
    net: round2(monthly.net * 12),
    taxes,
    effectiveRate: share(taxes, budget),
  };
}

export function salaryRoute(
  yearlyBudget: number,
  options: PayrollOptions,
  payroll: PayrollRates,
): SalaryRoute {
  const gross = maxGrossForBudget(yearlyBudget / 12, payroll);
  return salaryFromGross(gross, options, payroll);
}

export function mixRoute(
  input: DividendInput,
  options: PayrollOptions,
  payroll: PayrollRates,
  rates: DividendRates,
): MixRoute {
  const budget = Math.max(0, input.yearlyBudget);
  const gross = Math.min(
    Math.max(0, input.mixGrossMonthly),
    maxGrossForBudget(budget / 12, payroll),
  );
  const salary = salaryFromGross(gross, options, payroll);
  const dividends = dividendRoute(Math.max(0, round2(budget - salary.budget)), rates);
  const taxes = round2(salary.taxes + dividends.taxes);
  return {
    budget,
    salary,
    dividends,
    net: round2(salary.net + dividends.net),
    taxes,
    effectiveRate: share(taxes, budget),
  };
}

export function comparePayouts(
  input: DividendInput,
  options: PayrollOptions,
  payroll: PayrollRates,
  rates: DividendRates,
): DividendComparison {
  const dividends = dividendRoute(input.yearlyBudget, rates);
  const salary = salaryRoute(input.yearlyBudget, options, payroll);
  const mix = mixRoute(input, options, payroll, rates);
  const ranked = (
    [
      ["dividends", dividends.net],
      ["salary", salary.net],
      ["mix", mix.net],
    ] as [PayoutOption, number][]
  ).sort((a, b) => b[1] - a[1]);
  const [first, second] = ranked;
  const best = first?.[0] ?? "dividends";
  const runnerUp = second?.[0] ?? "salary";
  return {
    dividends,
    salary,
    mix,
    best,
    runnerUp,
    advantage: round2((first?.[1] ?? 0) - (second?.[1] ?? 0)),
  };
}
