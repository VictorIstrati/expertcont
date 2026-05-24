import { Icon, ArrowLink } from "@expertcont/ui";
import type { ContentMeta, Locale } from "@expertcont/i18n";
import { serviceIcon, servicePricingHint } from "../../lib/serviceIcons";
import { openModal } from "../../lib/modalBus";

// Map services-meta.id to the booking modal's service slug. The modal uses
// Romanian slugs (e.g. "juridic"); our content collection uses English IDs
// (e.g. "legal"). Keep in sync with booking/strings.ts services list.
const SERVICE_ID_TO_BOOKING_SLUG: Record<string, string> = {
  accounting: "contabilitate",
  audit: "audit",
  legal: "juridic",
  consulting: "consultanta",
  hr: "hr",
  it: "it",
};

interface ServiceItem {
  meta: ContentMeta;
  href: string;
  scheduleHref: string;
}

interface ServiceIndexGridProps {
  services: ServiceItem[];
  locale: string;
}

function serviceFeatures(id: string, locale: string): string[] {
  const data: Record<string, Record<string, string[]>> = {
    accounting: {
      ro: [
        "Evidență contabilă și raportare TVA",
        "Calcul salarii și raportare CNAS/CNAM",
        "Lucrăm exclusiv pe 1C",
        "Manager de cont dedicat",
      ],
      ru: [
        "Бухгалтерский учёт и отчётность по НДС",
        "Расчёт зарплат и отчётность CNAS/CNAM",
        "Работаем исключительно на 1С",
        "Персональный менеджер",
      ],
      en: [
        "Bookkeeping and VAT reporting",
        "Payroll and CNAS/CNAM reporting",
        "We work exclusively on 1C",
        "Dedicated account manager",
      ],
    },
    audit: {
      ro: [
        "Planificare audit conform ISA",
        "Testarea controlului intern",
        "Verificarea soldurilor bilanțiere",
        "Opinie audit independentă",
      ],
      ru: [
        "Планирование аудита по МСА",
        "Тестирование системы внутреннего контроля",
        "Проверка балансовых остатков",
        "Независимое аудиторское заключение",
      ],
      en: [
        "Audit planning per ISA",
        "Internal control testing",
        "Balance sheet verification",
        "Independent audit opinion",
      ],
    },
    legal: {
      ro: [
        "Înregistrarea firmelor (SRL, SA, ÎI)",
        "Contracte comerciale și de muncă",
        "Reprezentare în instanțe",
        "Conformitate GDPR",
      ],
      ru: [
        "Регистрация компаний (ООО, АО, ИП)",
        "Хозяйственные и трудовые договоры",
        "Представительство в судах",
        "Соответствие требованиям GDPR",
      ],
      en: [
        "Company registration (LLC, SA, sole trader)",
        "Commercial & employment contracts",
        "Court representation",
        "GDPR compliance",
      ],
    },
    consulting: {
      ro: [
        "Planificare fiscală",
        "Optimizare costuri operaționale",
        "Transformare digitală a contabilității",
        "Strategie de creștere",
      ],
      ru: [
        "Налоговое планирование",
        "Оптимизация операционных затрат",
        "Цифровая трансформация учёта",
        "Стратегия роста",
      ],
      en: [
        "Tax planning",
        "Operating cost optimization",
        "Digital accounting transformation",
        "Growth strategy",
      ],
    },
    hr: {
      ro: [
        "Contracte de muncă (Codul Muncii)",
        "Payroll și raportare CNAS/CNAM",
        "400 lei/lună per angajat acoperit",
        "Asistență la inspecții ITM",
      ],
      ru: [
        "Трудовые договоры (Трудовой кодекс)",
        "Расчёт зарплат и отчётность CNAS/CNAM",
        "400 леев/мес за сотрудника",
        "Сопровождение проверок ITM",
      ],
      en: [
        "Employment contracts (Labour Code)",
        "Payroll and CNAS/CNAM reporting",
        "400 MDL/month per covered employee",
        "Labour inspection support",
      ],
    },
    it: {
      ro: [
        "Audit IT și securitate date",
        "Automatizare procese",
        "Web design și site-uri",
        "Mentenanță continuă (SLA < 4h)",
      ],
      ru: [
        "IT-аудит и безопасность данных",
        "Автоматизация процессов",
        "Веб-дизайн и сайты",
        "Постоянное обслуживание (SLA < 4ч)",
      ],
      en: [
        "IT audit and data security",
        "Process automation",
        "Web design and websites",
        "Ongoing maintenance (SLA < 4h)",
      ],
    },
  };
  return data[id]?.[locale] ?? data[id]?.ro ?? [];
}

function learnMoreLabel(locale: string): string {
  if (locale === "ru") return "Подробнее";
  if (locale === "en") return "Learn more";
  return "Află mai mult";
}

function scheduleLabel(locale: string): string {
  if (locale === "ru") return "Programați";
  if (locale === "en") return "Schedule";
  return "Programează";
}

export function ServiceIndexGrid({ services, locale }: ServiceIndexGridProps) {
  return (
    <>
      <div className="svc-index-grid grid grid-cols-3 gap-5">
        {services.map(({ meta, href }) => {
          const features = serviceFeatures(meta.id, locale);
          const hint = servicePricingHint(meta.id, locale as Locale);
          const bookingSlug = SERVICE_ID_TO_BOOKING_SLUG[meta.id] ?? meta.id;
          return (
            <div key={meta.id} className="card card-hover p-8 flex flex-col">
              <div className="w-14 h-14 rounded-md bg-primary-50 text-primary flex items-center justify-center mb-5 shrink-0">
                <Icon name={serviceIcon(meta.id)} size={26} />
              </div>
              <h3 className="text-2xl mb-3">{meta.titles[locale as "ro" | "ru" | "en"]}</h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed grow">
                {meta.summaries[locale as "ro" | "ru" | "en"]}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 mb-5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                    <span className="text-accent shrink-0 mt-1">
                      <Icon name="check" size={14} stroke={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {hint && (
                <div className="text-xs font-bold text-primary tracking-wider mb-4">{hint}</div>
              )}
              <div className="flex items-center justify-between gap-3 flex-wrap mt-auto">
                <ArrowLink href={href}>{learnMoreLabel(locale)}</ArrowLink>
                <button
                  type="button"
                  onClick={() => openModal("booking", { service: bookingSlug })}
                  className="btn btn-secondary btn-sm shrink-0"
                >
                  {scheduleLabel(locale)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .svc-index-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .svc-index-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
