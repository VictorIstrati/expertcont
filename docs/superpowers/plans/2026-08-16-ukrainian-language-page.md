# Ukrainian-language page (`/ua/konsulski-posluhy`) — Plan

**Goal:** Publish a fully Ukrainian version of the Ukrainian consular service page — content *and* interface, including the booking modal — without making Ukrainian a site-wide language.

**Decisions taken:** URL `/ua/konsulski-posluhy`. Full Ukrainian, including a fourth Lingui catalog.

---

## The idea that makes this work: two independent axes

Today one type does two jobs. Splitting them is the whole design.

| Axis | Type | Governs | Change |
| --- | --- | --- | --- |
| **Routing / content** | `Locale = "ro" \| "ru" \| "en"` | URLs, `routeSegments`, `ContentMeta`, hreflang, content collections, sitemap | **unchanged** |
| **Interface language** | `UiLocale = Locale \| "uk"` *(new)* | which Lingui catalog is active | **gains `uk`** |

The Ukrainian page is therefore `<I18nRoot locale="uk">` (Ukrainian labels) wrapping a `Nav locale="ru"` (links pointing into the Russian site, because no Ukrainian site exists). That combination is exactly what we want: Ukrainian chrome, working navigation.

Because `Locale` never gains `uk`, nothing forces a Ukrainian value into `routeSegments`, the 20-odd `ContentMeta` JSON files, `serviceData`, or the sitemap labels.

## Costs to accept before starting

1. **Permanent catalog obligation.** Once `uk` is in `lingui.config.ts`, `pnpm extract` tracks it forever. Every new UI string anywhere on the site — a button on the pricing page, a label in the contact form — will report as missing Ukrainian, even though only one page renders Ukrainian. `extract:check` will not fail on missing translations (only on catalog drift), but the report will always show a `uk` gap.
2. **Payload on every page.** `setup.ts` eagerly `i18n.load()`s all catalogs at module init so activation can be synchronous during SSR. A fourth catalog therefore ships in the island bundle for *every* visitor, not only Ukrainian ones. Roughly 150 short strings — small, but it is not free and it is site-wide.
3. **Fallback behaviour.** `fallbackLocales.default` is `ro`. Any untranslated `uk` message renders **Romanian**, not Russian — the worst of the three for this audience. Every message must actually be filled in.

---

## Task 1 — Add `uk` as a UI locale in `packages/i18n`

**Files:** `src/locales.ts`, `src/setup.ts`, `src/I18nRoot.tsx`, `lingui.config.ts`, `src/locales.test.ts` (new)

- `locales.ts`: add `UI_LOCALES = [...LOCALES, "uk"]`, `export type UiLocale`, and a `uk-UA` entry in the locale-tag map. `LOCALES`, `Locale` and `DEFAULT_LOCALE` stay exactly as they are.
- `lingui.config.ts`: `locales: ["ro", "ru", "en", "uk"]`.
- `setup.ts`: import and `i18n.load()` the `uk` catalog; widen `activateLocaleSync` / `activateLocale` to `UiLocale`.
- `I18nRoot.tsx`: prop type `UiLocale`.
- Export `UiLocale` and `UI_LOCALES` from `src/index.ts`.

Widening a parameter type is source-compatible — every existing `Locale` caller still type-checks.

**Test:** `activateLocaleSync("uk")` sets `i18n.locale === "uk"`, and `UI_LOCALES` contains every `Locale`.

**Verify:** `pnpm --filter @expertcont/i18n test`, then `pnpm typecheck`.

## Task 2 — Generate and fill the Ukrainian catalog

**Files:** `packages/i18n/src/locales/uk/messages.po` (generated), `messages.ts` (compiled)

- `pnpm extract` creates `uk/messages.po` with ~150 msgids and empty msgstr.
- Translate every entry. Nothing may be left empty — empty falls back to Romanian.
- `pnpm compile`, then commit both `.po` and `.ts`.

**Verify:** `pnpm extract` reports `uk` missing = 0. Spot-check the booking modal strings, which are the ones that matter most on this page.

## Task 3 — Ukrainian content for the catalogue

**Files:** `apps/web/src/components/service/ukraineCatalogue.ts`, `UkraineCatalogueSection.tsx`, `modals/booking/ServiceStep.tsx`, `ConfirmationStep.tsx`

- Declare `type PageLocale = Locale | "uk"` locally in `ukraineCatalogue.ts` and change every `Record<Locale, string>` there to `Record<PageLocale, string>`. `uk` is **required**, not optional — a missing Ukrainian label must break the build, otherwise this page silently rots as the catalogue evolves.
- Add `uk` to all 45 item labels, 10 category `shortTitles`/`titles`/`intros`, the "other" label and placeholder.
- Widen the `locale` prop on the components that read this data to `PageLocale`.

~70 strings. Ukrainian is the source language for most of this terminology, so it is the least ambiguous of the four.

**Verify:** `pnpm typecheck` — the required `uk` key surfaces every gap.

## Task 4 — Ukrainian page prose

**Files:** `apps/web/src/content/config.ts`, `apps/web/src/content/services/ukrainians.uk.mdx` (new), `apps/web/src/components/service/ukrainePageCopy.uk.ts` (new)

- Content collection `locale` enum gains `"uk"`. No existing page reads it — all three `[slug].astro` files filter on their own literal locale.
- `ukrainians.uk.mdx`: the intro prose, mirroring the other three.
- `ukrainePageCopy.uk.ts`: sidebar, process steps, 6 FAQs, offer copy — a standalone `ServicePageData`-shaped object. Deliberately **not** added to `serviceData.ts`, which is `Record<ServiceId, Record<Locale, …>>` and would demand Ukrainian copy for all seven services.

## Task 5 — The page itself

**Files:** `apps/web/src/pages/ua/konsulski-posluhy.astro` (new), `apps/web/src/layouts/Base.astro`

`Base.astro` needs three additive optional props:

- `langOverride?: string` — currently `langAttr` is a hardcoded three-way ternary; the page needs `<html lang="uk">`.
- `extraAlternates?: { hreflang: string; href: string }[]` — so all four versions cross-link.
- `uiLocale?: UiLocale` — passed to `PageShell` so islands activate the Ukrainian catalog.

The page renders the same components as the other three, with `locale="ru"` for URL building and `uiLocale="uk"` for messages.

**Verify:** built page has `lang="uk"`, canonical `/ua/konsulski-posluhy`, and four `hreflang` alternates.

## Task 6 — Discovery

**Files:** the three `[slug].astro` service pages, `apps/web/src/lib/sitemapData.ts`, `packages/ui/src/Nav/Nav.tsx`

- Add `hreflang="uk"` pointing at `/ua/konsulski-posluhy` on the RO/RU/EN versions of this service, via the new `extraAlternates` prop. Only this service — not site-wide.
- A visible "Українською" link on those three pages. hreflang alone will not bring people here.
- One manual sitemap entry; `buildSitemapGroups` is `Locale`-driven and will not pick this up automatically.
- Nav language menu: an optional extra entry so Ukrainian is offered on this service's pages and shows as active on `/ua/…`. Site-wide the menu stays three languages.

## Task 7 — Verification

`pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check`, then a clean build. Confirm:

- `/ua/konsulski-posluhy` renders, `lang="uk"`, four alternates, canonical correct.
- Booking modal opens in Ukrainian, sub-service picker in Ukrainian, submission notes readable.
- The other three versions are unchanged apart from the added alternate and the visible link.
- No Romanian leaking into the Ukrainian page (the fallback signature).

---

## Open question deferred to implementation

The middleware strips a leading `/ro` and normalises trailing slashes. `/ua/…` is untouched by both rules, so no change is expected — worth an explicit check rather than an assumption.
