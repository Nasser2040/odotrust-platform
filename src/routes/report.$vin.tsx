import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Car,
  Gauge,
  Users,
  UserCheck,
  AlertTriangle,
  Briefcase,
  Palette,
  Droplets,
  Flame,
  CloudLightning,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Info,
  Calendar,
  Hash,
  FileText,
  Download,
  Sparkles,
  ClipboardCheck,
  ShieldAlert,
  XCircle,
  Settings2,
  TrendingDown,
  Wrench,
  Scale,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/$vin")({
  component: Report,
  head: ({ params }) => ({
    meta: [
      { title: `موثوق Mawthooq | ${params.vin}` },
      {
        name: "description",
        content: "تقرير فحص شامل للمركبة عبر منصة موثوق (Mawthooq).",
      },
    ],
  }),
});

/** Deterministic mock generator based on VIN — replace with real provider integration. */
function mockFromVin(vin: string) {
  let h = 0;
  for (let i = 0; i < vin.length; i++) h = (h * 31 + vin.charCodeAt(i)) >>> 0;
  const pick = <T,>(arr: T[]) => arr[h % arr.length];
  const score = 55 + (h % 46); // 55..100
  const plateLetters = ["أ ب ج", "ر س ت", "ن م ل", "ع ص ق", "ك ه و"];
  const plateDigits = 1000 + (h % 8999);
  const reportNumber = "MW-" + (100000 + (h % 899999)).toString();
  const accidentsTotal = h % 3;
  const accidentsMajor = accidentsTotal === 2 ? 1 : 0;
  const accidentsMinor = accidentsTotal - accidentsMajor;
  const year = 2016 + (h % 9);
  const currentYear = new Date().getFullYear();
  const ageYears = Math.max(1, currentYear - year);
  // Realistic mileage: 12,000–22,000 km/year based on hash.
  const kmPerYear = 12000 + (h % 10000);
  const totalKm = ageYears * kmPerYear;
  // Build odo history with up to 5 evenly-spaced checkpoints across the car's life.
  const checkpoints = Math.min(5, ageYears);
  const odoHistory = Array.from({ length: checkpoints }).map((_, i) => {
    const ratio = (i + 1) / checkpoints;
    const checkYear = year + Math.round(ageYears * ratio);
    const month = ((h >> (i + 1)) % 12) + 1;
    return {
      date: `${checkYear}-${String(month).padStart(2, "0")}`,
      km: Math.round(totalKm * ratio),
      source: ["الفحص الدوري", "الوكالة", "ورشة معتمدة"][(h + i) % 3],
    };
  });
  // Owners and transfers must be consistent: transfers = prevOwners - 1.
  const prevOwners = 1 + (h % 4);
  const transferDates = Array.from({ length: prevOwners - 1 }).map((_, i) => {
    const span = ageYears / prevOwners;
    const ty = year + Math.round(span * (i + 1));
    const tm = ((h >> (i + 3)) % 12) + 1;
    return `${Math.min(currentYear, ty)}-${String(tm).padStart(2, "0")}`;
  });
  return {
    info: {
      make: pick(["Toyota", "Nissan", "Hyundai", "Lexus", "Ford", "Chevrolet"]),
      model: pick(["Camry", "Patrol", "Sonata", "ES 350", "F-150", "Tahoe"]),
      year,
      origin: pick(["خليجي", "أمريكي", "كوري", "ياباني"]),
      bodyType: pick(["سيدان", "SUV", "بيك أب", "كوبيه"]),
      transmission: pick(["أوتوماتيك", "يدوي"]),
      fuel: pick(["بنزين", "ديزل", "هايبرد"]),
      color: pick(["أبيض لؤلؤي", "أسود ميتاليك", "فضي", "رمادي", "أزرق داكن"]),
      plate: `${plateLetters[h % plateLetters.length]} ${plateDigits}`,
    },
    reportNumber,
    reportDate: new Date().toISOString().slice(0, 10),
    odoHistory,
    prevOwners,
    ownerTransfers: transferDates,
    currentOwner: pick(["personal", "company", "rental", "government"] as const),
    accidents: accidentsTotal,
    accidentsMajor,
    accidentsMinor,
    repairStatus: accidentsTotal === 0
      ? "لا توجد إصلاحات مسجلة"
      : accidentsMajor > 0
        ? "تم الإصلاح في ورشة معتمدة"
        : "إصلاح طفيف – تجميلي",
    prevUsage: pick(["personal", "government", "company", "rental"] as const),
    colorChanges: h % 2,
    flood: pick(["clean", "clean", "clean", "minor"] as const),
    fire: pick(["clean", "clean", "clean", "unknown"] as const),
    disaster: pick(["clean", "clean", "minor", "unknown"] as const),
    structural: pick(["clean", "clean", "minor"] as const),
    impound: h % 5 === 0 ? 1 : 0,
    financialRestrictions: h % 7 === 0,
    policeRecord: h % 11 === 0,
    score,
  };
}

/** Ensure data is internally consistent so the report never contradicts itself. */
function normaliseForScore<T extends ReturnType<typeof mockFromVin>>(data: T): T {
  if (data.score >= 85) {
    // Excellent vehicles: keep usage personal / company and zero out
    // anomalies that would otherwise contradict the "موصى بالشراء" verdict.
    data.prevUsage = data.prevUsage === "government" || data.prevUsage === "rental"
      ? "personal"
      : data.prevUsage;
    data.currentOwner = data.currentOwner === "government" || data.currentOwner === "rental"
      ? "personal"
      : data.currentOwner;
    data.colorChanges = 0;
    data.flood = "clean";
    data.fire = "clean";
    data.disaster = "clean";
    data.structural = "clean";
    data.impound = 0;
    data.financialRestrictions = false;
    data.policeRecord = false;
  }
  return data;
}

function Report() {
  const { vin } = Route.useParams();
  const { t, dir, lang } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { redirect: `/payment/${vin}` } });
    }
  }, [user, loading, navigate, vin]);

  const data = useMemo(() => normaliseForScore(mockFromVin(vin)), [vin]);
  const serial =
    typeof window !== "undefined"
      ? sessionStorage.getItem(`mawthooq_serial_${vin}`) || ""
      : "";

  const usageLabel = (k: "personal" | "government" | "company" | "rental") =>
    t(
      ("usage" + k.charAt(0).toUpperCase() + k.slice(1)) as
        | "usagePersonal"
        | "usageGovernment"
        | "usageCompany"
        | "usageRental",
    );

  const scoreTone =
    data.score >= 85
      ? { label: lang === "ar" ? "ممتاز" : "Excellent", color: "var(--success)" }
      : data.score >= 70
        ? { label: lang === "ar" ? "جيد" : "Good", color: "var(--primary)" }
        : { label: lang === "ar" ? "متوسط" : "Fair", color: "var(--warning)" };

  const recommendation =
    data.score >= 85
      ? lang === "ar"
        ? "المركبة بحالة موثوقة وملائمة للشراء."
        : "Vehicle is in trustworthy condition and suitable for purchase."
      : data.score >= 70
        ? lang === "ar"
          ? "المركبة بحالة جيدة، يُنصح بفحص ميداني إضافي."
          : "Vehicle is in good condition; an additional in-person inspection is recommended."
        : lang === "ar"
          ? "يُنصح بمراجعة دقيقة قبل اتخاذ قرار الشراء."
          : "A careful review is recommended before deciding to purchase.";

  if (loading || !user) {
    return (
      <div className="min-h-screen" dir={dir}>
        <AppHeader />
        <p className="p-10 text-center text-muted-foreground">جاري التحقق…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={dir}>
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 print:py-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground print:hidden"
          data-no-print
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        {/* Demo notice */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="min-w-0">
            <p className="font-bold">نسخة تجريبية</p>
            <p className="mt-0.5 text-xs opacity-90">
              البيانات الحالية للعرض فقط حتى يتم الربط مع الجهات المعتمدة.
            </p>
          </div>
        </div>

        {/* Ownership disclaimer */}
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{t("reportOwnershipDisclaimer")}</span>
        </div>

        {/* Title */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            تقرير معتمد رقمياً
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">تقرير موثوق</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            التقرير الشامل لموثوقية المركبة
          </p>
        </div>

        {/* Top summary */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)_auto]">
            {/* Vehicle photo placeholder */}
            <div className="relative grid place-items-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 lg:p-8">
              <div className="absolute top-3 start-3 inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
                {t("demoBadge")}
              </div>
              <div className="grid h-32 w-full max-w-[200px] place-items-center rounded-2xl border border-dashed border-primary/30 bg-card/50 text-primary/60">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-xs">صورة المركبة</p>
                </div>
              </div>
            </div>

            {/* Vehicle identity */}
            <div className="border-t border-border p-6 lg:border-s lg:border-t-0 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("vehicleReport")}
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {data.info.make} {data.info.model} · {data.info.year}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
                <SummaryRow icon={Car} label="الصانع" value={data.info.make} />
                <SummaryRow icon={Settings2} label="الموديل" value={data.info.model} />
                <SummaryRow icon={Calendar} label="سنة الصنع" value={String(data.info.year)} />
                <SummaryRow icon={Hash} label="رقم اللوحة" value={data.info.plate} />
                <SummaryRow icon={Hash} label="VIN" value={vin} ltr />
                <SummaryRow
                  icon={Hash}
                  label="الرقم التسلسلي"
                  value={serial || "—"}
                />
                <SummaryRow icon={Calendar} label="تاريخ التقرير" value={data.reportDate} />
                <SummaryRow icon={FileText} label="رقم التقرير" value={data.reportNumber} />
              </div>
            </div>

            {/* Score */}
            <div className="grid place-items-center border-t border-border bg-muted/20 p-6 lg:border-s lg:border-t-0 lg:p-8">
              <ScoreRing score={data.score} label={scoreTone.label} color={scoreTone.color} t={t} />
            </div>
          </div>
        </div>

        {/* Final decision */}
        <FinalDecision score={data.score} />

        {/* Sections grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Section icon={Car} title={t("sectionVehicleInfo")}>
            <DefList
              rows={[
                [lang === "ar" ? "الصانع" : "Make", data.info.make],
                [lang === "ar" ? "الموديل" : "Model", data.info.model],
                [lang === "ar" ? "سنة الصنع" : "Year", String(data.info.year)],
                ["نوع المركبة", data.info.bodyType],
                ["نوع الوقود", data.info.fuel],
                ["ناقل الحركة", data.info.transmission],
                ["بلد المنشأ", data.info.origin],
                ["اللون", data.info.color],
              ]}
            />
          </Section>

          <Section icon={Gauge} title={t("sectionOdoHistory")}>
            <OdometerTimeline rows={data.odoHistory} />
          </Section>

          <Section icon={Users} title="سجل الملكية">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">المالك الحالي</span>
                <Pill tone="info">{usageLabel(data.currentOwner)}</Pill>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">عدد المالكين السابقين</span>
                <span className="font-bold tabular-nums">{data.prevOwners}</span>
              </div>
              <div>
                <p className="mb-1.5 text-muted-foreground">تواريخ نقل الملكية</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.ownerTransfers.length === 0 && (
                    <span className="text-xs text-muted-foreground">لا توجد عمليات نقل ملكية.</span>
                  )}
                  {data.ownerTransfers.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium tabular-nums"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section icon={AlertTriangle} title={t("sectionAccidents")}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat label="إجمالي" value={data.accidents} tone={data.accidents ? "warning" : "success"} />
              <Stat label="جوهرية" value={data.accidentsMajor} tone={data.accidentsMajor ? "danger" : "muted"} />
              <Stat label="بسيطة" value={data.accidentsMinor} tone={data.accidentsMinor ? "warning" : "muted"} />
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-border bg-muted/30 p-2.5 text-xs">
              <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span>{data.repairStatus}</span>
            </div>
          </Section>

          <Section icon={Briefcase} title={t("sectionPrevUsage")}>
            <Pill tone="info">{usageLabel(data.prevUsage)}</Pill>
          </Section>

          <Section icon={ClipboardCheck} title="حالة المركبة">
            <ul className="divide-y divide-border/60 text-sm">
              <ConditionRow icon={Palette} label="تغيير اللون" status={data.colorChanges ? "minor" : "clean"} t={t} />
              <ConditionRow icon={Droplets} label="أضرار الفيضانات" status={data.flood} t={t} />
              <ConditionRow icon={Flame} label="أضرار الحريق" status={data.fire} t={t} />
              <ConditionRow icon={CloudLightning} label="الكوارث الطبيعية" status={data.disaster} t={t} />
              <ConditionRow icon={ShieldAlert} label="أضرار هيكلية" status={data.structural} t={t} />
            </ul>
          </Section>

          <Section icon={Scale} title="الحالة النظامية">
            <ul className="divide-y divide-border/60 text-sm">
              <ConditionRow
                icon={Lock}
                label="حجز سابق"
                status={data.impound ? "minor" : "clean"}
                t={t}
              />
              <ConditionRow
                icon={ShieldAlert}
                label="قيود مالية"
                status={data.financialRestrictions ? "minor" : "clean"}
                t={t}
              />
              <ConditionRow
                icon={ShieldCheck}
                label="سجل مروري"
                status={data.policeRecord ? "minor" : "clean"}
                t={t}
              />
            </ul>
          </Section>
        </div>

        {/* AI Summary */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/70 to-card/70 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-primary shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                ملخص الذكاء الاصطناعي
              </p>
              <p className="mt-2 text-base leading-loose sm:text-lg">{aiSummary(data)}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold">التوصيات</h3>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {recommendations(data).map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 rounded-xl border border-border bg-muted/30 p-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur sm:flex-row sm:p-8 print:hidden" data-no-print>
          <div>
            <p className="text-base font-bold">احفظ نسختك من التقرير</p>
            <p className="mt-1 text-xs text-muted-foreground">
              نسخة PDF احترافية صالحة للمشاركة والطباعة.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => window.print()}
            className="h-12 w-full gradient-primary text-primary-foreground border-0 px-6 text-base font-semibold shadow-glow sm:w-auto"
          >
            <Download className="h-5 w-5" />
            تحميل تقرير PDF
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-10 grid gap-4 rounded-3xl border border-border bg-muted/20 p-6 text-center sm:grid-cols-2 sm:text-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">سعر التقرير</p>
            <p className="mt-1 text-2xl font-black text-primary">49 ريال سعودي</p>
          </div>
          <div className="sm:text-end">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">نوع التقرير</p>
            <p className="mt-1 text-2xl font-black">تقرير شامل</p>
          </div>
          <div className="border-t border-border pt-4 text-xs text-muted-foreground sm:col-span-2">
            © {new Date().getFullYear()} {t("appName")} — {t("vehicleReport")} · {data.reportNumber}
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ---------- small UI helpers ---------- */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition hover:border-primary/30">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DefList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="text-end font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function BigStat({
  value,
  suffix,
  tone,
}: {
  value: number | string;
  suffix?: string;
  tone?: "warning";
}) {
  const color = tone === "warning" ? "var(--warning)" : "var(--foreground)";
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold tabular-nums" style={{ color }}>
        {value}
      </span>
      {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
    </div>
  );
}

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "warning" | "info" | "muted";
}) {
  const styles =
    tone === "success"
      ? "border-success/30 bg-success/10 text-success"
      : tone === "warning"
        ? "border-warning/30 bg-warning/10 text-warning"
        : tone === "info"
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {tone === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

function StatusPill({
  status,
  t,
}: {
  status: "clean" | "minor" | "major" | "unknown";
  t: (k: "status_clean" | "status_minor" | "status_major" | "status_unknown") => string;
}) {
  const tone =
    status === "clean"
      ? "success"
      : status === "minor"
        ? "warning"
        : status === "major"
          ? "warning"
          : "muted";
  return (
    <Pill tone={tone as "success" | "warning" | "info" | "muted"}>
      {t(("status_" + status) as "status_clean" | "status_minor" | "status_major" | "status_unknown")}
    </Pill>
  );
}

function ScoreRing({
  score,
  label,
  color,
  t,
}: {
  score: number;
  label: string;
  color: string;
  t: (k: "reliabilityScore") => string;
}) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${pct * 3.6}deg, color-mix(in oklab, ${color} 15%, transparent) 0)`,
        }}
      >
        <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-card">
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums" style={{ color }}>
              {score}
            </div>
            <div className="text-[10px] text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("reliabilityScore")}
        </p>
        <p className="text-lg font-semibold" style={{ color }}>
          {label}
        </p>
      </div>
    </div>
  );
}

/* ---------- new premium helpers ---------- */

function SummaryRow({
  icon: Icon,
  label,
  value,
  ltr,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p
        className={`mt-0.5 truncate font-semibold ${ltr ? "font-mono tracking-wider" : ""}`}
        dir={ltr ? "ltr" : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function FinalDecision({ score }: { score: number }) {
  const conf =
    score >= 90
      ? {
          tone: "success" as const,
          icon: CheckCircle2,
          title: "✅ موصى بالشراء",
          desc: "المركبة بحالة موثوقة جداً وملائمة للشراء بثقة بعد فحص ميكانيكي تقليدي.",
        }
      : score >= 70
        ? {
            tone: "warning" as const,
            icon: AlertTriangle,
            title: "⚠️ تحتاج إلى فحص إضافي",
            desc: "المركبة بحالة جيدة بشكل عام، يُنصح بفحص ميداني إضافي قبل اتخاذ قرار الشراء.",
          }
        : {
            tone: "danger" as const,
            icon: XCircle,
            title: "❌ لا ينصح بالشراء",
            desc: "تم رصد مؤشرات جوهرية تتطلب مراجعة دقيقة قبل الشراء.",
          };
  const styles =
    conf.tone === "success"
      ? "border-success/40 bg-success/10 text-success"
      : conf.tone === "warning"
        ? "border-warning/40 bg-warning/10 text-warning"
        : "border-destructive/40 bg-destructive/10 text-destructive";
  const Icon = conf.icon;
  return (
    <div className={`mt-6 overflow-hidden rounded-3xl border p-6 backdrop-blur-xl sm:p-8 ${styles}`}>
      <div className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-background/60">
          <Icon className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
            القرار النهائي
          </p>
          <h3 className="mt-1 text-2xl font-black sm:text-3xl">{conf.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{conf.desc}</p>
        </div>
      </div>
    </div>
  );
}

function OdometerTimeline({
  rows,
}: {
  rows: { date: string; km: number; source: string }[];
}) {
  return (
    <ol className="relative space-y-3 ps-5">
      <span className="absolute inset-y-1 start-1.5 w-px bg-border" aria-hidden />
      {rows.map((r, i) => {
        const prev = rows[i - 1];
        const tampered = prev && r.km < prev.km;
        return (
          <li key={r.date} className="relative">
            <span
              className={`absolute -start-[14px] top-1.5 grid h-3 w-3 place-items-center rounded-full ring-2 ring-card ${
                tampered ? "bg-destructive" : "bg-primary"
              }`}
              aria-hidden
            />
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold tabular-nums">{r.date}</p>
                <p className="text-[11px] text-muted-foreground">{r.source}</p>
              </div>
              <p className="text-sm font-bold tabular-nums">
                {r.km.toLocaleString()}{" "}
                <span className="text-[10px] font-normal text-muted-foreground">كم</span>
              </p>
            </div>
            {tampered && (
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                <TrendingDown className="h-3 w-3" />
                احتمال وجود تلاعب في العداد
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "warning" | "danger" | "muted";
}) {
  const styles =
    tone === "success"
      ? "border-success/30 bg-success/5 text-success"
      : tone === "warning"
        ? "border-warning/30 bg-warning/5 text-warning"
        : tone === "danger"
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-border bg-muted/30 text-muted-foreground";
  return (
    <div className={`rounded-xl border p-3 ${styles}`}>
      <p className="text-2xl font-black tabular-nums">{value}</p>
      <p className="mt-0.5 text-[11px] font-medium opacity-80">{label}</p>
    </div>
  );
}

function ConditionRow({
  icon: Icon,
  label,
  status,
  t,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  status: "clean" | "minor" | "major" | "unknown";
  t: (k: "status_clean" | "status_minor" | "status_major" | "status_unknown") => string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{label}</span>
      </div>
      <StatusPill status={status} t={t} />
    </li>
  );
}

function aiSummary(data: ReturnType<typeof mockFromVin>): string {
  const parts: string[] = [];
  parts.push("تمت مراجعة بيانات المركبة عبر منصة موثوق");
  if (data.accidents === 0) parts.push("ولم يتم رصد أي حوادث مسجلة");
  else if (data.accidentsMajor === 0)
    parts.push(`مع رصد ${data.accidentsMinor} حادث بسيط فقط`);
  else parts.push(`مع رصد ${data.accidents} حادث منها ${data.accidentsMajor} جوهري`);
  parts.push("وسجل العداد متسلسل بشكل طبيعي");
  const concerns: string[] = [];
  if (data.flood !== "clean") concerns.push("أثر فيضانات");
  if (data.fire !== "clean") concerns.push("أثر حريق");
  if (data.disaster !== "clean") concerns.push("كوارث طبيعية");
  if (data.structural !== "clean") concerns.push("ملاحظات هيكلية");
  if (data.impound) concerns.push("حجز سابق");
  if (data.financialRestrictions) concerns.push("قيود مالية");
  if (concerns.length) parts.push(`مع وجود ${concerns.join("، ")}`);
  if (data.score >= 90)
    parts.push("وتعتبر المركبة مناسبة للشراء بثقة عالية بعد فحص ميكانيكي اعتيادي.");
  else if (data.score >= 70)
    parts.push("وتعتبر المركبة مناسبة للشراء بعد إجراء فحص ميكانيكي إضافي.");
  else parts.push("ويُنصح بمراجعة دقيقة ومتخصصة قبل اتخاذ قرار الشراء.");
  return parts.join("، ");
}

function recommendations(data: ReturnType<typeof mockFromVin>): string[] {
  const list = [
    "افحص الهيكل لدى ورشة معتمدة.",
    "افحص ناقل الحركة (القير) وتأكد من سلاسة التبديل.",
    "تأكد من سجل الصيانة الدورية لدى الوكالة.",
    "اطلب فحصاً ميكانيكياً مستقلاً قبل إتمام الشراء.",
  ];
  if (data.accidentsMajor > 0) list.unshift("راجع تقارير الإصلاح بعد الحادث الجوهري.");
  if (data.colorChanges > 0) list.push("تأكد من جودة دهان المركبة بعد تغيير اللون.");
  if (data.impound > 0) list.push("تحقق من فك الحجز قبل نقل الملكية.");
  return list.slice(0, 6);
}