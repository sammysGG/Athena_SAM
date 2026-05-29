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
  lastReplyBy: string | null;
  createdAt: Date;
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

export default function ThreadRow({ thread: th }: { thread: Row }) {
  const { lang, t } = useLang();

  return (
    <li className="hrule last:border-b-0 px-4 py-3 grid grid-cols-[1fr_90px_90px_160px] gap-3 items-center hover:bg-[color:var(--color-panel-2)] transition">
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
          {t("Автор:", "By:")}{" "}
          <Link href={`/u/${th.author.username}`} className="text-[color:var(--color-info)] hover:underline">
            @{th.author.username}
          </Link>
          {th.author.affiliation && (
            <span className="ml-1 text-[color:var(--color-accent)]">
              [{th.author.affiliation}]
            </span>
          )}
          {" — "}
          {relativeTime(th.createdAt, lang)}
        </div>
      </div>
      <div className="text-xs text-center text-[color:var(--color-ink)] font-mono">
        {th._count.posts}
      </div>
      <div className="text-xs text-center text-[color:var(--color-muted)] font-mono">
        {th.views}
      </div>
      <div className="text-[11px] text-right">
        <div className="text-[color:var(--color-ink)]">{relativeTime(th.lastReplyAt, lang)}</div>
        <div className="text-[color:var(--color-info)]">
          @{th.lastReplyBy ?? th.author.username}
        </div>
      </div>
    </li>
  );
}
