export interface PayrollRates {
  year: number;
  employerSocialRate: number;
  employerSocialMinimumBase?: number;
  employeeSocialRate: number;
  healthInsuranceRate: number;
  incomeTaxRate: number;
  personalExemptionYearly: number;
  increasedPersonalExemptionYearly: number;
  personalExemptionIncomeCeiling: number;
  spouseExemptionYearly: number;
  dependantExemptionYearly: number;
  disabledDependantExemptionYearly: number;
  dependantIncomeLimitYearly: number;
}

export const PAYROLL_RATES: PayrollRates = {
  year: 2026,
  employerSocialRate: 0.24,
  employerSocialMinimumBase: 6_300,
  employeeSocialRate: 0,
  healthInsuranceRate: 0.09,
  incomeTaxRate: 0.12,
  personalExemptionYearly: 29_700,
  increasedPersonalExemptionYearly: 34_620,
  personalExemptionIncomeCeiling: 360_000,
  spouseExemptionYearly: 21_780,
  dependantExemptionYearly: 9_900,
  disabledDependantExemptionYearly: 21_780,
  dependantIncomeLimitYearly: 12_400,
};
