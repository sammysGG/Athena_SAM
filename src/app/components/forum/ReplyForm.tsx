"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLang } from "@/lib/lang";

export default function ReplyForm({
  threadId,
  threadSlug,
}: {
  threadId: string;
  threadSlug: string;
}) {
  const { data: session } = useSession();
  const { t } = useLang();
  const router = useRouter();
  const [body, setBody] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!session?.user) {
    return (
      <div className="panel p-4 text-sm flex items-center justify-between">
        <span className="text-[color:var(--color-muted)]">
          {t("Чтобы ответить, авторизуйтесь.", "Log in to reply.")}
        </span>
        <Link
          href="/sign-in"
          className="px-3 py-1.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black text-xs"
        >
          {t("Вход", "Login")}
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          body,
          bodyEn: bodyEn || body,
        }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error ?? "Ошибка отправки");
      }
      setBody("");
      setBodyEn("");
      router.refresh();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="panel">
      <div className="hrule px-4 py-2 bg-black/30 text-[10px] uppercase tracking-widest text-[color:var(--color-accent)]">
        // {t("Ответить в тему", "Reply to thread")} → /t/{threadSlug}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
            {t("Текст ответа (основной язык)", "Reply body (primary language)")}
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            required
            className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-3 text-sm font-mono"
            placeholder=">>> начни печатать..."
          />
        </div>
        <details className="text-xs">
          <summary className="cursor-pointer text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]">
            {t("Добавить перевод на английский (опционально)", "Add English translation (optional)")}
          </summary>
          <textarea
            value={bodyEn}
            onChange={(e) => setBodyEn(e.target.value)}
            rows={4}
            className="mt-2 w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-3 text-sm font-mono"
            placeholder="EN translation..."
          />
        </details>
        {err && <div className="text-xs text-[color:var(--color-accent)]">{err}</div>}
        <div className="flex justify-between items-center pt-1">
          <div className="text-[10px] text-[color:var(--color-muted)]">
            {t(
              "Любая ссылка должна быть .onion / .i2p. Чистый веб — бан.",
              "All links must be .onion / .i2p. Clearnet = ban.",
            )}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-2 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black disabled:opacity-50 text-xs uppercase tracking-widest"
          >
            {busy ? t("Отправка…", "Sending…") : t("Отправить", "Submit")}
          </button>
        </div>
      </div>
    </form>
  );
}
