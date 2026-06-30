import { AppHeader } from "@/components/AppHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useI18n } from "@/lib/i18n";

type NavKey =
  | "navAbout"
  | "navFaq"
  | "navPrivacy"
  | "navTerms"
  | "navRefund"
  | "navContact";

export function PlaceholderPage({ titleKey }: { titleKey: NavKey }) {
  const { t, dir } = useI18n();
  return (
    <div className="min-h-screen" dir={dir}>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-card/70 p-8 text-center backdrop-blur-xl shadow-glow">
          <h1 className="text-2xl font-bold sm:text-3xl">{t(titleKey)}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("comingSoon")}</p>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}