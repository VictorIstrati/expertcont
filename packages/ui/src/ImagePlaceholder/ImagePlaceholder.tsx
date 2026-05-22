import type { CSSProperties } from "react";
import { Logo } from "../Logo";

export interface ImagePlaceholderProps {
  label?: string;
  ratio?: string;
  style?: CSSProperties;
}

export function ImagePlaceholder({
  label = "Photo",
  ratio = "16/9",
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center rounded-lg border border-border bg-[linear-gradient(135deg,var(--color-primary-50)_0%,var(--color-surface-2)_100%)]"
      style={{ aspectRatio: ratio, ...style }}
    >
      <div className="dot-pattern-bg absolute inset-0 opacity-40" />
      <div className="relative flex flex-col items-center gap-3 text-text-secondary">
        <Logo variant="mark" size={48} />
        <div className="text-xs font-semibold tracking-widest uppercase">{label}</div>
      </div>
    </div>
  );
}
