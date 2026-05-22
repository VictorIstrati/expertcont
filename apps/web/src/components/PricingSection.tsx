import { PriceCard } from "@expertcont/ui";
import { I18nRoot } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import type { PriceCardProps } from "@expertcont/ui";

interface PricingSectionProps {
  locale: Locale;
  tiers: PriceCardProps[];
}

function PricingSectionInner({ tiers }: { tiers: PriceCardProps[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 items-start">
      {tiers.map((t) => (
        <PriceCard key={t.name} {...t} />
      ))}
    </div>
  );
}

export function PricingSection({ locale, tiers }: PricingSectionProps) {
  return (
    <I18nRoot locale={locale}>
      <PricingSectionInner tiers={tiers} />
    </I18nRoot>
  );
}
