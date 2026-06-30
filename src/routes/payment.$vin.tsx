import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Car,
  Hash,
  Calendar,
  FileText,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/payment/$vin")({
  component: PaymentPage,
  head: ({ params }) => ({
    meta: [
      { title: `إتمام الدفع | موثوق Mawthooq | ${params.vin}` },
      {
        name: "description",
        content: "إتمام عملية الدفع وإصدار تقرير موثوق للمركبة.",
      },
    ],
  }),
});

/** Deterministic mock generator for the payment summary card. */
function mockFromVin(vin: string) {
  let h = 0;
  for (let i = 0; i < vin.length; i++) h = (h * 31 + vin.charCodeAt(i)) >>> 0;
  const pick = <T,>(arr: T[]) => arr[h % arr.length];
  const plateLetters = ["أ ب ج", "ر س ت", "ن م ل", "ع ص ق", "ك ه و"];
  const plateDigits = 1000 + (h % 8999);
  return {
    make: pick(["Toyota", "Nissan", "Hyundai", "Lexus", "Ford", "Chevrolet"]),
    model: pick(["Camry", "Patrol", "Sonata", "ES 350", "F-150", "Tahoe"]),
    year: 2016 + (h % 9),
    plate: `${plateLetters[h % plateLetters.length]} ${plateDigits}`,
    reportNumber: "MW-" + (100000 + (h % 899999)).toString(),
    requestDate: new Date().toISOString().slice(0, 10),
  };
}

const includedItems: (
  | "includedVehicleData"
  | "includedOdoHistory"
  | "includedPrevOwners"
  | "includedAccidents"
  | "includedPrevUsage"
  | "includedColorChange"
  | "includedFlood"
  | "includedFire"
  | "includedDisaster"
  | "includedImpound"
  | "includedScore"
  | "includedRecommendation"
  | "includedPdf"
)[] = [
  "includedVehicleData",
  "includedOdoHistory",
  "includedPrevOwners",
  "includedAccidents",
  "includedPrevUsage",
  "includedColorChange",
  "includedFlood",
  "includedFire",
  "includedDisaster",
  "includedImpound",
  "includedScore",
  "includedRecommendation",
  "includedPdf",
];

function PaymentPage() {
  const { vin } = Route.useParams();
  const { t, dir } = useI18n();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { redirect: `/payment/${vin}` } });
    }
  }, [user, loading, navigate, vin]);

  const data = useMemo(() => mockFromVin(vin), [vin]);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (loading || !user) {
    return (
      <div className="min-h-screen" dir={dir}>
        <AppHeader />
        <p className="p-10 text-center text-muted-foreground">جاري التحقق…</p>
      </div>
    );
  }

  const serial =
    typeof window !== "undefined"
      ? sessionStorage.getItem(`mawthooq_serial_${vin}`) || ""
      : "";
  const actualVin =
    typeof window !== "undefined"
      ? sessionStorage.getItem(`mawthooq_vin_${vin}`) || ""
      : "";

  function handlePay() {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/report/$vin", params: { vin } });
      }, 1800);
    }, 1400);
  }

  return (
    <div className="min-h-screen" dir={dir}>
      <AppHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        {/* Header */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t("vehicleReport")}
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {t("paymentPageTitle")}
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("paymentPageSubtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left column: summary + what's included */}
          <div className="space-y-6">
            {/* Report summary card */}
            <section className="overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl shadow-glow">
              <div className="grid gap-0 md:grid-cols-[200px_1fr]">
                {/* Vehicle photo placeholder */}
                <div className="relative grid place-items-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6">
                  <div className="absolute top-3 start-3 inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
                    {t("demoBadge")}
                  </div>
                  <div className="grid h-28 w-28 place-items-center rounded-2xl border border-dashed border-primary/30 bg-card/50 text-primary/60">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-8 w-8" />
                      <p className="mt-1 text-[10px]">صورة المركبة</p>
                    </div>
                  </div>
                </div>

                {/* Summary details */}
                <div className="border-t border-border p-5 md:border-s md:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t("reportSummary")}
                  </p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    {data.make} {data.model} · {data.year}
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <SummaryItem
                      icon={Car}
                      label={t("vehicleName")}
                      value={`${data.make} ${data.model}`}
                    />
                    <SummaryItem
                      icon={Hash}
                      label={t("plateNumber")}
                      value={data.plate}
                    />
                    <SummaryItem
                      icon={Hash}
                      label={t("serialNumber")}
                      value={serial || "—"}
                    />
                    <SummaryItem
                      icon={Hash}
                      label={t("vinLabel")}
                      value={actualVin || vin}
                      ltr
                    />
                    <SummaryItem
                      icon={FileText}
                      label={t("reportNumber")}
                      value={data.reportNumber}
                    />
                    <SummaryItem
                      icon={Calendar}
                      label={t("requestDate")}
                      value={data.requestDate}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* What's included */}
            <section className="overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-glow sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {t("whatIncluded")}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {includedItems.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5 text-sm"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column: price + payment */}
          <div className="space-y-6">
            {/* Price card */}
            <section className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/70 to-card/70 p-6 backdrop-blur-xl shadow-glow">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{t("priceTitle")}</p>
                  <p className="text-2xl font-black text-primary">{t("priceAmount")}</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {t("priceIncludes")}
              </p>
            </section>

            {/* Payment methods */}
            <section className="overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-glow">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {t("paymentMethods")}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <PaymentMethod name="Visa" icon={<VisaIcon />} />
                <PaymentMethod name="Mastercard" icon={<MastercardIcon />} />
                <PaymentMethod name="mada" icon={<MadaIcon />} />
                <PaymentMethod name="Apple Pay" icon={<ApplePayIcon />} />
                <PaymentMethod name="STC Pay" icon={<StcPayIcon />} />
                <PaymentMethod name="Google Pay" icon={<GooglePayIcon />} />
              </div>
            </section>

            {/* Pay action */}
            <section className="overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-glow">
              <div className="rounded-2xl border border-success/30 bg-success/10 px-3 py-2.5 text-xs text-success">
                {t("demoPaymentNotice")}
              </div>
              <Button
                size="lg"
                disabled={paying || success}
                onClick={handlePay}
                className="mt-4 h-14 w-full bg-emerald-600 text-primary-foreground hover:bg-emerald-500 border-0 text-base font-bold shadow-glow transition-transform active:scale-[0.98]"
              >
                <CreditCard className="h-5 w-5" />
                {paying ? t("processing") : t("payNow")}
              </Button>
            </section>
          </div>
        </div>

        <SiteFooter />
      </main>

      {/* Success overlay */}
      {success && <SuccessOverlay t={t} />}
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  ltr,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate font-semibold" dir={ltr ? "ltr" : undefined}>
          {value}
        </p>
      </div>
    </div>
  );
}

function PaymentMethod({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-primary/5">
      <span className="grid h-8 w-8 shrink-0 place-items-center">{icon}</span>
      <span className="font-medium">{name}</span>
    </div>
  );
}

function SuccessOverlay({ t }: { t: (k: import("@/lib/i18n").Key) => string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl animate-fade-in">
      <div className="mx-4 max-w-sm scale-in text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-600/20 shadow-[0_0_60px_rgba(22,163,74,0.35)]">
          <div className="animate-scale-in">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-black">{t("paymentSuccess")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("preparingReport")}</p>
        <p className="mt-4 text-xs text-muted-foreground">{t("redirecting")}</p>
      </div>
    </div>
  );
}

// Inline payment brand icons.
function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <text x="24" y="21" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--foreground)">
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <circle cx="19" cy="16" r="7" fill="#EB001B" opacity="0.85" />
      <circle cx="29" cy="16" r="7" fill="#F79E1B" opacity="0.85" />
    </svg>
  );
}

function MadaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <text x="24" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--foreground)">
        مدى
      </text>
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--foreground)">
        Pay
      </text>
    </svg>
  );
}

function StcPayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--foreground)">
        STC
      </text>
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="var(--primary)" opacity="0.15" />
      <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--foreground)">
        G Pay
      </text>
    </svg>
  );
}
