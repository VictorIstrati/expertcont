import { useId, useState } from "react";
import { Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

interface TopicItem {
  v: string;
  l: string;
}

interface Strings {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  topicLabel: string;
  topics: TopicItem[];
  messageLabel: string;
  messagePlaceholder: string;
  consentText: string;
  consentLink: string;
  cancel: string;
  submit: string;
  close: string;
  successTitle: string;
  successMsg: string;
}

const strings: Record<Locale, Strings> = {
  ro: {
    title: "Pune-ne o întrebare",
    subtitle: "Răspundem în mai puțin de 4 ore în zile lucrătoare.",
    nameLabel: "Nume",
    emailLabel: "Email",
    topicLabel: "Subiect",
    topics: [
      { v: "general", l: "General" },
      { v: "contabilitate", l: "Contabilitate" },
      { v: "juridic", l: "Juridic" },
      { v: "hr", l: "HR" },
      { v: "pricing", l: "Prețuri" },
      { v: "securitate", l: "Securitate" },
    ],
    messageLabel: "Întrebarea ta",
    messagePlaceholder:
      "Descrie întrebarea ta în câteva propoziții — cu cât mai concret, cu atât răspundem mai precis.",
    consentText: "Sunt de acord cu prelucrarea datelor conform",
    consentLink: "politicii de confidențialitate",
    cancel: "Anulează",
    submit: "Trimite întrebarea",
    close: "Închide",
    successTitle: "Întrebarea ta a fost trimisă!",
    successMsg: "Vei primi răspuns pe email în maxim 4 ore în zile lucrătoare.",
  },
  ru: {
    title: "Задать вопрос",
    subtitle: "Отвечаем менее чем за 4 часа в рабочие дни.",
    nameLabel: "Имя",
    emailLabel: "Email",
    topicLabel: "Тема",
    topics: [
      { v: "general", l: "Общее" },
      { v: "contabilitate", l: "Бухгалтерия" },
      { v: "juridic", l: "Юридические" },
      { v: "hr", l: "HR" },
      { v: "pricing", l: "Цены" },
      { v: "securitate", l: "Безопасность" },
    ],
    messageLabel: "Ваш вопрос",
    messagePlaceholder:
      "Опишите ваш вопрос в нескольких предложениях — чем конкретнее, тем точнее мы ответим.",
    consentText: "Я согласен на обработку данных согласно",
    consentLink: "политике конфиденциальности",
    cancel: "Отмена",
    submit: "Отправить вопрос",
    close: "Закрыть",
    successTitle: "Ваш вопрос отправлен!",
    successMsg: "Вы получите ответ по email в течение 4 часов в рабочие дни.",
  },
  en: {
    title: "Ask us a question",
    subtitle: "We reply within 4 business hours.",
    nameLabel: "Name",
    emailLabel: "Email",
    topicLabel: "Topic",
    topics: [
      { v: "general", l: "General" },
      { v: "contabilitate", l: "Accounting" },
      { v: "juridic", l: "Legal" },
      { v: "hr", l: "HR" },
      { v: "pricing", l: "Pricing" },
      { v: "securitate", l: "Security" },
    ],
    messageLabel: "Your question",
    messagePlaceholder:
      "Describe your question in a few sentences — the more specific, the more precise our answer.",
    consentText: "I agree to data processing per the",
    consentLink: "privacy policy",
    cancel: "Cancel",
    submit: "Send question",
    close: "Close",
    successTitle: "Your question has been sent!",
    successMsg: "You'll receive a reply by email within 4 business hours.",
  },
};

export function AskQuestionModal({ open, onClose, locale }: Props) {
  const t = strings[locale];
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim().length >= 10 &&
    form.consent;

  const handleClose = () => {
    setSent(false);
    setForm({ name: "", email: "", topic: "general", message: "", consent: false });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={t.title} subtitle={t.subtitle} size="md">
      {sent ? (
        <div className="text-center py-8 px-4">
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-5">
            <Icon name="check" size={28} />
          </div>
          <h3 className="mb-3">{t.successTitle}</h3>
          <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
            {t.successMsg}
          </p>
          <button className="btn btn-primary btn-md" onClick={handleClose}>
            {t.close}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) setSent(true);
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label htmlFor={nameId}>{t.nameLabel} *</label>
              <input
                id={nameId}
                className="input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ion Popescu"
              />
            </div>
            <div className="field">
              <label htmlFor={emailId}>{t.emailLabel} *</label>
              <input
                id={emailId}
                className="input"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ion@firma.md"
              />
            </div>
          </div>

          <div className="field">
            <label>{t.topicLabel}</label>
            <div className="flex flex-wrap gap-2">
              {t.topics.map((tp) => {
                const active = form.topic === tp.v;
                return (
                  <button
                    key={tp.v}
                    type="button"
                    onClick={() => setForm({ ...form, topic: tp.v })}
                    className={`py-2 px-4 text-sm font-semibold rounded-pill cursor-pointer transition-all duration-150 border ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-bg-section-alt text-text-primary border-border"
                    }`}
                  >
                    {tp.l}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="field">
            <label htmlFor={messageId}>{t.messageLabel} *</label>
            <textarea
              id={messageId}
              className="textarea min-h-[100px]"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t.messagePlaceholder}
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-text-secondary leading-normal cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 accent-primary"
            />
            <span>
              {t.consentText} <a className="text-primary underline">{t.consentLink}</a>. *
            </span>
          </label>

          <div className="flex gap-3 justify-end">
            <button type="button" className="btn btn-ghost btn-md" onClick={handleClose}>
              {t.cancel}
            </button>
            <button
              type="submit"
              className={`btn btn-primary btn-md ${canSubmit ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
              disabled={!canSubmit}
            >
              {t.submit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
