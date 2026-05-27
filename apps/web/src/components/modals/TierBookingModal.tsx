import { useEffect, useId, useState } from "react";
import { Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";
import { backendClient, detectLanguage } from "../../lib/backend";

export interface TierBookingSelection {
  tierName: string;
  /** Displayed price (monthly value or yearly value, depending on `billing`). null = custom/contact. */
  price: number | null;
  /** Localized label fallback when price is null (e.g. "Personalizat"). */
  priceLabel?: string;
  billing: "monthly" | "yearly";
  /** Localized monthly period suffix from the tier (e.g. "/ lună"). */
  monthlyPeriod: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  selection: TierBookingSelection | null;
}

interface Strings {
  title: string;
  subtitle: string;
  selectedHeading: string;
  packageLabel: string;
  priceLabel: string;
  billingLabel: string;
  monthly: string;
  yearly: string;
  yearLabel: string;
  monthLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  consentNote: string;
  cancel: string;
  submit: string;
  sending: string;
  errorGeneric: string;
  successTitle: string;
  successMsg: string;
  close: string;
}

const strings: Record<Locale, Strings> = {
  ro: {
    title: "Rezervă pachetul",
    subtitle: "Lasă-ne numele și telefonul — te contactăm în < 4h.",
    selectedHeading: "Pachet selectat",
    packageLabel: "Pachet",
    priceLabel: "Preț",
    billingLabel: "Facturare",
    monthly: "Lunar",
    yearly: "Anual",
    yearLabel: "/ an",
    monthLabel: "/ lună",
    nameLabel: "Nume complet",
    namePlaceholder: "Ion Popescu",
    phoneLabel: "Telefon",
    phonePlaceholder: "+373 ...",
    consentNote: "Prin trimitere ești de acord cu prelucrarea datelor conform GDPR.",
    cancel: "Anulează",
    submit: "Trimite cererea",
    sending: "Se trimite…",
    errorGeneric: "Nu am putut trimite cererea. Încearcă din nou.",
    successTitle: "Cererea ta a fost trimisă!",
    successMsg: "Te contactăm telefonic în cel mai scurt timp.",
    close: "Închide",
  },
  ru: {
    title: "Заказать пакет",
    subtitle: "Оставьте имя и телефон — свяжемся в течение 4 часов.",
    selectedHeading: "Выбранный пакет",
    packageLabel: "Пакет",
    priceLabel: "Цена",
    billingLabel: "Оплата",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    yearLabel: "/ год",
    monthLabel: "/ мес",
    nameLabel: "Полное имя",
    namePlaceholder: "Ион Попеску",
    phoneLabel: "Телефон",
    phonePlaceholder: "+373 ...",
    consentNote: "Отправляя форму, вы соглашаетесь на обработку данных согласно GDPR.",
    cancel: "Отмена",
    submit: "Отправить запрос",
    sending: "Отправка…",
    errorGeneric: "Не удалось отправить запрос. Попробуйте ещё раз.",
    successTitle: "Запрос отправлен!",
    successMsg: "Мы перезвоним вам в ближайшее время.",
    close: "Закрыть",
  },
  en: {
    title: "Book package",
    subtitle: "Leave your name and phone — we'll call within 4 hours.",
    selectedHeading: "Selected package",
    packageLabel: "Package",
    priceLabel: "Price",
    billingLabel: "Billing",
    monthly: "Monthly",
    yearly: "Yearly",
    yearLabel: "/ year",
    monthLabel: "/ month",
    nameLabel: "Full name",
    namePlaceholder: "Ion Popescu",
    phoneLabel: "Phone",
    phonePlaceholder: "+373 ...",
    consentNote: "By submitting you agree to data processing per GDPR.",
    cancel: "Cancel",
    submit: "Send request",
    sending: "Sending…",
    errorGeneric: "Could not send your request. Please try again.",
    successTitle: "Your request has been sent!",
    successMsg: "We'll call you back as soon as possible.",
    close: "Close",
  },
};

export function TierBookingModal({ open, onClose, locale, selection }: Props) {
  const t = strings[locale];
  const nameId = useId();
  const phoneId = useId();
  const nf = new Intl.NumberFormat(localeTag(locale));

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitting(false);
      setErrorMsg(null);
    }
  }, [open]);

  if (!selection) return null;

  const hasPrice = selection.price !== null;
  const periodLabel = selection.billing === "yearly" ? t.yearLabel : selection.monthlyPeriod || t.monthLabel;
  const billingLabel = selection.billing === "yearly" ? t.yearly : t.monthly;
  // The quotes table requires a non-negative total_mdl. For custom/contact tiers we store 0
  // and the price label is kept in the items snapshot.
  const totalMdl = hasPrice ? (selection.price as number) : 0;
  const priceDetail = hasPrice
    ? `${nf.format(selection.price as number)} MDL ${periodLabel}`
    : selection.priceLabel ?? "—";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !selection) return;
    setSubmitting(true);
    setErrorMsg(null);

    const result = await backendClient.submitQuote({
      language: detectLanguage("", locale),
      name,
      phone,
      total_mdl: totalMdl,
      items: [
        {
          key: "tier",
          label: selection.tierName,
          detail: `${billingLabel} — ${priceDetail}`,
          subtotal: totalMdl,
        },
      ],
      source_url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      setSent(true);
    } else {
      setErrorMsg(t.errorGeneric);
    }
  }

  if (sent) {
    return (
      <Modal open={open} onClose={onClose} title={t.successTitle} size="sm">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-50 text-accent-dark mb-4">
            <Icon name="check" size={28} stroke={2.5} />
          </div>
          <p className="text-text-secondary">{t.successMsg}</p>
          <button onClick={onClose} className="btn btn-primary mt-6">
            {t.close}
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title={t.title} subtitle={t.subtitle} size="md">
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-3">
            {t.selectedHeading}
          </div>
          <div className="rounded-md border border-border bg-bg-section-alt p-5 flex flex-col gap-3">
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-sm text-text-secondary">{t.packageLabel}</span>
              <span className="font-bold text-primary text-right">{selection.tierName}</span>
            </div>
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-sm text-text-secondary">{t.billingLabel}</span>
              <span className="font-semibold text-right">{billingLabel}</span>
            </div>
            <div className="flex justify-between items-baseline gap-3">
              <span className="text-sm text-text-secondary">{t.priceLabel}</span>
              <span className="text-xl font-extrabold text-primary text-right">{priceDetail}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor={nameId} className="block text-sm font-semibold mb-2">
              {t.nameLabel} *
            </label>
            <input
              id={nameId}
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
            />
          </div>

          <div className="field">
            <label htmlFor={phoneId} className="block text-sm font-semibold mb-2">
              {t.phoneLabel} *
            </label>
            <input
              id={phoneId}
              className="input"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
            />
          </div>

          <p className="text-xs text-text-secondary m-0">{t.consentNote}</p>

          {errorMsg ? (
            <p role="alert" className="text-sm text-[#B91C1C] m-0">
              {errorMsg}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={submitting}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className={`btn btn-primary inline-flex items-center gap-2 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={submitting}
            >
              {submitting ? t.sending : t.submit}
              {submitting ? null : <Icon name="arrow-right" size={14} />}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
