import { Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import type { BookingData, Strings } from "./types";

interface Props {
  data: BookingData;
  t: Strings;
  locale: Locale;
}

export function ConfirmationStep({ data, t, locale }: Props) {
  return (
    <div className="text-center py-8 px-4">
      <div className="w-20 h-20 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-5">
        <Icon name="check" size={36} />
      </div>
      <h3 className="mb-3">{t.doneTitle}</h3>
      <p className="text-text-secondary max-w-[420px] mx-auto mb-8 leading-relaxed">
        {t.doneMsg}
      </p>
      {data.date && (
        <div className="inline-flex flex-col py-5 px-8 bg-bg-section-alt rounded-md border border-border text-left gap-2">
          <div className="text-xs font-bold text-primary tracking-widest uppercase">
            {t.bookedLabel}
          </div>
          <div className="text-base font-bold">
            {data.date.toLocaleDateString(localeTag(locale), {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            · {data.time}
          </div>
          <div className="text-sm text-text-secondary">
            {t.services.find((s) => s.slug === data.service)?.name} ·{" "}
            {data.mode === "online" ? t.modeOnline : t.modeOffice}
          </div>
        </div>
      )}
    </div>
  );
}
