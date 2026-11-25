import { OFFICIAL, T, type Locale } from "@/lib/site";

/** The site's only "check balance" action: a link out to RTA. We never collect card numbers. */
export default function OfficialCta({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <div className="not-prose my-8 rounded-2xl border border-brand/15 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-extrabold text-brand">{t.checkOfficial}</p>
          <p className="mt-1 text-sm text-muted">{t.officialNote}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={OFFICIAL.nolPortal}
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:bg-brand-600"
          >
            nol.rta.ae
            <span aria-hidden>{locale === "ar" ? "↖" : "↗"}</span>
          </a>
          <a
            href={OFFICIAL.rtaNol}
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center gap-2 rounded-xl border border-brand/25 px-5 py-3 font-bold text-brand transition hover:bg-brand-50"
          >
            rta.ae
            <span aria-hidden>{locale === "ar" ? "↖" : "↗"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
