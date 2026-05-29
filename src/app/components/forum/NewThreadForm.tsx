"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TAGS = ["NONE", "OPERATION", "TARGET", "LEAK", "RECRUITING", "NEWS", "QUESTION"] as const;

export default function NewThreadForm({
  categoryId,
  categorySlug,
}: {
  categoryId: string;
  categorySlug: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [body, setBody] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [tag, setTag] = useState<string>("NONE");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          title,
          titleEn: titleEn || title,
          body,
          bodyEn: bodyEn || body,
          tag: tag === "NONE" ? null : tag,
        }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error ?? "Не удалось создать тему");
      }
      const j = await r.json();
      router.push(`/t/${j.slug}`);
      router.refresh();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="panel p-4 space-y-4">
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
          Заголовок темы
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={140}
          className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
          Английский перевод заголовка (опц.)
        </label>
        <input
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          maxLength={160}
          className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
          Тег
        </label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-2 text-sm font-mono"
        >
          {TAGS.map((tg) => (
            <option key={tg} value={tg}>{tg}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
          Первое сообщение
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={10}
          className="w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-3 text-sm font-mono"
          placeholder=">>> постановка задачи, цель, требования..."
        />
      </div>
      <details className="text-xs">
        <summary className="cursor-pointer text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]">
          Английский перевод тела (опц.)
        </summary>
        <textarea
          value={bodyEn}
          onChange={(e) => setBodyEn(e.target.value)}
          rows={6}
          className="mt-2 w-full bg-black/40 border border-[color:var(--color-line-2)] focus:border-[color:var(--color-accent)] outline-none p-3 text-sm font-mono"
        />
      </details>
      {err && <div className="text-xs text-[color:var(--color-accent)]">{err}</div>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={busy}
          className="px-4 py-2 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black disabled:opacity-50 text-xs uppercase tracking-widest"
        >
          {busy ? "Публикация…" : "Опубликовать тему"}
        </button>
      </div>
      <div className="text-[10px] text-[color:var(--color-muted)] border-t border-dashed border-[color:var(--color-line)] pt-2">
        Раздел: /c/{categorySlug} · Нарушение правил → перманентный бан и
        блокировка инвайт-цепочки.
      </div>
    </form>
  );
}
