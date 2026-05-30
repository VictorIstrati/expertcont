import { useEffect, useState } from "react";
import type { Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";
import { Stepper } from "./booking/Stepper";
import { ServiceStep } from "./booking/ServiceStep";
import { DateTimeStep } from "./booking/DateTimeStep";
import { ContactStep } from "./booking/ContactStep";
import { ConfirmationStep } from "./booking/ConfirmationStep";
import { useBookingStrings, buildDays } from "./booking/strings";
import { INITIAL_DATA, type BookingData } from "./booking/types";
import { track } from "../../lib/analytics";
import { backendClient, detectLanguage } from "../../lib/backend";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  /** Service slug to pre-select when the modal opens (e.g. from a service
   * card's Schedule button). Must match a slug in booking/strings.ts. */
  initialService?: string;
}

export function BookingModal({ open, onClose, locale, initialService }: Props) {
  const t = useBookingStrings();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // When the modal opens with a preselected service, prefill the form and
  // skip directly to step 1 (date/time). User can still go back via "Prev".
  useEffect(() => {
    if (open && initialService) {
      setData((d) => ({ ...d, service: initialService }));
      setStep(1);
    }
  }, [open, initialService]);

  const days = buildDays();
  const STEPS = [t.step1, t.step2, t.step3, t.stepDone];

  const canNext =
    step === 0
      ? !!data.service
      : step === 1
        ? !!data.date && !!data.time
        : step === 2
          ? !!data.name.trim() && !!data.email.trim()
          : false;

  const handleClose = () => {
    setStep(0);
    setData(INITIAL_DATA);
    setSubmitting(false);
    setErrorMsg(null);
    onClose();
  };

  async function handlePrimary() {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    // step === 2: submit booking
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    // Combine selected date + time slot into an ISO timestamp.
    let preferredAt: string | undefined;
    if (data.date && data.time) {
      const [h, m] = data.time.split(":").map((n) => Number(n));
      const d = new Date(data.date);
      d.setHours(h ?? 0, m ?? 0, 0, 0);
      preferredAt = d.toISOString();
    }

    const serviceName = t.services.find((s) => s.slug === data.service)?.name ?? data.service;
    const modeLabel = data.mode === "online" ? t.modeOnline : t.modeOffice;
    const notes = [`${t.serviceLabel} ${serviceName}`, `${t.modeLabel}: ${modeLabel}`, data.note]
      .filter((s) => s && s.trim().length > 0)
      .join("\n");

    const result = await backendClient.submitBookACall({
      language: detectLanguage(data.note || `${serviceName} ${modeLabel}`, locale),
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      preferred_at: preferredAt,
      notes,
      source_url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      track("form_submitted", { form_type: "booking", locale });
      setStep(3);
    } else {
      setErrorMsg(t.errorGeneric);
    }
  }

  const primaryLabel = step === 2 ? (submitting ? t.sending : t.confirm) : t.next;
  const primaryDisabled = !canNext || submitting;
  const footer =
    step < 3 ? (
      <div className="flex flex-col gap-3">
        {errorMsg ? (
          <p role="alert" className="text-sm text-[#B91C1C]">
            {errorMsg}
          </p>
        ) : null}
        <div className="flex justify-between gap-3">
          <button
            className="btn btn-ghost btn-md"
            onClick={step === 0 ? handleClose : () => setStep(step - 1)}
            disabled={submitting}
          >
            {step === 0 ? t.cancel : t.prev}
          </button>
          <button
            className={`btn btn-primary btn-md ${primaryDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
            onClick={handlePrimary}
            disabled={primaryDisabled}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <button className="btn btn-primary btn-md" onClick={handleClose}>
          {t.close}
        </button>
      </div>
    );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t.title}
      subtitle={t.subtitle}
      size="lg"
      footer={footer}
    >
      <Stepper steps={STEPS} current={step} />

      {step === 0 && <ServiceStep data={data} onChange={setData} t={t} />}
      {step === 1 && (
        <DateTimeStep data={data} onChange={setData} t={t} locale={locale} days={days} />
      )}
      {step === 2 && <ContactStep data={data} onChange={setData} t={t} locale={locale} />}
      {step === 3 && <ConfirmationStep data={data} t={t} locale={locale} />}
    </Modal>
  );
}
