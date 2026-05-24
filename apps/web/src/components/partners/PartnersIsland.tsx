import { PageHeader, SectionHeader, Stat, Icon, Button } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface PartnersIslandProps {
  locale: Locale;
  homeHref: string;
}

interface Category {
  icon: IconName;
  name: string;
  description: string;
  partners: string[];
}

interface LocaleStrings {
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbHome: string;
  breadcrumbPartners: string;

  introEyebrow: string;
  introTitle: string;
  introText: string;
  stats: { v: string; l: string }[];

  categoriesEyebrow: string;
  categoriesTitle: string;
  categories: Category[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaBook: string;
  ctaPropose: string;
  ctaEmail: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    pageEyebrow: "Parteneri",
    pageTitle: "Construim împreună cu liderii din domeniu",
    pageSubtitle:
      "Rețeaua noastră de parteneri ne permite să oferim soluții complete — de la tehnologie și finanțe, la juridic și audit.",
    breadcrumbHome: "Acasă",
    breadcrumbPartners: "Parteneri",

    introEyebrow: "De ce parteneriate",
    introTitle: "Mai mult decât furnizori — aliați de afaceri",
    introText:
      "Credem că un serviciu excelent se construiește cu oameni și companii excelente. Partenerii noștri sunt aleși cu grijă pe baza valorilor comune: integritate, competență și orientare spre client.",
    stats: [
      { v: "50+", l: "Parteneri activi" },
      { v: "15 ani", l: "Parteneriate durabile" },
      { v: "3 țări", l: "Acoperire regională" },
      { v: "300+", l: "Proiecte comune" },
    ],

    categoriesEyebrow: "Categorii",
    categoriesTitle: "Parteneri pe domenii",
    categories: [
      {
        icon: "code",
        name: "Tehnologie",
        description:
          "Platformele software și furnizorii IT cu care integrăm soluțiile noastre digitale.",
        partners: ["Microsoft", "Oracle", "SAP", "IBM", "1C", "Bitrix"],
      },
      {
        icon: "trending",
        name: "Financiar-bancar",
        description:
          "Instituțiile financiare prin care facilităm operațiunile bancare și de trezorerie ale clienților.",
        partners: ["Moldova Agroindbank", "Maib", "Eximbank", "Victoriabank", "BCR"],
      },
      {
        icon: "scale",
        name: "Juridic & audit",
        description:
          "Cabinetele de avocatură și firmele de audit cu care colaborăm pentru conformitate și due diligence.",
        partners: ["Deloitte", "PwC", "KPMG", "Baroul Avocaților", "Camera Notarială"],
      },
    ],

    ctaEyebrow: "DEVINO PARTENER",
    ctaTitle: "Devino partener",
    ctaText:
      "Dacă activezi în domenii complementare și crezi că valorile noastre se potrivesc, hai să discutăm. Parteneriatele noastre sunt bazate pe beneficii reciproce și proiecte concrete.",
    ctaBook: "Programează discuție",
    ctaPropose: "Trimite propunere",
    ctaEmail: "mailto:parteneri@expertcont.md",
  },

  ru: {
    pageEyebrow: "Партнёры",
    pageTitle: "Строим вместе с лидерами отрасли",
    pageSubtitle:
      "Наша партнёрская сеть позволяет предлагать комплексные решения — от технологий и финансов до юридических и аудиторских услуг.",
    breadcrumbHome: "Главная",
    breadcrumbPartners: "Партнёры",

    introEyebrow: "Зачем партнёрства",
    introTitle: "Больше чем поставщики — деловые союзники",
    introText:
      "Мы убеждены: отличный сервис строится вместе с отличными людьми и компаниями. Наших партнёров мы выбираем тщательно — на основе общих ценностей: честности, компетентности и ориентации на клиента.",
    stats: [
      { v: "50+", l: "Активных партнёров" },
      { v: "15 лет", l: "Долгосрочные партнёрства" },
      { v: "3 страны", l: "Региональный охват" },
      { v: "300+", l: "Совместных проектов" },
    ],

    categoriesEyebrow: "Категории",
    categoriesTitle: "Партнёры по направлениям",
    categories: [
      {
        icon: "code",
        name: "Технологии",
        description:
          "Программные платформы и IT-поставщики, с которыми мы интегрируем наши цифровые решения.",
        partners: ["Microsoft", "Oracle", "SAP", "IBM", "1C", "Bitrix"],
      },
      {
        icon: "trending",
        name: "Финансы",
        description:
          "Финансовые учреждения, через которые мы обеспечиваем банковские и казначейские операции клиентов.",
        partners: ["Moldova Agroindbank", "Maib", "Eximbank", "Victoriabank", "BCR"],
      },
      {
        icon: "scale",
        name: "Юридические и аудит",
        description:
          "Адвокатские бюро и аудиторские фирмы, с которыми мы сотрудничаем по вопросам compliance и due diligence.",
        partners: ["Deloitte", "PwC", "KPMG", "Ассоциация адвокатов", "Нотариальная палата"],
      },
    ],

    ctaEyebrow: "СТАТЬ ПАРТНЁРОМ",
    ctaTitle: "Станьте партнёром",
    ctaText:
      "Если вы работаете в смежных областях и разделяете наши ценности — давайте поговорим. Наши партнёрства основаны на взаимной выгоде и конкретных проектах.",
    ctaBook: "Запланировать встречу",
    ctaPropose: "Отправить предложение",
    ctaEmail: "mailto:partners@expertcont.md",
  },

  en: {
    pageEyebrow: "Partners",
    pageTitle: "Building together with industry leaders",
    pageSubtitle:
      "Our partner network allows us to deliver end-to-end solutions — from technology and finance to legal and audit services.",
    breadcrumbHome: "Home",
    breadcrumbPartners: "Partners",

    introEyebrow: "Why partnerships",
    introTitle: "More than vendors — true business allies",
    introText:
      "We believe an excellent service is built with excellent people and companies. Our partners are carefully selected based on shared values: integrity, expertise and a client-first mindset.",
    stats: [
      { v: "50+", l: "Active partners" },
      { v: "15 years", l: "Lasting partnerships" },
      { v: "3 countries", l: "Regional coverage" },
      { v: "300+", l: "Joint projects" },
    ],

    categoriesEyebrow: "Categories",
    categoriesTitle: "Partners by domain",
    categories: [
      {
        icon: "code",
        name: "Technology",
        description:
          "Software platforms and IT vendors we integrate with to power our digital solutions.",
        partners: ["Microsoft", "Oracle", "SAP", "IBM", "1C", "Bitrix"],
      },
      {
        icon: "trending",
        name: "Financial",
        description:
          "Financial institutions through which we facilitate banking and treasury operations for our clients.",
        partners: ["Moldova Agroindbank", "Maib", "Eximbank", "Victoriabank", "BCR"],
      },
      {
        icon: "scale",
        name: "Legal & audit",
        description:
          "Law firms and audit practices we collaborate with for compliance and due diligence engagements.",
        partners: ["Deloitte", "PwC", "KPMG", "Bar Association", "Notarial Chamber"],
      },
    ],

    ctaEyebrow: "BECOME A PARTNER",
    ctaTitle: "Become a partner",
    ctaText:
      "If you work in complementary fields and share our values, let's talk. Our partnerships are built on mutual benefit and concrete projects.",
    ctaBook: "Schedule a discussion",
    ctaPropose: "Send a proposal",
    ctaEmail: "mailto:partners@expertcont.md",
  },
};

export function PartnersIsland({ locale, homeHref }: PartnersIslandProps) {
  const t = strings[locale];

  return (
    <main>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        subtitle={t.pageSubtitle}
        breadcrumbs={[{ label: t.breadcrumbHome, href: homeHref }, { label: t.breadcrumbPartners }]}
      />

      {/* ── Intro + Stats ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow mb-4">{t.introEyebrow}</div>
              <h2 className="mb-5">{t.introTitle}</h2>
              <p className="text-text-secondary text-lg leading-relaxed">{t.introText}</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {t.stats.map((s, i) => (
                <Stat key={i} value={s.v} label={s.l} accent={i % 2 === 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Categories ──────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.categoriesEyebrow}
            title={t.categoriesTitle}
            maxWidth={580}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.categories.map((cat, i) => (
              <div key={i} className="card p-8">
                <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent-dark flex items-center justify-center mb-5">
                  <Icon name={cat.icon} size={20} />
                </div>
                <h3 className="text-xl mb-3">{cat.name}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-text-secondary">
                  {cat.partners.map((p, j) => (
                    <span key={j}>
                      {p}
                      {j < cat.partners.length - 1 && <span className="ml-2 text-accent">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a Partner CTA ────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="card p-12 text-center max-w-2xl mx-auto">
            <div className="eyebrow mb-5 justify-center inline-flex">{t.ctaEyebrow}</div>
            <h2 className="mb-4">{t.ctaTitle}</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">{t.ctaText}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon="calendar"
                onClick={() => openModal("booking")}
              >
                {t.ctaBook}
              </Button>
              <a href={t.ctaEmail} className="btn btn-outline btn-lg no-underline">
                <Icon name="mail" size={16} />
                {t.ctaPropose}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
