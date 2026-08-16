import type { IconName } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

/** Routing locales plus Ukrainian, which this one page renders but the site does not route. */
export type PageLocale = Locale | "uk";

/**
 * The Ukrainian consular service catalogue — the single source of truth for
 * both the on-page catalogue (UkraineCatalogue.tsx) and the booking modal's
 * two-stage picker (ServiceStep.tsx). Adding an item here makes it selectable
 * in both places; there is deliberately no second copy of this list anywhere.
 *
 * `id` values travel through the booking payload and end up in the enquiry
 * notes, so they are stable identifiers — rename the labels freely, never the
 * ids.
 */
export interface UkraineItem {
  id: string;
  labels: Record<PageLocale, string>;
}

export interface UkraineCategory {
  id: string;
  icon: IconName;
  /** Short label used on the modal's category buttons. */
  shortTitles: Record<PageLocale, string>;
  /** Full heading used for the section on the service page. */
  titles: Record<PageLocale, string>;
  /** One or two sentences of framing shown above the list on the page. */
  intros: Record<PageLocale, string>;
  items: UkraineItem[];
}

/** Booking-modal slug for the Ukrainian consular service. */
export const UKRAINE_BOOKING_SLUG = "ucraina";

/** Sentinel id for "my case is not listed" — reveals a free-text field. */
export const UKRAINE_OTHER_ID = "other";

export const ukraineOtherLabels: Record<PageLocale, string> = {
  ro: "Altceva — descrieți situația",
  ru: "Другое — опишите ситуацию",
  en: "Something else — describe your case",
  uk: "Інше — опишіть ситуацію",
};

export const ukraineOtherPlaceholders: Record<PageLocale, string> = {
  ro: "Descrieți pe scurt situația dumneavoastră…",
  ru: "Кратко опишите вашу ситуацию…",
  en: "Briefly describe your situation…",
  uk: "Стисло опишіть вашу ситуацію…",
};

const CATEGORIES: UkraineCategory[] = [
  {
    id: "embassy",
    icon: "calendar",
    shortTitles: {
      ro: "Ambasadă și consulat",
      ru: "Посольство и консульство",
      en: "Embassy & consulate",
      uk: "Посольство та консульство",
    },
    titles: {
      ro: "Ambasada și Consulatul Ucrainei în Moldova: programări, pașapoarte, certificate",
      ru: "Посольство и Консульство Украины в Молдове: запись, паспорта, справки",
      en: "Ukrainian Embassy and Consulate in Moldova: appointments, passports, certificates",
      uk: "Посольство і Консульство України в Молдові: запис, паспорти, довідки",
    },
    intros: {
      ro: "Coada este de obicei mai grea decât actele. Facem înscrierea prin toate metodele acceptate de Ambasadă și pregătim dosarul astfel încât o singură programare să fie suficientă.",
      ru: "Очередь обычно сложнее, чем сами документы. Записываем всеми способами, которые принимает Посольство, и готовим пакет документов так, чтобы хватило одного приёма.",
      en: "The queue is usually harder than the paperwork. We book the slot by every method the Embassy accepts and prepare the file so that one appointment is enough.",
      uk: "Черга зазвичай складніша за самі документи. Записуємо всіма способами, які приймає Посольство, і готуємо пакет документів так, щоб вистачило одного прийому.",
    },
    items: [
      {
        id: "queue",
        labels: {
          ro: "Înscriere în coada electronică (BankID, Дія, email)",
          ru: "Запись в электронную очередь (BankID, Дія, email)",
          en: "Booking a slot in the electronic queue (BankID, Дія, email)",
          uk: "Запис в електронну чергу (BankID, Дія, email)",
        },
      },
      {
        id: "access-men",
        labels: {
          ro: "Acces consular pentru bărbați de 18–60 de ani: Rezerv+, actualizarea evidenței militare, contestarea refuzurilor",
          ru: "Консульский доступ для мужчин 18–60 лет: Резерв+, обновление военно-учётных данных, разбор отказов",
          en: "Consular access for men aged 18 to 60: Reserve+, updating military registration records, challenging refusals",
          uk: "Консульський доступ для чоловіків 18–60 років: Резерв+, оновлення військово-облікових даних, оскарження відмов",
        },
      },
      {
        id: "passports",
        labels: {
          ro: "Pașapoarte prin Ambasadă și prin Serviciul de Pașapoarte al ÎS „Document”: buletin (ID-card), pașaport pentru străinătate, înlocuirea celui expirat sau pierdut, ridicarea documentului gata și livrarea din Ucraina",
          ru: "Паспорта через Посольство и Паспортный Сервис ГП «Документ»: внутренний паспорт (ID-карта), загранпаспорт, замена просроченного или утраченного, получение готового документа и доставка из Украины",
          en: "Passports through the Embassy and the Passport Service of the state enterprise “Document”: internal ID card, passport for travel abroad, replacement of an expired or lost document, collection of the finished document and delivery from Ukraine",
          uk: "Паспорти через Посольство та Паспортний Сервіс ДП «Документ»: внутрішній паспорт (ID-картка), закордонний паспорт, заміна простроченого або втраченого, отримання готового документа та доставка з України",
        },
      },
      {
        id: "white-passport",
        labels: {
          ro: "Certificatul de întoarcere în Ucraina („pașaportul alb”), inclusiv pentru copii sub tutelă și persoane fără domiciliu înregistrat",
          ru: "Свидетельство о возвращении в Украину («белый паспорт»), в том числе для детей под опекой и лиц без зарегистрированного места жительства",
          en: "Certificate of Return to Ukraine (the “white passport”), including for children under guardianship and persons with no registered place of residence",
          uk: "Посвідчення на повернення в Україну («білий паспорт»), зокрема для дітей під опікою та осіб без зареєстрованого місця проживання",
        },
      },
      {
        id: "citizenship",
        labels: {
          ro: "Verificarea apartenenței la cetățenia Ucrainei (inclusiv pentru copii) și cetățenia prin naștere",
          ru: "Проверка принадлежности к гражданству Украины (в т. ч. для детей) и гражданство по рождению",
          en: "Verification of Ukrainian citizenship (including for children) and establishment of citizenship by birth",
          uk: "Перевірка належності до громадянства України (зокрема для дітей) та громадянство за народженням",
        },
      },
      {
        id: "poa",
        labels: {
          ro: "Procuri și acte notariale la Ambasada sau Consulatul Ucrainei",
          ru: "Доверенности и нотариальные действия в Посольстве или Консульстве Украины",
          en: "Powers of attorney and notarial acts at the Ukrainian Embassy or Consulate",
          uk: "Довіреності та нотаріальні дії в Посольстві або Консульстві України",
        },
      },
      {
        id: "certificates",
        labels: {
          ro: "Alte documente: cazier judiciar, acte de stare civilă (înregistrarea nașterii copilului în străinătate, certificate de căsătorie, deces, naștere)",
          ru: "Иные документы: справка о несудимости, акты гражданского состояния (регистрация рождения ребёнка за границей, свидетельства о браке, смерти, рождении)",
          en: "Other documents: criminal record certificate, civil status records (registration of a child born abroad, marriage, death and birth certificates)",
          uk: "Інші документи: довідка про несудимість, акти цивільного стану (реєстрація народження дитини за кордоном, свідоцтва про шлюб, смерть, народження)",
        },
      },
    ],
  },
  {
    id: "digital",
    icon: "monitor",
    shortTitles: {
      ro: "Дія și servicii digitale",
      ru: "Дія и цифровые сервисы",
      en: "Дія & e-services",
      uk: "Дія та цифрові сервіси",
    },
    titles: {
      ro: "Дія, Rezerv+ și serviciile digitale ale Ucrainei din străinătate",
      ru: "Дія, Резерв+ и цифровые сервисы Украины из-за границы",
      en: "Дія, Reserve+ and Ukrainian state e-services from abroad",
      uk: "Дія, Резерв+ і цифрові сервіси України з-за кордону",
    },
    intros: {
      ro: "Majoritatea serviciilor de stat din Ucraina trec astăzi printr-o aplicație. Când înregistrarea din străinătate eșuează — și se întâmplă des — cauza este de obicei lipsa codului fiscal sau un pașaport pe care registrul nu îl poate verifica.",
      ru: "Большинство государственных сервисов Украины сегодня работают через приложение. Когда регистрация из-за границы не проходит — а это бывает часто — причина обычно в отсутствующем налоговом номере или в паспорте, который реестр не может проверить.",
      en: "Most Ukrainian state services now run through an app. When registration fails from abroad — and it often does — the cause is usually a missing tax number or a passport the register cannot verify.",
      uk: "Більшість державних сервісів України сьогодні працюють через застосунок. Коли реєстрація з-за кордону не проходить — а це трапляється часто — причина зазвичай у відсутньому податковому номері або в паспорті, який реєстр не може перевірити.",
    },
    items: [
      {
        id: "diia-registration",
        labels: {
          ro: "Aplicația și portalul Дія: înregistrare (inclusiv cu pașaport biometric), documente digitale",
          ru: "Приложение и портал «Дія»: регистрация (в т. ч. по биометрическому паспорту), цифровые документы",
          en: "The Дія app and portal: registration (including by biometric passport), digital documents",
          uk: "Застосунок і портал «Дія»: реєстрація (зокрема за біометричним паспортом), цифрові документи",
        },
      },
      {
        id: "diia-signature",
        labels: {
          ro: "Crearea semnăturii electronice calificate în Дія",
          ru: "Создание квалифицированной электронной подписи Дія",
          en: "Creating a qualified electronic signature in Дія",
          uk: "Створення кваліфікованого електронного підпису Дія",
        },
      },
      {
        id: "reserve-plus",
        labels: {
          ro: "Asistență cu serviciul de evidență militară Rezerv+",
          ru: "Помощь с сервисом военного учёта «Резерв+»",
          en: "Support with the Reserve+ military registration service",
          uk: "Допомога із сервісом військового обліку «Резерв+»",
        },
      },
      {
        id: "rnokpp",
        labels: {
          ro: "Cod fiscal RNOKPP: înscrierea numărului fiscal în Registrul Demografic de Stat Unificat pentru utilizarea deplină a pașaportului biometric",
          ru: "РНОКПП: внесение налогового номера в Единый государственный демографический реестр для полноценного использования биометрического паспорта",
          en: "Individual taxpayer number (RNOKPP): entering the tax number into the Unified State Demographic Register so the biometric passport can be used in full",
          uk: "РНОКПП: внесення податкового номера до Єдиного державного демографічного реєстру для повноцінного використання біометричного паспорта",
        },
      },
      {
        id: "property-registers",
        labels: {
          ro: "Înscrierea drepturilor patrimoniale în registrele de stat ale Ucrainei și cererea de compensație pentru bunuri avariate sau distruse din cauza războiului",
          ru: "Внесение информации об имущественных правах в государственные реестры Украины и подача заявления на компенсацию за повреждённое или разрушенное войной имущество",
          en: "Entering property rights into the State Registers of Ukraine, and applications for compensation for property damaged or destroyed as a result of the war",
          uk: "Внесення відомостей про майнові права до державних реєстрів України та подання на компенсацію за пошкоджене або зруйноване війною майно",
        },
      },
    ],
  },
  {
    id: "pensions",
    icon: "shield",
    shortTitles: { ro: "Pensii", ru: "Пенсии", en: "Pensions", uk: "Пенсії" },
    titles: {
      ro: "Pensii din Ucraina plătite în străinătate",
      ru: "Пенсии из Украины, выплачиваемые за границей",
      en: "Ukrainian pensions paid abroad",
      uk: "Пенсії з України, що виплачуються за кордоном",
    },
    intros: {
      ro: "O pensie din Ucraina nu se oprește pentru că ați plecat din țară. Se oprește pentru că a expirat un termen de identificare. Atât identificarea, cât și restanțele se pot rezolva.",
      ru: "Пенсия из Украины прекращается не потому, что вы уехали. Она прекращается из-за пропущенного срока идентификации. И идентификацию можно восстановить, и задолженность — взыскать.",
      en: "A pension from Ukraine does not stop because you left the country. It stops because an identification deadline passed. The identification can be restored and the arrears claimed.",
      uk: "Пенсія з України припиняється не тому, що ви виїхали. Вона припиняється через пропущений строк ідентифікації. Ідентифікацію можна поновити, а заборгованість — стягнути.",
    },
    items: [
      {
        id: "restore-payments",
        labels: {
          ro: "Restabilirea și reluarea plăților de pensie din Ucraina",
          ru: "Восстановление и возобновление пенсионных выплат из Украины",
          en: "Restoration and resumption of pension payments from Ukraine",
          uk: "Відновлення та поновлення пенсійних виплат з України",
        },
      },
      {
        id: "identification",
        labels: {
          ro: "Identificarea pensionarilor: prin videoidentificare, prin Дія sau prin portalul Fondului de Pensii al Ucrainei",
          ru: "Идентификация пенсионеров: видеоидентификация, через приложение Дія или через веб-портал ПФУ",
          en: "Identification of pensioners: video identification, through Дія, or through the Pension Fund of Ukraine web portal",
          uk: "Ідентифікація пенсіонерів: відеоідентифікація, через застосунок Дія або через вебпортал ПФУ",
        },
      },
      {
        id: "declaration",
        labels: {
          ro: "Declarația privind neprimirea pensiei în alt stat",
          ru: "Декларация о неполучении пенсии в других государствах",
          en: "Declaration of non-receipt of a pension in another state",
          uk: "Декларація про неотримання пенсії в інших державах",
        },
      },
      {
        id: "award-recalc",
        labels: {
          ro: "Stabilirea pensiei, recalcularea (inclusiv executarea hotărârilor judecătorești) și schimbarea modalității de plată",
          ru: "Назначение пенсии, перерасчёт (в т. ч. исполнение судебных решений) и смена способа выплаты",
          en: "Award of a pension, recalculation (including enforcement of court judgments) and change of the payment method",
          uk: "Призначення пенсії, перерахунок (зокрема виконання судових рішень) та зміна способу виплати",
        },
      },
      {
        id: "social-assistance",
        labels: {
          ro: "Ajutor social pentru persoanele fără stagiul necesar; stabilirea pensiei cu plata suplimentară a contribuțiilor",
          ru: "Социальная помощь для лиц без необходимого стажа; назначение пенсии по стажу с доплатой взносов",
          en: "Social assistance for persons without a sufficient insurance record; award of a pension with voluntary payment of additional contributions",
          uk: "Соціальна допомога особам без потрібного стажу; призначення пенсії за стажем із доплатою внесків",
        },
      },
      {
        id: "workbook",
        labels: {
          ro: "Digitalizarea carnetului de muncă",
          ru: "Оцифровка трудовой книжки",
          en: "Digitisation of the employment record book",
          uk: "Оцифрування трудової книжки",
        },
      },
    ],
  },
  {
    id: "banking",
    icon: "calculator",
    shortTitles: { ro: "Bănci", ru: "Банки", en: "Banking", uk: "Банки" },
    titles: {
      ro: "Accesul la conturile și cardurile bancare ucrainene",
      ru: "Доступ к украинским банковским счетам и картам",
      en: "Access to Ukrainian bank accounts and cards",
      uk: "Доступ до українських банківських рахунків і карток",
    },
    intros: {
      ro: "Un card ucrainean activ nu înseamnă doar bani. Este modul în care vă autentificați în Дія, pe portalul Fondului de Pensii și în coada consulară.",
      ru: "Действующая украинская карта — это не только деньги. Это способ войти в приложение Дія, на портал ПФУ и в консульскую электронную очередь.",
      en: "A working Ukrainian card is not only about money. It is how you log in to Дія, to the Pension Fund portal, and to the consular queue.",
      uk: "Дійсна українська картка — це не лише гроші. Це спосіб увійти до застосунку Дія, на портал ПФУ та до консульської електронної черги.",
    },
    items: [
      {
        id: "restore-banking",
        labels: {
          ro: "Restabilirea accesului la serviciile bancare din Ucraina",
          ru: "Восстановление доступа к банковским сервисам Украины",
          en: "Restoring access to Ukrainian banking services",
          uk: "Відновлення доступу до банківських сервісів України",
        },
      },
      {
        id: "remote-card",
        labels: {
          ro: "Deschiderea la distanță a cardurilor băncilor ucrainene — inclusiv ca metodă de autentificare în serviciile electronice și în coada consulară",
          ru: "Дистанционное открытие карт украинских банков — в т. ч. как способ регистрации в электронных сервисах и в электронной очереди",
          en: "Remote opening of Ukrainian bank cards — also as a means of authenticating into Ukrainian e-services and the consular queue",
          uk: "Дистанційне відкриття карток українських банків — зокрема як спосіб реєстрації в електронних сервісах та в електронній черзі",
        },
      },
    ],
  },
  {
    id: "records",
    icon: "file-text",
    shortTitles: { ro: "Acte și arhive", ru: "Документы и архивы", en: "Records & archives", uk: "Документи та архіви" },
    titles: {
      ro: "Certificate de naștere, înregistrarea domiciliului și documente din arhivele Ucrainei",
      ru: "Свидетельства о рождении, регистрация места жительства и документы из архивов Украины",
      en: "Birth certificates, residence registration and documents from Ukrainian archives",
      uk: "Свідоцтва про народження, реєстрація місця проживання та документи з архівів України",
    },
    intros: {
      ro: "Acestea sunt și actele pe care se construiesc dosarele de cetățenie moldovenească sau română — și cele care se obțin cel mai greu. Începeți-le devreme.",
      ru: "Это те же документы, на которых строятся дела о гражданстве Молдовы или Румынии, и получение их занимает больше всего времени. Начинайте заранее.",
      en: "These are also the records that Moldovan and Romanian citizenship applications are built on, and the ones that take longest to retrieve. Start them early.",
      uk: "Це ті самі документи, на яких будуються справи про громадянство Молдови чи Румунії, і саме їх отримання забирає найбільше часу. Починайте заздалегідь.",
    },
    items: [
      {
        id: "birth-certificates",
        labels: {
          ro: "Certificate de naștere: înlocuirea conform noilor reguli și înscrierea în Дія",
          ru: "Свидетельства о рождении: замена по новым правилам и внесение в приложение Дія",
          en: "Birth certificates: replacement under the new rules and entry into Дія",
          uk: "Свідоцтва про народження: заміна за новими правилами та внесення до застосунку Дія",
        },
      },
      {
        id: "residence-registration",
        labels: {
          ro: "Înregistrarea și radierea domiciliului în Ucraina, certificate de domiciliu",
          ru: "Регистрация и снятие с регистрации места жительства в Украине, справки о месте жительства",
          en: "Registration and de-registration of place of residence in Ukraine, and residence certificates",
          uk: "Реєстрація та зняття з реєстрації місця проживання в Україні, довідки про місце проживання",
        },
      },
      {
        id: "statelessness",
        labels: {
          ro: "Documentarea persoanelor care au doar certificat de naștere; cazuri de apatridie",
          ru: "Документирование лиц, имеющих только свидетельство о рождении; случаи безгражданства",
          en: "Documenting persons who hold only a birth certificate; statelessness cases",
          uk: "Документування осіб, які мають лише свідоцтво про народження; випадки безгромадянства",
        },
      },
      {
        id: "archives",
        labels: {
          ro: "Certificate, extrase și documente din arhivele Ucrainei pentru dosarele de obținere a cetățeniei Republicii Moldova sau României",
          ru: "Справки, выписки и архивная документация из архивов Украины для подачи на гражданство Республики Молдова или Румынии",
          en: "Certificates, extracts and archival records from Ukrainian archives for Moldovan or Romanian citizenship applications",
          uk: "Довідки, витяги та архівні документи з архівів України для подання на громадянство Республіки Молдова або Румунії",
        },
      },
    ],
  },
  {
    id: "moldova",
    icon: "check-circle",
    shortTitles: { ro: "Statut în Moldova", ru: "Статус в Молдове", en: "Status in Moldova", uk: "Статус у Молдові" },
    titles: {
      ro: "Protecție temporară și permis de ședere în Republica Moldova",
      ru: "Временная защита и вид на жительство в Республике Молдова",
      en: "Temporary protection and residence permits in Moldova",
      uk: "Тимчасовий захист і посвідка на проживання в Республіці Молдова",
    },
    intros: {
      ro: "Asistența pentru protecția temporară este gratuită, indiferent de caz. Nu percepem onorariu de la cetățenii ucraineni pentru statutul care le permite să rămână legal.",
      ru: "Помощь по временной защите предоставляется бесплатно, независимо от случая. Мы не берём с граждан Украины плату за статус, который позволяет им законно находиться в стране.",
      en: "Support with temporary protection is free of charge, whatever your case. We do not charge Ukrainian citizens for the status that lets them stay lawfully.",
      uk: "Допомога з тимчасовим захистом надається безкоштовно, незалежно від випадку. Ми не беремо з громадян України плати за статус, який дозволяє їм законно перебувати в країні.",
    },
    items: [
      {
        id: "temporary-protection",
        labels: {
          ro: "Protecție temporară — gratuit: înregistrare, programarea interviului, prelungire, consultanță privind drepturile beneficiarilor, renunțarea, din țări terțe, la protecția temporară acordată de Moldova",
          ru: "Временная защита — бесплатно: регистрация, запись на интервью, продление, консультации по правам бенефициаров, отказ от временной защиты Молдовы из третьих стран",
          en: "Temporary protection — free of charge: registration, booking the interview, extension, advice on beneficiaries’ rights, and renunciation of Moldovan temporary protection from a third country",
          uk: "Тимчасовий захист — безкоштовно: реєстрація, запис на співбесіду, продовження, консультації щодо прав бенефіціарів, відмова від тимчасового захисту Молдови з третіх країн",
        },
      },
      {
        id: "residence-permit-md",
        labels: {
          ro: "Permis de ședere în Republica Moldova: depunere și prelungire",
          ru: "Вид на жительство в Республике Молдова: подача и продление",
          en: "Residence permit in the Republic of Moldova: applications and extensions",
          uk: "Посвідка на проживання в Республіці Молдова: подання та продовження",
        },
      },
      {
        id: "related-md",
        labels: {
          ro: "Chestiuni conexe: deduceri fiscale pentru străini, revizia tehnică și șederea legală a automobilelor ucrainene, obținerea cetățeniei Republicii Moldova",
          ru: "Смежные вопросы: налоговые вычеты для иностранцев, техосмотр и пребывание украинских авто, получение гражданства Молдовы",
          en: "Related matters: tax deductions for foreign nationals, roadworthiness testing and the lawful stay of Ukrainian-registered vehicles, and acquisition of Moldovan citizenship",
          uk: "Суміжні питання: податкові відрахування для іноземців, техогляд і перебування українських автомобілів, набуття громадянства Молдови",
        },
      },
    ],
  },
  {
    id: "border",
    icon: "map-pin",
    shortTitles: { ro: "Frontieră și vamă", ru: "Граница и таможня", en: "Border & customs", uk: "Кордон і митниця" },
    titles: {
      ro: "Trecerea frontierei Ucraina–Moldova: copii, vamă și vize",
      ru: "Пересечение границы Украина–Молдова: дети, таможня и визы",
      en: "Crossing the Ukraine–Moldova border: children, customs and visas",
      uk: "Перетин кордону Україна–Молдова: діти, митниця та візи",
    },
    intros: {
      ro: "Călătoria cu un copil care nu este al dumneavoastră pe hârtie este locul unde apar cele mai multe probleme la frontieră. Actele sunt simple dacă se pregătesc din timp.",
      ru: "Поездка с ребёнком, который по документам не ваш, — источник большинства проблем на границе. Документы оформляются просто, если заняться ими заранее.",
      en: "Travelling with a child who is not yours on paper is where most border problems start. The paperwork is straightforward when it is prepared in advance.",
      uk: "Подорож із дитиною, яка за документами не ваша, — джерело більшості проблем на кордоні. Документи оформлюються просто, якщо зайнятися ними заздалегідь.",
    },
    items: [
      {
        id: "minors",
        labels: {
          ro: "Ieșirea din Ucraina și intrarea în Ucraina cu minori, procuri pentru însoțitor",
          ru: "Выезд и въезд с несовершеннолетними, доверенности на сопровождение",
          en: "Travel with minors into and out of Ukraine, and powers of attorney authorising an accompanying adult",
          uk: "Виїзд з України та в’їзд в Україну з неповнолітніми, довіреності на супровід",
        },
      },
      {
        id: "customs",
        labels: {
          ro: "Regimul vamal la intrarea în Ucraina și în Republica Moldova",
          ru: "Таможенный режим въезда в Украину и в Республику Молдова",
          en: "Customs regime on entry into Ukraine and into the Republic of Moldova",
          uk: "Митний режим в’їзду в Україну та в Республіку Молдова",
        },
      },
      {
        id: "visas",
        labels: {
          ro: "Obținerea vizelor ucrainene pentru cetățenii străini",
          ru: "Визовое оформление — получение виз в Украину для иностранных граждан",
          en: "Visa processing — Ukrainian visas for foreign nationals",
          uk: "Оформлення віз в Україну для іноземних громадян",
        },
      },
      {
        id: "residence-ua",
        labels: {
          ro: "Obținerea permisului de ședere în Ucraina",
          ru: "Получение вида на жительство в Украине",
          en: "Residence permits in Ukraine",
          uk: "Отримання посвідки на проживання в Україні",
        },
      },
    ],
  },
  {
    id: "family",
    icon: "users",
    shortTitles: { ro: "Dreptul familiei", ru: "Семейное право", en: "Family law", uk: "Сімейне право" },
    titles: {
      ro: "Divorț, pensie de întreținere și dreptul familiei în instanțele din Ucraina",
      ru: "Развод, алименты и семейные дела в судах Украины",
      en: "Divorce, child maintenance and family matters in Ukrainian courts",
      uk: "Розірвання шлюбу, аліменти та сімейні справи в судах України",
    },
    intros: {
      ro: "Nu trebuie să vă întoarceți în Ucraina ca să desfaceți o căsătorie sau ca să obligați un părinte absent să plătească. Ambele proceduri se conduc din Moldova.",
      ru: "Вам не нужно возвращаться в Украину, чтобы расторгнуть брак или заставить платить отсутствующего родителя. Обе процедуры ведутся из Молдовы.",
      en: "You do not have to return to Ukraine to end a marriage, or to make an absent parent pay. Both proceedings run from Moldova.",
      uk: "Вам не потрібно повертатися в Україну, щоб розірвати шлюб або змусити платити відсутнього з батьків. Обидві процедури ведуться з Молдови.",
    },
    items: [
      {
        id: "divorce",
        labels: {
          ro: "Desfacerea căsătoriei la distanță prin instanțele ucrainene, fără deplasare în Ucraina",
          ru: "Дистанционное расторжение брака через украинские суды — без въезда в Украину",
          en: "Remote dissolution of marriage through the Ukrainian courts, without travelling to Ukraine",
          uk: "Дистанційне розірвання шлюбу через українські суди — без в’їзду в Україну",
        },
      },
      {
        id: "maintenance",
        labels: {
          ro: "Pensie de întreținere (pentru copii și fostul soț): procedura judiciară de încasare în Ucraina, din străinătate",
          ru: "Алименты (на детей и супруга): судебная процедура взыскания в Украине из-за рубежа",
          en: "Maintenance (child and spousal support): recovery proceedings in Ukraine conducted from abroad",
          uk: "Аліменти (на дітей і на подружжя): судова процедура стягнення в Україні з-за кордону",
        },
      },
      {
        id: "no-impediment",
        labels: {
          ro: "Certificat de stare civilă privind lipsa impedimentelor la căsătorie (pentru căsătoria în Moldova)",
          ru: "Справка об отсутствии брака (для заключения брака в Молдове)",
          en: "Certificate of no impediment to marriage (single-status certificate), for marrying in Moldova",
          uk: "Довідка про сімейний стан (для укладення шлюбу в Молдові)",
        },
      },
      {
        id: "surname",
        labels: {
          ro: "Schimbarea numelui după căsătorie sau divorț: ciclul complet de înlocuire a actelor, inclusiv transliterarea numelui în pașapoartele ucrainene și moldovenești",
          ru: "Смена фамилии после брака или развода: полный цикл замены документов, включая транслитерацию имени в украинских и молдавских паспортах",
          en: "Change of surname after marriage or divorce: the full document-replacement cycle, including transliteration of the name across Ukrainian and Moldovan passports",
          uk: "Зміна прізвища після шлюбу або розлучення: повний цикл заміни документів, включно з транслітерацією імені в українських і молдовських паспортах",
        },
      },
      {
        id: "child-born-md",
        labels: {
          ro: "Înregistrarea copilului născut în Moldova: legalizarea certificatului moldovenesc pentru recunoașterea de către Ambasada Ucrainei",
          ru: "Регистрация ребёнка, рождённого в Молдове: легализация молдавской справки о рождении для признания посольством Украины",
          en: "Registration of a child born in Moldova: legalisation of the Moldovan birth record for recognition by the Embassy of Ukraine",
          uk: "Реєстрація дитини, народженої в Молдові: легалізація молдовського свідоцтва про народження для визнання Посольством України",
        },
      },
      {
        id: "succession",
        labels: {
          ro: "Proceduri succesorale pentru cetățenii ucraineni aflați în străinătate",
          ru: "Наследственные процедуры для граждан Украины за рубежом",
          en: "Succession and inheritance procedures for Ukrainian citizens abroad",
          uk: "Спадкові процедури для громадян України за кордоном",
        },
      },
      {
        id: "death",
        labels: {
          ro: "Acțiuni în caz de deces al unui cetățean ucrainean în Moldova",
          ru: "Действия при смерти гражданина Украины в Молдове",
          en: "Steps to take on the death of a Ukrainian citizen in Moldova",
          uk: "Дії у разі смерті громадянина України в Молдові",
        },
      },
      {
        id: "guardianship",
        labels: {
          ro: "Tutelă și curatelă: acte pentru copiii aflați sub tutelă",
          ru: "Опека и попечительство: документы для детей под опекой",
          en: "Guardianship and custody: documents for children under guardianship",
          uk: "Опіка та піклування: документи для дітей під опікою",
        },
      },
    ],
  },
  {
    id: "representation",
    icon: "scale",
    shortTitles: { ro: "Reprezentare", ru: "Представительство", en: "Representation", uk: "Представництво" },
    titles: {
      ro: "Reprezentare în fața autorităților și instanțelor din Ucraina",
      ru: "Представительство перед органами и судами Украины",
      en: "Legal representation before Ukrainian authorities and courts",
      uk: "Представництво перед органами та судами України",
    },
    intros: {
      ro: "Când o autoritate v-a refuzat, soluția rareori este să depuneți din nou. Este să aflați în scris pe ce temei.",
      ru: "Если орган вам отказал, решение редко состоит в повторной подаче. Оно в том, чтобы получить письменное основание отказа.",
      en: "When an authority has refused you, the answer is rarely to apply again. It is to find out on what grounds, in writing.",
      uk: "Якщо орган вам відмовив, рішення рідко полягає в повторному поданні. Воно в тому, щоб отримати письмову відмову із зазначенням підстав.",
    },
    items: [
      {
        id: "applications",
        labels: {
          ro: "Pregătirea cererilor și a corespondenței către autoritățile de stat ale Ucrainei",
          ru: "Подготовка обращений и писем в государственные органы Украины",
          en: "Drafting applications and correspondence to Ukrainian state authorities",
          uk: "Підготовка звернень і листів до державних органів України",
        },
      },
      {
        id: "attorney-requests",
        labels: {
          ro: "Solicitări avocațiale în Ucraina",
          ru: "Адвокатские запросы в Украине",
          en: "Attorney’s requests for information in Ukraine",
          uk: "Адвокатські запити в Україні",
        },
      },
      {
        id: "court-representation",
        labels: {
          ro: "Reprezentare în instanțe în cauze legate de strămutarea din Ucraina în Republica Moldova din cauza războiului (cu excepția cauzelor penale și fiscale)",
          ru: "Представительство интересов в судах по делам, связанным с перемещением из Украины в Республику Молдова в связи с войной (кроме уголовных и налоговых дел)",
          en: "Representation before the courts in matters arising from displacement from Ukraine to Moldova as a result of the war (criminal and tax matters excluded)",
          uk: "Представництво інтересів у судах у справах, пов’язаних із переміщенням з України до Республіки Молдова через війну (крім кримінальних і податкових справ)",
        },
      },
    ],
  },
  {
    id: "training",
    icon: "award",
    shortTitles: { ro: "Instruiri", ru: "Тренинги", en: "Training", uk: "Тренінги" },
    titles: {
      ro: "Instruiri și sesiuni informative pentru ONG-uri și sectorul umanitar",
      ru: "Тренинги и информационные сессии для НКО и гуманитарного сектора",
      en: "Training and information sessions for NGOs and the humanitarian sector",
      uk: "Тренінги та інформаційні сесії для ГО та гуманітарного сектору",
    },
    intros: {
      ro: "Pentru echipele care consiliază cetățeni ucraineni și au nevoie ca legislația să le fie explicată o dată, temeinic.",
      ru: "Для команд, которые консультируют граждан Украины, и которым нужно, чтобы законодательство объяснили один раз и по существу.",
      en: "For teams advising Ukrainian citizens who need the underlying law explained once, properly.",
      uk: "Для команд, які консультують громадян України і яким потрібно, щоб законодавство пояснили один раз і по суті.",
    },
    items: [
      {
        id: "legislation-training",
        labels: {
          ro: "Instruiri privind legislația Ucrainei",
          ru: "Тренинги по вопросам украинского законодательства",
          en: "Training on Ukrainian legislation",
          uk: "Тренінги з питань українського законодавства",
        },
      },
      {
        id: "materials",
        labels: {
          ro: "Elaborarea materialelor informative",
          ru: "Создание информационных материалов",
          en: "Development of information materials",
          uk: "Створення інформаційних матеріалів",
        },
      },
      {
        id: "advocacy",
        labels: {
          ro: "Servicii de advocacy",
          ru: "Услуги адвокации",
          en: "Advocacy services",
          uk: "Послуги адвокації",
        },
      },
    ],
  },
];

/**
 * Display order for both the page catalogue and the modal's category grid.
 *
 * Deliberately NOT the order the source list was written in — that was the
 * author's filing order. This is ordered by how often people actually arrive
 * with each problem, because a selection list is scanned top-down and the
 * first two rows absorb most of the choices:
 *
 * 1. embassy   — highest volume; passports and the queue are the single most
 *                common reason people make contact.
 * 2. moldova   — temporary protection is free and is the first thing a newly
 *                arrived person needs; putting it second removes the fear that
 *                asking will cost money.
 * 3. pensions  — the other high-volume call.
 * 4. digital   — Дія/Reserve+ underpin most of the above, so it sits directly
 *                after the things it unblocks.
 * 5. records   — feeds citizenship applications; steady but less urgent.
 * 6. family    — high stakes, lower frequency.
 * 7. banking   — usually a means to an end rather than the reason for calling.
 * 8. border    — episodic, tied to a specific trip.
 * 9. representation — escalation path, reached after something else failed.
 * 10. training — a different audience entirely (NGOs), so it goes last rather
 *                than interrupting the list for individuals.
 *
 * "Other" is appended by the UI, never listed here: an escape hatch belongs at
 * the end of a set of choices, after every concrete option has been seen.
 */
const CATEGORY_ORDER = [
  "embassy",
  "moldova",
  "pensions",
  "digital",
  "records",
  "family",
  "banking",
  "border",
  "representation",
  "training",
] as const;

export const ukraineCatalogue: UkraineCategory[] = CATEGORY_ORDER.map((id) => {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown Ukraine catalogue category: ${id}`);
  return category;
});

/** Total selectable items across all categories (excluding "other"). */
export const ukraineItemCount = ukraineCatalogue.reduce((n, c) => n + c.items.length, 0);

/**
 * Resolves a `<categoryId>:<itemId>` key back to its human label, for the
 * booking summary and the enquiry notes. Returns undefined for unknown keys so
 * callers can fall back to the raw value rather than crash.
 */
export function ukraineItemLabel(key: string, locale: PageLocale): string | undefined {
  const [categoryId, itemId] = key.split(":");
  const category = ukraineCatalogue.find((c) => c.id === categoryId);
  if (!category) return undefined;
  const item = category.items.find((i) => i.id === itemId);
  if (!item) return undefined;
  return `${category.shortTitles[locale]} — ${item.labels[locale]}`;
}

/** Composes the stable key stored in the booking payload. */
export function ukraineItemKey(categoryId: string, itemId: string): string {
  return `${categoryId}:${itemId}`;
}
