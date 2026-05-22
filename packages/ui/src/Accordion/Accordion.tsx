import { useState } from "react";
import { Icon } from "../Icon";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={[
              "card-flat p-0 overflow-hidden",
              isOpen ? "border-primary" : "border-border",
            ].join(" ")}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full px-6 py-6 flex items-center justify-between text-left gap-4"
            >
              <span className="font-semibold text-base">{it.q}</span>
              <span
                className={[
                  "shrink-0 text-primary transition-transform duration-200 ease-in-out",
                  isOpen ? "rotate-45" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Icon name="plus" size={20} />
              </span>
            </button>
            {isOpen && (
              <div className="fade-in px-6 pb-6 pt-0 text-text-secondary leading-relaxed text-base">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
