import { useMemo, useRef, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../../lib/modalBus";
import { parseAmount } from "../invoice/invoiceMath";
import { NO_EXEMPTIONS } from "../payroll/payrollMath";
import { PAYROLL_RATES } from "../payroll/rates";
import {
  comparePayouts,
  type DividendRoute,
  type PayoutOption,
  type SalaryRoute,
} from "./dividendMath";
import { DIVIDEND_RATES } from "./rates";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./DividendCalculator.module.css";

interface Props {
  locale: Locale;
}

type Period = "year" | "month";

interface Copy {
  inputsTitle: string;
  periodLabel: string;
  perYearTab: string;
  perMonthTab: string;
  budget: string;
  budgetHint: string;
  mixSalary: string;
  mixSalaryHint: string;
  minimumWage: string;
  personalExemption: string;
  perYear: string;
  perMonth: string;
  bestLabel: string;
  advantage: string;
  tie: string;
  options: Record<PayoutOption, string>;
  netToOwner: string;
  totalTaxes: string;
  effectiveRate: string;
  breakdown: string;
  profitTax: string;
  dividendTax: string;
  employerSocial: string;
  employeeSocial: string;
  health: string;
  incomeTax: string;
  grossSalary: string;
  socialTitle: string;
  socialBody: string;
  disclaimer: string;
  cta: string;
  guide: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    inputsTitle: "Bugetul tău",
    periodLabel: "Calculez",
    perYearTab: "Pe an",
    perMonthTab: "Pe lună",
    budget: "Bani pe care firma îi poate cheltui pe tine",
    budgetHint: "Suma totală, înainte de orice impozit sau contribuție.",
    mixSalary: "Salariu brut în varianta mixtă",
    mixSalaryHint: "Restul bugetului se distribuie ca dividende.",
    minimumWage: "Salariul minim ({amount} MDL)",
    personalExemption: "Aplic scutirea personală la salariu",
    perYear: "MDL / an",
    perMonth: "MDL / lună",
    bestLabel: "Cea mai avantajoasă variantă",
    advantage: "+{amount} net față de varianta „{other}”",
    tie: "Variantele aduc practic aceeași sumă netă",
    options: { dividends: "Dividende", salary: "Salariu", mix: "Salariu + dividende" },
    netToOwner: "Primești net",
    totalTaxes: "Impozite și contribuții",
    effectiveRate: "Rată efectivă",
    breakdown: "Vezi detalierea calculului",
    profitTax: "Impozit pe profit ({rate})",
    dividendTax: "Impozit pe dividende ({rate})",
    employerSocial: "Contribuții sociale angajator ({rate})",
    employeeSocial: "Contribuții sociale angajat ({rate})",
    health: "Asigurare medicală ({rate})",
    incomeTax: "Impozit pe venit ({rate})",
    grossSalary: "Salariu brut",
    socialTitle: "Nu compara doar suma netă",
    socialBody:
      "Salariul îți aduce stagiu de cotizare pentru pensie, indemnizații de boală și de maternitate și poliță medicală prin angajator. Dividendele nu îți dau nicio protecție socială: dacă nu ești angajat, plătești singur polița medicală (12.636 MDL în 2026 sau 2.527 MDL dacă o achiți până la 31 martie).",
    disclaimer:
      "Estimare orientativă pentru {year}, pentru un SRL în regimul general de impozit pe profit. Dividendele se pot plăti doar din profitul net, după aprobarea situațiilor financiare sau ca dividende intermediare (trimestriale sau semestriale), pe baza situațiilor financiare interimare. Nu include TVA, regimul de 4% sau facilitățile fiscale.",
    cta: "Vreau o analiză pentru firma mea",
    guide: "Cum funcționează calculul",
  },
  ru: {
    inputsTitle: "Ваш бюджет",
    periodLabel: "Считаю",
    perYearTab: "За год",
    perMonthTab: "За месяц",
    budget: "Сколько компания может потратить на вас",
    budgetHint: "Общая сумма — до всех налогов и взносов.",
    mixSalary: "Зарплата брутто в смешанном варианте",
    mixSalaryHint: "Остаток бюджета выплачивается дивидендами.",
    minimumWage: "Минимальная зарплата ({amount} MDL)",
    personalExemption: "Применять личное освобождение к зарплате",
    perYear: "MDL / год",
    perMonth: "MDL / мес.",
    bestLabel: "Самый выгодный вариант",
    advantage: "+{amount} на руки по сравнению с вариантом «{other}»",
    tie: "Варианты дают практически одинаковую сумму на руки",
    options: { dividends: "Дивиденды", salary: "Зарплата", mix: "Зарплата + дивиденды" },
    netToOwner: "На руки",
    totalTaxes: "Налоги и взносы",
    effectiveRate: "Эффективная ставка",
    breakdown: "Показать детали расчёта",
    profitTax: "Налог на прибыль ({rate})",
    dividendTax: "Налог на дивиденды ({rate})",
    employerSocial: "Социальные взносы работодателя ({rate})",
    employeeSocial: "Социальные взносы работника ({rate})",
    health: "Медицинское страхование ({rate})",
    incomeTax: "Подоходный налог ({rate})",
    grossSalary: "Зарплата брутто",
    socialTitle: "Сравнивайте не только сумму на руки",
    socialBody:
      "Зарплата даёт страховой стаж для пенсии, пособия по болезни и по материнству и медицинский полис через работодателя. Дивиденды не дают никакой социальной защиты: если вы не работаете по найму, медицинский полис оплачиваете сами (12 636 MDL в 2026 году или 2 527 MDL при оплате до 31 марта).",
    disclaimer:
      "Ориентировочная оценка на {year} год для ООО на общем режиме налога на прибыль. Дивиденды выплачиваются только из чистой прибыли — после утверждения финансовой отчётности или как промежуточные (ежеквартальные или полугодовые) дивиденды на основании промежуточной финансовой отчётности. Не учитываются НДС, режим 4% и налоговые льготы.",
    cta: "Хочу анализ для моей компании",
    guide: "Как устроен расчёт",
  },
  en: {
    inputsTitle: "Your budget",
    periodLabel: "Calculate",
    perYearTab: "Per year",
    perMonthTab: "Per month",
    budget: "What the company can spend on you",
    budgetHint: "The total amount, before any tax or contribution.",
    mixSalary: "Gross salary in the mixed option",
    mixSalaryHint: "The rest of the budget is paid out as dividends.",
    minimumWage: "Minimum wage ({amount} MDL)",
    personalExemption: "Apply the personal exemption to salary",
    perYear: "MDL / year",
    perMonth: "MDL / month",
    bestLabel: "The best option",
    advantage: "+{amount} net compared with “{other}”",
    tie: "The options leave you with practically the same net amount",
    options: { dividends: "Dividends", salary: "Salary", mix: "Salary + dividends" },
    netToOwner: "You take home",
    totalTaxes: "Taxes and contributions",
    effectiveRate: "Effective rate",
    breakdown: "Show the calculation",
    profitTax: "Profit tax ({rate})",
    dividendTax: "Dividend tax ({rate})",
    employerSocial: "Employer social contributions ({rate})",
    employeeSocial: "Employee social contributions ({rate})",
    health: "Health insurance ({rate})",
    incomeTax: "Income tax ({rate})",
    grossSalary: "Gross salary",
    socialTitle: "Don't compare the net amount alone",
    socialBody:
      "A salary builds your pension record and gives you sick and maternity pay and health insurance through the employer. Dividends carry no social protection: if you are not employed, you pay for the health insurance policy yourself (12,636 MDL in 2026, or 2,527 MDL if paid by 31 March).",
    disclaimer:
      "Indicative estimate for {year}, for an LLC under the standard profit tax regime. Dividends can only be paid out of net profit, after the financial statements are approved or as interim (quarterly or half-yearly) dividends based on interim financial statements. VAT, the 4% regime and tax incentives are not included.",
    cta: "Get an analysis for my company",
    guide: "How the calculation works",
  },
};

const OPTIONS: PayoutOption[] = ["dividends", "salary", "mix"];
const DEFAULT_YEARLY_BUDGET = 600_000;

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function DividendCalculator({ locale }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<Period>("year");
  const [yearlyBudget, setYearlyBudget] = useState(DEFAULT_YEARLY_BUDGET);
  const [mixGross, setMixGross] = useState(DIVIDEND_RATES.minimumWage);
  const [personalExemption, setPersonalExemption] = useState(false);
  const nf = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 0 }),
    [locale],
  );
  const pf = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { style: "percent", maximumFractionDigits: 1 }),
    [locale],
  );
  const exemptionAvailable = PAYROLL_RATES.personalExemptionYearly > 0;
  const options = useMemo(
    () => ({ ...NO_EXEMPTIONS, personalExemption: exemptionAvailable && personalExemption }),
    [exemptionAvailable, personalExemption],
  );
  const result = useMemo(
    () =>
      comparePayouts(
        { yearlyBudget, mixGrossMonthly: mixGross },
        options,
        PAYROLL_RATES,
        DIVIDEND_RATES,
      ),
    [yearlyBudget, mixGross, options],
  );

  const divisor = period === "month" ? 12 : 1;
  const unit = period === "month" ? t.perMonth : t.perYear;
  const mdl = (n: number) => `${nf.format(Math.round(n / divisor))} MDL`;
  const rate = (r: number) => pf.format(r);
  const tie = result.advantage < 1;

  const byOption: Record<PayoutOption, { net: number; taxes: number; effectiveRate: number }> = {
    dividends: result.dividends,
    salary: result.salary,
    mix: result.mix,
  };

  const salaryLines = (route: SalaryRoute) => [
    { label: t.grossSalary, value: route.gross },
    { label: fill(t.employerSocial, { rate: rate(PAYROLL_RATES.employerSocialRate) }), value: route.employerSocial },
    ...(route.employeeSocial > 0
      ? [{ label: fill(t.employeeSocial, { rate: rate(PAYROLL_RATES.employeeSocialRate) }), value: route.employeeSocial }]
      : []),
    { label: fill(t.health, { rate: rate(PAYROLL_RATES.healthInsuranceRate) }), value: route.healthInsurance },
    { label: fill(t.incomeTax, { rate: rate(PAYROLL_RATES.incomeTaxRate) }), value: route.incomeTax },
  ];
  const dividendLines = (route: DividendRoute) => [
    { label: fill(t.profitTax, { rate: rate(DIVIDEND_RATES.profitTaxRate) }), value: route.profitTax },
    { label: fill(t.dividendTax, { rate: rate(DIVIDEND_RATES.dividendTaxRate) }), value: route.dividendTax },
  ];
  const breakdown: Record<PayoutOption, { label: string; value: number }[]> = {
    dividends: dividendLines(result.dividends),
    salary: salaryLines(result.salary),
    mix: [...salaryLines(result.mix.salary), ...dividendLines(result.mix.dividends)],
  };

  const rows: { label: string; format: (o: PayoutOption) => string; highlight: boolean }[] = [
    { label: t.netToOwner, format: (o) => mdl(byOption[o].net), highlight: true },
    { label: t.totalTaxes, format: (o) => mdl(byOption[o].taxes), highlight: false },
    { label: t.effectiveRate, format: (o) => rate(byOption[o].effectiveRate), highlight: false },
  ];

  return (
    <section id="calculator" className="section-sm section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="rounded-md border border-white/15 bg-white/5 p-6 sm:p-7 flex flex-col gap-7">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">
                {t.inputsTitle}
              </div>
              <div className={styles.toggle} role="group" aria-label={t.periodLabel}>
                {(["year", "month"] as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={period === p}
                    onClick={() => setPeriod(p)}
                    className={`${styles.toggleButton} ${period === p ? styles.toggleActive : ""}`}
                  >
                    {p === "year" ? t.perYearTab : t.perMonthTab}
                  </button>
                ))}
              </div>
            </div>

            <AmountField
              id="div-budget"
              label={t.budget}
              hint={t.budgetHint}
              unit={unit}
              value={Math.round(yearlyBudget / divisor)}
              min={0}
              max={period === "month" ? 500_000 : 6_000_000}
              step={period === "month" ? 1_000 : 10_000}
              ticks={period === "month" ? ["0", "100K", "250K", "500K"] : ["0", "1M", "3M", "6M"]}
              nf={nf}
              onChange={(v) => setYearlyBudget(Math.max(0, v) * divisor)}
            />

            <AmountField
              id="div-mix-salary"
              label={t.mixSalary}
              hint={t.mixSalaryHint}
              unit={t.perMonth}
              value={mixGross}
              min={0}
              max={100_000}
              step={100}
              ticks={["0", "25K", "50K", "100K"]}
              nf={nf}
              onChange={(v) => setMixGross(Math.max(0, v))}
            />

            <div className="flex flex-col gap-3 -mt-3">
              <button
                type="button"
                onClick={() => setMixGross(DIVIDEND_RATES.minimumWage)}
                className={styles.chip}
              >
                {fill(t.minimumWage, { amount: nf.format(DIVIDEND_RATES.minimumWage) })}
              </button>
              {exemptionAvailable && (
                <label className="flex items-center gap-2.5 text-sm font-semibold text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalExemption}
                    onChange={(e) => setPersonalExemption(e.target.checked)}
                    className={styles.checkbox}
                  />
                  {t.personalExemption}
                </label>
              )}
            </div>
          </div>

          <div ref={resultRef} className="lg:sticky lg:top-24 p-6 sm:p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-2">
              {t.bestLabel}
            </div>
            <div className="text-[36px] sm:text-[44px] font-extrabold tracking-tighter text-white leading-none">
              {t.options[result.best]}
            </div>
            <div className="text-sm text-white/70 mt-3" aria-live="polite">
              {tie
                ? t.tie
                : fill(t.advantage, {
                    amount: `${nf.format(Math.round(result.advantage / divisor))} ${unit}`,
                    other: t.options[result.runnerUp],
                  })}
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold tracking-widest uppercase text-white/55 align-bottom">
                    <th className="text-left font-bold pb-3 pr-3">{unit}</th>
                    {OPTIONS.map((o) => (
                      <th
                        key={o}
                        className={`text-right font-bold pb-3 px-2 ${
                          o === result.best ? "text-[#DFB741]" : ""
                        }`}
                      >
                        {t.options[o]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-white/10">
                      <th scope="row" className="text-left font-semibold text-white/80 py-3 pr-3">
                        {row.label}
                      </th>
                      {OPTIONS.map((o) => (
                        <td
                          key={o}
                          className={`text-right whitespace-nowrap py-3 px-2 font-bold ${
                            row.highlight && o === result.best ? "text-[#DFB741]" : "text-white/85"
                          }`}
                        >
                          {row.format(o)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-white/80 list-none flex items-center gap-1.5">
                <Icon name="chevron-right" size={16} />
                {t.breakdown}
              </summary>
              <div className="mt-4 grid gap-5 sm:grid-cols-3 text-xs">
                {OPTIONS.map((o) => (
                  <div key={o}>
                    <div
                      className={`font-bold uppercase tracking-wider mb-2 ${
                        o === result.best ? "text-[#DFB741]" : "text-white/70"
                      }`}
                    >
                      {t.options[o]}
                    </div>
                    <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                      {breakdown[o].map((line) => (
                        <li key={line.label} className="flex justify-between gap-3 text-white">
                          <span className="text-white/75">{line.label}</span>
                          <span className="font-semibold whitespace-nowrap">{mdl(line.value)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between gap-3 text-white border-t border-white/15 pt-1.5">
                        <span className="font-semibold">{t.netToOwner}</span>
                        <span className="font-bold whitespace-nowrap">{mdl(byOption[o].net)}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-5 flex gap-3 rounded-md border border-white/15 bg-white/5 p-4">
              <span className="text-[#DFB741] shrink-0 mt-0.5">
                <Icon name="shield" size={18} />
              </span>
              <div>
                <div className="text-sm font-bold text-white mb-1">{t.socialTitle}</div>
                <p className="m-0 text-xs text-white/70 leading-relaxed">{t.socialBody}</p>
              </div>
            </div>

            <p className="m-0 mt-5 text-xs text-white/55 leading-relaxed">
              {fill(t.disclaimer, { year: DIVIDEND_RATES.year })}
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
                href="#ghid"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/85 no-underline"
              >
                {t.guide}
                <Icon name="arrow-right" size={14} />
              </a>
            </div>
          </div>
        </div>
        <MobileResultBar
          locale={locale}
          target={resultRef}
          label={t.bestLabel}
          value={t.options[result.best]}
        />
      </Container>
    </section>
  );
}

interface AmountFieldProps {
  id: string;
  label: string;
  hint: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  ticks: string[];
  nf: Intl.NumberFormat;
  onChange: (value: number) => void;
}

function AmountField({
  id,
  label,
  hint,
  unit,
  value,
  min,
  max,
  step,
  ticks,
  nf,
  onChange,
}: AmountFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-end mb-1 gap-x-3 gap-y-1">
        <label htmlFor={id} className="grow basis-44 text-sm font-bold text-white/85">
          {label}
        </label>
        <span className="ml-auto flex items-baseline gap-1.5 shrink-0">
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={draft ?? nf.format(value)}
            onFocus={() => setDraft(String(value))}
            onBlur={() => setDraft(null)}
            onChange={(e) => {
              setDraft(e.target.value);
              onChange(parseAmount(e.target.value));
            }}
            className={styles.valueInput}
          />
          <span className="text-xs font-semibold text-white/55">{unit}</span>
        </span>
      </div>
      <p className="m-0 mb-3 text-xs text-white/50">{hint}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        aria-label={label}
      />
      <div className="flex justify-between mt-1.5 text-[11px] font-semibold text-white/50">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
