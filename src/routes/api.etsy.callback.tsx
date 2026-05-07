import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { handleEtsyCallback } from "@/lib/etsy.functions";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/api/etsy/callback")({
  component: EtsyCallbackPage,
  validateSearch: (s: Record<string, unknown>) => ({
    code: typeof s.code === "string" ? s.code : "",
    state: typeof s.state === "string" ? s.state : "",
  }),
});

function EtsyCallbackPage() {
  const { code, state } = Route.useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleCallback = useServerFn(handleEtsyCallback);

  useEffect(() => {
    async function process() {
      const savedState = localStorage.getItem("etsy_state");
      const verifier = localStorage.getItem("etsy_verifier");

      if (!code || !user || state !== savedState || !verifier) {
        toast.error("Bağlantı doğrulaması başarısız.");
        navigate({ to: "/settings" });
        return;
      }

      try {
        await handleCallback({ data: { code, verifier, userId: user.id } });
        toast.success("Etsy dükkanınız başarıyla bağlandı!");
        localStorage.removeItem("etsy_state");
        localStorage.removeItem("etsy_verifier");
        navigate({ to: "/settings" });
      } catch (e: any) {
        toast.error("Hata: " + e.message);
        navigate({ to: "/settings" });
      }
    }

    if (user) process();
  }, [code, state, user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium">Etsy dükkanınız bağlanıyor, lütfen bekleyin...</p>
    </div>
  );
}
