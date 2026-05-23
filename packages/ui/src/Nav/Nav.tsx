import { useEffect, useState } from "react";
import { Trans } from "@lingui/react/macro";
import type { Locale } from "@expertcont/i18n";
import { homeUrl, sectionUrl } from "@expertcont/i18n";
import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Container } from "../Container";
import styles from "./Nav.module.css";

export type NavSection =
  | "home"
  | "solutions"
  | "services"
  | "pricing"
  | "about"
  | "blog"
  | "guides"
  | "contact";

export interface NavProps {
  locale: Locale;
  activeSection?: NavSection;
  onBookConsult?: () => void;
  /** Current theme: "light" | "dark". If omitted, theme controls are hidden. */
  theme?: "light" | "dark";
  onThemeChange?: (next: "light" | "dark") => void;
  /** Called when the user picks a locale from the language dropdown. */
  onLocaleChange?: (next: Locale) => void;
}

const langs: { code: Locale; label: string; full: string }[] = [
  { code: "ro", label: "RO", full: "Română" },
  { code: "ru", label: "RU", full: "Русский" },
  { code: "en", label: "EN", full: "English" },
];

export function Nav({
  locale,
  activeSection,
  onBookConsult,
  theme,
  onThemeChange,
  onLocaleChange,
}: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { key: NavSection; href: string }[] = [
    { key: "solutions", href: sectionUrl("solutions", locale) },
    { key: "services", href: sectionUrl("services", locale) },
    { key: "pricing", href: sectionUrl("pricing", locale) },
    { key: "about", href: sectionUrl("about", locale) },
    { key: "blog", href: sectionUrl("blog", locale) },
    { key: "contact", href: sectionUrl("contact", locale) },
  ];

  function linkLabel(key: NavSection) {
    switch (key) {
      case "solutions":
        return <Trans>Solutions</Trans>;
      case "services":
        return <Trans>Services</Trans>;
      case "pricing":
        return <Trans>Pricing</Trans>;
      case "about":
        return <Trans>About</Trans>;
      case "blog":
        return <Trans>Blog</Trans>;
      case "contact":
        return <Trans>Contact</Trans>;
      default:
        return null;
    }
  }

  const currentLang = langs.find((l) => l.code === locale);

  const headerClass = [styles.header, scrolled ? styles.headerScrolled : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <Container as="div" className={styles.inner}>
        {/* Logo */}
        <a
          href={homeUrl(locale)}
          className={styles.logoLink}
          aria-label="ExpertCont"
        >
          <Logo variant="horizontal" size={38} />
        </a>

        {/* Desktop nav links */}
        <nav className={styles.nav} aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={[styles.link, activeSection === l.key ? styles.linkActive : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {linkLabel(l.key)}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className={styles.actions}>
          {/* Language dropdown */}
          <div
            className={styles.langWrap}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setLangOpen(false);
              }
            }}
          >
            <button
              className={styles.langButton}
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Language"
              aria-expanded={langOpen}
              aria-haspopup="menu"
            >
              <Icon name="globe" size={16} />
              <span>{currentLang?.label}</span>
              <Icon name="chevron-down" size={14} />
            </button>
            {langOpen && (
              <div className={styles.langMenu}>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className={[
                      styles.langMenuItem,
                      l.code === locale ? styles.langMenuItemActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onLocaleChange?.(l.code);
                      setLangOpen(false);
                    }}
                  >
                    <span>{l.full}</span>
                    <span className={styles.langMenuItemCode}>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          {theme !== undefined && (
            <button
              className={styles.themeButton}
              onClick={() => onThemeChange?.(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
            </button>
          )}

          <div className={styles.divider} />

          {/* Book CTA */}
          <Button
            variant="primary"
            size="sm"
            icon="calendar"
            onClick={onBookConsult}
            className={styles.ctaBook}
          >
            <Trans>Book a consultation</Trans>
          </Button>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className={styles.mobilePanel}>
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={[styles.mobileLink, activeSection === l.key ? styles.mobileLinkActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setOpen(false)}
            >
              {linkLabel(l.key)}
            </a>
          ))}

          <div className={styles.mobileGroups}>
            {/* Language grid */}
            <div>
              <div className={styles.mobileSectionTitle}>
                <Trans comment="Mobile nav section heading for the language switcher.">
                  Language
                </Trans>
              </div>
              <div className={`${styles.mobileGrid} ${styles.mobileGrid3}`}>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className={[
                      styles.mobileLangBtn,
                      l.code === locale ? styles.mobileLangBtnActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      onLocaleChange?.(l.code);
                      setOpen(false);
                    }}
                  >
                    <span className={styles.mobileLangCode}>{l.label}</span>
                    <span className={styles.mobileLangFull}>{l.full}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme grid */}
            {theme !== undefined && (
              <div>
                <div className={styles.mobileSectionTitle}>
                  <Trans comment="Mobile nav section heading for the light/dark theme switcher. 'Theme' as in visual appearance, not subject/topic.">
                    Theme
                  </Trans>
                </div>
                <div className={`${styles.mobileGrid} ${styles.mobileGrid2}`}>
                  {(
                    [
                      { v: "light", icon: "sun", l: "Light" },
                      { v: "dark", icon: "moon", l: "Dark" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.v}
                      className={[
                        styles.mobileThemeBtn,
                        theme === opt.v ? styles.mobileThemeBtnActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        onThemeChange?.(opt.v);
                        setOpen(false);
                      }}
                    >
                      <Icon name={opt.icon} size={16} />
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile book CTA */}
            <Button
              variant="primary"
              size="md"
              icon="calendar"
              onClick={() => {
                onBookConsult?.();
                setOpen(false);
              }}
              className={styles.mobileCta}
            >
              <Trans>Book a consultation</Trans>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
