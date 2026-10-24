import { Trans } from "@lingui/react/macro";
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
  onCookieSettings?: () => void;
}

export function Footer({
  locale,
  address,
  phone,
  email,
  onCookieSettings,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
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
                <a href={sectionUrl("tools", locale)}>
                  <Trans>Free tools</Trans>
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
                <a href={sectionUrl("dataProtection", locale)}>
                  <Trans comment="Footer link to the company-wide personal data processing policy (not the website privacy notice).">
                    Data protection
                  </Trans>
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
              {onCookieSettings ? (
                <li>
                  <button type="button" className={styles.linkButton} onClick={onCookieSettings}>
                    <Trans comment="Footer button that reopens the cookie consent banner so the visitor can change or withdraw consent.">
                      Cookie settings
                    </Trans>
                  </button>
                </li>
              ) : null}
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
