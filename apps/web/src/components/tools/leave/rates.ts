export type InsuranceLength = "insufficient" | "under5" | "from5to8" | "over8";

export interface LeaveRates {
  year: number;
  averageMonthlySalary: number;
  forecastAverageSalary: Record<number, number>;
  annualLeaveMinDays: number;
  leaveReferenceMonths: number;
  leavePayAdvanceDays: number;
  sickBaseMonths: number;
  sickBaseCapMultiplier: number;
  sickBaseMinimumShare: number;
  sickPercent: Record<InsuranceLength, number>;
  sickSevereCasePercent: number;
  sickEmployerDays: number;
  sickEmployerDaysPerYear: number;
  sickEmployerShare: number;
  workAccidentEmployerDays: number;
  workAccidentEmployerShare: number;
  workAccidentCnasPercent: number;
  sickMaxDaysPerYear: number;
  cnasReviewDays: number;
  cnasReviewDaysIncomplete: number;
  minimumInsuranceYears: number;
  minimumInsuranceMonthsIn24: number;
  sickPaySubjectToHealthInsurance: boolean;
  cnasSickPayTaxable: boolean;
  fixedHolidays: string[];
  easterHolidayOffsets: number[];
}

export const LEAVE_RATES: LeaveRates = {
  year: 2026,
  averageMonthlySalary: 17_400,
  forecastAverageSalary: { 2024: 13_700, 2025: 16_100, 2026: 17_400 },
  annualLeaveMinDays: 28,
  leaveReferenceMonths: 3,
  leavePayAdvanceDays: 3,
  sickBaseMonths: 12,
  sickBaseCapMultiplier: 5,
  sickBaseMinimumShare: 0.35,
  sickPercent: { insufficient: 0, under5: 0.6, from5to8: 0.7, over8: 0.9 },
  sickSevereCasePercent: 1,
  sickEmployerDays: 5,
  sickEmployerDaysPerYear: 15,
  sickEmployerShare: 0.75,
  workAccidentEmployerDays: 20,
  workAccidentEmployerShare: 1,
  workAccidentCnasPercent: 1,
  sickMaxDaysPerYear: 180,
  cnasReviewDays: 15,
  cnasReviewDaysIncomplete: 45,
  minimumInsuranceYears: 3,
  minimumInsuranceMonthsIn24: 9,
  sickPaySubjectToHealthInsurance: true,
  cnasSickPayTaxable: false,
  fixedHolidays: [
    "01-01",
    "01-07",
    "01-08",
    "03-08",
    "05-01",
    "05-09",
    "06-01",
    "08-27",
    "08-31",
    "12-25",
  ],
  easterHolidayOffsets: [0, 1, 8],
};
