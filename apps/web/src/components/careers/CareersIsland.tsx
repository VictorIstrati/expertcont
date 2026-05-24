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

interface ProcessStep {
  n: string;
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

  cultureEyebrow: string;
  cultureTitle: string;
  cultureParagraphs: string[];

  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];

  openingsEyebrow: string;
  openingsTitle: string;
  openingsSubtitle: string;
  jobs: JobCard[];
  applyBtn: string;
  /** Shown when jobs is empty — invites spontaneous CV submission via the
   * bottom CTA section that follows. */
  noOpeningsTitle: string;

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
    whyTitle: "Locul unde crești profesional",
    whySubtitle:
      "Îți oferim mai mult decât un job — un mediu unde te poți dezvolta alături de o echipă multidisciplinară și să contribui la ceva real.",
    whyCards: [
      {
        icon: "users",
        title: "Echipă multidisciplinară",
        desc: "Lucrezi alături de contabili, juriști, specialiști HR și IT — schimbi perspective și înveți pe parcursul muncii, nu doar din cursuri.",
      },
      {
        icon: "trending",
        title: "Mentorat și creștere",
        desc: "Oameni seniori cu 10+ ani experiență îți deschid drumul — proiecte reale, feedback regulat, claritate asupra următorului pas în carieră.",
      },
      {
        icon: "clock",
        title: "Lucru hibrid",
        desc: "Birou în Chișinău + lucru remote când are sens. Acord asupra programului flexibil în funcție de rolul tău.",
      },
    ],

    cultureEyebrow: "CULTURA NOASTRĂ",
    cultureTitle: "Cum este să lucrezi la ExpertCont",
    cultureParagraphs: [
      "Nu suntem o firmă mare unde ești un număr. Suntem o echipă mică în care fiecare voce contează — dacă ai o idee mai bună despre cum facem ceva, o discutăm. Dacă ai nevoie de timp pentru o problemă personală, primești sprijin, nu interogatoriu.",
      "Lucrăm cu clienți reali din diverse industrii — IT, e-commerce, HoReCa, transport, producție. Asta înseamnă că nu vei face același tip de declarație de o mie de ori; te vei lovi de provocări noi în fiecare lună și vei avea oportunitatea să devii expert într-un domeniu pe care îl alegi tu.",
    ],

    processEyebrow: "PROCESUL DE APLICARE",
    processTitle: "Cum decurge aplicarea",
    processSubtitle:
      "Transparent și rapid — îți răspundem în 5 zile lucrătoare după primirea CV-ului.",
    processSteps: [
      {
        n: "1",
        title: "Trimite CV-ul",
        desc: "Pe email la careers@expertcont.md. Adaugă o scurtă descriere a rolului care te interesează.",
      },
      {
        n: "2",
        title: "Screening call",
        desc: "20 de minute cu un membru al echipei pentru a discuta experiența ta și ce cauți.",
      },
      {
        n: "3",
        title: "Interviu tehnic",
        desc: "60 de minute cu echipa în care vei lucra — întrebări concrete pe baza CV-ului și a unei mini-studii de caz.",
      },
      {
        n: "4",
        title: "Ofertă și onboarding",
        desc: "Decizie în 3 zile lucrătoare după interviu. Ofertă cu pachet salarial detaliat și plan de onboarding pentru primele 30 de zile.",
      },
    ],

    openingsEyebrow: "POZIȚII DESCHISE",
    openingsTitle: "Poziții disponibile",
    openingsSubtitle:
      "Suntem mereu în căutare de oameni talentați pentru echipele noastre de contabilitate, juridic, HR și IT.",
    jobs: [],
    applyBtn: "Aplică acum",
    noOpeningsTitle: "În acest moment nu avem poziții deschise",

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
      "Мы предлагаем больше, чем просто работу — среду, где можно развиваться рядом с мультидисциплинарной командой и реально что-то менять.",
    whyCards: [
      {
        icon: "users",
        title: "Мультидисциплинарная команда",
        desc: "Работаете рядом с бухгалтерами, юристами, HR и IT-специалистами — обмениваетесь подходами и учитесь в процессе работы, а не только на курсах.",
      },
      {
        icon: "trending",
        title: "Наставничество и рост",
        desc: "Старшие коллеги с 10+ годами опыта открывают вам путь — реальные проекты, регулярная обратная связь и ясность относительно следующего шага в карьере.",
      },
      {
        icon: "clock",
        title: "Гибридный формат",
        desc: "Офис в Кишинёве + удалённая работа, когда это уместно. Гибкий график согласовываем под вашу роль.",
      },
    ],

    cultureEyebrow: "НАША КУЛЬТУРА",
    cultureTitle: "Каково работать в ExpertCont",
    cultureParagraphs: [
      "Мы не большая фирма, где вы — просто номер. Мы небольшая команда, где голос каждого важен — если у вас есть идея лучше, мы её обсуждаем. Если вам нужно время для личного дела, вы получаете поддержку, а не допрос.",
      "Работаем с реальными клиентами из разных отраслей — IT, e-commerce, HoReCa, транспорт, производство. Это значит, что вы не будете делать одну и ту же декларацию тысячу раз; каждый месяц новые задачи и возможность стать экспертом в выбранной вами области.",
    ],

    processEyebrow: "ПРОЦЕСС ПРИЁМА",
    processTitle: "Как проходит отклик",
    processSubtitle:
      "Прозрачно и быстро — ответим в течение 5 рабочих дней после получения резюме.",
    processSteps: [
      {
        n: "1",
        title: "Отправьте резюме",
        desc: "На careers@expertcont.md. Добавьте короткое описание интересующей вас роли.",
      },
      {
        n: "2",
        title: "Скрининг-звонок",
        desc: "20 минут с членом команды, чтобы обсудить ваш опыт и пожелания.",
      },
      {
        n: "3",
        title: "Технический интервью",
        desc: "60 минут с командой, в которой будете работать — конкретные вопросы по резюме и мини-кейс.",
      },
      {
        n: "4",
        title: "Оффер и онбординг",
        desc: "Решение в течение 3 рабочих дней после интервью. Оффер с детальным пакетом и планом онбординга на первые 30 дней.",
      },
    ],

    openingsEyebrow: "ОТКРЫТЫЕ ПОЗИЦИИ",
    openingsTitle: "Доступные позиции",
    openingsSubtitle:
      "Мы всегда в поиске талантливых людей в команды бухгалтерии, юридического сопровождения, HR и IT.",
    jobs: [],
    applyBtn: "Откликнуться",
    noOpeningsTitle: "На данный момент открытых позиций нет",

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
      "We offer more than a job — an environment where you grow alongside a multidisciplinary team and contribute to something real.",
    whyCards: [
      {
        icon: "users",
        title: "Multidisciplinary team",
        desc: "Work alongside accountants, lawyers, HR and IT specialists — swap perspectives and learn on the job, not just from courses.",
      },
      {
        icon: "trending",
        title: "Mentorship and growth",
        desc: "Senior colleagues with 10+ years of experience open the path — real projects, regular feedback, clarity on your next career step.",
      },
      {
        icon: "clock",
        title: "Hybrid work",
        desc: "Office in Chișinău + remote when it makes sense. Flexible schedule agreed based on your role.",
      },
    ],

    cultureEyebrow: "OUR CULTURE",
    cultureTitle: "What it's like to work at ExpertCont",
    cultureParagraphs: [
      "We're not a big firm where you're just a number. We're a small team where every voice matters — if you have a better idea about how we do something, we discuss it. If you need time for a personal matter, you get support, not interrogation.",
      "We work with real clients from many industries — IT, e-commerce, HoReCa, transport, manufacturing. That means you won't file the same declaration a thousand times; every month brings new challenges and the chance to become an expert in a field you choose.",
    ],

    processEyebrow: "APPLICATION PROCESS",
    processTitle: "How applying works",
    processSubtitle: "Transparent and fast — we reply within 5 business days of receiving your CV.",
    processSteps: [
      {
        n: "1",
        title: "Send your CV",
        desc: "To careers@expertcont.md. Add a short note about the role you're interested in.",
      },
      {
        n: "2",
        title: "Screening call",
        desc: "20 minutes with a team member to discuss your experience and what you're looking for.",
      },
      {
        n: "3",
        title: "Technical interview",
        desc: "60 minutes with the team you'd join — concrete questions based on your CV and a mini case study.",
      },
      {
        n: "4",
        title: "Offer and onboarding",
        desc: "Decision within 3 business days after the interview. Offer with a detailed compensation package and a 30-day onboarding plan.",
      },
    ],

    openingsEyebrow: "OPEN ROLES",
    openingsTitle: "Available positions",
    openingsSubtitle:
      "We're always looking for talented people for our accounting, legal, HR and IT teams.",
    jobs: [],
    applyBtn: "Apply now",
    noOpeningsTitle: "No open positions at the moment",

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

      {/* ── Culture ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.cultureEyebrow}
            title={t.cultureTitle}
            maxWidth={720}
          />
          <img
            src="/careers-team-culture.webp"
            alt={t.cultureTitle}
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
            className="mx-auto mb-10 block h-auto w-full max-w-5xl rounded-lg object-cover aspect-[16/9]"
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            {t.cultureParagraphs.map((p, i) => (
              <p key={i} className="text-base text-text-secondary leading-relaxed mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Process ─────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            subtitle={t.processSubtitle}
            maxWidth={640}
          />
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {t.processSteps.map((step, i) => (
              <div key={i} className="card p-6 flex flex-col gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                  {step.n}
                </div>
                <h4 className="text-base font-semibold mb-0">{step.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-0">{step.desc}</p>
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
            {t.jobs.length === 0 ? (
              <div className="card text-center p-12 flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                  <Icon name="briefcase" size={26} />
                </div>
                <h3 className="text-xl font-bold m-0">{t.noOpeningsTitle}</h3>
              </div>
            ) : (
              t.jobs.map((job, i) => (
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
              ))
            )}
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
