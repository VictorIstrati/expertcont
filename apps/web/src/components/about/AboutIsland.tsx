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

  guaranteesEyebrow: string;
  guaranteesTitle: string;
  guaranteesIntro: string;
  guarantees: { icon: string; t: string; d: string }[];

  growEyebrow: string;
  growTitle: string;
  growParagraphs: string[];

  industriesEyebrow: string;
  industriesTitle: string;
  industriesIntro: string;
  industries: string[];

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
      { v: "15+", l: "Ani experiență cumulată" },
      { v: "5", l: "Domenii integrate" },
      { v: "1C", l: "Software contabil exclusiv" },
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

    guaranteesEyebrow: "Ce garantăm",
    guaranteesTitle: "Preluăm responsabilitatea pentru zona ta administrativă",
    guaranteesIntro:
      "Asigurăm preluarea responsabilităților entităților economice pe toate cele 5 direcții integrate — contabilitate, juridic, HR, audit și IT — astfel încât tu să te concentrezi pe activitatea de bază a companiei.",
    guarantees: [
      {
        icon: "file-text",
        t: "Evidență contabilă completă",
        d: "Înregistrare documente primare, raportare TVA, salarizare CNAS/CNAM, bilanț anual — totul pe 1C, la termen, conform Codului Fiscal al Republicii Moldova.",
      },
      {
        icon: "scale",
        t: "Asistență juridică",
        d: "Drept comercial, dreptul muncii, drept civil, administrativ și antreprenorial — contracte, opinii juridice, asistență la controale și reprezentare.",
      },
      {
        icon: "users",
        t: "Administrare HR",
        d: "Contracte de muncă, payroll, evidență personal și conformitate cu Codul Muncii — facturat per angajat acoperit, fără minim contractual.",
      },
      {
        icon: "trending",
        t: "Consultanță financiară",
        d: "Planificare fiscală, optimizare costuri, due diligence, plan financiar — strategii fiabile pentru dezvoltarea armonioasă a afacerii tale.",
      },
    ],

    growEyebrow: "Cum creștem împreună",
    growTitle: "Parteneri pe termen lung, nu doar furnizori",
    growParagraphs: [
      "Dezvoltăm și transformăm afacerea ta de la primii pași până la atingerea obiectivelor strategice. Asigurăm consultanță profesională conform ultimelor modificări legislative — actualizările legislative frecvente din Moldova nu te mai prind nepregătit.",
      "Lucrăm hibrid din biroul nostru din Chișinău: comunicăm pe email, telefon, WhatsApp, Viber și Telegram — alegem canalul preferat la onboarding. Operăm în română, rusă și engleză, în funcție de nevoile echipei tale.",
    ],

    industriesEyebrow: "Cui ne adresăm",
    industriesTitle: "Companii din toate industriile din Moldova",
    industriesIntro:
      "Serviciile noastre integrate funcționează pentru SRL, SA, ÎI, ICS și ONG. Deservim atât start-up-uri la prima înregistrare fiscală, cât și companii mature cu raportare consolidată. Avem experiență concretă în:",
    industries: [
      "IT & SaaS (inclusiv rezidenți IT Park)",
      "E-commerce și marketplace",
      "HoReCa (restaurante, cafenele, hoteluri)",
      "Comerț (en-gros, en-detail)",
      "Producție și manufacturing",
      "Construcții și montaj",
      "Transport și logistică",
      "Servicii profesionale (consultanță, marketing)",
      "Imobiliare",
      "ONG-uri și asociații non-profit",
    ],

    teamEyebrow: "Echipa",
    teamTitle: "Oameni cu care vei lucra",
    team: [
      { name: "Oleg Balan", role: "Fondator & Managing Partner" },
      { name: "Constanța Tulgara", role: "Head of Accounting" },
      { name: "Vasile Secrieru", role: "Senior Legal Counsel" },
      { name: "Iuliana Oboroceanu", role: "Human Resources Consultant" },
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
      { v: "15+", l: "Лет совокупного опыта" },
      { v: "5", l: "Интегрированных направлений" },
      { v: "1С", l: "Эксклюзивное бух. ПО" },
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

    guaranteesEyebrow: "Что мы гарантируем",
    guaranteesTitle: "Берём на себя ответственность за вашу административную часть",
    guaranteesIntro:
      "Принимаем на себя обязанности экономических единиц по 5 интегрированным направлениям — бухгалтерия, юридическое сопровождение, HR, аудит и IT — чтобы вы могли сосредоточиться на основной деятельности компании.",
    guarantees: [
      {
        icon: "file-text",
        t: "Полный бухгалтерский учёт",
        d: "Регистрация первичных документов, отчётность по НДС, расчёт зарплат CNAS/CNAM, годовой баланс — всё на 1С, в срок, согласно Налоговому кодексу Республики Молдова.",
      },
      {
        icon: "scale",
        t: "Юридическое сопровождение",
        d: "Коммерческое право, трудовое право, гражданское, административное и предпринимательское — договоры, юридические заключения, сопровождение проверок и представительство.",
      },
      {
        icon: "users",
        t: "Кадровое администрирование",
        d: "Трудовые договоры, расчёт зарплат, кадровый учёт и соответствие Трудовому кодексу — оплата за каждого сотрудника под управлением, без минимального контракта.",
      },
      {
        icon: "trending",
        t: "Финансовый консалтинг",
        d: "Налоговое планирование, оптимизация расходов, due diligence, финансовый план — надёжные стратегии для гармоничного развития вашего бизнеса.",
      },
    ],

    growEyebrow: "Как мы растём вместе",
    growTitle: "Партнёры на долгий срок, а не просто поставщики",
    growParagraphs: [
      "Развиваем и трансформируем ваш бизнес с первых шагов до достижения стратегических целей. Обеспечиваем профессиональный консалтинг в соответствии с последними изменениями законодательства — частые обновления в Молдове больше не застанут вас врасплох.",
      "Работаем в гибридном формате из нашего офиса в Кишинёве: общаемся по email, телефону, WhatsApp, Viber и Telegram — выбираем канал на онбординге. Работаем на румынском, русском и английском в зависимости от потребностей вашей команды.",
    ],

    industriesEyebrow: "К кому мы обращаемся",
    industriesTitle: "Компании из всех отраслей Молдовы",
    industriesIntro:
      "Наши интегрированные услуги подходят для ООО, АО, ИП, ICS и НКО. Обслуживаем как стартапы на этапе первой налоговой регистрации, так и зрелые компании с консолидированной отчётностью. Имеем конкретный опыт в:",
    industries: [
      "IT и SaaS (включая резидентов IT Park)",
      "E-commerce и маркетплейсы",
      "HoReCa (рестораны, кафе, отели)",
      "Торговля (оптовая, розничная)",
      "Производство",
      "Строительство и монтаж",
      "Транспорт и логистика",
      "Профессиональные услуги (консалтинг, маркетинг)",
      "Недвижимость",
      "НКО и некоммерческие ассоциации",
    ],

    teamEyebrow: "Команда",
    teamTitle: "Люди, с которыми вы будете работать",
    team: [
      { name: "Oleg Balan", role: "Основатель & Управляющий партнёр" },
      { name: "Constanța Tulgara", role: "Руководитель отдела бухгалтерии" },
      { name: "Vasile Secrieru", role: "Старший юридический советник" },
      { name: "Iuliana Oboroceanu", role: "Консультант по управлению персоналом" },
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
      { v: "15+", l: "Years of combined experience" },
      { v: "5", l: "Integrated domains" },
      { v: "1C", l: "Exclusive accounting software" },
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

    guaranteesEyebrow: "What we guarantee",
    guaranteesTitle: "We take responsibility for your administrative back-office",
    guaranteesIntro:
      "We take on the responsibilities of economic entities across 5 integrated domains — accounting, legal, HR, audit, and IT — so you can focus on your company's core activity.",
    guarantees: [
      {
        icon: "file-text",
        t: "Complete bookkeeping",
        d: "Primary document recording, VAT reporting, payroll with CNAS/CNAM, annual balance sheet — all on 1C, on time, per the Tax Code of the Republic of Moldova.",
      },
      {
        icon: "scale",
        t: "Legal assistance",
        d: "Commercial law, employment law, civil, administrative and entrepreneurial — contracts, legal opinions, inspection support and court representation.",
      },
      {
        icon: "users",
        t: "HR administration",
        d: "Employment contracts, payroll, personnel records and Labour Code compliance — billed per covered employee, no minimum contract.",
      },
      {
        icon: "trending",
        t: "Financial consulting",
        d: "Tax planning, cost optimisation, due diligence, financial plans — reliable strategies for the sustainable growth of your business.",
      },
    ],

    growEyebrow: "How we grow together",
    growTitle: "Long-term partners, not just vendors",
    growParagraphs: [
      "We develop and transform your business from the first steps to your strategic goals. We provide professional consulting aligned with the latest legislative changes — Moldova's frequent legal updates won't catch you off guard anymore.",
      "We work hybrid from our Chișinău office: we communicate by email, phone, WhatsApp, Viber and Telegram — your channel of choice at onboarding. We operate in Romanian, Russian and English depending on your team's needs.",
    ],

    industriesEyebrow: "Who we serve",
    industriesTitle: "Companies across every industry in Moldova",
    industriesIntro:
      "Our integrated services work for LLCs, JSCs, sole traders, ICS and NGOs. We serve both start-ups at first tax registration and mature companies with consolidated reporting. We have concrete experience in:",
    industries: [
      "IT and SaaS (including IT Park residents)",
      "E-commerce and marketplaces",
      "HoReCa (restaurants, cafes, hotels)",
      "Trade (wholesale, retail)",
      "Manufacturing and production",
      "Construction and assembly",
      "Transport and logistics",
      "Professional services (consulting, marketing)",
      "Real estate",
      "NGOs and non-profit associations",
    ],

    teamEyebrow: "Team",
    teamTitle: "People you'll work with",
    team: [
      { name: "Oleg Balan", role: "Founder & Managing Partner" },
      { name: "Constanța Tulgara", role: "Head of Accounting" },
      { name: "Vasile Secrieru", role: "Senior Legal Counsel" },
      { name: "Iuliana Oboroceanu", role: "Human Resources Consultant" },
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

      {/* ── Guarantees ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.guaranteesEyebrow}
            title={t.guaranteesTitle}
            subtitle={t.guaranteesIntro}
            maxWidth={780}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {t.guarantees.map((g) => (
              <div key={g.t} className="card p-6 flex gap-4 items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary">
                  <Icon name={g.icon as Parameters<typeof Icon>[0]["name"]} size={22} />
                </div>
                <div>
                  <h4 className="mb-2 text-base font-semibold">{g.t}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-0">{g.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grow Together ───────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.growEyebrow}
            title={t.growTitle}
            maxWidth={700}
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            {t.growParagraphs.map((p, i) => (
              <p key={i} className="text-base text-text-secondary leading-relaxed mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            align="center"
            eyebrow={t.industriesEyebrow}
            title={t.industriesTitle}
            subtitle={t.industriesIntro}
            maxWidth={780}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto list-none p-0 m-0">
            {t.industries.map((ind, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-md bg-bg-card border border-border text-sm"
              >
                <Icon name="check" size={14} stroke={2.5} />
                {ind}
              </li>
            ))}
          </ul>
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
