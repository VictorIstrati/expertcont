import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Heading.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "display" | "section";

const TAG: Record<Level, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  size?: Size;
  children: ReactNode;
}

export function Heading({ level = 1, size, className, children, ...rest }: HeadingProps) {
  const Tag = TAG[level];
  const visualClass = size ? styles[size] : styles[`h${level}` as keyof typeof styles];
  return (
    <Tag {...rest} className={`${styles.heading} ${visualClass} ${className ?? ""}`.trim()}>
      {children}
    </Tag>
  );
}
