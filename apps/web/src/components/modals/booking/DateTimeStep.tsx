import { Icon, type IconName } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import type { BookingData, Strings } from "./types";
import { TIMES } from "./types";

interface Props {
  data: BookingData;
  onChange: (next: BookingData) => void;
  t: Strings;
  locale: Locale;
  days: Date[];
}

export function DateTimeStep({ data, onChange, t, locale, days }: Props) {
  return (
    <div>
      <h4 className="mb-4">{t.dateLabel}</h4>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {days.map((d) => {
          const sel = !!data.date && data.date.toDateString() === d.toDateString();
          return (
            <button
              key={d.toISOString()}
              onClick={() => onChange({ ...data, date: d })}
              className={`min-w-20 py-3 px-2 flex flex-col items-center gap-1 border-[1.5px] rounded-sm shrink-0 cursor-pointer transition-all duration-150 ${
                sel
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-transparent text-inherit"
              }`}
            >
              <span className="text-xs font-semibold uppercase opacity-70">
                {new Intl.DateTimeFormat(localeTag(locale), { weekday: "short" }).format(d)}
              </span>
              <span className="text-xl font-extrabold leading-none">{d.getDate()}</span>
              <span className="text-xs opacity-70">
                {new Intl.DateTimeFormat(localeTag(locale), { month: "short" }).format(d)}
              </span>
            </button>
          );
        })}
      </div>

      <h4 className="mb-4">{t.timeLabel}</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
        {TIMES.map((tm) => {
          const active = data.time === tm;
          return (
            <button
              key={tm}
              onClick={() => onChange({ ...data, time: tm })}
              className={`py-3 px-2 border-[1.5px] rounded-sm text-sm font-semibold cursor-pointer transition-all duration-150 ${
                active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-transparent text-inherit"
              }`}
            >
              {tm}
            </button>
          );
        })}
      </div>

      <h4 className="mb-3">{t.modeLabel}</h4>
      <div className="grid grid-cols-2 gap-3">
        {[
          { k: "online", l: t.modeOnline, i: "code" as IconName },
          { k: "office", l: t.modeOffice, i: "map-pin" as IconName },
        ].map((m) => {
          const active = data.mode === m.k;
          return (
            <button
              key={m.k}
              onClick={() => onChange({ ...data, mode: m.k })}
              className={`p-4 flex items-center gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                active ? "border-primary bg-primary-50" : "border-border bg-transparent"
              }`}
            >
              <Icon name={m.i} size={18} />
              <span className="text-sm font-semibold">{m.l}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
