"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, displayName, password, inviteCode }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error ?? "Регистрация отклонена.");
      }
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      router.push("/");
      router.refresh();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="panel p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-accent)] glow-red">
          // ЗАПРОС ДОСТУПА
        </div>
        <h1 className="mt-2">Регистрация на SAM</h1>
        <p className="text-xs text-[color:var(--color-muted)] mt-2 leading-relaxed">
          Доступ выдаётся только по приглашению. Если вы не получили инвайт-код
          от двух проверенных операторов — закройте страницу. Заявки без кода
          игнорируются и записываются в чёрный список зеркала.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Псевдоним (логин)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
              minLength={3}
              maxLength={32}
              pattern="[A-Za-zА-Яа-я0-9_\-\.]+"
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Отображаемое имя
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              maxLength={48}
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Email (одноразовый)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Пароль (минимум 8 символов)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              Инвайт-код
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.trim())}
              required
              className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
              placeholder="LJC-XXXX-XXXX-XXXX"
            />
          </div>
          {err && <div className="text-xs text-[color:var(--color-accent)]">{err}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black disabled:opacity-50 text-xs uppercase tracking-widest"
          >
            {busy ? "Отправка…" : "Запросить доступ"}
          </button>
        </form>

        <div className="mt-4 text-xs text-[color:var(--color-muted)] text-center">
          Уже есть учётка?{" "}
          <Link href="/sign-in" className="text-[color:var(--color-accent)] hover:underline">
            Вход
          </Link>
        </div>
      </div>
    </div>
  );
}
