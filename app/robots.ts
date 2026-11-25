import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Before the real domain is set, pages carry a noindex tag (see layouts); crawling stays
  // allowed so search engines can see it. The sitemap is only advertised once indexable.
  return INDEXABLE
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/og"] }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }
    : { rules: { userAgent: "*", allow: "/" } };
}
