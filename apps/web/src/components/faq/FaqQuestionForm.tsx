import { useId, useState } from "react";
import { Button, Icon } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { useResponseLabels, useTopics } from "./types";
import { backendClient, detectLanguage } from "../../lib/backend";

interface Props {
  locale: Locale;
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
  formSendingLabel: string;
  formErrorLabel: string;
  formSentTitle: string;
  formSentBody: string;
  formSentReset: string;
  formContactPhone: string;
  formContactEmail: string;
}

export function FaqQuestionForm({
  locale,
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
  formSendingLabel,
  formErrorLabel,
  formSentTitle,
  formSentBody,
  formSentReset,
  formContactPhone,
  formContactEmail,
}: Props) {
  const topics = useTopics();
  const labels = useResponseLabels();

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: topics[0]?.v ?? "general",
    question: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const nameId = useId();
  const emailId = useId();
  const questionId = useId();

  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.question.trim().length >= 10 &&
    form.consent;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    const result = await backendClient.submitFaqQuestion({
      language: detectLanguage(form.question, locale),
      name: form.name,
      email: form.email,
      topic: form.topic,
      question: form.question,
      source_url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      setSent(true);
    } else {
      setErrorMsg(formErrorLabel);
    }
  }

  return (
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
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 text-sm">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="field">
                <label htmlFor={nameId}>{formNameLabel} *</label>
                <input
                  id={nameId}
                  className="input"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={labels.placeholderName}
                />
              </div>
              <div className="field">
                <label htmlFor={emailId}>{formEmailLabel} *</label>
                <input
                  id={emailId}
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
              <label htmlFor={questionId}>{formQuestionLabel} *</label>
              <textarea
                id={questionId}
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
                {formConsentLabel} <a className="text-primary underline">{formConsentLink}</a>. *
              </span>
            </label>

            {errorMsg ? (
              <p role="alert" className="text-sm text-[#B91C1C]">
                {errorMsg}
              </p>
            ) : null}
            <Button
              variant="primary"
              size="md"
              type="submit"
              iconRight="send"
              disabled={!canSubmit || submitting}
              className={`self-start ${canSubmit && !submitting ? "" : "cursor-not-allowed opacity-50"}`}
            >
              {submitting ? formSendingLabel : formSubmitLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
