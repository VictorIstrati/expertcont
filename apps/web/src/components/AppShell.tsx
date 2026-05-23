import type { ReactNode } from "react";
import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Nav, Footer, type NavSection } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";
import { site, addressShort } from "../site";

interface Props {
  locale: Locale;
  activeSection?: NavSection;
  siblings: Record<Locale, string>;
  children?: ReactNode;
}

export default function AppShell({ locale, activeSection, siblings, children }: Props) {
  return (
    <I18nRoot locale={locale}>
      <Nav
        locale={locale}
        activeSection={activeSection}
        onLocaleChange={(next) => {
          if (typeof window !== "undefined") window.location.href = siblings[next];
        }}
        onBookConsult={() => {
          if (typeof window !== "undefined") window.location.href = sectionUrl("contact", locale);
        }}
      />
      {children}
      <Footer
        locale={locale}
        address={addressShort(locale)}
        phone={site.business.phone}
        email={site.business.email}
      />
    </I18nRoot>
  );
}
