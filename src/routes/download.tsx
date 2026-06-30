import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";
import { Smartphone, Zap, Shield, BellRing, Apple, Play } from "lucide-react";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "تحميل تطبيق موثوق" },
      { name: "description", content: "نزّل تطبيق موثوق على iOS و Android لإصدار تقارير المركبات بسرعة." },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <InfoPage title="تحميل تطبيق موثوق" subtitle="تقاريرك بين يديك أينما كنت — متاح قريبًا على iOS و Android" maxWidth="max-w-6xl">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            <Smartphone className="h-4 w-4" /> قريبًا على متجر التطبيقات
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: "var(--brand-dark)" }}>
            موثوق في جيبك — قرار شراء أذكى
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground">
            أصدر تقرير المركبة، احفظ تقاريرك السابقة، واطّلع على آخر التحديثات مباشرة من تطبيق موثوق على هاتفك.
          </p>

          <ul className="space-y-3">
            {[
              { icon: Zap, t: "إصدار التقرير في ثوانٍ" },
              { icon: Shield, t: "بيانات محمية ومشفّرة" },
              { icon: BellRing, t: "إشعارات فورية عند تجهيز تقريرك" },
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-[16px] font-semibold">{f.t}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="group inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow" type="button">
              <Apple className="h-7 w-7" />
              <span className="text-right leading-tight">
                <span className="block text-[11px] opacity-80">حمّل من</span>
                <span className="block text-[17px] font-black">App Store</span>
              </span>
            </button>
            <button className="group inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow" type="button">
              <Play className="h-7 w-7" />
              <span className="text-right leading-tight">
                <span className="block text-[11px] opacity-80">حمّل من</span>
                <span className="block text-[17px] font-black">Google Play</span>
              </span>
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 blur-3xl" aria-hidden />
          <div className="relative w-[260px] sm:w-[300px]">
            <div className="aspect-[9/19] rounded-[2.5rem] border-[10px] border-foreground bg-gradient-to-b from-secondary to-card p-4 shadow-glow">
              <div className="flex h-full flex-col rounded-[1.8rem] bg-card p-4">
                <div className="mx-auto h-1.5 w-16 rounded-full bg-muted" />
                <div className="mt-6 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                    <Shield className="h-7 w-7" />
                  </div>
                  <p className="mt-3 text-[18px] font-black" style={{ color: "var(--brand-dark)" }}>موثوق</p>
                  <p className="text-[12px] text-muted-foreground">تقرير المركبة</p>
                </div>
                <div className="mt-5 space-y-2.5">
                  <div className="h-9 rounded-xl bg-muted" />
                  <div className="h-9 rounded-xl bg-muted" />
                  <div className="h-11 rounded-xl gradient-primary" />
                </div>
                <div className="mt-auto space-y-2">
                  <div className="h-2 w-2/3 rounded bg-muted" />
                  <div className="h-2 w-1/2 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoPage>
  );
}