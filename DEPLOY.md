# Deploying to Vercel

The site is fully static Next.js. No database or secrets needed.

## 1. Import the repo (one time, ~2 minutes)
1. Go to https://vercel.com/new and sign in with the GitHub account that owns this repo.
2. Pick **wajahatali122000-debug/Nol** → **Import**.
3. Framework preset: **Next.js** (auto-detected). Leave build settings as they are.
4. Environment variables (optional for now):
   - `NEXT_PUBLIC_SITE_URL` = the final domain, e.g. `https://www.yourdomain.com` (no trailing slash). Until the domain is bought, leave it empty — canonical URLs then point to a placeholder, which is fine for a preview.
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = `ca-pub-…` only after AdSense approval.
5. **Deploy.** You get a `*.vercel.app` URL.

After this, every push to `main` redeploys automatically.

## 2. When the domain is bought
1. Vercel → Project → **Settings → Domains** → add the domain, follow the DNS instructions.
2. Set `NEXT_PUBLIC_SITE_URL` to `https://www.<domain>` → **Redeploy**.
3. Change the placeholder name in `lib/site.ts` (`SITE_NAME`, `SITE_NAME_AR`, `CONTACT_EMAIL`).
4. Google Search Console: add the domain, submit `https://www.<domain>/sitemap.xml`.

## Before launch
- Arabic pages need a native-speaker review.
- Keep the preview `*.vercel.app` URL out of Google until the real domain is live (it isn't linked anywhere, so it won't be found on its own).
