# SEO Infrastructure: JSON-LD, Per-Locale RSS, hreflang Sitemap

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the three SEO primitives the marketing site is missing — complete JSON-LD coverage (FAQPage, Review/AggregateRating, BlogPosting, BreadcrumbList, Organization), per-locale RSS feeds for the blog, and an `@astrojs/sitemap` configuration that emits hreflang alternates for every URL.

**Architecture:** Build on what already exists. `apps/web/src/layouts/Base.astro` already renders sitewide Organization JSON-LD and accepts a per-page `jsonLd` prop. `apps/web/src/lib/jsonLd.ts` already has `breadcrumbListJsonLd`, `faqPageJsonLd`, `articleJsonLd`, `serviceJsonLd`. We extend the helper module with `blogPostingJsonLd`, `reviewJsonLd`, `aggregateRatingJsonLd`; wire them into the pages that lack structured data (reviews × 3 locales; upgrade blog detail Article → BlogPosting × 3 locales; add Breadcrumb to remaining detail pages). For RSS we add `@astrojs/rss` and three endpoints under `apps/web/src/pages/{,,ru/,en/}blog/rss.xml.ts`, plus `<link rel="alternate" type="application/rss+xml">` injection on blog pages. For the sitemap we add `@astrojs/sitemap` with a custom `serialize` step that joins every URL to its locale siblings (derived from `routeSegments` + content collections) so each `<url>` carries full `xhtml:link rel="alternate" hreflang="..."` entries.

**Tech Stack:** Astro 4, `@astrojs/rss`, `@astrojs/sitemap`, `@expertcont/i18n` (existing helpers: `LOCALES`, `homeUrl`, `sectionUrl`, `detailUrl`, `localizedDetailPaths`, `routeSegments`), Vitest for helper unit tests.

---

## Pre-flight: what already exists (do not re-do)

- **Organization JSON-LD** — `apps/web/src/layouts/Base.astro:33-47` renders it sitewide. Verify only.
- **`<link rel="canonical">` + `<link rel="alternate" hreflang="…">` + `x-default`** — `Base.astro:62-67`. Verify only.
- **`faqPageJsonLd` + wired into RO FAQ** — `apps/web/src/lib/jsonLd.ts` and `apps/web/src/pages/intrebari-frecvente.astro`. Verify RU/EN FAQ pages do the same; if not, this plan adds it.
- **`articleJsonLd` + wired into RO blog detail** — `apps/web/src/pages/blog/[slug].astro`. We rename/replace with `blogPostingJsonLd` (BlogPosting is a subclass of Article; the rename better matches Google's rich result eligibility for blog posts).
- **`breadcrumbListJsonLd` + wired into RO blog/FAQ/services** — verify and extend to all locale variants and to detail pages currently missing it.

## File structure (created/modified)

**Created**
- `apps/web/src/lib/jsonLd.test.ts` — Vitest specs for new helpers.
- `apps/web/src/lib/siteMap.ts` — pure function that enumerates `{ loc, alternates: { ro, ru, en } }` from collections + section keys.
- `apps/web/src/lib/siteMap.test.ts` — unit tests for the manifest.
- `apps/web/src/pages/blog/rss.xml.ts` — RO feed.
- `apps/web/src/pages/ru/blog/rss.xml.ts` — RU feed.
- `apps/web/src/pages/en/blog/rss.xml.ts` — EN feed.

**Modified**
- `apps/web/src/lib/jsonLd.ts` — add `blogPostingJsonLd`, `reviewJsonLd`, `aggregateRatingJsonLd`; keep `articleJsonLd` for non-blog articles (none today but cheap to keep).
- `apps/web/src/layouts/Base.astro` — add optional `rssHref` prop, render `<link rel="alternate" type="application/rss+xml">` when provided.
- `apps/web/src/pages/recenzii.astro` + `apps/web/src/pages/ru/otzyvy.astro` + `apps/web/src/pages/en/reviews.astro` — wire `reviewJsonLd` per review + sitewide `aggregateRatingJsonLd` + `breadcrumbListJsonLd`.
- `apps/web/src/pages/blog/[slug].astro` + `apps/web/src/pages/ru/blog/[slug].astro` + `apps/web/src/pages/en/blog/[slug].astro` — switch `articleJsonLd` → `blogPostingJsonLd`.
- `apps/web/src/pages/blog/index.astro` + `apps/web/src/pages/ru/blog/index.astro` + `apps/web/src/pages/en/blog/index.astro` — pass `rssHref` and a `BreadcrumbList`.
- `apps/web/src/pages/intrebari-frecvente.astro` + `apps/web/src/pages/ru/voprosy.astro` + `apps/web/src/pages/en/faq.astro` — ensure FAQ + Breadcrumb wired in all three.
- `apps/web/astro.config.mjs` — add `sitemap()` integration with custom `serialize`.
- `apps/web/package.json` — add `@astrojs/rss`, `@astrojs/sitemap` deps.

---

## Task 1: Add Review and AggregateRating JSON-LD helpers (TDD)

**Files:**
- Create: `apps/web/src/lib/jsonLd.test.ts`
- Modify: `apps/web/src/lib/jsonLd.ts`

- [ ] **Step 1: Write the failing tests**

Create `apps/web/src/lib/jsonLd.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  reviewJsonLd,
  aggregateRatingJsonLd,
  blogPostingJsonLd,
  breadcrumbListJsonLd,
  faqPageJsonLd,
} from "./jsonLd";

describe("reviewJsonLd", () => {
  it("emits @type Review with itemReviewed pointing to the Organization", () => {
    const node = reviewJsonLd({
      author: "Andrei Bostan",
      ratingValue: 5,
      reviewBody: "Excellent service",
      datePublished: "2024-09-01",
      locale: "ro",
    });
    expect(node["@context"]).toBe("https://schema.org");
    expect(node["@type"]).toBe("Review");
    expect(node.author).toEqual({ "@type": "Person", name: "Andrei Bostan" });
    expect(node.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    });
    expect(node.itemReviewed).toEqual({
      "@type": "Organization",
      name: "ExpertCont",
    });
    expect(node.inLanguage).toBe("ro");
    expect(node.datePublished).toBe("2024-09-01");
  });
});

describe("aggregateRatingJsonLd", () => {
  it("computes ratingValue and reviewCount from inputs", () => {
    const node = aggregateRatingJsonLd({ ratingValue: 4.8, reviewCount: 23 });
    expect(node["@type"]).toBe("AggregateRating");
    expect(node.ratingValue).toBe(4.8);
    expect(node.reviewCount).toBe(23);
    expect(node.bestRating).toBe(5);
    expect(node.itemReviewed).toEqual({
      "@type": "Organization",
      name: "ExpertCont",
    });
  });
});

describe("blogPostingJsonLd", () => {
  it("emits @type BlogPosting with required fields", () => {
    const node = blogPostingJsonLd({
      url: "/blog/some-post",
      title: "Title",
      description: "Desc",
      datePublished: "2024-08-12",
      dateModified: "2024-08-20",
      author: "Maria",
      locale: "ro",
      section: "Fiscalitate",
    });
    expect(node["@type"]).toBe("BlogPosting");
    expect(node.headline).toBe("Title");
    expect(node.datePublished).toBe("2024-08-12");
    expect(node.dateModified).toBe("2024-08-20");
    expect(node.author).toEqual({ "@type": "Person", name: "Maria" });
    expect(node.articleSection).toBe("Fiscalitate");
    expect(node.mainEntityOfPage["@id"]).toMatch(/\/blog\/some-post$/);
  });
});

describe("breadcrumbListJsonLd (regression)", () => {
  it("numbers positions from 1 and absolutizes URLs", () => {
    const node = breadcrumbListJsonLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]);
    expect(node.itemListElement[0].position).toBe(1);
    expect(node.itemListElement[1].position).toBe(2);
    expect(node.itemListElement[0].item).toMatch(/^https?:\/\//);
  });
});

describe("faqPageJsonLd (regression)", () => {
  it("emits one Question per entry", () => {
    const node = faqPageJsonLd([
      { q: "Q1", a: "A1" },
      { q: "Q2", a: "A2" },
    ]);
    expect(node.mainEntity).toHaveLength(2);
    expect(node.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Q1",
      acceptedAnswer: { "@type": "Answer", text: "A1" },
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @expertcont/web exec vitest run src/lib/jsonLd.test.ts`

Expected: FAIL — `reviewJsonLd`, `aggregateRatingJsonLd`, `blogPostingJsonLd` are not exported.

> If Vitest is not configured for `@expertcont/web`, add the minimum config first: copy `packages/ui/vitest.config.ts` to `apps/web/vitest.config.ts` (drop the Lingui macro plugin — the lib has no JSX), add `"test": "vitest run"` and `"vitest"` + `happy-dom` devDeps to `apps/web/package.json` matching the versions used in `packages/ui/package.json`, then re-run.

- [ ] **Step 3: Implement the helpers**

Append to `apps/web/src/lib/jsonLd.ts`:

```ts
export interface ReviewInput {
  author: string;
  ratingValue: number;
  reviewBody: string;
  datePublished?: string;
  locale: Locale;
}

export function reviewJsonLd(r: ReviewInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.ratingValue,
      bestRating: 5,
    },
    reviewBody: r.reviewBody,
    inLanguage: r.locale,
    itemReviewed: { "@type": "Organization", name: "ExpertCont" },
    ...(r.datePublished ? { datePublished: r.datePublished } : {}),
  };
}

export interface AggregateRatingInput {
  ratingValue: number;
  reviewCount: number;
}

export function aggregateRatingJsonLd(a: AggregateRatingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: a.ratingValue,
    reviewCount: a.reviewCount,
    bestRating: 5,
    itemReviewed: { "@type": "Organization", name: "ExpertCont" },
  };
}

export interface BlogPostingInput {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  locale: Locale;
  imageUrl?: string;
  section?: string;
}

export function blogPostingJsonLd(p: BlogPostingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    inLanguage: p.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${p.url}` },
    publisher: {
      "@type": "Organization",
      name: "ExpertCont",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    ...(p.author ? { author: { "@type": "Person", name: p.author } } : {}),
    ...(p.imageUrl ? { image: p.imageUrl } : {}),
    ...(p.section ? { articleSection: p.section } : {}),
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm --filter @expertcont/web exec vitest run src/lib/jsonLd.test.ts`

Expected: PASS — all 5 describe blocks green.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/lib/jsonLd.ts apps/web/src/lib/jsonLd.test.ts apps/web/package.json apps/web/vitest.config.ts
git commit -m "feat(seo): add Review, AggregateRating, BlogPosting JSON-LD helpers"
```

---

## Task 2: Wire Review + AggregateRating into all three locale reviews pages

**Files:**
- Modify: `apps/web/src/pages/recenzii.astro`
- Modify: `apps/web/src/pages/ru/otzyvy.astro`
- Modify: `apps/web/src/pages/en/reviews.astro`

For each of the three files do the same edit (paths and locale value differ). Worked example for `recenzii.astro`:

- [ ] **Step 1: Read the existing file to capture the reviews array shape**

Run: `head -80 apps/web/src/pages/recenzii.astro`

Note the `reviews` array (`{ author, authorCompany, rating, body }`) — the `rating` field is the per-review numeric rating.

- [ ] **Step 2: Add the JSON-LD imports and computation in frontmatter**

After the existing `import { homeUrl, sectionUrl, type Locale } from "@expertcont/i18n";` line, add:

```ts
import {
  reviewJsonLd,
  aggregateRatingJsonLd,
  breadcrumbListJsonLd,
} from "../lib/jsonLd";
```

After the `reviews` array is defined, add:

```ts
const reviewsPath = sectionUrl("reviews", locale);
const avgRating =
  reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);
const jsonLd = [
  aggregateRatingJsonLd({
    ratingValue: Number(avgRating.toFixed(1)),
    reviewCount: reviews.length,
  }),
  ...reviews.map((r) =>
    reviewJsonLd({
      author: r.author,
      ratingValue: r.rating,
      reviewBody: r.body,
      locale,
    }),
  ),
  breadcrumbListJsonLd([
    { name: "Acasă", url: homeUrl(locale) },
    { name: "Recenzii", url: reviewsPath },
  ]),
];
```

- [ ] **Step 3: Pass `jsonLd` to the `<Base>` component**

Find the `<Base ... siblings={siblings}>` opening tag and add `jsonLd={jsonLd}` to its prop list. Example:

```astro
<Base
  title="Recenzii — ExpertCont"
  description="..."
  locale={locale}
  path={reviewsPath}
  siblings={siblings}
  jsonLd={jsonLd}
>
```

- [ ] **Step 4: Repeat for the other two locale files**

Repeat steps 2–3 for `apps/web/src/pages/ru/otzyvy.astro` (locale `"ru"`, breadcrumb name `"Главная" / "Отзывы"`) and `apps/web/src/pages/en/reviews.astro` (locale `"en"`, breadcrumb names `"Home" / "Reviews"`).

- [ ] **Step 5: Verify with a build**

Run: `pnpm --filter @expertcont/web build`

Expected: build succeeds. Open `apps/web/dist/recenzii/index.html` and confirm `<script type="application/ld+json">` blocks for AggregateRating + N Reviews + BreadcrumbList exist.

- [ ] **Step 6: Validate one page with Google's Rich Results Test (manual, optional but recommended)**

Run: `pnpm --filter @expertcont/web preview` and copy the served `/recenzii` HTML's JSON-LD into <https://search.google.com/test/rich-results> — confirm "Reviews" and "Organization" detected with no errors.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/pages/recenzii.astro apps/web/src/pages/ru/otzyvy.astro apps/web/src/pages/en/reviews.astro
git commit -m "feat(seo): wire Review + AggregateRating + Breadcrumb JSON-LD on reviews pages"
```

---

## Task 3: Upgrade blog detail JSON-LD from Article to BlogPosting (all locales)

**Files:**
- Modify: `apps/web/src/pages/blog/[slug].astro`
- Modify: `apps/web/src/pages/ru/blog/[slug].astro`
- Modify: `apps/web/src/pages/en/blog/[slug].astro`

- [ ] **Step 1: For each file, swap the import**

In each `[slug].astro`, change:

```ts
import { articleJsonLd, breadcrumbListJsonLd } from "../../lib/jsonLd";
```

to:

```ts
import { blogPostingJsonLd, breadcrumbListJsonLd } from "../../lib/jsonLd";
```

(For the RO file the relative path is `../../lib/jsonLd`; for RU/EN it is `../../../lib/jsonLd`.)

- [ ] **Step 2: Swap the call site**

In each file, change the line that builds the `jsonLd` array:

```ts
const jsonLd = [
  articleJsonLd({ ... }),
  breadcrumbListJsonLd([ ... ]),
];
```

to:

```ts
const jsonLd = [
  blogPostingJsonLd({
    url: articlePath,
    title: meta.titles[locale],
    description: meta.summaries[locale],
    datePublished: meta.publishedAt,
    dateModified: meta.updated,
    author: meta.author,
    locale,
    section: category,
  }),
  breadcrumbListJsonLd([
    { name: /* localized "Home" */, url: homeUrl(locale) },
    { name: /* localized "Blog" */, url: sectionUrl("blog", locale) },
    { name: meta.titles[locale], url: articlePath },
  ]),
];
```

Localized "Home"/"Blog" strings per locale: RO `"Acasă"` / `"Blog"`; RU `"Главная"` / `"Блог"`; EN `"Home"` / `"Blog"`.

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm --filter @expertcont/web build`

Expected: clean. Inspect a built blog detail HTML and confirm `"@type":"BlogPosting"` is present.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/pages/blog
git commit -m "feat(seo): upgrade blog detail JSON-LD from Article to BlogPosting"
```

---

## Task 4: Add BreadcrumbList to remaining detail/index pages that lack it

Audit step: blog detail (done in Task 3), services detail, guides detail, FAQ (RO done; verify RU/EN), reviews (done in Task 2), pricing, about.

**Files (modify only the ones that don't already pass a breadcrumb):**
- `apps/web/src/pages/servicii/[slug].astro` and `ru/uslugi/[slug].astro` and `en/services/[slug].astro`
- `apps/web/src/pages/ghiduri/[slug].astro` and `ru/rukovodstva/[slug].astro` and `en/guides/[slug].astro`
- `apps/web/src/pages/ru/voprosy.astro`, `apps/web/src/pages/en/faq.astro` (if not already wired)
- `apps/web/src/pages/preturi.astro` + `ru/tseny.astro` + `en/pricing.astro`
- `apps/web/src/pages/despre-noi.astro` + `ru/o-nas.astro` + `en/about.astro`

- [ ] **Step 1: For each file, add the import (skip if already imported)**

```ts
import { breadcrumbListJsonLd } from "../lib/jsonLd"; // adjust depth
```

- [ ] **Step 2: Build the jsonLd value in frontmatter**

For detail pages (services/guides):

```ts
const jsonLd = [
  // ...keep any existing JSON-LD nodes
  breadcrumbListJsonLd([
    { name: /* localized Home */, url: homeUrl(locale) },
    { name: /* localized section name */, url: sectionUrl(section, locale) },
    { name: meta.titles[locale], url: detailPath },
  ]),
];
```

For section index/static pages:

```ts
const jsonLd = breadcrumbListJsonLd([
  { name: /* localized Home */, url: homeUrl(locale) },
  { name: /* localized page name */, url: pagePath },
]);
```

Section name translations to use: `services` → RO `"Servicii"` / RU `"Услуги"` / EN `"Services"`; `guides` → RO `"Ghiduri"` / RU `"Руководства"` / EN `"Guides"`; `pricing` → RO `"Prețuri"` / RU `"Цены"` / EN `"Pricing"`; `about` → RO `"Despre noi"` / RU `"О нас"` / EN `"About"`; `faq` → RO `"Întrebări frecvente"` / RU `"Вопросы"` / EN `"FAQ"`.

- [ ] **Step 3: Pass `jsonLd={jsonLd}` to `<Base>`**

If a `jsonLd` array already existed on the page (e.g. services detail uses `serviceJsonLd`), spread breadcrumbs into the same array. Do **not** create two separate `jsonLd` arrays; `Base.astro` accepts one object **or** one array.

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm --filter @expertcont/web build`

Expected: clean. Spot-check three built HTMLs (one service detail, one guide detail, `preturi/index.html`) for `"@type":"BreadcrumbList"`.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages
git commit -m "feat(seo): wire BreadcrumbList on remaining detail and section pages"
```

---

## Task 5: Add @astrojs/rss dependency

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: Add the dep**

Run: `pnpm --filter @expertcont/web add @astrojs/rss`

Expected: `@astrojs/rss` appears in `apps/web/package.json` `"dependencies"` (latest 4.x). `pnpm-lock.yaml` updates.

- [ ] **Step 2: Commit the dep alone**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "chore(web): add @astrojs/rss dependency"
```

---

## Task 6: Create per-locale RSS endpoints

**Files:**
- Create: `apps/web/src/pages/blog/rss.xml.ts`
- Create: `apps/web/src/pages/ru/blog/rss.xml.ts`
- Create: `apps/web/src/pages/en/blog/rss.xml.ts`

The three files share a helper. To stay DRY, put the helper in `apps/web/src/lib/rss.ts` and import it three times.

- [ ] **Step 1: Create the shared helper**

Create `apps/web/src/lib/rss.ts`:

```ts
import rss, { type RSSOptions } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { detailUrl, sectionUrl, type Locale } from "@expertcont/i18n";

const SITE = import.meta.env.PUBLIC_SITE_URL ?? "https://expertcont.md";

const FEED_TITLE: Record<Locale, string> = {
  ro: "ExpertCont — Blog",
  ru: "ExpertCont — Блог",
  en: "ExpertCont — Blog",
};
const FEED_DESCRIPTION: Record<Locale, string> = {
  ro: "Articole despre contabilitate, fiscalitate și legislație pentru afaceri din Moldova.",
  ru: "Статьи о бухгалтерии, налогах и законодательстве для бизнеса в Молдове.",
  en: "Articles on accounting, taxation, and legislation for Moldovan businesses.",
};

export async function blogRss(locale: Locale, site: URL | string | undefined) {
  const metas = await getCollection("blog-meta");
  const sorted = metas
    .map((m) => m.data)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const options: RSSOptions = {
    title: FEED_TITLE[locale],
    description: FEED_DESCRIPTION[locale],
    site: site ?? SITE,
    items: sorted.map((m) => ({
      title: m.titles[locale],
      description: m.summaries[locale],
      link: detailUrl("blog", m, locale),
      pubDate: new Date(m.publishedAt),
      categories: [m.category[locale]],
    })),
    customData: `<language>${locale}</language>`,
  };
  return rss(options);
}

export function blogRssHref(locale: Locale): string {
  return `${sectionUrl("blog", locale)}/rss.xml`;
}
```

- [ ] **Step 2: Create the RO endpoint**

Create `apps/web/src/pages/blog/rss.xml.ts`:

```ts
import type { APIRoute } from "astro";
import { blogRss } from "../../lib/rss";

export const GET: APIRoute = ({ site }) => blogRss("ro", site);
```

- [ ] **Step 3: Create the RU endpoint**

Create `apps/web/src/pages/ru/blog/rss.xml.ts`:

```ts
import type { APIRoute } from "astro";
import { blogRss } from "../../../lib/rss";

export const GET: APIRoute = ({ site }) => blogRss("ru", site);
```

- [ ] **Step 4: Create the EN endpoint**

Create `apps/web/src/pages/en/blog/rss.xml.ts`:

```ts
import type { APIRoute } from "astro";
import { blogRss } from "../../../lib/rss";

export const GET: APIRoute = ({ site }) => blogRss("en", site);
```

- [ ] **Step 5: Set `site` in `astro.config.mjs` (RSS requires it)**

Modify `apps/web/astro.config.mjs`, add `site:` at the top of `defineConfig`:

```js
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://expertcont.md",
  integrations: [ /* ... */ ],
  vite: { /* ... */ },
});
```

- [ ] **Step 6: Verify**

Run: `pnpm --filter @expertcont/web build`

Expected: `apps/web/dist/blog/rss.xml`, `apps/web/dist/ru/blog/rss.xml`, `apps/web/dist/en/blog/rss.xml` all exist. Each begins with `<?xml version="1.0" encoding="UTF-8"?>` and contains an `<item>` per blog post in the matching locale.

Verify with `head -20 apps/web/dist/blog/rss.xml` — RO titles present.
Verify with `head -20 apps/web/dist/ru/blog/rss.xml` — Cyrillic titles present.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/lib/rss.ts apps/web/src/pages/blog/rss.xml.ts apps/web/src/pages/ru/blog/rss.xml.ts apps/web/src/pages/en/blog/rss.xml.ts apps/web/astro.config.mjs
git commit -m "feat(seo): emit per-locale RSS feeds for blog"
```

---

## Task 7: Advertise RSS feed via `<link rel="alternate">` on blog pages

**Files:**
- Modify: `apps/web/src/layouts/Base.astro`
- Modify: `apps/web/src/pages/blog/index.astro` + `ru/blog/index.astro` + `en/blog/index.astro`
- Modify: `apps/web/src/pages/blog/[slug].astro` + `ru/blog/[slug].astro` + `en/blog/[slug].astro`

- [ ] **Step 1: Add the prop to Base**

In `apps/web/src/layouts/Base.astro`, extend `Props`:

```ts
interface Props {
  title: string;
  description?: string;
  locale: Locale;
  path: string;
  siblings?: Record<Locale, string>;
  jsonLd?: object | object[];
  /** Optional RSS feed URL — adds <link rel="alternate" type="application/rss+xml">. */
  rssHref?: string;
}
```

Destructure: `const { title, description, locale, path, siblings, jsonLd, rssHref } = Astro.props;`

In the `<head>`, just after the markdown alternate line, add:

```astro
{rssHref && <link rel="alternate" type="application/rss+xml" title={title} href={`${siteUrl}${rssHref}`} />}
```

- [ ] **Step 2: Wire `rssHref` on blog index pages**

In each `apps/web/src/pages/{,ru/,en/}blog/index.astro`, import `blogRssHref` and pass it to `<Base>`:

```ts
import { blogRssHref } from "../../lib/rss"; // adjust depth
```

```astro
<Base ... rssHref={blogRssHref(locale)}>
```

- [ ] **Step 3: Wire `rssHref` on blog detail pages**

Same change in each `apps/web/src/pages/{,ru/,en/}blog/[slug].astro`.

- [ ] **Step 4: Verify**

Run: `pnpm --filter @expertcont/web build`

Expected: clean build. `grep -o 'application/rss+xml' apps/web/dist/blog/index.html` returns one match.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/layouts/Base.astro apps/web/src/pages/blog apps/web/src/pages/ru/blog apps/web/src/pages/en/blog
git commit -m "feat(seo): advertise RSS via <link rel=alternate> on blog pages"
```

---

## Task 8: Build the URL→siblings manifest (TDD)

The sitemap and any future systems need one canonical answer to "given a URL, what are its three locale alternates?". Build it as a pure function so we can unit-test it.

**Files:**
- Create: `apps/web/src/lib/siteMap.ts`
- Create: `apps/web/src/lib/siteMap.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/web/src/lib/siteMap.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildHreflangManifest, type SiteMapEntry } from "./siteMap";

// Minimal stub collections so the test does not depend on the actual content directory.
const stubBlog = [
  {
    id: "post-a",
    slugs: { ro: "ce-este-tva", ru: "chto-takoe-nds", en: "what-is-vat" },
    titles: { ro: "", ru: "", en: "" },
    summaries: { ro: "", ru: "", en: "" },
    updated: "2024-01-01",
    publishedAt: "2024-01-01",
    category: { ro: "", ru: "", en: "" },
    readTime: 5,
  },
];
const stubServices: typeof stubBlog = [];
const stubGuides: typeof stubBlog = [];

describe("buildHreflangManifest", () => {
  const entries: SiteMapEntry[] = buildHreflangManifest({
    blog: stubBlog,
    services: stubServices,
    guides: stubGuides,
  });

  it("includes the home page in all three locales", () => {
    const homeRo = entries.find((e) => e.loc === "/");
    expect(homeRo).toBeDefined();
    expect(homeRo!.alternates.ro).toBe("/");
    expect(homeRo!.alternates.ru).toBe("/ru");
    expect(homeRo!.alternates.en).toBe("/en");
    expect(entries.some((e) => e.loc === "/ru")).toBe(true);
    expect(entries.some((e) => e.loc === "/en")).toBe(true);
  });

  it("includes section index pages with localized slugs", () => {
    const pricingRo = entries.find((e) => e.loc === "/preturi");
    expect(pricingRo).toBeDefined();
    expect(pricingRo!.alternates.ru).toBe("/ru/tseny");
    expect(pricingRo!.alternates.en).toBe("/en/pricing");
  });

  it("includes blog detail entries with sibling slugs", () => {
    const detailRo = entries.find((e) => e.loc === "/blog/ce-este-tva");
    expect(detailRo).toBeDefined();
    expect(detailRo!.alternates.ru).toBe("/ru/blog/chto-takoe-nds");
    expect(detailRo!.alternates.en).toBe("/en/blog/what-is-vat");
  });

  it("does not emit /ro/... entries (ro is the default-locale, prefix-less)", () => {
    expect(entries.some((e) => e.loc.startsWith("/ro/") || e.loc === "/ro")).toBe(false);
  });

  it("emits one entry per (locale × url), so 3 entries per logical page", () => {
    const homeCount = entries.filter(
      (e) => e.loc === "/" || e.loc === "/ru" || e.loc === "/en",
    ).length;
    expect(homeCount).toBe(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @expertcont/web exec vitest run src/lib/siteMap.test.ts`

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the manifest builder**

Create `apps/web/src/lib/siteMap.ts`:

```ts
import {
  LOCALES,
  SECTION_KEYS,
  type Locale,
  type SectionKey,
  type ContentMeta,
  homeUrl,
  sectionUrl,
  detailUrl,
} from "@expertcont/i18n";

export interface SiteMapEntry {
  loc: string;
  alternates: Record<Locale, string>;
}

/** Sections that have a `[slug].astro` detail route. Keep in sync with the pages tree. */
const DETAIL_SECTIONS: ReadonlyArray<SectionKey> = ["services", "guides", "blog"];

/** Sections that exist as a section index page in all three locales. */
const INDEX_SECTIONS: ReadonlyArray<SectionKey> = SECTION_KEYS;

export interface ManifestInput {
  blog: ContentMeta[];
  services: ContentMeta[];
  guides: ContentMeta[];
}

export function buildHreflangManifest(input: ManifestInput): SiteMapEntry[] {
  const out: SiteMapEntry[] = [];
  const detailItems: Record<SectionKey, ContentMeta[]> = {
    blog: input.blog,
    services: input.services,
    guides: input.guides,
    // Other sections have no detail items.
    solutions: [],
    pricing: [],
    contact: [],
    about: [],
    faq: [],
    reviews: [],
    privacy: [],
    terms: [],
    cookies: [],
    partners: [],
    careers: [],
  };

  // Home in all three locales.
  for (const locale of LOCALES) {
    out.push({
      loc: homeUrl(locale),
      alternates: {
        ro: homeUrl("ro"),
        ru: homeUrl("ru"),
        en: homeUrl("en"),
      },
    });
  }

  // Section index pages (skip "blog" detail-only? — no, blog index does exist).
  for (const section of INDEX_SECTIONS) {
    for (const locale of LOCALES) {
      out.push({
        loc: sectionUrl(section, locale),
        alternates: {
          ro: sectionUrl(section, "ro"),
          ru: sectionUrl(section, "ru"),
          en: sectionUrl(section, "en"),
        },
      });
    }
  }

  // Detail pages.
  for (const section of DETAIL_SECTIONS) {
    for (const meta of detailItems[section]) {
      for (const locale of LOCALES) {
        out.push({
          loc: detailUrl(section, meta, locale),
          alternates: {
            ro: detailUrl(section, meta, "ro"),
            ru: detailUrl(section, meta, "ru"),
            en: detailUrl(section, meta, "en"),
          },
        });
      }
    }
  }

  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @expertcont/web exec vitest run src/lib/siteMap.test.ts`

Expected: PASS — all five `it` cases green.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/lib/siteMap.ts apps/web/src/lib/siteMap.test.ts
git commit -m "feat(seo): add hreflang sitemap manifest builder"
```

---

## Task 9: Wire @astrojs/sitemap with hreflang serialize

**Files:**
- Modify: `apps/web/package.json` (add dep)
- Modify: `apps/web/astro.config.mjs`

- [ ] **Step 1: Add the dep**

Run: `pnpm --filter @expertcont/web add @astrojs/sitemap`

- [ ] **Step 2: Build the integration config**

Modify `apps/web/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { getCollection } from "astro:content";
import { buildHreflangManifest } from "./src/lib/siteMap";

const site = process.env.PUBLIC_SITE_URL ?? "https://expertcont.md";

export default defineConfig({
  site,
  integrations: [
    mdx(),
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    sitemap({
      filter: (page) => !page.includes("/rss.xml"),
      serialize: async (item) => {
        const [blog, services, guides] = await Promise.all([
          getCollection("blog-meta"),
          getCollection("services-meta"),
          getCollection("guides-meta"),
        ]);
        const manifest = buildHreflangManifest({
          blog: blog.map((e) => e.data),
          services: services.map((e) => e.data),
          guides: guides.map((e) => e.data),
        });
        const path = new URL(item.url).pathname.replace(/\/$/, "") || "/";
        const entry = manifest.find((m) => m.loc === path);
        if (!entry) return item;
        return {
          ...item,
          links: [
            { lang: "ro", url: `${site}${entry.alternates.ro}` },
            { lang: "ru", url: `${site}${entry.alternates.ru}` },
            { lang: "en", url: `${site}${entry.alternates.en}` },
            { lang: "x-default", url: `${site}${entry.alternates.ro}` },
          ],
        };
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```

> **Note:** `getCollection` inside `serialize` is called once per URL Astro feeds in. That's O(URLs × collection-reads) — acceptable for a few-hundred-URL site, but if the build slows noticeably, hoist the `Promise.all` and `manifest` build out of `serialize` by closing over them via a top-level `await`. Astro config files support top-level await.

- [ ] **Step 3: Optimize — hoist the manifest out of serialize**

Replace the integration with:

```js
const [blog, services, guides] = await Promise.all([
  getCollection("blog-meta"),
  getCollection("services-meta"),
  getCollection("guides-meta"),
]);
const manifest = buildHreflangManifest({
  blog: blog.map((e) => e.data),
  services: services.map((e) => e.data),
  guides: guides.map((e) => e.data),
});
const byPath = new Map(manifest.map((m) => [m.loc, m]));

// ...inside integrations array:
sitemap({
  filter: (page) => !page.includes("/rss.xml"),
  serialize: (item) => {
    const path = new URL(item.url).pathname.replace(/\/$/, "") || "/";
    const entry = byPath.get(path);
    if (!entry) return item;
    return {
      ...item,
      links: [
        { lang: "ro", url: `${site}${entry.alternates.ro}` },
        { lang: "ru", url: `${site}${entry.alternates.ru}` },
        { lang: "en", url: `${site}${entry.alternates.en}` },
        { lang: "x-default", url: `${site}${entry.alternates.ro}` },
      ],
    };
  },
}),
```

- [ ] **Step 4: Verify the build emits sitemap with hreflang**

Run: `pnpm --filter @expertcont/web build`

Expected: `apps/web/dist/sitemap-index.xml` and `apps/web/dist/sitemap-0.xml` exist.

Run: `grep -c 'xhtml:link' apps/web/dist/sitemap-0.xml`

Expected: a positive number — at least 4 × (number-of-urls) `xhtml:link` entries (4 hreflangs per URL).

Run: `grep 'hreflang="x-default"' apps/web/dist/sitemap-0.xml | head -2`

Expected: at least one match.

- [ ] **Step 5: Confirm `robots.txt` references the sitemap**

If `apps/web/public/robots.txt` exists, ensure it contains `Sitemap: https://expertcont.md/sitemap-index.xml`. If not, create `apps/web/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://expertcont.md/sitemap-index.xml
```

- [ ] **Step 6: Commit**

```bash
git add apps/web/astro.config.mjs apps/web/package.json pnpm-lock.yaml apps/web/public/robots.txt
git commit -m "feat(seo): emit hreflang-aware sitemap via @astrojs/sitemap"
```

---

## Task 10: Final pre-PR verification

- [ ] **Step 1: Run the standard project gates**

Run: `pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check`

Expected: all clean.

- [ ] **Step 2: Full production build**

Run: `pnpm build`

Expected: clean. `apps/web/dist/` contains `sitemap-*.xml`, `blog/rss.xml`, `ru/blog/rss.xml`, `en/blog/rss.xml`.

- [ ] **Step 3: Smoke-test JSON-LD on built HTML**

For each of the following, `grep -o '"@type":"[A-Za-z]*"' <file> | sort -u` and expect at least the listed types:

- `apps/web/dist/index.html` → `Organization`
- `apps/web/dist/intrebari-frecvente/index.html` → `BreadcrumbList`, `FAQPage`, `Organization`
- `apps/web/dist/recenzii/index.html` → `AggregateRating`, `BreadcrumbList`, `Organization`, `Review`
- one built blog detail under `apps/web/dist/blog/<slug>/index.html` → `BlogPosting`, `BreadcrumbList`, `Organization`
- one built service detail under `apps/web/dist/servicii/<slug>/index.html` → `BreadcrumbList`, `Organization`, `Service`

- [ ] **Step 4: Smoke-test hreflang in sitemap**

Run: `xmllint --xpath "//*[local-name()='url'][1]" apps/web/dist/sitemap-0.xml`

Expected: the first `<url>` block has `<loc>`, plus four `<xhtml:link rel="alternate" hreflang="ro|ru|en|x-default" href="..."/>` children.

- [ ] **Step 5: Optional manual validation**

Paste a representative built HTML into <https://search.google.com/test/rich-results>; paste sitemap URL into Google Search Console once deployed.

---

## Self-review notes

- **Spec coverage:**
  - JSON-LD types asked for: FAQPage (Task 4 verify + existing), Review (Task 2), AggregateRating (Task 2), BlogPosting (Task 3), BreadcrumbList (Task 4), Organization (Pre-flight — exists). ✅
  - Per-locale RSS: Tasks 5–7. ✅
  - Sitemap with hreflang extending `siblings` pattern: Tasks 8–9 (`buildHreflangManifest` is the formalization of the `siblings` pattern). ✅
- **No placeholders:** every step has code or exact commands. Translations for breadcrumb labels are written inline rather than left as "localized name."
- **Type consistency:** `BlogPostingInput` / `ReviewInput` / `AggregateRatingInput` / `SiteMapEntry` are defined once in Tasks 1 and 8 and referenced consistently.

## Risks / things to confirm at execution time

1. **`apps/web` may not yet have a Vitest config.** Task 1 Step 2 anticipates this and documents the minimal-config copy from `packages/ui`. If that detour is unwelcome, move the JSON-LD helpers (or just their tests) into `packages/i18n` or a new `packages/seo` workspace — the helpers are pure and don't need to live in `apps/web`.
2. **`getCollection` inside `astro.config.mjs`.** Astro supports running `getCollection` from config via top-level await in recent versions; if a runtime error appears, fall back to reading the content directory directly with `fast-glob` + `JSON.parse` on the `*-meta` JSON files. The manifest builder stays unchanged — only the data source for the config swaps.
3. **AggregateRating eligibility.** Google requires `aggregateRating` to be attached to an actual product/organization page with reviews on the same URL. Task 2 attaches it on `/recenzii` (and locale equivalents), which is correct. Don't sprinkle `aggregateRatingJsonLd` on unrelated pages — it can cause rich-result penalties.
4. **Review JSON-LD without `datePublished`.** Current reviews data lacks dates. We leave `datePublished` optional in `ReviewInput`. When real submission data lands, populate it — Google strongly prefers dated reviews.
