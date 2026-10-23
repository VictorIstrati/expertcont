import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../../lib/modalBus";
import { parseAmount } from "../invoice/invoiceMath";
import { PAYROLL_RATES } from "../payroll/rates";
import {
  annualLeavePay,
  leavePayNet,
  monthInfo,
  previousMonths,
  sickPay,
  sickPayNet,
  type DateRef,
  type MonthRef,
  type SickCase,
} from "./leaveMath";
import { LEAVE_RATES, type InsuranceLength } from "./rates";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./LeaveCalculator.module.css";

interface Props {
  locale: Locale;
  hrHref: string;
}

type Tab = "leave" | "sick";

interface Copy {
  tabLeave: string;
  tabSick: string;
  inputsTitle: string;
  estimate: string;
  leaveStart: string;
  startMonthLabel: string;
  startYearLabel: string;
  fillLabel: string;
  fillHint: string;
  monthCol: string;
  earningsCol: string;
  workedCol: string;
  monthMeta: string;
  leaveDays: string;
  leaveDaysHint: string;
  leaveResultLabel: string;
  netLabel: string;
  breakdown: string;
  totalEarnings: string;
  totalWorked: string;
  perWorkedDay: string;
  coefficient: string;
  perCalendarDay: string;
  leaveFormula: string;
  healthInsurance: string;
  incomeTax: string;
  net: string;
  employerSocial: string;
  leaveDisclaimer: string;
  sickStart: string;
  sickDays: string;
  sickDaysHint: string;
  sickCase: string;
  cases: Record<SickCase, string>;
  insurance: string;
  insuranceOptions: Record<InsuranceLength, string>;
  employerUsed: string;
  employerUsedHint: string;
  sickFillLabel: string;
  sickFillHint: string;
  sickResultLabel: string;
  notEligible: string;
  employerPart: string;
  cnasPart: string;
  dayCount: string;
  employerNote: string;
  cnasNote: string;
  monthPart: string;
  baseLabel: string;
  baseNote: string;
  capNote: string;
  minimumNote: string;
  sickTaxNote: string;
  sickDisclaimer: string;
  cta: string;
  hrLink: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    tabLeave: "Concediu de odihnă",
    tabSick: "Concediu medical",
    inputsTitle: "Datele salariatului",
    estimate: "Estimare",
    leaveStart: "Luna în care începe concediul",
    startMonthLabel: "Luna",
    startYearLabel: "Anul",
    fillLabel: "Salariu lunar brut",
    fillHint: "Completează toate lunile deodată, apoi ajustează lunile cu prime sau absențe.",
    monthCol: "Luna",
    earningsCol: "Salariu calculat, MDL",
    workedCol: "Zile lucrate",
    monthMeta: "{working} lucrătoare · {calendar} calendaristice",
    leaveDays: "Zile de concediu (calendaristice)",
    leaveDaysHint:
      "Minimum {min} de zile calendaristice pe an. Sărbătorile nelucrătoare nu se includ în concediu.",
    leaveResultLabel: "Indemnizația de concediu, brut",
    netLabel: "Net de primit",
    breakdown: "Vezi calculul",
    totalEarnings: "Salariul din ultimele {n} luni",
    totalWorked: "Zile lucrate efectiv",
    perWorkedDay: "Salariu mediu pe o zi lucrată",
    coefficient: "Coeficient zile lucrătoare / calendaristice",
    perCalendarDay: "Salariu mediu pe o zi calendaristică",
    leaveFormula: "{perDay} MDL × {days} zile",
    healthInsurance: "Asigurare medicală ({rate})",
    incomeTax: "Impozit pe venit ({rate})",
    net: "Net de primit",
    employerSocial: "Contribuții sociale angajator ({rate}), suplimentar",
    leaveDisclaimer:
      "Estimare după Modul de calculare a salariului mediu (HG 426/2004), pentru săptămâna de lucru de 5 zile, fără hramul localității și fără scutiri personale. Indemnizația se achită cu cel puțin {advance} zile calendaristice înainte de concediu sau la o dată convenită, dar nu mai târziu de ziua de salariu a lunii respective (art. 117 Codul muncii).",
    sickStart: "Prima zi de concediu medical",
    sickDays: "Durata concediului (zile calendaristice)",
    sickDaysHint: "Maximum {max} de zile într-un an calendaristic.",
    sickCase: "Cauza incapacității",
    cases: {
      ordinary: "Boală obișnuită sau accident în afara muncii",
      severe: "Tuberculoză, SIDA sau boală oncologică",
      workAccident: "Accident de muncă sau boală profesională",
    },
    insurance: "Stagiul total de cotizare",
    insuranceOptions: {
      insufficient: "Sub 3 ani și sub 9 luni în ultimele 24",
      under5: "Până la 5 ani",
      from5to8: "Între 5 și 8 ani",
      over8: "Peste 8 ani",
    },
    employerUsed: "Zile deja plătite de angajator în acest an",
    employerUsedHint: "Angajatorul plătește cel mult {max} zile pe an, cumulat.",
    sickFillLabel: "Venit asigurat lunar, MDL",
    sickFillHint:
      "Completează cele {n} luni dinaintea lunii îmbolnăvirii; suma se împarte la {n}. O lună fără venit asigurat se înlocuiește cu o lună anterioară în care ai avut venit (cel mult 36 de luni în urmă); dacă nu există, rămâne 0.",
    sickResultLabel: "Indemnizația totală, brut",
    notEligible:
      "Fără stagiul minim de cotizare ({years} ani în total sau {months} luni în ultimele 24) CNAS nu plătește indemnizația pentru boală obișnuită. Primele zile plătite de angajator se acordă indiferent de stagiu.",
    employerPart: "Plătește angajatorul",
    cnasPart: "Plătește CNAS",
    dayCount: "{n} zile",
    employerNote: "{share} din salariul mediu zilnic de {avg} MDL = {daily} MDL / zi",
    cnasNote: "{percent} din baza de calcul",
    monthPart: "{month}: {days} zile × {daily} MDL",
    baseLabel: "Baza de calcul (venit mediu lunar)",
    baseNote: "venitul asigurat din {n} luni, împărțit la 12",
    capNote:
      "plafonată la {cap} MDL ({multiplier} salarii medii lunare prognozate pentru anul fiecărei luni)",
    minimumNote: "{share} din salariul mediu pe economie, în lipsa venitului asigurat",
    sickTaxNote:
      "Din partea plătită de angajator se rețin prima de asigurare medicală de 9% și impozitul pe venit. Partea plătită de CNAS din bugetul asigurărilor sociale nu se include în venitul impozabil (art. 20 lit. a) din Codul fiscal), deci nici prima medicală nu se calculează (art. 1 din Legea nr. 1593/2002). Contribuții sociale nu se calculează la nicio parte (anexa nr. 3 la Legea nr. 489/1999).",
    sickDisclaimer:
      "Estimare după Legea nr. 289/2004 și HG nr. 108/2005, cu salariul mediu pe economie de {salary} MDL ({year}). Partea angajatorului presupune lunile de referință lucrate integral. Suma exactă o stabilesc angajatorul și CNAS.",
    cta: "Vreau calculul salariilor făcut de voi",
    hrLink: "Servicii de resurse umane și salarizare",
  },
  ru: {
    tabLeave: "Ежегодный отпуск",
    tabSick: "Больничный",
    inputsTitle: "Данные работника",
    estimate: "Оценка",
    leaveStart: "Месяц начала отпуска",
    startMonthLabel: "Месяц",
    startYearLabel: "Год",
    fillLabel: "Месячная зарплата брутто",
    fillHint: "Заполните все месяцы сразу, затем поправьте месяцы с премиями или отсутствиями.",
    monthCol: "Месяц",
    earningsCol: "Начислено, MDL",
    workedCol: "Отработано дней",
    monthMeta: "{working} рабочих · {calendar} календарных",
    leaveDays: "Дней отпуска (календарных)",
    leaveDaysHint:
      "Не менее {min} календарных дней в году. Нерабочие праздничные дни в отпуск не включаются.",
    leaveResultLabel: "Отпускные, брутто",
    netLabel: "На руки",
    breakdown: "Показать расчёт",
    totalEarnings: "Зарплата за последние {n} месяца",
    totalWorked: "Фактически отработано дней",
    perWorkedDay: "Средняя зарплата за отработанный день",
    coefficient: "Коэффициент рабочих / календарных дней",
    perCalendarDay: "Средняя зарплата за календарный день",
    leaveFormula: "{perDay} MDL × {days} дн.",
    healthInsurance: "Медицинское страхование ({rate})",
    incomeTax: "Подоходный налог ({rate})",
    net: "На руки",
    employerSocial: "Социальные взносы работодателя ({rate}), сверху",
    leaveDisclaimer:
      "Оценка по Порядку исчисления средней заработной платы (ПП 426/2004) для пятидневной рабочей недели, без местного храмового праздника и личных освобождений. Отпускные выплачиваются не позднее чем за {advance} календарных дня до отпуска или в согласованную дату, но не позже дня выплаты зарплаты за этот месяц (ст. 117 Трудового кодекса).",
    sickStart: "Первый день больничного",
    sickDays: "Длительность больничного (календарных дней)",
    sickDaysHint: "Не более {max} дней в календарном году.",
    sickCase: "Причина нетрудоспособности",
    cases: {
      ordinary: "Общее заболевание или травма вне работы",
      severe: "Туберкулёз, СПИД или онкологическое заболевание",
      workAccident: "Несчастный случай на производстве или профзаболевание",
    },
    insurance: "Общий страховой стаж",
    insuranceOptions: {
      insufficient: "Меньше 3 лет и меньше 9 месяцев за последние 24",
      under5: "До 5 лет",
      from5to8: "От 5 до 8 лет",
      over8: "Более 8 лет",
    },
    employerUsed: "Дней, уже оплаченных работодателем в этом году",
    employerUsedHint: "Работодатель оплачивает не более {max} дней в году в сумме.",
    sickFillLabel: "Застрахованный доход в месяц, MDL",
    sickFillHint:
      "Заполните {n} месяцев перед месяцем заболевания; сумма делится на {n}. Месяц без застрахованного дохода заменяется более ранним месяцем с доходом (не далее 36 месяцев назад); если такого нет, остаётся 0.",
    sickResultLabel: "Пособие всего, брутто",
    notEligible:
      "Без минимального страхового стажа ({years} года всего или {months} месяцев за последние 24) CNAS не выплачивает пособие по общему заболеванию. Первые дни за счёт работодателя оплачиваются независимо от стажа.",
    employerPart: "Платит работодатель",
    cnasPart: "Платит CNAS",
    dayCount: "{n} дн.",
    employerNote: "{share} от среднедневной зарплаты {avg} MDL = {daily} MDL / день",
    cnasNote: "{percent} от базы расчёта",
    monthPart: "{month}: {days} дн. × {daily} MDL",
    baseLabel: "База расчёта (средний месячный доход)",
    baseNote: "застрахованный доход за {n} мес., делённый на 12",
    capNote: "ограничена {cap} MDL ({multiplier} прогнозных средних зарплат за год каждого месяца)",
    minimumNote: "{share} средней зарплаты по экономике при отсутствии застрахованного дохода",
    sickTaxNote:
      "С части, оплачиваемой работодателем, удерживаются медицинский взнос 9% и подоходный налог. Часть CNAS из бюджета социального страхования не включается в облагаемый доход (п. a) ст. 20 Налогового кодекса), поэтому медицинский взнос с неё не начисляется (ст. 1 Закона № 1593/2002). Социальные взносы не начисляются ни на одну часть (приложение 3 к Закону № 489/1999).",
    sickDisclaimer:
      "Оценка по Закону № 289/2004 и ПП № 108/2005, при средней зарплате по экономике {salary} MDL ({year}). Часть работодателя рассчитана при условии полностью отработанных месяцев. Точную сумму определяют работодатель и CNAS.",
    cta: "Хочу, чтобы зарплату считали вы",
    hrLink: "Кадровые услуги и расчёт зарплаты",
  },
  en: {
    tabLeave: "Annual leave",
    tabSick: "Sick leave",
    inputsTitle: "Employee details",
    estimate: "Estimate",
    leaveStart: "Month the leave starts",
    startMonthLabel: "Month",
    startYearLabel: "Year",
    fillLabel: "Monthly gross salary",
    fillHint: "Fill every month at once, then adjust months with bonuses or absences.",
    monthCol: "Month",
    earningsCol: "Earnings, MDL",
    workedCol: "Days worked",
    monthMeta: "{working} working · {calendar} calendar",
    leaveDays: "Leave days (calendar)",
    leaveDaysHint:
      "At least {min} calendar days a year. Public holidays are not counted as leave days.",
    leaveResultLabel: "Annual leave pay, gross",
    netLabel: "Take-home",
    breakdown: "Show the calculation",
    totalEarnings: "Earnings in the last {n} months",
    totalWorked: "Days actually worked",
    perWorkedDay: "Average pay per day worked",
    coefficient: "Working / calendar days coefficient",
    perCalendarDay: "Average pay per calendar day",
    leaveFormula: "{perDay} MDL × {days} days",
    healthInsurance: "Health insurance ({rate})",
    incomeTax: "Income tax ({rate})",
    net: "Take-home",
    employerSocial: "Employer social contributions ({rate}), on top",
    leaveDisclaimer:
      "Estimate under the average salary calculation method (Government Decision 426/2004), for a 5-day working week, excluding the local patron saint's day and personal exemptions. Leave pay is due at least {advance} calendar days before the leave starts, or on an agreed date no later than that month's payday (Labour Code art. 117).",
    sickStart: "First day of sick leave",
    sickDays: "Sick leave length (calendar days)",
    sickDaysHint: "Up to {max} days per calendar year.",
    sickCase: "Cause of incapacity",
    cases: {
      ordinary: "Ordinary illness or non-work accident",
      severe: "Tuberculosis, AIDS or cancer",
      workAccident: "Work accident or occupational disease",
    },
    insurance: "Total social insurance record",
    insuranceOptions: {
      insufficient: "Under 3 years and under 9 months in the last 24",
      under5: "Up to 5 years",
      from5to8: "5 to 8 years",
      over8: "Over 8 years",
    },
    employerUsed: "Days already paid by the employer this year",
    employerUsedHint: "The employer pays at most {max} days a year in total.",
    sickFillLabel: "Monthly insured income, MDL",
    sickFillHint:
      "Fill the {n} months before the month the illness began; the total is divided by {n}. A month without insured income is replaced by an earlier month with income (up to 36 months back); if there is none, it stays at 0.",
    sickResultLabel: "Total sick pay, gross",
    notEligible:
      "Without the minimum insurance record ({years} years in total or {months} months in the last 24), CNAS pays no benefit for ordinary illness. The first days paid by the employer are due regardless of the record.",
    employerPart: "Paid by the employer",
    cnasPart: "Paid by CNAS",
    dayCount: "{n} days",
    employerNote: "{share} of the average daily pay of {avg} MDL = {daily} MDL / day",
    cnasNote: "{percent} of the calculation base",
    monthPart: "{month}: {days} days × {daily} MDL",
    baseLabel: "Calculation base (average monthly income)",
    baseNote: "insured income of {n} months, divided by 12",
    capNote: "capped at {cap} MDL ({multiplier} forecast average salaries for each month's year)",
    minimumNote: "{share} of the national average salary, as there is no insured income",
    sickTaxNote:
      "The 9% health insurance premium and income tax are withheld from the part paid by the employer. The part paid by CNAS from the social insurance budget is not taxable income (Tax Code art. 20(a)), so no health premium is due on it either (Law 1593/2002 art. 1). No social contributions are due on either part (Law 489/1999 annex 3).",
    sickDisclaimer:
      "Estimate under Law 289/2004 and Government Decision 108/2005, using the {year} national average salary of {salary} MDL. The employer's share assumes fully worked reference months. The employer and CNAS set the exact amount.",
    cta: "Have your payroll done by us",
    hrLink: "HR and payroll services",
  },
};

const DEFAULT_SALARY = "20000";
const FALLBACK_MONTH: MonthRef = { year: LEAVE_RATES.year, month: 7 };
const MIN_YEAR = 2000;
const MAX_YEAR = 2100;
const FALLBACK_DATE: DateRef = { ...FALLBACK_MONTH, day: 1 };

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function monthKey(ref: MonthRef): string {
  return `${ref.year}-${pad(ref.month)}`;
}

function parseMonth(value: string): MonthRef | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return null;
  const month = Number(match[2]);
  return month >= 1 && month <= 12 ? { year: Number(match[1]), month } : null;
}

function parseDate(value: string): DateRef | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const ref = parseMonth(`${match[1]}-${match[2]}`);
  const day = Number(match[3]);
  return ref && day >= 1 && day <= 31 ? { ...ref, day } : null;
}

function repeat(value: string, count: number): string[] {
  return Array.from({ length: count }, () => value);
}

export function LeaveCalculator({ locale, hrHref }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const tag = localeTag(locale);
  const [tab, setTab] = useState<Tab>("leave");

  const [leaveMonth, setLeaveMonth] = useState(monthKey(FALLBACK_MONTH));
  const [yearDraft, setYearDraft] = useState<string | null>(null);
  const [leaveFill, setLeaveFill] = useState(DEFAULT_SALARY);
  const [leaveEarnings, setLeaveEarnings] = useState(() =>
    repeat(DEFAULT_SALARY, LEAVE_RATES.leaveReferenceMonths),
  );
  const [leaveWorked, setLeaveWorked] = useState<(string | null)[]>(() =>
    Array.from({ length: LEAVE_RATES.leaveReferenceMonths }, () => null),
  );
  const [leaveDays, setLeaveDays] = useState("14");

  const [sickStart, setSickStart] = useState(
    `${monthKey(FALLBACK_DATE)}-${pad(FALLBACK_DATE.day)}`,
  );
  const [sickDays, setSickDays] = useState("7");
  const [sickCase, setSickCase] = useState<SickCase>("ordinary");
  const [insurance, setInsurance] = useState<InsuranceLength>("over8");
  const [employerUsed, setEmployerUsed] = useState("0");
  const [sickFill, setSickFill] = useState(DEFAULT_SALARY);
  const [sickIncomes, setSickIncomes] = useState(() =>
    repeat(DEFAULT_SALARY, LEAVE_RATES.sickBaseMonths),
  );

  useEffect(() => {
    const now = new Date();
    const current = { year: now.getFullYear(), month: now.getMonth() + 1 };
    setLeaveMonth(monthKey(current));
    setSickStart(`${monthKey(current)}-${pad(now.getDate())}`);
  }, []);

  const money = useMemo(
    () => new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [tag],
  );
  const whole = useMemo(() => new Intl.NumberFormat(tag, { maximumFractionDigits: 0 }), [tag]);
  const pf = useMemo(
    () => new Intl.NumberFormat(tag, { style: "percent", maximumFractionDigits: 1 }),
    [tag],
  );
  const monthLong = useMemo(
    () => new Intl.DateTimeFormat(tag, { month: "long", year: "numeric", timeZone: "UTC" }),
    [tag],
  );
  const monthOnly = useMemo(
    () => new Intl.DateTimeFormat(tag, { month: "long", timeZone: "UTC" }),
    [tag],
  );
  const monthShort = useMemo(
    () => new Intl.DateTimeFormat(tag, { month: "short", year: "numeric", timeZone: "UTC" }),
    [tag],
  );
  const coef = useMemo(
    () => new Intl.NumberFormat(tag, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
    [tag],
  );
  const mdl = (n: number) => `${money.format(n)} MDL`;
  const monthName = (ref: MonthRef, format: Intl.DateTimeFormat) =>
    format.format(new Date(Date.UTC(ref.year, ref.month - 1, 1)));

  const monthNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const leaveRef = parseMonth(leaveMonth) ?? FALLBACK_MONTH;
  const leaveMonths = previousMonths(leaveRef, LEAVE_RATES.leaveReferenceMonths).map((m) =>
    monthInfo(m, LEAVE_RATES),
  );
  const leaveResult = annualLeavePay(
    leaveMonths.map((m, i) => ({
      earnings: parseAmount(leaveEarnings[i] ?? ""),
      daysWorked: parseAmount(leaveWorked[i] ?? String(m.workingDays)),
      workingDays: m.workingDays,
      calendarDays: m.calendarDays,
    })),
    parseAmount(leaveDays),
  );
  const leaveNet = leavePayNet(leaveResult.gross, PAYROLL_RATES);

  const sickRef = parseDate(sickStart) ?? FALLBACK_DATE;
  const sickMonths = previousMonths(sickRef, LEAVE_RATES.sickBaseMonths);
  const sickResult = sickPay(
    {
      start: sickRef,
      days: parseAmount(sickDays),
      incomes: sickIncomes.map(parseAmount),
      insurance,
      sickCase,
      employerDaysUsed: parseAmount(employerUsed),
    },
    LEAVE_RATES,
  );
  const sickNet = sickPayNet(sickResult, PAYROLL_RATES, LEAVE_RATES);

  function changeLeaveMonth(value: string) {
    setLeaveMonth(value);
    setLeaveWorked((rows) => rows.map(() => null));
  }

  function setAt<T>(list: T[], index: number, value: T): T[] {
    return list.map((item, i) => (i === index ? value : item));
  }

  const leavePanel = (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>{t.leaveStart}</legend>
        <div className={styles.monthPicker}>
          <select
            aria-label={t.startMonthLabel}
            value={leaveRef.month}
            onChange={(e) =>
              changeLeaveMonth(monthKey({ year: leaveRef.year, month: Number(e.target.value) }))
            }
            className={`${styles.select} ${styles.capitalize}`}
          >
            {monthNumbers.map((month) => (
              <option key={month} value={month}>
                {monthName({ year: leaveRef.year, month }, monthOnly)}
              </option>
            ))}
          </select>
          <input
            type="number"
            inputMode="numeric"
            aria-label={t.startYearLabel}
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={yearDraft ?? leaveRef.year}
            onChange={(e) => {
              const value = e.target.value.slice(0, 4);
              const year = Number(value);
              setYearDraft(value);
              if (value.length === 4 && year >= MIN_YEAR && year <= MAX_YEAR) {
                changeLeaveMonth(monthKey({ year, month: leaveRef.month }));
              }
            }}
            onBlur={() => setYearDraft(null)}
            className={styles.input}
          />
        </div>
      </fieldset>
      <div>
        <label htmlFor="lv-fill" className={styles.label}>
          {t.fillLabel}
        </label>
        <input
          id="lv-fill"
          type="text"
          inputMode="decimal"
          value={leaveFill}
          onChange={(e) => {
            setLeaveFill(e.target.value);
            setLeaveEarnings((rows) => rows.map(() => e.target.value));
          }}
          className={`${styles.input} ${styles.amount}`}
        />
        <p className={styles.hint}>{t.fillHint}</p>
      </div>
      <div className={styles.monthTable}>
        <span className={styles.monthHead}>{t.monthCol}</span>
        <span className={styles.monthHead}>{t.earningsCol}</span>
        <span className={styles.monthHead}>{t.workedCol}</span>
        {leaveMonths.map((m, i) => {
          const name = monthName(m, monthLong);
          return (
            <Fragment key={monthKey(m)}>
              <span className={styles.monthName}>
                {name}
                <span className={styles.monthMeta}>
                  {fill(t.monthMeta, { working: m.workingDays, calendar: m.calendarDays })}
                </span>
              </span>
              <input
                type="text"
                inputMode="decimal"
                aria-label={`${t.earningsCol} — ${name}`}
                value={leaveEarnings[i] ?? ""}
                onChange={(e) => setLeaveEarnings((rows) => setAt(rows, i, e.target.value))}
                className={`${styles.input} ${styles.amount}`}
              />
              <input
                type="text"
                inputMode="numeric"
                aria-label={`${t.workedCol} — ${name}`}
                value={leaveWorked[i] ?? String(m.workingDays)}
                onChange={(e) => setLeaveWorked((rows) => setAt(rows, i, e.target.value))}
                className={`${styles.input} ${styles.amount}`}
              />
            </Fragment>
          );
        })}
      </div>
      <div>
        <label htmlFor="lv-days" className={styles.label}>
          {t.leaveDays}
        </label>
        <input
          id="lv-days"
          type="text"
          inputMode="numeric"
          value={leaveDays}
          onChange={(e) => setLeaveDays(e.target.value)}
          className={`${styles.input} ${styles.amount}`}
        />
        <p className={styles.hint}>
          {fill(t.leaveDaysHint, { min: LEAVE_RATES.annualLeaveMinDays })}
        </p>
      </div>
    </>
  );

  const leaveLines = [
    {
      label: fill(t.totalEarnings, { n: LEAVE_RATES.leaveReferenceMonths }),
      value: mdl(leaveResult.totalEarnings),
    },
    { label: t.totalWorked, value: whole.format(leaveResult.totalWorked) },
    { label: t.perWorkedDay, value: mdl(leaveResult.perWorkedDay) },
    {
      label: t.coefficient,
      value: `${leaveResult.totalWorking} / ${leaveResult.totalCalendar} = ${coef.format(leaveResult.coefficient)}`,
    },
    { label: t.perCalendarDay, value: mdl(leaveResult.perCalendarDay) },
    {
      label: t.leaveResultLabel,
      value: fill(t.leaveFormula, {
        perDay: money.format(leaveResult.perCalendarDay),
        days: leaveResult.leaveDays,
      }),
    },
  ];

  const leaveResultPanel = (
    <>
      <ResultHeader
        label={t.leaveResultLabel}
        badge={t.estimate}
        amount={money.format(leaveResult.gross)}
      />
      <div className="text-sm text-white/70 mt-2">
        {t.netLabel}: <span className="font-bold text-white">{mdl(leaveNet.net)}</span>
      </div>
      <ul className="list-none p-0 m-0 mt-6 pt-5 border-t border-white/15 flex flex-col gap-2 text-sm">
        <Line
          label={fill(t.healthInsurance, { rate: pf.format(PAYROLL_RATES.healthInsuranceRate) })}
        >
          −{mdl(leaveNet.healthInsurance)}
        </Line>
        <Line label={fill(t.incomeTax, { rate: pf.format(PAYROLL_RATES.incomeTaxRate) })}>
          −{mdl(leaveNet.incomeTax)}
        </Line>
        <Line label={t.net} strong>
          {mdl(leaveNet.net)}
        </Line>
        <Line label={fill(t.employerSocial, { rate: pf.format(PAYROLL_RATES.employerSocialRate) })}>
          {mdl(leaveNet.employerSocial)}
        </Line>
      </ul>
      <Breakdown title={t.breakdown}>
        {leaveLines.map((line) => (
          <Line key={line.label} label={line.label}>
            {line.value}
          </Line>
        ))}
      </Breakdown>
      <p className="m-0 mt-5 text-xs text-white/55 leading-relaxed">
        {fill(t.leaveDisclaimer, { advance: LEAVE_RATES.leavePayAdvanceDays })}
      </p>
    </>
  );

  const special = sickCase !== "ordinary";
  const sickPanel = (
    <>
      <div className="field-grid gap-5">
        <div className="field-cell">
          <label htmlFor="sk-start" className={styles.label}>
            {t.sickStart}
          </label>
          <input
            id="sk-start"
            type="date"
            value={sickStart}
            onChange={(e) => setSickStart(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className="field-cell">
          <label htmlFor="sk-days" className={styles.label}>
            {t.sickDays}
          </label>
          <input
            id="sk-days"
            type="text"
            inputMode="numeric"
            value={sickDays}
            onChange={(e) => setSickDays(e.target.value)}
            className={`${styles.input} ${styles.amount}`}
          />
          <p className={styles.hint}>
            {fill(t.sickDaysHint, { max: LEAVE_RATES.sickMaxDaysPerYear })}
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="sk-case" className={styles.label}>
          {t.sickCase}
        </label>
        <select
          id="sk-case"
          value={sickCase}
          onChange={(e) => setSickCase(e.target.value as SickCase)}
          className={styles.select}
        >
          {(Object.keys(t.cases) as SickCase[]).map((key) => (
            <option key={key} value={key}>
              {t.cases[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="field-grid gap-5">
        <div className="field-cell">
          <label htmlFor="sk-insurance" className={styles.label}>
            {t.insurance}
          </label>
          <select
            id="sk-insurance"
            value={insurance}
            disabled={special}
            onChange={(e) => setInsurance(e.target.value as InsuranceLength)}
            className={styles.select}
          >
            {(Object.keys(t.insuranceOptions) as InsuranceLength[]).map((key) => (
              <option key={key} value={key}>
                {t.insuranceOptions[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="field-cell">
          <label htmlFor="sk-used" className={styles.label}>
            {t.employerUsed}
          </label>
          <input
            id="sk-used"
            type="text"
            inputMode="numeric"
            value={employerUsed}
            disabled={special}
            onChange={(e) => setEmployerUsed(e.target.value)}
            className={`${styles.input} ${styles.amount}`}
          />
          <p className={styles.hint}>
            {fill(t.employerUsedHint, { max: LEAVE_RATES.sickEmployerDaysPerYear })}
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="sk-fill" className={styles.label}>
          {t.sickFillLabel}
        </label>
        <input
          id="sk-fill"
          type="text"
          inputMode="decimal"
          value={sickFill}
          onChange={(e) => {
            setSickFill(e.target.value);
            setSickIncomes((rows) => rows.map(() => e.target.value));
          }}
          className={`${styles.input} ${styles.amount}`}
        />
        <p className={styles.hint}>{fill(t.sickFillHint, { n: LEAVE_RATES.sickBaseMonths })}</p>
      </div>
      <div className={styles.incomeGrid}>
        {sickMonths.map((m, i) => {
          const id = `sk-income-${monthKey(m)}`;
          return (
            <div key={id} className={styles.incomeCell}>
              <label htmlFor={id}>{monthName(m, monthShort)}</label>
              <input
                id={id}
                type="text"
                inputMode="decimal"
                value={sickIncomes[i] ?? ""}
                onChange={(e) => setSickIncomes((rows) => setAt(rows, i, e.target.value))}
                className={`${styles.input} ${styles.amount}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );

  const baseNote = sickResult.minimumApplied
    ? fill(t.minimumNote, { share: pf.format(LEAVE_RATES.sickBaseMinimumShare) })
    : sickResult.capApplied
      ? fill(t.capNote, {
          cap: whole.format(sickResult.cap),
          multiplier: LEAVE_RATES.sickBaseCapMultiplier,
        })
      : fill(t.baseNote, { n: sickResult.monthsCounted });

  const sickResultPanel = (
    <>
      <ResultHeader
        label={t.sickResultLabel}
        badge={t.estimate}
        amount={money.format(sickResult.total)}
      />
      <div className="text-sm text-white/70 mt-2">
        {t.netLabel}: <span className="font-bold text-white">{mdl(sickNet.net)}</span>
      </div>
      {!sickResult.eligible && (
        <p className={styles.warning}>
          {fill(t.notEligible, {
            years: LEAVE_RATES.minimumInsuranceYears,
            months: LEAVE_RATES.minimumInsuranceMonthsIn24,
          })}
        </p>
      )}
      {(sickResult.employerDays > 0 || sickResult.cnasDays > 0) && (
        <div className="mt-6 pt-5 border-t border-white/15 grid gap-5 sm:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-[#DFB741] mb-1">
              {t.employerPart}
            </div>
            <div className="text-2xl font-extrabold text-white">
              {mdl(sickResult.employerAmount)}
            </div>
            <div className="text-sm text-white/70">
              {fill(t.dayCount, { n: sickResult.employerDays })}
            </div>
            {sickResult.employerDays > 0 && (
              <p className="m-0 mt-1 text-xs text-white/55 leading-relaxed">
                {fill(t.employerNote, {
                  share: pf.format(sickResult.employerShare),
                  avg: money.format(sickResult.employerAverageDaily),
                  daily: money.format(sickResult.employerDaily),
                })}
              </p>
            )}
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-white/70 mb-1">
              {t.cnasPart}
            </div>
            <div className="text-2xl font-extrabold text-white">{mdl(sickResult.cnasAmount)}</div>
            <div className="text-sm text-white/70">
              {fill(t.dayCount, { n: sickResult.cnasDays })}
            </div>
            {sickResult.cnasDays > 0 && (
              <p className="m-0 mt-1 text-xs text-white/55 leading-relaxed">
                {fill(t.cnasNote, { percent: pf.format(sickResult.percent) })}
              </p>
            )}
          </div>
        </div>
      )}
      <Breakdown title={t.breakdown}>
        <Line label={t.baseLabel}>{mdl(sickResult.base)}</Line>
        <li className="text-white/55 -mt-1">{baseNote}</li>
        {sickResult.cnasParts.map((part) => (
          <Line key={monthKey(part)} label={t.cnasPart}>
            {fill(t.monthPart, {
              month: monthName(part, monthShort),
              days: part.days,
              daily: money.format(part.daily),
            })}
          </Line>
        ))}
        <Line label={fill(t.incomeTax, { rate: pf.format(PAYROLL_RATES.incomeTaxRate) })}>
          −{mdl(sickNet.incomeTax)}
        </Line>
        <Line label={t.net} strong>
          {mdl(sickNet.net)}
        </Line>
      </Breakdown>
      <p className="m-0 mt-5 text-xs text-white/70 leading-relaxed">{t.sickTaxNote}</p>
      <p className="m-0 mt-3 text-xs text-white/55 leading-relaxed">
        {fill(t.sickDisclaimer, {
          salary: whole.format(LEAVE_RATES.averageMonthlySalary),
          year: LEAVE_RATES.year,
        })}
      </p>
    </>
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "leave", label: t.tabLeave },
    { id: "sick", label: t.tabSick },
  ];

  return (
    <section id="calculator" className="section-sm section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div role="tablist" aria-label={`${t.tabLeave} / ${t.tabSick}`} className={styles.tabs}>
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`leave-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls="leave-panel"
              onClick={() => setTab(item.id)}
              className={`${styles.tab} ${tab === item.id ? styles.tabActive : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id="leave-panel"
          role="tabpanel"
          aria-labelledby={`leave-tab-${tab}`}
          className={styles.layout}
        >
          <div className="rounded-md border border-white/15 bg-white/5 p-6 sm:p-7 flex flex-col gap-6">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">
              {t.inputsTitle}
            </div>
            {tab === "leave" ? leavePanel : sickPanel}
          </div>

          <div
            ref={resultRef}
            className="lg:sticky lg:top-24 p-6 sm:p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]"
          >
            {tab === "leave" ? leaveResultPanel : sickResultPanel}
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => openModal("booking")}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill bg-accent text-[#1A1A2E] font-bold text-sm border-none cursor-pointer"
              >
                {t.cta}
                <Icon name="arrow-right" size={16} />
              </button>
              <a
                href={hrHref}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/85 no-underline"
              >
                {t.hrLink}
                <Icon name="arrow-right" size={14} />
              </a>
            </div>
          </div>
        </div>
        <MobileResultBar
          locale={locale}
          target={resultRef}
          label={tab === "leave" ? t.leaveResultLabel : t.sickResultLabel}
          value={mdl(tab === "leave" ? leaveResult.gross : sickResult.total)}
        />
      </Container>
    </section>
  );
}

function ResultHeader({ label, badge, amount }: { label: string; badge: string; amount: string }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">{label}</span>
        <span className={styles.badge}>{badge}</span>
      </div>
      <div className="text-[40px] sm:text-[52px] font-extrabold tracking-tighter text-white leading-none">
        {amount}
        <span className="text-lg font-semibold text-white/70 tracking-normal ml-2">MDL</span>
      </div>
    </>
  );
}

function Line({
  label,
  strong = false,
  children,
}: {
  label: string;
  strong?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex justify-between gap-3">
      <span className={strong ? "font-bold text-white" : "text-white/80"}>{label}</span>
      <span className="font-semibold whitespace-nowrap text-white text-right">{children}</span>
    </li>
  );
}

function Breakdown({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="mt-4 group">
      <summary className="cursor-pointer text-sm font-semibold text-white/80 list-none flex items-center gap-1.5">
        <Icon name="chevron-right" size={16} />
        {title}
      </summary>
      <ul className="list-none p-0 m-0 mt-4 flex flex-col gap-2 text-xs">{children}</ul>
    </details>
  );
}
