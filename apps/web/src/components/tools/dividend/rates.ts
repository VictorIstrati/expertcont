export interface DividendRates {
  year: number;
  profitTaxRate: number;
  dividendTaxRate: number;
  minimumWage: number;
  upcomingYear: number;
  upcomingDividendTaxRate: number;
}

export const DIVIDEND_RATES: DividendRates = {
  year: 2026,
  profitTaxRate: 0.12,
  dividendTaxRate: 0.06,
  minimumWage: 6300,
  upcomingYear: 2027,
  upcomingDividendTaxRate: 0.08,
};
