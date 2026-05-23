import { useState } from "react";
import { Button, Container, Icon, PageHeader } from "@expertcont/ui";
import type { IconName } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { homeUrl } from "@expertcont/i18n";
import { openModal } from "../../lib/modalBus";

interface Persona {
  slug: string;
  short: string;
  headline: string;
  desc: string;
  tier: string;
  tierPrice: number | null;
  tierLabel: string;
  time: string;
  deliverables: string[];
}

export interface SolutionsIslandProps {
  locale: Locale;
  bookHref: string;
  homeLabel: string;
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbSolutions: string;
  personaSwitchLabel: string;
  deliverablesSectionLabel: string;
  timelineLabel: string;
  recommendedPackageLabel: string;
  fromLabel: string;
  otherSituationsLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  bookLabel: string;
  callLabel: string;
  personas: Persona[];
}

const personaIcons: IconName[] = ["lightbulb", "trending", "briefcase"];

function SolutionsInner({
  locale,
  bookHref: _bookHref,
  homeLabel,
  eyebrow,
  pageTitle,
  pageSubtitle,
  breadcrumbSolutions,
  deliverablesSectionLabel,
  timelineLabel,
  recommendedPackageLabel,
  fromLabel,
  otherSituationsLabel,
  ctaTitle,
  ctaSubtitle,
  bookLabel,
  callLabel,
  personas,
}: SolutionsIslandProps) {
  const [active, setActive] = useState(0);
  const p = personas[active];

  const home = homeUrl(locale);

  return (
    <main>
      <PageHeader
        eyebrow={eyebrow}
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={[{ label: homeLabel, href: home }, { label: breadcrumbSolutions }]}
      />

      {/* Main content */}
      <section className="section">
        <Container>
          {/* Persona switcher */}
          <div className="mb-12 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {personas.map((per, i) => (
              <button
                key={per.slug}
                onClick={() => setActive(i)}
                className={`flex w-full cursor-pointer flex-col gap-3 rounded-lg border-2 px-6 py-5 text-left transition-all duration-150 ${
                  active === i
                    ? "border-primary dark:border-primary-deep bg-primary dark:bg-primary-deep"
                    : "border-border bg-bg-card"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-sm ${
                      active === i
                        ? "bg-white/15 text-white"
                        : "bg-accent-50 text-accent-dark"
                    }`}
                  >
                    <Icon name={personaIcons[i]} size={20} />
                  </span>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      active === i ? "text-white/70" : "text-text-secondary"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                </div>
                <div
                  className={`text-base font-bold leading-snug ${
                    active === i ? "text-white" : "text-text-primary"
                  }`}
                >
                  &ldquo;{per.short}&rdquo;
                </div>
              </button>
            ))}
          </div>

          {/* Active persona detail */}
          <div
            key={active}
            className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.4fr_1fr]"
          >
            {/* Main column */}
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
                Soluție · {p.tier}
              </div>
              <h2 className="mb-5">{p.headline}</h2>
              <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                {p.desc}
              </p>

              <h3 className="mb-4 flex items-center gap-3 text-lg">
                <Icon name="check-circle" size={20} className="text-primary" />
                {deliverablesSectionLabel}
              </h3>
              <ul className="m-0 mb-8 flex list-none flex-col gap-3 p-0">
                {p.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-sm border border-border bg-bg-section-alt px-4 py-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-base leading-normal">{d}</span>
                  </li>
                ))}
              </ul>

              {/* Timeline pill */}
              <div className="flex items-center gap-4 rounded-md border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-accent-50 px-5 py-4">
                <Icon
                  name="clock"
                  size={20}
                  className="shrink-0 text-accent-dark"
                />
                <div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-accent-dark">
                    {timelineLabel}
                  </div>
                  <div className="text-base font-semibold">{p.time}</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sticky top-nav-h flex flex-col gap-4">
              {/* Recommended package card */}
              <div className="relative overflow-hidden rounded-lg bg-primary p-8 text-white">
                <div className="absolute -top-8 -right-8 h-[140px] w-[140px] rounded-full border border-[rgba(223,183,65,0.3)]" />
                <div className="relative">
                  <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#DFB741]">
                    {recommendedPackageLabel}
                  </div>
                  <div className="mb-1 text-3xl font-extrabold text-white">{p.tier}</div>
                  <div className="mb-5 flex items-baseline gap-2">
                    {p.tierPrice ? (
                      <>
                        <span className="text-sm text-white/70">{fromLabel}</span>
                        <span className="text-4xl font-extrabold tracking-tight text-white">
                          {p.tierPrice.toLocaleString("ro-RO")}
                        </span>
                        <span className="text-sm text-white/70">{p.tierLabel}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-white">{p.tierLabel}</span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    icon="calendar"
                    onClick={() => openModal("booking")}
                    className="mb-2 flex w-full justify-center"
                  >
                    {bookLabel}
                  </Button>
                  <a
                    href="tel:+37322123456"
                    className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/40 px-4 py-2 text-sm font-medium text-white no-underline"
                  >
                    <Icon name="phone" size={14} />
                    {callLabel}
                  </a>
                </div>
              </div>

              {/* Other personas card */}
              <div className="card p-6">
                <div className="mb-4 text-sm font-bold">{otherSituationsLabel}</div>
                <div className="flex flex-col gap-1">
                  {personas.map((per, i) =>
                    i !== active ? (
                      <button
                        key={per.slug}
                        onClick={() => setActive(i)}
                        className="flex w-full cursor-pointer items-start gap-3 rounded-sm border-none bg-transparent p-2 text-left hover:bg-bg-section-alt"
                      >
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xs bg-accent-50 text-accent-dark">
                          <Icon name={personaIcons[i]} size={14} />
                        </span>
                        <span className="text-sm font-semibold leading-normal">
                          &ldquo;{per.short}&rdquo;
                        </span>
                      </button>
                    ) : null,
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-16 rounded-lg border border-border bg-bg-section-alt p-8 text-center">
            <h3 className="mb-3">{ctaTitle}</h3>
            <p className="mb-5 text-base text-text-secondary py-2">{ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                icon="calendar"
                onClick={() => openModal("booking")}
              >
                {bookLabel}
              </Button>
              <a
                href="tel:+37322123456"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-text-primary no-underline"
              >
                <Icon name="phone" size={14} />
                {callLabel} · +373 22 123 456
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function SolutionsIsland(props: SolutionsIslandProps) {
  return <SolutionsInner {...props} />;
}
