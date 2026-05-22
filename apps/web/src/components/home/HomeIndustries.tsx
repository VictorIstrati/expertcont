import { Container } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface Props {
  locale: Locale;
}

interface LocaleStrings {
  eyebrow: string;
  title: string;
  items: string[];
}

const COPY: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "DOMENII",
    title: "Lucrăm cu afaceri din...",
    items: [
      "Tech & SaaS",
      "E-commerce",
      "Retail",
      "HoReCa",
      "Construcții",
      "Producție",
      "Servicii profesionale",
      "ONG",
      "Logistică & transport",
      "Sănătate",
      "Agricultură",
      "Imobiliare",
    ],
  },
  ru: {
    eyebrow: "ОТРАСЛИ",
    title: "Мы работаем с бизнесом из...",
    items: [
      "Tech & SaaS",
      "E-commerce",
      "Retail",
      "HoReCa",
      "Строительство",
      "Производство",
      "Профессиональные услуги",
      "НКО",
      "Логистика и транспорт",
      "Здравоохранение",
      "Сельское хозяйство",
      "Недвижимость",
    ],
  },
  en: {
    eyebrow: "INDUSTRIES",
    title: "We work with businesses from...",
    items: [
      "Tech & SaaS",
      "E-commerce",
      "Retail",
      "HoReCa",
      "Construction",
      "Manufacturing",
      "Professional services",
      "NGO",
      "Logistics & transport",
      "Healthcare",
      "Agriculture",
      "Real estate",
    ],
  },
};

export default function HomeIndustries({ locale }: Props) {
  const c = COPY[locale];
  const row = [...c.items, ...c.items];
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
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-bg-section-alt px-8 py-5 text-base font-semibold shadow-xs"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {it}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
