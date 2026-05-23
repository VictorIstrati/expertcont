import { Icon, type IconName } from "@expertcont/ui";
import type { BookingData, Strings } from "./types";

interface Props {
  data: BookingData;
  onChange: (next: BookingData) => void;
  t: Strings;
}

export function ServiceStep({ data, onChange, t }: Props) {
  return (
    <div>
      <h4 className="mb-4">{t.serviceLabel}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {t.services.map((s) => {
          const active = data.service === s.slug;
          return (
            <button
              key={s.slug}
              onClick={() => onChange({ ...data, service: s.slug })}
              className={`p-4 text-left flex items-center gap-3 border-[1.5px] rounded-sm cursor-pointer transition-all duration-150 ${
                active ? "border-primary bg-primary-50" : "border-border bg-transparent"
              }`}
            >
              <span className="w-9 h-9 rounded-xs bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
                <Icon name={s.icon as IconName} size={16} />
              </span>
              <span className="text-sm font-semibold">{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
