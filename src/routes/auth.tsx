import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Info } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
});

type AuthMethod = "email" | "phone";

function AuthPage() {
  const { t, dir, lang } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const dest = redirect && redirect.startsWith("/") ? redirect : "/dashboard";
  const [method, setMethod] = useState<AuthMethod>("email");
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [notice, setNotice] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);


  useEffect(() => {
    if (!loading && user) navigate({ to: dest });
  }, [user, loading, navigate, dest]);

  async function handleSignIn() {
    if (method !== "email") {
      toast.info(t("mockMethodNotice"));
      return;
    }
    setNotice(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
    else navigate({ to: dest });
  }

  async function handleSignUp() {
    if (method !== "email") {
      toast.info(t("mockMethodNotice"));
      return;
    }
    if (password !== confirmPassword) {
      toast.error(lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error(lang === "ar" ? "يرجى الموافقة على الشروط والأحكام" : "Please agree to the terms");
      return;
    }
    setBusy(true);
    const redirectUrl = `${window.location.origin}${dest}`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    // Ensure session state is fresh so immediate sign-in works without reload
    await supabase.auth.refreshSession().catch(() => {});
    // Clear passwords; keep identifier; switch to sign-in
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
    setTab("signin");
    const msg = t("signupSuccess");
    setNotice(msg);
    toast.success(msg);
  }


  const methods: { id: AuthMethod; label: string; icon: typeof Mail }[] = [
    { id: "email", label: t("authMethodEmail"), icon: Mail },
    { id: "phone", label: t("authMethodPhone"), icon: Phone },
  ];

  return (
    <div className="min-h-screen" dir={dir}>
      <AppHeader />
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur shadow-glow">
          <h1 className="text-2xl font-semibold">{t("appName")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("tagline")}</p>

          <p className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-muted-foreground">
            {t("authIntro")}
          </p>

          <p className="mt-4 text-center text-sm font-medium text-brand-dark">
            {t("quickSignup")}
          </p>


          {/* Method switcher (UI only — only email is wired up) */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMethod(m.id);
                    setNotice(null);
                  }}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card/40 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
          {method !== "email" && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-warning">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{t("mockMethodNotice")}</span>
            </div>
          )}

          {notice && (
            <div className="mt-4 rounded-xl border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
              {notice}
            </div>
          )}

          <Tabs
            value={tab}
            onValueChange={(v) => {
              setTab(v as "signin" | "signup");
              setNotice(null);
              setPassword("");
              setConfirmPassword("");
              setAgreed(false);
            }}
            className="mt-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t("signIn")}</TabsTrigger>
              <TabsTrigger value="signup">{t("signUp")}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-3 pt-4">
              {method === "email" && (
                <Field id="si-email" label={t("email")} type="email" value={email} onChange={setEmail} />
              )}
              {method === "phone" && (
                <Field id="si-phone" label={t("phone")} type="tel" value={phone} onChange={setPhone} />
              )}
              <Field id="si-pw" label={t("password")} type="password" value={password} onChange={setPassword} />
              <Button
                disabled={busy}
                onClick={handleSignIn}
                className="w-full gradient-primary text-primary-foreground border-0"
              >
                {busy ? t("loading") : t("signIn")}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-3 pt-4">
              {method === "email" && (
                <Field id="su-email" label={t("email")} type="email" value={email} onChange={setEmail} />
              )}
              {method === "phone" && (
                <Field id="su-phone" label={t("phone")} type="tel" value={phone} onChange={setPhone} />
              )}
              <Field id="su-pw" label={t("password")} type="password" value={password} onChange={setPassword} />
              <Field
                id="su-confirm-pw"
                label={t("confirmPassword")}
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id="su-terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="su-terms" className="text-sm font-normal leading-relaxed text-muted-foreground">
                  {t("agreeTerms")}
                </Label>
              </div>
              <Button
                disabled={busy}
                onClick={handleSignUp}
                className="w-full gradient-primary text-primary-foreground border-0"
              >
                {busy ? t("loading") : t("signUp")}
              </Button>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={type === "password" ? "current-password" : "email"} />
    </div>
  );
}