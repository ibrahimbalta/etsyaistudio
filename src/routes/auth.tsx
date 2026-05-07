import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Wand2, TrendingUp, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("Hesap oluşturuldu! E-postanızı doğrulayın.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Hata");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) toast.error(error.message ?? "Google ile giriş başarısız");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">EtsyAI Studio</span>
          </Link>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              Yapay Zeka ile<br />Etsy Satışlarınızı<br />
              <span className="text-white/80">Otomatiğe Bağlayın.</span>
            </h2>
            <div className="space-y-4">
              {[
                { icon: TrendingUp, text: "Canlı Etsy trend analizi" },
                { icon: Wand2, text: "Sınırsız AI tasarım üretimi" },
                { icon: ShoppingCart, text: "Mağaza & sipariş yönetimi" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/50">© 2026 EtsyAI Studio. Tüm hakları saklıdır.</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2 bg-background">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-bold text-xl lg:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span>EtsyAI Studio</span>
          </Link>

          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight">{mode === "signin" ? "Tekrar hoş geldiniz" : "Hesap oluşturun"}</h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? "EtsyAI Studio'ya giriş yapın." : "Ücretsiz hesabınızı oluşturun ve hemen başlayın."}
            </p>
          </div>

          <Button onClick={google} variant="outline" className="w-full h-12 font-medium gap-3 text-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google ile devam et
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> veya <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">E-posta</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@gmail.com" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Şifre</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-12" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 font-semibold text-sm">
              {loading ? "Yükleniyor..." : mode === "signin" ? "Giriş Yap" : "Kayıt Ol"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? (
              <>Hesabın yok mu? <span className="text-primary font-semibold">Ücretsiz kayıt ol</span></>
            ) : (
              <>Zaten hesabın var mı? <span className="text-primary font-semibold">Giriş yap</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
