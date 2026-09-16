import { useState, type FormEvent } from "react";
import { Redirect, useLocation } from "wouter";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Borjgali } from "@/components/Ornaments";
import { AdminApiError, useAdminSession, useLogin } from "../api";
import { S } from "../strings";

function loginErrorMessage(error: unknown): string {
  if (error instanceof AdminApiError) {
    if (error.status === 401) return S.login.wrong;
    if (error.status === 429) {
      const retry = (error.payload as { retryAfter?: number } | null)?.retryAfter ?? 900;
      return S.login.throttled(Math.max(1, Math.ceil(retry / 60)));
    }
    if (error.status === 503) return S.login.notConfigured;
  }
  return S.login.failed;
}

export default function Login() {
  const session = useAdminSession();
  const login = useLogin();
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");

  if (session.isSuccess) return <Redirect to="/admin" replace />;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!password) return;
    login.mutate(password, { onSuccess: () => navigate("/admin", { replace: true }) });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-sm border border-line bg-white p-7 md:p-9">
        <div className="flex items-center gap-3">
          <Borjgali size={20} />
          <span className="font-serif text-[1rem] tracking-[0.08em] text-ink">{S.brand}</span>
        </div>
        <h1 className="mt-6 text-[1.5rem] text-ink">{S.login.title}</h1>
        <p className="mt-2 text-[0.8125rem] text-muted-foreground">{S.login.intro}</p>

        <div className="mt-6 space-y-2">
          <Label htmlFor="admin-password">{S.login.password}</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={event => setPassword(event.target.value)}
            disabled={login.isPending}
            aria-invalid={login.isError}
            className="bg-white"
          />
          {login.isError && (
            <p className="text-[0.8125rem] text-destructive" role="alert">
              {loginErrorMessage(login.error)}
            </p>
          )}
        </div>

        <Button type="submit" disabled={login.isPending || !password} className="mt-6 h-12 w-full bg-turquoise text-white hover:bg-deep">
          {login.isPending ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
          {login.isPending ? S.login.submitting : S.login.submit}
        </Button>
      </form>
    </main>
  );
}
