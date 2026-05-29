"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { relativeTime } from "@/lib/format";

type Row = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  pinned: boolean;
  locked: boolean;
  tag: string | null;
  views: number;
  lastReplyAt: Date;
  category: { slug: string; name: string; nameEn: string };
  author: { username: string; affiliation: string | null };
  _count: { posts: number };
};

const tagClass = (tag: string | null) => {
  if (!tag) return "chip";
  if (tag === "OPERATION" || tag === "TARGET") return "chip chip-red";
  if (tag === "LEAK") return "chip chip-warn";
  if (tag === "RECRUITING") return "chip chip-green";
  if (tag === "NEWS") return "chip chip-info";
  return "chip";
};

export default function RecentThreadList({ threads }: { threads: Row[] }) {
  const { lang, t } = useLang();
  return (
    <section className="panel">
      <div className="hrule px-4 py-2 flex items-center justify-between bg-black/30">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          // {t("Последняя активность", "Latest Activity")}
        </h2>
        <Link
          href="/recent"
          className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
        >
          {t("Все темы →", "All threads →")}
        </Link>
      </div>
      <ul>
        {threads.map((th) => (
          <li
            key={th.id}
            className="hrule last:border-b-0 px-4 py-2.5 grid grid-cols-[1fr_120px_140px] gap-3 items-center hover:bg-[color:var(--color-panel-2)] transition"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {th.pinned && <span className="chip chip-warn">PIN</span>}
                {th.locked && <span className="chip">LOCK</span>}
                {th.tag && <span className={tagClass(th.tag)}>{th.tag}</span>}
                <Link
                  href={`/t/${th.slug}`}
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] font-semibold truncate"
                >
                  {lang === "ru" ? th.title : th.titleEn}
                </Link>
              </div>
              <div className="text-[11px] text-[color:var(--color-muted)] mt-0.5 truncate">
                <Link href={`/c/${th.category.slug}`} className="hover:text-[color:var(--color-accent)]">
                  {lang === "ru" ? th.category.name : th.category.nameEn}
                </Link>
                {" / "}
                <span className="text-[color:var(--color-info)]">@{th.author.username}</span>
                {th.author.affiliation && (
                  <span className="ml-1 text-[10px] text-[color:var(--color-accent)]">
                    [{th.author.affiliation}]
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-center text-[color:var(--color-muted)]">
              <div className="text-[color:var(--color-ink)] font-mono">{th._count.posts}</div>
              <div className="text-[10px] uppercase">{t("ответы", "replies")}</div>
            </div>
            <div className="text-[11px] text-[color:var(--color-muted)] text-right">
              {relativeTime(th.lastReplyAt, lang)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
