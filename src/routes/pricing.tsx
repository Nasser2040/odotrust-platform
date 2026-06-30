import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";
import { Check, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "أسعار موثوق — تقرير شامل بـ 49 ريال" },
      { name: "description", content: "تقرير موثوق الشامل للمركبة بسعر ثابت 49 ريال يشمل تاريخ المركبة، العداد، الحوادث، الملاك والمزيد." },
    ],
  }),
  component: PricingPage,
});

const includes = [
  "تاريخ المركبة الكامل",
  "سجل قراءات العداد",
  "عدد الملاك السابقين",
  "سجل الحوادث",
  "الاستخدام السابق",
  "الحالة النظامية",
  "ملخص ذكي بالذكاء الاصطناعي",
  "تقرير PDF احترافي للتحميل والطباعة",
];

function PricingPage() {
  return (
    <InfoPage title="الأسعار" subtitle="سعر واحد واضح وشامل، بدون أي رسوم خفية" maxWidth="max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-card p-8 shadow-glow sm:p-10">
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            <Sparkles className="h-4 w-4" /> التقرير القياسي
          </div>
          <div className="mt-5 flex items-end gap-3">
            <span className="text-6xl font-black tracking-tight" style={{ color: "var(--brand-dark)" }}>49</span>
            <span className="mb-2 text-2xl font-bold text-muted-foreground">ريال سعودي</span>
          </div>
          <p className="mt-2 text-[16px] text-muted-foreground">سعر ثابت لكل تقرير — بدون اشتراك، بدون رسوم إضافية.</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {includes.map((it) => (
              <li key={it} className="flex items-start gap-2.5 rounded-xl border border-border bg-background/60 p-3.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-[15px] font-medium text-foreground">{it}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link to="/">
              <Button size="lg" className="h-14 w-full gap-2 rounded-xl text-[17px] font-bold gradient-primary text-primary-foreground border-0 shadow-glow">
                إصدار التقرير الآن <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold">تحتاج باقة للشركات؟</h3>
        <p className="mt-2 text-[15px] text-muted-foreground">
          لمعارض السيارات وشركات التأجير والتأمين والتمويل، تتوفر باقات «حساب التميز» بأسعار خاصة وتقارير مجمّعة.
        </p>
        <Link to="/business" className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:underline">
          استعرض باقات الأعمال <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </InfoPage>
  );
}