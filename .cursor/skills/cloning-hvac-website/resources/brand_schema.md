# Brand Schema — Every Swap Point in the Template

This file lists every piece of content that varies per company, so a clone run never misses one.

## Centralized constants

All of these live at the top of `src/components/layout/LandingParts.tsx` and must be updated first.

| Constant | Type | Example | Notes |
|---|---|---|---|
| `BRAND_NAME` | string | `"72 Degrees"` | Short display name. Used in copy chrome. |
| `BRAND_FULL_NAME` | string | `"72 Degrees Cooper Brothers"` | Used in aria labels, alt text, page title. |
| `BRAND_LEGAL_NAME` | string | `"Cooper Brothers, Inc."` | Used in footer copyright only. |
| `BRAND_TAGLINE` | string | `"When the temperature has to be just right."` | Also mirrored in the `<h1>` hero headline — update both. |
| `BRAND_LOGO_DARK` | path | `"/brand/logo.png"` | Filename stays the same; file contents change. |
| `BRAND_LOGO_LIGHT` | path | `"/brand/logo-white.png"` | Filename stays; must be a *truly* transparent icon/mark. |
| `BRAND_LICENSE` | string | `"License #874695"` | Include the `License #` prefix. |
| `BRAND_EMAIL` | string | `"info@72degreescb.com"` | |
| `BRAND_ADDRESS` | string | `"6866 Santa Teresa Blvd, San Jose, CA 95119"` | Used in footer + contact block. |
| `PHONE_LABEL` | string | `"(408) 628-1695"` | Human-readable format. |
| `PHONE_TEL` | string | `"tel:14086281695"` | Must start with `tel:1` and match `PHONE_LABEL` digits. |
| `GOOGLE_RATING` | string | `"4.9"` | One decimal. |
| `GOOGLE_REVIEWS` | string | `"314"` | Integer as a string. |

## Per-component edits

Beyond the constants, these components still carry brand-specific copy that `rg` will not catch through constants alone.

### `src/components/layout/LandingParts.tsx`

- `Hero()` — the `<h1>` is hand-split across two lines with the italic fragment at the end. Update both lines when the tagline changes.
- `Testimonials()` — replace the entire `testimonials` array (4 entries). Each needs `quote`, `author`, `role` (format as `"Google Review · 5★"`).
- Side rail text: `"Serving Santa Clara County"` — replace with the new service region.

### `src/components/sections/ServiceParts.tsx`

- `BeforeAfter` component `alt` text and `status` chips (`"20-YR-OLD UNIT · 58% EFFICIENCY"` etc. — these are stylistic, fine to keep, but verify they still read as plausible for the new brand).
- Section blurb mentions cities (`"San Jose, Morgan Hill, and Gilroy"`) — replace with target's top 3 coverage cities.
- Any region-colored callouts (e.g., `"Santa Clara County"`).

### `src/components/sections/FooterParts.tsx`

- `SERVICE AREA` column list — 6 entries, grouped as 1 primary city + 5 neighborhood pairs.
- `SERVICES` column — keep service names identical across clones unless the target offers something unusual (geothermal, boilers, etc.).
- Address, phone, hours line, copyright year + legal name.
- Social links — replace hrefs with the target's Facebook / Instagram / LinkedIn. If any don't exist, remove that icon rather than leaving a broken link.

## Asset manifest

All under `public/brand/`. Filenames must not change.

| File | Purpose | Recommended specs |
|---|---|---|
| `logo.png` | Full-color wordmark, used in header on light backgrounds. | PNG with transparency, ≥200px wide, ≤50px tall aspect. |
| `logo-white.png` | Icon/mark, used in footer on black. **Must have true alpha transparency.** | PNG RGBA, ≥300×300, no solid background. |
| `hero.jpg` | Hero background. | JPEG, ≥3000px wide after upscaling, subject at ~1/3 right. |
| `service-before.jpg` | "BEFORE" state in transformations grid. | JPEG, ≥1200×800, shows aging/degraded equipment. |
| `install-after.jpg` | "AFTER" state in transformations grid. | JPEG, ≥1200×800, shows clean new install. |

## Dummy-data policy

If the target site doesn't publish a field, use these defaults and flag in the final report:

| Field | Dummy value |
|---|---|
| License # | `"License #000000"` |
| Email | `info@<sanitized-brand>.com` |
| Address | `"123 Main St, <Primary City>, <State> <zip>"` |
| Phone | Use target's published number if available; otherwise `"(555) 000-0000"` → `"tel:15550000000"`. |
| Google rating / reviews | Omit the trust eyebrow entirely rather than faking; if required for layout, use `"4.8"` / `"50"`. |
