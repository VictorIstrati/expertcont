export interface LogoProps {
  variant?: "mark" | "horizontal";
  size?: number;
  withTagline?: boolean;
  mono?: boolean;
}

export function Logo({
  variant = "horizontal",
  size = 36,
  withTagline = false,
  mono = false,
}: LogoProps) {
  const blue = mono ? "currentColor" : "#4663AB";
  const gold = mono ? "currentColor" : "#DFB741";
  const muted = mono ? "currentColor" : "var(--text-secondary)";

  if (variant === "mark") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="ExpertCont">
        <circle cx="32" cy="32" r="29" fill="none" stroke={gold} strokeWidth={4} />
        <g fill={blue}>
          <circle cx="22" cy="24" r="4" />
          <circle cx="32" cy="24" r="4" />
          <circle cx="42" cy="24" r="4" />
          <circle cx="22" cy="38" r="4" />
          <circle cx="32" cy="38" r="4" />
          <circle cx="42" cy="38" r="4" />
        </g>
      </svg>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke={gold} strokeWidth={4} />
        <g fill={blue}>
          <circle cx="22" cy="24" r="4" />
          <circle cx="32" cy="24" r="4" />
          <circle cx="42" cy="24" r="4" />
          <circle cx="22" cy="38" r="4" />
          <circle cx="32" cy="38" r="4" />
          <circle cx="42" cy="38" r="4" />
        </g>
      </svg>
      <div className="flex flex-col gap-0.5 leading-none">
        <div
          className="font-extrabold tracking-tight"
          style={{ fontSize: size * 0.55 }}
        >
          <span style={{ color: blue }}>EXPERT</span>
          <span style={{ color: gold }}>CONT</span>
        </div>
        {withTagline && (
          <div
            className="font-semibold tracking-widest uppercase"
            style={{ fontSize: size * 0.2, color: muted }}
          >
            Experiență · Eficiență · Rezultate
          </div>
        )}
      </div>
    </div>
  );
}
