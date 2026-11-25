import { notFound } from "next/navigation";
import HomeView from "@/components/HomeView";
import { getPage, ogTitleFor } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = getPage("ar", "");
  if (!p) return {};
  return pageMetadata({ locale: "ar", slug: "", title: p.title, description: p.description, ogTitle: ogTitleFor(p), type: "website", updated: p.updated });
}

export default function Home() {
  const p = getPage("ar", "");
  if (!p) notFound();
  return <HomeView page={p} />;
}
