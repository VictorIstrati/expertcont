import type { CSSProperties, ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  maxWidth?: number;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  maxWidth = 720,
}: SectionHeaderProps) {
  const wrapperStyle: CSSProperties = {
    maxWidth,
  };
  const wrapperClass = [
    "mb-16",
    align === "center" ? "text-center mx-auto" : "text-left",
  ].join(" ");
  const eyebrowClass = [
    "eyebrow",
    "mb-4 inline-flex",
    align === "center" ? "justify-center" : "justify-start",
  ].join(" ");
  return (
    <div className={wrapperClass} style={wrapperStyle}>
      {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
      <h2 className={subtitle ? "mt-0 mb-5" : "mt-0 mb-0"}>{title}</h2>
      {subtitle && (
        <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
