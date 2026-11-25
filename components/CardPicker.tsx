"use client";

import { useState } from "react";
import { CARD_PRICES, aed } from "@/lib/fares";
import { pathFor, type Locale } from "@/lib/site";

type Stay = "short" | "long" | "resident";
type Cls = "standard" | "gold";
type Conc = "none" | "student" | "senior" | "pod";
type Pick = "red" | "silver" | "gold" | "personal";

const L = {
  en: {
    q1: "How long will you use Dubai public transport?",
    stay: { short: "A few trips on a short visit", long: "A visit of a week or more", resident: "I live or work in Dubai" },
    q2: "Which class do you want on the Metro and Tram?",
    cls: { standard: "Standard (cheapest)", gold: "Gold Class cabin" },
    q3: "Do any of these apply to you?",
    conc: { none: "None of these", student: "Student", senior: "Senior citizen (60+)", pod: "Person of Determination" },
    result: "Best fit for you",
    cards: {
      red: { name: "Red ticket", why: "Cheapest way to make a handful of trips. Paper ticket, valid 90 days, up to 10 trips." },
      silver: { name: "Silver nol card", why: "The standard reloadable card. Works on Metro, Tram, bus, water bus and RTA parking. Valid 5 years." },
      gold: { name: "Gold nol card", why: "Same as Silver but lets you ride in the Gold Class cabin, at double the standard fare." },
      personal: { name: "Personal (Blue) nol card", why: "Linked to your ID, so the balance can be recovered if the card is lost. Needed for concession fares." },
    },
    price: "Card price",
    incl: "includes",
    credit: "travel credit",
    readMore: "Read the full guide",
    tipResident: "Tip: a Silver card registered online also protects your balance — a cheaper alternative if you don't need concessions.",
  },
  ar: {
    q1: "إلى متى ستستخدم المواصلات العامة في دبي؟",
    stay: { short: "رحلات قليلة في زيارة قصيرة", long: "زيارة أسبوعاً أو أكثر", resident: "أعيش أو أعمل في دبي" },
    q2: "أي درجة تريد في المترو والترام؟",
    cls: { standard: "العادية (الأرخص)", gold: "مقصورة الدرجة الذهبية" },
    q3: "هل ينطبق عليك أي مما يلي؟",
    conc: { none: "لا شيء مما سبق", student: "طالب", senior: "كبير مواطنين (60+)", pod: "من أصحاب الهمم" },
    result: "الأنسب لك",
    cards: {
      red: { name: "التذكرة الحمراء", why: "أرخص طريقة لعدد قليل من الرحلات. تذكرة ورقية صالحة 90 يوماً وحتى 10 رحلات." },
      silver: { name: "بطاقة نول الفضية", why: "البطاقة القابلة للشحن الأكثر استخداماً. تعمل في المترو والترام والحافلات والحافلات المائية ومواقف هيئة الطرق. صالحة 5 سنوات." },
      gold: { name: "بطاقة نول الذهبية", why: "مثل الفضية لكنها تتيح ركوب مقصورة الدرجة الذهبية بضعف الأجرة العادية." },
      personal: { name: "بطاقة نول الشخصية (الزرقاء)", why: "مرتبطة بهويتك، لذا يمكن استرداد الرصيد إذا فُقدت البطاقة. مطلوبة للحصول على الأجرة المخفّضة." },
    },
    price: "سعر البطاقة",
    incl: "يشمل",
    credit: "رصيد للتنقل",
    readMore: "اقرأ الدليل الكامل",
    tipResident: "نصيحة: تسجيل البطاقة الفضية عبر الإنترنت يحمي رصيدك أيضاً، وهو خيار أرخص إن لم تكن بحاجة إلى خصم.",
  },
};

const GUIDE: Record<Pick, string> = {
  red: "nol-red-ticket",
  silver: "nol-silver-card",
  gold: "nol-gold-card",
  personal: "nol-personal-blue-card",
};

function decide(stay: Stay, cls: Cls, conc: Conc): Pick {
  if (conc !== "none") return "personal";
  if (cls === "gold") return "gold";
  if (stay === "short") return "red";
  return "silver";
}

function Choice<T extends string>({
  q,
  value,
  onChange,
  options,
}: {
  q: string;
  value: T;
  onChange: (v: T) => void;
  options: Record<T, string>;
}) {
  return (
    <fieldset>
      <legend className="font-bold">{q}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            aria-pressed={value === k}
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              value === k ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand/40"
            }`}
          >
            {options[k]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function CardPicker({ locale }: { locale: Locale }) {
  const t = L[locale];
  const [stay, setStay] = useState<Stay>("long");
  const [cls, setCls] = useState<Cls>("standard");
  const [conc, setConc] = useState<Conc>("none");
  const pick = decide(stay, cls, conc);
  const c = t.cards[pick];
  const p = CARD_PRICES[pick];

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="space-y-6">
        <Choice q={t.q1} value={stay} onChange={setStay} options={t.stay} />
        <Choice q={t.q2} value={cls} onChange={setCls} options={t.cls} />
        <Choice q={t.q3} value={conc} onChange={setConc} options={t.conc} />
      </div>

      <div className="mt-8 rounded-2xl bg-brand p-5 text-white" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-wider text-accent">{t.result}</p>
        <p className="mt-1 text-2xl font-extrabold">{c.name}</p>
        <p className="mt-2 leading-relaxed text-white/90">{c.why}</p>
        <p className="mt-3 text-sm text-white/85">
          {t.price}: <strong className="text-white">{aed(p.price, locale)}</strong>
          {p.credit > 0 && (
            <>
              {" "}
              ({t.incl} {aed(p.credit, locale)} {t.credit})
            </>
          )}
        </p>
        <a
          href={locale === "ar" ? pathFor("ar", "nol-card-types") : pathFor("en", GUIDE[pick])}
          className="mt-4 inline-block rounded-xl bg-accent px-4 py-2.5 font-bold text-brand hover:brightness-95"
        >
          {t.readMore} {locale === "ar" ? "←" : "→"}
        </a>
      </div>
      {stay === "resident" && conc === "none" && cls === "standard" && (
        <p className="mt-4 text-sm text-ink/80">{t.tipResident}</p>
      )}
    </div>
  );
}
