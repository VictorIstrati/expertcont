import { Icon } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";

interface IncludedItem {
  icon: IconName;
  title: string;
  text: string;
}

interface ServiceWhatsIncludedProps {
  items: IncludedItem[];
  heading: string;
}

export function ServiceWhatsIncluded({ items, heading }: ServiceWhatsIncludedProps) {
  return (
    <>
      <h2 className="text-4xl mb-6">{heading}</h2>
      <div className="svc-includes-grid grid grid-cols-2 gap-4 mb-12">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex gap-4 p-5 rounded-md bg-bg-section-alt border border-border"
          >
            <div className="w-9 h-9 rounded-sm bg-bg-card text-primary flex items-center justify-center shrink-0 border border-border">
              <Icon name={it.icon} size={18} />
            </div>
            <div>
              <div className="font-bold text-base mb-1">{it.title}</div>
              <div className="text-sm text-text-secondary leading-normal">
                {it.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .svc-includes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
