import { useState } from "react";
import type { Locale } from "@expertcont/i18n";
import { Modal } from "./Modal";
import { Stepper } from "./booking/Stepper";
import { ServiceStep } from "./booking/ServiceStep";
import { DateTimeStep } from "./booking/DateTimeStep";
import { ContactStep } from "./booking/ContactStep";
import { ConfirmationStep } from "./booking/ConfirmationStep";
import { useBookingStrings, buildDays } from "./booking/strings";
import { INITIAL_DATA, type BookingData } from "./booking/types";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

export function BookingModal({ open, onClose, locale }: Props) {
  const t = useBookingStrings();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL_DATA);

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
    onClose();
  };

  const footer =
    step < 3 ? (
      <div className="flex justify-between gap-3">
        <button
          className="btn btn-ghost btn-md"
          onClick={step === 0 ? handleClose : () => setStep(step - 1)}
        >
          {step === 0 ? t.cancel : t.prev}
        </button>
        <button
          className={`btn btn-primary btn-md ${canNext ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
          onClick={() => setStep(step + 1)}
          disabled={!canNext}
        >
          {step === 2 ? t.confirm : t.next}
        </button>
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
