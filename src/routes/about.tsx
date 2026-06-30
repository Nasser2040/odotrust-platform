import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { ShieldCheck, Target, Sparkles, Eye, Heart, Workflow } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — موثوق" },
      { name: "description", content: "موثوق منصة سعودية لتقارير تاريخ المركبات تساعدك على اتخاذ قرار شراء أكثر أمانًا وثقة." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <InfoPage title="من نحن" subtitle="منصة موثوق — قرار شراء أكثر أمانًا وثقة" maxWidth="max-w-4xl">
      <InfoSection>
        <p>
          موثوق منصة سعودية متخصصة في توفير تقارير شاملة عن تاريخ المركبات،
          تساعد الأفراد والمنشآت على اتخاذ قرار شراء واعٍ مبني على بيانات
          واضحة وشفافة، وتقلّل من مخاطر التلاعب وإخفاء الحقائق في سوق
          السيارات المستعملة.
        </p>
      </InfoSection>

      <InfoSection title="رسالتنا">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Target className="h-5 w-5" /></span>
          <p>تمكين كل مشترٍ ومنشأة من الوصول إلى تاريخ المركبة بسهولة، وبشفافية، وبسعر عادل.</p>
        </div>
      </InfoSection>

      <InfoSection title="رؤيتنا">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Eye className="h-5 w-5" /></span>
          <p>أن نكون المرجع الأول والموثوق لتقارير المركبات في المملكة العربية السعودية والمنطقة.</p>
        </div>
      </InfoSection>

      <InfoSection title="لماذا موثوق؟">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "موثوقية البيانات", desc: "تقارير مبنية على بيانات المركبة لتقديم صورة واضحة وشفافة." },
            { icon: Target, title: "قرار شراء واعٍ", desc: "نساعدك على معرفة تاريخ المركبة قبل اتخاذ قرار الشراء." },
            { icon: Sparkles, title: "تجربة احترافية", desc: "تصميم عصري وسهل الاستخدام مع إصدار فوري للتقارير." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{c.title}</h3>
              <p className="mt-1 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title="كيف يعمل التقرير">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Workflow className="h-5 w-5" /></span>
          <p>
            تدخل رقم الشاصي أو الرقم التسلسلي للمركبة، نعالج البيانات،
            ونصدر لك تقريرًا شاملاً يتضمن قراءات العداد، الملاك، الحوادث،
            الاستخدام السابق، الحالة النظامية، وملخصًا ذكيًا يساعدك على
            اتخاذ القرار.
          </p>
        </div>
      </InfoSection>

      <InfoSection title="قيمنا">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { t: "الشفافية", d: "نعرض بيانات المركبة كما هي، بدون مبالغة أو إخفاء." },
            { t: "الدقة", d: "نلتزم بأعلى معايير الجودة في معالجة البيانات." },
            { t: "الثقة", d: "نحمي بيانات مستخدمينا ولا نشاركها مع أي طرف خارجي." },
            { t: "السهولة", d: "تجربة استخدام بسيطة، سريعة، ومتاحة للجميع." },
          ].map((v) => (
            <div key={v.t} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Heart className="h-4 w-4" /></span>
              <div>
                <p className="font-bold text-foreground">{v.t}</p>
                <p className="mt-0.5 text-sm">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>
    </InfoPage>
  );
}