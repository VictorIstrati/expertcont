import type { Locale } from "@expertcont/i18n";

interface ComparisonCopy {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionSubtitle: string;
  withUsTitle: string;
  withUsItems: string[];
  withoutUsTitle: string;
  withoutUsItems: string[];
}

export const servicesComparisonCopy: Record<Locale, ComparisonCopy> = {
  ro: {
    sectionEyebrow: "Sub un singur acoperiș",
    sectionTitle: "Un singur partener, toate serviciile",
    sectionSubtitle: "Coordonare zero-friction între contabilitate, juridic și consultanță.",
    withUsTitle: "Cu ExpertCont",
    withUsItems: [
      "Un singur punct de contact",
      "Date sincronizate între departamente",
      "Reduceri pentru servicii combinate",
      "Strategie integrată",
    ],
    withoutUsTitle: "Cu mai mulți furnizori",
    withoutUsItems: [
      "Coordonare manuală între firme",
      "Documente duplicate, erori",
      "Costuri cumulate",
      "Lipsă viziune de ansamblu",
    ],
  },
  ru: {
    sectionEyebrow: "Под одной крышей",
    sectionTitle: "Один партнёр — все услуги",
    sectionSubtitle:
      "Координация без лишних усилий между бухгалтерией, юридическим и консалтингом.",
    withUsTitle: "С ExpertCont",
    withUsItems: [
      "Единая точка контакта",
      "Синхронизированные данные между отделами",
      "Скидки при комплексном заказе",
      "Интегрированная стратегия",
    ],
    withoutUsTitle: "С несколькими поставщиками",
    withoutUsItems: [
      "Ручная координация между фирмами",
      "Дублирующиеся документы, ошибки",
      "Совокупные затраты",
      "Отсутствие общего видения",
    ],
  },
  en: {
    sectionEyebrow: "Under one roof",
    sectionTitle: "One partner, all services",
    sectionSubtitle: "Zero-friction coordination between accounting, legal and consulting.",
    withUsTitle: "With ExpertCont",
    withUsItems: [
      "Single point of contact",
      "Data synchronised across departments",
      "Discounts for bundled services",
      "Integrated strategy",
    ],
    withoutUsTitle: "With multiple providers",
    withoutUsItems: [
      "Manual coordination between firms",
      "Duplicate documents, errors",
      "Cumulative costs",
      "No overall vision",
    ],
  },
};
