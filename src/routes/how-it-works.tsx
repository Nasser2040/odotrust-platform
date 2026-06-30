import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";
import { UserPlus, Search, CreditCard, FileText, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "كيف يعمل موثوق — خطوات إصدار تقرير المركبة" },
      { name: "description", content: "اعرف كيف تحصل على تقرير موثوق للمركبة في خمس خطوات بسيطة." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: UserPlus, title: "إنشاء حساب", desc: "سجّل دخولك أو أنشئ حسابًا جديدًا للوصول إلى تقارير المركبات." },
  { icon: Search, title: "إدخال رقم الشاصي أو الرقم التسلسلي", desc: "أدخل بيانات المركبة المراد فحصها مباشرة من الصفحة الرئيسية." },
  { icon: CreditCard, title: "إتمام الدفع", desc: "ادفع 49 ريالًا فقط بأي وسيلة دفع آمنة ومعتمدة." },
  { icon: FileText, title: "إصدار التقرير", desc: "نُصدر لك تقريرًا شاملًا فور إتمام الدفع داخل حسابك." },
  { icon: Download, title: "تحميل ملف PDF", desc: "حمّل تقريرك بصيغة PDF احترافية أو اطبعه مباشرة." },
];

function HowItWorks() {
  return (
    <InfoPage title="كيف يعمل موثوق" subtitle="خمس خطوات بسيطة تفصلك عن تقرير شامل وموثوق لأي مركبة" maxWidth="max-w-5xl">
      <div className="space-y-5">
        {steps.map((s, i) => (
          <div
            key={i}
            className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow"
          >
            <div className="relative shrink-0">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground shadow">
                {i + 1}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/">
          <Button size="lg" className="h-14 gap-2 rounded-xl px-8 text-[17px] font-bold gradient-primary text-primary-foreground border-0 shadow-glow">
            ابدأ فحص مركبتك الآن <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </InfoPage>
  );
}