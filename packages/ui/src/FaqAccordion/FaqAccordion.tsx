import styles from "./FaqAccordion.module.css";

export interface FaqItem {
  id: string;
  question: string;
  /** Answer (plain text or HTML string from MDX/markdown render). */
  answer: string;
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
          <div className={styles.answer} dangerouslySetInnerHTML={{ __html: item.answer }} />
        </details>
      ))}
    </div>
  );
}
