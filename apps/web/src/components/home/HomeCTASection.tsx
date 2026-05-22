import { Icon, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  subtitle: string;
  ctaBook: string;
  ctaCall: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "HAI SĂ ÎNCEPEM",
    heading: "Discută cu un consultant gratuit",
    subtitle:
      "30 de minute · ofertă în 48 ore · fără obligații. Primul pas spre o contabilitate fără griji.",
    ctaBook: "Programează acum",
    ctaCall: "Sună-ne · +373 22 123 456",
  },
  ru: {
    eyebrow: "НАЧНЁМ",
    heading: "Бесплатная консультация с экспертом",
    subtitle:
      "30 минут · предложение за 48 часов · без обязательств. Первый шаг к безопасной бухгалтерии.",
    ctaBook: "Записаться сейчас",
    ctaCall: "Позвонить · +373 22 123 456",
  },
  en: {
    eyebrow: "LET'S GET STARTED",
    heading: "Talk to a consultant for free",
    subtitle:
      "30 minutes · offer in 48 hours · no obligations. The first step to worry-free accounting.",
    ctaBook: "Book now",
    ctaCall: "Call us · +373 22 123 456",
  },
};

export default function HomeCTASection({ locale }: Props) {
  const t = strings[locale];
  return (
    <section className="section section-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -right-16 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full border border-white/5" />
      <div className="container relative mx-auto max-w-3xl text-center">
        <div className="eyebrow mb-5 inline-flex justify-center">{t.eyebrow}</div>
        <h2 className="text-white mb-5 max-sm:text-4xl">{t.heading}</h2>
        <p className="text-white/80 text-lg mb-8 py-6 max-sm:text-base">
          {t.subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" icon="calendar" onClick={() => openModal("booking")}>
            {t.ctaBook}
          </Button>
          <a href="tel:+37322123456" className="btn btn-outline btn-lg no-underline">
            <Icon name="phone" size={16} />
            {t.ctaCall}
          </a>
        </div>
      </div>
    </section>
  );
}
