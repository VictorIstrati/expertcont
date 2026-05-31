import { useState, type FormEvent } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl, serviceDetailUrl } from "@expertcont/i18n";
import { Container } from "../Container";
import { Logo } from "../Logo";
import { Icon } from "../Icon";
import styles from "./Footer.module.css";

export interface FooterProps {
  locale: Locale;
  /** Short address line shown in the brand column (already locale-resolved). */
  address: string;
  /** Display phone number with spaces, e.g. "+373 22 22 33 44". */
  phone: string;
  email: string;
  /**
   * Called when the user submits the newsletter form. Resolve `true` to flip
   * the button into the success state; resolve `false` (or reject) to leave it
   * available for another submission attempt. If omitted, the form optimistically
   * flips to success on submit.
   */
  onNewsletterSubscribe?: (email: string) => boolean | Promise<boolean>;
}

export function Footer({ locale, address, phone, email, onNewsletterSubscribe }: FooterProps) {
  const { t } = useLingui();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    if (!onNewsletterSubscribe) {
      setSubscribed(true);
      return;
    }
    const ok = await onNewsletterSubscribe(newsletterEmail);
    if (ok) setSubscribed(true);
  };

  const year = new Date().getFullYear();

  const newsletterPlaceholder = t({
    message: `email@exemplu.md`,
    comment:
      "Placeholder shown inside the footer newsletter email input. Use a locale-appropriate example domain.",
  });

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
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className={styles.newsletterInput}
                aria-label="Email"
              />
              <button type="submit" className={`btn btn-primary ${styles.newsletterBtn}`}>
                {subscribed ? (
                  <Trans>✓ Subscribed</Trans>
                ) : (
                  <Trans comment="Footer newsletter form submit button. Imperative verb.">
                    Subscribe
                  </Trans>
                )}
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
                {address}
              </div>
              <div className={styles.contactRow}>
                <Icon name="phone" size={16} />
                {phone}
              </div>
              <div className={styles.contactRow}>
                <Icon name="mail" size={16} />
                {email}
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
                <a href={sectionUrl("industries", locale)}>
                  <Trans>Industries</Trans>
                </a>
              </li>
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
              <Trans comment="Footer column heading grouping Privacy/Terms/Cookies links. NOT a service category — refers to legal/compliance pages.">
                Legal
              </Trans>
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
              <li>
                <a href={sectionUrl("sitemap", locale)}>
                  <Trans>Sitemap</Trans>
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
              © {year} ExpertCont · <Trans>All rights reserved.</Trans>
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
