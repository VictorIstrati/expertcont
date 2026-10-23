import {
  BASE_RATES_CHECKED,
  DAY_COUNT_BASIS,
  STATUTORY_MARGIN,
  STATUTORY_REGIME_START,
  baseRateOn,
} from "./baseRates";

export type CalcMode = "statutory" | "contractual";
export type DebtorKind = "business" | "consumer";

export interface PartialPayment {
  id: string;
  date: string;
  amount: number;
}

export interface LatePaymentInput {
  principal: number;
  dueDate: string;
  paymentDate: string;
  mode: CalcMode;
  debtor: DebtorKind;
  dailyRate: number;
  capRate: number;
  payments: PartialPayment[];
}

export interface LatePaymentPeriod {
  from: string;
  to: string;
  days: number;
  principal: number;
  rate: number;
  baseRate: number | null;
  amount: number;
  estimated: boolean;
}

export interface LatePaymentResult {
  valid: boolean;
  periods: LatePaymentPeriod[];
  days: number;
  amount: number;
  paid: number;
  outstanding: number;
  totalDue: number;
  capAmount: number | null;
  capped: boolean;
  estimated: boolean;
  clippedFrom: string | null;
}

const DAY_MS = 86_400_000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  return fromDayNumber(toDayNumber(value)) === value;
}

export function toDayNumber(iso: string): number {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS);
}

export function fromDayNumber(day: number): string {
  return new Date(day * DAY_MS).toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return fromDayNumber(toDayNumber(iso) + days);
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function semesterStart(iso: string): string {
  const year = iso.slice(0, 4);
  return Number(iso.slice(5, 7)) <= 6 ? `${year}-01-01` : `${year}-07-01`;
}

function nextSemesterStart(iso: string): string {
  const year = Number(iso.slice(0, 4));
  return Number(iso.slice(5, 7)) <= 6 ? `${year}-07-01` : `${year + 1}-01-01`;
}

export function statutoryRate(iso: string, debtor: DebtorKind): { base: number; rate: number } {
  const base = baseRateOn(semesterStart(iso));
  return { base, rate: base + STATUTORY_MARGIN[debtor] };
}

const EMPTY: LatePaymentResult = {
  valid: false,
  periods: [],
  days: 0,
  amount: 0,
  paid: 0,
  outstanding: 0,
  totalDue: 0,
  capAmount: null,
  capped: false,
  estimated: false,
  clippedFrom: null,
};

export function calculateLatePayment(input: LatePaymentInput): LatePaymentResult {
  const principal = Math.max(0, input.principal);
  if (!isIsoDate(input.dueDate) || !isIsoDate(input.paymentDate) || principal <= 0) return EMPTY;

  const statutory = input.mode === "statutory";
  const firstDay = addDays(input.dueDate, 1);
  const lastDay = input.paymentDate;
  const clippedFrom = statutory && firstDay < STATUTORY_REGIME_START ? STATUTORY_REGIME_START : null;
  const start = clippedFrom ?? firstDay;

  const payments = input.payments
    .filter((p) => isIsoDate(p.date) && p.amount > 0 && p.date <= lastDay)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  const paid = payments.reduce((sum, p) => sum + p.amount, 0);
  const capAmount = !statutory && input.capRate > 0 ? principal * input.capRate : null;

  const periods: LatePaymentPeriod[] = [];
  let total = 0;
  let capped = false;
  let cursor = start;
  let balance = principal;
  let unpaidInterest = 0;
  let paymentIndex = 0;
  let settledOn = lastDay;

  const applyPaymentsBefore = (day: string) => {
    for (;;) {
      const payment = payments[paymentIndex];
      if (!payment || payment.date >= day) return;
      paymentIndex += 1;
      const toInterest = Math.min(payment.amount, unpaidInterest);
      unpaidInterest -= toInterest;
      const wasOpen = balance > 0;
      balance -= payment.amount - toInterest;
      if (wasOpen && balance <= 0) settledOn = payment.date;
    }
  };

  while (cursor <= lastDay) {
    applyPaymentsBefore(cursor);
    if (balance <= 0) break;

    const boundaries = [addDays(lastDay, 1)];
    if (statutory) boundaries.push(nextSemesterStart(cursor));
    const nextPayment = payments.find((p) => p.date >= cursor);
    if (nextPayment) boundaries.push(addDays(nextPayment.date, 1));
    const next = boundaries.reduce((min, b) => (b < min ? b : min));
    const to = addDays(next, -1);
    const days = toDayNumber(next) - toDayNumber(cursor);

    let rate: number;
    let baseRate: number | null = null;
    let amount: number;
    if (statutory) {
      const r = statutoryRate(cursor, input.debtor);
      rate = r.rate;
      baseRate = r.base;
      amount = (balance * rate * days) / DAY_COUNT_BASIS;
    } else {
      rate = Math.max(0, input.dailyRate);
      amount = balance * rate * days;
    }

    if (capAmount !== null && total + amount >= capAmount) {
      amount = Math.max(0, capAmount - total);
      capped = true;
    }

    total += amount;
    unpaidInterest += amount;
    periods.push({
      from: cursor,
      to,
      days,
      principal: balance,
      rate,
      baseRate,
      amount,
      estimated: statutory && semesterStart(cursor) > BASE_RATES_CHECKED,
    });
    if (capped) break;
    cursor = next;
  }
  applyPaymentsBefore(addDays(lastDay, 1));

  const outstanding = Math.max(0, balance);
  const days = Math.max(0, toDayNumber(settledOn) - toDayNumber(start) + 1);
  const amount = round2(total);
  return {
    valid: true,
    periods,
    days,
    amount,
    paid: round2(paid),
    outstanding: round2(outstanding),
    totalDue: round2(Math.max(0, principal + total - paid)),
    capAmount: capAmount === null ? null : round2(capAmount),
    capped,
    estimated: periods.some((p) => p.estimated),
    clippedFrom,
  };
}
