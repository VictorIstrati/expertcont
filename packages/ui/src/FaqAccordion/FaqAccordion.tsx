import type { ReactNode } from "react";
import styles from "./FaqAccordion.module.css";

export interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.id} className={styles.item}>
          <summary className={styles.question}>{item.question}</summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
