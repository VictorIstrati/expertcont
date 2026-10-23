import { LOCALES, sectionUrl, type Locale } from "@expertcont/i18n";
import type { IconName } from "@expertcont/ui";

/**
 * Free tools ("instrumente") powering the /instrumente hub. Only `live` tools
 * have a page; `soon` tools render as disabled cards on the hub. Live slugs are
 * mirrored in astro.config.mjs (TOOL_SLUGS) for hreflang in the sitemap.
 */
export type ToolId =
  | "accounting-calculator"
  | "it-park-calculator"
  | "invoice-generator"
  | "salary-calculator"
  | "vat-calculator"
  | "tax-regime-comparator"
  | "tax-calendar"
  | "leave-calculator"
  | "late-payment-calculator"
  | "dividend-calculator";

export type ToolStatus = "live" | "soon";

export interface Tool {
  id: ToolId;
  status: ToolStatus;
  icon: IconName;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const TOOLS: Tool[] = [
  {
    id: "accounting-calculator",
    status: "live",
    icon: "calculator",
    slug: {
      ro: "calculator-contabilitate",
      ru: "kalkulyator-bukhgalterii",
      en: "accounting-calculator",
    },
    title: {
      ro: "Calculator cost servicii contabile",
      ru: "Калькулятор стоимости бухгалтерских услуг",
      en: "Accounting cost calculator",
    },
    description: {
      ro: "Află cât costă lunar contabilitatea firmei tale în funcție de domeniu, numărul de documente, cifra de afaceri și statutul de plătitor TVA. Adaugă servicii juridice, HR sau IT și vezi totalul pe loc.",
      ru: "Узнайте, сколько стоит ежемесячное бухгалтерское обслуживание вашей компании в зависимости от сферы деятельности, количества документов, оборота и статуса плательщика НДС. Добавьте юридические, кадровые или IT-услуги и сразу увидите итог.",
      en: "Find out what monthly accounting costs for your company based on industry, document volume, turnover and VAT status. Add legal, HR or IT services and see the total instantly.",
    },
  },
  {
    id: "it-park-calculator",
    status: "live",
    icon: "code",
    slug: { ro: "calculator-it-park", ru: "kalkulyator-it-park", en: "it-park-calculator" },
    title: {
      ro: "Calculator IT Park vs regim general",
      ru: "Калькулятор: IT Park или общий режим",
      en: "IT Park vs standard regime calculator",
    },
    description: {
      ro: "Compară impozitul unic de 7% al rezidenților Moldova IT Park cu taxele din regimul general — impozit pe profit, contribuții sociale, asigurare medicală și impozit pe venit — pe baza cifrei de afaceri și a salariilor reale.",
      ru: "Сравните единый налог 7% для резидентов Moldova IT Park с налогами общего режима — налог на прибыль, социальные взносы, медицинское страхование и подоходный налог — на основе вашего оборота и реальных зарплат.",
      en: "Compare the 7% single tax for Moldova IT Park residents with the standard regime — profit tax, social contributions, health insurance and income tax — based on your turnover and actual salaries.",
    },
  },
  {
    id: "invoice-generator",
    status: "live",
    icon: "file-text",
    slug: { ro: "generator-facturi", ru: "generator-schetov", en: "invoice-generator" },
    title: {
      ro: "Generator de facturi și proforme",
      ru: "Генератор счетов и проформ",
      en: "Invoice and proforma generator",
    },
    description: {
      ro: "Emite facturi pentru clienții din străinătate și facturi proforma — pentru orice companie, plătitoare de TVA sau nu. În engleză, română sau rusă, în EUR, USD sau MDL, cu suma în litere. PDF imediat, fără cont.",
      ru: "Выставляйте инвойсы зарубежным клиентам и счета-проформы — для любой компании, плательщика НДС или нет. На английском, румынском или русском, в EUR, USD или MDL, с суммой прописью. PDF сразу, без регистрации.",
      en: "Issue invoices to foreign clients and proforma invoices — for any company, VAT-registered or not. In English, Romanian or Russian, in EUR, USD or MDL, with the amount in words. Instant PDF, no account.",
    },
  },
  {
    id: "salary-calculator",
    status: "live",
    icon: "users",
    slug: { ro: "calculator-salariu", ru: "kalkulyator-zarplaty", en: "salary-calculator" },
    title: {
      ro: "Calculator salariu brut–net",
      ru: "Калькулятор зарплаты брутто–нетто",
      en: "Gross–net salary calculator",
    },
    description: {
      ro: "Calculează salariul net din brut și invers, plus costul total pentru angajator: contribuții sociale, asigurare medicală, impozit pe venit și scutiri personale.",
      ru: "Рассчитайте зарплату на руки из брутто и обратно, а также полную стоимость для работодателя: социальные взносы, медицинское страхование, подоходный налог и личные освобождения.",
      en: "Work out net salary from gross and back, plus the total cost to the employer: social contributions, health insurance, income tax and personal exemptions.",
    },
  },
  {
    id: "vat-calculator",
    status: "live",
    icon: "audit",
    slug: { ro: "calculator-tva", ru: "kalkulyator-nds", en: "vat-calculator" },
    title: { ro: "Calculator TVA", ru: "Калькулятор НДС", en: "VAT calculator" },
    description: {
      ro: "Adaugă sau extrage TVA la cotele aplicabile în Moldova și obține suma în litere, gata de copiat pe factură sau contract.",
      ru: "Начислите или выделите НДС по ставкам, действующим в Молдове, и получите сумму прописью — готовую для счета или договора.",
      en: "Add or extract VAT at the rates applicable in Moldova and get the amount in words, ready to paste into an invoice or contract.",
    },
  },
  {
    id: "leave-calculator",
    status: "live",
    icon: "clock",
    slug: {
      ro: "calculator-concediu",
      ru: "kalkulyator-otpusknykh",
      en: "leave-pay-calculator",
    },
    title: {
      ro: "Calculator concediu și indemnizație medicală",
      ru: "Калькулятор отпускных и больничных",
      en: "Leave and sick pay calculator",
    },
    description: {
      ro: "Calculează indemnizația de concediu de odihnă și de concediu medical pe baza salariului mediu, cu împărțirea zilelor plătite de angajator și de CNAS.",
      ru: "Рассчитайте отпускные и пособие по болезни на основе средней зарплаты, с разделением дней, оплачиваемых работодателем и CNAS.",
      en: "Calculate annual leave pay and sick pay from the average salary, with the split between days paid by the employer and by CNAS.",
    },
  },
  {
    id: "late-payment-calculator",
    status: "live",
    icon: "scale",
    slug: {
      ro: "calculator-penalitati",
      ru: "kalkulyator-peni",
      en: "late-payment-calculator",
    },
    title: {
      ro: "Calculator penalități de întârziere",
      ru: "Калькулятор пени за просрочку",
      en: "Late payment penalty calculator",
    },
    description: {
      ro: "Calculează penalitatea contractuală sau dobânda legală de întârziere pentru o datorie neachitată, zi cu zi, și descarcă calculul pentru somație.",
      ru: "Рассчитайте договорную неустойку или законные проценты за просрочку по неоплаченному долгу, по дням, и скачайте расчёт для претензии.",
      en: "Calculate the contractual penalty or statutory late-payment interest on an unpaid debt, day by day, and download the calculation for a demand letter.",
    },
  },
  {
    id: "dividend-calculator",
    status: "live",
    icon: "trending",
    slug: {
      ro: "calculator-dividende",
      ru: "kalkulyator-dividendov",
      en: "dividend-calculator",
    },
    title: {
      ro: "Calculator dividende vs salariu",
      ru: "Калькулятор: дивиденды или зарплата",
      en: "Dividend vs salary calculator",
    },
    description: {
      ro: "Vezi cât primești net dacă scoți profitul ca dividende și cât dacă îl plătești ca salariu, cu toate impozitele și contribuțiile calculate.",
      ru: "Посмотрите, сколько вы получите на руки, если выведете прибыль как дивиденды, и сколько — если как зарплату, со всеми налогами и взносами.",
      en: "See how much you take home if you draw profit as dividends versus as salary, with all taxes and contributions included.",
    },
  },
  {
    id: "tax-regime-comparator",
    status: "soon",
    icon: "briefcase",
    slug: {
      ro: "comparator-regim-fiscal",
      ru: "sravnenie-nalogovykh-rezhimov",
      en: "tax-regime-comparator",
    },
    title: {
      ro: "SRL, II sau activitate independentă?",
      ru: "ООО, ИП или независимая деятельность?",
      en: "LLC, sole trader or independent activity?",
    },
    description: {
      ro: "Introdu venitul estimat și cheltuielile și vezi ce formă de activitate te costă cel mai puțin în taxe și contribuții, înainte să înregistrezi afacerea.",
      ru: "Укажите ожидаемый доход и расходы и посмотрите, какая форма деятельности обойдётся дешевле всего по налогам и взносам — ещё до регистрации бизнеса.",
      en: "Enter your expected income and expenses and see which legal form costs you the least in taxes and contributions — before you register the business.",
    },
  },
  {
    id: "tax-calendar",
    status: "soon",
    icon: "calendar",
    slug: { ro: "calendar-fiscal", ru: "nalogovyy-kalendar", en: "tax-calendar" },
    title: { ro: "Calendar fiscal", ru: "Налоговый календарь", en: "Tax calendar" },
    description: {
      ro: "Toate termenele de raportare și plată pentru firma ta — IPC21, TVA, declarații anuale, CNAS — într-un calendar pe care îl poți abona în Google sau Outlook.",
      ru: "Все сроки отчётности и платежей для вашей компании — IPC21, НДС, годовые декларации, CNAS — в календаре, на который можно подписаться в Google или Outlook.",
      en: "Every filing and payment deadline for your company — IPC21, VAT, annual returns, CNAS — in a calendar you can subscribe to in Google or Outlook.",
    },
  },
];

const BY_ID = new Map(TOOLS.map((t) => [t.id, t]));

export function getTool(id: ToolId): Tool {
  const tool = BY_ID.get(id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}

/** Tool page URL, e.g. /instrumente/calculator-contabilitate, /en/tools/accounting-calculator. */
export function toolUrl(tool: Tool, locale: Locale): string {
  return `${sectionUrl("tools", locale)}/${tool.slug[locale]}`;
}

/** Per-locale sibling URLs for the hub (/instrumente) — feeds hreflang. */
export function toolsHubSiblings(): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, sectionUrl("tools", l)])) as Record<
    Locale,
    string
  >;
}

/** Per-locale sibling URLs for one tool page — feeds hreflang. */
export function toolSiblings(tool: Tool): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, toolUrl(tool, l)])) as Record<Locale, string>;
}
