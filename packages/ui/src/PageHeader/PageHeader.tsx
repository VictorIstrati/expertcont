import { Fragment, type ReactNode } from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";
import styles from "./PageHeader.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  /** Optional content (search inputs, filter chips, etc.) rendered inside the hero band, below the subtitle. */
  filters?: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumbs, filters }: PageHeaderProps) {
  return (
    <section className={styles.section}>
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <Fragment key={b.label}>
                  {i > 0 && <Icon name="chevron-right" size={12} />}
                  {b.href && !isLast ? (
                    <a href={b.href} className={styles.crumb}>
                      {b.label}
                    </a>
                  ) : (
                    <span className={isLast ? styles.crumbCurrent : styles.crumb}>{b.label}</span>
                  )}
                </Fragment>
              );
            })}
          </nav>
        )}
        {eyebrow && <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {filters && <div className="mt-6">{filters}</div>}
      </Container>
    </section>
  );
}
