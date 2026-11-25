# Content brief — Nol card guide site

Independent, unofficial SEO guide to Dubai's nol card (RTA). Bilingual: English at `/`, Arabic at `/ar/`.
Read this whole file, then `content/en/index.md` (English style template) or `content/ar/index.md` (Arabic style template) before writing.

## File format
Each page = `content/<en|ar>/<slug>.md`. Frontmatter (YAML, quote every string):

```yaml
---
title: "SEO title, ≤ 60 chars, main keyword first"
h1: "On-page heading, can be longer/natural"
description: "Meta description, 140–160 chars, includes keyword, says what reader gets"
updated: 2026-11-25
category: balance | recharge | cards | fares | help | news | legal
order: <number, position within category>
related: [3–6 slugs from the SLUG LIST below]
faq:            # 4–7 real questions people search; answers 1–3 sentences, self-contained
  - q: "..."
    a: "..."
sources:        # official RTA URLs actually used (from facts sheet); omit on legal pages
  - label: "..."
    url: "..."
---
```

Body = Markdown (GFM tables ok). Available extras (raw HTML, blank line after opening div and before closing div):
- `<div class="note">` / `<div class="tip">` / `<div class="warn">` callouts
- `<ol class="steps"><li>…</li></ol>` numbered step lists (HTML inside, use <a>/<strong> not markdown)
- `<!-- cta -->` inserts the "check balance on official RTA site" box. Use once, after the intro, on balance/recharge/help pages.
- `<!-- ad -->` marks an ad spot. Use once, roughly mid-article, on pages > 600 words. Never on legal pages.

Use `##` for main sections (they become the table of contents), `###` for sub-sections. Never write an `#` H1 in the body.

## Writing rules
- 700–1,200 words for guides (legal pages 250–500). Answer the query in the first 2 sentences. Then detail.
- Short sentences, plain English, second person ("you"). No filler ("In today's fast-paced world…"), no hype, no emojis.
- Every page: at least one table or step list where it helps; 3+ internal links in the body using root-relative URLs (`/nol-card-fares`, Arabic: `/ar/nol-card-fares`). Only link to slugs in the SLUG LIST (Arabic pages: only to slugs in the ARABIC SLUG LIST, else link the English-free Arabic home `/ar`).
- Tools: `/tools/fare-calculator`, `/tools/which-nol-card` (Arabic: `/ar/tools/...`) — link them where relevant.
- External links only to official sources in the facts sheet.
- **FACTS: use ONLY the VERIFIED facts below as facts.** If something is in "UNVERIFIED", either leave it out or say plainly that RTA doesn't publish it / check with RTA. Never invent prices, fees, phone numbers, timings, minimum amounts, station names, or processing times. If you don't know, say "check the current figure on rta.ae" — that is fine.
- Never claim to be RTA. Never say "official". Never tell users to give their card number to this site.
- Arabic: write natively in Modern Standard Arabic as a native copywriter would, NOT a word-for-word translation. Use Western digits (3, 5, 7.50) and "درهم/دراهم/درهماً" correctly. Brand names stay Latin: nol Pay, RTA Dubai, S'hail can be written سهيل. Use "هيئة الطرق والمواصلات" for RTA.

## VERIFIED facts (from rta.ae, checked 25 Nov 2026)
Cards (rta.ae → Choose your nol card):
- Silver: AED 25 incl. AED 19 credit, valid 5 years. Standard card.
- Gold: AED 25 incl. AED 19 credit, valid 5 years. Lets you use Gold Class cabin on Metro & Tram; Gold fares are double standard.
- Personal (Blue) card: AED 70 incl. AED 20 credit, valid 5 years. Personalised with name/photo; balance recoverable if lost; required for concession fares.
- Red ticket: AED 2, paper, valid 90 days or 10 trips; for one type of transport at a time; pay-per-trip.
- nol Travel card: AED 100 incl. AED 19 credit, valid 5 years (aimed at tourists/residents; RTA has a separate site noltravel.ae). Don't invent its benefits.
- Max balance: AED 1,000 anonymous; AED 5,000 registered/personal.
- Concession categories (Personal card): students, People of Determination, seniors 60+, social-affairs beneficiaries. RTA does not publish discount % on these pages → don't state a %.
Registration:
- Anonymous Silver/Gold can be registered online on the RTA portal or at any metro ticket office. After approval you get an SMS with a PIN used for refunds and managing cards. You must then tap the card at a metro gate (check-in & check-out) to activate the "Registered" status.
- Registering protects the balance if the card is lost.
Top up:
- Channels: nol Pay app, ticket offices, ticket vending machines, 2,000+ authorised sales outlets around metro stations and beyond, RTA website, RTA Dubai app, S'hail app.
- Online top-ups via RTA website, RTA Dubai and S'hail apps need activation: wait 45 min – 4 hours, then tap card at a metro gate, RTA parking meter, or solar-powered bus machine.
Refund / lost:
- Lost, damaged, faulty or expired card: report it and apply for refund via RTA website, Smart Kiosks, or the nol Pay app (for virtual nol card holders). A blacklist (block) record is created automatically when a refund request is submitted.
- Refund method: cash collection, or transfer the balance to another registered/personal nol card. If balance transfer is chosen, the receiving card must be tapped at a parking meter, solar bus machine or metro gate to receive it.
- Only registered/personal cards can be traced to the owner; anonymous cards can't be recovered.
Fares (rta.ae → nol fares): Dubai has 7 fare zones; charged by number of zones passed.
- Silver/Personal: AED 3 (within 1 zone), AED 5 (2 adjacent zones), AED 7.50 (more than 2 zones)
- Gold: AED 6 / 10 / 15
- Red ticket regular: AED 4 / 6 / 8.50; Red ticket Gold: AED 8 / 12 / 17
- Transfers: check out of metro, check in on bus within 30 minutes → charged as one journey by total zones.
- Gold surcharge applies on Metro and Tram only; not charged twice for the same zone when transferring tram→metro.
- nol works on Metro, Tram, bus, water bus, and RTA paid parking (Silver, Gold, Blue: tap at any RTA parking meter).
Shopping: nol can pay at participating outlets (breakfast, groceries, snacks, fuel…) with a cap of AED 200 per transaction as stated by RTA ("cap amount of 200 AED").
nol Pay: RTA's nol app; supports virtual nol card and top-ups.
Contact: RTA call centre 800 9090.
Official URLs:
- https://www.rta.ae/wps/portal/rta/ae/public-transport/nol/nol-how (how to use, top up, register, refund)
- https://www.rta.ae/wps/portal/rta/ae/public-transport/choosenolcard (card types & prices)
- https://www.rta.ae/wps/portal/rta/ae/public-transport/Nol-Fares (fares)
- https://nol.rta.ae/ (nol portal: apply, personalise, top up, renew travel pass)
- https://www.rta.ae/wps/portal/rta/ae/home/smart-apps/app-details/nol+pay/nol-pay (nol Pay app)

## News (reported by Khaleej Times / Gulf News, Nov 2026 — attribute, don't present as RTA-confirmed detail)
- nol–Jaywan: next-generation card from RTA with Al Etihad Payments (Central Bank subsidiary). Pilot planned from November 2026, first phase covering public transport, taxis and public parking; later phases add more. Reports mention 120+ discounts and smartphone activation (Android & iOS). RTA has NOT confirmed: exact launch date, price, whether existing nol cards must be replaced. Jaywan = UAE's national domestic card scheme. Sources: https://www.khaleejtimes.com/transport/dubai-launch-nol-jaywan-cards-pilot-phase-november-2026 , https://gulfnews.com/uae/dubai/dubais-new-nol-jaywan-card-what-changes-for-users-1.500735515
- Paid parking in Dubai: cash payments at meters phased out from 1 June 2026; nol remains a payment option (Khaleej Times).

## UNVERIFIED — do not state as fact
Minimum top-up amounts; minimum balance to travel; daily fare caps; replacement fee amounts; refund processing times; SMS 511 balance check (likely false — say RTA doesn't list an SMS service); taxi payment with current nol cards (not confirmed — say most taxis take cash/card, nol in taxis is part of the nol–Jaywan rollout per reports); discount percentages; metro timings; monthly pass prices; nol Plus loyalty details.

## SLUG LIST (English)
balance: `` (home, exists), find-nol-card-number, nol-balance-not-updated
recharge: nol-card-recharge, nol-pay-app, register-nol-card, nol-card-maximum-balance
cards: nol-card-types, nol-silver-card, nol-gold-card, nol-personal-blue-card, nol-red-ticket, nol-travel-card, nol-card-discounts, where-to-buy-nol-card, nol-card-for-tourists
fares: nol-card-fares, nol-metro-bus-transfer, dubai-metro-gold-class, nol-card-parking, nol-card-shopping
help: lost-nol-card, nol-card-refund, nol-card-expiry-renewal
news: nol-jaywan-card
legal: about, contact, privacy-policy, disclaimer, terms

## ARABIC SLUG LIST (same slugs, Arabic content)
`` (home, exists), find-nol-card-number, nol-card-recharge, nol-card-types, nol-card-fares, nol-card-discounts, lost-nol-card, nol-card-refund, nol-jaywan-card, about, contact, privacy-policy, disclaimer

## Legal page notes
Site name placeholder: "Nol Balance Guide" (Arabic "دليل رصيد نول"). Contact email placeholder: hello@example.com. Owner: independent publisher in the UAE (no personal names). Privacy: static site, no accounts, no card numbers collected; may use Vercel Analytics-style anonymous analytics and Google AdSense (cookies, personalised ads, link to Google's ad settings https://adssettings.google.com and policy https://policies.google.com/technologies/ads). Disclaimer: not affiliated with RTA/nol/Al Etihad Payments; "nol" and RTA names belong to their owners; info may be outdated; check rta.ae. Category `legal`, no faq, no sources, no cta/ad markers.
