export interface LogoProps {
  variant?: "mark" | "horizontal";
  size?: number;
  mono?: boolean;
}

const ICON_VIEWBOX = "0 0 317 317";
const RING_PATH =
  "m159.3 315.4c-86.7 0-156.9-70.2-156.9-156.8 0-86.7 70.2-156.9 156.9-156.9 86.7 0 157 70.2 157 156.9 0 86.6-70.3 156.8-157 156.8zm0-303.1c-80.8 0-146.3 65.5-146.3 146.3 0 80.7 65.5 146.2 146.3 146.2 80.8 0 146.4-65.5 146.4-146.2 0-80.8-65.6-146.3-146.4-146.3z";
const DOTS_PATH =
  "m249.3 148.3c-10.8 0-19.5-8.8-19.5-19.5 0-10.7 8.7-19.5 19.5-19.5 10.7 0 19.5 8.8 19.5 19.5 0 10.7-8.8 19.5-19.5 19.5zm-60.4 58c-10.8 0-19.5-8.7-19.5-19.4 0-10.8 8.7-19.5 19.5-19.5 10.7 0 19.5 8.7 19.5 19.5 0 10.7-8.8 19.4-19.5 19.4zm0-58c-10.8 0-19.5-8.8-19.5-19.5 0-10.7 8.7-19.5 19.5-19.5 10.7 0 19.5 8.8 19.5 19.5 0 10.7-8.8 19.5-19.5 19.5zm-60.3 58c-10.8 0-19.5-8.7-19.5-19.4 0-10.8 8.7-19.5 19.5-19.5 10.7 0 19.4 8.7 19.4 19.5 0 10.7-8.7 19.4-19.4 19.4zm0-58c-10.8 0-19.5-8.8-19.5-19.5 0-10.7 8.7-19.5 19.5-19.5 10.7 0 19.4 8.8 19.4 19.5 0 10.7-8.7 19.5-19.4 19.5zm-60.4 58c-10.8 0-19.5-8.7-19.5-19.4 0-10.8 8.7-19.5 19.5-19.5 10.7 0 19.5 8.7 19.5 19.5 0 10.7-8.8 19.4-19.5 19.4z";

export function Logo({ variant = "horizontal", size = 36, mono = false }: LogoProps) {
  const gold = mono ? "currentColor" : "#DFB741";
  const blue = mono ? "currentColor" : "#4663AB";

  if (variant === "mark") {
    return (
      <svg width={size} height={size} viewBox={ICON_VIEWBOX} role="img" aria-label="ExpertCont">
        <path fill={gold} fillRule="evenodd" d={RING_PATH} />
        <path fill={blue} fillRule="evenodd" d={DOTS_PATH} />
      </svg>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <svg width={size} height={size} viewBox={ICON_VIEWBOX} aria-hidden="true">
        <path fill={gold} fillRule="evenodd" d={RING_PATH} />
        <path fill={blue} fillRule="evenodd" d={DOTS_PATH} />
      </svg>
      <div
        className="font-extrabold tracking-tight leading-none"
        style={{ fontSize: size * 0.55 }}
      >
        <span style={{ color: blue }}>EXPERT</span>
        <span style={{ color: gold }}>CONT</span>
      </div>
    </div>
  );
}
