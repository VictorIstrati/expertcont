import { amountInWords, type InvoiceLanguage } from "./amountInWords";
import { computeTotals } from "./invoiceMath";
import type { InvoiceBranding, InvoiceDraft, InvoiceParty } from "./types";
import { formatIban } from "./validation";
import styles from "./InvoiceDocument.module.css";

interface Labels {
  invoice: string;
  proforma: string;
  number: string;
  date: string;
  dueDate: string;
  supplier: string;
  client: string;
  idno: string;
  regNo: string;
  personId: string;
  vatCode: string;
  address: string;
  iban: string;
  bank: string;
  bankCode: string;
  colNo: string;
  colDescription: string;
  colUnit: string;
  colQty: string;
  colPrice: string;
  colVatRate: string;
  colVat: string;
  colTotal: string;
  colTotalVat: string;
  net: string;
  vat: string;
  total: string;
  inWords: string;
  notes: string;
  issuedBy: string;
  receivedBy: string;
  signature: string;
  notVatPayer: string;
  zeroRated: string;
  branding: string;
}

const LABELS: Record<InvoiceLanguage, Labels> = {
  ro: {
    invoice: "Factură",
    proforma: "Factură proformă",
    number: "Nr.",
    date: "Data",
    dueDate: "Scadența",
    supplier: "Furnizor",
    client: "Cumpărător",
    idno: "IDNO",
    regNo: "Nr. înregistrare",
    personId: "Act de identitate",
    vatCode: "Cod TVA",
    address: "Adresa",
    iban: "IBAN",
    bank: "Banca",
    bankCode: "Cod bancar",
    colNo: "Nr.",
    colDescription: "Denumirea bunurilor / serviciilor",
    colUnit: "U.M.",
    colQty: "Cant.",
    colPrice: "Preț",
    colVatRate: "TVA %",
    colVat: "Suma TVA",
    colTotal: "Suma",
    colTotalVat: "Suma cu TVA",
    net: "Total fără TVA",
    vat: "TVA",
    total: "Total de plată",
    inWords: "Suma în litere",
    notes: "Mențiuni",
    issuedBy: "Eliberat",
    receivedBy: "Primit",
    signature: "semnătura",
    notVatPayer: "Furnizorul nu este înregistrat ca plătitor de TVA.",
    zeroRated:
      "Livrările cu TVA 0% sunt scutite de TVA cu drept de deducere, conform art. 104 lit. a) din Codul fiscal al Republicii Moldova.",
    branding: "Document generat gratuit cu ExpertCont.md",
  },
  ru: {
    invoice: "Счёт",
    proforma: "Счёт-проформа",
    number: "№",
    date: "Дата",
    dueDate: "Срок оплаты",
    supplier: "Поставщик",
    client: "Покупатель",
    idno: "IDNO",
    regNo: "Рег. номер",
    personId: "Документ",
    vatCode: "Код НДС",
    address: "Адрес",
    iban: "IBAN",
    bank: "Банк",
    bankCode: "Код банка",
    colNo: "№",
    colDescription: "Наименование товаров / услуг",
    colUnit: "Ед.",
    colQty: "Кол-во",
    colPrice: "Цена",
    colVatRate: "НДС %",
    colVat: "Сумма НДС",
    colTotal: "Сумма",
    colTotalVat: "Сумма с НДС",
    net: "Итого без НДС",
    vat: "НДС",
    total: "Итого к оплате",
    inWords: "Сумма прописью",
    notes: "Примечания",
    issuedBy: "Выдал",
    receivedBy: "Получил",
    signature: "подпись",
    notVatPayer: "Поставщик не зарегистрирован как плательщик НДС.",
    zeroRated:
      "Поставки с НДС 0% освобождены от НДС с правом на вычет согласно п. a) ст. 104 Налогового кодекса Республики Молдова.",
    branding: "Документ создан бесплатно на ExpertCont.md",
  },
  en: {
    invoice: "Invoice",
    proforma: "Proforma invoice",
    number: "No.",
    date: "Date",
    dueDate: "Due date",
    supplier: "Supplier",
    client: "Customer",
    idno: "IDNO",
    regNo: "Reg. no.",
    personId: "ID / passport no.",
    vatCode: "VAT ID",
    address: "Address",
    iban: "IBAN",
    bank: "Bank",
    bankCode: "Bank code",
    colNo: "#",
    colDescription: "Goods / services",
    colUnit: "Unit",
    colQty: "Qty",
    colPrice: "Price",
    colVatRate: "VAT %",
    colVat: "VAT",
    colTotal: "Amount",
    colTotalVat: "Amount incl. VAT",
    net: "Subtotal",
    vat: "VAT",
    total: "Total due",
    inWords: "Amount in words",
    notes: "Notes",
    issuedBy: "Issued by",
    receivedBy: "Received by",
    signature: "signature",
    notVatPayer: "The supplier is not registered for VAT.",
    zeroRated:
      "Supplies at 0% VAT are exempt with the right of deduction under Article 104(a) of the Tax Code of the Republic of Moldova.",
    branding: "Created for free with ExpertCont.md",
  },
};

const DATE_LOCALE: Record<InvoiceLanguage, string> = { ro: "ro-MD", ru: "ru-MD", en: "en-GB" };

function formatDate(iso: string, language: InvoiceLanguage): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat(DATE_LOCALE[language]).format(new Date(y, m - 1, d));
}

interface Props {
  draft: InvoiceDraft;
  branding: InvoiceBranding;
}

export function InvoiceDocument({ draft, branding }: Props) {
  const l = LABELS[draft.language];
  const totals = computeTotals(draft.items, draft.vatPayer);
  const money = new Intl.NumberFormat(DATE_LOCALE[draft.language], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const qty = new Intl.NumberFormat(DATE_LOCALE[draft.language], { maximumFractionDigits: 3 });
  const pct = (rate: number) => `${Math.round(rate * 100)}%`;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{draft.kind === "proforma" ? l.proforma : l.invoice}</h1>
          <div className={styles.meta}>
            <span>
              {l.number} <strong>{draft.number || "—"}</strong>
            </span>
            <span>
              {l.date}: <strong>{formatDate(draft.date, draft.language)}</strong>
            </span>
            {draft.dueDate && (
              <span>
                {l.dueDate}: <strong>{formatDate(draft.dueDate, draft.language)}</strong>
              </span>
            )}
          </div>
        </div>
      </header>

      <section className={styles.parties}>
        <Party
          title={l.supplier}
          party={draft.supplier}
          labels={l}
          idLabel={l.idno}
          showVat={draft.vatPayer}
        />
        <Party
          title={l.client}
          party={draft.client}
          labels={l}
          idLabel={draft.clientKind === "person" ? l.personId : l.regNo}
          showVat={draft.clientKind === "company"}
        />
      </section>

      <table className={styles.items}>
        <thead>
          <tr>
            <th className={styles.num}>{l.colNo}</th>
            <th>{l.colDescription}</th>
            <th>{l.colUnit}</th>
            <th className={styles.right}>{l.colQty}</th>
            <th className={styles.right}>{l.colPrice}</th>
            {draft.vatPayer && <th className={styles.right}>{l.colVatRate}</th>}
            {draft.vatPayer && <th className={styles.right}>{l.colVat}</th>}
            <th className={styles.right}>{draft.vatPayer ? l.colTotalVat : l.colTotal}</th>
          </tr>
        </thead>
        <tbody>
          {draft.items.map((item, i) => {
            const line = totals.lines[i];
            return (
              <tr key={item.id}>
                <td className={styles.num}>{i + 1}</td>
                <td>{item.description || "—"}</td>
                <td>{item.unit}</td>
                <td className={styles.right}>{qty.format(item.quantity)}</td>
                <td className={styles.right}>{money.format(item.price)}</td>
                {draft.vatPayer && <td className={styles.right}>{pct(item.vatRate)}</td>}
                {draft.vatPayer && <td className={styles.right}>{money.format(line?.vat ?? 0)}</td>}
                <td className={styles.right}>{money.format(line?.gross ?? 0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <section className={styles.totals}>
        {draft.vatPayer && (
          <>
            <div className={styles.totalRow}>
              <span>{l.net}</span>
              <span>
                {money.format(totals.net)} {draft.currency}
              </span>
            </div>
            {totals.vatByRate.map((v) => (
              <div key={v.rate} className={styles.totalRow}>
                <span>
                  {l.vat} {pct(v.rate)}
                </span>
                <span>
                  {money.format(v.vat)} {draft.currency}
                </span>
              </div>
            ))}
          </>
        )}
        <div className={`${styles.totalRow} ${styles.grand}`}>
          <span>{l.total}</span>
          <span>
            {money.format(totals.gross)} {draft.currency}
          </span>
        </div>
      </section>

      <p className={styles.words}>
        <span>{l.inWords}: </span>
        <strong>{amountInWords(totals.gross, draft.currency, draft.language)}</strong>
      </p>

      {!draft.vatPayer && <p className={styles.note}>{l.notVatPayer}</p>}
      {draft.vatPayer && draft.items.some((item) => item.vatRate === 0) && (
        <p className={styles.note}>{l.zeroRated}</p>
      )}
      {draft.notes && (
        <p className={styles.note}>
          <strong>{l.notes}: </strong>
          {draft.notes}
        </p>
      )}

      <footer className={styles.signatures}>
        <div>
          <div className={styles.signLabel}>{l.issuedBy}</div>
          <div className={styles.signLine}>{l.signature}</div>
        </div>
        <div>
          <div className={styles.signLabel}>{l.receivedBy}</div>
          <div className={styles.signLine}>{l.signature}</div>
        </div>
      </footer>

      {branding.show && <div className={styles.branding}>{l.branding}</div>}
    </div>
  );
}

interface PartyProps {
  title: string;
  party: InvoiceParty;
  labels: Labels;
  idLabel: string;
  showVat: boolean;
}

function Party({ title, party, labels, idLabel, showVat }: PartyProps) {
  const rows: [string, string][] = [
    [idLabel, party.idno],
    ...(showVat ? ([[labels.vatCode, party.vatCode]] as [string, string][]) : []),
    [labels.address, party.address],
    [labels.iban, party.iban ? formatIban(party.iban) : ""],
    [labels.bank, party.bank],
    [labels.bankCode, party.bankCode],
  ];
  return (
    <div className={styles.party}>
      <div className={styles.partyTitle}>{title}</div>
      <div className={styles.partyName}>{party.name || "—"}</div>
      <dl className={styles.partyRows}>
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}
