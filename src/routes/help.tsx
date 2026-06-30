import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";
import { LifeBuoy, CreditCard, User, Building2, HelpCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "مركز المساعدة — موثوق" },
      { name: "description", content: "كل ما تحتاج لمعرفته عن موثوق: الدعم الفني، الدفع، الحساب، وحلول الأعمال." },
    ],
  }),
  component: HelpCenter,
});

const cats: {
  icon: typeof LifeBuoy;
  title: string;
  desc: string;
  to?: "/faq" | "/contact" | "/business";
}[] = [
  { icon: HelpCircle, title: "الأسئلة الشائعة", desc: "إجابات سريعة عن أكثر الاستفسارات شيوعًا.", to: "/faq" },
  { icon: LifeBuoy, title: "الدعم الفني", desc: "تواجه مشكلة في إصدار التقرير أو تسجيل الدخول؟ تواصل معنا.", to: "/contact" },
  { icon: CreditCard, title: "دعم الدفع", desc: "استفسارات حول الفواتير، عمليات الدفع، وحالات الاسترداد.", to: "/contact" },
  { icon: User, title: "دعم الحساب", desc: "إدارة بياناتك الشخصية، استعادة كلمة المرور، وتفعيل الحساب.", to: "/contact" },
  { icon: Building2, title: "دعم الأعمال", desc: "حلول مخصصة لمعارض السيارات وشركات التأجير والتأمين.", to: "/business" },
];

function HelpCenter() {
  return (
    <InfoPage title="مركز المساعدة" subtitle="نحن هنا لمساعدتك في كل خطوة" maxWidth="max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {cats.map((c, i) => (
          <Link
            key={i}
            to={c.to ?? "/contact"}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <c.icon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                {c.title}
                <ArrowLeft className="h-4 w-4 text-primary transition-transform group-hover:-translate-x-1" />
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}