import { Icon, ArrowLink } from "@expertcont/ui";
import type { Locale, ContentMeta } from "@expertcont/i18n";
import { sectionUrl, detailUrl } from "@expertcont/i18n";
import { serviceIcon, sortByServiceOrder } from "../../lib/serviceIcons";

interface Props {
  locale: Locale;
  services: ContentMeta[];
}

interface LocaleStrings {
  eyebrow: string;
  heading: string;
  subtext: string;
  viewAll: string;
  learnMore: string;
}

const strings: Record<Locale, LocaleStrings> = {
  ro: {
    eyebrow: "SERVICII INTEGRATE",
    heading: "O singură echipă pentru toate nevoile afacerii tale",
    subtext:
      "De la contabilitate primară la consultanță strategică — acoperim toate domeniile-cheie pentru o afacere sănătoasă în Moldova.",
    viewAll: "Vezi toate serviciile",
    learnMore: "Află mai mult",
  },
  ru: {
    eyebrow: "ИНТЕГРИРОВАННЫЕ УСЛУГИ",
    heading: "Одна команда для всех нужд вашего бизнеса",
    subtext:
      "От первичной бухгалтерии до стратегического консалтинга — мы покрываем все ключевые области для здорового бизнеса в Молдове.",
    viewAll: "Смотреть все услуги",
    learnMore: "Узнать больше",
  },
  en: {
    eyebrow: "INTEGRATED SERVICES",
    heading: "One team for all your business needs",
    subtext:
      "From primary bookkeeping to strategic consulting — we cover every key area for a healthy business in Moldova.",
    viewAll: "View all services",
    learnMore: "Learn more",
  },
};

export default function HomeServices({ locale, services }: Props) {
  const t = strings[locale];

  const sorted = sortByServiceOrder(services);

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-14 mb-14">
          <div>
            <div className="eyebrow mb-4">{t.eyebrow}</div>
            <h2>{t.heading}</h2>
          </div>
          <div>
            <p className="text-lg text-text-secondary">{t.subtext}</p>
            <div className="mt-4">
              <ArrowLink href={sectionUrl("services", locale)}>{t.viewAll}</ArrowLink>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((s) => {
            const isFeatured = s.id === "accounting";
            const iconName = serviceIcon(s.id);
            const href = detailUrl("services", s, locale);
            const baseCard =
              "card card-hover relative overflow-hidden block no-underline rounded-lg cursor-pointer";
            const tone = isFeatured
              ? "bg-primary dark:bg-primary-deep text-white border-primary dark:border-primary-deep"
              : "bg-bg-card text-inherit border-border";
            const iconWrap = isFeatured
              ? "bg-[rgba(223,183,65,0.18)] text-[#DFB741]"
              : "bg-primary-50 text-primary";
            const learnTone = isFeatured ? "text-[#DFB741]" : "text-primary";
            return (
              <a key={s.id} href={href} className={`${baseCard} ${tone}`}>
                {isFeatured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-pill text-xs font-bold tracking-wider bg-[rgba(223,183,65,0.2)] text-[#DFB741]">
                    CORE
                  </div>
                )}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-md mb-5 ${iconWrap}`}
                >
                  <Icon name={iconName} size={24} />
                </div>
                <h3 className={`text-2xl mb-3 ${isFeatured ? "text-white" : ""}`}>
                  {s.titles[locale]}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    isFeatured ? "text-white/75" : "text-text-secondary"
                  }`}
                >
                  {s.summaries[locale]}
                </p>
                <span
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${learnTone}`}
                >
                  {t.learnMore} <Icon name="arrow-right" size={14} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
