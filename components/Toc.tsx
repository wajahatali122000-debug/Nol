import type { TocItem } from "@/lib/content";

export default function Toc({ items, title }: { items: TocItem[]; title: string }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label={title} className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">{title}</p>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="text-ink/80 hover:text-brand hover:underline">
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
