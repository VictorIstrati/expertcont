import type { ReactNode } from "react";
import { Container } from "../Container";
import { Heading } from "../Heading";
import styles from "./Hero.module.css";

export interface HeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  /** Right-side slot (image, illustration, or stats panel). Optional. */
  aside?: ReactNode;
}

export function Hero({ eyebrow, title, subtitle, cta, aside }: HeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            <Heading level={1} size="display">
              {title}
            </Heading>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {cta && <div className={styles.cta}>{cta}</div>}
          </div>
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
