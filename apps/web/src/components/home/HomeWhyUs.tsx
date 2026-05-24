import { Icon, Logo } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface Props {
  locale: Locale;
}

interface WhyItem {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  text: string;
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  subtitle: string;
  missionQuote: string;
  teamLabel: string;
  items: WhyItem[];
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "DE CE NOI",
    heading: "Construim pe încredere",
    subtitle:
      "Mai mult decât un serviciu — parteneriat strategic pe termen lung, de la consultanță contabilă la evidență contabilă continuă.",
    missionQuote:
      "Misiunea noastră: să transformăm evidența contabilă dintr-o povară administrativă într-un avantaj strategic pentru afacerea ta.",
    teamLabel: "Echipa ExpertCont",
    items: [
      {
        icon: "award",
        title: "15+ ani experiență",
        text: "Specializare cumulată în standardele contabile naționale și IFRS.",
      },
      {
        icon: "users",
        title: "Echipă multidisciplinară",
        text: "Contabili, juriști, consultanți IT și HR într-o singură echipă.",
      },
      {
        icon: "zap",
        title: "Răspuns sub 4 ore",
        text: "Manager de cont dedicat care preia rapid orice solicitare.",
      },
      {
        icon: "clock",
        title: "Onboarding în 2 săptămâni",
        text: "Preluăm documentația și sistemele rapid, fără pauze în raportare.",
      },
    ],
  },
  ru: {
    eyebrow: "ПОЧЕМУ МЫ",
    heading: "Строим на доверии",
    subtitle:
      "Больше, чем услуга — долгосрочное стратегическое партнёрство, от бухгалтерской консультации до постоянного бухгалтерского учёта.",
    missionQuote:
      "Наша миссия: превратить бухгалтерский учёт из административного бремени в стратегическое преимущество для вашего бизнеса.",
    teamLabel: "Команда ExpertCont",
    items: [
      {
        icon: "award",
        title: "15+ лет опыта",
        text: "Накопленная специализация по национальным стандартам бухучёта и МСФО.",
      },
      {
        icon: "users",
        title: "Мультидисциплинарная команда",
        text: "Бухгалтеры, юристы, IT и HR-консультанты в одной команде.",
      },
      {
        icon: "zap",
        title: "Ответ менее 4 часов",
        text: "Персональный менеджер быстро реагирует на любой запрос.",
      },
      {
        icon: "clock",
        title: "Онбординг за 2 недели",
        text: "Быстро принимаем документацию и системы — без перерывов в отчётности.",
      },
    ],
  },
  en: {
    eyebrow: "WHY US",
    heading: "Built on trust",
    subtitle:
      "More than a service — a long-term strategic partnership, from accounting consulting to ongoing bookkeeping.",
    missionQuote:
      "Our mission: to transform accounting from an administrative burden into a strategic advantage for your business.",
    teamLabel: "The ExpertCont Team",
    items: [
      {
        icon: "award",
        title: "15+ years of experience",
        text: "Cumulative expertise in national accounting standards and IFRS.",
      },
      {
        icon: "users",
        title: "Multidisciplinary team",
        text: "Accountants, lawyers, IT and HR consultants in a single team.",
      },
      {
        icon: "zap",
        title: "Response under 4 hours",
        text: "A dedicated account manager who quickly handles any request.",
      },
      {
        icon: "clock",
        title: "Onboarding in 2 weeks",
        text: "We take over your documentation and systems quickly, with no reporting gaps.",
      },
    ],
  },
};

export default function HomeWhyUs({ locale }: Props) {
  const t = strings[locale];
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="grid items-start gap-20 grid-cols-[1fr_1.4fr] max-lg:grid-cols-1 max-lg:gap-10">
          {/* Left column */}
          <div>
            <div className="eyebrow mb-4">{t.eyebrow}</div>
            <h2 className="mb-5">{t.heading}</h2>
            <p className="text-lg text-text-secondary">{t.subtitle}</p>

            {/* Mission card */}
            <div className="mt-8 p-6 bg-bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Logo variant="mark" size={36} />
                <div className="font-extrabold text-sm tracking-wider">
                  <span className="text-primary">EXPERT</span>
                  <span className="text-accent">CONT</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary italic leading-relaxed">
                &ldquo;{t.missionQuote}&rdquo;
              </p>
              <div className="mt-4 text-sm font-semibold">{t.teamLabel}</div>
            </div>
          </div>

          {/* Right column — 2x2 grid */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {t.items.map((item, i) => (
              <div key={i} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-50 text-accent-dark mb-5">
                  <Icon name={item.icon} size={20} />
                </div>
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
