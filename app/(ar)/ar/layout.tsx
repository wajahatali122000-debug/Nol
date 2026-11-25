import type { Metadata, Viewport } from "next";
import "../../globals.css";
import SiteShell from "@/components/SiteShell";
import { inter, plexArabic } from "@/lib/fonts";
import { SITE_NAME_AR, SITE_URL, INDEXABLE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME_AR, template: `%s | ${SITE_NAME_AR}` },
  robots: { index: INDEXABLE, follow: INDEXABLE },
};

export const viewport: Viewport = { themeColor: "#0b3d4a" };

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${plexArabic.variable}`}>
      <body className="antialiased">
        <SiteShell locale="ar">{children}</SiteShell>
      </body>
    </html>
  );
}
