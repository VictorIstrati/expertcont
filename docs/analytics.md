# Analytics

How the site reports events to GTM, GA4, and Microsoft Clarity, and how Consent Mode v2 gates everything.

## Architecture at a glance

```
React component → track("event_name", {...})
                       │
                       ▼
              window.dataLayer.push({event, ...})
                       │
                       ▼
                     GTM
              ┌────────┴────────┐
              ▼                 ▼
            GA4              Clarity
       (consent-gated)   (consent-gated)
```

- **Single GTM container** loads everything. Adding a new analytics tool = adding a tag in GTM, **not** code.
- **Consent Mode v2** is initialized inline in `Base.astro` *before* GTM loads. Default state: all marketing storage **denied**. The cookie banner upgrades to **granted** on Accept.
- **`track()`** in `apps/web/src/lib/analytics.ts` is the only sanctioned way to fire events. It's typed — adding properties that aren't in the schema is a compile error.

## Event schema

| Event | Properties | Fired when |
|---|---|---|
| `form_submitted` | `form_type`, `locale`, `tier_name?` | Any form successfully submitted (DB row created) |
| `cta_clicked` | `cta_text`, `cta_location`, `locale` | High-intent CTA clicks (nav book, pricing tier) |
| `calculator_completed` | `total_mdl`, `services_count`, `locale` | User clicks "Vreau oferta" from PriceCalculator |
| `phone_link_clicked` | `location` | Any `tel:` link click (delegated listener in `Base.astro`) |
| `locale_switched` | `from`, `to` | LocaleSwitcher click that changes locale |

### `form_type` values

`contact` · `quote` · `booking` · `tier_booking` · `review` · `faq_question` · `newsletter`

When `form_type = tier_booking`, `tier_name` is included (e.g. `"Start"`, `"Pro"`, `"Enterprise"`).

## Adding a new event

1. Add the event name + property shape to `EventMap` in `apps/web/src/lib/analytics.ts`.
2. Call `track("your_event", { ... })` from the component at the moment it should fire.
3. In GTM, create a **Custom Event trigger** with the exact name, plus a GA4 Event tag that forwards it with the property mapping.

The TypeScript compiler enforces that property names and types match the schema — there's no string-typed escape hatch.

## Consent Mode v2

The inline bootstrap in `Base.astro` initializes:

```js
gtag("consent", "default", { ...all denied });  // before GTM loads
```

On hydration, `CookieBanner.tsx` reads `localStorage["expertcont-cookie-consent"]`:

| Stored value | Banner shown? | Consent state |
|---|---|---|
| `null` (first visit) | Yes | Denied (default) |
| `"accepted"` | No | Granted (upgraded inline before React) |
| `"rejected"` | No | Denied |

When the user clicks **Accept all** → `updateConsent("accepted")` → `gtag("consent", "update", { ...all granted })`. Cookie banner state and Consent Mode are kept in sync via the same `STORAGE_KEY`.

**Tag firing rule in GTM:** every analytics/marketing tag must have **Advanced Settings → Consent Settings → Require additional consent → `analytics_storage`** (and for ad tags also `ad_storage`, `ad_user_data`, `ad_personalization`). Without this, tags fire regardless of consent and we break GDPR compliance.

## Environment variables

All three are `PUBLIC_` so they reach the browser at build time. Set in Doppler `prd`:

| Var | Purpose | Where to get it |
|---|---|---|
| `PUBLIC_GTM_ID` | The only ID in code | tagmanager.google.com → container → settings |
| `PUBLIC_GSC_VERIFY` | Google Search Console verification | GSC → Add property → HTML tag method |
| `PUBLIC_BING_VERIFY` | Bing Webmaster verification | Bing WMT → Add site → HTML Meta Tag method |

If a var is missing, the corresponding block in `Base.astro` simply omits — the site keeps working without analytics. **Never** hardcode any ID in source.

GA4 measurement ID and Clarity project ID are configured **inside GTM**, not in code. That way they can be rotated without a deploy.

## Debugging

### Local

```bash
pnpm dev
```

Without `PUBLIC_GTM_ID` in your local `.env`/Doppler `dev`, no tags load — that's expected. Set it temporarily to a test container if you need to validate event-firing logic.

Open DevTools → Console:
```js
window.dataLayer
```
You'll see every event that's been pushed since page load. Confirm the shape matches the schema.

### GTM Preview Mode

1. tagmanager.google.com → your container → **Preview**.
2. Enter `https://expertcont.md` (or staging URL).
3. Interact with the site. The Preview pane shows every dataLayer event and which tags fired.
4. Verify tags **do not fire** before clicking Accept on the banner. If they do, the tag's consent settings are missing.

### GA4 DebugView

In GA4 → **Admin → DebugView**, you'll see events in real-time as they arrive. Useful for sanity-checking property values.

To enable DebugView for your own browser, install the **Google Analytics Debugger** Chrome extension or append `?_dbg=1` to the URL when GTM's GA4 Configuration tag is set to pass debug mode.

## Privacy & compliance

- **Pre-consent**: only the GTM script itself loads (it has no consent requirement of its own — it's the loader). All downstream tags wait for consent.
- **No PII in event properties**. Form submissions track the *fact* of submission and the *form type* — never name/email/phone.
- **Server-side**: notification payloads in `supabase/functions/_shared/notify.ts` contain PII for Telegram alerts. That's a separate channel; the GA4/Clarity pipeline never sees it.

## Off-site checklist

These don't touch the codebase but matter for measurement coverage:

- [ ] Google Search Console — submit `https://expertcont.md/sitemap-index.xml`
- [ ] Bing Webmaster Tools — submit same sitemap
- [ ] GA4 → Admin → **Conversions** — mark `form_submitted` as a conversion
- [ ] Microsoft Clarity → verify session recordings appearing within ~5 minutes of first consented visit
- [ ] Google Business Profile — claim, fill in hours/address/photos, request first reviews

## Files of interest

- `apps/web/src/lib/analytics.ts` — typed event/consent API
- `apps/web/src/layouts/Base.astro` — Consent Mode bootstrap, GTM snippets, verification meta tags, global `tel:` listener
- `apps/web/src/components/CookieBanner.tsx` — banner UX + consent updates
