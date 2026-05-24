import type { IconName } from "@expertcont/ui";
import type { AccordionItem } from "@expertcont/ui";
import { site } from "../../site";

const SITE_PHONE = site.business.phone;

export interface IncludedItem {
  icon: IconName;
  title: string;
  text: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface ServicePageData {
  includedHeading: string;
  includedItems: IncludedItem[];
  processHeading: string;
  processSteps: ProcessStep[];
  faqHeading: string;
  faqItems: AccordionItem[];
  pricing: {
    priceLabel: string;
    features: string[];
    ctaLabel: string;
    callLabel: string;
    allPricingLabel: string;
  };
  offerEyebrow: string;
  offerHeading: string;
  offerSub: string;
  relatedHeading: string;
  bodyIntroHeading: string;
  bodyIntro: string;
}

type Locale = "ro" | "ru" | "en";
type ServiceId = "accounting" | "audit" | "legal" | "consulting" | "hr" | "it";

const data: Record<ServiceId, Record<Locale, ServicePageData>> = {
  accounting: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "file-text",
          title: "Contabilitate primară",
          text: "Înregistrarea documentelor primare, registre, evidență TVA și raportare lunară.",
        },
        {
          icon: "trending",
          title: "Contabilitate de gestiune",
          text: "Centre de cost, marje, rapoarte manageriale lunare și trimestriale.",
        },
        {
          icon: "users",
          title: "Salarizare & payroll",
          text: "Calcul salarii, declarații CNAS/CNAM, fluturași și raportări.",
        },
        {
          icon: "shield",
          title: "Optimizare fiscală",
          text: "Identificarea legală a oportunităților de reducere a poverii fiscale.",
        },
        {
          icon: "briefcase",
          title: "Audit pregătitor",
          text: "Pregătire dosar pentru auditul anual sau control fiscal.",
        },
        {
          icon: "check-circle",
          title: "Bilanț anual",
          text: "Pregătirea și depunerea bilanțului anual conform SNC.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Discovery call de 30 minute",
          d: "Evaluăm volumul, complexitatea și sistemele existente.",
        },
        {
          n: "02",
          t: "Ofertă & contract",
          d: "Propunere transparentă pe baza nevoilor reale. Semnare digitală.",
        },
        {
          n: "03",
          t: "Onboarding (5-10 zile)",
          d: "Preluare documente, sincronizare sisteme, verificare solduri.",
        },
        {
          n: "04",
          t: "Operare lunară",
          d: "Documente uploadate, rapoarte pregătite, declarații depuse.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Cât durează tranziția de la contabilul actual?",
          a: "Procesul de onboarding durează între 5 și 10 zile lucrătoare. Preluăm documentele, sincronizăm sistemele și verificăm soldurile inițiale fără să întrerupem activitatea ta.",
        },
        {
          q: "Lucrați cu firme deja înregistrate sau doar cu start-up-uri?",
          a: "Lucrăm cu ambele. Avem proceduri specifice pentru preluarea contabilității istorice și verificarea conformității documentelor existente.",
        },
        {
          q: "Ce software contabil utilizați?",
          a: "Lucrăm exclusiv pe 1C — versiunea actuală pentru Republica Moldova. Pentru firmele care vin cu alte sisteme, ne ocupăm de migrarea datelor în 1C în cadrul onboarding-ului.",
        },
        {
          q: "Lucrați și cu rezidenți IT Park?",
          a: "Da. Cunoaștem regimul fiscal specific al IT Park (impozit unic de 7% pe venit, scutiri de TVA pe export servicii IT) și raportarea separată către administrația IT Park. Configurăm 1C cu planul de conturi adaptat și gestionăm corect distincția între venituri eligibile vs neeligibile.",
        },
      ],
      pricing: {
        priceLabel: "Începând de la 1 500 MDL/lună",
        features: ["Manager dedicat", "Răspuns < 4h", "Raport lunar inclus", "Suport prioritar"],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Începe cu o consultație gratuită",
      offerSub: "30 minute · ofertă în 48 ore · fără obligații.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Ce facem pentru afacerea ta",
      bodyIntro:
        "Preluăm întreaga zonă de contabilitate primară și de gestiune, ținem evidența fiscală, calculăm salariile și depunem toate declarațiile către SFS, CNAS, CNAM și BNS — la termen, fără erori, fără stres pentru tine.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "file-text",
          title: "Первичный учёт",
          text: "Регистрация первичных документов, журналы, учёт НДС и ежемесячная отчётность.",
        },
        {
          icon: "trending",
          title: "Управленческий учёт",
          text: "Центры затрат, маржинальность, ежемесячные и квартальные управленческие отчёты.",
        },
        {
          icon: "users",
          title: "Расчёт зарплат",
          text: "Начисление зарплат, декларации CNAS/CNAM, расчётные листы и отчётность.",
        },
        {
          icon: "shield",
          title: "Налоговая оптимизация",
          text: "Законное выявление возможностей снижения налоговой нагрузки.",
        },
        {
          icon: "briefcase",
          title: "Подготовка к аудиту",
          text: "Формирование досье для годового аудита или налоговой проверки.",
        },
        {
          icon: "check-circle",
          title: "Годовой баланс",
          text: "Подготовка и сдача годового баланса по НСБУ.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Discovery-звонок 30 минут",
          d: "Оцениваем объём, сложность и существующие системы.",
        },
        {
          n: "02",
          t: "Предложение и договор",
          d: "Прозрачное предложение на основе реальных потребностей. Электронная подпись.",
        },
        {
          n: "03",
          t: "Онбординг (5-10 дней)",
          d: "Приём документов, синхронизация систем, проверка остатков.",
        },
        {
          n: "04",
          t: "Ежемесячная работа",
          d: "Загрузка документов, подготовка отчётов, сдача деклараций.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Сколько времени занимает переход от текущего бухгалтера?",
          a: "Процесс онбординга занимает от 5 до 10 рабочих дней. Мы принимаем документы, синхронизируем системы и проверяем начальные остатки, не прерывая вашу деятельность.",
        },
        {
          q: "Вы работаете с уже зарегистрированными компаниями или только со стартапами?",
          a: "Мы работаем с обоими. У нас есть специальные процедуры для принятия исторической бухгалтерии и проверки соответствия существующих документов.",
        },
        {
          q: "Какое бухгалтерское ПО вы используете?",
          a: "Работаем исключительно на 1С — текущей версии для Республики Молдова. Для компаний с другими системами выполняем миграцию данных в 1С в рамках онбординга.",
        },
        {
          q: "Работаете ли с резидентами IT Park?",
          a: "Да. Знаем специфический налоговый режим IT Park (единый налог 7% на доход, освобождение от НДС на экспорт IT-услуг) и отдельную отчётность перед администрацией IT Park. Настраиваем 1С с адаптированным планом счетов и корректно ведём разграничение между квалифицируемыми и неквалифицируемыми доходами.",
        },
      ],
      pricing: {
        priceLabel: "От 1 500 MDL/мес.",
        features: [
          "Персональный менеджер",
          "Ответ < 4 ч",
          "Ежемесячный отчёт",
          "Приоритетная поддержка",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Все тарифы",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Начните с бесплатной консультации",
      offerSub: "30 минут · предложение за 48 часов · без обязательств.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Что мы делаем для вашего бизнеса",
      bodyIntro:
        "Мы берём на себя всю первичную и управленческую бухгалтерию, ведём налоговый учёт, начисляем зарплаты и подаём все декларации в SFS, CNAS, CNAM и BNS — в срок, без ошибок, без лишних хлопот для вас.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "file-text",
          title: "Primary bookkeeping",
          text: "Primary document recording, ledgers, VAT tracking and monthly reporting.",
        },
        {
          icon: "trending",
          title: "Management accounting",
          text: "Cost centres, margins, monthly and quarterly management reports.",
        },
        {
          icon: "users",
          title: "Payroll",
          text: "Salary calculations, CNAS/CNAM declarations, payslips and reporting.",
        },
        {
          icon: "shield",
          title: "Tax optimisation",
          text: "Legally identifying opportunities to reduce your tax burden.",
        },
        {
          icon: "briefcase",
          title: "Audit preparation",
          text: "Dossier preparation for annual audit or tax inspection.",
        },
        {
          icon: "check-circle",
          title: "Annual balance sheet",
          text: "Preparation and submission of the annual balance sheet per NAS.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "30-minute discovery call",
          d: "We assess the volume, complexity and existing systems.",
        },
        {
          n: "02",
          t: "Proposal & contract",
          d: "Transparent proposal based on real needs. Digital signing.",
        },
        {
          n: "03",
          t: "Onboarding (5-10 days)",
          d: "Document handover, system sync, balance verification.",
        },
        {
          n: "04",
          t: "Monthly operations",
          d: "Documents uploaded, reports prepared, declarations filed.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "How long does the transition from my current accountant take?",
          a: "The onboarding process takes between 5 and 10 working days. We take over documents, sync systems and verify opening balances without interrupting your business.",
        },
        {
          q: "Do you work with existing companies or only start-ups?",
          a: "Both. We have specific procedures for taking on historical bookkeeping and verifying the compliance of existing documents.",
        },
        {
          q: "Which accounting software do you use?",
          a: "We work exclusively on 1C — the current Republic of Moldova version. For companies coming from other systems, we handle the migration to 1C as part of onboarding.",
        },
        {
          q: "Do you work with IT Park residents?",
          a: "Yes. We know the specific IT Park tax regime (7% single tax on revenue, VAT exemption on exported IT services) and the separate reporting to the IT Park administration. We configure 1C with an adapted chart of accounts and correctly separate qualifying vs non-qualifying revenue.",
        },
      ],
      pricing: {
        priceLabel: "From MDL 1,500/mo",
        features: [
          "Dedicated manager",
          "Response < 4h",
          "Monthly report included",
          "Priority support",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Start with a free consultation",
      offerSub: "30 minutes · offer in 48h · no obligations.",
      relatedHeading: "Related services",
      bodyIntroHeading: "What we do for your business",
      bodyIntro:
        "We take over all primary and management bookkeeping, handle tax compliance, calculate payroll and file all declarations with SFS, CNAS, CNAM and BNS — on time, error-free, stress-free.",
    },
  },
  audit: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "briefcase",
          title: "Planificare audit conform ISA",
          text: "Plan de audit detaliat conform Standardelor Internaționale de Audit.",
        },
        {
          icon: "shield",
          title: "Testarea controlului intern",
          text: "Evaluarea și testarea sistemelor de control intern ale societății.",
        },
        {
          icon: "file-text",
          title: "Verificarea soldurilor bilanțiere",
          text: "Reconcilieri, confirmare solduri și verificare documente justificative.",
        },
        {
          icon: "check-circle",
          title: "Opinie audit independentă",
          text: "Raport de audit cu opinie de audit conform ISA 700.",
        },
        {
          icon: "trending",
          title: "Raport către management",
          text: "Management letter cu recomandări de îmbunătățire a controlului intern.",
        },
      ],
      processHeading: "Procesul de audit",
      processSteps: [
        {
          n: "01",
          t: "Planificare & evaluare risc",
          d: "Identificăm riscurile, stabilim pragul de semnificație și planificăm sondajele.",
        },
        {
          n: "02",
          t: "Testarea controlului intern",
          d: "Testăm procedurile și controalele cheie pentru identificarea vulnerabilităților.",
        },
        {
          n: "03",
          t: "Proceduri de fond",
          d: "Verificăm soldurile, tranzacțiile și documentele de suport.",
        },
        {
          n: "04",
          t: "Raportare & opinie",
          d: "Emitem raportul de audit și discutăm constatările cu managementul.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Cât durează un audit financiar?",
          a: "Un audit standard pentru o companie medie durează 3-6 săptămâni, în funcție de complexitate și disponibilitatea documentelor.",
        },
        {
          q: "Care este diferența dintre audit intern și extern?",
          a: "Auditul extern este realizat de auditori independenți și oferă opinie pentru terți (bănci, acționari). Auditul intern evaluează procesele interne și controlul managerial.",
        },
        {
          q: "Firma mea este obligată prin lege să facă audit?",
          a: "Conform legislației moldovenești, companiile care depășesc anumite praguri (cifra de afaceri, active, angajați) sunt obligate la audit extern anual.",
        },
      ],
      pricing: {
        priceLabel: "De la 8 000 MDL/audit",
        features: ["Raport ISA complet", "Management letter", "Asistență SFS", "Arhivare digitală"],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Solicită o ofertă de audit",
      offerSub: "Evaluare gratuită · ofertă în 48 ore · confidențial.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Cum abordăm auditul",
      bodyIntro:
        "Realizăm audituri financiare externe și interne conform Standardelor Internaționale de Audit (ISA), oferind o opinie independentă bazată pe dovezi solide și proceduri riguroase.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "briefcase",
          title: "Планирование аудита по МСА",
          text: "Детальный план аудита в соответствии с Международными стандартами аудита.",
        },
        {
          icon: "shield",
          title: "Тестирование внутреннего контроля",
          text: "Оценка и тестирование систем внутреннего контроля компании.",
        },
        {
          icon: "file-text",
          title: "Проверка балансовых остатков",
          text: "Сверки, подтверждение остатков и проверка подтверждающих документов.",
        },
        {
          icon: "check-circle",
          title: "Независимое аудиторское заключение",
          text: "Аудиторское заключение с мнением аудитора по МСА 700.",
        },
        {
          icon: "trending",
          title: "Письмо руководству",
          text: "Management letter с рекомендациями по улучшению внутреннего контроля.",
        },
      ],
      processHeading: "Процесс аудита",
      processSteps: [
        {
          n: "01",
          t: "Планирование и оценка рисков",
          d: "Выявляем риски, устанавливаем уровень существенности и планируем процедуры.",
        },
        {
          n: "02",
          t: "Тестирование внутреннего контроля",
          d: "Тестируем ключевые процедуры и средства контроля.",
        },
        {
          n: "03",
          t: "Процедуры по существу",
          d: "Проверяем остатки, операции и подтверждающие документы.",
        },
        {
          n: "04",
          t: "Отчётность и заключение",
          d: "Выдаём аудиторское заключение и обсуждаем выводы с руководством.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Сколько времени занимает финансовый аудит?",
          a: "Стандартный аудит средней компании занимает 3-6 недель в зависимости от сложности и наличия документов.",
        },
        {
          q: "В чём разница между внутренним и внешним аудитом?",
          a: "Внешний аудит проводится независимыми аудиторами и даёт заключение для третьих сторон (банков, акционеров). Внутренний аудит оценивает внутренние процессы и управленческий контроль.",
        },
        {
          q: "Обязана ли моя компания проходить аудит по закону?",
          a: "По молдавскому законодательству компании, превышающие определённые пороги (выручка, активы, сотрудники), обязаны проходить ежегодный внешний аудит.",
        },
      ],
      pricing: {
        priceLabel: "От 8 000 MDL/аудит",
        features: [
          "Полный отчёт по МСА",
          "Письмо руководству",
          "Помощь при проверках SFS",
          "Цифровой архив",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Все тарифы",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Запросить предложение по аудиту",
      offerSub: "Бесплатная оценка · предложение за 48 ч · конфиденциально.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Наш подход к аудиту",
      bodyIntro:
        "Мы проводим внешний и внутренний финансовый аудит в соответствии с Международными стандартами аудита (МСА), предоставляя независимое заключение на основе весомых доказательств.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "briefcase",
          title: "Audit planning per ISA",
          text: "Detailed audit plan in accordance with International Standards on Auditing.",
        },
        {
          icon: "shield",
          title: "Internal control testing",
          text: "Assessment and testing of the company's internal control systems.",
        },
        {
          icon: "file-text",
          title: "Balance sheet verification",
          text: "Reconciliations, balance confirmation and supporting document review.",
        },
        {
          icon: "check-circle",
          title: "Independent audit opinion",
          text: "Audit report with auditor's opinion per ISA 700.",
        },
        {
          icon: "trending",
          title: "Management letter",
          text: "Management letter with recommendations to improve internal control.",
        },
      ],
      processHeading: "The audit process",
      processSteps: [
        {
          n: "01",
          t: "Planning & risk assessment",
          d: "We identify risks, set materiality thresholds and plan procedures.",
        },
        {
          n: "02",
          t: "Internal control testing",
          d: "We test key procedures and controls to identify vulnerabilities.",
        },
        {
          n: "03",
          t: "Substantive procedures",
          d: "We verify balances, transactions and supporting documents.",
        },
        {
          n: "04",
          t: "Reporting & opinion",
          d: "We issue the audit report and discuss findings with management.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "How long does a financial audit take?",
          a: "A standard audit for a medium-sized company takes 3-6 weeks, depending on complexity and document availability.",
        },
        {
          q: "What is the difference between internal and external audit?",
          a: "External audit is conducted by independent auditors and provides an opinion for third parties (banks, shareholders). Internal audit evaluates internal processes and management controls.",
        },
        {
          q: "Is my company legally required to have an audit?",
          a: "Under Moldovan law, companies exceeding certain thresholds (turnover, assets, employees) are required to undergo annual external audit.",
        },
      ],
      pricing: {
        priceLabel: "From MDL 8,000/audit",
        features: [
          "Full ISA audit report",
          "Management letter",
          "SFS inspection support",
          "Digital archiving",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Request an audit quote",
      offerSub: "Free assessment · quote in 48h · confidential.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Our approach to audit",
      bodyIntro:
        "We conduct external and internal financial audits in accordance with International Standards on Auditing (ISA), providing an independent opinion backed by solid evidence and rigorous procedures.",
    },
  },
  legal: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "briefcase",
          title: "Înregistrarea firmelor",
          text: "Constituire SRL, SA, ÎI — pachet complet la cheie, inclusiv deschidere cont bancar.",
        },
        {
          icon: "file-text",
          title: "Contracte comerciale și de muncă",
          text: "Redactare, revizuire și negociere contracte adaptate specificului afacerii tale.",
        },
        {
          icon: "scale",
          title: "Reprezentare în instanțe",
          text: "Apărare și reprezentare în litigii comerciale, civile și fiscale.",
        },
        {
          icon: "shield",
          title: "Litigii fiscale",
          text: "Contestații la SFS, recuperare TVA, apel decizii fiscale.",
        },
        {
          icon: "users",
          title: "Dreptul muncii",
          text: "Regulamente interne, contracte individuale de muncă, concedieri și litigii HR.",
        },
        {
          icon: "check-circle",
          title: "Conformitate GDPR",
          text: "Politici de confidențialitate, registru prelucrări date, DPO extern.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Consultație juridică inițială",
          d: "Analizăm situația, identificăm riscurile și stabilim prioritățile.",
        },
        {
          n: "02",
          t: "Strategie și plan de acțiune",
          d: "Propunem cea mai bună abordare juridică și estimăm costurile.",
        },
        {
          n: "03",
          t: "Execuție",
          d: "Redactăm documente, depunem acte, reprezentăm în fața autorităților.",
        },
        {
          n: "04",
          t: "Monitorizare & follow-up",
          d: "Urmărim dosarele, informăm despre termene și actualizăm documentele.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Cât costă înregistrarea unui SRL?",
          a: "Pachetul nostru de constituire SRL pornește de la 2 500 MDL, incluzând pregătirea actelor, taxa de stat și asistență la deschiderea contului bancar.",
        },
        {
          q: "Oferiți asistență în litigii fiscale cu SFS?",
          a: "Da, avem expertiză specifică în contestații administrative și judiciare față de Serviciul Fiscal de Stat, inclusiv recuperare TVA și anulare amenzi.",
        },
        {
          q: "Puteți ajuta cu contracte cu parteneri din UE?",
          a: "Da, redactăm și revizuim contracte transfrontaliere în română, rusă și engleză, cu clauze adaptate atât legislației moldovenești cât și celei europene.",
        },
      ],
      pricing: {
        priceLabel: "De la 800 MDL/oră consultanță",
        features: [
          "Consultație inițială inclusă",
          "Documente în 48h",
          "Reprezentare inclus",
          "Arhivare digitală",
        ],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Consultație juridică gratuită",
      offerSub: "30 minute · ofertă în 48 ore · confidențial.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Protecție juridică completă",
      bodyIntro:
        "Oferim o gamă completă de servicii juridice pentru companii — de la înregistrarea firmei și redactarea contractelor, până la reprezentare în instanțe și conformitate GDPR.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "briefcase",
          title: "Регистрация компаний",
          text: "Создание ООО, АО, ИП — полный пакет под ключ, включая открытие банковского счёта.",
        },
        {
          icon: "file-text",
          title: "Хозяйственные и трудовые договоры",
          text: "Разработка, проверка и согласование договоров с учётом специфики вашего бизнеса.",
        },
        {
          icon: "scale",
          title: "Представительство в судах",
          text: "Защита и представительство в коммерческих, гражданских и налоговых спорах.",
        },
        {
          icon: "shield",
          title: "Налоговые споры",
          text: "Обжалование решений SFS, возврат НДС, апелляция налоговых решений.",
        },
        {
          icon: "users",
          title: "Трудовое право",
          text: "Внутренние регламенты, индивидуальные трудовые договоры, увольнения и HR-споры.",
        },
        {
          icon: "check-circle",
          title: "Соответствие GDPR",
          text: "Политики конфиденциальности, реестр обработки данных, внешний DPO.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Первичная юридическая консультация",
          d: "Анализируем ситуацию, выявляем риски и расставляем приоритеты.",
        },
        {
          n: "02",
          t: "Стратегия и план действий",
          d: "Предлагаем наилучший юридический подход и оцениваем затраты.",
        },
        {
          n: "03",
          t: "Исполнение",
          d: "Готовим документы, подаём заявления, представляем интересы перед органами.",
        },
        {
          n: "04",
          t: "Мониторинг и сопровождение",
          d: "Отслеживаем дела, информируем о сроках и обновляем документы.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Сколько стоит регистрация ООО?",
          a: "Наш пакет по регистрации ООО начинается от 2 500 MDL и включает подготовку документов, государственную пошлину и помощь в открытии банковского счёта.",
        },
        {
          q: "Помогаете ли вы в налоговых спорах с SFS?",
          a: "Да, у нас есть специализированный опыт в административных и судебных обжалованиях решений Государственной налоговой службы, включая возврат НДС и отмену штрафов.",
        },
        {
          q: "Можете помочь с договорами с партнёрами из ЕС?",
          a: "Да, мы составляем и проверяем трансграничные договоры на румынском, русском и английском языках с клаузами, адаптированными к молдавскому и европейскому законодательству.",
        },
      ],
      pricing: {
        priceLabel: "От 800 MDL/час консультации",
        features: [
          "Первичная консультация включена",
          "Документы за 48 ч",
          "Представительство включено",
          "Цифровой архив",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Все тарифы",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Бесплатная юридическая консультация",
      offerSub: "30 минут · предложение за 48 ч · конфиденциально.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Полная юридическая защита",
      bodyIntro:
        "Мы предоставляем полный спектр юридических услуг для компаний — от регистрации фирмы и составления договоров до представительства в судах и соответствия GDPR.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "briefcase",
          title: "Company registration",
          text: "LLC, SA, sole trader formation — full turnkey package including bank account opening.",
        },
        {
          icon: "file-text",
          title: "Commercial & employment contracts",
          text: "Drafting, reviewing and negotiating contracts tailored to your business.",
        },
        {
          icon: "scale",
          title: "Court representation",
          text: "Defence and representation in commercial, civil and tax disputes.",
        },
        {
          icon: "shield",
          title: "Tax litigation",
          text: "SFS appeals, VAT recovery, challenging tax decisions.",
        },
        {
          icon: "users",
          title: "Employment law",
          text: "Internal regulations, individual employment contracts, dismissals and HR disputes.",
        },
        {
          icon: "check-circle",
          title: "GDPR compliance",
          text: "Privacy policies, data processing register, external DPO.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "Initial legal consultation",
          d: "We analyse the situation, identify risks and establish priorities.",
        },
        {
          n: "02",
          t: "Strategy & action plan",
          d: "We propose the best legal approach and estimate costs.",
        },
        {
          n: "03",
          t: "Execution",
          d: "We draft documents, file applications, represent before authorities.",
        },
        {
          n: "04",
          t: "Monitoring & follow-up",
          d: "We track cases, inform on deadlines and update documents.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "How much does LLC registration cost?",
          a: "Our LLC formation package starts from MDL 2,500, including document preparation, state fee and assistance with bank account opening.",
        },
        {
          q: "Do you assist with tax disputes against SFS?",
          a: "Yes, we have specific expertise in administrative and judicial appeals against the State Tax Service, including VAT recovery and penalty cancellation.",
        },
        {
          q: "Can you help with contracts with EU partners?",
          a: "Yes, we draft and review cross-border contracts in Romanian, Russian and English, with clauses adapted to both Moldovan and European law.",
        },
      ],
      pricing: {
        priceLabel: "From MDL 800/hour consultation",
        features: [
          "Initial consultation included",
          "Documents in 48h",
          "Representation included",
          "Digital archiving",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Free legal consultation",
      offerSub: "30 minutes · offer in 48h · confidential.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Complete legal protection",
      bodyIntro:
        "We provide a full range of legal services for companies — from company registration and contract drafting to court representation and GDPR compliance.",
    },
  },
  consulting: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "lightbulb",
          title: "Planificare fiscală",
          text: "Structurare optimă a afacerii pentru minimizarea legală a impozitelor.",
        },
        {
          icon: "trending",
          title: "Optimizare costuri",
          text: "Analiză detaliată a costurilor operaționale și identificare economii.",
        },
        {
          icon: "zap",
          title: "Transformare digitală",
          text: "Implementare software contabil cloud, automatizări și dashboard-uri manageriale.",
        },
        {
          icon: "shield",
          title: "Evaluare riscuri",
          text: "Maparea riscurilor financiare, operaționale și de conformitate.",
        },
        {
          icon: "briefcase",
          title: "Strategie de creștere",
          text: "Plan de afaceri, evaluare piață și identificare oportunități de expansiune.",
        },
        {
          icon: "users",
          title: "Mentorat antreprenorial",
          text: "Sesiuni 1-la-1 cu consultanți seniori pentru decizii strategice.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Diagnostic inițial",
          d: "Analizăm situația curentă: finanțe, procese, riscuri și oportunități.",
        },
        {
          n: "02",
          t: "Plan de intervenție",
          d: "Propunem un plan structurat cu obiective clare, KPI și termene.",
        },
        {
          n: "03",
          t: "Implementare",
          d: "Lucrăm alături de echipa ta la implementarea recomandărilor.",
        },
        {
          n: "04",
          t: "Monitorizare rezultate",
          d: "Urmărim progresul și ajustăm strategia în funcție de evoluție.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Cum se stabilește prețul pentru un proiect de consultanță?",
          a: "Prețul depinde de complexitate, durata proiectului și resursele alocate. Oferim ofertă fixă după diagnosticul inițial, fără surprize.",
        },
        {
          q: "Lucrați și cu firme mici sau doar cu corporații?",
          a: "Lucrăm cu companii de toate dimensiunile — de la start-up-uri cu 2 angajați până la companii cu sute de persoane. Adaptăm abordarea la resursele și obiectivele fiecărui client.",
        },
        {
          q: "Ce rezultate pot să mă aștept?",
          a: "Clienții noștri raportează în medie o reducere a costurilor cu 15-25% și o îmbunătățire a fluxului de numerar în primele 6 luni de colaborare.",
        },
      ],
      pricing: {
        priceLabel: "Proiect personalizat",
        features: [
          "Diagnostic gratuit",
          "Plan de acțiune detaliat",
          "Implementare asistată",
          "Raport de progres lunar",
        ],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Discuție despre buget",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Diagnostic gratuit al afacerii",
      offerSub: "60 minute · raport în 72 ore · fără obligații.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Consultanță care produce rezultate",
      bodyIntro:
        "Oferim consultanță strategică bazată pe date — nu teorie abstractă — pentru optimizarea fiscală, reducerea costurilor și accelerarea creșterii afacerii tale.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "lightbulb",
          title: "Налоговое планирование",
          text: "Оптимальная структура бизнеса для законного снижения налогов.",
        },
        {
          icon: "trending",
          title: "Оптимизация затрат",
          text: "Детальный анализ операционных затрат и выявление экономии.",
        },
        {
          icon: "zap",
          title: "Цифровая трансформация",
          text: "Внедрение облачного бухгалтерского ПО, автоматизаций и управленческих дашбордов.",
        },
        {
          icon: "shield",
          title: "Оценка рисков",
          text: "Карта финансовых, операционных и комплаенс-рисков.",
        },
        {
          icon: "briefcase",
          title: "Стратегия роста",
          text: "Бизнес-план, анализ рынка и выявление возможностей для расширения.",
        },
        {
          icon: "users",
          title: "Предпринимательское наставничество",
          text: "Индивидуальные сессии со старшими консультантами для стратегических решений.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Первичная диагностика",
          d: "Анализируем текущую ситуацию: финансы, процессы, риски и возможности.",
        },
        {
          n: "02",
          t: "План вмешательства",
          d: "Предлагаем структурированный план с чёткими целями, KPI и сроками.",
        },
        {
          n: "03",
          t: "Внедрение",
          d: "Работаем совместно с вашей командой по внедрению рекомендаций.",
        },
        {
          n: "04",
          t: "Мониторинг результатов",
          d: "Отслеживаем прогресс и корректируем стратегию в зависимости от развития.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Как определяется цена консалтингового проекта?",
          a: "Цена зависит от сложности, длительности проекта и выделяемых ресурсов. После первичной диагностики мы предлагаем фиксированное предложение — без сюрпризов.",
        },
        {
          q: "Работаете ли вы с малым бизнесом или только с корпорациями?",
          a: "Мы работаем с компаниями всех размеров — от стартапов с 2 сотрудниками до компаний с сотнями человек. Адаптируем подход к ресурсам и целям каждого клиента.",
        },
        {
          q: "Каких результатов я могу ожидать?",
          a: "Наши клиенты в среднем сообщают о снижении затрат на 15-25% и улучшении денежного потока в первые 6 месяцев сотрудничества.",
        },
      ],
      pricing: {
        priceLabel: "Индивидуальный проект",
        features: [
          "Бесплатная диагностика",
          "Детальный план действий",
          "Сопровождаемое внедрение",
          "Ежемесячный отчёт о прогрессе",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Обсудить бюджет",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Бесплатная диагностика бизнеса",
      offerSub: "60 минут · отчёт за 72 ч · без обязательств.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Консалтинг, который даёт результаты",
      bodyIntro:
        "Мы предоставляем стратегический консалтинг, основанный на данных, а не абстрактной теории — для налоговой оптимизации, снижения затрат и ускорения роста вашего бизнеса.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "lightbulb",
          title: "Tax planning",
          text: "Optimal business structure for legally minimising taxes.",
        },
        {
          icon: "trending",
          title: "Cost optimisation",
          text: "Detailed analysis of operating costs and identification of savings.",
        },
        {
          icon: "zap",
          title: "Digital transformation",
          text: "Cloud accounting software implementation, automation and management dashboards.",
        },
        {
          icon: "shield",
          title: "Risk assessment",
          text: "Mapping of financial, operational and compliance risks.",
        },
        {
          icon: "briefcase",
          title: "Growth strategy",
          text: "Business plan, market assessment and expansion opportunity identification.",
        },
        {
          icon: "users",
          title: "Entrepreneurial mentoring",
          text: "1-on-1 sessions with senior consultants for strategic decisions.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "Initial diagnostic",
          d: "We analyse the current situation: finances, processes, risks and opportunities.",
        },
        {
          n: "02",
          t: "Intervention plan",
          d: "We propose a structured plan with clear objectives, KPIs and timelines.",
        },
        {
          n: "03",
          t: "Implementation",
          d: "We work alongside your team to implement recommendations.",
        },
        {
          n: "04",
          t: "Results monitoring",
          d: "We track progress and adjust strategy based on developments.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "How is the price for a consulting project determined?",
          a: "The price depends on complexity, project duration and allocated resources. We offer a fixed quote after the initial diagnostic — no surprises.",
        },
        {
          q: "Do you work with small businesses or only corporations?",
          a: "We work with companies of all sizes — from start-ups with 2 employees to companies with hundreds of people. We adapt our approach to the resources and goals of each client.",
        },
        {
          q: "What results can I expect?",
          a: "Our clients report on average a 15-25% reduction in costs and improved cash flow within the first 6 months of engagement.",
        },
      ],
      pricing: {
        priceLabel: "Custom project",
        features: [
          "Free diagnostic",
          "Detailed action plan",
          "Assisted implementation",
          "Monthly progress report",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "Discuss budget",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Free business diagnostic",
      offerSub: "60 minutes · report in 72h · no obligations.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Consulting that delivers results",
      bodyIntro:
        "We provide data-driven strategic consulting — not abstract theory — for tax optimisation, cost reduction and accelerating your business growth.",
    },
  },
  hr: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "users",
          title: "Onboarding documentar",
          text: "Întocmirea contractelor și a fișelor de post pentru angajații nou-angajați de client.",
        },
        {
          icon: "file-text",
          title: "Administrare personal",
          text: "Contracte individuale de muncă, ordine, registru de personal, dosare angajați.",
        },
        {
          icon: "briefcase",
          title: "Payroll & salarizare",
          text: "Calcul salarii, prime, rețineri, fluturași și raportare CNAS/CNAM/SFS.",
        },
        {
          icon: "shield",
          title: "Politici interne & GDPR",
          text: "Regulament intern, politici de confidențialitate, registru prelucrare date.",
        },
        {
          icon: "check-circle",
          title: "Audit HR & conformitate",
          text: "Verificarea conformității dosarelor, identificarea riscurilor și recomandări.",
        },
        {
          icon: "trending",
          title: "Raportare & KPI HR",
          text: "Rapoarte periodice privind fluctuația personalului, costul muncii și performanța.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Audit HR inițial",
          d: "Evaluăm structura de personal, dosarele existente și riscurile de conformitate.",
        },
        {
          n: "02",
          t: "Plan de acțiune",
          d: "Stabilim prioritățile, fluxurile de lucru și calendarul de implementare.",
        },
        {
          n: "03",
          t: "Preluare și operare",
          d: "Preluăm administrarea HR, actualizăm documentele și asigurăm conformitatea.",
        },
        {
          n: "04",
          t: "Raportare lunară",
          d: "Livrăm rapoarte de payroll, actualizăm dosarele și informăm despre modificări legislative.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Pot externaliza complet administrarea HR-ului?",
          a: "Da, preluăm întreaga administrare HR — de la contracte și ordine până la payroll și raportare CNAS/CNAM — fără să ai nevoie de un specialist intern.",
        },
        {
          q: "Cât durează preluarea dosarelor de la un alt furnizor HR?",
          a: "Procesul de tranziție durează între 5 și 10 zile lucrătoare. Verificăm, actualizăm și structurăm dosarele fără întreruperea activității.",
        },
        {
          q: "Oferiți și servicii de recrutare?",
          a: "Nu — nu facem recrutare (anunțuri, screening CV-uri, interviuri). Ne ocupăm exclusiv de administrarea relațiilor de muncă pentru angajații deja angajați de companie: contracte, payroll, raportare CNAS/CNAM și conformitate.",
        },
      ],
      pricing: {
        priceLabel: "De la 1 200 MDL/lună",
        features: [
          "Manager HR dedicat",
          "Payroll inclus",
          "Conformitate legislativă",
          "Raport lunar",
        ],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Audit HR gratuit",
      offerSub: "30 minute · raport în 48 ore · fără obligații.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "HR extern, fără griji",
      bodyIntro:
        "Preluăm administrarea relațiilor de muncă pentru angajații existenți — contracte, payroll, raportare CNAS/CNAM și conformitate cu Codul Muncii. Facturare per angajat acoperit, fără minim contractual. Nu oferim servicii de recrutare.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "users",
          title: "Документальный онбординг",
          text: "Оформление трудовых договоров и должностных инструкций для сотрудников, нанятых клиентом.",
        },
        {
          icon: "file-text",
          title: "Кадровое делопроизводство",
          text: "Трудовые договоры, приказы, личные карточки и личные дела сотрудников.",
        },
        {
          icon: "briefcase",
          title: "Расчёт заработной платы",
          text: "Начисление зарплат, премий, удержаний, расчётные листы и отчётность CNAS/CNAM/SFS.",
        },
        {
          icon: "shield",
          title: "Внутренние политики и GDPR",
          text: "Правила внутреннего распорядка, политика конфиденциальности, реестр обработки данных.",
        },
        {
          icon: "check-circle",
          title: "HR-аудит и соответствие",
          text: "Проверка личных дел, выявление рисков и рекомендации по устранению.",
        },
        {
          icon: "trending",
          title: "HR-отчётность и KPI",
          text: "Периодические отчёты о текучести кадров, затратах на персонал и эффективности.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Первичный HR-аудит",
          d: "Оцениваем структуру персонала, существующие дела и риски соответствия.",
        },
        {
          n: "02",
          t: "План действий",
          d: "Определяем приоритеты, рабочие процессы и график внедрения.",
        },
        {
          n: "03",
          t: "Принятие и операционная работа",
          d: "Берём на себя HR-администрирование, обновляем документы и обеспечиваем соответствие.",
        },
        {
          n: "04",
          t: "Ежемесячная отчётность",
          d: "Предоставляем отчёты по зарплате, обновляем личные дела и информируем об изменениях законодательства.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Могу ли я полностью отдать HR на аутсорсинг?",
          a: "Да, мы берём на себя всё кадровое администрирование — от договоров и приказов до расчёта зарплат и отчётности CNAS/CNAM — без необходимости содержать собственного специалиста.",
        },
        {
          q: "Сколько времени занимает приём дел от другого HR-провайдера?",
          a: "Процесс перехода занимает от 5 до 10 рабочих дней. Мы проверяем, обновляем и структурируем личные дела без прерывания деятельности.",
        },
        {
          q: "Оказываете ли вы услуги подбора персонала?",
          a: "Нет — мы не занимаемся подбором (объявления, скрининг резюме, собеседования). Занимаемся исключительно администрированием трудовых отношений уже принятых сотрудников: договоры, расчёт зарплат, отчётность CNAS/CNAM и соответствие законодательству.",
        },
      ],
      pricing: {
        priceLabel: "От 1 200 MDL/мес.",
        features: [
          "Персональный HR-менеджер",
          "Расчёт зарплат включён",
          "Соответствие законодательству",
          "Ежемесячный отчёт",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Все тарифы",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Бесплатный HR-аудит",
      offerSub: "30 минут · отчёт за 48 ч · без обязательств.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Аутсорсинг HR без забот",
      bodyIntro:
        "Берём на себя администрирование трудовых отношений уже принятых сотрудников — договоры, расчёт зарплат, отчётность CNAS/CNAM и соответствие Трудовому кодексу. Оплата за каждого сотрудника под управлением, без минимального контракта. Услуги подбора персонала не оказываем.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "users",
          title: "Documentary onboarding",
          text: "Drafting employment contracts and job descriptions for employees you've hired.",
        },
        {
          icon: "file-text",
          title: "Personnel administration",
          text: "Employment contracts, orders, personnel register and employee files.",
        },
        {
          icon: "briefcase",
          title: "Payroll",
          text: "Salary calculations, bonuses, deductions, payslips and CNAS/CNAM/SFS reporting.",
        },
        {
          icon: "shield",
          title: "Internal policies & GDPR",
          text: "Internal regulations, privacy policies and data processing register.",
        },
        {
          icon: "check-circle",
          title: "HR audit & compliance",
          text: "File review, risk identification and corrective recommendations.",
        },
        {
          icon: "trending",
          title: "HR reporting & KPIs",
          text: "Periodic reports on staff turnover, labour costs and performance.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "Initial HR audit",
          d: "We assess the personnel structure, existing files and compliance risks.",
        },
        {
          n: "02",
          t: "Action plan",
          d: "We set priorities, workflows and an implementation schedule.",
        },
        {
          n: "03",
          t: "Takeover & operation",
          d: "We take over HR administration, update documents and ensure compliance.",
        },
        {
          n: "04",
          t: "Monthly reporting",
          d: "We deliver payroll reports, update files and inform on legislative changes.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "Can I fully outsource HR administration?",
          a: "Yes, we take over complete HR administration — from contracts and orders to payroll and CNAS/CNAM reporting — without needing an in-house specialist.",
        },
        {
          q: "How long does it take to transfer files from another HR provider?",
          a: "The transition takes between 5 and 10 working days. We review, update and organise files without interrupting your operations.",
        },
        {
          q: "Do you offer recruitment services?",
          a: "No — we don't do recruiting (job ads, CV screening, interviews). We handle exclusively the administration of employment relationships for people you've already hired: contracts, payroll, CNAS/CNAM reporting and compliance.",
        },
      ],
      pricing: {
        priceLabel: "From MDL 1,200/mo",
        features: [
          "Dedicated HR manager",
          "Payroll included",
          "Legal compliance",
          "Monthly report",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Free HR audit",
      offerSub: "30 minutes · report in 48h · no obligations.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Outsourced HR, zero hassle",
      bodyIntro:
        "We take over employment-relationship administration for your existing employees — contracts, payroll, CNAS/CNAM reporting and Labour Code compliance. Billed per covered employee, no minimum contract. We don't offer recruitment services.",
    },
  },
  it: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "zap",
          title: "Web design și site-uri",
          text: "Crearea și mentenanța site-urilor de prezentare și a magazinelor online — design, dezvoltare, hosting, suport.",
        },
        {
          icon: "trending",
          title: "Automatizare contabilă",
          text: "Conectare flux documente contabile, automatizare declarații și rapoarte periodice.",
        },
        {
          icon: "shield",
          title: "Securitate cibernetică",
          text: "Audit de securitate, backup date, politici de acces și conformitate GDPR la nivel IT.",
        },
        {
          icon: "briefcase",
          title: "Digitalizare procese",
          text: "Analiza fluxurilor existente și implementarea soluțiilor digitale pentru eficientizare.",
        },
        {
          icon: "file-text",
          title: "Suport tehnic",
          text: "Helpdesk dedicat, mentenanță sisteme și suport prioritar pentru utilizatori.",
        },
        {
          icon: "lightbulb",
          title: "Consultanță IT strategică",
          text: "Evaluarea peisajului tehnologic și recomandări de investiții IT aliniate obiectivelor de business.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Audit IT inițial",
          d: "Evaluăm infrastructura, sistemele și procesele existente pentru a identifica oportunități.",
        },
        {
          n: "02",
          t: "Propunere & plan de proiect",
          d: "Prezentăm soluțiile recomandate cu costuri, termene și beneficii clare.",
        },
        {
          n: "03",
          t: "Implementare & configurare",
          d: "Implementăm soluțiile, migrăm datele și instruim echipa.",
        },
        {
          n: "04",
          t: "Suport & optimizare continuă",
          d: "Monitorizăm sistemele, rezolvăm incidentele și optimizăm performanța.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Ce servicii IT oferiți concret?",
          a: "Analiză și audit IT, securitatea datelor și a infrastructurii, soluții de digitalizare și automatizare a proceselor, web design și crearea/mentenanța site-urilor, backup și recuperare, mentenanța calculatoarelor și a rețelelor.",
        },
        {
          q: "Cum se facturează consultanța IT?",
          a: "La tariful de 1500 lei/oră, facturate lunar pe baza orelor efectiv lucrate. Pentru proiecte previzibile (ex. crearea unui site) oferim ofertă fixă după briefing inițial.",
        },
        {
          q: "Aveți contracte de mentenanță continuă?",
          a: "Da — pentru clienții care vor monitorizare permanentă a infrastructurii (backup automat, actualizări, intervenție rapidă la incidente), oferim contracte lunare cu SLA garantat și răspuns sub 4 ore în zile lucrătoare.",
        },
      ],
      pricing: {
        priceLabel: "De la 12 000 MDL/proiect",
        features: [
          "Audit IT gratuit",
          "Plan de proiect detaliat",
          "Implementare asistată",
          "Suport post-lansare",
        ],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Audit IT gratuit",
      offerSub: "60 minute · propunere în 72 ore · fără obligații.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Tehnologie în slujba afacerii tale",
      bodyIntro:
        "Audit IT, securitate, digitalizare și automatizare a proceselor, web design și mentenanță — facturate la oră (1500 lei/oră) sau prin contracte de mentenanță continuă cu SLA garantat.",
    },
    ru: {
      includedHeading: "Что включено",
      includedItems: [
        {
          icon: "zap",
          title: "Веб-дизайн и сайты",
          text: "Создание и обслуживание сайтов-визиток и интернет-магазинов — дизайн, разработка, хостинг, поддержка.",
        },
        {
          icon: "trending",
          title: "Автоматизация бухгалтерии",
          text: "Интеграция документооборота, автоматизация деклараций и периодических отчётов.",
        },
        {
          icon: "shield",
          title: "Кибербезопасность",
          text: "Аудит безопасности, резервное копирование, политики доступа и IT-соответствие GDPR.",
        },
        {
          icon: "briefcase",
          title: "Цифровизация процессов",
          text: "Анализ существующих потоков и внедрение цифровых решений для повышения эффективности.",
        },
        {
          icon: "file-text",
          title: "Техническая поддержка",
          text: "Выделенный helpdesk, техническое обслуживание систем и приоритетная поддержка пользователей.",
        },
        {
          icon: "lightbulb",
          title: "Стратегический IT-консалтинг",
          text: "Оценка технологического ландшафта и рекомендации по IT-инвестициям в соответствии с бизнес-целями.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Первичный IT-аудит",
          d: "Оцениваем инфраструктуру, системы и процессы для выявления возможностей.",
        },
        {
          n: "02",
          t: "Предложение и план проекта",
          d: "Представляем рекомендуемые решения с чёткими затратами, сроками и выгодами.",
        },
        {
          n: "03",
          t: "Внедрение и настройка",
          d: "Реализуем решения, мигрируем данные и обучаем команду.",
        },
        {
          n: "04",
          t: "Поддержка и постоянная оптимизация",
          d: "Мониторим системы, устраняем инциденты и оптимизируем производительность.",
        },
      ],
      faqHeading: "Часто задаваемые вопросы",
      faqItems: [
        {
          q: "Какие IT-услуги вы оказываете конкретно?",
          a: "Анализ и IT-аудит, безопасность данных и инфраструктуры, цифровизация и автоматизация процессов, веб-дизайн и создание/обслуживание сайтов, резервное копирование и восстановление, обслуживание компьютеров и сетей.",
        },
        {
          q: "Как тарифицируется IT-консалтинг?",
          a: "По тарифу 1500 леев/час, оплата ежемесячно на основе фактически отработанных часов. Для прогнозируемых проектов (например, создание сайта) предлагаем фиксированную смету после первичного брифа.",
        },
        {
          q: "Есть ли у вас контракты на постоянное обслуживание?",
          a: "Да — для клиентов, которым нужен постоянный мониторинг инфраструктуры (автоматический бэкап, обновления, быстрая реакция на инциденты), предлагаем ежемесячные контракты с гарантированным SLA и ответом менее 4 часов в рабочие дни.",
        },
      ],
      pricing: {
        priceLabel: "От 12 000 MDL/проект",
        features: [
          "Бесплатный IT-аудит",
          "Детальный план проекта",
          "Сопровождаемое внедрение",
          "Поддержка после запуска",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвонить · ${SITE_PHONE}`,
        allPricingLabel: "Все тарифы",
      },
      offerEyebrow: "ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Бесплатный IT-аудит",
      offerSub: "60 минут · предложение за 72 ч · без обязательств.",
      relatedHeading: "Связанные услуги",
      bodyIntroHeading: "Технологии на службе вашего бизнеса",
      bodyIntro:
        "IT-аудит, безопасность, цифровизация и автоматизация процессов, веб-дизайн и обслуживание — оплата почасовая (1500 леев/час) или через контракты на постоянное обслуживание с гарантированным SLA.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "zap",
          title: "Web design and websites",
          text: "Creating and maintaining presentation sites and online shops — design, development, hosting, support.",
        },
        {
          icon: "trending",
          title: "Accounting automation",
          text: "Document flow integration, automated declarations and periodic reporting.",
        },
        {
          icon: "shield",
          title: "Cybersecurity",
          text: "Security audit, data backup, access policies and IT-level GDPR compliance.",
        },
        {
          icon: "briefcase",
          title: "Process digitisation",
          text: "Analysis of existing flows and implementation of digital solutions for efficiency gains.",
        },
        {
          icon: "file-text",
          title: "Technical support",
          text: "Dedicated helpdesk, system maintenance and priority support for users.",
        },
        {
          icon: "lightbulb",
          title: "Strategic IT consulting",
          text: "Technology landscape assessment and IT investment recommendations aligned with business goals.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "Initial IT audit",
          d: "We assess the infrastructure, systems and processes to identify opportunities.",
        },
        {
          n: "02",
          t: "Proposal & project plan",
          d: "We present recommended solutions with clear costs, timelines and benefits.",
        },
        {
          n: "03",
          t: "Implementation & configuration",
          d: "We implement solutions, migrate data and train the team.",
        },
        {
          n: "04",
          t: "Ongoing support & optimisation",
          d: "We monitor systems, resolve incidents and optimise performance.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "What IT services do you actually offer?",
          a: "IT analysis and audit, data and infrastructure security, digitisation and process automation, web design and site creation/maintenance, backup and recovery, computer and network maintenance.",
        },
        {
          q: "How is IT consulting billed?",
          a: "At 1500 MDL/hour, invoiced monthly based on hours actually worked. For predictable projects (e.g. building a website) we provide a fixed quote after the initial brief.",
        },
        {
          q: "Do you offer ongoing maintenance contracts?",
          a: "Yes — for clients who want continuous infrastructure monitoring (automatic backup, updates, fast incident response), we offer monthly contracts with a guaranteed SLA and reply under 4 hours on business days.",
        },
      ],
      pricing: {
        priceLabel: "From MDL 12,000/project",
        features: [
          "Free IT audit",
          "Detailed project plan",
          "Assisted implementation",
          "Post-launch support",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Free IT audit",
      offerSub: "60 minutes · proposal in 72h · no obligations.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Technology at the service of your business",
      bodyIntro:
        "IT audit, security, process digitisation and automation, web design and maintenance — billed hourly (1500 MDL/hour) or via ongoing maintenance contracts with guaranteed SLA.",
    },
  },
};

export function getServiceData(id: string, locale: Locale): ServicePageData | undefined {
  return data[id as ServiceId]?.[locale];
}
