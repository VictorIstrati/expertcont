import { useEffect, useState } from "react";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";
import { onModalEvent, type ModalKey } from "../../lib/modalBus";
import { BookingModal } from "./BookingModal";
import { ReviewModal } from "./ReviewModal";
import { AskQuestionModal } from "./AskQuestionModal";
import { QuoteModal } from "./QuoteModal";
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

export default function ModalsHost({ locale }: Props) {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);
  const [quotePayload, setQuotePayload] = useState<QuotePayload>({ items: [], total: 0 });

  useEffect(() => {
    return onModalEvent((d) => {
      if (d.action === "open") {
        setOpenKey(d.key);
        if (d.key === "quote" && isQuotePayload(d.payload)) {
          setQuotePayload(d.payload);
        }
      } else if (d.action === "close") {
        setOpenKey(null);
      }
    });
  }, []);

  const close = () => setOpenKey(null);

  return (
    <I18nRoot locale={locale}>
      <BookingModal open={openKey === "booking"} onClose={close} locale={locale} />
      <ReviewModal open={openKey === "review"} onClose={close} locale={locale} />
      <AskQuestionModal open={openKey === "ask-question"} onClose={close} locale={locale} />
      <QuoteModal open={openKey === "quote"} onClose={close} locale={locale} quote={quotePayload} />
    </I18nRoot>
  );
}
