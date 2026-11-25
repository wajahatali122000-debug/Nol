import { notFound } from "next/navigation";
import ArticleView from "@/components/ArticleView";
import { contentSlugs, getPage, ogTitleFor } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return contentSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPage("en", slug);
  if (!p) return {};
  return pageMetadata({ locale: "en", slug, title: p.title, description: p.description, ogTitle: ogTitleFor(p), updated: p.updated });
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPage("en", slug);
  if (!p) notFound();
  return <ArticleView page={p} />;
}
