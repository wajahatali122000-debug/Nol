import Breadcrumbs from "./Breadcrumbs";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import { getPage } from "@/lib/content";
import { SITE_URL, T, pathFor, type Locale } from "@/lib/site";

/** Tool page: H1 + intro from content/<locale>/_tools/<tool>.md, the tool, then the rest of the text. */
export default function ToolView({ locale, tool, children }: { locale: Locale; tool: string; children: React.ReactNode }) {
  const t = T[locale];
  const page = getPage(locale, `_tools/${tool}`);
  if (!page) return null;
  const [intro, ...rest] = page.parts;
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6">
      <Breadcrumbs
        items={[
          { name: t.home, href: pathFor(locale, "") },
          { name: page.h1, href: pathFor(locale, `tools/${tool}`) },
        ]}
      />
      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-brand sm:text-4xl">{page.h1}</h1>
      <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: intro?.html || "" }} />
      <div className="mt-6">{children}</div>
      {rest.length > 0 && <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: rest.map((r) => r.html).join("") }} />}
      <Faq items={page.faq} title={t.faq} />
      <p className="mt-8 rounded-xl bg-accent-50 p-4 text-sm leading-relaxed text-ink/80">{t.disclaimerShort}</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: page.h1,
          description: page.description,
          url: `${SITE_URL}${pathFor(locale, `tools/${tool}`)}`,
          applicationCategory: "TravelApplication",
          operatingSystem: "Any",
          inLanguage: locale,
          offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
        }}
      />
      {page.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </div>
  );
}
