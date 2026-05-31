import { Container } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { INDUSTRIES, industryDetailUrl } from "../industry/industries";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  title: string;
}

const COPY: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "DOMENII",
    title: "Lucrăm cu afaceri din...",
  },
  ru: {
    eyebrow: "ОТРАСЛИ",
    title: "Мы работаем с бизнесом из...",
  },
  en: {
    eyebrow: "INDUSTRIES",
    title: "We work with businesses from...",
  },
};

export default function HomeIndustries({ locale }: Props) {
  const c = COPY[locale];
  const items = INDUSTRIES.map((industry) => ({
    label: industry.title[locale],
    href: industryDetailUrl(industry.slug, locale),
  }));
  const row = [...items, ...items];
  return (
    <section className="section-sm pt-0">
      <Container>
        <div className="mb-10 text-center">
          <div className="eyebrow mb-4 inline-flex">{c.eyebrow}</div>
          <h3 className="text-3xl">{c.title}</h3>
        </div>
      </Container>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
        <div className="flex gap-4 w-max [animation:marquee_40s_linear_infinite]">
          {row.map((it, i) => (
            <a
              key={i}
              href={it.href}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-bg-section-alt px-8 py-5 text-base font-semibold shadow-xs text-inherit no-underline transition hover:border-accent hover:text-accent-dark"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
