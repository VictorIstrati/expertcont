import { Trans } from "@lingui/react/macro";
import type { ReactNode } from "react";
import { Button } from "../Button";
import styles from "./PriceCard.module.css";

export interface PriceCardProps {
  name: string;
  price: string;
  /** Optional billing period suffix, e.g. "/ month". */
  period?: string;
  description?: string;
  features: string[];
  ctaLabel: ReactNode;
  ctaHref?: string;
  /** Highlight as recommended tier. */
  featured?: boolean;
}

export function PriceCard({
  name,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured,
}: PriceCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`.trim()}>
      {featured && (
        <div className={styles.badge}>
          <Trans comment="Badge on the recommended pricing tier card. Past participle agreeing with the implied masculine noun 'plan' in RO ('Recomandat'); use a neutral form in EN/RU.">
            Recommended
          </Trans>
        </div>
      )}
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        {period && <span className={styles.period}>{period}</span>}
      </div>
      {description && <p className={styles.description}>{description}</p>}
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Button variant={featured ? "primary" : "ghost"} href={ctaHref}>
        {ctaLabel}
      </Button>
    </article>
  );
}
