import type { IconName } from "@/components/Icon";
import type { Locale } from "./site";

type Fact = { icon: IconName; label: string; value: string; sub: string; href: string };
type Task = { icon: IconName; label: string; sub: string; href: string };

export const HOME: Record<
  Locale,
  {
    badge: string;
    h1: string;
    lead: string;
    steps: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    safe: string;
    cardBack: string;
    tagLabel: string;
    factsTitle: string;
    factsSub: string;
    facts: Fact[];
    tasksTitle: string;
    tasks: Task[];
    hubTitle: string;
    guideTitle: string;
  }
> = {
  en: {
    badge: "Updated November 2026 · Independent guide",
    h1: "Nol Card Balance Check",
    lead: "See what's left on your nol card in under a minute — no login, no app needed.",
    steps: ["Find the 10-digit tag ID on the back of your card", "Enter it on RTA's nol site", "Your balance shows instantly"],
    ctaPrimary: "Check balance on nol.rta.ae",
    ctaSecondary: "Where's my card number?",
    ctaSecondaryHref: "/find-nol-card-number",
    safe: "We never ask for your card number — the button opens RTA's own site.",
    cardBack: "Back of your card",
    tagLabel: "10-digit tag ID",
    factsTitle: "Key nol facts at a glance",
    factsSub: "From RTA's published prices and fares, checked 25 Nov 2026.",
    facts: [
      { icon: "card", label: "Silver / Gold card", value: "AED 25", sub: "includes AED 19 travel credit", href: "/nol-card-types" },
      { icon: "shield", label: "Personal (Blue) card", value: "AED 70", sub: "includes AED 20 · balance protected", href: "/nol-personal-blue-card" },
      { icon: "ticket", label: "Red ticket", value: "AED 2", sub: "paper · 10 trips or 90 days", href: "/nol-red-ticket" },
      { icon: "train", label: "Silver fare per trip", value: "AED 3 – 7.50", sub: "1 zone · 2 zones · 3+ zones", href: "/nol-card-fares" },
      { icon: "wallet", label: "Max balance", value: "AED 1,000", sub: "AED 5,000 if registered/personal", href: "/nol-card-maximum-balance" },
      { icon: "clock", label: "Online top-up shows in", value: "45 min – 4 h", sub: "then tap at a gate or meter", href: "/nol-balance-not-updated" },
    ],
    tasksTitle: "What do you need to do?",
    tasks: [
      { icon: "wallet", label: "Recharge my card", sub: "App, website, machines", href: "/nol-card-recharge" },
      { icon: "clock", label: "Top-up not showing", sub: "The 45 min – 4 h rule", href: "/nol-balance-not-updated" },
      { icon: "alert", label: "I lost my card", sub: "Block it, get balance back", href: "/lost-nol-card" },
      { icon: "refund", label: "Get a refund", sub: "Cash or transfer", href: "/nol-card-refund" },
      { icon: "card", label: "Which card to buy?", sub: "3-question picker", href: "/tools/which-nol-card" },
      { icon: "calc", label: "Monthly fare cost", sub: "Fare calculator", href: "/tools/fare-calculator" },
      { icon: "parking", label: "Pay for parking", sub: "Tap at RTA meters", href: "/nol-card-parking" },
      { icon: "news", label: "New nol–Jaywan card", sub: "What's confirmed", href: "/nol-jaywan-card" },
    ],
    hubTitle: "Every nol card guide",
    guideTitle: "The full balance check guide",
  },
  ar: {
    badge: "محدّث نوفمبر 2026 · دليل مستقل",
    h1: "فحص رصيد بطاقة نول",
    lead: "اعرف رصيد بطاقة نول في أقل من دقيقة، دون تسجيل دخول ودون تطبيق.",
    steps: ["اعثر على رقم البطاقة المكوّن من 10 أرقام على ظهرها", "أدخله في موقع نول التابع لهيئة الطرق", "يظهر رصيدك فوراً"],
    ctaPrimary: "افحص الرصيد على nol.rta.ae",
    ctaSecondary: "أين رقم بطاقتي؟",
    ctaSecondaryHref: "/ar/find-nol-card-number",
    safe: "لا نطلب رقم بطاقتك أبداً، فالزر يفتح موقع هيئة الطرق نفسه.",
    cardBack: "ظهر البطاقة",
    tagLabel: "رقم البطاقة (10 أرقام)",
    factsTitle: "أهم معلومات نول في لمحة",
    factsSub: "من الأسعار والأجرة المنشورة لدى هيئة الطرق والمواصلات، تم التحقق في 25 نوفمبر 2026.",
    facts: [
      { icon: "card", label: "البطاقة الفضية / الذهبية", value: "25 درهماً", sub: "تشمل 19 درهماً رصيداً", href: "/ar/nol-card-types" },
      { icon: "shield", label: "البطاقة الشخصية (الزرقاء)", value: "70 درهماً", sub: "تشمل 20 درهماً · رصيد محمي", href: "/ar/nol-card-types" },
      { icon: "ticket", label: "التذكرة الحمراء", value: "2 درهم", sub: "ورقية · 10 رحلات أو 90 يوماً", href: "/ar/nol-card-types" },
      { icon: "train", label: "أجرة الرحلة (الفضية)", value: "3 – 7.50 درهم", sub: "منطقة · منطقتان · 3 مناطق فأكثر", href: "/ar/nol-card-fares" },
      { icon: "wallet", label: "الحد الأقصى للرصيد", value: "1,000 درهم", sub: "5,000 درهم للمسجلة/الشخصية", href: "/ar/nol-card-recharge" },
      { icon: "clock", label: "يظهر الشحن الإلكتروني خلال", value: "45 د – 4 س", sub: "ثم مرّر البطاقة على بوابة أو جهاز", href: "/ar/nol-card-recharge" },
    ],
    tasksTitle: "ماذا تريد أن تفعل؟",
    tasks: [
      { icon: "wallet", label: "شحن البطاقة", sub: "التطبيق والموقع والآلات", href: "/ar/nol-card-recharge" },
      { icon: "search", label: "أين رقم البطاقة؟", sub: "الرقم المطلوب للفحص", href: "/ar/find-nol-card-number" },
      { icon: "alert", label: "فقدت بطاقتي", sub: "أوقفها واسترد الرصيد", href: "/ar/lost-nol-card" },
      { icon: "refund", label: "استرداد الرصيد", sub: "نقداً أو بالتحويل", href: "/ar/nol-card-refund" },
      { icon: "card", label: "أي بطاقة أشتري؟", sub: "3 أسئلة فقط", href: "/ar/tools/which-nol-card" },
      { icon: "calc", label: "تكلفة التنقل الشهرية", sub: "حاسبة الأجرة", href: "/ar/tools/fare-calculator" },
      { icon: "spark", label: "الخصومات", sub: "الطلاب وكبار المواطنين", href: "/ar/nol-card-discounts" },
      { icon: "news", label: "بطاقة نول جيوان", sub: "ما المؤكد حتى الآن", href: "/ar/nol-jaywan-card" },
    ],
    hubTitle: "كل أدلة بطاقة نول",
    guideTitle: "الدليل الكامل لفحص الرصيد",
  },
};
