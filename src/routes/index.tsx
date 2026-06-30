import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { VinSearchCard } from "@/components/VinSearchCard";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";
import { BadgeCheck, FileText, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, dir } = useI18n();

  const features = [
    {
      icon: BadgeCheck,
      title: "card1Title",
      desc: "card1Desc",
    },
    {
      icon: FileText,
      title: "card2Title",
      desc: "card2Desc",
    },
    {
      icon: CheckCircle,
      title: "card3Title",
      desc: "card3Desc",
    },
  ];

  return (
    <div className="min-h-screen relative" dir={dir}>
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-5 py-2.5 text-[18px] font-bold text-brand-dark shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t("features")}
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-[68px] lg:leading-[1.06]">
            <span className="inline-flex flex-col items-center gap-2 bg-gradient-to-br from-foreground via-brand-dark to-primary bg-clip-text text-transparent">
              {t("heroTitle").split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </span>
          </h1>

          <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[20px] font-bold text-brand-dark">
            {t("heroTagline").split("•").map((part, i, arr) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span>{part.trim()}</span>
                {i < arr.length - 1 && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                )}
              </span>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-[22px] font-medium leading-relaxed text-brand-dark/90 text-balance">
            {t("heroCtaSub")}
          </p>
        </section>

        <section className="mt-10 sm:mt-12">
          <VinSearchCard />
        </section>

        <section className="mt-14 sm:mt-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <span className="inline-grid h-[72px] w-[72px] place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-glow">
                    <Icon className="h-8 w-8" />
                  </span>
                  <p className="mt-6 text-2xl font-bold text-foreground">
                    {t(f.title as "card1Title")}
                  </p>
                  <p className="mt-3 text-[18px] leading-relaxed text-muted-foreground">
                    {t(f.desc as "card1Desc")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
