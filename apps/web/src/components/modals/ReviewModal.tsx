import { useState } from "react";
import { Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

interface Strings {
  title: string;
  subtitle: string;
  ratingLabel: string;
  ratingLabels: [string, string, string, string, string];
  nameLabel: string;
  companyLabel: string;
  roleLabel: string;
  bodyLabel: string;
  bodyPlaceholder: string;
  bodyMin: string;
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
    title: "Lasă o recenzie",
    subtitle: "Părerea ta ne ajută să creștem și îi ghidează pe viitorii clienți.",
    ratingLabel: "Evaluarea ta",
    ratingLabels: ["Slab", "Acceptabil", "Bun", "Foarte bun", "Excelent"],
    nameLabel: "Nume",
    companyLabel: "Companie",
    roleLabel: "Funcție / domeniu",
    bodyLabel: "Recenzia ta",
    bodyPlaceholder:
      "Spune-ne pe scurt cum a fost experiența ta cu ExpertCont — ce te-a impresionat și ce ai recomanda altora.",
    bodyMin: "/ minim 20 caractere",
    consentText: "Sunt de acord ca recenzia să fie publicată anonim pe site conform",
    consentLink: "politicii de confidențialitate",
    cancel: "Anulează",
    submit: "Trimite recenzia",
    close: "Închide",
    successTitle: "Mulțumim pentru recenzie!",
    successMsg: "Echipa noastră va revizui recenzia și o va publica în maxim 48 de ore.",
  },
  ru: {
    title: "Оставить отзыв",
    subtitle: "Ваш отзыв помогает нам расти и помогает будущим клиентам.",
    ratingLabel: "Ваша оценка",
    ratingLabels: ["Плохо", "Нормально", "Хорошо", "Очень хорошо", "Отлично"],
    nameLabel: "Имя",
    companyLabel: "Компания",
    roleLabel: "Должность / отрасль",
    bodyLabel: "Ваш отзыв",
    bodyPlaceholder:
      "Расскажите коротко о вашем опыте с ExpertCont — что вас впечатлило и что вы бы порекомендовали другим.",
    bodyMin: "/ минимум 20 символов",
    consentText: "Я согласен на публикацию отзыва анонимно на сайте согласно",
    consentLink: "политике конфиденциальности",
    cancel: "Отмена",
    submit: "Отправить отзыв",
    close: "Закрыть",
    successTitle: "Спасибо за отзыв!",
    successMsg: "Наша команда рассмотрит отзыв и опубликует его в течение 48 часов.",
  },
  en: {
    title: "Leave a review",
    subtitle: "Your feedback helps us grow and guides future clients.",
    ratingLabel: "Your rating",
    ratingLabels: ["Poor", "Acceptable", "Good", "Very good", "Excellent"],
    nameLabel: "Name",
    companyLabel: "Company",
    roleLabel: "Role / industry",
    bodyLabel: "Your review",
    bodyPlaceholder:
      "Tell us briefly about your experience with ExpertCont — what impressed you and what you'd recommend to others.",
    bodyMin: "/ minimum 20 characters",
    consentText: "I agree to have my review published anonymously on the site per the",
    consentLink: "privacy policy",
    cancel: "Cancel",
    submit: "Submit review",
    close: "Close",
    successTitle: "Thank you for your review!",
    successMsg: "Our team will review it and publish it within 48 hours.",
  },
};

export function ReviewModal({ open, onClose, locale }: Props) {
  const t = strings[locale];
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", role: "", quote: "", consent: false });
  const [sent, setSent] = useState(false);

  const canSubmit = form.name.trim() !== "" && form.quote.trim().length >= 20 && rating > 0;

  const handleClose = () => {
    setSent(false);
    setRating(5);
    setHover(0);
    setForm({ name: "", company: "", role: "", quote: "", consent: false });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={t.title} subtitle={t.subtitle} size="md">
      {sent ? (
        <div className="text-center py-8 px-4">
          <div className="w-20 h-20 rounded-full bg-accent-50 text-accent-dark flex items-center justify-center mx-auto mb-5">
            <Icon name="star" size={36} />
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
          className="flex flex-col gap-5"
        >
          {/* Star rating */}
          <div>
            <label className="text-sm font-bold block mb-3">{t.ratingLabel}</label>
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((i) => {
                const active = (hover || rating) >= i;
                const scaled = hover === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    className={`p-1 bg-transparent border-none cursor-pointer transition-[color,transform] duration-150 ${
                      active ? "text-accent" : "text-border-strong"
                    } ${scaled ? "scale-[1.15]" : "scale-100"}`}
                    aria-label={`${i} ${i === 1 ? "star" : "stars"}`}
                  >
                    <Icon name="star" size={32} />
                  </button>
                );
              })}
              {(hover || rating) > 0 && (
                <span className="ml-2 text-sm font-semibold text-text-secondary">
                  {t.ratingLabels[(hover || rating) - 1]}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="field">
              <label>{t.nameLabel} *</label>
              <input
                className="input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ion P."
              />
            </div>
            <div className="field">
              <label>{t.companyLabel}</label>
              <input
                className="input"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder={
                  locale === "ru" ? "Необязательно" : locale === "en" ? "Optional" : "Opțional"
                }
              />
            </div>
          </div>

          <div className="field">
            <label>{t.roleLabel}</label>
            <input
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder={
                locale === "ru"
                  ? "напр: Директор, розница"
                  : locale === "en"
                    ? "e.g. Director, retail"
                    : "ex: Director, retail"
              }
            />
          </div>

          <div className="field">
            <label>{t.bodyLabel} *</label>
            <textarea
              className="textarea min-h-[110px]"
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              placeholder={t.bodyPlaceholder}
            />
            <div
              className={`text-xs mt-1 ${form.quote.length < 20 ? "text-text-secondary" : "text-primary"}`}
            >
              {form.quote.length} {t.bodyMin}
            </div>
          </div>

          <label className="flex items-start gap-3 py-3 px-4 bg-bg-section-alt rounded-sm border border-border text-sm leading-normal cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 accent-primary"
            />
            <span className="text-text-secondary">
              {t.consentText}{" "}
              <a className="text-primary underline">{t.consentLink}</a>.
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
