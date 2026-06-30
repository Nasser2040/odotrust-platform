import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";

export function InfoPage({
  title,
  subtitle,
  children,
  maxWidth = "max-w-3xl",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  const { dir } = useI18n();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30" dir={dir}>
      <AppHeader />
      <main className={`mx-auto ${maxWidth} px-4 py-12 sm:py-16`}>
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
          )}
        </header>
        <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-xl sm:p-10">
          {children}
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}

export function InfoSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-3 [&:not(:first-child)]:mt-8 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-border/60 [&:not(:first-child)]:pt-8">
      {title && <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>}
      <div className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">{children}</div>
    </section>
  );
}