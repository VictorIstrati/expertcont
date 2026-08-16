# Ukrainian Consular & Legal Support Service — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a seventh service — legal and administrative support for Ukrainian citizens displaced to Moldova — as a card on the services index pages, opening a detail page that lists the full catalogue of services in English.

**Architecture:** Services on this site are entirely data-driven. One meta JSON in the `services-meta` content collection plus one MDX body per locale in the `services` collection produces the card, the detail page, the localised URLs, the hreflang alternates, the JSON-LD and the sitemap entry. Everything else in this plan is supporting copy (icons, sidebar data, feature bullets, booking-modal option) that the existing components look up by service id. A new optional `hideFromHome` flag on the meta schema keeps this B2C service off the B2B home page.

**Tech Stack:** Astro 4 content collections (zod schemas), MDX, React 18 islands, TypeScript (strict, `noUncheckedIndexedAccess`), Lingui 5, Vitest, pnpm workspaces + Turborepo.

**Spec:** `docs/superpowers/specs/2026-08-16-ukrainian-consular-service-design.md`

## Global Constraints

- Run every command from the repo root. Use **pnpm** — never npm or yarn.
- Canonical service id is **`ukrainians`** everywhere (meta JSON, icon map, serviceData, slug maps).
- Slugs are permanent: ro `servicii-consulare-ucraina` · ru `konsulskie-uslugi-ukraina` · en `ukrainian-consular-services`.
- **English body only.** The RO and RU MDX bodies are placeholders. They must contain real Romanian/Russian prose — never English body text.
- Short strings (card title, summary, sidebar, feature bullets, booking label) are written in **all three locales**. Only the long catalogue is English-only.
- Terminology is settled in the spec's "Terminology notes" section. Do not write "in absentia" for remote divorce; do not narrow maintenance to child support only.
- **Temporary protection support is free of charge** and must read as free in four
  places: the body intro and catalogue bullet (Task 2), the services-index card bullets
  (Task 4), and the "Status in Moldova" sidebar card plus one sidebar pricing feature
  (Task 5). Nothing else in the catalogue is free.
- **The team speaks Ukrainian and Russian** — the leading differentiator. It goes first
  in the card bullets (Task 4), first in the sidebar features (Task 5), and in the
  opening line of all three MDX bodies (Task 2). This card carries five bullets rather
  than the usual four; that is intended.
- No inline `style=` attributes. Strict TS: treat indexed lookups as possibly undefined.
- `apps/web` has **no test runner**. Its verification is `pnpm build` plus `pnpm typecheck`. Only `packages/i18n` and `packages/ui` have Vitest.
- Prettier governs formatting; run `pnpm format` if `pnpm format:check` fails.

---

### Task 1: Register the service in the shared slug map

`packages/i18n/src/serviceSlugs.ts` holds a `ServiceId` union used by the Footer and the industries pages. Its own comment requires it to stay in sync with the meta JSON. This is the only part of the change with a real unit-test harness, so it goes first.

**Files:**
- Create: `packages/i18n/src/serviceSlugs.test.ts`
- Modify: `packages/i18n/src/serviceSlugs.ts:11-29`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `ServiceId` gains the `"ukrainians"` member; `serviceDetailUrl("ukrainians", locale)` returns the three canonical URLs. Task 2's meta JSON slugs must match these exactly.

- [ ] **Step 1: Write the failing test**

Create `packages/i18n/src/serviceSlugs.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SERVICE_IDS, serviceSlugs, serviceDetailUrl } from "./serviceSlugs";

describe("service slug map", () => {
  it("includes the Ukrainian consular service", () => {
    expect(SERVICE_IDS).toContain("ukrainians");
  });

  it("builds locale-aware detail URLs for it", () => {
    expect(serviceDetailUrl("ukrainians", "ro")).toBe("/servicii/servicii-consulare-ucraina");
    expect(serviceDetailUrl("ukrainians", "ru")).toBe("/ru/uslugi/konsulskie-uslugi-ukraina");
    expect(serviceDetailUrl("ukrainians", "en")).toBe("/en/services/ukrainian-consular-services");
  });

  it("defines all three locale slugs for every service id", () => {
    for (const id of SERVICE_IDS) {
      const slugs = serviceSlugs[id];
      expect(slugs.ro).toBeTruthy();
      expect(slugs.ru).toBeTruthy();
      expect(slugs.en).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pnpm --filter @expertcont/i18n exec vitest run src/serviceSlugs.test.ts`

Expected: FAIL. TypeScript rejects `"ukrainians"` as an argument of type `ServiceId`, and `SERVICE_IDS` does not contain it.

- [ ] **Step 3: Add the service to the map**

In `packages/i18n/src/serviceSlugs.ts`, extend the union, the id list and the slug record:

```ts
export type ServiceId =
  | "accounting"
  | "audit"
  | "legal"
  | "consulting"
  | "hr"
  | "it"
  | "ukrainians";

export const SERVICE_IDS: readonly ServiceId[] = [
  "accounting",
  "audit",
  "legal",
  "consulting",
  "hr",
  "it",
  "ukrainians",
];

export const serviceSlugs: Record<ServiceId, Record<Locale, string>> = {
  accounting: { ro: "contabilitate", ru: "bukhgalteriya", en: "accounting" },
  audit: { ro: "audit", ru: "audit", en: "audit" },
  legal: { ro: "juridic", ru: "yuridicheskie-uslugi", en: "legal" },
  consulting: { ro: "consultanta", ru: "konsalting", en: "consulting" },
  hr: { ro: "resurse-umane", ru: "kadry", en: "hr" },
  it: { ro: "servicii-it", ru: "it-uslugi", en: "it-services" },
  ukrainians: {
    ro: "servicii-consulare-ucraina",
    ru: "konsulskie-uslugi-ukraina",
    en: "ukrainian-consular-services",
  },
};
```

Leave the Footer (`packages/ui/src/Footer/Footer.tsx`) alone — its six hardcoded links are the desired behaviour.

- [ ] **Step 4: Run the test and confirm it passes**

Run: `pnpm --filter @expertcont/i18n exec vitest run src/serviceSlugs.test.ts`

Expected: PASS, 3 tests.

- [ ] **Step 5: Typecheck the workspace**

Run: `pnpm typecheck`

Expected: clean. Widening the union is additive — nothing exhaustively switches on `ServiceId`.

- [ ] **Step 6: Commit**

```bash
git add packages/i18n/src/serviceSlugs.ts packages/i18n/src/serviceSlugs.test.ts
git commit -m "feat(i18n): register ukrainians service in the shared slug map"
```

---

### Task 2: Content entry — meta, English catalogue, placeholder bodies, image

The schema field, the meta JSON and all three MDX files must land together: `[slug].astro` asserts a non-null MDX entry per locale (`mdxEntry!`), so a meta entry without three bodies fails the build.

**Files:**
- Modify: `apps/web/src/content/config.ts:49-52` (the `servicesMeta` collection)
- Create: `apps/web/src/content/services-meta/ukrainians.json`
- Create: `apps/web/src/content/services/ukrainians.en.mdx`
- Create: `apps/web/src/content/services/ukrainians.ro.mdx`
- Create: `apps/web/src/content/services/ukrainians.ru.mdx`
- Create: `apps/web/public/service-ukrainians.webp` (copied placeholder)

**Interfaces:**
- Consumes: the slugs registered in Task 1 — the meta JSON `slugs` values must be byte-identical to them.
- Produces: a `services-meta` entry with `id: "ukrainians"` and an optional boolean `hideFromHome` field on the schema, which Task 3 filters on.

- [ ] **Step 1: Add the `hideFromHome` field to the schema**

In `apps/web/src/content/config.ts`, replace the `servicesMeta` definition:

```ts
/** Per-entry meta (slugs map etc.). One meta JSON per content folder. */
const servicesMeta = defineCollection({
  type: "data",
  schema: baseMeta.extend({
    /** Omit this service from the home-page services grid (services index only). */
    hideFromHome: z.boolean().optional(),
  }),
});
```

- [ ] **Step 2: Create the meta JSON**

Create `apps/web/src/content/services-meta/ukrainians.json`:

```json
{
  "id": "ukrainians",
  "slugs": {
    "ro": "servicii-consulare-ucraina",
    "ru": "konsulskie-uslugi-ukraina",
    "en": "ukrainian-consular-services"
  },
  "titles": {
    "ro": "Servicii consulare și juridice pentru cetățenii ucraineni",
    "ru": "Консульские и юридические услуги для граждан Украины",
    "en": "Ukrainian consular & legal support in Moldova"
  },
  "summaries": {
    "ro": "Asistență pentru cetățenii ucraineni în Moldova: programări la Ambasada Ucrainei, pașapoarte, pensii, dreptul familiei. Protecția temporară — gratuit.",
    "ru": "Помощь гражданам Украины в Молдове: запись в Посольство Украины, паспорта, пенсии, семейное право. Временная защита — бесплатно.",
    "en": "Help for Ukrainian citizens in Moldova: Embassy of Ukraine appointments, passports, pensions, Diia and family law. Temporary protection support is free."
  },
  "hideFromHome": true,
  "updated": "2026-08-16"
}
```

- [ ] **Step 3: Write the English catalogue**

Create `apps/web/src/content/services/ukrainians.en.mdx`. The opening paragraph must not repeat `bodyIntro` from Task 5 — the detail page renders `bodyIntro` immediately above this content.

Two rules this copy follows, both deliberate:

- **Every `##` carries a search term, not a category label.** Nobody searches "Banking access" or "Pension matters"; people search "Ukrainian embassy Chisinau appointment", "Ukrainian pension abroad", "temporary protection Moldova". The headings are the page's main SEO surface — keep them phrased as the problem, not as the filing category.
- **Every section opens with prose before the bullets.** A page that is nothing but bullet lists reads as generated and gives crawlers no context to rank. The one- or two-sentence lead-in is where the keyword-bearing sentence and the human voice both live. Do not delete these to "tighten" the page.

````mdx
---
title: "Ukrainian consular & legal support"
locale: "en"
contentId: "ukrainians"
---

Your passport expires in four months and the Embassy's electronic queue shows no free slots. Or a pension from Ukraine stopped arriving and nobody will tell you why. Those are the two calls we take most often.

Our team in Moldova speaks Ukrainian and Russian. You can explain the problem in your own language, and read every document we prepare in it.

Almost everything below is done from Moldova. Passports, pensions, powers of attorney, divorce, child maintenance — all of it runs through the Embassy of Ukraine, through Ukrainian e-services such as Diia, or through the Ukrainian courts, without you crossing the border. Where a case genuinely requires presence in Ukraine, we tell you at the first consultation, not after you have paid.

## Ukrainian Embassy and Consulate in Moldova: appointments, passports, certificates

The queue is usually harder than the paperwork. We book the slot by every method the Embassy accepts and prepare the file so that one appointment is enough.

- Booking a slot in the electronic queue of the Ukrainian Embassy or Consulate abroad by every available method — BankID, the Diia app, or email
- Assistance with consular access for men aged 18 to 60: Reserve+, updating military registration records, and challenging refusals
- Passport documents through the Embassy or Consulate and through the Passport Service of the state enterprise "Dokument" abroad — first-time issue of the internal passport (ID card) and of the passport for travel abroad, replacement of an expired or lost document, collection of the finished document, and delivery of a passport produced in Ukraine to the Embassy or Consulate
- Issue of the Certificate of Return to Ukraine (the so-called "white passport"), including for children under guardianship and for persons with no registered place of residence
- Verification of Ukrainian citizenship, including for children, and establishment of citizenship by birth
- Powers of attorney and notarial acts performed at the Ukrainian Embassy or Consulate
- Criminal record certificates and civil status records: registration of a child born abroad, and marriage, death and birth certificates

## Diia, Reserve+ and Ukrainian state e-services from abroad

Most Ukrainian state services now run through an app. When registration fails from abroad — and it often does — the cause is usually a missing tax number or a passport the register cannot verify.

- The Diia app and portal: registration, including by biometric passport, digital documents, and creation of a Diia.Signature qualified electronic signature
- Support with the Reserve+ military registration service
- Individual taxpayer number (RNOKPP): entering the tax number into the Unified State Demographic Register so that the biometric passport can be used in full
- Entering property rights into the State Registers of Ukraine
- Applications for compensation for property in Ukraine damaged or destroyed as a result of the war

## Ukrainian pensions paid abroad

A pension from Ukraine does not stop because you left the country. It stops because an identification deadline passed. Both the identification and the arrears are fixable.

- Restoration and resumption of pension payments from Ukraine
- Identification of pensioners: video identification, through Diia, or through the web portal of the Pension Fund of Ukraine
- Declaration of non-receipt of a pension in another state
- Award of a pension, recalculation — including enforcement of court judgments — and change of the payment method
- Social assistance for persons without a sufficient insurance record, and award of a pension based on insurance record with voluntary payment of additional contributions
- Digitisation of the employment record book

## Access to Ukrainian bank accounts and cards

A working Ukrainian card is not only about money. It is how you log in to Diia, to the Pension Fund portal, and to the consular queue.

- Restoring access to Ukrainian banking services
- Remote opening of Ukrainian bank cards — also as a means of authenticating into Ukrainian e-services and into the consular electronic queue

## Birth certificates, residence registration and documents from Ukrainian archives

These are also the records that Moldovan and Romanian citizenship applications are built on, and the ones that take longest to retrieve. Start them early.

- Birth certificates: replacement under the new rules, and entry into Diia
- Registration and de-registration of place of residence in Ukraine, and residence certificates
- Documenting persons who hold only a birth certificate, and statelessness cases
- Obtaining certificates, extracts and archival records from Ukrainian archives in support of applications for Moldovan or Romanian citizenship

## Temporary protection and residence permits in Moldova

Support with temporary protection is free of charge, whatever your case. We do not charge Ukrainian citizens for the status that lets them stay lawfully.

- **Temporary protection — provided free of charge:** registration, booking the interview, extension, advice on beneficiaries' rights, and renunciation of Moldovan temporary protection from a third country
- Residence permits in the Republic of Moldova: applications and extensions
- Related matters: tax deductions for foreign nationals, roadworthiness testing and the lawful stay of Ukrainian-registered vehicles, and acquisition of Moldovan citizenship

## Crossing the Ukraine–Moldova border: children, customs and visas

Travelling with a child who is not yours on paper is where most border problems start. The paperwork is straightforward when it is prepared in advance.

- Travel into and out of the country with minors, and powers of attorney authorising an accompanying adult
- Customs regime on entry into Ukraine and into the Republic of Moldova
- Visa processing — Ukrainian visas for foreign nationals
- Residence permits in Ukraine

## Divorce, child maintenance and family matters in Ukrainian courts

You do not have to return to Ukraine to end a marriage, or to make an absent parent pay. Both proceedings run from Moldova.

- Remote dissolution of marriage through the Ukrainian courts, conducted without travelling to Ukraine
- Maintenance (child and spousal support): recovery proceedings in Ukraine conducted from abroad
- Certificate of no impediment to marriage (single-status certificate), for marrying in Moldova
- Change of surname after marriage or divorce: the full document-replacement cycle, including transliteration of the name across Ukrainian and Moldovan passports
- Registration of a child born in Moldova: legalisation of the Moldovan birth record so that it is recognised by the Embassy of Ukraine
- Succession and inheritance procedures for Ukrainian citizens abroad
- Steps to take on the death of a Ukrainian citizen in Moldova
- Guardianship and custody: documents for children under guardianship

## Legal representation before Ukrainian authorities and courts

When an authority has refused you, the answer is rarely to apply again. It is to find out on what grounds, in writing.

- Drafting applications and correspondence to Ukrainian state authorities
- Attorney's requests for information in Ukraine
- Representation before the courts in matters arising from displacement from Ukraine to the Republic of Moldova as a result of the war, criminal and tax matters excluded

## Training for NGOs and humanitarian organisations

For teams advising Ukrainian citizens who need the underlying law explained once, properly.

- Training on Ukrainian legislation
- Development of information materials
- Advocacy services

## Who this is for

Ukrainian citizens living in the Republic of Moldova, whether you arrived in 2022 or last month, and whether you hold temporary protection, a residence permit or nothing yet. We also work with pensioners receiving payments from Ukraine, parents documenting children born in Moldova, and NGOs supporting displaced families.

## Why ExpertCont

- **Ukrainian and Russian spoken** — consultations, documents and correspondence in the language you actually use
- **Temporary protection support free of charge** — no fee for the status itself
- **Lawyers and accountants in one team** — pension, tax and residence questions rarely arrive one at a time
- **A dedicated account manager**, with a reply guaranteed in under 4 hours on working days
- **15+ years of combined experience** in Moldovan law, applied to cross-border Ukrainian cases

## Where to start

Tell us which document you need, or what was refused and when. We will tell you which authority decides it, what it costs and how long it takes — before you commit to anything. [Write to us](/en/contact); we reply in under 4 hours on working days.

Cases that turn out to be company matters rather than personal ones are handled by the same team through our [legal services](/en/services/legal).
````

- [ ] **Step 4: Write the Romanian placeholder body**

Create `apps/web/src/content/services/ukrainians.ro.mdx`:

```mdx
---
title: "Servicii consulare și juridice pentru cetățenii ucraineni"
locale: "ro"
contentId: "ukrainians"
---

Asistăm cetățenii ucraineni aflați în Republica Moldova în relația cu Ambasada și Consulatul Ucrainei, cu autoritățile ucrainene și cu instituțiile moldovenești: programări și documente consulare, pașapoarte și acte de identitate, pensii, protecție temporară, dreptul familiei și reprezentare juridică.

Echipa noastră vorbește ucraineană și rusă. Majoritatea procedurilor se rezolvă din Moldova, fără deplasare în Ucraina, iar asistența pentru **protecția temporară este gratuită**.

Catalogul complet al serviciilor este disponibil deocamdată în [versiunea în limba engleză](/en/services/ukrainian-consular-services). Pentru situația dumneavoastră concretă, [scrieți-ne](/contact) — răspundem în mai puțin de 4 ore în zilele lucrătoare.

{/* TODO: translate the full service catalogue from ukrainians.en.mdx */}
```

- [ ] **Step 5: Write the Russian placeholder body**

Create `apps/web/src/content/services/ukrainians.ru.mdx`:

```mdx
---
title: "Консульские и юридические услуги для граждан Украины"
locale: "ru"
contentId: "ukrainians"
---

Мы помогаем гражданам Украины, находящимся в Республике Молдова, во взаимодействии с Посольством и Консульством Украины, с украинскими государственными органами и с молдавскими учреждениями: запись и консульские документы, паспорта, пенсии, временная защита, семейное право и юридическое представительство.

Наша команда говорит по-украински и по-русски. Большинство процедур решается из Молдовы, без выезда в Украину, а помощь по **временной защите предоставляется бесплатно**.

Полный перечень услуг пока доступен в [английской версии](/en/services/ukrainian-consular-services). По вашему конкретному случаю [напишите нам](/ru/kontakty) — отвечаем менее чем за 4 часа в рабочие дни.

{/* TODO: translate the full service catalogue from ukrainians.en.mdx */}
```

- [ ] **Step 6: Add the placeholder hero image**

`[slug].astro` hardcodes `/service-${meta.id}.webp`, so the file must exist or the hero image 404s at runtime.

```bash
cp apps/web/public/service-legal.webp apps/web/public/service-ukrainians.webp
```

This is a placeholder. Leave a note in the commit body so it is not mistaken for final art.

- [ ] **Step 7: Build and confirm all three pages render**

Run: `pnpm build`

Expected: PASS. Then confirm the three detail pages exist:

```bash
ls apps/web/dist/servicii/servicii-consulare-ucraina/index.html \
   apps/web/dist/ru/uslugi/konsulskie-uslugi-ukraina/index.html \
   apps/web/dist/en/services/ukrainian-consular-services/index.html
```

Expected: all three listed, no "No such file" error.

- [ ] **Step 8: Confirm the hreflang alternates are wired**

Run:

```bash
grep -o 'hreflang="[a-z-]*" href="[^"]*"' apps/web/dist/en/services/ukrainian-consular-services/index.html
```

Expected: `ro`, `ru`, `en` and `x-default` alternates, each pointing at the matching localised slug.

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/content/config.ts \
        apps/web/src/content/services-meta/ukrainians.json \
        apps/web/src/content/services/ukrainians.en.mdx \
        apps/web/src/content/services/ukrainians.ro.mdx \
        apps/web/src/content/services/ukrainians.ru.mdx \
        apps/web/public/service-ukrainians.webp
git commit -m "feat(web): add Ukrainian consular & legal support service content

English catalogue in full; RO and RU bodies are placeholders pending
translation. Hero image is a placeholder copied from service-legal.webp
and needs replacing with real art."
```

---

### Task 3: Keep the service off the home page

The three home pages pass the whole `services-meta` collection to `HomeServices`. Without a filter, this B2C service appears between accounting and audit on the landing page.

**Files:**
- Modify: `apps/web/src/pages/index.astro:22-23`
- Modify: `apps/web/src/pages/ru/index.astro:22-23`
- Modify: `apps/web/src/pages/en/index.astro:22-23`

**Interfaces:**
- Consumes: the `hideFromHome` field added to the schema in Task 2.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Filter the collection in all three home pages**

Each of the three files contains this identical pair of lines:

```ts
const metaEntries = await getCollection("services-meta");
const services: ContentMeta[] = metaEntries.map((e) => e.data as ContentMeta);
```

Replace with:

```ts
const metaEntries = await getCollection("services-meta");
// The home grid stays B2B — services flagged hideFromHome live on the services index only.
const services: ContentMeta[] = metaEntries
  .filter((e) => !e.data.hideFromHome)
  .map((e) => e.data as ContentMeta);
```

Filter **before** the `as ContentMeta` cast: `ContentMeta` has no `hideFromHome` property, so filtering after the cast will not typecheck.

Do **not** change `apps/web/src/pages/servicii/index.astro`, `ru/uslugi/index.astro` or `en/services/index.astro` — those must keep showing every service.

- [ ] **Step 2: Build**

Run: `pnpm build`

Expected: PASS.

- [ ] **Step 3: Verify it is absent from home and present on the services index**

```bash
grep -c "ukrainian-consular-services" apps/web/dist/en/index.html
grep -c "ukrainian-consular-services" apps/web/dist/en/services/index.html
```

Expected: `0` for the home page, non-zero for the services index. Repeat for `ro` with `servicii-consulare-ucraina` against `apps/web/dist/index.html` and `apps/web/dist/servicii/index.html`.

- [ ] **Step 4: Verify the footer is unchanged**

```bash
grep -c "servicii-consulare-ucraina" apps/web/dist/preturi/index.html
```

Expected: `0`. The footer appears on every page and hardcodes six links; a non-zero count means something started deriving footer links from the collection.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/pages/index.astro apps/web/src/pages/ru/index.astro apps/web/src/pages/en/index.astro
git commit -m "feat(web): keep hideFromHome services off the home grid"
```

---

### Task 4: Icon, ordering and services-index card

`serviceIcon()` falls back to a generic briefcase and `serviceFeatures()` falls back to an empty list, so without this task the card renders with the wrong icon and no bullet points.

**Files:**
- Modify: `apps/web/src/lib/serviceIcons.ts:10-40` (`ICON_BY_KEY`) and `:52-59` (`SERVICE_ORDER`)
- Modify: `apps/web/src/components/service/ServiceIndexGrid.tsx:9-16` (`SERVICE_ID_TO_BOOKING_SLUG`) and the `serviceFeatures` data object

**Interfaces:**
- Consumes: the meta id `ukrainians` and its three slugs from Task 2.
- Produces: booking slug `"ucraina"`, which Task 6 must define as an option in the booking modal.

- [ ] **Step 1: Map the icon for the id and all three slugs**

In `apps/web/src/lib/serviceIcons.ts`, add to `ICON_BY_KEY`. `globe` is an existing icon in `packages/ui/src/Icon/Icon.tsx` and is not used by any other service.

```ts
  // Canonical IDs (matches services-meta JSON `id`).
  accounting: "calculator",
  legal: "scale",
  hr: "users",
  consulting: "lightbulb",
  audit: "audit",
  it: "monitor",
  ukrainians: "globe",

  // RO slugs.
  contabilitate: "calculator",
  juridic: "scale",
  "resurse-umane": "users",
  consultanta: "lightbulb",
  "servicii-it": "monitor",
  "servicii-consulare-ucraina": "globe",

  // RU slugs.
  bukhgalteriya: "calculator",
  "yuridicheskie-uslugi": "scale",
  kadry: "users",
  konsalting: "lightbulb",
  "it-uslugi": "monitor",
  "konsulskie-uslugi-ukraina": "globe",

  // EN slugs.
  "it-services": "monitor",
  "ukrainian-consular-services": "globe",
```

- [ ] **Step 2: Append it to the display order**

In the same file, add `ukrainians` last in `SERVICE_ORDER`, and extend the comment:

```ts
/**
 * Canonical display order for service grids (services index page, home grid).
 * Sorted by business priority: accounting first (anchor service), legal/hr/
 * consulting next (recurring B2B needs), then specialist work (audit, IT), and
 * finally the B2C Ukrainian consular service.
 */
export const SERVICE_ORDER: ReadonlyArray<string> = [
  "accounting",
  "legal",
  "hr",
  "consulting",
  "audit",
  "it",
  "ukrainians",
];
```

`servicePricingHint()` needs no change: its `default` branch already returns the localised "Custom pricing" string, which is correct for case-by-case work.

- [ ] **Step 3: Map the booking slug**

In `apps/web/src/components/service/ServiceIndexGrid.tsx`, add to `SERVICE_ID_TO_BOOKING_SLUG`:

```ts
const SERVICE_ID_TO_BOOKING_SLUG: Record<string, string> = {
  accounting: "contabilitate",
  audit: "audit",
  legal: "juridic",
  consulting: "consultanta",
  hr: "hr",
  it: "it",
  ukrainians: "ucraina",
};
```

- [ ] **Step 4: Add the card feature bullets**

In the same file, add a `ukrainians` key to the `data` object inside `serviceFeatures`, after the `it` entry:

```ts
    ukrainians: {
      ro: [
        "Echipă vorbitoare de ucraineană și rusă",
        "Programări la Ambasada Ucrainei",
        "Pașapoarte, pensii, acte de stare civilă",
        "Protecție temporară — asistență gratuită",
        "Reprezentare în instanțele din Ucraina",
      ],
      ru: [
        "Команда говорит по-украински и по-русски",
        "Запись в Посольство Украины",
        "Паспорта, пенсии, акты гражданского состояния",
        "Временная защита — помощь бесплатно",
        "Представительство в судах Украины",
      ],
      en: [
        "Ukrainian- and Russian-speaking team",
        "Ukrainian Embassy appointments",
        "Passports, pensions, civil status records",
        "Temporary protection — free of charge",
        "Representation before Ukrainian courts",
      ],
    },
```

- [ ] **Step 5: Typecheck and build**

Run: `pnpm typecheck && pnpm build`

Expected: both clean.

- [ ] **Step 6: Verify the card renders complete**

```bash
grep -o "Ukrainian Embassy appointments" apps/web/dist/en/services/index.html
grep -o "Custom pricing" apps/web/dist/en/services/index.html
```

Expected: both match. The first proves the bullets resolved; the second proves the pricing hint fell through to the custom-pricing branch.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/lib/serviceIcons.ts apps/web/src/components/service/ServiceIndexGrid.tsx
git commit -m "feat(web): icon, ordering and index-card copy for the Ukrainian service"
```

---

### Task 5: Detail-page sidebar and body sections

`[slug].astro` guards every block with `pageData &&`. Without an entry in `serviceData.ts` the page renders with no sidebar, no CTA, no "what's included", no process and no FAQ — it silently degrades rather than failing, so this must be verified in the built HTML.

**Files:**
- Modify: `apps/web/src/components/service/serviceData.ts:43` (the `ServiceId` union) and the `data` record (append after the `it` entry, which ends near line 1700)

**Interfaces:**
- Consumes: the meta id `ukrainians` from Task 2.
- Produces: a `ServicePageData` for all three locales. The shape is fixed by the existing `ServicePageData` interface at the top of the file — `includedHeading`, `includedItems[]`, `processHeading`, `processSteps[]`, `faqHeading`, `faqItems[]`, `pricing`, `offerEyebrow`, `offerHeading`, `offerSub`, `relatedHeading`, `bodyIntroHeading`, `bodyIntro`.

- [ ] **Step 1: Widen the local ServiceId union**

At `apps/web/src/components/service/serviceData.ts:43`:

```ts
type ServiceId = "accounting" | "audit" | "legal" | "consulting" | "hr" | "it" | "ukrainians";
```

Expected on saving: TypeScript now reports the `data` record is missing the `ukrainians` key. That error is the failing test for this task — confirm you see it before continuing.

- [ ] **Step 2: Confirm the type error**

Run: `pnpm typecheck`

Expected: FAIL with `Property 'ukrainians' is missing in type ...` for the `data` record in `serviceData.ts`.

- [ ] **Step 3: Add the entry**

Append to the `data` record, after the closing brace of the `it` entry and before the record's closing `};`:

```ts
  ukrainians: {
    ro: {
      includedHeading: "Ce este inclus",
      includedItems: [
        {
          icon: "calendar",
          title: "Programări la Ambasadă",
          text: "Înscriere în coada electronică prin BankID, Diia sau email, inclusiv acces pentru bărbați de 18–60 de ani.",
        },
        {
          icon: "file-text",
          title: "Pașapoarte și acte de identitate",
          text: "Buletin (ID-card), pașaport pentru străinătate, înlocuiri și certificatul de întoarcere în Ucraina.",
        },
        {
          icon: "globe",
          title: "Servicii digitale ucrainene",
          text: "Înregistrare în Diia și semnătura Diia, Rezerv+, cod fiscal RNOKPP și registrele de stat.",
        },
        {
          icon: "shield",
          title: "Pensii și plăți sociale",
          text: "Reluarea plăților din Ucraina, identificarea pensionarilor, recalculări și executarea hotărârilor.",
        },
        {
          icon: "users",
          title: "Dreptul familiei",
          text: "Divorț la distanță, pensie de întreținere, înregistrarea copilului, tutelă și succesiuni.",
        },
        {
          icon: "scale",
          title: "Statut în Moldova",
          text: "Protecție temporară — gratuit — permis de ședere și reprezentare în fața instanțelor.",
        },
      ],
      processHeading: "Cum lucrăm",
      processSteps: [
        {
          n: "01",
          t: "Evaluare gratuită a cazului",
          d: "Stabilim ce acte aveți, ce lipsește și care autoritate decide.",
        },
        {
          n: "02",
          t: "Pregătirea documentelor",
          d: "Colectăm, traducem, legalizăm și pregătim tot ce cere procedura.",
        },
        {
          n: "03",
          t: "Depunere și urmărire",
          d: "Facem programările, depunem cererile și urmărim dosarul la autorități.",
        },
        {
          n: "04",
          t: "Rezultat și predare",
          d: "Primiți documentul finalizat sau contestăm refuzul.",
        },
      ],
      faqHeading: "Întrebări frecvente",
      faqItems: [
        {
          q: "Sunt bărbat între 18 și 60 de ani. Pot fi deservit la Ambasadă?",
          a: "Da. Serviciile consulare rămân disponibile, însă accesul depinde de actualizarea datelor de evidență militară. Vă ajutăm cu Rezerv+, corectarea registrului și contestarea refuzurilor.",
        },
        {
          q: "Trebuie să merg în Ucraina pentru aceste proceduri?",
          a: "În majoritatea cazurilor, nu. Pașapoartele, pensiile, procurile, divorțul și pensia de întreținere se rezolvă din Moldova, prin Ambasadă, prin Diia sau prin instanțele ucrainene.",
        },
        {
          q: "Lucrați cu persoane care au doar certificat de naștere?",
          a: "Da. Documentarea persoanelor fără alte acte de identitate, inclusiv a copiilor sub tutelă și a cazurilor de apatridie, face parte din activitatea noastră.",
        },
      ],
      pricing: {
        priceLabel: "Tarif personalizat, per caz",
        features: [
          "Echipă vorbitoare de ucraineană și rusă",
          "Evaluare inițială gratuită",
          "Protecția temporară — asistență gratuită",
          "Proceduri rezolvate din Moldova",
          "Onorariu fix, agreat din start",
        ],
        ctaLabel: "Programează consultație",
        callLabel: `Sună-ne · ${SITE_PHONE}`,
        allPricingLabel: "Vezi toate prețurile",
      },
      offerEyebrow: "OFERTĂ PERSONALIZATĂ",
      offerHeading: "Evaluare gratuită a cazului",
      offerSub: "30 de minute · în rusă sau ucraineană · confidențial.",
      relatedHeading: "Servicii conexe",
      bodyIntroHeading: "Sprijin din Moldova, fără deplasare în Ucraina",
      bodyIntro:
        "Ajutăm cetățenii ucraineni din Republica Moldova cu proceduri consulare, acte de identitate, pensii, statut de ședere și reprezentare juridică — de la programarea la Ambasadă până la reprezentarea în instanțele din Ucraina.",
    },
    ru: {
      includedHeading: "Что входит",
      includedItems: [
        {
          icon: "calendar",
          title: "Запись в Посольство",
          text: "Электронная очередь через BankID, Дію или email, включая доступ для мужчин 18–60 лет.",
        },
        {
          icon: "file-text",
          title: "Паспорта и удостоверения",
          text: "Внутренний паспорт (ID-карта), загранпаспорт, замена и свидетельство о возвращении в Украину.",
        },
        {
          icon: "globe",
          title: "Цифровые сервисы Украины",
          text: "Регистрация в Дії и Дія-подпись, Резерв+, РНОКПП и государственные реестры.",
        },
        {
          icon: "shield",
          title: "Пенсии и социальные выплаты",
          text: "Возобновление выплат из Украины, идентификация пенсионеров, перерасчёт и исполнение решений.",
        },
        {
          icon: "users",
          title: "Семейное право",
          text: "Дистанционный развод, алименты, регистрация ребёнка, опека и наследство.",
        },
        {
          icon: "scale",
          title: "Статус в Молдове",
          text: "Временная защита — бесплатно — вид на жительство и представительство в судах.",
        },
      ],
      processHeading: "Как мы работаем",
      processSteps: [
        {
          n: "01",
          t: "Бесплатная оценка ситуации",
          d: "Определяем, какие документы есть, чего не хватает и какой орган принимает решение.",
        },
        {
          n: "02",
          t: "Подготовка документов",
          d: "Собираем, переводим, легализуем и готовим всё, что требует процедура.",
        },
        {
          n: "03",
          t: "Подача и сопровождение",
          d: "Записываем на приём, подаём заявления и отслеживаем дело в органах.",
        },
        {
          n: "04",
          t: "Результат и передача",
          d: "Вы получаете готовый документ, либо мы обжалуем отказ.",
        },
      ],
      faqHeading: "Частые вопросы",
      faqItems: [
        {
          q: "Я мужчина 18–60 лет. Обслужат ли меня в Посольстве?",
          a: "Да. Консульские услуги остаются доступными, но доступ зависит от актуальности военно-учётных данных. Помогаем с Резерв+, обновлением данных и разбором отказов.",
        },
        {
          q: "Нужно ли выезжать в Украину?",
          a: "В большинстве случаев нет. Паспорта, пенсии, доверенности, расторжение брака и алименты решаются из Молдовы — через Посольство, Дію или украинские суды.",
        },
        {
          q: "Работаете ли вы с людьми, у которых есть только свидетельство о рождении?",
          a: "Да. Документирование лиц без других удостоверяющих документов, включая детей под опекой и случаи безгражданства, входит в нашу работу.",
        },
      ],
      pricing: {
        priceLabel: "Индивидуальная цена за дело",
        features: [
          "Команда говорит по-украински и по-русски",
          "Бесплатная первичная оценка",
          "Временная защита — помощь бесплатно",
          "Процедуры решаются из Молдовы",
          "Фиксированный гонорар, согласованный заранее",
        ],
        ctaLabel: "Записаться на консультацию",
        callLabel: `Позвоните нам · ${SITE_PHONE}`,
        allPricingLabel: "Все цены",
      },
      offerEyebrow: "ИНДИВИДУАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      offerHeading: "Бесплатная оценка ситуации",
      offerSub: "30 минут · на русском или украинском · конфиденциально.",
      relatedHeading: "Смежные услуги",
      bodyIntroHeading: "Поддержка из Молдовы, без выезда в Украину",
      bodyIntro:
        "Помогаем гражданам Украины в Республике Молдова с консульскими процедурами, документами, пенсиями, статусом пребывания и юридическим представительством — от записи в Посольство до защиты интересов в украинских судах.",
    },
    en: {
      includedHeading: "What's included",
      includedItems: [
        {
          icon: "calendar",
          title: "Embassy appointments",
          text: "Booking the consular electronic queue by BankID, Diia or email, including access for men aged 18 to 60.",
        },
        {
          icon: "file-text",
          title: "Passports & ID documents",
          text: "Internal ID card, passport for travel abroad, replacements, and the Certificate of Return to Ukraine.",
        },
        {
          icon: "globe",
          title: "Ukrainian digital services",
          text: "Diia registration and Diia.Signature, Reserve+, the RNOKPP tax number, and the State Registers.",
        },
        {
          icon: "shield",
          title: "Pensions & social payments",
          text: "Restoring Ukrainian pension payments, pensioner identification, recalculation and enforcement.",
        },
        {
          icon: "users",
          title: "Family law & civil status",
          text: "Remote divorce, maintenance, birth registration, guardianship and succession.",
        },
        {
          icon: "scale",
          title: "Status in Moldova",
          text: "Temporary protection — free of charge — residence permits, and representation before the courts.",
        },
      ],
      processHeading: "How we work",
      processSteps: [
        {
          n: "01",
          t: "Free case assessment",
          d: "We establish what documents you hold, what is missing, and which authority decides.",
        },
        {
          n: "02",
          t: "Document preparation",
          d: "We collect, translate, legalise and prepare everything the procedure requires.",
        },
        {
          n: "03",
          t: "Filing & follow-up",
          d: "We book the appointments, submit the applications and track them with the authorities.",
        },
        {
          n: "04",
          t: "Outcome & handover",
          d: "You receive the finished document, or we appeal the refusal.",
        },
      ],
      faqHeading: "Frequently asked questions",
      faqItems: [
        {
          q: "I am a man aged 18 to 60. Can I still be served at the Embassy?",
          a: "Yes. Consular services remain available, but access depends on your military registration data being up to date. We help with Reserve+, correcting the register and challenging refusals.",
        },
        {
          q: "Do I have to travel to Ukraine for any of this?",
          a: "In most cases no. Passports, pensions, powers of attorney, divorce and maintenance proceedings can all be handled from Moldova through the Embassy, through Diia, or through the Ukrainian courts.",
        },
        {
          q: "Do you work with people who hold only a birth certificate?",
          a: "Yes. Documenting persons with no other identity papers, including children under guardianship and statelessness cases, is part of what we do.",
        },
      ],
      pricing: {
        priceLabel: "Custom pricing per case",
        features: [
          "Ukrainian- and Russian-speaking team",
          "Free initial assessment",
          "Temporary protection support is free",
          "Procedures handled from Moldova",
          "Fixed fee agreed upfront",
        ],
        ctaLabel: "Schedule consultation",
        callLabel: `Call us · ${SITE_PHONE}`,
        allPricingLabel: "View all pricing",
      },
      offerEyebrow: "PERSONALISED OFFER",
      offerHeading: "Free case assessment",
      offerSub: "30 minutes · in Russian or Ukrainian · confidential.",
      relatedHeading: "Related services",
      bodyIntroHeading: "Support from Moldova, without travelling to Ukraine",
      bodyIntro:
        "We help Ukrainian citizens in the Republic of Moldova with consular procedures, identity documents, pensions, residence status and legal representation — from booking an Embassy appointment to representation before the Ukrainian courts.",
    },
  },
```

- [ ] **Step 4: Typecheck and build**

Run: `pnpm typecheck && pnpm build`

Expected: both clean.

- [ ] **Step 5: Verify the sidebar and body blocks actually rendered**

```bash
grep -c "Free case assessment" apps/web/dist/en/services/ukrainian-consular-services/index.html
grep -c "Custom pricing per case" apps/web/dist/en/services/ukrainian-consular-services/index.html
```

Expected: both non-zero. A zero here means `pageData` resolved to `undefined` and the page silently dropped its sidebar.

Repeat for Romanian and Russian:

```bash
grep -c "Evaluare gratuită a cazului" apps/web/dist/servicii/servicii-consulare-ucraina/index.html
grep -c "Бесплатная оценка ситуации" apps/web/dist/ru/uslugi/konsulskie-uslugi-ukraina/index.html
```

Expected: both non-zero.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/components/service/serviceData.ts
git commit -m "feat(web): detail-page sidebar, process and FAQ for the Ukrainian service"
```

---

### Task 6: Booking modal option

The services-index card's Schedule button opens the booking modal pre-selecting the slug from Task 4. Without a matching option the modal opens with nothing selected. This adds one Lingui message, so the catalogues must be regenerated.

**Files:**
- Modify: `apps/web/src/components/modals/booking/strings.ts:23-36` (the `services` array)
- Modify: `packages/i18n/src/locales/ru/messages.po` (generated, then translated)
- Modify: `packages/i18n/src/locales/en/messages.po` (generated, then translated)
- Modify: `packages/i18n/src/locales/ro/messages.po` (generated; source locale, no translation needed)

**Interfaces:**
- Consumes: the booking slug `"ucraina"` defined in Task 4's `SERVICE_ID_TO_BOOKING_SLUG`.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add the option**

In `apps/web/src/components/modals/booking/strings.ts`, append to the `services` array. The `slug` must be exactly `"ucraina"` to match Task 4. The comment is for translators — the existing entries use the same pattern.

```ts
    services: [
      { slug: "contabilitate", name: t`Contabilitate`, icon: "calculator" },
      { slug: "audit", name: t`Audit`, icon: "audit" },
      {
        slug: "juridic",
        name: t({
          message: `Juridic`,
          comment: "Service category. Romanian adjective used as a noun = 'Legal services'.",
        }),
        icon: "scale",
      },
      { slug: "consultanta", name: t`Consultanță`, icon: "lightbulb" },
      { slug: "hr", name: t`HR`, icon: "users" },
      { slug: "it", name: t`IT & Soft`, icon: "monitor" },
      {
        slug: "ucraina",
        name: t({
          message: `Ucraina`,
          comment:
            "Booking modal — service category: consular and legal support for Ukrainian citizens. Country name used as a short category label.",
        }),
        icon: "globe",
      },
    ],
```

- [ ] **Step 2: Extract the new message**

Run: `pnpm extract`

Expected: `packages/i18n/src/locales/{ro,ru,en}/messages.po` each gain one new entry whose `msgid` is `Ucraina`.

- [ ] **Step 3: Translate it**

In `packages/i18n/src/locales/ru/messages.po`, set the new entry's translation:

```po
msgid "Ucraina"
msgstr "Украина"
```

In `packages/i18n/src/locales/en/messages.po`:

```po
msgid "Ucraina"
msgstr "Ukraine"
```

`ro` is the source locale — leave its `msgstr` as `pnpm extract` produced it.

- [ ] **Step 4: Compile and verify catalogues are in sync**

Run: `pnpm compile && pnpm extract:check`

Expected: both clean. `extract:check` failing means the extracted catalogue no longer matches source — re-run `pnpm extract` and inspect the diff.

- [ ] **Step 5: Build**

Run: `pnpm build`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/components/modals/booking/strings.ts packages/i18n/src/locales
git commit -m "feat(web): add Ukraine option to the booking modal"
```

---

### Task 7: Full verification gate

**Files:** none modified. This task is the pre-PR gate from `CLAUDE.md` plus the manual checks that only a rendered page can confirm.

**Interfaces:**
- Consumes: everything from Tasks 1–6.
- Produces: a verified branch ready for review.

- [ ] **Step 1: Run the full pre-PR gate**

Run: `pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check`

Expected: all four clean. If `lint` reports formatting, run `pnpm format` and re-run.

- [ ] **Step 2: Clean build**

```bash
rm -rf apps/web/dist
pnpm build
```

Expected: PASS.

- [ ] **Step 3: Confirm the sitemap includes all three URLs**

```bash
grep -o "servicii-consulare-ucraina\|konsulskie-uslugi-ukraina\|ukrainian-consular-services" apps/web/dist/sitemap.xml | sort -u
```

Expected: all three slugs listed.

- [ ] **Step 4: Confirm the Service JSON-LD is present**

```bash
grep -o '"@type":"Service"' apps/web/dist/en/services/ukrainian-consular-services/index.html | head -1
```

Expected: one match. Absent means `serviceJsonLd` did not receive the meta.

- [ ] **Step 5: Confirm the free-of-charge notice is visible**

```bash
grep -c "provided free of charge" apps/web/dist/en/services/ukrainian-consular-services/index.html
grep -c "Temporary protection support is free" apps/web/dist/en/services/ukrainian-consular-services/index.html
```

Expected: both non-zero — once in the catalogue bullet, once in the sidebar. If the
second is zero, the sidebar did not render and Task 5 regressed.

- [ ] **Step 6: Confirm the placeholder image resolves**

```bash
grep -o "/service-ukrainians.webp" apps/web/dist/en/services/ukrainian-consular-services/index.html
ls -l apps/web/dist/service-ukrainians.webp
```

Expected: the reference is in the HTML and the file exists in `dist`.

- [ ] **Step 7: Visual check in the browser**

Run: `pnpm dev`

Open and confirm:
- `http://localhost:4321/servicii` — seventh card present, globe icon, four Romanian bullets, "Tarif personalizat".
- `http://localhost:4321/en/services/ukrainian-consular-services` — all ten catalogue sections render, sidebar shows pricing and CTA, related-services list is populated.
- `http://localhost:4321/` — home grid still shows six services, not seven.
- Click **Schedule** on the new card and confirm the booking modal opens with the Ukraine option selected.

- [ ] **Step 8: Commit any formatting fixes**

```bash
git status --short
```

If `pnpm format` changed files, commit them:

```bash
git add -A
git commit -m "chore: formatting"
```

Otherwise the tree is clean and the branch is ready for review.

---

## Copy and SEO notes

**Target queries the English page is written for.** Each maps to a `##` heading, which is why the headings are phrased as problems rather than as categories:

| Query cluster | Heading that targets it |
| --- | --- |
| ukrainian embassy moldova appointment · ukrainian consulate chisinau queue | Ukrainian Embassy and Consulate in Moldova: appointments, passports, certificates |
| ukrainian passport abroad · certificate of return to ukraine · white passport | same section, carried by the bullets |
| diia registration abroad · reserve+ from abroad · rnokpp tax number | Diia, Reserve+ and Ukrainian state e-services from abroad |
| ukrainian pension abroad · pension fund of ukraine identification | Ukrainian pensions paid abroad |
| temporary protection moldova · residence permit moldova ukrainian | Temporary protection and residence permits in Moldova |
| divorce in ukraine from abroad · child maintenance ukraine abroad | Divorce, child maintenance and family matters in Ukrainian courts |
| ukrainian archives documents · moldovan citizenship documents | Birth certificates, residence registration and documents from Ukrainian archives |

**The English page will not carry this service commercially.** The people searching these queries type them in Russian and Ukrainian — «запис в посольство України», «пенсія з України за кордоном», «временная защита Молдова». English captures NGO staff, journalists and international caseworkers, which is worth having but is not the demand. The Russian body is the SEO asset on this page, and it is currently a placeholder. Treat the RU translation as the revenue-bearing task, not as cleanup.

**Style rules applied, for whoever writes the RO and RU versions:**

- Open on the reader's situation, not on the company. The first line is a passport expiring and a queue with no slots, because that is what the visitor arrived worried about.
- One or two sentences of prose before every bullet list. Pure bullet lists read as machine-generated and give search engines no context.
- Second person throughout. "You do not have to return to Ukraine", not "clients are not required to travel".
- Vary the bullet rhythm. The original source list had every item as an identical-length noun phrase; that uniformity is itself a tell.
- State limits plainly — "we tell you at the first consultation, not after you have paid" — and say what is excluded (criminal and tax matters).
- No exclamation marks, no "streamline", "comprehensive", "seamless", "innovative".

**Verified defect, out of scope for this plan.** `ServiceDetailBody` renders the FAQ through `Accordion` (`packages/ui/src/Accordion/Accordion.tsx`), which mounts the answer only when open (`{isOpen && ...}`, initial state `null`). FAQ answers are therefore absent from the server-rendered HTML on **every** service detail page, invisible to crawlers and to AI answer engines, and ineligible for FAQ rich results. `FaqAccordion` in the same package already solves this with native `<details>`, which keeps answers in the DOM. Switching `ServiceDetailBody` to it would recover the FAQ content across all seven services. Raise separately — it is a pre-existing bug, not something this service introduced.

## Outstanding after this plan

Both are deliberate, recorded in the spec, and need the client:

1. **Hero image** — `apps/web/public/service-ukrainians.webp` is a copy of `service-legal.webp`. Replace with real art.
2. **RO and RU catalogue bodies** — currently short placeholder pages with a `{/* TODO */}` marker pointing at `ukrainians.en.mdx`. The Russian version matters most: the source material was Russian and the audience reads Russian.
3. **Temporary-protection explainer link** — the client asked for a link from the free temporary-protection bullet to a page explaining it. No such page exists on this site (`src/content` has nothing on the subject), so the link target is unresolved. Two routes, client's call: point at an official external source (Bureau for Migration and Asylum / the government's Ukrainian-refugee portal), or write an internal guide in the `guides` collection and link that. Nothing in this plan is blocked by it — the bullet ships marked as free, and the link is a one-line edit when the target is decided.
