export const LANGUAGES = ['ro', 'ru', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'ro';

export type ContactInput = {
  language?: Language;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  source_url?: string;
};

export type ReviewInput = {
  language?: Language;
  name: string;
  email?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  content: string;
  source_url?: string;
};

export type BookACallInput = {
  language?: Language;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferred_at?: string;
  notes?: string;
  source_url?: string;
};

export type NewsletterInput = {
  language?: Language;
  email: string;
  source_url?: string;
};

export type FaqQuestionInput = {
  language?: Language;
  name: string;
  email: string;
  topic?: string;
  question: string;
  source_url?: string;
};

export type QuoteItemParams =
  | { key: 'accounting'; industry: string; invoices: number; revenueMDL: number; vat: boolean }
  | { key: 'hr'; employees: number; perEmployee: number }
  | { key: 'legal'; hours: number; hourlyRate: number }
  | { key: 'financial'; hours: number; hourlyRate: number }
  | { key: 'it'; hours: number; hourlyRate: number };

export type QuoteItem = {
  key?: string;
  label?: string;
  detail?: string;
  params?: QuoteItemParams;
  subtotal: number;
  discountPct?: number;
  saleMonths?: number;
  originalSubtotal?: number;
};

export type QuoteInput = {
  language?: Language;
  name: string;
  email?: string;
  phone: string;
  company?: string;
  message?: string;
  total_mdl: number;
  items: QuoteItem[];
  source_url?: string;
};

export type SubmitResult =
  | { ok: true; id: string; already_subscribed?: boolean }
  | { ok: false; error: string; status: number };
