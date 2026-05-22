import { Container, SectionHeader, Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";
import type { IconName } from "@expertcont/ui";

interface Props {
  locale: Locale;
}

interface Persona {
  slug: "startup" | "scaleup" | "enterprise";
  icon: IconName;
  tier: string;
  time: string;
  short: string;
  desc: string;
}

interface LocaleStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  tierLabel: string;
  personas: Persona[];
}

const COPY: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "SOLUȚII",
    title: "Soluții adaptate fiecărei etape",
    subtitle: "Potrivim abordarea și pachetul în funcție de dimensiunea afacerii tale.",
    cta: "Vezi ce facem în primele 30 de zile",
    tierLabel: "Pachet",
    personas: [
      {
        slug: "startup",
        icon: "lightbulb",
        tier: "STARTUP",
        time: "30 de zile onboarding",
        short: "Lansăm contabilitatea cu tine de la zero",
        desc: "Pentru fondatori și echipe noi: ne ocupăm de înregistrarea fiscală, conturile bancare, codurile CAEM, fluxurile inițiale și raportările primare.",
      },
      {
        slug: "scaleup",
        icon: "trending",
        tier: "SCALE-UP",
        time: "14 zile onboarding",
        short: "Punem ordine în contabilitatea unei afaceri care crește",
        desc: "Pentru SRL în creștere care au nevoie de manager dedicat, raportare lunară clară și optimizare fiscală fără surprize.",
      },
      {
        slug: "enterprise",
        icon: "briefcase",
        tier: "ENTERPRISE",
        time: "Personalizat",
        short: "Echipă dedicată pentru grupuri și operațiuni complexe",
        desc: "Pentru companii cu mai multe entități, raportare consolidată, conformitate IFRS și nevoi de audit intern recurente.",
      },
    ],
  },
  ru: {
    eyebrow: "РЕШЕНИЯ",
    title: "Решения для каждого этапа",
    subtitle: "Подбираем подход и пакет под размер вашего бизнеса.",
    cta: "Что мы сделаем за первые 30 дней",
    tierLabel: "Пакет",
    personas: [
      {
        slug: "startup",
        icon: "lightbulb",
        tier: "STARTUP",
        time: "30 дней онбординга",
        short: "Запускаем бухгалтерию вместе с вами с нуля",
        desc: "Для основателей и новых команд: берём на себя налоговую регистрацию, банковские счета, коды CAEM, начальные потоки и первичную отчётность.",
      },
      {
        slug: "scaleup",
        icon: "trending",
        tier: "SCALE-UP",
        time: "14 дней онбординга",
        short: "Наводим порядок в бухгалтерии растущего бизнеса",
        desc: "Для ООО в стадии роста: выделенный менеджер, чёткая ежемесячная отчётность и налоговая оптимизация без сюрпризов.",
      },
      {
        slug: "enterprise",
        icon: "briefcase",
        tier: "ENTERPRISE",
        time: "Индивидуально",
        short: "Выделенная команда для групп и сложных операций",
        desc: "Для компаний с несколькими юридическими лицами: консолидированная отчётность, соответствие МСФО и регулярный внутренний аудит.",
      },
    ],
  },
  en: {
    eyebrow: "SOLUTIONS",
    title: "Solutions for every stage",
    subtitle: "We match approach and package to your business size.",
    cta: "What we do in the first 30 days",
    tierLabel: "Plan",
    personas: [
      {
        slug: "startup",
        icon: "lightbulb",
        tier: "STARTUP",
        time: "30-day onboarding",
        short: "We launch your accounting from scratch",
        desc: "For founders and new teams: we handle tax registration, bank accounts, activity codes, initial cash flows, and primary reporting.",
      },
      {
        slug: "scaleup",
        icon: "trending",
        tier: "SCALE-UP",
        time: "14-day onboarding",
        short: "We bring order to a growing business's books",
        desc: "For growing LLCs that need a dedicated manager, clear monthly reporting, and tax optimisation with no surprises.",
      },
      {
        slug: "enterprise",
        icon: "briefcase",
        tier: "ENTERPRISE",
        time: "Custom",
        short: "Dedicated team for groups and complex operations",
        desc: "For companies with multiple entities: consolidated reporting, IFRS compliance, and recurring internal audit needs.",
      },
    ],
  },
};

export default function HomePersonaPicker({ locale }: Props) {
  const c = COPY[locale];
  return (
    <section className="section section-alt">
      <Container>
        <SectionHeader
          align="center"
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
          maxWidth={680}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {c.personas.map((p) => (
            <a
              key={p.slug}
              href={`${sectionUrl("solutions", locale)}?persona=${p.slug}`}
              className="card card-hover no-underline text-inherit p-8 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent-50 text-accent-dark shrink-0">
                <Icon name={p.icon} size={26} />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
                {c.tierLabel} {p.tier}
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="text-text-secondary font-semibold">{p.time}</span>
              </div>
              <h3 className="text-xl leading-tight mb-0">&ldquo;{p.short}&rdquo;</h3>
              <p className="text-sm leading-relaxed text-text-secondary mb-auto">
                {p.desc}
              </p>
              <div className="inline-flex items-center gap-2 pt-4 border-t border-border text-sm font-semibold text-primary">
                {c.cta} <Icon name="arrow-right" size={14} />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
