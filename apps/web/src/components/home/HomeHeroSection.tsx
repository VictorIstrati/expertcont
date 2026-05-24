import { Icon, ImagePlaceholder, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import { phoneTel, site } from "../../site";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  priceAnchor: string;
  ctaBook: string;
  ctaCall: string;
  trustLabel: string;
  messagingLabel: string;
  badgeTitle: string;
  badgeSub: string;
  consultBadge: string;
  consultSub: string;
  consultCta: string;
}

const waNumber = phoneTel.replace(/\D/g, "");
const whatsappHref = `https://wa.me/${waNumber}`;
const viberHref = `viber://chat?number=%2B${waNumber}`;
const telegramHref = `https://t.me/${site.business.telegram}`;

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "SERVICII CONTABILE · CHIȘINĂU ȘI MOLDOVA",
    titleBefore: "Contabilitate care ",
    titleHighlight: "lucrează",
    titleAfter: " pentru tine",
    subtitle:
      "Servicii de contabilitate, consultanță juridică și HR pentru companii din Moldova — o echipă completă sub un singur acoperiș.",
    priceAnchor: "Pachete de la 2499 lei / lună · ofertă în 48 ore",
    ctaBook: "Programează consultație",
    ctaCall: "Sună acum",
    trustLabel: "Echipă multidisciplinară · răspuns sub 4 ore · 15+ ani experiență cumulată",
    messagingLabel: "Scrie-ne pe:",
    badgeTitle: "Manager dedicat",
    badgeSub: "Contabil, jurist și consultant IT",
    consultBadge: "CONSULTANT DISPONIBIL",
    consultSub: "Programare în < 4 ore",
    consultCta: "Programează acum",
  },
  ru: {
    eyebrow: "БУХГАЛТЕРСКИЕ УСЛУГИ · КИШИНЁВ И МОЛДОВА",
    titleBefore: "Бухгалтерия, которая ",
    titleHighlight: "работает",
    titleAfter: " на вас",
    subtitle:
      "Бухгалтерские услуги, юридическая консультация и HR для компаний в Молдове — одна команда под одной крышей.",
    priceAnchor: "Пакеты от 2499 леев / мес · предложение за 48 часов",
    ctaBook: "Записаться на консультацию",
    ctaCall: "Позвоните нам",
    trustLabel: "Мультидисциплинарная команда · ответ менее 4 часов · 15+ лет совокупного опыта",
    messagingLabel: "Напишите нам:",
    badgeTitle: "Персональный менеджер",
    badgeSub: "Бухгалтер, юрист и IT-консультант",
    consultBadge: "КОНСУЛЬТАНТ ДОСТУПЕН",
    consultSub: "Запись менее чем за 4 часа",
    consultCta: "Записаться сейчас",
  },
  en: {
    eyebrow: "ACCOUNTING SERVICES · CHIȘINĂU AND MOLDOVA",
    titleBefore: "Accounting that ",
    titleHighlight: "works",
    titleAfter: " for you",
    subtitle:
      "Accounting services, legal consulting and HR for companies in Moldova — a complete team under one roof.",
    priceAnchor: "Packages from 2499 MDL / month · quote within 48 hours",
    ctaBook: "Schedule a consultation",
    ctaCall: "Call now",
    trustLabel: "Multidisciplinary team · reply under 4 hours · 15+ years of combined experience",
    messagingLabel: "Message us on:",
    badgeTitle: "Dedicated manager",
    badgeSub: "Accountant, lawyer and IT consultant",
    consultBadge: "CONSULTANT AVAILABLE",
    consultSub: "Appointment in < 4 hours",
    consultCta: "Book now",
  },
};

export default function HomeHeroSection({ locale }: Props) {
  const t = strings[locale];
  return (
    <section className="relative overflow-hidden pt-16 pb-24">
      {/* Dot pattern background */}
      <div className="dot-pattern-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_70%)]" />
      <div className="container relative grid items-center gap-16 grid-cols-[1.15fr_1fr] max-lg:grid-cols-1">
        {/* Left column */}
        <div className="hero-a-left max-sm:[&_h1]:text-5xl">
          <div className="eyebrow mb-6">{t.eyebrow}</div>
          <h1 className="mb-6">
            {t.titleBefore}
            <span className="relative whitespace-nowrap">
              <span className="relative z-[1]">{t.titleHighlight}</span>
              <svg
                className="absolute left-0 right-0 bottom-1 w-full h-3.5 z-0"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 Q 80 1, 160 6 T 298 5"
                  stroke="#DFB741"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {t.titleAfter}
          </h1>
          <p className="text-xl text-text-secondary max-w-xl mb-4">{t.subtitle}</p>
          <p className="text-sm font-semibold text-primary max-w-xl mb-8">{t.priceAnchor}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant="primary"
              size="lg"
              icon="calendar"
              onClick={() => openModal("booking")}
            >
              {t.ctaBook}
            </Button>
            <a href={`tel:${phoneTel}`} className="btn btn-outline btn-lg no-underline">
              <Icon name="phone" size={16} />
              {t.ctaCall}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm text-text-secondary">{t.messagingLabel}</span>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-[#25D366] no-underline transition hover:border-[#25D366]"
            >
              <Icon name="whatsapp" size={18} />
            </a>
            <a
              href={viberHref}
              aria-label="Viber"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-[#7360F2] no-underline transition hover:border-[#7360F2]"
            >
              <Icon name="viber" size={18} />
            </a>
            <a
              href={telegramHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-[#229ED9] no-underline transition hover:border-[#229ED9]"
            >
              <Icon name="telegram" size={18} />
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary border border-border">
              <Icon name="users" size={22} />
            </div>
            <div className="text-sm text-text-secondary">{t.trustLabel}</div>
          </div>
        </div>

        {/* Right column */}
        <div className="hero-a-right relative max-lg:hidden">
          <div className="relative bg-bg-card rounded-2xl border border-border p-8 shadow-xl">
            <ImagePlaceholder
              label="Team photo · ExpertCont office"
              ratio="4/5"
              style={{ borderRadius: "var(--r-lg)" }}
            />

            {/* Floating team badge */}
            <div className="hero-float-1 absolute top-14 -left-8 bg-bg-card px-5 py-4 rounded-md shadow-lg border border-border flex items-center gap-3 max-sm:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary-50 text-primary">
                <Icon name="users" size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">{t.badgeTitle}</div>
                <div className="text-xs text-text-secondary">{t.badgeSub}</div>
              </div>
            </div>

            {/* Floating CTA card */}
            <div className="hero-float-2 absolute bottom-12 -right-8 bg-bg-card p-5 rounded-md shadow-lg border border-border min-w-[220px] max-sm:hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#10B981] [animation:pulseDot_2s_ease-in-out_infinite]" />
                {t.consultBadge}
              </div>
              <div className="text-sm font-semibold mb-3">{t.consultSub}</div>
              <button
                className="w-full px-3 py-3 rounded-sm bg-primary dark:bg-primary-deep text-white text-sm font-semibold flex items-center justify-center gap-2 border-none cursor-pointer"
                onClick={() => openModal("booking")}
              >
                <Icon name="phone" size={14} />
                {t.consultCta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
