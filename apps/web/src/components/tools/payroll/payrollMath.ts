import type { PayrollRates } from "./rates";

export interface PayrollOptions {
  personalExemption: boolean;
  spouseExemption: boolean;
  dependants: number;
  increasedPersonalExemption?: boolean;
  disabledDependants?: number;
}

export interface PayrollBreakdown {
  gross: number;
  employeeSocial: number;
  healthInsurance: number;
  exemptions: number;
  personalExemptionApplied: boolean;
  personalExemptionLost: boolean;
  taxableIncome: number;
  incomeTax: number;
  net: number;
  employerSocial: number;
  employerCost: number;
}

export const NO_EXEMPTIONS: PayrollOptions = {
  personalExemption: false,
  spouseExemption: false,
  dependants: 0,
};

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function count(n: number | undefined): number {
  return n !== undefined && Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

function wantsPersonal(options: PayrollOptions): boolean {
  return options.personalExemption || options.increasedPersonalExemption === true;
}

export function personalExemptionAllowed(
  monthlyGross: number,
  rates: PayrollRates,
  options: PayrollOptions = NO_EXEMPTIONS,
): boolean {
  const kept = 1 - rates.employeeSocialRate - rates.healthInsuranceRate;
  const yearlyTaxable = monthlyGross * kept * 12 - monthlyExemptions(options, rates, false) * 12;
  return yearlyTaxable < rates.personalExemptionIncomeCeiling;
}

export function monthlyExemptions(
  options: PayrollOptions,
  rates: PayrollRates,
  withPersonal = true,
): number {
  const personal =
    withPersonal && wantsPersonal(options)
      ? options.increasedPersonalExemption
        ? rates.increasedPersonalExemptionYearly
        : rates.personalExemptionYearly
      : 0;
  const yearly =
    personal +
    (options.spouseExemption ? rates.spouseExemptionYearly : 0) +
    count(options.dependants) * rates.dependantExemptionYearly +
    count(options.disabledDependants) * rates.disabledDependantExemptionYearly;
  return yearly / 12;
}

export function grossToNet(
  grossInput: number,
  options: PayrollOptions,
  rates: PayrollRates,
): PayrollBreakdown {
  const gross = Number.isFinite(grossInput) ? Math.max(0, grossInput) : 0;
  const allowed = personalExemptionAllowed(gross, rates, options);
  const personalExemptionApplied = wantsPersonal(options) && allowed;
  const employeeSocial = round2(gross * rates.employeeSocialRate);
  const healthInsurance = round2(gross * rates.healthInsuranceRate);
  const exemptions = round2(monthlyExemptions(options, rates, allowed));
  const taxableIncome = Math.max(0, round2(gross - employeeSocial - healthInsurance - exemptions));
  const incomeTax = round2(taxableIncome * rates.incomeTaxRate);
  const employerBase = gross > 0 ? Math.max(gross, rates.employerSocialMinimumBase ?? 0) : 0;
  const employerSocial = round2(employerBase * rates.employerSocialRate);
  return {
    gross,
    employeeSocial,
    healthInsurance,
    exemptions,
    personalExemptionApplied,
    personalExemptionLost: wantsPersonal(options) && !allowed,
    taxableIncome,
    incomeTax,
    net: round2(gross - employeeSocial - healthInsurance - incomeTax),
    employerSocial,
    employerCost: round2(gross + employerSocial),
  };
}

function solveGross(net: number, monthlyExemption: number, rates: PayrollRates): number {
  const kept = 1 - rates.employeeSocialRate - rates.healthInsuranceRate;
  if (net <= monthlyExemption) return net / kept;
  return (net - rates.incomeTaxRate * monthlyExemption) / (kept * (1 - rates.incomeTaxRate));
}

export function netToGross(
  netTarget: number,
  options: PayrollOptions,
  rates: PayrollRates,
): PayrollBreakdown {
  const target = Number.isFinite(netTarget) ? Math.max(0, netTarget) : 0;
  const candidates: number[] = [];
  if (wantsPersonal(options)) {
    const g = solveGross(target, monthlyExemptions(options, rates, true), rates);
    if (personalExemptionAllowed(g, rates, options)) candidates.push(g);
  }
  const without = solveGross(target, monthlyExemptions(options, rates, false), rates);
  if (!wantsPersonal(options) || !personalExemptionAllowed(without, rates, options)) {
    candidates.push(without);
  }
  let gross = round2(Math.min(...candidates));
  for (let i = 0; i < 1000 && grossToNet(gross, options, rates).net < target; i += 1) {
    gross = round2(gross + 0.01);
  }
  while (gross >= 0.01 && grossToNet(round2(gross - 0.01), options, rates).net >= target) {
    gross = round2(gross - 0.01);
  }
  return grossToNet(gross, options, rates);
}
