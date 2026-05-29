"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInInner() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";
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
            href="/auth/microsoft"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-[color:var(--color-line-2)] text-[color:var(--color-fg)] hover:bg-white/5 text-xs uppercase tracking-widest"
          >
            <svg width="16" height="16" viewBox="0 0 21 21" fill="none"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
            Sign in with Microsoft
          </a>
          <a
            href="/auth/google"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-[color:var(--color-line-2)] text-[color:var(--color-fg)] hover:bg-white/5 text-xs uppercase tracking-widest"
          >
            <svg width="16" height="16" viewBox="0 0 272 92"><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/><path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/><path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/></svg>
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
