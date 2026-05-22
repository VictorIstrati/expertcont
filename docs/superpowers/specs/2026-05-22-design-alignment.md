# Design alignment pass — homepage, service detail, FAQ, blog, guides, footer, legal

**Date:** 2026-05-22
**Status:** Approved for planning
**Reference:** `design/` prototype (throwaway, gitignored — visual reference only)

## Goal

Bring the live site in line with the `design/` prototype on the specific points the user called out, fix one button-radius regression, and migrate every touched file from inline `style={{}}` to Tailwind utility classes per project convention.

Each item below is independently mergeable. Implementation order is bottom-up: shared primitives first (`Button`, `PageHeader`, service-icon resolver), then page-level changes.

## Scope

### 1. Homepage — make services & solutions cards actually navigate

**Current:** `HomeServices` cards render as `<div className="card card-hover" style={{ cursor: "pointer" }}>` with no `href` and no click handler. `HomePersonaPicker` (solutions) cards have the same shape.

**Change:**
- Each service card becomes a real anchor. Destination: detail URL if a detail page exists for the slug (via `detailUrl(...)`), otherwise the services index (`sectionUrl("services", locale)`).
- The featured "CORE" card (accounting) behaves identically — same link affordance, no visual difference beyond what already exists.
- `HomePersonaPicker` persona cards link to `sectionUrl("solutions", locale)` with a `?persona=<slug>` query param (or anchor) the solutions island can read on mount to preselect.

**Out of scope:** Reading the persona param on the solutions page beyond a minimal `useEffect` preselect; full deep-linking design.

### 2. Canonical service-icon resolver

**Current:** `HomeServices.tsx` defines a `serviceIcon(slug)` map locally. The same map appears in `design/ui.jsx` and is conceptually duplicated wherever a service is rendered with an icon (`ServiceIndexGrid`, `ServiceSidebar` related-services list, `HomePersonaPicker` if it gets service icons).

**Change:**
- Move the resolver to `apps/web/src/lib/serviceIcons.ts`. It is web-only (the `IconName` type lives in `@expertcont/ui`); placing it in `packages/i18n` would create a cross-package dep with no payoff.
- Signature: `serviceIcon(slug: string): IconName`. Default fallback: `"briefcase"`.
- Replace local copies in every consumer.

### 3. "Book free consultation" — calendar icon present on all CTAs

**Current:** `ServiceSidebar` correctly passes `icon="calendar"` to its primary `Button`. Other booking CTAs that should match (homepage hero, service-detail body CTA strip, FAQ final CTA) do not.

**Change:** Add `icon="calendar"` to every primary booking button labeled "Programează consultație gratuită" / equivalent in `ru`/`en`. Concrete spots to audit and update:
- `apps/web/src/components/home/HomeHeroSection.tsx`
- `apps/web/src/components/home/HomeCTASection.tsx`
- `apps/web/src/components/service/ServiceCTAStrip.tsx`
- Any FAQ final-CTA button in `FaqPageIsland.tsx`

If a CTA's button is `Button` and doesn't accept `icon`, it does — see `ServiceSidebar.tsx:100`. No new prop work.

### 4. Service detail — phone/call button radius matches primary

**Current:** `ServiceSidebar.tsx:106-122` and `:168-` render the secondary call and "Vezi prețurile" buttons as raw `<a className="btn btn-outline btn-sm">`. These use global `.btn` classes whose radius does not match `Button.module.css`'s `var(--radius-md)` — visible mismatch in the design.

**Change:**
- Extend `packages/ui/src/Button/Button.tsx` to accept `as="a"` (with `href`) so a `Button` can render as an anchor while keeping all of its module-CSS styling. Default remains `<button>`.
- Add a `ghost` variant if it doesn't already exist, or reuse the existing `ghost` for the dark-bg call button by allowing a `tone="onDark"` modifier that flips border/text to the white-translucent palette used in the design.
- Replace the two `<a className="btn btn-outline btn-sm">` usages in `ServiceSidebar.tsx` with `<Button as="a" href="tel:..." variant="ghost" icon="phone" size="sm">{label}</Button>` and the equivalent for the pricing link.
- Test (`packages/ui/src/Button/Button.test.tsx`): one case for `as="a" href="..."` rendering as `<a>` with the same module class.

### 5. FAQ page — match design layout

**Current:** `FaqPageIsland.tsx` renders topic chips + search inside the body content area and uses category-tab filtering. Numbered category groups from the design are absent. `FaqQuestionForm` (if separate) is constrained to `container-narrow`.

**Change:**
- **PageHeader gains a slot.** Extend `packages/ui/src/PageHeader/PageHeader.tsx` with an optional `filters?: ReactNode` (or `children`) rendered inside the hero band, below the subtitle, above the breadcrumbs trailer. Existing call sites that don't pass it are unaffected.
- **FAQ page** moves its search input and topic tag chips into that slot. Body no longer renders them.
- **Body renders numbered groups** matching `design/pages-stubs.jsx:460-471`: each category is `<h3>` with a 36×36 chip showing `01`, `02`, … in primary-50 background, then an `<Accordion>` of that group's items. No category-tab filtering — all groups visible, search filters within all groups.
- **`FaqQuestionForm`** renders inside `<section className="section">` with `container` (full content width), not `container-narrow`. Match the design's form: two-column layout on desktop (name+email row, question textarea full-width, submit button), single-column on mobile.
- Keep the existing final CTA section as-is.

### 6. Blog & Guides — search + tags in PageHeader hero

**Current:** `BlogIndexIsland.tsx` and `GuidesIndexIsland.tsx` render search + category tags as the first body element.

**Change:** Lift both into the `PageHeader.filters` slot (same slot added in item 5). Body content becomes only the result grid + pagination + empty state.

### 7. Footer — Calculator link → pricing#calculator

**Current:** Footer "Calculators" entry in `packages/ui/src/Footer/Footer.tsx` (around line 206) is not wired to a working destination.

**Change:**
- Footer "Calculators" link → `${pageUrl("pricing", locale)}#calculator`.
- `apps/web/src/pages/preturi.astro` (or whichever component renders the calculator inside it — `PricingSection.tsx`) gets `id="calculator"` on the calculator wrapper element so the anchor lands on the section.

### 8. Legal pages — visual match + footer links wired

**Current:** `LegalIsland.tsx` exists with content for all three kinds. Footer doesn't link to them.

**Change:**
- **Visual:** `LegalIsland` renders the design's structure: an "Ultima actualizare" badge (file-text icon + label + date) row above the sections, sections spaced consistently (gap 36, h3 size 22, body text 16/1.7), and an "Ai întrebări?" panel at the end with email link + outline "Contactează-ne" button pointing to `contactHref`. See `design/pages-stubs.jsx:484-558` for reference.
- **Footer:** add three links (Privacy / Terms / Cookies) pointing to `sectionUrl("privacy"|"terms"|"cookies", locale)`. Add i18n strings for any missing labels.

### 9. Tailwind migration on touched files

**Rule:** every file edited in items 1–8 has its inline `style={{}}` props replaced with Tailwind utility classes (per project memory: no inline styles).

**Mechanics:**
- Token colors that have no Tailwind equivalent use arbitrary values: `bg-[var(--color-primary-dark)]`, `text-[var(--color-accent)]`.
- Border radii use design tokens: `rounded-[var(--r-lg)]`, `rounded-[var(--r-pill)]`.
- Spacing uses Tailwind's default scale where it lines up with the design (`p-6` ≈ 24px, `gap-5` ≈ 20px); arbitrary values otherwise.
- CSS Modules that already exist (e.g. `LocaleSwitcher.module.css`, `Footer.module.css`) stay; do not introduce new module files for the migrated styles.

**Out of scope:** Touching files not edited by items 1–8.

## Architecture notes

- **One linchpin per cluster.** Items 5 + 6 both depend on the `PageHeader.filters` slot — one additive prop unlocks both. Item 4's `Button.as="a"` change removes the last `.btn` global-class usage in service pages. Item 2's shared resolver removes the only duplicated logic between home and service detail.
- **No cross-package deps added.** Service-icon resolver lives in the web app, not in `@expertcont/i18n`, to keep i18n free of `IconName` from `@expertcont/ui`.
- **No new pages.** All three legal routes already exist; this pass is presentational + linking.

## Files touched

- `apps/web/src/components/home/HomeServices.tsx`
- `apps/web/src/components/home/HomePersonaPicker.tsx`
- `apps/web/src/components/home/HomeHeroSection.tsx`
- `apps/web/src/components/home/HomeCTASection.tsx`
- `apps/web/src/components/service/ServiceSidebar.tsx`
- `apps/web/src/components/service/ServiceCTAStrip.tsx`
- `apps/web/src/components/faq/FaqPageIsland.tsx`
- `apps/web/src/components/blog/BlogIndexIsland.tsx`
- `apps/web/src/components/guides/GuidesIndexIsland.tsx`
- `apps/web/src/components/legal/LegalIsland.tsx`
- `apps/web/src/components/PricingSection.tsx` (anchor id for calculator)
- `apps/web/src/pages/preturi.astro` (verify anchor target)
- `packages/ui/src/Button/Button.tsx`, `Button.module.css`, `Button.test.tsx` (add `as="a"`, optional `tone`)
- `packages/ui/src/PageHeader/PageHeader.tsx` (add `filters?: ReactNode`)
- `packages/ui/src/Footer/Footer.tsx` (calculator anchor + legal links)
- New: `apps/web/src/lib/serviceIcons.ts`

## Verification

- `pnpm typecheck && pnpm lint && pnpm test`
- Manual: load `/`, `/servicii/contabilitate`, `/intrebari-frecvente`, `/blog`, `/ghiduri`, `/preturi#calculator`, `/confidentialitate`, `/termeni`, `/cookies` in dev. Spot-check `ru` and `en` variants for the homepage cards + footer links.
- Visual: confirm sidebar primary + call button share the same radius; calendar icon present on every booking CTA; FAQ shows numbered category chips with search/tags in the hero band.

## Out of scope

- Pricing calculator UI changes (only the anchor target).
- New translations beyond labels strictly required by the items above.
- Refactoring `PageHeader` beyond the additive slot.
- Touching components not in the file list.
- Persona deep-link routing beyond a minimal mount-time `?persona=` read.
