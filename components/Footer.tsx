import Link from "next/link";
import { listPages, CATEGORY_LABEL } from "@/lib/content";
import { T, pathFor, type Locale } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  const t = T[locale];
  const pages = listPages(locale);
  const guides = pages.filter((p) => p.category !== "legal").slice(0, 10);
  const legal = pages.filter((p) => p.category === "legal");
  return (
    <footer className="mt-20 bg-brand text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-lg font-extrabold text-white">{t.siteName}</p>
          <p className="mt-2 text-sm leading-relaxed">{t.footerAbout}</p>
        </div>
        <div>
          <p className="font-bold text-white">{t.allGuides}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {guides.map((p) => (
              <li key={p.slug}>
                <Link href={pathFor(locale, p.slug)} className="hover:text-white hover:underline">
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">{t.tools}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={pathFor(locale, "tools/fare-calculator")} className="hover:text-white hover:underline">
                {locale === "ar" ? "حاسبة أجرة نول" : "Nol fare calculator"}
              </Link>
            </li>
            <li>
              <Link href={pathFor(locale, "tools/which-nol-card")} className="hover:text-white hover:underline">
                {locale === "ar" ? "أي بطاقة نول تناسبك؟" : "Which nol card should I get?"}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">{CATEGORY_LABEL[locale].legal}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {legal.map((p) => (
              <li key={p.slug}>
                <Link href={pathFor(locale, p.slug)} className="hover:text-white hover:underline">
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-white/70">
          {t.disclaimerShort} © {new Date().getFullYear()} {t.siteName}
        </p>
      </div>
    </footer>
  );
}
