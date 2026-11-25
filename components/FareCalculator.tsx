"use client";

import { useMemo, useState } from "react";
import { FARES, aed, type CardKey, type ZoneKey } from "@/lib/fares";
import type { Locale } from "@/lib/site";

const L = {
  en: {
    card: "Card",
    cards: { silver: "Silver / Blue (Personal)", gold: "Gold (Gold Class)", red: "Red ticket", redGold: "Red ticket – Gold Class" },
    zones: "Zones crossed per trip",
    zoneOpts: { z1: "Within 1 zone", z2: "2 adjacent zones", z3: "More than 2 zones" },
    trips: "One-way trips per day",
    days: "Travel days per month",
    perTrip: "Per trip",
    perDay: "Per day",
    perWeek: "Per week (5 days)",
    perMonth: "Per month",
    hint: "Top up at least this much each month to avoid running short.",
    redNote: "A red ticket holds max 10 trips and lasts 90 days — fine for short visits, not daily commuting.",
    note: "Standard fares only. Concession discounts (students, seniors 60+, People of Determination) and any daily caps are not included.",
  },
  ar: {
    card: "البطاقة",
    cards: { silver: "الفضية / الزرقاء (الشخصية)", gold: "الذهبية (الدرجة الذهبية)", red: "التذكرة الحمراء", redGold: "التذكرة الحمراء – الدرجة الذهبية" },
    zones: "عدد المناطق في الرحلة",
    zoneOpts: { z1: "داخل منطقة واحدة", z2: "منطقتان متجاورتان", z3: "أكثر من منطقتين" },
    trips: "عدد الرحلات في اليوم (ذهاب فقط)",
    days: "أيام التنقل في الشهر",
    perTrip: "للرحلة",
    perDay: "في اليوم",
    perWeek: "في الأسبوع (5 أيام)",
    perMonth: "في الشهر",
    hint: "اشحن هذا المبلغ على الأقل كل شهر حتى لا ينفد رصيدك.",
    redNote: "التذكرة الحمراء تتسع لعشر رحلات كحد أقصى وتصلح 90 يوماً، فهي مناسبة للزيارات القصيرة لا للتنقل اليومي.",
    note: "الأجرة العادية فقط. لا تشمل الحسابات خصومات الطلاب وكبار المواطنين (60+) وأصحاب الهمم ولا أي سقف يومي.",
  },
};

function Select<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: Record<T, string>;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-3 font-semibold focus:border-brand focus:outline-none"
      >
        {(Object.keys(options) as T[]).map((k) => (
          <option key={k} value={k}>
            {options[k]}
          </option>
        ))}
      </select>
    </label>
  );
}

function Num({ label, value, onChange, min, max }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-3 font-semibold focus:border-brand focus:outline-none"
      />
    </label>
  );
}

export default function FareCalculator({ locale }: { locale: Locale }) {
  const t = L[locale];
  const [card, setCard] = useState<CardKey>("silver");
  const [zone, setZone] = useState<ZoneKey>("z2");
  const [trips, setTrips] = useState(2);
  const [days, setDays] = useState(22);

  const r = useMemo(() => {
    const perTrip = FARES[card][zone];
    const perDay = perTrip * trips;
    return { perTrip, perDay, perWeek: perDay * 5, perMonth: perDay * days };
  }, [card, zone, trips, days]);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={t.card} value={card} onChange={setCard} options={t.cards} />
        <Select label={t.zones} value={zone} onChange={setZone} options={t.zoneOpts} />
        <Num label={t.trips} value={trips} onChange={setTrips} min={1} max={10} />
        <Num label={t.days} value={days} onChange={setDays} min={1} max={31} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
        {[
          [t.perTrip, r.perTrip],
          [t.perDay, r.perDay],
          [t.perWeek, r.perWeek],
          [t.perMonth, r.perMonth],
        ].map(([label, v], i) => (
          <div key={i} className={`rounded-xl p-4 ${i === 3 ? "bg-brand text-white" : "bg-brand-50"}`}>
            <p className={`text-xs font-bold uppercase ${i === 3 ? "text-white/80" : "text-muted"}`}>{label}</p>
            <p className="mt-1 text-xl font-extrabold">{aed(v as number, locale)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink/80">{t.hint}</p>
      {(card === "red" || card === "redGold") && <p className="mt-2 rounded-lg bg-accent-50 p-3 text-sm">{t.redNote}</p>}
      <p className="mt-3 text-xs text-muted">{t.note}</p>
    </div>
  );
}
