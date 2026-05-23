import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Footer } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface Props {
  locale: Locale;
  address: string;
  phone: string;
  email: string;
}

export default function FooterIsland({ locale, address, phone, email }: Props) {
  return (
    <I18nRoot locale={locale}>
      <Footer locale={locale} address={address} phone={phone} email={email} />
    </I18nRoot>
  );
}
