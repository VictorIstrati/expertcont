import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Footer } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { backendClient } from "../lib/backend";

interface Props {
  locale: Locale;
  address: string;
  phone: string;
  email: string;
}

export default function FooterIsland({ locale, address, phone, email }: Props) {
  async function handleNewsletterSubscribe(value: string): Promise<boolean> {
    const result = await backendClient.submitNewsletter({
      language: locale,
      email: value,
      source_url: typeof window !== "undefined" ? window.location.href : undefined,
    });
    return result.ok;
  }

  return (
    <I18nRoot locale={locale}>
      <Footer
        locale={locale}
        address={address}
        phone={phone}
        email={email}
        onNewsletterSubscribe={handleNewsletterSubscribe}
      />
    </I18nRoot>
  );
}
