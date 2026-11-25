import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Locale } from "./site";

export type Faq = { q: string; a: string };
export type Source = { label: string; url: string };
export type TocItem = { id: string; text: string };
export type KeyFact = { label: string; value: string };

export type Category = "balance" | "recharge" | "cards" | "fares" | "help" | "news" | "legal";

export type PageMeta = {
  slug: string; // "" = home
  locale: Locale;
  title: string; // <title>
  h1: string;
  description: string;
  updated: string; // YYYY-MM-DD
  category: Category;
  order: number;
  faq: Faq[];
  sources: Source[];
  related: string[];
  keyfacts: KeyFact[];
  words: number;
};

export type Page = PageMeta & {
  /** HTML split into chunks; between chunks the template inserts a block ("cta" | "ad"). */
  parts: { html: string; after?: "cta" | "ad" | "split" }[];
  toc: TocItem[];
};

const ROOT = path.join(process.cwd(), "content");

function fileFor(locale: Locale, slug: string) {
  return path.join(ROOT, locale, `${slug || "index"}.md`);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function render(md: string) {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        let id = slugify(text) || `s-${used.size + 1}`;
        while (used.has(id)) id += "-2";
        used.add(id);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener nofollow">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
      table(token) {
        const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(md) as string;
  return { html, toc };
}

function splitParts(html: string): Page["parts"] {
  const re = /<!--\s*(cta|ad|split)\s*-->/g;
  const parts: Page["parts"] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    parts.push({ html: html.slice(last, m.index), after: m[1] as "cta" | "ad" | "split" });
    last = m.index + m[0].length;
  }
  parts.push({ html: html.slice(last) });
  return parts;
}

function countWords(md: string) {
  return md.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function toMeta(locale: Locale, slug: string, data: Record<string, unknown>, body: string): PageMeta {
  const d = data as Omit<Partial<PageMeta>, "updated"> & { updated?: unknown };
  const updated =
    d.updated instanceof Date ? d.updated.toISOString().slice(0, 10) : String(d.updated || "2026-11-25");
  return {
    slug,
    locale,
    title: String(d.title || ""),
    h1: String(d.h1 || d.title || ""),
    description: String(d.description || ""),
    updated,
    category: (d.category as Category) || "help",
    order: Number(d.order ?? 100),
    faq: (d.faq as Faq[]) || [],
    sources: (d.sources as Source[]) || [],
    related: (d.related as string[]) || [],
    keyfacts: ((d as { keyfacts?: KeyFact[] }).keyfacts || []).map((k) => ({ label: String(k.label), value: String(k.value) })),
    words: countWords(body),
  };
}

const cache = new Map<string, Page | null>();

export function getPage(locale: Locale, slug: string): Page | null {
  const key = `${locale}:${slug}`;
  if (cache.has(key)) return cache.get(key)!;
  const file = fileFor(locale, slug);
  if (!fs.existsSync(file)) {
    cache.set(key, null);
    return null;
  }
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const { html, toc } = render(content);
  const page: Page = { ...toMeta(locale, slug, data, content), parts: splitParts(html), toc };
  cache.set(key, page);
  return page;
}

/** All pages of a locale (meta only), sorted by category order then `order`. */
export function listPages(locale: Locale): PageMeta[] {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f === "index.md" ? "" : f.replace(/\.md$/, "");
      return getPage(locale, slug)!;
    })
    .map(({ parts: _p, toc: _t, ...meta }) => meta)
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.order - b.order);
}

export const CATEGORY_ORDER: Category[] = ["balance", "recharge", "cards", "fares", "help", "news", "legal"];

export const CATEGORY_LABEL: Record<Locale, Record<Category, string>> = {
  en: {
    balance: "Balance",
    recharge: "Recharge & top up",
    cards: "Card types",
    fares: "Fares & travel",
    help: "Help & problems",
    news: "News",
    legal: "About this site",
  },
  ar: {
    balance: "الرصيد",
    recharge: "الشحن",
    cards: "أنواع البطاقات",
    fares: "الأجرة والتنقل",
    help: "مساعدة",
    news: "أخبار",
    legal: "عن الموقع",
  },
};

/** Does the other language have this page? Used for hreflang + language switch. */
export function hasPage(locale: Locale, slug: string) {
  return fs.existsSync(fileFor(locale, slug));
}

/** Content slugs for generateStaticParams (excludes home). */
export function contentSlugs(locale: Locale) {
  return listPages(locale)
    .filter((p) => p.slug)
    .map((p) => p.slug);
}

export function readTime(words: number) {
  return Math.max(1, Math.round(words / 220));
}

/** English title for the OG image (the renderer has no Arabic font). */
export function ogTitleFor(meta: Pick<PageMeta, "locale" | "slug" | "title">) {
  if (meta.locale === "en") return meta.title;
  return getPage("en", meta.slug)?.title || "Nol Card Guide";
}

/** Every URL path of a locale, used by the language switch. */
export function localePaths(locale: Locale) {
  const pre = locale === "ar" ? "/ar" : "";
  const pages = listPages(locale).map((p) => (p.slug ? `${pre}/${p.slug}` : pre || "/"));
  return [...pages, `${pre}/tools/fare-calculator`, `${pre}/tools/which-nol-card`];
}
