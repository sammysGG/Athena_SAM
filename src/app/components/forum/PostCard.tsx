"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { fullTimestamp, relativeTime } from "@/lib/format";

type AuthorMeta = {
  username: string;
  displayName: string;
  affiliation: string | null;
  role: string;
  reputation: number;
  postCount: number;
  signature: string | null;
  avatarUrl: string | null;
  location: string | null;
  createdAt: Date;
};

type P = {
  id: string;
  body: string;
  bodyEn: string;
  imageUrl: string | null;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  author: AuthorMeta;
};

const roleBadge = (role: string) => {
  if (role === "admin") return <span className="chip chip-red">ADMIN</span>;
  if (role === "moderator") return <span className="chip chip-warn">MOD</span>;
  if (role === "vetted") return <span className="chip chip-green">VETTED</span>;
  return <span className="chip">USER</span>;
};

export default function PostCard({ post, index }: { post: P; index: number }) {
  const { lang, t } = useLang();
  const a = post.author;

  return (
    <article
      id={`p${index}`}
      className="panel grid grid-cols-[200px_1fr] gap-0 border-l-2 border-l-[color:var(--color-line-2)] hover:border-l-[color:var(--color-accent)] transition"
    >
      {/* Author column */}
      <aside className="bg-black/30 p-3 border-r border-[color:var(--color-line)]">
        <Link
          href={`/u/${a.username}`}
          className="block text-[color:var(--color-accent)] font-bold hover:underline text-sm glow-red truncate"
        >
          @{a.username}
        </Link>
        <div className="text-[10px] text-[color:var(--color-muted)] truncate">{a.displayName}</div>

        <div className="mt-2 w-full aspect-square border border-[color:var(--color-line-2)] bg-black/40 flex items-center justify-center overflow-hidden">
          {a.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.avatarUrl} alt="" className="w-full h-full object-cover grayscale contrast-110" />
          ) : (
            <div className="text-3xl text-[color:var(--color-accent)]/60 font-bold">
              {a.username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="mt-2 space-y-1 text-[10px]">
          {roleBadge(a.role)}
          {a.affiliation && (
            <div className="chip chip-red w-full text-center truncate">
              {a.affiliation}
            </div>
          )}
        </div>

        <dl className="mt-3 space-y-1 text-[11px] font-mono">
          <div className="flex justify-between">
            <dt className="text-[color:var(--color-muted)]">REP</dt>
            <dd className={a.reputation >= 0 ? "text-[color:var(--color-go)]" : "text-[color:var(--color-accent)]"}>
              {a.reputation >= 0 ? "+" : ""}{a.reputation}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[color:var(--color-muted)]">POSTS</dt>
            <dd className="text-[color:var(--color-ink)]">{a.postCount}</dd>
          </div>
          {a.location && (
            <div className="flex justify-between">
              <dt className="text-[color:var(--color-muted)]">LOC</dt>
              <dd className="text-[color:var(--color-ink)] truncate">{a.location}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-[color:var(--color-muted)]">SINCE</dt>
            <dd className="text-[color:var(--color-ink)]">
              {new Date(a.createdAt).toISOString().slice(0, 7)}
            </dd>
          </div>
        </dl>
      </aside>

      {/* Post body */}
      <div className="flex flex-col">
        <div className="hrule px-4 py-2 flex items-center justify-between text-[11px] text-[color:var(--color-muted)] bg-black/20">
          <div>
            <span className="text-[color:var(--color-ink)] mr-2">#{index}</span>
            <span title={fullTimestamp(post.createdAt)}>
              {relativeTime(post.createdAt, lang)}
            </span>
            <span className="ml-2 text-[color:var(--color-muted)]">
              ({fullTimestamp(post.createdAt)})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href={`#p${index}`} className="hover:text-[color:var(--color-accent)]">⛓ {t("ссылка", "link")}</a>
            <span className="text-[color:var(--color-go)]">+{post.upvotes}</span>
            <span className="text-[color:var(--color-accent)]">−{post.downvotes}</span>
          </div>
        </div>

        <div className="p-4 post-body text-sm">
          {lang === "ru" ? post.body : post.bodyEn}
        </div>

        {post.imageUrl && (
          <div className="px-4 pb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="max-w-full border border-[color:var(--color-line-2)]"
            />
          </div>
        )}

        {a.signature && (
          <div className="mt-auto border-t border-dashed border-[color:var(--color-line)] px-4 py-2 text-[11px] text-[color:var(--color-muted)] whitespace-pre-line">
            {a.signature}
          </div>
        )}
      </div>
    </article>
  );
}
