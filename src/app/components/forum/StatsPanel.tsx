"use client";

import { useLang } from "@/lib/lang";

type Stats = {
  userCount: number;
  threadCount: number;
  postCount: number;
  opsCount: number;
};

export default function StatsPanel({ stats }: { stats: Stats }) {
  const { t } = useLang();
  return (
    <section className="panel p-4">
      <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-3">
        // {t("Статистика узла", "Node Statistics")}
      </div>
      <ul className="text-sm space-y-2 font-mono">
        <li className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
          <span className="text-[color:var(--color-muted)]">{t("Операторы", "Operators")}</span>
          <span className="text-[color:var(--color-ink)]">{stats.userCount}</span>
        </li>
        <li className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
          <span className="text-[color:var(--color-muted)]">{t("Темы", "Threads")}</span>
          <span className="text-[color:var(--color-ink)]">{stats.threadCount}</span>
        </li>
        <li className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
          <span className="text-[color:var(--color-muted)]">{t("Сообщения", "Posts")}</span>
          <span className="text-[color:var(--color-ink)]">{stats.postCount}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-[color:var(--color-muted)]">{t("Операции", "Operations")}</span>
          <span className="text-[color:var(--color-accent)] glow-red">{stats.opsCount}</span>
        </li>
      </ul>
      <div className="mt-4 text-[10px] text-[color:var(--color-muted)] leading-relaxed">
        {t(
          "Платформа работает с марта 2022. Зеркала ротация — каждые 7 суток.",
          "Online since March 2022. Mirror rotation every 7 days.",
        )}
      </div>
    </section>
  );
}
