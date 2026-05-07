import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Sparkles, TrendingUp, Wand2, Box, ShoppingCart, 
  Megaphone, ArrowRight, Check, ShieldCheck, 
  Zap, BarChart3, Globe, Star, Play, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Lumina Seller — Profesyonel Satış & POD Otomasyonu" },
      { name: "description", content: "Yapay zeka ile trendleri bulun, tasarım üretin ve mağazanızı tek bir merkezden yönetin. Global POD satıcıları için hepsi bir arada çözüm." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ── NAVIGATION ── */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Sparkles className="h-5 w-5" />
              <div className="absolute -inset-0.5 rounded-xl bg-primary/20 blur-sm -z-10" />
            </div>
            <span>Lumina <span className="font-light text-primary">Seller</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Özellikler</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">Nasıl Çalışır</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Fiyatlandırma</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden sm:inline text-sm font-medium hover:text-primary transition-colors">Giriş</Link>
            <Button asChild size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20">
              <Link to="/auth">Ücretsiz Başla <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* ── HERO ── */}
        <section className="relative py-24 sm:py-36 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-1/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-8 rounded-full px-5 py-2 text-sm font-medium border-primary/20 bg-primary/5 text-primary gap-2 inline-flex items-center">
                <Star className="h-3.5 w-3.5 fill-primary" /> Satıcıların 1 Numaralı AI Aracı
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Mağazanızı{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-chart-1 to-primary bg-clip-text text-transparent">Yapay Zeka</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none"><path d="M2 8c40-6 100-8 148-4s108 6 148 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" /></svg>
                </span>
                {" "}ile Yönetin
              </h1>

              <p className="mt-8 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                Trend analizinden tasarıma, envanter yönetiminden sosyal medya otomasyonuna — 
                <strong className="text-foreground"> tüm POD iş akışınız</strong> tek bir platformda.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-base shadow-2xl shadow-primary/30 w-full sm:w-auto">
                  <Link to="/auth">
                    Ücretsiz Hesap Oluştur <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <a href="#features" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors h-14 px-6">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
                    <Play className="h-4 w-4 ml-0.5" />
                  </div>
                  Nasıl Çalışır?
                </a>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-20 sm:mt-28 relative">
              <div className="absolute -inset-4 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
              <div className="rounded-2xl border border-border/60 bg-card/50 shadow-2xl overflow-hidden backdrop-blur-sm ring-1 ring-white/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-muted/50 px-3 py-1 text-[10px] text-muted-foreground">
                      <ShieldCheck className="h-3 w-3" /> app.luminaseller.com/dashboard
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[16/8] bg-gradient-to-br from-muted/20 via-background to-muted/10 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-4 w-full max-w-3xl">
                    {[
                      { label: "Satışlar", value: "1,247", color: "from-blue-500/20 to-blue-500/5", icon: ShoppingCart },
                      { label: "Gelir", value: "$12,890", color: "from-green-500/20 to-green-500/5", icon: BarChart3 },
                      { label: "Tasarımlar", value: "486", color: "from-purple-500/20 to-purple-500/5", icon: Wand2 },
                      { label: "Trendler", value: "52", color: "from-orange-500/20 to-orange-500/5", icon: TrendingUp },
                    ].map((card, i) => (
                      <div key={i} className={`rounded-xl bg-gradient-to-b ${card.color} border border-border/40 p-4 backdrop-blur-sm`}>
                        <card.icon className="h-4 w-4 text-muted-foreground mb-2" />
                        <div className="text-xl font-bold">{card.value}</div>
                        <div className="text-[10px] text-muted-foreground">{card.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-24 sm:py-32 relative">
          <div className="absolute inset-0 bg-muted/20 -z-10" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 text-primary border-primary/20">Profesyonel Araç Seti</Badge>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Mağazanızı Büyütecek Her Şey</h2>
              <p className="mt-6 text-lg text-muted-foreground">6 farklı modül, tek bir platform. Etsy satışlarınızı katlayın.</p>
            </div>

            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: TrendingUp, title: "Canlı Trend Analizi", desc: "Firecrawl destekli AI ile pazardaki en karlı nişleri anında keşfedin. 24 saatlik akıllı önbellek ile kredi tasarrufu.", color: "from-orange-500 to-red-500", bg: "bg-orange-500/10" },
                { icon: Wand2, title: "AI Tasarım Üretimi", desc: "Pollinations AI (FLUX) ile sınırsız, özgün ve telifsiz tasarımlar üretin. Toplu üretim ve HD netleştirme dahil.", color: "from-purple-500 to-pink-500", bg: "bg-purple-500/10" },
                { icon: Globe, title: "SEO & Listing Yazıcı", desc: "Gemini AI ile mükemmel başlık, 13 etiket, 4-6 paragraflık açıklama ve pazarlama içerikleri oluşturun.", color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
                { icon: Box, title: "Envanter Yönetimi", desc: "Dükkanınızdaki tüm ürünleri tek bir ekrandan izleyin. Stok takibi, fiyatlandırma ve görüntülenme istatistikleri.", color: "from-green-500 to-emerald-500", bg: "bg-green-500/10" },
                { icon: ShoppingCart, title: "Sipariş Analitiği", desc: "Gerçek zamanlı satış takibi, gelir analizi ve müşteri siparişlerini tek bir panelden yönetin.", color: "from-blue-600 to-indigo-500", bg: "bg-blue-600/10" },
                { icon: Megaphone, title: "Pazarlama Laboratuvarı", desc: "Tasarımlarınızı tek tıkla Pinterest'e pinleyin ve Instagram için hazır içerikler oluşturun.", color: "from-pink-500 to-rose-500", bg: "bg-pink-500/10" },
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7 text-foreground/80" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">4 Adımda Satışa Başlayın</h2>
              <p className="mt-6 text-lg text-muted-foreground">Karmaşık süreçler yok. Kayıt olun, üretin, yayınlayın.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Trend Bulun", desc: "AI, pazardaki en yükselen nişleri sizin için analiz eder." },
                { step: "02", title: "Tasarım Üretin", desc: "Tek tıkla özgün, baskıya hazır tasarımlar oluşturun." },
                { step: "03", title: "Listing Yazın", desc: "SEO uyumlu başlık, etiket ve açıklamalar otomatik hazırlanır." },
                { step: "04", title: "Satışa Başlayın", desc: "Dükkanınıza yükleyin, sosyal medyada paylaşın, kazanın." },
              ].map((item, i) => (
                <div key={i} className="relative text-center group">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl font-bold mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-5 w-5 text-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 border-y border-border/50 bg-muted/10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
              {[
                { label: "Üretilen Tasarım", value: "1.2M+" },
                { label: "Aktif Mağaza", value: "450+" },
                { label: "Ülke", value: "32" },
                { label: "Satış Artışı", value: "%300" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING PREVIEW ── */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Şeffaf Fiyatlandırma</h2>
              <p className="mt-6 text-lg text-muted-foreground">Gizli ücret yok. İstediğiniz zaman iptal edin.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "$0", desc: "Başlangıç", features: ["10 Kredi/Ay", "Trend Analizi", "AI Tasarım", "SEO Listing"], highlight: false },
                { name: "Pro", price: "$19", desc: "En popüler", features: ["100 Kredi/Ay", "HD Netleştirme", "Toplu Üretim", "Pazarlama Lab", "Öncelikli Destek"], highlight: true },
                { name: "Business", price: "$49", desc: "Ölçek", features: ["500 Kredi/Ay", "Envanter Yönetimi", "Sipariş Analitiği", "SEO Danışmanlığı", "API Erişimi"], highlight: false },
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-2xl border-2 p-8 transition-all ${
                    plan.highlight 
                      ? "border-primary bg-card shadow-2xl shadow-primary/10 scale-105" 
                      : "border-border bg-card hover:border-primary/20"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">EN POPÜLER</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">/ay</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className="w-full h-12 font-semibold" 
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    <Link to="/auth">{plan.price === "$0" ? "Ücretsiz Başla" : "Planı Seç"}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-6 lg:mx-auto max-w-7xl mb-24">
          <div className="relative isolate overflow-hidden bg-primary rounded-3xl px-8 py-20 sm:px-20 sm:py-28 text-center shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Crown className="h-12 w-12 text-white/80 mx-auto mb-8" />
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                Satış Serüveninize<br />Bugün Başlayın.
              </h2>
              <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
                Kredi kartı gerekmez. 10 ücretsiz krediyle hemen deneyin.
              </p>
              <div className="mt-10">
                <Button asChild variant="secondary" size="lg" className="rounded-full px-10 h-14 text-base shadow-xl font-bold">
                  <Link to="/auth">Hemen Ücretsiz Başla <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            Lumina Seller
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Lumina Seller. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Şartlar</a>
            <a href="#" className="hover:text-primary transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-primary transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
