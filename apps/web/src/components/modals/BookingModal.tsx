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
import {
  ukraineItemLabel,
  UKRAINE_BOOKING_SLUG,
  UKRAINE_OTHER_ID,
} from "../service/ukraineCatalogue";
import { track } from "../../lib/analytics";
import { backendClient, detectLanguage } from "../../lib/backend";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  /** Service slug to pre-select when the modal opens (e.g. from a service
   * card's Schedule button). Must match a slug in booking/strings.ts. */
  initialService?: string;
  /** Second-level selection for services with a sub-catalogue — the
   * `<categoryId>:<itemId>` key from ukraineCatalogue.ts. */
  initialSubservice?: string;
}

export function BookingModal({ open, onClose, locale, initialService, initialSubservice }: Props) {
  const t = useBookingStrings();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // When the modal opens with a preselected service, prefill the form. We only
  // skip ahead to date/time when there is nothing left to choose on step 0 —
  // a service with a sub-catalogue still needs its second-level answer, so
  // opening it from the sidebar lands on step 0 with the service selected.
  useEffect(() => {
    if (!open || !initialService) return;
    setData((d) => ({
      ...d,
      service: initialService,
      subservice: initialSubservice ?? null,
      subserviceOther: "",
    }));
    const needsSubservice = initialService === UKRAINE_BOOKING_SLUG && !initialSubservice;
    setStep(needsSubservice ? 0 : 1);
  }, [open, initialService, initialSubservice]);

  const days = buildDays();
  const STEPS = [t.step1, t.step2, t.step3, t.stepDone];

  // Services with a sub-catalogue cannot advance on the service alone: the
  // visitor must pick an item, and "other" must actually be described.
  const serviceStepComplete =
    !!data.service &&
    (data.service !== UKRAINE_BOOKING_SLUG ||
      (data.subservice === UKRAINE_OTHER_ID
        ? data.subserviceOther.trim().length > 0
        : !!data.subservice));

  const canNext =
    step === 0
      ? serviceStepComplete
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
    const subserviceLine =
      data.subservice === UKRAINE_OTHER_ID
        ? data.subserviceOther.trim()
        : data.subservice
          ? (ukraineItemLabel(data.subservice, locale) ?? data.subservice)
          : "";
    const notes = [
      `${t.serviceLabel} ${serviceName}`,
      subserviceLine,
      `${t.modeLabel}: ${modeLabel}`,
      data.note,
    ]
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

      {step === 0 && <ServiceStep data={data} onChange={setData} t={t} locale={locale} />}
      {step === 1 && (
        <DateTimeStep data={data} onChange={setData} t={t} locale={locale} days={days} />
      )}
      {step === 2 && <ContactStep data={data} onChange={setData} t={t} locale={locale} />}
      {step === 3 && <ConfirmationStep data={data} t={t} locale={locale} />}
    </Modal>
  );
}
