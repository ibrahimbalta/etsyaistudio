import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { fetchEtsyOrders } from "@/lib/etsy.functions";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingCart, DollarSign, Package, TrendingUp, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { user } = useAuth();
  const getOrders = useServerFn(fetchEtsyOrders);

  const { data, isLoading } = useQuery({
    queryKey: ["etsy_orders", user?.id],
    queryFn: async () => {
      if (!user) return null;
      return await getOrders({ data: { userId: user.id } });
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Siparişler & Analiz</h1>
        <p className="text-sm text-muted-foreground">Etsy mağazanızın satış performansını ve siparişlerini takip edin.</p>
      </div>

      {data?.isDemo && (
        <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-500">
          <AlertCircle className="h-5 w-5" />
          <div className="text-xs">
            <span className="font-bold uppercase">Demo Modu:</span> Canlı veriler için Etsy dükkanınızı bağlamanız gerekmektedir.
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Satış</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats?.totalSales || 0}</div>
            <p className="text-xs text-muted-foreground">Toplam tamamlanan sipariş</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats?.totalRevenue || 0} TL</div>
            <p className="text-xs text-muted-foreground">Brüt satış geliri</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif Siparişler</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats?.activeOrders || 0}</div>
            <p className="text-xs text-muted-foreground">Gönderilmeyi bekleyenler</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Son Siparişler</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Ürün Sayısı</TableHead>
                  <TableHead>Toplam</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.orders?.map((o: any) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium text-sm">#{o.id}</TableCell>
                    <TableCell className="text-sm">{o.customer}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.date}</TableCell>
                    <TableCell className="text-sm">{o.items} ürün</TableCell>
                    <TableCell className="text-sm font-bold">{o.total} TL</TableCell>
                    <TableCell>
                      <Badge 
                        variant={o.status === "Shipped" ? "success" : o.status === "Paid" ? "default" : "outline"}
                        className="text-[10px]"
                      >
                        {o.status === "Paid" ? "Ödendi" : o.status === "Shipped" ? "Gönderildi" : "Açık"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
