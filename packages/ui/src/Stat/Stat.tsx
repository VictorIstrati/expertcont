export interface StatProps {
  value: string;
  label: string;
  accent?: boolean;
}

export function Stat({ value, label, accent }: StatProps) {
  return (
    <div>
      <div
        className="stat-value text-5xl max-sm:text-4xl font-extrabold tracking-tight leading-none"
        style={{ color: accent ? "var(--color-accent)" : "inherit" }}
      >
        {value}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </div>
    </div>
  );
}
