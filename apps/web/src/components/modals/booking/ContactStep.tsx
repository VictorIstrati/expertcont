import { useId } from "react";
import { Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import type { BookingData, Strings } from "./types";

interface Props {
  data: BookingData;
  onChange: (next: BookingData) => void;
  t: Strings;
  locale: Locale;
}

export function ContactStep({ data, onChange, t, locale }: Props) {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const notesId = useId();

  return (
    <div className="flex flex-col gap-4">
      <div className="field">
        <label htmlFor={nameId}>{t.nameLabel} *</label>
        <input
          id={nameId}
          className="input"
          required
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Ion Popescu"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor={emailId}>{t.emailLabel} *</label>
          <input
            id={emailId}
            className="input"
            type="email"
            required
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="ion@firma.md"
          />
        </div>
        <div className="field">
          <label htmlFor={phoneId}>{t.phoneLabel}</label>
          <input
            id={phoneId}
            className="input"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+373 ..."
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={notesId}>{t.notesLabel}</label>
        <textarea
          id={notesId}
          className="textarea min-h-20"
          value={data.note}
          onChange={(e) => onChange({ ...data, note: e.target.value })}
          placeholder="Ce te interesează în mod special..."
        />
      </div>
      {data.date && (
        <div className="p-4 bg-bg-section-alt rounded-sm text-sm text-text-secondary">
          <div className="flex items-center gap-2 mb-2 font-semibold text-text-primary">
            <Icon name="calendar" size={14} />
            {t.summaryLabel}
          </div>
          {data.date.toLocaleDateString(localeTag(locale), {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          · {data.time ?? "—"} · {data.mode === "online" ? t.modeOnline : t.modeOffice}
        </div>
      )}
    </div>
  );
}
