import type { ReactNode } from "react";
import styles from "./ServiceCard.module.css";

export interface ServiceCardProps {
  title: string;
  summary: string;
  href: string;
  icon?: ReactNode;
}

export function ServiceCard({ title, summary, href, icon }: ServiceCardProps) {
  return (
    <a href={href} className={styles.card}>
      {icon && (
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <span className={styles.cta}>→</span>
    </a>
  );
}
