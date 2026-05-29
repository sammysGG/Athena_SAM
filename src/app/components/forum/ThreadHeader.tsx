"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { relativeTime } from "@/lib/format";

type T = {
  title: string;
  titleEn: string;
  tag: string | null;
  pinned: boolean;
  locked: boolean;
  views: number;
  createdAt: Date;
  author: { username: string; affiliation: string | null };
  category: { slug: string; name: string; nameEn: string };
};

const tagClass = (tag: string | null) => {
  if (!tag) return "chip";
  if (tag === "OPERATION" || tag === "TARGET") return "chip chip-red";
  if (tag === "LEAK") return "chip chip-warn";
  if (tag === "RECRUITING") return "chip chip-green";
  if (tag === "NEWS") return "chip chip-info";
  return "chip";
};

export default function ThreadHeader({ thread, postCount }: { thread: T; postCount: number }) {
  const { lang, t } = useLang();
  return (
    <header className="panel p-4">
      <div className="flex items-center gap-2 flex-wrap">
        {thread.pinned && <span className="chip chip-warn">PIN</span>}
        {thread.locked && <span className="chip">LOCK</span>}
        {thread.tag && <span className={tagClass(thread.tag)}>{thread.tag}</span>}
        <span className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          // {lang === "ru" ? thread.category.name : thread.category.nameEn}
        </span>
      </div>
      <h1 className="mt-2">{lang === "ru" ? thread.title : thread.titleEn}</h1>
      <div className="mt-2 text-xs text-[color:var(--color-muted)] flex flex-wrap gap-x-4 gap-y-1">
        <span>
          {t("Открыто:", "Opened:")}{" "}
          <Link href={`/u/${thread.author.username}`} className="text-[color:var(--color-info)] hover:underline">
            @{thread.author.username}
          </Link>
          {thread.author.affiliation && (
            <span className="ml-1 text-[color:var(--color-accent)]">
              [{thread.author.affiliation}]
            </span>
          )}
        </span>
        <span>{relativeTime(thread.createdAt, lang)}</span>
        <span>· {postCount} {t("сообщ.", "posts")}</span>
        <span>· {thread.views} {t("просм.", "views")}</span>
      </div>
    </header>
  );
}
