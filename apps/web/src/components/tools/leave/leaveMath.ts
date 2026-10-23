import { grossToNet, NO_EXEMPTIONS, type PayrollBreakdown } from "../payroll/payrollMath";
import type { PayrollRates } from "../payroll/rates";
import type { InsuranceLength, LeaveRates } from "./rates";

export interface MonthRef {
  year: number;
  month: number;
}

export interface DateRef extends MonthRef {
  day: number;
}

export interface MonthInfo extends MonthRef {
  daysInMonth: number;
  calendarDays: number;
  workingDays: number;
}

export interface LeaveMonthInput {
  earnings: number;
  daysWorked: number;
  workingDays: number;
  calendarDays: number;
}

export interface AverageDailySalary {
  totalEarnings: number;
  totalWorked: number;
  totalWorking: number;
  totalCalendar: number;
  perWorkedDay: number;
  coefficient: number;
  perCalendarDay: number;
}

export interface AnnualLeaveResult extends AverageDailySalary {
  leaveDays: number;
  gross: number;
}

export type SickCase = "ordinary" | "severe" | "workAccident";

export interface SickInput {
  start: DateRef;
  days: number;
  incomes: number[];
  insurance: InsuranceLength;
  sickCase: SickCase;
  employerDaysUsed: number;
}

export interface SickMonthPart extends MonthRef {
  days: number;
  daily: number;
  amount: number;
}

export interface SickResult {
  eligible: boolean;
  days: number;
  monthsCounted: number;
  averageIncome: number;
  cap: number;
  capApplied: boolean;
  minimumApplied: boolean;
  base: number;
  percent: number;
  monthlyBenefit: number;
  employerShare: number;
  employerAverageDaily: number;
  employerDaily: number;
  employerDays: number;
  employerAmount: number;
  cnasDays: number;
  cnasAmount: number;
  cnasParts: SickMonthPart[];
  total: number;
}

const DAY_MS = 86_400_000;

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function nonNegative(n: number): number {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function utcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function orthodoxEaster(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  return utcDate(year, month, day + 13);
}

export function publicHolidays(year: number, rates: LeaveRates): Set<string> {
  const holidays = new Set(rates.fixedHolidays.map((md) => `${year}-${md}`));
  const easter = orthodoxEaster(year).getTime();
  for (const offset of rates.easterHolidayOffsets) {
    holidays.add(isoDate(new Date(easter + offset * DAY_MS)));
  }
  return holidays;
}

export function daysInMonth(ref: MonthRef): number {
  return new Date(Date.UTC(ref.year, ref.month, 0)).getUTCDate();
}

export function monthInfo(ref: MonthRef, rates: LeaveRates): MonthInfo {
  const holidays = publicHolidays(ref.year, rates);
  const total = daysInMonth(ref);
  let calendarDays = 0;
  let workingDays = 0;
  for (let day = 1; day <= total; day += 1) {
    const date = utcDate(ref.year, ref.month, day);
    if (holidays.has(isoDate(date))) continue;
    calendarDays += 1;
    const weekday = date.getUTCDay();
    if (weekday !== 0 && weekday !== 6) workingDays += 1;
  }
  return { ...ref, daysInMonth: total, calendarDays, workingDays };
}

export function previousMonths(ref: MonthRef, count: number): MonthRef[] {
  const months: MonthRef[] = [];
  const current = ref.year * 12 + ref.month - 1;
  for (let i = count; i >= 1; i -= 1) {
    const index = current - i;
    months.push({ year: Math.floor(index / 12), month: (index % 12) + 1 });
  }
  return months;
}

export function averageDailySalary(months: LeaveMonthInput[]): AverageDailySalary {
  let totalEarnings = 0;
  let totalWorked = 0;
  let totalWorking = 0;
  let totalCalendar = 0;
  for (const m of months) {
    totalEarnings += nonNegative(m.earnings);
    totalWorked += nonNegative(m.daysWorked);
    totalWorking += nonNegative(m.workingDays);
    totalCalendar += nonNegative(m.calendarDays);
  }
  const perWorkedDay = totalWorked > 0 ? totalEarnings / totalWorked : 0;
  const coefficient = totalCalendar > 0 ? totalWorking / totalCalendar : 0;
  return {
    totalEarnings,
    totalWorked,
    totalWorking,
    totalCalendar,
    perWorkedDay,
    coefficient,
    perCalendarDay: perWorkedDay * coefficient,
  };
}

export function annualLeavePay(months: LeaveMonthInput[], leaveDaysInput: number): AnnualLeaveResult {
  const average = averageDailySalary(months);
  const leaveDays = Math.floor(nonNegative(leaveDaysInput));
  return { ...average, leaveDays, gross: round2(average.perCalendarDay * leaveDays) };
}

function addDays(start: DateRef, offset: number): Date {
  return new Date(utcDate(start.year, start.month, start.day).getTime() + offset * DAY_MS);
}

export function forecastSalary(year: number, rates: LeaveRates): number {
  const known = Object.keys(rates.forecastAverageSalary)
    .map(Number)
    .sort((a, b) => a - b);
  const pick = known.filter((y) => y <= year).pop() ?? known[0];
  return pick === undefined
    ? rates.averageMonthlySalary
    : (rates.forecastAverageSalary[pick] ?? rates.averageMonthlySalary);
}

export function sickPay(input: SickInput, rates: LeaveRates): SickResult {
  const days = Math.min(Math.floor(nonNegative(input.days)), rates.sickMaxDaysPerYear);
  const incomes = input.incomes.map(nonNegative);
  const months = previousMonths(input.start, incomes.length);
  const years = new Map<number, { sum: number; count: number }>();
  incomes.forEach((income, i) => {
    const year = months[i]?.year ?? input.start.year;
    const entry = years.get(year) ?? { sum: 0, count: 0 };
    entry.sum += income;
    if (income > 0) entry.count += 1;
    years.set(year, entry);
  });
  let insuredTotal = 0;
  let cappedTotal = 0;
  let capTotal = 0;
  let insuredMonths = 0;
  for (const [year, entry] of years) {
    const yearCap = rates.sickBaseCapMultiplier * forecastSalary(year, rates) * entry.count;
    insuredTotal += entry.sum;
    cappedTotal += Math.min(entry.sum, yearCap);
    capTotal += yearCap;
    insuredMonths += entry.count;
  }
  const divisor = rates.sickBaseMonths;
  const averageIncome = insuredTotal / divisor;
  const cap = capTotal / divisor;
  const minimumApplied = insuredMonths === 0;
  const capApplied = cappedTotal < insuredTotal;
  const base = minimumApplied
    ? rates.sickBaseMinimumShare * forecastSalary(input.start.year, rates)
    : cappedTotal / divisor;

  const eligible = input.sickCase !== "ordinary" || input.insurance !== "insufficient";
  const percent = !eligible
    ? 0
    : input.sickCase === "severe"
      ? rates.sickSevereCasePercent
      : input.sickCase === "workAccident"
        ? rates.workAccidentCnasPercent
        : rates.sickPercent[input.insurance];
  const monthlyBenefit = base * percent;

  const reference = previousMonths(input.start, 3).map((m) => monthInfo(m, rates));
  const employerAverage = averageDailySalary(
    reference.map((m, i) => ({
      earnings: incomes[incomes.length - reference.length + i] ?? 0,
      daysWorked: m.workingDays,
      workingDays: m.workingDays,
      calendarDays: m.calendarDays,
    })),
  ).perCalendarDay;

  let employerShare = 0;
  let employerDayLimit = 0;
  if (input.sickCase === "ordinary") {
    employerShare = rates.sickEmployerShare;
    employerDayLimit = Math.min(
      rates.sickEmployerDays,
      Math.max(0, rates.sickEmployerDaysPerYear - Math.floor(nonNegative(input.employerDaysUsed))),
    );
  } else if (input.sickCase === "workAccident") {
    employerShare = rates.workAccidentEmployerShare;
    employerDayLimit = rates.workAccidentEmployerDays;
  }
  const employerDays = Math.min(days, employerDayLimit);
  const employerDaily = round2(employerAverage * employerShare);
  const employerAmount = round2(employerDaily * employerDays);

  const cnasDays = eligible ? days - employerDays : 0;
  const parts = new Map<string, SickMonthPart>();
  for (let i = employerDays; i < employerDays + cnasDays; i += 1) {
    const date = addDays(input.start, i);
    const ref = { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
    const key = `${ref.year}-${ref.month}`;
    const part = parts.get(key) ?? { ...ref, days: 0, daily: 0, amount: 0 };
    part.days += 1;
    parts.set(key, part);
  }
  const cnasParts = [...parts.values()].map((part) => {
    const daily = monthlyBenefit / daysInMonth(part);
    return { ...part, daily: round2(daily), amount: round2(daily * part.days) };
  });
  const cnasAmount = round2(cnasParts.reduce((sum, p) => sum + p.amount, 0));

  return {
    eligible,
    days,
    monthsCounted: insuredMonths,
    averageIncome,
    cap,
    capApplied,
    minimumApplied,
    base,
    percent,
    monthlyBenefit,
    employerShare,
    employerAverageDaily: employerAverage,
    employerDaily,
    employerDays,
    employerAmount,
    cnasDays,
    cnasAmount,
    cnasParts,
    total: round2(employerAmount + cnasAmount),
  };
}

export function leavePayNet(gross: number, payroll: PayrollRates): PayrollBreakdown {
  return grossToNet(gross, NO_EXEMPTIONS, payroll);
}

export function sickPayNet(
  result: Pick<SickResult, "employerAmount" | "cnasAmount">,
  payroll: PayrollRates,
  rates: LeaveRates,
): PayrollBreakdown {
  const employer = nonNegative(result.employerAmount);
  const cnas = nonNegative(result.cnasAmount);
  const taxable = rates.cnasSickPayTaxable ? employer + cnas : employer;
  const exempt = round2(employer + cnas - taxable);
  const taxed = grossToNet(taxable, NO_EXEMPTIONS, {
    ...payroll,
    employeeSocialRate: 0,
    employerSocialRate: 0,
    healthInsuranceRate: rates.sickPaySubjectToHealthInsurance ? payroll.healthInsuranceRate : 0,
  });
  return {
    ...taxed,
    gross: round2(employer + cnas),
    net: round2(taxed.net + exempt),
  };
}
