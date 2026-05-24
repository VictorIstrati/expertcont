import { PageHeader, SectionHeader, Icon, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface CareersIslandProps {
  locale: Locale;
  homeHref: string;
}

interface WhyCard {
  icon: string;
  title: string;
  desc: string;
}

interface JobCard {
  title: string;
  level: string;
  location: string;
  desc: string;
  tags: string[];
}

interface LocaleStrings {
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbHome: string;
  breadcrumbCareers: string;

  whyEyebrow: string;
  whyTitle: string;
  whySubtitle: string;
  whyCards: WhyCard[];

  openingsEyebrow: string;
  openingsTitle: string;
  openingsSubtitle: string;
  jobs: JobCard[];
  applyBtn: string;

  ctaEyebrow: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    pageEyebrow: "Cariere",
    pageTitle: "Construiește-ți cariera cu ExpertCont",
    pageSubtitle:
      "Facem parte dintr-o echipă în continuă creștere — contabili, juriști, specialiști HR și IT care lucrează împreună pentru a oferi servicii de top clienților noștri.",
    breadcrumbHome: "Acasă",
    breadcrumbCareers: "Cariere",

    whyEyebrow: "DE CE SĂ NE ALEGI",
    whyTitle: "Locul unde crești professional",
    whySubtitle:
      "Îți oferim mai mult decât un job — îți oferim un mediu în care te poți dezvolta și contribui la ceva semnificativ.",
    whyCards: [
      {
        icon: "users",
        title: "Echipă tânără și pasionată",
        desc: "Lucrăm cu profesioniști din diverse domenii — contabilitate, juridic, IT, HR — într-un mediu colaborativ.",
      },
      {
        icon: "trending",
        title: "Creștere profesională",
        desc: "Programe de mentorat, certificări internaționale (ACCA, CIMA), bugete pentru cursuri și conferințe.",
      },
      {
        icon: "shield",
        title: "Beneficii reale",
        desc: "Salarii competitive, asigurare medicală privată, zile libere generoase, lucru hibrid și birou modern în centrul Chișinăului.",
      },
    ],

    openingsEyebrow: "OPORTUNITĂȚI ACTIVE",
    openingsTitle: "Posturi disponibile",
    openingsSubtitle:
      "Explorează rolurile deschise și găsește oportunitatea potrivită pentru tine.",
    jobs: [
      {
        title: "Contabil Senior",
        level: "Senior",
        location: "Chișinău · Hybrid",
        desc: "Gestionezi situații financiare conform IFRS, coordonezi raportarea lunară și mentorezii colegii junior.",
        tags: ["IFRS", "1C", "Excel avansat", "Raportare financiară"],
      },
      {
        title: "Specialist HR",
        level: "Mid",
        location: "Chișinău",
        desc: "Administrezi dosarele de personal, coordonezi procesele de recrutare și asiguri conformitatea cu legislația muncii.",
        tags: ["Legislația muncii", "Recrutare", "1C: Salarizare", "GDPR"],
      },
      {
        title: "Consultant IT",
        level: "Senior",
        location: "Chișinău · Hybrid",
        desc: "Implementezi și configurezi soluții ERP/CRM pentru clienții noștri, oferind suport tehnic și training.",
        tags: ["1C", "SAP", "ERP", "SQL"],
      },
      {
        title: "Contabil Junior — Fiscalitate",
        level: "Junior",
        location: "Remote-friendly",
        desc: "Asist la pregătirea declarațiilor fiscale, înveți să lucrezi cu sistemele de raportare fiscală din Moldova.",
        tags: ["Fiscalitate", "Excel", "Declarații TVA"],
      },
    ],
    applyBtn: "Aplică acum",

    ctaEyebrow: "Nu vezi rolul potrivit?",
    ctaTitle: "Trimite-ne CV-ul tău",
    ctaDesc:
      "Suntem mereu în căutare de oameni talentați. Dacă nu găsești un post potrivit, trimite-ne CV-ul și te contactăm când apare o oportunitate.",
    ctaBtn: "Trimite CV-ul tău",
  },

  ru: {
    pageEyebrow: "Карьера",
    pageTitle: "Стройте карьеру с ExpertCont",
    pageSubtitle:
      "Мы — растущая команда бухгалтеров, юристов, HR и IT-специалистов, которые работают вместе, чтобы оказывать нашим клиентам услуги высшего уровня.",
    breadcrumbHome: "Главная",
    breadcrumbCareers: "Карьера",

    whyEyebrow: "ПОЧЕМУ МЫ",
    whyTitle: "Место для профессионального роста",
    whySubtitle:
      "Мы предлагаем больше, чем просто работу — среду, в которой вы можете развиваться и вносить значимый вклад.",
    whyCards: [
      {
        icon: "users",
        title: "Молодая и увлечённая команда",
        desc: "Работаем со специалистами из разных областей — бухгалтерии, права, IT, HR — в атмосфере сотрудничества.",
      },
      {
        icon: "trending",
        title: "Профессиональный рост",
        desc: "Программы наставничества, международные сертификации (ACCA, CIMA), бюджеты на курсы и конференции.",
      },
      {
        icon: "shield",
        title: "Реальные льготы",
        desc: "Конкурентная зарплата, частная медицинская страховка, щедрые отпуска, гибридная работа и современный офис в центре Кишинёва.",
      },
    ],

    openingsEyebrow: "ОТКРЫТЫЕ ВАКАНСИИ",
    openingsTitle: "Доступные позиции",
    openingsSubtitle: "Изучите открытые вакансии и найдите подходящую для вас возможность.",
    jobs: [
      {
        title: "Старший бухгалтер",
        level: "Senior",
        location: "Кишинёв · Гибрид",
        desc: "Ведёте финансовую отчётность по МСФО, координируете ежемесячные отчёты и наставляете младших коллег.",
        tags: ["МСФО", "1С", "Excel", "Финансовая отчётность"],
      },
      {
        title: "HR-специалист",
        level: "Mid",
        location: "Кишинёв",
        desc: "Ведёте кадровые дела, координируете процессы подбора персонала и обеспечиваете соответствие трудовому законодательству.",
        tags: ["Трудовое право", "Рекрутинг", "1С: ЗУП", "GDPR"],
      },
      {
        title: "IT-консультант",
        level: "Senior",
        location: "Кишинёв · Гибрид",
        desc: "Внедряете и настраиваете ERP/CRM-решения для клиентов, оказываете техническую поддержку и проводите обучение.",
        tags: ["1С", "SAP", "ERP", "SQL"],
      },
      {
        title: "Младший налоговый бухгалтер",
        level: "Junior",
        location: "Удалённо",
        desc: "Помогаете в подготовке налоговых деклараций и учитесь работать с системами налоговой отчётности Молдовы.",
        tags: ["Налогообложение", "Excel", "НДС"],
      },
    ],
    applyBtn: "Откликнуться",

    ctaEyebrow: "Не нашли подходящую роль?",
    ctaTitle: "Отправьте нам своё резюме",
    ctaDesc:
      "Мы всегда в поиске талантливых людей. Если вы не нашли подходящую вакансию — отправьте резюме, и мы свяжемся с вами при первой возможности.",
    ctaBtn: "Отправить резюме",
  },

  en: {
    pageEyebrow: "Careers",
    pageTitle: "Build your career with ExpertCont",
    pageSubtitle:
      "We're a growing team of accountants, lawyers, HR and IT specialists working together to deliver top-tier services to our clients.",
    breadcrumbHome: "Home",
    breadcrumbCareers: "Careers",

    whyEyebrow: "WHY JOIN US",
    whyTitle: "A place where you grow professionally",
    whySubtitle:
      "We offer more than a job — an environment where you can develop and contribute to something meaningful.",
    whyCards: [
      {
        icon: "users",
        title: "Young and passionate team",
        desc: "We work with professionals from diverse fields — accounting, legal, IT, HR — in a collaborative environment.",
      },
      {
        icon: "trending",
        title: "Professional growth",
        desc: "Mentorship programmes, international certifications (ACCA, CIMA), budgets for courses and conferences.",
      },
      {
        icon: "shield",
        title: "Real benefits",
        desc: "Competitive salaries, private health insurance, generous leave, hybrid work and a modern office in central Chișinău.",
      },
    ],

    openingsEyebrow: "OPEN ROLES",
    openingsTitle: "Available positions",
    openingsSubtitle: "Explore our open roles and find the right opportunity for you.",
    jobs: [
      {
        title: "Senior Accountant",
        level: "Senior",
        location: "Chișinău · Hybrid",
        desc: "Manage financial statements under IFRS, coordinate monthly reporting and mentor junior colleagues.",
        tags: ["IFRS", "1C", "Advanced Excel", "Financial Reporting"],
      },
      {
        title: "HR Specialist",
        level: "Mid",
        location: "Chișinău",
        desc: "Administer personnel records, coordinate recruitment processes and ensure compliance with labour legislation.",
        tags: ["Labour Law", "Recruitment", "1C Payroll", "GDPR"],
      },
      {
        title: "IT Consultant",
        level: "Senior",
        location: "Chișinău · Hybrid",
        desc: "Implement and configure ERP/CRM solutions for our clients, providing technical support and training.",
        tags: ["1C", "SAP", "ERP", "SQL"],
      },
      {
        title: "Junior Tax Accountant",
        level: "Junior",
        location: "Remote-friendly",
        desc: "Assist with preparing tax returns and learn to work with Moldova's tax reporting systems.",
        tags: ["Taxation", "Excel", "VAT Returns"],
      },
    ],
    applyBtn: "Apply now",

    ctaEyebrow: "Don't see the right role?",
    ctaTitle: "Send us your CV",
    ctaDesc:
      "We're always looking for talented people. If you don't find a matching opening, send us your CV and we'll reach out when an opportunity arises.",
    ctaBtn: "Send your CV",
  },
};

const levelColors: Record<string, string> = {
  Senior: "bg-primary text-white",
  Mid: "bg-accent-50 text-accent-dark",
  Junior: "bg-surface-2 text-text-secondary",
};

export function CareersIsland({ locale, homeHref }: CareersIslandProps) {
  const t = strings[locale];

  return (
    <main>
      {/* ── Page Header ──────────────────────────────────────────── */}
      <PageHeader
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        subtitle={t.pageSubtitle}
        breadcrumbs={[{ label: t.breadcrumbHome, href: homeHref }, { label: t.breadcrumbCareers }]}
      />

      {/* ── Why work with us ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.whyEyebrow}
            title={t.whyTitle}
            subtitle={t.whySubtitle}
            maxWidth={640}
          />
          <div className="careers-why-grid grid gap-6 grid-cols-1 md:grid-cols-3">
            {t.whyCards.map((card, i) => (
              <div key={i} className="card flex flex-col items-start gap-4 p-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-50 text-accent-dark shrink-0">
                  <Icon name={card.icon as Parameters<typeof Icon>[0]["name"]} size={20} />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-2">{card.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Openings ─────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.openingsEyebrow}
            title={t.openingsTitle}
            subtitle={t.openingsSubtitle}
            maxWidth={600}
          />
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {t.jobs.map((job, i) => (
              <div key={i} className="card flex flex-col gap-4">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-base font-semibold flex-1 min-w-0">{job.title}</h4>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[job.level] ?? levelColors["Mid"]}`}
                  >
                    {job.level}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                    <Icon name="map-pin" size={12} />
                    {job.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">{job.desc}</p>

                {/* Tags + apply button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, j) => (
                      <span key={j} className="pill pill-soft text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    href={`mailto:careers@expertcont.md?subject=${encodeURIComponent(job.title)}`}
                    iconRight="arrow-right"
                  >
                    {t.applyBtn}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="card text-center max-w-2xl mx-auto p-12 flex flex-col items-center gap-5">
            <div className="eyebrow">{t.ctaEyebrow}</div>
            <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
            <p className="text-text-secondary leading-relaxed max-w-md">{t.ctaDesc}</p>
            <Button variant="outline" size="lg" href="mailto:careers@expertcont.md" icon="mail">
              {t.ctaBtn}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
