import ToolView from "@/components/ToolView";
import FareCalculator from "@/components/FareCalculator";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = getPage("en", "_tools/fare-calculator")!;
  return pageMetadata({
    locale: "en",
    slug: "tools/fare-calculator",
    title: p.title,
    description: p.description,
    ogTitle: getPage("en", "_tools/fare-calculator")?.title,
    type: "website",
    bothLocales: true,
  });
}

export default function Page() {
  return (
    <ToolView locale="en" tool="fare-calculator">
      <FareCalculator locale="en" />
    </ToolView>
  );
}
