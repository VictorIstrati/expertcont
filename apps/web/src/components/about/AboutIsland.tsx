import { ImagePlaceholder, PageHeader, SectionHeader, Stat, Icon, Button } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import { site, phoneTel } from "../../site";

interface AboutIslandProps {
  locale: Locale;
  bookHref: string;
}

interface LocaleStrings {
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbHome: string;
  breadcrumbAbout: string;

  missionEyebrow: string;
  missionH2: string;
  missionP1: string;
  missionP2: string;
  stats: { v: string; l: string }[];

  teamImageLabel: string;

  valuesEyebrow: string;
  valuesTitle: string;
  values: { icon: string; t: string; d: string }[];

  teamEyebrow: string;
  teamTitle: string;
  team: { name: string; role: string }[];

  ctaEyebrow: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaBook: string;
  ctaCallPrefix: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    pageEyebrow: "Despre noi",
    pageTitle: "O echipă care înțelege business-ul tău",
    pageSubtitle:
      "ExpertCont oferă servicii integrate de contabilitate, juridic, HR și consultanță pentru antreprenori și companii din Moldova.",
    breadcrumbHome: "Acasă",
    breadcrumbAbout: "Despre noi",

    missionEyebrow: "Misiunea noastră",
    missionH2: "Transformăm contabilitatea într-un avantaj strategic",
    missionP1:
      "Am pornit cu o convingere: contabilitatea nu trebuie să fie o povară administrativă, ci o sursă de claritate pentru deciziile de business.",
    missionP2:
      "Astăzi, echipa noastră de profesioniști — contabili autorizați, juriști, consultanți HR și IT — oferă servicii integrate pentru antreprenorii și companiile care vor un singur partener pentru toate aspectele administrative.",
    stats: [
      { v: "15+", l: "Ani de activitate" },
      { v: "5", l: "Domenii integrate" },
      { v: "100%", l: "Conform GDPR" },
      { v: "<4h", l: "Timp de răspuns" },
    ],
    teamImageLabel: "Echipa ExpertCont · biroul din Chișinău",

    valuesEyebrow: "Valori",
    valuesTitle: "Trei principii nenegociabile",
    values: [
      {
        icon: "shield",
        t: "Integritate",
        d: "Recomandăm doar ce e bine pentru afacerea ta — chiar dacă înseamnă să refuzăm un proiect.",
      },
      {
        icon: "zap",
        t: "Eficiență",
        d: "Procese clare, tehnologie modernă și răspuns rapid — pentru ca tu să te concentrezi pe ce contează.",
      },
      {
        icon: "trending",
        t: "Rezultate",
        d: "Măsurabile, transparente, anuale — îți arătăm ce a generat colaborarea noastră.",
      },
    ],

    teamEyebrow: "Echipa",
    teamTitle: "Oameni cu care vei lucra",
    team: [
      { name: "Elena Bostan", role: "Fondator & Managing Partner" },
      { name: "Mihai Cazacu", role: "Head of Accounting" },
      { name: "Cristina Vrabie", role: "Senior Legal Counsel" },
      { name: "Radu Crăciun", role: "HR & IT Consultant" },
    ],

    ctaEyebrow: "HAI SĂ ÎNCEPEM",
    ctaHeading: "Discută cu un consultant gratuit",
    ctaSubtitle:
      "30 de minute · ofertă în 48 ore · fără obligații. Primul pas spre o contabilitate fără griji.",
    ctaBook: "Programează consultație gratuită (30 min)",
    ctaCallPrefix: "Sună-ne acum · ",
  },

  ru: {
    pageEyebrow: "О нас",
    pageTitle: "Команда, которая понимает ваш бизнес",
    pageSubtitle:
      "ExpertCont предоставляет интегрированные услуги бухгалтерии, юридического сопровождения, HR и консалтинга для предпринимателей и компаний в Молдове.",
    breadcrumbHome: "Главная",
    breadcrumbAbout: "О нас",

    missionEyebrow: "Наша миссия",
    missionH2: "Превращаем бухгалтерию в стратегическое преимущество",
    missionP1:
      "Мы начали с убеждения: бухгалтерия не должна быть административной нагрузкой — она должна быть источником ясности для бизнес-решений.",
    missionP2:
      "Сегодня наша команда профессионалов — сертифицированные бухгалтеры, юристы, HR и IT-консультанты — предоставляет интегрированные услуги для предпринимателей, которым нужен один партнёр для всех административных вопросов.",
    stats: [
      { v: "15+", l: "Лет опыта" },
      { v: "5", l: "Направлений" },
      { v: "100%", l: "Соответствие GDPR" },
      { v: "<4ч", l: "Время ответа" },
    ],
    teamImageLabel: "Команда ExpertCont · офис в Кишинёве",

    valuesEyebrow: "Ценности",
    valuesTitle: "Три непреложных принципа",
    values: [
      {
        icon: "shield",
        t: "Честность",
        d: "Мы рекомендуем только то, что полезно вашему бизнесу — даже если это означает отказ от проекта.",
      },
      {
        icon: "zap",
        t: "Эффективность",
        d: "Чёткие процессы, современные технологии и быстрые ответы — чтобы вы могли сосредоточиться на главном.",
      },
      {
        icon: "trending",
        t: "Результаты",
        d: "Измеримые, прозрачные, ежегодные — мы показываем, что принесло наше сотрудничество.",
      },
    ],

    teamEyebrow: "Команда",
    teamTitle: "Люди, с которыми вы будете работать",
    team: [
      { name: "Elena Bostan", role: "Основатель & Управляющий партнёр" },
      { name: "Mihai Cazacu", role: "Руководитель отдела бухгалтерии" },
      { name: "Cristina Vrabie", role: "Старший юридический советник" },
      { name: "Radu Crăciun", role: "HR & IT-консультант" },
    ],

    ctaEyebrow: "НАЧНЁМ",
    ctaHeading: "Бесплатная консультация с экспертом",
    ctaSubtitle:
      "30 минут · предложение за 48 часов · без обязательств. Первый шаг к безопасной бухгалтерии.",
    ctaBook: "Записаться на консультацию (30 мин)",
    ctaCallPrefix: "Позвонить · ",
  },

  en: {
    pageEyebrow: "About us",
    pageTitle: "A team that understands your business",
    pageSubtitle:
      "ExpertCont provides integrated accounting, legal, HR and consulting services for entrepreneurs and companies in Moldova.",
    breadcrumbHome: "Home",
    breadcrumbAbout: "About",

    missionEyebrow: "Our mission",
    missionH2: "Turning accounting into a strategic advantage",
    missionP1:
      "We started with a belief: accounting doesn't have to be an administrative burden — it can be a source of clarity for business decisions.",
    missionP2:
      "Today, our team of professionals — certified accountants, lawyers, HR and IT consultants — provides integrated services for entrepreneurs and companies that want a single partner for all administrative aspects.",
    stats: [
      { v: "15+", l: "Years of experience" },
      { v: "5", l: "Integrated domains" },
      { v: "100%", l: "GDPR compliant" },
      { v: "<4h", l: "Response time" },
    ],
    teamImageLabel: "ExpertCont team · Chișinău office",

    valuesEyebrow: "Values",
    valuesTitle: "Three non-negotiable principles",
    values: [
      {
        icon: "shield",
        t: "Integrity",
        d: "We only recommend what's good for your business — even if it means turning down a project.",
      },
      {
        icon: "zap",
        t: "Efficiency",
        d: "Clear processes, modern technology and quick responses — so you can focus on what matters.",
      },
      {
        icon: "trending",
        t: "Results",
        d: "Measurable, transparent, annual — we show you exactly what our partnership has generated.",
      },
    ],

    teamEyebrow: "Team",
    teamTitle: "People you'll work with",
    team: [
      { name: "Elena Bostan", role: "Founder & Managing Partner" },
      { name: "Mihai Cazacu", role: "Head of Accounting" },
      { name: "Cristina Vrabie", role: "Senior Legal Counsel" },
      { name: "Radu Crăciun", role: "HR & IT Consultant" },
    ],

    ctaEyebrow: "LET'S GET STARTED",
    ctaHeading: "Talk to a consultant for free",
    ctaSubtitle:
      "30 minutes · offer in 48 hours · no obligations. The first step to worry-free accounting.",
    ctaBook: "Book a free consultation (30 min)",
    ctaCallPrefix: "Call us · ",
  },
};

export default function AboutIsland({ locale, bookHref: _bookHref }: AboutIslandProps) {
  const t = strings[locale];
  const homeHref = locale === "ro" ? "/" : `/${locale}`;

  return (
    <main>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        subtitle={t.pageSubtitle}
        breadcrumbs={[{ label: t.breadcrumbHome, href: homeHref }, { label: t.breadcrumbAbout }]}
      />

      {/* ── Mission / Stats ─────────────────────────────────────── */}
      <section className="section">
        <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="about-text">
            <div className="eyebrow mb-4">{t.missionEyebrow}</div>
            <h2 className="mb-5">{t.missionH2}</h2>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">{t.missionP1}</p>
            <p className="text-lg leading-relaxed text-text-secondary">{t.missionP2}</p>

            <div className="mt-10 grid grid-cols-2 gap-5">
              {t.stats.map((s, i) => (
                <Stat key={s.l} value={s.v} label={s.l} accent={i % 2 === 1} />
              ))}
            </div>
          </div>

          <ImagePlaceholder ratio="4/5" label={t.teamImageLabel} />
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.valuesEyebrow}
            title={t.valuesTitle}
            maxWidth={620}
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {t.values.map((v) => (
              <div key={v.t} className="card p-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-dark">
                  <Icon name={v.icon as Parameters<typeof Icon>[0]["name"]} size={28} />
                </div>
                <h3 className="mb-3 text-2xl">{v.t}</h3>
                <p className="text-base text-text-secondary">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            maxWidth={580}
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {t.team.map((m) => (
              <div key={m.name}>
                <div className="mb-4 flex aspect-4/5 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary dark:to-primary-deep text-5xl font-bold text-white">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-base font-bold">{m.name}</div>
                <div className="mt-1 text-sm text-text-secondary">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-[400px] w-[400px] rounded-full border border-white/5" />
        <div className="container relative mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-5 inline-flex justify-center">{t.ctaEyebrow}</div>
          <h2 className="mb-5 text-white">{t.ctaHeading}</h2>
          <p className="mb-8 text-lg text-white/80">{t.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
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
              {t.ctaCallPrefix}
              {site.business.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
