import ToolView from "@/components/ToolView";
import FareCalculator from "@/components/FareCalculator";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = getPage("ar", "_tools/fare-calculator")!;
  return pageMetadata({
    locale: "ar",
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
    <ToolView locale="ar" tool="fare-calculator">
      <FareCalculator locale="ar" />
    </ToolView>
  );
}
