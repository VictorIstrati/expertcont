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
    stepDone: t`Confirmat`,
    serviceLabel: t`Pentru ce serviciu?`,
    services: [
      { slug: "contabilitate", name: t`Contabilitate`, icon: "file-text" },
      { slug: "audit", name: t`Audit`, icon: "search" },
      { slug: "juridic", name: t`Juridic`, icon: "briefcase" },
      { slug: "consultanta", name: t`Consultanță`, icon: "lightbulb" },
      { slug: "hr", name: t`HR`, icon: "users" },
      { slug: "it", name: t`IT & Soft`, icon: "code" },
    ],
    dateLabel: t`Alege ziua`,
    timeLabel: t`Alege ora`,
    modeLabel: t`Format`,
    modeOnline: t`Online`,
    modeOffice: t`La birou`,
    nameLabel: t`Nume complet`,
    emailLabel: t`Email`,
    phoneLabel: t`Telefon`,
    notesLabel: t`Detalii suplimentare (opțional)`,
    summaryLabel: t`Rezumat programare`,
    prev: t`Înapoi`,
    next: t`Continuă`,
    confirm: t`Confirmă programarea`,
    cancel: t`Anulează`,
    close: t`Închide`,
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
