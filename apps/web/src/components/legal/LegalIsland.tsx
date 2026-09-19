import { Icon, PageHeader } from "@expertcont/ui";
import { I18nRoot, homeUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import { site } from "../../site";
import { openCookieSettings } from "../../lib/analytics";

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

const cookieSettingsLabels: Record<Locale, { title: string; body: string; button: string }> = {
  ro: {
    title: "Setări cookie-uri",
    body: "Puteți schimba oricând alegerea făcută în bannerul de cookie-uri, inclusiv retragerea consimțământului.",
    button: "Schimbă setările cookie",
  },
  ru: {
    title: "Настройки cookie",
    body: "Вы можете в любой момент изменить выбор, сделанный в баннере cookie, в том числе отозвать согласие.",
    button: "Изменить настройки cookie",
  },
  en: {
    title: "Cookie settings",
    body: "You can change the choice you made in the cookie banner at any time, including withdrawing your consent.",
    button: "Change cookie settings",
  },
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
      updated: "19 septembrie 2026",
      sections: [
        {
          h: "1. Cine suntem",
          t: `${LEGAL_NAME} (S.R.L. „RIGHT CONSULT COMPANY”, IDNO 1022600002005), cu sediul în ${ADDR_RO}, este operatorul datelor personale descrise mai jos. Ne poți contacta pentru orice întrebare despre datele tale la ${EMAIL} sau la ${PHONE}.`,
        },
        {
          h: "2. Ce date colectăm",
          t: "Prin formularele site-ului (contact, programare, ofertă, întrebări, recenzii și newsletter) colectăm numele, adresa de e-mail, telefonul și mesajul pe care ni-l trimiți. Pentru fiecare trimitere păstrăm și pagina de pe care a fost trimisă, tipul de browser și o amprentă criptată ireversibil (hash) a adresei IP, folosită doar pentru a preveni abuzurile; adresa IP propriu-zisă nu o stocăm. Pentru clienții cu contract prelucrăm datele companiei și documentele financiare și juridice transmise, inclusiv datele salariale ale angajaților lor. Nu cerem date sensibile prin site.",
        },
        {
          h: "3. Scopuri și temei legal",
          t: "(a) Să răspundem la solicitări și să pregătim o ofertă, la cererea ta, înainte de încheierea unui contract. (b) Executarea contractului de servicii contabile, juridice și de consultanță. (c) Îndeplinirea obligațiilor legale: evidență contabilă, raportare fiscală, audit. (d) Trimiterea newsletterului, doar cu consimțământul tău, pe care îl poți retrage oricând. (e) Analiza utilizării site-ului și înregistrarea sesiunilor, doar cu consimțământul dat în bannerul de cookie-uri. (f) Securitatea site-ului și prevenirea abuzurilor, în baza interesului nostru legitim.",
        },
        {
          h: "4. Cui transmitem datele",
          t: "Lucrăm cu furnizori care prelucrează datele în numele nostru, doar pentru scopurile de mai sus: Supabase (baza de date și formularele site-ului), Cloudflare (găzduirea site-ului), Telegram (notificări interne către echipă despre solicitările noi), Google (Google Analytics și Google Tag Manager, doar cu acordul tău), Microsoft (Clarity, doar cu acordul tău) și CARTO (harta de pe pagina de contact, care primește adresa IP a vizitatorului pentru a afișa harta). Microsoft primește datele din Clarity ca operator independent: le folosește și în scopuri proprii, inclusiv pentru Microsoft Advertising. Detalii în declarația de confidențialitate Microsoft: privacy.microsoft.com/privacystatement. Nu vindem datele și nu le transmitem în scopuri comerciale. Le putem transmite autorităților doar atunci când legea o cere.",
        },
        {
          h: "5. Transferuri în afara Republicii Moldova și a UE",
          t: "Unii furnizori (Google, Microsoft, Cloudflare, Telegram) pot prelucra date în afara Republicii Moldova și a Uniunii Europene, inclusiv în SUA. În aceste cazuri ne bazăm pe garanțiile oferite de furnizori, precum clauzele contractuale standard aprobate de Comisia Europeană sau certificarea EU-U.S. Data Privacy Framework. Pentru Microsoft Clarity, transferul în SUA are loc doar cu acordul tău explicit din bannerul de cookie-uri, dat după ce ai fost informat că în SUA datele pot fi mai puțin protejate decât în UE, inclusiv față de accesul autorităților (art. 49 alin. (1) lit. a) GDPR). Baza de date Supabase este găzduită în Frankfurt, Germania (Uniunea Europeană).",
        },
        {
          h: "6. Stocare și securitate",
          t: "Datele sunt transmise criptat (TLS) și stocate criptat. Accesul este limitat la membrii echipei implicați direct în solicitarea sau dosarul tău, cu autentificare în doi pași.",
        },
        {
          h: "7. Cât timp păstrăm datele",
          t: "Solicitările trimise prin site care nu devin contract: 12 luni de la ultimul contact. Datele clienților și documentele contabile: pe durata contractului și 10 ani după încheierea lui, conform legislației contabile și fiscale din Republica Moldova. Abonații la newsletter: până la dezabonare. Datele de analiză: cel mult 14 luni în Google Analytics și 13 luni în Microsoft Clarity. La expirarea termenului, datele sunt șterse în siguranță.",
        },
        {
          h: "8. Drepturile tale",
          t: `Ai dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate și opoziție, precum și dreptul de a-ți retrage oricând consimțământul, fără a afecta prelucrarea anterioară. Pentru a le exercita, scrie-ne la ${EMAIL}; răspundem în cel mult o lună. Poți depune o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal al Republicii Moldova sau, dacă locuiești în Uniunea Europeană, la autoritatea de protecție a datelor din țara ta.`,
        },
        {
          h: "9. Cadrul legal",
          t: "Prelucrăm datele conform legislației Republicii Moldova privind protecția datelor cu caracter personal și, pentru persoanele din Uniunea Europeană, conform Regulamentului (UE) 2016/679 (GDPR).",
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
      updated: "19 septembrie 2026",
      sections: [
        {
          h: "1. Ce sunt cookie-urile",
          t: "Cookie-urile și tehnologiile similare, precum stocarea locală a browserului, sunt fișiere mici salvate pe dispozitivul tău. Unele sunt necesare pentru funcționarea site-ului; pe celelalte le folosim doar dacă îți dai acordul.",
        },
        {
          h: "2. Necesare (mereu active)",
          t: "În stocarea locală a browserului păstrăm tema aleasă, luminoasă sau întunecată (expertcont-theme), și alegerea ta privind cookie-urile (expertcont-cookie-consent, valabilă 12 luni). Acestea nu te identifică și nu sunt transmise terților.",
        },
        {
          h: "3. Analiză (doar cu acordul tău)",
          t: "Google Analytics 4, furnizat de Google, numără vizitele și paginile vizualizate. Cookie-uri: _ga și _ga_<ID>, fiecare valabil până la 2 ani. Se activează doar dacă accepți categoria „Analiză”.",
        },
        {
          h: "4. Înregistrarea sesiunii (doar cu acordul tău)",
          t: "Microsoft Clarity arată cum este folosit site-ul (clicuri, derulare, hărți termice) prin înregistrări ale sesiunii. Nu rulează pe paginile cu formulare (contact și întrebări frecvente), iar în formularele din ferestrele de programare textul introdus este mascat. Microsoft primește datele ca operator independent, le transferă în SUA, unde protecția poate fi mai slabă decât în UE, și le folosește și pentru Microsoft Advertising; detalii la privacy.microsoft.com/privacystatement. Cookie-uri: _clck (1 an) și _clsk (1 zi). Se activează doar dacă accepți categoria „Înregistrarea sesiunii”.",
        },
        {
          h: "5. Marketing (doar cu acordul tău)",
          t: "Google Tag Manager, furnizat de Google, încarcă instrumente de marketing. Momentan nu afișăm reclame și nu folosim cookie-uri de publicitate. Dacă vom adăuga astfel de instrumente, vom actualiza această politică și îți vom cere din nou acordul. Se activează doar dacă accepți categoria „Marketing”.",
        },
        {
          h: "6. Conținut de la terți",
          t: "Harta de pe pagina de contact folosește imagini de hartă de la CARTO, pe baza datelor OpenStreetMap. Pentru a le afișa, browserul tău trimite adresa IP către CARTO.",
        },
        {
          h: "7. Cum îți gestionezi alegerea",
          t: "La prima vizită îți cerem acordul prin banner, unde poți accepta tot, refuza tot sau alege pe categorii. Îți poți schimba alegerea oricând cu butonul „Schimbă setările cookie” de mai jos; ajungi aici din linkul „Cookies” din subsolul site-ului. Dacă îți retragi acordul, ștergem cookie-urile de analiză și de înregistrare setate de site. Îți cerem din nou acordul după 12 luni sau atunci când schimbăm instrumentele folosite. Retragerea acordului nu afectează legalitatea prelucrării anterioare.",
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
      updated: "19 сентября 2026",
      sections: [
        {
          h: "1. Кто мы",
          t: `${LEGAL_NAME} (S.R.L. «RIGHT CONSULT COMPANY», IDNO 1022600002005), расположенная по адресу ${ADDR_RU}, является оператором персональных данных, описанных ниже. По любым вопросам о ваших данных пишите на ${EMAIL} или звоните по номеру ${PHONE}.`,
        },
        {
          h: "2. Какие данные мы собираем",
          t: "Через формы на сайте (контакт, запись, расчёт стоимости, вопросы, отзывы и рассылка) мы получаем имя, адрес электронной почты, телефон и ваше сообщение. Для каждой отправки мы также сохраняем страницу, с которой она отправлена, тип браузера и необратимо зашифрованный отпечаток (хеш) IP-адреса, который используется только для защиты от злоупотреблений; сам IP-адрес мы не храним. Для клиентов по договору мы обрабатываем данные компании и переданные финансовые и юридические документы, в том числе данные о зарплатах их сотрудников. Через сайт мы не запрашиваем чувствительные данные.",
        },
        {
          h: "3. Цели и правовые основания",
          t: "(а) Ответ на ваш запрос и подготовка предложения — по вашей просьбе, до заключения договора. (б) Исполнение договора на бухгалтерские, юридические и консалтинговые услуги. (в) Выполнение требований закона: бухгалтерский учёт, налоговая отчётность, аудит. (г) Рассылка — только с вашего согласия, которое можно отозвать в любой момент. (д) Аналитика использования сайта и запись сессий — только с согласия, данного в баннере cookie. (е) Безопасность сайта и защита от злоупотреблений — на основании нашего законного интереса.",
        },
        {
          h: "4. Кому мы передаём данные",
          t: "Мы работаем с поставщиками, которые обрабатывают данные от нашего имени и только для указанных целей: Supabase (база данных и формы сайта), Cloudflare (хостинг сайта), Telegram (внутренние уведомления команде о новых заявках), Google (Google Analytics и Google Tag Manager, только с вашего согласия), Microsoft (Clarity, только с вашего согласия) и CARTO (карта на странице контактов, которая получает IP-адрес посетителя, чтобы показать карту). Microsoft получает данные из Clarity как самостоятельный оператор: использует их и в собственных целях, в том числе для Microsoft Advertising. Подробнее — в заявлении о конфиденциальности Microsoft: privacy.microsoft.com/privacystatement. Мы не продаём данные и не передаём их в коммерческих целях. Мы можем передать их государственным органам только тогда, когда этого требует закон.",
        },
        {
          h: "5. Передача за пределы Республики Молдова и ЕС",
          t: "Некоторые поставщики (Google, Microsoft, Cloudflare, Telegram) могут обрабатывать данные за пределами Республики Молдова и Европейского союза, в том числе в США. В таких случаях мы опираемся на гарантии поставщиков, например стандартные договорные положения, утверждённые Европейской комиссией, или сертификацию EU-U.S. Data Privacy Framework. Для Microsoft Clarity передача в США происходит только с вашего явного согласия в баннере cookie, данного после того, как вы узнали, что в США данные могут быть защищены хуже, чем в ЕС, в том числе от доступа государственных органов (ст. 49 ч. 1 п. а GDPR). База данных Supabase размещена во Франкфурте, Германия (Европейский союз).",
        },
        {
          h: "6. Хранение и безопасность",
          t: "Данные передаются и хранятся в зашифрованном виде (TLS). Доступ есть только у сотрудников, которые непосредственно работают с вашим запросом или делом, и защищён двухфакторной аутентификацией.",
        },
        {
          h: "7. Сколько мы храним данные",
          t: "Заявки с сайта, которые не привели к договору: 12 месяцев с момента последнего контакта. Данные клиентов и бухгалтерские документы: в течение срока договора и 10 лет после его окончания, как требует бухгалтерское и налоговое законодательство Республики Молдова. Подписчики рассылки: до отписки. Данные аналитики: не более 14 месяцев в Google Analytics и 13 месяцев в Microsoft Clarity. По истечении срока данные надёжно удаляются.",
        },
        {
          h: "8. Ваши права",
          t: `Вы имеете право на доступ, исправление, удаление, ограничение обработки, переносимость данных и возражение, а также право в любой момент отозвать согласие, что не влияет на законность обработки до отзыва. Чтобы воспользоваться этими правами, напишите на ${EMAIL}; мы отвечаем не позднее чем через месяц. Вы можете подать жалобу в Национальный центр по защите персональных данных Республики Молдова или, если вы живёте в Европейском союзе, в орган по защите данных вашей страны.`,
        },
        {
          h: "9. Правовая основа",
          t: "Мы обрабатываем данные в соответствии с законодательством Республики Молдова о защите персональных данных, а для лиц из Европейского союза — в соответствии с Регламентом (ЕС) 2016/679 (GDPR).",
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
      updated: "19 сентября 2026",
      sections: [
        {
          h: "1. Что такое cookie",
          t: "Cookie и похожие технологии, например локальное хранилище браузера, — это небольшие файлы, которые сохраняются на вашем устройстве. Одни необходимы для работы сайта; остальные мы используем только с вашего согласия.",
        },
        {
          h: "2. Необходимые (всегда активны)",
          t: "В локальном хранилище браузера мы сохраняем выбранную тему, светлую или тёмную (expertcont-theme), и ваш выбор по cookie (expertcont-cookie-consent, действует 12 месяцев). Они не идентифицируют вас и не передаются третьим лицам.",
        },
        {
          h: "3. Аналитика (только с вашего согласия)",
          t: "Google Analytics 4 от Google считает посещения и просмотренные страницы. Cookie: _ga и _ga_<ID>, каждый действует до 2 лет. Включается, только если вы разрешили категорию «Аналитика».",
        },
        {
          h: "4. Запись сессий (только с вашего согласия)",
          t: "Microsoft Clarity показывает, как используется сайт (клики, прокрутка, тепловые карты), с помощью записи сессий. Он не работает на страницах с формами (контакты и частые вопросы), а в формах записи во всплывающих окнах введённый текст скрыт. Microsoft получает данные как самостоятельный оператор, передаёт их в США, где защита может быть слабее, чем в ЕС, и использует их также для Microsoft Advertising; подробнее — privacy.microsoft.com/privacystatement. Cookie: _clck (1 год) и _clsk (1 день). Включается, только если вы разрешили категорию «Запись сессий».",
        },
        {
          h: "5. Маркетинг (только с вашего согласия)",
          t: "Google Tag Manager от Google загружает маркетинговые инструменты. Сейчас мы не показываем рекламу и не используем рекламные cookie. Если мы добавим такие инструменты, мы обновим эту политику и снова попросим вашего согласия. Включается, только если вы разрешили категорию «Маркетинг».",
        },
        {
          h: "6. Содержимое третьих сторон",
          t: "Карта на странице контактов использует изображения карт от CARTO на основе данных OpenStreetMap. Чтобы показать их, ваш браузер передаёт CARTO свой IP-адрес.",
        },
        {
          h: "7. Как управлять своим выбором",
          t: "При первом посещении мы спрашиваем согласие в баннере: можно принять всё, отказаться от всего или выбрать по категориям. Изменить выбор можно в любой момент кнопкой «Изменить настройки cookie» ниже; сюда ведёт ссылка «Cookies» в нижней части сайта. Если вы отзываете согласие, мы удаляем cookie аналитики и записи сессий, установленные сайтом. Мы снова спросим согласие через 12 месяцев или когда изменим используемые инструменты. Отзыв согласия не влияет на законность обработки до отзыва.",
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
      updated: "September 19, 2026",
      sections: [
        {
          h: "1. Who we are",
          t: `${LEGAL_NAME} (S.R.L. "RIGHT CONSULT COMPANY", IDNO 1022600002005), located at ${ADDR_EN}, is the controller of the personal data described below. For any question about your data, email ${EMAIL} or call ${PHONE}.`,
        },
        {
          h: "2. What data we collect",
          t: "Through the forms on this site (contact, booking, quote, questions, reviews and newsletter) we collect your name, email address, phone number and the message you send. For each submission we also keep the page it was sent from, your browser type and an irreversibly encrypted fingerprint (hash) of your IP address, used only to prevent abuse; we don't store the IP address itself. For clients under contract we process company data and the financial and legal documents they send, including their employees' payroll data. We don't ask for sensitive data through the site.",
        },
        {
          h: "3. Purposes and legal basis",
          t: "(a) Replying to your request and preparing an offer, at your request, before any contract. (b) Performing our contract for accounting, legal and consulting services. (c) Meeting legal obligations: bookkeeping, tax reporting, audit. (d) Sending the newsletter, only with your consent, which you can withdraw at any time. (e) Analysing how the site is used and recording sessions, only with the consent you give in the cookie banner. (f) Keeping the site secure and preventing abuse, based on our legitimate interest.",
        },
        {
          h: "4. Who we share data with",
          t: "We work with providers who process data on our behalf, only for the purposes above: Supabase (database and site forms), Cloudflare (site hosting), Telegram (internal notifications to our team about new requests), Google (Google Analytics and Google Tag Manager, only with your consent), Microsoft (Clarity, only with your consent) and CARTO (the map on the contact page, which receives the visitor's IP address to show the map). Microsoft receives Clarity data as an independent controller: it also uses it for its own purposes, including Microsoft Advertising. See the Microsoft Privacy Statement: privacy.microsoft.com/privacystatement. We don't sell data or share it for commercial purposes. We may share it with authorities only when the law requires it.",
        },
        {
          h: "5. Transfers outside Moldova and the EU",
          t: "Some providers (Google, Microsoft, Cloudflare, Telegram) may process data outside the Republic of Moldova and the European Union, including in the United States. In these cases we rely on the providers' safeguards, such as the European Commission's standard contractual clauses or EU-U.S. Data Privacy Framework certification. For Microsoft Clarity, the transfer to the US happens only with your explicit consent in the cookie banner, given after being told that data in the US may be less protected than in the EU, including against access by authorities (GDPR Art. 49(1)(a)). The Supabase database is hosted in Frankfurt, Germany (European Union).",
        },
        {
          h: "6. Storage and security",
          t: "Data is encrypted in transit (TLS) and at rest. Access is limited to the team members directly working on your request or file, protected by two-factor authentication.",
        },
        {
          h: "7. How long we keep data",
          t: "Requests sent through the site that don't lead to a contract: 12 months from the last contact. Client data and accounting documents: for the duration of the contract and 10 years after it ends, as Moldovan accounting and tax law requires. Newsletter subscribers: until they unsubscribe. Analytics data: at most 14 months in Google Analytics and 13 months in Microsoft Clarity. When the period ends, data is securely deleted.",
        },
        {
          h: "8. Your rights",
          t: `You have the right to access, rectify and erase your data, to restrict its processing, to data portability and to object, and the right to withdraw your consent at any time without affecting earlier processing. To exercise these rights, email ${EMAIL}; we reply within one month. You can lodge a complaint with the National Center for Personal Data Protection of the Republic of Moldova or, if you live in the European Union, with the data protection authority in your country.`,
        },
        {
          h: "9. Legal framework",
          t: "We process data under the personal data protection law of the Republic of Moldova and, for people in the European Union, under Regulation (EU) 2016/679 (GDPR).",
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
      updated: "September 19, 2026",
      sections: [
        {
          h: "1. What cookies are",
          t: "Cookies and similar technologies, such as your browser's local storage, are small files saved on your device. Some are needed for the site to work; we use the others only with your consent.",
        },
        {
          h: "2. Necessary (always on)",
          t: "In your browser's local storage we keep your theme choice, light or dark (expertcont-theme), and your cookie choice (expertcont-cookie-consent, valid for 12 months). They don't identify you and aren't shared with third parties.",
        },
        {
          h: "3. Analytics (only with your consent)",
          t: "Google Analytics 4, provided by Google, counts visits and pages viewed. Cookies: _ga and _ga_<ID>, each valid for up to 2 years. Turned on only if you allow the “Analytics” category.",
        },
        {
          h: "4. Session recording (only with your consent)",
          t: "Microsoft Clarity shows how the site is used (clicks, scrolling, heatmaps) through session recordings. It doesn't run on pages with forms (contact and FAQ), and text typed into the booking pop-up forms is masked. Microsoft receives the data as an independent controller, transfers it to the US, where protection may be weaker than in the EU, and also uses it for Microsoft Advertising; see privacy.microsoft.com/privacystatement. Cookies: _clck (1 year) and _clsk (1 day). Turned on only if you allow the “Session recording” category.",
        },
        {
          h: "5. Marketing (only with your consent)",
          t: "Google Tag Manager, provided by Google, loads marketing tools. We don't currently show ads or use advertising cookies. If we add such tools, we'll update this policy and ask for your consent again. Turned on only if you allow the “Marketing” category.",
        },
        {
          h: "6. Third-party content",
          t: "The map on the contact page uses map images from CARTO, based on OpenStreetMap data. To show them, your browser sends its IP address to CARTO.",
        },
        {
          h: "7. Managing your choice",
          t: "On your first visit we ask for consent in the banner, where you can accept everything, refuse everything or choose by category. You can change your choice at any time with the “Change cookie settings” button below; the “Cookies” link at the bottom of every page brings you here. If you withdraw consent, we delete the analytics and session-recording cookies the site set. We ask again after 12 months or when we change the tools we use. Withdrawing consent doesn't affect the lawfulness of earlier processing.",
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

            {kind === "cookies" && (
              <div className="mt-12 rounded-lg border border-primary/30 bg-primary-50 p-8">
                <h4 className="mb-3 text-lg font-bold">{cookieSettingsLabels[locale].title}</h4>
                <p className="mb-5 text-base leading-relaxed text-text-secondary">
                  {cookieSettingsLabels[locale].body}
                </p>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <Icon name="shield" size={16} />
                  {cookieSettingsLabels[locale].button}
                </button>
              </div>
            )}

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
