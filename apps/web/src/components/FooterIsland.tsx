import { I18nRoot } from "@expertcont/i18n/I18nRoot";
import { Footer } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";

interface Props {
  locale: Locale;
}

export default function FooterIsland({ locale }: Props) {
  return (
    <I18nRoot locale={locale}>
      <Footer locale={locale} />
    </I18nRoot>
  );
}
