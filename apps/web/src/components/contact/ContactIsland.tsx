import { useId, useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import { Button, Container, Icon, PageHeader } from "@expertcont/ui";
import { I18nRoot, sectionUrl } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import { backendClient, detectLanguage } from "../../lib/backend";
import { OfficeMap } from "./OfficeMap";

export interface ContactIslandProps {
  locale: Locale;
  /** Office street address line (locale-specific copy). */
  address: string;
  phone: string;
  email: string;
  /** Working-hours string, e.g. "Luni–Vineri, 9:00–18:00". */
  hours: string;
  /** Office GPS coordinates for the embedded map + nav links. */
  geo: { latitude: number; longitude: number };
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

function useServiceOptions(): { value: string; label: string }[] {
  const { t } = useLingui();
  return [
    { value: "contabilitate", label: t`Contabilitate & evidență` },
    { value: "fiscal", label: t`Consultanță fiscală` },
    { value: "juridic", label: t`Servicii juridice` },
    {
      value: "hr",
      label: t({
        message: `Resurse umane`,
        comment:
          "Contact form 'subject' option for HR-related inquiries (literally 'human resources').",
      }),
    },
    { value: "it", label: t`IT Consulting` },
    { value: "altele", label: t`Altele` },
  ];
}

function ContactInner({ locale, address, phone, email, hours, geo }: ContactIslandProps) {
  const { t } = useLingui();
  const homeHref = locale === "ro" ? "/" : `/${locale}`;
  const services = useServiceOptions();
  const privacyHref = sectionUrl("privacy", locale);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const companyId = useId();
  const serviceId = useId();
  const messageId = useId();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: services[0]?.value ?? "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    const serviceLabel = services.find((s) => s.value === form.service)?.label ?? form.service;
    const result = await backendClient.submitContact({
      language: detectLanguage(form.message, locale),
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      subject: serviceLabel,
      message: form.message,
      source_url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      setSent(true);
    } else {
      setErrorMsg(result.error);
    }
  }

  return (
    <main>
      <PageHeader
        eyebrow={t`CONTACT`}
        title={t`Hai să discutăm`}
        subtitle={t`Suntem disponibili pentru o consultație gratuită. Completați formularul sau folosiți una dintre căile rapide de mai jos.`}
        breadcrumbs={[{ label: t`Acasă`, href: homeHref }, { label: t`Contact` }]}
      />

      <section className="section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
            <div className="card p-6 sm:p-10">
              <h3 className="mb-2">
                <Trans>Scrie-ne un mesaj</Trans>
              </h3>
              <p className="text-text-secondary text-sm mb-8">
                <Trans>Vom reveni în maximum 4 ore în zile lucrătoare.</Trans>
              </p>

              {sent ? (
                <div className="p-8 bg-primary-50 rounded-md text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" size={26} stroke={3} />
                  </div>
                  <h4 className="mb-2">
                    <Trans>Mesaj trimis cu succes!</Trans>
                  </h4>
                  <p className="text-text-secondary text-sm">
                    <Trans>
                      Vom reveni cât mai curând posibil. Mulțumim pentru mesaj!
                    </Trans>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor={nameId} className="block text-sm font-semibold mb-2">
                        <Trans>Nume</Trans> *
                      </label>
                      <input
                        id={nameId}
                        className="input"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t({
                          message: `Ion Popescu`,
                          comment:
                            "Placeholder text inside the contact form 'Name' field. Common Moldovan name — transliterate (e.g. RU 'Ион Попеску'), don't replace.",
                        })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={emailId} className="block text-sm font-semibold mb-2">
                        <Trans>Email</Trans> *
                      </label>
                      <input
                        id={emailId}
                        className="input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t({
                          message: `ion@firma.md`,
                          comment:
                            "Placeholder text inside the contact form 'Email' field. Sample address — use a locale-appropriate example domain.",
                        })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor={phoneId} className="block text-sm font-semibold mb-2">
                        <Trans>Telefon</Trans>
                      </label>
                      <input
                        id={phoneId}
                        className="input"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={t({
                          message: `+373 ...`,
                          comment:
                            "Placeholder text inside the contact form 'Phone' field (Moldova country code +373). Keep as-is in every locale.",
                        })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={companyId} className="block text-sm font-semibold mb-2">
                        <Trans>Companie</Trans>
                      </label>
                      <input
                        id={companyId}
                        className="input"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={t({
                          message: `Firma SRL`,
                          comment:
                            "Placeholder text inside the contact form 'Company' field. Use a local sample form: EN 'Acme LLC', RU 'ООО «Компания»'.",
                        })}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor={serviceId} className="block text-sm font-semibold mb-2">
                      <Trans>Subiect / Serviciu</Trans>
                    </label>
                    <select
                      id={serviceId}
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
                    <label htmlFor={messageId} className="block text-sm font-semibold mb-2">
                      <Trans>Mesaj</Trans> *
                    </label>
                    <textarea
                      id={messageId}
                      className="textarea"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t`Spune-ne pe scurt despre afacerea ta...`}
                    />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <Trans>
                      Prin trimiterea formularului ești de acord cu prelucrarea datelor conform GDPR
                      și{" "}
                      <a href={privacyHref} className="text-primary underline">
                        Politica de confidențialitate
                      </a>
                      .
                    </Trans>
                  </p>
                  {errorMsg ? (
                    <p role="alert" className="text-sm text-[#B91C1C]">
                      {errorMsg}
                    </p>
                  ) : null}
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    iconRight="send"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <Trans>Se trimite…</Trans>
                    ) : (
                      <Trans>Trimite mesajul</Trans>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <img
                src="/contact-office.webp"
                alt={t({
                  message: `Biroul ExpertCont · Chișinău`,
                  comment: "Alt text for the office photo on the contact page.",
                })}
                width="1448"
                height="1086"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-lg object-cover aspect-[4/3]"
              />
              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-primary-50 text-primary flex items-center justify-center">
                    <Icon name="map-pin" size={18} />
                  </span>
                  <h4 className="m-0">
                    <Trans>Biroul nostru</Trans>
                  </h4>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{address}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary"
                  >
                    <Trans>Deschide în Google Maps</Trans>{" "}
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                  <a
                    href={`https://www.waze.com/ul?ll=${geo.latitude},${geo.longitude}&navigate=yes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary"
                  >
                    <Trans>Deschide în Waze</Trans> <Icon name="arrow-up-right" size={14} />
                  </a>
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-accent-50 text-accent-dark flex items-center justify-center">
                    <Icon name="phone" size={18} />
                  </span>
                  <h4 className="m-0">
                    <Trans>Telefon & Email</Trans>
                  </h4>
                </div>
                <div className="flex flex-col gap-2 text-base font-semibold">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-primary">
                    {phone}
                  </a>
                  <a href={`mailto:${email}`} className="text-primary">
                    {email}
                  </a>
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-sm bg-primary-50 text-primary flex items-center justify-center">
                    <Icon name="clock" size={18} />
                  </span>
                  <h4 className="m-0">
                    <Trans>Program de lucru</Trans>
                  </h4>
                </div>
                <p className="text-sm text-text-secondary">{hours}</p>
                <div className="mt-3 inline-flex items-center gap-2 py-2 px-3 bg-[rgba(16,185,129,0.1)] text-[#10B981] rounded-pill text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <Trans>Disponibil acum</Trans>
                </div>
              </div>

              <OfficeMap
                latitude={geo.latitude}
                longitude={geo.longitude}
                address={address}
                label={t`Biroul ExpertCont`}
              />

              <div className="card p-8 bg-primary dark:bg-primary-deep text-white relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 border border-[rgba(223,183,65,0.3)] rounded-full" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-sm bg-[rgba(223,183,65,0.15)] text-[#DFB741] flex items-center justify-center">
                      <Icon name="calendar" size={18} />
                    </span>
                    <span className="text-xs font-bold text-[#DFB741] tracking-widest">
                      <Trans>PROGRAMARE</Trans>
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    <Trans>Sau programează direct o consultație gratuită de 30 minute.</Trans>
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openModal("booking")}
                    icon="calendar"
                    className="w-full justify-center"
                  >
                    <Trans>Programează consultație gratuită</Trans>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-alt">
        <Container>
          <h3 className="text-center mb-8">
            <Trans>Contactează-ne rapid</Trans>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "whatsapp" as const,
                label: "WhatsApp",
                value: phone,
                href: `https://wa.me/${phone.replace(/[^0-9]/g, "")}`,
                tone: "channel-whatsapp",
              },
              {
                icon: "send" as const,
                label: "Telegram",
                value: "@expertcont",
                href: "https://t.me/expertcont",
                tone: "channel-telegram",
              },
              {
                icon: "mail" as const,
                label: t`Email`,
                value: email,
                href: `mailto:${email}`,
                tone: "channel-email",
              },
            ].map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`channel-card ${ch.tone} card card-hover p-6 flex items-center gap-4 no-underline text-inherit`}
              >
                <span className="channel-icon w-11 h-11 rounded-md flex items-center justify-center shrink-0">
                  <Icon name={ch.icon} size={22} />
                </span>
                <div>
                  <div className="text-sm font-bold text-text-secondary mb-1">{ch.label}</div>
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
