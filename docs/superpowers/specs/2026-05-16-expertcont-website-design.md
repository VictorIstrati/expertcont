# ExpertCont Website — Design Spec

**Date:** 2026-05-16 (revised 2026-05-17)
**Status:** Open questions resolved; ready for implementation plan
**Source:** Translated from the brainstorming conversation; visual reference is the prototype in `design/`.

## 1. Goal

Build a production-grade marketing website for **ExpertCont**, a Moldovan firm offering accounting, legal, and consulting services. The site must:

- Be fast and SEO-friendly for local search in Moldova, in **three languages at launch** (Romanian default, plus Russian and English).
- Use **localized URLs** (route prefix and slug both translated) so each language ranks independently in its market.
- Be discoverable and indexable by LLM crawlers (per-page Markdown companions + `llms.txt`, one set per locale).
- Capture three kinds of user input: contact-form messages, booking requests, and customer reviews.
- Notify the firm in real time on Telegram when a contact message or booking arrives.
- Be maintainable as a monorepo, with content (blog, guides, page bodies) authored in MDX and versioned in git.
- Author all UI strings with translation markers from day one (Lingui `<Trans>` / `useLingui` / `msg`).

`design/` is a runtime-Babel React prototype. It is consulted **only as a visual/UX reference**. None of its implementation patterns (CDN-loaded React, in-browser Babel, custom `t(lang, key)` dictionary, state-based pseudo-routing, inline-style components) carry into the real build.

## 2. Stack

| Layer | Choice |
|---|---|
| Language | TypeScript everywhere |
| Framework | Astro 4+ with React islands |
| Styling | CSS Modules + design tokens (CSS custom properties); no Tailwind |
| i18n | Lingui v5 (React macros: `<Trans>`, `useLingui`, `msg`) — `sourceLocale: "ro"`, `locales: ["ro","ru","en"]` |
| Routing | Astro file-based routes + custom `getStaticPaths` driver that emits localized URLs (prefix + slug both translated per locale) |
| Content | MDX collections in `packages/content`, one file per locale (e.g. `services/accounting/index.ro.mdx`, `index.ru.mdx`, `index.en.mdx`) |
| Forms | React Hook Form + Zod (shared schemas via `packages/schemas`) |
| Anti-spam | Cloudflare Turnstile (invisible, server-verified) |
| Analytics | Google Analytics 4 with Google Consent Mode v2 (loads only after consent) |
| Consent management | Lightweight in-house consent banner + cookie store (Necessary / Analytics) wired to Consent Mode |
| Database | Supabase (managed Postgres + Row-Level Security) |
| Notifications | Supabase Edge Function → Telegram Bot API, triggered by Supabase Database Webhooks on `INSERT` (single admin chat) |
| Hosting | Cloudflare Pages with `@astrojs/cloudflare` adapter (hybrid rendering) |
| Package manager | pnpm workspaces |
| Task runner | Turborepo |
| Email (transactional) | Resend (booking confirmation to the user; not used for staff notifications — Telegram handles those). Sending address: `noreply@mail.expertcont.md` |

## 3. Monorepo Layout

```
expertcont2/
├─ pnpm-workspace.yaml
├─ turbo.json
├─ package.json
├─ tsconfig.base.json
├─ .github/workflows/deploy.yml
├─ apps/
│  └─ web/                                  # Astro site (Cloudflare Pages target)
│     ├─ astro.config.mjs
│     ├─ wrangler.toml
│     ├─ src/
│     │  ├─ pages/
│     │  │  ├─ [locale]/index.astro         # Home (per locale, via getStaticPaths)
│     │  │  ├─ [locale]/[section]/index.astro
│     │  │  │                               # Section index pages (services, blog, …)
│     │  │  ├─ [locale]/[section]/[slug].astro
│     │  │  │                               # Section detail pages
│     │  │  ├─ [...slug].md.ts              # Markdown companion for any page (any locale)
│     │  │  ├─ llms.txt.ts                  # llmstxt.org index endpoint (lists all locales)
│     │  │  ├─ sitemap-index.xml.ts         # Index referencing per-locale sitemaps
│     │  │  ├─ sitemap-[locale].xml.ts      # One sitemap per locale, with hreflang
│     │  │  ├─ robots.txt                   # static, LLM-bot allowed
│     │  │  └─ api/
│     │  │     ├─ contact.ts                # POST → contact_messages
│     │  │     ├─ bookings.ts               # POST → bookings
│     │  │     └─ reviews.ts                # POST → reviews (unpublished)
│     │  ├─ layouts/
│     │  │  └─ Base.astro                   # html shell, head meta, hreflang alternates, canonical, link rel=alternate type=text/markdown
│     │  ├─ components/                     # Astro-specific components (LocaleSwitcher etc.)
│     │  ├─ middleware.ts                   # Locale detection / redirect for "/" → "/ro" (or browser-preferred)
│     │  └─ styles/                         # global.css imports tokens
│     └─ public/                            # static images, favicons, robots assets
├─ packages/
│  ├─ ui/                                   # shared React components (TS + CSS modules)
│  │  └─ src/{Button,Modal,FormField,…}/    # one folder per component
│  ├─ content/                              # MDX collections + co-located images
│  │  ├─ services/<canonical-id>/
│  │  │  ├─ meta.ts                         # { id, slugs:{ro,ru,en}, titles:{…}, descriptions:{…} }
│  │  │  ├─ index.ro.mdx · index.ru.mdx · index.en.mdx
│  │  │  └─ images/                         # PNG/JPG/SVG used by this service's pages
│  │  ├─ blog/<canonical-id>/…
│  │  ├─ guides/<canonical-id>/…
│  │  └─ pages/<page-id>/                   # page bodies for static pages where useful
│  ├─ i18n/                                 # Lingui config, locales/{ro,ru,en}/messages.po, route segment map, locale utilities
│  ├─ tokens/                               # CSS custom properties (colors, spacing, radii, fonts)
│  ├─ backend/                              # Server-only. Owns Supabase + Resend.
│  │  └─ src/{contact,bookings,reviews,faq,supabase,email,errors,types}.ts
│  ├─ schemas/                              # Zod schemas shared by API + React forms (client-safe)
│  └─ consent/                              # Consent banner React island + Consent Mode bridge
├─ supabase/                                # Supabase CLI project (root, per convention)
│  ├─ config.toml
│  ├─ migrations/                           # *.sql, applied in CI
│  ├─ seed.sql                              # initial FAQ seed (ro/ru/en)
│  └─ functions/
│     └─ notify-telegram/index.ts           # Edge Function
└─ design/                                  # original prototype, kept as visual reference only
```

## 4. Pages and Localized URLs

**Default locale is Romanian; its URLs have no language prefix.** Russian uses `/ru`, English uses `/en`. Both route prefix *and* slug are translated per locale.

### 4.1 Canonical URL table

| Concept | RO (default) | RU | EN |
|---|---|---|---|
| Home | `/` | `/ru` | `/en` |
| Services index | `/servicii` | `/ru/uslugi` | `/en/services` |
| Service detail | `/servicii/contabilitate` | `/ru/uslugi/bukhgalteriya` | `/en/services/accounting` |
| Pricing | `/preturi` | `/ru/tseny` | `/en/pricing` |
| Contact | `/contact` | `/ru/kontakty` | `/en/contact` |
| FAQ | `/intrebari-frecvente` | `/ru/voprosy` | `/en/faq` |
| Reviews | `/recenzii` | `/ru/otzyvy` | `/en/reviews` |
| Blog index | `/blog` | `/ru/blog` | `/en/blog` |
| Blog post | `/blog/<ro-slug>` | `/ru/blog/<ru-slug>` | `/en/blog/<en-slug>` |
| Guides index | `/ghiduri` | `/ru/rukovodstva` | `/en/guides` |
| Guide | `/ghiduri/<ro-slug>` | `/ru/rukovodstva/<ru-slug>` | `/en/guides/<en-slug>` |

The exact RU/EN translations of section prefixes and slugs are placeholders — final wording will be finalized during content authoring and recorded in `packages/i18n/src/routeSegments.ts`.

### 4.2 Routes and sources

| Concept | Source | Notes |
|---|---|---|
| Home | `pages/<id>/index.<locale>.mdx` | Hero, services teaser, why-us, testimonials snippet, CTA |
| Services index | All `services/*/meta.ts` filtered by locale | List of services with title/summary |
| Service detail | `services/<id>/index.<locale>.mdx` | "Book this service" CTA pre-fills booking modal |
| Pricing | `pages/pricing/index.<locale>.mdx` | Pricing tables/tiers |
| Contact | Astro + form island | Address, phone, contact form |
| FAQ | Supabase `faq` table | Per-locale columns (see §6). Rendered SSR, cached at edge, purged by webhook on update |
| Reviews | Supabase `reviews WHERE published = true` + submit form | Public reviews |
| Blog / Guides | MDX collections | Articles and long-form guides |
| `/llms.txt` | Generated | LLM index, lists per-locale `.md` URLs |
| `/<any-page>.md` | Generated | Markdown companion of each HTML page, including locale prefix |
| `/sitemap-index.xml`, `/sitemap-{ro,ru,en}.xml` | Generated | One sitemap per locale + index; each entry has hreflang cross-refs |
| `/robots.txt` | Static | Allows GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended |

## 5. Localized Routing — Mechanics

This section pins down how multi-locale routing actually works so implementation has no ambiguity.

### 5.1 Content identity

Every piece of content has a stable **canonical id** independent of language. The id is the folder name under the collection (e.g. `services/accounting/`). The id is what the database stores in `service_slug` columns, what the URL `.md.ts` endpoint resolves through, and what the locale switcher uses to find siblings.

### 5.2 Slug map

Each content item declares a `meta.ts` exporting:

```ts
export const meta = {
  id: "accounting",
  slugs:   { ro: "contabilitate",      ru: "bukhgalteriya",  en: "accounting" },
  titles:  { ro: "Contabilitate",      ru: "Бухгалтерия",    en: "Accounting" },
  summaries: { ro: "...", ru: "...", en: "..." },
  updated: "2026-05-16",
} as const;
```

### 5.3 Route segments map

`packages/i18n/src/routeSegments.ts` defines the localized translations of section names:

```ts
export const routeSegments = {
  services: { ro: "servicii", ru: "uslugi", en: "services" },
  pricing:  { ro: "preturi",  ru: "tseny",  en: "pricing"  },
  contact:  { ro: "contact",  ru: "kontakty", en: "contact" },
  faq:      { ro: "intrebari-frecvente", ru: "voprosy", en: "faq" },
  reviews:  { ro: "recenzii", ru: "otzyvy", en: "reviews" },
  blog:     { ro: "blog",     ru: "blog",   en: "blog"    },
  guides:   { ro: "ghiduri",  ru: "rukovodstva", en: "guides" },
} as const;
```

### 5.4 `getStaticPaths` driver

A single helper `localizedPaths(section, items)` builds the Astro path entries for every locale × item combination. Each entry's params include `locale`, `sectionSegment`, `slug`, and the resolved `id` and `localeData`.

### 5.5 Locale switcher

The nav language switcher (a React island) receives the current page's `id` (or the current section if on an index page) and produces sibling URLs from the slug map. Falls back to the locale's home if a translation doesn't exist for the current page yet.

### 5.6 Hreflang and canonical

`Base.astro` injects, for every page:

```html
<link rel="canonical" href="https://expertcont.md/.../<slug-of-this-locale>" />
<link rel="alternate" hreflang="ro" href="…ro url…" />
<link rel="alternate" hreflang="ru" href="…ru url…" />
<link rel="alternate" hreflang="en" href="…en url…" />
<link rel="alternate" hreflang="x-default" href="…ro url…" />
<link rel="alternate" type="text/markdown" href="…this-page.md…" />
```

### 5.7 Default-locale entry handling

`/` is the Romanian home. We do **not** serve a duplicate `/ro` URL — only the unprefixed one — to keep a single canonical Romanian URL. Browsers requesting `/ro/...` are 308-redirected to the unprefixed form. The `[locale]/...` page templates accept `"ro"` as a possible locale param at build time but emit unprefixed paths.

### 5.8 Middleware

`apps/web/src/middleware.ts` performs a one-time soft preference: on first visit to `/`, if `Accept-Language` indicates RU or EN, set a `prefer-locale` cookie. The user always sees the URL they typed; the cookie only influences the locale switcher's "remembered choice" UX. No automatic 302s — important for SEO.

### 5.9 Translation source of truth

- **UI strings** → Lingui `.po` catalogs under `packages/i18n/src/locales/{ro,ru,en}/messages.po`. RO is the source; RU and EN are translations.
- **Page bodies** → MDX file per locale, co-located in the content collection folder.
- **Slugs / titles / summaries** → `meta.ts` per content item.
- **Section route segments** → `routeSegments.ts`.

## 6. Database Schema (Supabase)

### 6.1 FAQ — normalized two-table model

FAQ entries are the same conceptual content translated into many languages. Normalized split lets us add a locale without schema migrations and track translation status precisely.

```sql
create table faq (
  id uuid primary key default gen_random_uuid(),
  category text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table faq_translations (
  faq_id uuid not null references faq(id) on delete cascade,
  locale text not null check (locale in ('ro','ru','en')),
  question text not null check (length(question) between 3 and 500),
  answer   text not null check (length(answer)   between 3 and 8000),
  updated_at timestamptz not null default now(),
  primary key (faq_id, locale)
);

create index faq_translations_locale_idx on faq_translations (locale);

-- Convenience view consumed by the public site
create view faq_public as
select f.id, f.category, f.sort_order, t.locale, t.question, t.answer, t.updated_at
from faq f
join faq_translations t on t.faq_id = f.id
where f.published = true;
```

### 6.2 Reviews — single-language rows + PII split + moderation states

Reviews are user-generated content in one specific language; they are never translated. PII (email, IP, UA) lives in a separate table so a future RLS slip on `reviews` can't leak it. Moderation uses a four-state enum, not a boolean.

```sql
create type review_status as enum ('pending','approved','rejected','spam');

create table reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author_name text not null check (length(author_name) between 2 and 120),
  author_company text check (author_company is null or length(author_company) between 1 and 200),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (length(body) between 10 and 4000),
  locale text not null check (locale in ('ro','ru','en')),
  service_id text,                       -- canonical content id; no FK
  status review_status not null default 'pending',
  featured boolean not null default false,
  approved_at timestamptz,
  approved_by uuid                       -- references auth.users when admin auth lands
);

create table reviews_pii (
  review_id uuid primary key references reviews(id) on delete cascade,
  author_email text not null check (author_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  submitter_ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index reviews_status_locale_idx on reviews (status, locale, created_at desc);
create index reviews_featured_idx on reviews (featured) where status = 'approved';

create view reviews_public as
select id, created_at, author_name, author_company, rating, body, locale, service_id, featured
from reviews
where status = 'approved';
```

### 6.3 Contact messages

```sql
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (length(name) between 2 and 200),
  email text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text check (phone is null or length(phone) between 5 and 40),
  subject text check (subject is null or length(subject) between 1 and 300),
  body text not null check (length(body) between 10 and 5000),
  locale text not null check (locale in ('ro','ru','en')),
  submitter_ip inet,
  user_agent text,
  status text not null default 'new' check (status in ('new','read','replied','spam'))
);
```

### 6.4 Bookings

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (length(name) between 2 and 200),
  email text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text not null check (length(phone) between 5 and 40),
  service_id text,                       -- canonical content id
  preferred_date date check (preferred_date is null or preferred_date >= current_date - interval '1 day'),
  preferred_time_window text check (preferred_time_window in ('morning','afternoon','evening','flexible')),
  message text check (message is null or length(message) <= 2000),
  locale text not null check (locale in ('ro','ru','en')),
  submitter_ip inet,
  user_agent text,
  status text not null default 'new' check (status in ('new','contacted','scheduled','completed','cancelled')),
  notes text                             -- internal, never returned over API
);
```

### 6.5 Row-Level Security — single ingress

The DB has **one write path**: the Astro API endpoint using `SUPABASE_SERVICE_ROLE_KEY` (a server-only secret never sent to browsers). Anon has zero write permissions and can only read through curated views. There is no second door for a bot to find.

```sql
-- All tables have RLS enabled; absence of an anon policy = anon access denied.
alter table faq enable row level security;
alter table faq_translations enable row level security;
alter table reviews enable row level security;
alter table reviews_pii enable row level security;
alter table contact_messages enable row level security;
alter table bookings enable row level security;

-- READS: anon gets the curated views only, never the base tables.
grant select on faq_public to anon;
grant select on reviews_public to anon;

-- WRITES: no anon INSERT/UPDATE/DELETE policies anywhere.
-- The Astro API uses service_role (which bypasses RLS) to insert.
-- service_role lives only on the server (Cloudflare Pages env var, encrypted).

-- FAQ writes: service_role only (i.e., admin authoring via Studio or scripts).
-- Authenticated admin role will be added when an admin app is built.
```

Because anon has no write capability, **every form submission must traverse the Astro API**, where Turnstile, honeypot, time-trap, and rate-limit run. A bot that tries to call Supabase directly with the anon key gets a 403. The triggers and CHECK constraints in §6.6 remain in force regardless of which role is writing — they are the DB-level safety net against accidental misuse of `service_role`.

### 6.6 Defense-in-depth triggers

`WITH CHECK` policies catch most things, but triggers guarantee that **trusted columns are always set by the server**, regardless of what the client sent:

```sql
create or replace function force_review_defaults() returns trigger language plpgsql as $$
begin
  new.status      := 'pending';
  new.featured    := false;
  new.approved_at := null;
  new.approved_by := null;
  return new;
end$$;
create trigger trg_reviews_force_defaults
  before insert on reviews
  for each row execute function force_review_defaults();

create or replace function force_submission_status_new() returns trigger language plpgsql as $$
begin
  new.status := 'new';
  return new;
end$$;
create trigger trg_contact_force_status before insert on contact_messages
  for each row execute function force_submission_status_new();
create trigger trg_bookings_force_status before insert on bookings
  for each row execute function force_submission_status_new();
```

Together: an attacker who somehow bypasses the API and writes directly with the anon key still cannot self-publish a review, mark themselves featured, or pre-mark a booking as `completed`.

### 6.7 Bot defense layers (in order)

Each layer is independent; an attacker has to defeat all of them. Cost is monotonically increasing for bots, near-zero for humans.

1. **Honeypot field** — a hidden form input named like `website` or `url`; CSS-hidden + `aria-hidden` + `tabindex=-1`. If filled, the API rejects with a generic 200 OK (no signal back to the bot).
2. **Time-trap** — the form records a `mounted_at` timestamp client-side and sends `elapsed_ms` with the submission. The API rejects anything under 1.5 seconds.
3. **Cloudflare Turnstile** — invisible challenge widget; the API verifies the token server-side via Cloudflare's siteverify API. Token bound to a single submission.
4. **Per-IP rate limit** — Cloudflare Workers KV counter, e.g. 5 submissions / minute / endpoint and 20 / hour / endpoint per source IP.
5. **PG `WITH CHECK` + triggers** — described above. The DB itself rejects malformed or status-tampered inserts.
6. **Body length and pattern checks** — CHECK constraints on every text column (already in tables) prevent multi-megabyte payload spam.
7. **Email validation** — regex CHECK at the column level rejects obviously bogus emails server-side.
8. **(Optional, post-launch)** Add an abuse webhook: if more than N rejections / minute from one IP, push the IP into a Cloudflare WAF rule for an hour.

All eight together produce a defence that's transparent to humans and prohibitive for off-the-shelf scrapers.

## 7. Request Flow

### 7.1 Backend package — single owner of Supabase + Resend

All Supabase reads/writes go through `packages/backend`. Astro API endpoints become thin HTTP shells; they do the *web* concerns (parse, verify Turnstile, rate-limit) and delegate the *business* concerns (validate, insert, email, error mapping) to the backend.

```ts
// packages/backend/src/index.ts (public surface)
export const backend = {
  contact:  { submit(input: ContactInput,  ctx: RequestCtx): Promise<{ id: string }> },
  bookings: { submit(input: BookingInput,  ctx: RequestCtx): Promise<{ id: string }> },
  reviews:  {
    submit(input: ReviewInput, ctx: RequestCtx): Promise<{ id: string }>,
    listApproved(q: { locale: Locale; serviceId?: string }): Promise<Review[]>,
    listFeatured(locale: Locale, limit?: number): Promise<Review[]>,
  },
  faq: {
    list(locale: Locale): Promise<FaqEntry[]>,
    listByCategory(locale: Locale): Promise<Record<string, FaqEntry[]>>,
  },
};
```

`RequestCtx` carries the values the web layer captured: `{ ip, userAgent, locale, now }`. The backend uses them to fill `submitter_ip`, `user_agent`, and `locale` columns and to format Resend emails — without giving business code direct access to the `Request` object.

Boundary rules:
- `packages/backend` is **server-only**. It is never bundled into client code. Imports `@supabase/supabase-js`, `resend`, and `packages/schemas`.
- `packages/schemas` is **client-safe**. Zod schemas live here so React forms can import them without dragging Supabase into the bundle.
- Astro API endpoints (`apps/web/src/pages/api/*.ts`) are the only callers of `backend`.

Tests live next to the code in `packages/backend` and run against `supabase start` in CI.

### 7.2 Contact form / Booking / Review submission

```
Browser form (React island)
  │
  ├─ React Hook Form validates client-side (Zod schema from packages/schemas)
  ├─ Turnstile widget produces token
  └─ fetch POST /api/<endpoint> (current locale + elapsed_ms + token in body)
        │
        ▼
Astro API endpoint (Cloudflare Worker)        ← web concerns
  │
  ├─ Parse body; reject if honeypot field populated (silent 200 OK)
  ├─ Reject if elapsed_ms < 1500
  ├─ Verify Turnstile token via Cloudflare siteverify
  ├─ Rate limit by IP (Cloudflare Workers KV; 5/min, 20/hour per endpoint)
  ├─ Re-validate body with packages/schemas (defense in depth)
  └─ Call backend.<thing>.submit(input, { ip, userAgent, locale, now })
        │
        ▼
packages/backend                              ← business concerns
  │
  ├─ Insert row via service_role Supabase client
  ├─ For reviews: insert reviews + reviews_pii in a single transaction
  ├─ For bookings: send confirmation email to the submitter via Resend, in their locale
  └─ Return { id }
        │
        ▼
Astro endpoint returns { ok: true, id } to the browser

Supabase Database Webhook (INSERT on contact_messages or bookings)
  │
  └─ POST to Edge Function notify-telegram
        │
        ├─ Format staff-facing message in Romanian, including submitter's locale
        ├─ Include a link back to the Supabase Studio row for easy follow-up
        └─ Telegram Bot API: sendMessage to ${TELEGRAM_CHAT_ID}
```

Reviews insert as `status='pending'` and do not trigger Telegram. Moderation happens in Supabase Studio.

### 7.3 LLM-discoverability flow

- Every HTML page includes `<link rel="alternate" type="text/markdown" href="/<this-page>.md" />` in `<head>`.
- `[...slug].md.ts` resolves the requested slug **including locale prefix**, looks up the matching content (MDX file or DB row), and returns `text/markdown` with frontmatter (`title`, `description`, `lang`, `updated`, `canonical`).
- `llms.txt` emits the [llmstxt.org](https://llmstxt.org) format. The index groups URLs by locale and by section. Each locale's section is clearly headed (e.g. `## Pages (ro)`).
- `llms-full.txt` (optional, behind a feature flag) concatenates every page's Markdown for single-shot ingestion.
- `robots.txt` explicitly allows: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`.

### 7.4 Analytics + consent flow

```
Page load
  │
  ├─ Base.astro injects the GA4 snippet with Consent Mode v2
  │     - default consent: analytics_storage = "denied", ad_* = "denied"
  ├─ ConsentBanner island mounts; checks cookie `expertcont-consent`
  │
  ├─ If cookie missing: show banner, no analytics events fire
  ├─ If cookie present with analytics=true: window.gtag('consent','update',{analytics_storage:'granted'})
  └─ If cookie present with analytics=false: stays denied; no banner shown
```

Banner UI: two prominent buttons ("Accept", "Reject"), one link to a granular preferences modal. Localized via Lingui.

## 8. Components and Composition

`packages/ui` exports primitives, rewritten from scratch with the design as visual reference:

- **Layout**: `Container`, `Section`, `Grid`, `Stack`
- **Typography**: `Heading`, `Eyebrow`, `Lead`
- **Controls**: `Button`, `LinkButton`, `IconButton`
- **Form**: `FormField`, `TextInput`, `TextArea`, `Select`, `DateInput`, `RatingInput`, `Checkbox`, `FormError`
- **Display**: `Card`, `Badge`, `Icon` (single SVG sprite), `Avatar`
- **Overlays**: `Modal`, `Dialog` (built on an accessible headless library — Radix UI or Ark UI, decided in implementation)
- **Locale**: `LocaleSwitcher` (uses the slug map; lives in nav)
- **Consent**: `ConsentBanner`, `ConsentPreferencesModal` (in `packages/consent`)

Astro pages compose mostly server-rendered React via `client:load`/`client:visible` only where interactivity is needed:

- **Always islands**: booking modal, contact form, review submit form, locale switcher, mobile nav, consent banner
- **Static (no JS)**: hero, services grid, pricing tables, page headers, footer, FAQ list (server-rendered from DB), review list (same)

## 9. Configuration and Secrets

| Variable | Scope | Where stored |
|---|---|---|
| `PUBLIC_SITE_URL` | build | Cloudflare Pages env (e.g. `https://expertcont.md`) |
| `SUPABASE_URL` | server | Cloudflare Pages env |
| `SUPABASE_ANON_KEY` | client + server (RLS-safe) | same |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Cloudflare Pages env (encrypted) |
| `TURNSTILE_SITE_KEY` | client | Cloudflare Pages env (public) |
| `TURNSTILE_SECRET_KEY` | server | Cloudflare Pages env (encrypted) |
| `RESEND_API_KEY` | server | Cloudflare Pages env (encrypted) |
| `RESEND_FROM` | server | Cloudflare Pages env (`noreply@mail.expertcont.md`) |
| `PUBLIC_GA4_MEASUREMENT_ID` | client | Cloudflare Pages env |
| `TELEGRAM_BOT_TOKEN` | Edge Function | `supabase secrets set` |
| `TELEGRAM_CHAT_ID` | Edge Function | `supabase secrets set` |

## 10. Testing Strategy

- **Unit**: Vitest for `packages/schemas`, `packages/ui` components (React Testing Library).
- **Integration**: Vitest + Supabase local (`supabase start`) for API endpoints — assert insert + RLS + webhook payload shape.
- **E2E**: Playwright covering, per locale (ro/ru/en):
  - Home renders, nav links resolve to localized URLs.
  - Locale switcher swaps to the correct sibling URL.
  - Contact + booking + review forms happy paths, plus one validation-error case.
  - Consent banner: denying analytics keeps gtag in `denied` state; accepting flips to `granted`.
- **Type check**: `tsc --noEmit` across the monorepo via Turbo.
- **Lingui check**: `lingui extract --clean` in CI; fail on diff.
- **SEO check**: build-time script asserts every page has canonical + hreflang for all three locales, and that the markdown companion exists.

Local dev: `pnpm dev` runs `astro dev` + `supabase start` concurrently.

## 11. Deployment

- **CI/CD**: GitHub Actions
  - On PR: install, lint, typecheck, unit tests, lingui-clean check, e2e tests against local Supabase.
  - On `main`: apply Supabase migrations (`supabase db push`), deploy Edge Functions (`supabase functions deploy notify-telegram`), build Astro, deploy to Cloudflare Pages via `wrangler`.
- **Supabase environments**: start with a single prod project; add a staging project later if release cadence demands it.
- **Cloudflare Pages**: connected to GitHub; preview deploy per PR.
- **DNS**: `expertcont.md` → Cloudflare Pages. `mail.expertcont.md` → Resend (SPF, DKIM, DMARC records published).

## 12. Decisions (resolved open questions)

| Topic | Decision |
|---|---|
| Domain | `expertcont.md` |
| Launch locales | Romanian (default, unprefixed), Russian (`/ru`), English (`/en`) — all three at launch |
| Booking form | Minimal set: name, email, phone, service, preferred date, time window, free-text message. No company/IDNO at this stage. |
| Review submission | Email **required**, never returned to clients; used for moderation contact and spam deterrence |
| Analytics | Google Analytics 4 with Consent Mode v2 |
| Consent banner | Required (because GA4). Lightweight in-house implementation with Necessary / Analytics granularity. |
| MDX images | Co-located in `packages/content/<section>/<id>/images/`, served via Astro `<Image>` |
| Tweaks panel | Dropped — prototype-only |
| Telegram | Single admin chat; one bot, one chat id |
| Resend "from" | `noreply@mail.expertcont.md` (dedicated subdomain) |
| Per-language slugs | Yes — route prefix and slug both localized; see §5 |

## 13. Out of Scope (deferred to a future spec)

**Deferred to v1.1 (planned follow-up):**
- Abuse webhook → Cloudflare WAF auto-ban for repeat offenders (Edge Function watches rejection counts per IP and pushes a temporary block rule via the Cloudflare API).

**Deferred indefinitely (no current plan):**
- Client portal / authenticated area.
- Document upload / e-signature.
- Admin UI beyond Supabase Studio.
- Multi-currency pricing.
- Newsletter signup / email marketing.
- Analytics dashboards beyond default GA4 reports.
- A/B testing infrastructure.
- Translation memory / TM-tool integration (translators edit `.po` and `.mdx` directly for v1).

## 14. Success Criteria

1. Lighthouse scores ≥ 95 on Performance, Accessibility, Best Practices, SEO for the home, services index, a service detail page, and a blog post — in **each of the three locales**.
2. `lingui extract --clean` produces zero diff in CI; every UI string in `packages/ui` has a `<Trans>` / `useLingui` / `msg` wrapper.
3. Every page emits valid `canonical` and three `hreflang` alternates (plus `x-default`).
4. `/llms.txt` is valid llmstxt.org format and lists every public page across all three locales.
5. `/<any-page>.md` returns the page content as Markdown with valid frontmatter (`title`, `description`, `lang`, `updated`, `canonical`).
6. Submitting the contact form inserts a row in `contact_messages` AND delivers a Telegram message within 5 seconds.
7. Submitting a booking inserts a row in `bookings`, delivers a Telegram message within 5 seconds, and sends a Resend confirmation email to the submitter in their locale.
8. Submitting a review inserts an `unpublished` row and is visible in Supabase Studio for moderation. `author_email` is never exposed via the public API.
9. With JS disabled: every page renders content correctly. Only the three forms, mobile menu, locale switcher, and consent banner stop working — and the page itself is still readable.
10. `robots.txt` allows LLM bots; `sitemap-index.xml` and per-locale sitemaps are reachable and cross-linked with hreflang.
11. GA4 events fire only after the user accepts analytics consent; rejecting keeps `analytics_storage = "denied"` indefinitely.
