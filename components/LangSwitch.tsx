"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/site";

/**
 * Links to the same page in the other language when it exists, else that language's home.
 * `otherPaths` = every path the other locale has (built on the server from /content).
 */
export default function LangSwitch({
  locale,
  label,
  otherPaths,
}: {
  locale: Locale;
  label: string;
  otherPaths: string[];
}) {
  const path = usePathname() || "/";
  const target =
    locale === "en" ? (path === "/" ? "/ar" : `/ar${path}`) : path.replace(/^\/ar/, "") || "/";
  const href = otherPaths.includes(target) ? target : locale === "en" ? "/ar" : "/";
  return (
    <a
      href={href}
      hrefLang={locale === "en" ? "ar" : "en"}
      lang={locale === "en" ? "ar" : "en"}
      className="rounded-lg border border-white/25 px-3 py-1.5 text-sm font-bold text-white hover:bg-white/10"
    >
      {label}
    </a>
  );
}
