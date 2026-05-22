import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({ as: As = "div", className, children, ...rest }: ContainerProps) {
  return (
    <As {...rest} className={`${styles.container} ${className ?? ""}`.trim()}>
      {children}
    </As>
  );
}
