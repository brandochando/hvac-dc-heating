---
name: cloning-hvac-website
description: Creates a new per-company HVAC repository from the shared GitHub template repo, then rebrands it by scraping the target company's public website, swapping logos/hero/before-after assets, fixing logo transparency, and visually verifying output. Use when the user asks to clone the HVAC template into a new repo, create a new company site from template, rebrand a fresh clone, or says "turn this website into [company]".
---

# Cloning the HVAC Template for a New Brand

## When to use this skill
- User provides a competitor/target HVAC company URL and asks to clone this template for them.
- User asks to create a new repo from the HVAC template for another company.
- User asks to rebrand, reskin, or whitelabel the base template.
- User mentions cloning, replicating, duplicating, or "set up another company" on the template.

## Success criteria
- A new per-company repository exists and is cloned locally from the template.
- All brand-specific strings reflect the new company (name, legal name, phone, address, license, email, rating, reviews, tagline, service areas, testimonials).
- `/public/brand/` assets (`logo.png`, `logo-white.png`, `hero.jpg`, `service-before.jpg`, `install-after.jpg`) are replaced and processed (transparent icon, sharp hero).
- Dev server renders the site without missing-asset 404s and the header logo, footer logo, hero, and before/after section all look clean in a screenshot pass.

## Workflow

Copy this checklist at the start of every run and update it as you go:

```markdown
Clone Progress
- [ ] 1) Intake: target URL + target repo slug confirmed
- [ ] 2) Scaffold: new repo created from GitHub template and cloned locally
- [ ] 3) Scrape: brand facts + asset URLs pulled from target site
- [ ] 4) Brand constants updated in LandingParts.tsx
- [ ] 5) Secondary copy patched in FooterParts.tsx + ServiceParts.tsx
- [ ] 6) Assets downloaded to /public/brand/
- [ ] 7) logo-white.png transparency verified (white keyed out if needed)
- [ ] 8) hero.jpg re-encoded + upscaled
- [ ] 9) Testimonials + service areas rewritten from real data
- [ ] 10) Dev server running locally
- [ ] 11) Visual verify: top-of-hero, scrolled header, before/after, footer
- [ ] 12) Report: what was swapped, what was dummied, what needs owner input
```

## Instructions

### 1) Intake
Before touching files, confirm with the user:
- Target company website URL (primary source of truth).
- Target repository slug (e.g., `hvac-72-degrees`).
- Whether they want real data only, or are OK with dummy fills for missing facts (phone, license, address often aren't published — use plausible placeholders and flag them in the final report).

Default repo slug format: `hvac-<company-slug>`.

### 2) Scaffold
Create a brand-new repo from the template. Do not `cp -R` an existing working folder.

```bash
gh repo create SJ-Lead-Lab/hvac-<slug> --template SJ-Lead-Lab/hvac-template --private --clone
cd "hvac-<slug>"
```

Run `npm install` after repository creation, before local verification.

### 3) Scrape the target site
Pull the homepage and any "about/contact" pages. Use `WebFetch` for parsed text, and `curl` with `required_permissions: ["full_network"]` for raw HTML when you need image URLs from CDNs.

Harvest, in this order:
1. **Identity**: brand name, legal entity, tagline/hero headline.
2. **Contact**: phone (display + `tel:` form), email, street address, license #.
3. **Social proof**: Google rating, review count, 3–4 best testimonial quotes with author + star count.
4. **Service coverage**: primary city + 5–8 neighborhoods/suburbs (for the service-area grid and footer list).
5. **Assets**: hero-worthy photo URL, 1 "before" photo, 1 "after" photo, logo (color) URL, logo (icon/white-compatible) URL.

If a field is missing, use a plausible dummy and log it in the final report under "needs owner input".

### 4) Update brand constants
The single source of truth for brand identity is the top of `src/components/layout/LandingParts.tsx`. Update every constant in this block — do not scatter edits:

```typescript
export const BRAND_NAME = "...";
export const BRAND_FULL_NAME = "...";
export const BRAND_LEGAL_NAME = "...";
export const BRAND_TAGLINE = "...";
export const BRAND_LOGO_DARK  = "/brand/logo.png";        // keep filename, swap file contents
export const BRAND_LOGO_LIGHT = "/brand/logo-white.png";  // keep filename, swap file contents
export const BRAND_LICENSE = "License #...";
export const BRAND_EMAIL   = "...";
export const BRAND_ADDRESS = "...";
export const PHONE_LABEL = "(###) ###-####";
export const PHONE_TEL   = "tel:1##########";
export const GOOGLE_RATING  = "4.9";
export const GOOGLE_REVIEWS = "###";
```

Also update the hero headline inside `Hero()` if the tagline changes — it is currently hand-split across two lines for the italic styling. Keep the `<span className="font-bold italic">…</span>` wrapper on the punchy fragment.

### 5) Patch the rest of the copy
Brand-specific strings still leak into two other files. Use `rg` to find them, then replace:

```bash
rg -n "72 Degrees|Cooper Brothers|Santa Clara|Santa Teresa|408.*628|874695|72degreescb|South Bay|Morgan Hill|Gilroy|Willow Glen" src/
```

Expect hits in:
- `src/components/sections/FooterParts.tsx` — service-area list, address, phone, copyright line, social links.
- `src/components/sections/ServiceParts.tsx` — before/after `alt` text, city names in the section blurb, testimonial city callouts.

Replace them with the new brand's equivalents. Keep copy style identical (em dashes, oxford commas, brand tone).

### 6) Swap assets
Target files — filenames must stay exactly these so imports don't break:

| File | Purpose | Where referenced |
|------|---------|------------------|
| `public/brand/logo.png` | Full color wordmark for the header (light backgrounds). | `BRAND_LOGO_DARK` |
| `public/brand/logo-white.png` | Icon-only or flat mark that must be transparent (used on dark footer). | `BRAND_LOGO_LIGHT` |
| `public/brand/hero.jpg` | Main hero background (upscale to ≥3000px wide). | `Hero()` in `LandingParts.tsx` |
| `public/brand/service-before.jpg` | "BEFORE" image in the transformations grid. | `BeforeAfter` in `ServiceParts.tsx` |
| `public/brand/install-after.jpg` | "AFTER" image in the transformations grid. | `BeforeAfter` in `ServiceParts.tsx` |

Download with `curl` (request `full_network` permission if the sandbox blocks the CDN):

```bash
curl -L -o public/brand/hero.jpg            "<hero url>"
curl -L -o public/brand/logo.png            "<logo url>"
curl -L -o public/brand/logo-white.png      "<icon/mark url>"
curl -L -o public/brand/service-before.jpg  "<before url>"
curl -L -o public/brand/install-after.jpg   "<after url>"
```

### 7) Fix logo-white.png transparency
This is the single most common defect. Target sites often serve a PNG with an alpha channel but an *opaque* white background. On the dark footer it renders as a white box.

Validate first, then fix:

```bash
python3 scripts/check_alpha.py public/brand/logo-white.png
# Prints: "OK - already transparent" or "NEEDS KEY - found N white opaque pixels"
```

If it needs keying:

```bash
python3 scripts/key_out_white.py public/brand/logo-white.png
```

The script rewrites the file in place — any pixel with R,G,B ≥ 245 and alpha > 0 becomes alpha 0. It uses only the Python standard library (`zlib` + `struct`), so it works in the sandbox without `PIL`.

### 8) Upscale the hero
Use macOS-native `sips` for a sharp Lanczos resample. Avoid true AI upscalers unless the user provides an API key — `sips` is good enough for HiDPI crispness.

```bash
bash scripts/upscale_hero.sh public/brand/hero.jpg
# Re-encodes at max JPEG quality then resamples to 3840px wide.
```

### 9) Rewrite testimonials + service areas
In `LandingParts.tsx` the `Testimonials()` component has a hardcoded `testimonials` array of 4. Replace with real quotes from the target site. If the target publishes fewer than 4 usable reviews, pad with clearly-labeled placeholders and flag them.

In the service-area grid (typically rendered from a list in `LandingParts.tsx` or `ServiceParts.tsx`), replace neighborhoods with the target's actual coverage. Keep exactly 6 entries in the footer "SERVICE AREA" column to preserve the layout.

### 10) Run and verify
Use default local startup unless the user explicitly requests a different port:

```bash
npm install
npm run dev
```

Then drive the browser through this minimum verification pass (use the cursor-ide-browser MCP tools):

1. Navigate to the local URL printed by Vite (normally `http://127.0.0.1:3000`).
2. Screenshot the hero — header logo must be legible on the dark photo, no pill background.
3. Scroll down ~800px so the header turns light — logo must show full color, no filter artifacts.
4. Scroll to the "System Transformations" block — BEFORE/AFTER both load (no broken image icons).
5. Scroll to the footer — logo is the colored icon on black with a clean wordmark next to it, no white box.

If any step fails, loop back into the appropriate phase — don't try to patch from the bottom up.

### 11) Report
Close with a short bulleted summary:
- What the new site is (brand, URL, repo slug).
- What data was sourced vs. placeholdered (explicit list).
- Which assets were swapped + any processing applied (transparency key, upscale).
- Known remaining TODOs for the owner (e.g., "confirm C-20 license #", "supply real review count").

## Error handling and pitfalls

**`curl` exits 56** → sandbox blocked network. Retry with `required_permissions: ["full_network"]`.

**`PIL` / Pillow not available** → use the stdlib scripts in this skill (`check_alpha.py`, `key_out_white.py`). Do not `pip install` inside the sandbox.

**Header logo illegible on hero** → the template's `Header` already applies a conditional drop-shadow filter when not scrolled. If a new logo has mostly-dark strokes that disappear on the hero, swap `BRAND_LOGO_DARK` for a light/reversed variant instead of changing the filter logic.

**Footer logo looks muddy when filtered** → never apply `brightness(0) invert(1)` to a detailed wordmark. Use the transparent icon (`BRAND_LOGO_LIGHT`) plus two `<span>`s for the brand text, exactly like the current `FooterParts.tsx` lockup.

**Port already in use** → pass `--port 300X` only when needed.

**Browser snapshot scrolls snap back to hero** → the page uses hash-anchor navigation. To reach the footer, use `browser_scroll` with `ref: <copyright-ref>, scrollIntoView: true`, not a fragment URL.

**Script confusion** → every helper in `scripts/` accepts `--help`. Run it before guessing at arguments.

## Resources
- Brand-field inventory and file-level map: [resources/brand_schema.md](resources/brand_schema.md)
- Alpha-channel validator: [scripts/check_alpha.py](scripts/check_alpha.py)
- White-background keyer: [scripts/key_out_white.py](scripts/key_out_white.py)
- Hero upscaler: [scripts/upscale_hero.sh](scripts/upscale_hero.sh)
