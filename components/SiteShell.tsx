import Script from "next/script";
import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import { localePaths } from "@/lib/content";
import { ADSENSE_CLIENT, SITE_NAME, SITE_NAME_AR, SITE_URL, type Locale } from "@/lib/site";

export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const other: Locale = locale === "en" ? "ar" : "en";
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Skip to content
      </a>
      <Header locale={locale} otherPaths={localePaths(other)} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: locale === "ar" ? SITE_NAME_AR : SITE_NAME,
          url: locale === "ar" ? `${SITE_URL}/ar` : SITE_URL,
          inLanguage: locale,
        }}
      />
      {ADSENSE_CLIENT && (
        <Script
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />
      )}
    </>
  );
}
