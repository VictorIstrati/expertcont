# Ukrainian consular & legal support — new service page

Date: 2026-08-16
Status: approved, ready for implementation planning

## Goal

Add a seventh service to the site: legal and administrative support for Ukrainian
citizens displaced to Moldova. It appears as a card on the services index
(`/servicii`, `/ru/uslugi`, `/en/services`) and opens a detail page listing the
full catalogue of services offered, grouped by category.

This service differs in kind from the existing six. Those are B2B (accounting,
legal, HR, consulting, audit, IT) and sell to companies. This one is B2C, sells to
individuals, and its catalogue is roughly 45 items across 10 categories.

## Decisions

| Question | Decision |
| --- | --- |
| Authoring language | English only in this pass. RO and RU bodies are placeholders to be filled later. |
| Where it appears | Services index pages only. Not on the home grid, not in the footer. |
| Detail page layout | Plain MDX sections — one `##` per category with a bullet list. No new components. |
| Canonical id | `ukrainians` |
| Slugs | ro `servicii-consulare-ucraina` · ru `konsulskie-uslugi-ukraina` · en `ukrainian-consular-services` |
| Hero image | Placeholder copied from an existing service photo; flagged for replacement. |

Noted for the record and accepted by the client: the source material is Russian and
the audience reads Russian, so the RU page is the one most likely to convert.
English-first was an explicit choice; the RU body is a follow-up pass.

## File inventory

### New files

- `apps/web/src/content/services-meta/ukrainians.json`
- `apps/web/src/content/services/ukrainians.en.mdx` — the full catalogue
- `apps/web/src/content/services/ukrainians.ro.mdx` — placeholder body
- `apps/web/src/content/services/ukrainians.ru.mdx` — placeholder body
- `apps/web/public/service-ukrainians.webp` — placeholder image

### Modified files

- `apps/web/src/content/config.ts` — add `hideFromHome: z.boolean().optional()` to the
  `servicesMeta` schema.
- `apps/web/src/pages/index.astro`, `ru/index.astro`, `en/index.astro` — filter
  `hideFromHome` entries out of the collection before passing to `HomeServices`.
- `apps/web/src/lib/serviceIcons.ts` — map the id and all three slugs to the `globe`
  icon; append `ukrainians` to `SERVICE_ORDER`. `servicePricingHint` needs no change:
  the `default` branch already returns "Custom pricing", which is correct for
  case-by-case work.
- `apps/web/src/components/service/serviceData.ts` — add `ukrainians` to the local
  `ServiceId` union and a full entry for all three locales. Without it `pageData` is
  undefined and the detail page renders with no sidebar and no included/process/FAQ
  blocks.
- `apps/web/src/components/service/ServiceIndexGrid.tsx` — add four feature bullets in
  all three locales to `serviceFeatures`, and a `SERVICE_ID_TO_BOOKING_SLUG` entry.
- `apps/web/src/components/modals/booking/strings.ts` — add a seventh service option so
  the card's Schedule button resolves. Introduces one new Lingui message, so
  `pnpm extract` and `pnpm compile` must run and the RU/EN catalogues need the
  translation filled in.
- `packages/i18n/src/serviceSlugs.ts` — add `ukrainians` to `ServiceId`, `SERVICE_IDS`
  and `serviceSlugs`, per the "update both this map and the meta JSON" comment already
  in that file. The Footer's hardcoded six links stay as they are.

### Deliberately unchanged

`packages/ui/src/Footer/Footer.tsx` — hardcodes six service links, which is exactly the
behaviour we want for a services-index-only service.

## Metadata copy

Short strings are written in all three languages regardless of the English-only body
decision, because a Romanian card showing English text on `/servicii` would read as
broken.

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
    "ro": "Asistență pentru cetățenii ucraineni aflați în Moldova: programări și documente la Ambasada Ucrainei, pașapoarte, pensii, protecție temporară, dreptul familiei și reprezentare juridică.",
    "ru": "Поддержка граждан Украины в Молдове: запись и документы в Посольстве Украины, паспорта, пенсии, временная защита, семейное право и юридическое представительство.",
    "en": "Support for Ukrainian citizens in Moldova: embassy appointments and documents, passports, pensions, temporary protection, family law and legal representation."
  },
  "hideFromHome": true,
  "updated": "2026-08-16"
}
```

## Detail page content (English)

Written into `ukrainians.en.mdx` under the standard frontmatter
(`title`, `locale: "en"`, `contentId: "ukrainians"`).

Terminology follows established legal register rather than literal glosses. Proper
names stay recognisable to the reader: Diia, Reserve+, BankID, the state enterprise
"Dokument", the Pension Fund of Ukraine.

### Consular services at Ukrainian embassies and consulates abroad

- Booking a slot in the electronic queue of the Ukrainian Embassy or Consulate abroad
  by every available method — BankID, the Diia app, or email
- Assistance with consular access for men aged 18 to 60: Reserve+, updating military
  registration records, and challenging refusals
- Passport documents through the Embassy or Consulate and through the Passport Service
  of the state enterprise "Dokument" abroad: first-time issue of the internal passport
  (ID card) and of the passport for travel abroad, replacement of an expired or lost
  document, collection of the finished document, and delivery of a passport produced in
  Ukraine to the Embassy or Consulate abroad
- Issue of the Certificate of Return to Ukraine (the so-called "white passport"),
  including for children under guardianship and for persons with no registered place of
  residence
- Verification of Ukrainian citizenship, including for children, and establishment of
  citizenship by birth
- Powers of attorney and notarial acts performed at the Ukrainian Embassy or Consulate
- Other documents issued through the Embassy or Consulate: criminal record certificates
  and civil status records — registration of a child born abroad, and marriage, death
  and birth certificates

### Ukrainian digital services

- The Diia app and portal: registration, including by biometric passport, digital
  documents, and creation of a Diia.Signature qualified electronic signature
- Support with the Reserve+ military registration service
- Individual taxpayer number (RNOKPP): entering the tax number into the Unified State
  Demographic Register so that the biometric passport can be used in full
- Entering property rights into the State Registers of Ukraine
- Applications for compensation for property in Ukraine damaged or destroyed as a
  result of the war

### Pension matters

- Restoration and resumption of pension payments from Ukraine
- Identification of pensioners: video identification, through Diia, or through the web
  portal of the Pension Fund of Ukraine
- Declaration of non-receipt of a pension in another state
- Award of a pension, recalculation — including enforcement of court judgments — and
  change of the payment method
- Social assistance for persons without a sufficient insurance record, and award of a
  pension based on insurance record with voluntary payment of additional contributions
- Digitisation of the employment record book

### Banking access

- Restoring access to Ukrainian banking services
- Remote opening of Ukrainian bank cards — also as a means of authenticating into
  Ukrainian e-services and into the consular electronic queue

### Civil status records and documentation

- Birth certificates: replacement under the new rules, and entry into Diia
- Registration and de-registration of place of residence in Ukraine, and residence
  certificates
- Documenting persons who hold only a birth certificate, and statelessness cases
- Obtaining certificates, extracts and archival records from Ukrainian archives in
  support of applications for Moldovan or Romanian citizenship

### Status and residence in Moldova

- Temporary protection: registration, booking the interview, extension, advice on
  beneficiaries' rights, and renunciation of Moldovan temporary protection from a third
  country
- Residence permits in the Republic of Moldova: applications and extensions
- Related matters: tax deductions for foreign nationals, roadworthiness testing and the
  lawful stay of Ukrainian-registered vehicles, and acquisition of Moldovan citizenship

### Border crossing and customs

- Travel into and out of the country with minors, and powers of attorney authorising an
  accompanying adult
- Customs regime on entry into Ukraine and into the Republic of Moldova
- Visa processing — Ukrainian visas for foreign nationals
- Residence permits in Ukraine

### Family law and civil status

- Dissolution of marriage through the Ukrainian courts in absentia, without travelling
  to Ukraine
- Maintenance (child support): recovery proceedings in Ukraine conducted from abroad
- Certificate of no impediment to marriage, for marrying in Moldova
- Change of surname after marriage or divorce: the full document-replacement cycle,
  including transliteration of the name across Ukrainian and Moldovan passports
- Registration of a child born in Moldova: legalisation of the Moldovan birth record so
  that it is recognised by the Embassy of Ukraine
- Succession and inheritance procedures for Ukrainian citizens abroad
- Steps to take on the death of a Ukrainian citizen in Moldova
- Guardianship and custody: documents for children under guardianship

### Representation and case support

- Drafting applications and correspondence to Ukrainian state authorities
- Attorney's requests for information in Ukraine
- Representation before the courts in matters arising from displacement from Ukraine to
  the Republic of Moldova as a result of the war, criminal and tax matters excluded

### Training and information sessions

For civil society organisations and the humanitarian sector.

- Training on Ukrainian legislation
- Development of information materials
- Advocacy services

## Placeholder bodies (RO, RU)

Each is a short real paragraph in its own language plus a link to the contact page, so
the pages are coherent rather than empty, followed by an MDX comment marking the gap:

```
{/* TODO: translate the full service catalogue from ukrainians.en.mdx */}
```

They must not contain English body text.

## SEO

Everything derives from the collection and needs no additional work: hreflang
alternates and canonical from `Base.astro`, `Service` and `BreadcrumbList` JSON-LD from
`[slug].astro`, the sitemap from `lib/sitemapData.ts`, and the `OfferCatalog` on the
home and services pages.

## Known cosmetic issue

The services index grid is `grid-cols-3`. A seventh card sits alone on a third row.
Accepted for now; rebalancing the grid is out of scope.

## Verification

```
pnpm typecheck && pnpm lint && pnpm test && pnpm extract:check
pnpm build
```

The build is the meaningful check: it validates the content schema, resolves every
`getStaticPaths` entry, and renders the detail page in all three locales. A missing
locale MDX file fails the build at the `mdxEntry!` non-null assertion in
`[slug].astro`.
