import { useMemo, useState } from "react";
import { Accordion, Button, Container, Icon, PageHeader, SectionHeader } from "@expertcont/ui";
import type { AccordionItem } from "@expertcont/ui";
import { I18nRoot, localeTag } from "@expertcont/i18n";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

/* ---- tier data ---- */
interface Tier {
  name: string;
  price: number | null;
  priceLabel?: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface AddOn {
  name: string;
  price: string;
}

/* ---- calculator strings ---- */
export interface CalcStrings {
  /** eyebrow above the h2 */
  calcTitle: string;
  /** h2 */
  calcHeading: string;
  /** paragraph below h2 */
  calcSubtitle: string;
  /** label: legal form selector */
  calcLegalForm: string;
  /** 3 options for legal form */
  calcLegalOpts: [string, string, string];
  /** label: documents/month slider */
  calcDocs: string;
  /** label: employees slider */
  calcEmployees: string;
  /** label: VAT checkbox */
  calcVat: string;
  /** label: additional services section */
  calcServices: string;
  /** 4 extra service checkboxes */
  calcAddServices: [string, string, string, string];
  /** small label above the price in the result panel */
  calcEstimateLabel: string;
  /** disclaimer below price */
  calcDisclaimer: string;
  /** CTA button */
  calcRequestOffer: string;
  /** MDL / month suffix */
  calcPerMonth: string;
}

export interface PricingIslandProps {
  locale: Locale;
  homeLabel?: string;
  pricingLabel?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  labelMonthly: string;
  labelYearly: string;
  tiers: Tier[];
  addOnsTitle: string;
  addOns: AddOn[];
  faq: AccordionItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  notesLine: string;
  calc: CalcStrings;
}

/* ================================================================
   PRICE CALCULATOR
   ================================================================ */
function PriceCalculator({
  calc,
  bookHref: _bookHref,
  locale,
}: {
  calc: CalcStrings;
  bookHref: string;
  locale: Locale;
}) {
  const [legal, setLegal] = useState(1);
  const [docs, setDocs] = useState(60);
  const [emp, setEmp] = useState(8);
  const [vat, setVat] = useState(true);
  const [extras, setExtras] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const price = useMemo(() => {
    let p = 800;
    p += [0, 350, 600][legal] ?? 0;
    p += Math.max(0, docs - 20) * 9;
    p += emp * 90;
    if (vat) p += 380;
    Object.values(extras).forEach((v) => {
      if (v) p += 450;
    });
    return Math.round(p / 10) * 10;
  }, [legal, docs, emp, vat, extras]);

  return (
    <section id="calculator" className="section section-dark relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] border border-[rgba(223,183,65,0.15)] rounded-full pointer-events-none" />
      <Container className="relative">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4 justify-center">{calc.calcTitle}</div>
          <h2 className="text-white mb-4">{calc.calcHeading}</h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">{calc.calcSubtitle}</p>
        </div>

        <div className="card calc-card p-10 bg-white/5 border-white/15 backdrop-blur-[20px] text-white">
          <div className="calc-grid grid grid-cols-[1.4fr_1fr] gap-12">
            {/* inputs */}
            <div className="calc-inputs flex flex-col gap-8">
              {/* legal form */}
              <div>
                <label className="text-sm font-bold mb-3 block text-white/85">
                  {calc.calcLegalForm}
                </label>
                <div className="calc-legal-grid grid grid-cols-3 gap-2">
                  {calc.calcLegalOpts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setLegal(i)}
                      className={`px-2 py-3 text-sm font-semibold rounded-sm min-h-12 cursor-pointer border ${
                        legal === i
                          ? "bg-accent text-[#1A1A2E] border-accent"
                          : "bg-white/5 text-white border-white/15"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* docs slider */}
              <div className="calc-slider-row">
                <div className="flex justify-between items-baseline mb-3 gap-2">
                  <label className="text-sm font-bold text-white/85">{calc.calcDocs}</label>
                  <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
                    {docs}
                    {docs >= 300 ? "+" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={docs}
                  onChange={(e) => setDocs(+e.target.value)}
                  className="calc-slider"
                  aria-label={calc.calcDocs}
                />
                <div className="calc-slider-ticks">
                  <span>10</span>
                  <span>150</span>
                  <span>300+</span>
                </div>
              </div>

              {/* employees slider */}
              <div className="calc-slider-row">
                <div className="flex justify-between items-baseline mb-3 gap-2">
                  <label className="text-sm font-bold text-white/85">
                    {calc.calcEmployees}
                  </label>
                  <span className="text-2xl font-extrabold text-[#DFB741] tracking-tight leading-none">
                    {emp}
                    {emp >= 50 ? "+" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={emp}
                  onChange={(e) => setEmp(+e.target.value)}
                  className="calc-slider"
                  aria-label={calc.calcEmployees}
                />
                <div className="calc-slider-ticks">
                  <span>0</span>
                  <span>25</span>
                  <span>50+</span>
                </div>
              </div>

              {/* VAT toggle */}
              <label
                className={`flex items-center gap-3 cursor-pointer px-4 py-4 rounded-sm border border-white/15 min-h-[52px] ${
                  vat ? "bg-[rgba(223,183,65,0.08)]" : "bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={vat}
                  onChange={(e) => setVat(e.target.checked)}
                  className="w-5 h-5 accent-[#DFB741]"
                />
                <span className="text-sm font-semibold">{calc.calcVat}</span>
              </label>

              {/* additional services */}
              <div>
                <label className="text-sm font-bold mb-3 block text-white/85">
                  {calc.calcServices}
                </label>
                <div className="calc-extras-grid grid grid-cols-2 gap-2">
                  {calc.calcAddServices.map((svc, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-sm border text-sm font-medium min-h-12 ${
                        extras[i]
                          ? "border-[rgba(223,183,65,0.4)] bg-[rgba(223,183,65,0.08)]"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!extras[i]}
                        onChange={(ev) => setExtras({ ...extras, [i]: ev.target.checked })}
                        className="w-5 h-5 accent-[#DFB741] shrink-0"
                      />
                      <span className="leading-snug">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* result panel */}
            <div className="calc-result flex flex-col justify-center items-center text-center p-6 bg-[linear-gradient(135deg,rgba(223,183,65,0.15)_0%,rgba(70,99,171,0.1)_100%)] rounded-lg border border-[rgba(223,183,65,0.25)]">
              <div className="text-xs font-bold tracking-widest text-[#DFB741] uppercase mb-3">
                {calc.calcEstimateLabel}
              </div>
              <div className="calc-price text-[64px] font-extrabold tracking-tighter text-white leading-none">
                {price.toLocaleString(localeTag(locale))}
              </div>
              <div className="text-base font-semibold text-white/70 mt-2">{calc.calcPerMonth}</div>
              <p className="text-xs text-white/55 mt-4 leading-normal">{calc.calcDisclaimer}</p>
              <button
                className="btn btn-primary mt-6 w-full justify-center inline-flex items-center gap-2"
                onClick={() => openModal("booking")}
              >
                {calc.calcRequestOffer} <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .calc-slider-row {
          padding: 0 14px;
          margin: 0 -14px;
        }
        .calc-slider {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 8px;
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          margin: 0; padding: 0;
          box-sizing: border-box;
          display: block;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #DFB741;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: grab;
          transition: transform 0.12s ease;
        }
        .calc-slider::-webkit-slider-thumb:active { transform: scale(1.1); cursor: grabbing; }
        .calc-slider::-moz-range-thumb {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #DFB741;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: grab;
        }
        .calc-slider-ticks {
          display: flex; justify-content: space-between;
          margin-top: 10px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .calc-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .calc-card { padding: 20px !important; }
          .calc-inputs { gap: 24px !important; min-width: 0 !important; }
          .calc-price { font-size: 48px !important; }
          .calc-result { padding: 28px 20px !important; }
          .calc-extras-grid { grid-template-columns: 1fr !important; }
          .calc-slider::-webkit-slider-thumb { width: 30px; height: 30px; }
          .calc-slider::-moz-range-thumb { width: 30px; height: 30px; }
          .calc-slider { height: 10px; }
          .calc-slider-row { padding: 0 16px; margin: 0 -16px; }
        }
        @media (max-width: 400px) {
          .calc-legal-grid { grid-template-columns: 1fr !important; }
          .calc-card { padding: 16px !important; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================
   PRICING INNER
   ================================================================ */
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
  tiers,
  addOnsTitle,
  addOns,
  faq,
  ctaTitle,
  ctaSubtitle,
  ctaButton,
  notesLine,
  calc,
}: PricingIslandProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const isYearly = billing === "yearly";

  const contactHref = sectionUrl("contact", locale);
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

      {/* Tiers section */}
      <section className="section">
        <Container>
          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-bg-section-alt rounded-pill border border-border">
              {(
                [
                  { key: "monthly" as const, label: labelMonthly },
                  { key: "yearly" as const, label: labelYearly },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setBilling(opt.key)}
                  className={`px-5 py-3 rounded-pill text-sm font-semibold inline-flex items-center gap-2 border-none cursor-pointer transition-all duration-200 ${
                    billing === opt.key
                      ? "bg-bg-card text-primary shadow-sm"
                      : "bg-transparent text-text-secondary shadow-none"
                  }`}
                >
                  {opt.label}
                  {opt.key === "yearly" && (
                    <span className="px-2 py-1 text-[10px] font-bold text-accent-dark bg-accent-50 rounded-pill tracking-wider whitespace-nowrap">
                      -16%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tier grid */}
          <div className="pricing-grid grid grid-cols-3 gap-5">
            {tiers.map((tier, i) => {
              const hasPrice = tier.price !== null && tier.price !== undefined;
              const display = hasPrice
                ? isYearly
                  ? Math.round((tier.price as number) * 10)
                  : (tier.price as number)
                : null;
              const period = hasPrice ? (isYearly ? `/ an` : tier.period) : "";
              return (
                <div
                  key={i}
                  className={`card p-10 relative ${
                    tier.popular
                      ? "bg-primary dark:bg-primary-deep text-white border-primary dark:border-primary-deep border-2 scale-105 shadow-xl z-10"
                      : "bg-bg-card text-inherit border-border border shadow-sm"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent text-[#1A1A2E] rounded-pill text-xs font-bold tracking-wider whitespace-nowrap">
                      ★ CEL MAI POPULAR
                    </div>
                  )}
                  <h3
                    className={`text-2xl mb-2 ${tier.popular ? "text-white" : "text-inherit"}`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 min-h-[42px] leading-normal ${
                      tier.popular ? "text-white/75" : "text-text-secondary"
                    }`}
                  >
                    {tier.desc}
                  </p>

                  <div
                    className={`flex items-baseline gap-2 mb-8 pb-8 border-b ${
                      tier.popular ? "border-white/20" : "border-border"
                    }`}
                  >
                    {display !== null ? (
                      <>
                        <span
                          className={`text-sm font-semibold ${
                            tier.popular ? "text-white/60" : "text-text-secondary"
                          }`}
                        >
                          de la
                        </span>
                        <span
                          className={`text-5xl font-extrabold tracking-tight leading-none ${
                            tier.popular ? "text-white" : "text-inherit"
                          }`}
                        >
                          {display.toLocaleString(localeTag(locale))}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            tier.popular ? "text-white/70" : "text-text-secondary"
                          }`}
                        >
                          MDL{period}
                        </span>
                      </>
                    ) : (
                      <span
                        className={`text-4xl font-extrabold ${
                          tier.popular ? "text-white" : "text-inherit"
                        }`}
                      >
                        {tier.priceLabel ?? "Personalizat"}
                      </span>
                    )}
                  </div>

                  <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-3">
                    {tier.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-3 text-sm ${
                          tier.popular ? "text-white/90" : "text-inherit"
                        }`}
                      >
                        <span
                          className={`shrink-0 mt-1 ${
                            tier.popular ? "text-[#DFB741]" : "text-accent"
                          }`}
                        >
                          <Icon name="check" size={16} stroke={2.5} />
                        </span>
                        <span className="leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "primary" : "outline"}
                    onClick={() => openModal("booking")}
                    className="w-full justify-center"
                  >
                    {tier.cta}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 text-sm text-text-secondary">
            {notesLine}
          </div>
        </Container>
        <style>{`
          @media (max-width: 900px) {
            .pricing-grid { grid-template-columns: 1fr !important; }
            .pricing-tier { transform: none !important; }
          }
          @media (max-width: 600px) {
            .pricing-tier { padding: 28px 24px !important; }
          }
        `}</style>
      </section>

      {/* Price Calculator */}
      <PriceCalculator calc={calc} bookHref={contactHref} locale={locale} />

      {/* Add-ons */}
      <section className="section section-alt">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Servicii suplimentare"
            title={addOnsTitle}
            maxWidth={620}
          />
          <div className="addons-grid grid grid-cols-3 gap-4">
            {addOns.map((a, i) => (
              <div
                key={i}
                className="card p-6 flex justify-between items-center gap-4"
              >
                <div className="text-base font-semibold">{a.name}</div>
                <div className="text-sm font-bold text-primary whitespace-nowrap">
                  {a.price}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <style>{`
          @media (max-width: 900px) {
            .addons-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .addons-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-narrow">
          <SectionHeader
            align="center"
            eyebrow="Întrebări frecvente"
            title="Tot ce trebuie să știi despre prețurile noastre"
            maxWidth={640}
          />
          <Accordion items={faq} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section section-alt border-t border-border">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="mb-3">{ctaTitle}</h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {ctaSubtitle}
            </p>
            <Button
              variant="primary"
              size="lg"
              iconRight="arrow-right"
              onClick={() => openModal("booking")}
            >
              {ctaButton}
            </Button>
          </div>
        </Container>
      </section>
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
