import { Icon, ArrowLink } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";
import type { ContentMeta } from "@expertcont/i18n";

interface ServiceItem {
  meta: ContentMeta;
  href: string;
  scheduleHref: string;
}

interface ServiceIndexGridProps {
  services: ServiceItem[];
  locale: string;
}

function serviceIcon(id: string): IconName {
  const map: Record<string, IconName> = {
    accounting: "briefcase",
    audit: "shield",
    legal: "scale",
    consulting: "lightbulb",
    hr: "users",
    it: "zap",
  };
  return map[id] ?? "briefcase";
}

function serviceFeatures(id: string, locale: string): string[] {
  const data: Record<string, Record<string, string[]>> = {
    accounting: {
      ro: [
        "Înregistrarea documentelor primare",
        "Calculul salariilor și raportare CNAS/CNAM",
        "Declarații TVA și impozit pe venit",
        "Manager de cont dedicat",
      ],
      ru: [
        "Регистрация первичных документов",
        "Расчёт зарплат и отчётность CNAS/CNAM",
        "Декларации НДС и налога на прибыль",
        "Персональный менеджер",
      ],
      en: [
        "Primary document recording",
        "Payroll & CNAS/CNAM reporting",
        "VAT & income tax declarations",
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
        "Recrutare și onboarding",
        "Administrare personal și contracte",
        "Payroll & raportare CNAS/CNAM",
        "Politici interne și conformitate GDPR",
      ],
      ru: [
        "Подбор персонала и онбординг",
        "Кадровое делопроизводство и договоры",
        "Зарплата и отчётность CNAS/CNAM",
        "Внутренние политики и соответствие GDPR",
      ],
      en: [
        "Recruitment & onboarding",
        "Personnel admin & contracts",
        "Payroll & CNAS/CNAM reporting",
        "Internal policies & GDPR compliance",
      ],
    },
    it: {
      ro: [
        "Implementare ERP/CRM",
        "Automatizare contabilitate",
        "Securitate date & backup",
        "Suport tehnic dedicat",
      ],
      ru: [
        "Внедрение ERP/CRM",
        "Автоматизация бухгалтерии",
        "Безопасность данных и резервное копирование",
        "Выделенная техническая поддержка",
      ],
      en: [
        "ERP/CRM implementation",
        "Accounting automation",
        "Data security & backup",
        "Dedicated technical support",
      ],
    },
  };
  return data[id]?.[locale] ?? data[id]?.ro ?? [];
}

function pricingHint(id: string, locale: string): string {
  const data: Record<string, Record<string, string>> = {
    accounting: {
      ro: "De la 1 500 MDL/lună",
      ru: "От 1 500 MDL/мес.",
      en: "From MDL 1,500/mo",
    },
    audit: {
      ro: "De la 8 000 MDL/audit",
      ru: "От 8 000 MDL/аудит",
      en: "From MDL 8,000/audit",
    },
    legal: {
      ro: "De la 800 MDL/oră",
      ru: "От 800 MDL/час",
      en: "From MDL 800/hour",
    },
    consulting: {
      ro: "Proiect personalizat",
      ru: "Индивидуальный проект",
      en: "Custom project",
    },
    hr: {
      ro: "De la 1 200 MDL/lună",
      ru: "От 1 200 MDL/мес.",
      en: "From MDL 1,200/mo",
    },
    it: {
      ro: "De la 12 000 MDL/proiect",
      ru: "От 12 000 MDL/проект",
      en: "From MDL 12,000/project",
    },
  };
  return data[id]?.[locale] ?? data[id]?.ro ?? "";
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
        {services.map(({ meta, href, scheduleHref }) => {
          const features = serviceFeatures(meta.id, locale);
          const hint = pricingHint(meta.id, locale);
          return (
            <div key={meta.id} className="card card-hover p-8 flex flex-col">
              <div className="w-14 h-14 rounded-md bg-primary-50 text-primary flex items-center justify-center mb-5 shrink-0">
                <Icon name={serviceIcon(meta.id)} size={26} />
              </div>
              <h3 className="text-2xl mb-3">
                {meta.titles[locale as "ro" | "ru" | "en"]}
              </h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed grow">
                {meta.summaries[locale as "ro" | "ru" | "en"]}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 mb-5">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-primary"
                  >
                    <span className="text-accent shrink-0 mt-1">
                      <Icon name="check" size={14} stroke={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {hint && (
                <div className="text-xs font-bold text-primary tracking-wider mb-4">
                  {hint}
                </div>
              )}
              <div className="flex items-center justify-between gap-3 flex-wrap mt-auto">
                <ArrowLink href={href}>{learnMoreLabel(locale)}</ArrowLink>
                <a href={scheduleHref} className="btn btn-secondary btn-sm shrink-0">
                  {scheduleLabel(locale)}
                </a>
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
