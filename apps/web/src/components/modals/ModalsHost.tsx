import { useEffect, useState } from "react";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";
import { onModalEvent, type ModalKey } from "../../lib/modalBus";
import { BookingModal } from "./BookingModal";
import { ReviewModal } from "./ReviewModal";
import { AskQuestionModal } from "./AskQuestionModal";
import { QuoteModal } from "./QuoteModal";
import { TierBookingModal, type TierBookingSelection } from "./TierBookingModal";
import type { BreakdownItem } from "../pricing/calcMath";

interface Props {
  locale: Locale;
}

interface QuotePayload {
  items: BreakdownItem[];
  total: number;
}

const isQuotePayload = (p: unknown): p is QuotePayload =>
  !!p &&
  typeof p === "object" &&
  Array.isArray((p as QuotePayload).items) &&
  typeof (p as QuotePayload).total === "number";

interface BookingPayload {
  service: string;
}

const isBookingPayload = (p: unknown): p is BookingPayload =>
  !!p && typeof p === "object" && typeof (p as BookingPayload).service === "string";

const isTierSelection = (p: unknown): p is TierBookingSelection => {
  if (!p || typeof p !== "object") return false;
  const s = p as TierBookingSelection;
  return (
    typeof s.tierName === "string" &&
    (s.price === null || typeof s.price === "number") &&
    (s.billing === "monthly" || s.billing === "yearly") &&
    typeof s.monthlyPeriod === "string"
  );
};

export default function ModalsHost({ locale }: Props) {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);
  const [quotePayload, setQuotePayload] = useState<QuotePayload>({ items: [], total: 0 });
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>(undefined);
  const [tierSelection, setTierSelection] = useState<TierBookingSelection | null>(null);

  useEffect(() => {
    return onModalEvent((d) => {
      if (d.action === "open") {
        setOpenKey(d.key);
        if (d.key === "quote" && isQuotePayload(d.payload)) {
          setQuotePayload(d.payload);
        } else if (d.key === "booking") {
          setBookingInitialService(isBookingPayload(d.payload) ? d.payload.service : undefined);
        } else if (d.key === "tier-booking" && isTierSelection(d.payload)) {
          setTierSelection(d.payload);
        }
      } else if (d.action === "close") {
        setOpenKey(null);
      }
    });
  }, []);

  const close = () => setOpenKey(null);

  return (
    <I18nRoot locale={locale}>
      <BookingModal
        open={openKey === "booking"}
        onClose={close}
        locale={locale}
        initialService={bookingInitialService}
      />
      <ReviewModal open={openKey === "review"} onClose={close} locale={locale} />
      <AskQuestionModal open={openKey === "ask-question"} onClose={close} locale={locale} />
      <QuoteModal open={openKey === "quote"} onClose={close} locale={locale} quote={quotePayload} />
      <TierBookingModal
        open={openKey === "tier-booking"}
        onClose={close}
        locale={locale}
        selection={tierSelection}
      />
    </I18nRoot>
  );
}
