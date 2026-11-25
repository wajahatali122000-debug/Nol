import type { MetadataRoute } from "next";
import { listPages } from "@/lib/content";
import { SITE_URL, pathFor } from "@/lib/site";

const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const en = listPages("en");
  const arSlugs = new Set(listPages("ar").map((p) => p.slug));
  const entries: MetadataRoute.Sitemap = [];

  for (const p of en) {
    const languages: Record<string, string> = { en: abs(pathFor("en", p.slug)) };
    if (arSlugs.has(p.slug)) languages.ar = abs(pathFor("ar", p.slug));
    entries.push({
      url: abs(pathFor("en", p.slug)),
      lastModified: p.updated,
      changeFrequency: p.slug === "" ? "weekly" : "monthly",
      priority: p.slug === "" ? 1 : p.category === "legal" ? 0.2 : 0.7,
      alternates: { languages },
    });
  }
  for (const p of listPages("ar")) {
    const languages: Record<string, string> = { ar: abs(pathFor("ar", p.slug)) };
    if (en.some((e) => e.slug === p.slug)) languages.en = abs(pathFor("en", p.slug));
    entries.push({
      url: abs(pathFor("ar", p.slug)),
      lastModified: p.updated,
      changeFrequency: "monthly",
      priority: p.slug === "" ? 0.9 : p.category === "legal" ? 0.2 : 0.6,
      alternates: { languages },
    });
  }
  for (const tool of ["fare-calculator", "which-nol-card"]) {
    const languages = { en: abs(pathFor("en", `tools/${tool}`)), ar: abs(pathFor("ar", `tools/${tool}`)) };
    entries.push({ url: languages.en, changeFrequency: "monthly", priority: 0.8, alternates: { languages } });
    entries.push({ url: languages.ar, changeFrequency: "monthly", priority: 0.6, alternates: { languages } });
  }
  return entries;
}
