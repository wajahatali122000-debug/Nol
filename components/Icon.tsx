// Inline stroke icons (no icon library). 24x24 grid, currentColor.
const PATHS: Record<string, string> = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm10 17-5.2-5.2",
  wallet: "M3 7.5A2.5 2.5 0 0 1 5.5 5H19a2 2 0 0 1 2 2v1.5M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5M3 7.5h16a2 2 0 0 1 2 2v0M21 10.5h-4a2 2 0 0 0 0 4h4v-4Z",
  card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 3h18M7 15h4",
  ticket: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V7Zm10-2v12",
  map: "M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4Zm0 0v13.5m6-11v13.5",
  alert: "M12 3 2.5 19.5h19L12 3Zm0 6v5m0 3v.01",
  refund: "M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4M12 8v8m-2.5-2.2c.4.8 1.3 1.2 2.5 1.2 1.4 0 2.5-.7 2.5-1.8 0-2.6-5-1.4-5-4 0-1 1-1.7 2.5-1.7 1.1 0 2 .4 2.4 1.1",
  parking: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 14V7h4a3 3 0 0 1 0 6H9",
  phone: "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 15h2",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
  calc: "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  shield: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  external: "M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  train: "M7 3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm-3 8h16M8 14h.01M16 14h.01M7 21l2-4m8 4-2-4",
  bag: "M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2",
  news: "M4 5h13v14H6a2 2 0 0 1-2-2V5Zm13 4h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5m0-8v.01",
  check: "M5 12.5 10 17 19 7",
};

export type IconName = keyof typeof PATHS | string;

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={PATHS[name] || PATHS.info} />
    </svg>
  );
}

export const CATEGORY_ICON: Record<string, IconName> = {
  balance: "search",
  recharge: "wallet",
  cards: "card",
  fares: "map",
  help: "alert",
  news: "news",
  legal: "info",
};
