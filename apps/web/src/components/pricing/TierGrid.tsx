import { useState } from "react";
import { Button, Container, Icon } from "@expertcont/ui";
import { localeTag, type Locale } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";
import type { Tier } from "./types";

interface Props {
  locale: Locale;
  tiers: Tier[];
  labelMonthly: string;
  labelYearly: string;
  notesLine: string;
}

export function TierGrid({ locale, tiers, labelMonthly, labelYearly, notesLine }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const isYearly = billing === "yearly";

  return (
    <section className="section">
      <Container>
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

        <div className="pricing-grid grid grid-cols-3 gap-5">
          {tiers.map((tier) => {
            const hasPrice = tier.price !== null && tier.price !== undefined;
            const display = hasPrice
              ? isYearly
                ? Math.round((tier.price as number) * 10)
                : (tier.price as number)
              : null;
            const period = hasPrice ? (isYearly ? `/ an` : tier.period) : "";
            return (
              <div
                key={tier.name}
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
                  {tier.features.map((f) => (
                    <li
                      key={f}
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

        <div className="text-center mt-8 text-sm text-text-secondary">{notesLine}</div>
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
  );
}
