export interface BaseRateChange {
  from: string;
  rate: number;
}

export const BNM_BASE_RATES: BaseRateChange[] = [
  { from: "2017-12-05", rate: 0.065 },
  { from: "2019-06-19", rate: 0.07 },
  { from: "2019-07-31", rate: 0.075 },
  { from: "2019-12-11", rate: 0.055 },
  { from: "2020-03-04", rate: 0.045 },
  { from: "2020-03-20", rate: 0.0325 },
  { from: "2020-08-06", rate: 0.03 },
  { from: "2020-09-09", rate: 0.0275 },
  { from: "2020-11-06", rate: 0.0265 },
  { from: "2021-07-30", rate: 0.0365 },
  { from: "2021-09-06", rate: 0.0465 },
  { from: "2021-10-05", rate: 0.055 },
  { from: "2021-12-03", rate: 0.065 },
  { from: "2022-01-13", rate: 0.085 },
  { from: "2022-02-15", rate: 0.105 },
  { from: "2022-03-16", rate: 0.125 },
  { from: "2022-05-05", rate: 0.155 },
  { from: "2022-06-03", rate: 0.185 },
  { from: "2022-08-04", rate: 0.215 },
  { from: "2022-12-05", rate: 0.2 },
  { from: "2023-02-07", rate: 0.17 },
  { from: "2023-03-20", rate: 0.14 },
  { from: "2023-05-11", rate: 0.1 },
  { from: "2023-06-20", rate: 0.06 },
  { from: "2023-11-07", rate: 0.0475 },
  { from: "2024-02-06", rate: 0.0425 },
  { from: "2024-03-21", rate: 0.0375 },
  { from: "2024-05-07", rate: 0.036 },
  { from: "2025-01-10", rate: 0.056 },
  { from: "2025-02-05", rate: 0.065 },
  { from: "2025-08-07", rate: 0.0625 },
  { from: "2025-09-18", rate: 0.06 },
  { from: "2025-12-11", rate: 0.05 },
  { from: "2026-05-07", rate: 0.065 },
  { from: "2026-06-18", rate: 0.07 },
  { from: "2026-08-06", rate: 0.075 },
  { from: "2026-09-17", rate: 0.09 },
];

export const BASE_RATES_CHECKED = "2026-10-23";

export const STATUTORY_MARGIN = {
  business: 0.09,
  consumer: 0.05,
} as const;

export const STATUTORY_REGIME_START = "2019-03-01";

export const DAY_COUNT_BASIS = 365;

export const LIMITATION_YEARS = 3;

export const DEFAULT_DAILY_PENALTY = 0.001;

export function baseRateOn(isoDate: string): number {
  let rate = BNM_BASE_RATES[0]?.rate ?? 0;
  for (const change of BNM_BASE_RATES) {
    if (change.from > isoDate) break;
    rate = change.rate;
  }
  return rate;
}
