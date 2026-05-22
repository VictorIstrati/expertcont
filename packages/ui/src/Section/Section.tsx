import type { HTMLAttributes, ReactNode, ElementType } from "react";
import styles from "./Section.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Visual tone: default light, "alt" for subtle off-white background. */
  tone?: "default" | "alt" | "accent";
  /** Vertical padding scale. */
  spacing?: "tight" | "default" | "loose";
  children: ReactNode;
}

export function Section({
  as: As = "section",
  tone = "default",
  spacing = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <As
      {...rest}
      className={`${styles.section} ${styles[`tone-${tone}`]} ${styles[`space-${spacing}`]} ${className ?? ""}`.trim()}
    >
      {children}
    </As>
  );
}
