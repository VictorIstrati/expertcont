import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import type { InvoiceCurrency, InvoiceLanguage } from "./amountInWords";
import { InvoiceDocument } from "./InvoiceDocument";
import { VAT_RATES, computeTotals, parseAmount, type InvoiceItem } from "./invoiceMath";
import {
  EMPTY_PARTY,
  type ClientKind,
  type InvoiceDraft,
  type InvoiceKind,
  type InvoiceParty,
} from "./types";
import { formatIban, isValidIban, isValidIdno } from "./validation";
import { MobileResultBar } from "../MobileResultBar";
import styles from "./InvoiceGenerator.module.css";

interface Copy {
  documentTitle: string;
  kind: string;
  kinds: Record<InvoiceKind, string>;
  language: string;
  currency: string;
  number: string;
  date: string;
  dueDate: string;
  vatPayer: string;
  vatPayerHint: string;
  supplierTitle: string;
  clientTitle: string;
  name: string;
  idno: string;
  regNo: string;
  clientKind: string;
  clientKinds: Record<ClientKind, string>;
  companyName: string;
  personName: string;
  personId: string;
  bankDetails: string;
  addOptional: string;
  removeOptional: string;
  vatCode: string;
  address: string;
  iban: string;
  bank: string;
  bankCode: string;
  idnoError: string;
  ibanError: string;
  itemsTitle: string;
  description: string;
  unit: string;
  quantity: string;
  price: string;
  vatRate: string;
  addItem: string;
  removeItem: string;
  notes: string;
  notesPlaceholder: string;
  preview: string;
  download: string;
  privacy: string;
  fiscalNote: string;
  fileName: Record<InvoiceKind, string>;
}

const COPY: Record<Locale, Copy> = {
  ro: {
    documentTitle: "Document",
    kind: "Tip document",
    kinds: { invoice: "Factură", proforma: "Proformă" },
    language: "Limba documentului",
    currency: "Valuta",
    number: "Număr",
    date: "Data emiterii",
    dueDate: "Scadența",
    vatPayer: "Sunt plătitor de TVA",
    vatPayerHint:
      "Adaugă codul TVA și cota pe fiecare rând. Exportul de bunuri și serviciile cu locul livrării în afara Moldovei (art. 111 Cod fiscal) sunt scutite cu drept de deducere: TVA 0%.",
    supplierTitle: "Furnizor (datele tale)",
    clientTitle: "Cumpărător",
    name: "Denumire",
    idno: "IDNO",
    regNo: "Nr. înregistrare / IDNO",
    clientKind: "Tip client",
    clientKinds: { company: "Companie", person: "Persoană fizică" },
    companyName: "Denumirea companiei",
    personName: "Nume și prenume",
    personId: "IDNP / act de identitate",
    bankDetails: "Date bancare",
    addOptional: "Adaugă",
    removeOptional: "Elimină",
    vatCode: "Cod TVA",
    address: "Adresa",
    iban: "IBAN",
    bank: "Banca",
    bankCode: "Cod bancar (BIC)",
    idnoError: "IDNO are 13 cifre.",
    ibanError: "IBAN-ul nu pare corect — verifică cifrele.",
    itemsTitle: "Produse și servicii",
    description: "Descriere",
    unit: "U.M.",
    quantity: "Cant.",
    price: "Preț",
    vatRate: "TVA",
    addItem: "Adaugă rând",
    removeItem: "Șterge rândul",
    notes: "Mențiuni (opțional)",
    notesPlaceholder: "Ex.: Plata în baza contractului nr. 12 din 01.03.2026",
    preview: "Previzualizare",
    download: "Descarcă PDF",
    privacy: "Datele rămân în browserul tău — nu le trimitem nicăieri.",
    fiscalNote: "La „Descarcă PDF” se deschide fereastra de printare: alege „Salvează ca PDF”.",
    fileName: { invoice: "factura", proforma: "proforma" },
  },
  ru: {
    documentTitle: "Документ",
    kind: "Тип документа",
    kinds: { invoice: "Счёт", proforma: "Проформа" },
    language: "Язык документа",
    currency: "Валюта",
    number: "Номер",
    date: "Дата выставления",
    dueDate: "Срок оплаты",
    vatPayer: "Я плательщик НДС",
    vatPayerHint:
      "Добавляет код НДС и ставку по каждой строке. Экспорт товаров и услуги с местом поставки за пределами Молдовы (ст. 111 Налогового кодекса) освобождены с правом на вычет: НДС 0%.",
    supplierTitle: "Поставщик (ваши данные)",
    clientTitle: "Покупатель",
    name: "Наименование",
    idno: "IDNO",
    regNo: "Рег. номер / IDNO",
    clientKind: "Тип клиента",
    clientKinds: { company: "Компания", person: "Физическое лицо" },
    companyName: "Название компании",
    personName: "Имя и фамилия",
    personId: "IDNP / документ",
    bankDetails: "Банковские реквизиты",
    addOptional: "Добавить",
    removeOptional: "Убрать",
    vatCode: "Код НДС",
    address: "Адрес",
    iban: "IBAN",
    bank: "Банк",
    bankCode: "Код банка (BIC)",
    idnoError: "IDNO состоит из 13 цифр.",
    ibanError: "IBAN выглядит неверно — проверьте цифры.",
    itemsTitle: "Товары и услуги",
    description: "Описание",
    unit: "Ед.",
    quantity: "Кол-во",
    price: "Цена",
    vatRate: "НДС",
    addItem: "Добавить строку",
    removeItem: "Удалить строку",
    notes: "Примечания (необязательно)",
    notesPlaceholder: "Напр.: Оплата по договору № 12 от 01.03.2026",
    preview: "Предпросмотр",
    download: "Скачать PDF",
    privacy: "Данные остаются в вашем браузере — мы их никуда не отправляем.",
    fiscalNote: "«Скачать PDF» открывает окно печати: выберите «Сохранить как PDF».",
    fileName: { invoice: "schet", proforma: "proforma" },
  },
  en: {
    documentTitle: "Document",
    kind: "Document type",
    kinds: { invoice: "Invoice", proforma: "Proforma" },
    language: "Document language",
    currency: "Currency",
    number: "Number",
    date: "Issue date",
    dueDate: "Due date",
    vatPayer: "I'm a VAT payer",
    vatPayerHint:
      "Adds your VAT code and a rate per line. Exports of goods, and services whose place of supply is outside Moldova (Tax Code art. 111), are exempt with right of deduction: 0% VAT.",
    supplierTitle: "Supplier (your details)",
    clientTitle: "Customer",
    name: "Name",
    idno: "IDNO",
    regNo: "Registration no. / IDNO",
    clientKind: "Customer type",
    clientKinds: { company: "Company", person: "Individual" },
    companyName: "Company name",
    personName: "Full name",
    personId: "Personal ID / passport no.",
    bankDetails: "Bank details",
    addOptional: "Add",
    removeOptional: "Remove",
    vatCode: "VAT ID",
    address: "Address",
    iban: "IBAN",
    bank: "Bank",
    bankCode: "Bank code (BIC)",
    idnoError: "IDNO has 13 digits.",
    ibanError: "This IBAN doesn't look right — check the digits.",
    itemsTitle: "Goods and services",
    description: "Description",
    unit: "Unit",
    quantity: "Qty",
    price: "Price",
    vatRate: "VAT",
    addItem: "Add line",
    removeItem: "Remove line",
    notes: "Notes (optional)",
    notesPlaceholder: "E.g. Payment under contract no. 12 of 01.03.2026",
    preview: "Preview",
    download: "Download PDF",
    privacy: "Your data stays in your browser — we don't send it anywhere.",
    fiscalNote: "“Download PDF” opens the print dialog: choose “Save as PDF”.",
    fileName: { invoice: "invoice", proforma: "proforma" },
  },
};

type ClientGroup = "id" | "vat" | "bank";

interface FieldFormat {
  clean?: (raw: string) => string;
  display?: (value: string) => string;
  placeholder?: string;
  maxLength?: number;
}

const compactUpper = (raw: string) => raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

const FIELD_FORMATS: Partial<Record<keyof InvoiceParty, FieldFormat>> = {
  iban: {
    clean: (raw) => compactUpper(raw).slice(0, 34),
    display: formatIban,
    placeholder: "MD00 AA00 0000 0000 0000 0000",
    maxLength: 42,
  },
  bankCode: { clean: (raw) => compactUpper(raw).slice(0, 11), placeholder: "AGRNMD2X" },
  vatCode: { clean: compactUpper },
};

const DEFAULT_UNIT: Record<InvoiceLanguage, string> = { ro: "buc.", ru: "шт.", en: "pcs" };
const LANGUAGES: InvoiceLanguage[] = ["ro", "ru", "en"];
const DEFAULT_LANGUAGE: InvoiceLanguage = "en";
const CURRENCIES: InvoiceCurrency[] = ["MDL", "EUR", "USD"];

let itemSeq = 0;

function newItem(language: InvoiceLanguage): InvoiceItem {
  itemSeq += 1;
  return {
    id: `item-${itemSeq}`,
    description: "",
    unit: DEFAULT_UNIT[language],
    quantity: 1,
    price: 0,
    vatRate: 0,
  };
}

function isoDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function initialDraft(): InvoiceDraft {
  return {
    kind: "invoice",
    language: DEFAULT_LANGUAGE,
    currency: "EUR",
    number: "1",
    date: isoDate(),
    dueDate: isoDate(14),
    vatPayer: false,
    supplier: EMPTY_PARTY,
    clientKind: "company",
    client: EMPTY_PARTY,
    items: [{ ...newItem(DEFAULT_LANGUAGE), id: "item-0" }],
    notes: "",
  };
}

interface Props {
  locale: Locale;
}

export function InvoiceGenerator({ locale }: Props) {
  const t = COPY[locale];
  const previewRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<InvoiceDraft>(initialDraft);
  const [openGroups, setOpenGroups] = useState<Record<ClientGroup, boolean>>({
    id: false,
    vat: false,
    bank: false,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const branding = { show: false };
  const moneyFormat = new Intl.NumberFormat(localeTag(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const quantityFormat = new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 3 });

  function set<K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setParty(side: "supplier" | "client", key: keyof InvoiceParty, value: string) {
    setDraft((d) => ({ ...d, [side]: { ...d[side], [key]: value } }));
  }

  function setItem(id: string, patch: Partial<InvoiceItem>) {
    setDraft((d) => ({
      ...d,
      items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));
  }

  function download() {
    const previous = document.title;
    document.title = `${t.fileName[draft.kind]}-${draft.number || "1"}`;
    const restore = () => {
      document.title = previous;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }

  const textField = (
    side: "supplier" | "client",
    key: keyof InvoiceParty,
    label: string,
    opts: { wide?: boolean; error?: string } = {},
  ) => {
    const format = FIELD_FORMATS[key];
    const value = draft[side][key];
    return (
      <Field id={`${side}-${key}`} label={label} wide={opts.wide} error={opts.error}>
        <input
          id={`${side}-${key}`}
          className="input"
          value={format?.display ? format.display(value) : value}
          placeholder={format?.placeholder}
          maxLength={format?.maxLength}
          autoCapitalize={format?.clean ? "characters" : undefined}
          spellCheck={format?.clean ? false : undefined}
          onChange={(e) =>
            setParty(side, key, format?.clean ? format.clean(e.target.value) : e.target.value)
          }
          aria-invalid={Boolean(opts.error)}
        />
      </Field>
    );
  };

  const ibanError = (party: InvoiceParty) =>
    party.iban !== "" && !isValidIban(party.iban) ? t.ibanError : undefined;

  const supplierFields = () => {
    const party = draft.supplier;
    const idnoInvalid = party.idno !== "" && !isValidIdno(party.idno);
    return (
      <div className="field-grid gap-4">
        {textField("supplier", "name", t.name, { wide: true })}
        <Field id="supplier-idno" label={t.idno} error={idnoInvalid ? t.idnoError : undefined}>
          <input
            id="supplier-idno"
            className="input"
            inputMode="numeric"
            maxLength={13}
            placeholder="1003600000000"
            value={party.idno}
            onChange={(e) => setParty("supplier", "idno", e.target.value.replace(/\D/g, ""))}
            aria-invalid={idnoInvalid}
          />
        </Field>
        {draft.vatPayer && textField("supplier", "vatCode", t.vatCode)}
        {textField("supplier", "address", t.address, { wide: true })}
        {textField("supplier", "iban", t.iban, {
          wide: true,
          error: ibanError(party),
        })}
        {textField("supplier", "bank", t.bank)}
        {textField("supplier", "bankCode", t.bankCode)}
      </div>
    );
  };

  const clientFields = () => {
    const party = draft.client;
    const isCompany = draft.clientKind === "company";
    const groups: { key: ClientGroup; label: string; fields: (keyof InvoiceParty)[] }[] = [
      { key: "id", label: isCompany ? t.regNo : t.personId, fields: ["idno"] },
      ...(isCompany
        ? [{ key: "vat" as const, label: t.vatCode, fields: ["vatCode"] as (keyof InvoiceParty)[] }]
        : []),
      { key: "bank", label: t.bankDetails, fields: ["iban", "bank", "bankCode"] },
    ];
    const visible = (g: (typeof groups)[number]) =>
      openGroups[g.key] || g.fields.some((f) => party[f] !== "");
    const hide = (g: (typeof groups)[number]) => {
      setOpenGroups((o) => ({ ...o, [g.key]: false }));
      setDraft((d) => ({
        ...d,
        client: { ...d.client, ...Object.fromEntries(g.fields.map((f) => [f, ""])) },
      }));
    };
    const removeButton = (g: (typeof groups)[number]) => (
      <button
        type="button"
        onClick={() => hide(g)}
        className={styles.removeGroup}
        aria-label={`${t.removeOptional}: ${g.label}`}
        title={t.removeOptional}
      >
        <Icon name="x" size={14} />
      </button>
    );
    const hidden = groups.filter((g) => !visible(g));

    return (
      <div className="flex flex-col gap-4">
        <div className={styles.segmented} role="radiogroup" aria-label={t.clientKind}>
          {(["company", "person"] as ClientKind[]).map((kind) => (
            <button
              key={kind}
              type="button"
              role="radio"
              aria-checked={draft.clientKind === kind}
              onClick={() => {
                if (kind === draft.clientKind) return;
                setDraft((d) => ({
                  ...d,
                  clientKind: kind,
                  client: { ...d.client, idno: "", vatCode: "" },
                }));
                setOpenGroups((o) => ({ ...o, id: false, vat: false }));
              }}
              className={draft.clientKind === kind ? styles.segmentActive : styles.segment}
            >
              {t.clientKinds[kind]}
            </button>
          ))}
        </div>

        <div className="field-grid gap-4">
          {textField("client", "name", isCompany ? t.companyName : t.personName, { wide: true })}
          {textField("client", "address", t.address, { wide: true })}

          {groups.filter(visible).map((g) =>
            g.key === "bank" ? (
              <div key={g.key} className={`sm:col-span-2 ${styles.optionalGroup}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold">{g.label}</span>
                  {removeButton(g)}
                </div>
                <div className="field-grid gap-4">
                  {textField("client", "iban", t.iban, {
                    wide: true,
                    error: ibanError(party),
                  })}
                  {textField("client", "bank", t.bank)}
                  {textField("client", "bankCode", t.bankCode)}
                </div>
              </div>
            ) : (
              <div key={g.key} className="flex items-end gap-2 min-w-0">
                <div className="grow min-w-0">
                  {textField("client", g.fields[0] ?? "idno", g.label)}
                </div>
                {removeButton(g)}
              </div>
            ),
          )}
        </div>

        {hidden.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary">{t.addOptional}:</span>
            {hidden.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setOpenGroups((o) => ({ ...o, [g.key]: true }))}
                className={styles.addChip}
              >
                <Icon name="plus" size={14} />
                {g.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="section-sm tool-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className={styles.layout}>
          <div className="flex flex-col gap-5">
            <Card title={t.documentTitle}>
              <div className="field-grid gap-4">
                <div className="field sm:col-span-2">
                  <span className="text-[13px] font-semibold">{t.kind}</span>
                  <div className={styles.segmented} role="radiogroup" aria-label={t.kind}>
                    {(["invoice", "proforma"] as InvoiceKind[]).map((kind) => (
                      <button
                        key={kind}
                        type="button"
                        role="radio"
                        aria-checked={draft.kind === kind}
                        onClick={() => set("kind", kind)}
                        className={draft.kind === kind ? styles.segmentActive : styles.segment}
                      >
                        {t.kinds[kind]}
                      </button>
                    ))}
                  </div>
                </div>
                <Field id="inv-language" label={t.language}>
                  <select
                    id="inv-language"
                    className="select"
                    value={draft.language}
                    onChange={(e) => set("language", e.target.value as InvoiceLanguage)}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="inv-currency" label={t.currency}>
                  <select
                    id="inv-currency"
                    className="select"
                    value={draft.currency}
                    onChange={(e) => set("currency", e.target.value as InvoiceCurrency)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="inv-number" label={t.number}>
                  <input
                    id="inv-number"
                    className="input"
                    value={draft.number}
                    onChange={(e) => set("number", e.target.value)}
                  />
                </Field>
                <Field id="inv-date" label={t.date}>
                  <input
                    id="inv-date"
                    type="date"
                    className="input"
                    value={draft.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </Field>
                <Field id="inv-due" label={t.dueDate}>
                  <input
                    id="inv-due"
                    type="date"
                    className="input"
                    value={draft.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                  />
                </Field>
                <label
                  className={`sm:col-span-2 flex items-start gap-3 cursor-pointer px-4 py-3 rounded-sm border transition-colors ${
                    draft.vatPayer
                      ? "bg-[rgba(223,183,65,0.12)] border-[rgba(223,183,65,0.5)]"
                      : "bg-white/5 border-white/15 hover:border-white/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={draft.vatPayer}
                    onChange={(e) => set("vatPayer", e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-[#DFB741] [color-scheme:light] shrink-0 cursor-pointer"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{t.vatPayer}</span>
                    <span className="block text-xs text-text-secondary mt-0.5">
                      {t.vatPayerHint}
                    </span>
                  </span>
                </label>
              </div>
            </Card>

            <Card title={t.supplierTitle}>{supplierFields()}</Card>
            <Card title={t.clientTitle}>{clientFields()}</Card>

            <Card title={t.itemsTitle}>
              <div className="flex flex-col gap-4">
                {draft.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={`${styles.itemRow} ${draft.vatPayer ? styles.itemRowVat : ""}`}
                  >
                    <div className="field">
                      <div className="flex items-center justify-between gap-3">
                        <label htmlFor={`${item.id}-desc`}>{`${i + 1}. ${t.description}`}</label>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            set(
                              "items",
                              draft.items.filter((it) => it.id !== item.id),
                            )
                          }
                          disabled={draft.items.length === 1}
                          aria-label={`${t.removeItem} ${i + 1}`}
                          title={t.removeItem}
                        >
                          <Icon name="x" size={16} />
                        </button>
                      </div>
                      <input
                        id={`${item.id}-desc`}
                        className="input"
                        value={item.description}
                        onChange={(e) => setItem(item.id, { description: e.target.value })}
                      />
                    </div>
                    <Field id={`${item.id}-unit`} label={t.unit}>
                      <input
                        id={`${item.id}-unit`}
                        className="input"
                        value={item.unit}
                        onChange={(e) => setItem(item.id, { unit: e.target.value })}
                      />
                    </Field>
                    <Field id={`${item.id}-qty`} label={t.quantity}>
                      <NumberInput
                        id={`${item.id}-qty`}
                        fallback={1}
                        format={(n) => quantityFormat.format(n)}
                        value={item.quantity}
                        onChange={(quantity) => setItem(item.id, { quantity })}
                      />
                    </Field>
                    <Field id={`${item.id}-price`} label={t.price}>
                      <NumberInput
                        id={`${item.id}-price`}
                        format={(n) => moneyFormat.format(n)}
                        suffix={draft.currency}
                        value={item.price}
                        onChange={(price) => setItem(item.id, { price })}
                      />
                    </Field>
                    {draft.vatPayer && (
                      <Field id={`${item.id}-vat`} label={t.vatRate}>
                        <select
                          id={`${item.id}-vat`}
                          className="select"
                          value={item.vatRate}
                          onChange={(e) => setItem(item.id, { vatRate: Number(e.target.value) })}
                        >
                          {VAT_RATES.map((rate) => (
                            <option key={rate} value={rate}>
                              {Math.round(rate * 100)}%
                            </option>
                          ))}
                        </select>
                      </Field>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set("items", [...draft.items, newItem(draft.language)])}
                  className={styles.addLine}
                >
                  <Icon name="plus" size={16} />
                  {t.addItem}
                </button>
              </div>
            </Card>

            <Card title={t.notes}>
              <textarea
                className="textarea"
                rows={3}
                placeholder={t.notesPlaceholder}
                value={draft.notes}
                onChange={(e) => set("notes", e.target.value)}
                aria-label={t.notes}
              />
            </Card>
          </div>

          <div ref={previewRef} className={styles.previewColumn}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-xs font-bold tracking-widest uppercase text-text-secondary">
                {t.preview}
              </div>
              <button type="button" onClick={download} className={styles.downloadButton}>
                <Icon name="file-text" size={16} />
                {t.download}
              </button>
            </div>
            <div className={styles.previewFrame}>
              <div className={styles.preview}>
                <InvoiceDocument draft={draft} branding={branding} />
              </div>
            </div>
            {mounted &&
              createPortal(
                <div className={styles.printPortal}>
                  <InvoiceDocument draft={draft} branding={branding} />
                </div>,
                document.body,
              )}
            <p className="text-xs text-text-secondary mt-3 mb-1 flex items-center gap-1.5">
              <Icon name="shield" size={14} />
              {t.privacy}
            </p>
            <p className="text-xs text-text-secondary m-0">{t.fiscalNote}</p>
          </div>
        </div>
        <MobileResultBar
          locale={locale}
          target={previewRef}
          label={t.preview}
          value={`${moneyFormat.format(computeTotals(draft.items, draft.vatPayer).gross)} ${draft.currency}`}
        />
      </Container>
    </section>
  );
}

function NumberInput({
  id,
  value,
  fallback = 0,
  format,
  suffix,
  onChange,
}: {
  id: string;
  value: number;
  fallback?: number;
  format?: (value: number) => string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const [text, setText] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const parse = (raw: string) => (raw.trim() === "" ? fallback : parseAmount(raw));
  useEffect(() => {
    const current = text.trim() === "" ? fallback : parseAmount(text);
    if (current !== value) setText(String(value));
  }, [value, text, fallback]);
  const shown = !focused && format && text.trim() !== "" ? format(value) : text;
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
        onChange(parse(next));
      }}
      onBlur={() => {
        setFocused(false);
        if (text.trim() === "") setText(String(fallback));
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
  wide?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, wide, error, children }: FieldProps) {
  return (
    <div className={`field min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="text-xs text-[#FF9B8F]">{error}</span>}
    </div>
  );
}
