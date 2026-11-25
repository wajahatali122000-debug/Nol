# Nol card guide — project context

SEO-owned, **unofficial** informational site about Dubai's nol card (RTA). Built for a friend who does SEO; he owns the Vercel/GitHub accounts and will buy the domain once the build is final. Competitor to beat: nolcardbalance.com (13-page WordPress site, research in `docs/research-nol-2026-11-25.md`).

## Hard rules
- **Never imitate RTA/nol.** No RTA logo, red RTA styling, "official" wording, or anything that could pass as the real site. Disclaimer on every page (footer + article end).
- **Never collect card numbers.** No fake "balance checker" form. The "check balance" action always links out to nol.rta.ae / rta.ae (`components/OfficialCta.tsx`).
- **Facts only from `docs/content-brief.md` → VERIFIED.** Anything else is left out or labelled "check with RTA". Fares live in `lib/fares.ts` (tools) and in the content tables — change both when RTA changes fares, and bump `updated:` in frontmatter.
- Site name is a placeholder (`SITE_NAME` in `lib/site.ts`) until the domain is chosen.

## Stack
Next.js 15 (App Router, TS) · Tailwind v4 · content in Markdown (`gray-matter` + `marked`) · fully static (SSG) · Vercel. No database.

## Structure
- `content/en/*.md` → `/<slug>`, `content/ar/*.md` → `/ar/<slug>`. `index.md` = home. Same slug in both = translations (hreflang + language switch pick this up automatically).
- `content/<loc>/_tools/*.md` = text around the tools (`/tools/fare-calculator`, `/tools/which-nol-card`).
- Markers in markdown: `<!-- cta -->` official-site box, `<!-- ad -->` ad spot, `<!-- split -->` (tool pages: intro / rest).
- Two root layouts: `app/(en)/layout.tsx` (lang=en) and `app/(ar)/ar/layout.tsx` (lang=ar dir=rtl).
- SEO: `lib/seo.ts` (canonical, hreflang, OG), `components/ArticleView.tsx` (Article + FAQPage + Breadcrumb JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `app/og/route.tsx` (OG images; English titles only — no Arabic font).
- Ads: set `NEXT_PUBLIC_ADSENSE_CLIENT` to turn AdSense on; empty = no ad code at all.

## Design (25 Nov 2026 refresh)
- Goal: key info at first glance. Home = `components/HomeView.tsx` (hero with 3 steps + card illustration showing the tag ID, key-facts panel, task tiles, full guide, guide hub). Copy/links for it: `lib/home.ts` (both languages; Arabic links only to pages that exist in Arabic).
- Every guide has an "At a glance" strip from frontmatter `keyfacts:` (3–4 label/value pairs). Source of truth: `scripts/keyfacts.json` → `node scripts/apply-keyfacts.mjs`.
- Icons: `components/Icon.tsx` (inline SVG, no library). Palette in `app/globals.css` `@theme` — teal `brand` + amber `accent`, deliberately not RTA red.
- The card illustration is a generic card back, not the real nol card design. Keep it that way.

## Before shipping any content change
1. `node scripts/check-content.mjs` — broken links, related slugs, title/description lengths, list of AED amounts to eyeball.
2. `npm run build` must pass.

## Env
- `NEXT_PUBLIC_SITE_URL` — final domain (canonical/sitemap). Defaults to https://www.example.com.
- `NEXT_PUBLIC_ADSENSE_CLIENT` — optional.

## Status (25 Nov 2026)
- v1 build in progress locally; not on GitHub/Vercel yet. Arabic pages drafted, **awaiting native-speaker review** before launch.
