import Link from "next/link";
import LangSwitch from "./LangSwitch";
import NavLinks from "./NavLinks";
import { OFFICIAL, T, pathFor, type Locale } from "@/lib/site";

export default function Header({ locale, otherPaths }: { locale: Locale; otherPaths: string[] }) {
  const t = T[locale];
  return (
    <header className="sticky top-0 z-30 bg-brand/95 text-white shadow-md shadow-brand/20 backdrop-blur supports-[backdrop-filter]:bg-brand/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href={pathFor(locale, "")} className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg text-brand shadow-inner">
            n
            <span className="absolute -end-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-brand" />
          </span>
          <span className="text-[17px] leading-none">{t.siteName}</span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={OFFICIAL.nolPortal}
            target="_blank"
            rel="noopener nofollow"
            className="hidden rounded-lg bg-white/10 px-3 py-1.5 text-sm font-bold ring-1 ring-white/20 hover:bg-white/15 sm:inline-block"
          >
            {locale === "ar" ? "فحص الرصيد ↖" : "Check balance ↗"}
          </a>
          <LangSwitch locale={locale} label={t.langSwitch} otherPaths={otherPaths} />
        </div>
      </div>
      <nav aria-label="Main" className="border-t border-white/10">
        <NavLinks items={t.nav} />
      </nav>
    </header>
  );
}
