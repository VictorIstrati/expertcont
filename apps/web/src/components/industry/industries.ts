import { sectionUrl, type Locale, type ServiceId, LOCALES } from "@expertcont/i18n";

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

/** One industry-specific challenge fused with how we solve it + the service that does. */
export interface IndustryChallenge {
  title: string;
  /** The sector-specific pain, in the owner's words. */
  problem: string;
  /** How we solve it. */
  solution: string;
  /** Service that addresses it — rendered as a contextual link to /servicii/<slug>. */
  service: ServiceId;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

/** Rich detail-page content. `intro` supports `**bold**` markers for highlighted phrases. */
export interface IndustryDetailContent {
  intro: string;
  /** Optional sector overview; sourced figures inline, omitted when none. */
  overview?: string;
  challenges: IndustryChallenge[];
  faq: IndustryFaq[];
}

export interface Industry {
  id: IndustryId;
  /** URL slug, shared across locales. */
  slug: string;
  /** Card title — the industry name. */
  title: Record<Locale, string>;
  /** ~100-word sector description. */
  description: Record<Locale, string>;
  /** Full detail-page content per locale. Industries without it render the description stub. */
  detail?: Partial<Record<Locale, IndustryDetailContent>>;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "tech-and-saas",
    slug: "tech-saas",
    title: { ro: "Tech & SaaS", ru: "Tech & SaaS", en: "Tech & SaaS" },
    description: {
      ro: "Companiile IT și SaaS din Moldova au realități fiscale aparte: rezidența în Moldova IT Park și impozitul unic de 7% cu pragul minim lunar per angajat, venituri din abonamente recurente, clienți din afara țării și tratamentul TVA pentru serviciile prestate clienților externi și cele importate. Adăugăm opțiuni pe acțiuni pentru echipă, cheltuieli de cercetare-dezvoltare și facturare electronică. Ținem contabilitatea ca să te poți concentra pe produs, nu pe declarații: urmărim corect veniturile recurente, gestionăm relația cu IT Park și ne asigurăm că fiecare factură către clienții străini e tratată conform legii. Primești un manager de cont care înțelege cum funcționează un business de software.",
      ru: "У IT- и SaaS-компаний в Молдове своя налоговая реальность: резидентство в Moldova IT Park и единый налог 7% с минимальным месячным порогом на сотрудника, доход от регулярных подписок, зарубежные клиенты и режим НДС для услуг иностранным клиентам и импортируемых услуг. Добавьте опционы для команды, расходы на разработку и электронные счета-фактуры. Мы ведём учёт, чтобы вы занимались продуктом, а не декларациями: корректно учитываем регулярную выручку, ведём отношения с IT Park и следим, чтобы каждый счёт зарубежному клиенту был оформлен по закону. Вы получаете персонального менеджера, который понимает, как устроен софтверный бизнес.",
      en: "IT and SaaS companies in Moldova face their own tax reality: Moldova IT Park residency and the 7% single tax (with its minimum monthly per-employee floor), recurring subscription revenue, clients abroad and the VAT treatment of services to foreign clients and imported services. Add stock options for the team, R&D spend and e-invoicing. We keep the books so you can focus on the product, not the filings: we track recurring revenue correctly, manage the IT Park relationship and make sure every invoice to a foreign client is handled by the book. You get an account manager who understands how a software business actually works.",
    },
    detail: {
      ro: {
        intro:
          "Un business de software nu se contabilizează ca oricare altul. **Venituri recurente** din abonamente, **clienți din afara țării**, posibilă rezidență în **Moldova IT Park** cu impozitul unic de 7% și opțiuni pe acțiuni pentru echipă — toate cer o contabilitate care înțelege cum funcționează IT-ul. Ținem evidența, calculăm corect taxele și te ajutăm să profiți de regimul fiscal potrivit.",
        overview:
          "Sectorul IT din Moldova are un regim fiscal aparte. Rezidenții Moldova IT Park plătesc un impozit unic de 7% din cifra de afaceri, care înlocuiește impozitul pe profit, impozitul pe venitul angajaților, contribuțiile sociale și medicale, taxele locale și altele — cu condiția ca minimum 70% din venituri să provină din activități IT și cu un prag minim lunar per angajat. TVA rămâne separat, iar serviciile către clienți străini și cele importate au reguli proprii. Ținem evidența, calculăm taxele și te asistăm cu contracte și GDPR.",
        challenges: [
          {
            title: "Regimul IT Park și impozitul unic de 7%",
            problem:
              "Rezidența în Moldova IT Park înseamnă un impozit unic de 7% din cifra de afaceri în loc de mai multe taxe, dar vine cu condiții: minimum 70% din venituri din activități IT și un prag minim lunar per angajat. Calculat greșit, pierzi avantajul sau ratezi conformitatea.",
            solution:
              "Calculăm lunar impozitul de 7% (inclusiv pragul minim per angajat), urmărim ca cel puțin 70% din venituri să provină din activități eligibile și te sfătuim dacă regimul IT Park ți se potrivește.",
            service: "consulting",
          },
          {
            title: "TVA: clienți străini și servicii importate",
            problem:
              "Serviciile prestate clienților din afara țării și cele cumpărate din străinătate (soft, abonamente, subcontractori) au tratamente de TVA diferite. Aplicate greșit, te trezești cu TVA de plătit pe importuri sau cu deduceri pierdute.",
            solution:
              "Stabilim corect locul livrării: serviciile pentru clienți nerezidenți nu se impozitează cu TVA în Moldova (cu documentele de confirmare), iar pentru serviciile importate calculăm și declarăm TVA-ul datorat conform Codului fiscal.",
            service: "accounting",
          },
          {
            title: "Venituri recurente din abonamente",
            problem:
              "Abonamentele plătite în avans (lunar sau anual) nu sunt venit în întregime la încasare. Recunoscute greșit, distorsionează rezultatul și dau cifre pe care nu te poți baza.",
            solution:
              "Recunoaștem corect veniturile recurente pe perioada abonamentului (venituri înregistrate în avans), ca raportarea și profitul să reflecte realitatea afacerii tale.",
            service: "accounting",
          },
          {
            title: "Contracte internaționale, IP și GDPR",
            problem:
              "Contracte cu clienți din mai multe țări, drepturi de proprietate intelectuală asupra codului și protecția datelor — un contract slab sau o politică de date lipsă te expun la riscuri și la pierderea drepturilor.",
            solution:
              "Pregătim și verificăm contractele cu clienții și colaboratorii, clarificăm drepturile de proprietate intelectuală și te asistăm cu conformitatea privind protecția datelor (GDPR).",
            service: "legal",
          },
          {
            title: "Salarizare și opțiuni pe acțiuni",
            problem:
              "Echipe care cresc repede, colaboratori și opțiuni pe acțiuni (ESOP) pentru a-i păstra. În regim IT Park, taxele pe salarii sunt incluse în cei 7%, dar statele de plată și contractele tot trebuie întocmite corect.",
            solution:
              "Întocmim contractele, calculăm și pregătim statele de plată conform regimului aplicabil (inclusiv IT Park) și ținem evidența colaboratorilor și a echipei tale.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Ce acoperă impozitul unic de 7% în IT Park?",
            a: "Cei 7% din cifra de afaceri înlocuiesc impozitul pe profit, impozitul pe venitul angajaților, contribuțiile sociale și medicale, taxele locale, impozitul pe imobil și taxa rutieră. Se aplică dacă minimum 70% din venituri provin din activități IT, cu un prag minim lunar per angajat (5.220 lei în 2026). TVA rămâne separat.",
          },
          {
            q: "Plătesc TVA pentru serviciile prestate clienților din străinătate?",
            a: "De regulă, nu. Dacă locul livrării este în afara Moldovei (clienți nerezidenți), serviciile nu se impozitează cu TVA în Moldova. Ai nevoie de confirmarea scrisă a beneficiarului și de documentele de plată, pe care le ținem în ordine.",
          },
          {
            q: "Trebuie să plătesc TVA când cumpăr soft sau servicii din străinătate?",
            a: "Da. Pentru serviciile importate de la nerezidenți (soft, abonamente, subcontractori), se datorează TVA de 20% în Moldova, pe care o calculăm și o declarăm pentru tine — inclusiv pentru rezidenții IT Park.",
          },
          {
            q: "Mă puteți ajuta să devin rezident Moldova IT Park?",
            a: "Te ajutăm să evaluezi dacă regimul IT Park ți se potrivește și ce condiții trebuie să îndeplinești (inclusiv cele 70% venituri din IT), apoi ținem evidența și calculul lunar al impozitului de 7%.",
          },
          {
            q: "Cât costă contabilitatea pentru o firmă IT sau SaaS?",
            a: "Depinde de volumul de tranzacții, de numărul de angajați și de serviciile de care ai nevoie. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual, verificăm soldurile și ne asigurăm că tranziția se face fără pierderi de date sau întârzieri la declarații. Tu nu pierzi nicio zi.",
          },
        ],
      },
      ru: {
        intro:
          "Софтверный бизнес учитывается не как любой другой. **Регулярная выручка** от подписок, **клиенты из-за рубежа**, возможное резидентство в **Moldova IT Park** с единым налогом 7% и опционы для команды — всё это требует бухгалтерии, которая понимает, как устроено IT. Ведём учёт, правильно считаем налоги и помогаем воспользоваться подходящим налоговым режимом.",
        overview:
          "У IT-сектора в Молдове особый налоговый режим. Резиденты Moldova IT Park платят единый налог 7% с оборота, который заменяет налог на прибыль, подоходный налог сотрудников, социальные и медицинские взносы, местные налоги и другое — при условии, что не менее 70% выручки поступает от IT-деятельности, и с минимальным месячным порогом на сотрудника. НДС остаётся отдельно, а услуги иностранным клиентам и импортируемые услуги имеют свои правила. Ведём учёт, считаем налоги и помогаем с договорами и GDPR.",
        challenges: [
          {
            title: "Режим IT Park и единый налог 7%",
            problem:
              "Резидентство в Moldova IT Park означает единый налог 7% с оборота вместо нескольких налогов, но с условиями: не менее 70% выручки от IT-деятельности и минимальный месячный порог на сотрудника. При неверном расчёте вы теряете преимущество или нарушаете требования.",
            solution:
              "Ежемесячно рассчитываем налог 7% (включая минимальный порог на сотрудника), следим, чтобы не менее 70% выручки поступало от подходящих видов деятельности, и подсказываем, подходит ли вам режим IT Park.",
            service: "consulting",
          },
          {
            title: "НДС: иностранные клиенты и импортируемые услуги",
            problem:
              "Услуги, оказанные зарубежным клиентам, и услуги, купленные за границей (софт, подписки, субподрядчики), облагаются НДС по-разному. При ошибке вы получаете НДС к уплате по импорту или теряете вычеты.",
            solution:
              "Правильно определяем место поставки: услуги клиентам-нерезидентам не облагаются НДС в Молдове (при наличии подтверждающих документов), а по импортируемым услугам рассчитываем и декларируем причитающийся НДС согласно Налоговому кодексу.",
            service: "accounting",
          },
          {
            title: "Регулярная выручка от подписок",
            problem:
              "Подписки, оплаченные авансом (помесячно или за год), не являются выручкой целиком в момент оплаты. При неверном признании они искажают результат и дают цифры, на которые нельзя положиться.",
            solution:
              "Корректно признаём регулярную выручку в течение периода подписки (доходы будущих периодов), чтобы отчётность и прибыль отражали реальность вашего бизнеса.",
            service: "accounting",
          },
          {
            title: "Международные договоры, ИС и GDPR",
            problem:
              "Договоры с клиентами из разных стран, права интеллектуальной собственности на код и защита данных — слабый договор или отсутствие политики данных создают риски и грозят потерей прав.",
            solution:
              "Готовим и проверяем договоры с клиентами и подрядчиками, проясняем права интеллектуальной собственности и сопровождаем соответствие требованиям защиты данных (GDPR).",
            service: "legal",
          },
          {
            title: "Расчёт зарплат и опционы",
            problem:
              "Быстро растущие команды, подрядчики и опционы (ESOP) для удержания сотрудников. В режиме IT Park налоги с зарплат включены в 7%, но ведомости начисления и договоры всё равно нужно оформлять правильно.",
            solution:
              "Оформляем договоры, рассчитываем и готовим ведомости начисления зарплаты согласно применимому режиму (включая IT Park) и ведём учёт сотрудников и подрядчиков.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Что покрывает единый налог 7% в IT Park?",
            a: "7% с оборота заменяют налог на прибыль, подоходный налог сотрудников, социальные и медицинские взносы, местные налоги, налог на недвижимость и дорожный сбор. Применяется, если не менее 70% выручки поступает от IT-деятельности, с минимальным месячным порогом на сотрудника (5 220 леев в 2026 году). НДС остаётся отдельно.",
          },
          {
            q: "Плачу ли я НДС за услуги зарубежным клиентам?",
            a: "Как правило, нет. Если место поставки — за пределами Молдовы (клиенты-нерезиденты), услуги не облагаются НДС в Молдове. Нужны письменное подтверждение заказчика и платёжные документы, которые мы держим в порядке.",
          },
          {
            q: "Нужно ли платить НДС при покупке софта или услуг за рубежом?",
            a: "Да. По импортируемым услугам от нерезидентов (софт, подписки, субподрядчики) в Молдове причитается НДС 20%, который мы рассчитываем и декларируем за вас — в том числе для резидентов IT Park.",
          },
          {
            q: "Можете помочь стать резидентом Moldova IT Park?",
            a: "Помогаем оценить, подходит ли вам режим IT Park и какие условия нужно выполнить (включая 70% выручки от IT), а затем ведём учёт и ежемесячный расчёт налога 7%.",
          },
          {
            q: "Сколько стоит бухгалтерия для IT- или SaaS-компании?",
            a: "Зависит от объёма операций, числа сотрудников и нужных услуг. Сделаем понятное предложение после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от текущего бухгалтера к вам?",
            a: "Принимаем учёт от текущего бухгалтера, проверяем остатки и обеспечиваем переход без потери данных и задержек с декларациями. Вы не теряете ни дня.",
          },
        ],
      },
      en: {
        intro:
          "A software business isn't accounted for like any other. **Recurring subscription revenue**, **clients abroad**, possible **Moldova IT Park** residency with its 7% single tax, and stock options for the team — all demand accounting that understands how tech works. We keep the books, calculate taxes correctly and help you make the most of the right tax regime.",
        overview:
          "Moldova's IT sector has its own tax regime. Moldova IT Park residents pay a 7% single tax on turnover that replaces corporate income tax, employees' income tax, social and medical contributions, local taxes and more — provided at least 70% of revenue comes from IT activities, and subject to a minimum monthly floor per employee. VAT stays separate, and services to foreign clients and imported services have their own rules. We keep the books, calculate taxes and help with contracts and GDPR.",
        challenges: [
          {
            title: "The IT Park regime and the 7% single tax",
            problem:
              "Moldova IT Park residency means a 7% single tax on turnover instead of several taxes, but it comes with conditions: at least 70% of revenue from IT activities and a minimum monthly floor per employee. Calculated wrong, you lose the benefit or fall out of compliance.",
            solution:
              "We calculate the 7% tax monthly (including the per-employee floor), keep at least 70% of revenue coming from eligible activities, and advise whether the IT Park regime fits you.",
            service: "consulting",
          },
          {
            title: "VAT: foreign clients and imported services",
            problem:
              "Services to clients abroad and services bought abroad (software, subscriptions, subcontractors) are treated differently for VAT. Get it wrong and you face VAT due on imports or lost deductions.",
            solution:
              "We set the place of supply correctly: services to non-resident clients aren't subject to Moldovan VAT (with the confirming documents), and for imported services we calculate and report the VAT due under the Tax Code.",
            service: "accounting",
          },
          {
            title: "Recurring subscription revenue",
            problem:
              "Subscriptions paid in advance (monthly or yearly) aren't revenue in full when collected. Recognised wrongly, they distort the result and give you numbers you can't rely on.",
            solution:
              "We recognise recurring revenue correctly over the subscription period (deferred revenue), so your reporting and profit reflect the reality of your business.",
            service: "accounting",
          },
          {
            title: "International contracts, IP and GDPR",
            problem:
              "Contracts with clients in several countries, intellectual-property rights over the code, and data protection — a weak contract or a missing data policy expose you to risk and to losing rights.",
            solution:
              "We draft and review contracts with clients and contractors, clarify intellectual-property rights and support your data-protection (GDPR) compliance.",
            service: "legal",
          },
          {
            title: "Payroll and stock options",
            problem:
              "Fast-growing teams, contractors and stock options (ESOP) to retain them. Under the IT Park regime, payroll taxes are included in the 7%, but payroll and contracts still have to be done correctly.",
            solution:
              "We draw up contracts, calculate and prepare payroll under the applicable regime (including IT Park) and keep records of your team and contractors.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "What does the 7% IT Park single tax cover?",
            a: "The 7% of turnover replaces corporate income tax, employees' income tax, social and medical contributions, local taxes, real-estate tax and road tax. It applies if at least 70% of revenue comes from IT activities, with a minimum monthly floor per employee (5,220 lei in 2026). VAT stays separate.",
          },
          {
            q: "Do I charge VAT on services to clients abroad?",
            a: "Usually no. If the place of supply is outside Moldova (non-resident clients), the services aren't subject to Moldovan VAT. You need the client's written confirmation and payment documents, which we keep in order.",
          },
          {
            q: "Do I pay VAT when I buy software or services from abroad?",
            a: "Yes. For services imported from non-residents (software, subscriptions, subcontractors), 20% VAT is due in Moldova, which we calculate and report for you — including for IT Park residents.",
          },
          {
            q: "Can you help me become a Moldova IT Park resident?",
            a: "We help you assess whether the IT Park regime fits you and which conditions you must meet (including the 70% IT-revenue rule), then keep the books and the monthly 7% tax calculation.",
          },
          {
            q: "How much does accounting for an IT or SaaS company cost?",
            a: "It depends on transaction volume, the number of employees and the services you need. We'll give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant, check the balances and make sure the transition happens without data loss or filing delays. You don't lose a day.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "Un magazin online nu se ține ca unul fizic. **Vânzări pe mai multe canale**, **plăți prin card și mobile banking**, retururi și **zeci de tranzacții pe zi** — toate cer o evidență construită pentru comerțul electronic. Ținem contabilitatea, calculăm corect TVA pe fiecare canal și te asistăm cu drepturile consumatorilor și protecția datelor.",
        overview:
          "Comerțul electronic din Moldova trece printr-o perioadă de schimbări fiscale. TVA se aplică diferit pe vânzările interne, exporturi și serviciile digitale, reclamele și comisioanele de la platformele străine sunt servicii importate cu TVA, iar e-Factura devine treptat obligatorie. Pe partea juridică, vânzările la distanță vin cu dreptul de retur de 14 zile și cu reguli de protecție a datelor. Ținem evidența și te ținem conform.",
        challenges: [
          {
            title: "TVA pe canale de vânzare",
            problem:
              "Vânzările interne, exporturile și produsele sau serviciile digitale se impozitează diferit cu TVA. Pe mai multe canale și cu zeci de tranzacții pe zi, e ușor să aplici cota greșită sau să pierzi dreptul de deducere.",
            solution:
              "Stabilim corect TVA pe fiecare canal — 20% pe vânzările interne, 0% cu drept de deducere la export — și ținem evidența pe tranzacții, ca declarațiile să fie corecte.",
            service: "accounting",
          },
          {
            title: "Plăți online și servicii din străinătate",
            problem:
              "În Moldova, plățile se fac prin card, prin gateway-urile băncilor locale și mobile banking — banii ajung pe net, după comisioane și cu decalaj față de vânzare. În plus, reclamele pe platformele străine și comisioanele marketplace-urilor externe sunt servicii importate, cu TVA datorat în Moldova.",
            solution:
              "Reconciliem încasările prin card și mobile banking cu vânzările și calculăm și declarăm TVA-ul pe serviciile importate (publicitate, comisioane și abonamente din străinătate).",
            service: "accounting",
          },
          {
            title: "Retururi și rambursări",
            problem:
              "Fiecare retur înseamnă stornarea vânzării, ajustarea TVA și rambursarea banilor. Înregistrate greșit, retururile umflă veniturile și dau un TVA de plată mai mare decât cel real.",
            solution:
              "Înregistrăm corect retururile și rambursările, ajustăm TVA aferent și ținem evidența clară a vânzărilor nete, ca raportarea să reflecte realitatea.",
            service: "accounting",
          },
          {
            title: "Dreptul de retur și protecția datelor",
            problem:
              "La vânzările la distanță, clientul are drept de retragere în 14 zile, iar magazinul colectează date personale. O politică de retur sau de date neconformă te expune la reclamații și sancțiuni.",
            solution:
              "Pregătim și verificăm termenii și politicile magazinului (retur, livrare, confidențialitate), conform regulilor pentru vânzări la distanță și protecția datelor (GDPR).",
            service: "legal",
          },
          {
            title: "Salarizare și colaboratori",
            problem:
              "Pe măsură ce magazinul crește, apar angajați și colaboratori — depozit, suport, marketing. Contractele și salariile trebuie ținute corect, cu contribuțiile la zi.",
            solution:
              "Întocmim contractele, calculăm salariile și contribuțiile CNAS și CNAM și pregătim statele de plată și rapoartele lunare.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Ce TVA aplic la vânzările online în Moldova?",
            a: "Vânzările interne se impozitează cu 20%, iar exporturile cu 0% (cu drept de deducere). Produsele și serviciile digitale au reguli proprii în funcție de locul livrării. Stabilim cota corectă pe fiecare canal.",
          },
          {
            q: "Datorez TVA pentru reclamele pe Google/Meta sau marketplace-urile străine?",
            a: "Da. Reclamele pe platformele străine, comisioanele marketplace-urilor externe și abonamentele la soft din străinătate sunt servicii importate, pentru care se datorează TVA de 20% în Moldova. O calculăm și o declarăm pentru tine.",
          },
          {
            q: "Trebuie să emit e-Factura?",
            a: "e-Factura este deja obligatorie pentru vânzările către instituții publice și pentru agenții economici incluși în lista publicată de Serviciul Fiscal, iar utilizarea ei se extinde în 2026. Te ajutăm să te conformezi pe partea de facturare.",
          },
          {
            q: "Trebuie să accept retur în 14 zile?",
            a: "Da. La vânzările la distanță, clientul are dreptul de a se retrage din contract în 14 zile, iar tu trebuie să rambursezi sumele primite. Te ajutăm să ai o politică de retur conformă.",
          },
          {
            q: "Cât costă contabilitatea pentru un magazin online?",
            a: "Depinde de volumul de tranzacții, de canale și de numărul de angajați. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual, verificăm soldurile și ne asigurăm că tranziția se face fără pierderi de date sau întârzieri la declarații. Tu nu pierzi nicio zi.",
          },
        ],
      },
      ru: {
        intro:
          "Интернет-магазин учитывается не как офлайн-точка. **Продажи по нескольким каналам**, **оплата картой и через мобильный банкинг**, возвраты и **десятки операций в день** — всё это требует учёта, выстроенного под e-commerce. Ведём бухгалтерию, правильно считаем НДС по каждому каналу и помогаем с правами потребителей и защитой данных.",
        overview:
          "Электронная торговля в Молдове переживает период налоговых изменений. НДС применяется по-разному к внутренним продажам, экспорту и цифровым услугам, реклама и комиссии зарубежных платформ — это импортируемые услуги с НДС, а e-Factura постепенно становится обязательной. С юридической стороны дистанционные продажи предполагают право на возврат в течение 14 дней и правила защиты данных. Ведём учёт и держим вас в соответствии с требованиями.",
        challenges: [
          {
            title: "НДС по каналам продаж",
            problem:
              "Внутренние продажи, экспорт и цифровые товары или услуги облагаются НДС по-разному. При нескольких каналах и десятках операций в день легко применить неверную ставку или потерять право на вычет.",
            solution:
              "Правильно определяем НДС по каждому каналу — 20% на внутренние продажи, 0% с правом вычета на экспорт — и ведём учёт по операциям, чтобы декларации были верными.",
            service: "accounting",
          },
          {
            title: "Онлайн-оплаты и услуги из-за рубежа",
            problem:
              "В Молдове оплата проходит картой, через платёжные шлюзы местных банков и мобильный банкинг — деньги поступают за вычетом комиссий и с задержкой относительно продажи. К тому же реклама на зарубежных платформах и комиссии иностранных маркетплейсов — это импортируемые услуги, по которым в Молдове причитается НДС.",
            solution:
              "Сверяем поступления по картам и мобильному банкингу с продажами и рассчитываем и декларируем НДС по импортируемым услугам (реклама, комиссии и подписки из-за рубежа).",
            service: "accounting",
          },
          {
            title: "Возвраты и возмещения",
            problem:
              "Каждый возврат означает сторнирование продажи, корректировку НДС и возврат денег. При неверном учёте возвраты завышают выручку и дают НДС к уплате больше реального.",
            solution:
              "Корректно учитываем возвраты и возмещения, корректируем соответствующий НДС и ведём чёткий учёт чистых продаж, чтобы отчётность отражала реальность.",
            service: "accounting",
          },
          {
            title: "Право на возврат и защита данных",
            problem:
              "При дистанционных продажах у клиента есть право на отказ в течение 14 дней, а магазин собирает персональные данные. Несоответствующая политика возврата или данных грозит жалобами и санкциями.",
            solution:
              "Готовим и проверяем условия и политики магазина (возврат, доставка, конфиденциальность) согласно правилам дистанционных продаж и защиты данных (GDPR).",
            service: "legal",
          },
          {
            title: "Расчёт зарплат и подрядчики",
            problem:
              "По мере роста магазина появляются сотрудники и подрядчики — склад, поддержка, маркетинг. Договоры и зарплаты нужно вести правильно, со взносами в актуальном состоянии.",
            solution:
              "Оформляем договоры, рассчитываем зарплаты и взносы CNAS и CNAM и готовим ведомости начисления зарплаты и ежемесячные отчёты.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Какой НДС применять к онлайн-продажам в Молдове?",
            a: "Внутренние продажи облагаются 20%, экспорт — 0% (с правом вычета). У цифровых товаров и услуг свои правила в зависимости от места поставки. Определяем верную ставку по каждому каналу.",
          },
          {
            q: "Нужно ли платить НДС за рекламу на Google/Meta или зарубежные маркетплейсы?",
            a: "Да. Реклама на зарубежных платформах, комиссии иностранных маркетплейсов и подписки на софт из-за рубежа — это импортируемые услуги, по которым в Молдове причитается НДС 20%. Мы рассчитываем и декларируем его за вас.",
          },
          {
            q: "Нужно ли выставлять e-Factura?",
            a: "e-Factura уже обязательна для продаж государственным учреждениям и для экономических агентов из списка, публикуемого Налоговой службой, и её применение расширяется в 2026 году. Помогаем соответствовать требованиям по выставлению счетов.",
          },
          {
            q: "Обязан ли я принимать возврат в течение 14 дней?",
            a: "Да. При дистанционных продажах клиент вправе отказаться от договора в течение 14 дней, а вы обязаны вернуть полученные суммы. Помогаем составить соответствующую политику возврата.",
          },
          {
            q: "Сколько стоит бухгалтерия для интернет-магазина?",
            a: "Зависит от объёма операций, числа каналов и сотрудников. Сделаем понятное предложение после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от текущего бухгалтера к вам?",
            a: "Принимаем учёт от текущего бухгалтера, проверяем остатки и обеспечиваем переход без потери данных и задержек с декларациями. Вы не теряете ни дня.",
          },
        ],
      },
      en: {
        intro:
          "An online store isn't run like a physical one. **Sales across multiple channels**, **payments by card and mobile banking**, returns and **dozens of transactions a day** — all demand accounting built for e-commerce. We keep the books, calculate VAT correctly on each channel and help with consumer rights and data protection.",
        overview:
          "Moldova's e-commerce sector is going through tax changes. VAT applies differently to domestic sales, exports and digital services, ads and fees from foreign platforms are imported services with VAT, and e-Factura is gradually becoming mandatory. On the legal side, distance selling comes with a 14-day right of return and data-protection rules. We keep the books and keep you compliant.",
        challenges: [
          {
            title: "VAT across sales channels",
            problem:
              "Domestic sales, exports and digital goods or services are taxed differently for VAT. Across several channels and dozens of transactions a day, it's easy to apply the wrong rate or lose the deduction right.",
            solution:
              "We set VAT correctly per channel — 20% on domestic sales, 0% with deduction rights on exports — and keep records per transaction, so the returns are correct.",
            service: "accounting",
          },
          {
            title: "Online payments and foreign services",
            problem:
              "In Moldova, payments go through card gateways at local banks and mobile banking — money arrives net of fees and with a delay relative to the sale. On top of that, ads on foreign platforms and foreign marketplace fees are imported services, on which VAT is due in Moldova.",
            solution:
              "We reconcile card and mobile-banking receipts against sales and calculate and report VAT on imported services (advertising, fees and subscriptions from abroad).",
            service: "accounting",
          },
          {
            title: "Returns and refunds",
            problem:
              "Every return means reversing the sale, adjusting VAT and refunding the money. Recorded wrongly, returns inflate revenue and produce more VAT due than is real.",
            solution:
              "We record returns and refunds correctly, adjust the related VAT and keep clear records of net sales, so reporting reflects reality.",
            service: "accounting",
          },
          {
            title: "Right of return and data protection",
            problem:
              "In distance selling, the customer has a 14-day right of withdrawal, and the store collects personal data. A non-compliant return or data policy exposes you to complaints and penalties.",
            solution:
              "We draft and review your store's terms and policies (returns, delivery, privacy), in line with distance-selling rules and data protection (GDPR).",
            service: "legal",
          },
          {
            title: "Payroll and contractors",
            problem:
              "As the store grows, employees and contractors appear — warehouse, support, marketing. Contracts and salaries have to be kept correctly, with contributions up to date.",
            solution:
              "We draw up contracts, calculate salaries and CNAS and CNAM contributions, and prepare payroll and monthly reports.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "What VAT do I charge on online sales in Moldova?",
            a: "Domestic sales are taxed at 20%, exports at 0% (with deduction rights). Digital goods and services have their own rules depending on the place of supply. We set the correct rate per channel.",
          },
          {
            q: "Do I owe VAT on Google/Meta ads or foreign marketplaces?",
            a: "Yes. Ads on foreign platforms, foreign marketplace fees and software subscriptions from abroad are imported services, on which 20% VAT is due in Moldova. We calculate and report it for you.",
          },
          {
            q: "Do I have to issue e-Factura?",
            a: "e-Factura is already mandatory for sales to public institutions and for economic agents on the list published by the State Tax Service, and its use is expanding in 2026. We help you comply on the invoicing side.",
          },
          {
            q: "Do I have to accept returns within 14 days?",
            a: "Yes. In distance selling, the customer has the right to withdraw from the contract within 14 days, and you must refund the sums received. We help you put a compliant return policy in place.",
          },
          {
            q: "How much does accounting for an online store cost?",
            a: "It depends on transaction volume, the number of channels and employees. We'll give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant, check the balances and make sure the transition happens without data loss or filing delays. You don't lose a day.",
          },
        ],
      },
    },
  },
  {
    id: "retail",
    slug: "retail",
    title: { ro: "Retail", ru: "Розничная торговля", en: "Retail" },
    description: {
      ro: "Comerțul cu amănuntul înseamnă case de marcat, încasări preponderent în numerar, stocuri mari și marje mici pe care fiecare leu contează. Urmărim corect TVA pe categorii de produse, ținem evidența stocurilor și a pierderilor, urmărim adaosul comercial și reflectăm rapoartele Z în contabilitate. Ținem evidența pe furnizori și înregistrăm rezultatele inventarelor periodice, ca diferențele de casă să nu se transforme în amenzi. Fie că ai un singur magazin sau o rețea, primești cifre clare despre ce se vinde, ce aduce profit și unde pierzi bani — și un partener care răspunde rapid.",
      ru: "Розничная торговля — это кассовые аппараты, преимущественно наличная выручка, большие запасы и низкая маржа, где важен каждый лей. Правильно учитываем НДС по категориям товаров, ведём учёт запасов и потерь, отслеживаем торговую наценку и сверяем Z-отчёты с бухгалтерией. Ведём учёт по поставщикам и отражаем результаты периодических инвентаризаций, чтобы кассовые расхождения не превращались в штрафы. Один магазин или сеть — вы получаете ясные цифры о том, что продаётся, что приносит прибыль и где вы теряете деньги, и партнёра, который быстро отвечает.",
      en: "Retail means tills, mostly-cash takings, large stock and thin margins where every leu counts. We track VAT correctly by product category, keep stock and shrinkage records, monitor markup and reconcile Z-reports against the books. We keep supplier records and post the results of your periodic inventories so cash discrepancies don't turn into fines. Whether you run a single shop or a chain, you get clear numbers on what sells, what's profitable and where you're losing money — and a partner who answers fast.",
    },
    detail: {
      ro: {
        intro:
          "Un magazin se ține altfel decât o firmă de servicii. **Mii de poziții pe raft**, cote de TVA diferite pe categorii de produse și un **adaos comercial** care trebuie urmărit corect, ca tu să te ocupi de vânzări și de furnizori, nu de registre.",
        overview:
          "Comerțul cu amănuntul din Moldova lucrează cu marje mici și volume mari de tranzacții. Cota standard de TVA este de 20 la sută, dar pâinea și produsele de panificație, laptele și produsele lactate cu un conținut de grăsimi de cel mult 40 la sută beneficiază de cota redusă de 8 la sută la livrările pe teritoriul țării. Aplicarea corectă a cotei pe fiecare categorie este cea mai frecventă sursă de erori într-un magazin.",
        challenges: [
          {
            title: "TVA diferit pe categorii de produse",
            problem:
              "Într-un magazin alimentar pâinea și lactatele se vând cu 8 la sută, iar restul mărfii cu 20 la sută. Dacă se aplică o cotă greșită, fie pierzi bani, fie rămâi cu o declarație de TVA care nu corespunde rapoartelor de casă.",
            solution:
              "Repartizăm vânzările pe cote în baza rapoartelor Z și a nomenclatorului tău de mărfuri, ținem registrele de cumpărări și de vânzări și depunem declarația de TVA cu cota corectă pe fiecare categorie.",
            service: "accounting",
          },
          {
            title: "Evidența stocurilor și a adaosului comercial",
            problem:
              "Sute de articole intră și ies zilnic. Fără o evidență ordonată a stocurilor și a adaosului comercial nu știi cât marfă ai în realitate și care produs îți aduce profit.",
            solution:
              "Ținem evidența mărfurilor pe baza facturilor de la furnizori și a rapoartelor Z, calculăm adaosul comercial și reflectăm rezultatele inventarierii pe care ni le transmiți, ca să ai un cost real al stocurilor.",
            service: "accounting",
          },
          {
            title: "Retururi și marfă deteriorată",
            problem:
              "Clienții returnează produse, iar pe raft apar mărfuri expirate sau deteriorate. Dacă acestea nu sunt înregistrate corect, soldurile și TVA-ul se distorsionează.",
            solution:
              "Înregistrăm retururile și casările pe baza documentelor și a actelor pe care le întocmești, ajustăm TVA-ul aferent și reflectăm pierderile în evidență conform normelor în vigoare.",
            service: "accounting",
          },
          {
            title: "Salarizarea personalului din magazin",
            problem:
              "Vânzători, casieri, personal cu fluctuație și uneori program în schimburi. Calculul salariilor, al contribuțiilor și al concediilor cere atenție în fiecare lună.",
            solution:
              "Întocmim contractele de muncă, calculăm salariile, reținem impozitul pe venit și contribuțiile CNAS și CNAM, pregătim statele de plată și depunem dările de seamă către SFS și CNAS.",
            service: "hr",
          },
          {
            title: "Contractul de chirie a spațiului comercial",
            problem:
              "Chiria spațiului este de obicei cea mai mare cheltuială fixă. Un contract neclar la indexare, la cheltuielile comune sau la reziliere te poate costa scump.",
            solution:
              "Verificăm și redactăm contractul de chirie, clarificăm clauzele privind plata, indexarea și rezilierea și ne asigurăm că cheltuiala este corect documentată pentru deducere.",
            service: "legal",
          },
          {
            title: "Contracte cu furnizorii",
            problem:
              "Lucrezi cu mulți furnizori, cu termene de plată și condiții de retur diferite. Un contract slab redactat lasă loc de litigii și de marfă pe care nu o poți returna.",
            solution:
              "Redactăm și revizuim contractele cu furnizorii, urmărim termenele de plată, condițiile de livrare și de retur, ca relațiile comerciale să fie clare și ușor de susținut cu documente.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru un magazin?",
            a: "Depinde de numărul de tranzacții, de gama de mărfuri, de numărul de angajați și de statutul de plătitor de TVA. Un magazin mic cu puține poziții costă mai puțin decât un supermarket cu mii de articole. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual, verificăm soldurile de stocuri, datoriile către furnizori și situația cu SFS, apoi continuăm fără întreruperi. Tu nu pierzi nicio zi de lucru.",
          },
          {
            q: "Cum reflectați vânzările din casa de marcat?",
            a: "Înregistrăm vânzările în evidență pe baza rapoartelor Z pe care ni le transmiți la sfârșitul perioadei, repartizate pe cotele de TVA corespunzătoare. Configurarea casei și conectarea ei rămân la furnizorul tău tehnic.",
          },
          {
            q: "Trebuie să mă înregistrez ca plătitor de TVA?",
            a: "Înregistrarea devine obligatorie când cifra de afaceri depășește plafonul stabilit de Codul fiscal pe parcursul a 12 luni consecutive. Plafonul a fost majorat în 2026, așa că verificăm împreună cifrele tale reale și îți spunem din timp dacă te apropii de prag.",
          },
          {
            q: "Cum se aplică TVA de 8 la sută la produsele alimentare?",
            a: "Cota redusă de 8 la sută se aplică la pâine și produse de panificație, lapte și produse lactate cu conținut de grăsimi de cel mult 40 la sută, livrate pe teritoriul țării. Restul mărfurilor se vând cu 20 la sută. Noi separăm corect vânzările pe cote în declarația de TVA.",
          },
          {
            q: "Cine se ocupă de inventariere?",
            a: "Numărarea fizică a mărfurilor o face echipa ta din magazin. Tu ne transmiți rezultatele inventarierii, iar noi le reflectăm în evidență, comparăm cu soldurile contabile și înregistrăm diferențele conform normelor.",
          },
        ],
      },
      ru: {
        intro:
          "Магазин ведут иначе, чем фирму услуг. **Тысячи позиций на полке**, разные ставки НДС по категориям товаров и **торговая наценка**, которую нужно учитывать правильно, чтобы вы занимались продажами и поставщиками, а не регистрами.",
        overview:
          "Розничная торговля в Молдове работает с небольшой маржой и большим числом операций. Стандартная ставка НДС составляет 20 процентов, но хлеб и хлебобулочные изделия, молоко и молочные продукты с содержанием жира не более 40 процентов облагаются по сниженной ставке 8 процентов при поставках на территории страны. Правильное применение ставки по каждой категории – самый частый источник ошибок в магазине.",
        challenges: [
          {
            title: "Разный НДС по категориям товаров",
            problem:
              "В продуктовом магазине хлеб и молочные продукты продаются под 8 процентов, а остальной товар под 20. Если применить неверную ставку, вы либо теряете деньги, либо получаете декларацию по НДС, которая не сходится с отчетами кассы.",
            solution:
              "Распределяем продажи по ставкам на основе Z-отчетов и вашего номенклатурного перечня, ведем книги покупок и продаж и подаем декларацию по НДС с правильной ставкой по каждой категории.",
            service: "accounting",
          },
          {
            title: "Учет запасов и торговой наценки",
            problem:
              "Сотни наименований приходят и уходят ежедневно. Без упорядоченного учета запасов и наценки вы не знаете, сколько товара у вас на самом деле и какой продукт приносит прибыль.",
            solution:
              "Ведем учет товаров на основе накладных от поставщиков и Z-отчетов, рассчитываем торговую наценку и отражаем результаты инвентаризации, которые вы нам передаете, чтобы у вас была реальная себестоимость запасов.",
            service: "accounting",
          },
          {
            title: "Возвраты и испорченный товар",
            problem:
              "Покупатели возвращают товар, а на полке появляются просроченные или поврежденные изделия. Если их не учесть правильно, остатки и НДС искажаются.",
            solution:
              "Учитываем возвраты и списания на основе документов и актов, которые вы оформляете, корректируем соответствующий НДС и отражаем потери в учете согласно действующим нормам.",
            service: "accounting",
          },
          {
            title: "Зарплата персонала магазина",
            problem:
              "Продавцы, кассиры, текучесть кадров и иногда сменный график. Расчет зарплат, взносов и отпусков требует внимания каждый месяц.",
            solution:
              "Оформляем трудовые договоры, начисляем зарплату, удерживаем подоходный налог и взносы CNAS и CNAM, готовим расчетные ведомости и подаем отчетность в SFS и CNAS.",
            service: "hr",
          },
          {
            title: "Договор аренды торгового помещения",
            problem:
              "Аренда помещения обычно самый крупный постоянный расход. Нечеткий договор в части индексации, общих расходов или расторжения может дорого вам обойтись.",
            solution:
              "Проверяем и составляем договор аренды, разъясняем условия оплаты, индексации и расторжения и следим, чтобы расход был правильно документирован для вычета.",
            service: "legal",
          },
          {
            title: "Договоры с поставщиками",
            problem:
              "Вы работаете со многими поставщиками с разными сроками оплаты и условиями возврата. Слабо составленный договор оставляет место для споров и для товара, который нельзя вернуть.",
            solution:
              "Составляем и проверяем договоры с поставщиками, отслеживаем сроки оплаты, условия поставки и возврата, чтобы коммерческие отношения были ясными и подтверждались документами.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для магазина?",
            a: "Зависит от числа операций, ассортимента товаров, числа сотрудников и статуса плательщика НДС. Небольшой магазин с малым числом позиций стоит дешевле, чем супермаркет с тысячами наименований. Мы дадим четкое предложение после бесплатной консультации, без скрытых затрат.",
          },
          {
            q: "Как перейти от нынешнего бухгалтера к вам?",
            a: "Принимаем учет у действующего бухгалтера, проверяем остатки запасов, задолженность перед поставщиками и состояние дел с SFS, затем продолжаем без перерывов. Вы не теряете ни одного рабочего дня.",
          },
          {
            q: "Как вы отражаете продажи с кассового аппарата?",
            a: "Учитываем продажи на основе Z-отчетов, которые вы передаете нам в конце периода, распределенные по соответствующим ставкам НДС. Настройка кассы и ее подключение остаются за вашим техническим поставщиком.",
          },
          {
            q: "Нужно ли мне регистрироваться плательщиком НДС?",
            a: "Регистрация становится обязательной, когда оборот превышает порог, установленный Налоговым кодексом, за 12 последовательных месяцев. Порог был повышен в 2026 году, поэтому мы вместе проверяем ваши реальные цифры и заранее предупреждаем, если вы приближаетесь к нему.",
          },
          {
            q: "Как применяется НДС 8 процентов к продуктам питания?",
            a: "Сниженная ставка 8 процентов применяется к хлебу и хлебобулочным изделиям, молоку и молочным продуктам с содержанием жира не более 40 процентов при поставках на территории страны. Остальные товары продаются под 20 процентов. Мы правильно разделяем продажи по ставкам в декларации по НДС.",
          },
          {
            q: "Кто занимается инвентаризацией?",
            a: "Физический пересчет товаров делает ваша команда в магазине. Вы передаете нам результаты инвентаризации, а мы отражаем их в учете, сверяем с учетными остатками и фиксируем расхождения согласно нормам.",
          },
        ],
      },
      en: {
        intro:
          "A shop is run differently from a service company. **Thousands of items on the shelf**, different VAT rates by product category and a **commercial markup** that has to be tracked correctly, so you can focus on sales and suppliers, not on ledgers.",
        overview:
          "Retail in Moldova works on thin margins and high transaction volumes. The standard VAT rate is 20 percent, but bread and bakery products, milk and dairy products with a fat content of no more than 40 percent qualify for the reduced 8 percent rate on supplies within the country. Applying the correct rate per category is the most common source of errors in a shop.",
        challenges: [
          {
            title: "Different VAT by product category",
            problem:
              "In a grocery shop bread and dairy sell at 8 percent, while the rest of the goods sell at 20 percent. Apply the wrong rate and you either lose money or end up with a VAT return that does not match the till reports.",
            solution:
              "We split sales by rate based on your Z-reports and product list, keep the purchase and sales ledgers and file the VAT return with the correct rate for each category.",
            service: "accounting",
          },
          {
            title: "Stock and commercial markup records",
            problem:
              "Hundreds of items come in and go out every day. Without orderly stock and markup records you do not know how much goods you really have or which product actually makes a profit.",
            solution:
              "We keep stock records based on supplier invoices and Z-reports, calculate the commercial markup and record the inventory results you send us, so you have a real cost of stock.",
            service: "accounting",
          },
          {
            title: "Returns and damaged goods",
            problem:
              "Customers return products, and expired or damaged items appear on the shelf. If these are not recorded correctly, balances and VAT get distorted.",
            solution:
              "We record returns and write-offs based on the documents and reports you prepare, adjust the related VAT and reflect the losses in the books according to the rules in force.",
            service: "accounting",
          },
          {
            title: "Shop staff payroll",
            problem:
              "Sales assistants, cashiers, staff turnover and sometimes shift schedules. Calculating salaries, contributions and leave needs attention every month.",
            solution:
              "We draw up employment contracts, calculate salaries, withhold income tax and CNAS and CNAM contributions, prepare payroll sheets and file the reports to SFS and CNAS.",
            service: "hr",
          },
          {
            title: "Retail premises lease contract",
            problem:
              "Rent is usually the largest fixed cost. A contract that is unclear on indexation, shared charges or termination can cost you dearly.",
            solution:
              "We review and draft the lease contract, clarify the clauses on payment, indexation and termination and make sure the expense is properly documented for deduction.",
            service: "legal",
          },
          {
            title: "Supplier contracts",
            problem:
              "You work with many suppliers, with different payment terms and return conditions. A poorly drafted contract leaves room for disputes and for goods you cannot return.",
            solution:
              "We draft and review supplier contracts, track payment terms, delivery and return conditions, so commercial relationships are clear and easy to support with documents.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "How much does accounting for a shop cost?",
            a: "It depends on the number of transactions, the range of goods, the number of employees and your VAT status. A small shop with few items costs less than a supermarket with thousands of products. We give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant, check stock balances, supplier liabilities and your standing with SFS, then carry on without interruption. You do not lose a single working day.",
          },
          {
            q: "How do you record sales from the cash register?",
            a: "We record sales based on the Z-reports you send us at the end of the period, split across the relevant VAT rates. Setting up and connecting the register stays with your technical provider.",
          },
          {
            q: "Do I need to register as a VAT payer?",
            a: "Registration becomes mandatory once turnover exceeds the threshold set by the Tax Code over 12 consecutive months. The threshold was raised in 2026, so we check your real figures together and warn you in advance if you are getting close.",
          },
          {
            q: "How is the 8 percent VAT applied to food products?",
            a: "The reduced 8 percent rate applies to bread and bakery products, milk and dairy products with a fat content of no more than 40 percent, supplied within the country. Other goods sell at 20 percent. We split sales correctly by rate in the VAT return.",
          },
          {
            q: "Who handles the inventory count?",
            a: "The physical count of goods is done by your team in the shop. You send us the inventory results, and we reflect them in the books, compare them with the accounting balances and record the differences according to the rules.",
          },
        ],
      },
    },
  },
  {
    id: "horeca",
    slug: "horeca",
    title: { ro: "HoReCa", ru: "Рестораны и гостиницы", en: "Restaurants & hotels" },
    description: {
      ro: "Restaurantele, cafenelele și hotelurile lucrează cu produse perisabile, multe tranzacții mici și personal sezonier care intră și iese. Asta înseamnă cote de TVA aplicabile în funcție de tipul produsului sau serviciului (alimentație publică, băuturi, cazare), înregistrarea corectă a pierderilor din bucătărie, bacșiș reflectat corect la salarii și state de plată care se schimbă lună de lună. Ținem evidența contabilă, calculăm taxele și salariile și depunem declarațiile la timp. Tu te ocupi de sală și de bucătărie, noi ținem contabilitatea ca la carte.",
      ru: "Ресторан учитывается не так, как магазин. Скоропортящиеся продукты, множество мелких операций и сезонный персонал, который приходит и уходит. Это значит ставки НДС в зависимости от типа продукта или услуги (общепит, напитки, проживание), корректный учёт потерь на кухне, чаевые, правильно отражённые в зарплате, и ведомости начисления зарплаты, которые меняются из месяца в месяц. Ведём бухгалтерский учёт, считаем налоги и зарплаты и сдаём декларации вовремя. Вы занимаетесь залом и кухней, а мы ведём учёт по всем правилам.",
      en: "A restaurant isn't accounted for like a shop. Perishable goods, many small transactions and seasonal staff coming and going. That means VAT rates that depend on the type of product or service (catering, drinks, accommodation), correctly recording kitchen losses, tips reflected properly in payroll, and payroll that changes month to month. We keep the books, calculate taxes and salaries and file returns on time. You run the floor and the kitchen, we keep the books by the rules.",
    },
    detail: {
      ro: {
        intro:
          "Un restaurant nu se ține ca un magazin. Marje mici pe **produse perisabile**, **multe tranzacții mici** zilnice, personal care intră și iese și o **cotă de TVA care se schimbă în 2026** — toate cer o contabilitate construită pentru ospitalitate. Ținem evidența, calculăm taxele și salariile și depunem declarațiile la timp, ca tu să te ocupi de sală și de bucătărie.",
        overview:
          "Sectorul HoReCa din Moldova trece printr-o perioadă de schimbări fiscale. Cota de TVA pentru alimentația publică și cazare este în prezent de 8%, dar regimul este în proces de revizuire în 2026, cu o posibilă majorare la 18%. Ne ocupăm de evidența contabilă, de salarizare și de raportarea fiscală și te ținem la curent cu fiecare schimbare care îți afectează afacerea.",
        challenges: [
          {
            title: "Cota de TVA care se schimbă",
            problem:
              "Alimentația publică și cazarea beneficiază de o cotă redusă de TVA (în prezent 8%), iar alcoolul se impozitează separat la cota standard. Regimul este în revizuire în 2026, cu o posibilă majorare la 18% — orice schimbare îți afectează facturarea și raportarea.",
            solution:
              "Aplicăm corect cota în vigoare în evidență și în declarațiile de TVA, tratăm separat alcoolul și te informăm din timp despre impactul fiecărei modificări legislative.",
            service: "accounting",
          },
          {
            title: "Volum mare de tranzacții zilnice",
            problem:
              "Un restaurant generează zilnic zeci sau sute de tranzacții mici, în numerar și prin card. Înregistrate greșit sau cu întârziere, se transformă în declarații eronate și diferențe greu de explicat la control.",
            solution:
              "Înregistrăm corect încasările și cheltuielile, ținem evidența la zi și pregătim declarațiile fiscale la timp, ca să nu apară surprize la control.",
            service: "accounting",
          },
          {
            title: "Pierderi din bucătărie și stocuri perisabile",
            problem:
              "Rebuturile, alimentele expirate și consumul din bucătărie trebuie justificate documentar. Fără înregistrare corectă, devin cheltuieli nedeductibile, iar la inventar apar minusuri greu de explicat.",
            solution:
              "Înregistrăm în contabilitate pierderile și casările, aplicăm normele de perisabilitate și ne asigurăm că pierderile firești sunt deductibile. Te ajutăm în acest proces, pe partea care ține de contabilitate.",
            service: "accounting",
          },
          {
            title: "Personal sezonier și salarizare",
            problem:
              "Terase de vară, sărbători, personal care vine și pleacă — angajările pe durată determinată și salariile se schimbă lună de lună, iar contractele întocmite greșit sunt reclasificate de Inspectoratul de Stat al Muncii.",
            solution:
              "Întocmim contractele pe durată determinată, calculăm salariile și contribuțiile CNAS și CNAM și pregătim statele de plată și rapoartele lunare.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Ce cotă de TVA se aplică la un restaurant în Moldova?",
            a: "Alimentația publică și cazarea beneficiază de o cotă redusă (în prezent 8%), iar alcoolul se impozitează separat la cota standard. Regimul este în revizuire în 2026, cu o posibilă majorare la 18% — te anunțăm din timp și actualizăm evidența și declarațiile.",
          },
          {
            q: "Cât costă contabilitatea pentru un restaurant sau o cafenea?",
            a: "Depinde de volumul de tranzacții, de numărul de angajați și de serviciile de care ai nevoie. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual, verificăm soldurile și ne asigurăm că tranziția se face fără pierderi de date sau întârzieri la declarații. Tu nu pierzi nicio zi.",
          },
          {
            q: "Cum justific pierderile și rebuturile din bucătărie?",
            a: "Prin acte de casare și norme de perisabilitate. Documentate corect, aceste pierderi se înregistrează în contabilitate ca deductibile și rezistă la un control fiscal. Îți spunem ce documente sunt necesare.",
          },
          {
            q: "Cum se înregistrează corect bacșișul?",
            a: "Bacșișul poate fi primit atât în numerar, cât și prin card, iar regulile diferă în funcție de cum este colectat și împărțit între angajați. În Moldova nu există o regulă fiscală simplă, dedicată bacșișului, așa că tratamentul se stabilește de la caz la caz. Te ajutăm să-l reflectezi corect la calculul salariilor.",
          },
        ],
      },
      ru: {
        intro:
          "Ресторан учитывается не так, как магазин. Низкая маржа на **скоропортящихся продуктах**, **множество мелких операций** ежедневно, персонал, который приходит и уходит, и **ставка НДС, которая меняется в 2026 году** — всё это требует бухгалтерии, выстроенной под гостеприимство. Ведём учёт, считаем налоги и зарплаты и сдаём декларации вовремя, чтобы вы занимались залом и кухней.",
        overview:
          "Сектор HoReCa в Молдове переживает период налоговых изменений. Ставка НДС для общественного питания и проживания сейчас составляет 8%, но режим пересматривается в 2026 году с возможным повышением до 18%. Мы ведём бухгалтерский учёт, расчёт зарплат и налоговую отчётность и держим вас в курсе каждого изменения, которое затрагивает ваш бизнес.",
        challenges: [
          {
            title: "Меняющаяся ставка НДС",
            problem:
              "Общественное питание и проживание облагаются по сниженной ставке НДС (сейчас 8%), а алкоголь — отдельно по стандартной ставке. Режим пересматривается в 2026 году с возможным повышением до 18% — любое изменение влияет на выставление счетов и отчётность.",
            solution:
              "Правильно применяем действующую ставку в учёте и в декларациях по НДС, отдельно учитываем алкоголь и заранее информируем вас о влиянии каждого изменения законодательства.",
            service: "accounting",
          },
          {
            title: "Большой объём ежедневных операций",
            problem:
              "Ресторан ежедневно генерирует десятки или сотни мелких операций — наличными и картой. Учтённые неправильно или с опозданием, они превращаются в ошибочные декларации и трудно объяснимые расхождения на проверке.",
            solution:
              "Корректно учитываем поступления и расходы, ведём учёт в актуальном состоянии и готовим налоговые декларации вовремя, чтобы на проверке не было сюрпризов.",
            service: "accounting",
          },
          {
            title: "Потери на кухне и скоропортящиеся запасы",
            problem:
              "Брак, просроченные продукты и кухонное потребление нужно обосновывать документально. Без правильного учёта они становятся невычитаемыми расходами, а при инвентаризации появляются необъяснимые недостачи.",
            solution:
              "Отражаем в бухгалтерии потери и списания, применяем нормы естественной убыли и обеспечиваем, чтобы естественные потери были вычитаемыми. Помогаем в этом процессе — в части, которая относится к бухгалтерии.",
            service: "accounting",
          },
          {
            title: "Сезонный персонал и расчёт зарплат",
            problem:
              "Летние террасы, праздники, персонал, который приходит и уходит — срочные договоры и зарплаты меняются из месяца в месяц, а неправильно оформленные договоры переквалифицируются Государственной инспекцией труда.",
            solution:
              "Оформляем срочные трудовые договоры, рассчитываем зарплаты и взносы CNAS и CNAM и готовим ведомости начисления зарплаты и ежемесячные отчёты.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Какая ставка НДС применяется к ресторану в Молдове?",
            a: "Общественное питание и проживание облагаются по сниженной ставке (сейчас 8%), а алкоголь — отдельно по стандартной ставке. Режим пересматривается в 2026 году с возможным повышением до 18% — мы заранее предупредим вас и обновим учёт и декларации.",
          },
          {
            q: "Сколько стоит бухгалтерия для ресторана или кафе?",
            a: "Зависит от объёма операций, числа сотрудников и нужных услуг. Сделаем понятное предложение после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от текущего бухгалтера к вам?",
            a: "Принимаем учёт от текущего бухгалтера, проверяем остатки и обеспечиваем переход без потери данных и задержек с декларациями. Вы не теряете ни дня.",
          },
          {
            q: "Как обосновать потери и брак на кухне?",
            a: "Актами списания и нормами естественной убыли. При правильном оформлении эти потери учитываются в бухгалтерии как вычитаемые и выдерживают налоговую проверку. Подскажем, какие документы нужны.",
          },
          {
            q: "Как правильно учитывать чаевые?",
            a: "Чаевые могут поступать как наличными, так и картой, а правила зависят от того, как они собираются и распределяются между сотрудниками. В Молдове нет простого отдельного налогового правила для чаевых, поэтому подход определяется индивидуально. Поможем правильно отразить их при расчёте зарплаты.",
          },
        ],
      },
      en: {
        intro:
          "A restaurant isn't run like a shop. Thin margins on **perishable goods**, **many small daily transactions**, staff coming and going, and a **VAT rate that's changing in 2026** — all demand accounting built for hospitality. We keep the books, calculate taxes and salaries and file returns on time, so you can focus on the floor and the kitchen.",
        overview:
          "Moldova's HoReCa sector is going through tax changes. The VAT rate for public catering and accommodation is currently 8%, but the regime is under review in 2026, with a possible rise to 18%. We handle the bookkeeping, payroll and tax reporting and keep you informed of every change that affects your business.",
        challenges: [
          {
            title: "A VAT rate that's changing",
            problem:
              "Public catering and accommodation get a reduced VAT rate (currently 8%), while alcohol is taxed separately at the standard rate. The regime is under review in 2026, with a possible rise to 18% — any change affects your invoicing and reporting.",
            solution:
              "We apply the rate in force correctly in the books and in VAT returns, treat alcohol separately, and let you know in advance how each legislative change affects you.",
            service: "accounting",
          },
          {
            title: "High volume of daily transactions",
            problem:
              "A restaurant generates dozens or hundreds of small transactions a day, in cash and by card. Recorded wrongly or late, they turn into incorrect returns and discrepancies that are hard to explain at an audit.",
            solution:
              "We record takings and expenses correctly, keep the books up to date and prepare tax returns on time, so there are no surprises at an audit.",
            service: "accounting",
          },
          {
            title: "Kitchen losses and perishable stock",
            problem:
              "Waste, expired food and kitchen consumption must be documented. Without correct recording they become non-deductible, and inventories show shortfalls that are hard to explain.",
            solution:
              "We record losses and write-offs in the books, apply the natural-loss norms and make sure genuine losses are deductible. We help with this process on the accounting side.",
            service: "accounting",
          },
          {
            title: "Seasonal staff and payroll",
            problem:
              "Summer terraces, holidays, staff coming and going — fixed-term hires and salaries change month to month, and badly drafted contracts get reclassified by the State Labour Inspectorate.",
            solution:
              "We draw up fixed-term contracts, calculate salaries and CNAS and CNAM contributions, and prepare payroll and monthly reports.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "What VAT rate applies to a restaurant in Moldova?",
            a: "Public catering and accommodation get a reduced rate (currently 8%), while alcohol is taxed separately at the standard rate. The regime is under review in 2026, with a possible rise to 18% — we'll warn you in advance and update the books and returns.",
          },
          {
            q: "How much does accounting for a restaurant or café cost?",
            a: "It depends on transaction volume, the number of employees and the services you need. We'll give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant, check the balances and make sure the transition happens without data loss or filing delays. You don't lose a day.",
          },
          {
            q: "How do I justify kitchen losses and waste?",
            a: "Through write-off records and natural-loss norms. Documented correctly, these losses are recorded in the books as deductible and withstand a tax audit. We tell you which documents are needed.",
          },
          {
            q: "How are tips recorded correctly?",
            a: "Tips can come in both cash and by card, and the rules depend on how they're collected and shared among staff. Moldova has no simple, dedicated tax rule for tips, so the treatment is decided case by case. We help you reflect them correctly in payroll.",
          },
        ],
      },
    },
  },
  {
    id: "constructii",
    slug: "constructii",
    title: { ro: "Construcții", ru: "Строительство", en: "Construction" },
    description: {
      ro: "În construcții, contabilitatea urmează ritmul șantierului: TVA, avansuri, devize și situații de lucrări, subcontractori, rețineri de garanție și proiecte care se întind pe mai multe luni sau ani. Urmărim corect veniturile pe stadiul de execuție, gestionăm avansurile și retențiile și ne asigurăm că evidența pe fiecare proiect rezistă la control. Adăugăm evidența mijloacelor fixe, a materialelor și a utilajelor. Fie că ridici clădiri rezidențiale, faci lucrări de infrastructură sau ești subantreprenor, primești o imagine clară a marjei pe fiecare proiect — și un contabil care vorbește limba devizelor.",
      ru: "В строительстве учёт следует ритму стройки: НДС, авансы, сметы и акты выполненных работ, субподрядчики, гарантийные удержания и проекты, растянутые на месяцы или годы. Мы корректно учитываем выручку по стадиям выполнения, ведём авансы и удержания и следим, чтобы учёт по каждому проекту выдержал проверку. Добавляем учёт основных средств, материалов и техники. Жилые здания, инфраструктурные работы или субподряд — вы получаете ясную картину маржи по каждому проекту и бухгалтера, который говорит на языке смет.",
      en: "In construction, accounting follows the site's rhythm: VAT, advances, estimates and work statements, subcontractors, retention holdbacks and projects spanning months or years. We recognise revenue correctly by stage of completion, manage advances and retentions, and make sure your project records survive an audit. We add fixed-asset, materials and equipment accounting. Whether you build residential, do infrastructure work or are a subcontractor, you get a clear view of margin on each project — and an accountant who speaks the language of estimates.",
    },
    detail: {
      ro: {
        intro:
          "În construcții, banii și munca nu se sincronizează: **avansuri** la început, **rețineri de garanție** la final și **proiecte care se întind pe luni sau ani**. O contabilitate care nu urmărește execuția pe stadii dă cifre care nu reflectă realitatea proiectului. Ținem evidența pe proiect, recunoaștem corect veniturile și pregătim raportarea fiscală, ca tu să te concentrezi pe șantier.",
        overview:
          "Construcțiile au reguli contabile proprii. În Moldova, veniturile din contractele de construcții se recunosc pe stadiul de execuție, conform SNC „Contracte de construcții”, pe baza volumului de lucrări confirmat de beneficiar. La acestea se adaugă regimul TVA cu drept de deducere (și pro-rata, când există și livrări scutite), avansurile și reținerile de garanție. Ținem evidența pe fiecare proiect și raportarea fiscală la zi, iar pe partea juridică te ajutăm cu contracte, documente și autorizații de construire și cu recuperarea sumelor restante.",
        challenges: [
          {
            title: "Recunoașterea veniturilor pe proiecte de durată",
            problem:
              "Un proiect se întinde pe luni sau ani, iar banii intră în avans și pe situații de lucrări, nu odată cu predarea. Dacă veniturile nu sunt recunoscute pe stadiul de execuție, profitul pe proiect și raportarea ies greșit.",
            solution:
              "Pe baza situațiilor de lucrări confirmate de beneficiar, recunoaștem veniturile pe stadiul de execuție conform SNC „Contracte de construcții” și ținem evidența separat pe fiecare proiect.",
            service: "accounting",
          },
          {
            title: "Avansuri și rețineri de garanție",
            problem:
              "Avansurile primite la început și reținerile de garanție oprite la final nu sunt nici venit, nici cheltuială în momentul plății — înregistrate greșit, distorsionează rezultatul și soldurile.",
            solution:
              "Înregistrăm corect avansurile și reținerile de garanție, urmărim termenele de eliberare și ne asigurăm că soldurile pe fiecare proiect sunt clare și rezistă la control.",
            service: "accounting",
          },
          {
            title: "TVA în construcții",
            problem:
              "Construcțiile combină livrări taxabile cu unele scutite (de exemplu, anumite locuințe), iar dreptul de deducere a TVA și pro-rata devin ușor de greșit. Din 2026, pragul de înregistrare obligatorie ca plătitor de TVA a fost majorat.",
            solution:
              "Aplicăm corect TVA pe fiecare tip de livrare, calculăm pro-rata de deducere acolo unde e cazul și urmărim pragul de înregistrare, ca să nu pierzi deduceri și să eviți erorile la decont.",
            service: "accounting",
          },
          {
            title: "Subcontractori, materiale și utilaje",
            problem:
              "Facturile de la subcontractori, consumul de materiale și amortizarea utilajelor se adună din zeci de surse. Fără o evidență structurată, costul real pe proiect rămâne neclar.",
            solution:
              "Ținem evidența subcontractorilor, a materialelor și a mijloacelor fixe (conform SNC), astfel încât costurile să fie alocate corect pe fiecare proiect și deductibile.",
            service: "accounting",
          },
          {
            title: "Contracte, autorizații și recuperarea banilor",
            problem:
              "În construcții, un proiect stă pe hârtii: contracte de antrepriză și de subcontractare, certificate de urbanism, autorizații de construire. Documente lipsă sau contracte slabe înseamnă lucrări blocate și bani greu de recuperat.",
            solution:
              "Pregătim și verificăm contractele de antrepriză și de subcontractare, te asistăm cu documentele și autorizațiile necesare (certificat de urbanism, autorizație de construire) și te susținem juridic la recuperarea sumelor restante.",
            service: "legal",
          },
          {
            title: "Salarizare pentru echipele de pe șantier",
            problem:
              "Personalul se schimbă de la un proiect la altul, cu angajări pe perioadă determinată și salarii care variază lunar. Contractele și calculele greșite atrag probleme la Inspectoratul de Stat al Muncii.",
            solution:
              "Întocmim contractele, calculăm salariile și contribuțiile CNAS și CNAM și pregătim statele de plată și rapoartele lunare pentru echipele tale.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Cum se recunosc veniturile la un contract de construcții în Moldova?",
            a: "Conform SNC „Contracte de construcții”, veniturile se recunosc pe stadiul de execuție — pe baza volumului de lucrări efectiv realizat și confirmat de beneficiar prin situațiile de lucrări, nu doar la predarea finală.",
          },
          {
            q: "Cât costă contabilitatea pentru o firmă de construcții?",
            a: "Depinde de numărul de proiecte, de volumul de tranzacții și de angajați. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Se aplică taxarea inversă la TVA în construcții?",
            a: "Nu ca regulă generală. În Moldova, taxarea inversă la TVA se aplică, din 2026, livrărilor de energie electrică și gaze naturale, nu lucrărilor de construcții. La construcții se aplică regimul obișnuit de TVA, cu drept de deducere și, după caz, pro-rata.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența și proiectele în curs de la contabilul actual, verificăm soldurile pe fiecare contract și ne asigurăm că tranziția se face fără pierderi de date sau întârzieri la raportare.",
          },
          {
            q: "Ne puteți ajuta cu contractele și autorizația de construire?",
            a: "Da. Pregătim și verificăm contractele de antrepriză și de subcontractare și te asistăm cu documentele necesare, inclusiv certificatul de urbanism și autorizația de construire. Autorizația de construire se eliberează de autoritatea publică locală în cel mult 30 de zile lucrătoare de la depunere.",
          },
          {
            q: "Cum se înregistrează reținerile de garanție?",
            a: "Reținerea de garanție nu este o cheltuială sau un venit în momentul reținerii. O înregistrăm separat și urmărim termenul de eliberare, astfel încât soldul pe fiecare proiect să fie corect.",
          },
        ],
      },
      ru: {
        intro:
          "В строительстве деньги и работа не совпадают по времени: **авансы** в начале, **гарантийные удержания** в конце и **проекты, растянутые на месяцы или годы**. Учёт, который не отслеживает выполнение по стадиям, даёт цифры, не отражающие реальность проекта. Ведём учёт по проектам, корректно признаём выручку и готовим налоговую отчётность, чтобы вы занимались стройкой.",
        overview:
          "У строительства свои правила учёта. В Молдове выручка по строительным контрактам признаётся по стадии выполнения, согласно НСБУ «Строительные контракты», на основе объёма работ, подтверждённого заказчиком. К этому добавляются режим НДС с правом вычета (и пропорция, когда есть освобождённые поставки), авансы и гарантийные удержания. Ведём учёт по каждому проекту и налоговую отчётность в актуальном состоянии, а с юридической стороны помогаем с договорами, документами и разрешениями на строительство и со взысканием задолженности.",
        challenges: [
          {
            title: "Признание выручки по длительным проектам",
            problem:
              "Проект длится месяцы или годы, а деньги поступают авансом и по актам выполненных работ, а не при сдаче. Если выручка не признаётся по стадии выполнения, прибыль по проекту и отчётность получаются неверными.",
            solution:
              "На основе актов выполненных работ, подтверждённых заказчиком, признаём выручку по стадии выполнения согласно НСБУ «Строительные контракты» и ведём учёт отдельно по каждому проекту.",
            service: "accounting",
          },
          {
            title: "Авансы и гарантийные удержания",
            problem:
              "Авансы, полученные в начале, и гарантийные удержания в конце — это ни выручка, ни расход в момент оплаты. Учтённые неправильно, они искажают результат и остатки.",
            solution:
              "Корректно учитываем авансы и гарантийные удержания, отслеживаем сроки их высвобождения и обеспечиваем, чтобы остатки по каждому проекту были ясными и выдерживали проверку.",
            service: "accounting",
          },
          {
            title: "НДС в строительстве",
            problem:
              "Строительство сочетает облагаемые поставки с освобождёнными (например, некоторое жильё), и право на вычет НДС и пропорцию легко применить неправильно. С 2026 года порог обязательной регистрации плательщиком НДС был повышен.",
            solution:
              "Правильно применяем НДС по каждому виду поставки, рассчитываем пропорцию вычета там, где нужно, и отслеживаем порог регистрации, чтобы вы не теряли вычеты и избегали ошибок в декларации.",
            service: "accounting",
          },
          {
            title: "Субподрядчики, материалы и техника",
            problem:
              "Счета субподрядчиков, расход материалов и амортизация техники складываются из десятков источников. Без структурированного учёта реальная себестоимость проекта остаётся неясной.",
            solution:
              "Ведём учёт субподрядчиков, материалов и основных средств (согласно НСБУ), чтобы затраты корректно распределялись по каждому проекту и были вычитаемыми.",
            service: "accounting",
          },
          {
            title: "Договоры, разрешения и взыскание долгов",
            problem:
              "В строительстве проект держится на документах: договоры подряда и субподряда, градостроительные сертификаты, разрешения на строительство. Недостающие документы или слабые договоры означают остановленные работы и трудно взыскиваемые деньги.",
            solution:
              "Готовим и проверяем договоры подряда и субподряда, помогаем с необходимыми документами и разрешениями (градостроительный сертификат, разрешение на строительство) и юридически сопровождаем взыскание задолженности.",
            service: "legal",
          },
          {
            title: "Расчёт зарплат для бригад",
            problem:
              "Персонал меняется от проекта к проекту, со срочными договорами и зарплатами, которые меняются ежемесячно. Неправильные договоры и расчёты ведут к проблемам с Государственной инспекцией труда.",
            solution:
              "Оформляем договоры, рассчитываем зарплаты и взносы CNAS и CNAM и готовим ведомости начисления зарплаты и ежемесячные отчёты для ваших бригад.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Как признаётся выручка по строительному контракту в Молдове?",
            a: "Согласно НСБУ «Строительные контракты», выручка признаётся по стадии выполнения — на основе объёма работ, фактически выполненного и подтверждённого заказчиком актами выполненных работ, а не только при окончательной сдаче.",
          },
          {
            q: "Сколько стоит бухгалтерия для строительной компании?",
            a: "Зависит от числа проектов, объёма операций и сотрудников. Сделаем понятное предложение после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Применяется ли обратное начисление НДС в строительстве?",
            a: "Не как общее правило. В Молдове обратное начисление НДС применяется с 2026 года к поставкам электроэнергии и природного газа, а не к строительным работам. К строительству применяется обычный режим НДС с правом вычета и, при необходимости, пропорцией.",
          },
          {
            q: "Как перейти от текущего бухгалтера к вам?",
            a: "Принимаем учёт и текущие проекты от текущего бухгалтера, проверяем остатки по каждому контракту и обеспечиваем переход без потери данных и задержек с отчётностью.",
          },
          {
            q: "Помогаете ли с договорами и разрешением на строительство?",
            a: "Да. Готовим и проверяем договоры подряда и субподряда и помогаем с необходимыми документами, включая градостроительный сертификат и разрешение на строительство. Разрешение на строительство выдаётся местной публичной властью в течение не более 30 рабочих дней с момента подачи.",
          },
          {
            q: "Как учитываются гарантийные удержания?",
            a: "Гарантийное удержание не является расходом или выручкой в момент удержания. Учитываем его отдельно и отслеживаем срок высвобождения, чтобы остаток по каждому проекту был корректным.",
          },
        ],
      },
      en: {
        intro:
          "In construction, money and work don't line up: **advances** at the start, **retention holdbacks** at the end, and **projects that run for months or years**. Accounting that doesn't track completion stage by stage produces numbers that don't reflect the project. We keep the books by project, recognise revenue correctly and handle tax reporting, so you can focus on the site.",
        overview:
          "Construction has its own accounting rules. In Moldova, revenue on construction contracts is recognised by stage of completion, under the SNC 'Construction contracts' standard, based on the volume of work confirmed by the client. On top of that come the VAT regime with deduction rights (and pro-rata where there are exempt supplies), advances and retention holdbacks. We keep the books per project and tax reporting up to date, and on the legal side we help with contracts, documents and building permits and with recovering outstanding payments.",
        challenges: [
          {
            title: "Revenue recognition on long projects",
            problem:
              "A project runs for months or years, and money comes in as advances and on work statements, not at handover. If revenue isn't recognised by stage of completion, project profit and reporting come out wrong.",
            solution:
              "Based on the work statements confirmed by the client, we recognise revenue by stage of completion under the SNC 'Construction contracts' standard and keep separate books for each project.",
            service: "accounting",
          },
          {
            title: "Advances and retention holdbacks",
            problem:
              "Advances received at the start and retentions held back at the end are neither income nor expense when paid — recorded wrongly, they distort the result and the balances.",
            solution:
              "We record advances and retention holdbacks correctly, track their release dates and make sure each project's balances are clear and audit-proof.",
            service: "accounting",
          },
          {
            title: "VAT in construction",
            problem:
              "Construction mixes taxable supplies with exempt ones (some housing, for example), and VAT deduction rights and pro-rata are easy to get wrong. From 2026, the mandatory VAT registration threshold was raised.",
            solution:
              "We apply VAT correctly to each type of supply, calculate the deduction pro-rata where needed and track the registration threshold, so you don't lose deductions or make filing errors.",
            service: "accounting",
          },
          {
            title: "Subcontractors, materials and equipment",
            problem:
              "Subcontractor invoices, materials consumption and equipment depreciation pile up from dozens of sources. Without structured records, the true cost per project stays unclear.",
            solution:
              "We keep records of subcontractors, materials and fixed assets (per SNC), so costs are allocated correctly to each project and are deductible.",
            service: "accounting",
          },
          {
            title: "Contracts, permits and recovering your money",
            problem:
              "In construction, a project rests on paperwork: main and subcontractor contracts, urban-planning certificates, building permits. Missing documents or weak contracts mean stalled work and money that's hard to recover.",
            solution:
              "We draft and review main and subcontractor contracts, help with the required documents and permits (urban-planning certificate, building permit) and provide legal support to recover outstanding amounts.",
            service: "legal",
          },
          {
            title: "Payroll for site crews",
            problem:
              "Staff change from one project to the next, with fixed-term contracts and salaries that vary monthly. Wrong contracts and calculations lead to trouble with the State Labour Inspectorate.",
            solution:
              "We draw up contracts, calculate salaries and CNAS and CNAM contributions, and prepare payroll and monthly reports for your crews.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "How is revenue recognised on a construction contract in Moldova?",
            a: "Under the SNC 'Construction contracts' standard, revenue is recognised by stage of completion — based on the volume of work actually carried out and confirmed by the client through work statements, not only at final handover.",
          },
          {
            q: "How much does accounting for a construction company cost?",
            a: "It depends on the number of projects, transaction volume and employees. We'll give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "Does reverse-charge VAT apply in construction?",
            a: "Not as a general rule. In Moldova, reverse-charge VAT applies, from 2026, to supplies of electricity and natural gas, not to construction works. Construction uses the ordinary VAT regime, with deduction rights and, where applicable, pro-rata.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books and ongoing projects from your current accountant, check the balances on each contract and make sure the transition happens without data loss or reporting delays.",
          },
          {
            q: "Can you help with contracts and the building permit?",
            a: "Yes. We draft and review main and subcontractor contracts and help with the required documents, including the urban-planning certificate and building permit. The building permit is issued by the local public authority within at most 30 working days of filing.",
          },
          {
            q: "How are retention holdbacks recorded?",
            a: "A retention holdback is not an expense or income when it's withheld. We record it separately and track its release date, so the balance on each project is correct.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "La o firmă de producție banii stau în **stocuri de materii prime, producție în curs și utilaje** — iar profitul real apare doar când **costul fiecărui produs** este calculat corect. Ținem evidența pe baza documentelor tale, fără să pierzi timpul cu contabilitatea.",
        overview:
          "Producția din Moldova lucrează cu consum de materiale, salarizarea muncitorilor, amortizarea utilajelor și, la unele produse, accize — toate cu reguli stricte de evidență conform Standardelor Naționale de Contabilitate.",
        challenges: [
          {
            title: "Costul produsului nu e clar",
            problem:
              "Nu știi cât te costă de fapt o unitate de produs, fiindcă materialele, salariile și cheltuielile indirecte se amestecă într-un singur total.",
            solution:
              "Calculăm costul de producție conform SNC, separând consumul direct de materiale, salariile directe și cheltuielile indirecte de producție, ca să vezi costul pe fiecare produs.",
            service: "accounting",
          },
          {
            title: "Producția în curs și stocurile la sfârșit de lună",
            problem:
              "La închiderea lunii rămân materiale în lucru și produse neterminate, iar evaluarea lor greșită distorsionează rezultatul.",
            solution:
              "Înregistrăm consumul de materiale, evaluăm producția în curs și stocurile de produse finite pe baza documentelor și a datelor pe care ni le transmiți.",
            service: "accounting",
          },
          {
            title: "Utilajele și amortizarea",
            problem:
              "Ai investit în linii și echipamente, dar nu știi cum se reflectă uzura lor în costuri și în impozite.",
            solution:
              "Ținem evidența mijloacelor fixe și calculăm amortizarea prin metoda liniară, în contabilitate și în scopuri fiscale, pe fiecare obiect.",
            service: "accounting",
          },
          {
            title: "Accize la produsele supuse accizelor",
            problem:
              "Dacă produci mărfuri accizabile, calculul și declararea accizelor se adaugă peste TVA și restul obligațiilor.",
            solution:
              "Verificăm dacă produsele tale intră sub regimul accizelor, calculăm sumele datorate și pregătim declarațiile, alături de evidența TVA.",
            service: "accounting",
          },
          {
            title: "Costuri care cresc fără explicație",
            problem:
              "Cheltuielile pe materiale și manoperă urcă de la o lună la alta și nu vezi unde se scurge marja.",
            solution:
              "Analizăm structura costurilor pe baza datelor contabile și îți arătăm unde apar abaterile — recomandări de optimizare, nu stabilirea prețurilor.",
            service: "consulting",
          },
          {
            title: "Salarizarea muncitorilor",
            problem:
              "Ai muncitori în schimburi, cu spor și ore suplimentare, iar calculul salariilor și al contribuțiilor devine greoi.",
            solution:
              "Întocmim statele de plată, calculăm salariile, impozitul pe venit și contribuțiile CNAS și CNAM, și pregătim contractele de muncă.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o firmă de producție?",
            a: "Depinde de numărul de produse, volumul de materii prime, numărul de muncitori și de aplicarea accizelor. Îți facem o ofertă după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența așa cum este, verificăm soldurile de stocuri, mijloace fixe și producție în curs și ne ocupăm de raportările următoare. Tu nu pierzi nicio zi de producție.",
          },
          {
            q: "Calculați costul fiecărui produs?",
            a: "Da. Pe baza consumului de materiale, a salariilor directe și a cheltuielilor indirecte de producție calculăm costul conform SNC. Stabilirea prețurilor de vânzare rămâne decizia ta.",
          },
          {
            q: "Cum se reflectă utilajele în contabilitate?",
            a: "Le înregistrăm ca mijloace fixe și calculăm amortizarea lunar, prin metoda liniară, începând cu luna următoare punerii în funcțiune, în contabilitate și în scopuri fiscale.",
          },
          {
            q: "Produsele mele sunt supuse accizelor?",
            a: "Doar anumite categorii de mărfuri sunt accizabile, precum alcoolul, produsele din tutun sau unele produse petroliere. Verificăm situația ta și, dacă se aplică, calculăm și declarăm accizele.",
          },
          {
            q: "Lucrați doar pe baza documentelor pe care le trimit?",
            a: "Da. Pe baza facturilor, a documentelor de consum, a fișelor de producție și a pontajelor ținem toată evidența și pregătim rapoartele și declarațiile către SFS.",
          },
        ],
      },
      ru: {
        intro:
          "На производстве деньги лежат в **запасах сырья, незавершённом производстве и оборудовании** — а реальная прибыль видна только тогда, когда **себестоимость каждого изделия** посчитана правильно. Ведём учёт по вашим документам, не отнимая у вас время на бухгалтерию.",
        overview:
          "Производство в Молдове работает с расходом материалов, начислением зарплаты рабочим, амортизацией оборудования и, по отдельным товарам, акцизами — и всё это с жёсткими правилами учёта по Национальным стандартам бухгалтерского учёта.",
        challenges: [
          {
            title: "Себестоимость изделия неясна",
            problem:
              "Вы не знаете, во сколько на самом деле обходится единица продукции, потому что материалы, зарплата и косвенные расходы сведены в одну сумму.",
            solution:
              "Рассчитываем себестоимость продукции по НСБУ, разделяя прямой расход материалов, прямую зарплату и косвенные производственные расходы, чтобы вы видели затраты по каждому изделию.",
            service: "accounting",
          },
          {
            title: "Незавершённое производство и запасы на конец месяца",
            problem:
              "На закрытии месяца остаются материалы в работе и недоделанная продукция, и неверная их оценка искажает результат.",
            solution:
              "Учитываем расход материалов, оцениваем незавершённое производство и запасы готовой продукции на основе документов и данных, которые вы передаёте.",
            service: "accounting",
          },
          {
            title: "Оборудование и амортизация",
            problem:
              "Вы вложились в линии и оборудование, но не понимаете, как их износ отражается в затратах и налогах.",
            solution:
              "Ведём учёт основных средств и начисляем амортизацию линейным методом — в бухгалтерском и налоговом учёте, по каждому объекту.",
            service: "accounting",
          },
          {
            title: "Акцизы на подакцизные товары",
            problem:
              "Если вы выпускаете подакцизные товары, расчёт и декларирование акцизов добавляются к НДС и прочим обязательствам.",
            solution:
              "Проверяем, попадает ли ваша продукция под режим акцизов, рассчитываем суммы к уплате и готовим декларации вместе с учётом НДС.",
            service: "accounting",
          },
          {
            title: "Затраты растут без объяснения",
            problem:
              "Расходы на материалы и труд растут из месяца в месяц, и непонятно, где утекает маржа.",
            solution:
              "Анализируем структуру затрат на основе учётных данных и показываем, где возникают отклонения — рекомендации по оптимизации, а не установление цен.",
            service: "consulting",
          },
          {
            title: "Начисление зарплаты рабочим",
            problem:
              "У вас рабочие по сменам, с надбавками и сверхурочными, и расчёт зарплаты и взносов становится громоздким.",
            solution:
              "Составляем расчётные ведомости, начисляем зарплату, подоходный налог и взносы CNAS и CNAM, готовим трудовые договоры.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для производственной фирмы?",
            a: "Зависит от числа изделий, объёма сырья, количества рабочих и применения акцизов. Предложение составим после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от нынешнего бухгалтера к вам?",
            a: "Принимаем учёт как есть, сверяем остатки запасов, основных средств и незавершённого производства и берём на себя дальнейшую отчётность. Вы не теряете ни одного дня производства.",
          },
          {
            q: "Вы считаете себестоимость каждого изделия?",
            a: "Да. На основе расхода материалов, прямой зарплаты и косвенных производственных расходов рассчитываем себестоимость по НСБУ. Установление отпускных цен остаётся вашим решением.",
          },
          {
            q: "Как оборудование отражается в учёте?",
            a: "Учитываем его как основные средства и начисляем амортизацию ежемесячно линейным методом, начиная с месяца, следующего за вводом в эксплуатацию, в бухгалтерском и налоговом учёте.",
          },
          {
            q: "Моя продукция облагается акцизами?",
            a: "Только отдельные категории товаров являются подакцизными — например, алкоголь, табачные изделия или некоторые нефтепродукты. Проверим вашу ситуацию и, если применимо, рассчитаем и задекларируем акцизы.",
          },
          {
            q: "Вы работаете только по документам, которые я присылаю?",
            a: "Да. На основе накладных, документов на расход, производственных карт и табелей ведём весь учёт и готовим отчёты и декларации в ГНС.",
          },
        ],
      },
      en: {
        intro:
          "In a manufacturing business, the money sits in **raw materials, work in progress and equipment** — and real profit only shows once the **cost of each product** is calculated correctly. We keep the records from your documents, without taking your time on accounting.",
        overview:
          "Manufacturing in Moldova deals with material consumption, worker payroll, equipment depreciation and, for some goods, excise duties — all under strict record-keeping rules set by the National Accounting Standards.",
        challenges: [
          {
            title: "The product cost is unclear",
            problem:
              "You do not know what a unit of product actually costs you, because materials, wages and indirect expenses are mixed into a single total.",
            solution:
              "We calculate the cost of production under the National Accounting Standards, separating direct material consumption, direct wages and indirect production expenses, so you see the cost per product.",
            service: "accounting",
          },
          {
            title: "Work in progress and month-end stock",
            problem:
              "At month-end there are materials still in process and unfinished goods, and valuing them wrong distorts the result.",
            solution:
              "We record material consumption and value the work in progress and finished-goods stock based on the documents and data you send us.",
            service: "accounting",
          },
          {
            title: "Equipment and depreciation",
            problem:
              "You invested in lines and machinery, but you are not sure how their wear shows up in costs and taxes.",
            solution:
              "We keep the fixed-asset register and calculate depreciation using the straight-line method, for both accounting and tax purposes, per asset.",
            service: "accounting",
          },
          {
            title: "Excise on excisable goods",
            problem:
              "If you produce excisable goods, calculating and declaring excise duty comes on top of VAT and your other obligations.",
            solution:
              "We check whether your products fall under the excise regime, calculate the amounts due and prepare the returns, alongside the VAT records.",
            service: "accounting",
          },
          {
            title: "Costs rising without explanation",
            problem:
              "Material and labour costs climb month after month and you cannot see where the margin leaks.",
            solution:
              "We analyse the cost structure from the accounting data and show you where the variances appear — optimisation advice, not setting prices.",
            service: "consulting",
          },
          {
            title: "Worker payroll",
            problem:
              "You have workers on shifts, with bonuses and overtime, and calculating wages and contributions becomes a burden.",
            solution:
              "We prepare the payroll sheets, calculate wages, income tax and the CNAS and CNAM contributions, and draw up the employment contracts.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "How much does accounting cost for a manufacturing company?",
            a: "It depends on the number of products, the volume of raw materials, the number of workers and whether excise applies. We give you a quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the records as they are, check the balances for stock, fixed assets and work in progress, and handle the reporting from there. You lose no production day.",
          },
          {
            q: "Do you calculate the cost of each product?",
            a: "Yes. Based on material consumption, direct wages and indirect production expenses we calculate the cost under the National Accounting Standards. Setting the selling prices stays your decision.",
          },
          {
            q: "How is equipment reflected in the accounts?",
            a: "We record it as fixed assets and calculate depreciation monthly using the straight-line method, starting the month after it is put into use, for both accounting and tax purposes.",
          },
          {
            q: "Are my products subject to excise?",
            a: "Only certain categories of goods are excisable — for example alcohol, tobacco products or some petroleum products. We check your situation and, if it applies, calculate and declare the excise.",
          },
          {
            q: "Do you work only from the documents I send?",
            a: "Yes. From invoices, consumption documents, production records and timesheets we keep all the records and prepare the reports and returns to the State Tax Service.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "**Lucrezi pe proiecte, retainere și ore facturabile, dar evidența contabilă nu ține pasul cu modul real în care încasezi.** Veniturile din servicii se recunosc altfel decât vânzarea de mărfuri, iar un avans încasat azi nu înseamnă automat venit al lunii. Punem la punct contabilitatea, salarizarea echipei și contractele cu clienții, ca să te concentrezi pe livrare.",
        overview:
          "Firmele de servicii din Moldova aplică SNC „Venituri”, care prevede recunoașterea veniturilor din prestări de servicii pe măsura executării, prin metoda procentului de finalizare atunci când un contract acoperă mai multe perioade. Cota standard a impozitului pe venit pentru persoane juridice este 12%, iar TVA standard 20%; înregistrarea ca plătitor de TVA devine obligatorie la depășirea plafonului cifrei de afaceri, majorat în 2026. Companiile din domeniul IT și industrii creative pot opta pentru regimul rezidentului Parcului IT, cu impozit unic de 7% din cifra de afaceri. Din 23 august 2026 intră în vigoare noua lege privind protecția datelor cu caracter personal (Legea 195/2024), aliniată la GDPR.",
        challenges: [
          {
            title: "Avansuri și retainere care nu sunt încă venit",
            problem:
              "Încasezi un retainer la început de lună sau un avans pe proiect, dar nu știi cât din el e venit real și cât e datorie față de client până livrezi.",
            solution:
              "Ținem corect evidența veniturilor din servicii conform SNC „Venituri”: avansurile rămân venituri anticipate, iar recunoașterea se face pe măsura prestării, inclusiv prin metoda procentului de finalizare pentru proiectele care se întind pe mai multe luni. Vezi clar ce ai câștigat efectiv în fiecare perioadă.",
            service: "accounting",
          },
          {
            title: "Venituri pe client și pe proiect, fără claritate la marjă",
            problem:
              "Ai zeci de clienți și proiecte în paralel, dar nu vezi care aduc profit și care doar consumă ore.",
            solution:
              "Structurăm evidența pe proiecte și pe clienți, legăm orele facturabile de venituri și cheltuieli și pregătim rapoarte financiare din care înțelegi marja reală pe fiecare contract. Deciziile de preț și de selecție a clienților se sprijină pe cifre, nu pe intuiție.",
            service: "accounting",
          },
          {
            title: "Salarizarea echipei și a colaboratorilor",
            problem:
              "Ai angajați cu normă, part-time și colaboratori pe proiect, iar calculul salariilor, reținerilor și contribuțiilor îți mănâncă timp în fiecare lună.",
            solution:
              "Întocmim statele de plată și calculăm reținerile și contribuțiile (impozit pe venit, CNAS, CNAM) pentru angajați și colaboratori, pregătim contractele de muncă și prestări servicii și depunem declarațiile salariale la termen. Pentru companiile IT eligibile, evaluăm și regimul Parcului IT.",
            service: "hr",
          },
          {
            title: "Contracte cu clienții, NDA și protecția datelor",
            problem:
              "Lucrezi pe baza unor șabloane vechi de contract, fără clauze clare de confidențialitate, proprietate intelectuală sau prelucrare a datelor clienților.",
            solution:
              "Pregătim și verificăm contractele de prestări servicii, acordurile de confidențialitate (NDA) și clauzele de proprietate intelectuală, și te aducem în conformitate cu noua lege privind protecția datelor cu caracter personal (Legea 195/2024, aplicabilă din 23 august 2026, aliniată la GDPR).",
            service: "legal",
          },
          {
            title: "TVA și plafonul de înregistrare",
            problem:
              "Crești rapid și nu știi când devii plătitor de TVA, nici cum afectează asta prețurile către clienți și relația cu furnizorii.",
            solution:
              "Monitorizăm cifra de afaceri față de plafonul de înregistrare TVA, aplicăm corect TVA pe prestările de servicii în declarațiile lunare și te înregistrăm la timp, fără penalități pentru depășirea termenului.",
            service: "accounting",
          },
          {
            title: "Planificare fiscală și alegerea regimului",
            problem:
              "Nu ești sigur dacă forma actuală de organizare și regimul fiscal sunt cele potrivite pentru o firmă de servicii care crește.",
            solution:
              "Analizăm structura veniturilor și a echipei și comparăm regimurile aplicabile (impozit pe venit de 12%, eligibilitatea pentru Parcul IT cu impozit unic de 7%), ca să alegi varianta legală cu cel mai mic cost total, fără scheme riscante.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o firmă de servicii?",
            a: "Depinde de numărul de clienți și proiecte, de mărimea echipei salarizate și de statutul de plătitor de TVA. Pentru o firmă mică cu câțiva angajați costul e modest; crește pe măsură ce apar mai multe state de plată și tranzacții. Îți dăm un preț fix lunar după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența pe baza balanțelor și a declarațiilor depuse, verificăm soldurile clienților și ale salariaților și ne sincronizăm cu termenele fiscale curente. Tot procesul îl coordonăm noi, iar tu nu pierzi nicio zi și niciun termen de raportare.",
          },
          {
            q: "Cum recunoașteți veniturile pentru proiecte care durează mai multe luni?",
            a: "Conform SNC „Venituri”, pentru contractele care se întind pe mai multe perioade aplicăm metoda procentului de finalizare: recunoaștem venitul pe măsura serviciilor efectiv prestate, nu la încasare. Avansurile și retainerele neconsumate rămân venituri anticipate până la livrare.",
          },
          {
            q: "Ne ocupați și de salarizarea colaboratorilor pe proiect?",
            a: "Da. Întocmim statele de plată pentru angajați și calculăm reținerile pentru colaboratorii pe contracte de prestări servicii, inclusiv impozitul pe venit și contribuțiile CNAS și CNAM, și pregătim contractele aferente. Declarațiile salariale le depunem la termen.",
          },
          {
            q: "Putem beneficia de regimul Parcului IT?",
            a: "Dacă cel puțin 70% din venituri provin din activități IT, industrii creative sau cercetare-dezvoltare, firma poate deveni rezident al Parcului IT și plăti un impozit unic de 7% din cifra de afaceri, care înlocuiește mai multe impozite și contribuții. Verificăm eligibilitatea și gestionăm raportarea.",
          },
          {
            q: "Ne ajutați cu contractele și protecția datelor clienților?",
            a: "Da. Pregătim și revizuim contractele de prestări servicii, NDA-urile și clauzele de proprietate intelectuală, și te aducem în conformitate cu noua lege privind protecția datelor cu caracter personal (aplicabilă din 23 august 2026, aliniată la GDPR).",
          },
        ],
      },
      ru: {
        intro:
          "**Вы работаете по проектам, ретейнерам и оплачиваемым часам, но бухгалтерский учёт не успевает за тем, как вы реально получаете оплату.** Доходы от услуг признаются иначе, чем продажа товаров, а полученный сегодня аванс не означает автоматически доход текущего месяца. Мы наладим учёт, расчёт зарплаты команды и договоры с клиентами, чтобы вы сосредоточились на работе.",
        overview:
          "Сервисные компании в Молдове применяют НСБУ «Доходы», который предусматривает признание доходов от оказания услуг по мере выполнения — методом процента завершения, когда договор охватывает несколько периодов. Стандартная ставка налога на прибыль юридических лиц — 12%, стандартный НДС — 20%; регистрация плательщиком НДС обязательна при превышении порога оборота, повышенного в 2026 году. Компании в сфере ИТ и креативных индустрий могут выбрать режим резидента ИТ-парка с единым налогом 7% от оборота. С 23 августа 2026 года вступает в силу новый закон о защите персональных данных (Закон 195/2024), приведённый в соответствие с GDPR.",
        challenges: [
          {
            title: "Авансы и ретейнеры, которые ещё не являются доходом",
            problem:
              "Вы получаете ретейнер в начале месяца или аванс по проекту, но не знаете, какая часть — это реальный доход, а какая — обязательство перед клиентом до момента выполнения.",
            solution:
              "Мы корректно ведём учёт доходов от услуг согласно НСБУ «Доходы»: авансы остаются доходами будущих периодов, а признание происходит по мере оказания услуг, в том числе методом процента завершения для проектов, которые длятся несколько месяцев. Вы чётко видите, сколько фактически заработали за каждый период.",
            service: "accounting",
          },
          {
            title: "Доходы по клиентам и проектам без ясности по марже",
            problem:
              "У вас десятки клиентов и проектов параллельно, но вы не видите, какие приносят прибыль, а какие только расходуют часы.",
            solution:
              "Мы структурируем учёт по проектам и клиентам, связываем оплачиваемые часы с доходами и расходами и готовим финансовые отчёты, из которых понятна реальная маржа по каждому договору. Решения по ценам и выбору клиентов опираются на цифры, а не на интуицию.",
            service: "accounting",
          },
          {
            title: "Расчёт зарплаты команды и подрядчиков",
            problem:
              "У вас есть штатные сотрудники, работающие неполный день, и подрядчики по проектам, а расчёт зарплат, удержаний и взносов отнимает время каждый месяц.",
            solution:
              "Мы составляем платёжные ведомости и рассчитываем удержания и взносы (подоходный налог, CNAS, CNAM) для сотрудников и подрядчиков, готовим трудовые договоры и договоры оказания услуг и сдаём зарплатные декларации в срок. Для подходящих ИТ-компаний оцениваем и режим ИТ-парка.",
            service: "hr",
          },
          {
            title: "Договоры с клиентами, NDA и защита данных",
            problem:
              "Вы работаете по старым шаблонам договоров без чётких положений о конфиденциальности, интеллектуальной собственности или обработке данных клиентов.",
            solution:
              "Мы готовим и проверяем договоры оказания услуг, соглашения о конфиденциальности (NDA) и положения об интеллектуальной собственности, а также приводим вас в соответствие с новым законом о защите персональных данных (Закон 195/2024, применяется с 23 августа 2026 года, согласован с GDPR).",
            service: "legal",
          },
          {
            title: "НДС и порог регистрации",
            problem:
              "Вы быстро растёте и не знаете, когда становитесь плательщиком НДС и как это влияет на цены для клиентов и отношения с поставщиками.",
            solution:
              "Мы отслеживаем оборот относительно порога регистрации НДС, корректно применяем НДС к оказанию услуг в ежемесячных декларациях и регистрируем вас вовремя, без штрафов за нарушение срока.",
            service: "accounting",
          },
          {
            title: "Налоговое планирование и выбор режима",
            problem:
              "Вы не уверены, подходят ли текущая форма организации и налоговый режим растущей сервисной компании.",
            solution:
              "Мы анализируем структуру доходов и команды и сравниваем применимые режимы (налог на прибыль 12%, право на ИТ-парк с единым налогом 7%), чтобы вы выбрали законный вариант с наименьшей общей стоимостью, без рискованных схем.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для сервисной компании?",
            a: "Зависит от количества клиентов и проектов, размера команды на зарплате и статуса плательщика НДС. Для небольшой фирмы с несколькими сотрудниками стоимость умеренная; она растёт по мере увеличения числа платёжных ведомостей и операций. Мы назовём фиксированную ежемесячную цену после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от нынешнего бухгалтера к вам?",
            a: "Мы принимаем учёт на основе оборотных ведомостей и сданных деклараций, проверяем сальдо по клиентам и сотрудникам и синхронизируемся с текущими налоговыми сроками. Весь процесс координируем мы, а вы не теряете ни дня и ни одного срока отчётности.",
          },
          {
            q: "Как вы признаёте доходы по проектам, которые длятся несколько месяцев?",
            a: "Согласно НСБУ «Доходы», для договоров, охватывающих несколько периодов, мы применяем метод процента завершения: признаём доход по мере фактически оказанных услуг, а не по поступлению оплаты. Неиспользованные авансы и ретейнеры остаются доходами будущих периодов до момента выполнения.",
          },
          {
            q: "Занимаетесь ли вы расчётом оплаты подрядчиков по проектам?",
            a: "Да. Мы составляем платёжные ведомости для сотрудников и рассчитываем удержания для подрядчиков по договорам оказания услуг, включая подоходный налог и взносы CNAS и CNAM, а также готовим соответствующие договоры. Зарплатные декларации сдаём в срок.",
          },
          {
            q: "Можем ли мы воспользоваться режимом ИТ-парка?",
            a: "Если не менее 70% доходов поступает от ИТ-деятельности, креативных индустрий или исследований и разработок, компания может стать резидентом ИТ-парка и платить единый налог 7% от оборота, который заменяет несколько налогов и взносов. Мы проверяем право на участие и ведём отчётность.",
          },
          {
            q: "Помогаете ли вы с договорами и защитой данных клиентов?",
            a: "Да. Мы готовим и проверяем договоры оказания услуг, NDA и положения об интеллектуальной собственности, а также приводим вас в соответствие с новым законом о защите персональных данных (применяется с 23 августа 2026 года, согласован с GDPR).",
          },
        ],
      },
      en: {
        intro:
          "**You work on projects, retainers and billable hours, but your bookkeeping does not keep up with how you actually get paid.** Service revenue is recognised differently from selling goods, and a deposit received today is not automatically this month's income. We set up your accounting, team payroll and client contracts so you can focus on delivery.",
        overview:
          "Service firms in Moldova apply the national accounting standard SNC „Venituri” (Revenue), which recognises service revenue as work is performed — using the percentage-of-completion method when a contract spans several periods. The standard corporate income tax rate is 12% and standard VAT is 20%; VAT registration becomes mandatory once turnover exceeds the threshold, raised in 2026. Companies in IT and creative industries may opt for Moldova IT Park resident status, with a single 7% tax on turnover. From 23 August 2026 a new personal data protection law (Law 195/2024), aligned with the GDPR, comes into force.",
        challenges: [
          {
            title: "Deposits and retainers that are not yet revenue",
            problem:
              "You collect a retainer at the start of the month or a project deposit, but you do not know how much of it is real income and how much is a liability to the client until you deliver.",
            solution:
              "We keep service revenue properly under SNC „Venituri”: advances stay as deferred income, and revenue is recognised as services are performed, including the percentage-of-completion method for projects that run over several months. You see clearly what you actually earned in each period.",
            service: "accounting",
          },
          {
            title: "Revenue by client and project, with no clarity on margin",
            problem:
              "You run dozens of clients and projects in parallel, but you cannot see which ones turn a profit and which just consume hours.",
            solution:
              "We structure the books by project and by client, tie billable hours to revenue and costs, and produce financial reports that show the real margin on each engagement. Pricing and client-selection decisions rest on numbers, not on intuition.",
            service: "accounting",
          },
          {
            title: "Payroll for the team and project contractors",
            problem:
              "You have full-time staff, part-timers and project contractors, and calculating wages, withholdings and contributions eats up time every month.",
            solution:
              "We prepare payroll and calculate withholdings and contributions (income tax, CNAS, CNAM) for employees and contractors, draft employment and service contracts, and file payroll returns on time. For eligible IT companies we also assess the IT Park regime.",
            service: "hr",
          },
          {
            title: "Client contracts, NDAs and data protection",
            problem:
              "You work from old contract templates, without clear clauses on confidentiality, intellectual property or processing of client data.",
            solution:
              "We draft and review service contracts, non-disclosure agreements (NDAs) and intellectual-property clauses, and bring you into compliance with the new personal data protection law (Law 195/2024, in force from 23 August 2026, aligned with the GDPR).",
            service: "legal",
          },
          {
            title: "VAT and the registration threshold",
            problem:
              "You are growing fast and do not know when you become a VAT payer, or how that affects your prices to clients and your supplier relationships.",
            solution:
              "We track turnover against the VAT registration threshold, apply VAT correctly to services in the monthly returns, and register you on time, with no penalties for missing the deadline.",
            service: "accounting",
          },
          {
            title: "Tax planning and choosing the right regime",
            problem:
              "You are not sure whether your current legal form and tax regime are the right fit for a growing service firm.",
            solution:
              "We review your revenue and team structure and compare the applicable regimes (12% corporate income tax, eligibility for the IT Park with its single 7% tax), so you can choose the legal option with the lowest total cost, with no risky schemes.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "How much does accounting cost for a service firm?",
            a: "It depends on the number of clients and projects, the size of the payroll team, and your VAT status. For a small firm with a few employees the cost is modest; it grows as payroll runs and transactions increase. We give you a fixed monthly price after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your trial balances and filed returns, verify client and employee balances, and sync with current tax deadlines. We coordinate the whole process, and you lose neither a day nor a single reporting deadline.",
          },
          {
            q: "How do you recognise revenue for projects that run over several months?",
            a: "Under SNC „Venituri”, for contracts that span several periods we use the percentage-of-completion method: we recognise revenue as services are actually performed, not on receipt of payment. Unused deposits and retainers stay as deferred income until delivery.",
          },
          {
            q: "Do you also handle payroll for project contractors?",
            a: "Yes. We prepare payroll for employees and calculate withholdings for contractors on service agreements, including income tax and CNAS and CNAM contributions, and draft the related contracts. We file payroll returns on time.",
          },
          {
            q: "Can we benefit from the IT Park regime?",
            a: "If at least 70% of your revenue comes from IT activities, creative industries or research and development, the company can become an IT Park resident and pay a single 7% tax on turnover, which replaces several taxes and contributions. We check eligibility and handle the reporting.",
          },
          {
            q: "Do you help with contracts and protecting client data?",
            a: "Yes. We draft and review service contracts, NDAs and intellectual-property clauses, and bring you into compliance with the new personal data protection law (in force from 23 August 2026, aligned with the GDPR).",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "**Tu scrii rapoarte către finanțatori, nu jurnale contabile.** Noi ținem evidența pe surse de finanțare, separăm fondurile cu destinație și pregătim cifrele exact așa cum le cere fiecare donator. Tu te ocupi de misiune, noi de conformitatea cu Legea 86/2020 și cu Serviciul Fiscal.",
        overview:
          "Un ONG din Moldova nu se conduce ca o firmă. Mijloacele cu destinație specială — granturi, donații condiționate, asistență financiară sau tehnică — se înregistrează separat și se raportează în Anexa 3 la situațiile financiare, „Modificarea surselor de finanțare”. Activitatea statutară este scutită de impozit pe venit atâta timp cât fondurile sunt folosite conform statutului și nu se distribuie fondatorilor; orice activitate economică auxiliară se impozitează ca la o entitate obișnuită, deci trebuie ținută separat. La acestea se adaugă obligațiile din Legea nr. 86/2020 cu privire la organizațiile necomerciale — actul de constituire, raportul anual de activitate prezentat Ministerului Justiției, transparența și, opțional, statutul de utilitate publică care deschide accesul la mecanismul de desemnare procentuală (2%). Acoperim toate aceste planuri: contabilitate pe granturi, salarizare, documente juridice și consultanță.",
        challenges: [
          {
            title: "Bani din mai multe granturi, amestecați într-un singur cont",
            problem:
              "Ai trei finanțatori, fiecare cu bugetul și liniile lui, dar totul intră într-un cont și nu mai știi cât a rămas pe fiecare proiect.",
            solution:
              "Ținem evidența pe surse de finanțare, separat pe fiecare grant și pe fiecare linie de buget, prin conturile de mijloace cu destinație specială. În orice moment vezi soldul disponibil pe proiect și cheltuielile eligibile, fără să încurci banii unui donator cu ai altuia.",
            service: "accounting",
          },
          {
            title: "Raportul financiar către donator nu se potrivește cu cererea lui",
            problem:
              "Fiecare finanțator vrea alt format, altă periodicitate și alte categorii de cheltuieli, iar tu reconstruiești cifrele manual înainte de fiecare termen.",
            solution:
              "Pregătim raportarea financiară către donatori în formatul cerut prin contractul de grant — trimestrial, semestrial sau la final de proiect — cu cheltuielile mapate pe liniile bugetare convenite. Documentele justificative sunt legate de fiecare sumă, ca finanțatorul să poată verifica fără întrebări suplimentare.",
            service: "accounting",
          },
          {
            title: "Activitatea economică riscă să-ți pună în pericol scutirea fiscală",
            problem:
              "Ai început să oferi servicii contra plată sau să vinzi ceva pentru sustenabilitate și nu ești sigur unde se termină activitatea statutară scutită și unde începe cea impozabilă.",
            solution:
              "Separăm în evidență activitatea necomercială de cea economică auxiliară și calculăm corect impozitul doar pe partea taxabilă, păstrând scutirea pentru activitatea statutară. Așa rămâi conform cu condițiile din Codul fiscal și nu pierzi statutul de organizație scutită.",
            service: "accounting",
          },
          {
            title: "Statut, înregistrare și raportul anual către Ministerul Justiției",
            problem:
              "Trebuie să modifici actul de constituire, să înregistrezi schimbări de organe de conducere sau să depui raportul anual de activitate și nu ai timp să urmărești termenele.",
            solution:
              "Pregătim documentele de înregistrare și conformitate cu Legea nr. 86/2020 — statut, modificări, raportul anual de activitate — și le depunem la timp. Dacă vrei, te însoțim și în procedura de obținere a statutului de utilitate publică.",
            service: "legal",
          },
          {
            title: "Salarizarea angajaților și a voluntarilor",
            problem:
              "Ai personal pe contract, colaboratori pe proiect și voluntari, fiecare cu situația lui, iar statele de plată, CNAS și CNAM trebuie să fie corecte și pe sursa de finanțare potrivită.",
            solution:
              "Ținem salarizarea pentru angajați și voluntari — state de plată, contracte, calculul și raportarea CNAS și CNAM — și alocăm corect costurile de personal pe granturile care le finanțează, ca să se reflecte exact în rapoartele către donatori.",
            service: "hr",
          },
          {
            title: "Accesul la mecanismul de 2% și la finanțări noi",
            problem:
              "Auzi de desemnarea procentuală de 2% și de noi linii de grant, dar nu știi dacă organizația ta îndeplinește condițiile sau ce documente îți trebuie.",
            solution:
              "Verificăm dacă îndeplinești condițiile pentru Lista beneficiarilor desemnării procentuale (utilitate publică, vechime de cel puțin un an, fără datorii la buget) și pregătim dosarul. Te consiliem și pe partea de eligibilitate financiară pentru aplicații la noi finanțatori.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru un ONG?",
            a: "Depinde de numărul de granturi, de volumul tranzacțiilor, de câți angajați și voluntari ai pe stat și de câte rapoarte cer finanțatorii. Un ONG cu un singur grant și fără personal costă mult mai puțin decât unul cu mai multe proiecte și salarizare lunară. Îți facem o ofertă clară după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența pe baza balanței și a soldurilor pe surse de finanțare, ne sincronizăm cu rapoartele deja depuse la donatori și la Serviciul Fiscal și continuăm de unde s-a rămas. Cerem accesele și documentele necesare, verificăm fondurile cu destinație deschise și tu nu pierzi nicio zi de raportare.",
          },
          {
            q: "Faceți și auditul cerut de finanțatori?",
            a: "Nu efectuăm audit — acesta se face de o firmă de audit independentă, așa cum cer adesea donatorii. Ce facem noi este să ținem evidența în stare pregătită pentru audit și să colaborăm cu auditorul tău extern: punem la dispoziție registrele, documentele justificative și rapoartele pe granturi, ca verificarea să decurgă rapid și fără surprize.",
          },
          {
            q: "Cum vă transmitem documentele?",
            a: "Ne trimiteți facturile, contractele și extrasele scanate, iar noi ținem evidența, calculăm salariile și pregătim rapoartele. Primești cifrele la timp, fără bătăi de cap cu hârtiile.",
          },
          {
            q: "Ce se întâmplă dacă un finanțator ne cere un raport urgent?",
            a: "Pentru că ținem evidența pe fiecare sursă de finanțare în paralel, soldurile și cheltuielile pe proiect sunt mereu actuale. Când apare o cerere neașteptată, extragem raportul pe grantul respectiv în formatul cerut, fără să reconstruim cifrele de la zero.",
          },
          {
            q: "Trebuie să depunem raport anual de activitate la stat?",
            a: "Da. Legea nr. 86/2020 obligă organizațiile necomerciale să prezinte raportul anual de activitate, iar neprezentarea după solicitări repetate ale Ministerului Justiției poate duce la lichidarea forțată. Noi pregătim acest raport împreună cu situațiile financiare și îl depunem la termen.",
          },
        ],
      },
      ru: {
        intro:
          "**Вы пишете отчёты донорам, а не бухгалтерские журналы.** Мы ведём учёт по источникам финансирования, разделяем целевые средства и готовим цифры именно так, как требует каждый донор. Вы занимаетесь миссией, мы — соответствием Закону 86/2020 и Налоговой службе.",
        overview:
          "НКО в Молдове управляется не как фирма. Средства целевого назначения — гранты, обусловленные пожертвования, финансовая или техническая помощь — учитываются отдельно и отражаются в Приложении 3 к финансовой отчётности, «Изменение источников финансирования». Уставная деятельность освобождена от подоходного налога, пока средства используются согласно уставу и не распределяются между учредителями; любая вспомогательная экономическая деятельность облагается налогом как у обычной организации, поэтому её нужно вести отдельно. К этому добавляются обязательства по Закону № 86/2020 о некоммерческих организациях — учредительный акт, годовой отчёт о деятельности, представляемый Министерству юстиции, прозрачность и, по желанию, статус общественной полезности, который открывает доступ к механизму процентного назначения (2%). Покрываем все эти направления: учёт по грантам, расчёт зарплаты, юридические документы и консультации.",
        challenges: [
          {
            title: "Деньги из нескольких грантов смешаны на одном счёте",
            problem:
              "У вас три донора, у каждого свой бюджет и свои статьи, но всё поступает на один счёт, и вы уже не знаете, сколько осталось по каждому проекту.",
            solution:
              "Мы ведём учёт по источникам финансирования, отдельно по каждому гранту и каждой бюджетной статье, через счета целевых средств. В любой момент вы видите доступный остаток по проекту и допустимые расходы, не смешивая деньги одного донора с деньгами другого.",
            service: "accounting",
          },
          {
            title: "Финансовый отчёт донору не совпадает с его требованиями",
            problem:
              "Каждый донор хочет другой формат, другую периодичность и другие категории расходов, и вы вручную пересобираете цифры перед каждым сроком.",
            solution:
              "Мы готовим финансовую отчётность донорам в формате, предусмотренном грантовым договором — ежеквартально, раз в полугодие или по завершении проекта — с расходами, распределёнными по согласованным бюджетным статьям. Подтверждающие документы привязаны к каждой сумме, чтобы донор мог проверить без дополнительных вопросов.",
            service: "accounting",
          },
          {
            title: "Экономическая деятельность ставит под угрозу налоговую льготу",
            problem:
              "Вы начали оказывать платные услуги или что-то продавать ради устойчивости и не уверены, где заканчивается освобождённая уставная деятельность и начинается налогооблагаемая.",
            solution:
              "Мы разделяем в учёте некоммерческую и вспомогательную экономическую деятельность и правильно рассчитываем налог только на облагаемую часть, сохраняя освобождение для уставной деятельности. Так вы остаётесь в рамках условий Налогового кодекса и не теряете статус освобождённой организации.",
            service: "accounting",
          },
          {
            title: "Устав, регистрация и годовой отчёт Министерству юстиции",
            problem:
              "Нужно изменить учредительный акт, зарегистрировать смену органов управления или подать годовой отчёт о деятельности, а времени следить за сроками нет.",
            solution:
              "Мы готовим документы регистрации и соответствия Закону № 86/2020 — устав, изменения, годовой отчёт о деятельности — и подаём их вовремя. При желании сопровождаем вас и в процедуре получения статуса общественной полезности.",
            service: "legal",
          },
          {
            title: "Расчёт зарплаты сотрудников и волонтёров",
            problem:
              "У вас есть штатные сотрудники, проектные подрядчики и волонтёры, у каждого своя ситуация, а платёжные ведомости, CNAS и CNAM должны быть точными и привязанными к нужному источнику финансирования.",
            solution:
              "Мы ведём расчёт зарплаты сотрудников и волонтёров — платёжные ведомости, договоры, расчёт и отчётность по CNAS и CNAM — и корректно распределяем расходы на персонал по финансирующим их грантам, чтобы они точно отражались в отчётах донорам.",
            service: "hr",
          },
          {
            title: "Доступ к механизму 2% и к новым финансированиям",
            problem:
              "Вы слышите о процентном назначении 2% и о новых грантовых линиях, но не знаете, соответствует ли организация условиям и какие документы нужны.",
            solution:
              "Мы проверяем, соответствуете ли вы условиям для Списка получателей процентного назначения (общественная полезность, не менее года деятельности, отсутствие долгов перед бюджетом), и готовим досье. Консультируем также по финансовой части критериев при подаче заявок новым донорам.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для НКО?",
            a: "Зависит от числа грантов, объёма операций, количества сотрудников и волонтёров в штате и от того, сколько отчётов требуют доноры. НКО с одним грантом и без персонала стоит намного меньше, чем организация с несколькими проектами и ежемесячным расчётом зарплаты. Мы даём чёткое предложение после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как перейти от нынешнего бухгалтера к вам?",
            a: "Мы принимаем учёт на основе оборотно-сальдовой ведомости и остатков по источникам финансирования, сверяемся с отчётами, уже поданными донорам и Налоговой службе, и продолжаем с того места, где остановились. Запрашиваем нужные доступы и документы, проверяем открытые целевые фонды — и вы не теряете ни одного дня отчётности.",
          },
          {
            q: "Делаете ли вы аудит, который требуют доноры?",
            a: "Мы не проводим аудит — его выполняет независимая аудиторская фирма, как часто требуют доноры. Мы же ведём учёт в состоянии, готовом к аудиту, и сотрудничаем с вашим внешним аудитором: предоставляем регистры, подтверждающие документы и отчёты по грантам, чтобы проверка прошла быстро и без сюрпризов.",
          },
          {
            q: "Как нам передавать вам документы?",
            a: "Вы присылаете отсканированные счета, договоры и выписки, а мы ведём учёт, рассчитываем зарплату и готовим отчёты. Вы получаете цифры вовремя, без хлопот с бумагами.",
          },
          {
            q: "Что если донор запросит срочный отчёт?",
            a: "Поскольку мы ведём учёт по каждому источнику финансирования параллельно, остатки и расходы по проекту всегда актуальны. При неожиданном запросе мы формируем отчёт по нужному гранту в требуемом формате, не пересобирая цифры с нуля.",
          },
          {
            q: "Нужно ли подавать государству годовой отчёт о деятельности?",
            a: "Да. Закон № 86/2020 обязывает некоммерческие организации представлять годовой отчёт о деятельности, а его непредставление после повторных запросов Министерства юстиции может привести к принудительной ликвидации. Мы готовим этот отчёт вместе с финансовой отчётностью и подаём его в срок.",
          },
        ],
      },
      en: {
        intro:
          "**You write reports for funders, not accounting journals.** We keep the books by funding source, separate restricted funds and present the figures exactly as each donor requires. You focus on the mission; we handle compliance with Law 86/2020 and the Tax Service.",
        overview:
          "An NGO in Moldova is not run like a company. Special-purpose funds — grants, conditional donations, financial or technical assistance — are recorded separately and reported in Annex 3 to the financial statements, „Changes in funding sources”. Statutory activity is exempt from income tax as long as funds are used per the bylaws and not distributed to founders; any auxiliary economic activity is taxed like an ordinary entity, so it must be tracked separately. On top of this come the obligations under Law no. 86/2020 on non-commercial organizations — the founding act, the annual activity report submitted to the Ministry of Justice, transparency and, optionally, public-utility status, which opens access to the percentage-designation mechanism (2%). We cover all of these: grant accounting, payroll, legal documents and advisory.",
        challenges: [
          {
            title: "Money from several grants mixed in one account",
            problem:
              "You have three funders, each with its own budget and lines, but everything lands in one account and you no longer know how much is left on each project.",
            solution:
              "We keep the books by funding source, separately for each grant and each budget line, through the special-purpose fund accounts. At any moment you see the available balance per project and the eligible expenses, without mixing one donor's money with another's.",
            service: "accounting",
          },
          {
            title: "The financial report does not match what the donor asks for",
            problem:
              "Each funder wants a different format, a different frequency and different expense categories, and you rebuild the figures by hand before every deadline.",
            solution:
              "We prepare donor financial reporting in the format set out in the grant agreement — quarterly, semi-annually or at project end — with expenses mapped to the agreed budget lines. Supporting documents are tied to each amount so the funder can verify without further questions.",
            service: "accounting",
          },
          {
            title: "Economic activity threatens your tax exemption",
            problem:
              "You have started offering paid services or selling something for sustainability and are unsure where exempt statutory activity ends and taxable activity begins.",
            solution:
              "We separate non-commercial activity from auxiliary economic activity in the books and correctly calculate tax only on the taxable part, preserving the exemption for statutory activity. That keeps you within the Tax Code conditions and protects your exempt-organization status.",
            service: "accounting",
          },
          {
            title: "Bylaws, registration and the annual report to the Ministry of Justice",
            problem:
              "You need to amend the founding act, register changes to governing bodies or file the annual activity report, and you have no time to track the deadlines.",
            solution:
              "We prepare the registration and compliance documents under Law no. 86/2020 — bylaws, amendments, the annual activity report — and file them on time. If you wish, we also guide you through obtaining public-utility status.",
            service: "legal",
          },
          {
            title: "Payroll for staff and volunteers",
            problem:
              "You have staff on contract, project collaborators and volunteers, each with their own situation, and payroll, CNAS and CNAM must be correct and charged to the right funding source.",
            solution:
              "We run payroll for staff and volunteers — pay sheets, contracts, calculation and reporting of CNAS and CNAM — and correctly allocate personnel costs to the grants that fund them, so they show up accurately in donor reports.",
            service: "hr",
          },
          {
            title: "Access to the 2% mechanism and to new funding",
            problem:
              "You hear about the 2% percentage designation and new grant lines, but you do not know whether your organization meets the conditions or what documents you need.",
            solution:
              "We check whether you meet the conditions for the List of percentage-designation beneficiaries (public utility, at least one year of activity, no debts to the budget) and prepare the file. We also advise on the financial eligibility side when applying to new funders.",
            service: "consulting",
          },
        ],
        faq: [
          {
            q: "How much does accounting for an NGO cost?",
            a: "It depends on the number of grants, the volume of transactions, how many staff and volunteers are on payroll and how many reports your funders require. An NGO with a single grant and no staff costs far less than one with several projects and monthly payroll. We give you a clear quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books based on the trial balance and the balances by funding source, reconcile with the reports already filed to donors and the Tax Service, and continue from where things stand. We request the necessary access and documents, check the open restricted funds, and you lose no reporting day.",
          },
          {
            q: "Do you perform the audit that funders require?",
            a: "We do not perform audits — that is done by an independent audit firm, as donors often require. What we do is keep the books in an audit-ready state and cooperate with your external auditor: we provide the ledgers, supporting documents and grant reports so the review runs quickly and without surprises.",
          },
          {
            q: "How do we send you the documents?",
            a: "You send us scanned invoices, contracts and statements, and we keep the books, calculate salaries and prepare the reports. You get the figures on time, with no paperwork hassle.",
          },
          {
            q: "What happens if a funder asks for an urgent report?",
            a: "Because we keep the books by each funding source in parallel, project balances and expenses are always current. When an unexpected request comes in, we pull the report for that grant in the required format without rebuilding the figures from scratch.",
          },
          {
            q: "Do we have to file an annual activity report with the state?",
            a: "Yes. Law no. 86/2020 requires non-commercial organizations to submit an annual activity report, and failure to do so after repeated requests from the Ministry of Justice can lead to forced liquidation. We prepare this report together with the financial statements and file it on time.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "**Faci transport de mărfuri sau logistică și fiecare cursă lasă în urmă teancuri de CMR-uri, bonuri de motorină și decont de diurnă.** Noi ținem evidența pe vehicul și pe cursă, din documentele pe care ni le trimiți, și aplicăm corect regimul de TVA la transportul internațional. Tu te ocupi de curse și de clienți, contabilitatea rămâne pusă la punct.",
        overview:
          "Lucrăm cu firme de transport rutier și operatori de logistică din Moldova: companii cu unul sau cu zeci de camioane, care fac curse interne și internaționale. Înțelegem documentele tale de zi cu zi — CMR-ul (scrisoarea de trăsură, la care Moldova a aderat încă din 1993 și care se întocmește în mai multe exemplare originale), comenzile de transport, bonurile de combustibil și ordinele de deplasare pentru șoferi. Pe baza lor ținem evidența contabilă pe fiecare vehicul și cursă, gestionăm parcul auto ca mijloace fixe, calculăm salariile și diurnele șoferilor și depunem rapoartele fiscale la termen. Transportul internațional de mărfuri se încadrează la livrări scutite de TVA cu drept de deducere (art. 104 din Codul fiscal) — adică TVA 0% la cursa externă, dar cu păstrarea dreptului de a deduce TVA de la combustibil, piese și servicii.",
        challenges: [
          {
            title: "TVA la transportul internațional",
            problem:
              "Nu ești sigur cum se tratează TVA la cursele externe față de cele interne și te temi că aplici greșit cota — fie plătești în plus, fie rămâi cu deduceri pe care nu le iei.",
            solution:
              "Aplicăm corect TVA la transportul internațional de mărfuri: regimul de livrare scutită cu drept de deducere, adică 0% pe cursa externă cu păstrarea dreptului de deducere a TVA de la combustibil și cheltuieli. Reflectăm corect aceste livrări în declarația de TVA și separăm cursele interne de cele internaționale, ca să ai un decont fără surprize la control.",
            service: "accounting",
          },
          {
            title: "Evidența pe vehicul și pe cursă",
            problem:
              "La sfârșit de lună ai un morman de CMR-uri, comenzi și bonuri și nu știi exact ce a costat fiecare camion sau fiecare cursă — totul se amestecă într-o singură grămadă.",
            solution:
              "Ținem evidența contabilă pe fiecare vehicul și pe fiecare cursă, pornind de la documentele pe care ni le trimiți. Înregistrăm combustibilul, înmatriculăm parcul auto ca mijloace fixe și calculăm amortizarea, ca să vezi clar costurile pe unitate și să ai baza pentru deciziile de preț.",
            service: "accounting",
          },
          {
            title: "Salarii și diurne pentru șoferi",
            problem:
              "Șoferii sunt zile întregi pe traseu, iar calculul diurnelor, al salariilor și al contribuțiilor CNAS și CNAM îți ia timp și te lasă cu îndoieli că ai aplicat normele corect.",
            solution:
              "Calculăm salariile și diurnele șoferilor, întocmim statele de plată și ținem cont de regulile de delegare actualizate din 2024 (zilele de plecare și sosire la normă întreagă, cu posibilitatea unei diurne reduse pentru firmele private). Calculăm și reținem contribuțiile CNAS și CNAM și depunem dările de seamă la termen.",
            service: "hr",
          },
          {
            title: "Contracte de transport și CMR",
            problem:
              "Lucrezi cu clienți și case de expediție noi, dar contractele și termenii de plată sunt vagi, iar la o marfă deteriorată sau o plată întârziată nu ai pe ce te baza.",
            solution:
              "Redactăm și verificăm contractele de transport și de expediție, condițiile cu clienții și aliniem documentele la regimul CMR. Stabilim clar răspunderea, termenele de plată și penalitățile, ca să fii acoperit când apare un litigiu.",
            service: "legal",
          },
          {
            title: "Costul pe kilometru și pe cursă",
            problem:
              "Dai prețuri din intuiție și nu știi sigur dacă o cursă a fost pe profit sau pe pierdere după ce aduni motorina, salariul șoferului, taxa de drum și uzura camionului.",
            solution:
              "Analizăm costul pe kilometru și pe cursă, pornind de la cifrele tale reale — combustibil, salarii și diurne, amortizarea parcului, taxe. Îți arătăm pragul de la care o cursă devine rentabilă, ca să negociezi tarife cu acoperire, nu din burtă.",
            service: "consulting",
          },
          {
            title: "Combustibil și deduceri",
            problem:
              "Cumperi motorină cu bonuri din mai multe surse și nu ești sigur că deduci corect TVA și că închizi consumul pe fiecare mașină fără să rămână cheltuieli neacceptate.",
            solution:
              "Înregistrăm achizițiile de combustibil pe baza documentelor, le legăm de vehiculul și cursa potrivită și deducem TVA-ul aferent acolo unde ai dreptul. Urmărim ca accizele incluse în preț și consumul să fie reflectate corect, fără cheltuieli care să-ți fie respinse la control.",
            service: "accounting",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o firmă de transport?",
            a: "Depinde de numărul de camioane, de volumul de curse și de cât de des faci transport internațional. O firmă cu câteva mașini și curse externe regulate are mai multe documente de procesat decât una cu un singur camion pe intern. Îți dăm un preț fix lunar după o consultație gratuită, în care ne uităm la documentele tale reale. Fără costuri ascunse și fără surprize la final de lună.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual: cerem balanța, registrele și rapoartele depuse, verificăm soldurile pe vehicule, mijloace fixe și TVA și continuăm de unde s-a rămas. Ne ocupăm de transfer noi, în comunicare directă cu el. Tu nu pierzi nicio zi de lucru și niciun termen de raportare.",
          },
          {
            q: "Cum vă trimit documentele de pe traseu?",
            a: "Ne trimiți documentele — CMR-uri, comenzi, bonuri de combustibil, ordine de deplasare — scanate sau fotografiate, când îți este comod. Noi le procesăm, ținem evidența pe vehicul și pe cursă și revenim cu ce mai lipsește.",
          },
          {
            q: "Cum aplicați TVA la cursele internaționale față de cele interne?",
            a: "Transportul internațional de mărfuri se încadrează la livrări scutite de TVA cu drept de deducere conform Codului fiscal — practic, 0% pe cursa externă, dar îți păstrezi dreptul de a deduce TVA de la combustibil, piese și servicii. Separăm cursele interne de cele internaționale și le reflectăm corect în declarația de TVA, ca să nu plătești în plus și să nu pierzi deduceri.",
          },
          {
            q: "Calculați și diurnele șoferilor, nu doar salariile?",
            a: "Da. Întocmim statele de plată, calculăm salariile și diurnele pentru deplasări, ținem cont de regulile de delegare în vigoare și calculăm contribuțiile CNAS și CNAM. Depunem dările de seamă salariale la termen, ca să ai partea de personal în ordine.",
          },
          {
            q: "Mă ajutați și cu contractele cu clienții și casele de expediție?",
            a: "Da. Redactăm și verificăm contractele de transport și de expediție, condițiile cu clienții și le aliniem la regimul CMR. Stabilim clar răspunderea pentru marfă, termenele de plată și penalitățile, ca să fii acoperit dacă apare un litigiu.",
          },
        ],
      },
      ru: {
        intro:
          "**Вы занимаетесь грузоперевозками или логистикой, и после каждого рейса остаются стопки CMR, чеков на дизель и расчётов суточных.** Мы ведём учёт по каждой машине и по каждому рейсу на основе документов, которые вы присылаете, и правильно применяем режим НДС для международных перевозок. Вы занимаетесь рейсами и клиентами — бухгалтерия остаётся в порядке.",
        overview:
          "Мы работаем с автотранспортными компаниями и логистическими операторами Молдовы: от одной машины до десятков фур, на внутренних и международных рейсах. Мы понимаем ваши ежедневные документы — CMR (товарно-транспортную накладную, к Конвенции о которой Молдова присоединилась ещё в 1993 году и которая оформляется в нескольких оригиналах), заявки на перевозку, чеки на топливо и командировочные приказы для водителей. На их основе мы ведём бухгалтерский учёт по каждой машине и рейсу, учитываем автопарк как основные средства, рассчитываем зарплаты и суточные водителей и сдаём налоговую отчётность в срок. Международная перевозка грузов относится к поставкам, освобождённым от НДС с правом вычета (ст. 104 Налогового кодекса) — то есть 0% НДС на внешнем рейсе, но с сохранением права на вычет НДС по топливу, запчастям и услугам.",
        challenges: [
          {
            title: "НДС при международных перевозках",
            problem:
              "Вы не уверены, как считается НДС по внешним рейсам в сравнении с внутренними, и опасаетесь применить ставку неверно — либо переплатить, либо не взять причитающиеся вычеты.",
            solution:
              "Мы правильно применяем НДС к международной перевозке грузов: режим поставки, освобождённой от налога с правом вычета, то есть 0% на внешнем рейсе с сохранением права вычета НДС по топливу и расходам. Корректно отражаем эти поставки в декларации по НДС и разделяем внутренние и международные рейсы, чтобы отчёт не преподносил сюрпризов на проверке.",
            service: "accounting",
          },
          {
            title: "Учёт по машине и по рейсу",
            problem:
              "В конце месяца у вас гора CMR, заявок и чеков, и вы не знаете точно, во что обошлась каждая фура или каждый рейс — всё сливается в одну кучу.",
            solution:
              "Мы ведём бухгалтерский учёт по каждой машине и каждому рейсу на основе документов, которые вы присылаете. Учитываем топливо, ставим автопарк на учёт как основные средства и начисляем износ, чтобы вы ясно видели себестоимость на единицу и имели базу для ценовых решений.",
            service: "accounting",
          },
          {
            title: "Зарплаты и суточные водителей",
            problem:
              "Водители целыми днями в рейсе, а расчёт суточных, зарплат и взносов CNAS и CNAM отнимает время и оставляет сомнения, верно ли применены нормы.",
            solution:
              "Мы рассчитываем зарплаты и суточные водителей, составляем расчётные ведомости и учитываем обновлённые с 2024 года правила командирования (дни выезда и возвращения — по полной норме, с возможностью пониженных суточных для частных компаний). Начисляем и удерживаем взносы CNAS и CNAM и сдаём отчёты в срок.",
            service: "hr",
          },
          {
            title: "Договоры перевозки и CMR",
            problem:
              "Вы работаете с новыми клиентами и экспедиторами, но договоры и условия оплаты размыты, и при повреждённом грузе или просрочке оплаты опереться не на что.",
            solution:
              "Мы составляем и проверяем договоры перевозки и экспедирования, условия с клиентами и согласуем документы с режимом CMR. Чётко прописываем ответственность, сроки оплаты и штрафы, чтобы вы были защищены при возникновении спора.",
            service: "legal",
          },
          {
            title: "Себестоимость на километр и рейс",
            problem:
              "Вы называете цены по наитию и не знаете точно, ушёл рейс в прибыль или в убыток, когда сложите дизель, зарплату водителя, дорожный сбор и износ фуры.",
            solution:
              "Мы анализируем себестоимость на километр и на рейс по вашим реальным цифрам — топливо, зарплаты и суточные, износ автопарка, сборы. Показываем порог, с которого рейс становится рентабельным, чтобы вы вели переговоры по тарифам с покрытием, а не наугад.",
            service: "consulting",
          },
          {
            title: "Топливо и вычеты",
            problem:
              "Вы покупаете дизель по чекам из разных источников и не уверены, что правильно берёте вычет НДС и закрываете расход по каждой машине без непринятых затрат.",
            solution:
              "Мы учитываем закупки топлива по документам, привязываем их к нужной машине и рейсу и берём вычет НДС там, где у вас есть на это право. Следим, чтобы включённые в цену акцизы и расход отражались корректно, без затрат, которые отклонят на проверке.",
            service: "accounting",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для транспортной компании?",
            a: "Зависит от количества фур, объёма рейсов и того, как часто вы делаете международные перевозки. У компании с несколькими машинами и регулярными внешними рейсами документов больше, чем у фирмы с одной машиной на внутренних. Мы называем фиксированную месячную цену после бесплатной консультации, на которой смотрим на ваши реальные документы. Без скрытых платежей и без сюрпризов в конце месяца.",
          },
          {
            q: "Как мне перейти от нынешнего бухгалтера к вам?",
            a: "Мы принимаем учёт у текущего бухгалтера: запрашиваем оборотную ведомость, регистры и сданные отчёты, сверяем остатки по машинам, основным средствам и НДС и продолжаем с того места, где остановились. Передачу берём на себя, общаясь напрямую с ним. Вы не теряете ни одного рабочего дня и ни одного срока отчётности.",
          },
          {
            q: "Как мне передавать вам документы из рейса?",
            a: "Вы присылаете нам документы — CMR, заявки, чеки на топливо, командировочные приказы — в сканах или на фото, когда вам удобно. Мы их обрабатываем, ведём учёт по машине и по рейсу и возвращаемся к вам с тем, чего не хватает.",
          },
          {
            q: "Как вы применяете НДС к международным рейсам в сравнении с внутренними?",
            a: "Международная перевозка грузов относится к поставкам, освобождённым от НДС с правом вычета по Налоговому кодексу — практически 0% на внешнем рейсе, но с сохранением права на вычет НДС по топливу, запчастям и услугам. Мы разделяем внутренние и международные рейсы и корректно отражаем их в декларации по НДС, чтобы вы не переплачивали и не теряли вычеты.",
          },
          {
            q: "Вы считаете и суточные водителей, а не только зарплаты?",
            a: "Да. Мы составляем расчётные ведомости, рассчитываем зарплаты и суточные за командировки, учитываем действующие правила командирования и начисляем взносы CNAS и CNAM. Сдаём зарплатную отчётность в срок, чтобы кадровая часть была в порядке.",
          },
          {
            q: "Помогаете ли вы с договорами с клиентами и экспедиторами?",
            a: "Да. Мы составляем и проверяем договоры перевозки и экспедирования, условия с клиентами и согласуем их с режимом CMR. Чётко прописываем ответственность за груз, сроки оплаты и штрафы, чтобы вы были защищены при возникновении спора.",
          },
        ],
      },
      en: {
        intro:
          "**You run a freight or logistics company, and every trip leaves behind stacks of CMR notes, fuel receipts and per-diem calculations.** We keep the books per vehicle and per trip from the documents you send us, and apply the right VAT treatment to international transport. You handle the routes and the clients; the accounting stays in order.",
        overview:
          "We work with road transport firms and logistics operators in Moldova: from a single truck to fleets of dozens, on domestic and international routes. We understand your day-to-day paperwork — the CMR consignment note (Moldova acceded to the CMR Convention back in 1993, and it is drawn up in several originals), transport orders, fuel receipts and drivers' travel orders. From these we keep the books per vehicle and per trip, record the fleet as fixed assets, calculate drivers' wages and per-diems, and file tax reports on time. International goods transport falls under supplies exempt from VAT with the right of deduction (Art. 104 of the Tax Code) — meaning 0% VAT on the international leg, while you keep the right to deduct VAT on fuel, parts and services.",
        challenges: [
          {
            title: "VAT on international transport",
            problem:
              "You are not sure how VAT works on international routes versus domestic ones, and you worry you are applying the rate wrong — either overpaying or missing deductions you should be taking.",
            solution:
              "We apply VAT correctly to international goods transport: the exempt-with-right-of-deduction regime, meaning 0% on the international leg while keeping the right to deduct VAT on fuel and costs. We report these supplies correctly in the VAT return and separate domestic from international trips, so your filing holds no surprises at an inspection.",
            service: "accounting",
          },
          {
            title: "Per-vehicle and per-trip bookkeeping",
            problem:
              "At month-end you have a pile of CMR notes, orders and receipts, and you do not know exactly what each truck or each trip cost — it all blends into one heap.",
            solution:
              "We keep the books per vehicle and per trip, starting from the documents you send us. We record fuel, register the fleet as fixed assets and calculate depreciation, so you see unit costs clearly and have a basis for pricing decisions.",
            service: "accounting",
          },
          {
            title: "Drivers' wages and per-diems",
            problem:
              "Drivers are on the road for days, and calculating per-diems, wages and CNAS and CNAM contributions eats your time and leaves you unsure the norms were applied correctly.",
            solution:
              "We calculate drivers' wages and per-diems, prepare payroll statements, and apply the travel rules updated in 2024 (departure and return days at the full norm, with the option of a reduced per-diem for private companies). We calculate and withhold CNAS and CNAM contributions and file the reports on time.",
            service: "hr",
          },
          {
            title: "Transport contracts and CMR",
            problem:
              "You work with new clients and forwarders, but the contracts and payment terms are vague, and when cargo is damaged or a payment is late you have nothing to fall back on.",
            solution:
              "We draft and review transport and forwarding contracts, client terms, and align the documents with the CMR regime. We set out liability, payment terms and penalties clearly, so you are covered when a dispute arises.",
            service: "legal",
          },
          {
            title: "Cost per kilometre and per trip",
            problem:
              "You quote prices on instinct and cannot be sure whether a trip ran at a profit or a loss once you add up diesel, the driver's wage, the road tax and truck wear.",
            solution:
              "We analyse cost per kilometre and per trip from your real figures — fuel, wages and per-diems, fleet depreciation, taxes. We show you the point at which a trip becomes profitable, so you negotiate rates with a margin rather than guessing.",
            service: "consulting",
          },
          {
            title: "Fuel and deductions",
            problem:
              "You buy diesel on receipts from several sources and are not sure you deduct VAT correctly and close out consumption per vehicle without disallowed costs.",
            solution:
              "We record fuel purchases from the documents, link them to the right vehicle and trip, and deduct the related VAT where you are entitled to. We make sure the excise built into the price and the consumption are reflected correctly, with no costs that get rejected at an inspection.",
            service: "accounting",
          },
        ],
        faq: [
          {
            q: "How much does accounting cost for a transport company?",
            a: "It depends on the number of trucks, the volume of trips and how often you run international transport. A firm with several trucks and regular international routes has more documents to process than one with a single truck running domestic. We give you a fixed monthly price after a free consultation, where we look at your actual documents. No hidden costs and no surprises at month-end.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant: we request the trial balance, the registers and the filed reports, check the balances on vehicles, fixed assets and VAT, and carry on from where things were left. We handle the handover ourselves, in direct contact with them. You lose no working day and no reporting deadline.",
          },
          {
            q: "How do I send you the documents from the road?",
            a: "You send us the documents — CMR notes, orders, fuel receipts, travel orders — scanned or photographed, whenever it suits you. We process them, keep the books per vehicle and per trip, and come back to you for anything missing.",
          },
          {
            q: "How do you apply VAT to international trips versus domestic ones?",
            a: "International goods transport falls under supplies exempt from VAT with the right of deduction under the Tax Code — in practice 0% on the international leg, while you keep the right to deduct VAT on fuel, parts and services. We separate domestic from international trips and report them correctly in the VAT return, so you neither overpay nor lose deductions.",
          },
          {
            q: "Do you also calculate drivers' per-diems, not just wages?",
            a: "Yes. We prepare the payroll statements, calculate wages and travel per-diems, apply the travel rules in force, and calculate CNAS and CNAM contributions. We file the payroll reports on time, so your staffing side stays in order.",
          },
          {
            q: "Can you help with contracts with clients and forwarders too?",
            a: "Yes. We draft and review transport and forwarding contracts, client terms, and align them with the CMR regime. We set out cargo liability, payment terms and penalties clearly, so you are covered if a dispute arises.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "**Lucrezi cu CNAM, cu scutirea de TVA la serviciile medicale și cu evidența stocurilor de medicamente — fiecare cu regulile lui.** O clinică greșit încadrată ajunge să plătească TVA pe servicii scutite; o farmacie care încurcă cota de 8% la medicamente cu cea de 20% trezește controale. Ținem evidența ta corect, pe baza documentelor pe care ni le transmiți, ca să te ocupi de pacienți, nu de declarații.",
        overview:
          "În Moldova, serviciile medicale sunt scutite de TVA fără drept de deducere conform art. 103 alin. (1) pct. 10) din Codul fiscal, însă scutirea nu acoperă serviciile cosmetice — acestea se impozitează la cota standard, ceea ce face ca o clinică cu activitate mixtă să țină evidență separată. Farmaciile lucrează după o altă logică: medicamentele înscrise în Registrul de stat al medicamentelor se vând cu cota redusă de 8%, alături de produse impozitate la 20%. Instituțiile contractate cu CNAM își decontează serviciile la tarifele aprobate de Ministerul Sănătății și CNAM. La acestea se adaugă licențierea activității, amortizarea echipamentelor medicale și protecția datelor despre sănătatea pacienților, categorie specială sub Legea nr. 133/2011 (în curs de aliniere la GDPR prin Legea nr. 195/2024). Preluăm partea de evidență, salarizare și documente, pe baza actelor pe care ni le pui la dispoziție.",
        challenges: [
          {
            title: "Scutirea de TVA aplicată greșit la activitate mixtă",
            problem:
              "Faci consultații medicale scutite de TVA, dar și proceduri cosmetice care nu intră sub scutire. Dacă le pui în aceeași evidență, fie plătești TVA pe ce era scutit, fie omiți TVA pe ce era impozabil — și asta se vede la prima verificare.",
            solution:
              "Aplicăm corect scutirea de TVA pentru serviciile medicale conform art. 103 din Codul fiscal și separăm prestările impozabile, cum sunt serviciile cosmetice. Ținem evidența pe categorii, pe baza documentelor tale, ca încadrarea fiecărui serviciu să fie clară și apărabilă.",
            service: "accounting",
          },
          {
            title: "Decontările cu CNAM nu se potrivesc cu evidența",
            problem:
              "Lucrezi în contract cu CNAM, dar sumele decontate nu coincid cu serviciile prestate și înregistrate, iar la închiderea perioadei nu mai știi ce a fost achitat și ce a rămas în așteptare.",
            solution:
              "Reflectăm corect decontările cu CNAM la tarifele aprobate, reconciliem sumele primite cu serviciile raportate și ținem evidența creanțelor, ca să vezi clar ce s-a încasat și ce este în curs. Lucrăm pe baza rapoartelor și documentelor pe care ni le transmiți.",
            service: "accounting",
          },
          {
            title: "Stocul de medicamente și cotele de TVA amestecate",
            problem:
              "În farmacie ai medicamente la cota redusă de 8% și produse la 20%, plus loturi, termene de valabilitate și intrări-ieșiri zilnice. Când cotele se amestecă în evidență, calculul TVA iese greșit și inventarul nu se închide.",
            solution:
              "Ținem evidența stocurilor de medicamente și consumabile pe baza documentelor primare pe care ni le furnizezi, aplicăm corect cota de 8% pentru medicamentele eligibile și 20% pentru restul, și reconciliem intrările cu ieșirile, ca inventarul și TVA să corespundă.",
            service: "accounting",
          },
          {
            title: "Echipamentul medical scump, fără un plan de amortizare clar",
            problem:
              "Ai investit în aparatură — ecograf, unit stomatologic, analizoare — dar nu știi pe ce durată se amortizează și cum se reflectă în cheltuieli, așa că rezultatul fiscal nu arată realitatea.",
            solution:
              "Înregistrăm echipamentele medicale ca mijloace fixe și calculăm amortizarea pe durata corectă de funcționare, atât contabil, cât și fiscal. Astfel cheltuielile tale reflectă uzura reală a aparaturii, iar rezultatul perioadei devine corect.",
            service: "accounting",
          },
          {
            title: "Licențierea și protecția datelor pacienților lăsate la urmă",
            problem:
              "Activitatea medicală și cea farmaceutică cer licență și documente de conformitate, iar datele despre sănătatea pacienților sunt o categorie specială. Fără actele în regulă, riști suspendarea activității sau sancțiuni la un control privind datele.",
            solution:
              "Te asistăm cu documentele de licențiere a activității medicale și farmaceutice și cu protecția datelor pacienților conform Legii nr. 133/2011, aflate în aliniere la GDPR. Pregătim actele și procedurile, ca să fii pregătit pentru un control.",
            service: "legal",
          },
          {
            title: "Salarizarea personalului medical, cu garde și sporuri",
            problem:
              "Ai medici, asistenți, farmaciști — cu contracte, ture, garde și rețineri obligatorii. Un stat de plată calculat greșit înseamnă contribuții CNAS și CNAM raportate eronat și nemulțumiri în echipă.",
            solution:
              "Întocmim statele de plată pentru personalul medical, calculăm corect contribuțiile CNAS și primele CNAM, gestionăm contractele și reținerile, și depunem raportările salariale la termen. Tu ne transmiți pontajul, noi ne ocupăm de restul.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o clinică sau farmacie?",
            a: "Depinde de volumul de documente, de numărul de angajați, de relația cu CNAM și de tipul activității — o clinică cu servicii scutite de TVA se ține altfel decât o farmacie cu stocuri și cote de 8% și 20%. Îți facem o ofertă fixă lunară după o consultație gratuită în care înțelegem situația ta, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de unde a rămas: cerem balanța, registrele, situația stocurilor și decontările cu CNAM, verificăm soldurile și continuăm fără pauză. Coordonăm transferul actelor în locul tău, iar tu nu pierzi nicio zi de activitate.",
          },
          {
            q: "Serviciile clinicii mele sunt scutite de TVA?",
            a: "Serviciile medicale sunt scutite de TVA fără drept de deducere conform art. 103 din Codul fiscal, dar scutirea nu acoperă serviciile cosmetice, care se impozitează la cota standard. Dacă ai activitate mixtă, ținem evidența separat și încadrăm fiecare serviciu corect, pe baza documentelor tale.",
          },
          {
            q: "Cum gestionați stocul de medicamente al farmaciei?",
            a: "Ținem evidența stocurilor pe baza documentelor primare pe care ni le transmiți — facturi de intrare, bonuri, inventare. Aplicăm cota de TVA corectă pentru fiecare categorie (8% la medicamentele eligibile, 20% la restul) și reconciliem intrările cu ieșirile, ca inventarul și declarațiile să corespundă.",
          },
          {
            q: "Ne ajutați cu licențierea și cu protecția datelor pacienților?",
            a: "Da. Pregătim documentele pentru licențierea activității medicale și farmaceutice și te asistăm cu cerințele de protecție a datelor despre sănătate, categorie specială sub Legea nr. 133/2011, aflată în aliniere la GDPR. Lucrăm pe partea de acte și proceduri, nu pe activitatea medicală propriu-zisă.",
          },
          {
            q: "Calculați și salariile personalului medical?",
            a: "Da. Întocmim statele de plată pentru medici, asistenți și farmaciști, calculăm contribuțiile CNAS și primele CNAM, gestionăm contractele și reținerile și depunem raportările la termen. Tu ne transmiți pontajul și orele de gardă, noi ne ocupăm de calcul și de declarații.",
          },
        ],
      },
      ru: {
        intro:
          "**Вы работаете с НКМС, с освобождением медицинских услуг от НДС и с учётом запасов медикаментов — и у каждого свои правила.** Неверно классифицированная клиника начинает платить НДС с услуг, которые от него освобождены; аптека, перепутавшая ставку 8% на лекарства со ставкой 20%, навлекает проверки. Мы ведём ваш учёт правильно, на основе документов, которые вы нам передаёте, чтобы вы занимались пациентами, а не отчётностью.",
        overview:
          "В Молдове медицинские услуги освобождены от НДС без права вычета согласно ст. 103 ч. (1) п. 10) Налогового кодекса, однако освобождение не распространяется на косметические услуги — они облагаются по стандартной ставке, из-за чего клиника со смешанной деятельностью обязана вести раздельный учёт. Аптеки работают по другой логике: лекарства, внесённые в Государственный реестр лекарств, продаются по сниженной ставке 8% наряду с товарами, облагаемыми по 20%. Учреждения, работающие по контракту с НКМС, получают возмещение по тарифам, утверждённым Министерством здравоохранения и НКМС. К этому добавляются лицензирование деятельности, амортизация медицинского оборудования и защита данных о здоровье пациентов — особой категории по Закону № 133/2011 (приводимому в соответствие с GDPR Законом № 195/2024). Мы берём на себя учёт, начисление зарплаты и документы — на основе актов, которые вы нам предоставляете.",
        challenges: [
          {
            title: "Неверно применённое освобождение от НДС при смешанной деятельности",
            problem:
              "Вы оказываете медицинские консультации, освобождённые от НДС, но также косметические процедуры, которые под освобождение не подпадают. Если вести их в одном учёте, вы либо платите НДС с того, что было освобождено, либо упускаете НДС с облагаемого — и это видно при первой же проверке.",
            solution:
              "Правильно применяем освобождение от НДС для медицинских услуг согласно ст. 103 Налогового кодекса и отделяем облагаемые поставки, такие как косметические услуги. Ведём учёт по категориям на основе ваших документов, чтобы классификация каждой услуги была чёткой и обоснованной.",
            service: "accounting",
          },
          {
            title: "Возмещения от НКМС не совпадают с учётом",
            problem:
              "Вы работаете по контракту с НКМС, но возмещённые суммы не совпадают с оказанными и учтёнными услугами, и при закрытии периода вы уже не знаете, что оплачено, а что осталось в ожидании.",
            solution:
              "Корректно отражаем возмещения от НКМС по утверждённым тарифам, сверяем полученные суммы с заявленными услугами и ведём учёт дебиторской задолженности, чтобы вы ясно видели, что поступило, а что в процессе. Работаем на основе отчётов и документов, которые вы нам передаёте.",
            service: "accounting",
          },
          {
            title: "Запас медикаментов и ставки НДС перемешаны",
            problem:
              "В аптеке у вас лекарства по сниженной ставке 8% и товары по 20%, плюс партии, сроки годности и ежедневные приходы-расходы. Когда ставки смешиваются в учёте, расчёт НДС выходит неверным, а инвентаризация не закрывается.",
            solution:
              "Ведём учёт запасов медикаментов и расходных материалов на основе первичных документов, которые вы предоставляете, применяем ставку 8% для подходящих лекарств и 20% для остального, сверяем приходы с расходами, чтобы инвентаризация и НДС сходились.",
            service: "accounting",
          },
          {
            title: "Дорогое медицинское оборудование без чёткого плана амортизации",
            problem:
              "Вы вложились в аппаратуру — УЗИ, стоматологическую установку, анализаторы — но не знаете, на какой срок начисляется амортизация и как это отражается в расходах, поэтому налоговый результат не отражает реальность.",
            solution:
              "Учитываем медицинское оборудование как основные средства и рассчитываем амортизацию на корректный срок эксплуатации — как бухгалтерскую, так и налоговую. Так ваши расходы отражают реальный износ аппаратуры, а результат периода становится корректным.",
            service: "accounting",
          },
          {
            title: "Лицензирование и защита данных пациентов отложены на потом",
            problem:
              "Медицинская и фармацевтическая деятельность требуют лицензии и документов о соответствии, а данные о здоровье пациентов — особая категория. Без документов в порядке вы рискуете приостановкой деятельности или санкциями при проверке по данным.",
            solution:
              "Помогаем с документами для лицензирования медицинской и фармацевтической деятельности и с защитой данных пациентов согласно Закону № 133/2011, приводимому в соответствие с GDPR. Готовим акты и процедуры, чтобы вы были готовы к проверке.",
            service: "legal",
          },
          {
            title: "Начисление зарплаты медперсоналу с дежурствами и надбавками",
            problem:
              "У вас врачи, медсёстры, фармацевты — с контрактами, сменами, дежурствами и обязательными удержаниями. Неверно рассчитанная ведомость означает ошибочно заявленные взносы CNAS и CNAM и недовольство в коллективе.",
            solution:
              "Составляем платёжные ведомости для медперсонала, правильно рассчитываем взносы CNAS и взносы CNAM, ведём контракты и удержания и сдаём зарплатную отчётность в срок. Вы передаёте нам табель, мы занимаемся остальным.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для клиники или аптеки?",
            a: "Зависит от объёма документов, числа сотрудников, отношений с НКМС и вида деятельности — клиника с услугами, освобождёнными от НДС, ведётся иначе, чем аптека с запасами и ставками 8% и 20%. Мы предложим фиксированную месячную цену после бесплатной консультации, на которой разберёмся в вашей ситуации, без скрытых платежей.",
          },
          {
            q: "Как мне перейти от нынешнего бухгалтера к вам?",
            a: "Принимаем учёт с того места, где он остановился: запрашиваем баланс, регистры, состояние запасов и возмещения от НКМС, проверяем сальдо и продолжаем без паузы. Координируем передачу документов вместо вас, и вы не теряете ни одного рабочего дня.",
          },
          {
            q: "Освобождены ли услуги моей клиники от НДС?",
            a: "Медицинские услуги освобождены от НДС без права вычета согласно ст. 103 Налогового кодекса, но освобождение не распространяется на косметические услуги, которые облагаются по стандартной ставке. Если у вас смешанная деятельность, мы ведём раздельный учёт и правильно классифицируем каждую услугу на основе ваших документов.",
          },
          {
            q: "Как вы ведёте запас медикаментов аптеки?",
            a: "Ведём учёт запасов на основе первичных документов, которые вы передаёте — приходных накладных, чеков, инвентаризаций. Применяем правильную ставку НДС для каждой категории (8% для подходящих лекарств, 20% для остального) и сверяем приходы с расходами, чтобы инвентаризация и декларации сходились.",
          },
          {
            q: "Помогаете ли вы с лицензированием и защитой данных пациентов?",
            a: "Да. Готовим документы для лицензирования медицинской и фармацевтической деятельности и помогаем с требованиями по защите данных о здоровье — особой категории по Закону № 133/2011, приводимому в соответствие с GDPR. Работаем по части документов и процедур, а не по самой медицинской деятельности.",
          },
          {
            q: "Рассчитываете ли вы и зарплаты медперсонала?",
            a: "Да. Составляем платёжные ведомости для врачей, медсестёр и фармацевтов, рассчитываем взносы CNAS и взносы CNAM, ведём контракты и удержания и сдаём отчётность в срок. Вы передаёте нам табель и часы дежурств, мы занимаемся расчётом и декларациями.",
          },
        ],
      },
      en: {
        intro:
          "**You deal with CNAM, the VAT exemption on medical services, and medicine stock records — each with its own rules.** A clinic classified incorrectly ends up paying VAT on services that are exempt; a pharmacy that mixes up the 8% rate on medicines with the 20% rate invites inspections. We keep your records right, based on the documents you send us, so you can focus on patients, not filings.",
        overview:
          "In Moldova, medical services are exempt from VAT without the right to deduct under art. 103 para. (1) point 10) of the Tax Code, but the exemption does not cover cosmetic services — these are taxed at the standard rate, which means a clinic with mixed activity has to keep separate records. Pharmacies work on a different logic: medicines listed in the State Register of Medicines are sold at the reduced 8% rate alongside goods taxed at 20%. Institutions under contract with CNAM are reimbursed at the tariffs approved by the Ministry of Health and CNAM. Added to this are activity licensing, depreciation of medical equipment, and protection of patient health data — a special category under Law No. 133/2011 (being aligned with GDPR through Law No. 195/2024). We take over the bookkeeping, payroll and documents, based on the records you make available to us.",
        challenges: [
          {
            title: "VAT exemption applied wrongly on mixed activity",
            problem:
              "You provide medical consultations that are VAT-exempt, but also cosmetic procedures that fall outside the exemption. If you keep them in the same records, you either pay VAT on what was exempt or miss VAT on what was taxable — and that shows up at the first check.",
            solution:
              "We apply the VAT exemption for medical services correctly under art. 103 of the Tax Code and separate taxable supplies, such as cosmetic services. We keep records by category, based on your documents, so the classification of each service is clear and defensible.",
            service: "accounting",
          },
          {
            title: "CNAM reimbursements don't match the records",
            problem:
              "You work under contract with CNAM, but the reimbursed amounts don't match the services provided and recorded, and when the period closes you no longer know what has been paid and what is still pending.",
            solution:
              "We record CNAM reimbursements correctly at the approved tariffs, reconcile the amounts received with the services reported, and keep track of receivables, so you clearly see what has been collected and what is in progress. We work from the reports and documents you send us.",
            service: "accounting",
          },
          {
            title: "Medicine stock and VAT rates mixed together",
            problem:
              "In the pharmacy you have medicines at the reduced 8% rate and goods at 20%, plus batches, expiry dates and daily ins and outs. When the rates get mixed in the records, the VAT calculation comes out wrong and the inventory won't close.",
            solution:
              "We keep records of medicine and consumable stock based on the primary documents you provide, apply the 8% rate to eligible medicines and 20% to the rest, and reconcile inflows with outflows, so the inventory and VAT match.",
            service: "accounting",
          },
          {
            title: "Expensive medical equipment with no clear depreciation plan",
            problem:
              "You invested in equipment — ultrasound, dental unit, analyzers — but you don't know over what period it depreciates or how it shows up in expenses, so the tax result doesn't reflect reality.",
            solution:
              "We record medical equipment as fixed assets and calculate depreciation over the correct useful life, both for accounting and for tax. That way your expenses reflect the real wear on the equipment, and the period's result becomes accurate.",
            service: "accounting",
          },
          {
            title: "Licensing and patient data protection left for last",
            problem:
              "Medical and pharmaceutical activity require a license and compliance documents, and patient health data is a special category. Without the paperwork in order, you risk having your activity suspended or facing sanctions in a data inspection.",
            solution:
              "We assist you with the documents for licensing medical and pharmaceutical activity and with patient data protection under Law No. 133/2011, being aligned with GDPR. We prepare the records and procedures so you're ready for an inspection.",
            service: "legal",
          },
          {
            title: "Payroll for medical staff, with on-call duty and bonuses",
            problem:
              "You have doctors, nurses, pharmacists — with contracts, shifts, on-call duty and mandatory withholdings. A payroll calculated wrongly means CNAS and CNAM contributions reported incorrectly and discontent in the team.",
            solution:
              "We prepare payroll for medical staff, correctly calculate CNAS contributions and CNAM premiums, manage contracts and withholdings, and file payroll reporting on time. You send us the timesheet, we handle the rest.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "How much does accounting cost for a clinic or pharmacy?",
            a: "It depends on the volume of documents, the number of employees, the relationship with CNAM and the type of activity — a clinic with VAT-exempt services is kept differently from a pharmacy with stock and 8% and 20% rates. We give you a fixed monthly quote after a free consultation where we understand your situation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the records where they left off: we request the trial balance, the ledgers, the stock position and the CNAM reimbursements, check the balances and continue without a pause. We coordinate the handover of documents on your behalf, and you don't lose a single day of activity.",
          },
          {
            q: "Are my clinic's services exempt from VAT?",
            a: "Medical services are exempt from VAT without the right to deduct under art. 103 of the Tax Code, but the exemption does not cover cosmetic services, which are taxed at the standard rate. If you have mixed activity, we keep separate records and classify each service correctly, based on your documents.",
          },
          {
            q: "How do you manage the pharmacy's medicine stock?",
            a: "We keep stock records based on the primary documents you send us — incoming invoices, receipts, inventories. We apply the correct VAT rate for each category (8% on eligible medicines, 20% on the rest) and reconcile inflows with outflows, so the inventory and the returns match.",
          },
          {
            q: "Do you help with licensing and patient data protection?",
            a: "Yes. We prepare the documents for licensing medical and pharmaceutical activity and assist you with the requirements for protecting health data, a special category under Law No. 133/2011, being aligned with GDPR. We work on the paperwork and procedures, not on the medical activity itself.",
          },
          {
            q: "Do you also calculate medical staff salaries?",
            a: "Yes. We prepare payroll for doctors, nurses and pharmacists, calculate CNAS contributions and CNAM premiums, manage contracts and withholdings, and file reporting on time. You send us the timesheet and on-call hours, we handle the calculation and the returns.",
          },
        ],
      },
    },
  },
  {
    id: "agricultura",
    slug: "agricultura",
    title: { ro: "Agricultură", ru: "Сельское хозяйство", en: "Agriculture" },
    description: {
      ro: "Agricultura are reguli fiscale aparte: subvenții AIPA, regimul TVA aplicabil activității agricole, impozit pe teren, muncă sezonieră și active biologice. Ținem evidența pe culturi sau animale, gestionăm corect subvențiile și raportarea lor, calculăm TVA în regimul aplicabil și urmărim cheltuielile sezoniere cu forța de muncă. Adăugăm evidența mijloacelor fixe, a tehnicii agricole și a stocurilor de producție. Fie că lucrezi terenuri, crești animale sau procesezi produse agricole, primești cifre clare despre costul pe hectar și pe cultură și ești sigur că nu pierzi nicio subvenție — cu un contabil care înțelege ciclul agricol.",
      ru: "У сельского хозяйства особые налоговые правила: субсидии AIPA, режим НДС, применимый к сельхоздеятельности, земельный налог, сезонный труд и биологические активы. Мы ведём учёт по культурам или животным, корректно ведём субсидии и отчётность по ним, считаем НДС в применимом режиме и отслеживаем сезонные расходы на рабочую силу. Добавляем учёт основных средств, сельхозтехники и запасов продукции. Обработка земли, животноводство или переработка сельхозпродукции — вы получаете ясные цифры о стоимости гектара и культуры и уверенность, что не упустите ни одной субсидии, с бухгалтером, который понимает аграрный цикл.",
      en: "Agriculture has its own tax rules: AIPA subsidies, the VAT regime applicable to agricultural activity, land tax, seasonal labour and biological assets. We keep records by crop or livestock, handle subsidies and their reporting correctly, calculate VAT under the applicable regime and track seasonal labour costs. We add fixed-asset, farm-machinery and produce-stock records. Whether you farm land, raise animals or process agricultural produce, you get clear numbers on cost per hectare and per crop and the assurance you won't miss a single subsidy — with an accountant who understands the agricultural cycle.",
    },
    detail: {
      ro: {
        intro:
          "**Lucrezi pământul, crești animale sau ai o fermă — și ai nevoie ca evidența, subvențiile AIPA și impozitele să fie ținute corect, nu pe genunchi.** Ne ocupăm de contabilitate, salarizarea sezonierilor, regimul TVA și dosarele de subvenții, ca tu să te concentrezi pe câmp și pe recoltă.",
        overview:
          "Activitatea agricolă din Moldova are reguli proprii: cota redusă de TVA de 8% pentru producția vegetală și animalieră în formă naturală (art. 96 din Codul fiscal), pe lângă cota standard de 20% pentru restul livrărilor; impozitul pe teren (impozitul funciar) calculat după bonitatea solului și cotele stabilite de primărie; subvențiile AIPA din Fondul Național de Dezvoltare a Agriculturii și Mediului Rural, care se acordă în mare parte post-investiție și au reguli stricte de eligibilitate și raportare; evidența activelor biologice și a tehnicii agricole; și munca sezonieră, reglementată de Codul muncii. Ținem toată această evidență și raportăm la SFS, CNAS și CNAM la termen.",
        challenges: [
          {
            title: "Subvențiile AIPA — evidență și raportare",
            problem:
              "Ai depus la AIPA sau vrei să depui, dar nu știi cum se înregistrează banii primiți și cum se reflectă în evidență fără să încurci cifrele sau să pierzi dreptul la subvenție.",
            solution:
              "Ținem evidența subvențiilor AIPA și raportarea lor: înregistrăm corect mijloacele primite din Fondul Național de Dezvoltare a Agriculturii și Mediului Rural, le legăm de investiția pentru care au fost acordate și pregătim documentele cerute la verificările ulterioare, ca să nu rămâi descoperit.",
            service: "accounting",
          },
          {
            title: "Regimul TVA pentru activitatea agricolă",
            problem:
              "Vinzi struguri, lapte sau animale și nu ești sigur când se aplică cota de 8% și când cea de 20%, iar greșelile la TVA se plătesc scump la control.",
            solution:
              "Stabilim regimul TVA aplicabil fiecărei livrări — cota redusă de 8% pentru producția vegetală și animalieră în formă naturală și cota standard de 20% pentru rest — ținem registrele de achiziții și livrări și depunem declarația TVA, ca să nu plătești în plus și nici să nu rămâi cu restanțe.",
            service: "accounting",
          },
          {
            title: "Impozitul pe teren și activele biologice",
            problem:
              "Ai zeci de hectare, tehnică și plantații, dar nu ai o evidență clară a impozitului funciar și a valorii animalelor și plantațiilor multianuale.",
            solution:
              "Calculăm impozitul pe teren după bonitatea solului și cotele primăriei, ținem evidența mijloacelor fixe și a tehnicii agricole cu amortizarea lor și înregistrăm activele biologice — animalele și plantațiile — separat, ca bilanțul să arate realitatea fermei.",
            service: "accounting",
          },
          {
            title: "Dosarele de subvenții — eligibilitate și depunere",
            problem:
              "Vrei să accesezi o măsură AIPA, dar nu știi dacă te califici și ce acte îți trebuie, iar un dosar respins înseamnă un sezon pierdut.",
            solution:
              "Te asistăm cu dosarele de subvenții: verificăm eligibilitatea pentru măsura potrivită, întocmim lista de documente, te ajutăm să pregătești cererea și calculele de fundamentare și îți spunem din timp ce condiții trebuie respectate ca să nu fie respins dosarul.",
            service: "consulting",
          },
          {
            title: "Salarizarea muncitorilor sezonieri",
            problem:
              "La recoltare angajezi oameni pentru câteva săptămâni și nu știi cum să faci contractele, statele de plată și plățile la stat fără să rămâi cu probleme la o inspecție.",
            solution:
              "Întocmim contractele de muncă pe durată determinată pentru sezonieri conform Codului muncii, calculăm statele de plată, reținerile și contribuțiile la CNAS și CNAM și depunem dările de seamă, ca oamenii să fie în regulă și tu să fii acoperit la control.",
            service: "hr",
          },
          {
            title: "Contractele de arendă a terenului",
            problem:
              "Lucrezi pe teren luat în arendă de la zeci de proprietari și nu ești sigur că contractele te protejează sau sunt înregistrate corect.",
            solution:
              "Întocmim și verificăm contractele de arendă a terenului agricol, urmărim termenele, clauzele de plată și înregistrarea lor, ca să ai dreptul de folosință clar și să eviți litigiile cu proprietarii de cote.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o fermă sau firmă agricolă?",
            a: "Depinde de mărimea fermei, numărul de hectare și animale, dacă ai sau nu subvenții AIPA și câți sezonieri angajezi. Stabilim un tarif fix lunar după ce înțelegem activitatea ta. Prima consultație este gratuită și fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la contabilul actual: cerem balanțele, registrele și declarațiile depuse, verificăm dacă totul este la zi și continuăm fără pauză. Ne ocupăm noi de toată trecerea, tu nu pierzi nicio zi de activitate.",
          },
          {
            q: "Mă ajutați și cu dosarele de subvenții la AIPA?",
            a: "Da. Verificăm eligibilitatea pentru măsura care ți se potrivește, întocmim lista de acte și calculele de fundamentare și pregătim dosarul. După obținerea subvenției ținem evidența ei și pregătim documentele pentru verificările ulterioare.",
          },
          {
            q: "Ce cotă de TVA se aplică la produsele mele agricole?",
            a: "Pentru producția vegetală și animalieră în formă naturală se aplică cota redusă de 8%, iar pentru celelalte livrări cota standard de 20%. Analizăm fiecare tip de produs pe care îl vinzi și aplicăm cota corectă, ca să eviți penalitățile la control.",
          },
          {
            q: "Cine se ocupă de salarizarea muncitorilor sezonieri?",
            a: "Noi. Întocmim contractele pe durată determinată, calculăm statele de plată și contribuțiile la CNAS și CNAM și depunem dările de seamă la termen, ca oamenii angajați la recoltare să fie în regulă din punct de vedere legal.",
          },
          {
            q: "Cum vă trimit documentele de la fermă?",
            a: "Ne trimiți documentele scanate sau fotografiate, iar noi ținem evidența, depunem declarațiile și îți raportăm rezultatele.",
          },
        ],
      },
      ru: {
        intro:
          "**Вы работаете на земле, держите скот или ведёте хозяйство — и вам нужно, чтобы учёт, субсидии AIPA и налоги велись правильно, а не на коленке.** Берём на себя бухгалтерию, расчёт зарплаты сезонных рабочих, режим НДС и досье на субсидии, чтобы вы занимались полем и урожаем.",
        overview:
          "У сельского хозяйства в Молдове свои правила: пониженная ставка НДС 8% на растениеводческую и животноводческую продукцию в натуральном виде (ст. 96 Налогового кодекса) наряду со стандартной ставкой 20% на остальные поставки; земельный налог, рассчитываемый по бонитету почвы и ставкам, установленным примэрией; субсидии AIPA из Национального фонда развития сельского хозяйства и сельской местности, которые в основном предоставляются после инвестиции и имеют строгие правила приемлемости и отчётности; учёт биологических активов и сельхозтехники; и сезонный труд, регулируемый Трудовым кодексом. Мы ведём весь этот учёт и сдаём отчётность в SFS, CNAS и CNAM в срок.",
        challenges: [
          {
            title: "Субсидии AIPA — учёт и отчётность",
            problem:
              "Вы подали в AIPA или хотите подать, но не знаете, как учитываются полученные деньги и как они отражаются в учёте, не запутав цифры и не потеряв право на субсидию.",
            solution:
              "Ведём учёт субсидий AIPA и отчётность по ним: правильно отражаем средства, полученные из Национального фонда развития сельского хозяйства и сельской местности, привязываем их к инвестиции, под которую они выданы, и готовим документы для последующих проверок, чтобы вы были защищены.",
            service: "accounting",
          },
          {
            title: "Режим НДС для сельхоздеятельности",
            problem:
              "Вы продаёте виноград, молоко или животных и не уверены, когда применяется ставка 8%, а когда 20%, а ошибки по НДС дорого обходятся на проверке.",
            solution:
              "Определяем режим НДС для каждой поставки — пониженную ставку 8% на растениеводческую и животноводческую продукцию в натуральном виде и стандартную ставку 20% на остальное — ведём регистры закупок и поставок и сдаём декларацию по НДС, чтобы вы не переплачивали и не накапливали задолженность.",
            service: "accounting",
          },
          {
            title: "Земельный налог и биологические активы",
            problem:
              "У вас десятки гектаров, техника и насаждения, но нет чёткого учёта земельного налога и стоимости животных и многолетних насаждений.",
            solution:
              "Рассчитываем земельный налог по бонитету почвы и ставкам примэрии, ведём учёт основных средств и сельхозтехники с их амортизацией и отражаем биологические активы — животных и насаждения — отдельно, чтобы баланс показывал реальное состояние хозяйства.",
            service: "accounting",
          },
          {
            title: "Досье на субсидии — приемлемость и подача",
            problem:
              "Вы хотите получить доступ к мере AIPA, но не знаете, проходите ли вы по условиям и какие документы нужны, а отклонённое досье означает потерянный сезон.",
            solution:
              "Помогаем с досье на субсидии: проверяем приемлемость по подходящей мере, составляем список документов, помогаем подготовить заявку и обосновывающие расчёты и заранее говорим, какие условия нужно соблюсти, чтобы досье не отклонили.",
            service: "consulting",
          },
          {
            title: "Расчёт зарплаты сезонных рабочих",
            problem:
              "На уборке урожая вы нанимаете людей на несколько недель и не знаете, как оформить договоры, ведомости и платежи государству, чтобы не иметь проблем на инспекции.",
            solution:
              "Оформляем срочные трудовые договоры для сезонных работников согласно Трудовому кодексу, рассчитываем платёжные ведомости, удержания и взносы в CNAS и CNAM и сдаём отчётность, чтобы люди были оформлены, а вы защищены на проверке.",
            service: "hr",
          },
          {
            title: "Договоры аренды земли",
            problem:
              "Вы работаете на земле, арендованной у десятков собственников, и не уверены, что договоры вас защищают и оформлены правильно.",
            solution:
              "Составляем и проверяем договоры аренды сельхозземли, следим за сроками, условиями оплаты и их регистрацией, чтобы право пользования было чётким и вы избежали споров с владельцами долей.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для фермы или сельхозфирмы?",
            a: "Зависит от размера хозяйства, числа гектаров и животных, наличия субсидий AIPA и количества сезонных рабочих. Устанавливаем фиксированную месячную плату после того, как разберёмся в вашей деятельности. Первая консультация бесплатна и без скрытых платежей.",
          },
          {
            q: "Как мне перейти от нынешнего бухгалтера к вам?",
            a: "Принимаем учёт у нынешнего бухгалтера: запрашиваем балансы, регистры и сданные декларации, проверяем, всё ли в порядке, и продолжаем без перерыва. Весь переход берём на себя, вы не теряете ни одного дня работы.",
          },
          {
            q: "Помогаете ли вы и с досье на субсидии в AIPA?",
            a: "Да. Проверяем приемлемость по подходящей вам мере, составляем список документов и обосновывающие расчёты и готовим досье. После получения субсидии ведём её учёт и готовим документы для последующих проверок.",
          },
          {
            q: "Какая ставка НДС применяется к моей сельхозпродукции?",
            a: "К растениеводческой и животноводческой продукции в натуральном виде применяется пониженная ставка 8%, а к остальным поставкам — стандартная ставка 20%. Анализируем каждый вид продукции, который вы продаёте, и применяем верную ставку, чтобы избежать штрафов на проверке.",
          },
          {
            q: "Кто занимается расчётом зарплаты сезонных рабочих?",
            a: "Мы. Оформляем срочные договоры, рассчитываем ведомости и взносы в CNAS и CNAM и сдаём отчётность в срок, чтобы люди, нанятые на уборку урожая, были оформлены законно.",
          },
          {
            q: "Как мне передавать вам документы с фермы?",
            a: "Вы присылаете документы в сканах или фотографиях, а мы ведём учёт, сдаём декларации и отчитываемся вам о результатах.",
          },
        ],
      },
      en: {
        intro:
          "**You work the land, raise livestock or run a farm — and you need your bookkeeping, AIPA subsidies and taxes handled properly, not on the back of an envelope.** We take care of accounting, seasonal-worker payroll, the VAT regime and subsidy files, so you can focus on the field and the harvest.",
        overview:
          "Farming in Moldova has its own rules: a reduced 8% VAT rate on crop and livestock production in natural form (art. 96 of the Tax Code), alongside the standard 20% rate on other supplies; land tax calculated from soil quality (bonitate) and the rates set by the local council; AIPA subsidies from the National Fund for Agricultural and Rural Development, mostly granted post-investment with strict eligibility and reporting rules; accounting for biological assets and farm machinery; and seasonal labour governed by the Labour Code. We keep all of this on the books and file with SFS, CNAS and CNAM on time.",
        challenges: [
          {
            title: "AIPA subsidies — bookkeeping and reporting",
            problem:
              "You have applied to AIPA or want to, but you do not know how the money received is recorded and how it shows up in the books without scrambling the figures or losing your right to the subsidy.",
            solution:
              "We keep the books on AIPA subsidies and report them: we record the funds received from the National Fund for Agricultural and Rural Development correctly, tie them to the investment they were granted for and prepare the documents needed for later checks, so you are not left exposed.",
            service: "accounting",
          },
          {
            title: "VAT regime for farming activity",
            problem:
              "You sell grapes, milk or animals and you are not sure when the 8% rate applies and when the 20% one does, and VAT mistakes are expensive at an inspection.",
            solution:
              "We set the VAT regime for each supply — the reduced 8% rate on crop and livestock production in natural form and the standard 20% rate on the rest — keep the purchase and supply ledgers and file the VAT return, so you neither overpay nor build up arrears.",
            service: "accounting",
          },
          {
            title: "Land tax and biological assets",
            problem:
              "You have dozens of hectares, machinery and plantations, but no clear record of the land tax or of the value of your animals and perennial plantings.",
            solution:
              "We calculate land tax from soil quality and the local council rates, keep records of fixed assets and farm machinery with their depreciation and book biological assets — animals and plantations — separately, so the balance sheet reflects the real state of the farm.",
            service: "accounting",
          },
          {
            title: "Subsidy files — eligibility and submission",
            problem:
              "You want to access an AIPA measure but do not know whether you qualify or what documents you need, and a rejected file means a lost season.",
            solution:
              "We assist you with subsidy files: we check eligibility for the right measure, draw up the document list, help you prepare the application and the supporting calculations and tell you in advance which conditions must be met so the file is not rejected.",
            service: "consulting",
          },
          {
            title: "Seasonal worker payroll",
            problem:
              "At harvest you hire people for a few weeks and do not know how to handle the contracts, payrolls and state payments without running into trouble at an inspection.",
            solution:
              "We draw up fixed-term employment contracts for seasonal workers under the Labour Code, calculate payrolls, withholdings and CNAS and CNAM contributions and file the returns, so your people are in order and you are covered at an inspection.",
            service: "hr",
          },
          {
            title: "Land lease contracts",
            problem:
              "You work land leased from dozens of owners and are not sure the contracts protect you or are registered properly.",
            solution:
              "We draft and review agricultural land lease contracts, track the terms, payment clauses and their registration, so your right of use is clear and you avoid disputes with the share owners.",
            service: "legal",
          },
        ],
        faq: [
          {
            q: "How much does accounting for a farm or agricultural company cost?",
            a: "It depends on the size of the farm, the number of hectares and animals, whether you have AIPA subsidies and how many seasonal workers you hire. We set a fixed monthly fee once we understand your activity. The first consultation is free and with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the books from your current accountant: we request the trial balances, ledgers and filed returns, check that everything is up to date and carry on without a break. We handle the whole transition, and you do not lose a single working day.",
          },
          {
            q: "Do you also help with subsidy files at AIPA?",
            a: "Yes. We check eligibility for the measure that fits you, draw up the document list and supporting calculations and prepare the file. Once the subsidy is granted, we keep its records and prepare the documents for later checks.",
          },
          {
            q: "What VAT rate applies to my agricultural products?",
            a: "Crop and livestock production in natural form is subject to the reduced 8% rate, while other supplies carry the standard 20% rate. We review each type of product you sell and apply the correct rate, so you avoid penalties at an inspection.",
          },
          {
            q: "Who handles payroll for seasonal workers?",
            a: "We do. We draw up the fixed-term contracts, calculate the payrolls and CNAS and CNAM contributions and file the returns on time, so the people hired for the harvest are properly employed.",
          },
          {
            q: "How do I send you the documents from the farm?",
            a: "You send us the documents scanned or photographed, and we keep the books, file the returns and report the results back to you.",
          },
        ],
      },
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
    detail: {
      ro: {
        intro:
          "Imobiliarele înseamnă **contracte grele și bani care intră în avans, înainte de a recunoaște venitul**. Un apartament vândut la roșu, o chirie facturată trimestrial, un bloc cu zeci de proprietari — fiecare cere o evidență separată, pe proiect și pe imobil. Noi ținem contabilitatea, pregătim contractele și raportăm corect, ca tu să te ocupi de tranzacții, nu de fișe contabile.",
        overview:
          "Lucrăm cu dezvoltatori, agenții imobiliare și administratori de imobile din Moldova. Cunoaștem regimul TVA aplicabil tranzacțiilor: conform art. 103 din Codul fiscal, livrarea de locuințe și terenuri, precum și darea în locațiune a acestora, sunt scutite de TVA fără drept de deducere, în timp ce vânzarea și închirierea de spații comerciale rămân, de regulă, impozabile cu TVA. Tratăm corect veniturile în avans de la cumpărători, recunoaștem venitul la transferul riscurilor și beneficiilor către cumpărător, calculăm amortizarea și gestionăm impozitul pe bunurile imobiliare, ale cărui cote sunt stabilite de autoritățile locale și se modifică odată cu reevaluarea cadastrală. Pregătim și verificăm contractele de vânzare-cumpărare și de arendă/chirie, oferim suport pentru asociațiile de proprietari și consultanță la structurarea fiscală a tranzacțiilor. Nu facem audit, nu intermediem și nu administrăm fizic imobile — ne ocupăm de partea contabilă, juridică și fiscală.",
        challenges: [
          {
            title: "Banii intră înainte să livrezi",
            problem:
              "Încasezi avansuri de la cumpărători pentru apartamente încă neconstruite, dar nu știi când și cum să recunoști venitul. Riști să declari venit prea devreme și să plătești impozit pe bani care nu sunt încă ai tăi.",
            solution:
              "Tratăm corect avansurile ca venituri în avans și recunoaștem venitul abia la transferul riscurilor și beneficiilor către cumpărător, la predarea imobilului. Ținem evidența pe fiecare proiect și pe fiecare imobil, ca să vezi în orice moment ce ai încasat, ce ai recunoscut și ce datorezi.",
            service: "accounting",
          },
          {
            title: "TVA la vânzare și la chirie te încurcă",
            problem:
              "Unele livrări de locuințe sunt scutite de TVA, dar spațiile comerciale și chiriile de birou nu. Aplici greșit regimul și fie pierzi dreptul de deducere, fie facturezi TVA acolo unde nu trebuie.",
            solution:
              "Tratăm corect TVA la vânzare și la chirie: aplicăm scutirea de la art. 103 pentru locuințe, terenuri și darea lor în locațiune, și calculăm TVA pentru spațiile comerciale impozabile. Separăm clar livrările cu și fără drept de deducere, ca declarațiile tale să fie curate.",
            service: "accounting",
          },
          {
            title: "Contractele te lasă descoperit",
            problem:
              "Folosești șabloane vechi de vânzare-cumpărare sau de arendă, fără clauze clare de predare, penalități sau reziliere. Când apare o problemă cu un cumpărător sau un chiriaș, contractul nu te apără.",
            solution:
              "Pregătim și verificăm contractele de vânzare-cumpărare și de chirie/arendă conform Codului civil, cu clauze clare de plată, termene de predare, penalități și reziliere. Acoperim și contractele de investiții în construcții, ca tranzacția ta să fie protejată de la avans până la transferul dreptului.",
            service: "legal",
          },
          {
            title: "Impozitul pe imobile a crescut după reevaluare",
            problem:
              "După reevaluarea cadastrală, valorile imobilelor s-au schimbat, cotele diferă de la o localitate la alta, iar tu nu ești sigur cât datorezi pe fiecare obiect din portofoliu.",
            solution:
              "Calculăm și ținem evidența impozitului pe bunurile imobiliare pentru fiecare imobil, cu cotele stabilite de autoritatea locală, și urmărim efectul reevaluării cadastrale. Calculăm și amortizarea corect, ca rezultatul fiscal să reflecte realitatea, nu o estimare la întâmplare.",
            service: "accounting",
          },
          {
            title: "Tranzacția poate fi structurată mai bine fiscal",
            problem:
              "Cumperi, dezvolți sau vinzi în nume propriu, fără să fi analizat dacă o altă structură ți-ar reduce sarcina fiscală sau ar simplifica tratamentul TVA și al venitului.",
            solution:
              "Analizăm tranzacția înainte de semnare și îți arătăm variantele de structurare fiscală — pe persoană juridică, pe proiect sau pe etape — cu efectul fiecăreia asupra TVA, impozitului pe venit și pe bunurile imobiliare. Rămâne decizia ta; noi punem cifrele și consecințele pe masă.",
            service: "consulting",
          },
          {
            title: "Salariile echipei și ale administratorilor de bloc",
            problem:
              "Ai agenți, ingineri de șantier sau administratori de imobile, cu contracte și salarii diferite, și te pierzi în state de plată, CNAS și CNAM în fiecare lună.",
            solution:
              "Ținem salarizarea completă: state de plată, calculul contribuțiilor CNAS și CNAM, contracte de muncă și raportările lunare. Gestionăm și partea de evidență pentru asociațiile de proprietari, unde administratorul răspunde de contabilitate și de bugetul anual.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Cât costă contabilitatea pentru o firmă imobiliară sau de dezvoltare?",
            a: "Depinde de numărul de proiecte și imobile, de volumul tranzacțiilor, de regimul TVA aplicabil și de numărul de angajați. Un dezvoltator cu avansuri de la cumpărători și mai multe proiecte are nevoie de mai multă evidență decât o agenție mică. Îți facem o ofertă fixă după o consultație gratuită, fără costuri ascunse.",
          },
          {
            q: "Cum trec de la actualul contabil la voi?",
            a: "Preluăm evidența de la actualul contabil, verificăm soldurile, contractele în derulare, avansurile de la cumpărători și situația TVA, apoi continuăm fără întreruperi. Ne ocupăm de tot transferul, inclusiv de comunicarea cu contabilul anterior. Tu nu pierzi nicio zi și nicio declarație.",
          },
          {
            q: "Vânzarea de apartamente are TVA?",
            a: "Conform art. 103 din Codul fiscal, livrarea de locuințe și terenuri este scutită de TVA fără drept de deducere. Spațiile comerciale și alte imobile nelocative sunt, de regulă, impozabile cu TVA. Stabilim regimul corect pentru fiecare tip de imobil și separăm livrările cu și fără drept de deducere în evidența ta.",
          },
          {
            q: "Chiria încasată trebuie facturată cu TVA?",
            a: "Darea în locațiune a locuințelor și terenurilor este scutită de TVA fără drept de deducere conform art. 103. Închirierea de spații comerciale și de birouri este, de regulă, impozabilă cu TVA. Aplicăm regimul corect pe fiecare contract de chirie sau arendă și îți întocmim facturile cum trebuie.",
          },
          {
            q: "Puteți pregăti contractele de vânzare-cumpărare și de arendă?",
            a: "Da. Pregătim și verificăm contractele de vânzare-cumpărare, de chirie și de arendă conform Codului civil, inclusiv contractele de investiții în construcții și clauzele de avans, predare, penalități și reziliere. Adaptăm fiecare contract la tranzacția concretă, nu îți dăm un șablon generic.",
          },
          {
            q: "Lucrați și cu asociațiile de proprietari?",
            a: "Da. Ținem contabilitatea asociațiilor de proprietari, evidența cotizațiilor și a cheltuielilor comune și sprijinim administratorul la întocmirea bugetului anual și a raportărilor, conform legislației privind condominiul.",
          },
        ],
      },
      ru: {
        intro:
          "Недвижимость — это **тяжёлые договоры и деньги, которые поступают авансом, до признания дохода**. Квартира, проданная на этапе котлована, аренда, выставленная поквартально, дом с десятками собственников — всё это требует отдельного учёта, по проекту и по объекту. Мы ведём бухгалтерию, готовим договоры и сдаём корректную отчётность, чтобы вы занимались сделками, а не учётными карточками.",
        overview:
          "Мы работаем с застройщиками, агентствами недвижимости и управляющими объектами в Молдове. Знаем режим НДС по сделкам: согласно ст. 103 Налогового кодекса, поставка жилья и земли, а также передача их в аренду освобождены от НДС без права вычета, тогда как продажа и аренда коммерческих помещений, как правило, облагаются НДС. Корректно учитываем авансы от покупателей, признаём доход в момент передачи рисков и выгод покупателю, начисляем амортизацию и ведём налог на недвижимое имущество, ставки которого устанавливают местные органы и которые меняются по итогам кадастровой переоценки. Готовим и проверяем договоры купли-продажи и аренды, поддерживаем ассоциации собственников и консультируем по налоговому структурированию сделок. Мы не проводим аудит, не занимаемся посредничеством и не управляем объектами физически — мы ведём бухгалтерскую, юридическую и налоговую часть.",
        challenges: [
          {
            title: "Деньги поступают до передачи объекта",
            problem:
              "Вы получаете авансы от покупателей за ещё не построенные квартиры, но не знаете, когда и как признавать доход. Есть риск признать доход слишком рано и заплатить налог с денег, которые ещё не ваши.",
            solution:
              "Корректно учитываем авансы как доходы будущих периодов и признаём доход только при передаче рисков и выгод покупателю, при передаче объекта. Ведём учёт по каждому проекту и каждому объекту, чтобы вы в любой момент видели, что получено, что признано и что вы должны.",
            service: "accounting",
          },
          {
            title: "НДС при продаже и аренде сбивает с толку",
            problem:
              "Часть поставок жилья освобождена от НДС, а коммерческие помещения и аренда офисов — нет. Вы применяете режим неверно и либо теряете право вычета, либо выставляете НДС там, где не нужно.",
            solution:
              "Корректно ведём НДС при продаже и аренде: применяем освобождение по ст. 103 для жилья, земли и их аренды и начисляем НДС по облагаемым коммерческим помещениям. Чётко разделяем поставки с правом вычета и без него, чтобы ваши декларации были чистыми.",
            service: "accounting",
          },
          {
            title: "Договоры оставляют вас без защиты",
            problem:
              "Вы используете старые шаблоны купли-продажи или аренды без чётких условий передачи, неустойки и расторжения. Когда возникает спор с покупателем или арендатором, договор вас не защищает.",
            solution:
              "Готовим и проверяем договоры купли-продажи и аренды по Гражданскому кодексу, с чёткими условиями оплаты, сроками передачи, неустойкой и расторжением. Покрываем и договоры инвестиций в строительство, чтобы ваша сделка была защищена от аванса до перехода права.",
            service: "legal",
          },
          {
            title: "Налог на недвижимость вырос после переоценки",
            problem:
              "После кадастровой переоценки стоимость объектов изменилась, ставки различаются от местности к местности, и вы не уверены, сколько должны по каждому объекту портфеля.",
            solution:
              "Рассчитываем и ведём налог на недвижимое имущество по каждому объекту, с применением ставок местного органа, и отслеживаем эффект кадастровой переоценки. Корректно начисляем и амортизацию, чтобы налоговый результат отражал реальность, а не приблизительную оценку.",
            service: "accounting",
          },
          {
            title: "Сделку можно структурировать выгоднее по налогам",
            problem:
              "Вы покупаете, строите или продаёте от своего имени, не проанализировав, не снизит ли другая структура налоговую нагрузку или не упростит ли учёт НДС и дохода.",
            solution:
              "Анализируем сделку до подписания и показываем варианты налогового структурирования — на юридическое лицо, по проекту или поэтапно — с эффектом каждого на НДС, налог на доход и налог на недвижимость. Решение остаётся за вами; мы кладём цифры и последствия на стол.",
            service: "consulting",
          },
          {
            title: "Зарплаты команды и управляющих домами",
            problem:
              "У вас есть агенты, инженеры стройплощадки или управляющие объектами с разными договорами и окладами, и каждый месяц вы теряетесь в платёжных ведомостях, CNAS и CNAM.",
            solution:
              "Ведём полный расчёт зарплаты: платёжные ведомости, расчёт взносов CNAS и CNAM, трудовые договоры и ежемесячную отчётность. Ведём и учёт для ассоциаций собственников, где управляющий отвечает за бухгалтерию и годовой бюджет.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "Сколько стоит бухгалтерия для риелторской или девелоперской компании?",
            a: "Зависит от числа проектов и объектов, объёма сделок, применимого режима НДС и числа сотрудников. Застройщику с авансами от покупателей и несколькими проектами нужно больше учёта, чем небольшому агентству. Мы дадим фиксированную цену после бесплатной консультации, без скрытых платежей.",
          },
          {
            q: "Как мне перейти от нынешнего бухгалтера к вам?",
            a: "Принимаем учёт у нынешнего бухгалтера, проверяем сальдо, текущие договоры, авансы от покупателей и ситуацию по НДС, затем продолжаем без перерывов. Берём на себя весь перенос, включая общение с прежним бухгалтером. Вы не теряете ни дня и ни одной декларации.",
          },
          {
            q: "Облагается ли продажа квартир НДС?",
            a: "Согласно ст. 103 Налогового кодекса, поставка жилья и земли освобождена от НДС без права вычета. Коммерческие помещения и иная нежилая недвижимость, как правило, облагаются НДС. Мы определяем верный режим для каждого типа объекта и разделяем в вашем учёте поставки с правом вычета и без него.",
          },
          {
            q: "Нужно ли выставлять НДС на полученную аренду?",
            a: "Передача в аренду жилья и земли освобождена от НДС без права вычета согласно ст. 103. Аренда коммерческих и офисных помещений, как правило, облагается НДС. Мы применяем верный режим к каждому договору аренды и оформляем счета как положено.",
          },
          {
            q: "Можете ли вы подготовить договоры купли-продажи и аренды?",
            a: "Да. Готовим и проверяем договоры купли-продажи и аренды по Гражданскому кодексу, включая договоры инвестиций в строительство и условия аванса, передачи, неустойки и расторжения. Адаптируем каждый договор под конкретную сделку, а не выдаём типовой шаблон.",
          },
          {
            q: "Работаете ли вы с ассоциациями собственников?",
            a: "Да. Ведём бухгалтерию ассоциаций собственников, учёт взносов и общих расходов и помогаем управляющему составить годовой бюджет и отчётность согласно законодательству о кондоминиуме.",
          },
        ],
      },
      en: {
        intro:
          "Real estate means **heavy contracts and money that arrives upfront, before you can recognize revenue**. A flat sold off-plan, rent billed quarterly, a building with dozens of owners — each one needs separate records, by project and by property. We keep the books, draft the contracts and file accurate reports, so you handle the deals, not the ledger cards.",
        overview:
          "We work with developers, real-estate agencies and property managers in Moldova. We know the VAT regime on transactions: under art. 103 of the Tax Code, the supply of housing and land, and the leasing of those, are VAT-exempt without the right of deduction, while the sale and lease of commercial premises are generally VAT-taxable. We account correctly for advances from buyers, recognize revenue when risks and benefits transfer to the buyer, calculate depreciation and handle the real-estate tax, whose rates are set by local authorities and shift with the cadastral revaluation. We draft and review sale-purchase and lease contracts, support owners' associations and advise on the tax structuring of transactions. We do not perform audit, broker deals or physically manage buildings — we handle the accounting, legal and tax side.",
        challenges: [
          {
            title: "Money comes in before you deliver",
            problem:
              "You collect advances from buyers for flats that are not yet built, but you are unsure when and how to recognize revenue. You risk booking income too early and paying tax on money that is not yet yours.",
            solution:
              "We treat advances correctly as deferred revenue and recognize income only when risks and benefits transfer to the buyer, at handover. We keep records by project and by property, so at any moment you see what you collected, what you recognized and what you owe.",
            service: "accounting",
          },
          {
            title: "VAT on sales and rent trips you up",
            problem:
              "Some housing supplies are VAT-exempt, but commercial premises and office rent are not. You apply the regime wrong and either lose the right of deduction or charge VAT where you should not.",
            solution:
              "We handle VAT on sales and rent correctly: we apply the art. 103 exemption for housing, land and their leasing, and charge VAT on taxable commercial premises. We clearly separate supplies with and without the right of deduction, so your returns are clean.",
            service: "accounting",
          },
          {
            title: "Contracts leave you exposed",
            problem:
              "You use old sale-purchase or lease templates without clear handover, penalty or termination clauses. When a dispute with a buyer or tenant arises, the contract does not protect you.",
            solution:
              "We draft and review sale-purchase and lease contracts under the Civil Code, with clear payment terms, handover deadlines, penalties and termination. We also cover construction-investment contracts, so your transaction is protected from the advance to the transfer of title.",
            service: "legal",
          },
          {
            title: "Property tax rose after the revaluation",
            problem:
              "After the cadastral revaluation, property values changed, rates differ from one locality to another, and you are not sure how much you owe on each object in the portfolio.",
            solution:
              "We calculate and track the real-estate tax for each property, applying the local authority's rates, and follow the effect of the cadastral revaluation. We also calculate depreciation correctly, so the taxable result reflects reality, not a rough estimate.",
            service: "accounting",
          },
          {
            title: "The transaction can be structured better for tax",
            problem:
              "You buy, develop or sell in your own name without analyzing whether another structure would cut your tax burden or simplify the VAT and income treatment.",
            solution:
              "We analyze the transaction before signing and show you the tax-structuring options — by legal entity, by project or by stage — with each one's effect on VAT, income tax and real-estate tax. The decision stays yours; we put the numbers and consequences on the table.",
            service: "consulting",
          },
          {
            title: "Payroll for your team and building managers",
            problem:
              "You have agents, site engineers or property managers on different contracts and salaries, and every month you get lost in payrolls, CNAS and CNAM.",
            solution:
              "We run full payroll: pay sheets, CNAS and CNAM contribution calculations, employment contracts and monthly reporting. We also handle records for owners' associations, where the manager is responsible for the accounting and the annual budget.",
            service: "hr",
          },
        ],
        faq: [
          {
            q: "How much does accounting cost for a real-estate or development company?",
            a: "It depends on the number of projects and properties, the volume of transactions, the applicable VAT regime and the number of employees. A developer with buyer advances and several projects needs more bookkeeping than a small agency. We give you a fixed quote after a free consultation, with no hidden costs.",
          },
          {
            q: "How do I switch from my current accountant to you?",
            a: "We take over the records from your current accountant, check the balances, contracts in progress, buyer advances and the VAT position, then continue without interruption. We handle the whole transfer, including communication with the previous accountant. You lose no day and no filing.",
          },
          {
            q: "Is the sale of flats subject to VAT?",
            a: "Under art. 103 of the Tax Code, the supply of housing and land is VAT-exempt without the right of deduction. Commercial premises and other non-residential property are generally VAT-taxable. We set the correct regime for each type of property and separate supplies with and without the right of deduction in your records.",
          },
          {
            q: "Does rent collected need to be billed with VAT?",
            a: "The leasing of housing and land is VAT-exempt without the right of deduction under art. 103. The lease of commercial and office premises is generally VAT-taxable. We apply the correct regime to each lease contract and issue your invoices the right way.",
          },
          {
            q: "Can you prepare sale-purchase and lease contracts?",
            a: "Yes. We draft and review sale-purchase and lease contracts under the Civil Code, including construction-investment contracts and advance, handover, penalty and termination clauses. We tailor each contract to the specific transaction rather than handing you a generic template.",
          },
          {
            q: "Do you also work with owners' associations?",
            a: "Yes. We keep the accounting for owners' associations, track contributions and common expenses, and support the manager in drawing up the annual budget and reporting, in line with the condominium legislation.",
          },
        ],
      },
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
  return Object.fromEntries(LOCALES.map((l) => [l, sectionUrl("industries", l)])) as Record<
    Locale,
    string
  >;
}

/** Per-locale sibling URLs for one industry detail page — feeds hreflang. */
export function industryDetailSiblings(slug: string): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, industryDetailUrl(slug, l)])) as Record<
    Locale,
    string
  >;
}

export interface IndustrySeo {
  /** Keyword-led title — used as the <title> core (brand appended) and the page H1. */
  metaTitle: string;
  /** Unique, keyword-rich meta description (~150–160 chars). */
  metaDescription: string;
}

/**
 * Hand-tuned SEO title + description per industry/locale. Keyword-led (targets the
 * terms people actually search, e.g. "contabilitate magazin online", "IT Park"),
 * not just the display name. Detail pages fall back to a generic template if missing.
 */
export const INDUSTRY_SEO: Record<IndustryId, Record<Locale, IndustrySeo>> = {
  "tech-and-saas": {
    ro: {
      metaTitle: "Contabilitate pentru firme IT și IT Park",
      metaDescription:
        "Contabilitate pentru firme IT și SaaS din Moldova: regim IT Park (impozit unic 7%), TVA pe serviciile prestate clienților externi, venituri recurente. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для IT-компаний и IT Park",
      metaDescription:
        "Бухгалтерия для IT- и SaaS-компаний в Молдове: режим IT Park (единый налог 7%), НДС по услугам зарубежным клиентам, регулярная выручка. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for IT & SaaS companies",
      metaDescription:
        "Accounting for IT and SaaS companies in Moldova: IT Park regime (7% single tax), VAT on services to foreign clients, recurring revenue. Free consultation.",
    },
  },
  "e-commerce": {
    ro: {
      metaTitle: "Contabilitate pentru magazine online",
      metaDescription:
        "Contabilitate pentru magazine online din Moldova: TVA pe canale de vânzare, plăți prin card și mobile banking, retururi, e-Factura. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для интернет-магазинов",
      metaDescription:
        "Бухгалтерия для интернет-магазинов в Молдове: НДС по каналам продаж, оплата картой и мобильным банкингом, возвраты, e-Factura. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for online stores",
      metaDescription:
        "Accounting for online stores in Moldova: VAT by sales channel, card and mobile-banking payments, returns, e-Factura. Free consultation.",
    },
  },
  retail: {
    ro: {
      metaTitle: "Contabilitate pentru magazine și retail",
      metaDescription:
        "Contabilitate pentru magazine din Moldova: TVA pe categorii de produse (8% și 20%), evidența stocurilor, rapoarte Z, salarizare. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для розничной торговли",
      metaDescription:
        "Бухгалтерия для магазинов в Молдове: НДС по категориям товаров (8% и 20%), учёт запасов, Z-отчёты, расчёт зарплаты. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for shops & retail",
      metaDescription:
        "Accounting for shops in Moldova: VAT by product category (8% and 20%), stock records, Z-reports, payroll. Free consultation.",
    },
  },
  horeca: {
    ro: {
      metaTitle: "Contabilitate pentru restaurante și HoReCa",
      metaDescription:
        "Contabilitate pentru restaurante, cafenele și hoteluri din Moldova: TVA HoReCa, salarizarea sezonierilor, evidența pierderilor din bucătărie. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для ресторанов и гостиниц",
      metaDescription:
        "Бухгалтерия для ресторанов, кафе и гостиниц в Молдове: НДС HoReCa, расчёт зарплаты сезонного персонала, учёт потерь на кухне. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for restaurants & hotels",
      metaDescription:
        "Accounting for restaurants, cafés and hotels in Moldova: HoReCa VAT, seasonal-staff payroll, kitchen-loss records. Free consultation.",
    },
  },
  constructii: {
    ro: {
      metaTitle: "Contabilitate pentru firme de construcții",
      metaDescription:
        "Contabilitate pentru firme de construcții din Moldova: venituri pe stadiul de execuție, avansuri, rețineri de garanție, TVA, contracte. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для строительных компаний",
      metaDescription:
        "Бухгалтерия для строительных компаний в Молдове: выручка по стадиям выполнения, авансы, гарантийные удержания, НДС, договоры. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for construction firms",
      metaDescription:
        "Accounting for construction firms in Moldova: revenue by stage of completion, advances, retention holdbacks, VAT, contracts. Free consultation.",
    },
  },
  productie: {
    ro: {
      metaTitle: "Contabilitate pentru firme de producție",
      metaDescription:
        "Contabilitate pentru producție din Moldova: cost pe produs, stocuri, producție în curs, amortizarea utilajelor, accize. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для производства",
      metaDescription:
        "Бухгалтерия для производства в Молдове: себестоимость продукта, запасы, незавершённое производство, амортизация, акцизы. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for manufacturing",
      metaDescription:
        "Accounting for manufacturing in Moldova: cost per product, stock, work in progress, equipment depreciation, excise. Free consultation.",
    },
  },
  "servicii-profesionale": {
    ro: {
      metaTitle: "Contabilitate pentru firme de servicii",
      metaDescription:
        "Contabilitate pentru firme de servicii din Moldova: venituri pe proiect, retainere, salarizare, contracte și GDPR. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для сферы услуг",
      metaDescription:
        "Бухгалтерия для сервисных компаний в Молдове: выручка по проектам, ретейнеры, расчёт зарплаты, договоры и GDPR. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for service firms",
      metaDescription:
        "Accounting for service firms in Moldova: revenue by project, retainers, payroll, contracts and GDPR. Free consultation.",
    },
  },
  ong: {
    ro: {
      metaTitle: "Contabilitate pentru ONG și asociații",
      metaDescription:
        "Contabilitate pentru ONG-uri din Moldova: evidență pe granturi, fonduri cu destinație, raportare către donatori, Legea 86/2020. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для НКО и ассоциаций",
      metaDescription:
        "Бухгалтерия для НКО в Молдове: учёт по грантам, целевые фонды, отчётность донорам, Закон 86/2020. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for NGOs & associations",
      metaDescription:
        "Accounting for NGOs in Moldova: grant accounting, restricted funds, donor reporting, Law 86/2020. Free consultation.",
    },
  },
  "logistica-si-transport": {
    ro: {
      metaTitle: "Contabilitate pentru transport și logistică",
      metaDescription:
        "Contabilitate pentru firme de transport din Moldova: TVA 0% la transportul internațional, CMR, diurnele șoferilor, parc auto. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для транспорта и логистики",
      metaDescription:
        "Бухгалтерия для транспортных компаний в Молдове: НДС 0% на международные перевозки, CMR, суточные водителей, автопарк. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for transport & logistics",
      metaDescription:
        "Accounting for transport companies in Moldova: 0% VAT on international transport, CMR, driver per-diems, fleet. Free consultation.",
    },
  },
  sanatate: {
    ro: {
      metaTitle: "Contabilitate pentru clinici și farmacii",
      metaDescription:
        "Contabilitate pentru clinici și farmacii din Moldova: scutirea de TVA la serviciile medicale, decontări CNAM, stocuri de medicamente. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для клиник и аптек",
      metaDescription:
        "Бухгалтерия для клиник и аптек в Молдове: освобождение медуслуг от НДС, расчёты с CNAM, учёт запасов лекарств. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for clinics & pharmacies",
      metaDescription:
        "Accounting for clinics and pharmacies in Moldova: medical-services VAT exemption, CNAM settlements, medicine stock. Free consultation.",
    },
  },
  agricultura: {
    ro: {
      metaTitle: "Contabilitate pentru agricultură și ferme",
      metaDescription:
        "Contabilitate pentru ferme și firme agricole din Moldova: subvenții AIPA, TVA 8%, impozit pe teren, muncă sezonieră. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для сельского хозяйства",
      metaDescription:
        "Бухгалтерия для ферм и агрофирм в Молдове: субсидии AIPA, НДС 8%, земельный налог, сезонный труд. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for farms & agriculture",
      metaDescription:
        "Accounting for farms and agri-businesses in Moldova: AIPA subsidies, 8% VAT, land tax, seasonal labour. Free consultation.",
    },
  },
  imobiliare: {
    ro: {
      metaTitle: "Contabilitate pentru imobiliare și dezvoltatori",
      metaDescription:
        "Contabilitate pentru imobiliare și dezvoltatori din Moldova: TVA la vânzare și la chirie, venituri în avans, contracte. Consultație gratuită.",
    },
    ru: {
      metaTitle: "Бухгалтерия для недвижимости и девелопмента",
      metaDescription:
        "Бухгалтерия для недвижимости и девелоперов в Молдове: НДС при продаже и аренде, доходы будущих периодов, договоры. Бесплатная консультация.",
    },
    en: {
      metaTitle: "Accounting for real estate & developers",
      metaDescription:
        "Accounting for real estate and developers in Moldova: VAT on sales and rent, deferred revenue, contracts. Free consultation.",
    },
  },
};

/** Returns the tuned SEO title + description for an industry/locale. */
export function getIndustrySeo(id: IndustryId, locale: Locale): IndustrySeo {
  return INDUSTRY_SEO[id][locale];
}
