import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGuard,
});

function AuthGuard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Yükleniyor…</div>;
  if (!user) return null;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
