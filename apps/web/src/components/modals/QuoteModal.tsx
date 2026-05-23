import { useEffect, useId, useState } from "react";
import { Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";
import type { BreakdownItem } from "../pricing/calcMath";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  /**
   * Snapshot of the calculator state at the moment the user opened the modal.
   * Empty `items` means the user opened the modal without picking any service.
   */
  quote: { items: BreakdownItem[]; total: number };
}

interface Strings {
  title: string;
  subtitle: string;
  summaryHeading: string;
  emptyQuote: string;
  monthlyLabel: string;
  annualLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  consentNote: string;
  cancel: string;
  submit: string;
  successTitle: string;
  successMsg: string;
  close: string;
}

const strings: Record<Locale, Strings> = {
  ro: {
    title: "Vreau oferta",
    subtitle: "Lasă-ne datele și te contactăm în < 4h cu oferta personalizată.",
    summaryHeading: "Detaliile cererii tale",
    emptyQuote: "Nu ai selectat niciun serviciu în calculator. Vom discuta nevoile la telefon.",
    monthlyLabel: "Total estimat / lună",
    annualLabel: "Estimare anuală",
    nameLabel: "Nume complet",
    namePlaceholder: "Ion Popescu",
    phoneLabel: "Telefon",
    phonePlaceholder: "+373 ...",
    messageLabel: "Mesaj (opțional)",
    messagePlaceholder: "Detalii suplimentare despre afacerea ta...",
    consentNote: "Prin trimitere ești de acord cu prelucrarea datelor conform GDPR.",
    cancel: "Anulează",
    submit: "Trimite cererea",
    successTitle: "Cererea ta a fost trimisă!",
    successMsg: "Te contactăm telefonic în mai puțin de 4 ore în zile lucrătoare.",
    close: "Închide",
  },
  ru: {
    title: "Хочу предложение",
    subtitle: "Оставьте контакты — свяжемся в течение 4 часов с индивидуальным предложением.",
    summaryHeading: "Детали вашего запроса",
    emptyQuote: "Вы не выбрали ни одной услуги в калькуляторе. Обсудим ваши потребности по телефону.",
    monthlyLabel: "Итого в месяц",
    annualLabel: "Годовая оценка",
    nameLabel: "Полное имя",
    namePlaceholder: "Ион Попеску",
    phoneLabel: "Телефон",
    phonePlaceholder: "+373 ...",
    messageLabel: "Сообщение (необязательно)",
    messagePlaceholder: "Дополнительные сведения о вашем бизнесе...",
    consentNote: "Отправляя форму, вы соглашаетесь на обработку данных согласно GDPR.",
    cancel: "Отмена",
    submit: "Отправить запрос",
    successTitle: "Запрос отправлен!",
    successMsg: "Мы перезвоним вам в течение 4 часов в рабочие дни.",
    close: "Закрыть",
  },
  en: {
    title: "I want the offer",
    subtitle: "Leave your details — we'll call within 4 hours with a tailored offer.",
    summaryHeading: "Your request details",
    emptyQuote: "You haven't selected any service in the calculator. We'll discuss your needs by phone.",
    monthlyLabel: "Monthly estimate",
    annualLabel: "Annual estimate",
    nameLabel: "Full name",
    namePlaceholder: "Ion Popescu",
    phoneLabel: "Phone",
    phonePlaceholder: "+373 ...",
    messageLabel: "Message (optional)",
    messagePlaceholder: "Additional details about your business...",
    consentNote: "By submitting you agree to data processing per GDPR.",
    cancel: "Cancel",
    submit: "Send request",
    successTitle: "Your request has been sent!",
    successMsg: "We'll call you within 4 hours on business days.",
    close: "Close",
  },
};

export function QuoteModal({ open, onClose, locale, quote }: Props) {
  const t = strings[locale];
  const nameId = useId();
  const phoneId = useId();
  const messageId = useId();
  const nf = new Intl.NumberFormat(localeTag(locale));

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // Reset success/form state every time the modal re-opens.
  useEffect(() => {
    if (open) {
      setSent(false);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Backend integration is pending — for now we just log a structured payload
    // so it shows up in DevTools while the lead-capture endpoint is being built.
    // eslint-disable-next-line no-console
    console.log("[QuoteModal] submission", {
      locale,
      contact: { name, phone, message: message || null },
      quote: {
        total: quote.total,
        items: quote.items.map((it) => ({
          key: it.key,
          label: it.label,
          detail: it.detail,
          subtotal: it.subtotal,
          ...(it.discountPct !== undefined && {
            discountPct: it.discountPct,
            saleMonths: it.saleMonths,
            originalSubtotal: it.originalSubtotal,
          }),
        })),
      },
    });
    setSent(true);
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
    <Modal open={open} onClose={onClose} title={t.title} subtitle={t.subtitle} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8">
        {/* Quote summary */}
        <div>
          <div className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-4">
            {t.summaryHeading}
          </div>
          <div className="rounded-md border border-border bg-bg-section-alt p-5">
            {quote.items.length === 0 ? (
              <p className="text-sm text-text-secondary m-0">{t.emptyQuote}</p>
            ) : (
              <>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {quote.items.map((it) => (
                    <li
                      key={it.key}
                      className="flex justify-between items-baseline gap-3 text-sm"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold flex items-center gap-2">
                          {it.label}
                          {it.discountPct !== undefined && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-pill text-[9px] font-bold tracking-wider bg-accent text-[#1A1A2E] whitespace-nowrap">
                              −{it.discountPct}%
                            </span>
                          )}
                        </span>
                        {it.detail && (
                          <span className="text-text-secondary text-xs">{it.detail}</span>
                        )}
                      </div>
                      <div className="text-right whitespace-nowrap">
                        {it.originalSubtotal !== undefined && (
                          <div className="text-text-secondary text-xs line-through">
                            {nf.format(it.originalSubtotal)} MDL
                          </div>
                        )}
                        <span className="font-bold text-primary">
                          {nf.format(it.subtotal)} MDL
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">
                      {t.monthlyLabel}
                    </span>
                    <span className="text-2xl font-extrabold text-primary">
                      {nf.format(quote.total)} <span className="text-sm">MDL</span>
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary text-right mt-1">
                    {t.annualLabel}: {nf.format(quote.total * 12)} MDL
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contact form */}
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

          <div className="field">
            <label htmlFor={messageId} className="block text-sm font-semibold mb-2">
              {t.messageLabel}
            </label>
            <textarea
              id={messageId}
              className="input"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
            />
          </div>

          <p className="text-xs text-text-secondary m-0">{t.consentNote}</p>

          <div className="flex flex-wrap gap-3 justify-end mt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              {t.cancel}
            </button>
            <button type="submit" className="btn btn-primary inline-flex items-center gap-2">
              {t.submit}
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
