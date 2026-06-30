import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, InfoSection } from "@/components/InfoPage";
import { RefreshCcw, XCircle } from "lucide-react";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
});

function RefundPage() {
  return (
    <InfoPage title="سياسة الاسترجاع" subtitle="حالات استرداد الرسوم في منصة موثوق">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-700">
            <RefreshCcw className="h-5 w-5" />
          </div>
          <h3 className="mt-3 font-semibold">يحق لك استرداد المبلغ</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            إذا تعذر إصدار التقرير بسبب مشكلة فنية أو عدم توفر البيانات، يحق للمستخدم استرداد المبلغ وفق سياسة المنصة.
          </p>
        </div>
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/15 text-destructive">
            <XCircle className="h-5 w-5" />
          </div>
          <h3 className="mt-3 font-semibold">لا يمكن الاسترداد</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            بعد إصدار التقرير بنجاح لا يمكن استرداد الرسوم، حيث تُعتبر الخدمة قد قُدّمت بالكامل.
          </p>
        </div>
      </div>
      <InfoSection title="كيفية طلب الاسترداد">
        <p>لتقديم طلب استرداد، يرجى التواصل معنا عبر صفحة «تواصل معنا» مع ذكر رقم العملية وسبب الطلب، وسيتم الرد خلال أيام العمل الرسمية.</p>
      </InfoSection>
    </InfoPage>
  );
}