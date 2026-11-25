// Site-wide settings. SITE_NAME is a placeholder until the domain is bought.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");
/** Search engines may index the site only once the real domain is set in NEXT_PUBLIC_SITE_URL.
 *  Until then (e.g. on the *.vercel.app preview) every page is noindex. */
export const INDEXABLE = !!process.env.NEXT_PUBLIC_SITE_URL && !/example\.com/.test(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME = "Nol Balance Guide";
export const SITE_NAME_AR = "دليل رصيد نول";
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const CONTACT_EMAIL = "hello@example.com"; // placeholder

export type Locale = "en" | "ar";
export const LOCALES: Locale[] = ["en", "ar"];

/** Path prefix for a locale: "" for English, "/ar" for Arabic. */
export const prefix = (l: Locale) => (l === "ar" ? "/ar" : "");

/** Build a site path for a slug in a locale. slug "" = home. */
export function pathFor(l: Locale, slug: string) {
  const p = prefix(l);
  if (!slug) return p || "/";
  return `${p}/${slug}`;
}

// Official links. Every "check balance" button points here — the site never asks for card numbers.
export const OFFICIAL = {
  rtaNol: "https://www.rta.ae/wps/portal/rta/ae/public-transport/nol",
  rtaNolHow: "https://www.rta.ae/wps/portal/rta/ae/public-transport/nol/nol-how",
  rtaCards: "https://www.rta.ae/wps/portal/rta/ae/public-transport/choosenolcard",
  rtaFares: "https://www.rta.ae/wps/portal/rta/ae/public-transport/Nol-Fares",
  nolPortal: "https://nol.rta.ae/",
  nolTopUp: "https://nol.rta.ae/manage-nol-card/top-up-nol-card",
  nolPersonalize: "https://nol.rta.ae/manage-nol-card/personalize-card",
  nolPayApp: "https://www.rta.ae/wps/portal/rta/ae/home/smart-apps/app-details/nol+pay/nol-pay",
  rtaPhone: "800 9090",
};

// UI strings. Article text lives in /content.
export const T = {
  en: {
    siteName: SITE_NAME,
    home: "Home",
    nav: [
      { href: "/", label: "Balance Check", icon: "search" },
      { href: "/nol-card-recharge", label: "Recharge", icon: "wallet" },
      { href: "/nol-card-types", label: "Card Types", icon: "card" },
      { href: "/nol-card-fares", label: "Fares", icon: "train" },
      { href: "/tools/fare-calculator", label: "Fare Calculator", icon: "calc" },
      { href: "/lost-nol-card", label: "Lost Card", icon: "alert" },
    ],
    langSwitch: "العربية",
    updated: "Updated",
    readTime: "min read",
    onThisPage: "On this page",
    faq: "Frequently asked questions",
    related: "Related guides",
    allGuides: "All guides",
    checkOfficial: "Check balance on the official RTA site",
    officialNote: "Opens rta.ae / nol.rta.ae. We never ask for your card number.",
    disclaimerShort:
      "Independent guide. Not affiliated with, endorsed by or operated by RTA Dubai or nol. Fares and rules can change — always confirm on rta.ae.",
    footerAbout: "Plain-English guides to Dubai's nol card: balance, recharge, fares and refunds.",
    sources: "Sources",
    tools: "Tools",
    legal: "Site",
    notFound: "Page not found",
    notFoundBody: "That page doesn't exist. Try one of these guides instead.",
  },
  ar: {
    siteName: SITE_NAME_AR,
    home: "الرئيسية",
    nav: [
      { href: "/ar", label: "فحص الرصيد", icon: "search" },
      { href: "/ar/nol-card-recharge", label: "شحن البطاقة", icon: "wallet" },
      { href: "/ar/nol-card-types", label: "أنواع البطاقات", icon: "card" },
      { href: "/ar/nol-card-fares", label: "الأجرة", icon: "train" },
      { href: "/ar/tools/fare-calculator", label: "حاسبة الأجرة", icon: "calc" },
      { href: "/ar/lost-nol-card", label: "فقدان البطاقة", icon: "alert" },
    ],
    langSwitch: "English",
    updated: "آخر تحديث",
    readTime: "دقائق قراءة",
    onThisPage: "في هذه الصفحة",
    faq: "الأسئلة الشائعة",
    related: "أدلة ذات صلة",
    allGuides: "كل الأدلة",
    checkOfficial: "افحص الرصيد على موقع هيئة الطرق الرسمي",
    officialNote: "ينقلك إلى rta.ae أو nol.rta.ae. لا نطلب رقم بطاقتك أبداً.",
    disclaimerShort:
      "دليل مستقل. لا يتبع هيئة الطرق والمواصلات في دبي ولا بطاقة نول، ولا تديره أي منهما. قد تتغير الأسعار والقواعد، فتأكد دائماً من rta.ae.",
    footerAbout: "أدلة مبسطة عن بطاقة نول في دبي: الرصيد والشحن والأجرة والاسترداد.",
    sources: "المصادر",
    tools: "أدوات",
    legal: "الموقع",
    notFound: "الصفحة غير موجودة",
    notFoundBody: "هذه الصفحة غير موجودة. جرّب أحد هذه الأدلة.",
  },
} as const;

export type Dict = (typeof T)["en"] | (typeof T)["ar"];
