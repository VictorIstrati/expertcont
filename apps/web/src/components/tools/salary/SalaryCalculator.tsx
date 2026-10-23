import { useMemo, useRef, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../../lib/modalBus";
import { parseAmount } from "../invoice/invoiceMath";
import { grossToNet, netToGross, type PayrollOptions } from "../payroll/payrollMath";
import { PAYROLL_RATES } from "../payroll/rates";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./SalaryCalculator.module.css";

interface Props {
  locale: Locale;
  serviceHref: string;
}

type Mode = "gross" | "net";
type Period = "month" | "year";

interface Copy {
  inputsTitle: string;
  modeGross: string;
  modeNet: string;
  amountGross: string;
  amountNet: string;
  perMonth: string;
  exemptionsTitle: string;
  personal: string;
  personalHint: string;
  dependants: string;
  dependantsHint: string;
  special: string;
  increased: string;
  increasedHint: string;
  spouse: string;
  spouseHint: string;
  disabledDependants: string;
  disabledDependantsHint: string;
  decrease: string;
  increase: string;
  netLabel: string;
  grossLabel: string;
  monthly: string;
  yearly: string;
  perMonthShort: string;
  perYearShort: string;
  employeeTitle: string;
  gross: string;
  employeeSocial: string;
  health: string;
  exemptions: string;
  taxable: string;
  incomeTax: string;
  net: string;
  employerTitle: string;
  employerSocial: string;
  employerCost: string;
  ceilingNote: string;
  disclaimer: string;
  cta: string;
  service: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    inputsTitle: "Datele salariului",
    modeGross: "Din brut în net",
    modeNet: "Din net în brut",
    amountGross: "Salariu brut lunar",
    amountNet: "Salariu net dorit (în mână)",
    perMonth: "MDL / lună",
    exemptionsTitle: "Scutiri la impozitul pe venit",
    personal: "Scutire personală",
    personalHint: "{amount} MDL pe an, dacă venitul anual impozabil e sub {ceiling} MDL",
    dependants: "Persoane întreținute",
    dependantsHint: "{amount} MDL pe an pentru fiecare",
    special: "Scutiri speciale",
    increased: "Scutire personală majoră",
    increasedHint: "{amount} MDL pe an — categoriile din art. 33 alin. (2) CF",
    spouse: "Scutire pentru soț/soție",
    spouseHint:
      "{amount} MDL pe an — dacă soțul/soția face parte din categoriile art. 33 alin. (2) și nu își folosește scutirea personală",
    disabledDependants: "Întreținuți cu dizabilitate severă/accentuată sau din copilărie",
    disabledDependantsHint: "{amount} MDL pe an pentru fiecare, în locul scutirii de {regular} MDL",
    decrease: "Scade",
    increase: "Crește",
    netLabel: "Salariu net",
    grossLabel: "Salariu brut necesar",
    monthly: "Lunar",
    yearly: "Anual",
    perMonthShort: "MDL / lună",
    perYearShort: "MDL / an",
    employeeTitle: "Rețineri din salariu",
    gross: "Salariu brut",
    employeeSocial: "Contribuție socială individuală",
    health: "Asigurare medicală ({rate})",
    exemptions: "Scutiri aplicate",
    taxable: "Venit impozabil",
    incomeTax: "Impozit pe venit ({rate})",
    net: "Salariu net",
    employerTitle: "Costul pentru angajator",
    employerSocial: "Contribuții sociale ({rate})",
    employerCost: "Cost total angajator",
    ceilingNote:
      "Scutirea personală nu se aplică: venitul anual impozabil (brut minus asigurarea medicală și celelalte scutiri) ar atinge sau depăși {ceiling} MDL. Scutirile pentru soț/soție și întreținuți rămân.",
    disclaimer:
      "Calcul orientativ pentru {year}, pentru un angajat rezident din sectorul privat, cu salariul constant tot anul. Nu include sporuri, concedii, indemnizații sau recalcularea anuală a impozitului.",
    cta: "Vreau o consultație",
    service: "Servicii HR și salarizare",
  },
  ru: {
    inputsTitle: "Данные о зарплате",
    modeGross: "Из брутто в нетто",
    modeNet: "Из нетто в брутто",
    amountGross: "Зарплата брутто в месяц",
    amountNet: "Желаемая зарплата на руки",
    perMonth: "MDL / мес.",
    exemptionsTitle: "Освобождения по подоходному налогу",
    personal: "Личное освобождение",
    personalHint: "{amount} MDL в год, если годовой налогооблагаемый доход меньше {ceiling} MDL",
    dependants: "Иждивенцы",
    dependantsHint: "{amount} MDL в год за каждого",
    special: "Особые освобождения",
    increased: "Повышенное личное освобождение",
    increasedHint: "{amount} MDL в год — категории из ч. (2) ст. 33 НК",
    spouse: "Освобождение на супруга/супругу",
    spouseHint:
      "{amount} MDL в год — если супруг(а) относится к категориям ч. (2) ст. 33 и не пользуется своим личным освобождением",
    disabledDependants: "Иждивенцы с тяжёлой/выраженной инвалидностью или инвалидностью с детства",
    disabledDependantsHint: "{amount} MDL в год за каждого, вместо освобождения {regular} MDL",
    decrease: "Уменьшить",
    increase: "Увеличить",
    netLabel: "Зарплата на руки",
    grossLabel: "Необходимая зарплата брутто",
    monthly: "В месяц",
    yearly: "В год",
    perMonthShort: "MDL / мес.",
    perYearShort: "MDL / год",
    employeeTitle: "Удержания из зарплаты",
    gross: "Зарплата брутто",
    employeeSocial: "Индивидуальный социальный взнос",
    health: "Медицинское страхование ({rate})",
    exemptions: "Применённые освобождения",
    taxable: "Налогооблагаемый доход",
    incomeTax: "Подоходный налог ({rate})",
    net: "Зарплата на руки",
    employerTitle: "Стоимость для работодателя",
    employerSocial: "Социальные взносы ({rate})",
    employerCost: "Полная стоимость для работодателя",
    ceilingNote:
      "Личное освобождение не применяется: годовой налогооблагаемый доход (брутто минус медстрахование и другие освобождения) достигнет {ceiling} MDL или превысит эту сумму. Освобождения на супруга и иждивенцев сохраняются.",
    disclaimer:
      "Ориентировочный расчёт на {year} год для работника-резидента в частном секторе с одинаковой зарплатой весь год. Не учитывает надбавки, отпуска, пособия и годовой перерасчёт налога.",
    cta: "Хочу консультацию",
    service: "Кадровые услуги и расчёт зарплаты",
  },
  en: {
    inputsTitle: "Salary details",
    modeGross: "Gross to net",
    modeNet: "Net to gross",
    amountGross: "Monthly gross salary",
    amountNet: "Desired net (take-home) salary",
    perMonth: "MDL / month",
    exemptionsTitle: "Income tax exemptions",
    personal: "Personal exemption",
    personalHint: "{amount} MDL a year, if yearly taxable income is below {ceiling} MDL",
    dependants: "Dependants",
    dependantsHint: "{amount} MDL a year each",
    special: "Special exemptions",
    increased: "Increased personal exemption",
    increasedHint: "{amount} MDL a year — categories in Art. 33(2) of the Tax Code",
    spouse: "Spouse exemption",
    spouseHint:
      "{amount} MDL a year — if your spouse falls under Art. 33(2) and does not use their own personal exemption",
    disabledDependants: "Dependants with a severe, marked or childhood disability",
    disabledDependantsHint: "{amount} MDL a year each, instead of the {regular} MDL exemption",
    decrease: "Decrease",
    increase: "Increase",
    netLabel: "Net salary",
    grossLabel: "Gross salary needed",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonthShort: "MDL / month",
    perYearShort: "MDL / year",
    employeeTitle: "Withheld from the salary",
    gross: "Gross salary",
    employeeSocial: "Employee social contribution",
    health: "Health insurance ({rate})",
    exemptions: "Exemptions applied",
    taxable: "Taxable income",
    incomeTax: "Income tax ({rate})",
    net: "Net salary",
    employerTitle: "Cost to the employer",
    employerSocial: "Social contributions ({rate})",
    employerCost: "Total employer cost",
    ceilingNote:
      "The personal exemption does not apply: yearly taxable income (gross minus health insurance and the other exemptions) would reach or exceed {ceiling} MDL. Spouse and dependant exemptions still apply.",
    disclaimer:
      "Indicative calculation for {year} for a resident private-sector employee paid the same salary all year. Excludes bonuses, leave, benefits and the year-end tax recalculation.",
    cta: "Book a consultation",
    service: "HR and payroll services",
  },
};

interface ExemptionState {
  personalExemption: boolean;
  increasedPersonalExemption: boolean;
  spouseExemption: boolean;
  dependants: number;
  disabledDependants: number;
}

const DEFAULT_EXEMPTIONS: ExemptionState = {
  personalExemption: true,
  increasedPersonalExemption: false,
  spouseExemption: false,
  dependants: 0,
  disabledDependants: 0,
};

const MAX_DEPENDANTS = 10;

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function SalaryCalculator({ locale, serviceHref }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("gross");
  const [period, setPeriod] = useState<Period>("month");
  const [raw, setRaw] = useState("15 000");
  const [ex, setEx] = useState<ExemptionState>(DEFAULT_EXEMPTIONS);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(localeTag(locale), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const nf0 = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 0 }),
    [locale],
  );
  const pct = (rate: number) => `${Math.round(rate * 100)}%`;

  const amount = parseAmount(raw);
  const result = useMemo(() => {
    const options: PayrollOptions = {
      personalExemption: ex.personalExemption && !ex.increasedPersonalExemption,
      increasedPersonalExemption: ex.increasedPersonalExemption,
      spouseExemption: ex.spouseExemption,
      dependants: ex.dependants,
      disabledDependants: ex.disabledDependants,
    };
    return mode === "gross"
      ? grossToNet(amount, options, PAYROLL_RATES)
      : netToGross(amount, options, PAYROLL_RATES);
  }, [mode, amount, ex]);

  const factor = period === "year" ? 12 : 1;
  const unit = period === "year" ? t.perYearShort : t.perMonthShort;
  const money = (n: number) => `${nf.format(n * factor)} MDL`;
  const headline = mode === "gross" ? result.net : result.gross;

  function switchMode(next: Mode) {
    if (next === mode) return;
    const carry = next === "gross" ? result.gross : result.net;
    setMode(next);
    setRaw(nf.format(carry));
  }

  function toggle(key: "personalExemption" | "increasedPersonalExemption" | "spouseExemption") {
    setEx((s) => ({ ...s, [key]: !s[key] }));
  }

  function step(key: "dependants" | "disabledDependants", delta: number) {
    setEx((s) => ({ ...s, [key]: Math.min(MAX_DEPENDANTS, Math.max(0, s[key] + delta)) }));
  }

  const employeeRows: { label: string; value: number; strong: boolean; muted?: boolean }[] = [
    { label: t.gross, value: result.gross, strong: false },
    ...(PAYROLL_RATES.employeeSocialRate > 0
      ? [{ label: t.employeeSocial, value: -result.employeeSocial, strong: false }]
      : []),
    {
      label: fill(t.health, { rate: pct(PAYROLL_RATES.healthInsuranceRate) }),
      value: -result.healthInsurance,
      strong: false,
    },
    { label: t.exemptions, value: result.exemptions, strong: false, muted: true },
    { label: t.taxable, value: result.taxableIncome, strong: false, muted: true },
    {
      label: fill(t.incomeTax, { rate: pct(PAYROLL_RATES.incomeTaxRate) }),
      value: -result.incomeTax,
      strong: false,
    },
    { label: t.net, value: result.net, strong: true },
  ];

  const ceiling = nf0.format(PAYROLL_RATES.personalExemptionIncomeCeiling);
  const yearlyHint = (n: number) => nf0.format(n);

  return (
    <section id="calculator" className="section-sm section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="rounded-md border border-white/15 bg-white/5 p-6 sm:p-7 flex flex-col gap-7">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">
              {t.inputsTitle}
            </div>

            <div className={styles.segmented} role="group" aria-label={t.inputsTitle}>
              {(["gross", "net"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => switchMode(m)}
                  className={`${styles.segment} ${mode === m ? styles.segmentActive : ""}`}
                >
                  {m === "gross" ? t.modeGross : t.modeNet}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="salary-amount" className="block text-sm font-bold text-white/85 mb-3">
                {mode === "gross" ? t.amountGross : t.amountNet}
              </label>
              <div className={styles.amountBox}>
                <input
                  id="salary-amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  className={styles.amountInput}
                />
                <span className="text-sm font-semibold text-white/55 shrink-0">{t.perMonth}</span>
              </div>
            </div>

            <fieldset className="border-0 p-0 m-0 flex flex-col gap-4">
              <legend className="text-sm font-bold text-white/85 mb-3 p-0">
                {t.exemptionsTitle}
              </legend>
              <CheckField
                id="salary-personal"
                label={t.personal}
                hint={fill(t.personalHint, {
                  amount: yearlyHint(PAYROLL_RATES.personalExemptionYearly),
                  ceiling,
                })}
                checked={ex.personalExemption || ex.increasedPersonalExemption}
                disabled={ex.increasedPersonalExemption}
                onChange={() => toggle("personalExemption")}
              />
              <StepperField
                label={t.dependants}
                hint={fill(t.dependantsHint, {
                  amount: yearlyHint(PAYROLL_RATES.dependantExemptionYearly),
                })}
                value={ex.dependants}
                decrease={t.decrease}
                increase={t.increase}
                onStep={(d) => step("dependants", d)}
              />
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-white/75 list-none flex items-center gap-1.5">
                  <span className={styles.chevron}>
                    <Icon name="chevron-right" size={16} />
                  </span>
                  {t.special}
                </summary>
                <div className="mt-4 flex flex-col gap-4">
                  <CheckField
                    id="salary-increased"
                    label={t.increased}
                    hint={fill(t.increasedHint, {
                      amount: yearlyHint(PAYROLL_RATES.increasedPersonalExemptionYearly),
                    })}
                    checked={ex.increasedPersonalExemption}
                    onChange={() => toggle("increasedPersonalExemption")}
                  />
                  <CheckField
                    id="salary-spouse"
                    label={t.spouse}
                    hint={fill(t.spouseHint, {
                      amount: yearlyHint(PAYROLL_RATES.spouseExemptionYearly),
                    })}
                    checked={ex.spouseExemption}
                    onChange={() => toggle("spouseExemption")}
                  />
                  <StepperField
                    label={t.disabledDependants}
                    hint={fill(t.disabledDependantsHint, {
                      amount: yearlyHint(PAYROLL_RATES.disabledDependantExemptionYearly),
                      regular: yearlyHint(PAYROLL_RATES.dependantExemptionYearly),
                    })}
                    value={ex.disabledDependants}
                    decrease={t.decrease}
                    increase={t.increase}
                    onStep={(d) => step("disabledDependants", d)}
                  />
                </div>
              </details>
            </fieldset>
          </div>

          <div
            ref={resultRef}
            className="lg:sticky lg:top-24 p-6 sm:p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase pt-1.5">
                {mode === "gross" ? t.netLabel : t.grossLabel}
              </div>
              <div
                className={styles.periodToggle}
                role="group"
                aria-label={`${t.monthly} / ${t.yearly}`}
              >
                {(["month", "year"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={period === p}
                    onClick={() => setPeriod(p)}
                    className={`${styles.periodButton} ${period === p ? styles.periodActive : ""}`}
                  >
                    {p === "month" ? t.monthly : t.yearly}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="text-[40px] sm:text-[52px] font-extrabold tracking-tighter text-white leading-none"
              aria-live="polite"
            >
              {nf0.format(Math.round(headline * factor))}
              <span className="text-lg font-semibold text-white/70 tracking-normal ml-2">
                {unit}
              </span>
            </div>

            {result.personalExemptionLost && (
              <p className="m-0 mt-4 text-xs text-[#DFB741] leading-relaxed">
                {fill(t.ceilingNote, { ceiling })}
              </p>
            )}

            <div className="mt-6 pt-5 border-t border-white/15">
              <div className="text-[11px] font-bold tracking-widest uppercase text-white/55 mb-2">
                {t.employeeTitle}
              </div>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {employeeRows.map((row) => (
                    <tr
                      key={row.label}
                      className={
                        row.strong ? "border-t border-white/20" : "border-t border-white/10"
                      }
                    >
                      <th
                        scope="row"
                        className={`text-left py-2.5 pr-3 ${
                          row.strong
                            ? "font-bold text-white"
                            : row.muted
                              ? "font-medium text-white/55"
                              : "font-semibold text-white/80"
                        }`}
                      >
                        {row.label}
                      </th>
                      <td
                        className={`text-right whitespace-nowrap py-2.5 pl-2 ${
                          row.strong
                            ? "font-extrabold text-[#DFB741]"
                            : row.muted
                              ? "font-medium text-white/55"
                              : "font-bold text-white"
                        }`}
                      >
                        {row.value < 0 ? `− ${money(-row.value)}` : money(row.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15">
              <div className="text-[11px] font-bold tracking-widest uppercase text-white/55 mb-2">
                {t.employerTitle}
              </div>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-t border-white/10">
                    <th scope="row" className="text-left py-2.5 pr-3 font-semibold text-white/80">
                      {fill(t.employerSocial, { rate: pct(PAYROLL_RATES.employerSocialRate) })}
                    </th>
                    <td className="text-right whitespace-nowrap py-2.5 pl-2 font-bold text-white">
                      {money(result.employerSocial)}
                    </td>
                  </tr>
                  <tr className="border-t border-white/20">
                    <th scope="row" className="text-left py-2.5 pr-3 font-bold text-white">
                      {t.employerCost}
                    </th>
                    <td className="text-right whitespace-nowrap py-2.5 pl-2 font-extrabold text-white">
                      {money(result.employerCost)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="m-0 mt-5 text-xs text-white/55 leading-relaxed">
              {fill(t.disclaimer, { year: PAYROLL_RATES.year })}
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
                href={serviceHref}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white/85 no-underline"
              >
                {t.service}
                <Icon name="arrow-right" size={14} />
              </a>
            </div>
          </div>
        </div>
        <MobileResultBar
          locale={locale}
          target={resultRef}
          label={mode === "gross" ? t.netLabel : t.grossLabel}
          value={`${nf0.format(Math.round(headline * factor))} ${unit}`}
        />
      </Container>
    </section>
  );
}

interface CheckFieldProps {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

function CheckField({ id, label, hint, checked, disabled, onChange }: CheckFieldProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.checkbox}
        aria-describedby={`${id}-hint`}
      />
      <div>
        <label htmlFor={id} className="block text-sm font-semibold text-white/90 cursor-pointer">
          {label}
        </label>
        <p id={`${id}-hint`} className="m-0 mt-0.5 text-xs text-white/55 leading-relaxed">
          {hint}
        </p>
      </div>
    </div>
  );
}

interface StepperFieldProps {
  label: string;
  hint: string;
  value: number;
  decrease: string;
  increase: string;
  onStep: (delta: number) => void;
}

function StepperField({ label, hint, value, decrease, increase, onStep }: StepperFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-white/90">{label}</div>
        <p className="m-0 mt-0.5 text-xs text-white/55 leading-relaxed">{hint}</p>
      </div>
      <div className={styles.stepper}>
        <button
          type="button"
          onClick={() => onStep(-1)}
          disabled={value <= 0}
          aria-label={`${decrease}: ${label}`}
          className={styles.stepButton}
        >
          <Icon name="minus" size={14} />
        </button>
        <output className={styles.stepValue} aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onStep(1)}
          disabled={value >= MAX_DEPENDANTS}
          aria-label={`${increase}: ${label}`}
          className={styles.stepButton}
        >
          <Icon name="plus" size={14} />
        </button>
      </div>
    </div>
  );
}
