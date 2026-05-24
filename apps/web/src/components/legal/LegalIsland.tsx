import { Icon, PageHeader } from "@expertcont/ui";
import { I18nRoot, homeUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import { site } from "../../site";

const EMAIL = site.business.email;
const PHONE = site.business.phone;
const LEGAL_NAME = site.business.name;
const ADDR_RO = `${site.business.address.street.ro}, ${site.business.address.city.ro}, ${site.business.address.postalCode}`;
const ADDR_RU = `${site.business.address.street.ru}, ${site.business.address.city.ru}, ${site.business.address.postalCode}`;
const ADDR_EN = `${site.business.address.street.en}, ${site.business.address.city.en}, ${site.business.address.postalCode}`;

const breadcrumbLabels: Record<Locale, { home: string; legal: string }> = {
  ro: { home: "Acasă", legal: "Legal" },
  ru: { home: "Главная", legal: "Правовая информация" },
  en: { home: "Home", legal: "Legal" },
};

export type LegalKind = "privacy" | "terms" | "cookies";

export interface LegalIslandProps {
  locale: Locale;
  kind: LegalKind;
  contactHref: string;
}

interface LegalSection {
  h: string;
  t: string;
}

interface LegalData {
  title: string;
  lastUpdated: string;
  updated: string;
  sections: LegalSection[];
  questionsTitle: string;
  questionsBody: string;
  questionsEmail: string;
  questionsBtn: string;
}

type ContentMap = Record<Locale, Record<LegalKind, LegalData>>;

const content: ContentMap = {
  ro: {
    privacy: {
      title: "Politica de confidențialitate",
      lastUpdated: "Ultima actualizare",
      updated: "1 mai 2026",
      sections: [
        {
          h: "1. Cine suntem",
          t: `${LEGAL_NAME}, cu sediul în ${ADDR_RO}, este operatorul de date personale pentru scopurile descrise mai jos. Ne puteți contacta la ${EMAIL} pentru orice întrebare legată de prelucrarea datelor dumneavoastră.`,
        },
        {
          h: "2. Ce date colectăm",
          t: "Colectăm doar datele necesare pentru a oferi serviciile contractate: nume, email, telefon, datele companiei tale, documente financiare și juridice transmise pentru procesare. Nu colectăm date sensibile fără consimțământ explicit.",
        },
        {
          h: "3. Cum folosim datele",
          t: "Datele tale sunt folosite exclusiv pentru: (a) executarea contractului de servicii, (b) îndeplinirea obligațiilor legale (raportare fiscală, audit), (c) comunicări tehnice și administrative legate de cont. Nu vindem și nu împărtășim datele cu terțe părți în scopuri comerciale.",
        },
        {
          h: "4. Stocare și securitate",
          t: "Datele sunt stocate pe servere securizate în UE, cu criptare la transfer (TLS 1.3) și criptare la repaus. Accesul este restricționat doar la membrii echipei direct implicați în deservirea contului tău, cu autentificare în doi pași obligatorie.",
        },
        {
          h: "5. Drepturile tale",
          t: `Ai dreptul de acces, rectificare, ștergere, portabilitate și opoziție conform Legii 133/2011 a Republicii Moldova privind protecția datelor cu caracter personal. Pentru exercitarea acestor drepturi, contactează-ne la ${EMAIL}. Răspundem în maxim 30 de zile calendaristice.`,
        },
        {
          h: "6. Perioada de păstrare",
          t: "Datele sunt păstrate pe durata contractului și 10 ani după încheierea acestuia, conform legislației contabile și fiscale din Republica Moldova. La expirarea perioadei, datele sunt șterse în mod securizat.",
        },
      ],
      questionsTitle: "Ai întrebări?",
      questionsBody: `Pentru orice clarificare legată de acest document, contactează-ne la ${EMAIL} sau la ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contactează-ne",
    },
    cookies: {
      title: "Politica de cookie-uri",
      lastUpdated: "Ultima actualizare",
      updated: "1 mai 2026",
      sections: [
        {
          h: "1. Ce sunt cookie-urile",
          t: "Cookie-urile sunt fișiere mici stocate pe dispozitivul tău atunci când vizitezi site-ul nostru. Acestea ne ajută să îmbunătățim experiența ta, să înțelegem cum este utilizat site-ul și să personalizăm conținutul afișat.",
        },
        {
          h: "2. Tipuri de cookie-uri",
          t: "Folosim trei categorii de cookie-uri: esențiale (necesare pentru funcționarea site-ului), analitice (pentru a înțelege utilizarea) și marketing (pentru personalizare). Fiecare categorie are un scop specific și durate de expirare diferite.",
        },
        {
          h: "3. Cookie-uri esențiale",
          t: "Aceste cookie-uri sunt necesare pentru funcționarea site-ului — autentificare, preferințe de limbă, sesiuni de utilizator. Nu pot fi dezactivate, deoarece fără ele site-ul nu ar funcționa corect. Nu stochează date personale identificabile.",
        },
        {
          h: "4. Cookie-uri analitice",
          t: "Utilizăm Plausible Analytics, o alternativă privacy-friendly la Google Analytics, pentru a înțelege traficul pe site. Plausible nu folosește cookie-uri de tracking și nu colectează date personale identificabile.",
        },
        {
          h: "5. Cum să gestionezi cookie-urile",
          t: "Poți accepta sau respinge cookie-urile prin bannerul afișat la prima vizită. Poți modifica preferințele oricând din setările browser-ului sau prin link-ul din footer. Retragerea consimțământului nu afectează legalitatea prelucrării anterioare.",
        },
      ],
      questionsTitle: "Ai întrebări despre cookie-uri?",
      questionsBody: `Dacă ai întrebări despre politica noastră de cookie-uri, contactează-ne la ${EMAIL}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contactează-ne",
    },
    terms: {
      title: "Termeni și condiții",
      lastUpdated: "Ultima actualizare",
      updated: "1 mai 2026",
      sections: [
        {
          h: "1. Acceptarea termenilor",
          t: "Utilizarea acestui site și a serviciilor ExpertCont implică acceptarea integrală a acestor termeni și condiții. Dacă nu ești de acord cu oricare dintre prevederi, te rugăm să nu utilizezi site-ul sau serviciile noastre.",
        },
        {
          h: "2. Serviciile oferite",
          t: "ExpertCont oferă servicii de contabilitate, consultanță fiscală, juridică, HR și IT pentru companii din Republica Moldova. Detaliile specifice privind volumul de muncă, termenele și livrabilele sunt stipulate în contractele individuale semnate cu fiecare client.",
        },
        {
          h: "3. Proprietate intelectuală",
          t: "Conținutul site-ului (texte, imagini, logo, grafice, structura vizuală) este proprietatea exclusivă a ExpertCont și este protejat de legislația privind drepturile de autor din Republica Moldova. Utilizarea fără acord scris prealabil este interzisă.",
        },
        {
          h: "4. Răspundere",
          t: "Informațiile de pe site au caracter general informativ și nu constituie consultanță fiscală, contabilă sau juridică personalizată. Pentru recomandări specifice situației dumneavoastră, vă rugăm să contactați direct echipa noastră. ExpertCont nu este responsabilă pentru decizii luate exclusiv pe baza informațiilor de pe site.",
        },
        {
          h: "5. Modificări ale termenilor",
          t: "Ne rezervăm dreptul de a modifica acești termeni în orice moment, fără notificare prealabilă. Versiunea actualizată va fi disponibilă pe această pagină, cu data ultimei modificări indicată în antet. Continuarea utilizării site-ului după modificări implică acceptarea noilor termeni.",
        },
        {
          h: "6. Legea aplicabilă",
          t: "Aceste termene și condiții sunt guvernate de legislația Republicii Moldova. Orice litigiu apărut în legătură cu utilizarea site-ului sau a serviciilor va fi soluționat de instanțele judecătorești competente din mun. Chișinău.",
        },
      ],
      questionsTitle: "Ai întrebări?",
      questionsBody: `Pentru orice clarificare legată de acești termeni, contactează-ne la ${EMAIL} sau la ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contactează-ne",
    },
  },
  ru: {
    privacy: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление",
      updated: "1 мая 2026",
      sections: [
        {
          h: "1. Кто мы такие",
          t: `${LEGAL_NAME}, зарегистрированная по адресу: ${ADDR_RU}, является оператором персональных данных в целях, описанных ниже. Вы можете связаться с нами по адресу ${EMAIL} по любым вопросам, связанным с обработкой ваших данных.`,
        },
        {
          h: "2. Какие данные мы собираем",
          t: "Мы собираем только данные, необходимые для предоставления договорных услуг: имя, email, телефон, данные компании, финансовые и юридические документы, переданные для обработки. Мы не собираем конфиденциальные данные без явного согласия.",
        },
        {
          h: "3. Как мы используем данные",
          t: "Ваши данные используются исключительно для: (а) исполнения договора об оказании услуг, (б) выполнения юридических обязательств (налоговая отчётность, аудит), (в) технических и административных коммуникаций, связанных с вашим аккаунтом. Мы не продаём и не передаём данные третьим сторонам в коммерческих целях.",
        },
        {
          h: "4. Хранение и безопасность",
          t: "Данные хранятся на защищённых серверах в ЕС с шифрованием при передаче (TLS 1.3) и шифрованием в состоянии покоя. Доступ ограничен только членами команды, непосредственно участвующими в обслуживании вашего аккаунта, с обязательной двухфакторной аутентификацией.",
        },
        {
          h: "5. Ваши права",
          t: `Вы имеете право на доступ, исправление, удаление, переносимость и возражение в соответствии с Законом 133/2011 Республики Молдова о защите персональных данных. Для осуществления этих прав свяжитесь с нами по адресу ${EMAIL}. Мы отвечаем в течение 30 календарных дней.`,
        },
        {
          h: "6. Срок хранения данных",
          t: "Данные хранятся в течение срока действия договора и 10 лет после его окончания в соответствии с бухгалтерским и налоговым законодательством Республики Молдова. По истечении срока данные надёжно удаляются.",
        },
      ],
      questionsTitle: "Есть вопросы?",
      questionsBody: `По любым вопросам, связанным с этим документом, свяжитесь с нами по адресу ${EMAIL} или по телефону ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Связаться с нами",
    },
    cookies: {
      title: "Политика использования cookie",
      lastUpdated: "Последнее обновление",
      updated: "1 мая 2026",
      sections: [
        {
          h: "1. Что такое cookie-файлы",
          t: "Cookie-файлы — это небольшие файлы, сохраняемые на вашем устройстве при посещении нашего сайта. Они помогают нам улучшать ваш опыт, понимать, как используется сайт, и персонализировать отображаемый контент.",
        },
        {
          h: "2. Типы cookie-файлов",
          t: "Мы используем три категории cookie-файлов: необходимые (для функционирования сайта), аналитические (для понимания использования) и маркетинговые (для персонализации). Каждая категория имеет конкретную цель и разные сроки хранения.",
        },
        {
          h: "3. Необходимые cookie-файлы",
          t: "Эти cookie-файлы необходимы для работы сайта — аутентификация, языковые предпочтения, пользовательские сессии. Их нельзя отключить, поскольку без них сайт не будет работать корректно. Они не хранят идентифицируемые персональные данные.",
        },
        {
          h: "4. Аналитические cookie-файлы",
          t: "Мы используем Plausible Analytics — privacy-friendly альтернативу Google Analytics — для понимания трафика на сайте. Plausible не использует трекинговые cookie и не собирает идентифицируемые персональные данные.",
        },
        {
          h: "5. Как управлять cookie-файлами",
          t: "Вы можете принять или отклонить cookie-файлы через баннер, отображаемый при первом посещении. Вы можете изменить предпочтения в любое время через настройки браузера или по ссылке в футере. Отзыв согласия не влияет на законность ранее проведённой обработки.",
        },
      ],
      questionsTitle: "Вопросы о cookie-файлах?",
      questionsBody: `Если у вас есть вопросы о нашей политике использования cookie, свяжитесь с нами по адресу ${EMAIL}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Связаться с нами",
    },
    terms: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление",
      updated: "1 мая 2026",
      sections: [
        {
          h: "1. Принятие условий",
          t: "Использование данного сайта и услуг ExpertCont означает полное принятие настоящих условий использования. Если вы не согласны с каким-либо из положений, просим вас не использовать сайт или наши услуги.",
        },
        {
          h: "2. Предоставляемые услуги",
          t: "ExpertCont предоставляет услуги бухгалтерского учёта, налогового, юридического, HR и IT-консалтинга для компаний Республики Молдова. Конкретные детали объёма работ, сроков и результатов указываются в индивидуальных договорах, подписанных с каждым клиентом.",
        },
        {
          h: "3. Интеллектуальная собственность",
          t: "Содержимое сайта (тексты, изображения, логотип, графика, визуальная структура) является исключительной собственностью ExpertCont и защищено законодательством Республики Молдова об авторских правах. Использование без предварительного письменного согласия запрещено.",
        },
        {
          h: "4. Ответственность",
          t: "Информация на сайте носит общий информационный характер и не является персонализированной налоговой, бухгалтерской или юридической консультацией. Для рекомендаций, соответствующих вашей конкретной ситуации, обратитесь непосредственно к нашей команде. ExpertCont не несёт ответственности за решения, принятые исключительно на основе информации с сайта.",
        },
        {
          h: "5. Изменения условий",
          t: "Мы оставляем за собой право изменять настоящие условия в любое время без предварительного уведомления. Обновлённая версия будет доступна на этой странице с указанием даты последнего изменения в заголовке. Продолжение использования сайта после изменений означает принятие новых условий.",
        },
        {
          h: "6. Применимое право",
          t: "Настоящие условия использования регулируются законодательством Республики Молдова. Любой спор, возникший в связи с использованием сайта или услуг, будет разрешён компетентными судебными инстанциями мун. Кишинёв.",
        },
      ],
      questionsTitle: "Есть вопросы?",
      questionsBody: `По любым вопросам, связанным с настоящими условиями, свяжитесь с нами по адресу ${EMAIL} или по телефону ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Связаться с нами",
    },
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      updated: "May 1, 2026",
      sections: [
        {
          h: "1. Who We Are",
          t: `${LEGAL_NAME}, registered at ${ADDR_EN}, is the data controller for the purposes described below. You can contact us at ${EMAIL} for any questions related to the processing of your data.`,
        },
        {
          h: "2. What Data We Collect",
          t: "We collect only the data necessary to provide the contracted services: name, email, phone number, company details, financial and legal documents submitted for processing. We do not collect sensitive data without explicit consent.",
        },
        {
          h: "3. How We Use Data",
          t: "Your data is used exclusively for: (a) executing the service agreement, (b) fulfilling legal obligations (tax reporting, audit), (c) technical and administrative communications related to your account. We do not sell or share data with third parties for commercial purposes.",
        },
        {
          h: "4. Storage and Security",
          t: "Data is stored on secure servers in the EU with encryption in transit (TLS 1.3) and encryption at rest. Access is restricted to team members directly involved in servicing your account, with mandatory two-factor authentication.",
        },
        {
          h: "5. Your Rights",
          t: `You have the right of access, rectification, erasure, portability, and objection under Law 133/2011 of the Republic of Moldova on personal data protection. To exercise these rights, contact us at ${EMAIL}. We respond within 30 calendar days.`,
        },
        {
          h: "6. Retention Period",
          t: "Data is retained for the duration of the contract and 10 years after its conclusion, in accordance with accounting and tax legislation of the Republic of Moldova. Upon expiration of the period, data is securely deleted.",
        },
      ],
      questionsTitle: "Have Questions?",
      questionsBody: `For any clarification related to this document, contact us at ${EMAIL} or at ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contact Us",
    },
    cookies: {
      title: "Cookie Policy",
      lastUpdated: "Last updated",
      updated: "May 1, 2026",
      sections: [
        {
          h: "1. What Are Cookies",
          t: "Cookies are small files stored on your device when you visit our website. They help us improve your experience, understand how the site is used, and personalize displayed content.",
        },
        {
          h: "2. Types of Cookies",
          t: "We use three categories of cookies: essential (necessary for the website to function), analytical (to understand usage), and marketing (for personalization). Each category has a specific purpose and different expiration periods.",
        },
        {
          h: "3. Essential Cookies",
          t: "These cookies are necessary for the website to function — authentication, language preferences, user sessions. They cannot be disabled, as without them the site would not work correctly. They do not store identifiable personal data.",
        },
        {
          h: "4. Analytical Cookies",
          t: "We use Plausible Analytics, a privacy-friendly alternative to Google Analytics, to understand traffic on the site. Plausible does not use tracking cookies and does not collect identifiable personal data.",
        },
        {
          h: "5. How to Manage Cookies",
          t: "You can accept or reject cookies via the banner displayed on your first visit. You can change your preferences at any time through browser settings or via the link in the footer. Withdrawing consent does not affect the lawfulness of prior processing.",
        },
      ],
      questionsTitle: "Questions About Cookies?",
      questionsBody: `If you have questions about our cookie policy, contact us at ${EMAIL}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contact Us",
    },
    terms: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated",
      updated: "May 1, 2026",
      sections: [
        {
          h: "1. Acceptance of Terms",
          t: "Use of this website and ExpertCont's services constitutes full acceptance of these terms and conditions. If you do not agree with any of the provisions, please do not use the website or our services.",
        },
        {
          h: "2. Services Provided",
          t: "ExpertCont provides accounting, tax consulting, legal, HR, and IT services for companies in the Republic of Moldova. Specific details regarding scope, timelines, and deliverables are stipulated in individual contracts signed with each client.",
        },
        {
          h: "3. Intellectual Property",
          t: "The website content (texts, images, logo, graphics, visual structure) is the exclusive property of ExpertCont and is protected by copyright law in the Republic of Moldova. Use without prior written consent is prohibited.",
        },
        {
          h: "4. Liability",
          t: "The information on the website is of a general informational nature and does not constitute personalized tax, accounting, or legal advice. For recommendations specific to your situation, please contact our team directly. ExpertCont is not responsible for decisions made solely on the basis of information from the website.",
        },
        {
          h: "5. Changes to Terms",
          t: "We reserve the right to modify these terms at any time without prior notice. The updated version will be available on this page, with the date of the last modification indicated in the header. Continued use of the site after changes implies acceptance of the new terms.",
        },
        {
          h: "6. Applicable Law",
          t: "These terms and conditions are governed by the laws of the Republic of Moldova. Any dispute arising in connection with the use of the website or services will be resolved by the competent courts of Chișinău municipality.",
        },
      ],
      questionsTitle: "Have Questions?",
      questionsBody: `For any clarification related to these terms, contact us at ${EMAIL} or at ${PHONE}.`,
      questionsEmail: EMAIL,
      questionsBtn: "Contact Us",
    },
  },
};

export default function LegalIsland({ locale, kind, contactHref }: LegalIslandProps) {
  const data = content[locale][kind];
  const labels = breadcrumbLabels[locale];

  return (
    <I18nRoot locale={locale}>
      <main>
        <PageHeader
          eyebrow={labels.legal}
          title={data.title}
          breadcrumbs={[
            { label: labels.home, href: homeUrl(locale) },
            { label: labels.legal },
            { label: data.title },
          ]}
        />

        <section className="px-6 pt-12 pb-20">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-10 flex items-center gap-3 rounded-md border border-border bg-bg-section-alt px-5 py-4">
              <Icon name="file-text" size={18} className="text-primary" />
              <span className="text-sm text-text-secondary">
                {data.lastUpdated}: <strong className="text-text-primary">{data.updated}</strong>
              </span>
            </div>

            <div className="flex flex-col gap-10">
              {data.sections.map((s, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-xl font-bold text-text-primary">{s.h}</h3>
                  <p className="text-base leading-relaxed text-text-secondary">{s.t}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-lg border border-border bg-bg-section-alt p-8">
              <h4 className="mb-3 text-lg font-bold">{data.questionsTitle}</h4>
              <p className="mb-4 text-base leading-relaxed text-text-secondary">
                {data.questionsBody.split(data.questionsEmail).map((part, idx, arr) =>
                  idx < arr.length - 1 ? (
                    <span key={idx}>
                      {part}
                      <a href={`mailto:${data.questionsEmail}`} className="text-primary">
                        {data.questionsEmail}
                      </a>
                    </span>
                  ) : (
                    <span key={idx}>{part}</span>
                  ),
                )}
              </p>
              <a
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-sm border-2 border-primary px-5 py-3 text-sm font-semibold text-primary no-underline transition"
              >
                {data.questionsBtn}
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </I18nRoot>
  );
}
