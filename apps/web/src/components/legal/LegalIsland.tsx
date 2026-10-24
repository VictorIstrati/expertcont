import { Icon, PageHeader } from "@expertcont/ui";
import { I18nRoot, homeUrl, sectionUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import { openCookieSettings } from "../../lib/analytics";
import { dataProtectionContent } from "./dataProtection";
import {
  ADDR_EN,
  ADDR_RO,
  ADDR_RU,
  DPO_EMAIL,
  EMAIL,
  LEGAL_NAME,
  PHONE,
  type LegalData,
} from "./shared";

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

export type LegalKind = "privacy" | "dataProtection" | "terms" | "cookies";

export interface LegalIslandProps {
  locale: Locale;
  kind: LegalKind;
  contactHref: string;
}

type ContentMap = Record<Locale, Record<Exclude<LegalKind, "dataProtection">, LegalData>>;

const content: ContentMap = {
  ro: {
    privacy: {
      title: "Politica de confidențialitate",
      lastUpdated: "Ultima actualizare",
      updated: "24 octombrie 2026",
      sections: [
        {
          h: "1. Cine suntem",
          t: `${LEGAL_NAME} (S.R.L. „RIGHT CONSULT COMPANY”, IDNO 1022600002005), cu sediul în ${ADDR_RO}, este operatorul datelor personale descrise mai jos. Ne poți contacta pentru orice întrebare despre datele tale la ${EMAIL} sau la ${PHONE}. Pentru protecția datelor personale și exercitarea drepturilor tale scrie-ne la ${DPO_EMAIL}.`,
        },
        {
          h: "2. Ce date colectăm",
          t: "Prin formularele site-ului (contact, programare, ofertă, întrebări și recenzii) colectăm numele, adresa de e-mail, telefonul și mesajul pe care ni-l trimiți. Pentru fiecare trimitere păstrăm și pagina de pe care a fost trimisă, tipul de browser și o amprentă pseudonimizată a adresei IP, calculată cu o cheie secretă (HMAC), pe care o păstrăm doar pentru a putea identifica trimiterile abuzive; adresa IP propriu-zisă nu o stocăm. Pentru clienții cu contract prelucrăm datele companiei și documentele financiare și juridice transmise, inclusiv datele salariale ale angajaților lor. Nu cerem date sensibile prin site. Câmpurile marcate cu * sunt obligatorii: în formularele de contact, programare și ofertă avem nevoie de nume și telefon ca să te putem suna înapoi, iar adresa de e-mail este opțională; pentru întrebările din secțiunea de întrebări frecvente avem nevoie de e-mail, pentru că răspunsul se trimite pe e-mail. Fără datele obligatorii nu putem da curs solicitării; datele opționale ne ajută doar să te contactăm pe canalul preferat.",
        },
        {
          h: "3. Scopuri și temei legal",
          t: "(a) Să răspundem la solicitări și să pregătim o ofertă, la cererea ta, înainte de încheierea unui contract. (b) Executarea contractului de servicii contabile, juridice și de consultanță. (c) Îndeplinirea obligațiilor legale: evidență contabilă, raportare fiscală, audit. (d) Analiza utilizării site-ului, doar cu consimțământul dat în bannerul de cookie-uri, pe care îl poți retrage oricând. (e) Securitatea site-ului și prevenirea abuzurilor, în baza interesului nostru legitim.",
        },
        {
          h: "4. Cui transmitem datele",
          t: "Lucrăm cu furnizori care prelucrează datele în numele nostru, doar pentru scopurile de mai sus: Supabase (baza de date și formularele site-ului), Cloudflare (găzduirea site-ului), Zoho Cliq (notificări interne către echipă despre solicitările noi), Google (Google Analytics și Google Tag Manager, doar cu acordul tău) și CARTO (harta de pe pagina de contact, care primește adresa IP a vizitatorului pentru a afișa harta). Nu vindem datele și nu le transmitem în scopuri comerciale. Le putem transmite autorităților doar atunci când legea o cere.",
        },
        {
          h: "5. Transferuri în afara Republicii Moldova și a UE",
          t: "Unii furnizori (Google, Cloudflare) pot prelucra date în afara Republicii Moldova și a Uniunii Europene, inclusiv în SUA. În aceste cazuri ne bazăm pe garanțiile oferite de furnizori, precum clauzele contractuale standard aprobate de Comisia Europeană sau certificarea EU-U.S. Data Privacy Framework. Baza de date Supabase este găzduită în Frankfurt, Germania (Uniunea Europeană), iar notificările Zoho Cliq sunt găzduite în centrele de date Zoho din Uniunea Europeană.",
        },
        {
          h: "6. Stocare și securitate",
          t: "Datele sunt transmise criptat (TLS) și stocate criptat. Accesul este limitat la membrii echipei implicați direct în solicitarea sau dosarul tău, cu autentificare în doi pași.",
        },
        {
          h: "7. Cât timp păstrăm datele",
          t: "Solicitările trimise prin site: 12 luni de la trimitere; dacă devii client, datele necesare trec în dosarul tău de client. Datele clienților și documentele contabile: pe durata contractului și 10 ani după încheierea lui, conform legislației contabile și fiscale din Republica Moldova. Recenziile nepublicate: 12 luni; recenziile publicate: până când ne ceri să le retragem. Ștergerea solicitărilor expirate se face automat, zilnic. Datele de analiză: cel mult 14 luni în Google Analytics. La expirarea termenului, datele sunt șterse în siguranță.",
        },
        {
          h: "8. Drepturile tale",
          t: `Ai dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate și opoziție, precum și dreptul de a-ți retrage oricând consimțământul, fără a afecta prelucrarea anterioară. Ai și dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrare automată și de a cere intervenția unui specialist. Pentru a le exercita, scrie-ne la ${DPO_EMAIL}; răspundem în cel mult o lună, termen care poate fi prelungit cu încă două luni în cazurile complexe, cu informarea ta. Îți putem cere doar informațiile strict necesare pentru a-ți verifica identitatea. Poți depune o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal al Republicii Moldova sau, dacă locuiești în Uniunea Europeană, la autoritatea de protecție a datelor din țara ta.`,
        },
        {
          h: "9. Calculul estimativ al prețului",
          t: "Calculatorul de prețuri de pe site estimează automat costul lunar al serviciilor pe baza datelor pe care le introduci: serviciile alese, domeniul de activitate, numărul de facturi pe lună, cifra de afaceri, statutul de plătitor de TVA, numărul de angajați sau numărul de ore. Logica este simplă: pornim de la tariful de bază al domeniului, adăugăm un supliment pentru facturile peste pragul inclus și pentru TVA, aplicăm un coeficient în funcție de cifra de afaceri, scădem reducerile promoționale active și rotunjim la 10 MDL; pentru juridic, financiar și IT înmulțim orele cu tariful orar, iar pentru resurse umane, numărul de angajați cu tariful per angajat. Calculul se face în browserul tău și nu folosește date personale. Rezultatul este doar o estimare orientativă, nu o ofertă fermă și nu are efecte juridice asupra ta: dacă ne trimiți estimarea, un specialist o verifică și îți confirmă oferta finală. Poți oricând să ceri ca prețul să fie stabilit direct de un specialist.",
        },
        {
          h: "10. Cadrul legal",
          t: "Prelucrăm datele conform Legii nr. 195/2024 privind protecția datelor cu caracter personal a Republicii Moldova și, pentru persoanele din Uniunea Europeană, conform Regulamentului (UE) 2016/679 (GDPR).",
        },
        {
          h: "11. Politica generală privind datele personale",
          t: "Această pagină acoperă site-ul. Cum prelucrăm datele clienților, ale persoanelor din dosare, ale candidaților și ale partenerilor, inclusiv verificările obligatorii de prevenire a spălării banilor, găsești în politica noastră generală.",
          link: { section: "dataProtection", label: "Politica privind prelucrarea datelor cu caracter personal" },
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
      updated: "24 octombrie 2026",
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
          h: "4. Marketing (doar cu acordul tău)",
          t: "Google Tag Manager, furnizat de Google, încarcă instrumente de marketing. Momentan nu afișăm reclame și nu folosim cookie-uri de publicitate. Dacă vom adăuga astfel de instrumente, vom actualiza această politică și îți vom cere din nou acordul. Se activează doar dacă accepți categoria „Marketing”.",
        },
        {
          h: "5. Conținut de la terți",
          t: "Harta de pe pagina de contact folosește imagini de hartă de la CARTO, pe baza datelor OpenStreetMap. Harta se încarcă doar după ce apeși „Afișează harta”; abia atunci browserul tău trimite adresa IP către CARTO.",
        },
        {
          h: "6. Cum îți gestionezi alegerea",
          t: "La prima vizită îți cerem acordul prin banner, unde poți accepta tot, refuza tot sau alege pe categorii. Îți poți schimba alegerea oricând cu butonul „Schimbă setările cookie” de mai jos; același panou se deschide și din butonul „Setări cookie-uri” din subsolul fiecărei pagini. Dacă îți retragi acordul, ștergem cookie-urile de analiză setate de site. Îți cerem din nou acordul după 12 luni sau atunci când schimbăm instrumentele folosite. Retragerea acordului nu afectează legalitatea prelucrării anterioare.",
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
      updated: "24 октября 2026",
      sections: [
        {
          h: "1. Кто мы",
          t: `${LEGAL_NAME} (S.R.L. «RIGHT CONSULT COMPANY», IDNO 1022600002005), расположенная по адресу ${ADDR_RU}, является оператором персональных данных, описанных ниже. По любым вопросам о ваших данных пишите на ${EMAIL} или звоните по номеру ${PHONE}. По вопросам защиты персональных данных и для осуществления ваших прав пишите на ${DPO_EMAIL}.`,
        },
        {
          h: "2. Какие данные мы собираем",
          t: "Через формы на сайте (контакт, запись, расчёт стоимости, вопросы и отзывы) мы получаем имя, адрес электронной почты, телефон и ваше сообщение. Для каждой отправки мы также сохраняем страницу, с которой она отправлена, тип браузера и псевдонимизированный отпечаток IP-адреса, вычисленный с секретным ключом (HMAC), который мы храним только для выявления злоупотреблений; сам IP-адрес мы не храним. Для клиентов по договору мы обрабатываем данные компании и переданные финансовые и юридические документы, в том числе данные о зарплатах их сотрудников. Через сайт мы не запрашиваем чувствительные данные. Поля, отмеченные *, обязательны: в формах контакта, записи и расчёта стоимости нам нужны имя и телефон, чтобы перезвонить вам, а адрес электронной почты необязателен; для вопросов в разделе частых вопросов нужен e-mail, потому что ответ приходит по почте. Без обязательных данных мы не сможем обработать запрос; необязательные данные лишь помогают связаться с вами удобным способом.",
        },
        {
          h: "3. Цели и правовые основания",
          t: "(а) Ответ на ваш запрос и подготовка предложения — по вашей просьбе, до заключения договора. (б) Исполнение договора на бухгалтерские, юридические и консалтинговые услуги. (в) Выполнение требований закона: бухгалтерский учёт, налоговая отчётность, аудит. (г) Аналитика использования сайта — только с согласия, данного в баннере cookie, которое можно отозвать в любой момент. (д) Безопасность сайта и защита от злоупотреблений — на основании нашего законного интереса.",
        },
        {
          h: "4. Кому мы передаём данные",
          t: "Мы работаем с поставщиками, которые обрабатывают данные от нашего имени и только для указанных целей: Supabase (база данных и формы сайта), Cloudflare (хостинг сайта), Zoho Cliq (внутренние уведомления команде о новых заявках), Google (Google Analytics и Google Tag Manager, только с вашего согласия) и CARTO (карта на странице контактов, которая получает IP-адрес посетителя, чтобы показать карту). Мы не продаём данные и не передаём их в коммерческих целях. Мы можем передать их государственным органам только тогда, когда этого требует закон.",
        },
        {
          h: "5. Передача за пределы Республики Молдова и ЕС",
          t: "Некоторые поставщики (Google, Cloudflare) могут обрабатывать данные за пределами Республики Молдова и Европейского союза, в том числе в США. В таких случаях мы опираемся на гарантии поставщиков, например стандартные договорные положения, утверждённые Европейской комиссией, или сертификацию EU-U.S. Data Privacy Framework. База данных Supabase размещена во Франкфурте, Германия (Европейский союз), а уведомления Zoho Cliq хранятся в центрах обработки данных Zoho в Европейском союзе.",
        },
        {
          h: "6. Хранение и безопасность",
          t: "Данные передаются и хранятся в зашифрованном виде (TLS). Доступ есть только у сотрудников, которые непосредственно работают с вашим запросом или делом, и защищён двухфакторной аутентификацией.",
        },
        {
          h: "7. Сколько мы храним данные",
          t: "Заявки с сайта: 12 месяцев с момента отправки; если вы станете клиентом, нужные данные перейдут в ваше клиентское дело. Данные клиентов и бухгалтерские документы: в течение срока договора и 10 лет после его окончания, как требует бухгалтерское и налоговое законодательство Республики Молдова. Неопубликованные отзывы: 12 месяцев; опубликованные отзывы: пока вы не попросите их снять. Удаление просроченных заявок происходит автоматически, ежедневно. Данные аналитики: не более 14 месяцев в Google Analytics. По истечении срока данные надёжно удаляются.",
        },
        {
          h: "8. Ваши права",
          t: `Вы имеете право на доступ, исправление, удаление, ограничение обработки, переносимость данных и возражение, а также право в любой момент отозвать согласие, что не влияет на законность обработки до отзыва. Вы также имеете право не подвергаться решению, основанному исключительно на автоматизированной обработке, и потребовать участия специалиста. Чтобы воспользоваться этими правами, напишите на ${DPO_EMAIL}; мы отвечаем не позднее чем через месяц, а в сложных случаях срок может быть продлён ещё на два месяца с уведомлением вас. Мы можем запросить только сведения, строго необходимые для подтверждения вашей личности. Вы можете подать жалобу в Национальный центр по защите персональных данных Республики Молдова или, если вы живёте в Европейском союзе, в орган по защите данных вашей страны.`,
        },
        {
          h: "9. Предварительный расчёт стоимости",
          t: "Калькулятор на сайте автоматически оценивает ежемесячную стоимость услуг по данным, которые вы вводите: выбранные услуги, сфера деятельности, количество счетов в месяц, оборот, статус плательщика НДС, количество сотрудников или количество часов. Логика простая: берём базовый тариф для сферы деятельности, добавляем надбавку за счета сверх включённого лимита и за НДС, применяем коэффициент в зависимости от оборота, вычитаем действующие акционные скидки и округляем до 10 MDL; для юридических, финансовых и IT-услуг умножаем часы на почасовую ставку, а для кадровых — количество сотрудников на тариф за сотрудника. Расчёт выполняется в вашем браузере и не использует персональные данные. Результат — лишь ориентировочная оценка, а не твёрдое предложение, и он не порождает для вас юридических последствий: если вы отправите оценку нам, специалист проверит её и подтвердит окончательное предложение. Вы всегда можете попросить, чтобы цену определил специалист.",
        },
        {
          h: "10. Правовая основа",
          t: "Мы обрабатываем данные в соответствии с Законом Республики Молдова № 195/2024 о защите персональных данных, а для лиц из Европейского союза — в соответствии с Регламентом (ЕС) 2016/679 (GDPR).",
        },
        {
          h: "11. Общая политика обработки персональных данных",
          t: "Эта страница касается сайта. Как мы обрабатываем данные клиентов, участников дел, кандидатов и партнёров, включая обязательные проверки по предотвращению отмывания денег, описано в нашей общей политике.",
          link: { section: "dataProtection", label: "Политика обработки персональных данных" },
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
      updated: "24 октября 2026",
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
          h: "4. Маркетинг (только с вашего согласия)",
          t: "Google Tag Manager от Google загружает маркетинговые инструменты. Сейчас мы не показываем рекламу и не используем рекламные cookie. Если мы добавим такие инструменты, мы обновим эту политику и снова попросим вашего согласия. Включается, только если вы разрешили категорию «Маркетинг».",
        },
        {
          h: "5. Содержимое третьих сторон",
          t: "Карта на странице контактов использует изображения карт от CARTO на основе данных OpenStreetMap. Карта загружается только после нажатия «Показать карту»; только тогда ваш браузер передаёт CARTO свой IP-адрес.",
        },
        {
          h: "6. Как управлять своим выбором",
          t: "При первом посещении мы спрашиваем согласие в баннере: можно принять всё, отказаться от всего или выбрать по категориям. Изменить выбор можно в любой момент кнопкой «Изменить настройки cookie» ниже; те же настройки открывает кнопка «Настройки cookie» внизу каждой страницы. Если вы отзываете согласие, мы удаляем cookie аналитики, установленные сайтом. Мы снова спросим согласие через 12 месяцев или когда изменим используемые инструменты. Отзыв согласия не влияет на законность обработки до отзыва.",
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
      updated: "October 24, 2026",
      sections: [
        {
          h: "1. Who we are",
          t: `${LEGAL_NAME} (S.R.L. "RIGHT CONSULT COMPANY", IDNO 1022600002005), located at ${ADDR_EN}, is the controller of the personal data described below. For any question about your data, email ${EMAIL} or call ${PHONE}. For data protection matters and to exercise your rights, write to ${DPO_EMAIL}.`,
        },
        {
          h: "2. What data we collect",
          t: "Through the forms on this site (contact, booking, quote, questions and reviews) we collect your name, email address, phone number and the message you send. For each submission we also keep the page it was sent from, your browser type and a pseudonymised fingerprint of your IP address, computed with a secret key (HMAC), which we keep only to identify abusive submissions; we don't store the IP address itself. For clients under contract we process company data and the financial and legal documents they send, including their employees' payroll data. We don't ask for sensitive data through the site. Fields marked * are required: in the contact, booking and quote forms we need your name and phone number so we can call you back, and your email address is optional; for FAQ questions we need your email, because the answer is sent by email. Without the required data we can't handle your request; optional data only helps us reach you on your preferred channel.",
        },
        {
          h: "3. Purposes and legal basis",
          t: "(a) Replying to your request and preparing an offer, at your request, before any contract. (b) Performing our contract for accounting, legal and consulting services. (c) Meeting legal obligations: bookkeeping, tax reporting, audit. (d) Analysing how the site is used, only with the consent you give in the cookie banner, which you can withdraw at any time. (e) Keeping the site secure and preventing abuse, based on our legitimate interest.",
        },
        {
          h: "4. Who we share data with",
          t: "We work with providers who process data on our behalf, only for the purposes above: Supabase (database and site forms), Cloudflare (site hosting), Zoho Cliq (internal notifications to our team about new requests), Google (Google Analytics and Google Tag Manager, only with your consent) and CARTO (the map on the contact page, which receives the visitor's IP address to show the map). We don't sell data or share it for commercial purposes. We may share it with authorities only when the law requires it.",
        },
        {
          h: "5. Transfers outside Moldova and the EU",
          t: "Some providers (Google, Cloudflare) may process data outside the Republic of Moldova and the European Union, including in the United States. In these cases we rely on the providers' safeguards, such as the European Commission's standard contractual clauses or EU-U.S. Data Privacy Framework certification. The Supabase database is hosted in Frankfurt, Germany (European Union), and Zoho Cliq notifications are hosted in Zoho's European Union data centres.",
        },
        {
          h: "6. Storage and security",
          t: "Data is encrypted in transit (TLS) and at rest. Access is limited to the team members directly working on your request or file, protected by two-factor authentication.",
        },
        {
          h: "7. How long we keep data",
          t: "Requests sent through the site: 12 months from submission; if you become a client, the data we need moves into your client file. Client data and accounting documents: for the duration of the contract and 10 years after it ends, as Moldovan accounting and tax law requires. Unpublished reviews: 12 months; published reviews: until you ask us to remove them. Expired requests are deleted automatically every day. Analytics data: at most 14 months in Google Analytics. When the period ends, data is securely deleted.",
        },
        {
          h: "8. Your rights",
          t: `You have the right to access, rectify and erase your data, to restrict its processing, to data portability and to object, and the right to withdraw your consent at any time without affecting earlier processing. You also have the right not to be subject to a decision based solely on automated processing and to ask for a specialist to step in. To exercise these rights, email ${DPO_EMAIL}; we reply within one month, which may be extended by two more months for complex requests, in which case we'll tell you. We may ask only for the information strictly needed to verify your identity. You can lodge a complaint with the National Center for Personal Data Protection of the Republic of Moldova or, if you live in the European Union, with the data protection authority in your country.`,
        },
        {
          h: "9. Price estimates",
          t: "The price calculator on this site automatically estimates the monthly cost of our services from the data you enter: the services you pick, your line of business, invoices per month, turnover, VAT status, number of employees or number of hours. The logic is simple: we start from the base rate for your line of business, add a surcharge for invoices above the included threshold and for VAT, apply a factor based on turnover, subtract any active promotional discount and round to 10 MDL; for legal, financial and IT services we multiply hours by the hourly rate, and for HR the number of employees by the per-employee rate. The calculation runs in your browser and uses no personal data. The result is only an indicative estimate, not a binding offer, and it has no legal effect on you: if you send us the estimate, a specialist checks it and confirms the final offer. You can always ask for the price to be set directly by a specialist.",
        },
        {
          h: "10. Legal framework",
          t: "We process data under the Republic of Moldova's Law No. 195/2024 on personal data protection and, for people in the European Union, under Regulation (EU) 2016/679 (GDPR).",
        },
        {
          h: "11. General data protection policy",
          t: "This page covers the website. How we process the data of clients, people involved in client files, job candidates and partners, including mandatory anti-money laundering checks, is set out in our general policy.",
          link: { section: "dataProtection", label: "Data Protection Policy" },
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
      updated: "October 24, 2026",
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
          h: "4. Marketing (only with your consent)",
          t: "Google Tag Manager, provided by Google, loads marketing tools. We don't currently show ads or use advertising cookies. If we add such tools, we'll update this policy and ask for your consent again. Turned on only if you allow the “Marketing” category.",
        },
        {
          h: "5. Third-party content",
          t: "The map on the contact page uses map images from CARTO, based on OpenStreetMap data. The map loads only after you press “Show map”; only then does your browser send its IP address to CARTO.",
        },
        {
          h: "6. Managing your choice",
          t: "On your first visit we ask for consent in the banner, where you can accept everything, refuse everything or choose by category. You can change your choice at any time with the “Change cookie settings” button below; the “Cookie settings” button at the bottom of every page opens the same panel. If you withdraw consent, we delete the analytics cookies the site set. We ask again after 12 months or when we change the tools we use. Withdrawing consent doesn't affect the lawfulness of earlier processing.",
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
  const data = kind === "dataProtection" ? dataProtectionContent[locale] : content[locale][kind];
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
                  {s.link && (
                    <a
                      href={sectionUrl(s.link.section, locale)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      {s.link.label}
                      <Icon name="arrow-right" size={14} />
                    </a>
                  )}
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
