/**
 * Maps a services-meta `id` to the slug the booking modal uses for that
 * service. The modal's own list is keyed by Romanian slugs (`juridic`), while
 * the content collection uses English ids (`legal`), so the two need bridging.
 *
 * Keep in sync with the `services` array in
 * `src/components/modals/booking/strings.ts` — an id that maps to a slug with
 * no matching modal option opens the modal with nothing selected.
 */
const SERVICE_ID_TO_BOOKING_SLUG: Record<string, string> = {
  accounting: "contabilitate",
  audit: "audit",
  legal: "juridic",
  consulting: "consultanta",
  hr: "hr",
  it: "it",
  ukrainians: "ucraina",
};

/** Booking-modal slug for a services-meta id; falls back to the id itself. */
export function bookingSlugFor(serviceId: string): string {
  return SERVICE_ID_TO_BOOKING_SLUG[serviceId] ?? serviceId;
}
