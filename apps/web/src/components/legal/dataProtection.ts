import type { Locale } from "@expertcont/i18n";
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

export const dataProtectionContent: Record<Locale, LegalData> = {
  ro: {
    title: "Politica privind prelucrarea datelor cu caracter personal",
    lastUpdated: "Ultima actualizare",
    updated: "24 octombrie 2026",
    sections: [
      {
        h: "1. Cine suntem",
        t: `${LEGAL_NAME} (S.R.L. „RIGHT CONSULT COMPANY”, IDNO 1022600002005), cu sediul în ${ADDR_RO}, este operator de date cu caracter personal pentru prelucrările în care stabilește scopurile și mijloacele. Contact general: ${EMAIL}, ${PHONE}. Pentru orice întrebare despre datele personale și pentru exercitarea drepturilor tale scrie-ne la ${DPO_EMAIL}. Nu am desemnat un responsabil cu protecția datelor (DPO), deoarece legea nu ne obligă în prezent; solicitările trimise la această adresă sunt gestionate de persoana desemnată intern cu coordonarea conformității.`,
      },
      {
        h: "2. Despre această politică",
        t: "Politica descrie, pe scurt și pe înțeles, cum colectăm, folosim, transmitem, păstrăm, protejăm și ștergem datele persoanelor cu care lucrăm. Ea se completează cu informările specifice unor servicii sau canale. Pentru formularele site-ului, analiza traficului și cookie-uri, consultă Politica de confidențialitate a site-ului. Dacă o informare specifică descrie mai precis un scop, un termen, un destinatar sau un transfer, aceasta se aplică împreună cu prezenta politică.",
        link: { section: "privacy", label: "Politica de confidențialitate a site-ului" },
      },
      {
        h: "3. Ale cui date le prelucrăm",
        t: "În funcție de activitate: clienți și potențiali clienți; reprezentanții și angajații clienților; contrapărți și reprezentanții lor; alte persoane implicate în dosarele pe care le gestionăm; furnizori și reprezentanții lor; candidați; angajați și colaboratori; persoane care ne contactează; vizitatorii site-ului.",
      },
      {
        h: "4. Ce date prelucrăm",
        t: "În funcție de relația concretă: nume și prenume; IDNP și informații din actele de identitate, atunci când sunt necesare; adresă, telefon, e-mail; funcție și semnătură; informații profesionale, contractuale și financiare; corespondență; documentele primite pentru prestarea serviciului; informații despre litigii și alte proceduri; date tehnice și de securitate. Categorii speciale de date sau date privind condamnări penale prelucrăm doar atunci când natura serviciului o impune și există un temei legal. Nu cerem date de care nu avem nevoie; dacă un document primit conține date în plus, le folosim doar în măsura necesară dosarului sau obligațiilor legale.",
      },
      {
        h: "5. De ce prelucrăm datele",
        t: "(a) Să răspundem la solicitări și să pregătim oferte. (b) Să încheiem și să executăm contracte și să prestăm serviciile contabile, juridice și de consultanță. (c) Să administrăm dosarele clienților și să comunicăm cu clienții și cu alte persoane implicate. (d) Să respectăm obligațiile legale, inclusiv cele contabile, fiscale și de prevenire a spălării banilor și a finanțării terorismului. (e) Să ne apărăm drepturile și interesele legitime. (f) Să asigurăm securitatea sistemelor și să prevenim frauda și accesul neautorizat. (g) Să soluționăm cererile persoanelor vizate. (h) Recrutare. Dacă vrem să folosim datele într-un scop nou, incompatibil cu cel inițial, verificăm mai întâi dacă avem temei și te informăm înainte.",
      },
      {
        h: "6. Temeiurile juridice",
        t: "Pentru fiecare scop stabilim un temei separat: demersuri precontractuale pentru solicitări și oferte; executarea contractului pentru serviciile prestate; obligația legală pentru evidența contabilă, raportarea fiscală și verificările de prevenire a spălării banilor; interesul nostru legitim pentru securitate, prevenirea fraudei și apărarea drepturilor, caz în care te poți opune prelucrării; consimțământul tău, acolo unde nu există un temei mai potrivit, de exemplu pentru păstrarea CV-ului pentru recrutări viitoare sau pentru analiza traficului pe site. Pentru categoriile speciale de date identificăm în plus una dintre condițiile prevăzute de lege. Faptul că o informație este publică nu înseamnă că o putem folosi în orice scop.",
      },
      {
        h: "7. Consimțământul",
        t: "Nu cerem consimțământul atunci când prelucrarea are un alt temei mai potrivit. Când ne bazăm pe consimțământ, îl cerem separat pentru fiecare scop; îl poți refuza fără consecințe nejustificate și îl poți retrage oricând, la fel de ușor cum l-ai dat. Retragerea nu afectează legalitatea prelucrării anterioare. După retragere oprim prelucrarea bazată pe consimțământ, cu excepția cazului în care există un alt temei legal, despre care te informăm.",
      },
      {
        h: "8. De unde obținem datele",
        t: "Direct de la tine; de la clientul care a contractat serviciul; de la reprezentanți; din documentele unui dosar; de la autorități; din registre și surse publice; de la contrapărți; de la furnizori sau parteneri, atunci când transmiterea este legală. Nu folosim toate aceste surse pentru fiecare dosar, ci doar pe cele relevante scopului. Când datele nu provin de la tine, te informăm în termenele prevăzute de lege, cu excepțiile legale.",
      },
      {
        h: "9. Cui transmitem datele",
        t: "Numai cât este necesar: angajaților și colaboratorilor autorizați; avocaților, consultanților, experților și traducătorilor; autorităților publice, instanțelor, notarilor și executorilor; instituțiilor financiare; contabililor și auditorilor; furnizorilor IT, de cloud și de e-mail; altor persoane, doar dacă transmiterea este necesară și are temei legal. Fiecare destinatar primește doar datele necesare rolului său. Nu vindem date personale.",
      },
      {
        h: "10. Furnizori care prelucrează date în numele nostru",
        t: "Alegem doar furnizori care oferă garanții suficiente de securitate și conformitate și reglementăm relația prin contract și instrucțiuni scrise. Evaluăm natura serviciului, măsurile de securitate, confidențialitatea, subcontractorii, locul prelucrării, gestionarea incidentelor și ștergerea datelor. Pentru e-mail și colaborare folosim servicii profesionale, precum Google Workspace (Gmail, Google Drive). Accesul la documente se acordă nominal, partajarea publică a documentelor cu date personale este dezactivată, iar conturile personale ale angajaților nu sunt folosite pentru dosarele profesionale.",
      },
      {
        h: "11. Transferuri internaționale",
        t: "Dacă datele ajung într-un stat din afara Spațiului Economic European sau la o organizație internațională, inclusiv atunci când un furnizor le poate accesa de acolo, verificăm mai întâi existența unui mecanism prevăzut de Legea nr. 195/2024: o decizie privind caracterul adecvat, garanții adecvate precum clauze contractuale corespunzătoare, reguli corporatiste obligatorii sau, doar în situații limitate, o derogare legală. Ne poți cere informații despre garanțiile aplicate unui transfer care te privește.",
      },
      {
        h: "12. Cât timp păstrăm datele",
        t: "Doar cât este necesar scopului, contractului, obligațiilor legale, unei proceduri sau apărării unui drept. Orientativ: solicitările și ofertele care nu devin contract, 12 luni; dosarul clientului, pe durata contractului, iar documentele contabile și fiscale, 10 ani după încheierea lui, conform legii; datele colectate pentru prevenirea spălării banilor, pe termenul prevăzut de legislația în domeniu; CV-urile candidaților nerecrutați, 6 luni, sau până la 12 luni dacă ești de acord să te contactăm pentru alte posturi; jurnalele de securitate, 6–12 luni. Dacă datele sunt necesare unui litigiu, control sau investigații, suspendăm ștergerea doar pentru datele relevante, până la încetarea motivului. La expirarea termenului datele sunt șterse, distruse sau anonimizate.",
      },
      {
        h: "13. Cum protejăm datele",
        t: "Aplicăm măsuri tehnice și organizatorice proporționale cu riscul: control al accesului pe roluri și strict pe necesitate, autentificare în doi pași, criptare, parole robuste, copii de siguranță, jurnalizarea accesului, protecția dispozitivelor, instruirea personalului, angajamente de confidențialitate și o procedură internă pentru incidente. Revizuim măsurile periodic și retragem accesul atunci când nu mai este necesar.",
      },
      {
        h: "14. Drepturile tale",
        t: "În condițiile Legii nr. 195/2024 ai dreptul la informare, acces, rectificare, ștergere, restricționarea prelucrării, portabilitate și opoziție, drepturile privind deciziile individuale automatizate, dreptul de a-ți retrage consimțământul, dreptul de a depune plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal și dreptul de a te adresa instanței. Drepturile nu sunt absolute; dacă nu putem admite integral o cerere, îți explicăm de ce.",
      },
      {
        h: "15. Cum îți exerciți drepturile",
        t: `Trimite cererea la ${DPO_EMAIL} sau prin poștă la ${ADDR_RO}. Răspundem fără întârziere nejustificată și în cel mult o lună; în cazurile complexe sau când primim multe cereri, termenul poate fi prelungit cu până la două luni, iar noi te anunțăm în prima lună și îți spunem de ce. Îți putem cere doar informațiile strict necesare pentru a-ți verifica identitatea, proporțional cu cererea și cu sensibilitatea datelor; nu cerem copia actului de identitate dacă identitatea poate fi confirmată altfel.`,
      },
      {
        h: "16. Procese automatizate",
        t: "(a) Estimarea prețului: calculatorul de pe site estimează automat costul serviciilor pe baza datelor introduse de tine. Rezultatul este doar orientativ, nu are efecte juridice asupra ta, iar oferta finală este confirmată de un specialist. Detaliile despre logica de calcul sunt în Politica de confidențialitate a site-ului. (b) Verificarea în listele de sancțiuni: conform legislației privind prevenirea spălării banilor și a finanțării terorismului, verificăm automat potențialii clienți, administratorii și beneficiarii lor efectivi în listele de sancțiuni internaționale, în listele persoanelor expuse politic și în alte baze de date relevante. Orice potrivire este analizată de un specialist înainte de o decizie privind relația de afaceri; nu refuzăm un client doar pe baza rezultatului automat. Ai dreptul să ceri intervenția unui specialist, să-ți exprimi punctul de vedere și să contești decizia. Datele folosite în aceste procese sunt accesibile doar persoanelor autorizate și se păstrează doar cât este necesar scopului.",
        link: { section: "privacy", label: "Politica de confidențialitate a site-ului" },
      },
      {
        h: "17. Datele copiilor",
        t: "Nu colectăm intenționat date despre copii care nu sunt necesare serviciului. Când prelucrăm astfel de date, de exemplu în dosarele de personal ale clienților, aplicăm măsuri suplimentare de protecție și verificăm temeiul juridic.",
      },
      {
        h: "18. Încălcări ale securității datelor",
        t: "Avem o procedură internă pentru identificarea, evaluarea și documentarea incidentelor. Dacă un incident poate genera un risc pentru drepturile persoanelor, îl notificăm Centrului Național pentru Protecția Datelor cu Caracter Personal, de regulă în 72 de ore, iar dacă riscul este ridicat îi informăm și pe cei afectați. Investigăm cauza, limităm efectele și luăm măsuri ca incidentul să nu se repete.",
      },
      {
        h: "19. Modificarea politicii",
        t: "Actualizăm politica atunci când se schimbă legislația, serviciile, tehnologiile, furnizorii sau prelucrările. Data ultimei actualizări este afișată mai sus. Dacă o modificare schimbă semnificativ modul în care îți prelucrăm datele, te informăm prin canalele de comunicare pe care le avem cu tine.",
      },
    ],
    questionsTitle: "Întrebări despre datele tale?",
    questionsBody: `Scrie-ne la ${DPO_EMAIL}. Pentru alte întrebări ne găsești la ${EMAIL} sau la ${PHONE}.`,
    questionsEmail: DPO_EMAIL,
    questionsBtn: "Contactează-ne",
  },
  ru: {
    title: "Политика обработки персональных данных",
    lastUpdated: "Последнее обновление",
    updated: "24 октября 2026",
    sections: [
      {
        h: "1. Кто мы",
        t: `${LEGAL_NAME} (S.R.L. «RIGHT CONSULT COMPANY», IDNO 1022600002005), расположенная по адресу ${ADDR_RU}, является оператором персональных данных в тех случаях, когда сама определяет цели и средства обработки. Общие контакты: ${EMAIL}, ${PHONE}. По любым вопросам о персональных данных и для осуществления ваших прав пишите на ${DPO_EMAIL}. Мы не назначали ответственного за защиту данных (DPO), поскольку закон сейчас этого от нас не требует; обращения на этот адрес обрабатывает сотрудник, назначенный внутри компании координировать соблюдение требований.`,
      },
      {
        h: "2. Об этой политике",
        t: "Политика коротко и понятно описывает, как мы собираем, используем, передаём, храним, защищаем и удаляем данные людей, с которыми работаем. Её дополняют отдельные уведомления для конкретных услуг и каналов. О формах сайта, аналитике и cookie читайте в Политике конфиденциальности сайта. Если отдельное уведомление точнее описывает цель, срок, получателя или передачу данных, оно применяется вместе с этой политикой.",
        link: { section: "privacy", label: "Политика конфиденциальности сайта" },
      },
      {
        h: "3. Чьи данные мы обрабатываем",
        t: "В зависимости от деятельности: клиентов и потенциальных клиентов; представителей и сотрудников клиентов; контрагентов и их представителей; других лиц, участвующих в делах, которые мы ведём; поставщиков и их представителей; кандидатов; сотрудников и сотрудничающих с нами лиц; людей, которые с нами связываются; посетителей сайта.",
      },
      {
        h: "4. Какие данные мы обрабатываем",
        t: "В зависимости от конкретных отношений: имя и фамилия; IDNP и данные документов, удостоверяющих личность, когда они необходимы; адрес, телефон, e-mail; должность и подпись; профессиональные, договорные и финансовые сведения; переписка; документы, полученные для оказания услуги; сведения о спорах и других процедурах; технические данные и данные безопасности. Особые категории данных или данные о судимостях мы обрабатываем только тогда, когда этого требует характер услуги и есть законное основание. Мы не запрашиваем ненужные данные; если в полученном документе есть лишние сведения, мы используем их лишь в той мере, в какой это нужно для дела или выполнения требований закона.",
      },
      {
        h: "5. Зачем мы обрабатываем данные",
        t: "(а) Чтобы отвечать на запросы и готовить предложения. (б) Чтобы заключать и исполнять договоры и оказывать бухгалтерские, юридические и консалтинговые услуги. (в) Чтобы вести дела клиентов и общаться с клиентами и другими участниками. (г) Чтобы выполнять требования закона, в том числе бухгалтерские, налоговые и по предотвращению отмывания денег и финансирования терроризма. (д) Чтобы защищать наши права и законные интересы. (е) Чтобы обеспечивать безопасность систем и предотвращать мошенничество и несанкционированный доступ. (ж) Чтобы рассматривать обращения субъектов данных. (з) Для подбора персонала. Если мы захотим использовать данные для новой цели, несовместимой с первоначальной, мы сначала проверим, есть ли для этого основание, и заранее сообщим вам.",
      },
      {
        h: "6. Правовые основания",
        t: "Для каждой цели мы определяем отдельное основание: преддоговорные действия — для запросов и предложений; исполнение договора — для оказываемых услуг; требование закона — для бухгалтерского учёта, налоговой отчётности и проверок по предотвращению отмывания денег; наш законный интерес — для безопасности, предотвращения мошенничества и защиты прав, и в этом случае вы можете возразить против обработки; ваше согласие — там, где нет более подходящего основания, например для хранения резюме для будущих вакансий или для аналитики сайта. Для особых категорий данных мы дополнительно определяем одно из условий, предусмотренных законом. То, что сведения общедоступны, не означает, что их можно использовать для любой цели.",
      },
      {
        h: "7. Согласие",
        t: "Мы не просим согласия, если для обработки есть более подходящее основание. Когда мы опираемся на согласие, мы запрашиваем его отдельно для каждой цели; вы можете отказаться без необоснованных последствий и отозвать его в любой момент так же просто, как дали. Отзыв не влияет на законность обработки до него. После отзыва мы прекращаем обработку на основании согласия, если только нет другого законного основания, о котором мы вам сообщим.",
      },
      {
        h: "8. Откуда мы получаем данные",
        t: "Непосредственно от вас; от клиента, заказавшего услугу; от представителей; из документов дела; от государственных органов; из реестров и общедоступных источников; от контрагентов; от поставщиков или партнёров, если передача законна. Для каждого дела мы используем не все эти источники, а только относящиеся к цели. Если данные получены не от вас, мы уведомляем вас в сроки, установленные законом, с учётом законных исключений.",
      },
      {
        h: "9. Кому мы передаём данные",
        t: "Только в необходимом объёме: уполномоченным сотрудникам и сотрудничающим лицам; адвокатам, консультантам, экспертам и переводчикам; государственным органам, судам, нотариусам и судебным исполнителям; финансовым учреждениям; бухгалтерам и аудиторам; поставщикам IT, облачных сервисов и электронной почты; другим лицам — только если передача необходима и имеет законное основание. Каждый получатель получает только те данные, которые нужны для его роли. Мы не продаём персональные данные.",
      },
      {
        h: "10. Поставщики, обрабатывающие данные от нашего имени",
        t: "Мы выбираем только поставщиков, которые дают достаточные гарантии безопасности и соблюдения требований, и регулируем отношения договором и письменными инструкциями. Мы оцениваем характер услуги, меры безопасности, конфиденциальность, субподрядчиков, место обработки, работу с инцидентами и удаление данных. Для почты и совместной работы мы используем профессиональные сервисы, например Google Workspace (Gmail, Google Drive). Доступ к документам выдаётся персонально, публичный доступ к документам с персональными данными отключён, а личные аккаунты сотрудников не используются для рабочих дел.",
      },
      {
        h: "11. Международная передача данных",
        t: "Если данные попадают в государство за пределами Европейской экономической зоны или в международную организацию, в том числе когда поставщик может получить к ним доступ оттуда, мы сначала проверяем наличие механизма, предусмотренного Законом № 195/2024: решения о надлежащем уровне защиты, надлежащих гарантий, например соответствующих договорных положений, обязательных корпоративных правил или — лишь в ограниченных случаях — законного исключения. Вы можете запросить у нас сведения о гарантиях, применяемых к передаче ваших данных.",
      },
      {
        h: "12. Сколько мы храним данные",
        t: "Только пока это нужно для цели, договора, требований закона, процедуры или защиты права. Ориентировочно: запросы и предложения, не приведшие к договору, — 12 месяцев; дело клиента — в течение срока договора, а бухгалтерские и налоговые документы — 10 лет после его окончания, как требует закон; данные, собранные для предотвращения отмывания денег, — в течение срока, установленного профильным законодательством; резюме кандидатов, которых мы не наняли, — 6 месяцев или до 12 месяцев, если вы согласны, чтобы мы связались с вами по другим вакансиям; журналы безопасности — 6–12 месяцев. Если данные нужны для спора, проверки или расследования, мы приостанавливаем удаление только соответствующих данных до отпадения причины. По истечении срока данные удаляются, уничтожаются или обезличиваются.",
      },
      {
        h: "13. Как мы защищаем данные",
        t: "Мы применяем технические и организационные меры, соразмерные риску: контроль доступа по ролям и строго по необходимости, двухфакторную аутентификацию, шифрование, надёжные пароли, резервные копии, журналирование доступа, защиту устройств, обучение персонала, обязательства о конфиденциальности и внутреннюю процедуру реагирования на инциденты. Мы регулярно пересматриваем меры и отзываем доступ, когда он больше не нужен.",
      },
      {
        h: "14. Ваши права",
        t: "На условиях Закона № 195/2024 вы имеете право на информацию, доступ, исправление, удаление, ограничение обработки, переносимость и возражение, права в отношении автоматизированных индивидуальных решений, право отозвать согласие, право подать жалобу в Национальный центр по защите персональных данных и право обратиться в суд. Права не абсолютны; если мы не можем полностью удовлетворить запрос, мы объясним почему.",
      },
      {
        h: "15. Как осуществить свои права",
        t: `Отправьте запрос на ${DPO_EMAIL} или почтой по адресу ${ADDR_RU}. Мы отвечаем без необоснованной задержки и не позднее чем через месяц; в сложных случаях или при большом числе запросов срок может быть продлён ещё на два месяца — мы сообщим об этом в течение первого месяца и объясним причину. Мы можем запросить только сведения, строго необходимые для подтверждения вашей личности, соразмерно запросу и чувствительности данных; копию документа, удостоверяющего личность, мы не требуем, если личность можно подтвердить иначе.`,
      },
      {
        h: "16. Автоматизированные процессы",
        t: "(а) Расчёт стоимости: калькулятор на сайте автоматически оценивает стоимость услуг по введённым вами данным. Результат лишь ориентировочный, не порождает для вас юридических последствий, а окончательное предложение подтверждает специалист. Подробнее о логике расчёта — в Политике конфиденциальности сайта. (б) Проверка по санкционным спискам: в соответствии с законодательством о предотвращении отмывания денег и финансирования терроризма мы автоматически проверяем потенциальных клиентов, их администраторов и бенефициарных собственников по международным санкционным спискам, спискам политически значимых лиц и другим соответствующим базам. Любое совпадение рассматривает специалист до принятия решения о деловых отношениях; мы не отказываем клиенту только на основании автоматического результата. Вы вправе потребовать участия специалиста, высказать свою позицию и оспорить решение. Данные, используемые в этих процессах, доступны только уполномоченным лицам и хранятся лишь столько, сколько нужно для цели.",
        link: { section: "privacy", label: "Политика конфиденциальности сайта" },
      },
      {
        h: "17. Данные детей",
        t: "Мы намеренно не собираем данные детей, не нужные для услуги. Когда мы обрабатываем такие данные, например в кадровых делах клиентов, мы применяем дополнительные меры защиты и проверяем правовое основание.",
      },
      {
        h: "18. Нарушения безопасности данных",
        t: "У нас есть внутренняя процедура выявления, оценки и документирования инцидентов. Если инцидент может создать риск для прав людей, мы уведомляем Национальный центр по защите персональных данных, как правило в течение 72 часов, а при высоком риске сообщаем и пострадавшим. Мы выясняем причину, ограничиваем последствия и принимаем меры, чтобы инцидент не повторился.",
      },
      {
        h: "19. Изменения политики",
        t: "Мы обновляем политику при изменении законодательства, услуг, технологий, поставщиков или операций по обработке. Дата последнего обновления указана выше. Если изменение существенно меняет то, как мы обрабатываем ваши данные, мы сообщим вам по доступным каналам связи.",
      },
    ],
    questionsTitle: "Вопросы о ваших данных?",
    questionsBody: `Напишите нам на ${DPO_EMAIL}. По другим вопросам — ${EMAIL} или ${PHONE}.`,
    questionsEmail: DPO_EMAIL,
    questionsBtn: "Связаться с нами",
  },
  en: {
    title: "Data Protection Policy",
    lastUpdated: "Last updated",
    updated: "October 24, 2026",
    sections: [
      {
        h: "1. Who we are",
        t: `${LEGAL_NAME} (S.R.L. "RIGHT CONSULT COMPANY", IDNO 1022600002005), located at ${ADDR_EN}, is the controller of personal data whenever it decides the purposes and means of processing. General contact: ${EMAIL}, ${PHONE}. For any question about personal data and to exercise your rights, write to ${DPO_EMAIL}. We have not appointed a data protection officer (DPO), as the law does not currently require us to; requests sent to that address are handled by the person we have designated internally to coordinate compliance.`,
      },
      {
        h: "2. About this policy",
        t: "This policy explains, briefly and in plain terms, how we collect, use, share, keep, protect and delete the data of the people we work with. It is supplemented by specific notices for particular services or channels. For the site's forms, analytics and cookies, see the website Privacy Policy. Where a specific notice describes a purpose, retention period, recipient or transfer more precisely, it applies together with this policy.",
        link: { section: "privacy", label: "Website Privacy Policy" },
      },
      {
        h: "3. Whose data we process",
        t: "Depending on the activity: clients and prospective clients; clients' representatives and employees; counterparties and their representatives; other people involved in the matters we handle; suppliers and their representatives; job candidates; employees and contractors; people who contact us; visitors to our website.",
      },
      {
        h: "4. What data we process",
        t: "Depending on the relationship: first and last name; IDNP and identity document details, where needed; address, phone, email; job title and signature; professional, contractual and financial information; correspondence; documents received to deliver the service; information about disputes and other proceedings; technical and security data. We process special categories of data or criminal records data only where the service requires it and there is a legal basis. We don't ask for data we don't need; if a document we receive contains extra data, we use it only as far as the file or our legal obligations require.",
      },
      {
        h: "5. Why we process data",
        t: "(a) To answer requests and prepare offers. (b) To enter into and perform contracts and deliver accounting, legal and consulting services. (c) To manage client files and communicate with clients and others involved. (d) To meet legal obligations, including accounting, tax, and anti-money laundering and counter-terrorist financing requirements. (e) To defend our rights and legitimate interests. (f) To keep our systems secure and prevent fraud and unauthorised access. (g) To handle requests from data subjects. (h) Recruitment. If we want to use data for a new purpose that is incompatible with the original one, we first check that we have a legal basis and tell you beforehand.",
      },
      {
        h: "6. Legal bases",
        t: "We set a separate legal basis for each purpose: pre-contractual steps for requests and offers; performance of a contract for the services we deliver; legal obligation for bookkeeping, tax reporting and anti-money laundering checks; our legitimate interest for security, fraud prevention and defending our rights, in which case you can object to the processing; your consent where no more suitable basis exists, for example to keep your CV for future vacancies or for website analytics. For special categories of data we also identify one of the conditions set by law. The fact that information is public doesn't mean we can use it for any purpose.",
      },
      {
        h: "7. Consent",
        t: "We don't ask for consent when another legal basis is more appropriate. When we rely on consent, we ask for it separately for each purpose; you can refuse without undue consequences and withdraw it at any time, as easily as you gave it. Withdrawal doesn't affect the lawfulness of earlier processing. After you withdraw, we stop the processing based on consent unless another legal basis applies, which we will tell you about.",
      },
      {
        h: "8. Where we get data from",
        t: "Directly from you; from the client who ordered the service; from representatives; from the documents in a file; from public authorities; from registers and public sources; from counterparties; from suppliers or partners, where the transfer is lawful. We don't use every source for every file, only those relevant to the purpose. When data doesn't come from you, we inform you within the time limits set by law, subject to the legal exceptions.",
      },
      {
        h: "9. Who we share data with",
        t: "Only as far as necessary: authorised employees and contractors; lawyers, consultants, experts and translators; public authorities, courts, notaries and bailiffs; financial institutions; accountants and auditors; IT, cloud and email providers; others only where sharing is necessary and has a legal basis. Each recipient gets only the data its role requires. We don't sell personal data.",
      },
      {
        h: "10. Providers processing data on our behalf",
        t: "We choose only providers that give sufficient guarantees of security and compliance, and we govern the relationship through a contract and written instructions. We assess the nature of the service, security measures, confidentiality, sub-processors, processing locations, incident handling and data deletion. For email and collaboration we use professional services such as Google Workspace (Gmail, Google Drive). Access to documents is granted to named people, public sharing of documents containing personal data is disabled, and employees' personal accounts aren't used for work files.",
      },
      {
        h: "11. International transfers",
        t: "If data goes to a country outside the European Economic Area or to an international organisation, including when a provider can access it from there, we first check for a mechanism provided by Law No. 195/2024: an adequacy decision, appropriate safeguards such as suitable contractual clauses, binding corporate rules or, only in limited cases, a legal derogation. You can ask us about the safeguards applied to a transfer that concerns you.",
      },
      {
        h: "12. How long we keep data",
        t: "Only as long as needed for the purpose, the contract, legal obligations, a proceeding or defending a right. As a guide: requests and offers that don't lead to a contract, 12 months; client files, for the duration of the contract, and accounting and tax documents for 10 years after it ends, as the law requires; data collected for anti-money laundering purposes, for the period set by that legislation; CVs of candidates we didn't hire, 6 months, or up to 12 months if you agree to be contacted about other roles; security logs, 6–12 months. If data is needed for a dispute, inspection or investigation, we suspend deletion of the relevant data only, until the reason ends. When the period ends, data is deleted, destroyed or anonymised.",
      },
      {
        h: "13. How we protect data",
        t: "We apply technical and organisational measures in proportion to the risk: role-based, need-to-know access control, two-factor authentication, encryption, strong passwords, backups, access logging, device protection, staff training, confidentiality undertakings and an internal incident procedure. We review these measures regularly and withdraw access when it is no longer needed.",
      },
      {
        h: "14. Your rights",
        t: "Under Law No. 195/2024 you have the right to information, access, rectification, erasure, restriction of processing, portability and objection, rights regarding automated individual decisions, the right to withdraw consent, the right to lodge a complaint with the National Center for Personal Data Protection and the right to go to court. These rights aren't absolute; if we can't fully grant a request, we'll explain why.",
      },
      {
        h: "15. How to exercise your rights",
        t: `Send your request to ${DPO_EMAIL} or by post to ${ADDR_EN}. We reply without undue delay and within one month; for complex requests or when we receive many, this may be extended by up to two more months, in which case we'll tell you within the first month and explain why. We may ask only for the information strictly needed to verify your identity, in proportion to the request and the sensitivity of the data; we don't ask for a copy of your ID if your identity can be confirmed another way.`,
      },
      {
        h: "16. Automated processes",
        t: "(a) Price estimates: the calculator on our website automatically estimates the cost of our services from the data you enter. The result is only indicative, has no legal effect on you, and the final offer is confirmed by a specialist. The calculation logic is described in the website Privacy Policy. (b) Sanctions screening: under anti-money laundering and counter-terrorist financing legislation, we automatically check prospective clients, their directors and beneficial owners against international sanctions lists, lists of politically exposed persons and other relevant databases. Any match is reviewed by a specialist before a decision on the business relationship is made; we don't turn a client away based on the automated result alone. You have the right to ask for a specialist to step in, to express your point of view and to contest the decision. Data used in these processes is available only to authorised people and kept only as long as the purpose requires.",
        link: { section: "privacy", label: "Website Privacy Policy" },
      },
      {
        h: "17. Children's data",
        t: "We don't knowingly collect children's data that the service doesn't need. When we do process such data, for example in clients' personnel files, we apply additional safeguards and check the legal basis.",
      },
      {
        h: "18. Personal data breaches",
        t: "We have an internal procedure to identify, assess and document incidents. If an incident may create a risk to people's rights, we notify the National Center for Personal Data Protection, as a rule within 72 hours, and if the risk is high we also inform the people affected. We investigate the cause, limit the impact and take steps so it doesn't happen again.",
      },
      {
        h: "19. Changes to this policy",
        t: "We update this policy when the law, our services, technologies, providers or processing activities change. The date of the last update is shown above. If a change significantly affects how we process your data, we'll let you know through the communication channels we have with you.",
      },
    ],
    questionsTitle: "Questions About Your Data?",
    questionsBody: `Write to us at ${DPO_EMAIL}. For anything else, reach us at ${EMAIL} or ${PHONE}.`,
    questionsEmail: DPO_EMAIL,
    questionsBtn: "Contact Us",
  },
};
