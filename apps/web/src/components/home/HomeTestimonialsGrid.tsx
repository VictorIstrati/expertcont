import { useState } from "react";
import { Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface Props {
  locale: Locale;
}

interface Testimonial {
  quote: string;
  role: string;
  tag: string;
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  description: string;
  leaveReview: string;
  prevLabel: string;
  nextLabel: string;
  items: Testimonial[];
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "CE SPUN CLIENȚII",
    heading: "Încrederea celor care lucrează cu noi",
    description:
      "Recenzii anonimizate ale clienților noștri. Identitatea lor rămâne confidențială — datele de business nu se discută public.",
    leaveReview: "Lasă o recenzie",
    prevLabel: "Anterior",
    nextLabel: "Următor",
    items: [
      {
        quote:
          "Ne-au identificat preventiv o expunere fiscală pe care propriul nostru contabil intern o ratase. De atunci, dormim liniștiți.",
        role: "Director, companie de transport",
        tag: "Client din 2022",
      },
      {
        quote:
          "Răspunsul rapid e ce ne-a câștigat. Întrebări pe email — primim răspuns clar în câteva ore, nu peste o săptămână.",
        role: "Fondatoare, atelier de creație",
        tag: "Client din 2023",
      },
      {
        quote:
          "Au preluat și partea juridică pe lângă contabilitate. Nu mai pierd timp coordonând două firme — totul printr-un singur manager de cont.",
        role: "Managing Partner, IT",
        tag: "Client din 2024",
      },
    ],
  },
  ru: {
    eyebrow: "ЧТО ГОВОРЯТ КЛИЕНТЫ",
    heading: "Доверие тех, кто работает с нами",
    description:
      "Анонимизированные отзывы наших клиентов. Их личность остаётся конфиденциальной — деловые данные не обсуждаются публично.",
    leaveReview: "Оставить отзыв",
    prevLabel: "Назад",
    nextLabel: "Вперёд",
    items: [
      {
        quote:
          "Они превентивно выявили налоговую уязвимость, которую наш собственный внутренний бухгалтер упустил. С тех пор мы спим спокойно.",
        role: "Директор, транспортная компания",
        tag: "Клиент с 2022 г.",
      },
      {
        quote:
          "Быстрый ответ — это то, что нас подкупило. Вопросы по email — получаем чёткий ответ за несколько часов, а не через неделю.",
        role: "Основатель, творческая мастерская",
        tag: "Клиент с 2023 г.",
      },
      {
        quote:
          "Взяли на себя и юридическую часть в дополнение к бухгалтерии. Больше не трачу время на координацию двух фирм — всё через одного менеджера.",
        role: "Managing Partner, IT",
        tag: "Клиент с 2024 г.",
      },
    ],
  },
  en: {
    eyebrow: "WHAT CLIENTS SAY",
    heading: "The trust of those who work with us",
    description:
      "Anonymised reviews from our clients. Their identity remains confidential — business data is not discussed publicly.",
    leaveReview: "Leave a review",
    prevLabel: "Previous",
    nextLabel: "Next",
    items: [
      {
        quote:
          "They proactively identified a tax exposure that our own in-house accountant had missed. Since then, we sleep soundly.",
        role: "Director, transport company",
        tag: "Client since 2022",
      },
      {
        quote:
          "Fast response is what won us over. Questions by email — we get a clear answer within a few hours, not after a week.",
        role: "Founder, creative studio",
        tag: "Client since 2023",
      },
      {
        quote:
          "They also took on the legal side alongside accounting. I no longer waste time coordinating two firms — everything through a single account manager.",
        role: "Managing Partner, IT",
        tag: "Client since 2024",
      },
    ],
  },
};

export default function HomeTestimonialsGrid({ locale }: Props) {
  const t = strings[locale];
  const [active, setActive] = useState(0);
  const item = t.items[active];

  const prev = () => setActive((active - 1 + t.items.length) % t.items.length);
  const next = () => setActive((active + 1) % t.items.length);

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="grid items-center gap-16 grid-cols-[1fr_1.3fr] max-lg:grid-cols-1 max-lg:gap-6">
          {/* Left column — heading + controls */}
          <div className="max-sm:[&_h2]:text-4xl max-sm:[&_p]:text-base">
            <div className="eyebrow mb-4">{t.eyebrow}</div>
            <h2>{t.heading}</h2>
            <p className="text-base text-text-secondary mt-4 leading-relaxed">
              {t.description}
            </p>

            {/* Dot pager — desktop */}
            <div className="mt-8 flex gap-2 max-lg:hidden">
              {t.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Recenzia ${i + 1}`}
                  className={`h-5 min-h-0 rounded-pill border-none cursor-pointer p-0 transition-all duration-300 ease ${
                    i === active
                      ? "w-10 bg-primary"
                      : "w-3 bg-border-strong"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next + Leave review — desktop */}
            <div className="mt-4 flex flex-wrap items-center gap-2 max-lg:hidden">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-pill border border-border-strong bg-transparent text-text-primary transition hover:border-primary hover:text-primary"
                aria-label={t.prevLabel}
              >
                <Icon name="arrow-left" size={16} />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-pill border border-border-strong bg-transparent text-text-primary transition hover:border-primary hover:text-primary"
                aria-label={t.nextLabel}
              >
                <Icon name="arrow-right" size={16} />
              </button>
              <button
                className="btn btn-primary btn-sm ml-2 flex items-center gap-2"
                onClick={() => openModal("review")}
              >
                <Icon name="star" size={14} />
                {t.leaveReview}
              </button>
            </div>
          </div>

          {/* Right column — active quote card */}
          <div className="card relative overflow-hidden p-10 max-sm:px-6 max-sm:py-8">
            {/* Large decorative quote mark */}
            <div className="absolute top-6 right-6 text-[100px] font-extrabold text-primary-50 leading-none font-[Georgia,serif] select-none pointer-events-none">
              &ldquo;
            </div>

            {/* 5 stars */}
            <div className="flex gap-1 text-accent mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" size={18} />
              ))}
            </div>

            {/* Quote text — keyed by active so it re-mounts for fade */}
            <p
              key={active}
              className="testi-quote fade-in text-xl leading-relaxed mb-8 relative"
            >
              {item.quote}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                <Icon name="users" size={20} />
              </div>
              <div>
                <div className="font-bold text-base">{item.role}</div>
                <div className="text-sm text-text-secondary">{item.tag}</div>
              </div>
            </div>
          </div>

          {/* Mobile controls — rendered after the card in DOM */}
          <div className="hidden max-lg:block">
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                onClick={prev}
                className="btn btn-outline btn-sm p-3 h-11 w-11 shrink-0 flex items-center justify-center"
                aria-label={t.prevLabel}
              >
                <Icon name="arrow-left" size={18} />
              </button>

              <div className="flex gap-2 items-center">
                {t.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Recenzia ${i + 1}`}
                    className={`h-5 min-h-0 rounded-pill border-none cursor-pointer p-0 transition-all duration-300 ease ${
                      i === active
                        ? "w-8 bg-primary"
                        : "w-3 bg-border-strong"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="btn btn-outline btn-sm p-3 h-11 w-11 shrink-0 flex items-center justify-center"
                aria-label={t.nextLabel}
              >
                <Icon name="arrow-right" size={18} />
              </button>
            </div>

            <button
              className="btn btn-primary btn-md w-full flex items-center justify-center gap-2"
              onClick={() => openModal("review")}
            >
              <Icon name="star" size={16} />
              {t.leaveReview}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
