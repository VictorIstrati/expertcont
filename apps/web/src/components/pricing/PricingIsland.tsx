import { PageHeader } from "@expertcont/ui";
import { I18nRoot, type Locale } from "@expertcont/i18n";
import { TierGrid } from "./TierGrid";
import { PriceCalculator } from "./PriceCalculator";
import { AddOnsTable } from "./AddOnsTable";
import { PricingFaq } from "./PricingFaq";
import { PricingCta } from "./PricingCta";
import type { PricingIslandProps } from "./types";

export type { Tier, AddOn, CalcStrings, PricingIslandProps } from "./types";

const HOME_LABELS: Record<Locale, string> = { ro: "Acasă", ru: "Главная", en: "Home" };
const PRICING_LABELS: Record<Locale, string> = { ro: "Prețuri", ru: "Цены", en: "Pricing" };

function PricingInner({
  locale,
  homeLabel,
  pricingLabel,
  eyebrow,
  title,
  subtitle,
  labelMonthly,
  labelYearly,
  estimateNotice,
  tiers,
  addOnsTitle,
  addOns,
  faq,
  ctaTitle,
  ctaSubtitle,
  ctaButton,
  ctaHref,
  notesLine,
  calc,
}: PricingIslandProps) {
  const homeHref = locale === "ro" ? "/" : `/${locale}`;

  return (
    <main>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: homeLabel ?? HOME_LABELS[locale], href: homeHref },
          { label: pricingLabel ?? PRICING_LABELS[locale] },
        ]}
      />

      <TierGrid
        locale={locale}
        tiers={tiers}
        labelMonthly={labelMonthly}
        labelYearly={labelYearly}
        estimateNotice={estimateNotice}
        notesLine={notesLine}
      />

      <PriceCalculator calc={calc} locale={locale} />

      <AddOnsTable title={addOnsTitle} addOns={addOns} />

      <PricingFaq items={faq} />

      <PricingCta title={ctaTitle} subtitle={ctaSubtitle} button={ctaButton} href={ctaHref} />
    </main>
  );
}

export function PricingIsland(props: PricingIslandProps) {
  return (
    <I18nRoot locale={props.locale}>
      <PricingInner {...props} />
    </I18nRoot>
  );
}
