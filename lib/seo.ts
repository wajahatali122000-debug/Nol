import type { Metadata } from "next";
import { hasPage } from "./content";
import { SITE_NAME, SITE_NAME_AR, SITE_URL, pathFor, type Locale } from "./site";

/**
 * Canonical + hreflang + OG for a page. `slug` may be a content slug or a tool path ("tools/x").
 * `ogTitle` is always English (the OG renderer has no Arabic font).
 */
export function pageMetadata(opts: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  ogTitle?: string;
  type?: "article" | "website";
  updated?: string;
  bothLocales?: boolean; // tools exist in both languages without a content file
}): Metadata {
  const { locale, slug, title, description } = opts;
  const other: Locale = locale === "en" ? "ar" : "en";
  const otherExists = opts.bothLocales || hasPage(other, slug);
  const self = `${SITE_URL}${pathFor(locale, slug) === "/" ? "" : pathFor(locale, slug)}`;
  const languages: Record<string, string> = { [locale]: self };
  if (otherExists) {
    const o = `${SITE_URL}${pathFor(other, slug) === "/" ? "" : pathFor(other, slug)}`;
    languages[other] = o;
  }
  languages["x-default"] = languages.en ?? self;
  const og = `${SITE_URL}/og?title=${encodeURIComponent(opts.ogTitle || title)}`;
  return {
    title,
    description,
    alternates: { canonical: self, languages },
    openGraph: {
      title,
      description,
      url: self,
      siteName: locale === "ar" ? SITE_NAME_AR : SITE_NAME,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: opts.type || "article",
      images: [{ url: og, width: 1200, height: 630 }],
      ...(opts.updated ? { modifiedTime: opts.updated } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}
