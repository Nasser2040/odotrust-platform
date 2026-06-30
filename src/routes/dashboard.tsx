import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Download, RotateCw, Search, CreditCard, User as UserIcon,
  Bell, Lock, LogOut, Car, CheckCircle2, Calendar, Eye, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const mockReports = [
  { id: "RPT-100245", name: "Lexus ES 350", plate: "ر س ب 4521", date: "2026-06-22", status: "مكتمل", vin: "1HGCM82633A004352" },
  { id: "RPT-100198", name: "Toyota Camry", plate: "أ ب ج 1287", date: "2026-06-15", status: "مكتمل", vin: "4T1BF1FK5GU123456" },
  { id: "RPT-100154", name: "Hyundai Sonata", plate: "د ه و 7890", date: "2026-05-30", status: "مكتمل", vin: "KMHE34L19LA098765" },
];

const mockSearches = [
  { serial: "SR-882341", vin: "1HGCM82633A004352", date: "2026-06-22 14:22", status: "تم إصدار التقرير" },
  { serial: "SR-882120", vin: "4T1BF1FK5GU123456", date: "2026-06-15 09:11", status: "تم إصدار التقرير" },
  { serial: "SR-881904", vin: "WBA3A5C50DF356789", date: "2026-06-10 18:45", status: "لم يتم الدفع" },
];

const mockPayments = [
  { id: "PAY-77231", date: "2026-06-22", amount: 49, status: "ناجحة" },
  { id: "PAY-77144", date: "2026-06-15", amount: 49, status: "ناجحة" },
  { id: "PAY-77032", date: "2026-05-30", amount: 49, status: "ناجحة" },
];

const mockNotifications = [
  { icon: CheckCircle2, text: "تم إصدار التقرير لمركبة Lexus ES 350.", time: "منذ ساعتين" },
  { icon: Download, text: "تم تحميل ملف PDF للتقرير RPT-100198.", time: "أمس" },
  { icon: UserIcon, text: "تم تحديث بيانات الحساب بنجاح.", time: "قبل 3 أيام" },
  { icon: CreditCard, text: "تمت عملية دفع بقيمة 49 ريال بنجاح.", time: "قبل 4 أيام" },
];

type TabKey = "reports" | "searches" | "payments" | "profile" | "security" | "notifications";

function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const { dir } = useI18n();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("reports");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen" dir={dir}>
        <AppHeader />
        <p className="p-8 text-center text-muted-foreground">جاري التحميل…</p>
      </div>
    );
  }

  const displayName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "المستخدم";

  const tabs: { key: TabKey; label: string; icon: typeof FileText }[] = [
    { key: "reports", label: "تقاريري", icon: FileText },
    { key: "searches", label: "سجل البحث", icon: Search },
    { key: "payments", label: "المدفوعات", icon: CreditCard },
    { key: "profile", label: "الملف الشخصي", icon: UserIcon },
    { key: "security", label: "الأمان", icon: ShieldCheck },
    { key: "notifications", label: "الإشعارات", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30" dir={dir}>
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-muted-foreground">إدارة جميع تقاريرك وطلباتك في مكان واحد.</p>
        </div>

        {/* Welcome Card */}
        <section className="rounded-2xl border border-border bg-gradient-to-l from-primary/10 via-card to-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                <UserIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مرحباً بعودتك</p>
                <h2 className="text-xl font-semibold">{displayName}</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <Stat label="عدد التقارير" value={String(mockReports.length)} />
              <Stat label="آخر بحث" value="2026-06-22" />
              <Stat label="آخر دفع" value="49 ر.س" />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav className="mt-8 flex flex-wrap gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6">
          {tab === "reports" && <ReportsTab />}
          {tab === "searches" && <SearchesTab />}
          {tab === "payments" && <PaymentsTab />}
          {tab === "profile" && <ProfileTab email={user.email ?? ""} displayName={displayName} />}
          {tab === "security" && <SecurityTab onSignOut={() => signOut()} />}
          {tab === "notifications" && <NotificationsTab />}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center md:text-right">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function ReportsTab() {
  if (mockReports.length === 0) return <EmptyReports />;
  return (
    <Card title="تقاريري">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <Th>رقم التقرير</Th><Th>اسم المركبة</Th><Th>رقم اللوحة</Th>
              <Th>التاريخ</Th><Th>الحالة</Th><Th>الإجراءات</Th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map((r) => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-muted/40">
                <Td className="font-mono text-xs">{r.id}</Td>
                <Td className="font-medium">{r.name}</Td>
                <Td>{r.plate}</Td>
                <Td>{r.date}</Td>
                <Td><Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15">{r.status}</Badge></Td>
                <Td>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/report/$vin" params={{ vin: r.vin }}>
                      <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3.5 w-3.5"/>عرض</Button>
                    </Link>
                    <Button size="sm" variant="outline" className="gap-1"><Download className="h-3.5 w-3.5"/>PDF</Button>
                    <Link to="/payment/$vin" params={{ vin: r.vin }}>
                      <Button size="sm" variant="ghost" className="gap-1"><RotateCw className="h-3.5 w-3.5"/>إعادة</Button>
                    </Link>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function EmptyReports() {
  return (
    <Card title="تقاريري">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted"><Car className="h-7 w-7 text-muted-foreground"/></div>
        <p className="mt-4 font-medium">لا توجد تقارير حتى الآن.</p>
        <p className="mt-1 text-sm text-muted-foreground">ابدأ بفحص أول مركبة الآن.</p>
        <Link to="/" className="mt-5"><Button className="gap-2"><Search className="h-4 w-4"/>فحص مركبة</Button></Link>
      </div>
    </Card>
  );
}

function SearchesTab() {
  return (
    <Card title="سجل البحث">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <Th>الرقم التسلسلي</Th><Th>رقم الشاصي (VIN)</Th><Th>تاريخ البحث</Th><Th>حالة التقرير</Th>
            </tr>
          </thead>
          <tbody>
            {mockSearches.map((s) => (
              <tr key={s.serial} className="border-b last:border-0 hover:bg-muted/40">
                <Td className="font-mono text-xs">{s.serial}</Td>
                <Td className="font-mono text-xs">{s.vin}</Td>
                <Td>{s.date}</Td>
                <Td>
                  <Badge variant={s.status === "تم إصدار التقرير" ? "default" : "secondary"}>{s.status}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PaymentsTab() {
  return (
    <Card title="سجل المدفوعات">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <Th>رقم العملية</Th><Th>التاريخ</Th><Th>المبلغ</Th><Th>الحالة</Th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-muted/40">
                <Td className="font-mono text-xs">{p.id}</Td>
                <Td className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-muted-foreground"/>{p.date}</Td>
                <Td className="font-semibold">{p.amount} ر.س</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15">{p.status}</Badge>
                    <Badge variant="outline" className="text-xs">تجريبية</Badge>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ProfileTab({ email, displayName }: { email: string; displayName: string }) {
  const [form, setForm] = useState({
    name: displayName,
    phone: "+966 5xxxxxxx",
    email,
    nationalId: "10xxxxxxxx",
  });
  return (
    <Card title="الملف الشخصي">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="الاسم" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="رقم الجوال" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="البريد الإلكتروني" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="رقم الهوية / الإقامة" value={form.nationalId} onChange={(v) => setForm({ ...form, nationalId: v })} />
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="gap-2"><CheckCircle2 className="h-4 w-4"/>حفظ التغييرات</Button>
      </div>
    </Card>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} dir="rtl" />
    </div>
  );
}

function SecurityTab({ onSignOut }: { onSignOut: () => void }) {
  return (
    <Card title="الأمان">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-xl border border-border p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Lock className="h-5 w-5"/></div>
            <div>
              <p className="font-medium">تغيير كلمة المرور</p>
              <p className="text-xs text-muted-foreground">حدّث كلمة المرور بشكل دوري للحفاظ على أمان حسابك.</p>
            </div>
          </div>
          <Button variant="outline">تغيير</Button>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-destructive/15 text-destructive"><LogOut className="h-5 w-5"/></div>
            <div>
              <p className="font-medium">تسجيل الخروج</p>
              <p className="text-xs text-muted-foreground">إنهاء الجلسة الحالية على هذا الجهاز.</p>
            </div>
          </div>
          <Button variant="destructive" onClick={onSignOut}>تسجيل الخروج</Button>
        </div>
      </div>
    </Card>
  );
}

function NotificationsTab() {
  return (
    <Card title="الإشعارات">
      <ul className="space-y-3">
        {mockNotifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted/40">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5"/></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.text}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-3 text-right font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 ${className}`}>{children}</td>;
}