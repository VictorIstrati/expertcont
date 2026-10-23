import { useEffect, useState, type RefObject } from "react";
import type { Locale } from "@expertcont/i18n";
import { Icon } from "@expertcont/ui";
import styles from "./MobileResultBar.module.css";

const CTA: Record<Locale, string> = {
  ro: "Detalii",
  ru: "Подробнее",
  en: "Details",
};

interface Props {
  locale: Locale;
  target: RefObject<HTMLElement | null>;
  label: string;
  value: string;
}

export function MobileResultBar({ locale, target, label, value }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = target.current;
      const section = el?.parentElement;
      if (!el || !section) return;
      const viewport = window.innerHeight;
      const result = el.getBoundingClientRect();
      const area = section.getBoundingClientRect();
      setVisible(area.top < viewport * 0.6 && result.top > viewport - 72);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return (
    <button
      type="button"
      className={`${styles.bar} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const el = target.current;
        if (!el) return;
        const nav = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        );
        const top = el.getBoundingClientRect().top + window.scrollY - (nav || 72) - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }}
    >
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </span>
      <span className={styles.cta}>
        {CTA[locale]}
        <Icon name="chevron-down" size={16} />
      </span>
    </button>
  );
}
