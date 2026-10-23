import type { ItParkRates } from "./rates";

export interface ItParkInput {
  revenue: number;
  employees: number;
  grossSalary: number;
  otherExpenses: number;
}

export interface ItParkRegime {
  singleTax: number;
  minimumApplies: boolean;
  totalTaxes: number;
  netProfit: number;
  netSalary: number;
  effectiveRate: number;
}

export interface StandardRegime {
  employerSocial: number;
  employeeSocial: number;
  healthInsurance: number;
  incomeTax: number;
  profitTax: number;
  totalTaxes: number;
  netProfit: number;
  netSalary: number;
  effectiveRate: number;
}

export interface ItParkComparison {
  itPark: ItParkRegime;
  standard: StandardRegime;
  monthlySavings: number;
  yearlySavings: number;
}

function share(part: number, whole: number): number {
  return whole > 0 ? part / whole : 0;
}

export function compareRegimes(input: ItParkInput, rates: ItParkRates): ItParkComparison {
  const revenue = Math.max(0, input.revenue);
  const employees = Math.max(0, Math.floor(input.employees));
  const grossSalary = Math.max(0, input.grossSalary);
  const otherExpenses = Math.max(0, input.otherExpenses);
  const payroll = employees * grossSalary;

  const percentTax = revenue * rates.singleTaxRate;
  const minimumTax = employees * rates.minimumPerEmployee;
  const singleTax = Math.max(percentTax, minimumTax);
  const itPark: ItParkRegime = {
    singleTax,
    minimumApplies: minimumTax > percentTax,
    totalTaxes: singleTax,
    netProfit: revenue - payroll - otherExpenses - singleTax,
    netSalary: grossSalary,
    effectiveRate: share(singleTax, revenue),
  };

  const employerSocial = payroll * rates.employerSocialRate;
  const employeeSocial = payroll * rates.employeeSocialRate;
  const healthInsurance = payroll * rates.healthInsuranceRate;
  const incomeTax = (payroll - employeeSocial - healthInsurance) * rates.incomeTaxRate;
  const profitBeforeTax = revenue - payroll - employerSocial - otherExpenses;
  const profitTax = Math.max(0, profitBeforeTax) * rates.profitTaxRate;
  const standardTaxes = employerSocial + employeeSocial + healthInsurance + incomeTax + profitTax;
  const withheldPerEmployee =
    employees > 0 ? (employeeSocial + healthInsurance + incomeTax) / employees : 0;
  const standard: StandardRegime = {
    employerSocial,
    employeeSocial,
    healthInsurance,
    incomeTax,
    profitTax,
    totalTaxes: standardTaxes,
    netProfit: profitBeforeTax - profitTax,
    netSalary: grossSalary - withheldPerEmployee,
    effectiveRate: share(standardTaxes, revenue),
  };

  const monthlySavings = standard.totalTaxes - itPark.totalTaxes;
  return { itPark, standard, monthlySavings, yearlySavings: monthlySavings * 12 };
}
