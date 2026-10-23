import { describe, expect, it } from "vitest";
import { PAYROLL_RATES, type PayrollRates } from "../payroll/rates";
import {
  annualLeavePay,
  forecastSalary,
  leavePayNet,
  monthInfo,
  orthodoxEaster,
  previousMonths,
  sickPay,
  sickPayNet,
  type SickInput,
} from "./leaveMath";
import type { LeaveRates } from "./rates";

const RATES: LeaveRates = {
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
  minimumInsuranceYears: 3,
  minimumInsuranceMonthsIn24: 9,
  sickPaySubjectToHealthInsurance: true,
  cnasSickPayTaxable: false,
  fixedHolidays: ["01-01", "01-07", "01-08", "03-08", "05-01", "05-09", "06-01", "08-27", "08-31", "12-25"],
  easterHolidayOffsets: [0, 1, 8],
};

const PAYROLL: PayrollRates = {
  ...PAYROLL_RATES,
  employerSocialRate: 0.24,
  employeeSocialRate: 0,
  healthInsuranceRate: 0.09,
  incomeTaxRate: 0.12,
};

describe("calendar helpers", () => {
  it("computes Orthodox Easter", () => {
    expect(orthodoxEaster(2025).toISOString().slice(0, 10)).toBe("2025-04-20");
    expect(orthodoxEaster(2026).toISOString().slice(0, 10)).toBe("2026-04-12");
    expect(orthodoxEaster(2027).toISOString().slice(0, 10)).toBe("2027-05-02");
  });

  it("excludes public holidays from calendar and working days", () => {
    expect(monthInfo({ year: 2026, month: 1 }, RATES)).toMatchObject({
      daysInMonth: 31,
      calendarDays: 28,
      workingDays: 19,
    });
    expect(monthInfo({ year: 2026, month: 4 }, RATES)).toMatchObject({
      calendarDays: 27,
      workingDays: 20,
    });
  });

  it("lists the preceding months across a year boundary", () => {
    expect(previousMonths({ year: 2026, month: 2 }, 3)).toEqual([
      { year: 2025, month: 11 },
      { year: 2025, month: 12 },
      { year: 2026, month: 1 },
    ]);
  });
});

describe("annualLeavePay", () => {
  it("divides by days worked and applies the working/calendar coefficient", () => {
    const result = annualLeavePay(
      [
        { earnings: 1485.19, daysWorked: 19, workingDays: 19, calendarDays: 28 },
        { earnings: 1485.18, daysWorked: 20, workingDays: 20, calendarDays: 28 },
        { earnings: 1485.18, daysWorked: 22, workingDays: 22, calendarDays: 30 },
      ],
      14,
    );
    expect(result.perWorkedDay).toBeCloseTo(73.04, 2);
    expect(result.coefficient).toBeCloseTo(0.7093, 4);
    expect(result.gross).toBe(725.32);
  });

  it("keeps a month without earnings in the reference period", () => {
    const result = annualLeavePay(
      [
        { earnings: 5400, daysWorked: 9, workingDays: 25, calendarDays: 29 },
        { earnings: 0, daysWorked: 0, workingDays: 27, calendarDays: 31 },
        { earnings: 9200, daysWorked: 14, workingDays: 25, calendarDays: 29 },
      ],
      5,
    );
    expect(result.coefficient).toBeCloseTo(77 / 89, 6);
    expect(result.perCalendarDay * 0.75 * 5).toBeCloseTo(2059.48, 2);
  });

  it("returns zero without worked days", () => {
    const result = annualLeavePay(
      [{ earnings: 10_000, daysWorked: 0, workingDays: 20, calendarDays: 30 }],
      14,
    );
    expect(result.gross).toBe(0);
  });

  it("nets leave pay like a salary", () => {
    const net = leavePayNet(10_000, PAYROLL);
    expect(net.healthInsurance).toBe(900);
    expect(net.incomeTax).toBe(1092);
    expect(net.net).toBe(8008);
  });
});

describe("sickPay", () => {
  const base: SickInput = {
    start: { year: 2026, month: 6, day: 25 },
    days: 10,
    incomes: Array.from({ length: 12 }, () => 20_000),
    insurance: "over8",
    sickCase: "ordinary",
    employerDaysUsed: 0,
  };

  it("splits employer and CNAS days and prorates by month length", () => {
    const result = sickPay(base, RATES);
    expect(result.base).toBe(20_000);
    expect(result.employerDays).toBe(5);
    expect(result.employerDaily).toBeCloseTo((60_000 / 86) * 0.75, 2);
    expect(result.employerAmount).toBe(2616.3);
    expect(result.cnasDays).toBe(5);
    expect(result.cnasParts).toEqual([
      { year: 2026, month: 6, days: 1, daily: 600, amount: 600 },
      { year: 2026, month: 7, days: 4, daily: 580.65, amount: 2322.58 },
    ]);
    expect(result.total).toBe(5538.88);
  });

  it("limits employer days to the yearly allowance", () => {
    const result = sickPay({ ...base, employerDaysUsed: 13 }, RATES);
    expect(result.employerDays).toBe(2);
    expect(result.cnasDays).toBe(8);
  });

  it("applies the percentage for the insurance length", () => {
    expect(sickPay({ ...base, insurance: "under5" }, RATES).monthlyBenefit).toBe(12_000);
    expect(sickPay({ ...base, insurance: "from5to8" }, RATES).monthlyBenefit).toBe(14_000);
  });

  it("caps each month at five forecast salaries of its own year", () => {
    const result = sickPay({ ...base, incomes: base.incomes.map(() => 120_000) }, RATES);
    expect(result.capApplied).toBe(true);
    expect(result.base).toBeCloseTo((7 * 80_500 + 5 * 87_000) / 12, 6);
  });

  it("divides the insured income by 12 even with months without income", () => {
    const incomes = [...Array.from({ length: 6 }, () => 0), ...Array.from({ length: 6 }, () => 18_000)];
    const result = sickPay({ ...base, incomes }, RATES);
    expect(result.monthsCounted).toBe(6);
    expect(result.base).toBe(9_000);
  });

  it("looks up the forecast salary of the nearest known year", () => {
    expect(forecastSalary(2025, RATES)).toBe(16_100);
    expect(forecastSalary(2027, RATES)).toBe(17_400);
    expect(forecastSalary(2020, RATES)).toBe(13_700);
  });

  it("uses 35% of the average salary when there is no insured income", () => {
    const result = sickPay({ ...base, incomes: base.incomes.map(() => 0) }, RATES);
    expect(result.minimumApplied).toBe(true);
    expect(result.base).toBeCloseTo(6090, 6);
  });

  it("keeps the employer days but drops CNAS without the minimum insurance period", () => {
    const result = sickPay({ ...base, insurance: "insufficient" }, RATES);
    expect(result.eligible).toBe(false);
    expect(result.employerDays).toBe(5);
    expect(result.cnasDays).toBe(0);
    expect(result.total).toBe(2616.3);
  });

  it("pays severe illnesses at 100% from CNAS from the first day", () => {
    const result = sickPay({ ...base, insurance: "insufficient", sickCase: "severe" }, RATES);
    expect(result.eligible).toBe(true);
    expect(result.employerDays).toBe(0);
    expect(result.cnasDays).toBe(10);
    expect(result.percent).toBe(1);
  });

  it("has the employer pay 20 days at 100% after a work accident", () => {
    const result = sickPay({ ...base, days: 25, sickCase: "workAccident" }, RATES);
    expect(result.employerDays).toBe(20);
    expect(result.employerShare).toBe(1);
    expect(result.cnasDays).toBe(5);
  });

  it("caps the number of days", () => {
    expect(sickPay({ ...base, days: 400 }, RATES).days).toBe(180);
  });

  it("taxes only the employer-paid part of sick pay", () => {
    const net = sickPayNet({ employerAmount: 2616.3, cnasAmount: 2922.58 }, PAYROLL, RATES);
    expect(net.gross).toBe(5538.88);
    expect(net.healthInsurance).toBe(235.47);
    expect(net.employerSocial).toBe(0);
    expect(net.incomeTax).toBe(285.7);
    expect(net.net).toBe(5017.71);
  });
});
