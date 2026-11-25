// Illustrated nol cards — our own artwork in each card type's colour.
// Deliberately NOT RTA's card design: no RTA/nol logos, no copied artwork.
import type { Locale } from "@/lib/site";

export type CardKind = "silver" | "gold" | "blue" | "red" | "travel";

const STYLE: Record<CardKind, { bg: string; ink: string; sub: string; shine: string }> = {
  silver: { bg: "linear-gradient(135deg,#f4f6f8 0%,#c9ced4 45%,#e9ecef 60%,#9ea6ae 100%)", ink: "#1f2a33", sub: "#4b5661", shine: "rgba(255,255,255,.55)" },
  gold: { bg: "linear-gradient(135deg,#fff1c1 0%,#e8bd55 40%,#f7dc8c 58%,#b8862a 100%)", ink: "#3d2a05", sub: "#6b4c12", shine: "rgba(255,255,255,.45)" },
  blue: { bg: "linear-gradient(135deg,#5fa8e8 0%,#2369b3 50%,#163f7a 100%)", ink: "#ffffff", sub: "rgba(255,255,255,.8)", shine: "rgba(255,255,255,.25)" },
  red: { bg: "linear-gradient(135deg,#f26b5b 0%,#d63a2f 55%,#a8231c 100%)", ink: "#ffffff", sub: "rgba(255,255,255,.85)", shine: "rgba(255,255,255,.2)" },
  travel: { bg: "linear-gradient(135deg,#43c6b4 0%,#1f8f99 50%,#155e75 100%)", ink: "#ffffff", sub: "rgba(255,255,255,.85)", shine: "rgba(255,255,255,.25)" },
};

export const CARD_NAME: Record<Locale, Record<CardKind, { name: string; sub: string }>> = {
  en: {
    silver: { name: "Silver", sub: "nol card" },
    gold: { name: "Gold", sub: "nol card" },
    blue: { name: "Personal", sub: "Blue nol card" },
    red: { name: "Red ticket", sub: "paper ticket" },
    travel: { name: "Travel", sub: "nol card" },
  },
  ar: {
    silver: { name: "الفضية", sub: "بطاقة نول" },
    gold: { name: "الذهبية", sub: "بطاقة نول" },
    blue: { name: "الشخصية", sub: "بطاقة نول الزرقاء" },
    red: { name: "التذكرة الحمراء", sub: "تذكرة ورقية" },
    travel: { name: "نول للسفر", sub: "بطاقة نول" },
  },
};

/** Front of a card. Width comes from the parent (className). */
export function CardFront({ kind, locale, className = "w-64" }: { kind: CardKind; locale: Locale; className?: string }) {
  const s = STYLE[kind];
  const n = CARD_NAME[locale][kind];
  const paper = kind === "red";
  return (
    <div
      role="img"
      aria-label={`${n.name} ${n.sub} (${locale === "ar" ? "رسم توضيحي" : "illustration"})`}
      className={`relative aspect-[1.586] overflow-hidden ${paper ? "rounded-lg" : "rounded-2xl"} shadow-xl ring-1 ring-black/10 ${className}`}
      style={{ background: s.bg, containerType: "inline-size" }}
    >
      {/* sheen */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, transparent 30%, ${s.shine} 45%, transparent 60%)` }} />
      {/* wave pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 320 202" preserveAspectRatio="none" aria-hidden>
        <path d="M0 150 C 80 110, 160 190, 320 120 L320 202 L0 202 Z" fill={s.ink} opacity=".25" />
        <path d="M0 170 C 90 140, 200 210, 320 150" stroke={s.ink} strokeWidth="1.5" fill="none" opacity=".4" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-[7cqw]" style={{ color: s.ink }}>
        <div className="flex items-start justify-between">
          {/* contactless mark */}
          <svg viewBox="0 0 24 24" className="h-[11cqw] w-[11cqw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M8 8.5a5 5 0 0 1 0 7M11.5 6a9 9 0 0 1 0 12M15 3.5a13 13 0 0 1 0 17" />
          </svg>
          {!paper && <span className="h-[9cqw] w-[13cqw] rounded-[1.5cqw] bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-90 ring-1 ring-black/10" />}
        </div>
        <div>
          <p className="text-[11cqw] font-extrabold leading-none tracking-tight">{n.name}</p>
          <p className="mt-[1.5cqw] text-[5.2cqw] font-semibold uppercase tracking-wider" style={{ color: s.sub }}>
            {n.sub}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Back of a card with the 10-digit tag ID highlighted. */
export function CardBack({ label, className = "w-72" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative aspect-[1.586] overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-200 shadow-2xl ring-1 ring-black/10 ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <div className="mt-[7cqw] h-[11cqw] w-full bg-slate-800/85" />
      <div className="space-y-[2.5cqw] px-[7cqw] pt-[6cqw]">
        <div className="h-[2.5cqw] w-3/4 rounded bg-slate-300" />
        <div className="h-[2.5cqw] w-1/2 rounded bg-slate-300" />
      </div>
      <div className="absolute bottom-[7cqw] start-[7cqw]" dir="ltr">
        <span className="inline-block rounded-[2cqw] bg-accent px-[3cqw] py-[1.8cqw] font-mono text-[6.5cqw] font-bold tracking-[0.2em] text-brand ring-[1.5cqw] ring-accent/40">
          1234 567 890
        </span>
      </div>
    </div>
  );
}

/** Fan of several card fronts, e.g. for hero and card-type pages. */
export function CardFan({ kinds, locale, className = "" }: { kinds: CardKind[]; locale: Locale; className?: string }) {
  const mid = (kinds.length - 1) / 2;
  return (
    <div className={`relative mx-auto aspect-[1.75] w-full max-w-md ${className}`} aria-hidden>
      {kinds.map((k, i) => {
        const off = i - mid;
        return (
          <div
            key={k}
            className="absolute left-1/2 top-1/2 w-[62%]"
            style={{
              transform: `translate(calc(-50% + ${off * 22}%), calc(-50% + ${Math.abs(off) * 6}%)) rotate(${off * 8}deg)`,
              zIndex: 10 - Math.abs(Math.round(off)),
            }}
          >
            <CardFront kind={k} locale={locale} className="w-full" />
          </div>
        );
      })}
    </div>
  );
}

/** Which illustration goes in the header of a page (by slug, same in both languages). */
export const PAGE_ART: Record<string, CardKind[] | "back"> = {
  "nol-silver-card": ["silver"],
  "nol-gold-card": ["gold"],
  "nol-personal-blue-card": ["blue"],
  "nol-red-ticket": ["red"],
  "nol-travel-card": ["travel"],
  "nol-card-types": ["red", "silver", "gold", "blue", "travel"],
  "nol-card-discounts": ["blue"],
  "dubai-metro-gold-class": ["gold"],
  "nol-card-for-tourists": ["red", "silver", "travel"],
  "where-to-buy-nol-card": ["silver", "gold", "blue"],
  "find-nol-card-number": "back",
  "register-nol-card": ["silver", "blue"],
};
