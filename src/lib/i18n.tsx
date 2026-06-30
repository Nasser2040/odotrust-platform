import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "ar" | "en";

const dict = {
  appName: { ar: "موثوق", en: "Mawthooq" },
  tagline: {
    ar: "اعرف تاريخ المركبة قبل الشراء",
    en: "Know the vehicle's history before you buy",
  },
  heroTitle: {
    ar: "اعرف تاريخ المركبة\nقبل الشراء",
    en: "Know the vehicle's history\nbefore you buy",
  },
  signIn: { ar: "تسجيل الدخول", en: "Sign in" },
  signUp: { ar: "إنشاء حساب", en: "Sign up" },
  quickSignup: { ar: "لن يستغرق إنشاء الحساب أكثر من دقيقة.", en: "Creating an account takes less than a minute." },
  confirmPassword: { ar: "تأكيد كلمة المرور", en: "Confirm password" },
  agreeTerms: { ar: "أوافق على الشروط والأحكام", en: "I agree to the terms and conditions" },
  signupSuccess: {
    ar: "تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.",
    en: "Account created successfully. You can now sign in.",
  },
  signOut: { ar: "تسجيل الخروج", en: "Sign out" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  password: { ar: "كلمة المرور", en: "Password" },
  dashboard: { ar: "اللوحة", en: "Dashboard" },
  report: { ar: "التقرير", en: "Report" },
  getStarted: { ar: "ابدأ الآن", en: "Get started" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  viewReport: { ar: "عرض التقرير", en: "View report" },
  summary: { ar: "الملخص", en: "Summary" },
  back: { ar: "رجوع", en: "Back" },
  loading: { ar: "جاري التحميل…", en: "Loading…" },
  features: {
    ar: "بيانات موثوقة • تقرير شامل • قرار شراء بثقة",
    en: "Trusted data • Comprehensive report • Confident purchase",
  },
  heroCtaSub: {
    ar: "اعرف تاريخ المركبة قبل الشراء من خلال تقرير شامل يعتمد على بيانات موثوقة من مصادر رسمية.",
    en: "Know the vehicle's history before you buy with a comprehensive report based on trusted data from official sources.",
  },
  heroTagline: {
    ar: "بيانات رسمية • تقرير شامل • قرار شراء بثقة",
    en: "Official data • Comprehensive report • Confident purchase",
  },
  inspectVehicle: { ar: "فحص المركبة", en: "Vehicle inspection" },
  vehicleNumber: { ar: "رقم المركبة", en: "Vehicle number" },
  vehicleNumberDescription: {
    ar: "أدخل الرقم التسلسلي أو رقم الشاصي (VIN) لبدء فحص المركبة.",
    en: "Enter the serial number or VIN to start the vehicle inspection.",
  },
  vehicleNumberHint: {
    ar: "الرقم التسلسلي أسرع وأسهل، ويمكن استخدام رقم الشاصي عند الحاجة.",
    en: "The serial number is faster and easier; the VIN can be used when needed.",
  },
  serialHint: {
    ar: "الخيار الأسرع والأسهل — تجده في رخصة السير.",
    en: "The fastest and easiest option — found on your vehicle license.",
  },
  vinLabel: { ar: "رقم الشاصي (VIN)", en: "VIN" },
  vinHint: {
    ar: "استخدمه إذا لم يتوفر الرقم التسلسلي.",
    en: "Use it if the serial number is not available.",
  },
  eitherRequired: {
    ar: "يرجى إدخال الرقم التسلسلي أو رقم الشاصي.",
    en: "Please enter the serial number or the VIN.",
  },
  demoBadge: { ar: "بيانات تجريبية", en: "Demo data" },
  demoNotice: {
    ar: "هذه نسخة تجريبية، والبيانات المعروضة لغرض العرض فقط وليست بيانات رسمية.",
    en: "This is a demo version. The displayed data is for demonstration only and is not official.",
  },
  optional: { ar: "اختياري", en: "Optional" },
  required: { ar: "مطلوب", en: "Required" },
  serialNumber: { ar: "الرقم التسلسلي", en: "Serial number" },
  vinPlaceholder: { ar: "أدخل رقم المركبة", en: "Enter vehicle number" },
  serialPlaceholder: { ar: "الرقم التسلسلي للمركبة", en: "Vehicle serial number" },
  inspecting: { ar: "جاري التحقق…", en: "Verifying…" },
  recentInspections: { ar: "آخر عمليات الفحص", en: "Recent inspections" },
  noInspections: { ar: "لا توجد عمليات فحص بعد", en: "No inspections yet" },
  card1Title: { ar: "بيانات موثوقة", en: "Trusted data" },
  card1Desc: {
    ar: "بيانات موثوقة من مصادر رسمية لقرار شراء أكثر أمانًا.",
    en: "Trusted data from official sources for a safer purchase.",
  },
  card2Title: { ar: "تقرير شامل", en: "Comprehensive report" },
  card2Desc: {
    ar: "تقرير واضح يشمل سجل العداد، عدد الملاك، الحوادث، والاستخدام السابق.",
    en: "A clear report including odometer history, number of owners, accidents, and previous usage.",
  },
  card3Title: { ar: "قرار شراء بثقة", en: "Buy with confidence" },
  card3Desc: {
    ar: "اتخذ قرار الشراء بثقة وتجنب المفاجآت غير المتوقعة.",
    en: "Make your purchase decision with confidence and avoid unexpected surprises.",
  },
  vehicleReport: { ar: "تقرير فحص المركبة", en: "Vehicle inspection report" },
  reliabilityScore: { ar: "درجة موثوقية المركبة", en: "Vehicle reliability score" },
  recommendation: { ar: "التوصية النهائية", en: "Final recommendation" },
  sectionVehicleInfo: { ar: "معلومات المركبة", en: "Vehicle information" },
  sectionOdoHistory: { ar: "سجل قراءات العداد", en: "Odometer history" },
  sectionPrevOwners: { ar: "عدد المالكين السابقين", en: "Number of previous owners" },
  sectionCurrentOwner: { ar: "حالة المالك الحالي", en: "Current owner status" },
  sectionAccidents: { ar: "سجل الحوادث", en: "Accident history" },
  sectionPrevUsage: { ar: "الاستخدام السابق", en: "Previous usage" },
  sectionColor: { ar: "سجل تغيير اللون", en: "Color change history" },
  sectionFlood: { ar: "أضرار الفيضانات", en: "Flood damage" },
  sectionFire: { ar: "أضرار الحريق", en: "Fire damage" },
  sectionDisaster: { ar: "أضرار الكوارث الطبيعية", en: "Natural disaster damage" },
  sectionImpound: { ar: "سجل الحجز السابق", en: "Previous impound record" },
  usagePersonal: { ar: "شخصي", en: "Personal" },
  usageGovernment: { ar: "حكومي", en: "Government" },
  usageCompany: { ar: "شركة", en: "Company" },
  usageRental: { ar: "تأجير", en: "Rental" },
  status_clean: { ar: "سليم", en: "Clean" },
  status_minor: { ar: "طفيف", en: "Minor" },
  status_major: { ar: "بحاجة لفحص", en: "Needs review" },
  status_unknown: { ar: "غير متوفر", en: "Not available" },
  mockNotice: {
    ar: "البيانات المعروضة توضيحية وسيتم ربطها لاحقاً بالجهات الرسمية.",
    en: "Displayed data is illustrative and will later be linked to official providers.",
  },
  vinInvalid: { ar: "يرجى إدخال رقم شاصي صحيح", en: "Please enter a valid VIN" },
  // Auth extras
  authIntro: {
    ar: "يمكنك إنشاء حسابك وطلب تقرير لأي مركبة، ولا يشترط أن تكون مالك المركبة.",
    en: "Create your account and request a report for any vehicle — you don't need to be the owner.",
  },
  authMethodEmail: { ar: "البريد الإلكتروني", en: "Email" },
  authMethodPhone: { ar: "رقم الجوال", en: "Mobile number" },
  authMethodId: { ar: "رقم الهوية / الإقامة", en: "National ID / Iqama" },
  mockMethodNotice: {
    ar: "هذه الطريقة تجريبية للعرض فقط. استخدم البريد الإلكتروني للدخول الفعلي.",
    en: "This method is a demo only. Use email to actually sign in.",
  },
  fullName: { ar: "الاسم الكامل", en: "Full name" },
  phone: { ar: "رقم الجوال", en: "Mobile number" },
  nationalId: { ar: "رقم الهوية / الإقامة", en: "National ID / Iqama" },
  userType: { ar: "نوع المستخدم", en: "User type" },
  userTypeBuyer: { ar: "مشتري محتمل", en: "Potential buyer" },
  userTypeOwner: { ar: "مالك مركبة", en: "Vehicle owner" },
  userTypeDealer: { ar: "معرض سيارات", en: "Car dealership" },
  userTypeBroker: { ar: "وسيط", en: "Broker" },
  userTypeFinance: { ar: "شركة تمويل", en: "Finance company" },
  userTypeOther: { ar: "أخرى", en: "Other" },
  // Search context clarifier
  inspectVehicleSubject: {
    ar: "أدخل بيانات المركبة التي تريد فحصها، وليست بياناتك الشخصية.",
    en: "Enter the vehicle details you want to inspect, not your personal details.",
  },
  // Payment step
  paymentTitle: { ar: "إصدار تقرير المركبة", en: "Issue vehicle report" },
  paymentFee: { ar: "رسوم التقرير", en: "Report fee" },
  paymentAmount: { ar: "49 ريال", en: "SAR 49" },
  paymentHeadline: { ar: "49 ريال فقط", en: "Only SAR 49" },
  paymentSubtitle: {
    ar: "تقرير شامل للمركبة بدون أي رسوم إضافية.",
    en: "A comprehensive vehicle report with no hidden fees.",
  },
  payAndIssue: { ar: "دفع وإصدار التقرير", en: "Pay and issue report" },
  mockPaymentNotice: {
    ar: "هذه خطوة تجريبية ولا يتم تنفيذ دفع حقيقي الآن.",
    en: "This is a demo step — no real payment is processed.",
  },
  processing: { ar: "جارٍ المعالجة…", en: "Processing…" },
  reportOwnershipDisclaimer: {
    ar: "هذا التقرير صادر بناءً على بيانات المركبة المدخلة من المستخدم، ولا يعني أن المستخدم هو مالك المركبة.",
    en: "This report is generated from the vehicle details entered by the user and does not imply the user is the vehicle owner.",
  },
  navAbout: { ar: "من نحن", en: "About us" },
  navFaq: { ar: "الأسئلة الشائعة", en: "FAQ" },
  navPrivacy: { ar: "سياسة الخصوصية", en: "Privacy policy" },
  navTerms: { ar: "الشروط والأحكام", en: "Terms & conditions" },
  navRefund: { ar: "سياسة الاسترجاع", en: "Refund policy" },
  navContact: { ar: "تواصل معنا", en: "Contact us" },
  comingSoon: {
    ar: "قريباً — هذه الصفحة قيد الإعداد.",
    en: "Coming soon — this page is being prepared.",
  },
  // Payment page
  paymentPageTitle: { ar: "إتمام عملية الدفع", en: "Complete payment" },
  paymentPageSubtitle: {
    ar: "بعد إتمام عملية الدفع سيتم إصدار تقرير موثوق للمركبة مباشرة.",
    en: "After completing the payment, a trusted vehicle report will be issued immediately.",
  },
  reportSummary: { ar: "ملخص التقرير", en: "Report summary" },
  vehicleName: { ar: "اسم المركبة", en: "Vehicle name" },
  vehicleMake: { ar: "الصانع", en: "Make" },
  vehicleModel: { ar: "الموديل", en: "Model" },
  vehicleYear: { ar: "سنة الصنع", en: "Year" },
  plateNumber: { ar: "رقم اللوحة", en: "Plate number" },
  reportNumber: { ar: "رقم التقرير", en: "Report number" },
  requestDate: { ar: "تاريخ الطلب", en: "Request date" },
  priceTitle: { ar: "رسوم التقرير", en: "Report fee" },
  priceAmount: { ar: "49 ريال سعودي", en: "SAR 49" },
  priceIncludes: {
    ar: "يشمل التقرير الكامل للمركبة ولا توجد أي رسوم إضافية.",
    en: "Includes the full vehicle report with no additional fees.",
  },
  whatIncluded: { ar: "ما يشمله التقرير", en: "What's included" },
  includedVehicleData: { ar: "بيانات المركبة", en: "Vehicle data" },
  includedOdoHistory: { ar: "سجل قراءات العداد", en: "Odometer history" },
  includedPrevOwners: { ar: "عدد الملاك السابقين", en: "Previous owners" },
  includedAccidents: { ar: "سجل الحوادث", en: "Accident history" },
  includedPrevUsage: { ar: "نوع الاستخدام السابق", en: "Previous usage type" },
  includedColorChange: { ar: "تغيير اللون", en: "Color change" },
  includedFlood: { ar: "الغرق", en: "Flood" },
  includedFire: { ar: "الحريق", en: "Fire" },
  includedDisaster: { ar: "الأضرار الناتجة عن الكوارث الطبيعية", en: "Natural disaster damage" },
  includedImpound: { ar: "حالة الحجز السابقة إن وجدت", en: "Previous impound status" },
  includedScore: { ar: "مؤشر موثوقية المركبة", en: "Reliability score" },
  includedRecommendation: { ar: "التوصية النهائية", en: "Final recommendation" },
  includedPdf: { ar: "تقرير PDF احترافي", en: "Professional PDF report" },
  paymentMethods: { ar: "طرق الدفع المتاحة", en: "Available payment methods" },
  payNow: { ar: "ادفع 49 ريال وأصدر التقرير", en: "Pay SAR 49 and issue report" },
  demoPaymentNotice: {
    ar: "هذه نسخة تجريبية. لن يتم خصم أي مبلغ حقيقي في هذه المرحلة.",
    en: "This is a demo. No real amount will be charged at this stage.",
  },
  paymentSuccess: { ar: "تمت عملية الدفع بنجاح", en: "Payment successful" },
  preparingReport: { ar: "جاري إعداد تقريرك...", en: "Preparing your report..." },
  redirecting: { ar: "سيتم توجيهك للتقرير الآن...", en: "Redirecting to your report..." },
} as const;

export type Key = keyof typeof dict;

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("odo_lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("odo_lang", l);
  };

  const t = (k: Key) => dict[k][lang];

  return <I18nContext.Provider value={{ lang, dir, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}