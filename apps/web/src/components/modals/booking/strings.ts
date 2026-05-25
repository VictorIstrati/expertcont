import { useLingui } from "@lingui/react/macro";
import type { Strings } from "./types";

/**
 * Hook returning all booking-modal copy translated for the current locale.
 * Must be called inside an `I18nRoot` (the parent BookingModal is mounted
 * inside one via `ModalsHost`).
 */
export function useBookingStrings(): Strings {
  const { t } = useLingui();
  return {
    title: t`Programează consultație`,
    subtitle: t`Completează pașii de mai jos — confirmăm în < 4 ore`,
    step1: t`Serviciu`,
    step2: t`Data & Ora`,
    step3: t`Date contact`,
    stepDone: t({
      message: `Confirmat`,
      comment:
        "Booking modal — stepper label for the confirmation step. Past participle, neutral state (not 'confirm' the verb).",
    }),
    serviceLabel: t`Pentru ce serviciu?`,
    services: [
      { slug: "contabilitate", name: t`Contabilitate`, icon: "calculator" },
      { slug: "audit", name: t`Audit`, icon: "audit" },
      {
        slug: "juridic",
        name: t({
          message: `Juridic`,
          comment: "Service category. Romanian adjective used as a noun = 'Legal services'.",
        }),
        icon: "scale",
      },
      { slug: "consultanta", name: t`Consultanță`, icon: "lightbulb" },
      { slug: "hr", name: t`HR`, icon: "users" },
      { slug: "it", name: t`IT & Soft`, icon: "monitor" },
    ],
    dateLabel: t`Alege ziua`,
    timeLabel: t`Alege ora`,
    modeLabel: t({
      message: `Format`,
      comment: "Booking modal — label for the consultation format selector (online vs in-office).",
    }),
    modeOnline: t`Online`,
    modeOffice: t`La birou`,
    nameLabel: t`Nume complet`,
    emailLabel: t`Email`,
    phoneLabel: t`Telefon`,
    notesLabel: t`Detalii suplimentare (opțional)`,
    summaryLabel: t`Rezumat programare`,
    prev: t({
      message: `Înapoi`,
      comment:
        "Booking modal — button that returns to the previous step. Adverb 'back', not a noun.",
    }),
    next: t({
      message: `Continuă`,
      comment: "Booking modal — primary 'next step' button. Imperative verb.",
    }),
    confirm: t({
      message: `Confirmă programarea`,
      comment: "Booking modal — final-step primary button. Imperative verb.",
    }),
    sending: t({
      message: `Se trimite…`,
      comment: "Booking modal — loading state shown on the confirm button while the request is in flight.",
    }),
    errorGeneric: t({
      message: `Nu am putut trimite programarea. Încearcă din nou.`,
      comment: "Booking modal — generic error message shown when submission fails.",
    }),
    cancel: t({
      message: `Anulează`,
      comment: "Booking modal — secondary button that aborts the booking flow. Imperative verb.",
    }),
    close: t({
      message: `Închide`,
      comment: "Booking modal — button that closes the modal. Imperative verb.",
    }),
    doneTitle: t`Programare trimisă!`,
    doneMsg: t`Vă vom contacta în mai puțin de 4 ore în zile lucrătoare pentru confirmare.`,
    bookedLabel: t`Programare confirmată`,
  };
}

export function buildDays(): Date[] {
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0 && d.getDay() !== 6);
}
