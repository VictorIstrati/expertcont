import { Icon, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import { site, phoneTel } from "../../site";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  subtitle: string;
  ctaBook: string;
  /** Prefix shown before the phone number, e.g. "Sună-ne · ". */
  ctaCallPrefix: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "HAI SĂ ÎNCEPEM",
    heading: "Discută cu un consultant gratuit",
    subtitle:
      "30 de minute · ofertă în 48 ore · fără obligații. Primul pas spre o contabilitate fără griji.",
    ctaBook: "Programează acum",
    ctaCallPrefix: "Sună-ne · ",
  },
  ru: {
    eyebrow: "НАЧНЁМ",
    heading: "Бесплатная консультация с экспертом",
    subtitle:
      "30 минут · предложение за 48 часов · без обязательств. Первый шаг к безопасной бухгалтерии.",
    ctaBook: "Записаться сейчас",
    ctaCallPrefix: "Позвонить · ",
  },
  en: {
    eyebrow: "LET'S GET STARTED",
    heading: "Talk to a consultant for free",
    subtitle:
      "30 minutes · offer in 48 hours · no obligations. The first step to worry-free accounting.",
    ctaBook: "Book now",
    ctaCallPrefix: "Call us · ",
  },
};

export default function HomeCTASection({ locale }: Props) {
  const t = strings[locale];
  const phone = site.business.phone;
  return (
    <section className="section section-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -right-16 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full border border-white/5" />
      <div className="container relative mx-auto max-w-3xl text-center">
        <div className="eyebrow mb-5 inline-flex justify-center">{t.eyebrow}</div>
        <h2 className="text-white mb-5 max-sm:text-4xl">{t.heading}</h2>
        <p className="text-white/80 text-lg mb-8 py-6 max-sm:text-base">{t.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" icon="calendar" onClick={() => openModal("booking")}>
            {t.ctaBook}
          </Button>
          <a href={`tel:${phoneTel}`} className="btn btn-outline btn-lg no-underline">
            <Icon name="phone" size={16} />
            {t.ctaCallPrefix}
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
