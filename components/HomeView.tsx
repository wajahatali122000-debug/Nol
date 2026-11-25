import Link from "next/link";
import ArticleView from "./ArticleView";
import Icon, { CATEGORY_ICON } from "./Icon";
import { CATEGORY_LABEL, CATEGORY_ORDER, listPages, type Page } from "@/lib/content";
import { HOME } from "@/lib/home";
import { OFFICIAL, pathFor } from "@/lib/site";

/** Stylised card back (deliberately not the real nol card design) showing where the tag ID is. */
function CardVisual({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[260px] sm:max-w-sm" aria-hidden>
      <div className="absolute -inset-6 rounded-[2rem] bg-accent/25 blur-2xl" />
      <div className="relative aspect-[1.586] rotate-[-4deg] rounded-2xl bg-gradient-to-br from-white to-slate-200 p-5 shadow-2xl ring-1 ring-black/5 transition duration-500 hover:rotate-0">
        <div className="h-7 w-full rounded bg-slate-800/85" />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
          <span className="h-6 w-10 rounded bg-slate-300" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-slate-300" />
          <div className="h-1.5 w-1/2 rounded bg-slate-300" />
        </div>
        <div className="absolute bottom-5 start-5 end-5 flex items-end justify-between" dir="ltr">
          <span className="rounded-lg bg-accent px-2.5 py-1.5 font-mono text-base font-bold tracking-widest text-brand ring-4 ring-accent/40">
            1234 567 890
          </span>
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-center gap-2 text-sm font-bold text-accent">
        <Icon name="arrow" className="h-4 w-4 -rotate-90" />
        {tag}
      </div>
    </div>
  );
}

export default function HomeView({ page }: { page: Page }) {
  const locale = page.locale;
  const h = HOME[locale];
  const rtl = locale === "ar";
  const pages = listPages(locale).filter((p) => p.category !== "legal" && p.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 85% -10%, #1d7f8f 0%, transparent 60%), radial-gradient(40rem 24rem at -10% 110%, #f4b74033 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {h.badge}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{h.h1}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{h.lead}</p>

            <ol className="mt-7 grid gap-3 sm:grid-cols-3">
              {h.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold leading-snug">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL.nolPortal}
                target="_blank"
                rel="noopener nofollow"
                className="group inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-extrabold text-brand shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:brightness-105"
              >
                {h.ctaPrimary}
                <Icon name="external" className={`h-5 w-5 ${rtl ? "-scale-x-100" : ""}`} />
              </a>
              <Link
                href={h.ctaSecondaryHref}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                {h.ctaSecondary}
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <Icon name="shield" className="h-4 w-4 shrink-0" />
              {h.safe}
            </p>
          </div>
          <CardVisual label={h.cardBack} tag={h.tagLabel} />
        </div>
      </section>

      {/* KEY FACTS */}
      <section className="relative mx-auto -mt-px max-w-6xl px-4">
        <div className="-mt-0 rounded-3xl border border-line bg-white p-5 shadow-xl shadow-brand/5 sm:-mt-8 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-xl font-extrabold text-brand sm:text-2xl">{h.factsTitle}</h2>
            <p className="text-xs text-muted">{h.factsSub}</p>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {h.facts.map((f) => (
              <li key={f.label}>
                <Link
                  href={f.href}
                  className="group flex h-full items-start gap-3 rounded-2xl bg-paper p-4 ring-1 ring-line transition hover:bg-brand-50 hover:ring-brand/30"
                >
                  <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-accent sm:grid">
                    <Icon name={f.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-muted">{f.label}</span>
                    <span className="mt-0.5 block text-lg font-extrabold leading-tight text-brand sm:text-xl">{f.value}</span>
                    <span className="mt-1 block text-xs leading-snug text-ink/70">{f.sub}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TASKS */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="text-2xl font-extrabold text-brand">{h.tasksTitle}</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {h.tasks.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-brand-600 ring-1 ring-accent/30 transition group-hover:bg-accent group-hover:text-brand">
                  <Icon name={t.icon} className="h-6 w-6" />
                </span>
                <span className="mt-3 font-bold leading-snug">{t.label}</span>
                <span className="mt-0.5 text-sm text-muted">{t.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FULL GUIDE */}
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-600">
          <Icon name="search" className="h-4 w-4" />
          {h.guideTitle}
        </p>
      </div>
      <ArticleView page={page} embedded />

      {/* HUB */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-extrabold text-brand">{h.hubTitle}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.filter((c) => c !== "legal" && pages.some((p) => p.category === c)).map((c) => (
            <div key={c} className="rounded-2xl border border-line bg-white p-5">
              <p className="flex items-center gap-2 font-extrabold text-brand">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={CATEGORY_ICON[c]} className="h-4.5 w-4.5" />
                </span>
                {CATEGORY_LABEL[locale][c]}
              </p>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {pages
                  .filter((p) => p.category === c)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={pathFor(locale, p.slug)} className="group flex items-center gap-1.5 py-0.5 text-ink/85 hover:text-brand">
                        <Icon name="arrow" className={`h-3.5 w-3.5 shrink-0 text-brand-600/60 group-hover:text-brand ${rtl ? "-scale-x-100" : ""}`} />
                        <span className="group-hover:underline">{p.h1}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
