import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import falconLogo from "@/assets/falcon-logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  const { t } = useI18n();

  type Col = {
    title: string;
    items: { label: string; to?: "/about" | "/how-it-works" | "/download" | "/faq" | "/contact" | "/pricing" | "/business" | "/help" | "/privacy" | "/terms" }[];
  };

  const cols: Col[] = [
    {
      title: "موثوق",
      items: [
        { label: "من نحن", to: "/about" },
        { label: "كيف يعمل موثوق", to: "/how-it-works" },
        { label: "تحميل التطبيق", to: "/download" },
        { label: "الأسئلة الشائعة", to: "/faq" },
        { label: "تواصل معنا", to: "/contact" },
      ],
    },
    {
      title: "الخدمات",
      items: [
        { label: "تقرير تاريخ المركبة" },
        { label: "سجل الحوادث" },
        { label: "سجل الملاك" },
        { label: "التحقق من العداد" },
        { label: "الفحص قبل الشراء" },
      ],
    },
    {
      title: "الأسعار",
      items: [
        { label: "التقرير الشامل (49 ريال)", to: "/pricing" },
        { label: "الاشتراكات", to: "/business" },
        { label: "كوبونات الخصم" },
      ],
    },
    {
      title: "حساب التميز ⭐",
      items: [
        { label: "معارض السيارات", to: "/business" },
        { label: "مكاتب التأجير", to: "/business" },
        { label: "شركات التأمين", to: "/business" },
        { label: "شركات التمويل", to: "/business" },
        { label: "أساطيل الشركات", to: "/business" },
      ],
    },
    {
      title: "الدعم",
      items: [
        { label: "مركز المساعدة", to: "/help" },
        { label: "سياسة الخصوصية", to: "/privacy" },
        { label: "الشروط والأحكام", to: "/terms" },
        { label: "اتصل بنا", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="app-footer mt-20 sm:mt-28 border-t border-border/60 pt-16 pb-12" data-no-print>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-[20px] font-black tracking-tight" style={{ color: "var(--brand-dark)" }}>
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.items.map((it, i) => (
                  <li key={i}>
                    {it.to ? (
                      <Link
                        to={it.to}
                        className="group inline-flex items-center text-[16px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-primary"
                      >
                        <span className="relative">
                          {it.label}
                          <span aria-hidden className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    ) : (
                      <span className="text-[16px] font-medium text-muted-foreground/70">
                        {it.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border/60 pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={falconLogo} alt={t("appName")} className="h-10 w-10 object-contain" />
            <span className="text-[20px] font-black" style={{ color: "var(--brand-dark)" }}>
              {t("appName")}
            </span>
            <span className="text-[14px] font-medium text-muted-foreground">
              © {new Date().getFullYear()} — جميع الحقوق محفوظة
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4 text-primary" /> support@mawthooq.sa</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-primary" /> 920000000</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> الرياض، السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}