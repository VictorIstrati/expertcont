import { I18nRoot, type Locale } from "@expertcont/i18n";
import { PriceCalculator } from "../pricing/PriceCalculator";
import type { CalcConfig } from "../pricing/types";

interface Props {
  locale: Locale;
  calc: CalcConfig;
}

export function AccountingCalculatorIsland({ locale, calc }: Props) {
  return (
    <I18nRoot locale={locale}>
      <PriceCalculator calc={calc} locale={locale} standalone />
    </I18nRoot>
  );
}
