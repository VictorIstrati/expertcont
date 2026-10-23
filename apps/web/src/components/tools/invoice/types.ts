import type { InvoiceCurrency, InvoiceLanguage } from "./amountInWords";
import type { InvoiceItem } from "./invoiceMath";

export type InvoiceKind = "invoice" | "proforma";
export type ClientKind = "company" | "person";

export interface InvoiceParty {
  name: string;
  idno: string;
  vatCode: string;
  address: string;
  iban: string;
  bank: string;
  bankCode: string;
}

export interface InvoiceDraft {
  kind: InvoiceKind;
  language: InvoiceLanguage;
  currency: InvoiceCurrency;
  number: string;
  date: string;
  dueDate: string;
  vatPayer: boolean;
  supplier: InvoiceParty;
  clientKind: ClientKind;
  client: InvoiceParty;
  items: InvoiceItem[];
  notes: string;
}

export interface InvoiceBranding {
  show: boolean;
}

export const EMPTY_PARTY: InvoiceParty = {
  name: "",
  idno: "",
  vatCode: "",
  address: "",
  iban: "",
  bank: "",
  bankCode: "",
};
