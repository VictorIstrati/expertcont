# Code review cleanup — execution status + remaining work

**Date opened:** 2026-05-22
**Last updated:** 2026-05-22 (after P1+P2+P3 done, P4+P6 partial)
**Branch state:** changes uncommitted on `feat/website-initial` (the initial-site branch). Verified `pnpm typecheck && pnpm test && pnpm lint` clean.

## What this plan tracks

A 6-phase review-driven cleanup based on 3 parallel audits (shared packages, web React components, Astro layer). 5 of 6 phases have been fully or partially executed in-session; the rest is scoped here for future sessions.

## Constraints (do not violate)

- **Keep `console.log` in form submission handlers** until the backend lands (e.g. `ContactIsland.tsx:109`, `BookingModal.tsx`, etc.). Don't strip these as dead debug code.
- No new dependencies unless explicitly approved.
- Verify after each phase with `pnpm typecheck && pnpm test && pnpm lint`.
- Project memory: no auto-commits; user invokes commit/PR commands explicitly.

---

## ✅ DONE — Phase 1: Correctness bugs

- [x] `localeTag(locale)` helper added in `@expertcont/i18n` (`packages/i18n/src/locales.ts`)
- [x] `PricingIsland.tsx` uses `localeTag(locale)` for `toLocaleString` (no more hardcoded `"ro-RO"`)
- [x] `FaqAccordion.answer: ReactNode` — removed `dangerouslySetInnerHTML` (XSS surface eliminated)
- [x] `packages/ui/src/Heading/Heading.tsx` — typed `Record<Level, ...>` lookup replaces `as unknown as` cast
- [x] `packages/i18n/src/localizedPaths.ts` — `params.locale: string | undefined` (proper type, no casts)
- [x] `apps/web/src/middleware.ts` — `/ro` redirect handles search + hash + exact match + slash boundary
- [x] `activeSection="blog"` typo fixed → `"guides"` on 3 guides index pages; `NavSection` union extended with `"guides"`

## ✅ DONE — Phase 2: Hydration strategy

- [x] `PageShell.astro`: `FooterIsland`, `CookieBanner`, `ModalsHost` → `client:idle`
- [x] All 41 page files: islands `client:load` → `client:visible` (only `NavWithSwitcher` stays `client:load`)

## ✅ DONE — Phase 3: Stable keys + nav-h CSS var

- [x] `--nav-h` (in tokens.css) bridged as `--spacing-nav-h` in `@theme inline`; `top-nav-h` works as Tailwind utility
- [x] 8 sticky elements migrated: `top-20`/`top-24` → `top-nav-h` (FaqPageIsland filter bar, BlogIndexIsland filter bar, ServiceSidebar, SolutionsIsland, blog/[slug].astro × 3 locales, guides/[slug].astro × 3 locales, BlogDetailIsland, GuidesDetailIsland)
- [x] `key={i}` → stable keys in: `Accordion` (key={it.q}), `PageHeader` (breadcrumb key={b.label}), `AboutIsland` (stats/values/team by label/title/name), `ContactIsland` (channel key={ch.label}), `ReviewsPageIsland` (review key={author + body slice})

## ✅ DONE — Phase 4 (blog + guides): Page deduplication

- [x] `content/config.ts` schema extended: `blog-meta` + `guides-meta` now require `category: localeMap`, `readTime: number`, `featured?: boolean`; `blog-meta` also `author?: string`
- [x] Existing meta JSONs (`tax-changes-2026.json`, `how-to-register-business.json`) updated with new fields
- [x] New: `apps/web/src/lib/blogIndexProps.ts` — drives blog index from `blog-meta` collection; bundles per-locale labels
- [x] New: `apps/web/src/lib/guidesIndexProps.ts` — same for guides
- [x] All 6 index pages collapsed to ~28 LOC each (from ~110): just import + call shared props + spread to island
  - `pages/blog/index.astro`, `pages/ru/blog/index.astro`, `pages/en/blog/index.astro`
  - `pages/ghiduri/index.astro`, `pages/ru/rukovodstva/index.astro`, `pages/en/guides/index.astro`
- [x] No more hardcoded post arrays; adding a new post = single JSON + MDX, no per-locale Astro edits.

## ✅ DONE — Phase 6 (SEO + Intl): partial

- [x] `Base.astro` head now ships:
  - `<meta name="robots" content="index, follow">`
  - Open Graph: `og:type/url/title/description/image/locale/site_name`
  - Twitter Card: `twitter:card/title/description/image`
  - Sitewide Organization LD-JSON (`<script is:inline type="application/ld+json">`)
- [x] `BookingModal.tsx` uses `Intl.DateTimeFormat(localeTag(locale), {weekday/month: "short"})` for date strings (no more hardcoded `dayNames`/`monthNames` arrays — note: arrays still defined in `strings` blob; harmless dead data, can be cleaned later)

---

## ⏭ REMAINING

### Phase 6 leftovers

- [ ] **Per-form `htmlFor`/`id` label associations** (a11y polish, ~25 small edits):
  - `apps/web/src/components/contact/ContactIsland.tsx` (~6 fields)
  - `apps/web/src/components/faq/FaqPageIsland.tsx` (question form, ~4)
  - `apps/web/src/components/modals/BookingModal.tsx` (~5)
  - `apps/web/src/components/modals/AskQuestionModal.tsx` (~4)
  - `apps/web/src/components/modals/ReviewModal.tsx` (~5)

  Pattern: pair each label with a unique id. Use `useId()` from React for safety:
  ```tsx
  const id = useId();
  <label htmlFor={id}>Nume *</label>
  <input id={id} className="input" required ... />
  ```

- [ ] **Mass Lingui migration** of `Record<Locale, ...>` copy blobs. Plan PoC scope: 4 components.
  - `BookingModal.tsx` (largest — 200+ string lines)
  - `ContactIsland.tsx`
  - `FaqPageIsland.tsx` (`TOPICS`, `RESPONSE_LABEL`)
  - `CookieBanner.tsx` (`COPY`)
  - `Footer.tsx` (`newsletterPlaceholder` ternary)

  Replace `COPY[locale].title` style with `<Trans>` macro. After: `pnpm extract` to update catalogs; translators fill in `.po` files; `pnpm compile`.

- [ ] **Clean up dead `dayNames`/`monthNames` arrays** in `BookingModal.tsx:39-42, 78-93, 128-143, 178-193` — no longer used after `Intl.DateTimeFormat` migration.

- [ ] **Create default OG image assets**:
  - `apps/web/public/og.png` (1200×630 brand image)
  - `apps/web/public/logo.png` (square brand mark for LD-JSON)
  - Both currently referenced in `Base.astro` but don't exist on disk.

### Phase 4 leftovers — services index dedup

- [ ] **Services index pages** (`pages/servicii/index.astro`, `pages/ru/uslugi/index.astro`, `pages/en/services/index.astro`) still each have ~150 LOC of locale-specific JSX in the "comparison strip" (`<div class="card border-primary">...Cu ExpertCont/With ExpertCont...</div>`). Strategy options:
  - **Option A:** Extract comparison-strip data to `lib/servicesComparison.ts` (`Record<Locale, { withUs: { title, items[] }, withoutUs: { title, items[] } }>`); render via a small Astro component or inline.
  - **Option B:** Move it into a new `ServicesComparison.tsx` React island.

  Recommend Option A — pure static content doesn't need an island.

### Phase 5 entirely — mega-component decomposition

Each split is its own focused PR with verification (recommended order: BookingModal → FaqPageIsland → PricingIsland, smallest interactions first).

- [ ] **Split `BookingModal.tsx`** (~520 LOC) into per-step components. Suggested files:
  ```
  apps/web/src/components/modals/booking/
    BookingModal.tsx       ← parent: step machine + Modal wrapper (~100 LOC)
    ServiceStep.tsx
    DateTimeStep.tsx
    ContactStep.tsx
    ConfirmationStep.tsx
    types.ts               ← shared BookingData type
  ```
  Parent owns `data` state; each step receives `(data, onChange, onNext, onBack)` props. Drop the strings blob during this split (use Lingui per the P6 leftover above OR keep blob as `strings.ts` next to the parent).

- [ ] **Split `FaqPageIsland.tsx`** (487 LOC) into:
  ```
  apps/web/src/components/faq/
    FaqPageIsland.tsx      ← parent (PageHeader + composition, ~100 LOC)
    FaqFilterBar.tsx       ← sticky search + chips
    FaqGroups.tsx          ← numbered category groups + Accordion
    FaqQuestionForm.tsx    ← submit-a-question form (own state)
    FaqFinalCta.tsx        ← bottom dark-band CTA
  ```

- [ ] **Split `PricingIsland.tsx`** (601 LOC) into:
  ```
  apps/web/src/components/pricing/
    PricingIsland.tsx      ← parent composition (~150 LOC)
    PriceCalculator.tsx    ← currently inner function; extract
    TierGrid.tsx           ← tier card grid + popular badge + toggle
    AddOnsTable.tsx        ← extras table
    PricingFaq.tsx         ← Accordion wrapper
    PricingCta.tsx         ← bottom CTA band
  ```

### Lower-priority polish (not in any phase but flagged by audits)

- [ ] **`packages/ui/src/Nav/Nav.tsx:124`** — `setTimeout` in `onBlur` for language dropdown. Replace with `onMouseLeave` + proper focus tracking OR `Popover` pattern (no setTimeout).

- [ ] **`packages/ui/src/Footer/Footer.tsx:33-36`** — newsletter form: `setSubscribed(true)` fires regardless of whether `onNewsletterSubscribe` callback succeeded. Make `setSubscribed` conditional on callback success (will require `onNewsletterSubscribe` to return a Promise<boolean>).

- [ ] **`packages/ui/src/Footer/Footer.tsx`** — `SERVICE_SLUGS` constant duplicates data in `@expertcont/i18n` `routeSegments`. Move it to the i18n package as an exported per-service slug map OR derive from `routeSegments` + a per-service slug helper.

- [ ] **`packages/ui/src/Icon/Icon.tsx:313`** — `default: return null` exhaustive switch. Add compile-time exhaustiveness check:
  ```ts
  default: {
    const _exhaustive: never = name;
    return null;
  }
  ```

- [ ] **Blog detail page hardcoded strings** — now that `blog-meta` has `category` + `readTime` + `featured`, drive these from meta in `pages/blog/[slug].astro` (and ru/en + guides equivalents) instead of hardcoded `<span class="pill">Fiscalitate</span>` and `"8 min citire"`. The `relatedPosts` arrays in `blog/[slug].astro` files should also be derived from `blog-meta` (filter out current article, slice 3).

- [ ] **Per-page LD-JSON** (Article, FAQ, Service, BreadcrumbList) — currently only sitewide Organization. Add per-content-type structured data to detail pages for richer SERP results.

- [ ] **`pnpm-lock.yaml`** — check `git status` for any drift after schema/dep changes; commit lockfile separately if updated.

### Out of scope / external dependencies

- Backend wiring for form submissions (keeping `console.log` placeholders until then).
- Performance instrumentation (Lighthouse, web-vitals).
- Dark theme verification pass.
- Image optimization, asset pipeline.

---

## Verification checklist (run before commit)

```bash
pnpm typecheck       # 0 errors, 0 warnings
pnpm test            # 97/97 UI tests pass
pnpm lint            # 0 errors (1 pre-existing warning in Nav.test.tsx is OK)
pnpm extract:check   # only after Lingui migration changes
pnpm dev             # manual smoke on / /preturi /blog /intrebari-frecvente /servicii/contabilitate
```

## Suggested commit/PR breakdown for remaining work

If resuming:

1. **chore(a11y): wire htmlFor/id on form labels** — P6 leftover #1
2. **refactor(content): drive blog/guide detail pages from meta** — lower-priority polish #5
3. **refactor(pages): dedup services index comparison strip** — P4 leftover
4. **refactor(modals/booking): split BookingModal into step components** — P5
5. **refactor(faq): split FaqPageIsland into sub-components** — P5
6. **refactor(pricing): split PricingIsland into sub-components** — P5
7. **chore(ui): tighten Nav setTimeout, Footer state, Icon exhaustiveness, Footer slugs source** — lower-priority polish #1–4
8. **i18n: migrate BookingModal/Contact/FAQ/Cookie copy to Lingui** — P6 leftover #2 (largest, last)
9. **assets: add default og.png + logo.png** — P6 leftover #4

Each commit independently verifiable + reversible.
