import { useEffect, useState } from "react";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import type { Locale } from "@expertcont/i18n";
import { onModalEvent, type ModalKey } from "../../lib/modalBus";
import { BookingModal } from "./BookingModal";
import { ReviewModal } from "./ReviewModal";
import { AskQuestionModal } from "./AskQuestionModal";

interface Props {
  locale: Locale;
}

export default function ModalsHost({ locale }: Props) {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);

  useEffect(() => {
    return onModalEvent((d) => {
      if (d.action === "open") setOpenKey(d.key);
      else if (d.action === "close") setOpenKey(null);
    });
  }, []);

  const close = () => setOpenKey(null);

  return (
    <I18nRoot locale={locale}>
      <BookingModal open={openKey === "booking"} onClose={close} locale={locale} />
      <ReviewModal open={openKey === "review"} onClose={close} locale={locale} />
      <AskQuestionModal open={openKey === "ask-question"} onClose={close} locale={locale} />
    </I18nRoot>
  );
}
