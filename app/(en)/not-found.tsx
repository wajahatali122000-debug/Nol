import Link from "next/link";
import { listPages } from "@/lib/content";
import { T, pathFor } from "@/lib/site";

export default function NotFound() {
  const t = T.en;
  const pages = listPages("en").filter((p) => p.category !== "legal").slice(0, 8);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-brand">{t.notFound}</h1>
      <p className="mt-3 text-muted">{t.notFoundBody}</p>
      <ul className="mt-6 space-y-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={pathFor("en", p.slug)} className="font-semibold text-brand-600 underline underline-offset-2">
              {p.h1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
