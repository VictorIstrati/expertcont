import { useState } from "react";
import { Button, Container, Icon, PageHeader } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";

export interface ContactIslandProps {
  locale: Locale;
  homeLabel?: string;
  contactLabel?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /* form labels */
  labelName: string;
  labelEmail: string;
  labelPhone: string;
  labelCompany: string;
  labelService: string;
  labelMessage: string;
  labelSend: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderCompany: string;
  placeholderMessage: string;
  formTitle: string;
  formSubtitle: string;
  successTitle: string;
  successSub: string;
  /* sidebar */
  labelOffice: string;
  address: string;
  phone: string;
  email: string;
  labelHours: string;
  hours: string;
  labelAvailable: string;
  labelBook: string;
  bookHref: string;
  /* channels */
  channelsTitle: string;
  /* services list for select */
  services: { value: string; label: string }[];
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const HOME_LABELS: Record<Locale, string> = { ro: "Acasă", ru: "Главная", en: "Home" };
const CONTACT_LABELS: Record<Locale, string> = { ro: "Contact", ru: "Контакты", en: "Contact" };

function ContactInner(props: ContactIslandProps) {
  const {
    locale,
    homeLabel,
    contactLabel,
    eyebrow,
    title,
    subtitle,
    labelName,
    labelEmail,
    labelPhone,
    labelCompany,
    labelService,
    labelMessage,
    labelSend,
    placeholderName,
    placeholderEmail,
    placeholderPhone,
    placeholderCompany,
    placeholderMessage,
    formTitle,
    formSubtitle,
    successTitle,
    successSub,
    labelOffice,
    address,
    phone,
    email,
    labelHours,
    hours,
    labelAvailable,
    labelBook,
    bookHref,
    channelsTitle,
    services,
  } = props;

  const homeHref = locale === "ro" ? "/" : `/${locale}`;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: services[0]?.value ?? "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("[ContactForm] submission", form);
    setSent(true);
  }

  return (
    <main>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: homeLabel ?? HOME_LABELS[locale], href: homeHref },
          { label: contactLabel ?? CONTACT_LABELS[locale] },
        ]}
      />

      {/* Main 2-column */}
      <section className="section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
            {/* Left: form */}
            <div className="card p-6 sm:p-10">
              <h3 className="mb-2">{formTitle}</h3>
              <p className="text-text-secondary text-sm mb-8">{formSubtitle}</p>

              {sent ? (
                <div className="p-8 bg-primary-50 rounded-md text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" size={26} stroke={3} />
                  </div>
                  <h4 className="mb-2">{successTitle}</h4>
                  <p className="text-text-secondary text-sm">{successSub}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label className="block text-sm font-semibold mb-2">
                        {labelName} *
                      </label>
                      <input
                        className="input"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={placeholderName}
                      />
                    </div>
                    <div className="field">
                      <label className="block text-sm font-semibold mb-2">
                        {labelEmail} *
                      </label>
                      <input
                        className="input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={placeholderEmail}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label className="block text-sm font-semibold mb-2">{labelPhone}</label>
                      <input
                        className="input"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={placeholderPhone}
                      />
                    </div>
                    <div className="field">
                      <label className="block text-sm font-semibold mb-2">
                        {labelCompany}
                      </label>
                      <input
                        className="input"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={placeholderCompany}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="block text-sm font-semibold mb-2">{labelService}</label>
                    <select
                      className="select"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      {services.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label className="block text-sm font-semibold mb-2">
                      {labelMessage} *
                    </label>
                    <textarea
                      className="textarea"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={placeholderMessage}
                    />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {locale === "ru"
                      ? "Отправляя форму, вы соглашаетесь с обработкой данных согласно GDPR и нашей "
                      : locale === "en"
                        ? "By submitting the form you agree to data processing per GDPR and our "
                        : "Prin trimiterea formularului ești de acord cu prelucrarea datelor conform GDPR și "}
                    <a
                      href={
                        locale === "ro"
                          ? "/confidentialitate"
                          : `/${locale}/${locale === "ru" ? "konfidentsialnost" : "privacy"}`
                      }
                      className="text-primary underline"
                    >
                      {locale === "ru"
                        ? "Политикой конфиденциальности"
                        : locale === "en"
                          ? "Privacy Policy"
                          : "Politica de confidențialitate"}
                    </a>
                    .
                  </p>
                  <Button variant="primary" size="lg" type="submit" iconRight="send">
                    {labelSend}
                  </Button>
                </form>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col gap-5">
              {/* Office */}
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-primary-50 text-primary flex items-center justify-center">
                    <Icon name="map-pin" size={18} />
                  </span>
                  <h4 className="m-0">{labelOffice}</h4>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{address}</p>
                <a
                  href="https://maps.google.com/?q=Chișinău+Mitropolit+Varlaam+65"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm text-primary font-semibold"
                >
                  Deschide în Maps <Icon name="arrow-up-right" size={14} />
                </a>
              </div>

              {/* Phone & Email */}
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-accent-50 text-accent-dark flex items-center justify-center">
                    <Icon name="phone" size={18} />
                  </span>
                  <h4 className="m-0">Telefon & Email</h4>
                </div>
                <div className="flex flex-col gap-2 text-base font-semibold">
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-primary"
                  >
                    {phone}
                  </a>
                  <a href={`mailto:${email}`} className="text-primary">
                    {email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-primary-50 text-primary flex items-center justify-center">
                    <Icon name="clock" size={18} />
                  </span>
                  <h4 className="m-0">{labelHours}</h4>
                </div>
                <p className="text-sm text-text-secondary">{hours}</p>
                <div className="mt-3 inline-flex items-center gap-2 py-2 px-3 bg-[rgba(16,185,129,0.1)] text-[#10B981] rounded-pill text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  {labelAvailable}
                </div>
              </div>

              {/* Map (stylized fake map with pin) */}
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-bg-section-alt">
                <div className="dot-pattern-bg absolute inset-0 opacity-50" />
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path d="M0 80 L400 100" stroke="var(--border-strong)" strokeWidth="3" />
                  <path d="M0 180 L400 200" stroke="var(--border-strong)" strokeWidth="3" />
                  <path d="M120 0 L130 300" stroke="var(--border-strong)" strokeWidth="3" />
                  <path d="M280 0 L290 300" stroke="var(--border-strong)" strokeWidth="3" />
                  <path
                    d="M50 0 L60 300"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <path
                    d="M350 0 L355 300"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                  <div className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-xs font-bold text-[#1A1A2E] shadow-md">
                    ExpertCont
                  </div>
                  <div className="h-0 w-0 border-x-8 border-t-[10px] border-x-transparent border-t-accent" />
                </div>
              </div>

              {/* Book consult */}
              <div className="card p-8 bg-primary-deep text-white relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 border border-[rgba(223,183,65,0.3)] rounded-full" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-sm bg-[rgba(223,183,65,0.15)] text-[#DFB741] flex items-center justify-center">
                      <Icon name="calendar" size={18} />
                    </span>
                    <span className="text-xs font-bold text-[#DFB741] tracking-widest">
                      PROGRAMARE
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Sau programează direct o consultație gratuită de 30 minute.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    href={bookHref}
                    icon="calendar"
                    className="w-full justify-center"
                  >
                    {labelBook}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Alternative channels strip */}
      <section className="section section-alt">
        <Container>
          <h3 className="text-center mb-8">{channelsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "whatsapp" as const,
                label: "WhatsApp",
                value: phone,
                href: `https://wa.me/${phone.replace(/[^0-9]/g, "")}`,
                color: "#25D366",
              },
              {
                icon: "send" as const,
                label: "Telegram",
                value: "@expertcont",
                href: "https://t.me/expertcont",
                color: "#2AABEE",
              },
              {
                icon: "mail" as const,
                label: "Email",
                value: email,
                href: `mailto:${email}`,
                color: "var(--color-primary)",
              },
            ].map((ch, i) => (
              <a
                key={i}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover p-6 flex items-center gap-4 no-underline text-inherit"
              >
                <span
                  className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${ch.color}18`, color: ch.color }}
                >
                  <Icon name={ch.icon} size={22} />
                </span>
                <div>
                  <div className="text-sm font-bold text-text-secondary mb-1">
                    {ch.label}
                  </div>
                  <div className="text-sm font-semibold">{ch.value}</div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export function ContactIsland(props: ContactIslandProps) {
  return (
    <I18nRoot locale={props.locale}>
      <ContactInner {...props} />
    </I18nRoot>
  );
}
