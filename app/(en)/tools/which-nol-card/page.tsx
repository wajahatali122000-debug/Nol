import ToolView from "@/components/ToolView";
import CardPicker from "@/components/CardPicker";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = getPage("en", "_tools/which-nol-card")!;
  return pageMetadata({
    locale: "en",
    slug: "tools/which-nol-card",
    title: p.title,
    description: p.description,
    ogTitle: getPage("en", "_tools/which-nol-card")?.title,
    type: "website",
    bothLocales: true,
  });
}

export default function Page() {
  return (
    <ToolView locale="en" tool="which-nol-card">
      <CardPicker locale="en" />
    </ToolView>
  );
}
