import { Icon, ImagePlaceholder, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  ctaBook: string;
  ctaCall: string;
  trustLabel: string;
  gdprTitle: string;
  gdprSub: string;
  consultBadge: string;
  consultSub: string;
  consultCta: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "PARTENERUL DE ÎNCREDERE",
    titleBefore: "Contabilitate care ",
    titleHighlight: "lucrează",
    titleAfter: " pentru tine",
    subtitle:
      "Servicii integrate de contabilitate, juridic, HR și consultanță IT — o echipă completă sub un singur acoperiș pentru afacerea ta din Moldova.",
    ctaBook: "Programează consultație",
    ctaCall: "Sună acum",
    trustLabel: "350+ companii de încredere · 4.9/5 din recenzii",
    gdprTitle: "Conform GDPR",
    gdprSub: "Date securizate · servere în UE",
    consultBadge: "CONSULTANT DISPONIBIL",
    consultSub: "Programare în < 4 ore",
    consultCta: "Programează acum",
  },
  ru: {
    eyebrow: "НАШ НАДЁЖНЫЙ ПАРТНЁР",
    titleBefore: "Бухгалтерия, которая ",
    titleHighlight: "работает",
    titleAfter: " на вас",
    subtitle:
      "Комплексные услуги бухгалтерии, юридического сопровождения, HR и IT-консалтинга — одна команда под одной крышей для вашего бизнеса в Молдове.",
    ctaBook: "Записаться на консультацию",
    ctaCall: "Позвоните нам",
    trustLabel: "350+ компаний доверяют нам · 4.9/5 в отзывах",
    gdprTitle: "Соответствует GDPR",
    gdprSub: "Защита данных · серверы в ЕС",
    consultBadge: "КОНСУЛЬТАНТ ДОСТУПЕН",
    consultSub: "Запись менее чем за 4 часа",
    consultCta: "Записаться сейчас",
  },
  en: {
    eyebrow: "YOUR TRUSTED PARTNER",
    titleBefore: "Accounting that ",
    titleHighlight: "works",
    titleAfter: " for you",
    subtitle:
      "Integrated accounting, legal, HR and IT consulting services — a complete team under one roof for your business in Moldova.",
    ctaBook: "Schedule a consultation",
    ctaCall: "Call now",
    trustLabel: "350+ companies trust us · 4.9/5 in reviews",
    gdprTitle: "GDPR Compliant",
    gdprSub: "Secure data · EU servers",
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
          <p className="text-xl text-text-secondary max-w-xl mb-10">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              variant="primary"
              size="lg"
              icon="calendar"
              onClick={() => openModal("booking")}
            >
              {t.ctaBook}
            </Button>
            <a href="tel:+37322123456" className="btn btn-outline btn-lg no-underline">
              <Icon name="phone" size={16} />
              {t.ctaCall}
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary border border-border">
              <Icon name="shield" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="star" size={14} />
                ))}
                <span className="text-text-primary font-bold text-sm ml-2">4.9/5</span>
              </div>
              <div className="text-sm text-text-secondary mt-1">{t.trustLabel}</div>
            </div>
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

            {/* Floating compliance badge */}
            <div className="hero-float-1 absolute top-14 -left-8 bg-bg-card px-5 py-4 rounded-md shadow-lg border border-border flex items-center gap-3 max-sm:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary-50 text-primary">
                <Icon name="shield" size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">{t.gdprTitle}</div>
                <div className="text-xs text-text-secondary">{t.gdprSub}</div>
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
