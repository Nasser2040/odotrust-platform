import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, FileText } from "lucide-react";
import { toast } from "sonner";

export function VinSearchCard() {
  const { t, dir } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [serial, setSerial] = useState("");
  const [vin, setVin] = useState("");
  const [busy, setBusy] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const s = serial.trim().toUpperCase();
    const v = vin.trim().toUpperCase();
    if (!s && !v) {
      toast.error(t("eitherRequired"));
      return;
    }
    // Prefer serial; fall back to VIN as the route param.
    const key = s || v;
    setBusy(true);
    if (typeof window !== "undefined") {
      if (s) sessionStorage.setItem(`mawthooq_serial_${key}`, s);
      if (v) sessionStorage.setItem(`mawthooq_vin_${key}`, v);
    }
    if (!user) {
      toast.info("يجب تسجيل الدخول أو إنشاء حساب قبل إصدار التقرير.");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("mawthooq_pending_vin", key);
      }
      navigate({ to: "/auth", search: { redirect: `/payment/${key}` } });
      return;
    }
    navigate({ to: "/payment/$vin", params: { vin: key } });
  }

  return (
    <form
      onSubmit={submit}
      dir={dir}
      className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card p-8 shadow-glow transition-shadow duration-300 hover:shadow-2xl sm:p-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "var(--gradient-surface)" }}
      />
      <div className="relative">
        <div className="flex items-center gap-5">
          <span className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-glow">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </span>
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-[36px] sm:leading-tight">{t("inspectVehicle")}</h2>
            <p className="mt-2 text-[19px] sm:text-[20px] font-bold text-brand-dark leading-snug md:whitespace-nowrap">{t("vehicleNumberDescription")}</p>
          </div>
        </div>

        <p className="mt-6 rounded-xl border border-border/80 bg-primary/5 px-5 py-3 text-[19px] font-bold text-brand-dark">
          {t("inspectVehicleSubject")}
        </p>

        <div className="mt-8 grid gap-7">
          {/* Primary: Serial */}
          <div className="space-y-3 rounded-2xl border border-primary/25 bg-primary/5 p-6 transition-colors hover:border-primary/40">
            <Label htmlFor="serial" className="flex items-center justify-between text-[18px]">
              <span className="font-bold">{t("serialNumber")}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                {t("optional")}
              </span>
            </Label>
            <Input
              id="serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value.toUpperCase())}
              placeholder={t("serialNumber")}
              maxLength={20}
              className="h-16 rounded-xl text-[18px] font-mono tracking-[0.15em] bg-card shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/40"
              dir="ltr"
              autoComplete="off"
            />
            <p className="text-[15px] font-medium text-muted-foreground leading-relaxed">{t("serialHint")}</p>
          </div>

          {/* Secondary: VIN */}
          <div className="space-y-3 rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30">
            <Label htmlFor="vin" className="flex items-center justify-between text-[18px]">
              <span className="font-bold">{t("vinLabel")}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {t("optional")}
              </span>
            </Label>
            <Input
              id="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder={t("vinLabel")}
              maxLength={17}
              className="h-16 rounded-xl text-[18px] font-mono tracking-[0.15em] bg-card shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/40"
              dir="ltr"
              autoComplete="off"
            />
            <p className="text-[15px] font-medium text-muted-foreground leading-relaxed">{t("vinHint")}</p>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={busy}
          className="mt-10 h-16 w-full rounded-xl gradient-primary text-primary-foreground border-0 text-[19px] font-bold shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
        >
          <FileText className="h-6 w-6" />
          {busy ? t("loading") : t("viewReport")}
        </Button>
      </div>
    </form>
  );
}
