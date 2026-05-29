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
