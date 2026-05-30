# Industry landing pages (`/domenii`) — implementation plan

**Status:** Draft for review · **Date:** 2026-05-30 · **Branch target:** new feature branch off `main`

## 1. Goal & rationale

Turn the homepage industries slider (currently links to SEO-dead `?industry=` query
params) into a real **programmatic-SEO surface**: one indexable, industry-specific page
per domain, promoting the services relevant to that industry.

**Playbook:** *Personas* — `contabilitate pentru [industrie]`. High-intent, long-tail B2B
queries an accounting firm should own ("contabilitate HoReCa", "contabilitate firme de
construcții", "бухгалтерия для e-commerce", etc.).

**Hard requirement (make-or-break):** content must be **genuinely industry-specific**, not a
template with the industry name swapped in. Thin/duplicate pages risk a sitewide Google
penalty — and for an accountant the content genuinely differs (VAT regimes, sector
accounting rules, seasonal staffing, subsidies). If a page can't say something specific, that
industry doesn't get a page.

## 2. URL structure (decided)

Dedicated **top-level hub + detail pages**, locale-aware via the existing `routeSegments`
machinery. Default locale (`ro`) unprefixed; `ru`/`en` prefixed.

| Locale | Hub | Detail (example: HoReCa) |
| ------ | --- | ------------------------ |
| ro | `/domenii` | `/domenii/horeca` |
| ru | `/ru/otrasli` | `/ru/otrasli/horeca` |
| en | `/en/industries` | `/en/industries/horeca` |

Subfolder (not subdomain) — consolidates domain authority. Each detail page links to the
relevant **existing** service detail pages (`/servicii/contabilitate`, …) for internal linking.

## 3. The 12 industries & their specific angles

Slugs are stable English/transliterated identifiers shared across locales (like the homepage
slider's `slugify` output). RO labels are canonical.

| id (slug) | RO label | RU label | EN label | Industry-specific accounting angle (content seed) |
| --- | --- | --- | --- | --- |
| `tech-and-saas` | Tech & SaaS | Tech & SaaS | Tech & SaaS | IT Park residency & 7% turnover tax, stock options, R&D, cross-border SaaS VAT, e-invoicing |
| `e-commerce` | E-commerce | E-commerce | E-commerce | VAT on distance sales / intracom, marketplace payouts, returns, online payment reconciliation |
| `retail` | Retail | Retail | Retail | Cash registers (case de marcat), inventory/stock accounting, markup, shrinkage, POS integration |
| `horeca` | HoReCa | HoReCa | HoReCa | VAT on food, perishable stock, tips & seasonal staff payroll, cash discipline, supplier mix |
| `constructii` | Construcții | Строительство | Construction | Reverse-charge VAT, devize/estimates, subcontractors, retentions, long-term contract recognition |
| `productie` | Producție | Производство | Manufacturing | Cost accounting, WIP, BOM/materials, excise (if applicable), fixed-asset depreciation |
| `servicii-profesionale` | Servicii profesionale | Профессиональные услуги | Professional services | Time-based billing, retainer revenue, low inventory, professional-income tax treatment |
| `ong` | ONG | НКО | NGO | Grant/restricted-fund accounting, donor reporting, tax-exempt status, project budgets |
| `logistica-si-transport` | Logistică & transport | Логистика и транспорт | Logistics & transport | Fuel/excise, vehicle fixed assets, international transport VAT, CMR, per-diem payroll |
| `sanatate` | Sănătate | Здравоохранение | Healthcare | Licensing, medical-services VAT exemptions, CNAM, equipment depreciation, payroll |
| `agricultura` | Agricultură | Сельское хозяйство | Agriculture | APIA subsidies, special VAT regime, land tax, seasonal labour, biological assets |
| `imobiliare` | Imobiliare | Недвижимость | Real estate | VAT on sales/rent, depreciation, property tax, associations/management, deferred revenue |

> Tax specifics above are **content seeds, not verified law** — must be fact-checked against
> current Moldovan regulation before publishing (see §9).

## 4. Content model (per industry page)

**Structured, typed data — not MDX.** File format (MDX vs `.astro` vs TS/JSON) is **SEO-neutral**:
Astro compiles all of them to the same static HTML, and Google indexes the HTML, not the source.
Since the content is **agent-generated** (authoring ergonomics don't matter here), we optimize for
**SEO control**: a typed schema *guarantees* every page ships with the full SEO scaffold (one H1,
unique meta, challenges, FAQ, internal links) and lets the template emit structured data from typed
fields. One typed object per industry per locale, rendered by a shared template.

```ts
import type { ServiceId } from "@expertcont/i18n";
import type { IconName } from "@expertcont/ui";

interface IndustryLocaleContent {
  icon: IconName;             // per-industry header icon (decorative, aria-hidden)
  metaTitle: string;         // → <title> / og:title, unique per page
  metaDescription: string;   // → <meta description>
  h1: string;                // → the single <h1>
  intro: string;             // lead paragraph; **phrases** marked for <strong> highlight (homepage style)

  // OPTIONAL sector overview. Prose description of the sector (where it's concentrated,
  // trend, role in the economy). Any figures live INLINE in this prose, with the source
  // named inline (e.g. "potrivit BNS"). Omitted entirely when no reliable data exists —
  // the template simply skips the section. No separate stats UI.
  overview?: string;

  // The differentiated core: each challenge fuses problem + how we solve it + a
  // CONTEXTUAL link to the service that solves it (stronger SEO than a generic list).
  challenges: {
    title: string;
    problem: string;
    solution: string;
    service: ServiceId;      // → inline link to /servicii/<slug>
  }[];

  // Industry-specific related questions. FAQPage JSON-LD is still emitted (valid markup),
  // but NOTE: since Aug 2023 Google shows FAQ rich results only for authoritative gov/health
  // sites — do not expect the rich snippet. Kept for content depth, long-tail, and AI/LLM
  // answer engines.
  faq: { q: string; a: string }[];
}

type IndustryContent = Record<"ro" | "ru" | "en", IndustryLocaleContent>;
```

CTA (two buttons → Pricing + Book consultation) is **template-level**, not per-industry data.
One file per industry holding all three locales (`industries/<id>.ts`). Title/summary/slug also
live in `industries-meta/<id>.json` (matches the `services-meta` convention and feeds hreflang).

### Hub (list) page — `/domenii`

Hub-and-spoke cluster: `/domenii` is the hub, each industry a spoke. The hub must have
**standalone value** (not just a link grid) to rank for "contabilitate pe domenii/industrii"
and to distribute link equity to the spokes.

```
Header   H1 "Contabilitate specializată pe domenii de activitate" + intro (why industry-specific
         accounting matters; **highlighted** phrases)
Grid     12 cards: [icon] · industry name · ONE industry-specific hook line (not generic) · → spoke
         (optional grouping: Comerț & servicii / Producție & construcții / Reglementate)
Why-us   Short band: one team (accounting+legal+HR+audit) for any sector → links /servicii
Fallback "Nu-ți vezi domeniul?" → /contact
CTA      [ Vezi prețuri ] [ Programează consultație ]
```
JSON-LD: `CollectionPage` + `ItemList` (mirror `servicii/index.astro`). hreflang via `Base`.

**Buyer-stage:** hub = consideration ("contabilitate pe industrii"); spokes = consideration→
decision ("contabilitate pentru [industrie]", high commercial intent).

### Spoke content guidelines (content-strategy)

- **Voice of customer:** write challenges/FAQ in owners' words ("cât costă un contabil pentru un
  restaurant"), not accountant jargon — matches queries and converts.
- **FAQ = the deal-blocking questions:** price, what's included, switching accountant, the scary
  sector-specific tax. Doubles as long-tail + AI-answer capture.
- **Forward internal links:** spoke → relevant `/servicii/*` (now) + an optional "related reading"
  slot for future `/blog` / `/ghiduri` posts per sector (build the cluster over time).

### Final page anatomy (spoke)

```
Header        [icon] eyebrow · H1 · intro with **highlighted** phrases · breadcrumbs
Overview      (optional) sector description; stats woven inline w/ source, else skipped
Challenges    4–6 × (H2 problem + solution + contextual link to /servicii/<slug>)
FAQ           3–5 industry-specific Q&A
CTA band      [ Vezi prețuri ]  [ Programează consultație ]
```
Plus `Service` + `BreadcrumbList` + `FAQPage` JSON-LD; hreflang/canonical via `Base`.

## 5. Files to create / change

### packages/i18n
1. `src/routeSegments.ts` — add `"industries"` to `SECTION_KEYS`; add
   `industries: { ro: "domenii", ru: "otrasli", en: "industries" }` to `routeSegments`.
2. **New** `src/industrySlugs.ts` — `INDUSTRY_IDS`, `industrySlugs` map (12 × 3), and
   `industryDetailUrl(id, locale)` helper. Mirrors `serviceSlugs.ts`.
3. `src/index.ts` — export the new symbols.
4. `src/urls.test.ts` — add cases for `industryDetailUrl` / industries section URLs.

### apps/web/src/content
5. `config.ts` — add `industries-meta` data collection (reuse `baseMeta` schema). (No MDX
   collection needed if we go data-driven; add one only if we later want long-form prose.)
6. **New** `content/industries-meta/<id>.json` × 12 — `id`, `slugs`, `titles`, `summaries`,
   `updated`.

### apps/web/src/components (new `industry/`)
7. `industry/types.ts` — the `IndustryLocaleContent` / `IndustryContent` contract (§4).
   `industry/industries/<id>.ts` — one file per industry, all 3 locales. `industry/index.ts` —
   registry + `getIndustryData(id, locale)`.
8. `industry/IndustryDetailBody.tsx` (or `.astro`) — renders intro (with **highlight** parsing),
   optional overview, fused challenges (each with a contextual `/servicii/<slug>` link), and FAQ.
   Reuse existing UI primitives; **no inline styles** (CSS Modules / Tailwind / tokens only).
9. Reuse `PageHeader`, `Section`, `Container`. CTA band = two buttons (Pricing + Book
   consultation); reuse `ServiceCTAStrip` if it fits, else a small `IndustryCTA`.

### apps/web/src/pages (6 files — 2 per locale)
10. `domenii/index.astro` + `domenii/[slug].astro` (ro)
11. `ru/otrasli/index.astro` + `ru/otrasli/[slug].astro`
12. `en/industries/index.astro` + `en/industries/[slug].astro`

Each mirrors `servicii/index.astro` / `servicii/[slug].astro`: `getStaticPaths` from
`industries-meta`, `Base` with `path` + `siblings` (hreflang), JSON-LD, `PageShell`
`activeSection` (see §7).

### Wiring
13. `apps/web/src/components/home/HomeIndustries.tsx` — replace `?industry=` links with
    `industryDetailUrl(id, locale)`; give each item a stable `id`.
14. `packages/ui/src/Footer/Footer.tsx` — add a "Domenii" link (`sectionUrl("industries", locale)`)
    to the Servicii column. **Footer only** (no top-nav change, per decision).
15. Footer Lingui label — add the `<Trans>`/message for "Domenii"/"Отрасли"/"Industries" and
    run `pnpm extract && pnpm compile`.

### SEO
16. `lib/jsonLd.ts` — reuse `breadcrumbListJsonLd`; hub gets `CollectionPage` + `ItemList`
    (mirror `servicii/index.astro`); detail gets `Service` + breadcrumbs.
17. Sitemap — **automatic** via `@astrojs/sitemap`; no change needed.
18. `PageShell` `activeSection` type (`NavSection`) — confirm it tolerates a non-nav section
    value, or pass `undefined`/extend the union as needed.

## 6. Internal linking architecture

- Hub `/domenii` → all 12 detail pages (spokes).
- Each detail page → relevant **service** detail pages (cross-section links) + back to hub +
  contact/pricing CTAs.
- Homepage slider → detail pages.
- Footer → hub.
- No orphans; all reachable; auto-included in sitemap.

## 7. Open implementation question — `activeSection`

`PageShell`/`Nav` use a `NavSection` union for highlighting. Since "Domenii" won't be in the
top nav, the detail pages will likely pass `activeSection={undefined}` (or we extend the union
without rendering a nav item). Resolve during build; low risk.

## 8. Checks (pre-PR)

`pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check && pnpm build`

Add unit coverage for `industryDetailUrl` in `urls.test.ts`. Confirm hreflang alternates and
canonical render correctly on a sample detail page.

## 9. Content accuracy gate ⚠️

Every tax/regulatory claim (VAT regimes, IT Park 7% tax, APIA subsidies, reverse-charge,
CNAM, excise) must be **fact-checked against current Moldovan law** before publishing.
Inaccurate accounting content is worse than none — it damages trust and E-E-A-T. Recommend a
subject-matter review pass by the ExpertCont team on the RO content, then translate to RU/EN.

**Inline figures (optional `overview`):** any statistic woven into an overview paragraph must be
**real and sourced** — fabricated economic data is worse than none and is explicitly targeted by
Google's helpful-content system. Primary sources for Moldova: **BNS** (statistica.gov.md — sector
activity, GDP/PIB shares, employment) and **ASP** (company registrations). Name the source inline
("potrivit BNS, 2024"). If no reliable figure exists for an industry, **omit the overview** (or keep
it qualitative) rather than invent precision. Agents must fill figures from a verified source table,
not guess.

## 10. Execution order (decided: plan doc first → then build)

1. **This doc** — review & approve. *(you are here)*
2. Infra: routing, `industrySlugs`, content collection, meta JSONs, shared template, pages,
   Footer link — all 12 wired but with one fully-written exemplar.
3. **HoReCa exemplar** fully written in RO/RU/EN → review content shape & quality.
4. Generate remaining 11 industries × 3 locales to match the approved shape.
5. Content accuracy review (§9).
6. Checks (§8), then commit on a feature branch + PR.

## 11. Effort estimate

- Infra (routing, pages, components, wiring, tests): ~half a day mechanical.
- Content: the bulk — 12 industries × 3 locales of genuinely distinct, accurate copy. This is
  the actual SEO investment; pace it behind the accuracy gate.
