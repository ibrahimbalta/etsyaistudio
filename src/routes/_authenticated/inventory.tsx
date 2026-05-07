import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { fetchEtsyListings } from "@/lib/etsy.functions";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, RefreshCw, ExternalLink, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/inventory")({
  component: InventoryPage,
});

function InventoryPage() {
  const { user } = useAuth();
  const getListings = useServerFn(fetchEtsyListings);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["etsy_listings", user?.id],
    queryFn: async () => {
      if (!user) return null;
      return await getListings({ data: { userId: user.id } });
    },
    enabled: !!user,
  });

  const filteredListings = data?.listings?.filter((l: any) => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Etsy Envanteri</h1>
          <p className="text-sm text-muted-foreground">Mağazanızdaki ürünleri yönetin ve SEO optimizasyonu yapın.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading || isRefetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </div>
      </div>

      {data?.isDemo && (
        <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-500">
          <AlertCircle className="h-5 w-5" />
          <div className="text-xs">
            <span className="font-bold uppercase">Demo Modu:</span> Henüz dükkanınızı bağlamadığınız için örnek veriler gösteriliyor.
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Ürün ara..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Ürünler yükleniyor...</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Görsel</TableHead>
                    <TableHead>Ürün Başlığı</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>İstatistik</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.length > 0 ? (
                    filteredListings.map((l: any) => (
                      <TableRow key={l.id}>
                        <TableCell>
                          <img src={l.image} className="h-12 w-12 rounded-md object-cover border border-border" />
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[300px] truncate font-medium text-sm" title={l.title}>
                            {l.title}
                          </div>
                          <div className="text-[10px] text-muted-foreground">ID: {l.id}</div>
                        </TableCell>
                        <TableCell className="text-sm font-semibold">{l.price} TL</TableCell>
                        <TableCell>
                          <Badge variant={l.stock < 5 ? "destructive" : "secondary"} className="text-[10px]">
                            {l.stock} adet
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[10px] text-muted-foreground">
                          {l.views} Görüntülenme
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="xs" variant="ghost" onClick={() => toast.info("SEO Analizi çok yakında!")}>
                               <Sparkles className="h-3.5 w-3.5 text-primary" />
                            </Button>
                            <Button size="xs" variant="ghost" asChild>
                              <a href={`https://www.etsy.com/listing/${l.id}`} target="_blank">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Ürün bulunamadı.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
