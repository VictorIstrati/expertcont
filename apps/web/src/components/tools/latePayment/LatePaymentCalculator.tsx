import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../../lib/modalBus";
import { parseAmount } from "../invoice/invoiceMath";
import { BASE_RATES_CHECKED, DEFAULT_DAILY_PENALTY, STATUTORY_MARGIN } from "./baseRates";
import {
  addDays,
  calculateLatePayment,
  type CalcMode,
  type DebtorKind,
  type LatePaymentPeriod,
  type LatePaymentResult,
  type PartialPayment,
} from "./latePaymentMath";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./LatePaymentCalculator.module.css";

interface Props {
  locale: Locale;
  legalHref: string;
}

type Currency = "MDL" | "EUR" | "USD";

const CURRENCIES: Currency[] = ["MDL", "EUR", "USD"];

interface Copy {
  inputsTitle: string;
  mode: string;
  modes: Record<CalcMode, string>;
  amount: string;
  currency: string;
  dueDate: string;
  dueHint: string;
  paymentDate: string;
  paymentHint: string;
  debtor: string;
  debtors: Record<DebtorKind, string>;
  dailyRate: string;
  capRate: string;
  capHint: string;
  paymentsTitle: string;
  paymentsHint: string;
  addPayment: string;
  paymentOn: string;
  paymentAmount: string;
  removePayment: string;
  result: Record<CalcMode, string>;
  days: string;
  paid: string;
  outstanding: string;
  totalDue: string;
  period: string;
  daysCol: string;
  principalCol: string;
  rateCol: string;
  amountCol: string;
  total: string;
  perYear: string;
  perDay: string;
  pp: string;
  empty: string;
  noDelay: string;
  clipped: string;
  estimated: string;
  capped: string;
  choiceNote: string;
  print: string;
  disclaimer: string;
  cta: string;
  legal: string;
  printTitle: Record<CalcMode, string>;
  printDebt: string;
  printPayments: string;
  basis: Record<CalcMode, string>;
  capSuffix: string;
  generated: string;
  fileName: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    inputsTitle: "Datele datoriei",
    mode: "Ce calculezi",
    modes: {
      statutory: "Dobândă legală (art. 942)",
      contractual: "Penalitate din contract",
    },
    amount: "Suma datoriei",
    currency: "Valuta",
    dueDate: "Data scadenței",
    dueHint: "Ultima zi în care trebuia făcută plata. Întârzierea curge din ziua următoare.",
    paymentDate: "Data plății sau a calculului",
    paymentHint: "Implicit azi. Ziua plății se include în calcul.",
    debtor: "Debitorul este",
    debtors: {
      business: "Companie sau alt debitor",
      consumer: "Consumator",
    },
    dailyRate: "Penalitate pe zi",
    capRate: "Plafon din datorie",
    capHint: "Lasă 0 dacă contractul nu prevede un plafon.",
    paymentsTitle: "Plăți parțiale",
    paymentsHint:
      "Plata stinge întâi dobânda sau penalitatea acumulată, apoi datoria principală (art. 875 alin. (6) Cod civil), dacă creditorul nu face o altă imputație. Din ziua următoare, dobânda curge pe datoria rămasă.",
    addPayment: "Adaugă o plată",
    paymentOn: "Data plății",
    paymentAmount: "Suma achitată",
    removePayment: "Șterge plata",
    result: {
      statutory: "Dobândă de întârziere",
      contractual: "Penalitate de întârziere",
    },
    days: "Zile de întârziere",
    paid: "Achitat parțial",
    outstanding: "Datorie principală rămasă",
    totalDue: "Total de încasat",
    period: "Perioada",
    daysCol: "Zile",
    principalCol: "Suma restantă",
    rateCol: "Rata",
    amountCol: "Suma",
    total: "Total",
    perYear: "/ an",
    perDay: "/ zi",
    pp: "p.p.",
    empty: "Completează suma și datele pentru a vedea calculul.",
    noDelay: "Plata nu este întârziată — nu se datorează dobândă sau penalitate.",
    clipped:
      "Art. 942 Cod civil se aplică întârzierii începând cu 1 martie 2019. Perioada anterioară este guvernată de art. 619 din redacția veche a Codului civil și nu este inclusă în calcul.",
    estimated:
      "* Rata de bază pentru acest semestru nu este încă stabilită; s-a folosit ultima rată publicată de BNM.",
    capped: "Penalitatea a atins plafonul contractual de {amount}.",
    choiceNote:
      "Dacă în contract există o clauză penală, creditorul alege fie dobânda legală, fie penalitatea — nu pe amândouă (art. 942 alin. (4) Cod civil).",
    print: "Printează / Salvează PDF",
    disclaimer:
      "Calcul orientativ pe baza ratelor de bază publicate de BNM (verificate la {date}). Nu înlocuiește consultanța juridică.",
    cta: "Vreau ajutor la recuperarea datoriei",
    legal: "Servicii juridice ExpertCont",
    printTitle: {
      statutory: "Calculul dobânzii de întârziere",
      contractual: "Calculul penalității de întârziere",
    },
    printDebt: "Datorie: {amount}, scadentă la {due}. Calcul până la {until} inclusiv.",
    printPayments: "Plăți parțiale",
    basis: {
      statutory:
        "Temei: art. 942 și art. 874 din Codul civil al Republicii Moldova — rata de bază a BNM în vigoare la 1 ianuarie, respectiv 1 iulie, plus {margin} puncte procentuale pe an; an de 365 de zile.",
      contractual: "Temei: clauza penală din contract — {rate} pe zi din suma restantă{cap}.",
    },
    capSuffix: ", dar nu mai mult de {cap} din datorie",
    generated: "Calcul întocmit la {date} cu instrumentul gratuit ExpertCont (expertcont.md).",
    fileName: "calcul-penalitati",
  },
  ru: {
    inputsTitle: "Данные о долге",
    mode: "Что рассчитываем",
    modes: {
      statutory: "Законные проценты (ст. 942)",
      contractual: "Пеня по договору",
    },
    amount: "Сумма долга",
    currency: "Валюта",
    dueDate: "Срок оплаты",
    dueHint: "Последний день, когда нужно было заплатить. Просрочка начинается со следующего дня.",
    paymentDate: "Дата оплаты или расчёта",
    paymentHint: "По умолчанию сегодня. День оплаты включается в расчёт.",
    debtor: "Должник",
    debtors: {
      business: "Компания или иной должник",
      consumer: "Потребитель",
    },
    dailyRate: "Пеня в день",
    capRate: "Предел от суммы долга",
    capHint: "Оставьте 0, если договор не ограничивает пеню.",
    paymentsTitle: "Частичные оплаты",
    paymentsHint:
      "Оплата сначала погашает начисленные проценты или неустойку, затем основной долг (ч. (6) ст. 875 Гражданского кодекса), если кредитор не зачтёт её иначе. Со следующего дня проценты начисляются на остаток долга.",
    addPayment: "Добавить оплату",
    paymentOn: "Дата оплаты",
    paymentAmount: "Оплаченная сумма",
    removePayment: "Удалить оплату",
    result: {
      statutory: "Проценты за просрочку",
      contractual: "Пеня за просрочку",
    },
    days: "Дней просрочки",
    paid: "Оплачено частично",
    outstanding: "Остаток основного долга",
    totalDue: "Итого к взысканию",
    period: "Период",
    daysCol: "Дни",
    principalCol: "Сумма долга",
    rateCol: "Ставка",
    amountCol: "Сумма",
    total: "Итого",
    perYear: "/ год",
    perDay: "/ день",
    pp: "п.п.",
    empty: "Укажите сумму и даты, чтобы увидеть расчёт.",
    noDelay: "Просрочки нет — проценты и пеня не начисляются.",
    clipped:
      "Ст. 942 Гражданского кодекса применяется к просрочке начиная с 1 марта 2019 года. Более ранний период регулируется ст. 619 прежней редакции кодекса и в расчёт не включён.",
    estimated:
      "* Базовая ставка на это полугодие ещё не определена; использована последняя ставка, опубликованная НБМ.",
    capped: "Пеня достигла договорного предела {amount}.",
    choiceNote:
      "Если в договоре есть неустойка, кредитор выбирает либо законные проценты, либо пеню — но не то и другое одновременно (ч. (4) ст. 942 ГК).",
    print: "Печать / Сохранить PDF",
    disclaimer:
      "Ориентировочный расчёт по базовым ставкам, опубликованным НБМ (проверено {date}). Не заменяет юридическую консультацию.",
    cta: "Нужна помощь со взысканием долга",
    legal: "Юридические услуги ExpertCont",
    printTitle: {
      statutory: "Расчёт процентов за просрочку",
      contractual: "Расчёт пени за просрочку",
    },
    printDebt: "Долг: {amount}, срок оплаты {due}. Расчёт по {until} включительно.",
    printPayments: "Частичные оплаты",
    basis: {
      statutory:
        "Основание: ст. 942 и ст. 874 Гражданского кодекса Республики Молдова — базовая ставка НБМ, действующая на 1 января или 1 июля, плюс {margin} процентных пунктов годовых; год — 365 дней.",
      contractual: "Основание: условие о неустойке в договоре — {rate} в день от суммы долга{cap}.",
    },
    capSuffix: ", но не более {cap} от суммы долга",
    generated: "Расчёт составлен {date} в бесплатном инструменте ExpertCont (expertcont.md).",
    fileName: "raschet-peni",
  },
  en: {
    inputsTitle: "The debt",
    mode: "What to calculate",
    modes: {
      statutory: "Statutory interest (art. 942)",
      contractual: "Contractual penalty",
    },
    amount: "Amount owed",
    currency: "Currency",
    dueDate: "Due date",
    dueHint: "The last day payment was due. Late days start the day after.",
    paymentDate: "Payment or calculation date",
    paymentHint: "Defaults to today. The payment day is included.",
    debtor: "The debtor is",
    debtors: {
      business: "Business or other debtor",
      consumer: "Consumer",
    },
    dailyRate: "Penalty per day",
    capRate: "Cap as share of debt",
    capHint: "Leave at 0 if the contract sets no cap.",
    paymentsTitle: "Partial payments",
    paymentsHint:
      "A payment first settles accrued interest or penalty, then the principal (Civil Code art. 875(6)), unless the creditor applies it differently. From the next day, interest runs on the remaining principal.",
    addPayment: "Add a payment",
    paymentOn: "Payment date",
    paymentAmount: "Amount paid",
    removePayment: "Remove payment",
    result: {
      statutory: "Late-payment interest",
      contractual: "Late-payment penalty",
    },
    days: "Days late",
    paid: "Paid in part",
    outstanding: "Principal remaining",
    totalDue: "Total to claim",
    period: "Period",
    daysCol: "Days",
    principalCol: "Unpaid amount",
    rateCol: "Rate",
    amountCol: "Amount",
    total: "Total",
    perYear: "/ year",
    perDay: "/ day",
    pp: "pp",
    empty: "Enter the amount and dates to see the calculation.",
    noDelay: "The payment is not late — no interest or penalty is due.",
    clipped:
      "Art. 942 of the Civil Code applies to delay from 1 March 2019. The earlier period is governed by art. 619 of the former wording of the Code and is not included.",
    estimated:
      "* The base rate for this half-year is not set yet; the latest rate published by the NBM was used.",
    capped: "The penalty has reached the contractual cap of {amount}.",
    choiceNote:
      "If the contract has a penalty clause, the creditor chooses either statutory interest or the penalty — not both (art. 942(4) Civil Code).",
    print: "Print / Save PDF",
    disclaimer:
      "Indicative calculation based on base rates published by the NBM (checked on {date}). Not a substitute for legal advice.",
    cta: "Get help recovering the debt",
    legal: "ExpertCont legal services",
    printTitle: {
      statutory: "Late-payment interest calculation",
      contractual: "Late-payment penalty calculation",
    },
    printDebt: "Debt: {amount}, due on {due}. Calculated up to and including {until}.",
    printPayments: "Partial payments",
    basis: {
      statutory:
        "Legal basis: art. 942 and art. 874 of the Civil Code of the Republic of Moldova — the National Bank of Moldova base rate in force on 1 January or 1 July, plus {margin} percentage points per year; 365-day year.",
      contractual: "Legal basis: the contract's penalty clause — {rate} per day on the unpaid amount{cap}.",
    },
    capSuffix: ", capped at {cap} of the debt",
    generated: "Calculated on {date} with the free ExpertCont tool (expertcont.md).",
    fileName: "late-payment-calculation",
  },
};

interface FormState {
  principal: number;
  currency: Currency;
  dueDate: string;
  paymentDate: string;
  mode: CalcMode;
  debtor: DebtorKind;
  dailyPercent: number;
  capPercent: number;
  payments: PartialPayment[];
}

const INITIAL: FormState = {
  principal: 10_000,
  currency: "MDL",
  dueDate: "",
  paymentDate: "",
  mode: "statutory",
  debtor: "business",
  dailyPercent: DEFAULT_DAILY_PENALTY * 100,
  capPercent: 0,
  payments: [],
};

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function LatePaymentCalculator({ locale, legalHref }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [mounted, setMounted] = useState(false);
  const nextId = useRef(1);

  useEffect(() => {
    const today = todayIso();
    setForm((f) => ({
      ...f,
      paymentDate: f.paymentDate || today,
      dueDate: f.dueDate || addDays(today, -90),
    }));
    setMounted(true);
  }, []);

  const tag = localeTag(locale);
  const money = useMemo(
    () => new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [tag],
  );
  const annual = useMemo(
    () =>
      new Intl.NumberFormat(tag, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [tag],
  );
  const daily = useMemo(
    () => new Intl.NumberFormat(tag, { style: "percent", maximumFractionDigits: 3 }),
    [tag],
  );
  const dates = useMemo(
    () =>
      new Intl.DateTimeFormat(tag, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      }),
    [tag],
  );

  const result = useMemo(
    () =>
      calculateLatePayment({
        principal: form.principal,
        dueDate: form.dueDate,
        paymentDate: form.paymentDate,
        mode: form.mode,
        debtor: form.debtor,
        dailyRate: form.dailyPercent / 100,
        capRate: form.capPercent / 100,
        payments: form.payments,
      }),
    [form],
  );

  const cur = (n: number) => `${money.format(n)} ${form.currency}`;
  const date = (iso: string) => (iso ? dates.format(new Date(`${iso}T00:00:00Z`)) : "");
  const margin = Math.round(STATUTORY_MARGIN[form.debtor] * 100);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addPayment() {
    const id = `p${nextId.current++}`;
    setForm((f) => ({
      ...f,
      payments: [...f.payments, { id, date: f.paymentDate || todayIso(), amount: 0 }],
    }));
  }

  function updatePayment(id: string, patch: Partial<PartialPayment>) {
    setForm((f) => ({
      ...f,
      payments: f.payments.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function removePayment(id: string) {
    setForm((f) => ({ ...f, payments: f.payments.filter((p) => p.id !== id) }));
  }

  function printCalculation() {
    const previous = document.title;
    document.title = `${t.fileName}-${form.paymentDate}`;
    const restore = () => {
      document.title = previous;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }

  const rateLabel = (p: LatePaymentPeriod) =>
    p.baseRate === null
      ? `${daily.format(p.rate)} ${t.perDay}`
      : `${annual.format(p.rate)} ${t.perYear}`;
  const rateDetail = (p: LatePaymentPeriod) =>
    p.baseRate === null ? null : `${annual.format(p.baseRate)} + ${margin} ${t.pp}`;

  const hasResult = result.valid && result.days > 0;
  const notes: string[] = [];
  if (result.clippedFrom) notes.push(t.clipped);
  if (result.estimated) notes.push(t.estimated);
  if (result.capped && result.capAmount !== null)
    notes.push(fill(t.capped, { amount: cur(result.capAmount) }));

  const basis =
    form.mode === "statutory"
      ? fill(t.basis.statutory, { margin })
      : fill(t.basis.contractual, {
          rate: daily.format(form.dailyPercent / 100),
          cap:
            form.capPercent > 0
              ? fill(t.capSuffix, { cap: daily.format(form.capPercent / 100) })
              : "",
        });

  return (
    <section id="calculator" className="section-sm tool-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="flex flex-col gap-5">
            <Card title={t.inputsTitle}>
              <div className="field-grid gap-4">
                <div className="field sm:col-span-2">
                  <span className="text-[13px] font-semibold">{t.mode}</span>
                  <Segmented
                    label={t.mode}
                    value={form.mode}
                    options={(["statutory", "contractual"] as CalcMode[]).map((m) => ({
                      value: m,
                      label: t.modes[m],
                    }))}
                    onChange={(m) => set("mode", m)}
                  />
                </div>
                <Field id="lp-amount" label={t.amount}>
                  <NumberInput
                    id="lp-amount"
                    value={form.principal}
                    format={(n) => money.format(n)}
                    onChange={(n) => set("principal", n)}
                  />
                </Field>
                <Field id="lp-currency" label={t.currency}>
                  <select
                    id="lp-currency"
                    className="select"
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value as Currency)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="lp-due" label={t.dueDate} hint={t.dueHint}>
                  <input
                    id="lp-due"
                    type="date"
                    className="input"
                    value={form.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                  />
                </Field>
                <Field id="lp-paid" label={t.paymentDate} hint={t.paymentHint}>
                  <input
                    id="lp-paid"
                    type="date"
                    className="input"
                    value={form.paymentDate}
                    min={form.dueDate || undefined}
                    onChange={(e) => set("paymentDate", e.target.value)}
                  />
                </Field>

                {form.mode === "statutory" ? (
                  <div className="field sm:col-span-2">
                    <span className="text-[13px] font-semibold">{t.debtor}</span>
                    <Segmented
                      label={t.debtor}
                      value={form.debtor}
                      options={(["business", "consumer"] as DebtorKind[]).map((d) => ({
                        value: d,
                        label: `${t.debtors[d]} (+${Math.round(STATUTORY_MARGIN[d] * 100)} ${t.pp})`,
                      }))}
                      onChange={(d) => set("debtor", d)}
                    />
                  </div>
                ) : (
                  <>
                    <Field id="lp-daily" label={t.dailyRate}>
                      <NumberInput
                        id="lp-daily"
                        value={form.dailyPercent}
                        suffix="%"
                        onChange={(n) => set("dailyPercent", n)}
                      />
                    </Field>
                    <Field id="lp-cap" label={t.capRate} hint={t.capHint}>
                      <NumberInput
                        id="lp-cap"
                        value={form.capPercent}
                        suffix="%"
                        onChange={(n) => set("capPercent", n)}
                      />
                    </Field>
                  </>
                )}
              </div>
            </Card>

            <Card title={t.paymentsTitle}>
              <p className="text-xs text-text-secondary mt-0 mb-4">{t.paymentsHint}</p>
              <div className="flex flex-col gap-3">
                {form.payments.map((p, i) => (
                  <div key={p.id} className={styles.paymentRow}>
                    <Field id={`lp-pay-date-${p.id}`} label={`${t.paymentOn} ${i + 1}`}>
                      <input
                        id={`lp-pay-date-${p.id}`}
                        type="date"
                        className="input"
                        value={p.date}
                        onChange={(e) => updatePayment(p.id, { date: e.target.value })}
                      />
                    </Field>
                    <Field id={`lp-pay-amount-${p.id}`} label={t.paymentAmount}>
                      <NumberInput
                        id={`lp-pay-amount-${p.id}`}
                        value={p.amount}
                        format={(n) => money.format(n)}
                        suffix={form.currency}
                        onChange={(n) => updatePayment(p.id, { amount: n })}
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => removePayment(p.id)}
                      className={styles.removeButton}
                      aria-label={`${t.removePayment} ${i + 1}`}
                      title={t.removePayment}
                    >
                      <Icon name="x" size={16} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addPayment} className={styles.addButton}>
                  <Icon name="plus" size={16} />
                  {t.addPayment}
                </button>
              </div>
            </Card>
          </div>

          <div ref={resultRef} className={styles.resultColumn}>
            <div className="card p-5 sm:p-6">
              {!result.valid ? (
                <p className="m-0 text-sm text-text-secondary">{t.empty}</p>
              ) : !hasResult ? (
                <p className="m-0 text-sm text-text-secondary">{t.noDelay}</p>
              ) : (
                <>
                  <div className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-2">
                    {t.result[form.mode]}
                  </div>
                  <div className={styles.headline}>{cur(result.amount)}</div>

                  <dl className={styles.summary}>
                    <div>
                      <dt>{t.days}</dt>
                      <dd>{result.days}</dd>
                    </div>
                    {result.paid > 0 && (
                      <div>
                        <dt>{t.paid}</dt>
                        <dd>{cur(result.paid)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>{t.outstanding}</dt>
                      <dd>{cur(result.outstanding)}</dd>
                    </div>
                    <div className={styles.summaryTotal}>
                      <dt>{t.totalDue}</dt>
                      <dd>{cur(result.totalDue)}</dd>
                    </div>
                  </dl>

                  <PeriodTable
                    t={t}
                    result={result}
                    date={date}
                    cur={cur}
                    rateLabel={rateLabel}
                    rateDetail={rateDetail}
                  />

                  {notes.map((note) => (
                    <p key={note} className="m-0 mt-3 text-xs text-text-secondary">
                      {note}
                    </p>
                  ))}

                  <button type="button" onClick={printCalculation} className={styles.printButton}>
                    <Icon name="file-text" size={16} />
                    {t.print}
                  </button>
                </>
              )}

              <p className="m-0 mt-5 text-xs text-text-secondary leading-relaxed">{t.choiceNote}</p>
              <p className="m-0 mt-2 text-xs text-text-secondary leading-relaxed">
                {fill(t.disclaimer, { date: date(BASE_RATES_CHECKED) })}
              </p>

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
                  href={legalHref}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/85 no-underline"
                >
                  {t.legal}
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {hasResult && (
          <MobileResultBar
            locale={locale}
            target={resultRef}
            label={t.result[form.mode]}
            value={cur(result.amount)}
          />
        )}
      </Container>

      {mounted &&
        hasResult &&
        createPortal(
          <div className={styles.printPortal}>
            <h1 className={styles.printTitle}>{t.printTitle[form.mode]}</h1>
            <p>
              {fill(t.printDebt, {
                amount: cur(form.principal),
                due: date(form.dueDate),
                until: date(form.paymentDate),
              })}
            </p>
            <p>{basis}</p>
            {form.mode === "statutory" && <p>{t.debtors[form.debtor]}</p>}
            {result.paid > 0 && (
              <>
                <h2 className={styles.printSubtitle}>{t.printPayments}</h2>
                <ul>
                  {form.payments
                    .filter((p) => p.amount > 0 && p.date)
                    .map((p) => (
                      <li key={p.id}>
                        {date(p.date)} — {cur(p.amount)}
                      </li>
                    ))}
                </ul>
              </>
            )}
            <PeriodTable
              t={t}
              result={result}
              date={date}
              cur={cur}
              rateLabel={rateLabel}
              rateDetail={rateDetail}
            />
            <dl className={styles.printSummary}>
              <div>
                <dt>{t.days}</dt>
                <dd>{result.days}</dd>
              </div>
              <div>
                <dt>{t.result[form.mode]}</dt>
                <dd>{cur(result.amount)}</dd>
              </div>
              <div>
                <dt>{t.outstanding}</dt>
                <dd>{cur(result.outstanding)}</dd>
              </div>
              <div>
                <dt>{t.totalDue}</dt>
                <dd>{cur(result.totalDue)}</dd>
              </div>
            </dl>
            {notes.map((note) => (
              <p key={note} className={styles.printNote}>
                {note}
              </p>
            ))}
            <p className={styles.printNote}>{fill(t.generated, { date: date(todayIso()) })}</p>
          </div>,
          document.body,
        )}
    </section>
  );
}

interface PeriodTableProps {
  t: Copy;
  result: LatePaymentResult;
  date: (iso: string) => string;
  cur: (n: number) => string;
  rateLabel: (period: LatePaymentPeriod) => string;
  rateDetail: (period: LatePaymentPeriod) => string | null;
}

function PeriodTable({ t, result, date, cur, rateLabel, rateDetail }: PeriodTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{t.period}</th>
            <th scope="col">{t.daysCol}</th>
            <th scope="col">{t.principalCol}</th>
            <th scope="col">{t.rateCol}</th>
            <th scope="col">{t.amountCol}</th>
          </tr>
        </thead>
        <tbody>
          {result.periods.map((p) => (
            <tr key={p.from}>
              <td>
                {date(p.from)} – {date(p.to)}
              </td>
              <td>{p.days}</td>
              <td>{cur(p.principal)}</td>
              <td>
                {rateLabel(p)}
                {p.estimated ? " *" : ""}
                {rateDetail(p) && <span className={styles.rateDetail}>{rateDetail(p)}</span>}
              </td>
              <td>{cur(p.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">{t.total}</th>
            <td>{result.days}</td>
            <td />
            <td />
            <td>{cur(result.amount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-base font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div className="field min-w-0">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <span className="text-xs text-text-secondary">{hint}</span>}
    </div>
  );
}

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

function Segmented<T extends string>({ label, value, options, onChange }: SegmentedProps<T>) {
  return (
    <div className={styles.segmented} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={value === o.value ? styles.segmentActive : styles.segment}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

interface NumberInputProps {
  id: string;
  value: number;
  format?: (value: number) => string;
  suffix?: string;
  onChange: (value: number) => void;
}

function NumberInput({ id, value, format, suffix, onChange }: NumberInputProps) {
  const [text, setText] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const parse = (raw: string) => (raw.trim() === "" ? 0 : parseAmount(raw));
  useEffect(() => {
    const current = text.trim() === "" ? 0 : parseAmount(text);
    if (!focused && current !== value) setText(String(value));
  }, [value, text, focused]);
  const shown = !focused && format ? format(value) : text;
  const input = (
    <input
      id={id}
      className="input"
      inputMode="decimal"
      value={shown}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        const next = e.target.value.replace(/[^\d.,\s]/g, "");
        setText(next);
        onChange(Math.max(0, parse(next)));
      }}
      onBlur={() => {
        setFocused(false);
        if (text.trim() === "") setText("0");
      }}
    />
  );
  if (!suffix) return input;
  return (
    <div className={styles.suffixWrap}>
      {input}
      <span className={styles.suffix} aria-hidden="true">
        {suffix}
      </span>
    </div>
  );
}
