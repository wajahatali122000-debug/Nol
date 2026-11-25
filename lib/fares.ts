// Fares from RTA's official fare page (rta.ae → Nol-Fares), checked 25 Nov 2026.
// Change here and every tool + table updates. Keep FARES_CHECKED in step.
export const FARES_CHECKED = "2026-11-25";

export type CardKey = "silver" | "gold" | "red" | "redGold";
export type ZoneKey = "z1" | "z2" | "z3";

export const FARES: Record<CardKey, Record<ZoneKey, number>> = {
  silver: { z1: 3, z2: 5, z3: 7.5 }, // also Blue / Personal card
  gold: { z1: 6, z2: 10, z3: 15 },
  red: { z1: 4, z2: 6, z3: 8.5 },
  redGold: { z1: 8, z2: 12, z3: 17 },
};

export const CARD_PRICES = {
  silver: { price: 25, credit: 19 },
  gold: { price: 25, credit: 19 },
  personal: { price: 70, credit: 20 },
  red: { price: 2, credit: 0 },
  travel: { price: 100, credit: 19 },
};

export const MAX_BALANCE = { anonymous: 1000, personal: 5000 };

export function aed(n: number, locale: "en" | "ar" = "en") {
  const s = n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  return locale === "ar" ? `${s} درهم` : `AED ${s}`;
}
