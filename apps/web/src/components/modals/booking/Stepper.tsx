import { Icon } from "@expertcont/ui";

interface Props {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: Props) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
      {steps.map((lbl, i) => {
        const reached = i <= current;
        const past = i < current;
        return (
          <div key={lbl} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  reached ? "bg-primary text-white" : "bg-border text-text-secondary"
                }`}
              >
                {past ? <Icon name="check" size={12} /> : i + 1}
              </span>
              <span
                className={`text-sm font-semibold hidden sm:inline ${
                  reached ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {lbl}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 h-px ml-1 ${past ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
