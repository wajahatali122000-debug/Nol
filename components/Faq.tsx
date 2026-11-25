import type { Faq as FaqItem } from "@/lib/content";

export default function Faq({ items, title }: { items: FaqItem[]; title: string }) {
  if (!items.length) return null;
  return (
    <section className="mt-12" aria-labelledby="faq">
      <h2 id="faq" className="text-2xl font-extrabold text-brand">{title}</h2>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {items.map((f) => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="flex items-start justify-between gap-4 font-bold">
              <span>{f.q}</span>
              <span aria-hidden className="faq-chevron mt-1 shrink-0 text-brand-600 transition">▾</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink/85">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
