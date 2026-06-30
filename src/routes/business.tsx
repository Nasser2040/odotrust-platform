import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";
import { Crown, Building2, Car, ShieldCheck, Wallet, Truck, Wrench, Factory, Check, LayoutDashboard, Headphones, Layers, Calendar, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "حساب التميز — باقات الأعمال من موثوق" },
      { name: "description", content: "حساب التميز من موثوق: تقارير مجمّعة، لوحة تحكم، أولوية الدعم، وفوترة شهرية لمعارض السيارات وشركات التأجير والتأمين والتمويل." },
    ],
  }),
  component: BusinessPage,
});

const audience = [
  { icon: Car, t: "معارض السيارات" },
  { icon: Truck, t: "مكاتب تأجير السيارات" },
  { icon: ShieldCheck, t: "شركات التأمين" },
  { icon: Wallet, t: "شركات التمويل" },
  { icon: Building2, t: "أساطيل الشركات" },
  { icon: Wrench, t: "شركات الفحص" },
  { icon: Factory, t: "وكلاء السيارات" },
];

const benefits = [
  { icon: Layers, t: "تقارير مجمّعة بسعر تفضيلي" },
  { icon: LayoutDashboard, t: "لوحة تحكم متقدمة لإدارة فريقك" },
  { icon: Headphones, t: "دعم فني مخصص بأولوية" },
  { icon: Calendar, t: "فوترة شهرية موحّدة" },
  { icon: Plug, t: "ربط API مستقبلي للأنظمة الداخلية" },
  { icon: ShieldCheck, t: "صلاحيات وأدوار لأعضاء الفريق" },
];

function BusinessPage() {
  return (
    <InfoPage title="حساب التميز" subtitle="باقة الأعمال المميزة من موثوق — لتقارير أسرع وأقوى وأذكى" maxWidth="max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card via-card to-secondary p-8 shadow-glow sm:p-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-black text-primary">
              <Crown className="h-4 w-4" /> عضوية حصرية للأعمال
            </div>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl" style={{ color: "var(--brand-dark)" }}>
              قرارات أعمال مبنية على بيانات موثوقة
            </h2>
            <p className="mt-3 max-w-xl text-[16px] text-muted-foreground">
              مصمّمة للمنشآت التي تتعامل مع كميات كبيرة من المركبات وتحتاج تقارير دقيقة، وأدوات إدارة، ودعم سريع.
            </p>
          </div>
          <Button size="lg" className="h-14 gap-2 rounded-xl px-7 text-[17px] font-bold gradient-primary text-primary-foreground border-0 shadow-glow">
            <Crown className="h-5 w-5" /> اطلب عرضًا مخصصًا
          </Button>
        </div>
      </div>

      {/* Audience */}
      <section className="mt-10">
        <h3 className="text-xl font-black" style={{ color: "var(--brand-dark)" }}>لمن حساب التميز؟</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-[15px] font-bold">{a.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-12">
        <h3 className="text-xl font-black" style={{ color: "var(--brand-dark)" }}>المزايا الحصرية</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow">
              <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[17px] font-bold">{b.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="mt-12">
        <h3 className="text-xl font-black" style={{ color: "var(--brand-dark)" }}>باقات مرنة حسب حجمك</h3>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {[
            { name: "بداية", price: "1,499", reports: "حتى 50 تقرير/شهر", featured: false },
            { name: "نمو", price: "3,999", reports: "حتى 150 تقرير/شهر", featured: true },
            { name: "مؤسسات", price: "حسب الطلب", reports: "تقارير غير محدودة + API", featured: false },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border bg-card p-6 shadow-sm transition ${p.featured ? "border-primary/40 shadow-glow" : "border-border"}`}
            >
              {p.featured && (
                <span className="absolute -top-3 right-6 rounded-full gradient-primary px-3 py-1 text-xs font-black text-primary-foreground shadow">
                  الأكثر طلبًا
                </span>
              )}
              <p className="text-[15px] font-bold text-muted-foreground">{p.name}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-black" style={{ color: "var(--brand-dark)" }}>{p.price}</span>
                {p.price !== "حسب الطلب" && <span className="mb-1 text-sm font-bold text-muted-foreground">ر.س / شهريًا</span>}
              </div>
              <p className="mt-1 text-[14px] text-muted-foreground">{p.reports}</p>
              <ul className="mt-5 space-y-2 text-[14px]">
                {["لوحة تحكم متقدمة", "أولوية الدعم", "فوترة شهرية موحّدة", p.featured ? "إدارة فريق + صلاحيات" : "تقارير PDF احترافية"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}</li>
                ))}
              </ul>
              <Button className={`mt-6 h-12 w-full rounded-xl text-[15px] font-bold ${p.featured ? "gradient-primary text-primary-foreground border-0 shadow-glow" : ""}`} variant={p.featured ? "default" : "outline"}>
                تواصل مع المبيعات
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[13px] text-muted-foreground">الأسعار تقريبية وتُحدّد بشكل نهائي بعد التواصل مع فريق المبيعات.</p>
      </section>
    </InfoPage>
  );
}