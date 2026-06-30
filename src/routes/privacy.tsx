import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, InfoSection } from "@/components/InfoPage";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InfoPage title="سياسة الخصوصية" subtitle="نلتزم بحماية بياناتك واستخدامها بشفافية">
      <InfoSection title="حفظ بيانات الحساب">
        <p>يتم حفظ بيانات حساب المستخدم بطريقة آمنة وفق أفضل ممارسات حماية البيانات.</p>
      </InfoSection>
      <InfoSection title="عدم مشاركة البيانات">
        <p>لا يتم مشاركة بيانات المستخدم مع أي طرف ثالث إلا عند وجود التزام نظامي يستوجب ذلك.</p>
      </InfoSection>
      <InfoSection title="استخدام بيانات البحث">
        <p>يتم استخدام بيانات البحث فقط لإصدار التقرير ولا تُستخدم لأي غرض آخر.</p>
      </InfoSection>
      <InfoSection title="تعديلات على السياسة">
        <p>قد يتم تحديث هذه السياسة من وقت لآخر، وسيتم نشر أي تعديلات على هذه الصفحة. يُعدّ استمرار استخدامك للمنصة موافقة على آخر نسخة منشورة.</p>
      </InfoSection>
    </InfoPage>
  );
}