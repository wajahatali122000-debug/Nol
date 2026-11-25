import type { Metadata, Viewport } from "next";
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { inter } from "@/lib/fonts";
import { SITE_NAME, SITE_URL, INDEXABLE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  robots: { index: INDEXABLE, follow: INDEXABLE },
};

export const viewport: Viewport = { themeColor: "#0b3d4a" };

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="font-sans antialiased">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
