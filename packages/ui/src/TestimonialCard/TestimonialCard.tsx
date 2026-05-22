import styles from "./TestimonialCard.module.css";

export interface TestimonialCardProps {
  author: string;
  authorCompany?: string;
  rating?: number;
  body: string;
}

export function TestimonialCard({ author, authorCompany, rating, body }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      {typeof rating === "number" && (
        <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < rating ? styles.starOn : styles.starOff}
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      )}
      <blockquote className={styles.body}>{body}</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.authorName}>{author}</span>
        {authorCompany && <span className={styles.authorCompany}>{authorCompany}</span>}
      </figcaption>
    </figure>
  );
}
