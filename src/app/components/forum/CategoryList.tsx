"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { relativeTime } from "@/lib/format";

type CategoryWithRecent = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string | null;
  restricted: boolean;
  _count: { threads: number };
  threads: {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    lastReplyAt: Date;
    lastReplyBy: string | null;
    author: { username: string };
  }[];
};

export default function CategoryList({ categories }: { categories: CategoryWithRecent[] }) {
  const { lang, t } = useLang();

  return (
    <section className="panel">
      <div className="hrule px-4 py-2 flex items-center justify-between bg-black/30">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          // {t("Разделы форума", "Forum Boards")}
        </h2>
        <span className="text-[10px] text-[color:var(--color-muted)]">
          {t("Категории / Темы / Последняя активность", "Category / Threads / Last activity")}
        </span>
      </div>

      <ul>
        {categories.map((c) => {
          const last = c.threads[0];
          return (
            <li
              key={c.id}
              className="hrule last:border-b-0 px-4 py-3 grid grid-cols-[40px_1fr_90px_220px] gap-3 items-center hover:bg-[color:var(--color-panel-2)] transition"
            >
              <div className="w-10 h-10 border border-[color:var(--color-line-2)] flex items-center justify-center text-[10px] text-[color:var(--color-accent)] font-bold">
                {c.icon ?? "##"}
              </div>
              <div>
                <Link
                  href={`/c/${c.slug}`}
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] font-semibold"
                >
                  {lang === "ru" ? c.name : c.nameEn}
                </Link>
                {c.restricted && (
                  <span className="chip chip-red ml-2">{t("ЗАКРЫТО", "RESTRICTED")}</span>
                )}
                <div className="text-xs text-[color:var(--color-muted)] mt-0.5">
                  {lang === "ru" ? c.description : c.descriptionEn}
                </div>
              </div>
              <div className="text-xs text-center text-[color:var(--color-muted)]">
                <div className="text-[color:var(--color-ink)] font-mono">{c._count.threads}</div>
                <div className="text-[10px] uppercase">{t("тем", "threads")}</div>
              </div>
              <div className="text-xs">
                {last ? (
                  <>
                    <Link
                      href={`/t/${last.slug}`}
                      className="block truncate text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
                      title={lang === "ru" ? last.title : last.titleEn}
                    >
                      {lang === "ru" ? last.title : last.titleEn}
                    </Link>
                    <div className="text-[10px] text-[color:var(--color-muted)]">
                      {relativeTime(last.lastReplyAt, lang)} —{" "}
                      <span className="text-[color:var(--color-info)]">
                        @{last.lastReplyBy ?? last.author.username}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-[color:var(--color-muted)]">—</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
