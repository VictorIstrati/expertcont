import { useState } from "react";
import { Accordion, Button, Container, Icon, PageHeader, Section } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

const TOPICS: Record<Locale, { v: string; l: string }[]> = {
  ro: [
    { v: "general", l: "General" },
    { v: "contabilitate", l: "Contabilitate" },
    { v: "juridic", l: "Juridic" },
    { v: "hr", l: "HR" },
    { v: "pricing", l: "Prețuri & Contract" },
    { v: "securitate", l: "Securitate & GDPR" },
  ],
  ru: [
    { v: "general", l: "Общее" },
    { v: "contabilitate", l: "Бухгалтерия" },
    { v: "juridic", l: "Юридические" },
    { v: "hr", l: "HR" },
    { v: "pricing", l: "Цены и договор" },
    { v: "securitate", l: "Безопасность и GDPR" },
  ],
  en: [
    { v: "general", l: "General" },
    { v: "contabilitate", l: "Accounting" },
    { v: "juridic", l: "Legal" },
    { v: "hr", l: "HR" },
    { v: "pricing", l: "Pricing & contract" },
    { v: "securitate", l: "Security & GDPR" },
  ],
};

const RESPONSE_LABEL: Record<
  Locale,
  {
    eyebrow: string;
    phone: string;
    email: string;
    response: string;
    responseVal: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderQuestion: string;
  }
> = {
  ro: {
    eyebrow: "Telefon",
    phone: "Telefon",
    email: "Email",
    response: "Răspuns",
    responseVal: "în maxim 4 ore (L–V)",
    placeholderName: "Ion Popescu",
    placeholderEmail: "ion@firma.md",
    placeholderQuestion:
      "Descrie întrebarea ta în câteva propoziții — cu cât mai concret, cu atât răspundem mai precis.",
  },
  ru: {
    eyebrow: "Телефон",
    phone: "Телефон",
    email: "Email",
    response: "Ответ",
    responseVal: "не более 4 часов (Пн–Пт)",
    placeholderName: "Иван Петров",
    placeholderEmail: "ivan@firma.md",
    placeholderQuestion:
      "Опишите ваш вопрос в нескольких предложениях — чем конкретнее, тем точнее ответ.",
  },
  en: {
    eyebrow: "Phone",
    phone: "Phone",
    email: "Email",
    response: "Response",
    responseVal: "under 4 hours (Mon–Fri)",
    placeholderName: "John Smith",
    placeholderEmail: "john@company.md",
    placeholderQuestion:
      "Describe your question in a few sentences — the more specific, the better the answer.",
  },
};

interface FaqGroup {
  cat: string;
  items: { q: string; a: string }[];
}

interface Props {
  locale: Locale;
  groups: FaqGroup[];
  categories: string[];
  searchPlaceholder: string;
  ctaTitle: string;
  ctaBtn: string;
  notFoundLabel: string;
  /* PageHeader content */
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  pageBreadcrumbHome: string;
  pageBreadcrumbCurrent: string;
  homeHref: string;
  /* FaqQuestionForm labels */
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  formNameLabel: string;
  formEmailLabel: string;
  formSubjectLabel: string;
  formQuestionLabel: string;
  formConsentLabel: string;
  formConsentLink: string;
  formSubmitLabel: string;
  formSentTitle: string;
  formSentBody: string;
  formSentReset: string;
  formContactPhone: string;
  formContactEmail: string;
  /* FinalCTA labels */
  finalEyebrow: string;
  finalTitle: string;
  finalSubtitle: string;
  finalPrimary: string;
  finalPhone: string;
}

export default function FaqPageIsland({
  locale,
  groups,
  categories,
  searchPlaceholder,
  notFoundLabel,
  pageEyebrow,
  pageTitle,
  pageSubtitle,
  pageBreadcrumbHome,
  pageBreadcrumbCurrent,
  homeHref,
  formEyebrow,
  formTitle,
  formBody,
  formNameLabel,
  formEmailLabel,
  formSubjectLabel,
  formQuestionLabel,
  formConsentLabel,
  formConsentLink,
  formSubmitLabel,
  formSentTitle,
  formSentBody,
  formSentReset,
  formContactPhone,
  formContactEmail,
  finalEyebrow,
  finalTitle,
  finalSubtitle,
  finalPrimary,
  finalPhone,
}: Props) {
  const [activeCat, setActiveCat] = useState(categories[0] ?? "Toate");
  const [query, setQuery] = useState("");

  const catFiltered =
    activeCat === categories[0] ? groups : groups.filter((g) => g.cat === activeCat);

  const q = query.trim().toLowerCase();
  const visibleGroups = q
    ? catFiltered
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length > 0)
    : catFiltered;

  const totalItems = visibleGroups.reduce((n, g) => n + g.items.length, 0);

  const topics = TOPICS[locale];
  const labels = RESPONSE_LABEL[locale];
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: topics[0]?.v ?? "general",
    question: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);
  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.question.trim().length >= 10 &&
    form.consent;

  const filtersActive = query.trim() !== "" || activeCat !== categories[0];
  const filterBar = (
    <div
      className={`mb-10 rounded-xl bg-bg-section-alt px-5 py-3 ${
        filtersActive ? "sticky top-nav-h z-20" : ""
      }`}
    >
      <div className="relative">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          className="w-full bg-transparent py-2 pl-10 pr-10 text-base text-text-primary placeholder:text-text-secondary focus:outline-none"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:bg-bg-card hover:text-text-primary"
            aria-label="Clear search"
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>
      <div className="mt-2 flex gap-1 overflow-x-auto border-t border-border pt-2 md:flex-wrap md:overflow-visible">
        {categories.map((c) => {
          const active = activeCat === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={pageEyebrow}
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={[
          { label: pageBreadcrumbHome, href: homeHref },
          { label: pageBreadcrumbCurrent },
        ]}
      />

      <Section tone="default">
        <Container>
          <div className="max-w-[860px]">
            {filterBar}
            {totalItems === 0 ? (
              <div className="py-16 text-center text-text-secondary">{notFoundLabel}</div>
            ) : (
              <div className="flex flex-col gap-16">
                {visibleGroups.map((g, i) => (
                  <div key={i}>
                    <h3 className="mb-8 flex items-center gap-3 text-2xl">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-50 text-sm font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {g.cat}
                    </h3>
                    <Accordion items={g.items} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <div className="faq-form-grid mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="eyebrow mb-4">{formEyebrow}</div>
              <h2 className="mb-4">{formTitle}</h2>
              <p className="text-base leading-relaxed text-text-secondary">{formBody}</p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  {
                    icon: "phone" as const,
                    label: labels.phone,
                    val: formContactPhone,
                    href: `tel:${formContactPhone.replace(/\s/g, "")}`,
                  },
                  {
                    icon: "mail" as const,
                    label: labels.email,
                    val: formContactEmail,
                    href: `mailto:${formContactEmail}`,
                  },
                  {
                    icon: "clock" as const,
                    label: labels.response,
                    val: labels.responseVal,
                    href: null,
                  },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg-card text-primary">
                      <Icon name={c.icon} size={14} />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="font-semibold text-primary hover:text-primary dark:hover:text-primary-deep"
                        >
                          {c.val}
                        </a>
                      ) : (
                        <div className="font-semibold text-text-primary">{c.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8">
              {sent ? (
                <div className="fade-in px-2 py-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                    <Icon name="check" size={28} stroke={2.5} />
                  </div>
                  <h3 className="mb-3">{formSentTitle}</h3>
                  <p className="mb-5 text-sm text-text-secondary">{formSentBody}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        topic: topics[0]?.v ?? "general",
                        question: "",
                        consent: false,
                      });
                    }}
                  >
                    {formSentReset}
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (canSubmit) setSent(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="field">
                      <label>{formNameLabel} *</label>
                      <input
                        className="input"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={labels.placeholderName}
                      />
                    </div>
                    <div className="field">
                      <label>{formEmailLabel} *</label>
                      <input
                        className="input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={labels.placeholderEmail}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>{formSubjectLabel}</label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => {
                        const active = form.topic === t.v;
                        return (
                          <button
                            key={t.v}
                            type="button"
                            onClick={() => setForm({ ...form, topic: t.v })}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              active
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-bg-section-alt text-text-primary hover:border-primary"
                            }`}
                          >
                            {t.l}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="field">
                    <label>{formQuestionLabel} *</label>
                    <textarea
                      className="textarea min-h-[100px]"
                      required
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      placeholder={labels.placeholderQuestion}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-text-secondary">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 accent-primary"
                    />
                    <span>
                      {formConsentLabel}{" "}
                      <a className="text-primary underline">{formConsentLink}</a>. *
                    </span>
                  </label>

                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    iconRight="send"
                    disabled={!canSubmit}
                    className={`self-start ${canSubmit ? "" : "cursor-not-allowed opacity-50"}`}
                  >
                    {formSubmitLabel}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <section className="relative overflow-hidden bg-primary dark:bg-primary-deep px-6 py-20 text-center">
        <div className="pointer-events-none absolute -top-24 -right-12 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-[400px] w-[400px] rounded-full border border-white/5" />
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-5 text-sm font-bold uppercase tracking-widest text-accent">
            {finalEyebrow}
          </div>
          <h2 className="mb-4 text-white">{finalTitle}</h2>
          <p className="mb-8 text-lg text-white/85">{finalSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              icon="calendar"
              onClick={() => openModal("booking")}
            >
              {finalPrimary}
            </Button>
            <Button
              href={`tel:${finalPhone.replace(/\s/g, "")}`}
              variant="ghost"
              size="lg"
              icon="phone"
              className="border border-white/70 text-white hover:bg-white/10"
            >
              {finalPhone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
