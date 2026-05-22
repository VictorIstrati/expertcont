import { useState, type FormEvent } from "react";
import { Trans } from "@lingui/react/macro";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";
import { Container } from "../Container";
import { Logo } from "../Logo";
import { Icon } from "../Icon";
import styles from "./Footer.module.css";

/** Per-service slug map. Kept in sync with `apps/web/src/content/services-meta/*.json`. */
type ServiceId = "accounting" | "audit" | "legal" | "consulting" | "hr" | "it";
const SERVICE_SLUGS: Record<ServiceId, Record<Locale, string>> = {
  accounting: { ro: "contabilitate", ru: "bukhgalteriya", en: "accounting" },
  audit: { ro: "audit", ru: "audit", en: "audit" },
  legal: { ro: "juridic", ru: "yuridicheskie-uslugi", en: "legal" },
  consulting: { ro: "consultanta", ru: "konsalting", en: "consulting" },
  hr: { ro: "resurse-umane", ru: "kadry", en: "hr" },
  it: { ro: "servicii-it", ru: "it-uslugi", en: "it-services" },
};
const serviceDetailUrl = (id: ServiceId, locale: Locale) =>
  `${sectionUrl("services", locale)}/${SERVICE_SLUGS[id][locale]}`;

export interface FooterProps {
  locale: Locale;
  /** Called when the user submits the newsletter form with their email. */
  onNewsletterSubscribe?: (email: string) => void;
}

export function Footer({ locale, onNewsletterSubscribe }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && onNewsletterSubscribe) onNewsletterSubscribe(email);
    if (email) setSubscribed(true);
  };

  const year = new Date().getFullYear();

  const newsletterPlaceholder =
    locale === "ru" ? "ваш@email.md" : locale === "en" ? "your@email.md" : "email@exemplu.md";

  return (
    <footer className={styles.footer}>
      {/* Newsletter strip */}
      <div className={styles.newsletterWrap}>
        <Container>
          <div className={styles.newsletterRow}>
            <div className={styles.newsletterLeft}>
              <div className={styles.newsletterTitle}>
                <Trans>Subscribe to our newsletter</Trans>
              </div>
              <div className={styles.newsletterSub}>
                <Trans>Monthly newsletter — no spam, unsubscribe any time.</Trans>
              </div>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder={newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.newsletterInput}
                aria-label="Email"
              />
              <button type="submit" className={`btn btn-primary ${styles.newsletterBtn}`}>
                {subscribed ? <Trans>✓ Subscribed</Trans> : <Trans>Subscribe</Trans>}
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main grid */}
      <Container>
        <div className={styles.mainGrid}>
          <div className={styles.brandCol}>
            <Logo variant="horizontal" size={36} mono={false} />
            <p className={styles.tagline}>
              <Trans>
                Accounting, legal and consulting services for businesses in the Republic of Moldova.
                Experience, efficiency, results.
              </Trans>
            </p>
            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <Icon name="map-pin" size={16} />
                Str. Mitropolit Varlaam 65, Chișinău
              </div>
              <div className={styles.contactRow}>
                <Icon name="phone" size={16} />
                +373 22 22 33 44
              </div>
              <div className={styles.contactRow}>
                <Icon name="mail" size={16} />
                contact@expertcont.md
              </div>
            </div>
          </div>

          {/* Services column */}
          <div>
            <div className={styles.colTitle}>
              <Trans>Services</Trans>
            </div>
            <ul className={styles.list}>
              <li>
                <a href={serviceDetailUrl("accounting", locale)}>
                  <Trans>Accounting</Trans>
                </a>
              </li>
              <li>
                <a href={serviceDetailUrl("audit", locale)}>
                  <Trans>Financial audit</Trans>
                </a>
              </li>
              <li>
                <a href={serviceDetailUrl("legal", locale)}>
                  <Trans>Legal services</Trans>
                </a>
              </li>
              <li>
                <a href={serviceDetailUrl("consulting", locale)}>
                  <Trans>Business consulting</Trans>
                </a>
              </li>
              <li>
                <a href={serviceDetailUrl("hr", locale)}>
                  <Trans>HR services</Trans>
                </a>
              </li>
              <li>
                <a href={serviceDetailUrl("it", locale)}>
                  <Trans>IT consulting</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("services", locale)}>
                  <Trans>All services</Trans>
                </a>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <div className={styles.colTitle}>
              <Trans>Company</Trans>
            </div>
            <ul className={styles.list}>
              <li>
                <a href={sectionUrl("about", locale)}>
                  <Trans>About us</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("pricing", locale)}>
                  <Trans>Pricing</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("careers", locale)}>
                  <Trans>Careers</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("partners", locale)}>
                  <Trans>Partners</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("contact", locale)}>
                  <Trans>Contact</Trans>
                </a>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <div className={styles.colTitle}>
              <Trans>Resources</Trans>
            </div>
            <ul className={styles.list}>
              <li>
                <a href={sectionUrl("blog", locale)}>
                  <Trans>Blog</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("faq", locale)}>
                  <Trans>FAQ</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("guides", locale)}>
                  <Trans>Tax guides</Trans>
                </a>
              </li>
              <li>
                <a href={`${sectionUrl("pricing", locale)}#calculator`}>
                  <Trans>Calculators</Trans>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <div className={styles.colTitle}>
              <Trans>Legal</Trans>
            </div>
            <ul className={styles.list}>
              <li>
                <a href={sectionUrl("privacy", locale)}>
                  <Trans>Privacy</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("terms", locale)}>
                  <Trans>Terms</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("cookies", locale)}>
                  <Trans>Cookies</Trans>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <Container>
          <div className={styles.bottomRow}>
            <div className={styles.copyright}>
              © {year} ExpertCont SRL · IDNO 1009600012345 · <Trans>All rights reserved.</Trans>
            </div>
            <div className={styles.smallTagline}>
              <Trans>Experience · Efficiency · Results</Trans>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
