import { sectionUrl, type Locale, LOCALES } from "@expertcont/i18n";

/**
 * Industry ("domeniu") definitions powering the /domenii hub and its detail
 * pages. The `slug` is shared across locales — only the section segment differs
 * per locale (domenii / otrasli / industries), handled by `sectionUrl`.
 *
 * `description` is the ~100-word card/intro copy. Deep spoke content
 * (challenges, FAQ) is added later per the industries-pseo plan.
 */
export type IndustryId =
  | "tech-and-saas"
  | "e-commerce"
  | "retail"
  | "horeca"
  | "constructii"
  | "productie"
  | "servicii-profesionale"
  | "ong"
  | "logistica-si-transport"
  | "sanatate"
  | "agricultura"
  | "imobiliare";

export interface Industry {
  id: IndustryId;
  /** URL slug, shared across locales. */
  slug: string;
  /** Card title — the industry name. */
  title: Record<Locale, string>;
  /** ~100-word sector description. */
  description: Record<Locale, string>;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "tech-and-saas",
    slug: "tech-saas",
    title: { ro: "Tech & SaaS", ru: "Tech & SaaS", en: "Tech & SaaS" },
    description: {
      ro: "Companiile IT și SaaS din Moldova au realități fiscale aparte: rezidența în Moldova IT Park și impozitul unic de 7%, venituri din abonamente recurente, clienți din afara țării și TVA pe serviciile digitale transfrontaliere. Adăugăm opțiuni pe acțiuni pentru echipă, cheltuieli de cercetare-dezvoltare și facturare electronică. Ținem contabilitatea ca să te poți concentra pe produs, nu pe declarații: urmărim corect veniturile recurente, gestionăm relația cu IT Park și ne asigurăm că fiecare factură către clienții străini e tratată conform legii. Primești un manager de cont care înțelege cum funcționează un business de software.",
      ru: "У IT- и SaaS-компаний в Молдове своя налоговая реальность: резидентство в Moldova IT Park и единый налог 7%, доход от регулярных подписок, зарубежные клиенты и НДС на трансграничные цифровые услуги. Добавьте опционы для команды, расходы на разработку и электронные счета-фактуры. Мы ведём учёт, чтобы вы занимались продуктом, а не декларациями: корректно учитываем регулярную выручку, ведём отношения с IT Park и следим, чтобы каждый счёт зарубежному клиенту был оформлен по закону. Вы получаете персонального менеджера, который понимает, как устроен софтверный бизнес.",
      en: "IT and SaaS companies in Moldova face their own tax reality: Moldova IT Park residency and the 7% single tax, recurring subscription revenue, clients abroad and VAT on cross-border digital services. Add stock options for the team, R&D spend and e-invoicing. We keep the books so you can focus on the product, not the filings: we track recurring revenue correctly, manage the IT Park relationship and make sure every invoice to a foreign client is handled by the book. You get an account manager who understands how a software business actually works.",
    },
  },
  {
    id: "e-commerce",
    slug: "e-commerce",
    title: { ro: "E-commerce", ru: "E-commerce", en: "E-commerce" },
    description: {
      ro: "Un magazin online nu se contabilizează ca unul fizic. Vânzări online, TVA pe livrări și pe vânzările transfrontaliere, plăți prin card și agregatori, retururi, comisioane de marketplace și reconcilierea încasărilor cu zeci de tranzacții zilnice — toate cer o evidență construită pentru comerțul electronic. Sincronizăm datele din platformă, procesatorii de plăți și curieri cu contabilitatea, urmărim corect stocul și calculăm marja reală pe produs. Te ajutăm să știi exact ce TVA datorezi pe fiecare canal de vânzare și să eviți surprizele la control. Tu vinzi, noi ținem cifrele în ordine.",
      ru: "Интернет-магазин учитывается иначе, чем офлайн-точка. Онлайн-продажи, НДС на доставку и трансграничные продажи, оплата картой и через агрегаторы, возвраты, комиссии маркетплейсов и сверка поступлений с десятками транзакций в день — всё это требует учёта, выстроенного под e-commerce. Мы синхронизируем данные платформы, платёжных систем и курьеров с бухгалтерией, корректно ведём склад и считаем реальную маржу по товару. Помогаем точно знать, какой НДС вы должны по каждому каналу продаж, и избегать сюрпризов на проверке. Вы продаёте — мы держим цифры в порядке.",
      en: "An online store isn't accounted for like a physical one. Online sales, VAT on delivery and cross-border sales, card and aggregator payments, returns, marketplace fees and reconciling takings across dozens of daily transactions — all demand bookkeeping built for e-commerce. We sync your platform, payment processors and couriers with the books, track stock correctly and calculate real margin per product. We help you know exactly what VAT you owe on each sales channel and avoid surprises at audit. You sell, we keep the numbers in order.",
    },
  },
  {
    id: "retail",
    slug: "retail",
    title: { ro: "Retail", ru: "Розничная торговля", en: "Retail" },
    description: {
      ro: "Comerțul cu amănuntul înseamnă case de marcat, încasări preponderent în numerar, stocuri mari și marje mici pe care fiecare leu contează. Configurăm corect grupele de TVA în casa de marcat, ținem evidența stocurilor și a pierderilor, urmărim adaosul comercial și sincronizăm rapoartele Z cu contabilitatea. Gestionăm relația cu furnizorii multipli și inventarele periodice, ca diferențele de casă să nu se transforme în amenzi. Fie că ai un singur magazin sau o rețea, primești cifre clare despre ce se vinde, ce aduce profit și unde pierzi bani — și un partener care răspunde rapid.",
      ru: "Розничная торговля — это кассовые аппараты, преимущественно наличная выручка, большие запасы и низкая маржа, где важен каждый лей. Мы правильно настраиваем группы НДС в кассе, ведём учёт запасов и потерь, отслеживаем торговую наценку и сверяем Z-отчёты с бухгалтерией. Ведём отношения с множеством поставщиков и периодические инвентаризации, чтобы кассовые расхождения не превращались в штрафы. Один магазин или сеть — вы получаете ясные цифры о том, что продаётся, что приносит прибыль и где вы теряете деньги, и партнёра, который быстро отвечает.",
      en: "Retail means tills, mostly-cash takings, large stock and thin margins where every leu counts. We configure VAT groups correctly in the till, track stock and shrinkage, monitor markup and reconcile Z-reports against the books. We manage relationships with many suppliers and periodic inventories so cash discrepancies don't turn into fines. Whether you run a single shop or a chain, you get clear numbers on what sells, what's profitable and where you're losing money — and a partner who answers fast.",
    },
  },
  {
    id: "horeca",
    slug: "horeca",
    title: { ro: "HoReCa", ru: "HoReCa", en: "HoReCa" },
    description: {
      ro: "Restaurantele, cafenelele și hotelurile lucrează cu produse perisabile, încasări în numerar și personal sezonier care intră și iese. Asta înseamnă TVA diferit pe alimentație și băuturi, gestiune atentă a stocurilor și a pierderilor din bucătărie, bacșiș tratat corect fiscal și state de plată care se schimbă lună de lună. Configurăm casa de marcat, justificăm rebuturile documentar și calculăm costul real al fiecărei porții. Te ajutăm să ții disciplina de casă impecabilă și să eviți amenzile la control. Tu te ocupi de sală și de bucătărie — noi ținem contabilitatea ca la carte.",
      ru: "Рестораны, кафе и отели работают со скоропортящимися продуктами, наличной выручкой и сезонным персоналом, который приходит и уходит. Это значит разный НДС на еду и напитки, внимательный учёт запасов и потерь на кухне, корректный налоговый учёт чаевых и расчёт зарплат, который меняется из месяца в месяц. Мы настраиваем кассу, документально обосновываем списания и считаем реальную себестоимость каждой порции. Помогаем держать безупречную кассовую дисциплину и избегать штрафов на проверке. Вы занимаетесь залом и кухней — мы ведём учёт по всем правилам.",
      en: "Restaurants, cafés and hotels deal in perishable goods, cash takings and seasonal staff coming and going. That means different VAT on food and drink, careful stock and kitchen-waste management, tips treated correctly for tax and payroll that changes month to month. We configure the till, document write-offs and calculate the real cost of every dish. We help you keep cash discipline spotless and avoid fines at audit. You run the floor and the kitchen — we keep the books by the rules.",
    },
  },
  {
    id: "constructii",
    slug: "constructii",
    title: { ro: "Construcții", ru: "Строительство", en: "Construction" },
    description: {
      ro: "În construcții, contabilitatea urmează ritmul șantierului: TVA cu taxare inversă, devize și situații de lucrări, subcontractori, rețineri de garanție și proiecte care se întind pe mai multe luni sau ani. Urmărim corect veniturile pe stadiul de execuție, gestionăm avansurile și retențiile și ne asigurăm că fiecare deviz și factură rezistă la control. Adăugăm evidența mijloacelor fixe, a materialelor și a utilajelor. Fie că ridici clădiri rezidențiale, faci lucrări de infrastructură sau ești subantreprenor, primești o imagine clară a marjei pe fiecare proiect — și un contabil care vorbește limba devizelor.",
      ru: "В строительстве учёт следует ритму стройки: НДС с обратным начислением, сметы и акты выполненных работ, субподрядчики, гарантийные удержания и проекты, растянутые на месяцы или годы. Мы корректно учитываем выручку по стадиям выполнения, ведём авансы и удержания и следим, чтобы каждая смета и счёт выдержали проверку. Добавляем учёт основных средств, материалов и техники. Жилые здания, инфраструктурные работы или субподряд — вы получаете ясную картину маржи по каждому проекту и бухгалтера, который говорит на языке смет.",
      en: "In construction, accounting follows the site's rhythm: reverse-charge VAT, estimates and work statements, subcontractors, retention holdbacks and projects spanning months or years. We recognise revenue correctly by stage of completion, manage advances and retentions, and make sure every estimate and invoice survives an audit. We add fixed-asset, materials and equipment accounting. Whether you build residential, do infrastructure work or are a subcontractor, you get a clear view of margin on each project — and an accountant who speaks the language of estimates.",
    },
  },
  {
    id: "productie",
    slug: "productie",
    title: { ro: "Producție", ru: "Производство", en: "Manufacturing" },
    description: {
      ro: "Producția cere o contabilitate care înțelege costul real: materii prime, producție în curs, rețete și consum de materiale, amortizarea utilajelor și, uneori, accize. Construim calculul de cost pe produs, urmărim stocurile pe etape și separăm cheltuielile directe de cele indirecte, ca să știi exact cât te costă fiecare unitate fabricată. Adăugăm evidența mijloacelor fixe și raportarea fiscală la timp. Fie că produci alimente, mobilă, materiale de construcție sau orice altceva, primești cifre pe care te poți baza pentru a stabili prețuri corecte și a-ți crește marja — fără să te pierzi în calcule.",
      ru: "Производство требует учёта, который понимает реальную себестоимость: сырьё, незавершённое производство, рецептуры и расход материалов, амортизация оборудования и иногда акцизы. Мы выстраиваем расчёт себестоимости по продукту, ведём запасы по этапам и разделяем прямые и косвенные расходы, чтобы вы точно знали, во сколько обходится каждая единица продукции. Добавляем учёт основных средств и своевременную налоговую отчётность. Продукты, мебель, стройматериалы или что-то ещё — вы получаете цифры, на которые можно опереться, чтобы устанавливать справедливые цены и растить маржу, не теряясь в расчётах.",
      en: "Manufacturing needs accounting that understands true cost: raw materials, work in progress, recipes and material consumption, equipment depreciation and sometimes excise. We build per-product costing, track stock by stage and separate direct from indirect costs so you know exactly what each unit produced costs you. We add fixed-asset accounting and on-time tax reporting. Whether you make food, furniture, building materials or anything else, you get numbers you can rely on to set fair prices and grow margin — without getting lost in the maths.",
    },
  },
  {
    id: "servicii-profesionale",
    slug: "servicii-profesionale",
    title: {
      ro: "Servicii profesionale",
      ru: "Профессиональные услуги",
      en: "Professional services",
    },
    description: {
      ro: "Firmele de servicii — agenții, cabinete, consultanți, outsourcing — au stoc puțin, dar facturare complexă: ore facturabile, abonamente și retainere, proiecte cu mai mulți clienți și venituri care vin neregulat. Ținem evidența veniturilor pe proiect și client, urmărim încasările și calculăm corect impozitele pe activitatea de servicii. Adăugăm contracte, payroll pentru echipă și consultanță fiscală proactivă, ca să nu plătești mai mult decât trebuie. Primești rapoarte clare despre ce client și ce serviciu îți aduce cel mai mult profit — și un partener contabil care înțelege cum se câștigă banii într-un business bazat pe oameni.",
      ru: "Сервисные компании — агентства, бюро, консультанты, аутсорсинг — имеют мало запасов, но сложное выставление счетов: оплачиваемые часы, подписки и ретейнеры, проекты с разными клиентами и нерегулярная выручка. Мы ведём учёт выручки по проектам и клиентам, отслеживаем поступления и корректно считаем налоги на услуги. Добавляем договоры, расчёт зарплат команды и проактивную налоговую консультацию, чтобы вы не платили лишнего. Вы получаете ясные отчёты о том, какой клиент и услуга приносят больше всего прибыли, и бухгалтера, который понимает, как зарабатываются деньги в бизнесе, построенном на людях.",
      en: "Service firms — agencies, practices, consultants, outsourcing — carry little stock but bill in complex ways: billable hours, subscriptions and retainers, multi-client projects and irregular revenue. We track revenue by project and client, monitor receipts and calculate service-activity taxes correctly. We add contracts, team payroll and proactive tax advice so you don't pay more than you should. You get clear reports on which client and service bring the most profit — and an accounting partner who understands how money is earned in a people-based business.",
    },
  },
  {
    id: "ong",
    slug: "ong",
    title: { ro: "ONG", ru: "НКО", en: "NGO" },
    description: {
      ro: "Organizațiile necomerciale au reguli proprii: fonduri cu destinație, granturi care trebuie raportate separat fiecărui finanțator, statut fiscal special și bugete pe proiecte. Ținem contabilitatea pe surse de finanțare, pregătim rapoartele financiare cerute de donatori și ne asigurăm că fondurile restricționate sunt cheltuite și documentate corect. Adăugăm payroll pentru angajați și voluntari, evidența activelor și conformitatea cu cerințele de transparență. Fie că ești asociație, fundație sau proiect finanțat din granturi, primești o evidență curată care rezistă la auditul finanțatorilor și la control — ca să te poți concentra pe misiune, nu pe hârtii.",
      ru: "У некоммерческих организаций свои правила: целевые фонды, гранты, отчётность по которым нужна отдельно каждому донору, особый налоговый статус и проектные бюджеты. Мы ведём учёт по источникам финансирования, готовим финансовые отчёты для доноров и следим, чтобы целевые средства расходовались и документировались правильно. Добавляем расчёт зарплат сотрудников и волонтёров, учёт активов и соответствие требованиям прозрачности. Ассоциация, фонд или грантовый проект — вы получаете чистый учёт, который выдержит аудит доноров и проверку, чтобы вы могли сосредоточиться на миссии, а не на бумагах.",
      en: "Non-profits have their own rules: restricted funds, grants that must be reported separately to each funder, special tax status and project budgets. We keep the books by funding source, prepare the financial reports donors require and make sure restricted funds are spent and documented correctly. We add payroll for staff and volunteers, asset records and compliance with transparency requirements. Whether you're an association, foundation or grant-funded project, you get clean books that withstand funder audits and inspections — so you can focus on the mission, not the paperwork.",
    },
  },
  {
    id: "logistica-si-transport",
    slug: "logistica-transport",
    title: {
      ro: "Logistică & transport",
      ru: "Логистика и транспорт",
      en: "Logistics & transport",
    },
    description: {
      ro: "Firmele de transport și logistică au cheltuieli mari cu combustibilul, parc auto de amortizat, curse internaționale cu TVA specific și diurne pentru șoferi. Ținem evidența pe vehicul și pe cursă, gestionăm corect combustibilul și accizele, urmărim documentele de transport (CMR) și calculăm diurnele și salariile echipajelor. Adăugăm evidența mijloacelor fixe și raportarea fiscală pentru transportul intern și internațional. Fie că faci livrări locale, transport de marfă peste hotare sau gestionezi un depozit, primești o imagine clară a costului pe kilometru și pe cursă — și un contabil care înțelege specificul drumului.",
      ru: "У транспортных и логистических компаний большие расходы на топливо, автопарк для амортизации, международные рейсы с особым НДС и суточные для водителей. Мы ведём учёт по машине и рейсу, корректно учитываем топливо и акцизы, отслеживаем транспортные документы (CMR) и рассчитываем суточные и зарплаты экипажей. Добавляем учёт основных средств и налоговую отчётность для внутренних и международных перевозок. Локальная доставка, грузоперевозки за рубеж или склад — вы получаете ясную картину стоимости километра и рейса и бухгалтера, который понимает специфику дороги.",
      en: "Transport and logistics firms carry heavy fuel costs, a fleet to depreciate, international runs with specific VAT and per-diems for drivers. We keep records per vehicle and per run, handle fuel and excise correctly, track transport documents (CMR) and calculate crew per-diems and pay. We add fixed-asset accounting and tax reporting for domestic and international transport. Whether you do local delivery, cross-border freight or run a warehouse, you get a clear view of cost per kilometre and per run — and an accountant who understands the realities of the road.",
    },
  },
  {
    id: "sanatate",
    slug: "sanatate",
    title: { ro: "Sănătate", ru: "Здравоохранение", en: "Healthcare" },
    description: {
      ro: "Clinicile, cabinetele și farmaciile lucrează sub licențiere strictă, cu servicii medicale scutite de TVA, relația cu CNAM, echipamente scumpe de amortizat și personal numeros. Ținem contabilitatea conform specificului medical, gestionăm corect scutirile de TVA și decontările cu CNAM și urmărim amortizarea aparaturii. Adăugăm payroll pentru medici și asistenți, evidența stocurilor de medicamente sau consumabile și raportarea fiscală la timp. Fie că ai un cabinet individual, o clinică sau o farmacie, primești o evidență care respectă cerințele din domeniu și rezistă la control — ca să te ocupi de pacienți, nu de declarații.",
      ru: "Клиники, кабинеты и аптеки работают под строгим лицензированием, с освобождёнными от НДС медицинскими услугами, отношениями с CNAM, дорогим оборудованием для амортизации и многочисленным персоналом. Мы ведём учёт с учётом медицинской специфики, корректно применяем освобождения от НДС и расчёты с CNAM и отслеживаем амортизацию аппаратуры. Добавляем расчёт зарплат врачей и ассистентов, учёт запасов лекарств и расходников и своевременную налоговую отчётность. Частный кабинет, клиника или аптека — вы получаете учёт, который соответствует требованиям отрасли и выдерживает проверку, чтобы вы занимались пациентами, а не декларациями.",
      en: "Clinics, practices and pharmacies work under strict licensing, with VAT-exempt medical services, the CNAM relationship, expensive equipment to depreciate and large staff. We keep the books to medical specifics, handle VAT exemptions and CNAM settlements correctly and track equipment depreciation. We add payroll for doctors and assistants, medicine and consumables stock records and on-time tax reporting. Whether you have a solo practice, a clinic or a pharmacy, you get books that meet sector requirements and withstand inspection — so you can focus on patients, not filings.",
    },
  },
  {
    id: "agricultura",
    slug: "agricultura",
    title: { ro: "Agricultură", ru: "Сельское хозяйство", en: "Agriculture" },
    description: {
      ro: "Agricultura are reguli fiscale aparte: subvenții AIPA, regim special de TVA, impozit pe teren, muncă sezonieră și active biologice. Ținem evidența pe culturi sau animale, gestionăm corect subvențiile și raportarea lor, calculăm TVA în regimul aplicabil și urmărim cheltuielile sezoniere cu forța de muncă. Adăugăm evidența mijloacelor fixe, a tehnicii agricole și a stocurilor de producție. Fie că lucrezi terenuri, crești animale sau procesezi produse agricole, primești cifre clare despre costul pe hectar și pe cultură și ești sigur că nu pierzi nicio subvenție — cu un contabil care înțelege ciclul agricol.",
      ru: "У сельского хозяйства особые налоговые правила: субсидии AIPA, специальный режим НДС, земельный налог, сезонный труд и биологические активы. Мы ведём учёт по культурам или животным, корректно ведём субсидии и отчётность по ним, считаем НДС в применимом режиме и отслеживаем сезонные расходы на рабочую силу. Добавляем учёт основных средств, сельхозтехники и запасов продукции. Обработка земли, животноводство или переработка сельхозпродукции — вы получаете ясные цифры о стоимости гектара и культуры и уверенность, что не упустите ни одной субсидии, с бухгалтером, который понимает аграрный цикл.",
      en: "Agriculture has its own tax rules: AIPA subsidies, a special VAT regime, land tax, seasonal labour and biological assets. We keep records by crop or livestock, handle subsidies and their reporting correctly, calculate VAT under the applicable regime and track seasonal labour costs. We add fixed-asset, farm-machinery and produce-stock records. Whether you farm land, raise animals or process agricultural produce, you get clear numbers on cost per hectare and per crop and the assurance you won't miss a single subsidy — with an accountant who understands the agricultural cycle.",
    },
  },
  {
    id: "imobiliare",
    slug: "imobiliare",
    title: { ro: "Imobiliare", ru: "Недвижимость", en: "Real estate" },
    description: {
      ro: "Dezvoltatorii, agențiile și administratorii de imobile au de gestionat TVA la vânzare și la chirie, amortizări, impozit pe bunuri imobiliare, venituri în avans și, adesea, asociații de proprietari. Ținem evidența pe proiect și pe imobil, tratăm corect veniturile din vânzări și închirieri și urmărim cheltuielile de dezvoltare și administrare. Adăugăm raportarea fiscală, evidența activelor și consultanță pentru structurarea tranzacțiilor. Fie că dezvolți ansambluri rezidențiale, intermediezi tranzacții sau administrezi spații, primești o imagine clară a marjei pe fiecare proiect și a fluxului de numerar — și un partener care cunoaște piața imobiliară.",
      ru: "Девелоперам, агентствам и управляющим недвижимостью нужно вести НДС при продаже и аренде, амортизацию, налог на недвижимое имущество, доходы будущих периодов и нередко ассоциации собственников. Мы ведём учёт по проекту и объекту, корректно отражаем доходы от продаж и аренды и отслеживаем расходы на девелопмент и управление. Добавляем налоговую отчётность, учёт активов и консультации по структурированию сделок. Жилые комплексы, посредничество в сделках или управление площадями — вы получаете ясную картину маржи по каждому проекту и денежного потока и партнёра, который знает рынок недвижимости.",
      en: "Developers, agencies and property managers must handle VAT on sales and rent, depreciation, real-estate tax, deferred revenue and often owners' associations. We keep records by project and property, treat sales and rental income correctly and track development and management costs. We add tax reporting, asset records and advice on structuring transactions. Whether you develop residential complexes, broker deals or manage space, you get a clear view of margin on each project and of cash flow — and a partner who knows the real-estate market.",
    },
  },
];

const BY_SLUG = new Map(INDUSTRIES.map((i) => [i.slug, i]));

export function getIndustryBySlug(slug: string): Industry | undefined {
  return BY_SLUG.get(slug);
}

/** Detail URL for an industry in a given locale, e.g. /domenii/horeca, /ru/otrasli/horeca. */
export function industryDetailUrl(slug: string, locale: Locale): string {
  return `${sectionUrl("industries", locale)}/${slug}`;
}

/** Per-locale sibling URLs for the hub (/domenii) — feeds hreflang. */
export function industryHubSiblings(): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, sectionUrl("industries", l)]),
  ) as Record<Locale, string>;
}

/** Per-locale sibling URLs for one industry detail page — feeds hreflang. */
export function industryDetailSiblings(slug: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, industryDetailUrl(slug, l)]),
  ) as Record<Locale, string>;
}
