import { Icon, Button } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";
import type { ContentMeta } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface SidebarPricing {
  priceLabel: string;
  features: string[];
  ctaLabel: string;
  callLabel: string;
  pricingHref: string;
  allPricingLabel: string;
}

interface RelatedService {
  meta: ContentMeta;
  href: string;
  icon: IconName;
}

interface ServiceSidebarProps {
  locale: string;
  contactHref: string;
  pricing: SidebarPricing;
  related: RelatedService[];
  offerEyebrow: string;
  offerHeading: string;
  offerSub: string;
  relatedHeading: string;
}

export function ServiceSidebar({
  locale,
  pricing,
  related,
  offerEyebrow,
  offerHeading,
  offerSub,
  relatedHeading,
}: ServiceSidebarProps) {
  const priceLabel = locale === "ru" ? "Стоимость" : locale === "en" ? "Pricing" : "Preț";
  return (
    <aside className="svc-detail-side flex flex-col gap-5 lg:sticky lg:top-nav-h">
      {/* CTA box */}
      <div className="relative overflow-hidden rounded-lg bg-primary dark:bg-primary-deep text-white p-8">
        <div className="pointer-events-none absolute -top-8 -right-8 h-[140px] w-[140px] rounded-full border border-[rgba(223,183,65,0.3)]" />
        <div className="relative">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#DFB741]">
            {offerEyebrow}
          </div>
          <h3 className="mb-3 text-2xl !text-white">{offerHeading}</h3>
          <p className="mb-5 text-sm leading-relaxed !text-white/85">{offerSub}</p>
          <Button
            variant="primary"
            icon="calendar"
            onClick={() => openModal("booking")}
            className="w-full justify-center mb-3"
          >
            {pricing.ctaLabel}
          </Button>
          <Button
            href="tel:+37322123456"
            variant="ghost"
            size="sm"
            icon="phone"
            className="w-full justify-center !border !border-white/70 !text-white hover:!bg-white/10"
          >
            {pricing.callLabel}
          </Button>
        </div>
      </div>

      {/* Pricing teaser */}
      <div className="card p-6">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
          {priceLabel}
        </div>
        <div className="mb-4 text-xl font-extrabold">{pricing.priceLabel}</div>
        <ul className="m-0 mb-5 flex list-none flex-col gap-3 p-0">
          {pricing.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="shrink-0 text-accent">
                <Icon name="check" size={14} stroke={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button
          href={pricing.pricingHref}
          variant="ghost"
          size="sm"
          iconRight="arrow-right"
          className="w-full justify-center"
        >
          {pricing.allPricingLabel}
        </Button>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <div className="card p-6">
          <div className="mb-4 text-sm font-bold">{relatedHeading}</div>
          <div className="flex flex-col gap-1">
            {related.map((r) => (
              <a
                key={r.meta.id}
                href={r.href}
                className="flex items-center gap-3 rounded-sm px-2 py-3 no-underline text-inherit transition-colors hover:bg-bg-section-alt"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs bg-primary-50 text-primary">
                  <Icon name={r.icon} size={14} />
                </span>
                <span className="text-sm font-semibold">
                  {r.meta.titles[locale as "ro" | "ru" | "en"]}
                </span>
                <span className="ml-auto text-text-secondary">
                  <Icon name="chevron-right" size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
