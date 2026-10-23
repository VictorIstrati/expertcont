import { useMemo, useRef, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../../lib/modalBus";
import { compareRegimes, type ItParkInput } from "./itParkMath";
import { IT_PARK_RATES } from "./rates";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./ItParkCalculator.module.css";

interface Props {
  locale: Locale;
  guideHref: string;
}

interface Copy {
  inputsTitle: string;
  revenue: string;
  employees: string;
  grossSalary: string;
  otherExpenses: string;
  perMonth: string;
  people: string;
  savingsLabel: string;
  lossLabel: string;
  perYear: string;
  itPark: string;
  standard: string;
  totalTaxes: string;
  netProfit: string;
  netSalary: string;
  effectiveRate: string;
  breakdown: string;
  singleTax: string;
  minimumNote: string;
  percentNote: string;
  employerSocial: string;
  employeeSocial: string;
  health: string;
  incomeTax: string;
  profitTax: string;
  disclaimer: string;
  cta: string;
  guide: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    inputsTitle: "Datele companiei",
    revenue: "Venit lunar din vânzări",
    employees: "Număr de angajați",
    grossSalary: "Salariu brut mediu per angajat",
    otherExpenses: "Alte cheltuieli lunare",
    perMonth: "MDL / lună",
    people: "pers.",
    savingsLabel: "Economie lunară cu IT Park",
    lossLabel: "Regimul general e mai avantajos cu",
    perYear: "pe an",
    itPark: "IT Park 7%",
    standard: "Regim general",
    totalTaxes: "Taxe totale către stat",
    netProfit: "Profit net al companiei",
    netSalary: "Salariu net per angajat",
    effectiveRate: "Rată efectivă din venit",
    breakdown: "Vezi detalierea calculului",
    singleTax: "Impozit unic",
    minimumNote: "se aplică minimul de {amount} MDL × angajați",
    percentNote: "7% din venit",
    employerSocial: "Contribuții sociale angajator (24%)",
    employeeSocial: "Contribuții sociale angajat",
    health: "Asigurare medicală (9%)",
    incomeTax: "Impozit pe venit din salarii (12%)",
    profitTax: "Impozit pe profit (12%)",
    disclaimer:
      "Estimare orientativă pentru {year}, fără TVA, scutiri personale și dividende. Statutul IT Park cere ca cel puțin 70% din venitul din vânzări să provină din activități eligibile.",
    cta: "Vreau o analiză personalizată",
    guide: "Ghidul complet IT Park",
  },
  ru: {
    inputsTitle: "Данные компании",
    revenue: "Ежемесячная выручка",
    employees: "Количество сотрудников",
    grossSalary: "Средняя зарплата брутто на сотрудника",
    otherExpenses: "Прочие ежемесячные расходы",
    perMonth: "MDL / мес.",
    people: "чел.",
    savingsLabel: "Экономия в месяц с IT Park",
    lossLabel: "Общий режим выгоднее на",
    perYear: "в год",
    itPark: "IT Park 7%",
    standard: "Общий режим",
    totalTaxes: "Всего налогов государству",
    netProfit: "Чистая прибыль компании",
    netSalary: "Зарплата на руки на сотрудника",
    effectiveRate: "Эффективная ставка от выручки",
    breakdown: "Показать детали расчёта",
    singleTax: "Единый налог",
    minimumNote: "применяется минимум {amount} MDL × сотрудники",
    percentNote: "7% от выручки",
    employerSocial: "Социальные взносы работодателя (24%)",
    employeeSocial: "Социальные взносы работника",
    health: "Медицинское страхование (9%)",
    incomeTax: "Подоходный налог с зарплат (12%)",
    profitTax: "Налог на прибыль (12%)",
    disclaimer:
      "Ориентировочная оценка на {year} год, без НДС, личных освобождений и дивидендов. Статус IT Park требует, чтобы не менее 70% выручки от продаж приходилось на разрешённые виды деятельности.",
    cta: "Хочу персональный анализ",
    guide: "Полное руководство по IT Park",
  },
  en: {
    inputsTitle: "Your company",
    revenue: "Monthly sales revenue",
    employees: "Number of employees",
    grossSalary: "Average gross salary per employee",
    otherExpenses: "Other monthly expenses",
    perMonth: "MDL / month",
    people: "people",
    savingsLabel: "Monthly savings with IT Park",
    lossLabel: "The standard regime is cheaper by",
    perYear: "per year",
    itPark: "IT Park 7%",
    standard: "Standard regime",
    totalTaxes: "Total taxes paid to the state",
    netProfit: "Company net profit",
    netSalary: "Net salary per employee",
    effectiveRate: "Effective rate on revenue",
    breakdown: "Show the calculation",
    singleTax: "Single tax",
    minimumNote: "minimum of {amount} MDL × employees applies",
    percentNote: "7% of revenue",
    employerSocial: "Employer social contributions (24%)",
    employeeSocial: "Employee social contributions",
    health: "Health insurance (9%)",
    incomeTax: "Income tax on salaries (12%)",
    profitTax: "Profit tax (12%)",
    disclaimer:
      "Indicative estimate for {year}, excluding VAT, personal exemptions and dividends. IT Park status requires at least 70% of sales revenue to come from eligible activities.",
    cta: "Get a personalised analysis",
    guide: "Full IT Park guide",
  },
};

const DEFAULT_INPUT: ItParkInput = {
  revenue: 300_000,
  employees: 5,
  grossSalary: 30_000,
  otherExpenses: 30_000,
};

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function ItParkCalculator({ locale, guideHref }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<ItParkInput>(DEFAULT_INPUT);
  const nf = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 0 }),
    [locale],
  );
  const pf = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { style: "percent", maximumFractionDigits: 1 }),
    [locale],
  );
  const result = useMemo(() => compareRegimes(input, IT_PARK_RATES), [input]);
  const { itPark, standard } = result;
  const saves = result.monthlySavings >= 0;
  const mdl = (n: number) => `${nf.format(Math.round(n))} MDL`;

  function update<K extends keyof ItParkInput>(key: K, value: number) {
    setInput((s) => ({ ...s, [key]: Number.isFinite(value) ? Math.max(0, value) : 0 }));
  }

  const rows: { label: string; it: string; std: string; better: "it" | "std" | null }[] = [
    {
      label: t.totalTaxes,
      it: mdl(itPark.totalTaxes),
      std: mdl(standard.totalTaxes),
      better: itPark.totalTaxes <= standard.totalTaxes ? "it" : "std",
    },
    {
      label: t.netProfit,
      it: mdl(itPark.netProfit),
      std: mdl(standard.netProfit),
      better: itPark.netProfit >= standard.netProfit ? "it" : "std",
    },
    {
      label: t.netSalary,
      it: mdl(itPark.netSalary),
      std: mdl(standard.netSalary),
      better: input.employees > 0 ? "it" : null,
    },
    {
      label: t.effectiveRate,
      it: pf.format(itPark.effectiveRate),
      std: pf.format(standard.effectiveRate),
      better: null,
    },
  ];

  const standardLines = [
    { label: t.employerSocial, value: standard.employerSocial },
    ...(standard.employeeSocial > 0
      ? [{ label: t.employeeSocial, value: standard.employeeSocial }]
      : []),
    { label: t.health, value: standard.healthInsurance },
    { label: t.incomeTax, value: standard.incomeTax },
    { label: t.profitTax, value: standard.profitTax },
  ];

  return (
    <section id="calculator" className="section-sm section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="rounded-md border border-white/15 bg-white/5 p-6 sm:p-7 flex flex-col gap-7">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">
              {t.inputsTitle}
            </div>
            <SliderField
              id="itp-revenue"
              label={t.revenue}
              unit={t.perMonth}
              value={input.revenue}
              min={0}
              max={5_000_000}
              step={10_000}
              ticks={["0", "1M", "2,5M", "5M"]}
              nf={nf}
              onChange={(v) => update("revenue", v)}
            />
            <SliderField
              id="itp-employees"
              label={t.employees}
              unit={t.people}
              value={input.employees}
              min={1}
              max={100}
              step={1}
              ticks={["1", "25", "50", "100"]}
              nf={nf}
              onChange={(v) => update("employees", v)}
            />
            <SliderField
              id="itp-salary"
              label={t.grossSalary}
              unit={t.perMonth}
              value={input.grossSalary}
              min={5_000}
              max={150_000}
              step={1_000}
              ticks={["5K", "50K", "100K", "150K"]}
              nf={nf}
              onChange={(v) => update("grossSalary", v)}
            />
            <SliderField
              id="itp-expenses"
              label={t.otherExpenses}
              unit={t.perMonth}
              value={input.otherExpenses}
              min={0}
              max={1_000_000}
              step={5_000}
              ticks={["0", "250K", "500K", "1M"]}
              nf={nf}
              onChange={(v) => update("otherExpenses", v)}
            />
          </div>

          <div
            ref={resultRef}
            className="lg:sticky lg:top-24 p-6 sm:p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]"
          >
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-2">
              {saves ? t.savingsLabel : t.lossLabel}
            </div>
            <div className="text-[44px] sm:text-[56px] font-extrabold tracking-tighter text-white leading-none">
              {nf.format(Math.round(Math.abs(result.monthlySavings)))}
              <span className="text-lg font-semibold text-white/70 tracking-normal ml-2">
                {t.perMonth}
              </span>
            </div>
            <div className="text-sm text-white/65 mt-2">
              {mdl(Math.abs(result.yearlySavings))} {t.perYear}
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold tracking-widest uppercase text-white/55">
                    <th className="text-left font-bold pb-3 pr-3" />
                    <th className="text-right font-bold pb-3 px-2 text-[#DFB741]">{t.itPark}</th>
                    <th className="text-right font-bold pb-3 pl-2">{t.standard}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-white/10">
                      <th scope="row" className="text-left font-semibold text-white/80 py-3 pr-3">
                        {row.label}
                      </th>
                      <td
                        className={`text-right whitespace-nowrap py-3 px-2 font-bold ${
                          row.better === "it" ? "text-[#DFB741]" : "text-white"
                        }`}
                      >
                        {row.it}
                      </td>
                      <td
                        className={`text-right whitespace-nowrap py-3 pl-2 font-bold ${
                          row.better === "std" ? "text-[#DFB741]" : "text-white/80"
                        }`}
                      >
                        {row.std}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <details className="mt-4 group">
              <summary className="cursor-pointer text-sm font-semibold text-white/80 list-none flex items-center gap-1.5">
                <Icon name="chevron-right" size={16} />
                {t.breakdown}
              </summary>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 text-xs">
                <div>
                  <div className="font-bold text-[#DFB741] uppercase tracking-wider mb-2">
                    {t.itPark}
                  </div>
                  <div className="flex justify-between gap-3 text-white">
                    <span>{t.singleTax}</span>
                    <span className="font-semibold whitespace-nowrap">{mdl(itPark.singleTax)}</span>
                  </div>
                  <p className="m-0 mt-1 text-white/55">
                    {itPark.minimumApplies
                      ? fill(t.minimumNote, { amount: nf.format(IT_PARK_RATES.minimumPerEmployee) })
                      : t.percentNote}
                  </p>
                </div>
                <div>
                  <div className="font-bold text-white/70 uppercase tracking-wider mb-2">
                    {t.standard}
                  </div>
                  <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                    {standardLines.map((line) => (
                      <li key={line.label} className="flex justify-between gap-3 text-white">
                        <span className="text-white/80">{line.label}</span>
                        <span className="font-semibold whitespace-nowrap">{mdl(line.value)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>

            <p className="m-0 mt-5 text-xs text-white/55 leading-relaxed">
              {fill(t.disclaimer, { year: IT_PARK_RATES.year })}
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
                href={guideHref}
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
          label={saves ? t.savingsLabel : t.lossLabel}
          value={`${nf.format(Math.round(Math.abs(result.monthlySavings)))} ${t.perMonth}`}
        />
      </Container>
    </section>
  );
}

interface SliderFieldProps {
  id: string;
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  ticks: string[];
  nf: Intl.NumberFormat;
  onChange: (value: number) => void;
}

function SliderField({
  id,
  label,
  unit,
  value,
  min,
  max,
  step,
  ticks,
  nf,
  onChange,
}: SliderFieldProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-end mb-3 gap-x-3 gap-y-1">
        <label htmlFor={id} className="grow basis-44 text-sm font-bold text-white/85">
          {label}
        </label>
        <span className="ml-auto flex items-baseline gap-1.5 shrink-0">
          <input
            id={id}
            type="text"
            inputMode="numeric"
            value={nf.format(value)}
            onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")))}
            className={styles.valueInput}
          />
          <span className="text-xs font-semibold text-white/55">{unit}</span>
        </span>
      </div>
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
