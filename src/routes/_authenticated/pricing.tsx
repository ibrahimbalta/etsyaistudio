import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, Zap, Crown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { profile } = useAuth();

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Yeni başlayanlar için temel özellikler.",
      features: [
        "10 Kredi / Ay",
        "Etsy Trend Analizi",
        "AI Tasarım Üretimi",
        "Standart Kalite",
      ],
      buttonText: "Şu anki Planın",
      active: true,
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Satışlarını artırmak isteyen ciddi satıcılar.",
      features: [
        "100 Kredi / Ay",
        "HD Upscale (Netleştirme)",
        "Toplu Üretim (Bulk Mode)",
        "Pazarlama Laboratuvarı",
        "Öncelikli Destek",
      ],
      buttonText: "Pro'ya Yükselt",
      active: false,
      highlight: true,
      checkoutUrl: "https://etsyaistudio.lemonsqueezy.com/checkout/buy/pro_plan",
    },
    {
      name: "Business",
      price: "$49",
      description: "Büyük ölçekli POD operasyonları için.",
      features: [
        "500 Kredi / Ay",
        "Sınırsız Envanter Yönetimi",
        "Gelişmiş Sipariş Analitiği",
        "Özel SEO Danışmanlığı",
        "API Erişimi",
      ],
      buttonText: "Business'a Geç",
      active: false,
      highlight: false,
      checkoutUrl: "https://etsyaistudio.lemonsqueezy.com/checkout/buy/business_plan",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5">
          Fiyatlandırma
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          İşinizi <span className="text-primary">Büyütecek</span> Planı Seçin
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          EtsyAI Studio ile zaman kazanın, tasarımlarınızı otomatiğe bağlayın ve satışlarınızı katlayın.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative flex flex-col border-2 transition-all duration-300 hover:shadow-2xl ${
              plan.highlight ? "border-primary shadow-xl scale-105" : "border-border hover:border-primary/20"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                EN POPÜLER
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {plan.name === "Starter" && <Zap className="h-5 w-5 text-muted-foreground" />}
                {plan.name === "Pro" && <Sparkles className="h-5 w-5 text-primary" />}
                {plan.name === "Business" && <Crown className="h-5 w-5 text-yellow-500" />}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">/ay</span>
              </div>
              <CardDescription className="pt-4">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full font-bold py-6 text-lg" 
                variant={plan.highlight ? "default" : "outline"}
                disabled={plan.active}
                asChild={!!plan.checkoutUrl}
              >
                {plan.checkoutUrl ? (
                  <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">{plan.buttonText}</a>
                ) : (
                  <span>{plan.buttonText}</span>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="rounded-3xl bg-card border border-border p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-foreground">Güvenli Ödeme, Global Standartlar</h2>
        <p className="text-muted-foreground text-sm">
          Ödemeleriniz LemonSqueezy güvencesiyle 256-bit SSL ile korunur. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz. 
          Kredi kartı bilgileriniz asla sunucularımızda saklanmaz.
        </p>
        <div className="flex justify-center items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all text-foreground font-bold">
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span>AMEX</span>
          <span>PAYPAL</span>
        </div>
      </section>
    </div>
  );
}
