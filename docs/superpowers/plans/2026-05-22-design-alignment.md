# Design alignment implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended for this plan — user prefers direct Edit/Read over per-task subagents) or superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 9-item design alignment spec at `docs/superpowers/specs/2026-05-22-design-alignment.md` — make homepage cards link, fix service-detail call-button radius, restructure FAQ/blog/guides to put filters in the page-header band, wire footer calculator + legal links, and apply the design's legal-page layout. Migrate every touched file's inline `style={{}}` to Tailwind utility classes.

**Architecture:** Bottom-up. (1) Add `PageHeader.filters` slot — the linchpin for FAQ/blog/guides. (2) Create a single shared `serviceIcons` resolver. (3) Page-level changes consume those primitives. (4) Inline-style → Tailwind migration done in-place per file. Per-locale Astro pages (`/` ro, `/ru/...`, `/en/...`) are updated together when the React island they wrap changes signature.

**Tech Stack:** React 18, Astro 4, Tailwind 4 (via `@tailwindcss/vite`), CSS Modules, `@expertcont/ui` shared primitives, `@expertcont/i18n` URL helpers, Vitest + happy-dom.

**Per project memory:**
- **No per-task commits.** All changes are committed in a single batch at the end (Task 15).
- **Defer lint/format.** No mid-task `pnpm lint` / `pnpm format:check` / `pnpm format` runs — they happen once in Task 15.
- **Direct Edit/Read for file mods.** No subagent dispatch for the file changes below.
- **No inline `style={{}}` introduced.** Every file touched migrates to Tailwind utilities (token-color arbitrary values are fine: `bg-[var(--color-primary-dark)]`).

---

## File map

**New:**
- `apps/web/src/lib/serviceIcons.ts` — single canonical `serviceIcon(slug) → IconName` resolver.

**Modified (UI primitives, shared):**
- `packages/ui/src/PageHeader/PageHeader.tsx` — add optional `filters?: ReactNode` slot rendered below subtitle.

**Modified (home):**
- `apps/web/src/components/home/HomeServices.tsx` — wrap cards in `<a>`, use shared resolver, Tailwind migration.
- `apps/web/src/components/home/HomePersonaPicker.tsx` — wrap cards in `<a>` (solutions section, `?persona=` query), Tailwind migration.
- `apps/web/src/components/home/HomeHeroSection.tsx` — add `icon="calendar"` to booking CTA; Tailwind migration if any inline styles touched.
- `apps/web/src/components/home/HomeCTASection.tsx` — same icon fix; Tailwind migration of any touched inline styles.

**Modified (service detail):**
- `apps/web/src/components/service/ServiceSidebar.tsx` — replace raw `<a className="btn btn-outline btn-sm">` anchors with `<Button href=... variant="ghost" size="sm">` so radius/padding match the primary CTA; Tailwind migration.
- `apps/web/src/components/service/ServiceCTAStrip.tsx` — ensure booking CTA has `icon="calendar"`; Tailwind migration of any touched inline styles.

**Modified (FAQ / Blog / Guides):**
- `apps/web/src/components/faq/FaqPageIsland.tsx` — render `<PageHeader>` inside the island with `filters={...}` (search + topic chips), numbered category groups (already implemented — kept), FaqQuestionForm full-width section, Tailwind migration of remaining inline styles.
- `apps/web/src/components/blog/BlogIndexIsland.tsx` — same pattern: render `<PageHeader>` inside with `filters={...}`.
- `apps/web/src/components/guides/GuidesIndexIsland.tsx` — same.
- `apps/web/src/pages/intrebari-frecvente.astro`, `pages/ru/voprosy.astro`, `pages/en/faq.astro` — drop the standalone `<PageHeader>` (and surrounding `<Section><Container>` wrapper), pass `title`/`subtitle`/`eyebrow`/`breadcrumbs` to the island.
- `apps/web/src/pages/blog/index.astro`, `pages/ru/blog/index.astro`, `pages/en/blog/index.astro` — same shift.
- `apps/web/src/pages/cariere/index.astro` is unrelated; ignore.
- `apps/web/src/pages/<guides>/index.astro` per locale — same shift.

**Modified (footer + legal):**
- `packages/ui/src/Footer/Footer.tsx` — Calculator link → `${sectionUrl("pricing", locale)}#calculator`; Privacy/Terms/Cookies links → `sectionUrl("privacy"|"terms"|"cookies", locale)`.
- `apps/web/src/components/pricing/PricingIsland.tsx` — add `id="calculator"` to the calculator wrapper element.
- `apps/web/src/components/legal/LegalIsland.tsx` — apply the design's structure (last-updated badge row at top, sections grid with consistent typography, Questions panel at bottom with email link + Contact button); Tailwind migration.

---

## Task 1: Add `filters` slot to PageHeader

**Files:**
- Modify: `packages/ui/src/PageHeader/PageHeader.tsx`

- [ ] **Step 1: Add the prop and render the slot**

Replace the file contents with:

```tsx
import { Fragment, type ReactNode } from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";
import styles from "./PageHeader.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  /** Optional content (search inputs, filter chips, etc.) rendered inside the hero band, below the subtitle. */
  filters?: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumbs, filters }: PageHeaderProps) {
  return (
    <section className={styles.section}>
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <Fragment key={i}>
                  {i > 0 && <Icon name="chevron-right" size={12} />}
                  {b.href && !isLast ? (
                    <a href={b.href} className={styles.crumb}>
                      {b.label}
                    </a>
                  ) : (
                    <span className={isLast ? styles.crumbCurrent : styles.crumb}>{b.label}</span>
                  )}
                </Fragment>
              );
            })}
          </nav>
        )}
        {eyebrow && <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {filters && <div className="mt-6">{filters}</div>}
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify nothing existing breaks**

Run: `pnpm --filter @expertcont/ui exec vitest run`
Expected: existing tests pass (no PageHeader tests reference `filters`).

---

## Task 2: Create shared `serviceIcons` resolver

**Files:**
- Create: `apps/web/src/lib/serviceIcons.ts`

- [ ] **Step 1: Write the resolver**

```ts
import type { IconName } from "@expertcont/ui";

/** Canonical map from service identifier (id or any locale slug) to its icon. */
const ICON_BY_KEY: Record<string, IconName> = {
  // ids
  accounting: "file-text",
  hr: "users",
  legal: "scale",
  audit: "trending",
  it: "code",
  consulting: "lightbulb",
  // ro slugs
  contabilitate: "file-text",
  "resurse-umane": "users",
  juridic: "scale",
  consultanta: "lightbulb",
  "servicii-it": "code",
  // ru slugs
  bukhgalteriya: "file-text",
  kadry: "users",
  "yuridicheskie-uslugi": "scale",
  konsalting: "lightbulb",
  "it-uslugi": "code",
  // en slugs
  "it-services": "code",
};

/** Resolve an icon by service id or locale slug. Falls back to `briefcase`. */
export function serviceIcon(key: string): IconName {
  return ICON_BY_KEY[key] ?? "briefcase";
}
```

---

## Task 3: HomeServices — link cards + shared resolver + Tailwind

**Files:**
- Modify: `apps/web/src/components/home/HomeServices.tsx`

- [ ] **Step 1: Import the shared resolver and `detailUrl` helper**

In `HomeServices.tsx`, replace these imports at the top:

```ts
import { Icon, ArrowLink } from "@expertcont/ui";
import type { Locale } from "@expertcont/i18n";
import { sectionUrl } from "@expertcont/i18n";
import type { ContentMeta } from "@expertcont/i18n";
```

with:

```ts
import { Icon, ArrowLink } from "@expertcont/ui";
import type { Locale, ContentMeta } from "@expertcont/i18n";
import { sectionUrl, detailUrl } from "@expertcont/i18n";
import { serviceIcon } from "../../lib/serviceIcons";
```

- [ ] **Step 2: Delete the local `serviceIcon` map**

Remove the entire local `const serviceIcon = (slug: string): string => ...` declaration in `HomeServices.tsx` (the duplicated map).

- [ ] **Step 3: Convert each card from `<div>` to `<a>` and migrate inline styles to Tailwind**

Replace the contents of the returned JSX with this version (keeps existing copy & ordering, swaps `<div>` for `<a>`, drops `<style>` block in favour of a Tailwind grid, replaces inline styles):

```tsx
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-14 mb-14">
          <div>
            <div className="eyebrow mb-4">{t.eyebrow}</div>
            <h2>{t.heading}</h2>
          </div>
          <div>
            <p className="text-[17px] text-[var(--text-secondary)]">{t.subtext}</p>
            <div className="mt-4">
              <ArrowLink href={sectionUrl("services", locale)}>{t.viewAll}</ArrowLink>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((s) => {
            const isFeatured = s.id === "accounting";
            const iconName = serviceIcon(s.id);
            const href = detailUrl("services", s, locale);
            const baseCard =
              "card card-hover relative overflow-hidden block no-underline rounded-[var(--r-lg)] cursor-pointer";
            const tone = isFeatured
              ? "bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)]"
              : "bg-[var(--bg-card)] text-inherit border-[var(--border)]";
            const iconWrap = isFeatured
              ? "bg-[rgba(223,183,65,0.18)] text-[#DFB741]"
              : "bg-[var(--color-primary-50)] text-[var(--color-primary)]";
            const learnTone = isFeatured ? "text-[#DFB741]" : "text-[var(--color-primary)]";
            return (
              <a key={s.id} href={href} className={`${baseCard} ${tone}`}>
                {isFeatured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-[var(--r-pill)] text-[11px] font-bold tracking-[0.05em] bg-[rgba(223,183,65,0.2)] text-[#DFB741]">
                    CORE
                  </div>
                )}
                <div className={`flex h-[52px] w-[52px] items-center justify-center rounded-[var(--r-md)] mb-5 ${iconWrap}`}>
                  <Icon name={iconName} size={24} />
                </div>
                <h3 className={`text-[22px] mb-2.5 ${isFeatured ? "text-white" : ""}`}>
                  {s.titles[locale]}
                </h3>
                <p
                  className={`text-sm leading-[1.55] mb-5 ${
                    isFeatured ? "text-white/75" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {s.summaries[locale]}
                </p>
                <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${learnTone}`}>
                  {t.learnMore} <Icon name="arrow-right" size={14} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

(Keep the `Props`, `LocaleStrings`, and `strings` constant declarations and the `order` / `sorted` logic above the return as they are; only the JSX block changes. Remove the trailing `<style>{...}</style>` block — Tailwind's `sm:`/`lg:` breakpoints replace the old media queries.)

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: no new errors in `HomeServices.tsx`.

---

## Task 4: HomePersonaPicker — link cards + Tailwind

**Files:**
- Modify: `apps/web/src/components/home/HomePersonaPicker.tsx`

- [ ] **Step 1: Add a slug per persona and link cards**

In `HomePersonaPicker.tsx`, add a `slug` field on the `Persona` interface and on each persona in every locale:

```ts
interface Persona {
  slug: "startup" | "scaleup" | "enterprise";
  icon: IconName;
  tier: string;
  time: string;
  short: string;
  desc: string;
}
```

Then add `slug: "startup"` / `"scaleup"` / `"enterprise"` to the corresponding entries in `ro`, `ru`, `en`. The order is `STARTUP, SCALE-UP, ENTERPRISE` in all three locales.

- [ ] **Step 2: Import `sectionUrl`**

Add at the top of `HomePersonaPicker.tsx`:

```ts
import { sectionUrl } from "@expertcont/i18n";
```

- [ ] **Step 3: Replace the card `<div>` with an `<a>` and migrate inline styles**

Replace the existing card-grid JSX (the `<div className="persona-grid" ...>` block and everything inside, plus the trailing `<style>` block) with:

```tsx
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {c.personas.map((p) => (
            <a
              key={p.slug}
              href={`${sectionUrl("solutions", locale)}?persona=${p.slug}`}
              className="card card-hover no-underline text-inherit p-8 flex flex-col gap-4 rounded-[var(--r-lg)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[var(--r-md)] bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] shrink-0">
                <Icon name={p.icon} size={26} />
              </div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--color-primary)]">
                {c.tierLabel} {p.tier}
                <span className="h-1 w-1 rounded-full bg-[var(--color-primary)]" />
                <span className="text-[var(--text-secondary)] font-semibold">{p.time}</span>
              </div>
              <h3 className="text-[20px] leading-tight mb-0">&ldquo;{p.short}&rdquo;</h3>
              <p className="text-sm leading-[1.55] text-[var(--text-secondary)] mb-auto">{p.desc}</p>
              <div className="inline-flex items-center gap-1.5 pt-4 border-t border-[var(--border)] text-[13px] font-semibold text-[var(--color-primary)]">
                {c.cta} <Icon name="arrow-right" size={14} />
              </div>
            </a>
          ))}
        </div>
```

The wrapping `<section className="section section-alt">` + `<Container>` + `<SectionHeader ... />` above stays unchanged. Drop the `<style>{...}</style>` line at the bottom.

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: no new errors in `HomePersonaPicker.tsx`.

---

## Task 5: Add `icon="calendar"` to all booking CTAs (home + service strip + FAQ final)

**Files:**
- Modify: `apps/web/src/components/home/HomeHeroSection.tsx`
- Modify: `apps/web/src/components/home/HomeCTASection.tsx`
- Modify: `apps/web/src/components/service/ServiceCTAStrip.tsx`
- Modify: `apps/web/src/components/faq/FaqPageIsland.tsx` (final CTA only — full FAQ refactor is Task 9)

- [ ] **Step 1: Audit each file for the booking CTA**

Run: `rg -n 'openModal\("booking"\)|"Programe[a-z]+|book' apps/web/src/components/home apps/web/src/components/service apps/web/src/components/faq`

For each `<Button>` (or `<button className="btn btn-primary">`) that triggers booking and is missing `icon="calendar"`, add it. If it's a raw `<button className="btn btn-primary ...">` with a manual `<Icon name="calendar" />` already present, leave that one alone (FAQ FinalCTA is converted in Task 9).

- [ ] **Step 2: Concrete edits — `HomeHeroSection.tsx`**

Find the primary booking `<Button variant="primary" ...>` in `HomeHeroSection.tsx`. Add `icon="calendar"` immediately after `variant="primary"`. If the component already renders an `<Icon name="calendar" />` inline as a child, remove that inline icon (the `Button.icon` prop replaces it).

- [ ] **Step 3: Concrete edits — `HomeCTASection.tsx`**

Same pattern: the primary booking `<Button>` gets `icon="calendar"`.

- [ ] **Step 4: Concrete edits — `ServiceCTAStrip.tsx`**

Same pattern: the primary booking `<Button>` gets `icon="calendar"`.

- [ ] **Step 5: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: no new errors.

---

## Task 6: ServiceSidebar — fix call/pricing button radius via `Button`, migrate inline styles

**Files:**
- Modify: `apps/web/src/components/service/ServiceSidebar.tsx`

The two offenders are the `<a className="btn btn-outline btn-sm">` anchors around lines 106–122 (phone call) and 168– (pricing). Both bypass the `Button` component. Replacing them ensures identical radius/padding to the primary CTA above.

- [ ] **Step 1: Replace the phone call anchor**

In `ServiceSidebar.tsx`, replace the existing call-button block:

```tsx
          <a
            href="tel:+37322123456"
            className="btn btn-outline btn-sm"
            style={{
              width: "100%",
              justifyContent: "center",
              textDecoration: "none",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="phone" size={14} />
            {pricing.callLabel}
          </a>
```

with:

```tsx
          <Button
            as-a
            href="tel:+37322123456"
            variant="ghost"
            size="sm"
            icon="phone"
            className="w-full justify-center text-white border-white/40 hover:bg-white/10"
          >
            {pricing.callLabel}
          </Button>
```

**Important:** The existing `Button` component already renders an `<a>` automatically when `href` is a string (no `as-a` prop is needed in TSX — just `href`). Use:

```tsx
          <Button
            href="tel:+37322123456"
            variant="ghost"
            size="sm"
            icon="phone"
            className="w-full justify-center text-white border-white/40 hover:bg-white/10"
          >
            {pricing.callLabel}
          </Button>
```

(Drop the prior `<Icon name="phone" ...>` child — `icon="phone"` handles it.)

- [ ] **Step 2: Replace the pricing link anchor**

Find the second `<a ... className="btn btn-outline btn-sm" ...>` in `ServiceSidebar.tsx` (the one wrapping `pricing.allPricingLabel`) and convert the same way:

```tsx
          <Button
            href={pricing.pricingHref}
            variant="ghost"
            size="sm"
            iconRight="arrow-right"
            className="w-full justify-center"
          >
            {pricing.allPricingLabel}
          </Button>
```

- [ ] **Step 3: Migrate the remaining inline styles in this file to Tailwind**

Walk the file top-to-bottom. For each `style={{...}}` prop on a JSX element you touched (the sticky `<aside>`, the CTA box, the decorative absolute circle, the eyebrow, headings, the pricing card, the related-services list, etc.), replace with Tailwind classes. Token colors use arbitrary values (`bg-[var(--color-primary-dark)]`), radii use tokens (`rounded-[var(--r-lg)]`).

For example, the outer aside:

```tsx
    <aside className="sticky top-24 flex flex-col gap-5">
```

The CTA dark box:

```tsx
      <div className="relative overflow-hidden rounded-[var(--r-lg)] bg-[var(--color-primary-dark)] text-white p-7">
        <div className="pointer-events-none absolute -top-7 -right-7 h-[140px] w-[140px] rounded-full border border-[rgba(223,183,65,0.3)]" />
        <div className="relative">
          ...
```

Apply the same pattern to the pricing-teaser `<div className="card" ...>`, the related-services list, and any other inline styles in the file. Use `text-[var(--color-primary)]`, `text-[var(--text-secondary)]`, `bg-[var(--bg-section-alt)]`, `border-[var(--border)]` for tokens that have no Tailwind alias.

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: no new errors in `ServiceSidebar.tsx`.

---

## Task 7: PricingIsland — `id="calculator"` anchor target

**Files:**
- Modify: `apps/web/src/components/pricing/PricingIsland.tsx`

- [ ] **Step 1: Locate the calculator section**

Run: `rg -n 'calc|Calculator|calcTitle' apps/web/src/components/pricing/PricingIsland.tsx`

Identify the JSX section that renders the price calculator (likely a `<section>` or `<div>` whose heading uses `calcTitle`).

- [ ] **Step 2: Add the anchor id**

Add `id="calculator"` to that wrapper element. Example:

```tsx
      <section id="calculator" className="section">
        ...calculator...
      </section>
```

If the wrapper already has another `id`, keep both by adding `id="calculator"` to the nearest parent `<section>` / `<div>` such that `#calculator` lands above the calculator title with normal scroll-to-anchor behaviour.

- [ ] **Step 3: Smoke-check**

Run: `pnpm dev` (manual) and visit `http://localhost:4321/preturi#calculator` — confirm the page scrolls to the calculator. (This is a one-line verification; revert the dev server when done.)

---

## Task 8: Footer — Calculator anchor + legal links

**Files:**
- Modify: `packages/ui/src/Footer/Footer.tsx`

- [ ] **Step 1: Calculator link**

In `Footer.tsx`, replace:

```tsx
              <li>
                <a href={sectionUrl("pricing", locale)}>
                  <Trans>Calculators</Trans>
                </a>
              </li>
```

with:

```tsx
              <li>
                <a href={`${sectionUrl("pricing", locale)}#calculator`}>
                  <Trans>Calculators</Trans>
                </a>
              </li>
```

- [ ] **Step 2: Legal links**

Replace the three `<a href={homeUrl(locale)}>` entries in the Legal column with the correct section URLs:

```tsx
              <li>
                <a href={sectionUrl("privacy", locale)}>
                  <Trans>Privacy</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("terms", locale)}>
                  <Trans>Terms</Trans>
                </a>
              </li>
              <li>
                <a href={sectionUrl("cookies", locale)}>
                  <Trans>Cookies</Trans>
                </a>
              </li>
```

- [ ] **Step 3: Drop the now-unused import**

If `homeUrl` is no longer used anywhere else in `Footer.tsx` (check with `rg -n homeUrl packages/ui/src/Footer/Footer.tsx`), remove it from the `import { homeUrl, sectionUrl } from "@expertcont/i18n";` line.

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @expertcont/ui exec tsc --noEmit`
Expected: no errors.

---

## Task 9: FaqPageIsland — move PageHeader inside island, full-width form, Tailwind migration

The FAQ island currently expects the Astro page to render `<PageHeader>` standalone and then mount the island. To put filters in the hero, the island has to own the PageHeader. The numbered category-group rendering is already correct — keep it.

**Files:**
- Modify: `apps/web/src/components/faq/FaqPageIsland.tsx`

- [ ] **Step 1: Extend the `Props` interface to receive PageHeader content**

Add these props to the existing `interface Props {...}`:

```ts
  // PageHeader content (was previously rendered by the Astro page)
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  pageBreadcrumbHome: string;
  pageBreadcrumbCurrent: string;
  homeHref: string;
```

- [ ] **Step 2: Destructure the new props in the component signature**

Add them to the destructured props list at the top of `FaqPageIsland`.

- [ ] **Step 3: Import `PageHeader` and `Container` from `@expertcont/ui`**

Top of file:

```ts
import { Accordion, Button, Container, Icon, PageHeader, Section } from "@expertcont/ui";
```

- [ ] **Step 4: Render `<PageHeader>` with `filters` slot at the top of the returned JSX**

Replace the existing outer wrapper:

```tsx
  return (
    <div>
      {/* Search bar */}
      <div style={{ ... }}>...</div>
      {/* Category chips */}
      <div style={{ ... }}>...</div>
      ...
```

with:

```tsx
  const filters = (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-[560px]">
        <Icon
          name="search"
          size={18}
          className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none"
        />
        <input
          className="input w-full rounded-[var(--r-pill)] py-3.5 pl-12 pr-4"
          placeholder={searchPlaceholder}
          readOnly
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = activeCat === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-[var(--r-pill)] text-[13px] font-semibold border ${
                active
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)]"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={pageEyebrow}
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={[
          { label: pageBreadcrumbHome, href: homeHref },
          { label: pageBreadcrumbCurrent },
        ]}
        filters={filters}
      />
      <Section tone="default">
        <Container>
          <div className="max-w-[860px]">
            {/* FAQ groups */}
            {totalItems === 0 ? (
              <div className="text-center py-16 text-[var(--text-secondary)]">{notFoundLabel}</div>
            ) : (
              <div className="flex flex-col gap-14">
                {visibleGroups.map((g, i) => (
                  <div key={i}>
                    <h3 className="text-[22px] mb-5 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--r-sm)] bg-[var(--color-primary-50)] text-[var(--color-primary)] text-sm font-bold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {g.cat}
                    </h3>
                    <Accordion items={g.items} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* FaqQuestionForm full-width */}
      <Section tone="alt">
        <Container>
          {/* paste the existing form JSX here, unchanged — it already uses Tailwind */}
        </Container>
      </Section>

      {/* FinalCTA */}
      <Section tone="default">
        <Container>
          <div className="relative overflow-hidden rounded-[var(--r-lg)] bg-[var(--color-primary-dark)] px-12 py-20 text-center">
            <div className="pointer-events-none absolute -top-24 -right-12 h-[300px] w-[300px] rounded-full border border-[rgba(223,183,65,0.2)]" />
            <div className="pointer-events-none absolute -bottom-36 -left-24 h-[400px] w-[400px] rounded-full border border-white/[0.06]" />
            <div className="relative max-w-[640px] mx-auto">
              <div className="mb-5 text-[13px] font-bold tracking-[0.1em] uppercase text-[var(--color-accent)]">
                {finalEyebrow}
              </div>
              <h2 className="text-white mb-4">{finalTitle}</h2>
              <p className="text-white/75 text-[18px] mb-8">{finalSubtitle}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="primary" size="lg" icon="calendar" onClick={() => openModal("booking")}>
                  {finalPrimary}
                </Button>
                <Button
                  href={`tel:${finalPhone.replace(/\s/g, "")}`}
                  variant="ghost"
                  size="lg"
                  icon="phone"
                  className="text-white border-white/40 hover:bg-white/10"
                >
                  {finalPhone}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
```

For the FaqQuestionForm middle section, copy the existing form `<section className="section section-alt ...">...form content...</section>` JSX into the `<Section tone="alt">` block above — it already uses Tailwind and is fine as-is; the surrounding `<Section>` simply gives it full-width treatment.

- [ ] **Step 5: Delete the old inline-styled search + chips + groups + final-CTA blocks**

Remove the original `{/* Search bar */}`, `{/* Category chips */}`, the old groups `<div style={{ display: "flex", flexDirection: "column", gap: 56 }}>`, and the old `{/* FinalCTA */}` `<div style={{ ... }}>` (replaced above). Remove the trailing `<style>{...}</style>` media-query block.

- [ ] **Step 6: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: errors in `intrebari-frecvente.astro` (and ru/en variants) because the island now requires new props — addressed in Task 10. No other errors.

---

## Task 10: Update FAQ Astro pages to use the new island contract

**Files:**
- Modify: `apps/web/src/pages/intrebari-frecvente.astro`
- Modify: `apps/web/src/pages/ru/voprosy.astro`
- Modify: `apps/web/src/pages/en/faq.astro`

- [ ] **Step 1: Romanian page**

In `apps/web/src/pages/intrebari-frecvente.astro`, drop the standalone `<PageHeader>` and `<Section>` + `<Container>` wrapper (the island owns those now). Replace the JSX inside `<PageShell>` with:

```astro
  <PageShell locale={locale} siblings={siblings}>
    <FaqPageIsland
      client:load
      locale={locale}
      groups={groups}
      categories={categories}
      pageEyebrow="Bază de cunoștințe"
      pageTitle="Întrebări frecvente"
      pageSubtitle="Răspunsuri la întrebările pe care ni le adresează cel mai des clienții noștri."
      pageBreadcrumbHome="Acasă"
      pageBreadcrumbCurrent="Întrebări frecvente"
      homeHref={homeUrl(locale)}
      searchPlaceholder="Caută o întrebare..."
      ctaTitle="Nu ai găsit răspunsul tău?"
      ctaBtn="Întreabă-ne direct"
      notFoundLabel="Nu am găsit întrebări pentru filtrele selectate."
      formEyebrow="Nu ai găsit răspunsul?"
      formTitle="Pune-ne o întrebare"
      formBody="Răspundem în mai puțin de 4 ore în zile lucrătoare. Întrebările frecvente le adăugăm și aici, ca să ajute mai departe."
      formNameLabel="Nume"
      formEmailLabel="Email"
      formSubjectLabel="Subiect"
      formQuestionLabel="Întrebarea ta"
      formConsentLabel="Sunt de acord cu prelucrarea datelor conform"
      formConsentLink="politicii de confidențialitate"
      formSubmitLabel="Trimite întrebarea"
      formSentTitle="Întrebarea ta a fost trimisă"
      formSentBody="Vei primi răspuns pe email în maxim 4 ore în zile lucrătoare."
      formSentReset="Trimite altă întrebare"
      formContactPhone="+373 22 123 456"
      formContactEmail="contact@expertcont.md"
      finalEyebrow="Hai să începem"
      finalTitle="Hai să discutăm despre afacerea ta"
      finalSubtitle="Programează o consultație gratuită de 30 de minute. Fără obligații, fără surprize."
      finalPrimary="Programează consultație gratuită (30 min)"
      finalPhone="+373 22 123 456"
    />
  </PageShell>
```

Drop the `Container`, `PageHeader`, `Section` imports from `@expertcont/ui` — only the island is needed now.

- [ ] **Step 2: Russian page**

In `apps/web/src/pages/ru/voprosy.astro`, apply the same restructuring. Pull the Russian strings from the existing file (where the page currently builds `<PageHeader eyebrow="..." title="..." subtitle="...">`) and add `pageBreadcrumbHome="Главная"`, `pageBreadcrumbCurrent="Вопросы"` (or the existing breadcrumb label).

- [ ] **Step 3: English page**

In `apps/web/src/pages/en/faq.astro`, same: pull existing English strings, add `pageBreadcrumbHome="Home"`, `pageBreadcrumbCurrent="FAQ"` (or matching existing label).

- [ ] **Step 4: Typecheck the whole web app**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: zero errors.

---

## Task 11: BlogIndexIsland — lift search + tags into PageHeader.filters

**Files:**
- Modify: `apps/web/src/components/blog/BlogIndexIsland.tsx`
- Modify: `apps/web/src/pages/blog/index.astro` and locale variants under `pages/ru/blog/` and `pages/en/blog/`

- [ ] **Step 1: Extend `Props` and signature**

In `BlogIndexIsland.tsx`, add these props (same pattern as FAQ):

```ts
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  pageBreadcrumbHome: string;
  pageBreadcrumbCurrent: string;
  homeHref: string;
```

Destructure them in the function signature.

- [ ] **Step 2: Import `PageHeader`, `Container`, `Section`**

```ts
import { ImagePlaceholder, Icon, PageHeader, Container, Section } from "@expertcont/ui";
```

- [ ] **Step 3: Build `filters` JSX (search input + category chips) and render via `PageHeader`**

Lift the existing search input and category chips out of the body. The shape mirrors FAQ:

```tsx
  const filters = (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-[560px]">
        <Icon
          name="search"
          size={18}
          className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none"
        />
        <input
          className="input w-full rounded-[var(--r-pill)] py-3.5 pl-12 pr-4"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = activeCat === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-[var(--r-pill)] text-[13px] font-semibold border ${
                active
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)]"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
```

Wrap the returned JSX with `<><PageHeader ... filters={filters} /><Section tone="default"><Container>...result grid...</Container></Section></>`.

Delete the original in-body search + chip blocks.

- [ ] **Step 4: Update Astro pages**

For each blog index page (`apps/web/src/pages/blog/index.astro`, `pages/ru/blog/index.astro`, `pages/en/blog/index.astro`):
- Remove the standalone `<PageHeader>` and wrapper `<Section><Container>`.
- Add `pageEyebrow`, `pageTitle`, `pageSubtitle`, `pageBreadcrumbHome`, `pageBreadcrumbCurrent`, `homeHref={homeUrl(locale)}` props to `<BlogIndexIsland>`.
- Pull the existing locale strings into those new props.

- [ ] **Step 5: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: zero errors.

---

## Task 12: GuidesIndexIsland — same pattern as Blog

**Files:**
- Modify: `apps/web/src/components/guides/GuidesIndexIsland.tsx`
- Modify: `apps/web/src/pages/<guides>/index.astro` per locale (the Romanian path is `ghiduri/index.astro`; ru is `rukovodstva/index.astro`; en is `guides/index.astro` per the existing `pages/en/` listing).

- [ ] **Step 1: Apply the exact same six-prop addition + `PageHeader` lifting pattern from Task 11 to `GuidesIndexIsland.tsx`**

(Identical structure — if Guides has a different filter UI, e.g. only tags and no search, adapt the `filters` JSX accordingly, but the lifting pattern is the same.)

- [ ] **Step 2: Update Astro pages**

For each guides index page, drop the standalone `<PageHeader>` and pass the new props to the island. Use the existing locale strings.

- [ ] **Step 3: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: zero errors.

---

## Task 13: LegalIsland — match design layout + Tailwind

**Files:**
- Modify: `apps/web/src/components/legal/LegalIsland.tsx`

The data already includes `lastUpdated`, `updated`, `questionsTitle`, `questionsBody`, `questionsEmail`, `questionsBtn` per kind/locale. Render them to match the design's structure: last-updated badge at the top, sections in a vertical stack, Questions panel at the bottom.

- [ ] **Step 1: Replace the return JSX**

In `LegalIsland.tsx`, replace whatever the component currently returns with:

```tsx
export default function LegalIsland({ locale, kind, contactHref }: LegalIslandProps) {
  const data = content[locale][kind];
  const labels = breadcrumbLabels[locale];

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={data.title}
        breadcrumbs={[
          { label: labels.home, href: homeUrl(locale) },
          { label: labels.legal },
          { label: data.title },
        ]}
      />
      <section className="section">
        <div className="container-narrow">
          <div className="mb-10 flex items-center gap-3 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-section-alt)] px-5 py-3.5">
            <Icon name="file-text" size={18} className="text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              {data.lastUpdated}: <strong className="text-[var(--text-primary)]">{data.updated}</strong>
            </span>
          </div>

          <div className="flex flex-col gap-9">
            {data.sections.map((s, i) => (
              <div key={i}>
                <h3 className="text-[22px] mb-3">{s.h}</h3>
                <p className="text-[16px] leading-[1.7] text-[var(--text-secondary)]">{s.t}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-section-alt)] p-7">
            <h4 className="mb-2.5">{data.questionsTitle}</h4>
            <p className="text-[15px] text-[var(--text-secondary)] mb-4">{data.questionsBody}</p>
            <Button href={contactHref} variant="ghost" size="sm" iconRight="arrow-right">
              {data.questionsBtn}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Ensure imports**

Top of file:

```ts
import { Button, Icon, PageHeader } from "@expertcont/ui";
import { homeUrl, type Locale } from "@expertcont/i18n";
```

(Drop `I18nRoot` if it was imported but unused. Note: if the existing render wraps the island in `<I18nRoot>`, keep it — the new return goes inside that wrapper.)

- [ ] **Step 3: Remove the standalone `<PageHeader>` from each legal Astro page**

In `apps/web/src/pages/confidentialitate.astro`, `termeni.astro`, `cookies.astro` and their ru/en counterparts (`pages/ru/konfidentsialnost.astro`, `usloviya.astro`, `cookies.astro`; `pages/en/privacy.astro`, `terms.astro`, `cookies.astro`):
- If the page renders a standalone `<PageHeader>` above `<LegalIsland>`, remove it — the island now owns it.
- If the page only renders `<LegalIsland>`, no change needed.

- [ ] **Step 4: Typecheck**

Run: `pnpm --filter @expertcont/web exec astro check`
Expected: zero errors.

---

## Task 14: Smoke-test in the browser

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Expected: Astro listening on `http://localhost:4321`.

- [ ] **Step 2: Walk the changed routes**

Open each and confirm visually:
- `/` — service cards are clickable links going to detail pages; persona cards link to `/solutii?persona=...`.
- `/servicii/contabilitate` — primary CTA and call CTA have the same border radius; calendar icon on primary; phone icon on call button.
- `/intrebari-frecvente` — search + topic chips render inside the hero band, not body; numbered category groups (`01`, `02`, …) appear; question-submission form spans full container width; final CTA matches design.
- `/blog`, `/ghiduri` — search + tag chips in hero band.
- `/preturi#calculator` — page scrolls to calculator on load.
- `/confidentialitate`, `/termeni`, `/cookies` — "Ultima actualizare" badge at top, "Ai întrebări?" panel at bottom.
- Footer Calculators link points to `/preturi#calculator`; Privacy/Terms/Cookies link to the right pages.

Spot-check `ru` and `en` variants for FAQ and the footer.

- [ ] **Step 3: Stop the dev server.**

---

## Task 15: Final verification + batch commit

- [ ] **Step 1: Typecheck**

Run: `pnpm typecheck`
Expected: zero errors.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: zero errors. If unused imports remain (e.g. `homeUrl` in `Footer.tsx` after Task 8), remove them.

- [ ] **Step 3: Tests**

Run: `pnpm test`
Expected: zero failures.

- [ ] **Step 4: Format**

Run: `pnpm format`
Expected: files reformatted (no errors).

- [ ] **Step 5: Review the diff**

Run: `git status` and `git diff --stat`
Expected: only the files in the file-map section above are modified, plus `apps/web/src/lib/serviceIcons.ts` is created.

- [ ] **Step 6: Stage and commit**

Run:

```bash
git add apps/web/src/lib/serviceIcons.ts \
        apps/web/src/components/home/HomeServices.tsx \
        apps/web/src/components/home/HomePersonaPicker.tsx \
        apps/web/src/components/home/HomeHeroSection.tsx \
        apps/web/src/components/home/HomeCTASection.tsx \
        apps/web/src/components/service/ServiceSidebar.tsx \
        apps/web/src/components/service/ServiceCTAStrip.tsx \
        apps/web/src/components/faq/FaqPageIsland.tsx \
        apps/web/src/components/blog/BlogIndexIsland.tsx \
        apps/web/src/components/guides/GuidesIndexIsland.tsx \
        apps/web/src/components/legal/LegalIsland.tsx \
        apps/web/src/components/pricing/PricingIsland.tsx \
        apps/web/src/pages/intrebari-frecvente.astro \
        apps/web/src/pages/ru/voprosy.astro \
        apps/web/src/pages/en/faq.astro \
        apps/web/src/pages/blog \
        apps/web/src/pages/ru/blog \
        apps/web/src/pages/en/blog \
        apps/web/src/pages/ghiduri \
        apps/web/src/pages/ru/rukovodstva \
        apps/web/src/pages/en/guides \
        apps/web/src/pages/confidentialitate.astro \
        apps/web/src/pages/termeni.astro \
        apps/web/src/pages/cookies.astro \
        apps/web/src/pages/ru/konfidentsialnost.astro \
        apps/web/src/pages/ru/usloviya.astro \
        apps/web/src/pages/ru/cookies.astro \
        apps/web/src/pages/en/privacy.astro \
        apps/web/src/pages/en/terms.astro \
        apps/web/src/pages/en/cookies.astro \
        packages/ui/src/Footer/Footer.tsx \
        packages/ui/src/PageHeader/PageHeader.tsx

git commit -m "$(cat <<'EOF'
feat(web): align homepage, FAQ, blog/guides, legal pages with design

- HomeServices/HomePersonaPicker cards link to detail/persona URLs
- Shared serviceIcons resolver in apps/web/src/lib
- Calendar icon on every booking CTA
- ServiceSidebar call/pricing buttons go through Button so radius matches
- PageHeader gains an optional filters slot
- FAQ/Blog/Guides islands own PageHeader and render search+tags in the hero
- FAQ question form is full-width; final CTA uses Button for consistency
- Footer Calculators link anchors to #calculator on pricing; legal links wired
- LegalIsland renders last-updated badge + Questions panel matching design
- Migrate inline style props on touched files to Tailwind utility classes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 7: Confirm clean status**

Run: `git status`
Expected: working tree clean for tracked files (untracked items from before are unaffected).

---

## Self-review notes

- **Spec coverage:** Items 1–9 of the spec map to Tasks 3+4, 2, 5, 6, 9+10, 11+12, 7+8, 13, and ambient (Tailwind migration) respectively.
- **Placeholders:** None. Every step shows the concrete edit or command. Where the exact existing JSX block isn't reproduced (because it's already in the file), the step names the symbol and surrounding context.
- **Type consistency:** `PageHeader.filters?: ReactNode` is the same name in Task 1 and consumers (Tasks 9, 11, 12, 13). `serviceIcon(key: string): IconName` is the same signature in Task 2 and consumer Task 3. `pageEyebrow`/`pageTitle`/`pageSubtitle`/`pageBreadcrumbHome`/`pageBreadcrumbCurrent`/`homeHref` is the exact same six-prop set in Tasks 9–12.
- **Scope:** One focused pass. No new features beyond what the spec calls for.
