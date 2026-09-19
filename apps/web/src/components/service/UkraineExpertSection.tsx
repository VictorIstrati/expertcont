import { Button, Icon } from "@expertcont/ui";
import { openModal } from "../../lib/modalBus";
import { personJsonLd } from "../../lib/jsonLd";
import { UKRAINE_BOOKING_SLUG, type PageLocale } from "./ukraineCatalogue";

interface Props {
  locale: PageLocale;
}

interface ExpertCopy {
  heading: string;
  role: string;
  bio: string;
  stats: { value: string; label: string }[];
  areasHeading: string;
  areas: string[];
  languagesLabel: string;
  languages: string;
  cta: string;
}

const NAME = "Danylo Nedvetskyi";
const INITIALS = "DN";

const COPY: Record<PageLocale, ExpertCopy> = {
  ro: {
    heading: "Cine vă preia cazul",
    role: "Jurist · drept internațional și al migrației",
    bio: "Jurist cu peste șase ani de experiență în drept internațional și al migrației, absolvent al programului Advanced LL.M. al Universității din Leiden. A oferit peste 2.500 de consultații individuale cetățenilor Ucrainei aflați în străinătate. Vorbește ucraineană, engleză și rusă, așa că vă puteți explica situația în limba care vă este cea mai comodă.",
    stats: [
      { value: "6+", label: "ani de practică în drept internațional și al migrației" },
      { value: "2.500+", label: "consultații individuale pentru cetățeni ai Ucrainei" },
      { value: "LL.M.", label: "Advanced LL.M., Universitatea din Leiden" },
    ],
    areasHeading: "Domenii de practică",
    areas: [
      "Proceduri consulare și pașapoarte",
      "Serviciile publice digitale ale Ucrainei (Diia)",
      "Plata pensiilor ucrainene în străinătate",
      "Acte de stare civilă și certificate de arhivă",
      "Cauze de familie în instanțele din Ucraina",
      "Dreptul de ședere în Moldova",
    ],
    languagesLabel: "Limbi",
    languages: "ucraineană · engleză · rusă",
    cta: "Programează o consultație",
  },
  ru: {
    heading: "Кто ведёт ваш вопрос",
    role: "Юрист · международное и миграционное право",
    bio: "Юрист с опытом более шести лет в международном и миграционном праве, выпускник программы Advanced LL.M. Лейденского университета. Провёл более 2 500 индивидуальных консультаций для граждан Украины за рубежом. Говорит на украинском, английском и русском, так что объяснить ситуацию можно на удобном вам языке.",
    stats: [
      { value: "6+", label: "лет практики в международном и миграционном праве" },
      { value: "2 500+", label: "индивидуальных консультаций для граждан Украины" },
      { value: "LL.M.", label: "Advanced LL.M., Лейденский университет" },
    ],
    areasHeading: "Направления практики",
    areas: [
      "Консульские процедуры и паспорта",
      "Цифровые госуслуги Украины (Дія)",
      "Выплата украинских пенсий за рубежом",
      "Акты гражданского состояния и архивные справки",
      "Семейные дела в судах Украины",
      "Право на проживание в Молдове",
    ],
    languagesLabel: "Языки",
    languages: "украинский · английский · русский",
    cta: "Записаться на консультацию",
  },
  en: {
    heading: "Who handles your case",
    role: "Lawyer · international and migration law",
    bio: "A lawyer with more than six years of experience in international and migration law, and a graduate of the Advanced LL.M. at Leiden University. He has given over 2,500 one-to-one consultations to Ukrainian citizens living abroad. He speaks Ukrainian, English and Russian, so you can explain your situation in whichever language is easiest for you.",
    stats: [
      { value: "6+", label: "years in international and migration law" },
      { value: "2,500+", label: "one-to-one consultations for Ukrainian citizens" },
      { value: "LL.M.", label: "Advanced LL.M., Leiden University" },
    ],
    areasHeading: "Areas of practice",
    areas: [
      "Consular procedures and passports",
      "Ukraine's digital public services (Diia)",
      "Ukrainian pension payments abroad",
      "Civil status records and archival certificates",
      "Family cases before Ukrainian courts",
      "Residence status in Moldova",
    ],
    languagesLabel: "Languages",
    languages: "Ukrainian · English · Russian",
    cta: "Book a consultation",
  },
  uk: {
    heading: "Хто веде вашу справу",
    role: "Юрист · міжнародне та міграційне право",
    bio: "Юрист із понад шестирічним досвідом у міжнародному та міграційному праві, випускник програми Advanced LL.M. Лейденського університету. Провів понад 2 500 індивідуальних консультацій для громадян України за кордоном. Говорить українською, англійською та російською, тож пояснити свою ситуацію можна мовою, якою вам зручніше.",
    stats: [
      { value: "6+", label: "років практики в міжнародному та міграційному праві" },
      { value: "2 500+", label: "індивідуальних консультацій для громадян України" },
      { value: "LL.M.", label: "Advanced LL.M., Лейденський університет" },
    ],
    areasHeading: "Напрями практики",
    areas: [
      "Консульські процедури та паспорти",
      "Цифрові державні послуги України (Дія)",
      "Отримання української пенсії за кордоном",
      "Акти цивільного стану та архівні довідки",
      "Сімейні справи в судах України",
      "Право на проживання в Молдові",
    ],
    languagesLabel: "Мови",
    languages: "українська · англійська · російська",
    cta: "Записатися на консультацію",
  },
};

export function ukraineExpertJsonLd(locale: PageLocale, url: string) {
  const t = COPY[locale];
  return personJsonLd({
    name: NAME,
    jobTitle: t.role,
    description: t.bio,
    alumniOf: "Leiden University",
    knowsLanguage: ["uk", "en", "ru"],
    knowsAbout: t.areas,
    url,
  });
}

export function UkraineExpertSection({ locale }: Props) {
  const t = COPY[locale];

  return (
    <section className="mb-14">
      <h2 className="text-4xl mb-6">{t.heading}</h2>

      <div className="rounded-lg border border-border bg-bg-card p-5 md:p-8 flex flex-col gap-7">
        <div className="flex items-center gap-5">
          <div
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary dark:to-primary-deep text-2xl font-bold text-white"
          >
            {INITIALS}
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl mb-1">{NAME}</h3>
            <p className="text-base text-text-secondary">{t.role}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary">
              <Icon name="globe" size={15} />
              <span>
                <span className="font-semibold text-text-primary">{t.languagesLabel}:</span>{" "}
                {t.languages}
              </span>
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed">{t.bio}</p>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 m-0">
          {t.stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-1 rounded-md bg-primary-50 p-4">
              <dt className="text-3xl font-bold leading-none text-primary tabular-nums">
                {stat.value}
              </dt>
              <dd className="m-0 mt-1 text-sm leading-snug text-text-secondary">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h4 className="text-lg mb-3">{t.areasHeading}</h4>
          <ul className="list-none p-0 m-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {t.areas.map((area) => (
              <li key={area} className="flex items-start gap-3 text-base leading-relaxed">
                <span className="text-accent shrink-0 mt-1">
                  <Icon name="check" size={15} stroke={2.5} />
                </span>
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Button
            variant="secondary"
            icon="calendar"
            onClick={() => openModal("booking", { service: UKRAINE_BOOKING_SLUG })}
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
