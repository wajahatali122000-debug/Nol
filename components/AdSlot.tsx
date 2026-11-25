import { ADSENSE_CLIENT } from "@/lib/site";

/**
 * Ad placeholder. Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set,
 * so the site launches clean and passes AdSense review without empty boxes.
 * Using Auto ads, AdSense places units itself; these mark preferred spots.
 */
export default function AdSlot() {
  if (!ADSENSE_CLIENT) return null;
  return <div className="my-8 min-h-[100px]" data-ad-slot-placeholder aria-hidden />;
}
