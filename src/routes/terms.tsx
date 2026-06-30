import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, InfoSection } from "@/components/InfoPage";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <InfoPage title="الشروط والأحكام" subtitle="يرجى قراءة الشروط بعناية قبل استخدام المنصة">
      <InfoSection title="الموافقة على الشروط">
        <p>استخدام المنصة يعني الموافقة الكاملة على جميع الشروط والأحكام المذكورة في هذه الصفحة.</p>
      </InfoSection>
      <InfoSection title="طبيعة الخدمة">
        <p>تقدّم المنصة تقارير معلوماتية تهدف إلى مساعدة المستخدم في اتخاذ قرار الشراء.</p>
      </InfoSection>
      <InfoSection title="مسؤولية المستخدم">
        <p>يتحمل المستخدم مسؤولية التحقق النهائي من المركبة قبل الشراء، ولا تتحمل المنصة أي مسؤولية عن قرار الشراء النهائي.</p>
      </InfoSection>
      <InfoSection title="حقوق الملكية">
        <p>جميع المحتويات والشعارات والعلامات التجارية في المنصة محفوظة ولا يجوز إعادة نشرها أو استخدامها دون إذن مسبق.</p>
      </InfoSection>
    </InfoPage>
  );
}