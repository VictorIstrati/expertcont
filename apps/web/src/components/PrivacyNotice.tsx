import { sectionUrl, type Locale } from "@expertcont/i18n";

interface NoticeCopy {
  before: string;
  link: string;
  after: string;
  sensitive: string;
}

const COPY: Record<Locale, NoticeCopy> = {
  ro: {
    before: "Folosim datele tale doar pentru a-ți răspunde la solicitare. Detalii în ",
    link: "Politica de confidențialitate",
    after: ".",
    sensitive:
      "Nu include acum documente sau date sensibile (de exemplu, despre sănătate sau statutul militar); ți le vom cere în siguranță dacă e nevoie.",
  },
  ru: {
    before: "Мы используем ваши данные только для ответа на ваш запрос. Подробнее — в ",
    link: "Политике конфиденциальности",
    after: ".",
    sensitive:
      "Не указывайте сейчас документы и чувствительные данные (например, о здоровье или воинском учёте) — если они понадобятся, мы запросим их безопасным способом.",
  },
  en: {
    before: "We use your details only to reply to your request. See our ",
    link: "Privacy Policy",
    after: ".",
    sensitive:
      "Please don't include documents or sensitive details (for example, about health or military status) yet; we'll ask for them securely if needed.",
  },
};

interface Props {
  locale: Locale;
  sensitiveHint?: boolean;
}

export function PrivacyNotice({ locale, sensitiveHint = false }: Props) {
  const t = COPY[locale];
  return (
    <p className="m-0 text-xs leading-relaxed text-text-secondary">
      {t.before}
      <a href={sectionUrl("privacy", locale)} className="text-primary underline">
        {t.link}
      </a>
      {t.after}
      {sensitiveHint && <> {t.sensitive}</>}
    </p>
  );
}
