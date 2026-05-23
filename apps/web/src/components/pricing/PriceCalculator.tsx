import { useMemo, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import type {
  AccountingState,
  CalcConfig,
  CalcIndustry,
  CalculatorState,
  HourlyState,
  HrState,
  IndustryGroupId,
} from "./types";
import {
  computeBreakdown,
  DEFAULT_SALE_MONTHS,
  DEFAULTS,
  initialCalculatorState,
  interpolate,
} from "./calcMath";

interface Props {
  calc: CalcConfig;
  locale: Locale;
}

const GROUP_ORDER: IndustryGroupId[] = ["noactivity", "services", "trade", "it", "specific"];

export function PriceCalculator({ calc, locale }: Props) {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);
  const nf = useMemo(() => new Intl.NumberFormat(localeTag(locale)), [locale]);

  const { items, total } = useMemo(() => computeBreakdown(state, calc), [state, calc]);

  // ---- Helpers to update state -------------------------------------------
  function toggleAccounting() {
    setState((s) => ({
      ...s,
      accounting: s.accounting.enabled
        ? { enabled: false }
        : {
            enabled: true,
            industryId: calc.industries[0]?.id ?? "",
            invoices: DEFAULTS.accountingInvoices,
            revenueMDL: DEFAULTS.accountingRevenueMDL,
            vat: false,
          },
    }));
  }
  function updateAccounting(patch: Partial<Exclude<AccountingState, { enabled: false }>>) {
    setState((s) => {
      if (!s.accounting.enabled) return s;
      return { ...s, accounting: { ...s.accounting, ...patch } };
    });
  }

  function toggleHourly(key: "legal" | "financial" | "it") {
    setState((s) => ({
      ...s,
      [key]: s[key].enabled
        ? { enabled: false }
        : { enabled: true, hours: DEFAULTS[`${key}Hours` as const] },
    }));
  }
  function setHourlyHours(key: "legal" | "financial" | "it", hours: number) {
    setState((s) => {
      const current = s[key] as HourlyState;
      if (!current.enabled) return s;
      return { ...s, [key]: { enabled: true, hours } };
    });
  }

  function toggleHr() {
    setState((s) => ({
      ...s,
      hr: s.hr.enabled ? { enabled: false } : { enabled: true, employees: DEFAULTS.hrEmployees },
    }));
  }
  function setHrEmployees(employees: number) {
    setState((s) => {
      const current = s.hr as HrState;
      if (!current.enabled) return s;
      return { ...s, hr: { enabled: true, employees } };
    });
  }

  // ---- Render -------------------------------------------------------------
  const accountingState = state.accounting;
  const selectedIndustry: CalcIndustry | undefined = accountingState.enabled
    ? calc.industries.find((i) => i.id === accountingState.industryId)
    : undefined;

  return (
    <section id="calculator" className="section section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4 justify-center">{calc.eyebrow}</div>
          <h2 className="text-white mb-4">{calc.heading}</h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">{calc.subtitle}</p>
        </div>

        <div className="calc-layout grid grid-cols-[1.4fr_1fr] gap-8 items-start">
          {/* ----- Left column: service toggle cards ----- */}
          <div className="flex flex-col gap-4">
            {/* Accounting */}
            <ServiceCard
              label={calc.services.accounting.label}
              description={calc.services.accounting.description}
              enabled={accountingState.enabled}
              onToggle={toggleAccounting}
            >
              {accountingState.enabled && (
                <div className="flex flex-col gap-5">
                  {/* Industry select */}
                  <div>
                    <label className="text-sm font-bold mb-2 block text-white/85">
                      {calc.services.accounting.industryLabel}
                    </label>
                    <select
                      value={accountingState.industryId}
                      onChange={(e) => updateAccounting({ industryId: e.target.value })}
                      className="calc-select w-full px-4 py-3 rounded-sm border border-white/20 bg-white/10 text-white text-sm font-medium"
                    >
                      {GROUP_ORDER.map((groupId) => {
                        const groupIndustries = calc.industries.filter((i) => i.group === groupId);
                        if (groupIndustries.length === 0) return null;
                        return (
                          <optgroup key={groupId} label={calc.industryGroups[groupId]}>
                            {groupIndustries.map((ind) => (
                              <option key={ind.id} value={ind.id}>
                                {ind.label}
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    {selectedIndustry &&
                      (() => {
                        const sale = selectedIndustry.salePct ?? 0;
                        const months = selectedIndustry.saleMonths ?? DEFAULT_SALE_MONTHS;
                        const discounted =
                          sale > 0
                            ? Math.round((selectedIndustry.base * (100 - sale)) / 100 / 10) * 10
                            : selectedIndustry.base;
                        return (
                          <p className="m-0 mt-2 text-xs text-white/60 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>{calc.services.accounting.baseFromLabel}:</span>
                            {sale > 0 && (
                              <span className="text-white/45 line-through">
                                {nf.format(selectedIndustry.base)} MDL
                              </span>
                            )}
                            <span className="text-[#DFB741] font-semibold">
                              {nf.format(discounted)} MDL / lună
                            </span>
                            {sale > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wider bg-accent text-[#1A1A2E] whitespace-nowrap">
                                −{sale}% · {months} luni
                              </span>
                            )}
                          </p>
                        );
                      })()}
                  </div>

                  {/* Invoices */}
                  <NumberWithSlider
                    label={calc.services.accounting.invoicesLabel}
                    value={accountingState.invoices}
                    min={0}
                    max={100}
                    step={5}
                    suffix="100+"
                    suffixAtMax
                    ticks={[0, 5, 25, 50, 75, "100+"]}
                    onChange={(invoices) => updateAccounting({ invoices })}
                  />

                  {/* Revenue */}
                  <RevenueSlider
                    label={calc.services.accounting.revenueLabel}
                    value={accountingState.revenueMDL}
                    nf={nf}
                    onChange={(revenueMDL) => updateAccounting({ revenueMDL })}
                  />

                  <label
                    className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-sm border ${
                      accountingState.vat
                        ? "border-[rgba(223,183,65,0.45)] bg-[rgba(223,183,65,0.08)]"
                        : "border-white/15 bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={accountingState.vat}
                      onChange={(e) => updateAccounting({ vat: e.target.checked })}
                      className="w-5 h-5 accent-[#DFB741] shrink-0"
                    />
                    <span className="text-sm font-semibold text-white">
                      {calc.services.accounting.vatLabel}
                    </span>
                  </label>
                </div>
              )}
            </ServiceCard>

            {/* HR */}
            <ServiceCard
              label={calc.services.hr.label}
              description={calc.services.hr.description}
              enabled={state.hr.enabled}
              onToggle={toggleHr}
            >
              {state.hr.enabled && (
                <NumberWithSlider
                  label={calc.services.hr.employeesLabel}
                  value={state.hr.employees}
                  min={1}
                  max={50}
                  step={1}
                  suffix="50+"
                  suffixAtMax
                  onChange={setHrEmployees}
                  rateNote={interpolate(calc.services.hr.rateNote, {
                    rate: nf.format(calc.hrPerEmployee),
                  })}
                />
              )}
            </ServiceCard>

            {/* Legal */}
            <HourlyCard
              label={calc.services.legal.label}
              description={calc.services.legal.description}
              hoursLabel={calc.services.legal.hoursLabel}
              rateNote={interpolate(calc.services.legal.rateNote, {
                rate: nf.format(calc.hourlyRates.legal),
              })}
              state={state.legal}
              onToggle={() => toggleHourly("legal")}
              onChange={(h) => setHourlyHours("legal", h)}
            />

            {/* Financial */}
            <HourlyCard
              label={calc.services.financial.label}
              description={calc.services.financial.description}
              hoursLabel={calc.services.financial.hoursLabel}
              rateNote={interpolate(calc.services.financial.rateNote, {
                rate: nf.format(calc.hourlyRates.financial),
              })}
              state={state.financial}
              onToggle={() => toggleHourly("financial")}
              onChange={(h) => setHourlyHours("financial", h)}
            />

            {/* IT */}
            <HourlyCard
              label={calc.services.it.label}
              description={calc.services.it.description}
              hoursLabel={calc.services.it.hoursLabel}
              rateNote={interpolate(calc.services.it.rateNote, {
                rate: nf.format(calc.hourlyRates.it),
              })}
              state={state.it}
              onToggle={() => toggleHourly("it")}
              onChange={(h) => setHourlyHours("it", h)}
            />

          </div>

          {/* ----- Right column: sticky breakdown panel ----- */}
          <div className="calc-result-wrap">
            <div className="calc-result-panel sticky top-24 p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]">
              <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-2">
                {calc.result.heading}
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-white/65 leading-relaxed my-6">
                  {calc.result.emptyState}
                </p>
              ) : (
                <>
                  <div className="calc-total text-[56px] font-extrabold tracking-tighter text-white leading-none">
                    {nf.format(total)}
                  </div>
                  <div className="text-base font-semibold text-white/70 mt-1">
                    {calc.result.perMonth}
                  </div>
                  <div className="text-xs text-white/55 mt-1">
                    {interpolate(calc.result.annualLabel, { amount: nf.format(total * 12) })}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/15">
                    <div className="text-[11px] font-bold tracking-widest text-white/55 uppercase mb-3">
                      {calc.result.breakdownTitle}
                    </div>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                      {items.map((it) => (
                        <li
                          key={it.key}
                          className="flex justify-between items-baseline gap-3 text-sm"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="text-white font-semibold truncate flex items-center gap-2">
                              {it.label}
                              {it.discountPct !== undefined && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-pill text-[9px] font-bold tracking-wider bg-accent text-[#1A1A2E] whitespace-nowrap">
                                  −{it.discountPct}%
                                </span>
                              )}
                            </span>
                            {it.detail && (
                              <span className="text-white/55 text-xs truncate">
                                {it.detail}
                                {it.saleMonths !== undefined && (
                                  <span className="ml-1 text-accent-dark">
                                    · {it.saleMonths} luni
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                          <div className="text-right whitespace-nowrap">
                            {it.originalSubtotal !== undefined && (
                              <div className="text-white/40 text-xs line-through">
                                {nf.format(it.originalSubtotal)} MDL
                              </div>
                            )}
                            <span className="text-[#DFB741] font-bold">
                              {nf.format(it.subtotal)} MDL
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <p className="text-xs text-white/55 mt-5 leading-normal">{calc.result.disclaimer}</p>
              <button
                className="btn btn-primary mt-5 w-full justify-center inline-flex items-center gap-2"
                onClick={() => openModal("quote", { items, total })}
              >
                {calc.result.cta} <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .calc-select { color-scheme: dark; }
        .calc-select optgroup { color: #DFB741; font-weight: 700; }
        .calc-select option { color: #1A1A2E; background: #fff; }
        @media (max-width: 900px) {
          .calc-layout { grid-template-columns: 1fr !important; }
          .calc-result-panel { position: static !important; }
        }
        @media (max-width: 600px) {
          .calc-total { font-size: 44px !important; }
        }
      `}</style>
    </section>
  );
}

// ---- Sub-components --------------------------------------------------------

interface ServiceCardProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

function ServiceCard({ label, description, enabled, onToggle, children }: ServiceCardProps) {
  return (
    <div
      className={`rounded-md border p-5 transition-colors ${
        enabled
          ? "bg-white/8 border-[rgba(223,183,65,0.45)]"
          : "bg-white/5 border-white/15"
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left cursor-pointer bg-transparent border-none p-0"
      >
        <div className="min-w-0">
          <div className="text-base font-bold text-white">{label}</div>
          <div className="text-xs text-white/65 mt-1 leading-snug">{description}</div>
        </div>
        <ToggleSwitch checked={enabled} />
      </button>
      {enabled && <div className="mt-5">{children}</div>}
    </div>
  );
}

interface HourlyCardProps {
  label: string;
  description: string;
  hoursLabel: string;
  rateNote: string;
  state: HourlyState;
  onToggle: () => void;
  onChange: (hours: number) => void;
}

function HourlyCard({
  label,
  description,
  hoursLabel,
  rateNote,
  state,
  onToggle,
  onChange,
}: HourlyCardProps) {
  return (
    <ServiceCard
      label={label}
      description={description}
      enabled={state.enabled}
      onToggle={onToggle}
    >
      {state.enabled && (
        <NumberWithSlider
          label={hoursLabel}
          value={state.hours}
          min={1}
          max={40}
          step={1}
          suffix="40+"
          suffixAtMax
          onChange={onChange}
          rateNote={rateNote}
        />
      )}
    </ServiceCard>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
}

function ToggleSwitch({ checked }: ToggleSwitchProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-[#DFB741]" : "bg-white/20"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </span>
  );
}

interface NumberWithSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** Shown next to the value when value >= max (e.g. "50+"). */
  suffix?: string;
  suffixAtMax?: boolean;
  /** Tick labels rendered under the slider track. Defaults to [min, suffix ?? max]. */
  ticks?: (string | number)[];
  onChange: (n: number) => void;
  rateNote?: string;
}

function NumberWithSlider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  suffixAtMax,
  ticks,
  onChange,
  rateNote,
}: NumberWithSliderProps) {
  const tickLabels = ticks ?? [min, suffix ?? max];
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-2">
        <label className="text-sm font-bold text-white/85">{label}</label>
        <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
          {value}
          {suffix && suffixAtMax && value >= max ? suffix.replace(String(max), "") : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider"
        aria-label={label}
      />
      <div className="flex justify-between mt-1 text-[11px] font-semibold text-white/50">
        {tickLabels.map((t, i) => (
          <span key={`${i}-${t}`}>{t}</span>
        ))}
      </div>
      {rateNote && <p className="m-0 mt-2 text-xs text-white/60">{rateNote}</p>}
      <style>{`
        .calc-slider {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 6px;
          background: rgba(255,255,255,0.15);
          border-radius: 999px; outline: none; cursor: pointer;
          margin: 0; padding: 0; box-sizing: border-box; display: block;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: #DFB741; border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: grab;
        }
        .calc-slider::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 50%;
          background: #DFB741; border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: grab;
        }
      `}</style>
    </div>
  );
}

interface RevenueSliderProps {
  label: string;
  value: number;
  nf: Intl.NumberFormat;
  onChange: (mdl: number) => void;
}

const REVENUE_MIN = 0;
const REVENUE_MAX = 5_000_000;
const REVENUE_STEP = 100_000;

/** Format MDL amount compactly: 250000 → "250K", 1500000 → "1.5M". */
function formatRevenueShort(mdl: number, nf: Intl.NumberFormat): string {
  if (mdl >= 1_000_000) {
    const inMillions = mdl / 1_000_000;
    // Trim trailing zero for whole millions; keep one decimal otherwise.
    const formatted = Number.isInteger(inMillions) ? inMillions.toFixed(0) : inMillions.toFixed(1);
    return `${formatted}M`;
  }
  if (mdl >= 1000) return `${nf.format(mdl / 1000)}K`;
  return nf.format(mdl);
}

function RevenueSlider({ label, value, nf, onChange }: RevenueSliderProps) {
  const isAtMax = value >= REVENUE_MAX;
  const displayValue = isAtMax ? `${formatRevenueShort(REVENUE_MAX, nf)}+` : formatRevenueShort(value, nf);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-2">
        <label className="text-sm font-bold text-white/85">{label}</label>
        <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
          {displayValue}{" "}
          <span className="text-xs font-semibold text-white/55 tracking-normal">MDL</span>
        </span>
      </div>
      <input
        type="range"
        min={REVENUE_MIN}
        max={REVENUE_MAX}
        step={REVENUE_STEP}
        value={Math.min(value, REVENUE_MAX)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider"
        aria-label={label}
      />
      <div className="flex justify-between mt-1 text-[11px] font-semibold text-white/50">
        <span>0</span>
        <span>500K</span>
        <span>1.5M</span>
        <span>2.5M</span>
        <span>5M+</span>
      </div>
    </div>
  );
}
