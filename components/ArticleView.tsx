import Link from "next/link";
import AdSlot from "./AdSlot";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Faq from "./Faq";
import Icon, { CATEGORY_ICON } from "./Icon";
import JsonLd from "./JsonLd";
import OfficialCta from "./OfficialCta";
import Toc from "./Toc";
import { CATEGORY_LABEL, getPage, listPages, ogTitleFor, readTime, type Page } from "@/lib/content";
import { OFFICIAL, SITE_NAME, SITE_NAME_AR, SITE_URL, T, pathFor, type Locale } from "@/lib/site";

function formatDate(d: string, locale: Locale) {
  return new Date(`${d}T00:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ArticleView({ page, embedded = false }: { page: Page; embedded?: boolean }) {
  const { locale } = page;
  const t = T[locale];
  const isHome = page.slug === "";
  const isLegal = page.category === "legal";
  const url = `${SITE_URL}${pathFor(locale, page.slug) === "/" ? "" : pathFor(locale, page.slug)}`;

  const crumbs: Crumb[] = [{ name: t.home, href: pathFor(locale, "") }];
  if (!isHome) crumbs.push({ name: page.h1, href: pathFor(locale, page.slug) });

  // Related: explicit list first, then same category, never self/legal.
  const all = listPages(locale).filter((p) => p.category !== "legal" && p.slug !== page.slug);
  const explicit = page.related
    .map((s) => getPage(locale, s))
    .filter((p): p is Page => !!p && p.slug !== page.slug);
  const fill = all.filter((p) => p.category === page.category && !page.related.includes(p.slug));
  const related = [...explicit, ...fill, ...all].filter(
    (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i,
  ).slice(0, 6);

  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="h-4 w-4" />
        {t.updated}: <time dateTime={page.updated}>{formatDate(page.updated, locale)}</time>
      </span>
      {!isLegal && (
        <span>
          {readTime(page.words)} {t.readTime}
        </span>
      )}
    </p>
  );

  return (
    <>
      {!embedded && (
        <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-paper">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ backgroundImage: "radial-gradient(40rem 16rem at 100% 0%, #f4b74026 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-5">
            {!isHome && <Breadcrumbs items={crumbs} />}
            {!isLegal && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600 ring-1 ring-brand/10">
                <Icon name={CATEGORY_ICON[page.category]} className="h-4 w-4" />
                {CATEGORY_LABEL[locale][page.category]}
              </p>
            )}
            <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-brand sm:text-[2.6rem]">
              {page.h1}
            </h1>
            {!isLegal && <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink/75">{page.description}</p>}
            <div className="mt-4">{meta}</div>

            {page.keyfacts.length > 0 && (
              <dl className="mt-6 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
                {page.keyfacts.map((k) => (
                  <div key={k.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line">
                    <dt className="text-xs font-semibold text-muted">{k.label}</dt>
                    <dd className="mt-1 text-lg font-extrabold leading-tight text-brand">{k.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>
      )}

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-6 pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          <div className="lg:hidden">
            <Toc items={page.toc} title={t.onThisPage} />
          </div>

          <div className="prose mt-6 lg:mt-0">
            {page.parts.map((part, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: part.html }} />
                {part.after === "cta" && <OfficialCta locale={locale} />}
                {part.after === "ad" && <AdSlot />}
              </div>
            ))}
          </div>

          <Faq items={page.faq} title={t.faq} />

          {page.sources.length > 0 && (
            <section className="mt-10 rounded-2xl border border-line bg-white p-5 text-sm">
              <h2 className="font-bold text-brand">{t.sources}</h2>
              <ul className="mt-2 space-y-1.5">
                {page.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener nofollow" className="text-brand-600 underline underline-offset-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!isLegal && (
            <p className="mt-6 rounded-xl bg-accent-50 p-4 text-sm leading-relaxed text-ink/80">{t.disclaimerShort}</p>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            <Toc items={page.toc} title={t.onThisPage} />
            {!isLegal && (
              <a
                href={OFFICIAL.nolPortal}
                target="_blank"
                rel="noopener nofollow"
                className="group block rounded-2xl bg-brand p-5 text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand">
                  <Icon name="search" />
                </span>
                <span className="mt-3 block font-extrabold leading-snug">{t.checkOfficial}</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                  nol.rta.ae <Icon name="external" className={`h-4 w-4 ${locale === "ar" ? "-scale-x-100" : ""}`} />
                </span>
              </a>
            )}
            <AdSlot />
          </div>
        </aside>
      </div>

      {!isLegal && related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-6">
          <h2 className="text-2xl font-extrabold text-brand">{t.related}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={pathFor(locale, p.slug)}
                  className="group block h-full rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10"
                >
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-50 ring-1 ring-accent/30 transition group-hover:bg-accent group-hover:text-brand">
                      <Icon name={CATEGORY_ICON[p.category]} className="h-4 w-4" />
                    </span>
                    {CATEGORY_LABEL[locale][p.category]}
                  </p>
                  <p className="mt-1.5 font-bold leading-snug">{p.h1}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!isLegal && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.h1,
            description: page.description,
            inLanguage: locale,
            dateModified: page.updated,
            datePublished: page.updated,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: locale === "ar" ? SITE_NAME_AR : SITE_NAME, url: SITE_URL },
            publisher: { "@type": "Organization", name: locale === "ar" ? SITE_NAME_AR : SITE_NAME, url: SITE_URL },
            image: `${SITE_URL}/og?title=${encodeURIComponent(ogTitleFor(page))}`,
          }}
        />
      )}
      {page.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </>
  );
}
