import { Accordion } from "@expertcont/ui";
import type { FaqGroup } from "./types";

interface Props {
  groups: FaqGroup[];
  notFoundLabel: string;
}

export function FaqGroups({ groups, notFoundLabel }: Props) {
  const totalItems = groups.reduce((n, g) => n + g.items.length, 0);

  if (totalItems === 0) {
    return <div className="py-16 text-center text-text-secondary">{notFoundLabel}</div>;
  }

  return (
    <div className="flex flex-col gap-16">
      {groups.map((g, i) => (
        <div key={g.cat}>
          <h3 className="mb-8 flex items-center gap-3 text-2xl">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-50 text-sm font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            {g.cat}
          </h3>
          <Accordion items={g.items} />
        </div>
      ))}
    </div>
  );
}
