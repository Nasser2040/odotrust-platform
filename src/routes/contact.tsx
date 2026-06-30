import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InfoPage } from "@/components/InfoPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, Facebook, Instagram, Twitter } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <InfoPage title="تواصل معنا" subtitle="نسعد بخدمتك والإجابة على استفساراتك" maxWidth="max-w-5xl">
      <div className="grid gap-6 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          {[
            { icon: Mail, title: "البريد الإلكتروني", value: "support@mawthooq.example" },
            { icon: Phone, title: "رقم الهاتف", value: "+966 5x xxx xxxx" },
            { icon: Clock, title: "أوقات العمل", value: "الأحد – الخميس، 9 صباحًا – 5 مساءً" },
            { icon: MapPin, title: "العنوان", value: "الرياض، المملكة العربية السعودية" },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.title}</p>
                <p className="mt-0.5 text-sm font-medium">{c.value}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 text-sm font-medium">وسائل التواصل الاجتماعي</p>
            <div className="flex gap-2">
              {[Twitter, Instagram, Facebook].map((Icon, i) => (
                <span key={i} className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-muted text-muted-foreground transition hover:bg-primary/10 hover:text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid h-40 place-items-center rounded-2xl border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
            خريطة الموقع (Placeholder)
          </div>
        </div>

        <div className="md:col-span-3">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold">نموذج التواصل</h3>
            <div className="space-y-2">
              <Label>الاسم</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} dir="rtl" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir="rtl" required maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label>الرسالة</Label>
              <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} dir="rtl" required maxLength={1000} />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" /> إرسال الرسالة
            </Button>
            {sent && (
              <p className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> تم استلام رسالتك بنجاح. سنعاود التواصل قريبًا.
              </p>
            )}
          </form>
        </div>
      </div>
    </InfoPage>
  );
}