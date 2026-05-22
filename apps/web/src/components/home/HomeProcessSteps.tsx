import { SectionHeader } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface Props {
  locale: Locale;
}

interface Step {
  n: string;
  title: string;
  text: string;
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  steps: Step[];
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "PROCES",
    heading: "Cum lucrăm împreună",
    steps: [
      {
        n: "1",
        title: "Diagnostic gratuit",
        text: "Analizăm afacerea ta în 30 de minute, fără cost.",
      },
      {
        n: "2",
        title: "Plan personalizat",
        text: "Propunem un pachet adaptat dimensiunii și complexității tale.",
      },
      {
        n: "3",
        title: "Onboarding rapid",
        text: "Preluăm documentația și sistemele în maximum 2 săptămâni.",
      },
      {
        n: "4",
        title: "Servicii continue",
        text: "Lucrăm lunar cu rapoarte clare și manager de cont dedicat.",
      },
    ],
  },
  ru: {
    eyebrow: "ПРОЦЕСС",
    heading: "Как мы работаем вместе",
    steps: [
      {
        n: "1",
        title: "Бесплатная диагностика",
        text: "Анализируем ваш бизнес за 30 минут, без оплаты.",
      },
      {
        n: "2",
        title: "Персональный план",
        text: "Предлагаем пакет, адаптированный к размеру и сложности вашего бизнеса.",
      },
      {
        n: "3",
        title: "Быстрый онбординг",
        text: "Принимаем документацию и системы максимум за 2 недели.",
      },
      {
        n: "4",
        title: "Постоянное обслуживание",
        text: "Работаем ежемесячно с чёткими отчётами и выделенным менеджером.",
      },
    ],
  },
  en: {
    eyebrow: "PROCESS",
    heading: "How we work together",
    steps: [
      {
        n: "1",
        title: "Free diagnostic",
        text: "We analyze your business in 30 minutes, at no cost.",
      },
      {
        n: "2",
        title: "Personalized plan",
        text: "We propose a package tailored to your size and complexity.",
      },
      {
        n: "3",
        title: "Fast onboarding",
        text: "We take over your documentation and systems in up to 2 weeks.",
      },
      {
        n: "4",
        title: "Ongoing services",
        text: "We work monthly with clear reports and a dedicated account manager.",
      },
    ],
  },
};

export default function HomeProcessSteps({ locale }: Props) {
  const t = strings[locale];
  return (
    <section className="section">
      <div className="container">
        <SectionHeader align="center" eyebrow={t.eyebrow} title={t.heading} maxWidth={680} />
        <div className="relative grid gap-5 grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {/* Connecting dashed line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-border-strong z-0 max-lg:hidden" />
          {t.steps.map((step, i) => (
            <div key={i} className="relative z-[1] p-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-card border-2 border-primary text-primary text-lg font-extrabold mb-5">
                {step.n}
              </div>
              <h4 className="mb-2">{step.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
