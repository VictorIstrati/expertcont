import { PageHeader, SectionHeader, Icon, Button } from "@expertcont/ui";
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
  /** Examples shown only when real partnerships exist; leave empty to render without names. */
  partners: string[];
}

interface Benefit {
  icon: IconName;
  title: string;
  description: string;
}

interface ProcessStep {
  n: string;
  title: string;
  description: string;
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

  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesIntro: string;
  categories: Category[];

  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: Benefit[];

  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];

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
    introTitle: "Mai mult decât furnizori — aliați pe termen lung",
    introText:
      "Un serviciu integrat se construiește cu oameni și companii care împărtășesc aceleași valori — integritate, competență și orientare spre client. Construim parteneriate selective, bazate pe beneficii reciproce și proiecte concrete pentru clienții noștri comuni.",

    categoriesEyebrow: "Tipuri de parteneriate",
    categoriesTitle: "Cum colaborăm",
    categoriesIntro:
      "ExpertCont colaborează cu trei tipuri de parteneri, fiecare contribuind diferit la serviciul integrat oferit clienților.",
    categories: [
      {
        icon: "code",
        name: "Parteneri tehnologici",
        description:
          "Furnizorii de software și instrumente IT pe care le folosim sau pe care le recomandăm clienților — de la 1C (software contabil) la platforme de facturare electronică și soluții cloud.",
        partners: [],
      },
      {
        icon: "trending",
        name: "Parteneri de referințe",
        description:
          "Consultanți, agenții de business development, freelanceri și firme complementare care își recomandă reciproc clienții pentru servicii pe care nu le acoperă intern.",
        partners: [],
      },
      {
        icon: "scale",
        name: "Alianțe profesionale",
        description:
          "Cabinete de avocatură specializate, firme de audit terț și consultanți fiscali cu care colaborăm pe proiecte specifice — audit statutar, litigii complexe, due diligence M&A.",
        partners: [],
      },
    ],

    benefitsEyebrow: "Beneficii pentru parteneri",
    benefitsTitle: "Ce primești ca partener ExpertCont",
    benefits: [
      {
        icon: "users",
        title: "Recomandări reciproce",
        description:
          "Trimitem clienții noștri către tine pentru servicii pe care nu le acoperim; primim recomandări de la tine pentru ce facem bine.",
      },
      {
        icon: "briefcase",
        title: "Acces la proiecte comune",
        description:
          "Colaborăm pe proiecte concrete unde clientul are nevoie de mai multe specialități — fără să devenim concurenți.",
      },
      {
        icon: "shield",
        title: "Co-branding pe materiale",
        description:
          "Pentru parteneri tehnologici, includem logo-ul tău în materialele clientului unde soluția ta este utilizată.",
      },
      {
        icon: "calendar",
        title: "Întâlniri trimestriale",
        description:
          "Sincronizare regulată privind pipeline-ul comun, oportunități noi și feedback de la clienții deserviți împreună.",
      },
    ],

    processEyebrow: "Cum devii partener",
    processTitle: "Procesul de parteneriat",
    processSubtitle:
      "Selectiv și transparent — alegem parteneri cu care putem livra real, nu doar pune logo-uri pe site.",
    processSteps: [
      {
        n: "1",
        title: "Discuție inițială",
        description:
          "30 de minute pentru a înțelege ce faci, cum lucrezi cu clienții și unde s-ar potrivi colaborarea cu ExpertCont.",
      },
      {
        n: "2",
        title: "Aliniere pe valori",
        description:
          "Verificăm că împărtășim aceleași standarde — confidențialitate, calitate, comunicare directă cu clientul.",
      },
      {
        n: "3",
        title: "Acord scris",
        description:
          "Definim concret tipul parteneriatului, termenii de recomandare și frecvența ședințelor de sincronizare.",
      },
      {
        n: "4",
        title: "Primele proiecte",
        description:
          "Începem cu 1-2 proiecte pilot pentru a vedea cum funcționează colaborarea în practică, apoi scalăm.",
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
    introTitle: "Больше чем поставщики — союзники на долгий срок",
    introText:
      "Интегрированный сервис строится с людьми и компаниями, которые разделяют те же ценности — честность, компетентность и ориентацию на клиента. Мы строим селективные партнёрства, основанные на взаимной выгоде и конкретных проектах для общих клиентов.",

    categoriesEyebrow: "Типы партнёрств",
    categoriesTitle: "Как мы сотрудничаем",
    categoriesIntro:
      "ExpertCont сотрудничает с тремя типами партнёров, каждый из которых вносит свой вклад в интегрированный сервис для клиентов.",
    categories: [
      {
        icon: "code",
        name: "Технологические партнёры",
        description:
          "Поставщики ПО и IT-инструментов, которые мы используем или рекомендуем клиентам — от 1С (бухгалтерское ПО) до платформ электронного выставления счетов и облачных решений.",
        partners: [],
      },
      {
        icon: "trending",
        name: "Реферальные партнёры",
        description:
          "Консультанты, агентства бизнес-развития, фрилансеры и взаимодополняющие фирмы, которые направляют клиентов друг другу для услуг, которые они не покрывают внутри.",
        partners: [],
      },
      {
        icon: "scale",
        name: "Профессиональные альянсы",
        description:
          "Специализированные адвокатские бюро, сторонние аудиторские фирмы и налоговые консультанты, с которыми мы работаем по конкретным проектам — статутный аудит, сложные споры, due diligence M&A.",
        partners: [],
      },
    ],

    benefitsEyebrow: "Выгоды для партнёров",
    benefitsTitle: "Что вы получаете как партнёр ExpertCont",
    benefits: [
      {
        icon: "users",
        title: "Взаимные рекомендации",
        description:
          "Направляем своих клиентов к вам по услугам, которых не покрываем; получаем рекомендации от вас по тому, что делаем хорошо.",
      },
      {
        icon: "briefcase",
        title: "Доступ к совместным проектам",
        description:
          "Работаем на конкретных проектах, где клиенту нужно несколько специальностей — без превращения в конкурентов.",
      },
      {
        icon: "shield",
        title: "Co-branding на материалах",
        description:
          "Для технологических партнёров включаем ваш логотип в клиентские материалы, где используется ваше решение.",
      },
      {
        icon: "calendar",
        title: "Квартальные встречи",
        description:
          "Регулярная синхронизация по совместному pipeline-у, новым возможностям и обратной связи от обслуживаемых вместе клиентов.",
      },
    ],

    processEyebrow: "Как стать партнёром",
    processTitle: "Процесс партнёрства",
    processSubtitle:
      "Селективно и прозрачно — выбираем партнёров, с которыми можем реально работать, а не просто разместить лого на сайте.",
    processSteps: [
      {
        n: "1",
        title: "Первая встреча",
        description:
          "30 минут, чтобы понять, чем вы занимаетесь, как работаете с клиентами и где может подойти сотрудничество с ExpertCont.",
      },
      {
        n: "2",
        title: "Согласование ценностей",
        description:
          "Проверяем, что у нас одинаковые стандарты — конфиденциальность, качество, прямая коммуникация с клиентом.",
      },
      {
        n: "3",
        title: "Письменное соглашение",
        description:
          "Конкретно определяем тип партнёрства, условия рекомендаций и частоту синхронизационных встреч.",
      },
      {
        n: "4",
        title: "Первые проекты",
        description:
          "Начинаем с 1-2 пилотных проектов, чтобы увидеть, как работает сотрудничество на практике, затем масштабируем.",
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
    introTitle: "More than vendors — long-term allies",
    introText:
      "An integrated service is built with people and companies that share the same values — integrity, expertise, and client-first mindset. We build selective partnerships based on mutual benefit and concrete projects for our shared clients.",

    categoriesEyebrow: "Partnership types",
    categoriesTitle: "How we collaborate",
    categoriesIntro:
      "ExpertCont works with three types of partners, each contributing differently to the integrated service we deliver to clients.",
    categories: [
      {
        icon: "code",
        name: "Technology partners",
        description:
          "Software vendors and IT tools we use or recommend to clients — from 1C (accounting software) to e-invoicing platforms and cloud solutions.",
        partners: [],
      },
      {
        icon: "trending",
        name: "Referral partners",
        description:
          "Consultants, business development agencies, freelancers and complementary firms who refer clients to each other for services they don't cover in-house.",
        partners: [],
      },
      {
        icon: "scale",
        name: "Professional alliances",
        description:
          "Specialised law firms, third-party audit practices and tax consultants we collaborate with on specific engagements — statutory audit, complex litigation, M&A due diligence.",
        partners: [],
      },
    ],

    benefitsEyebrow: "Partner benefits",
    benefitsTitle: "What you get as an ExpertCont partner",
    benefits: [
      {
        icon: "users",
        title: "Mutual referrals",
        description:
          "We send our clients to you for services we don't cover; we receive referrals from you for what we do well.",
      },
      {
        icon: "briefcase",
        title: "Access to joint projects",
        description:
          "We collaborate on concrete projects where the client needs multiple specialties — without becoming competitors.",
      },
      {
        icon: "shield",
        title: "Co-branding on materials",
        description:
          "For technology partners, we include your logo in client materials where your solution is being used.",
      },
      {
        icon: "calendar",
        title: "Quarterly check-ins",
        description:
          "Regular sync on our shared pipeline, new opportunities and feedback from clients we serve together.",
      },
    ],

    processEyebrow: "How to become a partner",
    processTitle: "The partnership process",
    processSubtitle:
      "Selective and transparent — we choose partners we can actually deliver with, not just put logos on a website.",
    processSteps: [
      {
        n: "1",
        title: "Initial conversation",
        description:
          "30 minutes to understand what you do, how you work with clients, and where collaboration with ExpertCont could fit.",
      },
      {
        n: "2",
        title: "Values alignment",
        description:
          "We check that we share the same standards — confidentiality, quality, direct communication with the client.",
      },
      {
        n: "3",
        title: "Written agreement",
        description:
          "We define the partnership type, referral terms, and the cadence of sync meetings.",
      },
      {
        n: "4",
        title: "First projects",
        description:
          "We start with 1-2 pilot projects to see how the collaboration works in practice, then scale.",
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

      {/* ── Intro ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow mb-4 inline-flex">{t.introEyebrow}</div>
            <h2 className="mb-5">{t.introTitle}</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-0">{t.introText}</p>
          </div>
          <img
            src="/partners-handshake.webp"
            alt={t.introTitle}
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full max-w-5xl rounded-lg object-cover aspect-[16/9]"
          />
        </div>
      </section>

      {/* ── Partnership Types ───────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.categoriesEyebrow}
            title={t.categoriesTitle}
            subtitle={t.categoriesIntro}
            maxWidth={720}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.categories.map((cat, i) => (
              <div key={i} className="card p-8">
                <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent-dark flex items-center justify-center mb-5">
                  <Icon name={cat.icon} size={20} />
                </div>
                <h3 className="text-xl mb-3">{cat.name}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-0">
                  {cat.description}
                </p>
                {cat.partners.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-text-secondary">
                    {cat.partners.map((p, j) => (
                      <span key={j}>
                        {p}
                        {j < cat.partners.length - 1 && <span className="ml-2 text-accent">·</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Benefits ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.benefitsEyebrow}
            title={t.benefitsTitle}
            maxWidth={620}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.benefits.map((b, i) => (
              <div key={i} className="card p-6 flex gap-4 items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary">
                  <Icon name={b.icon} size={22} />
                </div>
                <div>
                  <h4 className="mb-2 text-base font-semibold">{b.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-0">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Become a Partner ─────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            subtitle={t.processSubtitle}
            maxWidth={680}
          />
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {t.processSteps.map((step, i) => (
              <div key={i} className="card p-6 flex flex-col gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                  {step.n}
                </div>
                <h4 className="text-base font-semibold mb-0">{step.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-0">
                  {step.description}
                </p>
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
