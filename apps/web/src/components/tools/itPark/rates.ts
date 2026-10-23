export interface ItParkRates {
  year: number;
  singleTaxRate: number;
  minimumPerEmployee: number;
  employerSocialRate: number;
  employeeSocialRate: number;
  healthInsuranceRate: number;
  incomeTaxRate: number;
  profitTaxRate: number;
}

export const IT_PARK_RATES: ItParkRates = {
  year: 2026,
  singleTaxRate: 0.07,
  minimumPerEmployee: 5220,
  employerSocialRate: 0.24,
  employeeSocialRate: 0,
  healthInsuranceRate: 0.09,
  incomeTaxRate: 0.12,
  profitTaxRate: 0.12,
};
