import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Footer } from "@expertcont/ui";
import { sectionUrl, type Locale } from "@expertcont/i18n";
import { backendClient } from "../lib/backend";
import { track } from "../lib/analytics";

const NEWSLETTER_NOTE: Record<Locale, { text: string; link: string }> = {
  ro: {
    text: "Folosim adresa ta de e-mail doar pentru newsletter. Detalii în",
    link: "Politica de confidențialitate",
  },
  ru: {
    text: "Мы используем ваш e-mail только для рассылки. Подробнее —",
    link: "Политика конфиденциальности",
  },
  en: {
    text: "We use your email address only for the newsletter. See our",
    link: "Privacy Policy",
  },
};

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
    if (result.ok) {
      track("form_submitted", { form_type: "newsletter", locale });
    }
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
        newsletterNote={
          <>
            {NEWSLETTER_NOTE[locale].text}{" "}
            <a href={sectionUrl("privacy", locale)}>{NEWSLETTER_NOTE[locale].link}</a>.
          </>
        }
      />
    </I18nRoot>
  );
}
