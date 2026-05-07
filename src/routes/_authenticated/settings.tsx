import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Shop, CreditCard, User, LogOut, Check, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getEtsyAuthUrl } from "@/lib/etsy.functions";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [loading, setLoading] = useState(false);
  const getAuthUrl = useServerFn(getEtsyAuthUrl);

  const { data: shop } = useQuery({
    queryKey: ["etsy_shop", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("etsy_shops").select("*").eq("user_id", user?.id).single();
      return data;
    },
    enabled: !!user,
  });

  const connectEtsy = async () => {
    try {
      const { url, verifier, state } = await getAuthUrl();
      localStorage.setItem("etsy_verifier", verifier);
      localStorage.setItem("etsy_state", state);
      window.location.href = url;
    } catch (e) {
      toast.error("Bağlantı başlatılamadı.");
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("user_id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Profil güncellendi");
    } catch (e: any) {
      toast.error(e.message || "Hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Profilini ve dükkan bağlantılarını yönet.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <nav className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start gap-2 bg-accent">
            <User className="h-4 w-4" /> Profil
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <SettingsIcon className="h-4 w-4" /> Dükkan Bağlantısı
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <CreditCard className="h-4 w-4" /> Abonelik
          </Button>
          <div className="my-2 border-t" />
          <Button variant="ghost" className="justify-start gap-2 text-destructive" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Çıkış Yap
          </Button>
        </nav>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>Uygulama içinde görünecek isminiz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Görünen İsim</Label>
                <Input 
                  id="name" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  placeholder="İsminiz"
                />
              </div>
              <Button onClick={updateProfile} disabled={loading}>
                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Etsy Dükkan Bağlantısı</CardTitle>
              <CardDescription>Satışlarınızı yönetmek için Etsy dükkanınızı bağlayın.</CardDescription>
            </CardHeader>
            <CardContent>
              {shop ? (
                <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Dükkan Bağlı</div>
                      <div className="text-xs text-muted-foreground">Satış verileri senkronize ediliyor.</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={connectEtsy}>Yenile</Button>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <SettingsIcon className="mx-auto h-12 w-12 text-muted-foreground/20" />
                  <h3 className="mt-4 text-sm font-semibold">Henüz dükkan bağlı değil</h3>
                  <p className="mt-2 text-xs text-muted-foreground">Dükkanınızı bağlayarak siparişleri ve ürünleri buradan yönetebilirsiniz.</p>
                  <Button className="mt-6" variant="default" onClick={connectEtsy}>
                    Etsy Dükkanını Bağla
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Mevcut Plan</CardTitle>
              <CardDescription>Şu anki abonelik durumunuz ve bakiyeniz.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold uppercase">{profile?.plan || "Free"}</div>
                <div className="text-sm text-muted-foreground">{profile?.credits || 0} Kredi Kalan</div>
              </div>
              <Button onClick={() => window.location.href = "/pricing"}>Planı Yükselt</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
