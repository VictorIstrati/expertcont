import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { parseAmount } from "../invoice/invoiceMath";
import {
  amountInWords,
  type InvoiceCurrency,
  type InvoiceLanguage,
} from "../invoice/amountInWords";
import { computeVat, type VatMode } from "./vatMath";
import { VAT_RATE_OPTIONS, VAT_STANDARD_RATE, VAT_YEAR, type VatRateKind } from "./rates";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./VatCalculator.module.css";

interface Props {
  locale: Locale;
}

interface Copy {
  inputsTitle: string;
  mode: string;
  modeAdd: string;
  modeExtract: string;
  amountAdd: string;
  amountExtract: string;
  currency: string;
  rate: string;
  rateKinds: Record<VatRateKind, string>;
  resultsTitle: string;
  net: string;
  vat: string;
  gross: string;
  words: string;
  wordsLanguage: string;
  copy: string;
  copied: string;
  copyLabel: string;
  disclaimer: string;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    inputsTitle: "Datele calculului",
    mode: "Ce vrei să calculezi?",
    modeAdd: "Adaugă TVA",
    modeExtract: "Extrage TVA",
    amountAdd: "Suma fără TVA",
    amountExtract: "Suma cu TVA inclus",
    currency: "Valuta",
    rate: "Cota TVA",
    rateKinds: {
      standard: "standard",
      reduced: "redusă",
      upcoming: "din {year}",
      zero: "zero",
    },
    resultsTitle: "Rezultat",
    net: "Suma fără TVA",
    vat: "TVA ({rate})",
    gross: "Total cu TVA",
    words: "Total în litere",
    wordsLanguage: "Limba documentului",
    copy: "Copiază",
    copied: "Copiat",
    copyLabel: "Copiază: {label}",
    disclaimer:
      "Cotele de 20% și 8% sunt cele în vigoare în {year} conform art. 96 din Codul fiscal; 0% corespunde livrărilor scutite cu drept de deducere (art. 104). Rotunjirea se face la 2 zecimale. Pentru încadrarea corectă a unei livrări într-o cotă, consultă un contabil.",
  },
  ru: {
    inputsTitle: "Данные для расчёта",
    mode: "Что нужно рассчитать?",
    modeAdd: "Начислить НДС",
    modeExtract: "Выделить НДС",
    amountAdd: "Сумма без НДС",
    amountExtract: "Сумма с НДС",
    currency: "Валюта",
    rate: "Ставка НДС",
    rateKinds: {
      standard: "стандартная",
      reduced: "сниженная",
      upcoming: "с {year} г.",
      zero: "нулевая",
    },
    resultsTitle: "Результат",
    net: "Сумма без НДС",
    vat: "НДС ({rate})",
    gross: "Итого с НДС",
    words: "Итого прописью",
    wordsLanguage: "Язык документа",
    copy: "Копировать",
    copied: "Скопировано",
    copyLabel: "Копировать: {label}",
    disclaimer:
      "Ставки 20% и 8% действуют в {year} году согласно ст. 96 Налогового кодекса; 0% соответствует поставкам, освобождённым с правом на вычет (ст. 104). Округление до 2 знаков после запятой. Чтобы правильно определить ставку для конкретной поставки, проконсультируйтесь с бухгалтером.",
  },
  en: {
    inputsTitle: "Calculation details",
    mode: "What do you need?",
    modeAdd: "Add VAT",
    modeExtract: "Extract VAT",
    amountAdd: "Amount excluding VAT",
    amountExtract: "Amount including VAT",
    currency: "Currency",
    rate: "VAT rate",
    rateKinds: {
      standard: "standard",
      reduced: "reduced",
      upcoming: "from {year}",
      zero: "zero",
    },
    resultsTitle: "Result",
    net: "Net amount",
    vat: "VAT ({rate})",
    gross: "Total including VAT",
    words: "Total in words",
    wordsLanguage: "Document language",
    copy: "Copy",
    copied: "Copied",
    copyLabel: "Copy: {label}",
    disclaimer:
      "The 20% and 8% rates are in force in {year} under Article 96 of the Moldovan Tax Code; 0% covers supplies exempt with the right of deduction (Article 104). Figures are rounded to 2 decimals. Ask an accountant which rate applies to a specific supply.",
  },
};

const CURRENCIES: InvoiceCurrency[] = ["MDL", "EUR", "USD"];

const LANGUAGES: { id: InvoiceLanguage; label: string }[] = [
  { id: "ro", label: "Română" },
  { id: "ru", label: "Русский" },
  { id: "en", label: "English" },
];

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function VatCalculator({ locale }: Props) {
  const t = COPY[locale];
  const resultRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VatMode>("add");
  const [raw, setRaw] = useState("1000");
  const [rate, setRate] = useState(VAT_STANDARD_RATE);
  const [currency, setCurrency] = useState<InvoiceCurrency>("MDL");
  const [language, setLanguage] = useState<InvoiceLanguage>(locale);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(localeTag(locale), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const pf = useMemo(
    () => new Intl.NumberFormat(localeTag(locale), { style: "percent", maximumFractionDigits: 1 }),
    [locale],
  );

  const result = useMemo(() => computeVat(parseAmount(raw), rate, mode), [raw, rate, mode]);
  const words = useMemo(
    () => amountInWords(result.gross, currency, language),
    [result.gross, currency, language],
  );

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      setCopiedKey(null);
    }
  }

  const rows = [
    { key: "net", label: t.net, value: result.net, strong: mode === "extract" },
    { key: "vat", label: fill(t.vat, { rate: pf.format(rate) }), value: result.vat, strong: true },
    { key: "gross", label: t.gross, value: result.gross, strong: mode === "add" },
  ];

  return (
    <section id="calculator" className="section-sm section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="rounded-md border border-white/15 bg-white/5 p-6 sm:p-7 flex flex-col gap-6">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase">
              {t.inputsTitle}
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{t.mode}</legend>
              <div className={styles.segmented}>
                {(["add", "extract"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={mode === m}
                    className={styles.segment}
                    onClick={() => setMode(m)}
                  >
                    {m === "add" ? t.modeAdd : t.modeExtract}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="vat-amount" className={styles.legend}>
                {mode === "add" ? t.amountAdd : t.amountExtract}
              </label>
              <div className={styles.amountWrap}>
                <input
                  id="vat-amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className={styles.amountInput}
                />
                <span className={styles.amountUnit}>{currency}</span>
              </div>
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{t.rate}</legend>
              <div className={styles.rateGrid}>
                {VAT_RATE_OPTIONS.map((opt) => (
                  <button
                    key={opt.rate}
                    type="button"
                    aria-pressed={rate === opt.rate}
                    className={styles.rateButton}
                    onClick={() => setRate(opt.rate)}
                  >
                    <span className={styles.rateValue}>{pf.format(opt.rate)}</span>
                    <span className={styles.rateKind}>
                      {fill(t.rateKinds[opt.kind], { year: opt.effectiveFromYear ?? VAT_YEAR })}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{t.currency}</legend>
              <div className={styles.segmented}>
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={currency === c}
                    className={styles.segment}
                    onClick={() => setCurrency(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div ref={resultRef} className="lg:sticky lg:top-24 p-6 sm:p-8 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]">
            <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-4">
              {t.resultsTitle}
            </div>

            <dl className="m-0 flex flex-col" aria-live="polite">
              {rows.map((row) => (
                <div key={row.key} className={styles.resultRow}>
                  <dt className="text-sm font-semibold text-white/75">{row.label}</dt>
                  <dd className={styles.resultValue}>
                    <span className={row.strong ? styles.figureStrong : styles.figure}>
                      {nf.format(row.value)}
                      <span className={styles.figureUnit}>{currency}</span>
                    </span>
                    <CopyButton
                      copied={copiedKey === row.key}
                      label={fill(t.copyLabel, { label: row.label })}
                      text={copiedKey === row.key ? t.copied : t.copy}
                      onClick={() => copy(row.key, nf.format(row.value))}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 pt-5 border-t border-white/15">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-xs font-bold tracking-widest text-white/60 uppercase">
                  {t.words}
                </div>
                <div className={styles.langSwitch} role="group" aria-label={t.wordsLanguage}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      lang={l.id}
                      aria-pressed={language === l.id}
                      className={styles.langButton}
                      onClick={() => setLanguage(l.id)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <p lang={language} className={styles.words}>
                {words}
              </p>
              <div className="mt-3 flex justify-end">
                <CopyButton
                  copied={copiedKey === "words"}
                  label={fill(t.copyLabel, { label: t.words })}
                  text={copiedKey === "words" ? t.copied : t.copy}
                  onClick={() => copy("words", words)}
                />
              </div>
            </div>

            <p className="m-0 mt-5 text-xs text-white/55 leading-relaxed">
              {fill(t.disclaimer, { year: VAT_YEAR })}
            </p>
          </div>
        </div>
        <MobileResultBar
          locale={locale}
          target={resultRef}
          label={mode === "add" ? t.gross : t.net}
          value={`${nf.format(mode === "add" ? result.gross : result.net)} ${currency}`}
        />
      </Container>
    </section>
  );
}

interface CopyButtonProps {
  copied: boolean;
  label: string;
  text: string;
  onClick: () => void;
}

function CopyButton({ copied, label, text, onClick }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={copied ? `${styles.copyButton} ${styles.copyButtonDone}` : styles.copyButton}
    >
      <Icon name={copied ? "check" : "file-text"} size={14} />
      <span>{text}</span>
    </button>
  );
}
