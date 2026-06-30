import { Link, useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import falconLogo from "@/assets/falcon-logo.png";

export function AppHeader() {
  const { t, lang, setLang } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl print:hidden" data-no-print>
      <div className="mx-auto flex h-24 sm:h-28 md:h-36 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-5 sm:gap-8 md:gap-10 group transition-opacity hover:opacity-95">
          <img
            src={falconLogo}
            alt={t("appName")}
            width={110}
            height={110}
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-[110px] md:w-[110px] object-contain transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:scale-105"
          />
          <span className="text-[26px] sm:text-[38px] md:text-[50px] font-black tracking-tight leading-none" style={{ color: "var(--brand-dark)" }}>
            {t("appName")}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4 lg:gap-6">
          {user && (
            <NavLink to="/dashboard">{t("dashboard")}</NavLink>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="h-11 sm:h-14 gap-1.5 px-2 sm:px-4 text-sm sm:text-[19px] font-bold rounded-lg transition-all hover:bg-primary/10 hover:text-primary"
            aria-label="Switch language"
          >
            <span className="hidden sm:inline">🌐 العربية | EN</span>
            <span className="sm:hidden">🌐</span>
          </Button>
          {user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
              className="h-11 sm:h-14 gap-1.5 px-2 sm:px-5 rounded-lg text-sm sm:text-[19px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t("signOut")}</span>
            </Button>
          ) : (
            <>
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11 sm:h-14 px-2 sm:px-6 rounded-lg text-sm sm:text-[19px] font-bold border-2 border-primary/30 bg-background/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:shadow-md active:translate-y-0"
                >
                  {t("signIn")}
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  size="sm"
                  className="h-11 sm:h-14 px-2 sm:px-7 rounded-lg gradient-primary text-primary-foreground border-0 shadow-glow text-sm sm:text-[19px] font-bold ring-1 ring-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:ring-primary/50 active:translate-y-0"
                >
                  {t("signUp")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: "/dashboard" | "/auth"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative inline-flex h-14 sm:h-16 items-center rounded-lg px-3 sm:px-5 text-[19px] sm:text-[21px] font-bold text-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 sm:inset-x-4 -bottom-0.5 h-[3px] origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100"
      />
    </Link>
  );
}
